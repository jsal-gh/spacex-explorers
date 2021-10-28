<script context="module">
	export async function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	export let error, status;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>Uh oh!</h1>
<p>The page you are seeking doesn't exist.</p>

<h2>{status}: {error.message}</h2>
