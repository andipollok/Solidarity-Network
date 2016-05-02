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

  checkDataLoaded: function(_this) {
    if (!_this || !_this.state || !_this.state.data || (_this.state.data && !_this.state.data.loaded.all)) {
      return false;
    }
    return true;
  },

  getCommunityFromStatus: function(data) {
    if (!data || !data.loaded) {
      return {};
    }
    var community = {};
      if (data.status && data.status.community) {
        if (data && data.loaded.communities) {
        community = $.grep(data.communities, function(e){ return e.id === data.status.community; }.bind(this))[0];
      }
    }
    return community;
  },

  getCommunityById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Community, arguments missing.', id, data);
      return {};
    }
    var community = {};
    if (data.loaded.communities) {
      community = $.grep(data.communities, function(e){ return e.id === id; }.bind(this))[0];
    }
    return community;
  },

  getGroupById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Group, arguments missing.', id, data);
      return {};
    }
    var group = {};
    // console.log("getgroupbyid", data);
    if (data.loaded.groups) {
      group = $.grep(data.groups, function(e){ return e.id === id; }.bind(this))[0];
    }
    return group;
  },

  getActivityById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Activity, arguments missing.', id, data);
      return {};
    }
    var activity = {};
    if (data.loaded.activities) {
      activity = $.grep(data.activities, function(e){ return e.id === id; }.bind(this))[0];
    }
    else {
      console.error('Could not get Activity, data not loaded yet.');
    }
    return activity;
  },

  getActivityTypeById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Activity type, arguments missing.', id, data);
      return {};
    }
    var activitytype = {};
    if (data.loaded.activitytypes) {
      activitytype = $.grep(data.activitytypes, function(e){ return e.id === id; }.bind(this))[0];
    }
    else {
      console.error('Could not get Activity type, data not loaded yet.');
    }
    return activitytype;
  },

  getPersonById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Person, arguments missing.', id, data);
      return {};
    }
    var person = {};
    if (data.loaded.people) {
      person = $.grep(data.people, function(e){ return e.id === id; }.bind(this))[0];
    }
    else {
      console.error('Could not get Person, data not loaded yet.');
    }
    return person;
  },

  getPhotoById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Photo, arguments missing.', id, data);
      return {};
    }
    var photo = {};
    if (data.loaded.photos) {
      photo = $.grep(data.photos, function(e){ return e.id === id; }.bind(this))[0];
    }
    else {
      console.error('Could not get Photo, data not loaded yet.');
    }
    return photo;
  },

};
