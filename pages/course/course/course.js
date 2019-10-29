// pages/course/course/course.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const md5 = require('../../../vendor/md5/md5.min.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseType: 2, // 页面类型：0排课，1休息，2自定义
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度

    startTimePickerArray: [], // 开始时间选择框列表
    endTimePickerArray: [], // 结束时间选择框列表

    startTimeShowArray: [], // 开始时间展示列表
    endTimeShowArray: [],  // 结束时间展示列表

    startTimePickerIndex: [0, 0, 0], // 开始时间选中位置 
    endTimePickerIndex: [0, 0, 0], // 结束时间选中位置
    
    remindType: 0, // 提醒类型：0不提醒，1开始时、30分钟前、1小时前……
    repeatType: 0, // 重复类型：0不重复，1每天、2每周、3每月
    repeatTimes: 0, // 重复次数, 实际次数为repeatTimes+1

    remindArray: ['无提醒', '开始时', '30分钟前', '1小时前', '3小时前', '6小时前', '1天前'], // 提醒类型字典
    repeatArray: ['不重复', '每天', '每周', '每月'],  // 重复类型字典

    fullDaySwitch: false, // 全天按钮打开/关闭

    colorArray: [{ color: '#DC4F5A', selected: false },{ color: '#DC5960', selected: false },{ color: '#EA6E7F', selected: false },{ color: '#E89CA4', selected: true },{ color: '#306BF5', selected: false },{ color: '#5392E8', selected: false },{ color: '#F1A044', selected: false },{ color: '#F4BA40', selected: false },{ color: '#F1A044', selected: false },{ color: '#F4BA40', selected: false },{ color: '#439697', selected: false },{ color: '#58A45C', selected: false },{ color: '#6653A2', selected: false },{ color: '#07070B', selected: false },{ color: '#444756', selected: false },  // 色彩字典
    ],

    selectColorIndex: 0, // 选中颜色下标
    scrollIntoView: '', // 颜色方块自动滚入位置

    customTitle: '',  // 自定义标题内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var selectDate = options.selectDate;  // 传递过来的选中时间
    var timePickerArray = [];  // 时间选择框列表
    var timeShowArray = [];  // 时间展示列表

    var timePickerDate = [];  // 时间日期选择框列表
    var timeShowDate = []; // 时间日期展示列表

    var timePickerHour = [];  // 时间小时选择框列表
    var timeShowHour = [];  // 时间小时展示列表

    var startTimePickerIndex = [0, 0, 0];  // 开始日期时间位置
    var endTimePickerIndex = [0, 0, 0];  // 结束日期时间位置

    // 汉化moment的周时间展示
    moment.locale('zh-cn', {
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    });

    // 拆分选中时间数据
    selectDate = selectDate.split("-");

    // 生成picker选择框日期数据
    for (let i = 0; i < 60; i++) {
      timePickerDate.push(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).add(i + 1, 'day').format('MM月DD日 ddd'));
      timePickerDate.unshift(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).subtract(i, 'day').format('MM月DD日 ddd'));

      timeShowDate.push(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).add(i + 1, 'day').format('YYYY-MM-DD'));
      timeShowDate.unshift(moment(selectDate[0] + '-' + selectDate[1] + '-' + selectDate[2]).subtract(i, 'day').format('YYYY-MM-DD'));
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
    timePickerArray.push(timePickerDate, timePickerHour, ['00分', '30分']);

    // 写入展示数据列表中
    timeShowArray.push(timePickerDate, timeShowHour, ['00', '30'], timeShowDate)


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
      startTimePickerArray: timePickerArray,
      endTimePickerArray: timePickerArray,
      startTimeShowArray: timeShowArray,
      endTimeShowArray: timeShowArray,
      startTimePickerIndex: startTimePickerIndex,
      endTimePickerIndex: endTimePickerIndex,
      courseType: options.courseType,
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

  /**
   * 点击开始时间选择列表
   */
  bindStartTimePickerChange: function (event) {
    var startTimePickerIndex = event.detail.value;  // 开始时间选中位置
    var endTimePickerIndex = [0, 0, 0];  // 结束时间选中位置

    var endTimePickerArray = this.data.endTimePickerArray; // 结束时间选择列表
    var endTimeShowArray = this.data.endTimeShowArray;  // 结束时间展示列表
    
    // 将结束日期列表中日期列表缩减至选中开始日期之后
    var timePickerDate = [];
    for (let i = 0; i < 60; i++) {
      timePickerDate.push(moment(moment(this.data.startTimeShowArray[3][startTimePickerIndex[0]]).format('YYYY-MM-DD')).add(i, 'day').format('MM月DD日 ddd'));
    }
    endTimePickerArray[0] = timePickerDate;
    endTimeShowArray[0] = timePickerDate;

    // 将结束时间列表中小时列表缩小至选中开始小时之后
    var timePickerHour = [];
    var timeShowHour = [];
    for (let i = startTimePickerIndex[1] + app.globalData.startTime + 1; i <= app.globalData.endTime + 1; i++) {
      if (i < 10) {
        timePickerHour.push('0' + i + '时');
        timeShowHour.push('0' + i);
      } else {
        timePickerHour.push(i + '时');
        timeShowHour.push(i);
      }
    }
    endTimePickerArray[1] = timePickerHour;
    endTimeShowArray[1] = timeShowHour;


    // 结束时间保持分钟与开始时间分钟数一致
    if (startTimePickerIndex[2] == 0) {
      // 选中了00分
      endTimePickerArray[2] = ['00分'];
      endTimeShowArray[2] = ['00'];
    } else if (startTimePickerIndex[2] == 1) {
      // 选中了30分
      endTimePickerArray[2] = ['30分'];
      endTimeShowArray[2] = ['30'];
    }
    
    this.setData({
      'startTimePickerIndex': startTimePickerIndex,
      'endTimePickerIndex': endTimePickerIndex,
      'endTimePickerArray': endTimePickerArray,
      'endTimeShowArray': endTimeShowArray,
    })
  },

  /**
   * 点击结束时间选择列表
   */
  bindEndTimePickerChange: function (event) {
    this.setData({
      'endTimePickerIndex': event.detail.value,
    })
  },

  /**
   * 点击进入课程提醒选择页
   */
  navigateToRemind: function () {
    wx.navigateTo({
      url: '../remind/remind?remindType=' + this.data.remindType,
    })
  },

  /**
   * 点击进入课程重复选择页
   */
  navigateToRepeat: function () {
    wx.navigateTo({
      url: '../repeat/repeat?repeatType=' + this.data.repeatType + '&repeatTimes=' + this.data.repeatTimes,
    })
  },

  /**
   * 整天Switch开关打开/关闭
   */
  fullDaySwitch: function (event) {
    console.log(event);
    this.setData({
      fullDaySwitch: event.detail.value,
    });
  },

  /**
   * 自定义颜色选择
   */
  selectCustomColor: function (event) {
    var colorArray = this.data.colorArray;
    var colorIndex = event.currentTarget.dataset.index;

    for (let i = 0; i < colorArray.length; i++) {
      if (i == colorIndex) {
        colorArray[i]['selected'] = true;
      } else {
        colorArray[i]['selected'] = false;
      }
    }
    this.setData({
      colorArray: colorArray,
      selectColorIndex: colorIndex,
    });
  },

  /**
   * 点击进入自定义名称列表页
   */
  navigateToCustomList: function (event) {
    wx.navigateTo({
      url: '../custom/custom',
    })
  },

  /**
   * 点击进入课程类型选择页
   */
  navigateToSubject: function(event) {
    wx.navigateTo({
      url: '../subject/subject',
    })
  },

  /**
   * 点击进入上课内容选择页
   */
  navigateToLesson: function (event) {
    wx.navigateTo({
      url: '../lesson/lesson',
    })
  },

  /**
   * 保存/创建任务数据
   */
  bindSave: function (event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.post(
      'task/plan', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'begin': '2019-10-17 09:00', // 开始时间（格式 yyyy-MM-dd HH:mm）
        'end': '2019-10-17 10:00', // 结束时间（格式 yyyy-MM-dd HH:mm）
        'coachStudentId': 0, // 教练与学员关系 ID
        'courseContentId': 0, // 上课内容ID
        'courseRecordId': 0, // 购课记录ID
        'remind': 0, // 课前提醒（0：无提醒、1、30、60、180、360、86400
        'repeatCycle': 0, // 重复周期
      },
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: '1'
                })
              }, 1500);
            }

          })
        } else {
          wx.showToast({
            title: '创建失败',
            icon: 'none'
          })
        }
      }
    )
  }
})