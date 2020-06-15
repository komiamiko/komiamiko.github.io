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
    'arrow', 'ash', 'aster', 'astra', 'band', 'bear', 'bird', 'bitter',
    'bladder', 'block', 'blushing', 'bon', 'bora', 'bour', 'box',
    'bright', 'brittle', 'buck', 'butter', 'cannon', 'cara', 'cast',
    'cat', 'cela', 'clock', 'cloud', 'cough', 'counting', 'crab', 'cream',
    'curdle', 'curse', 'dark', 'dead', 'di', 'dire', 'disc', 'dog',
    'dragon', 'drifting', 'dripping', 'duck', 'dwarf', 'ehre', 'elf',
    'equi', 'eremo', 'euaster', 'eudi', 'euro', 'even', 'fang', 'feather',
    'fili', 'fire', 'flash', 'flick', 'flirt', 'flock', 'flow', 'fog',
    'folding', 'fox', 'friend', 'furry', 'gate', 'gem', 'gentle', 'gin',
    'gold', 'goose', 'greed', 'hairy', 'harmony', 'hell', 'hill', 'horn',
    'horror', 'horse', 'human', 'hundred', 'hyd', 'ice', 'ink', 'iron',
    'june', 'knot', 'leg', 'lion', 'litho', 'liver', 'lizard', 'long',
    'love', 'magno', 'marat', 'mega', 'memory', 'meter', 'micro',
    'midnight', 'mil', 'milk', 'million', 'mimosa', 'mirror', 'mist',
    'mond', 'mono', 'moon', 'mountain', 'ner', 'noon', 'north', 'odd',
    'ophio', 'oracle', 'orc', 'oyster', 'podo', 'poly', 'prime', 'pulse',
    'quick', 'ring', 'rocket', 'rope', 'rotu', 'sand', 'scroll',
    'serpent', 'short', 'silk', 'silver', 'sky', 'slippery', 'snap',
    'sneeze', 'snow', 'spiral', 'split', 'spring', 'star', 'stone', 'sun',
    'sunda', 'thin', 'thousand', 'thunder', 'tile', 'tour', 'tricol',
    'truffle', 'twisted', 'twitching', 'vampire', 'vibrant', 'vile',
    'void', 'voodoo', 'walking', 'water', 'welwits', 'west', 'whisk',
    'winged', 'winter', 'witch', 'wolf', 'worm']
    ;
  let poolPlantNameSuffix =
    ['ao', 'arum', 'ball', 'balloon', 'bane', 'bean', 'berry', 'blood',
    'bract', 'bulb', 'burst', 'cachrys', 'cane', 'cap', 'carpus', 'chia',
    'coral', 'corn', 'cot', 'crown', 'cup', 'cyme', 'dew', 'divia',
    'drupe', 'fan', 'fern', 'fia', 'fig', 'fin', 'finger', 'flax',
    'flower', 'fork', 'ginale', 'go', 'grass', 'holly', 'ica', 'itum',
    'ium', 'jelly', 'knight', 'larch', 'leek', 'liale', 'lily', 'lip',
    'lock', 'mara', 'mella', 'melon', 'mimic', 'morel', 'moss', 'mussel',
    'navel', 'nora', 'nut', 'osma', 'pakko', 'parasol', 'pate', 'peach',
    'pine', 'pitcher', 'plume', 'pod', 'podiida', 'psida', 'pudica',
    'puff', 'ric', 'root', 'saddle', 'scale', 'setida', 'shield', 'shoot',
    'shroom', 'sia', 'sid', 'spine', 'sprout', 'stalk', 'strobos', 'syne',
    'tail', 'terus', 'thistle', 'thorn', 'tiida', 'tongue', 'tooth',
    'torch', 'trap', 'tube', 'umbrella', 'vine', 'web', 'weed', 'whorl',
    'wick', 'wood', 'wort', 'yam', 'yarrow']
    ;
  
}(window.gardens = window.gardens || {}));