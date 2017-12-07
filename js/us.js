define([
  'jQuery'
], function() {
  //北美
var us = {
  init:function () {
    this.usId = $('#usBox')
    this.start()
  },
   start: function () {
     var _this = this
     this.packet(function (data) {
       _this.render(data)
     })
   },
   packet: function (callback) {
     var _this = this
     if (_this.isLoading) return;
     _this.isLoading = true
     _this.usId.find('.loading').show()
     $.ajax({
       url: '//api.douban.com/v2/movie/us_box',
       dataType: 'jsonp'
     }).done(function (ret) {
       callback && callback(ret)
     }).fail(function () {
       console.log('数据异常')
     }).always(function () {
       _this.usId.find('.loading').hide()
     })

   },
   render: function (data) {
     var _this = this
     data.subjects.forEach(function (t) {
       t = t.subject
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
       $node.find('.print img').attr('src', t.images.large)
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
       _this.usId.find('.container').append($node)
     })
 }
 }
return us
  
});


