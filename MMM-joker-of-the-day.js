var jokerName = "";
var jokerUrl = "";

Module.register("MMM-joker-of-the-day", {

  // Default module config.
  defaults: {
    text: "Joker of the day!!!"
  },

  start: function() {
    let self = this;
    self.jokerUrl = "";
    self.jokerName = "";

    self.updateImage();
    setInterval(function() {
      self.updateDom();
    }, 200000000);
  },

  socketNotificationReceived: function(notification, payload) {
    if(notification === 'IMAGE_DATA') {
      let self = this;
      self.jokerUrl = payload.url;
      self.jokerName = payload.name;
      self.updateDom();
    }
  },

  updateImage: function() {
    this.sendSocketNotification('GET_IMAGE', {
      config: this.config
    });
  },

  getDom: function() {
    let self = this;
    let wrapper = document.createElement("div");
    let img = document.createElement("div");
    let name = document.createElement("div")
    name.innerHTML=self.jokerName
    if (self.jokerUrl != "") img.innerHTML = '<img src="'+self.jokerUrl+'"/>';
    wrapper.innerHTML = "<h1>" + this.config.text + "</h1>";
    wrapper.appendChild(img)
    wrapper.appendChild(name)
    return wrapper;

  },

  getTemplateData: function() {
    return this.config
  }
});
