<script lang="ts">
	let state = 'NEW';
	let startTime = 0;
	let elaspedTime = 0;
	let oldElapsedTime = 0;
	let interval;
	let currentTime = 0;

	const pad2 = (number) => `00${number}`.slice(-2);
	const pad3 = (number) => `000${number}`.slice(-3);

	$: hours = pad2(Math.floor(elaspedTime / 1000 / 60 / 60) % 60);
	$: minutes = pad2(Math.floor(elaspedTime / 1000 / 60) % 60);
	$: seconds = pad2(Math.floor(elaspedTime / 1000) % 60);
	$: millis = pad3(elaspedTime % 1000);
	$: formattedElaspedTime = `${hours}:${minutes}:${seconds}.${millis}`;

	const start = () => {
		startTime = Date.now();
		state = 'RUNNING';
		interval = setInterval(() => {
			if (state === 'RUNNING') {
				const endTime = Date.now();
				elaspedTime = endTime - startTime + oldElapsedTime;
			}
		});
	};

	const reset = () => {
		elaspedTime = 0;
		oldElapsedTime = 0;
		state = 'NEW';
		clearInterval(interval);
	};

	const pause = () => {
		state = 'PAUSED';
		oldElapsedTime = elaspedTime;
	};

	const resume = () => {
		startTime = Date.now();
		state = 'RUNNING';
	};
</script>

<div class="flex-no-wrap bg-gradient-to-br from-blue-500 to-purple-500 pb-32">
	<div class="flex">
		<div class="p-2 ml-2 text-8xl">Azzurro</div>
		<div class="justify-end">
			<div class="p-2 ml-2 mb-2 text-2xl">Adriano Celentano</div>
			<audio class="p-2 ml-2" controls src=".\bringhimhome.mp3" bind:currentTime />
		</div>
	</div>

	<!-- Chords and lyrics - main -->
	<div class="flex flex-wrap font-mono text-5xl p-4 ml-16 mt-12">
		{#if currentTime >= 0 && currentTime < 5}
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">1. Cm</div>
				<div>Cerco l'est</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">G7</div>
				<div>ate tutto l'</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">Cm</div>
				<div>anno&nbsp;</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">G7</div>
				<div>e all'improvv</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">Cm</div>
				<div>iso&nbsp;</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">G7</div>
				<div>eccola</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">Cm</div>
				<div>qua</div>
			</div>
			<div class="mr-4 mb-12 border">
				<div class="text-yellow-400">G7</div>
			</div>
		{/if}
		{#if currentTime >= 5 && currentTime < 10}
		<div class="mr-4 mb-16">
			<div class="text-yellow-400">2. Cm</div>
			<div>Cerco l'est</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>ate tutto l'</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>anno</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>e all'improvv</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>iso</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>eccola</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>qua</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
		</div>
	{/if}
		{#if currentTime >= 10 && currentTime < 15}
		<div class="mr-4 mb-16">
			<div class="text-yellow-400">3. Cm</div>
			<div>Cerco l'est</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>ate tutto l'</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>anno</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>e all'improvv</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>iso</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
			<div>eccola</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">Cm</div>
			<div>qua</div>
		</div>
		<div class="mr-4">
			<div class="text-yellow-400">G7</div>
		</div>
	{/if}
	</div>
</div>

<style>
</style>
