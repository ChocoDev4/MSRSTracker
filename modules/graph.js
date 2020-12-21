import {ctx, canv, stack} from "./gui.js";
import {datapacks} from "./datahandler.js";
const extras = new Map();

async function fetcher(loc) {
  const req = await fetch(loc);
  return req;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  // borrowed code from StackExchange , too lazy
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
  stack.set("ts", textStat);
}

const tf = {
  mw: 150,
  mh: 15
}

const objs = {
  runner: null,
  odds: 0,
  specifics: null,
  goal: 0,
  attempts: 0,
  received: 0,
  success: 0,
  fails: 0,
  cumulation: 0 // this number is used to track graph spacing
}

class Load {
  static objects(ru=null,od=null,s=null,a=null,re=null, gl=null,su=null,fa=null, extra=[]) {
    /* IMPORTANT!
    extra format: [(k,v),(k,v)...]
    */
    if(ru !== null) objs.runner = ru;
    if(od !== null) objs.odds = od;
    if(s !== null) objs.specifics = s;
    if(a !== null) objs.attempts = a;
    if(re !== null) objs.received = re;
    if(su !== null) objs.success = su;
    if(fa !== null) objs.fails = fa;
    if(gl !== null) objs.goal = gl;
    objs.cumulation = objs.success + objs.fails;
    for(let i = 0; i<extra.length;i++) {
      extras.set([i]);
    }
  }
  static importExtra() {
    // TBA:: NOT FIRST PRIORITY
  }
}

class SaveGraph {
  constructor(pos=[],size=[],cum=0, type) {
    this.pos = pos;
    this.size = size;
    this.cum = cum;
    this.type = type;
    switch(type) {
      case "bar":
      stack.set(`b${cum}`, function() {
        ctx.fillStyle = "red";
        ctx.moveTo(pos[0], pos[1])
        ctx.fillRect(pos[0], pos[1], size[0], size[1]);
      });
      break;
      default:
      console.error("No Graph Type set!")
    }
  }
}

function barline(defBott, defMul) {
  const limit = -(objs.goal*defMul);
  console.log(limit)
  ctx.fillStyle = "#888";
  ctx.moveTo(0,window.innerHeight)
  for(let i = 0; i<objs.goal+1;i++) {
    ctx.moveTo(0,window.innerHeight-99-(i*15));
    ctx.strokeStyle = "#800000";
    ctx.lineWidth = 0.1;
    ctx.lineTo(window.innerWidth,window.innerHeight-99-(i*15));
    ctx.fillText(i,canv.width/2,window.innerHeight-104-(i*15));
    ctx.stroke();
  }
}
function bar() {
  
  const currCum = objs.cumulation;
  const pos = [5+(objs.cumulation*15),canv.height];
  const multiplier = 1;
  const size = [10,-(objs.received*multiplier)]
  barline(pos[1],multiplier);
  ctx.fillStyle = "red";
  ctx.moveTo(1,500)
  ctx.fillRect(pos[0],pos[1],size[0],size[1]);
  new SaveGraph(pos,size,currCum,"bar")
}

function textStat() {
  const dispText = `
  Runner: ${objs.runner}
  Specifics: ${objs.specifics}
  Odds: ${objs.odds}
  
  Attempt #${objs.attempts}
  Rec. ${objs.specifics}: ${objs.received}
  Success: ${objs.success}
  Fails: ${objs.fails}`
  ctx.fillStyle = "#fff";
  ctx.font = "12px serif";
  wrapText(ctx,dispText,5,5,tf.mw,tf.mh);
}

export {init, Load, objs, stack, bar}