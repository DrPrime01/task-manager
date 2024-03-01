const staticCacheName = "site-static-v12";
const dynamicCacheName = "site-dynamic-v10";
const assets = [
	"/",
	"/index.html",
	"/src/index.css",
	"/src/main.jsx",
	"/src/App.jsx",
	"/tailwind.config.js",
];

// Function to limit the cache size by removing the oldest entries
function limitCacheSize(cacheName, size) {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > size) {
				cache.delete(keys[0]).then(() => limitCacheSize(cacheName, size));
			}
		});
	});
}

// Install event - caches the static assets
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(staticCacheName).then((cache) => cache.addAll(assets))
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter(
							(key) => key !== staticCacheName && key !== dynamicCacheName
						)
						.map((key) => caches.delete(key))
				)
			)
	);
});

// Fetch event - serve from cache or fetch from network and update cache
self.addEventListener("fetch", (e) => {
	if (e.request.url.indexOf("firestore.googleapis.com") === -1) {
		e.respondWith(
			caches.match(e.request).then((cacheRes) => {
				return (
					cacheRes ||
					fetch(e.request).then(async (fetchRes) => {
						const cache = await caches.open(dynamicCacheName);
						cache.put(e.request.url, fetchRes.clone());
						limitCacheSize(dynamicCacheName, 20);
						return fetchRes;
					})
				);
			})
		);
	}
});

self.addEventListener("push", (event) => {
	const data = event.data.json();
	console.log("push", event);
	event.waitUntil(
		self.registration.showNotification(data.title, {
			body: data.body,
			icon: "/images/mask-icon.svg",
			// other options
		})
	);
});
