import FileSystem from "fs";
import Mongo from "$lib/server/mongo";
import type { PageServerLoad } from "./$types";
import { BLOG_ASSET_PATH } from "$env/static/private";
import { error } from "@sveltejs/kit";
import Time from "$lib/time";

export const load: PageServerLoad = async () => {
	let result = await Mongo.preface.find().project({ _id: 0, content: 0 }).toArray();

	result.forEach(preface => {
		try {
			preface.content = FileSystem.readFileSync(`${BLOG_ASSET_PATH}/preface/${preface.timestamp}.html`).toString();
		} catch (_) {
			throw error(500, `序文 ${Time.format(preface.timestamp, "date")} 失踪`);
		}
	});

	return { prefaces: result };
};
