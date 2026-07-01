import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    console.log('PROXY HIT 👉', request.nextUrl.pathname)
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
        const loginUrl = new URL('/', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}
export default proxy;

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
}