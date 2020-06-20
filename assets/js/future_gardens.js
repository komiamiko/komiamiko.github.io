/*
 * Main script for the Future Gardens webapp,
 * a plant-themed incremental game with more than omega prestige layers.
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

/**
 * Self-executing anonymous function to contain the game's namespace.
 */
(function(gardens) {
  
  // --- core utilities and constants ---
  
  /*
   * Plant names are composed by concatenating a random prefix and suffix
   */
  const poolPlantNamePrefix =
    ['absin', 'abyss', 'aca', 'acic', 'acon', 'alarm', 'altis', 'amber', 'anemoni', 'anger',
    'anop', 'apri', 'arau', 'arch', 'arken', 'armil', 'aroma', 'arrow', 'artemi', 'arven',
    'ash', 'aster', 'astra', 'bald', 'band', 'basi', 'beam', 'bear', 'bird', 'bitter',
    'bladder', 'blaze', 'blessed', 'block', 'blushing', 'bon', 'bora', 'bour', 'box',
    'bright', 'bristle', 'brittle', 'buck', 'burning', 'butter', 'canin', 'canna', 'cannon',
    'cara', 'cast', 'cat', 'cela', 'cheilo', 'clock', 'clone', 'cloud', 'coast', 'comme',
    'corym', 'costa', 'cough', 'counting', 'crab', 'cream', 'cryptic', 'curdle', 'curse',
    'dark', 'date', 'david', 'dead', 'deep', 'di', 'dico', 'dire', 'disc', 'dog', 'dotted',
    'dragon', 'dream', 'drifting', 'dripping', 'drooping', 'duck', 'dune', 'dwarf', 'eagle',
    'echo', 'ehre', 'elf', 'ellipti', 'equi', 'eremo', 'euaster', 'euca', 'eucom', 'eudi',
    'euro', 'even', 'ever', 'fang', 'feather', 'fili', 'fire', 'fitz', 'flag', 'flash',
    'flick', 'flirt', 'flock', 'flow', 'fog', 'folding', 'forgetful', 'fox', 'friend',
    'frozen', 'furry', 'gall', 'garry', 'gate', 'gem', 'gentil', 'gentle', 'gin', 'glass',
    'gold', 'goose', 'grand', 'greed', 'guiding', 'hairy', 'handshake', 'harmony', 'hawk',
    'heli', 'hell', 'hen', 'hill', 'hollow', 'holy', 'hooked', 'horn', 'horror', 'horse',
    'human', 'hundred', 'huon', 'hyd', 'ibis', 'ice', 'immortal', 'ink', 'iron', 'joumon',
    'june', 'kau', 'kayano', 'key', 'knot', 'knotted', 'koka', 'kor', 'la', 'leg', 'limber',
    'lion', 'litho', 'liver', 'lizard', 'llanger', 'long', 'love', 'magno', 'maj', 'mal',
    'maran', 'marat', 'marking', 'mega', 'memory', 'messenger', 'meter', 'micro', 'midnight',
    'mil', 'milk', 'million', 'mimosa', 'miracle', 'mirror', 'mist', 'mond', 'mono', 'moon',
    'mountain', 'moye', 'mystery', 'ner', 'nonce', 'noon', 'nootka', 'north', 'oci', 'odd',
    'ominous', 'once', 'ophio', 'oracle', 'orc', 'oyster', 'pan', 'pedun', 'per', 'phantom',
    'phenako', 'pinch', 'podo', 'poly', 'pop', 'prime', 'pulse', 'quaking', 'quartz', 'quick',
    'rain', 'rainbow', 'raven', 'ring', 'rocket', 'rope', 'rosa', 'rotu', 'ruby', 'sacred',
    'sag', 'sand', 'sapphire', 'scroll', 'sea', 'semper', 'serpent', 'shivering', 'short',
    'shy', 'signal', 'silk', 'silly', 'silver', 'sky', 'sleepless', 'sleepy', 'slippery',
    'smelly', 'snap', 'sneeze', 'snow', 'speckled', 'spectral', 'spiral', 'split', 'spring',
    'star', 'stasis', 'stone', 'storm', 'strelit', 'subal', 'sun', 'sunda', 'switch', 'tane',
    'tape', 'terra', 'thin', 'thinking', 'thousand', 'thunder', 'tile', 'touch', 'tour',
    'tricol', 'truffle', 'twisted', 'twitching', 'ty', 'ul', 'vampire', 'vanishing',
    'vibrant', 'vile', 'vin', 'violet', 'void', 'voodoo', 'wailing', 'waiting', 'walking',
    'wandering', 'watching', 'water', 'welwits', 'west', 'whisk', 'will', 'winged', 'winter',
    'wish', 'witch', 'wolf', 'worm', 'year', 'zingi']
    ;
  const poolPlantNameSuffix =
    ['ala', 'all', 'ao', 'arum', 'aspen', 'bab', 'ball', 'balloon', 'bane', 'bean', 'berale',
    'berry', 'bifera', 'blood', 'bract', 'bulb', 'burst', 'cachrys', 'cana', 'cane', 'cap',
    'carpa', 'carpus', 'cedar', 'cell', 'chia', 'chilos', 'cimum', 'cone', 'conia', 'coral',
    'corn', 'cot', 'crown', 'cuba', 'cup', 'cyme', 'cypress', 'dew', 'divia', 'drupe', 'fan',
    'fern', 'fia', 'fig', 'fin', 'finger', 'flax', 'flora', 'flower', 'folia', 'fork', 'gata',
    'gera', 'ginale', 'ginger', 'ginosa', 'go', 'grass', 'holly', 'ica', 'inica', 'itum',
    'ium', 'jelly', 'knight', 'lar', 'larch', 'laris', 'lata', 'leaf', 'leek', 'liale',
    'licum', 'lily', 'lina', 'linid', 'lip', 'lis', 'lock', 'lustris', 'mara', 'mella',
    'melon', 'meria', 'mia', 'miale', 'mimic', 'moide', 'morel', 'moss', 'mussel', 'nalis',
    'nassae', 'navel', 'niper', 'nora', 'nut', 'nyw', 'oak', 'osma', 'pakko', 'palm',
    'panicle', 'parasol', 'pate', 'peach', 'pes', 'petiole', 'pine', 'pitcher', 'plane',
    'plume', 'pod', 'podiida', 'psida', 'pudica', 'puff', 'redwood', 'reed', 'restis', 'ri',
    'ric', 'root', 'roya', 'saddle', 'sana', 'scale', 'setida', 'shanica', 'shield', 'shoot',
    'shroom', 'sia', 'sid', 'sii', 'sis', 'spathe', 'spine', 'sprout', 'spruce', 'stalk',
    'strobos', 'sugi', 'syne', 'tail', 'terus', 'thistle', 'thorn', 'tiida', 'tongue',
    'tooth', 'torch', 'torum', 'trap', 'tube', 'umbrella', 'vine', 'web', 'weed', 'whorl',
    'wick', 'wood', 'wort', 'yam', 'yarrow', 'zia']
    ;
  
  /**
   * The first 11 values of Sylvester's sequence,
   * which are all of them that fit in a float.
   */
  let sylvester = [
    2,
    3,
    7,
    43,
    1807,
    3263443,
    10650056950807,
    1.1342371305542185e+26,
    1.2864938683278672e+52,
    1.6550664732451996e+104,
    2.7392450308603032e+208,
    ];
  
  /**
   * From a string, derive a random state.
   * Random state is 128 bits - length 4 array of int32
   * Not extremely sensitive to differences in input, but good enough.
   */
  const randomDeriveState = function(text) {
    let t = new TextEncoder().encode(text);
    let tn = t.length;
    let s = new Uint32Array(4);
    s[1] = tn + 1;
    for(let i = 0; i < tn; ++i) {
      s[0] += t[i];
      s[1] ^= s[0] << 5;
      s[0] *= 0x7edf1;
      s[1] *= 0x636f7;
      s[3] ^= s[0];
      s[2] ^= s[1];
      s[3] ^= s[3] >>> 24;
      s[2] ^= s[2] >>> 13;
      s[1] += s[3];
      s[0] += s[2];
    }
    return s;
  }
  
  /**
   * From an ordered pair (s, t) of random states,
   * modify s = H(s || t) in place,
   * where H is some unspecified hash function.
   * Then, return s.
   * Relatively sensitive to input differences in both inputs.
   */
  const randomConcatState = function(s, t) {
    for(let i = 0; i < 8; ++i) {
      s[0] += t[i & 3];
      s[1] ^= s[0] << 5;
      s[0] *= 0x7097f;
      s[1] *= 0x41481;
      s[3] ^= s[0];
      s[2] ^= s[1];
      s[3] ^= s[3] >>> 24;
      s[2] ^= s[2] >>> 13;
      s[1] += s[3];
      s[0] += s[2];
    }
    return s;
  }
  
  /**
   * Get a value in the range [0, n) based on the
   * current random state s
   */
  const randomGetNext = function(s, n) {
    return s[3] % n;
  }
  
  /**
   * Concatenate 2 Uint8Array instances.
   */
  const concatBytes = function(s, t) {
    let sn = s.length;
    let tn = t.length;
    let r = new Uint8Array(sn + tn);
    r.set(s);
    r.set(t, sn);
    return r;
  }
  
  /**
   * Generate n strong random bytes.
   */
  const randomBytes = function(n) {
    s = new Uint8Array(n);
    window.crypto.getRandomValues(s);
    return s;
  }
  
  /**
   * Deep copy an arbitrarily nested array of primitives.
   * End primitives are not copied, since they are immutable anyway.
   */
  const copyNested = function(a) {
    let an = a.length;
    if(an === undefined) { // not an array
      return a;
    } else {
      let r = [];
      for(let i = 0; i < an; ++i) {
        let b = copyNested(a[i]);
        r.push(b);
      }
      return r;
    }
  }
  
  /**
   * Encode a non-negative integer to a string in a dense format with good efficiency.
   * Can handle the entire floating point range, and theoretically up to about 2^5120.
   */
  const encodeInt = function(n) {
    let s = n.toString(32);
    let t = s.length.toString(32).padStart(2, "0");
    return t + s;
  }
  
  /**
   * Given a mutable 2-tuple of (string stream, index),
   * extract the next integer from it and move index to just after the end of that token.
   */
  const decodeInt = function(si) {
    let r = si[0];
    let i = si[1];
    let t = window.parseInt(r.substring(i, i + 2), 32);
    i += 2;
    let n = window.parseInt(r.substring(i, i + t), 32);
    si[1] = i + t;
    return n;
  }
  
  // --- other useful utilities ---
  
  /**
   * Clear a DOM element's children.
   */
  const clearChildren = function(el) {
    while(el.lastElementChild) {
      el.removeChild(el.lastElementChild);
    }
  }
  
  /**
   * Commonly used, make a single paragraph node
   */
  const makep = function(text) {
    let textEl = document.createTextNode(text);
    let paraEl = document.createElement("p");
    paraEl.appendChild(textEl);
    return paraEl;
  }
  
  /**
   * Convert a number to a DOM element displaying that number.
   * Intended for numbers that may potentially be very large.
   */
  const domNumberToString = function(n) {
    n = Math.floor(n);
    // limiting to 4 digits is best for quick reading
    if(n < 10000) {
      return document.createTextNode(n.toString());
    } else {
      let l = window.Math.log2(n);
      let r = document.createElement("span");
      r.appendChild(document.createTextNode("2"));
      let s = document.createElement("sup");
      s.appendChild(document.createTextNode(l.toFixed(2)));
      r.appendChild(s);
      return r;
    }
  }
  
  /**
   * Get an expression for the addition of 2 expressions, as DOM elements.
   * Performs basic simplification.
   */
  const domAdd = function(a, b) {
    // degenerate cases: 0 + x, x + 0
    if(a.nodeName === "#text" && a.textContent === "0")return b;
    if(b.nodeName === "#text" && b.textContent === "0")return a;
    // general case
    let r = document.createElement("span");
    r.appendChild(a);
    r.appendChild(document.createTextNode(" + "));
    r.appendChild(b);
    return r;
  }
  
  /**
   * Get an expression for the multiplication of 2 expressions, as DOM elements.
   * Performs basic simplification.
   * Uses implicit multiplication, so no multiplication symbol is added.
   */
  const domMul = function(a, b) {
    // degenerate cases: 0 x, x 0
    if(a.nodeName === "#text" && a.textContent === "0")return a;
    if(b.nodeName === "#text" && b.textContent === "0")return b;
    // degenerate cases: 1 x, x 1
    if(a.nodeName === "#text" && a.textContent === "1")return b;
    if(b.nodeName === "#text" && b.textContent === "1")return a;
    // general case
    let r = document.createElement("span");
    r.appendChild(a);
    r.appendChild(b);
    return r;
  }
  
  /**
   * Get an expression for the power of 2 expressions, as DOM elements.
   * Performs basic simplification.
   */
  const domPow = function(a, b) {
    // degenerate cases: 0^x, 1^x
    if(a.nodeName === "#text" && (a.textContent === "0" || a.textContent === "1"))return a;
    // degenerate cases: x^1
    if(b.nodeName === "#text" && b.textContent === "1")return a;
    // degenerate cases: x^0
    if(b.nodeName === "#text" && b.textContent === "0")return document.createTextNode("1");
    // general case
    let r = document.createElement("span");
    r.appendChild(a);
    let s = document.createElement("sup");
    s.appendChild(b);
    r.appendChild(s);
    return r;
  }
  
  /**
   * Derive a random seed from a name and a 128-bit
   * (16 byte) salt as a Uint8Array.
   */
  const randomSeedStringFromName = function(name, s) {
    let t = new TextEncoder().encode(name);
    let tn = t.length;
    if(s === undefined) {
      s = randomBytes(16);
    }
    let salt = "";
    for(let i = 0; i < 16; ++i) {
      salt += s[i].toString(16).padStart(2, '0');
    }
    return tn.toString() + ":" + name + ":" + salt;
  }
  
  let randomSeedVerifiedIters = 0;
  let randomSeedVerifiedTick = 0;
  
  /**
   * Callback-based loop used to generate a verified seed.
   */
  const randomSeedVerifiedGenerationLoop = function(name, salt) {
    let seedString = randomSeedStringFromName(name, salt);
    let seedBytes = new TextEncoder().encode(seedString);
    let prefix = new TextEncoder().encode("Future Gardens verified seed");
    let message1 = concatBytes(prefix, seedBytes);
    window.crypto.subtle.digest("SHA-256", message1).then(
      function(hash1) {
        hash1 = new Uint8Array(hash1);
        let message2 = concatBytes(prefix, hash1);
        window.crypto.subtle.digest("SHA-256", message2).then(
          function(hash) {
            hash = new Uint8Array(hash);
            let tickNow = window.performance.now();
            let accept = (hash[0] | hash[1] | hash[2] & 240) === 0;
            let nIters = ++randomSeedVerifiedIters;
            let nTick = randomSeedVerifiedTick;
            let seedEl = document.getElementById("fgardens-settings-seed");
            let notifyEl = document.getElementById("fgardens-settings-verified-seed-display");
            if(seedEl.value !== "") {
            } else if(accept) {
              seedEl.value = seedString;
              clearChildren(notifyEl);
              notifyEl.appendChild(document.createTextNode("Generated seed in "
                + nIters.toString() + " attempts, in "
                + ((tickNow - nTick) / 1000).toFixed(2) + " seconds: "
                + seedString));
            } else {
              if((nIters & 0xffff) === 0) {
                clearChildren(notifyEl);
                notifyEl.appendChild(document.createTextNode("Still trying to generate a seed!"));
                notifyEl.appendChild(document.createElement("br"));
                notifyEl.appendChild(document.createTextNode("So far, used "
                  + nIters.toString() + " attempts, in "
                  + ((tickNow - nTick) / 1000).toFixed(2) + " seconds"));
              }
              for(let i = 0; i < 16; ++i) {
                ++salt[i];
                if(salt[i] !== 0)break;
              }
              randomSeedVerifiedGenerationLoop(name, salt);
            }
          }
        );
      }
    );
  }
  
  // --- gameplay handling ---
  
  /**
   * Lightweight container for the inner game state -
   * plants, gardens, challenges, etc.
   * It won't contain things like the update time, best challenge order, etc.
   * which are all tracked outside.
   * As a main design requirement, it should be cheap to create, modify, use, and copy.
   * Beware naturally that copying is an O(N) operation.
   * Prefer to use patches and undo them later.
   *
   * As implemented:
   * gardens = array of [ordinal, mana, plants, ]
   */
  const GameState = class {
    /**
     * Copy or default constructor.
     * For more advanced usage, please use the default constructor
     * and then fill in its .gardens yourself.
     */
    constructor(other) {
      let gardens = [];
      if(other !== undefined) {
        gardens = copyNested(other.gardens);
      }
      this.gardens = gardens;
    }
    /**
     * Don't trigger this manually. Some JS may end up calling it.
     */
    valueOf() {
      return "---GameState";
    }
    /**
     * Don't trigger this manually. Some JS may end up calling it.
     */
    toString() {
      return "---GameState";
    }
  }
  
  // --- external signal handlers, actual implementation ---
  
  /**
   * Generate a new seed and put it in the seed box.
   */
  const sendNewSeedCasual = function() {
    let nameEl = document.getElementById("fgardens-settings-name");
    let name = nameEl.value;
    let seedString = randomSeedStringFromName(name);
    let seedEl = document.getElementById("fgardens-settings-seed");
    seedEl.value = seedString;
  }
  
  /**
   * Generate a new seed that meets the verification requirements.
   */
  const sendNewSeedVerified = function() {
    let nameEl = document.getElementById("fgardens-settings-name");
    let name = nameEl.value;
    let seedEl = document.getElementById("fgardens-settings-seed");
    seedEl.value = "";
    let notifyEl = document.getElementById("fgardens-settings-verified-seed-display");
    clearChildren(notifyEl);
    notifyEl.appendChild(document.createTextNode("Generating verified seed..."));
    randomSeedVerifiedIters = 0;
    randomSeedVerifiedTick = window.performance.now();
    /*
     * You'd think that since it's asynchronous (not multi-threaded!)
     * making multiple "workers" wouldn't make it any faster.
     * In practice, it does get faster (5x on my machine -Komi).
     * We create several workers to try and saturate the potential speed.
     */
    for(let i = 0; i < 16; ++i) {
      let salt = randomBytes(16);
      randomSeedVerifiedGenerationLoop(name, salt);
    }
  }
  
  // --- external signal handlers, visible to outside ---
  
  gardens.extSendNewSeedCasual = function() {
    sendNewSeedCasual();
  }
  
  gardens.extSendNewSeedVerified = function() {
    sendNewSeedVerified();
  }
  
  gardens.extSendResetGame = function() {
    sendResetGame();
  }
  
}(window.gardens = window.gardens || {}));
