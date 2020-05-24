// --- utility functions, not specific to this app --

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Convert a string into a string which is a hash of the original string.
 * The new string must have bounded length (requirement for hashes).
 * For these purposes it should also be friendly to both HTML and JS and a valid variable name.
 *
 * As currently implemented, it should be sufficiently fast, and the hash has 96 bits of information.
 */
function stringToStringHash(message) {
  var x = 959153602,
    y = 936788088,
    z = 1681122708;
  for (var index = 0; index < message.length; index += 2) {
    var c0 = message.charCodeAt(index);
    x ^= c0;
    z = (z * 387569 + x) & 0xffffffff;
    y += z;
    if (index + 1 < message.length) {
      var c1 = message.charCodeAt(index);
      y ^= c1;
    }
    z = (z * 346825 + y) & 0xffffffff;
    z ^= z >> 18;
    x += z;
  }
  return 'H_' + (0x300000000+x).toString(16) + '_' + (0x300000000+y).toString(16) + '_' + (0x300000000+z).toString(16);
}

function numberCompare(a, b) {
  if (a === b) return 0;
  if (a < b) return -1;
  return 1;
}

// --- functions and such to work with ordinals, but not highly specific game mechanics ---

/**
 * Represents an ordinal.
 * Internal representation .data is either
 *   [N] meaning the natural number N
 * or
 *   [A, B, N, C] meaning psi_A(B)N + C where A, B, C are Ordinal
 *     and psi_A(B) > C
 * Also has member .hash which is a string. Hashes are assumed to uniquely identify ordinals.
 * This is pretty low level, so please use the static utilities to work with ordinals.
 */
class Ordinal {
  constructor(data) {
    // attach member data
    this.data = data;
    this.isOrdinal = true;
    // precompute hash
    let hash_blob;
    if (data.length == 1) {
      hash_blob = data[0].toString();
    } else {
      hash_blob = data[0].hash + "__" + data[1].hash + "__" +
        data[2].toString() + "__" + data[3].hash;
    }
    this.hash = stringToStringHash(hash_blob);
  }
  toString() {
  	if(this.data.length === 1){
    return this.data[0].toString();
    }else{
    var mulSuffix = "";
    var addSuffix = "";
    if(this.data[2] !== 1){
    mulSuffix = this.data[2].toString();
    }
    if(!ordinalFastEq(this.data[3], ZERO_ORDINAL)){
    addSuffix = " + " + this.data[3].toString();
    }
    return "ψ<sub>" + this.data[0].toString() +
    "</sub>(" + this.data[1].toString() + ")" + mulSuffix +
    addSuffix;
    }
  }
}

/**
 * Convert to ordinal.
 * Should only be used by the super low level utilties since it bypasses sanity checks.
 */
function toOrdinal(value) {
  if (value.isOrdinal) return value;
  return new Ordinal(value);
}
/**
 * Convert to ordinal, with some overhead but more safe. Use by higher level ordinal processing to avoid stupid things happening.
 */
function safeToOrdinal(value) {
	if (value.isOrdinal) return value;
  if (value.length === 1){
    if(value[0] === 0)return ZERO_ORDINAL;
    if(value[0] === 1)return ONE_ORDINAL;
    return toOrdinal(value);
  }
  return ordinalAdd(ordinalMulByNumber(ordinalPsi(
  value[0], value[1]), value[2]), value[3]);
}

const ZERO_ORDINAL = toOrdinal([0]);
const ONE_ORDINAL = toOrdinal([1]);

/**
 * Compare equality of ordinals and that's it.
 */
function ordinalFastEq(lhs, rhs) {
  return lhs.hash === rhs.hash;
}

var ordinalCompareCacheLT = {};

/**
 * 3-way comparator for ordinals.
 */
function ordinalCompare(lhs, rhs) {
  if (ordinalFastEq(lhs, rhs)) return 0;
  if ((lhs.hash + "__" + rhs.hash) in ordinalCompareCacheLT) return -1;

  if ((rhs.hash + "__" + lhs.hash) in ordinalCompareCacheLT) return 1;
  var result = ordinalCompareInner(lhs, rhs);
  if (result < 0) {
    ordinalCompareCacheLT[lhs.hash + "__" + rhs.hash] = true;
  } else if (result > 0) {
    ordinalCompareCacheLT[rhs.hash + "__" + lhs.hash] = true;
  }
  return result;
}

