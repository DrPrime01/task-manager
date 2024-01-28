import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "null",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
			manifest: {
				name: "Task Manager",
				short_name: "TaskManager",
				description: "An app for managing your tasks.",
				start_url: "/",
				display: "standalone",
				background_color: "#475569",
				theme_color: "#0f172a",
				orientation: "portrait-primary",
				icons: [
					{
						src: "/images/icon-72.svg",
						type: "image/svg",
						sizes: "72x72",
					},
					{
						src: "/images/icon-96.svg",
						type: "image/svg",
						sizes: "96x96",
					},
					{
						src: "/images/icon-128.svg",
						type: "image/svg",
						sizes: "128x128",
					},
					{
						src: "/images/icon-144.svg",
						type: "image/svg",
						sizes: "144x144",
					},
					{
						src: "/images/icon-152.svg",
						type: "image/svg",
						sizes: "152x152",
					},
					{
						src: "/images/icon-192.svg",
						type: "image/svg",
						sizes: "192x192",
					},
					{
						src: "/images/icon-384.svg",
						type: "image/svg",
						sizes: "384x384",
					},
					{
						src: "/images/icon-512.svg",
						type: "image/svg",
						sizes: "512x512",
					},
				],
			},
		}),
	],
});
