import convertVapidKey from "convert-vapid-public-key";

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("./firebase-messaging-sw.js", { scope: "/" })
			.then(() => {
				console.log("SW registered");
				// return navigator.serviceWorker.ready;
			})
			.catch(() => console.log("SW not registered. Error!"));
	});
}

if ("Notification" in window) {
	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			console.log("permission granted");
			// Permission granted, you can now subscribe to push notifications
			navigator.serviceWorker.ready.then(async (registration) => {
				// const token = await getTokenForPushNotifications();
				// console.log(token);
				registration.pushManager
					.subscribe({
						userVisibleOnly: true,
						applicationServerKey: convertVapidKey(
							import.meta.env.VITE_FIREBASE_VAPID_KEY
						),
					})
					.then((subscription) => {
						// Send the subscription object to your server
						console.log("Subscribed:", subscription);
					})
					.catch((error) => {
						console.error("Subscription failed:", error);
					});
			});
		}
	});
}
