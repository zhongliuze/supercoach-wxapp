const md5 = require('../vendor/md5/md5.min.js');
const moment = require('../vendor/moment/moment.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



const getTimestamp =() => {
  return Math.round(new Date().getTime() / 1000);
}

const getSign =timestamp => {
  if (!wx.getStorageSync('coachid') || !wx.getStorageSync('token')) {
    return -1;
  }else {
    return md5(wx.getStorageSync('coachid') + wx.getStorageSync('token') + timestamp);
  }
}

/**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
module.exports = {
  formatTime: formatTime,
  getTimestamp: getTimestamp,
  getSign: getSign
}