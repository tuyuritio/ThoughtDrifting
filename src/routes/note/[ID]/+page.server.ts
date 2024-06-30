import Path from "path";
import FileSystem from "fs";
import { error } from "@sveltejs/kit";
import { render } from "$lib/server/markdown";
import type { PageServerLoad } from "./$types";

const note_path = "assets/note";
const meta_path = Path.join(note_path, "note-meta.json");

export const load: PageServerLoad = async ({ params }) => {
	let meta = JSON.parse(FileSystem.readFileSync(meta_path).toString());

	if (meta[params.ID]) {
		let ID = params.ID;
		let note;

		try {
			let markdown = FileSystem.readFileSync(Path.join(note_path, `${ID}.md`)).toString();

			note = {
				ID: params.ID,
				content: render(markdown),
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
