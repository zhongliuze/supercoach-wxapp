// pages/course/index/index.js
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const moment = require('../../../vendor/moment/moment.js');
const md5 = require('../../../vendor/md5/md5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation_color: '',
    navigation_background: 'white',
    startTime: 8, // 日程开始时间
    endTime: 22, // 日程结束时间
    timeList: [],
    dateList: [
      {
        weekList : [
          {
            'week' : '一',
            'day' : '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          {
            'week': '一',
            'day': '23'
          },
          
        ],
        'month' : '7月',
        'year' : '2019年',
        'currentDay' : '24',
        'table' : [
          {
            'begin' : '08:00',
            'end' : '09:00',
            'status' : '1',
          }
        ]
      }
    ],
    
    swiperEasing: 'linear', // 滑动动画，linear为线性，default为默认
    scrollData: '',
    courseList: [],
    beforeWeek : 5,  // 默认加载当前日期前x周
    aftherWeek : 5,  // 默认加载当前日期前y周
    weekSetpLength: 5,  // 每次新加载x周
    prestrainWeek: 2, // 当前后剩余x周时候提前加载
    currentWeek: 0,  // 当前周列表键值
    currentYear: '2019年',  // 当前年
    currentMonth: '10月',  // 当前年
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.dateList);
    var _this = this;
    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息，坐标信息以屏幕左上角为原点。
    var isSupport = !!wx.getMenuButtonBoundingClientRect;
    var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    // 获取系统信息
    wx.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        _this.setData({
          ios: ios,
          statusBarHeight: res.statusBarHeight,
          innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
          innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
          leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
        });
      }
    });

    var startTime = 8; // 日程开始时间
    var endTime = 22;  // 日程结束时间
    var timeList = [];
    for (startTime; startTime <= endTime; startTime++) {
      if (startTime < 10) {
        timeList.push('0' + startTime + ':00');
      } else {
        timeList.push(startTime + ':00');
      }
    }
    _this.setData({
      startTime: startTime,
      endTime: endTime,
      timeList: timeList,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    let timestamp = moment().valueOf();
    // console.log('onReady');
    // console.log(util.getSign(timestamp));
    // console.log(timestamp);
    $.get(
      'task/week', {
        coachid: wx.getStorageSync('coachid'),
        date: '2019-09-24',  // 周时间（默认为本周，格式 yyyy-MM-dd）
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp,  //时间戳
      },
      function (res) {
        console.log(res);
        // if (res.data.code == 200) {
        //   that.setData({
        //     userInfoServer: res.data.data.userInfo,
        //   });
        // } else {
        //   wx.showToast({
        //     title: res.data.message,
        //     icon: 'none'
        //   })
        // }
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let timestamp = moment().valueOf();
    // console.log(util.getSign(timestamp));
    // console.log(timestamp);
    // $.post(
    //   'task/plan', {
    //     begin: '2019-09-24 10:00:00',
    //     end: '2019-09-24 11:00:00',
    //     coachid: wx.getStorageSync('coachid'),
    //     sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
    //     timestamp: timestamp,  //时间戳
    //     coachStudentId: 0,
    //     courseContentId: 0,
    //     courseRecordId: 0,
    //     remind: 0,
    //     repeat: 0,
    //     repeatCycle: 0,
    //   },
    //   function (res) {
    //     console.log('task/plan');
    //     console.log(res);
    //   }
    // )


    // 获取当前日期s
    var currentDate = moment().weekday(1).format('YYYY-MM-DD');
    var currentDate = moment().weekday(7).format('YYYY-MM-DD');
    console.log(moment().weekday(0).date());
    console.log(moment().weekday(7).date());
    // var weekArray = [];
    var monthArray= [];
    const beforeWeek = this.data.beforeWeek;
    const aftherWeek = this.data.aftherWeek;
    // 获取当前周及后三周日期列表
    for(let i = 0; i<= aftherWeek; i++) {
      var weekArray = [];
      for (let j = 1; j <= 7; j++) {
        weekArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
      }
      monthArray.push(weekArray);
    }
    // 获取前三周日期列表
    for (let i = 0; i < beforeWeek; i++) {
      var weekArray = [];
      for (let j = 1; j <= 7; j++) {
        weekArray.push(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
      }
      monthArray.unshift(weekArray.reverse())
    }

    var courseList = [];
    var currentWeek = 0;
    var currentMonth = '7月';
    var currentYear = '2019年';
    // 组建对象数组
    for (let i = 0; i< monthArray.length; i++) {
      console.log(monthArray[i]);
      var tempWeekList = [];
      var tempCurrentWeek = false;
      // 优化日期数组
      for(let j = 0; j< monthArray[i].length; j++) {
        let tempDayList = [];
        // 判断是否是当日
        if (monthArray[i][j] == moment().format('YYYY-MM-DD')) {
          tempDayList = {
            'day': moment(monthArray[i][j]).date(),
            'isCurrent': true,
          }
          tempCurrentWeek = true;
          // 当前周键值
          currentWeek = i;
          // 当前月键值
          currentMonth = moment(monthArray[i][0]).format('M月');
          // 当前年键值
          currentYear = moment(monthArray[i][0]).format('YYYY年');
        }else {
          tempDayList = {
            'day': moment(monthArray[i][j]).date(),
            'isCurrent': false,
          }
        }
        tempWeekList.push(tempDayList);
      }
      
      var tempList = {
        'weekList': tempWeekList,
        'month': moment(monthArray[i][0]).month() + 1,
        'year': moment(monthArray[i][0]).year(),
        'tableList': [],
        'currentWeek': tempCurrentWeek,
      }
      courseList.push(tempList);
    }
    console.log('************************');
    console.log(currentWeek);
    console.log('scrollData' + currentWeek);
    console.log('************************');
    this.setData({
      courseList: courseList,
      currentWeek: currentWeek,
      scrollData: 'scrollData' + currentWeek,
      'currentMonth': currentMonth,
      'currentYear': currentYear,
    });
    console.log(courseList);
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

  bindTableChange: function (event) {
    var courseList = this.data.courseList;
    
    // 向后加载数据
    if (event.detail.current > (courseList.length - this.data.prestrainWeek - 1)) {
      console.log('需要向后加载数据了');
      // var weekArray = [];
      wx.showToast({
        title: '正在加载',
        icon: 'loading'
      })
      var monthArray = [];
      const aftherWeek = this.data.aftherWeek;
      const newAfterWeek = aftherWeek + this.data.weekSetpLength;
      // 获取当前周及后三周日期列表
      for (let i = aftherWeek + 1; i <= newAfterWeek; i++) {
        var weekArray = [];
        for (let j = 1; j <= 7; j++) {
          weekArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
        }
        monthArray.push(weekArray);
      }
      console.log(monthArray);
      
      var courseList = this.data.courseList;
      var currentWeek = 0;
      var currentMonth = '7月';
      var currentYear = '2019年';
      // 组建对象数组
      for (let i = 0; i < monthArray.length; i++) {
        console.log(monthArray[i]);
        var tempWeekList = [];
        var tempCurrentWeek = false;
        // 优化日期数组
        for (let j = 0; j < monthArray[i].length; j++) {
          let tempDayList = [];
          // 判断是否是当日
          if (monthArray[i][j] == moment().format('YYYY-MM-DD')) {
            tempDayList = {
              'day': moment(monthArray[i][j]).date(),
              'isCurrent': true,
            }
            tempCurrentWeek = true;
            // 当前周键值
            currentWeek = i;
            // 当前月键值
            currentMonth = moment(monthArray[i][0]).format('M月');
            // 当前年键值
            currentYear = moment(monthArray[i][0]).format('YYYY年');
          } else {
            tempDayList = {
              'day': moment(monthArray[i][j]).date(),
              'isCurrent': false,
            }
          }
          tempWeekList.push(tempDayList);
        }

        var tempList = {
          'weekList': tempWeekList,
          'month': moment(monthArray[i][0]).month() + 1,
          'year': moment(monthArray[i][0]).year(),
          'tableList': [],
          'currentWeek': tempCurrentWeek,
        }
        courseList.push(tempList);
      }

      this.setData({
        scrollData: 'scrollData' + (event.detail.current),
        currentYear: courseList[event.detail.current].year + '年',
        currentMonth: courseList[event.detail.current].month + '月',
        courseList: courseList,
        aftherWeek: newAfterWeek,
      });
      wx.hideLoading();

    }
    // 向前加载数据
    else if (event.detail.current < this.data.prestrainWeek) {
      wx.showToast({
        title: '正在加载',
        icon: 'loading'
      })
      console.log('需要向前加载数据了');
      console.log(event.detail.current);
      // var weekArray = [];
      var monthArray = [];
      const beforeWeek = this.data.beforeWeek;
      const newBeforeWeek = beforeWeek + this.data.weekSetpLength;
      // 获取当前周及后三周日期列表
      for (let i = beforeWeek; i < newBeforeWeek; i++) {
        var weekArray = [];
        for (let j = 1; j <= 7; j++) {
          weekArray.push(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
        }
        monthArray.unshift(weekArray.reverse());
      }

      var courseList = this.data.courseList;
      var currentWeek = 0;
      var currentMonth = '7月';
      var currentYear = '2019年';

      // 组建对象数组
      for (var i = monthArray.length - 1; i > 0; i--) {
        var tempWeekList = [];
        var tempCurrentWeek = false;
        // 优化日期数组
        for (let j = 0; j < monthArray[i].length; j++) {
          let tempDayList = [];
          // 判断是否是当日
          if (monthArray[i][j] == moment().format('YYYY-MM-DD')) {
            tempDayList = {
              'day': moment(monthArray[i][j]).date(),
              'isCurrent': true,
            }
            tempCurrentWeek = true;
            // 当前周键值
            currentWeek = i;
            // 当前月键值
            currentMonth = moment(monthArray[i][0]).format('M月');
            // 当前年键值
            currentYear = moment(monthArray[i][0]).format('YYYY年');
          } else {
            tempDayList = {
              'day': moment(monthArray[i][j]).date(),
              'isCurrent': false,
            }
          }
          tempWeekList.push(tempDayList);
        }
        console.log(tempWeekList);
        var tempList = {
          'weekList': tempWeekList,
          'month': moment(monthArray[i][0]).month() + 1,
          'year': moment(monthArray[i][0]).year(),
          'tableList': [],
          'currentWeek': tempCurrentWeek,
        }
        
        courseList.unshift(tempList);
      }
      console.log(courseList);
      this.setData({
        scrollData: 'scrollData' + (event.detail.current),
        currentYear: courseList[event.detail.current].year + '年',
        currentMonth: courseList[event.detail.current].month + '月',
        courseList: courseList,
        beforeWeek: newBeforeWeek - 1,
        currentWeek: event.detail.current + this.data.weekSetpLength -1,
      });
      wx.hideLoading();
    } else {
      this.setData({
        scrollData: 'scrollData' + (event.detail.current),
        currentYear: courseList[event.detail.current].year + '年',
        currentMonth: courseList[event.detail.current].month + '月',
      });
    }
    wx.vibrateShort();
  },
}) 