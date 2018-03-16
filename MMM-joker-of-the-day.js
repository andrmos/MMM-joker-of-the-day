Module.register("MMM-joker-of-the-day",{

  // Default module config.
  defaults: {
    text: "Joker of the day!!!"
  },

  start: function () {
    let self = this;
    setInterval(function() {
      self.updateDom();

    }, 1000);
  },

  getDom: function () {
    console.log('getDom()');
    let wrapper = document.createElement("div");
    wrapper.innerHTML = "<h1>" + this.config.text + "</h1>";
    return wrapper;
  },

  getTemplateData: function () {
    return this.config
  }
});
