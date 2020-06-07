/*
 * Main script for the Turmite Arena webapp, which simulates many turmites
 * on a large shared canvas.
 * 
 * Copyright (c) 2020 Komi Amiko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(turmites) {

  let flimit = Math.pow(2, 52);
  let i32limit = Math.pow(2, 32);

  /**
   * Utility function to remove all children of a DOM element
   */
  turmites.clearChildren = function(el) {
    while(el.lastElementChild) {
      el.removeChild(el.lastElementChild);
    }
  }

  /**
   * Utility function to get a radio button's selected value
   */
  turmites.getSelectedValue = function(name) {
    let options = document.getElementsByName(name);
    let result = undefined;
    for(let i = 0; i < options.length; ++i){
      if(options[i].checked) {
        result = options[i].value;
        break;
      }
    }
    return result;
  }

  /**
   * 32-bit left rotate
   */
  turmites.rotl32 = function(x, k) {
    return x << (31 & k) | x >>> (31 & -k);
  }

  /**
   * PRNG used by this app
   */
  turmites.PRandom = class PRandom {
    /**
     * constructs with the all 0 state (normally invalid, and intentional)
     */
    constructor() {
      this.s0 = this.s1 = this.s2 = this.s3 = 0;
    }
    /**
     * xoshiro128++ 1.0
     * adapted for js
     */
    getNext() {
      let s0 = this.s0, s1 = this.s1, s2 = this.s2, s3 = this.s3;
      let result = (turmites.rotl32(s0 + s3, 7) + s0) & -1;
      if(result < 0)result += 0x100000000;
      let t = s1 << 9;
      s2 ^= s0;
      s3 ^= s1;
      this.s1 = s1 ^ s2;
      this.s0 = s0 ^ s3;
      this.s2 = s2 ^ t;
      this.s3 = turmites.rotl32(s3, 11);
      return result;
    }
    getNextInt(n) {
      if((n & -n) === n)return this.getNext() & (n - 1);
      let raw = this.getNext();
      let res = raw % n;
      while(raw - res + n - 1 >= 0x100000000) {
        raw = this.getNext();
        res = raw % n;
      }
      return res;
    }
    /**
     * wonky seeding which is radically different from the PRNG
     */
    init(seed) {
      seed = seed.toString();
      let x = [4, 6, 9, 10, 14, 15, 21, 22];
      for(let i = 0; i < seed.length; ++i) {
        x[0] += seed.charCodeAt(i);
        for(let j = 0; j < 8; j += 2) {
          x[j] = turmites.rotl32(x[j] * 25, x[j|1]);
        }
        for(let j = 1; j < 8; ++j) {
          x[j] += x[j-1];
          x[j] ^= x[j] >> 10;
        }
        x[0] ^= x[7];
      }
      for(let i = 0; i < 8; ++i) {
        for(let j = 1; j < 8; ++j) {
          x[j] ^= x[j-1];
          x[j] *= 77;
          x[j] ^= x[j] >> 9;
        }
        x[0] ^= x[7];
      }
      this.s0 = x[0];
      this.s1 = x[1];
      this.s2 = x[2];
      this.s3 = x[3];
    }
    toString() {
      return "PRNG[" + this.s0.toString(16) + ", " + this.s1.toString(16)
              + ", " + this.s2.toString(16) + ", " + this.s3.toString(16) + "]";
    }
  }
  
  /**
   * Turmite class that encapsulates the creation and behaviour of turmites
   */
  turmites.Mite = class Mite {
    constructor() {
      let prandom = turmites.prandom;
      this.y = prandom.getNextInt(turmites.canvasH);
      this.x = prandom.getNextInt(turmites.canvasW);
      this.facing = prandom.getNextInt(4);
      this.state = prandom.getNextInt(turmites.nStates);
      let transition = this.transitionTable = [];
      for(let i = turmites.nColors * turmites.nStates; i > 0; --i) {
        let movement = prandom.getNextInt(12);
        let voteColor = prandom.getNextInt(turmites.nColors);
        let nextState = prandom.getNextInt(turmites.nStates);
        transition.push([movement, voteColor, nextState]);
      }
    }
    /**
     * Given the color below it, take 1 step and return the voted color
     */
    stepOnce(below) {
      let instruction = this.transitionTable[below * turmites.nStates + this.state];
      let movement = instruction[0];
      let voteColor = instruction[1];
      this.state = instruction[2];
      let result = voteColor;
      this.facing = (this.facing + movement % 4) % 4;
      movement = (movement - movement % 4) / 4;
      let addPos = -1 + movement;
      if(this.facing >= 2)addPos = -addPos;
      if(this.facing % 2) {
        let y = this.y + addPos;
        y += turmites.canvasH * ((y < 0) - (y >= turmites.canvasH));
        this.y = y;
      } else {
        let x = this.x + addPos;
        x += turmites.canvasW * ((x < 0) - (x >= turmites.canvasW));
        this.x = x;
      }
      return result;
    }
  }

  turmites.paletteRef = [
    "#bbbbbb", "#ecac89", "#bdbf7b", "#7fcb9f", "#5bccd7", "#8ac1fa", "#d2aeed", "#f7a3bc",
    "#a0a0a0", "#cf916f", "#a2a462", "#64af85", "#3ab0bb", "#6ea6dd", "#b693d1", "#da88a1",
    "#868686", "#b27757", "#878a49", "#4a946b", "#0495a0", "#528cc1", "#9b79b5", "#bd6e87",
    "#6d6d6d", "#965e3f", "#6d7131", "#2f7a53", "#007b86", "#3573a6", "#81609a", "#a1556e",
    "#545454", "#7b4629", "#545819", "#0e613c", "#00626d", "#0d5a8b", "#674880", "#863c55",
    "#3d3d3d", "#602f14", "#3c4100", "#004926", "#004a55", "#004371", "#4e3167", "#6b233e",
    "#272727", "#471900", "#272b00", "#003111", "#00333e", "#002d58", "#361b4e", "#510828",
    "#121212", "#310200", "#161700", "#001e00", "#001e28", "#001940", "#1f0537", "#380013",
    ];

  turmites.permuteSobol = [
    56, 36, 18, 54, 43, 15, 25, 61,
    50, 22,  0, 41, 13, 27, 63, 59,
    31,  9, 45, 32,  4, 49, 21,  3,
    39, 42, 14, 24, 60, 58, 30,  8,
    44, 33,  5, 19, 55, 48, 20,  2,
    38, 57, 29, 11, 47, 34,  6, 16,
    52, 51, 23,  1, 37, 40, 12, 26,
    62, 28, 10, 46, 35,  7, 17, 53,
    ];
  
  turmites.permuteHandpicked = [
    56,  0,  4,  6,  2,  3,  7,  5,  1,
        32, 36, 38, 34, 35, 39, 37, 33,
        48, 52, 54, 50, 51, 55, 53, 49,
        16, 20, 22, 18, 19, 23, 21, 17,
        24, 28, 30, 26, 27, 31, 29, 25,
            60, 62, 58, 59, 63, 61, 57,
        40, 44, 46, 42, 43, 47, 45, 41,
         8, 12, 14, 10, 11, 15, 13,  9,
    ];

  /**
   * Fisher-Yates shuffle
   * Do it in place or on a copy and return the result
   */
  turmites.shuffle = function(arr, prandom, copy) {
    if(copy)arr = arr.slice();
    for(let i = arr.length - 1; i >= 1; --i) {
      let j = prandom.getNextInt(i + 1);
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }
  
  /**
   * Permute by taking certain indices in the original
   */
  turmites.permute = function(arr, indices) {
    let result = [];
    for(let i = 0; i < indices.length; ++i) {
      let j = indices[i];
      result.push(arr[j]);
    }
    return result;
  }

  // signal for the game state
  // 0 = not running
  // 1 = running
  // 2 = running, but please stop
  // 3 = running, but please restart
  turmites.stateSignal = 0;
  // signal to apply new settings before next restart
  // mask values:
  // 1 = update display/performance settings
  // 2 = update game rules
  turmites.applySettingsNext = 0;
  
  /**
   * Function to perform a game step and record which tiles need to be re-rendered
   */
  turmites.stepOnce = function(tilesToUpdate) {
    let mites = turmites.mites;
    let votes = {};
    for(let i = 0; i < mites.length; ++i) {
      let mite = mites[i];
      let key = mite.y * turmites.canvasW + mite.x;
      let below = turmites.canvasMap[key];
      let vote = mite.stepOnce(below);
      let tally;
      if(key in votes) {
        tally = votes[key];
      } else {
        tally = votes[key] = {};
      }
      if(!(vote in tally))tally[vote] = 0;
      tally[vote]++;
    }
    for(let key in votes) {
      let tally = votes[key];
      let best = 0;
      let bestIndex = 0;
      let bestDuplis = 0;
      for(let j in tally) {
        let n = tally[j];
        if(n > best) {
          best = n;
          bestIndex = j;
          bestDuplis = 1;
        } else if(n == best) {
          bestDuplis++;
        }
      }
      if(bestDuplis === 1) {
        turmites.canvasMap[key] = bestIndex;
        tilesToUpdate[key] = bestIndex;
      }
    }
    turmites.stepCounter++;
  }
  
  /**
   * Set the state signal and change the corresponding status message.
   */
  turmites.setSignal = function(signal) {
    turmites.stateSignal = signal;
    let statusEl = document.getElementById("turmite-status");
    turmites.clearChildren(statusEl);
    let message = [
      "Not running",
      "Running",
      "Queued stop",
      "Queued restart",
      ][signal];
    let textEl = document.createTextNode(message);
    let paraEl = document.createElement("p");
    paraEl.appendChild(textEl);
    statusEl.appendChild(paraEl);
  }

  /**
   * Apply the settings from the UI, if possible
   * Return whether the new settings were OK
   */
  turmites.tryApplySettings = function() {
    // empty the message board
    let messageEl = document.getElementById("turmite-message");
    turmites.clearChildren(messageEl);
    // track errors
    let errors = [];
    // get the requested values
    let reqRandomSeed = document.getElementById("settings-seed").value;
    let reqCanvasW = Number(document.getElementById("settings-canvas-w").value || turmites.canvasW);
    let reqCanvasH = Number(document.getElementById("settings-canvas-h").value || turmites.canvasH);
    let reqNColors = Number(document.getElementById("settings-ncolors").value || turmites.nColors);
    let reqNStates = Number(document.getElementById("settings-nstates").value || turmites.nStates);
    let reqNMites = Number(document.getElementById("settings-nturmites").value || turmites.nMites);
    let reqFFIters = Number(document.getElementById("settings-ffiters").value || turmites.ffIters);
    let reqTickDelay = Number(document.getElementById("settings-tick-delay").value || turmites.tickDelay);
    let reqPaletteKind = turmites.getSelectedValue("settings-color-map") || turmites.paletteKind;
    // reject anything that would break the app
    if(
         Number.isNaN(reqCanvasW)
      || Number.isNaN(reqCanvasH)
      || Number.isNaN(reqNColors)
      || Number.isNaN(reqNStates)
      || Number.isNaN(reqNMites)
      || Number.isNaN(reqFFIters)
      || Number.isNaN(reqTickDelay)) {
      errors.push("Number inputs need to be numbers");
    } else if(
         !Number.isInteger(reqCanvasW)
      || !Number.isInteger(reqCanvasH)
      || !Number.isInteger(reqNColors)
      || !Number.isInteger(reqNStates)
      || !Number.isInteger(reqNMites)
      || !Number.isInteger(reqFFIters)
      || !Number.isInteger(reqTickDelay)) {
      errors.push("Number inputs need to be whole numbers (integers)");
    } else if(
         reqCanvasW < 1
      || reqCanvasH < 1
      || reqNColors < 1
      || reqNStates < 1
      || reqNMites  < 1
      || reqFFIters < 1
    ) {
      errors.push("Number inputs need to be at least 1");
    } else {
      if(
           reqCanvasW >= flimit
        || reqCanvasH >= flimit
        || reqNMites  >= flimit
        || reqFFIters >= flimit
      ) {
        errors.push("Number inputs (canvas width, canvas height, number of turmites, number of steps per tick) must be below " + flimit.toString());
      }
      if(reqNStates >= i32limit) {
        errors.push("Number of states must be less than " + i32limit.toString() + " due to PRNG restrictions");
      }
      if(reqTickDelay < 10 || reqTickDelay >= 1e9) {
        errors.push("Tick delay must be at least 10 ms and at most 10^9 ms (around 11 days)");
      }
      if(reqNColors > 64) {
        errors.push("Colors must be less than 64 since the palette only contains that many colors");
      }
      if(reqCanvasW * reqCanvasH >= flimit) {
        errors.push("Total canvas area (width times height) must be below " + flimit.toString());
      }
      if(reqNColors * reqNStates >= flimit) {
        errors.push("Total transition table size (colors times states) must be below " + flimit.toString());
      }
    }
    if(errors.length !== 0) {
      // display errors
      for(let i = 0; i < errors.length; ++i) {
        let textEl = document.createTextNode(errors[i]);
        let paraEl = document.createElement("p");
        paraEl.appendChild(textEl);
        messageEl.appendChild(paraEl);
      }
      return false;
    } else {
      // show OK
      let textEl = document.createTextNode("New parameters are OK");
      let paraEl = document.createElement("p");
      paraEl.appendChild(textEl);
      messageEl.appendChild(paraEl);
      // apply new settings
      if(turmites.applySettingsNext & 2) {
        turmites.randomSeed = reqRandomSeed;
        turmites.canvasW = reqCanvasW;
        turmites.canvasH = reqCanvasH;
        turmites.nColors = reqNColors;
        turmites.nStates = reqNStates;
        turmites.nMites = reqNMites;
      }
      if(turmites.applySettingsNext & 1) {
        let colorsChanged = turmites.paletteKind !== reqPaletteKind;
        turmites.ffIters = reqFFIters;
        turmites.tickDelay = reqTickDelay;
        turmites.paletteKind = reqPaletteKind;
        if(colorsChanged)turmites.remakeColors(true);
      }
      return true;
    }
  }
  
  /**
   * Remake the colour map, and also optionally repaint the whole canvas
   */
  turmites.remakeColors = function(repaintCanvas) {
    if(turmites.paletteKind === "handpicked") {
      turmites.palette = turmites.permute(turmites.paletteRef, turmites.permuteHandpicked);
    } else if(turmites.paletteKind === "sobol") {
      turmites.palette = turmites.permute(turmites.paletteRef, turmites.permuteSobol);
    } else {
      turmites.prandom.init("colormap:" + turmites.randomSeed);
      turmites.palette = turmites.shuffle(turmites.paletteRef, turmites.prandom, true);
    }
    if(repaintCanvas) {
      for(let i = 0; i < turmites.canvasW * turmites.canvasH; ++i) {
        cellEl = document.getElementById("turmite-canvas-cell-" + i.toString());
        cellEl.style["background-color"] = turmites.palette[turmites.canvasMap[i]];
      }
    }
  }
  
  /**
   * Function to reset the game.
   */
  turmites.resetGame = function() {
    // generate starting game state
    let prandom = turmites.prandom;
    turmites.remakeColors(false);
    prandom.init("mites: " + turmites.randomSeed);
    turmites.mites = [];
    for(let i = turmites.nMites; i > 0; --i) {
      turmites.mites.push(new turmites.Mite());
    }
    turmites.canvasMap = [];
    for(let i = turmites.canvasW * turmites.canvasH; i > 0; --i) {
      turmites.canvasMap.push(0);
    }
    turmites.stepCounter = 0;
    // rebuild canvas
    let canvasEl = document.getElementById("turmite-canvas");
    turmites.clearChildren(canvasEl);
    let fullSize = document.getElementById("turmite-settings-form").offsetWidth;
    let cellSize = (fullSize / turmites.canvasW).toString() + "px";
    canvasEl.style["display"] = "grid";
    canvasEl.style["grid-template-columns"] = "repeat(" + turmites.canvasW.toString() + ", " + cellSize + ")";
    for(let i = 0; i < turmites.canvasW * turmites.canvasH; ++i) {
      let cellEl = document.createElement("div");
      cellEl.id = "turmite-canvas-cell-" + i.toString();
      cellEl.style["height"] = cellSize;
      cellEl.style["background-color"] = turmites.palette[0];
      canvasEl.appendChild(cellEl);
    }
  }

  /**
   * Function to boot up the simulator if it's not already running
   */
  turmites.tryStartUp = function() {
    if(turmites.stateSignal > 0)return;
    let resetGame = false;
    if(turmites.applySettingsNext !== 0){
      let setOK = turmites.tryApplySettings();
      if(!setOK)return;
      resetGame = turmites.applySettingsNext & 2;
      turmites.applySettingsNext = 0;
    }
    if(resetGame)turmites.resetGame();
    // settings have been applied, we're okay to start
    // start game loop
    turmites.gameLoop();
  }
  
  /**
   * The main loop, used as a function and as a callback.
   */
  turmites.gameLoop = function() {
    if(turmites.stateSignal >= 2) {
      let doRestart = turmites.stateSignal === 3;
      turmites.setSignal(0);
      if(doRestart){
        turmites.tryStartUp();
      }
      return;
    }
    if(turmites.stateSignal === 0) {
      turmites.setSignal(1);
    } else {
      let timeStart = performance.now();
      let tilesToUpdate = {};
      for(let i = 0; i < turmites.ffIters; ++i) {
        turmites.stepOnce(tilesToUpdate);
      }
      for(let key in tilesToUpdate) {
        let cellEl = document.getElementById("turmite-canvas-cell-" + key.toString());
        cellEl.style["background-color"] = turmites.palette[turmites.canvasMap[key]];
      }
      let timeEnd = performance.now();
      let messageEl = document.getElementById("turmite-message");
      turmites.clearChildren(messageEl);
      let timeMessage = "Total steps: " + turmites.stepCounter.toString();
      let textEl = document.createTextNode(timeMessage);
      let paraEl = document.createElement("p");
      paraEl.appendChild(textEl);
      messageEl.appendChild(paraEl);
      timeMessage = "Performed " + turmites.ffIters.toString() + " steps in " + (timeEnd - timeStart).toFixed() + " ms";
      textEl = document.createTextNode(timeMessage);
      paraEl = document.createElement("p");
      paraEl.appendChild(textEl);
      messageEl.appendChild(paraEl);
    }
    setTimeout(turmites.gameLoop, turmites.tickDelay);
  }
  
  /**
   * Respond to external request to pause or resume
   */
  turmites.sendPauseResume = function() {
    turmites.applySettingsNext = 1;
    if(turmites.stateSignal === 0) {
      turmites.tryStartUp();
    } else {
      turmites.setSignal(2);
    }
  }
  
  /**
   * Respond to external request to apply new settings and restart
   */
  turmites.sendRestart = function() {
    turmites.applySettingsNext = 3;
    if(turmites.stateSignal === 0) {
      turmites.tryStartUp();
    } else {
      turmites.setSignal(3);
    }
  }
  
  /**
   * Respond to external request to randomly generate a seed
   */
  turmites.generateNewSeed = function() {
    let data = new Uint32Array(3);
    window.crypto.getRandomValues(data);
    let seed = data[0].toString(36) + ":" + data[1].toString(36) + ":" + data[2].toString(36);
    document.getElementById("settings-seed").value = seed;
  }

  /**
   * Function to initialize the app the first time
   */
  turmites.initFirst = function() {
    // Initialize the turmite global parameters
    let randomSeed = ":) " + Date.now().toString();
    let prandom = turmites.prandom = new turmites.PRandom();
    prandom.init(randomSeed);
    turmites.canvasH = prandom.getNextInt(10) + 30;
    turmites.canvasW = prandom.getNextInt(20) + turmites.canvasH;
    turmites.nColors = prandom.getNextInt(4) + 3;
    turmites.nStates = prandom.getNextInt(4) + 3;
    turmites.nMites = prandom.getNextInt(3) + 2;
    turmites.ffIters = 1;
    turmites.tickDelay = 50;
    turmites.paletteKind = "handpicked";
    turmites.randomSeed = "any text is okay " + randomSeed;
    document.getElementById("settings-seed").value = turmites.randomSeed;
    document.getElementById("settings-canvas-w").value = turmites.canvasW;
    document.getElementById("settings-canvas-h").value = turmites.canvasH;
    document.getElementById("settings-ncolors").value = turmites.nColors;
    document.getElementById("settings-nstates").value = turmites.nStates;
    document.getElementById("settings-nturmites").value = turmites.nMites;
    document.getElementById("settings-ffiters").value = turmites.ffIters;
    document.getElementById("settings-tick-delay").value = turmites.tickDelay;
    document.getElementById("settings-color-map-" + turmites.paletteKind).checked = true;
    turmites.setSignal(0);
    turmites.sendRestart();
  }

  // initialize, but don't start up
  turmites.initFirst();

}(window.turmites = window.turmites || {}));