var jokerName=""
var jokerUrl="";

Module.register("MMM-joker-of-the-day",{

  // Default module config.
  defaults: {
    text: "Joker of the day!!!"
  },

  start: function () {
    let self = this;
    self.jokerUrl=""
    self.jokerName=""

    self.updateImage();
    setInterval(function() {
      self.updateDom();
    }, 200000000);
  },

  socketNotificationReceived: function(notification, payload) {
    if(notification === 'IMAGE_DATA') {
      console.log('received on frontend');
      console.log(payload.url);
      console.log(payload.name);
    let self = this;
self.jokerUrl=payload.url
self.jokerName=payload.name
      self.updateDom();
    }
  },

  updateImage: function() {
    this.sendSocketNotification('GET_IMAGE', {
      meldingTilSondre: "Takk for syltetoyglasset!!!",
      config: this.config
    });
  },

  getDom: function () {

    console.log("------------")
    let self = this;
    console.log('getDom()');
    let wrapper = document.createElement("div");
    let img = document.createElement("div");
    let name = document.createElement("div")
    name.innerHTML=self.jokerName
    //img.innerHTML ="<img src='fdsafadsfdas' />"
    if (self.jokerUrl!="") img.innerHTML = '<img src="'+self.jokerUrl+'"/>';
    wrapper.innerHTML = "<h1>" + this.config.text + "</h1>";
    wrapper.appendChild(img)
    wrapper.appendChild(name)
    return wrapper;

  },

  getTemplateData: function () {
    return this.config
  }
});
