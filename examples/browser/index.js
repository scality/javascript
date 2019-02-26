import { Config, Core_v1Api, watch } from '@kubernetes/client-node';
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

    watch(config, '/api/v1/watch/events', {},
        function(type, object) {
            console.log('New event', type, object);
        },
        function(e) {
            console.log('Stream ended', e);
        }
    );

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
