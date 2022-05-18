<script>
	import { each, text } from 'svelte/internal';
import About from './about.svelte';

	let files;
	let lines = [];
	async function readFiles() {
		var file = this.files[0];
 		var reader = new FileReader();
  		reader.onload = function(progressEvent){
			lines = this.result.split('\n');
  		};
  		reader.readAsText(file);
	}

</script>

<input type="file" bind:files on:change={readFiles}/>


{#each lines as line, i}
	<div>
		{i + ' ' + line}
	</div>
{/each}

<br>
<br>


<!-- {JSON.stringify(object, null, 2)} -->