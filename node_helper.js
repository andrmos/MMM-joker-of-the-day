var NodeHelper = require('node_helper');
var request = require('request');
var FB = require('fb');
FB.setAccessToken('');

module.exports = NodeHelper.create({
  start: function() {
    console.log('jalla balla' + this.name);
    this.config = null;
    this.forecastUrl = '';
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    if(notification === 'GET_IMAGE') {
      self.message = payload.meldingTilSondre
      console.log(self.message);
      this.getImage();
    }
  },

  getImage: function() {
    var self = this;
    var jokers = [];
    //self.sendSocketNotification('IMAGE_DATA', { url: 'hei.com', name: 'Battle Shady' });
    const url = '';

    let getImgUrl = function(id,name) {
            FB.api(
        '/'+id+'/picture?redirect=false',
        'GET',
        {},
        function(response) {
            console.log(response.data.url)
            self.sendSocketNotification('IMAGE_DATA', { url: response.data.url, name: name });
        }
      );

    }

    let getPage = function(url) {
      request({url: url, method: 'GET'}, function(err, res, message) {
        if (message && !err) {

          var json = JSON.parse(message)
          //console.log(json)
            json.data.forEach(function(element) {

              jokers.push(element);
            });
            if (json.paging.next) {
                getPage(json.paging.next)
            } else {
              console.log("Found "+jokers.length);
              var randomId = Math.floor(Math.random() * jokers.length);
              console.log(jokers[randomId])
              getImgUrl(jokers[randomId].id,jokers[randomId].name)
            }

            //console.log("paging "+ jokers.length);
          }
        })
      }

          //2326568395
          console.log("gasadfsdafdas")
          FB.api(
              "/2326568395/members?limit=100",
              function (response) {
                if (response && !response.error) {

                  response.data.forEach(function(element) {
                    jokers.push(element);
                  });
                  if (response.paging.next) {
                      getPage(response.paging.next)
                  }                  //console.log(jokers.length);
                }
                if (response.error) {
                  console.log(response.error)
                }
              }
          );



    // var self = this;
    // var locationData = {};
    // var nowcastUrl = this.forecastUrl + '/now';

    // request({url: url, method: 'GET'}, function(err, res, message) {
      // if (!err && (res.statusCode == 200 || res.statusCode == 304)) {
        // locationData.nowcast = JSON.parse(message);
        // self.setNextUpdate(res.headers);

        // request({url: self.forecastUrl, method: 'GET'}, function(err, res, message) {
          // if (!err && (res.statusCode == 200 || res.statusCode == 304)) {
            // locationData.forecast = JSON.parse(message);
            // self.sendSocketNotification('YR_FORECAST_DATA', locationData);
          // }
        // });
      // }
      // setTimeout(function() { self.getForecast(); }, self.config.updateInterval);
    // });
  },

  setNextUpdate: function(headers) {
    var cacheControlHeader = headers['cache-control'];
    var maxAge = cacheControlHeader.slice(cacheControlHeader.indexOf('=') + 1);
    this.config.updateInterval = maxAge * 1000;
  }
});
