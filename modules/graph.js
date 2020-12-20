import {ctx, stack} from "./gui.js";
const extras = new Map();

async function fetcher(loc) {
  const req = await fetch(loc);
  return req;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var cars = text.split("\n");

  for (var ii = 0; ii < cars.length; ii++) {

    var line = "";
    var words = cars[ii].split(" ");

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > maxWidth) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
    y += lineHeight;
  }
}

function init() {
  stack.set("ts", textStat)
}

const tf = {
  mw: 150,
  mh: 15
}

const objs = {
  runner: "string",
  odds: 0,
  specifics: "item",
  attempts: 0,
  received: 0,
  success: 0
}

class Load {
  static objects(ru,od,s,a,re,su, extra=[]) {
    /* IMPORTANT!
    extra format: [(k,v),(k,v)...]
    */
    objs.runner = ru;
    objs.odds = od;
    objs.specifics = s;
    objs.attempts = a;
    objs.received = re;
    objs.success = su;
    for(let i = 0; i<extra.length;i++) {
      extras.set([i]);
    }
  }
  static importExtra() {
    // TBA:: NOT FIRST PRIORITY
  }
}

function textStat() {
  const dispText = `
  Runner: ${objs.runner}
  Specifics: ${objs.specifics}
  Odds: ${objs.odds}
  
  Attempt #${objs.attempts}
  Rec. ${objs.specifics}: ${objs.received}
  Success: ${objs.success}`
  ctx.fillStyle = "#fff";
  ctx.font = "12px serif";
  wrapText(ctx,dispText,5,5,tf.mw,tf.mh);
}

export {init, Load, objs, stack}