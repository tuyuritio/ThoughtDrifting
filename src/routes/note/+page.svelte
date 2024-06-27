<style lang="less">
	main {
		margin: 15px 0px 0px 100px;

		p {
			display: flex;
			flex-direction: row;
			align-items: center;

			margin-bottom: 15px;

			span {
				font-size: 30px;
				font-family: "maple";
			}

			input {
				margin-left: 35px;
				border-bottom: 2px dashed @foreground;
				padding: 5px 0px;

				width: 300px;

				background: transparent;
				outline: none;

				font-family: "maple";
			}
		}

		details {
			position: relative;

			margin-left: 10px;
			border-left: 2px solid @foreground;

			&:last-child {
				border-left: none;

				&::before {
					content: "";
					position: absolute;

					top: 0px;
					left: 0px;

					border-left: 2px solid black;
					height: 24px;
				}
			}

			summary {
				position: relative;
				list-style: none;

				padding: 10px 40px;

				&::before {
					content: "";
					position: absolute;

					top: 23px;
					left: 0px;

					border-bottom: 2px solid black;
					width: 15px;
				}

				&:not(:only-child) {
					cursor: pointer;
				}

				a:hover {
					border-bottom: 2px solid @foreground;
				}

				i {
					display: block;
					margin-top: 5px;

					font-family: "maple";
					font-size: 10px;
					font-style: normal;
					color: @remark;
				}
			}

			> details {
				margin-left: 45px;
			}
		}
	}
</style>

<main>
	<p><span></span><input type="text" placeholder="input.split(' ').match(/(?=#tag)/g)" /></p>
	{#each notes as note}
		<details>
			{#if typeof note.content == "string"}
				<summary><a href="/note/{note.content}">{note.title}</a><i>{Time.format(note.timestamp)}</i></summary>
			{:else}
				<summary><strong>{note.title}</strong><i>{Time.format(note.timestamp)}</i></summary>
				{#each note.content as subnote}
					<details>
						<summary><a href="/note/{subnote.content}">{subnote.title}</a><i>{Time.format(subnote.timestamp, "date")}</i></summary>
					</details>
				{/each}
			{/if}
		</details>
	{/each}
</main>

<script lang="ts">
	import Time from "$lib/time";

	type Note = {
		title: string;
		timestamp: number;
		content: string | Note[];
	};

	let notes: Note[] = [];
</script>
