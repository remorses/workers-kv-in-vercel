// @ts-ignore
import KvStorage from 'cloudflare-kv-storage-rest'

const { ACCOUNTID, KEY } = process.env

const store = new KvStorage({
    namespace: 'f45552a9362641d4b5b34f5b7211fff4',
    accountId: ACCOUNTID,
    authKey: KEY,
    fetch,
    FormData,
})

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const u = request.url
    console.time('kv:' + u)
    const res = await store.get('xxx')
    console.log(res)
    console.timeEnd('kv:' + u)
    await store.put('xxx', 'test')
    return NextResponse.next()
}
