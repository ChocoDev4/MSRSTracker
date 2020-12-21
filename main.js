import * as GUI from "./modules/gui.js";
import * as Graph from "./modules/graph.js";
import * as Sr from "./modules/datahandler.js";
const dataloc = "./data";
const srloc = "./data/speedrunners"
const rlnav = document.querySelector("#rl"),
btnav = document.querySelector("#btnav")
// iterates over speedrunner's metadata
Sr.dataIteration(false, srloc);
async function fetcher(loc) {
  const req = await fetch(loc);
  return req;
}

function reqDP(fn) {
  const data = fetcher(`${dataloc}/${fn}.json`);
  return data;
}

function init() {
  GUI.Display.topnav(rlnav);
  GUI.Display.bottnav(btnav)
}

window.setTimeout(() => {
  init();
},100);