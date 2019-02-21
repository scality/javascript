# Example

This is an example application using the API. Currently, this doesn't handle
authentication. As such, it expects the API to be available at
`http://localhost:8001`, and then a proxy is set up from the development server
to this endpoint.

You can achieve this by e.g. running `kubectl proxy` on your host.

To run the example:

```
$ npm install
$ npm start
```

Then browse to http://localhost:8080, and check the Javascript console.
