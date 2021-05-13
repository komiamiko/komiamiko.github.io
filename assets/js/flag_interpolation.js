let boySlider = document.getElementById("boySlider");
let boyPercent = document.getElementById("boyPercent");
let girlSlider = document.getElementById("girlSlider");
let girlPercent = document.getElementById("girlPercent");
let stripes = [
  document.getElementById("stripe-01"),
  document.getElementById("stripe-02"),
  document.getElementById("stripe-03"),
  document.getElementById("stripe-04"),
  document.getElementById("stripe-05"),
  document.getElementById("stripe-06"),
  document.getElementById("stripe-07"),
  document.getElementById("stripe-08"),
  document.getElementById("stripe-09"),
  document.getElementById("stripe-10"),
  document.getElementById("stripe-11"),
];
let totalHeight = 250;

let black = [0, 0, 0];
let darkGrey = [127, 127, 127];
let middleGrey = [185, 185, 185];
let lightGrey = [195, 195, 195];
let white = [255, 255, 255];
let green = [184, 244, 131];
let demiPink = [255, 174, 201];
let biPink = [236, 166, 203];
let darkPink = [196, 121, 160];
let demiBlue = [153, 217, 234];
let biBlue = [154, 199, 232];
let darkBlue = [108, 131, 207];
let purple = [213, 199, 232];

let stripeWidthTable = [
[[1, 1, 0], [1, 1, 1], [0, 0, 1]],
[[1, 1, 0], [1, 1, 0], [0, 0, 0]],
[[1, 0, 0], [0, 0, 0], [0, 0, 0]],
[[0.5, 1, 1], [1, 1, 1], [1, 1, 1]],
[[0, 0, 0], [0, 0, 1], [0, 0, 1]],
[[0, 1, 0], [1, 1, 1], [0, 1, 1]],
[[0, 0, 0], [0, 0, 0], [0, 1, 1]],
[[0.5, 1, 1], [1, 1, 1], [1, 1, 1]],
[[1, 0, 0], [0, 0, 0], [0, 0, 0]],
[[1, 1, 0], [1, 1, 0], [0, 0, 0]],
[[1, 1, 0], [1, 1, 0], [0, 1, 1]],
];

let topPinkTable = [
[green, demiPink, demiPink],
[demiBlue, biPink, biPink],
[demiBlue, biPink, biPink],
];
let bottomBlueTable = [
[green, demiPink, demiPink],
[demiBlue, biBlue, biBlue],
[demiBlue, biBlue, biBlue],
];
let topGreyTable = [
[black, darkGrey, darkGrey],
[darkGrey, darkGrey, darkPink],
[darkGrey, darkPink, darkPink],
];
let bottomGreyTable = [
[black, darkGrey, darkGrey],
[darkGrey, darkGrey, darkBlue],
[darkGrey, darkBlue, darkBlue],
];

let bz2 = function(a, b, t) {
	return a * (1 - t) + b * t;
}

let i3bz2 = function(a, b, c, t) {
  return t < 0.5 ? bz2(a, b, t * 2) : bz2(b, c, t * 2 - 1);
}

let i3x3bz2 = function(x, tb, tg) {
	let xa,xb;
  if(tb < 0.5) {
  	tb = tb * 2;
    xa = x[0];
    xb = x[1];
  } else {
  	tb = tb * 2 - 1;
    xa = x[1];
    xb = x[2];
  }
  let xaa,xab,xba,xbb;
  if(tg < 0.5) {
  	tg = tg * 2;
    xaa = xa[0];
    xab = xa[1];
    xba = xb[0];
    xbb = xb[1];
  } else {
  	tg = tg * 2 - 1;
    xaa = xa[1];
    xab = xa[2];
    xba = xb[1];
    xbb = xb[2];
  }
  return bz2(bz2(xaa, xab, tg), bz2(xba, xbb, tg), tb);
}

