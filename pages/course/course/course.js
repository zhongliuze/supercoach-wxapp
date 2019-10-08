// pages/course/course/course.js
const moment = require('../../../vendor/moment/moment.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseType: 1, // 0排课，1休息，2自定义
    fixedBottomButtonMargin: 0, // 吸底按钮自适应高度
    timePickerArray: [], // 选择框时间列表
    timeShowArray: [], // 展示时间列表
    startTimePickerIndex: [0, 0, 0], // 默认选中开始时间 
    endTimePickerIndex: [0, 0, 0], // 默认选中结束时间 
    remindType: 0, // 提醒类型：0不提醒，1开始时、30分钟前、1小时前……
    repeatType: 0, // 重复类型：0不重复，1每天、2每周、3每月
    repeatTimes: 0, // 重复次数, 实际次数为repeatTimes+1
    remindArray: ['无提醒', '开始时', '30分钟前', '1小时前', '3小时前', '6小时前', '1天前'],
    repeatArray: ['不重复', '每天', '每周', '每月'],
    fullDaySwitch: false, // 全天按钮
    colorArray: [
      { color: '#DC4F5A' , selected: false},
      { color: '#DC5960', selected: false },
      { color: '#EA6E7F', selected: false },
      { color: '#E89CA4', selected: true },
      { color: '#306BF5', selected: false },
      { color: '#5392E8', selected: false },
      { color: '#F1A044', selected: false },
      { color: '#F4BA40', selected: false },
      { color: '#5392E8', selected: false },
      { color: '#F1A044', selected: false },
      { color: '#F4BA40', selected: false },
      { color: '#439697', selected: false },
      { color: '#58A45C', selected: false },
      { color: '#6653A2', selected: false },
      { color: '#07070B', selected: false },
      { color: '#444756', selected: false },
    ],
    selectColorIndex: 0, // 选中颜色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var selectDate = '2019-10-08-18-30';  // 上一页选中时间
    var timePickerArray = [];  // picker选择框中数据
    var timeShowArray = [];  // 展示数据
    var timePickerDate = [];  // picker选中数据日期列表
    var timePickerHour = [];  // picker选中数据时间列表
    var timeShowHour = [];  // 展示数据时间列表
    var startTimePickerIndex = [0, 0, 0];  // 默认开始日期时间
    var endTimePickerIndex = [0, 0, 0];  // 默认结束日期时间

    // 汉化
    moment.locale('zh-cn', {
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    });
    // 拆分数据
    selectDate = selectDate.split("-");

    // 生成picker选择框日期数据
    for (let i = 0; i < 60; i++) {
      timePickerDate.push(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).add(i + 1, 'day').format('MM月DD日 ddd'));
      timePickerDate.unshift(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).subtract(i, 'day').format('MM月DD日 ddd'));
    }

    // 生成picker选择框小时数据
    for (let i = app.globalData.startTime; i <= app.globalData.endTime + 1; i++) {
      if (i < 10) {
        timePickerHour.push('0' + i + '时');
        timeShowHour.push('0' + i);
      } else {
        timePickerHour.push(i + '时');
        timeShowHour.push(i);
      }
    }
    // 写入picker列表中
    timePickerArray.push(timePickerDate);
    timePickerArray.push(timePickerHour);
    timePickerArray.push(['00分', '30分']);
    // 写入展示数据列表中
    timeShowArray.push(timePickerDate)
    timeShowArray.push(timeShowHour);
    timeShowArray.push(['00', '30']);

    // 获取当前日期所在位置
    for (let i = 0; i < timePickerArray[0].length; i++) {
      if (moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).format('MM月DD日 ddd') == timePickerArray[0][i]) {
        startTimePickerIndex[0] = endTimePickerIndex[0] = i;
        break;
      }
    }
    // 获取当前时间所在位置
    for (let i = 0; i < timePickerArray[1].length; i++) {
      if ((selectDate[3] + '时') == timePickerArray[1][i] || ('0' + selectDate[3] + '时') == timePickerArray[1][i]) {
        startTimePickerIndex[1] = i;
        if (i + 1 >= timePickerArray[1].length) {
          endTimePickerIndex[1] = i;
        } else {
          endTimePickerIndex[1] = i + 1;
        }
        break;
      }
    }
    // 获取当前时分所在位置
    if ((selectDate[4] + '分') == timePickerArray[2][0]) {
      startTimePickerIndex[2] = endTimePickerIndex[2] = 0;
    } else if ((selectDate[4] + '分') == timePickerArray[2][1]) {
      startTimePickerIndex[2] = endTimePickerIndex[2] = 1;
    }

    this.setData({
      fixedBottomButtonMargin: wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
      timePickerArray: timePickerArray,
      timeShowArray: timeShowArray,
      startTimePickerIndex: startTimePickerIndex,
      endTimePickerIndex: endTimePickerIndex,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindStartTimePickerChange: function (event) {
    var startTimePickerIndex = event.detail.value;
    var endTimePickerIndex = [];
    endTimePickerIndex.push(startTimePickerIndex[0]);
    if (startTimePickerIndex[1] > (app.globalData.endTime - app.globalData.startTime)) {
      endTimePickerIndex.push(startTimePickerIndex[1]);
    } else {
      endTimePickerIndex.push(startTimePickerIndex[1] + 1);
    }
    endTimePickerIndex.push(startTimePickerIndex[2]);

    this.setData({
      startTimePickerIndex: startTimePickerIndex,
      endTimePickerIndex: endTimePickerIndex,
    })
  },
  bindEndTimePickerChange: function (event) {
    this.setData({
      endTimePickerIndex: event.detail.value,
    })
  },

  // 进入课程提醒选择页
  navigateToRemind: function() {
    wx.navigateTo({
      url: '../remind/remind?remindType=' + this.data.remindType,
    })
  },

  // 进入课程重复选择页
  navigateToRepeat: function () {
    wx.navigateTo({
      url: '../repeat/repeat?repeatType=' + this.data.repeatType + '&repeatTimes=' + this.data.repeatTimes,
    })
  },

  fullDaySwitch: function(event) {
    console.log(event);
    this.setData({
      fullDaySwitch: event.detail.value,
    });
  },

  selectCustomColor: function (event) {
    var colorArray = this.data.colorArray;
    var colorIndex = event.currentTarget.dataset.index;
 
    for(let i = 0; i< colorArray.length;i++) {
      if (i == colorIndex) {
        colorArray[i]['selected'] = true;
      }else {
        colorArray[i]['selected'] = false;
      }
    }
    this.setData({
      colorArray: colorArray,
      selectColorIndex: colorIndex,
    });
  }
})