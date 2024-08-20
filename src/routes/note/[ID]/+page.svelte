<style lang="less">
	main {
		display: flex;
		justify-content: center;

		width: 100%;
		max-width: 1500px;
		height: calc(100vh - 100px);

		margin: 0px auto;

		div {
			flex-grow: 1;
			padding-right: 10px;

			overflow-y: auto;
			scroll-behavior: smooth;
		}

		aside {
			display: flex;
			flex-direction: column;

			flex-shrink: 0;
			max-width: 250px;

			margin-left: 20px;
			padding-right: 10px;

			h3 {
				margin: 15px 0px;
			}

			dl {
				display: flex;
				align-items: center;

				margin-bottom: 10px;

				dt {
					margin-right: 10px;
				}

				dd {
					font-size: 0.8em;
					line-height: normal;
				}
			}

			q {
				quotes: none;
				overflow-y: auto;
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
	<aside>
		<h3>属性</h3>

		<dl>
			<dt><Icon name="calendar" /></dt>
			<dd title={Time.full(data.timestamp, Time.user_timezone)}>{Time(data.timestamp)}</dd>
		</dl>

		{#if data.series}
			<dl>
				<dt><Icon name="repo" /></dt>
				<dd>{data.series}</dd>
			</dl>
		{/if}

		{#if data.tags.length}
			<dl>
				<dt><Icon name="tag" /></dt>
				<dd>{data.tags.join("; ")}</dd>
			</dl>
		{/if}

		{#if data.contents}
			<h3>目次</h3>
			<q>{@html data.contents}</q>
		{/if}
	</aside>
</main>

<svelte:head>
	<title>記緒漂流 | {data.title}</title>
</svelte:head>

<script lang="ts">
	import Icon from "$lib/icon.svelte";
	import Markdown from "$lib/markdown/markdown.svelte";
	import Time from "$lib/time";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>