let color_bz2 = function(a, b, t) {
	let result = [];
  for(let i = 0; i < 3; ++i) {
  	result.push(bz2(a[i], b[i], t));
  }
  return result;
}

let color_i3bz2 = function(a, b, c, t) {
	let result = [];
  for(let i = 0; i < 3; ++i) {
  	result.push(i3bz2(a[i], b[i], c[i], t));
  }
  return result;
}

let color_i3x3bz2 = function(x, tb, tg) {
	let xa,xb;
  if(tb < 0.5) {
  	tb = tb * 2;
    xa = x[0];
    xb = x[1];
  } else {
  	tb = tb * 2 - 1;
    xa = x[1];
    xb = x[2];
  }
  let xaa,xab,xba,xbb;
  if(tg < 0.5) {
  	tg = tg * 2;
    xaa = xa[0];
    xab = xa[1];
    xba = xb[0];
    xbb = xb[1];
  } else {
  	tg = tg * 2 - 1;
    xaa = xa[1];
    xab = xa[2];
    xba = xb[1];
    xbb = xb[2];
  }
  return color_bz2(color_bz2(xaa, xab, tg), color_bz2(xba, xbb, tg), tb);
}

let renderFlag = function(stripeEls, stripeWidths, stripeColors) {
	let ypos = 0;
	for(let i = 0; i < stripeEls.length; ++i) {
  	let iStripeEl = stripeEls[i];
    let iStripeWidth = stripeWidths[i];
    let iStripeColor = stripeColors[i];
    iStripeEl.style["width"] = "100%";
    iStripeEl.style["height"] = iStripeWidth.toString() + "px";
    iStripeEl.style["background-color"] = "rgb(" + iStripeColor[0].toString() + ", " + iStripeColor[1].toString() + ", " + iStripeColor[2].toString() + ")";
/*
    iStripeEl.style["display"] = "block";
    iStripeEl.style["padding"] = "0";
    iStripeEl.style["margin"] = "0";
    iStripeEl.style["position"] = "relative";
    iStripeEl.style["top"] = "0px";
*/
    ypos = iStripeWidth;
  }
}

let remakeVisuals = function() {
	console.log("hi");
	let boypi = boySlider.value;
  let girlpi = girlSlider.value;
  boyPercent.innerHTML = boypi.toString();
  girlPercent.innerHTML = girlpi.toString();
  let boyt = boypi/100;
  let girlt = girlpi/100;
  let maxt = Math.max(boyt, girlt);
  let topGrey = color_i3x3bz2(topGreyTable, boyt, girlt)
  let bottomGrey = color_i3x3bz2(bottomGreyTable, boyt, girlt);
  let iMiddleGrey = color_i3bz2(middleGrey, lightGrey, lightGrey, maxt);
  let topPink = color_i3x3bz2(topPinkTable, boyt, girlt);
  let bottomBlue = color_i3x3bz2(bottomBlueTable, boyt, girlt);
  let stripeWidths = [];
  let sumStripeWidths = 0;
  for(let i = 0; i < stripeWidthTable.length; ++i) {
  	let iStripeWidth = i3x3bz2(stripeWidthTable[i], boyt, girlt);
  	stripeWidths.push(iStripeWidth);
    sumStripeWidths += iStripeWidth;
  }
  let stripeWidthMul = totalHeight / sumStripeWidths;
  console.log(stripeWidths);
  for(let i = 0; i < stripeWidths.length; ++i) {
  	stripeWidths[i] *= stripeWidthMul;
  }
  stripeColors = [topGrey, iMiddleGrey, white, topPink, purple, white, purple, bottomBlue, white, iMiddleGrey, bottomGrey];
  console.log("hello!");
  renderFlag(stripes, stripeWidths, stripeColors);
};

remakeVisuals();

boySlider.oninput = function() {
  remakeVisuals();
}

girlSlider.oninput = function() {
  remakeVisuals();
}