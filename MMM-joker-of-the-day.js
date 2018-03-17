var jokerName = "";
var jokerUrl = "";

Module.register("MMM-joker-of-the-day", {

  // Default module config.
  defaults: {
    text: "Joker of the day!"
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

    let h1 = document.createElement("h1")
    h1.innerHTML = this.config.text;
    h1.className = 'header'
    wrapper.appendChild(h1)

    // Image
    let img = document.createElement("img");
    if (self.jokerUrl != "") {
      img.src = self.jokerUrl;
    }
    wrapper.appendChild(img)

    // Person name
    let name = document.createElement("div")
    name.innerHTML = self.jokerName
    wrapper.appendChild(name)

    return wrapper;
  },

  getStyles: function() {
    return [
      'styles.css'
    ];
  },

});
