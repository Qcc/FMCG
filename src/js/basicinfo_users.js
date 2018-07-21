/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
;
layui.define("form",
function(exports) {
  var s = layui.$;
  console.log('busers');
  Buser = function(){
      var b = 1;
  }
  Buser.prototype.run = function(a){
      console.log(a+" 运行了");
  }
  buser = new Buser()
  exports("basicinfo_users", buser);
});