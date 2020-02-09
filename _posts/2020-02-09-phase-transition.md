---
title:  "Phase Transition demo"
---

## Phase Transition

Use your mouse to create and influence the particles. There are four modes of interaction: creating, spraying, pushing and heating, each of which can be activated with keys c, s, p and h respectively. Once in a mode, this action can be carried out on particles by holding the left mouse button. Right mouse button does the opposite of the activated mode's function. Range of influence can be altered with mouse wheel.

The number of particles, average velocity, and average temperature (inside the range of influence) are displayed in the upper left corner of display.

Currently, the demo only uses a single core due to compatibility reasons with most browsers. Performance suffers. 

<canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>
<script type='text/javascript'>
    var Module = {
        canvas: (function() { return document.getElementById('canvas'); })()
    };
</script>
<script src="/assets/PhaseTransition.js"></script>

Source code [here](https://github.com/kongaskristjan/PhaseTransition).
