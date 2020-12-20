import {init} from "./graph.js";
import {datapacks} from "./datahandler.js";
import * as Events from "./events.js";
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
  static topnav(dom, dir) {
    datapacks.forEach(data => {
     if(data.type !== 'runner') return false;
     const obj = document.createElement("img");
     obj.src = data.imgURL;
     obj.id = "runner-" + data.name;
     obj.className = "nav-item";
     obj.addEventListener("mouseup", () => {
      Events.loadToGraph(data)
      });
     dom.appendChild(obj);
     // add event handler to load
    });
  }
  static bottnav(dom,dir) {
    datapacks.forEach(data => {
      if(data.type !== "item") return false;
      const obj = document.createElement("img");
      obj.src = data.imgURL;
      obj.id = "item-" + data.id;
      obj.className = "nav-item";
      obj.addEventListener("mouseup", () => {
        Events.loadToGraph(data)
      });
      dom.appendChild(obj);
    })
  }
  //static canvas() { }
}

setTimeout(() => {
  init();
  Canvas.draw();
},100);

export {Display, Canvas, ctx, stack}