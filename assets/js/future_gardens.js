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
  
}(window.gardens = window.gardens || {}));
