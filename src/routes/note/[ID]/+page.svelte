<style lang="less">
	main {
		display: flex;
		justify-content: center;

		width: 100%;
		max-width: 1500px;
		height: calc(100vh - 150px);

		margin: 0px auto;

		div {
			flex-grow: 1;
			padding-right: 10px;

			overflow-y: auto;
			scroll-behavior: smooth;
		}

		aside {
			flex-shrink: 0;
			max-width: 250px;

			margin-left: 20px;
			padding-right: 10px;

			overflow-y: auto;

			h3 {
				margin-bottom: 10px;
			}

			q {
				quotes: none;
			}
		}
	}

	@media screen and (max-width: @responsive) {
		main {
			height: calc(100vh - 100px);

			aside {
				display: none;
			}
		}
	}
</style>

<main>
	<div><Markdown>{@html data.content}</Markdown></div>
	{#if data.contents}
		<aside>
			<h3>目次</h3>
			<q>{@html data.contents}</q>
		</aside>
	{/if}
</main>

<svelte:head>
	<title>記緒計画 | {data.title}</title>
</svelte:head>

<script lang="ts">
	import Markdown from "$lib/markdown/markdown.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>
