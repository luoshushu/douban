define([
  'jQuery'
], function() {
  //top250
 var top250 = {
  init: function () {
    this.top250Id = $('#top250')
    this.bind()
    this.start()
    this.isLoading = false
    this.index = 0
    this.isFinish = false

  },
  bind: function () {
    var _this = this
    this.top250Id.scroll(function () {
      _this.start()
    })
  },
  start: function () {
    var _this = this
    this.packet(function (data) {
      _this.render(data)
    })
  },

  //top250数据
  packet: function (callback) {
    var _this = this
    if (_this.isLoading) return;
    _this.isLoading = true
    _this.top250Id.find('.loading').show()
    $.ajax({
      url: '//api.douban.com/v2/movie/top250',
      data: {
        start: _this.index || 0
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      console.log(ret)
      _this.index += 20
      if (_this.index >= ret.total) {
        _this.isFinish = true
      }
      callback && callback(ret)
    }).fail(function () {
      console.log('数据异常')
    }).always(function () {
      _this.isLoading = false
      _this.top250Id.find('.loading').hide()
    })

  },
  render: function (data) {
    var _this = this
    data.subjects.forEach(function (t) {
      var htmlLayout = `<div class="box">
       <a href="#">
         <div class="print">
           <img src="#" alt="">
         </div>
         <div class="text">
           <h2>霸王别姬</h2>
           <div class="intro">
             <span class="grade">9.6</span>分 /
             <span class="collect">12312</span>收藏
           </div>
           <div class="intro">
             <span class="year">1994</span> /
             <span class="type">犯罪</span>
           </div>
           <div class="intro">
             导演：<span class="director">李安</span>
           </div>
           <div class="intro">
             主演： <span class="starring">李磊、阿道夫</span>
           </div>
         </div>
       </a>
     </div>`
      var $node = $(htmlLayout)
      $node.find('a').attr('href', t.alt)
      $node.find('.print img').attr('src', t.images.medium)
      $node.find('.text h2').text(t.title)
      $node.find('.grade').text(t.rating.average)
      $node.find('.collect').text(t.collect_count)
      $node.find('.year').text(t.year)
      $node.find('.type').text(t.genres.join(' / '))
      $node.find('.director').text(function () {
        var directorsArr = []
        t.directors.forEach(function (item) {
          directorsArr.push(item.name)
        })
        return directorsArr.join('、')
      })
      $node.find('.starring').text(function () {
        var actorArr = []
        t.casts.forEach(function (item) {
          actorArr.push(item.name)
        })
        return actorArr.join('、')
      })
      _this.top250Id.find('.container').append($node)
    })
  },

}
return top250
  
});