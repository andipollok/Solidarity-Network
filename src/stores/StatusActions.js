var Reflux = require('reflux');

module.exports = Reflux.createActions([
  "setJoin",
  "setArea",
  
  "setTitle",
  "setPage",
  "showPrimaryNav",
  "setSecondaryNav",
  "showBackButton",

  "addActivityType",
  "removeActivityType",
  "clearActivityTypes",

  "historyAdd",
  "historyBack",
  "historyForward",

  "forceTrigger",

  "setGotoDestination",
  "clearGotoDestination"

]);