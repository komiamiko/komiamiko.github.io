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
  let poolPlantNamePrefix =
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
  let poolPlantNameSuffix =
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
   * From a string, derive a random state.
   * Random state is 128 bits - length 4 array of int32
   * Not extremely sensitive to differences in input, but good enough.
   */
  let randomDeriveState = function(text) {
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
  let randomConcatState = function(s, t) {
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
  let randomGetNext = function(s, n) {
    return s[3] % n;
  }
  
  /**
   * Concatenate 2 Uint8Array instances.
   */
  let concatBytes = function(s, t) {
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
  let randomBytes = function(n) {
    s = new Uint8Array(n);
    window.crypto.getRandomValues(s);
    return s;
  }
  
  // --- other useful utilities ---
  
  /**
   * Clear a DOM element's children.
   */
  let clearChildren = function(el) {
    while(el.lastElementChild) {
      el.removeChild(el.lastElementChild);
    }
  }
  
  /**
   * Commonly used, make a single paragraph node
   */
  let makep = function(text) {
    let textEl = document.createTextNode(text);
    let paraEl = document.createElement("p");
    paraEl.appendChild(textEl);
    return paraEl;
  }
  
  /**
   * Derive a random seed from a name and a 128-bit
   * (16 byte) salt as a Uint8Array.
   */
  let randomSeedStringFromName = function(name, s) {
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
  let randomSeedVerifiedGenerationLoop = function(name, salt) {
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
            let accept = (hash[0] | hash[1]) === 0;
            ++randomSeedVerifiedIters;
            let seedEl = document.getElementById("fgardens-settings-seed");
            let notifyEl = document.getElementById("fgardens-settings-verified-seed-display");
            if(seedEl.value !== "") {
            } else if(accept) {
              seedEl.value = seedString;
              clearChildren(notifyEl);
              notifyEl.appendChild(makep("Generated seed in "
                + randomSeedVerifiedIters.toString() + " attempts, in "
                + ((tickNow - randomSeedVerifiedTick) / 1000).toFixed(2) + " seconds: "
                + seedString));
            } else {
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
  
  // --- external signal handlers, actual implementation ---
  
  /**
   * Generate a new seed and put it in the seed box.
   */
  let sendNewSeedCasual = function() {
    let nameEl = document.getElementById("fgardens-settings-name");
    let name = nameEl.value;
    let seedString = randomSeedStringFromName(name);
    let seedEl = document.getElementById("fgardens-settings-seed");
    seedEl.value = seedString;
  }
  
  /**
   * Generate a new seed that meets the verification requirements.
   */
  let sendNewSeedVerified = function() {
    let nameEl = document.getElementById("fgardens-settings-name");
    let name = nameEl.value;
    let seedEl = document.getElementById("fgardens-settings-seed");
    seedEl.value = "";
    let notifyEl = document.getElementById("fgardens-settings-verified-seed-display");
    clearChildren(notifyEl);
    notifyEl.appendChild(makep("Generating verified seed..."));
    randomSeedVerifiedIters = 0;
    randomSeedVerifiedTick = window.performance.now();
    let salt = randomBytes(16);
    randomSeedVerifiedGenerationLoop(name, salt);
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
