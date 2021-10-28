<svelte:head>
	<title>SpaceX Explorers</title>
</svelte:head>

<div class="m-8 space-x-2 text-lg">
	<h1 class="text-4xl mb-8">Welcome to SvelteKit</h1>
</div>
<div class="m-8 space-x-2">
	<p>
		Visit <a class="link" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
</div>
<div class="m-8 space-x-2">
	<a class="btn" href="/">Hello!</a>
</div>
<div class="m-8 space-x-2">
	<input type="checkbox" class="checkbox" />
</div>
<div class="m-8 space-x-2">
	<input type="checkbox" class="toggle" />
</div>
<div class="m-4 space-x-2">
	<!-- tab -->
	<div class="m-4 tabs">
		<button class="tab tab-lifted">Tab 1</button>
		<button class="tab tab-lifted tab-active">Tab 2</button>
		<button class="tab tab-lifted">Tab 3</button>
	</div>
</div>

<div class="flex flex-col m-4 lg:flex-row">
	<div class="card shadow-2xl w-80 m-4">
		<figure>
			<img src="https://picsum.photos/id/1005/500/250" alt="card" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">DaisyUI Card</h2>
			<p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
		</div>
	</div>
	<div class="divider lg:divider-vertical" />
	<div class="card shadow-2xl w-80 m-4">
		<figure>
			<img src="https://picsum.photos/id/1005/500/250" alt="card" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">DaisyUI Card</h2>
			<p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
		</div>
	</div>
	<div class="divider lg:divider-vertical" />
	<div class="card shadow-2xl w-80 m-4">
		<figure>
			<img src="https://picsum.photos/id/1005/500/250" alt="card" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">DaisyUI Card</h2>
			<p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
		</div>
	</div>
	<div class="divider lg:divider-vertical" />
	<div class="card shadow-2xl w-80 m-4">
		<figure>
			<img src="https://picsum.photos/id/1005/500/250" alt="card" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">DaisyUI Card</h2>
			<p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
		</div>
	</div>
</div>

<div class="card mockup-code w-80 m-8">
	<pre data-prefix="$">
      <code>npm i daisyui</code>
    </pre>
	<pre data-prefix=">" class="text-warning">
      <code>installing...</code>
    </pre>
	<pre data-prefix=">" class="text-success">
      <code>Done!</code>
    </pre>
</div>
