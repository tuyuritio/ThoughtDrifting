import { createRequire } from "module";
import MarkdownIt from "markdown-it";

const require = createRequire(import.meta.url);
const Markdown = new MarkdownIt({ html: true, typographer: true, linkify: true })
	.use(require("markdown-it-sub"))
	.use(require("markdown-it-sup"))
	.use(require("markdown-it-ins"))
	.use(require("markdown-it-mark"))
	.use(require("markdown-it-task-lists"))
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-katex"))
	.use(require("furigana-markdown-it"))
	.use(require("markdown-it-emoji").full)
	.use(require("markdown-it-anchor"))
	.use(require("markdown-it-multimd-table"))
	.use(require("markdown-it-highlightjs"))
	.use(require("markdown-it-github-alerts"))
	.use(require("markdown-it-imsize"));

export function render(markdown: string) {
	return Markdown.render(markdown);
}
