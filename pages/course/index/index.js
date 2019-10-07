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
    startX: 0, //开始坐标
    startY: 0,
    navigation_color: '',
    navigation_background: 'white',
    startTime: 8, // 日程开始时间
    endTime: 22, // 日程结束时间
    timeList: [],

    swiperEasing: 'default', // 滑动动画，linear为线性，default为默认
    scrollData: '',
    courseList: [],
    beforeWeek: 3, // 默认加载当前日期前x周
    aftherWeek: 3, // 默认加载当前日期前y周
    weekSetpLength: 5, // 每次新加载x周
    prestrainWeek: 1, // 当前后剩余x周时候提前加载
    currentWeek: 0, // 当前周列表键值
    currentTable: 0, // 当前滑动表格（视图）位置
    currentYear: '2019年', // 当前年
    currentMonth: '10月', // 当前年
    showMenuButton: false, // 左上角菜单键
    showTableButton: false, // 表格弹窗按钮
    tableButtonTop: 0, // 表格弹窗按钮上方位置
    tableButtonLeft: 0, // 表格弹窗按钮左侧位置
    tableButtonMarkWidth: 266, // 表格按钮弹窗宽
    tableButtonMarkHeight: 402, // 表格按钮弹窗高
    tableButtonStyle: '',
    tableButtonArrowStyle: '',
    showTableDirection: 'left',
    tableButtonType: 0, // 按钮类型，0位空白格弹窗，1为已选中弹窗
    timeLineTop: -1,
    movableMessageX: '612', // 可移动的通知框初始X轴坐标
    movableMessageY: '1029', // 可移动的通知框初始Y轴坐标
    viewType: 0, // 0为表格视图，1为列表视图
    calendarShow: true, // false为日历隐藏，true为日历展开
    taskList: [{
        status: 1,
        avatar: 0,
        username: '刘泽中',
        content: '测试测试测试啊',
        lasttime: '03',
        time: '08:30~9:30',
        isTouchMove: false
      }, {
        status: 1,
        avatar: 0,
        username: '刘泽中',
        content: '测试测试测试啊',
        lasttime: '03',
        time: '08:30~9:30',
        isTouchMove: false
      },
      {
        status: 1,
        avatar: 0,
        username: '刘泽中',
        content: '测试测试测试啊',
        lasttime: '03',
        time: '08:30~9:30',
        isTouchMove: false
      },
      {
        status: 1,
        avatar: 0,
        username: '刘泽中',
        content: '测试测试测试啊',
        lasttime: '03',
        time: '08:30~9:30',
        isTouchMove: false
      },
    ],
    operateMark: false, // 操作蒙层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    if (wx.getStorageSync('viewType')) {
      var viewType = wx.getStorageSync('viewType');
    } else {
      var viewType = 0; // 0为表格视图，1为列表视图
    }

    if (wx.getStorageSync('calendarShow')) {
      var calendarShow = wx.getStorageSync('calendarShow');
    } else {
      var calendarShow = false;
    }
    var _this = this;
    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息，坐标信息以屏幕左上角为原点。
    var isSupport = !!wx.getMenuButtonBoundingClientRect;
    var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    // 获取系统信息
    wx.getSystemInfo({
      success: function success(res) {
        console.log(res);
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        _this.setData({
          ios: ios,
          statusBarHeight: res.statusBarHeight,
          innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
          innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
          leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
        });
        console.log('onLoad');
        console.log(res.statusBarHeight);
        console.log('width:' + rect.left + 'px');
        console.log('padding-right:' + (res.windowWidth - rect.left) + 'px');
        console.log('width:' + (res.windowWidth - rect.left) + 'px');
      }
    });

    var startTime = this.data.startTime; // 日程开始时间
    var endTime = this.data.endTime; // 日程结束时间
    var timeList = [];
    for (startTime; startTime <= endTime; startTime++) {
      if (startTime < 10) {
        timeList.push({
          time: '0' + startTime + ':00',
          hour: startTime,
          isCurrent: false
        });
      } else {
        timeList.push({
          time: startTime + ':00',
          hour: startTime,
          isCurrent: false
        });
      }
    }
    _this.setData({
      timeList: timeList,
      viewType: viewType,
      calendarShow: calendarShow,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    let timestamp = moment().valueOf();
    // console.log('onReady');
    // console.log(util.getSign(timestamp));
    // console.log(timestamp);
    $.get(
      'task/week', {
        coachid: wx.getStorageSync('coachid'),
        date: '2019-09-24', // 周时间（默认为本周，格式 yyyy-MM-dd）
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp, //时间戳
      },
      function(res) {
        console.log(res);
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


    // var weekArray = [];
    var monthArray = [];
    const beforeWeek = this.data.beforeWeek;
    const aftherWeek = this.data.aftherWeek;
    var statusBarHeight = this.data.statusBarHeight;
    var movableMessageX = 612; // 可移动的通知框初始X轴坐标
    var movableMessageY = 1029 + (statusBarHeight - 20); // 可移动的通知框初始Y轴坐标

    // 获取当前时间
    console.log('onShow');
    console.log(moment().hour()); // 9
    console.log(moment().minute()); // 30
    if (moment().hour() < (this.data.endTime + 1) && moment().hour() > (this.data.startTime - 1)) {
      var timeLineTop = 20 + (parseInt(moment().hour()) - this.data.startTime) * 114 + (104 / 60) * moment().minute() - 4;
      console.log('显示时间线');
    } else {
      var timeLineTop = -1;
      console.log('不显示时间线');
    }
    // var timeLineTop = 20 + (22 - 8) * 114 + (104 / 60) * 0 - 4;
    var timeList = this.data.timeList;
    console.log('timeLIst');
    console.log(timeList);
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i]['hour'] == moment().hour()) {
        timeList[i]['isCurrent'] = true;
        break;
      }
    }

    var tempPostList = [{
        beginTime: "8:00",
        endTime: "11:00",
        setp: 3,
        taskStatus: 1, // 任务状态   0:待完成，1:已完成，2:待确认，-1:已取消，-2:已删除
        taskId: 5, // 任务ID
        titleColor: "#ffc229", // 任务背景颜色   0:#ffc229  1 :#5fcd64
        taskType: 0, // 任务类型   0:排课，1:休息，2:自定义
        title: "刘泽中",
      },

      {
        beginTime: "12:30",
        endTime: "13:30",
        setp: 1,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#ff3d3d", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "金老三",
      },
      {
        beginTime: "13:30",
        endTime: "14:30",
        setp: 1,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#b2b3b7", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "田福军",

      },
      {
        beginTime: "15:30",
        endTime: "17:30",
        setp: 2,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#ffc229", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "田福军",
      },
      {
        beginTime: "20:00",
        endTime: "21:00",
        setp: 1,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#ffc229", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "田福军",
      },
      {
        beginTime: "21:00",
        endTime: "22:00",
        setp: 1,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#5fcd64", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "孙少平",
      },
      {
        beginTime: "22:00",
        endTime: "23:00",
        setp: 1,
        taskStatus: 0, // 任务状态
        taskId: 5, // 任务ID
        titleColor: "#5fcd64", // 任务背景颜色
        taskType: 0, // 任务类型
        title: "孙少平",
      }
    ];


    // 获取当前周及后三周日期列表
    for (let i = 0; i < aftherWeek; i++) {
      var weekArray = [];
      for (let j = 1; j <= 7; j++) {
        weekArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
      }
      monthArray.push(weekArray);
    }

    // 获取前三周日期列表
    for (let i = 0; i <= beforeWeek; i++) {
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
    for (let i = 0; i < monthArray.length; i++) {
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
            'tableList': [],
          }
          tempCurrentWeek = true;
          // 当前周键值
          currentWeek = i;
          // 当前月键值
          currentMonth = moment(monthArray[i][0]).format('M月');
          // 当前年键值
          currentYear = moment(monthArray[i][0]).format('YYYY年');
          // 
        } else {
          tempDayList = {
            'day': moment(monthArray[i][j]).date(),
            'isCurrent': false,
            'tableList': [],
          }
        }
        tempWeekList.push(tempDayList);
      }



      for (let i = 0; i < tempWeekList.length; i++) {

        if (tempWeekList[i]['day'] == 2) {


          for (let j = this.data.startTime; j <= this.data.endTime; j++) {
            var hasTask = -1;
            var tempTime = [];
            // console.log(j);
            for (let k = 0; k < tempPostList.length; k++) {

              if (tempPostList[k]['beginTime'] == (j + ':00')) {
                // 有整点任务
                console.log('整点');
                hasTask = k;
                tempTime = {
                  hasTask: true,
                  taskDuration: tempPostList[k]['setp'], // 时长
                  taskId: tempPostList[k]['taskId'], // 任务ID
                  titleColor: tempPostList[k]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                  title: tempPostList[k]['title'],
                  height: 104 * tempPostList[k]['setp'] + 10 * (tempPostList[k]['setp'] - 1),
                  paddingBottom: '10',
                }
                tempWeekList[i]['tableList'].push(tempTime);
                j = j + tempPostList[k]['setp'] - 1;
                console.log(104 * tempPostList[k]['setp'] + 10 * (tempPostList[k]['setp'] - 1));
                break;
              } else if (tempPostList[k]['beginTime'] == (j + ':30')) {
                // 有半点任务
                // 判断是否需要半个空白格
                console.log('半点任务');
                hasTask = k;
                var hasEndTime = -1;
                for (let p = 0; p < tempPostList.length; p++) {
                  if (tempPostList[p]['endTime'] == (j + ':30')) {
                    hasEndTime = p;
                  }
                }
                if (hasEndTime == -1) {
                  // 输出空白格
                  var tempTime0 = {
                    hasTask: false,
                    height: '52',
                    paddingBottom: '0',
                  }
                  tempWeekList[i]['tableList'].push(tempTime0);
                }
                // 输出任务快
                tempTime = {
                  hasTask: true,
                  taskDuration: tempPostList[k]['setp'], // 时长
                  taskId: tempPostList[k]['taskId'], // 任务ID
                  titleColor: tempPostList[k]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                  title: tempPostList[k]['title'],
                  height: (104 * tempPostList[k]['setp']) + (10 * (tempPostList[k]['setp'])),
                  paddingBottom: '0',
                }
                tempWeekList[i]['tableList'].push(tempTime);
                j = j + tempPostList[k]['setp'] - 1;
                break;
              } else if (tempPostList[k]['endTime'] == (j + ':30')) {
                // 有结束任务
                // 输出半个空格
                console.log('有结束任务');
                var hasBeginTime = -1;
                for (let p = 0; p < tempPostList.length; p++) {
                  if (tempPostList[p]['beginTime'] == (j + ':30')) {
                    hasBeginTime = p;
                  }
                }
                if (hasBeginTime == -1) {
                  tempTime = {
                    hasTask: false,
                    height: '52',
                    paddingBottom: '10',
                  }
                  tempWeekList[i]['tableList'].push(tempTime);
                }
                hasTask = k;

              }
            }

            if (hasTask == -1) {
              // 输出默认方块，无任务
              tempTime = {
                hasTask: false,
                height: '104',
                paddingBottom: '10',
              }
              tempWeekList[i]['tableList'].push(tempTime);
            }

          }
          console.log(tempWeekList[i]['tableList']);

        } else {
          tempWeekList[i]['tableList'] = [{
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
            {
              date: '2019-09-25 09:00',
              hasTask: false,
              taskDuration: 1,
              height: '104',
              paddingBottom: '10',
            },
          ]
        }

      }
      var tempList = {
        'weekList': tempWeekList,
        'month': moment(monthArray[i][0]).month() + 1,
        'year': moment(monthArray[i][0]).year(),
        'currentWeek': tempCurrentWeek,
      }
      courseList.push(tempList);
    }

    this.setData({
      courseList: courseList,
      currentWeek: currentWeek,
      currentTable: currentWeek,
      scrollData: 'scrollData' + currentWeek,
      currentMonth: currentMonth,
      currentYear: currentYear,
      timeLineTop: timeLineTop,
      timeList: timeList,
      movableMessageX: movableMessageX,
      movableMessageY: movableMessageY,
    });
    console.log(courseList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindTableChange: function(event) {
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
          'currentTable': tempCurrentWeek,
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
          'currentTable': tempCurrentWeek,
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
        currentTable: event.detail.current + this.data.weekSetpLength - 1,
      });
      wx.hideLoading();
    } else {
      this.setData({
        scrollData: 'scrollData' + (event.detail.current),
        currentYear: courseList[event.detail.current].year + '年',
        currentMonth: courseList[event.detail.current].month + '月',
        currentTable: event.detail.current,

      });
    }
    this.setData({
      showMenuButton: false,
      showTableButton: false,
    });
    wx.vibrateShort();
  },
  // 点击空白区域关闭弹窗
  bindCloseMark: function(event) {
    console.log('关闭所有mark');
    this.setData({
      showMenuButton: false,
      showTableButton: false,
    });
  },
  // 开启关闭菜单弹窗
  catchMenuButton: function(event) {
    this.setData({
      showMenuButton: !this.data.showMenuButton,
    });
    wx.vibrateShort();
  },
  // 点击弹窗自身，阻止冒泡关闭弹窗
  catchMenuButtonBubbling: function(event) {
    console.log('点击弹窗本身，阻止冒泡');
  },
  // 切换视图
  catchChangeView: function(event) {
    console.log('切换视图');
    wx.setStorageSync('viewType', this.data.viewType == 0 ? 1 : 0);
    this.setData({
      viewType: this.data.viewType == 0 ? 1 : 0,
      showMenuButton: false,

    });
  },
  // 生成图片
  catchGenerateImages: function(enent) {
    console.log('生成图片');
  },
  // 打开预约消息
  catchNavigateOrder: function(event) {
    console.log('打开预约消息');
  },
  // 回到当前
  catchCurrentTableChange: function(event) {
    console.log('回到当前');
    this.setData({
      currentTable: this.data.currentWeek,
      showMenuButton: false,
    });
  },
  // 表格弹窗
  catchTableMark: function(event) {


    var courseIndex = event.currentTarget.dataset.courseindex;
    var weekIndex = event.currentTarget.dataset.weekindex;
    var tableIndex = event.currentTarget.dataset.tableindex;
    var courseList = this.data.courseList;
    var tableButtonStyle = '';
    var tableButtonArrowStyle = '';
    var tableButtonTop = 20; // 初始化默认加上距顶部的边距

    console.log('*********');
    console.log(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]);
    console.log('*********');

    // 计算左边距
    if (weekIndex < 4) {
      var tableButtonLeft = (weekIndex + 1) * 90 + 5; // 80rpx方块宽 + 10rpx间隙
      tableButtonStyle += 'left:' + tableButtonLeft + 'rpx;';
      var showTableDirection = 'right';
      tableButtonArrowStyle += 'left: -15rpx;'
    } else {
      var tableButtonLeft = weekIndex * 80 + (weekIndex + 1) * 10 - this.data.tableButtonMarkWidth + 4; // 80rpx方块宽 + 10rpx间隙
      tableButtonStyle += 'left:' + tableButtonLeft + 'rpx;';
      var showTableDirection = 'left';
      tableButtonArrowStyle += 'right: -15rpx;'
    }


    // 计算上边距
    for (var i = 0; i <= tableIndex; i++) {
      tableButtonTop += parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][i]['height']) +
        parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][i]['paddingBottom']);
    }
    console.log('上边距判断：' + (tableButtonTop - 104 - 20));

    // 判断是否是有课程的表格
    if (courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == true) {
      var tableButtonMarkHeight = 284;
      var tableButtonType = 1;
      tableButtonStyle += 'height: 284rpx;';
    } else if (courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == false) {
      var tableButtonMarkHeight = 402;
      var tableButtonType = 0;
      tableButtonStyle += 'height: 402rpx;';
    }
    console.log(tableButtonTop);

    console.log(((this.data.endTime - this.data.startTime + 1) * 114 + 20));


    tableButtonTop -= ((tableButtonMarkHeight - parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height'])) / 2 +
      parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) +
      parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['paddingBottom']));




    // 上下边距判断，如果超过则保证安全显示位置
    if (tableButtonTop < 0) {
      // 判断是否超过上边距
      tableButtonTop = 20;
      tableButtonStyle += 'top:20rpx;';
      if (tableButtonType == 0) {
        // 空白区域，无任务
        if (tableIndex == 0) {
          tableButtonArrowStyle += 'top: 40rpx;';
        } else if (tableIndex == 1) {
          tableButtonArrowStyle += 'top: 154rpx;';
        }
      } else {
        var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
        tableButtonArrowStyle += 'top:' + tableButtonArrowBottom + 'rpx';
        console.log('有任务方块高度：' + tableButtonArrowStyle);
        console.log(parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2);
      }


    } else if ((tableButtonTop + tableButtonMarkHeight) > ((this.data.endTime - this.data.startTime + 1) * 114 + 20)) {
      // 判断是否超过下边距
      // 判断方法：计算弹窗按钮区域顶部坐标像素+弹窗按钮区域高度 是否大于 表格区域的总高度
      tableButtonStyle += 'bottom:9rpx;';
      if (tableButtonType == 0) {
        // 空白区域，无任务
        if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 1)) {
          tableButtonArrowStyle += 'bottom: 40rpx;';
        } else if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 2)) {
          tableButtonArrowStyle += 'bottom: 154rpx;';
        }
      } else {
        // 有任务
        // （弹窗高度-表格区域高度） + 表格区域高度 / 2 + 12

        var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
        tableButtonArrowStyle += 'bottom:' + tableButtonArrowBottom + 'rpx';
        console.log('有任务方块高度：' + tableButtonArrowStyle);
        console.log(tableButtonArrowBottom);
      }



    } else {
      tableButtonStyle += 'top:' + tableButtonTop + 'rpx;';

      if (tableButtonType == 0) {
        tableButtonArrowStyle += 'top:189rpx';
      } else {
        tableButtonArrowStyle += 'top:130rpx';
      }
    }






    // tableButtonStyle += 'top:' + tableButtonTop + 'rpx;';

    // if (tableButtonType == 0) {
    //   tableButtonArrowStyle += 'top:189rpx';
    // } else {
    //   tableButtonArrowStyle += 'top:130rpx';
    // }

    console.log(tableButtonStyle);






    // if (tableIndex == 0) {
    //   tableButtonArrowStyle += 'top: 40rpx;';
    // } else if (tableIndex == 1) {
    //   tableButtonArrowStyle += 'top: 154rpx;';
    // } else if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 1)) {
    //   tableButtonArrowStyle += 'bottom: 40rpx;';
    // } else if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 2)) {
    //   tableButtonArrowStyle += 'bottom: 154rpx;';
    // }




    this.setData({
      showTableButton: !this.data.showTableButton,
      tableButtonTop: tableButtonTop, // 表格弹窗按钮上方位置
      tableButtonLeft: tableButtonLeft, // 表格弹窗按钮左侧位置
      tableButtonStyle: tableButtonStyle, // 表格弹窗样式
      showTableDirection: showTableDirection, // 弹窗方向
      tableButtonArrowStyle: tableButtonArrowStyle, // 弹窗箭头指示方向
      tableButtonType: tableButtonType,
    });
  },

  // 点击排课按钮
  catchCourse: function(event) {
    console.log(event);
  },

  // 点击休息按钮
  catchRest: function(event) {
    console.log(event);
  },

  // 点击自定义按钮
  catchCustom: function(event) {
    console.log(event);
  },

  catchEdit: function(event) {

  },

  catchDelete: function(event) {
    wx.showModal({
      title: '确认要删除吗？',
      content: '相关联的课程数据也将被删除',
      cancelText: '删除',
      cancelColor: '#000000',
      confirmText: '取消',
      confirmColor: '#5FCD64',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  changeCalendarShow: function(event) {
    wx.setStorageSync('calendarShow', !this.data.calendarShow);
    this.setData({
      calendarShow: !this.data.calendarShow,
    });
  },

  //手指触摸动作开始 记录起点X坐标
  touchStart: function(e) {
    //开始触摸时 重置所有删除
    var taskList = this.data.taskList;
    taskList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      taskList: taskList
    })
  },
  //滑动事件处理
  touchMove: function(e) {
    var taskList = this.data.taskList;
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    taskList.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      taskList: taskList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  catchUnwind: function(event) {
    console.log('点击');
    if(this.data.operateMark == true) {
      // 关闭遮罩层，打开菜单栏
      wx.showTabBar();
    } else if (this.data.operateMark == false) {
      // 打开遮罩层，关闭菜单栏
      wx.hideTabBar();
    }
    this.setData({
      operateMark: !this.data.operateMark,
    });
  }



});