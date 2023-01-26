// @ts-ignore
import KvStorage from 'cloudflare-kv-storage-rest'

const { ACCOUNTID, KEY } = process.env

const store = new KvStorage({
    namespace: 'namespace',
    accountId: 'accountId',
    fetch,
    FormData,
})

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.time('kv')
    const res = await store.get('xxx')
    console.log(res)
    console.timeEnd('kv')
    await store.put('xxx', 'test')
    return NextResponse.next()
}
