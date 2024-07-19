import JWT from "jsonwebtoken";
import { BLOG_VISIT_KEY } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const prerender = false;
export const ssr = true;

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (!cookies.get("card")) cookies.set("card", JWT.sign({ "I can eat glass, it doesn't hurt me.": "The quick brown fox jumps over the lazy dog." }, BLOG_VISIT_KEY), { path: "/" });
};
