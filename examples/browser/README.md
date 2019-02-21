# Example

This is an example application using the API and integrating with an OIDC
identity provider.

Note: for the example to work, your Kubernetes API server needs to be
configured to authenticate users against this OIDC provider.

To run the example, making changes to the configuration variables based on your
environment:

```
$ npm install
$ export OIDC_PROVIDER_URL=https://auth.example.org
$ export OIDC_CLIENT_ID=kubernetes
$ export APISERVER_URL=https://k8s.example.org
$ npm start
```

Then browse to http://localhost:8000.

Note: your OIDC identity provider must accept `http://localhost:8000/callback`
as a valid callback for the given client ID.

Check the Javascript console for errors if things don't seem to work. As an
example, if your OIDC service or API server use self-signed certificates, you
may need to accept these upfront (by surfing to the addresses in the same
browser session). This example code doesn't handle errors properly.
