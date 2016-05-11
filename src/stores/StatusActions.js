var Reflux = require('reflux');

module.exports = Reflux.createActions([
  "setJoin",
  "setArea",
  
  "setTitle",
  "setPage",

  "addActivityType",
  "removeActivityType",
  "clearActivityTypes",

  "historyAdd",
  "historyBack",
  "historyForward",

  "forceTrigger"

]);