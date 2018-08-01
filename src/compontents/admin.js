layui.extend({
  setter: "config",
}).define(["setter", "layer"],
function(e) {
  var $ = layui.jquery,
  a = layui.layer,
  r = layui.setter,
   
  F = { 
    req: function(option) {
      option.type = option.type || "post";
      option.dataType = option.data.Type || "json";
      option.crossDomain = true;
      option.xhrFields = {withCredentials: true};
      $.ajax(option);
    },
    getNowDay:function(){
      var time = new Date();
      var year = time.getFullYear()
      ,month = time.getMonth() + 1
      ,day = time.getDate();
      if(month < 10)month = '0'+month;
      if(day < 10)day = '0'+day;
      return year+'-'+month+'-'+day;
    },
    getYearEndDay:function(){
      var time = new Date();
      var year = time.getFullYear();
      return year+'-12-31';
    }

}
  e("admin", F)
});