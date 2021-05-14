const compareImages = require("resemblejs/compareImages")
const config = require("./resemblejs_config.json");
const fs = require('fs');

const {
  options,
  kraken_scenarios
} = config;

async function executeTest(){
  let resultInfo = {}
  let datetime = new Date().toISOString().replace(/:/g,".");

 
  for(scenario_index in kraken_scenarios) {
    let scenario = kraken_scenarios[scenario_index]

    if (!fs.existsSync(`./resemblejs_reports/${scenario}`)){
      fs.mkdirSync(`./resemblejs_reports/${scenario}`, { recursive: true });
    }

    let screenshots_folder = `./kraken_screenshots/${scenario}`
    const files = await fs.promises.readdir(screenshots_folder);

    let pairs = []

    let v1_files = files.filter(file => file.match(/^v1_/g))

    v1_files.forEach((v1_file) => {
      v2_file = v1_file.replace("v1", "v2")
      if(files.includes(v2_file)) {
        pairs.push([v1_file, v2_file])
      }
    })

    for(pair in pairs) {
      const data = await compareImages(
        fs.readFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][0]}`),
        fs.readFileSync(`./kraken_screenshots/${scenario}/${pairs[pair][1]}`),
        options
      );

      let compare_name = pairs[pair][0].replace("v1", "compare_")

      fs.writeFileSync(`./resemblejs_reports/${scenario}/${compare_name}`, data.getBuffer());
      console.log(data)
    }
  }


  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return

  //resultInfo[b] = {
  //  isSameDimensions: data.isSameDimensions,
  //  dimensionDifference: data.dimensionDifference,
  //  rawMisMatchPercentage: data.rawMisMatchPercentage,
  //  misMatchPercentage: data.misMatchPercentage,
  //  diffBounds: data.diffBounds,
  //  analysisTime: data.analysisTime
  //}

  return resultInfo;  
}
(async ()=>console.log(await executeTest()))();
