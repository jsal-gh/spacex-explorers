import { writable } from 'svelte/store';

export const songList = [
	{name: 'Bring him home', artist: 'Josh Groban', file: '.\\bringhimhome.mp3',
		section: [
      {type: 'Intro', 
        line: [{
          chords: "|  F  Bbadd9  |  Fmaj7  Bbadd9  |",
          lyrics: "", 
          start: 0, 
          end: 6
        },{
          chords: "|  F  Bbadd9  |  Fmaj7  Bbadd9  |",
          lyrics: "", 
          start: 6, 
          end: 11          
        }]},
      {type: 'Verse', 
      line: [{
        chords: "       F    Bb Fmaj7 Bb        F      Bb Fmaj7", 
        lyrics: "God on high,         hear  my  prayer", 
        start: 11, 
        end: 24
      },
      {
        chords: "Bb    Am  Gm         C                 C7", 
        lyrics: "In my need  you have always been there", 
        start: 24, 
        end: 35
      },
      {
        chords: "      F     Gm7/F Fmaj7 Bb/F    F    Gm7/F Fmaj7", 
        lyrics: "He is young,            he's afraid", 
        start: 35, 
        end: 48
      },
      {
        chords: "Bb/F     A  A7         Dm      Dm/C  Bbadd9", 
        lyrics: "Let him rest, heaven blessed.", 
        start: 48, 
        end: 59
      }]},
      {type: 'Chorus', 
      line: [{
        chords: "F/A        Bb  Bb/A            Gm  C7            F", 
        lyrics: "Bring him home,     bring him home,   bring him home.", 
        start: 59, 
        end: 72
      }]},
      {type: 'Bridge', 
      line: [{
        chords: "Am                                 Gm", 
        lyrics: "  He's like the son I might have known,", 
        start: 72, 
        end: 75
      },
      {
        chords: "Dm                         C", 
        lyrics: "  If God had granted me a son.", 
        start: 75, 
        end: 79
      },
      {
        chords: "             Bb       F/A                   Bb", 
        lyrics: "The summers die one by one, how soon they fly", 
        start: 79, 
        end: 88
      },
      {
        chords: "       F/A          Gm                A   C", 
        lyrics: "On and on, and I am old, and will be gone.", 
        start: 88, 
        end: 100
      }]},
      {type: 'Outro', 
      line: [{
        chords: "C Am F G7", 
        lyrics: "Great lyrics content goes here", 
        start: 80, 
        end: 85
      },
      {
        chords: "C Am F G7", 
        lyrics: "Great lyrics content goes here", 
        start: 85, 
        end: 90
      },
      {
        chords: "C Am F G7", 
        lyrics: "Great lyrics content goes here", 
        start: 90, 
        end: 95
      }]}
    ]
  }  
]    