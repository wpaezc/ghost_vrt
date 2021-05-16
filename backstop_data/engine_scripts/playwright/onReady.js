module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('../Playwright/userManagementChangeUserData.js')(page, scenario);

  // add more ready handlers here...
};
