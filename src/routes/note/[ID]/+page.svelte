<style lang="less">
	main {
		display: flex;
		justify-content: center;

		width: 100%;
		max-width: 1500px;
		height: calc(100vh - 210px); // 暂时想不到更好的办法

		margin: 0px auto;

		div {
			flex-grow: 1;
			padding: 0px 10px;

			overflow-y: auto;
		}

		aside {
			margin: 0px 20px;
			max-width: 250px;

			h3 {
				margin-bottom: 10px;
			}

			q {
				quotes: none;
			}
		}
	}
</style>

<main>
	<div bind:this={container}><Markdown>{@html data.content}</Markdown></div>
	{#if data.contents}
		<aside>
			<h3>目次</h3>
			<q bind:this={content} class="markdown">{@html data.contents}</q>
		</aside>
	{/if}
</main>

<script lang="ts">
	import Markdown from "$lib/markdown/markdown.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	let container: HTMLDivElement;
	let content: HTMLQuoteElement;
</script>
