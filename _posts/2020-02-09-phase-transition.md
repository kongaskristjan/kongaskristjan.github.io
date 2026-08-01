---
title: "Phase Transition demo"
description: >-
  A 2D particle simulator written in C++ and compiled to WebAssembly, where
  solid, liquid and gas-like states of matter emerge from the physics.
tags: [C++, WebAssembly, Simulation]
---

Nothing in this simulation knows what a liquid is. Particles simply attract and
repel each other, and the familiar states of matter — solid, liquid and gas —
emerge from that. Heat the particles up and they fly apart; cool them down and
they clump together.

The simulator is written in C++ and compiled to WebAssembly, so the physics
below runs in your browser. Grab it with the mouse:

<div class="demo">
  <canvas id="canvas" oncontextmenu="event.preventDefault()" aria-label="Interactive particle simulation"></canvas>
  <p class="demo__hint">
    <span><kbd>c</kbd> create &nbsp;<kbd>s</kbd> spray &nbsp;<kbd>p</kbd> push &nbsp;<kbd>h</kbd> heat</span>
    <span>Left button applies the mode, right button reverses it</span>
    <span>Mouse wheel resizes the range of influence</span>
  </p>
</div>

<script type="text/javascript">
    var Module = {
        canvas: (function() { return document.getElementById('canvas'); })()
    };
</script>
<script src="{{ '/assets/PhaseTransition.js' | relative_url }}"></script>

Use your mouse to create and influence the particles. There are four modes of
interaction: creating, spraying, pushing and heating, each of which can be
activated with keys `c`, `s`, `p` and `h` respectively. Once in a mode, this
action can be carried out on particles by holding the left mouse button. The
right mouse button does the opposite of the activated mode's function — so in
heating mode it cools the particles down, which is how you condense a gas into
a liquid.

The number of particles, average velocity, and average temperature (inside the
range of influence) are displayed in the upper left corner of the display.

Currently, the demo only uses a single core due to compatibility reasons with
most browsers. Performance suffers — the native build is considerably faster.

Source code is on [GitHub](https://github.com/kongaskristjan/PhaseTransition),
and there's a [video of the simulation](https://youtu.be/SFf3pcE08NM) running
natively, with rather more particles than a browser will tolerate.
