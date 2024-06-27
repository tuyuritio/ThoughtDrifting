import FileSystem from "fs";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	let meta = JSON.parse(FileSystem.readFileSync("assets/note/note-meta.json").toString());

	if (meta[params.ID]) {
		let path = `assets/note/${params.ID}.md`;
		if (FileSystem.existsSync(path)) {
			let markdown = FileSystem.readFileSync(`assets/note/${params.ID}.md`).toString();
			// console.log(markdown);
		} else {
			throw error(503, "Note lost");
		}

	} else {
		throw error(404, "Note not found");
	}

	return { hash: params.ID, content: "1" };
};
