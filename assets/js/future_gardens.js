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
  const sylvester = [
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
   * = 2^1000
   * Numbers are usually capped here in regular play.
   */
  const normLimit = 1.0715086071862673e+301;
  
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
   * Get a permutation of length n from a using state s.
   */
  const randomGetPermutePartial = function(s, a, n) {
    if(a.length < n)return undefined;
    let result = [];
    let counter = 0;
    while(result.length < n) {
      let k = randomGetNext(randomConcatState(s, randomDeriveState(counter.toString())), a.length);
      ++counter;
      if(result.includes(k))continue;
      result.push(k);
    }
    return result;
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
    crypto.getRandomValues(s);
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
    let t = parseInt(r.substring(i, i + 2), 32);
    i += 2;
    let n = parseInt(r.substring(i, i + t), 32);
    si[1] = i + t;
    return n;
  }
  
  /**
   * Encode/decode ordinal
   */
  const encodeOrdinal = function(ordinal) {
    return encodeInt(ordinal[1]) + encodeInt(ordinal[0]);
  }
  const decodeOrdinal = function(si) {
    let y = decodeInt(si);
    let x = decodeInt(si);
    return [x, y];
  }
  
  /**
   * Get/set cookie value as string.
   */
  const cookieGet = function(key) {
    let kpfx = key + "=";
    let cookie = document.cookie;
    let decls = cookie.split("; ");
    let dn = decls.length;
    for(let i = 0; i < dn; ++i) {
      let d = decls[i];
      if(d.startsWith(kpfx)) {
        return d.substring(kpfx.length);
      }
    }
    return "";
  }
  const cookieSet = function(key, value) {
    return document.cookie = key + "=" + value;
  }
  
  /**
   * Low level binary search routine.
   * Returns index i in [l, r] where i
   * is how many elements in a satisfy
   * lt(a, v)
   * lt should be used as less than or less than or equal to
   */
  const bsearch = function(a, l, r, v, lt) {
    while(l < r) {
      let m = (l + r) >>> 1;
      if(lt(a[m], v)) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    return l;
  }
  
  // --- other useful utilities ---
  
  /**
   * Join words separated by a space, but if one is empty, just return the other.
   */
  const joinWords = function(a, b) {
    if(!a)return b;
    if(!b)return a;
    return a + " " + b;
  }
  
  /**
   * Convert first letter of whole string to uppercase
   */
  const upperFirst = function(s) {
    if(!s)return s;
    return s[0].toUpperCase() + s.slice(1);
  }
  
  /**
   * Convert first letter of each word to uppercase
   */
  const upperWords = function(s) {
    return s.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  /**
   * Clear a DOM element's children.
   */
  const clearChildren = function(el) {
    while(el.lastElementChild) {
      el.removeChild(el.lastElementChild);
    }
  }
  
  /**
   * Get an expression for the addition of 2 expressions, as DOM elements.
   * Performs basic simplification.
   */
  const domExprAdd = function(a, b) {
    // degenerate cases: 0 + x, x + 0
    if(a.nodeName === "#text" && a.nodeValue === "0")return b;
    if(b.nodeName === "#text" && b.nodeValue === "0")return a;
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
  const domExprMul = function(a, b) {
    // degenerate cases: 0 x, x 0
    if(a.nodeName === "#text" && a.nodeValue === "0")return a;
    if(b.nodeName === "#text" && b.nodeValue === "0")return b;
    // degenerate cases: 1 x, x 1
    if(a.nodeName === "#text" && a.nodeValue === "1")return b;
    if(b.nodeName === "#text" && b.nodeValue === "1")return a;
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
  const domExprPow = function(a, b) {
    // degenerate cases: 0^x, 1^x
    if(a.nodeName === "#text" && (a.nodeValue === "0" || a.nodeValue === "1"))return a;
    // degenerate cases: x^1
    if(b.nodeName === "#text" && b.nodeValue === "1")return a;
    // degenerate cases: x^0
    if(b.nodeName === "#text" && b.nodeValue === "0")return document.createTextNode("1");
    // general case
    let r = document.createElement("span");
    r.appendChild(a);
    let s = document.createElement("sup");
    s.appendChild(b);
    r.appendChild(s);
    return r;
  }
  
  /**
   * Convert a number to a DOM element displaying that number.
   * Intended for numbers that may potentially be very large.
   */
  const domExprFromNumber = function(n) {
    n = Math.floor(n);
    // limiting to 4 digits is best for quick reading
    if(n < 10000) {
      return document.createTextNode(n.toString());
    } else {
      let l = Math.log2(n);
      return domExprPow(
        document.createTextNode("2"),
        document.createTextNode(l.toFixed(2))
      );
    }
  }
  
  /**
   * Helper to make a DOM button node with inner content
   * and function to call when clicked
   */
  const makeDomButton = function(inner, onclick) {
    let result = document.createElement("button");
    result.type = "button";
    result.appendChild(inner);
    result.addEventListener("mousedown", onclick); // use onmousedown to be more responsive
    return result;
  }
  
  /**
   * Compares ordinals a and b in the usual way.
   */
  const ordCmp = function(a, b) {
    let diff = a[1] - b[1];
    if(diff)return diff;
    return a[0] - b[0];
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
    crypto.subtle.digest("SHA-256", message1).then(
      function(hash1) {
        hash1 = new Uint8Array(hash1);
        let message2 = concatBytes(prefix, hash1);
        crypto.subtle.digest("SHA-256", message2).then(
          function(hash) {
            hash = new Uint8Array(hash);
            let tickNow = performance.now();
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
  
  let gameRandomSeed, gameRandomState, gameRandomHash;
  let lastGameState, lastGameTime;
  let cacheGardenPrefix, cachePlantNameIndex;
  
  /**
   * Make a blank garden.
   */
  const makeGarden = function(ordinal) {
    let plants = new Uint32Array(sylvester.length);
    let comp = new Uint8Array(sylvester.length);
    return [ordinal, 0, plants, comp, undefined, 1];
  }
  
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
   * gardens = array of [ordinal, mana, plants, challenge completions, active challenge, boost]
   *   sorted by ascending ordinal
   * mana = number of mana, can be 0 or higher
   * ordinal = array of [x, y] meaning wy + x
   * plants = array of [nplants0, plants1, ...] can be 0 or higher
   * challenge completions = array of [comp0, comp1, ...] can be 0 or 1
   * active challenge = index of active challenge, or undefined
   * boost = boost from above multiplier
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
  
  /**
   * Get a garden. If not present, returns a freshly created blank
   * garden, changes to which will not be reflected in the GameState.
   * If you know you'll be modifying the garden immediately, pass make=1
   * instead, which will cause the garden to be added.
   */
  const getGarden = function(gardens, make) {
    let index = bsearch(gardens, 0, gardens.length, ordinal, function(u, v){return ordCmp(u[0], v) < 0;});
    if(index < gardens.length && ordCmp(gardens[index][0], ordinal) === 0) {
      return gardens[index];
    }
    let boostAbove = 1;
    if(index < gardens.length) {
      let h = gardens[index];
      boostAbove = h[5] * getBoostInner(h);
    }
    let g = makeGarden(ordinal);
    if(make) {
      gardens.splice(index, 0, g);
    }
    return g;
  }
  
  /**
   * Compute the inner boost.
   */
  const getBoostInner = function(g) {
    let s = sylvester;
    let sn = s.length;
    let mult = 1;
    let plants = g[2];
    for(let i = 0; i < sn; ++i) {
      let x = s[i];
      let y = Math.pow(x - Math.sqrt(x) + 1, plants[i] / x);
      mult *= y;
    }
    mult = Math.min(normLimit, mult);
    return mult;
  }
  
  /**
   * Low-ish level helper.
   * With the current gardens, for the specified ordinal,
   * to gain to specified amount of mana, what is required?
   * Returns 0 to indicate it is free, 1 to indicate it is not possible,
   * otherwise is in the form [ordinal, mana], which is guaranteed
   * to be a lesser ordinal.
   * Ignores boost scaling.
   */
  const enterGardenRequired = function(gardens, ordinal, addMana) {
    let x = ordinal[0], y = ordinal[1];
    if(y === 0 && x === 0)return addMana===1?0:1;
    let imana = getGarden(gardens, ordinal);
    if(x !== 0) {
      let exp = 30 + (imana + 1) * (addMana - 1);
      if(exp >= normLimit)return 1;
      let cost = Math.pow(2, exp);
      return [[x-1,y], cost];
    }
    let step = 3 + imana;
    return [[step,y-1], 2];
  }
  
  /**
   * Low-ish level helper.
   * With the current gardens, how much mana for the specified ordinal
   * can be redeemed at once?
   * Ignores boost scaling.
   */
  const enterGardenReady = function(gardens, ordinal) {
    let x = ordinal[0], y = ordinal[1]; // wy + x
    if(y === 0 && x === 0)return 1;
    return 0;// TODO placeholder
  }
  
  /**
   * Get the prefix for a particular garden, based on the ordinal.
   */
  const getGardenPrefix = function(ordinal) {
    if(ordinal in cacheGardenPrefix) {
      return cacheGardenPrefix[ordinal];
    }
    let x = ordinal[0], y = ordinal[1]; // wy + x
    let z;
    let first = "";
    z = x % 35;
    x = (x - z) / 35;
    if(z < 4) {
      let a = [];
      while(z > 0) {
        --z;
        a.push("future");
      }
      first = a.join(" ");
    } else {
      first = "hyper-" + z.toString() + " future";
    }
    if(x > 0) {
      first = joinWords(first, (x > 1?x.toString()+"-":"") + "stable");
    }
    let second = "";
    z = y % 6;
    y = (y - z) / 6;
    if(y > 0)++z;
    if(z > 0) {
      second = (z > 1?"hyper-"+z.toString()+" ":"") + "eventual";
    }
    if(y > 0) {
      second = joinWords((y > 1?y.toString()+"-":"") + "recursive", second);
    }
    let result = joinWords(first, second);
    cacheGardenPrefix[ordinal] = result;
    return result;
  }
  const getGardenName = function(ordinal) {
    return joinWords(getGardenPrefix(ordinal), "gardens");
  }
  
  /**
   * Get the name of a particular plant.
   */
  const getPlantName = function(ordinal, plantIndex) {
    if(ordinal in cachePlantNameIndex) {
      let ipack = cachePlantNameIndex[ordinal];
      return joinWords(
        getGardenPrefix(ordinal),
        poolPlantNamePrefix[ipack[0][plantIndex]] +
        poolPlantNameSuffix[ipack[1][plantIndex]]
      );
    }
    let rand0 = gameRandomState, rand1;
    rand0 = randomConcatState(rand0, randomDeriveState("plant name"));
    rand0 = randomConcatState(rand0, randomDeriveState(encodeOrdinal(ordinal)));
    let ipfx = randomGetPermutePartial(
      randomConcatState(rand0, randomDeriveState("prefix")),
      poolPlantNamePrefix,
      sylvester.length
    );
    let isfx = randomGetPermutePartial(
      randomConcatState(rand0, randomDeriveState("suffix")),
      poolPlantNameSuffix,
      sylvester.length
    );
    cachePlantNameIndex[ordinal] = [ipfx,isfx];
    return joinWords(
      getGardenPrefix(ordinal),
      poolPlantNamePrefix[ipfx[plantIndex]] +
      poolPlantNameSuffix[isfx[plantIndex]]
    );
  }
  
  /**
   * Given a garden, build a DOM node for it.
   */
  const makeDomGarden = function(garden) {
    // grab garden data
    let ordinal = garden[0];
    let mana = garden[1];
    let plants = garden[2];
    let challengeCompl = garden[3];
    let challengeActive = garden[4];
    let boostAbove = garden[5];
    // get some local vars
    let ordinalEnc = encodeOrdinal(ordinal);
    let gardenPrefix = getGardenPrefix(ordinal);
    // build big stuff
    let outerEl = document.createElement("div");
    let idpfx = outerEl.id = "fgardens-garden-" + ordinalEnc;
    outerEl.className = "fgardens-lblock variant-1"
    let titleEl = document.createElement("h3");
    titleEl.appendChild(document.createTextNode(upperWords(getGardenName(ordinal))));
    outerEl.appendChild(titleEl);
    // mana and plants share a grid with auto wrapping
    let mpEl = document.createElement("div");
    mpEl.id = idpfx + "-mp";
    mpEl.style["display"] = "grid";
    mpEl.style["grid-template-columns"] = "repeat(3, 1fr)";
    let manaEl = document.createElement("div");
    manaEl.className = "fgardens-lblock variant-2";
    manaEl.appendChild(document.createTextNode(upperWords(joinWords(gardenPrefix, "mana"))));
    manaEl.appendChild(document.createElement("br"));
    manaEl.appendChild(domExprFromNumber(mana));
    manaEl.appendChild(document.createElement("br"));
    let manaReady = enterGardenReady(gardens, ordinal);
    let manaReadyPost = Math.min(normLimit, manaReady * boostAbove * getBoostInner(garden));
    let manaReadyInnerEl = document.createElement("span");
    manaReadyInnerEl.appendChild(document.createTextNode("Get "));
    manaReadyInnerEl.appendChild(domExprFromNumber(manaReadyPost));
    manaEl.appendChild(makeDomButton(
      manaReadyInnerEl,
      undefined // TODO actual incrementer
    ));
    let reqNext = enterGardenRequired(gardens, ordinal, manaReady + 1);
    manaEl.appendChild(document.createElement("br"));
    manaEl.appendChild(document.createTextNode(
      reqNext===0?"Free":reqNext===1?"Cannot get more at once":
        "Need " + reqNext[1].toString() + " " + joinWords(getGardenPrefix(reqNext[0]), "mana to get more at once")
    ));
    mpEl.appendChild(manaEl);
    outerEl.appendChild(mpEl);
    return outerEl;
  }
  
  /**
   * Check browser compatibility. On fail, put up a notice.
   */
  const checkCompatibility = function() {
    if(window === undefined || document === undefined) {
      throw "Missing window or document. Game cannot run.";
    }
    let notifyEl = document.getElementById("fgardens-browser-notice");
    clearChildren(notifyEl);
    let globals = ['crypto', 'Date', 'Math', 'parseInt',
      'TextEncoder', 'Uint8Array', 'Uint32Array'];
    let unsupported = [];
    for(let i = 0; i < globals.length; ++i) {
      let g = window[globals[i]];
      if(g === undefined)unsupported.push(globals[i]);
    }
    if(unsupported.length !== 0) {
      notifyEl.appendChild(document.createTextNode("Missing globals: " + unsupported.join(", ")));
      notifyEl.appendChild(document.createElement("br"));
      notifyEl.appendChild(document.createTextNode("Your browser may be unable to run this game."));
    }
  }
  
  /**
   * Clear and remake all game elements related to the UI.
   */
  const rebuildUIAll = function() {
    // fill in story elements etc
    let ijn0 = document.getElementById("fgardens-inject-name-0");
    clearChildren(ijn0);
    ijn0.appendChild(document.createTextNode(getPlantName([0,0], 0)));
    let ijn1 = document.getElementById("fgardens-inject-name-1");
    clearChildren(ijn1);
    ijn1.appendChild(document.createTextNode(getPlantName([0,0], 1)));
    // make gardens
    let cgardensKeys = {};
    let cgardens = [];
    let gardens = lastGameState.gardens;
    let gn = gardens.length;
    for(let i = 0; i < gn; ++i) {
      let g = gardens[i];
      let o = g[0];
      cgardens.push(g);
      cgardensKeys[o] = 1;
      let aos = [[o[0]+1,o[1]],[0,o[1]+1]];
      for(let j = 0; j < aos.length; ++j) {
        let ao = aos[j];
        if(ao in cgardensKeys)continue;
        cgardensKeys[ao] = 1;
        cgardens.splice(
          bsearch(gardens, 0, gardens.length, ao, function(u, v){return ordCmp(u[0],v) < 0;}),
          0, makeGarden(ao));
      }
    }
    if(cgardens.length === 0) {
      cgardens.push(makeGarden([0,0]));
    }
    clearChildren(document.getElementById("fgardens-container-group-2"));
    clearChildren(document.getElementById("fgardens-container-group-1"));
    clearChildren(document.getElementById("fgardens-container-group-0"));
    gn = cgardens.length;
    for(let i = 0; i < gn; ++i) {
      let g = cgardens[i];
      let o = g[0];
      let gtcontainer;
      if(ordCmp([0,1], o) <= 0) { // t2 garden in UI
        gtcontainer = document.getElementById("fgardens-container-group-2");
      } else if(ordCmp([1,0], o) <= 0) { // t1 garden in UI
        gtcontainer = document.getElementById("fgardens-container-group-1");
      } else { // t0 garden in UI
        gtcontainer = document.getElementById("fgardens-container-group-0");
      }
      gtcontainer.appendChild(makeDomGarden(g));
    }
  }
  
  /**
   * Reset the game.
   * Writes history of current timeline (if any),
   * then starts a new timeline.
   * All caches will be cleared, and game state will be reset.
   */
  const resetGame = function() {
    // create record, if there is any state
    if(lastGameState !== undefined) {
      // TODO
    }
    // clear all caches
    gameRandomHash = undefined;
    cacheGardenPrefix = {};
    cachePlantNameIndex = {};
    // make blank state
    gameRandomSeed = document.getElementById("fgardens-settings-seed").value;
    gameRandomState = randomConcatState(
      randomDeriveState("Future Gardens"),
      randomDeriveState(gameRandomSeed)
    );
    lastGameState = new GameState();
    lastGameTime = Date.now();
  }
  
  /**
   * Do all setup needed to get the game to a valid starting state,
   * from an arbitrary (possibly unitialized) current state.
   */
  const setupGameFirstTime = function() {
    // handle name and seed
    let nameEl = document.getElementById("fgardens-settings-name");
    let name = nameEl.value = "anonymous";
    let seedString = randomSeedStringFromName(name);
    let seedEl = document.getElementById("fgardens-settings-seed");
    seedEl.value = seedString;
    // invoke a reset
    resetGame();
  }
  
  /**
   * Load the game from the cookie.
   */
  const loadGame = function() {
    let savePack = cookieGet("future_gardens_local");
    if(savePack === "") {
      setupGameFirstTime();
    } else {
      // TODO actual load
    }
    rebuildUIAll();
  }
  
  /**
   * Save the game to the cookie.
   */
  const saveGame = function() {
    // TODO actual save
  }
  
  /**
   * Call this once to add the CSS file to the doc.
   */
  const applyStyles = function() {
    let styleEl = document.createElement("link");
    styleEl.setAttribute("rel", "stylesheet");
    styleEl.setAttribute("type", "text/css");
    styleEl.setAttribute("href", "/assets/css/future_gardens.css");
    document.head.appendChild(styleEl);
  }
  
  /**
   * Call this once when the page is loaded to start up the game.
   */
  const initGame = function() {
    checkCompatibility();
    applyStyles();
    loadGame();
    
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
    randomSeedVerifiedTick = performance.now();
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
  
  // --- game start up ---
  
  window.onload = initGame;
  
}(window.gardens = window.gardens || {}));
