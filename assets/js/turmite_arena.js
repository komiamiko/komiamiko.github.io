/*
 * Main script for the Turmite Arena webapp.
 * (c) Komi Amiko 2020
 * See license file for license.
 * The app simulates many of a kind of turmite on a large canvas.
 */

/**
 * 32-bit left rotate
 */
function rotl32(x, k) {
  return x << (31 & k) | x >>> (31 & -k);
}

class PRandom {
  constructor() {
    this.s0 = this.s1 = this.s2 = this.s3 = 0;
  }
  /**
   * xoshiro128++ 1.0
   * adapted for js
   */
  getNext() {
    let s0 = this.s0, s1 = this.s1, s2 = this.s2, s3 = this.s3;
    let result = (rotl32(s0 + s3, 7) + s0) & -1;
    if(result < 0)result += 0x100000000;
    let t = s1 << 9;
    s2 ^= s0;
    s3 ^= s1;
    this.s1 = s1 ^ s2;
    this.s0 = s0 ^ s3;
    this.s2 = s2 ^ t;
    this.s3 = rotl32(s3, 11);
    return result;
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
        x[j] = rotl32(x[j] * 25, x[j|1]);
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

var paletteRef = [
	"#121212",
  "#007b86",
  "#4e3167",
  "#a2a462",
  "#0e613c",
  "#f7a3bc",
  "#002d58",
  "#b27757",
  "#602f14",
  "#6ea6dd",
  "#380013",
  "#2f7a53",
  "#272b00",
  "#9b79b5",
  "#00626d",
  "#bbbbbb",
  "#545454",
  "#5bccd7",
  "#361b4e",
  "#878a49",
  "#001e00",
  "#a1556e",
  "#004371",
  "#cf916f",
  "#471900",
  "#528cc1",
  "#863c55",
  "#7fcb9f",
  "#3c4100",
  "#b693d1",
  "#001e28",
  "#6d6d6d",
  "#3d3d3d",
  "#3ab0bb",
  "#1f0537",
  "#6d7131",
  "#003111",
  "#bd6e87",
  "#0d5a8b",
  "#ecac89",
  "#310200",
  "#3573a6",
  "#6b233e",
  "#64af85",
  "#545819",
  "#d2aeed",
  "#00333e",
  "#868686",
  "#272727",
  "#0495a0",
  "#674880",
  "#bdbf7b",
  "#004926",
  "#da88a1",
  "#001940",
  "#965e3f",
  "#7b4629",
  "#8ac1fa",
  "#510828",
  "#4a946b",
  "#161700",
  "#81609a",
  "#004a55",
  "#a0a0a0",
  ];

let randomSeed, canvasW, canvasH, nColors, nStates, nMites, ffIters = 1, tickDelay = 50;
let paletteKind = "default", palette;
let prandom = new PRandom();

function initFirst() {
  randomSeed = ":) " + Date.now().toString();
  prandom.init(randomSeed);
  canvasW = prandom.getNext() % 10 + 40;
  canvasH = prandom.getNext() % 10 + 40;
  nColors = prandom.getNext() % 4 + 3;
  nStates = prandom.getNext() % 4 + 3;
  nMites = prandom.getNext() % 2 + 2;
  randomSeed = "any text is okay " + randomSeed;
  document.getElementById("settings-seed").value = randomSeed;
  document.getElementById("settings-canvas-w").value = canvasW;
  document.getElementById("settings-canvas-h").value = canvasH;
  document.getElementById("settings-ncolors").value = nColors;
  document.getElementById("settings-nstates").value = nStates;
  document.getElementById("settings-nturmites").value = nMites;
  document.getElementById("settings-ffiters").value = ffIters;
  document.getElementById("settings-tick-delay").value = tickDelay;
  document.getElementById("settings-color-map-" + paletteKind).checked = true;
  // TODO start up game
}

initFirst();