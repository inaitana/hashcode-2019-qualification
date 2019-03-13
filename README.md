# hashcode-2019-qualification
Our solution for the Google Hash Code 2019 qualification round.

## Main algorithm
The code in the *main* branch is our 2019 hash code algorithm, which ranked 29th in the extended round.
It's basically the same we were working on during the official qualification round, with some tweaks and optimizations we couldn't come up during it, making it impossible for us to submit a working solution in time.

The algorithm works basically this way:
- Sort the slides by increasing tags length
- Put the first horizontal photo, or first two vertical photos, in the first slide, and add the first slide to the slideshow
- Until all photos have been used:
  - Search for the best "horizontal" slide:
    - Choose the horizontal photo which would score the highest score against the last slide in the slideshow
  - Search for the best "vertical" slide:
    - Choose the first vertical photo, the one which would score the highest score against the last slide in the slideshow
    - Choose the second vertical photo, the one which would score the highest score against the last slide in the slideshow when combined with the first one
  - Compare the best "horizontal" slide and the best "vertical" slide, add the one with the highest score to the slideshow

The total score for this algorithm is 1227875, and the execution times are acceptable for all inputs but E:

  A) Time: 827 ms - Score: 1
  
  B) Time: 14 min 28 sec 76 ms - Score: 224874
  
  C) Time: 1 sec 534 ms - Score: 1806
  
  D) Time: 4 min 34 sec 578 ms - Score: 440700 

  E) Time: 87 min 18 sec 939 ms - Score: 560494

## Two-steps E algorithm

The *stages-e* branch is a faster alternative for input E we came up with, which is basically:
1) Match up the 80k vertical slides in pairs, by finding for each photo the one which would combine in the slide with the highest tags number
2) Treat the slides as 40k horizontal photos and go on with the main algorithm

This algorithm takes 17 min 46 sec 591 ms for step 1, and 24 min 14 sec 569 ms for step 2, for a total execution time of 42 min 1 sec 160 ms, and a score of 412078.
By using this we could have scored 1079459 with a slightly better total execution time, but still bad.

## Conclusions

This execution times would probably still make it mostly impossible to file this solution in the official round.
There could probably be simpler and faster algorithms we didn't think of, since the first solution would have ranked us 1st in the qualification round, while still being quite plain and simple.

We are left wondering if we completely missed a faster algorithm, or if maybe we used the wrong tool in node.js, or just the weakest hardware.
