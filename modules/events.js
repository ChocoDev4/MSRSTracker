import * as Graph from "./graph.js";
import * as Datahandler from "./datahandler.js";
import * as Rev from "./sim/rev.js";
const go = Graph.objs;
const snav = document.querySelector(".sidenav");
const datapacks = Datahandler.datapacks;
const btn = {
  rev: document.querySelector("#brev")
}
let curRunner;

function simEvent() {
  Rev.simulate(datapacks.get(go.specifics), datapacks.get(go.runner));
}

btn.rev.addEventListener("click", (e => {
  Graph.stack.set("bg",Graph.bar)
  revloop();
}))

function loadToGraph(data) {
  if(data.type == "runner") {
    Graph.Load.objects(data.name,"-",null,"-","-",null,"-","-");
    curRunner = Datahandler.datapacks.get(data.name);
  } else if(data.type == "item") {
    Graph.Load.objects(null,data.odds,data.name,null,null,null)
  }
  if(go.runner !== null && go.specifics !== null) {
    snav.style.opacity = 1;
  } else {
    snav.style.opacity = 0;
  }
}

function revloop(cb) {
  simEvent();
  window.requestAnimationFrame(revloop);
}

export {loadToGraph}