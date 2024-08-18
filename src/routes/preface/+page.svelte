<style lang="less">
	main {
		display: flex;
		flex-direction: column;

		height: calc(100vh - 100px);

		h1 {
			margin-bottom: 20px;
		}

		ul {
			list-style: none;
			overflow-y: auto;

			li {
				hr {
					margin: 50px 0px;
					border-bottom: 1px solid @foreground;
				}

				h2 {
					font-size: 20px;
					margin-bottom: 20px;
				}
			}
		}
	}

	@media screen and (max-width: @responsive) {
		main {
			height: calc(100vh - 100px);

			ul {
				li {
					hr {
						margin: 20px 0px;
					}
				}
			}
		}
	}
</style>

<main>
	<h1>序文歴史</h1>
	<ul>
		{#each $page.data.prefaces as preface}
			<li>
				<hr />
				<h2>{Time(preface.timestamp)}</h2>
				<Markdown>{@html preface.content}</Markdown>
			</li>
		{/each}
	</ul>
</main>

<script>
	import { page } from "$app/stores";
	import Markdown from "$lib/markdown/markdown.svelte";
	import Time from "$lib/time";
</script>
