import * as Trade from "./modules/trade.js";
import * as GUI from "./modules/gui.js";
import * as Graph from "./modules/graph.js";
import * as Sr from "./modules/speedrunners.js";
const dataloc = "./data";
const srloc = "./data/speedrunners"
const rlnav = document.querySelector("#rl");
// iterates over speedrunner's metadata
Sr.dataIteration(false, srloc);

const piglin = new Trade.Entity()
piglin.load(reqDP("piglin1.16"));
async function fetcher(loc) {
  const req = await fetch(loc);
  return req;
}

function reqDP(fn) {
  const data = fetcher(`${dataloc}/${fn}.json`);
  return data;
}

function init() {
  GUI.Display.nav(rlnav, srloc);
  // temporary -- testing purposes and format
  const Dream = {
    datapack: "",
    item: "enderpearl",
    "goal": "rev"
  }
  // TODO: map the metadata, and use .get() to reference datapacks
  Trade.Simulate.barter(Dream);
  
}

window.setTimeout(() => {
  init();
},100);