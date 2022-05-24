<script>
	import { onMount } from 'svelte';
	import { songList } from '../songList.js';
	import { crossfade } from 'svelte/transition';
	let currentTime = 0;
	let songIndex = 0;
	let audioFile = songList[songIndex].file;
	let songTitle = songList[songIndex].name;
	let songArtist = songList[songIndex].artist;
	let currentOffset = 0;

	const replaceSpaces = (string) => {
		let fixedString = string.replaceAll(' ', '.');
		return fixedString;
	};
	const offset = (start, end) => {
		currentOffset = end - start;
		return '';
	};
	// notes
	// <h1 class="text-5xl p-2 m-2 text-neutral">{section.type} - [{line.start}-{line.end}] [{songIndex}:{sectionId}:{lineId}]</h1>
	// crossfade:slide="{{duration: 500 }}"
</script>

<p class="text-6xl p-2 m-2">{songTitle}</p>
<p class="text-sm pl-2 ml-2">{songArtist}</p>
<p class="text-sm pl-2 ml-2">{audioFile}</p>

<audio class="p-2 ml-2" controls src={audioFile} bind:currentTime />

<div class="flex flex-col text-6xl font-mono">
	<div class="bg-blue-500 p-4 m-4">
		{#each songList[songIndex].section as section, sectionId}
			{#each section.line as line, lineId}
            {#if currentTime + 0.6 + currentOffset >= line.start && currentTime + 0.6 < line.end}
            <div>{section.type}</div>
					<div class="glass h-48" crossfade:slide={{ duration: 500 }}>
					<pre>
						<p class="ml-8 mt-6 pt-6 pl-4 text-yellow-500">{line.chords}</p>
                    </pre>
					<pre>
						<p class="ml-8 mb-4 pb-4 pl-4" crossfade:slide="{{duration: 500 }}">{line.lyrics}{offset(line.start, line.end)}</p>
                    </pre>
					</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style>
	.glass {
		background: rgba(255, 235, 233, 0.15);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(5px);
		border-radius: 10px;
	}
</style>
