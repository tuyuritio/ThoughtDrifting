import FileSystem from "fs";
import { error } from "@sveltejs/kit";
import { BLOG_ASSET_PATH } from "$env/static/private";
import Mongo from "$lib/server/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
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

		return note;
	} catch (_) {
		throw error(500, "文記失踪");
	}
};
