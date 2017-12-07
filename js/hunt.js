 
 define([
   'jQuery'
 ], function() {

   //搜索
 var hunt = {
  init: function () {
    console.log('jj')
    this.huntId = $('#hunt')
    this.$shift = this.huntId.find('.shift')
    this.keyword = ''
    this.$hide = false
    this.bind()
    this.start()

  },
  bind:function () {
    var _this = this
    this.huntId.find('.button').click(function () {
      _this.keyword = _this.huntId.find('input').val()
      _this.huntId.find('.box').remove()
      _this.start()
    })
    this.huntId.find('input').keydown(function () {
      _this.$shift.css("display", "block")
    })
    this.$shift.click(function () {
      _this.huntId.find('input').val('')
    })



  },
  start: function () {
    var _this = this
    this.packet(function (data) {
      _this.render(data)
    })
  },
  packet: function (callback) {
    var _this = this
    if(_this.$hide) return
    _this.huntId.find('.loading').show()
    $.ajax({
      url: '//api.douban.com/v2/movie/search',
      data: {
        q: _this.keyword
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      callback && callback(ret)
    }).fail(function () {
      console.log('数据异常')
    }).always(function () {
      _this.huntId.find('.loading').hide()
    })

  },
  render: function (data) {
    console.log(data)
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
      _this.huntId.find('.container').append($node)
    })

  }
}
return hunt
   
 });
 