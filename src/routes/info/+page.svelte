<style lang="less">
	main {
		display: flex;
		flex-direction: row;

		flex-grow: 1;
		height: calc(100vh - 150px);

		article {
			display: flex;
			flex-direction: column;

			margin-right: 25px;
			padding-right: 25px;

			overflow-y: auto;

			div {
				flex-grow: 0.5;

				margin-bottom: 50px;

				h1 {
					margin-bottom: 40px;

					font-size: 35px;
				}
			}
		}

		aside {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			width: 300px;
			flex-shrink: 0;

			margin-left: auto;

			> ul {
				margin-top: 35px;

				list-style: none;

				> li {
					position: relative;

					margin: 15px 0px;
					border-left: 2px solid @foreground;
					padding-left: 10px;

					&::before {
						content: "";
						position: absolute;

						top: -16px;
						left: -9.5px;

						width: 13px;
						height: 13px;

						border: 2px solid @foreground;
						border-radius: 50%;
					}

					&:first-child::after {
						content: "";
						position: absolute;

						top: -50px;
						left: -2px;

						height: 35px;

						border-left: 2px dashed @foreground;
					}

					&:last-child ul li:last-child::after {
						content: "";
						position: absolute;

						top: 30px;
						left: -49.5px;

						width: 13px;
						height: 13px;

						border: 2px solid @foreground;
						border-radius: 50%;

						background-color: @foreground;
					}

					span {
						position: absolute;

						font-family: @monospace;

						top: -15.5px;
						left: 20px;
					}

					ul {
						padding: 10px 0px 20px 30px;

						li {
							position: relative;

							margin-bottom: 10px;
						}
					}
				}
			}
		}
	}
</style>

<main>
	<article>
		<div>
			<h1>○○紹介</h1>
			<Markdown>{@html $page.data.introduction}</Markdown>
		</div>

		<div>
			<h1>○○声明</h1>
			<Markdown>{@html $page.data.claim}</Markdown>
		</div>
	</article>

	<aside>
		<ul>
			{#each $page.data.chronicle as day}
				<li>
					<span>{day.date}</span>
					<ul>
						{#each day.content as event}
							<li>{event}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</aside>
</main>

<script lang="ts">
	import { page } from "$app/stores";
	import Markdown from "$lib/markdown/markdown.svelte";
</script>
