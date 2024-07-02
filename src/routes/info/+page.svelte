<style lang="less">
	main {
		display: flex;

		> ul {
			margin: 35px 10px;

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

					font-family: "PT Mono";

					top: -18px;
					left: 20px;
				}

				ul {
					padding: 10px 30px 20px;

					li {
						position: relative;
					}
				}
			}
		}
	}
</style>

<main>
	<ul>
		{#each data.chronicle as day}
			<li>
				<span>{day.date}</span>
				<ul>
					{#each day.event as event}
						<li>{event}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</main>

<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>
