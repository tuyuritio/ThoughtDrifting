<style>
	div {
		position: relative;
	}
</style>

<div class="markdown"><slot /></div>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/stackoverflow-light.min.css" />
</svelte:head>

<script lang="ts">
	import "./markdown.less";
</script>
