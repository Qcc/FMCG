
function Base64() {

  // private property  
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding  
  this.encode = function(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding  
  this.decode = function(input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding  
  var _utf8_encode = function(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding  
  var _utf8_decode = function(utftext) {
    var string = "";
    var i = 0;
    var c = 0,
      c1 = 0,
      c2 = 0,
      c3;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
};

function double(n){
  if(n < 10){
    return '0'+n;
  }else{
    return n;
  }
}

layui.extend({
  setter: "config",
}).define(["setter", "layer"],
function(e) {
  var $ = layui.jquery,
  setter = layui.setter,
  F = { 
    //当前登录员工UID;
    iam:function(){
      return JSON.parse(layui.sessionData(setter.tableName).iam)[0].uid 
    },
    //当前登录员工姓名;
    name:function(){
      return JSON.parse(layui.sessionData(setter.tableName).iam)[0].empname;
    },
    // ajax请求
    req: function(option) {
      option.type = option.type || "post";
      option.dataType = option.dataType || "json";
      option.crossDomain = true;
      option.xhrFields = {withCredentials: true};
      $.ajax(option);
    },
    // 返回格式化日期时间 yyyy-mm-dd h:m:s
    formatDateTime(t){
      if(t === '' || t === undefined)return '无';

      t = parseInt(t);
      var d = new Date(t);
      var year = d.getFullYear()
      ,month = d.getMonth() + 1
      ,day = d.getDate()
      ,hours = d.getHours()
      ,min = d.getMinutes()
      ,seconds = d.getSeconds();
      return year+'-'+double(month)+'-'+double(day)+' '+double(hours)+':'+double(min)+':'+double(seconds)
    },
    // 获取今天
    getNowDay:function(){
      var time = new Date();
      var year = time.getFullYear()
      ,month = time.getMonth() + 1
      ,day = time.getDate();
      if(month < 10)month = '0'+month;
      if(day < 10)day = '0'+day;
      return year+'-'+month+'-'+day;
    },
    // 获取当年最后一天
    getYearEndDay:function(){
      var time = new Date();
      var year = time.getFullYear();
      return year+'-12-31';
    },
    // base64编码 
    base64encode:function (str) {
      if (!str)
        return "";
      return new Base64().encode(str);
    },
    // base64解码 
    base64decode:function (str) {
      if (!str)
        return "";
      return new Base64().decode(str)
    }
}
  e("admin", F)
});