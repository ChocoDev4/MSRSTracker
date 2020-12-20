const datapacks = new Map();
const runnerList = [];

async function fetchRunner(pref, loc) {
  const promise = await fetch(`${pref}${loc}`)
  return promise.json();
}

async function dataIteration(nopush=true,setdir = null) {
  await fetch("./data/items.json").then(res => res.json()).then(data => {
    for(let i = 0; i < data.length; i++) {
     datapacks.set(data[i].name,data[i])
    }
  });
  await fetch("./data/speedrunners/metadata.json").then(res => res.json()).then(data => {
    for (let i = 0; i < data.length; i++) {
      nopush ? true : runnerList.push(data[i]);
      if(setdir !== null) fetchRunner(setdir,data[i]).then(r => {
        datapacks.set(r.name, r);
      })
     /* TODO: use datapacks for GUI nav, instead of inherently fetching the data
     */
    }
  })
}

export {dataIteration, runnerList, fetchRunner, datapacks}