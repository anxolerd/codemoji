(function (window, Cryptoloji, $, undefined) {
  
  var charCounters = {}

  Cryptoloji.UI.CharCounter = function createCharCounter (name, selector) {
    if (!charCounters[name]) 
      charCounters[name] = new CharCounter(name, selector)
    return charCounters[name]
  }

  function CharCounter (name, selector) {
    var self = this

    self.$element = $(selector)
    self.maxSize = 400
    self.currentSize = 0

    self.$element.text(self.maxSize)
  }

  CharCounter.prototype.attachTo = function attachTo (selector) {
    var self = this
    $(selector).on('input propertychange', function (event) {
      var textSize = $(event.target).val().length
      self.currentSize = self.maxSize - textSize
      self.$element.text(self.currentSize)
    })
    return self
  }

  CharCounter.prototype.resetCount = function resetCount () {
    var self = this
    self.currentSize = self.maxSize
    self.$element.text(self.currentSize)
    return self
  }

  CharCounter.prototype.setMaxSize = function setMaxSize (maxSize) {
    var self = this
    self.maxSize = maxSize
    return self
  }

})(window, window.Cryptoloji, window.jQuery); 