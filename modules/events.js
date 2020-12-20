import * as Graph from "./graph.js";
import * as Datahandler from "./datahandler.js";
const go = Graph.objs;
let curRunner;

function loadToGraph(data) {
  if(data.type == "runner") {
    Graph.Load.objects(data.name,"-","N/A","-","-","-");
    curRunner = Datahandler.datapacks.get(data.name);
  } else if(data.type == "item") {
    console.log(data.name)
    Graph.Load.objects(null,data.odds,data.name,null,null,null)
  }
}

export {loadToGraph}