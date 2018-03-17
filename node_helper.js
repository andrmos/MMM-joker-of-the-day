var NodeHelper = require('node_helper');
var request = require('request');

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
    self.sendSocketNotification('IMAGE_DATA', { url: 'hei.com', name: 'Battle Shady' });
    const url = '';
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
