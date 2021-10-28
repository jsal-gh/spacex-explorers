<script>
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div>
	<Header>
		<main class="mx-auto max-w-3xl">
			<slot />
		</main>
	</Header>

</div>

<slot />

<Footer />