function ordinalCompareInner(lhs, rhs) {
  var lhsData = lhs.data;
  var rhsData = rhs.data;
  if (lhsData.length === 1 && rhsData.length !== 1) {
    return -1;
  } else if (lhsData.length !== 1 && rhsData.length === 1) {
    return 1;
  } else if (lhsData.length === 1 && rhsData.length === 1) {
    return numberCompare(lhsData[0], rhsData[0]);
  }
  var acmp = ordinalCompare(lhsData[0], rhsData[0]);
  if (acmp !== 0) return acmp;
  var bcmp = ordinalCompare(lhsData[1], rhsData[1]);
  if (bcmp !== 0) return bcmp;
  var ncmp = numberCompare(lhsData[2], rhsData[2]);
  if (ncmp !== 0) return ncmp;
  var ccmp = ordinalCompare(lhsData[3], rhsData[3]);
  return ccmp;
}

var ordinalAddCache = {};

/**
 * Add ordinals. Somewhat low level. The addition must
 * be known in advance to be valid.
 */
function ordinalAdd(lhs, rhs) {
  if (ordinalFastEq(lhs, ZERO_ORDINAL)) return rhs;
  if (ordinalFastEq(rhs, ZERO_ORDINAL)) return lhs;
  var cacheKey = lhs.hash + "__" + rhs.hash;
  if (cacheKey in ordinalAddCache) return ordinalAddCache[cacheKey];
  var result;
  if (lhs.data.length === 1 && rhs.data.length === 1) {
    result = toOrdinal([lhs.data[0] + rhs.data[0]]);
  } else if (rhs.data.length !== 1 &&
    ordinalFastEq(lhs.data[0], rhs.data[0]) &&
    ordinalFastEq(lhs.data[1], rhs.data[1])) {
    result = toOrdinal([lhs.data[0], lhs.data[1],
      lhs.data[2] + rhs.data[2], rhs.data[3]
    ]);
  } else {
    result = toOrdinal([lhs.data[0], lhs.data[1],
      lhs.data[2], ordinalAdd(lhs.data[3], rhs)
    ])
  }
  ordinalAddCache[cacheKey] = result;
  return result;
}

var ordinalMulByNumberCache = {};

/**
 * Multiply ordinal by a number.
 */
function ordinalMulByNumber(lhs, rhs) {
  if (rhs === 0) return ZERO_ORDINAL;
  if (rhs === 1) return lhs;
  var cacheKey = lhs.hash + "__" + rhs.toString();
  if (cacheKey in ordinalMulByNumberCache) return ordinalMulByNumberCache[cacheKey];
  var result;
  if (lhs.data.length === 1) {
    result = toOrdinal([lhs.data[0] * rhs]);
  } else {
    result = toOrdinal([lhs.data[0], lhs.data[1], lhs.data[2] * rhs, lhs.data[3]]);
  }
  ordinalMulByNumberCache[cacheKey] = result;
  return result;
}

var ordinalPsiCache = {};

/**
 * psi_sub(value)
 */
function ordinalPsi(sub, value) {
  if (ordinalFastEq(sub, ZERO_ORDINAL) &&
    ordinalFastEq(value, ZERO_ORDINAL)) return ONE_ORDINAL;
  var cacheKey = sub.hash + "__" + value.hash;
  if (cacheKey in ordinalPsiCache) return ordinalPsiCache[cacheKey];
  var result = toOrdinal([sub, value, 1, ZERO_ORDINAL]);
  ordinalPsiCache[cacheKey] = result;
  return result;
}

var ordinalSeqCache = {};

/**
 * If this many ordinals are needed to craft this ordinal, which ordinals will those be?
 * For zero ordinal: returns empty list.
 * For successor ordinal: returns that many copies of the predecessor.
 * For limit ordinal: returns first that many terms of its fundamental sequence.
 * To allow for amortized linear time in best conditions, this function may actually compute more than requested and keep it in the cache.
 * How to quickly check the kind of ordinal based on the list:
 * For zero ordinal: list is empty.
 * For successor ordinal: all terms are the same.
 * For limit ordinal: terms are different and ascending.
 */
