Module.register("MMM-joker-of-the-day",{

  // Default module config.
  defaults: {
    text: "Joker of the day!!!"
  },

  start: function () {
    let self = this;
    setInterval(function() {
      self.updateDom();

    }, 2000);
  },

  socketNotificationReceived: function(notification, payload) {
    if(notification === 'IMAGE_DATA') {
      console.log('received on frontend');
      console.log(payload.url);
      console.log(payload.name);
      // if(payload.nowcast.points != null) {
        // this.processNowcast(payload.nowcast);
        // if(this.config.showWeatherForecast)
          // this.processForecast(payload.forecast);
      // }
      // this.updateDom(1000);
    }
  },

  getDom: function () {
    this.sendSocketNotification('GET_IMAGE', {
      meldingTilSondre: "Takk for syltetoyglasset!!!",
      config: this.config
    });

    console.log('getDom()');
    let wrapper = document.createElement("div");
    let img = document.createElement("div");
    img.innerHTML = '<img src="http://images5.fanpop.com/image/photos/25600000/DOG-ssssss-dogs-25606625-1024-768.jpg"/>';
    wrapper.innerHTML = "<h1>" + this.config.text + "</h1>";
    wrapper.appendChild(img)
    return wrapper;
  },

  getTemplateData: function () {
    return this.config
  }
});
