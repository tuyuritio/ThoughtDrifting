import Path from "path";
import FileSystem from "fs";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const html_path = "assets/note";
const meta_path = Path.join(html_path, "note-meta.json");

export const load: PageServerLoad = async ({ params }) => {
	let meta = JSON.parse(FileSystem.readFileSync(meta_path).toString());

	if (meta[params.ID]) {
		let ID = params.ID;
		let note;

		try {
			let html = FileSystem.readFileSync(Path.join(html_path, `${ID}.html`)).toString();
			let contents = html.match(/<nav class="table-of-contents">.*<\/nav>/m)?.[0];
			if (contents) html = html.replace(contents, "");

			note = {
				ID: params.ID,
				contents,
				content: html,
				...meta[ID]
			};
		} catch (_) {
			throw error(500, "Note lost");
		}

		return note;
	} else {
		throw error(404, "Note not found");
	}
};
