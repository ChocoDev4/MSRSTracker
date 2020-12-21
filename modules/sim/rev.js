import {Load} from "../graph.js";

const simData = {
  attempts: 0,
  received: 0,
  goal: 0,
  success: 0,
  fails: 0
}

function reset(suc=false) {
  simData.attempts = 0,
  simData.received = 0
  suc ? simData.succes = 0 : false;
}

function simulate(item, runner) {
 for(let i = 0; i < runner.stat.length; i++) {
   if(runner.stat[i].name !== item.name) return false;
   simData.goal = runner.stat[i].success;
   const rng = Math.random() * item.odds[1];
   simData.attempts++;
   if (rng <= item.odds[0]) {
     simData.received++;
   }
   if(simData.attempts >= runner.stat[i].attempts) {
     if (simData.received >= simData.goal) {
       simData.success++;
     } else {
       simData.fails++;
     }
     reset();
   }
   
   Load.objects(null,null,null,simData.attempts, simData.received,simData.goal, simData.success, simData.fails)
 }
}

function stop() {
  
}
export {simulate, stop}