var Reflux = require('reflux');

module.exports = Reflux.createActions([
  "setJoin",
  "setArea",
  
  "setTitle",
  "setPage",
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