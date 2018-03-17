var jokerName = "";
var jokerUrl = "";

Module.register("MMM-joker-of-the-day", {

  // Default module config.
  defaults: {
    text: "Joker of the day:"
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
    let container = document.createElement("div");
    container.className = "container";

    let h1 = document.createElement("h1");
    h1.innerHTML = this.config.text;
    h1.className = 'header';
    container.appendChild(h1);

    // Image
    let img = document.createElement("img");
    if (self.jokerUrl != "") {
      img.src = self.jokerUrl;
    }
    img.className = "profileImg";
    container.appendChild(img);

    // Person name
    let name = document.createElement("div");
    name.innerHTML = self.jokerName;
    name.className = "nameText";
    container.appendChild(name);

    let congratz = document.createElement("h3");
    congratz.innerHTML = self.getCongratzText();
    congratz.className = "congratzText";
    container.appendChild(congratz);

    return container;
  },

  getCongratzText: function() {
    const textOptions =
      [
        "Skikkelig heldig",
        "Du er kul",
        "1/800 sjanse",
        "rått!!!!!",
        "Damn baby",
        "Du er hot",
        "Wow",
        "Lesesalens gullbarn",
        "Favoritten",
        "Neste Douglas Rogers",
        "Har du betalt regningene dine?",
        "Premie: en kopp kaffe",
        "Håper du kommer på eksamensfesten",
        "Du fortjener en pause",
        "Ta livet med ro"
      ];
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    const choice = textOptions[randomIndex];
    const text = "Gratulerer! " + choice;
    return text
  },

  getStyles: function() {
    return [
      'styles.css'
    ];
  },

});
