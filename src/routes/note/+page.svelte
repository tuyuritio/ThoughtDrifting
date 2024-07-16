<style lang="less">
	main {
		section {
			display: flex;
			flex-direction: row;
			align-items: center;

			margin-bottom: 15px;

			input {
				margin-left: 35px;
				border-bottom: 2px dashed @foreground;
				padding: 5px 0px;

				width: 300px;

				background: transparent;
				outline: none;

				font-family: @monospace;
			}
		}

		details {
			position: relative;

			margin-left: 10px;
			border-left: 2px solid @foreground;

			&:last-child {
				border-left: 2px solid transparent;

				&::before {
					content: "";
					position: absolute;

					top: 0px;
					left: -2px;

					border-left: 2px solid black;
					height: 25px;
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
					margin-top: 8px;

					font-family: @monospace;
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
	<section>
		<span><Icon name="search" size={20} /></span>
		<input type="text" placeholder="input.split(' ').match(/(?=#tag)/g)" on:input={event => filter(event)} />
	</section>

	{#each notes as note}
		<details>
			{#if typeof note.content == "string"}
				<summary><a href="/note/{note.content}">{note.title}</a><i>{Time.format(note.timestamp)}</i></summary>
			{:else}
				<summary><strong>{note.title}</strong><i>{Time.format(note.timestamp)}</i></summary>
				{#each note.content as subnote}
					<details>
						<summary><a href="/note/{subnote.content}">{subnote.title}</a><i>{Time.format(subnote.timestamp)}</i></summary>
					</details>
				{/each}
			{/if}
		</details>
	{/each}
</main>

<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "$lib/icon.svelte";
	import Time from "$lib/time";

	let notes: any[] = $page.data.notes;
	function filter(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const input = event.currentTarget.value;
		notes = $page.data.notes;

		let keywords = input.split(" ").filter(keyword => keyword.length > 0);
		for (const keyword of keywords) {
			if (keyword.startsWith("#")) {
				notes = notes.filter(note => note.tags.some((tag: string) => keyword == tag.replaceAll("#", "")));
			} else {
				notes = notes.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()));
			}
		}
	}
</script>