function ordinalSequence(value, termsRequested) {
  if (ordinalFastEq(value, ZERO_ORDINAL)) return [];
  var cacheKey = value.hash;
  var termsToCompute = Math.max(3, termsRequested);
  if (cacheKey in ordinalSeqCache) {
    var cached = ordinalSeqCache[cacheKey];
    if (cached.length >= termsRequested) return cached.slice(0, termsRequested);
    // only boost terms if the cache was too short, to prevent blowup
    termsToCompute = Math.round(termsToCompute * 1.26);
  }
  var result;
  var vdata = value.data;
  if (vdata.length === 1) { // successor, < omega
    result = [safeToOrdinal([vdata[0] - 1])];
    while (result.length < termsToCompute) {
      result.push(result[0]);
    }
  } else if (!ordinalFastEq(vdata[3], ZERO_ORDINAL)) { // more additive terms
    result = [];
    var pre = ordinalSequence(vdata[3], termsToCompute);
    for (var i = 0; i < pre.length; ++i) {
      result.push(safeToOrdinal([
        vdata[0], vdata[1], vdata[2], pre[i]
      ]))
    }
  } else if (vdata[2] !== 1) { // higher multiple - need to split
    result = [];
    var single = safeToOrdinal([vdata[0], vdata[1], 1, ZERO_ORDINAL]);
    var pre = ordinalSequence(single, termsToCompute);
    for (var i = 0; i < pre.length; ++i) {
      result.push(safeToOrdinal([
        vdata[0], vdata[1], vdata[2] - 1, pre[i]
      ]))
    }
  } else { // always a single psi_0 at the root, but what lies inside?
    // definitely a limit ordinal, we ruled out successors and zero
    // start tracking transforms info now in case the cofinality is uncountable
    // at the end, transforms will have length at least 1
    var applyTransform = function(tf, v) {
      if (tf[0] === 0) return ordinalPsi(v, 0);
      if (tf[0] === 1) return ordinalPsi(tf[1], v);
      return safeToOrdinal([tf[1], tf[2], tf[3], v]);
    }
    var post_transforms = [];
    var transforms = [];
    var current = value;
    while (current.data.length !== 1) {
      if (!ordinalFastEq(current.data[3], ZERO_ORDINAL)) { // more additive term inside
        transforms.push([3, current.data[0], current.data[1], current.data[2]]);
        current = current.data[3];
      } else if (current.data[2] !== 1) { // higher multiple, so split off additive term
        transforms.push([3, current.data[0], current.data[1], current.data[2] - 1]);
        current = safeToOrdinal([current.data[0], current.data[1], 1, ZERO_ORDINAL]);
      } else if (ordinalFastEq(current.data[1], ZERO_ORDINAL)) { // need different handling for psi_a(0)
        // sub can't be 0 due to normal form, so either successor or limit
        // explore further
        transforms.push([0]);
        current = current.data[0];
      } else { // psi_a(b) with b > 0
        // may need to reset depth if there's a new psi_0 to bind the start to
        if (ordinalFastEq(current.data[0], ZERO_ORDINAL)) {
          post_transforms = post_transforms.concat(transforms);
          transforms = [];
        }
        transforms.push([1, current.data[0]]);
        current = current.data[1];
      }
    }
    // finally, we are left with non-zero natural number successor
    // can't be 0 since we change direction to sub if we hit a 0 and psi_0(0) is illegal
    // so now we need a successor rule depending on what was last
    var inner = current.data[0];
    var lastTransformType;
    var lastIndex = transforms.length - 1;
    while (true) {
      lastTransformType = transforms[lastIndex][0];
      if (lastTransformType === 0 || lastTransformType === 1) break;
      --lastIndex;
    }
    if (lastTransformType === 1) { // the easier rule, psi_a(b+1), cofinality w
      result = [];
      for (var i = 0; i < termsToCompute; ++i) {
        var v = safeToOrdinal([inner - 1]);
        for (var j = transforms.length - 1; j >= lastIndex; --j) {
          v = applyTransform(transforms[j], v);
        }
        v = ordinalMulByNumber(v, i);
        for (var j = lastIndex - 1; j >= 0; --j) {
          v = applyTransform(transforms[j], v);
        }
        for (var j = post_transforms.length - 1; j >= 0; --j) {
          v = applyTransform(post_transforms[j], v);
        }
        result.push(v);
      }
    } else { // the harder rule, psi_(a+1)(0), cofinality > w
      // we need to modify the transform sequence
      var u = safeToOrdinal([inner - 1]);
      for (var j = transforms.length - 1; j > lastIndex; --j) {
        u = applyTransform(transforms.pop(), u);
      }
      transforms[lastIndex] = [1, u]
      // now put the final psi_0 in post
      post_transforms.push(transforms.shift());
      // iterate the inner transform
      result = [ZERO_ORDINAL];
      while (result.length < termsToCompute) {
        var v = result[result.length - 1];
        for (var j = transforms.length - 1; j >= 0; --j) {
          v = applyTransform(transforms[j], v);
        }
        result.push(v);
      }
      // apply post transform to all
      for (var i = 0; i < termsToCompute; ++i) {
        var v = result[i];

        for (var j = post_transforms.length - 1; j >= 0; --j) {
          v = applyTransform(post_transforms[j], v);
        }
        result[i] = v;
      }
    }
  }
  ordinalSeqCache[cacheKey] = result;
  result = result.slice(0, termsRequested); // we may have computed more than needed
  return result;
}


