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
  }
}
  e("admin", F)
});