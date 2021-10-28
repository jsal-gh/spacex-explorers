<script context="module">
	export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/launches.json');
		if (res.ok) {
			const { launches } = await res.json();
			return {
				props: { launches }
			};
		}
	}
</script>

<script>
	export let launches;
</script>

<h1 class="text-4xl m-8">Welcome to SpaceX Explorers</h1>
<p class="text-xl mb-8 m-8">Bringing you a world of exploring truly out of this world!</p>

<ul>
	{#each launches as { slug, name, date }}
		<li
			class="border-neutral border my-5 p-5 transition hover:bg-neutral m-8"
		>
			<a sveltekit:prefetch href={`/mission/${slug}`}>
				<h2 class="text-3xl">{name}</h2>
				<time>{new Date(date)}</time>
			</a>
		</li>
        
	{/each}
</ul>
