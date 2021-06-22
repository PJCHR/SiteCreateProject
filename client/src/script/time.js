// yyyy-mm-dd format return
export function getFormatDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth());
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}
// hh:mm:ss format return
export function getFormatTime(date){
  var hh = date.getHours(24); // hours
  hh = hh >= 10 ? hh : '0' + hh;
  var mm = date.getMinutes(); // minutes
  mm = mm >= 10 ? mm : '0' + mm;
  var ss = date.getSeconds(); // seconds
  ss = ss >= 10 ? ss : '0' + ss;
  return hh + ':' + mm + ':' + ss;
}