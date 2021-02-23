import { Plugin } from '@nuxt/types'

import UniversalCookie, { CookieChangeOptions } from 'universal-cookie'
import { serialize } from 'cookie'
import { OutgoingMessage } from 'http'

const plugin: Plugin = ({ req, res }, inject) => {
  let cookie: UniversalCookie

  if (process.server) {
    cookie = createServerCookie(req.headers.cookie || '', res)
  } else {
    cookie = new UniversalCookie()
  }

  inject('cookie', cookie)
}

export function createServerCookie(
  cookie: string,
  res: OutgoingMessage
): UniversalCookie {
  const universalCookie = new UniversalCookie(cookie)
  universalCookie.addChangeListener((change: CookieChangeOptions) => {
    if (res.headersSent) {
      return
    }
    let cookieHeader = res.getHeader('Set-Cookie')
    if (typeof cookieHeader === 'string') {
      cookieHeader = [cookieHeader]
    } else if (typeof cookieHeader === 'number') {
      cookieHeader = [cookieHeader.toString()]
    }
    cookieHeader = (cookieHeader as string[]) || []

    if (change.value === undefined) {
      cookieHeader.push(serialize(change.name, '', change.options))
    } else {
      cookieHeader.push(serialize(change.name, change.value, change.options))
    }

    res.setHeader('Set-Cookie', cookieHeader)
  })

  return universalCookie
}

export default plugin
