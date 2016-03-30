module.exports = {

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  rotateArray(arr, n) {
    arr.unshift.apply( arr, arr.splice( n, arr.length ) );
    return arr;
  },

  checkLanguageLoaded: function(_this) {
    if (!_this || !_this.state || !_this.state.language || (_this.state.language && !_this.state.language.loaded)) {
      return false;
    }
    return true;
  },

  getCommunityFromStatus: function(_this) {
    if (!_this || !_this.state) {
      return {};
    }
    var community = {};
      if (_this.state.status && _this.state.status.community) {
        if (_this.state.data && _this.state.data.loaded.communities) {
        community = $.grep(_this.state.data.communities, function(e){ return e.id === _this.state.status.community; }.bind(_this))[0];
      }
    }
    return community;
  },

  getCommunityById: function(_id, _this) {
    if (!_id || !_this || !_this.state) {
      return {};
    }
    var community = {};
    if (_this.state.data && _this.state.data.loaded.communities) {
      community = $.grep(_this.state.data.communities, function(e){ return e.id === _id; }.bind(this))[0];
    }
    return community;
  },

  getGroupById: function(_id, _this) {
    if (!_id || !_this || !_this.state) {
      return {};
    }
    var group = {};
    if (_this.state.data && _this.state.data.loaded.groups) {
      group = $.grep(_this.state.data.groups, function(e){ return e.id === _id; }.bind(this))[0];
    }
    return group;
  },

  getActivityById: function(_id, _this) {
    if (!_id || !_this || !_this.state) {
      return {};
    }
    var activity = {};
    if (_this.state.data && _this.state.data.loaded.activities) {
      activity = $.grep(_this.state.data.activities, function(e){ return e.id === _id; }.bind(this))[0];
    }
    return activity;
  },

  getPersonById: function(_id, _this) {
    if (!_id || !_this || !_this.state) {
      return {};
    }
    var person = {};
    if (_this.state.data && _this.state.data.loaded.people) {
      person = $.grep(_this.state.data.people, function(e){ return e.id === _id; }.bind(this))[0];
    }
    return person;
  },

  getPhotoById: function(_id, _this) {
    if (!_id || !_this || !_this.state) {
      return {};
    }
    var photo = {};
    if (_this.state.data && _this.state.data.loaded.photos) {
      photo = $.grep(_this.state.data.photos, function(e){ return e.id === _id; }.bind(this))[0];
    }
    return photo;
  },

};
