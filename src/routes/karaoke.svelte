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

<div class="flex-no-wrap bg-gradient-to-br from-blue-500 to-green-400 pb-24">
	<div class="p-2 ml-2 text-8xl">Azzurro</div>
	<div class="p-2 ml-2 mb-2 text-2xl">Adriano Celentano</div>

	<audio controls src=".\bringhimhome.mp3" bind:currentTime />
	<div class="flex flex-wrap font-mono text-8xl p-4 m-4 mt-12">
		{#if currentTime >= 0 && currentTime < 5}
			<div class="mr-4">
				<div class="text-yellow-400">Cm</div>
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
		{#if currentTime >= 5 && currentTime < 10}
			Lei è partita per le spiagge e sono solo quaggiù in città
		{/if}
		{#if currentTime >= 10 && currentTime < 15}
			sento volare sopra i tetti un aeroplano che se ne va
		{/if}
	</div>
</div>

<style>
</style>
