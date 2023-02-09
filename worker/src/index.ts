/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    CACHE: KVNamespace
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;
}

export default {
    async fetch(request: Request, env: Env, ctx): Promise<Response> {
        const method = request.method
        const url = new URL(request.url)
        const key = url.pathname || ''

        // url.searchParams.get('key')
        console.time('start')
        const res = await env.CACHE.getWithMetadata(
            'xxx' + Math.random().toString(36).substring(2, 15),
            { type: 'arrayBuffer', cacheTtl: 0 },
        )
        console.timeEnd('end')
        return new Response(JSON.stringify(res || 'null'))
    },
}
