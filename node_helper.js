var NodeHelper = require('node_helper');
var request = require('request');
var FB = require('fb');
FB.setAccessToken('155684848748|LeXWXguujGYMY2QJkF_DCii3hJ0');

module.exports = NodeHelper.create({
  start: function() {
    console.log('Loaded helper for ' + this.name);
    this.config = null;
    this.forecastUrl = '';
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    if(notification === 'GET_IMAGE') {
      this.getImage();
    }
  },

  getImage: function() {
    var self = this;
    var jokers = [];
    const url = '';

    let getImgUrl = function(id,name) {
      FB.api(
        '/' + id + '/picture?redirect=false&type=large',
        'GET',
        {},
        function(response) {
          self.sendSocketNotification('IMAGE_DATA', { url: response.data.url, name: name });
        }
      );
    }

    let getPage = function(url) {
      request({url: url, method: 'GET'}, function(err, res, message) {
        if (message && !err) {

          var json = JSON.parse(message)
          json.data.forEach(function(element) {
            jokers.push(element);
          });
          if (json.paging.next) {
            getPage(json.paging.next)
          } else {
            var randomId = Math.floor(Math.random() * jokers.length);
            getImgUrl(jokers[randomId].id,jokers[randomId].name)
          }
        }
      })
    }

    FB.api(
      "/2326568395/members?limit=500",
      function(response) {
        if (response && !response.error) {
          response.data.forEach(function (element) {
            jokers.push(element);
          });
          if (response.paging.next) {
            getPage(response.paging.next)
          }
        }
        if (response.error) {
          console.log('Error:');
          console.log(response.error)
        }
      }
    );
  },

  setNextUpdate: function(headers) {
    var cacheControlHeader = headers['cache-control'];
    var maxAge = cacheControlHeader.slice(cacheControlHeader.indexOf('=') + 1);
    this.config.updateInterval = maxAge * 1000;
  }
});
