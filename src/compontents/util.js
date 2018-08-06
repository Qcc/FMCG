const formatDate = (date, splitter) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join(splitter ? splitter : '-');
}

const formatDateYear = (date, splitter) => {
  const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()

  return [year].map(formatNumber);
}



const formatTime = (date, splitter) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(splitter ? splitter : '-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime2 = (date, splitter) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join(splitter ? splitter : '-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatTime3 = (date, splitter) => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatTimestamp = (timestamp, options) => {
  if (!timestamp || timestamp.length < 1)
    return "";

  options = Object.assign({
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: true,
    datesplitter: '-',
    timesplitter: ':'
  }, options);

  var date = new Date();
  date.setTime(timestamp);

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const msecond = date.getMilliseconds();

  var a = [];
  if (options.year)
    a.push(year);
  if (options.month)
    a.push(month);
  if (options.day)
    a.push(day);

  var b = [];
  if (options.hour)
    b.push(hour);
  if (options.minute)
    b.push(minute);
  if (options.second)
    b.push(second);
  if (options.msecond)
    b.push(msecond);
  return a.map(formatNumber).join(options.datesplitter) + ' ' + b.map(formatNumber).join(options.timesplitter)
}

const timestampInterval = (starStamp, endStamp) => {
  starStamp = starStamp / 1000;
  endStamp = endStamp / 1000;
  const beginTime = (starStamp > endStamp ? endStamp : starStamp);
  const endTime = (starStamp > endStamp ? starStamp : endStamp);

  const intervals = endTime - beginTime;

  const day = parseInt(intervals / 86400);

  const remain = intervals % 86400;
  const hours = parseInt(remain / 3600);

  const remain1 = remain % 3600;
  const minutes = (remain1 / 60).toFixed(0);
  
  const seconds = remain % 60;

  var d = day;
  var h = hours;
  var m = minutes;
  var s = seconds;
  
  if (d == 0 && h == 0 && m == 0 && s > 0) {
    m = 1
  }

  return padDate(day, 0) + padDate(hours, 1) + padDate(m, 2)

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const padDate = (n, flag) => {
  if (flag == 0) {
    return n != 0 ? (n + '天') : ''
  } else if (flag == 1) {
    return n != 0 ? (n + '小时') : ''
  } else {
    return n != 0 ? (n + '分钟') : ''
  }
}


/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str) {
  if (!str)
    return "";
  return new Base64().encode(str);
}
/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str) {
  if (!str)
    return "";
  return new Base64().decode(str)
}

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
}

module.exports = {
  formatDate: formatDate,
  formatDateYear: formatDateYear,
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  formatTimestamp: formatTimestamp,
  base64encode: base64encode,
  base64decode: base64decode,
  timestampInterval: timestampInterval
}