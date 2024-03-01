// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import {
	getFirestore,
	persistentSingleTabManager,
	initializeFirestore,
	persistentLocalCache,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
	localCache: persistentLocalCache(
		/*settings*/ { tabManager: persistentSingleTabManager() }
	),
});
const messaging = getMessaging(app);
export async function getTokenForPushNotifications() {
	try {
		const token = await getToken(messaging, {
			vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
		});
		console.log("Firebase Token for Push Notifications:", token);
		return token;
	} catch (error) {
		console.error("Error getting token for push notifications:", error);
		return null;
	}
}
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
