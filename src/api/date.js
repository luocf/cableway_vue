Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function getCurrentDate () {
  const d = new Date()
  var Weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var week = Weeks[d.getDay()]
  var yyyyMMdd = d.format('yyyy-MM-dd')
  const time_str = d.format('hh:mm')
  return yyyyMMdd + ' ' + time_str + ' ' + week
};
