import { Core_v1Api } from '@kubernetes/client-javascript';

// We proxy the API-server at `/api`, so the root of the API is at `/`
const APISERVER_URL = window.location.protocol + '//' + window.location.host;

async function main() {
    const client = new Core_v1Api(APISERVER_URL);

    const nodes = await client.listNode();
    console.log('Cluster nodes', nodes.body.items);
}

main();
