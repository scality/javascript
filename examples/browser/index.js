import { Core_v1Api } from '@kubernetes/client-javascript';
import { UserManager } from 'oidc-client';

const userManager = new UserManager({
    authority: OIDC_PROVIDER_URL,
    client_id: OIDC_CLIENT_ID,
    redirect_uri: 'http://localhost:8000/callback',
    post_logout_redirect_uri: '/logout',
    response_type: 'id_token',
    scope: 'openid email profile',
    loadUserInfo: false,
});

if (window.location.pathname === '/callback') {
    userManager.signinRedirectCallback()
        .then(function(user) {
            window.location = '/';
        })
        .catch(console.error);
} else if (window.location.pathname === '/logout') {
    userManager.signoutRedirectCallback().then(function() {
        const h1 = document.createElement('h1');
        h1.innerText = 'Logged out';
        document.body.append(h1);

        const link = document.createElement('a');
        link.href = '/';
        link.innerText = 'Return to homepage';
        document.body.append(link);
    });
} else {
    userManager.getUser()
        .then(function(user) {
            if (!user) {
                const loginButton = document.createElement('button');
                loginButton.innerText = 'Login';
                loginButton.addEventListener('click', function() {
                    userManager.signinRedirect();
                }, false);
                document.body.append(loginButton);
            } else {
                render(user);
            }
        });
}

const Config = (function() {
    function Config(apiServer, token, tokenType) {
        this._apiServer = apiServer;
        this._token = token;
        this._tokenType = tokenType;
    }

    Config.prototype = {
        get apiServer() {
            return this._apiServer;
        },
        get token() {
            return this._token;
        },
        get tokenType() {
            return this._tokenType;
        },
        makeApiClient: function(apiClientType) {
            const apiClient = new apiClientType(this.apiServer);
            apiClient.setDefaultAuthentication(this);
            return apiClient;
        },
        applyToRequest: function(request) {
            request.headers['authorization'] = this.tokenType + ' ' + this.token;
        },
    };

    return Config;
})();

function render(user) {
    const header = document.createElement('h1');
    header.innerText = 'Welcome, ' + user.profile.name;
    document.body.append(header);

    const logoutButton = document.createElement('button');
    logoutButton.innerText = 'Logout';
    logoutButton.addEventListener('click', function() {
        userManager.signoutRedirect()
            .catch(function(error) {
                if (error.message === 'no end session endpoint') {
                    window.location = '/logout';
                }
                throw error;
            });
        }, false);
    document.body.append(logoutButton);

    const config = new Config(APISERVER_URL, user.id_token, user.token_type);
    const coreV1 = config.makeApiClient(Core_v1Api);

    coreV1.listNode()
        .then(function(nodesResponse) {
            const header = document.createElement('h2');
            header.innerText = 'Cluster Nodes';
            document.body.append(header);

            const nodes = nodesResponse.body.items;
            const ul = document.createElement('ul');
            for(const idx in nodes) {
                const li = document.createElement('li');
                li.innerText = nodes[idx].metadata.name;
                ul.append(li);
            }
            document.body.append(ul);
        })
        .catch(function(error) {
            console.error('Error retrieving nodes', error.body ? error.body : error);
        });
}
