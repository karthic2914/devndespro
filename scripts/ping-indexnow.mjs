/**
 * Submit site URLs to IndexNow (Bing / Yandex / others).
 *
 * Usage: node scripts/ping-indexnow.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const HOST = 'www.devndespro.com'
const KEY = '3bc1f5a17348445eb2b6a32151f93acb'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const SKIP_BLOG_DIRS = new Set(['ui-ui-design', 'ui-ui-desigin'])

function listHtmlBasenames(dir) {
  const abs = path.join(root, dir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.replace(/\.html$/i, ''))
    .sort()
}

function listBlogSlugs() {
  const abs = path.join(root, 'public', 'blog')
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP_BLOG_DIRS.has(d.name))
    .map((d) => d.name)
    .sort()
}

function buildUrlList() {
  const urls = new Set([
    `https://${HOST}/`,
    `https://${HOST}/blog/`,
  ])

  for (const slug of listHtmlBasenames('public/seo')) {
    urls.add(`https://${HOST}/seo/${slug}`)
  }
  for (const slug of listHtmlBasenames('public/no/seo')) {
    urls.add(`https://${HOST}/no/seo/${slug}`)
  }
  for (const slug of listBlogSlugs()) {
    urls.add(`https://${HOST}/blog/${slug}`)
  }

  return [...urls]
}

async function pingIndexNow(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  const text = await res.text().catch(() => '')
  return { status: res.status, ok: res.ok, body: text }
}

const urlList = buildUrlList()
console.log(`IndexNow: preparing ${urlList.length} URLs`)
console.log(`Key location: ${KEY_LOCATION}`)

const result = await pingIndexNow(urlList)
console.log(`HTTP ${result.status}${result.ok ? ' OK' : ' FAIL'}`)
if (result.body) console.log(result.body)

// 200 / 202 are success for IndexNow
if (result.status !== 200 && result.status !== 202) {
  process.exitCode = 1
} else {
  console.log('Submitted successfully.')
}
