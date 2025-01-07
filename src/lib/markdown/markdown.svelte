<style>
	div {
		position: relative;
	}
</style>

<div class="markdown">{@render children?.()}</div>

<script lang="ts">
	import type { Snippet } from "svelte";
	import "./markdown.less";
	import "./highlight.less";

	let { children }: { children?: Snippet } = $props();
</script>
