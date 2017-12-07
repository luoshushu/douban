
define([
  'top250',
  'us',
  'hunt',
  'jQuery',
], function(top250, us,hunt) {
  var app = {
    init: function() {
      this.tabs = $('footer>div')
      this.cut = $('section')
      this.toggle()
      top250.init()
      us.init()
      hunt.init()
    },
    toggle: function() {
      var _this = this
      this.tabs.on('click',function(){
        $(this).addClass('result').siblings().removeClass('result')
        _this.cut.eq($(this).index()).fadeIn().siblings().hide()
      })
    }
  }
  return app
  
});
