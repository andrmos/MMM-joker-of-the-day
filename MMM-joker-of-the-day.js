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
      self.jokerName = self.upgradeName(payload.name);
      self.updateDom();
    }
  },

  upgradeName: function(originalName) {
    const upgradeNames =
      [
        "Ryddegutten",
        "Rotekoppen",
        "Pricess",
        "Gamer",
        "Last man standing",
        "Morgenfugl",
        "B-menneske",
        "Leecher",
        "Piraten",
        "Nuddelgutt",
        "Bølla",
        "Strykejernet",
        "Bråkmaker",
        "Terminator",
        "Hamsterbarnet",
        "Kodeknuseren",
        "Proper'n",
        "Sellout",
        "Sir",
        "Backend suger",
        "Frontend er best",
        "Java Jesus",
        "Emacs er best",
        "Vimkongen",
      ];

    const randomIndex = Math.floor(Math.random() * upgradeNames.length);
    let words = originalName.split(" ");
    let newName = "";
    let randomUpgrade = "\"" + upgradeNames[randomIndex] + "\"";
    if (words.length >= 2) {
      newName = words[0] + " " + randomUpgrade + " ";
      for (var i = 1; i < words.length; i++) {
        newName += words[i] + " ";
      }
    } else {
      newName = randomUpgrade + " " + words[0];
    }
    return newName;
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
