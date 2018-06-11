window.onload = function () {
setIframeHeight(document.getElementById('kt-iframe'));
//JavaScript代码区域
layui.use('element', function(){
  "use strict";
  var $ = layui.$ //获得内置jquery
  var element = layui.element;
  
  //触发事件
  var tab = {
    tabAdd: function(title,url,id){
      //新增一个Tab项
      element.tabAdd('kt_toptab', {
        title: title 
        ,content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="kt-iframe"></iframe>'
        ,id: id
      })
      checkTabWidth();
    }
    ,tabDelete: function(id){
      //删除指定Tab项
      element.tabDelete('kt_toptab', id);
    }
    ,tabChange: function(id){
      //切换到指定Tab项
      element.tabChange('kt_toptab', id); //切换到：用户管理
    }
    
  };
  // 切换导航横向 纵向样式
  element.on('nav(menutogle)',function(elem){
    if($('.layui-body').css('left') !== '0px'){
      elem.attr({title:"展开导航菜单"});
      elem.css({"transform":"rotate(180deg)",
        "-ms-transform":"rotate(180deg)",
        "-moz-transform":"rotate(180deg)", 
        "-webkit-transform":"rotate(180deg)",
        "-o-transform":"rotate(180deg)"});
      $('.layui-side').removeClass("animated menuInLeft");        
      $('.layui-side').addClass("animated menuOutLeft");

      $('.layui-body').removeClass("animated bodyOutLeft");        
      $('.layui-body').addClass("animated bodyInLeft");

      $('.horizontal').addClass('layui-show-md-block');
    }else{
      elem.attr({title:"收起导航菜单"});
      elem.css({"transform":"rotate(0deg)",
      "-ms-transform":"rotate(0deg)",
      "-moz-transform":"rotate(0deg)", 
      "-webkit-transform":"rotate(0deg)",
      "-o-transform":"rotate(0deg)"});
      $('.layui-side').removeClass("animated menuOutLeft");
      $('.layui-side').addClass("animated menuInLeft"); 

      $('.layui-body').removeClass("animated bodyInLeft");        
      $('.layui-body').addClass("animated bodyOutLeft");   

      $('.horizontal').removeClass('layui-show-md-block');
    }
  });
  //监听顶栏 侧边导航点击
  element.on('nav(kt-sidemenu)', function(elem){
    var url = elem.attr('_href');
    var menuid = elem.attr('data-menuid');
    var title = elem.text();
    if(url === undefined && menuid === undefined){
      // 类目导航
      return;
    }
    // 循环 tab页面如果已经打开，则切换到对应页面
    for (var i = 0; i < $('.kt-iframe').length; i++) {
      if($('.kt-iframe').eq(i).attr('tab-id') == menuid){
          tab.tabChange(menuid);
          event.stopPropagation();
          return;
      }
    };
    tab.tabAdd(title,url,menuid);
    tab.tabChange(menuid);
    $('#task-tab').show();
  }); // 侧边栏监听结束
  //监听多任务tab栏
  element.on('tabDelete(kt_toptab)', function(data){
    var liWidth = 0;
    var tabWidth = $('#task-tab-wrap').outerWidth();
    $('#task-tab').children().each(function(index,element){
      liWidth += element.offsetWidth;
    })
    if(liWidth >= tabWidth){
      $('#task-tab').css('width',liWidth);
      $('#task-tab').css('left',$('#task-tab').offset().left + ($('#task-tab-wrap').outerWidth() - ($('#task-tab').offset().left + liWidth)) - 80 + 'px');
    }else{
      $('#task-tab').css('width',tabWidth); 
      $('#task-tab').css('left',$('#task-tab-wrap').position().left + 'px');      
      if($('#task-tab').children().length === 1){
        $('#task-tab').css('display','none');
      }
    }
  });
  element.on('tab(kt_toptab)', function(data){
    checkTabWidth();    
  });
  // 多任务tab栏监听结束
  //检测tab页面是否铺满title栏，铺满则显示滚动条
  function checkTabWidth(){
    var liWidth = 0;
    var tabWidth = $('#task-tab-wrap').outerWidth();
    $('#task-tab').children().each(function(index,element){
      liWidth += element.offsetWidth;
    })
    if(liWidth > tabWidth){
      $('.tab-scroll').show();
      $('#task-tab').css("width", liWidth + 100 + 'px');
      $('#task-tab').css('padding','0 30px');
      // tab页在最左侧
      if($('.layui-this').offset().left < $('#task-tab-wrap').offset().left){
        $('#task-tab').css('left', $('#task-tab').offset().left - $('.layui-this').offset().left + $('#task-tab-wrap').position().left + 30 + 'px');
        return;
      }
      // tab 页在左右侧
      if(($('.layui-this').offset().left + $('.layui-this').outerWidth()) > $(document).width()){
        $('#task-tab').css('left', $('#task-tab').offset().left - 
        ($('.layui-this').offset().left - $('#task-tab-wrap').outerWidth() + $('.layui-this').outerWidth()) - 30 + 'px');
        return;      
      }
    }else{
        $('.tab-scroll').hide();
        $('#task-tab').css("width", tabWidth + 100 + 'px');
        $('#task-tab').css('padding','0px');
    }
  // 结束检测tab页面是否铺满title栏，铺满则显示滚动条    
  }
  // 左右移动已经打开的tab页面
  $('.tab-scroll-left').click(function(){
    if($('#task-tab li').last().offset().left + $('#task-tab li').last().outerWidth() < $(document).width()){
      $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) - 10) + 'px');
      clearTimeout(timer);      
      var timer = setTimeout(function(){
      $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) + 10) + 'px');        
      },100);
    }else{
      $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) - 150) + 'px');
      if($('#task-tab li').last().offset().left + $('#task-tab li').last().outerWidth() < $(document).width()){
        $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) - ($(document).width() - $('#task-tab li').last().outerWidth())) + 'px');
      }
    }
  });
  $('.tab-scroll-right').click(function(){
    if($('#task-tab').position().left >= 0){
      $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) + 10) + 'px');
      clearTimeout(timer);
      var timer = setTimeout(function(){
        $('#task-tab').css('left','0px');
      },100);
    }else{
      $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) + 150) + 'px');
      if($('#task-tab').position().left >= 0){
        $('#task-tab').css('left',(parseInt($('#task-tab').css('left')) + 10) + 'px');
      }
    }
  });
  // 结束左右移动已经打开的tab页面
  $('#task-tab').click(function(e){
    layui.stope(e);
    console.log(e);
  })
  //代码区域
});
};

// 设置iframe宽高
function setIframeHeight(iframe) {
if (iframe) {
var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
if (iframeWin.document.body) {
iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
}
}
};
      