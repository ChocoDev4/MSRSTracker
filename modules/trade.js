/*
TODO: REWRITE OR DELETE THIS ENTIRE MODULE
*/
class Entity {
  constructor(dp=null) {
    this.name = "";
    this.datapack = null;
    this.items = [];
    this.pItem; //this is a pointer
   if(dp !== null) this.datapack = dp;
  }
  simulate(amount, itemName, target, logDOM) {
    const result = this.roll(itemName);
    result ? this.changeRecVal([1,0], itemName) : this.changeRecVal([0,1], itemName);
  }
  roll(itemName) {
    const pItem = this.items[itemName];
    const record = pItem.record;
    const rng = Math.random() * pItem.odds.max;
    if(rng < pItem.odds.target) return true;
    return false;
  }
  load(dp) {
   dp.then(req => req.json()).then(obj => {
    console.log(`DataPack for ${obj.for} ${obj.type} is loaded`)
    this.datapack = obj;
    this.name = obj.for;
    this.items = this.datapack.items;
   });
  }
  changeRecVal(arr, itemName) {
    this.items[itemName].record.tradeSucc += arr[0];
    this.items[itemName].record.tradeFail += arr[1];
  }
}

class Simulate {
  static barter(ent, goal) {
    
  }
  static loop(cb,status) {
    const animframe = window.requestAnimationFrame(Simulate.loop(this));
    if(status) window.cancelAnimationFrame(animFrame);
  }
}

export {Entity, Simulate};