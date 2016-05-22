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

  getAreaFromStatus: function(data) {
    if (!data || !data.loaded) {
      return {};
    }
    var area = {};
      if (data.status && data.status.area) {
        if (data && data.loaded.areas) {
        area = $.grep(data.areas, function(e){ return e.id === data.status.area; }.bind(this))[0];
      }
    }
    return area;
  },

  getAreaById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Area, arguments missing.', id, data);
      return {};
    }
    var area = {};
    if (data.loaded.areas) {
      area = $.grep(data.areas, function(e){ return e.id === id; }.bind(this))[0];
    }
    return area;
  },

  getCommunityById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Community, arguments missing.', id, data);
      return {};
    }
    var community = {};
    // console.log("getCommunityById", data);
    if (data.loaded.communities) {
      community = $.grep(data.communities, function(e){ return e.id === id; }.bind(this))[0];
    }
    return community;
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

  getStoryById: function(id, data) {
    if (!id || !data || !data.loaded) {
      console.error('Could not get Story, arguments missing.', id, data);
      return {};
    }
    var story = {};
    if (data.loaded.stories) {
      story = $.grep(data.stories, function(e){ return e.id === id; }.bind(this))[0];
    }
    else {
      console.error('Could not get Story, data not loaded yet.');
    }
    return story;
  },

};
