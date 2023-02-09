// @ts-ignore
import KvStorage from 'cloudflare-kv-storage-rest'

const { ACCOUNTID, KEY } = process.env

// const store = new KvStorage({
//     namespace: 'testing-kv',
//     accountId: ACCOUNTID,
//     authEmail: 'beats.by.morse@gmail.com',
//     authKey: KEY,
//     fetch,
//     FormData,
// })

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

class KVStorage {
    url: string = 'https://try-worker-in-vercel.remorses.workers.dev'
    constructor() {}
    async get(key: string) {
        let u = new URL(key || '', this.url)
        const res = await fetch(u, {
            method: 'GET',
            headers: {},
        })
        return await res.json()
    }
    async put(key: string) {
        let u = new URL(key || '', this.url)
        const res = await fetch(u, {
            method: 'PUT',
            headers: {},
        })
        return await res.json()
    }
}

const storage = new KVStorage()

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const u = request.url
    console.time('kv:' + u)
    const res = await storage.get('xxx')
    console.log(res)
    console.timeEnd('kv:' + u)
    // await storage.put('xxx', 'test')
    return NextResponse.next()
}

