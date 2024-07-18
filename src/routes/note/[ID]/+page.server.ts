import FileSystem from "fs";
import JWT from "jsonwebtoken";
import { error } from "@sveltejs/kit";
import { BLOG_ASSET_PATH, BLOG_VISIT_KEY } from "$env/static/private";
import Mongo from "$lib/server/mongo";
import type { PageServerLoad } from "./$types";
import { randomBytes } from "crypto";

export const load: PageServerLoad = async ({ params, cookies }) => {
	const ID = params.ID;

	let result = await Mongo.note.findOne({ ID });
	if (!result) throw error(404, "文記不存在");

	try {
		let html = FileSystem.readFileSync(`${BLOG_ASSET_PATH}/note/${ID}.html`).toString();
		let contents = html.match(/<nav class="table-of-contents">.*<\/nav>/m)?.[0];
		if (contents) html = html.replace(contents, "");

		let note = {
			ID,
			title: result.title,
			timestamp: result.timestamp,
			tags: result.tags,
			series: result.series,
			content: html,
			contents
		};

		if (!cookies.get("card")) cookies.set("card", JWT.sign({ "I can eat glass, it doesn't hurt me.": "The quick brown fox jumps over the lazy dog." }, BLOG_VISIT_KEY), { path: "/image" });

		return note;
	} catch (_) {
		throw error(500, "文記失踪");
	}
};
