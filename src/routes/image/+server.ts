import JWT from "jsonwebtoken";
import { redirect } from "@sveltejs/kit";
import { BLOG_VISIT_KEY } from "$env/static/private";
import Mongo from "$lib/server/mongo";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	let cookie = cookies.get("card");

	if (cookie && JWT.verify(cookie, BLOG_VISIT_KEY)) {
		let ID = url.searchParams.get("ID");

		let image = (await Mongo.image.findOne({ ID }))?.data.buffer;
		if (image) {
			return new Response(image);
		} else {
			return fetch("/image-lost.svg");
		}
	} else {
		let URL = await Mongo.profile.findOne({ key: "unauthorized" });
		redirect(302, URL?.value ?? "/image-lost.svg");
	}
};
