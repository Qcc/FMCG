window.onload = function () {
//JavaScript代码区域
layui.use(['element','layer','admin'], function(){
  "use strict";
  var $ = layui.$ //获得内置jquery
  ,element = layui.element
  ,admin = layui.admin
  ,layer = layui.layer;
  //触发事件
  var tab = {
    tabAdd: function(title,url,id){
      //新增一个Tab项
      element.tabAdd('kt_toptab', {
        title: title 
        ,content: '<iframe  tab-id="' + id + '" id=iframe' + id + ' " frameborder="0" src="' + url + '" scrolling="yes" class="kt-iframe"></iframe>'
        ,id: id
      })
      checkTabWidth();
    }
    ,tabDelete: function(id){
      //删除指定Tab项
      element.tabDelete('kt_toptab', id);
    }
    ,tabChange: function(id){
      console.log(id ,typeof id)
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

      $('.horizontal-nav-tree').addClass('layui-show-md-block');
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

      $('.horizontal-nav-tree').removeClass('layui-show-md-block');
    }
  });

  //监听顶部右侧消息设置工具栏
  element.on('nav(kt-message)', function(elem){
    var url = elem.attr('_href');
    var menuid = elem.attr('data-menuid');
    var title = elem.attr('title') || elem.text();
    if(menuid === 'pifu'){
      layer.msg('自定义皮肤还没做');
      return;
    }
    if(menuid === 'logout'){
      admin.req({
        url: layui.setter.root + '/user/logout.api'
        ,data: {}  
        ,success: function(res){
          location.href = './login.html';
        }
        ,error: function(res){
          location.href = './login.html';
        }
      });
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
    $('.layui-tab-backgroud').show();
    $('.kt-iframe').css('margin-top','36px');
  });
    //监听顶栏 侧边导航点击
  element.on('nav(kt-sidemenu)', function(elem){
    var url = elem.attr('_href');
    var menuid = elem.attr('data-menuid');
    var title = elem.attr('title') || elem.text();
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
    $('.layui-tab-backgroud').show();
    $('.kt-iframe').css('margin-top','36px');
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
        $('#task-tab').hide();
        $('.layui-tab-backgroud').hide();
        $('.kt-iframe').css('margin-top','0');
      }
    }
  });
  element.on('tab(kt_toptab)', function(data){
    checkTabWidth(); // 调整tab宽度
    addContextMenu(); // 添加右键菜单事件
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
  // $('#task-tab').click(function(e){
  //   layui.stope(e);
  //   console.log(e,'qqq');
  // })
  //添加tab页面右键菜单
	//取消右键
	$('html').click(function(){
		$('.popup_menu').hide();
	});
  //点击右击
  function addContextMenu(){
    var tabid = $('#task-tab li:last').attr('lay-id'); 
    $('#task-tab li:last').on('contextmenu',function (e,tabid){
      var popupmenu = $('.popup_menu').attr('tabId',$(this).attr('lay-id')),
      l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX,
      t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
      popupmenu.css({left: l,top: t}).show();
      e.preventDefault()        
      return false;
    });
  }
  // 右键菜单具体操作
  //关闭当前页
  $('#close-active-menu').on('click',function(){
    element.tabDelete('kt_toptab', $('.popup_menu').attr('tabid'));
  })
  //关闭其他
  $('#close-other-menu').on('click',function(){
    $('#task-tab li').each(function(index,e){
      var id = $(this).attr('lay-id');
      console.log(id)
      if(id === $('.popup_menu').attr('tabid') || id === '00'){
        return;
      }
      element.tabDelete('kt_toptab', id);
    });
  })
  //关闭所有
  $('#close-all-menu').on('click',function(){
    $('#task-tab li').each(function(index,e){
      var id = $(this).attr('lay-id');
      if(id !== '00'){
        element.tabDelete('kt_toptab', id);
      }
    });
  })
  //刷新
  $('#refresh-active-menu').on('click',function(index,e){
    var iframe = '#iframe' + $('.popup_menu').attr('tabid');
    console.log($(iframe).attr('src'));
    $(iframe).attr('src', $(iframe).attr('src'));
  })
  //代码区域
});
};

// 设置iframe宽高
 
      