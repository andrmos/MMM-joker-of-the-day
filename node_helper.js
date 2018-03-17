var NodeHelper = require('node_helper');
var request = require('request');
var FB = require('fb');
var fs = require('fs');
FB.setAccessToken('155684848748|LeXWXguujGYMY2QJkF_DCii3hJ0');
var fileNameLastJoker = "./modules/MMM-joker-of-the-day/lastJoker.txt"

var moment = require('moment');
moment().format();

module.exports = NodeHelper.create({
  start: function() {
    console.log('Loaded helper for ' + this.name);
    this.config = null;
    this.forecastUrl = '';
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    if(notification === 'GET_IMAGE') {
      console.log(process.cwd())
      if (fs.existsSync(fileNameLastJoker)) {
        let data = fs.readFileSync(fileNameLastJoker,{encoding:'utf8'});
        let mdate = fs.statSync(fileNameLastJoker).mtime
        let diffDays = moment().diff(mdate, 'days')
        if (moment().dayOfYear() != moment(mdate).dayOfYear()) {
            this.getnewPerson();
        } else {
          let dataParsed = JSON.parse(data)
          console.log(dataParsed)
          self.sendResponse(dataParsed.url, dataParsed.name);
        }

      } else {
        this.getnewPerson();
      }

    }
  },

  sendResponse: function (url,name) {
    var self = this;
    self.sendSocketNotification('IMAGE_DATA', { url: url, name: name });
  },

  getnewPerson: function() {
    var self = this;
    var jokers = [];
    const url = '';

    let getPersonData = function(id,name) {
      FB.api(
        '/' + id + '/picture?redirect=false&type=large', 'GET', {},
        function(response) {
          fs.writeFileSync(fileNameLastJoker, JSON.stringify({name:name, url:response.data.url}) )
          self.sendResponse(response.data.url, name);
        }
      );
    }

    let getNextPage = function(url) {
      request({url: url, method: 'GET'}, function(err, res, message) {
        if (message && !err) {

          var json = JSON.parse(message)
          json.data.forEach(function(element) {
            jokers.push(element);
          });
          if (json.paging.next) {
            getNextPage(json.paging.next)
          } else {
            var randomId = Math.floor(Math.random() * jokers.length);
            getPersonData(jokers[randomId].id,jokers[randomId].name)
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
            getNextPage(response.paging.next) 
          } else {
            var randomId = Math.floor(Math.random() * jokers.length);
            getPersonData(jokers[randomId].id,jokers[randomId].name)
          }
        }
        if (response.error) {
          console.log('Error:');
          console.log(response.error)
        }
      }
    );
  },
  /*
  setNextUpdate: function(headers) {
    var cacheControlHeader = headers['cache-control'];
    var maxAge = cacheControlHeader.slice(cacheControlHeader.indexOf('=') + 1);
    this.config.updateInterval = maxAge * 1000;
  } */
});
