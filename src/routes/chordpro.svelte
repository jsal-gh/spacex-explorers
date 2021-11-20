<script>
	/*
	 * Copyright (c) 2014-16 Greg Schoppe <gschoppe@gmail.com>
	 * Copyright (c) 2011 Jonathan Perkin <jonathan@perkin.org.uk>
	 *
	 * Permission to use, copy, modify, and distribute this software for any
	 * purpose with or without fee is hereby granted, provided that the above
	 * copyright notice and this permission notice appear in all copies.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 */

	let transposeLevel = 0;
	let transpose = false;
	let chorusDeco = '';
	let html = '';
	let chord = '';
	let i = 0;
	let inputText = `{title: Azzurro}
{subtitle: Adriano Celentano}
{comment: Awesome conversion modified by Giovanni}

[Cm].... [G7].... [Cm].... [G7]....
[Cm]Cerco l'e[G7]state tutto l'[Cm]anno[G7] e all'improv[Cm]viso[G7] eccola [Cm]qua
[Fm]Lei è par[C7]tita per le [Fm]spiagge[C7] e sono [Fm]solo[C7] quaggiù in [Fm]città
[C]sento vo[G7]lare sopra i [Em7]tetti[A7] un aero[D7]plano[G7] che se ne [C]va [G7]

{soc}
Az[C]zurro, il pomeriggio è troppo azzur[D7]ro e [G7]lungo, per [Dm7]me[G7]
mi accorgo di non a[C]vere più ri[G7]sorse [C]senza[G7] di [C]te [C7]
e al[F]lora io quasi [Em]quasi prendo il [Am]treno e [F]vengo[A7] vengo da [D7]te[G7]
Ma il [C]treno[C/Bb] dei desi[Am]deri[Fm] nei miei pen[C]sieri all'incon[F]tra[G7]rio [C]va
{eoc}

Cerco un po' d'Africa in giardino, tra l'oleandro e il baobab
come facevo da bambino, ma qui c'è gente, non si può più
stanno innaffiando le tue rose, non c'è il leone, chissà dov'è

{soc}
Azzurro, il pomeriggio è troppo azzurro e lungo, per me
mi accorgo di non avere più risorse senza di te
e allora io quasi quasi prendo il treno e vengo vengo da te
Ma il treno dei desideri nei miei pensieri all'incontrario va
{eoc}

Sembra quand'ero all'oratorio, con tanto sole, tanti anni fa
Quelle domeniche da solo in un cortile, a passeggiar,
Ora mi annoio più di allora, neanche un prete per chiacchierar.

{soc}
Azzurro, il pomeriggio è troppo azzurro e lungo, per me
mi accorgo di non avere più risorse senza di te
e allora io quasi quasi prendo il treno e vengo vengo da te
Ma il treno dei desideri nei miei pensieri all'incontrario va
{eoc}`;

	$: if (transposeLevel == 0) {
		transpose = false;
	} else {
		transpose = transposeLevel;
	}
	$: html = parseChordPro(inputText, transpose);
	// $: console.log(html);

	function transposeDown() {
		if (transposeLevel > -11) {
			transposeLevel--;
		}
	}
	function transposeUp() {
		if (transposeLevel < 11) {
			transposeLevel++;
		}
	}

	/* Parse a ChordPro template */
	function parseChordPro(template, transpose) {
		var chordregex = /\[([^\]]*)\]/;
		var inword = /[a-z]$/;
		var buffer = [];
		var chords = [];
		var last_was_lyric = false;
		var transpose_chord = function (chord, trans) {
			var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
			if (transpose < 0) {
				var notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
			}
			var regex = /([A-Z][b#]?)/g;
			var modulo = function (n, m) {
				return ((n % m) + m) % m;
			};
			return chord.replace(regex, function ($1) {
				if ($1.length > 1 && $1[1] == 'b') {
					if ($1[0] == 'A') {
						$1 = 'G#';
					} else {
						$1 = String.fromCharCode($1[0].charCodeAt() - 1) + '#';
					}
				}
				var index = notes.indexOf($1);
				if (index != -1) {
					index = modulo(index + trans, notes.length);
					return notes[index];
				}
				return 'XX';
			});
		};
		if (!template) return '';

		template.split('\n').forEach(function (line, linenum) {
			// console.log(linenum, line);
			/* Comment, ignore */
			if (line.match(/^#/)) {
				return '';
			}
			// Check for chorus
			if (line == '{soc}' || text == 'start_of_chorus') {
				chorusDeco = '|' + '&nbsp;' + '&nbsp;' + '&nbsp;';
				buffer.push(
					'</div><br/><span class="text-yellow-500 text-xl font-mono font-semibold">CHORUS</span><br/>'
				);
				buffer.push('<div class="chorus_block">');
				return;
			}
			if (line == '{eoc}' || text == 'end_of_chorus') {
				chorusDeco = '';
				buffer.push('</div><br/>');
				buffer.push('<div class="lyric_block">');
				return;
			}
			/* Chord line */
			if (line.match(chordregex)) {
				if (!buffer.length) {
					buffer.push('<div class="lyric_block">');
					last_was_lyric = true;
				} else if (!last_was_lyric) {
					buffer.push('</div>\n<div class="lyric_block">');
					last_was_lyric = true;
				}
				var chords = '';
				var lyrics = '';
				var chordlen = 0;
				line.split(chordregex).forEach(function (word, pos) {
					var dash = 0;
					/* Lyrics */
					if (pos % 2 == 0) {
						lyrics = lyrics + word.replace(' ', '&nbsp;');
						/*
						 * Whether or not to add a dash (within a word)
						 */
						if (word.match(inword)) {
							dash = 1;
						}
						/*
						 * Apply padding.  We never want two chords directly adjacent,
						 * so unconditionally add an extra space.
						 */
						if (word && word.length < chordlen) {
							chords = chords + '&nbsp;';
							lyrics = dash == 1 ? lyrics + '-&nbsp;' : lyrics + '&nbsp&nbsp;';
							for (i = chordlen - word.length - dash; i != 0; i--) {
								lyrics = lyrics + '&nbsp;';
							}
						} else if (word && word.length == chordlen) {
							chords = chords + '&nbsp;';
							lyrics = dash == 1 ? lyrics + '-' : lyrics + '&nbsp;';
						} else if (word && word.length > chordlen) {
							for (i = word.length - chordlen; i != 0; i--) {
								chords = chords + '&nbsp;';
							}
						}
					} else {
						/* Chords */
						chord = word.replace(/[[]]/, '');
						if (transpose !== false) {
							chord = transpose_chord(chord, transpose);
						}
						chordlen = chord.length;
						chords =
							chords + '<span class="chord" data-original-val="' + chord + '">' + chord + '</span>';
					}
				}, this);
				buffer.push(
					'<span class="line text-xl font-mono"><span class="text-yellow-500 font-semibold">' +
						chorusDeco + chords +
						'</span><br/>\n<span class="text-yellow-500 font-semibold">' +
						chorusDeco + '</span>' + lyrics + '</span><br/>'
				);
				return;
			}
			/* Commands, ignored for now */
			if (line.match(/^{.*}/)) {
				if (!buffer.length) {
					buffer.push('<div class="command_block">');
					last_was_lyric = false;
				} else if (last_was_lyric) {
					buffer.push('</div><div class="command_block">');
					last_was_lyric = false;
				}
				//ADD COMMAND PARSING HERE
				//reference: http://tenbyten.com/software/songsgen/help/HtmlHelp/files_reference.htm
				// implement basic formatted text commands
				var matches = line.match(/^{(title|t|subtitle|st|comment|c):\s*(.*)}/, 'i');
				if (matches.length >= 3) {
					var command = matches[1];
					var text = matches[2];
					var wrap = '';
					//add more non-wrapping commands with this switch
					switch (command) {
						case 'title':
						case 't':
							command = 'title';
							wrap = 'text-4xl text-yellow-500';
							break;
						case 'subtitle':
						case 'st':
							command = 'subtitle';
							wrap = 'text-xl italic';
							break;
						case 'comment':
						case 'c':
							command = 'comment';
							wrap = 'text-xl';
							break;
					}
					if (wrap) {
						buffer.push('<div class="' + wrap + '">' + text + '</div>');
					}
				}
				// work from here to add wrapping commands
				return;
			}
			/* Anything else - ie. no chords, just text */
			buffer.push('<div class="text-xl font-mono"><span class="text-yellow-500">' + chorusDeco + "</span>" + '</div>');
			buffer.push('<div class="text-xl font-mono"><span class="text-yellow-500">' + chorusDeco + "</span>" + line + '</div>');
		}, this);
		buffer.push('</div>');
		return buffer.join('\n');
	}
</script>

<h1 class="m-8">ChordPro Rendering Engine</h1>

<div class="flex-row">
	<div class="flex">
		<container class="m-8">
			<span class="label-text"><h2>Enter your ChordPro Markup Below:</h2></span>
			<p>&nbsp;</p>
			<textarea
				class="textarea h-96 textarea-bordered textarea-primary text-xl"
				placeholder="Paste ChordPro text here..."
				bind:value={inputText}
			/>
			<div>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<span class="label-text"><h2>Transpose?</h2></span>
				<p>&nbsp;</p>
				<div class="transpose">
					<button class="btn btn" align-middle on:click={transposeDown}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<span class="align-top text-4xl">
						{transposeLevel}
					</span>
					<button class="btn btn" align-middle on:click={transposeUp}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</container>

		<container class="m-8 flex-grow">
			<span class="label-text">
				<h2>Rendered target text:</h2>
			</span>
			<p>&nbsp;</p>
			<div class="textarea textarea-bordered textarea-primary w-90 flex-grow">
				{@html html}
			</div>
		</container>
	</div>
</div>

<style>
	textarea {
		min-height: 175px;
		width: 900px;
	}
	h1 {
		color: #f40;
		font-size: 2rem;
	}
	h2 {
		color: #f40;
		font-size: 1.4rem;
	}
</style>
