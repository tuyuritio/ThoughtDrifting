import FileSystem from "fs";
import type { PageServerLoad } from "./$types";

const chronicle_path = "assets/chronicle.json"

export const load: PageServerLoad = async () => {
	let chronicle = JSON.parse(FileSystem.readFileSync(chronicle_path).toString());

	return { chronicle };
};
