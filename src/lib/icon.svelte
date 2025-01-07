<style lang="less">
	i {
		position: relative;
		display: flex;

		top: 1.5px;
	}
</style>

<i>{@html icons[name].toSVG({ width: size })}</i>

<script lang="ts">
	import icons from "@primer/octicons";
	import "@primer/octicons/build/build.css";

	let { name, size = 16 }: { name: keyof typeof icons; size?: number } = $props();
</script>
