import JWT from "jsonwebtoken";
import { type Handle } from '@sveltejs/kit';
import { BLOG_VISIT_KEY } from "$env/static/private";
import Mongo from '$lib/server/mongo';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	const headers = event.request.headers;

	if (!cookies.get("blogin")) {
		let payload: any;

		try {
			payload = JWT.verify(cookies.get("guest") ?? "", BLOG_VISIT_KEY);
		} catch (_) {
			cookies.delete("guest", { path: "/" });

			payload = {
				ID: new Array(16).fill(null).map(_ => characters.charAt(Math.floor(Math.random() * characters.length))).join(""),
				view: {}
			};
		} finally {
			let now = new Date().getTime();
			payload.view = Object.fromEntries(Object.entries(payload.view).filter(([_, expire]) => <number>expire > now));

			let request = `${event.request.method} ${event.url.pathname}${event.url.search}`;
			if (!payload.view[request]) {
				Mongo.visit.insertOne({ ID: payload.ID, IP: headers.get("X-Real-IP") ?? event.getClientAddress(), agent: headers.get("User-Agent"), time: now, request });
				payload.view[request] = new Date().getTime() + 1000 * 5;
			}

			event.cookies.set("guest", JWT.sign(payload, BLOG_VISIT_KEY), { path: "/", maxAge: 60 * 60 * 24 * 365 });
		}
	}

	const response = await resolve(event);
	return response;
};
