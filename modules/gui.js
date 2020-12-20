import {init} from "./graph.js";
import {datapacks} from "./speedrunners.js";
const canv = document.createElement("canvas");
canv.width = 500;
canv.height = 500;
document.body.appendChild(canv)

const ctx = canv.getContext("2d");
const stack = new Map();

class Canvas {
  static draw() {
    Canvas.clear();
    stack.forEach(funcs => {
      funcs();
    })
    window.requestAnimationFrame(Canvas.draw)
  }
  static clear() {
    ctx.clearRect(0,0,canv.width, canv.height);
  }
}

class Display {
  static nav(dom, dir) {
    Display.canvas();
    datapacks.forEach(data => {
     const obj = document.createElement("img");
     obj.src = data.imgURL;
     obj.id = "runner-" + data.name;
     obj.className = "nav-item";
     dom.appendChild(obj);
     // add event handler to load
    });
  }
  static canvas() {
  }
}

setTimeout(() => {
  init();
  Canvas.draw();
},100);

export {Display, Canvas, ctx, stack}