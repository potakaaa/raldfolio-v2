const CACHE_PREFIX = "helbi-nfc-root-"
const CACHE_NAME = `${CACHE_PREFIX}v1`
const ROOT_URL = "/"
const ROOT_SHELL = [
  ROOT_URL,
  "/manifest.json",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
]
const ROOT_ASSET_DESTINATIONS = new Set(["audio", "font", "image", "script", "style"])

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        ROOT_SHELL.map((url) =>
          fetch(url, { cache: "reload" }).then((response) => {
            if (response.ok) return cache.put(url, response)
          }),
        ),
      ),
    ),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

async function refreshRoot(request, cache) {
  try {
    const response = await fetch(request)
    if (response.ok) await cache.put(ROOT_URL, response.clone())
    return response
  } catch {
    return null
  }
}

async function serveRootNavigation(event) {
  const cache = await caches.open(CACHE_NAME)
  const cachedRoot = await cache.match(ROOT_URL)

  if (cachedRoot) {
    event.waitUntil(refreshRoot(event.request, cache))
    return cachedRoot
  }

  const networkResponse = await refreshRoot(event.request, cache)
  if (networkResponse) return networkResponse

  return new Response("The offline root page has not been cached yet. Visit / once while online.", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

async function isRootAssetRequest(request, cache) {
  if (!request.referrer) return false

  const referrer = new URL(request.referrer)
  if (referrer.origin !== self.location.origin) return false
  if (referrer.pathname === ROOT_URL) return true

  return Boolean(await cache.match(referrer.href))
}

async function serveRootAsset(request) {
  const cache = await caches.open(CACHE_NAME)
  const belongsToRoot = await isRootAssetRequest(request, cache)
  if (!belongsToRoot) return fetch(request)

  const cachedAsset = await cache.match(request)
  if (cachedAsset) return cachedAsset

  const response = await fetch(request)
  if (response.ok) await cache.put(request, response.clone())
  return response
}

self.addEventListener("fetch", (event) => {
  const request = event.request
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === "navigate") {
    if (url.pathname === ROOT_URL) event.respondWith(serveRootNavigation(event))
    return
  }

  if (ROOT_ASSET_DESTINATIONS.has(request.destination)) {
    event.respondWith(serveRootAsset(request))
  }
})
