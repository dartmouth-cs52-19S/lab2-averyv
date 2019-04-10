# CS52 Lab 2 - Build a Buzzfeed® Quiz Site!
## Avery Vanacore

#### Description:

For Lab 2, I built a Buzzfeed® quiz that tells you which episode of the office you should watch, based on your answers to questions that determine your mood, favorite character, and what kind of setting/objects you may be looking to see.  Each answer maps to one of 6 episodes and the episode that is linked to the highest number of chosen answers wins.  I originally wrote my quiz using purely HTML (pushed to Repo with tag v1), then optimized the process so that the HTML file only includes the basic structure of the quiz, and the remaining structure and content is read in from a JSON file and appended using JavaScript.  

__What worked__:

I was able to complete both options of the Choose Your Own Adventure section (the JSON file and the more advanced CSS).  

__What didn't work__:

I wanted to use merely flex boxes for the question container rather than dividing the questions into two rows, but I was not able to fine-tune that.  I also wanted to give my modal more advanced animations, but ended up having a relatively basic animation where the modal enters from the top.

### Special Elements & Screen Caps:

1. When you hover over any of the potential answers, it appears to shake and gets a pink shadow. 
	1. For text answers, the text increases in size on hover.
	2. For image answers, the image zooms in on hover.

2. When you click on any of the image answers, the chosen image zooms in (holds onto the zoom from hover), and the rest of the images fade.
3. When you click on any of the text answers, the chosen text holds onto the increased size from hover, and the rest return to the original, smaller size.  The chosen text obtains a red text shadow.
4. When you hover over the submit button at the end of the quiz (says "Tell me what to watch!"), the size of the text and the size of the box increase.  The text continuously changes colors.
5. The modal that appears when you click the submit button appears to slide down from the top of the screen.
6. If you have chosen an answer for all the available questions and clicked the submit button, the modal that appears will have a button that says "Take quiz again."  On hover, the size of the text and the button will grow and the text color will continuously change colors (like the submit box).  When you click this box, your answers will be cleared so that you can retake the quiz.

### JS Script Placement Question

I answered the extra credit question, _why might it be better for this to be placed at the bottom rather than in <head> ... </head>?_ in the file `Positioning of JS - Extra Credit`.