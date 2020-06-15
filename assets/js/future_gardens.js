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
  
  /*
   * Plant names are composed by concatenating a random prefix and suffix
   */
  let poolPlantNamePrefix = 
    ['aca', 'acon', 'altis', 'amber', 'anger', 'anop', 'apri', 'arau',
    'arch', 'armil', 'arrow', 'ash', 'aster', 'astra', 'bald', 'band',
    'beam', 'bear', 'bird', 'bitter', 'bladder', 'blaze', 'blessed',
    'block', 'blushing', 'bon', 'bora', 'bour', 'box', 'bright',
    'bristle', 'brittle', 'buck', 'burning', 'butter', 'cannon', 'cara',
    'cast', 'cat', 'cela', 'clock', 'clone', 'cloud', 'coast', 'cough',
    'counting', 'crab', 'cream', 'cryptic', 'curdle', 'curse', 'dark',
    'date', 'dead', 'deep', 'di', 'dire', 'disc', 'dog', 'dragon',
    'dream', 'drifting', 'dripping', 'drooping', 'duck', 'dune', 'dwarf',
    'eagle', 'echo', 'ehre', 'elf', 'equi', 'eremo', 'euaster', 'euca',
    'eudi', 'euro', 'even', 'ever', 'fang', 'feather', 'fili', 'fire',
    'fitz', 'flash', 'flick', 'flirt', 'flock', 'flow', 'fog', 'folding',
    'fox', 'friend', 'frozen', 'furry', 'gate', 'gem', 'gentle', 'gin',
    'glass', 'gold', 'goose', 'grand', 'greed', 'guiding', 'hairy',
    'harmony', 'hawk', 'hell', 'hill', 'holy', 'horn', 'horror', 'horse',
    'human', 'hundred', 'huon', 'hyd', 'ibis', 'ice', 'immortal', 'ink',
    'iron', 'joumon', 'june', 'kau', 'kayano', 'knot', 'koka', 'leg',
    'limber', 'lion', 'litho', 'liver', 'lizard', 'llanger', 'long',
    'love', 'magno', 'mal', 'marat', 'marking', 'mega', 'memory', 'meter',
    'micro', 'midnight', 'mil', 'milk', 'million', 'mimosa', 'miracle',
    'mirror', 'mist', 'mond', 'mono', 'moon', 'mountain', 'mystery',
    'ner', 'noon', 'nootka', 'north', 'odd', 'ominous', 'once', 'ophio',
    'oracle', 'orc', 'oyster', 'pan', 'pedun', 'phantom', 'podo', 'poly',
    'pop', 'prime', 'pulse', 'quaking', 'quartz', 'quick', 'rain',
    'rainbow', 'ring', 'rocket', 'rope', 'rotu', 'ruby', 'sacred', 'sand',
    'sapphire', 'scroll', 'sea', 'serpent', 'shivering', 'short',
    'signal', 'silk', 'silly', 'silver', 'sky', 'sleepless', 'sleepy',
    'slippery', 'snap', 'sneeze', 'snow', 'spectral', 'spiral', 'split',
    'spring', 'star', 'stasis', 'stone', 'storm', 'subal', 'sun', 'sunda',
    'switch', 'tane', 'thin', 'thousand', 'thunder', 'tile', 'tour',
    'tricol', 'truffle', 'twisted', 'twitching', 'vampire', 'vibrant',
    'vile', 'violet', 'void', 'voodoo', 'waiting', 'walking', 'watching',
    'water', 'welwits', 'west', 'whisk', 'winged', 'winter', 'wish',
    'witch', 'wolf', 'worm', 'year']
    ;
  let poolPlantNameSuffix = 
    ['all', 'ao', 'arum', 'aspen', 'bab', 'ball', 'balloon', 'bane',
    'bean', 'berry', 'blood', 'bract', 'bulb', 'burst', 'cachrys', 'cana',
    'cane', 'cap', 'carpus', 'cedar', 'chia', 'cone', 'coral', 'corn',
    'cot', 'crown', 'cup', 'cyme', 'cypress', 'dew', 'divia', 'drupe',
    'fan', 'fern', 'fia', 'fig', 'fin', 'finger', 'flax', 'flower',
    'fork', 'ginale', 'go', 'grass', 'holly', 'ica', 'itum', 'ium',
    'jelly', 'knight', 'lar', 'larch', 'leek', 'liale', 'lily', 'lip',
    'lock', 'mara', 'mella', 'melon', 'meria', 'mimic', 'morel', 'moss',
    'mussel', 'navel', 'niper', 'nora', 'nut', 'nyw', 'oak', 'osma',
    'pakko', 'palm', 'parasol', 'pate', 'peach', 'petiole', 'pine',
    'pitcher', 'plane', 'plume', 'pod', 'podiida', 'psida', 'pudica',
    'puff', 'redwood', 'reed', 'ri', 'ric', 'root', 'roya', 'saddle',
    'scale', 'setida', 'shield', 'shoot', 'shroom', 'sia', 'sid', 'spine',
    'sprout', 'spruce', 'stalk', 'strobos', 'sugi', 'syne', 'tail',
    'terus', 'thistle', 'thorn', 'tiida', 'tongue', 'tooth', 'torch',
    'trap', 'tube', 'umbrella', 'vine', 'web', 'weed', 'whorl', 'wick',
    'wood', 'wort', 'yam', 'yarrow']
    ;
  
}(window.gardens = window.gardens || {}));