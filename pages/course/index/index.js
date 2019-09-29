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
        weekList: [
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
          {
            'week': '一',
            'day': '23'
          },

        ],
        'month': '7月',
        'year': '2019年',
        'currentDay': '24',
        'table': [
          {
            'begin': '08:00',
            'end': '09:00',
            'status': '1',
          }
        ]
      }
    ],

    swiperEasing: 'default', // 滑动动画，linear为线性，default为默认
    scrollData: '',
    courseList: [],
    beforeWeek: 3,  // 默认加载当前日期前x周
    aftherWeek: 3,  // 默认加载当前日期前y周
    weekSetpLength: 5,  // 每次新加载x周
    prestrainWeek: 1, // 当前后剩余x周时候提前加载
    currentWeek: 0,  // 当前周列表键值
    currentTable: 0, // 当前滑动表格（视图）位置
    currentYear: '2019年',  // 当前年
    currentMonth: '10月',  // 当前年
    showMenuButton: false, // 左上角菜单键
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.dateList);
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

    var startTime = this.data.startTime; // 日程开始时间
    var endTime = this.data.endTime;  // 日程结束时间
    var timeList = [];
    for (startTime; startTime <= endTime; startTime++) {
      if (startTime < 10) {
        timeList.push({ time: '0' + startTime + ':00', hour: startTime });
      } else {
        timeList.push({ time: startTime + ':00', hour: startTime });
      }
    }
    _this.setData({
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
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    // var weekArray = [];
    var monthArray = [];
    const beforeWeek = this.data.beforeWeek;
    const aftherWeek = this.data.aftherWeek;


    var tempPostList = [
      {
        beginTime: "8:00",
        endTime: "9:00",
        setp: 1,
        taskStatus: 1,      // 任务状态   0:待完成，1:已完成，2:待确认，-1:已取消，-2:已删除
        taskId: 5,          // 任务ID
        titleColor: "#ffc229",     // 任务背景颜色   0:#ffc229  1 :#5fcd64
        taskType: 0,        // 任务类型   0:排课，1:休息，2:自定义
        title: "刘泽中",
      },
      {
        beginTime: "9:30",
        endTime: "10:30",
        setp: 1,
        taskStatus: 0,      // 任务状态
        taskId: 5,          // 任务ID
        titleColor: "#5fcd64",     // 任务背景颜色
        taskType: 0,        // 任务类型
        title: "孙少平",

      },
      {
        beginTime: "12:30",
        endTime: "13:30",
        setp: 1,
        taskStatus: 0,      // 任务状态
        taskId: 5,          // 任务ID
        titleColor: "#ff3d3d",     // 任务背景颜色
        taskType: 0,        // 任务类型
        title: "金老三",
      },
      {
        beginTime: "13:30",
        endTime: "14:30",
        setp: 1,
        taskStatus: 0,      // 任务状态
        taskId: 5,          // 任务ID
        titleColor: "#b2b3b7",     // 任务背景颜色
        taskType: 0,        // 任务类型
        title: "田福军",

      },
      {
        beginTime: "15:30",
        endTime: "17:30",
        setp: 2,
        taskStatus: 0,      // 任务状态
        taskId: 5,          // 任务ID
        titleColor: "#ffc229",     // 任务背景颜色
        taskType: 0,        // 任务类型
        title: "田福军",
      },
      {
        beginTime: "19:00",
        endTime: "21:00",
        setp: 2,
        taskStatus: 0,      // 任务状态
        taskId: 5,          // 任务ID
        titleColor: "#5fcd64",     // 任务背景颜色
        taskType: 0,        // 任务类型
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

        if (tempWeekList[i]['day'] == 24) {


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
                  taskDuration: tempPostList[k]['setp'],    // 时长
                  taskId: tempPostList[k]['taskId'],          // 任务ID
                  titleColor: tempPostList[k]['titleColor'],     // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'],        // 任务类型   0:排课，1:休息，2:自定义
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
                  taskDuration: tempPostList[k]['setp'],    // 时长
                  taskId: tempPostList[k]['taskId'],          // 任务ID
                  titleColor: tempPostList[k]['titleColor'],     // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'],        // 任务类型   0:排课，1:休息，2:自定义
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
            // } else {
            //   // 判断是整点任务还是半点任务
            //   if (tempPostList[hasTask]['beginTime'] == (j + ':00')) {
            //     // 整点任务
            //     tempTime = {
            //       hasTask: true,
            //       taskDuration: tempPostList[hasTask]['setp'],    // 时长
            //       taskId: tempPostList[hasTask]['taskId'],          // 任务ID
            //       titleColor: tempPostList[hasTask]['titleColor'],     // 任务背景颜色   0:#ffc229  1 :#5fcd64
            //       taskType: tempPostList[hasTask]['taskType'],        // 任务类型   0:排课，1:休息，2:自定义
            //       title: tempPostList[hasTask]['title'],
            //       height: 104 * tempPostList[hasTask]['setp'] + 10 * (tempPostList[hasTask]['setp'] - 1),
            //       paddingBottom: '10',
            //     }
            //   } else if (tempPostList[hasTask]['beginTime'] == (j + ':30')) {
            //     // 半点任务

            //     // 输入半个方块
            //     tempTime = {
            //       hasTask: false,
            //       height: '52',
            //       paddingBottom: '0',
            //     }
            //     // 输入任务
            //     tempTime = {
            //       hasTask: true,
            //       taskDuration: tempPostList[hasTask]['setp'],    // 时长
            //       taskId: tempPostList[hasTask]['taskId'],          // 任务ID
            //       titleColor: tempPostList[hasTask]['titleColor'],     // 任务背景颜色   0:#ffc229  1 :#5fcd64
            //       taskType: tempPostList[hasTask]['taskType'],        // 任务类型   0:排课，1:休息，2:自定义
            //       title: tempPostList[hasTask]['title'],
            //       height: 104 * tempPostList[hasTask]['setp'] + 10 * (tempPostList[hasTask]['setp'] - 1),
            //       paddingBottom: 0,
            //     }

            //   }

            // }
          }
          console.log(tempWeekList[i]['tableList']);


          // tempWeekList[i]['tableList'] = [
          //   {
          //     date: '2019-09-25 08:00',
          //     hasTask: true,
          //     taskDuration: 1,    // 时长
          //     beginTime: '8:00',  // 开始时间
          //     endTime: '9:00',    // 结束时间
          //     taskStatus: 1,      // 任务状态   0:待完成，1:已完成，2:待确认，-1:已取消，-2:已删除
          //     taskId: 5,          // 任务ID
          //     titleColor: "#ffc229",     // 任务背景颜色   0:#ffc229  1 :#5fcd64
          //     taskType: 0,        // 任务类型   0:排课，1:休息，2:自定义
          //     title: "刘泽中",
          //     beginHour: '8',
          //     beginMinute: '00',
          //     endHour: '9',
          //     endMinute: '00',
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 09:00',
          //     hasTask: false,
          //     taskDuration: 0.5,
          //     height: '52',
          //     paddingBottom: '0',
          //   },
          //   {
          //     date: '2019-09-25 10:00',
          //     hasTask: true,
          //     taskDuration: 1,    // 时长
          //     beginTime: '10:00',  // 开始时间
          //     endTime: '11:00',    // 结束时间
          //     taskStatus: 0,      // 任务状态
          //     taskId: 5,          // 任务ID
          //     titleColor: "#5fcd64",     // 任务背景颜色
          //     taskType: 0,        // 任务类型
          //     title: "孙少平",
          //     beginHour: '10',
          //     beginMinute: '00',
          //     endHour: '11',
          //     endMinute: '00',
          //     height: '114',
          //     paddingBottom: '0',
          //   },
          //   {
          //     date: '2019-09-25 11:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '52',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 12:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 13:00',
          //     hasTask: false,
          //     taskDuration: 0.5,
          //     height: '52',
          //     paddingBottom: '0',
          //   },
          //   {
          //     date: '2019-09-25 14:00',
          //     hasTask: true,
          //     taskDuration: 1,    // 时长
          //     beginTime: '14:00',  // 开始时间
          //     endTime: '15:00',    // 结束时间
          //     taskStatus: 0,      // 任务状态
          //     taskId: 5,          // 任务ID
          //     titleColor: "#ff3d3d",     // 任务背景颜色
          //     taskType: 0,        // 任务类型
          //     title: "金老三",
          //     beginHour: '14',
          //     beginMinute: '00',
          //     endHour: '15',
          //     endMinute: '00',
          //     height: '114',
          //     paddingBottom: '0',
          //   },

          //   {
          //     date: '2019-09-25 15:00',
          //     hasTask: true,
          //     taskDuration: 1,
          //     beginTime: '14:00',  // 开始时间
          //     endTime: '15:00',    // 结束时间
          //     taskStatus: 0,      // 任务状态
          //     taskId: 5,          // 任务ID
          //     titleColor: "#b2b3b7",     // 任务背景颜色
          //     taskType: 0,        // 任务类型
          //     title: "田福军",
          //     beginHour: '14',
          //     beginMinute: '00',
          //     endHour: '15',
          //     endMinute: '00',
          //     height: '114',
          //     paddingBottom: '0',
          //   },
          //   {
          //     date: '2019-09-25 16:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '52',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 16:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 16:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 19:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 10:00',
          //     hasTask: true,
          //     taskDuration: 1,    // 时长
          //     beginTime: '10:00',  // 开始时间
          //     endTime: '11:00',    // 结束时间
          //     taskStatus: 0,      // 任务状态
          //     taskId: 5,          // 任务ID
          //     titleColor: "#5fcd64",     // 任务背景颜色
          //     taskType: 0,        // 任务类型
          //     title: "孙少平",
          //     beginHour: '10',
          //     beginMinute: '00',
          //     endHour: '11',
          //     endMinute: '00',
          //     height: '332',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 22:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          //   {
          //     date: '2019-09-25 22:00',
          //     hasTask: false,
          //     taskDuration: 1,
          //     height: '104',
          //     paddingBottom: '10',
          //   },
          // ]
        } else {
          tempWeekList[i]['tableList'] = [
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
    wx.vibrateShort();
  },
  // 点击空白区域关闭弹窗
  bindCloseMark: function (event) {
    console.log('关闭所有mark');
    this.setData({
      showMenuButton: false,
    });
  },
  // 开启关闭菜单弹窗
  catchMenuButton: function (event) {
    this.setData({
      showMenuButton: !this.data.showMenuButton,
    });
    wx.vibrateShort();
  },
  // 点击弹窗自身，阻止冒泡关闭弹窗
  catchMenuButtonBubbling: function (event) {
    console.log('点击弹窗本身，阻止冒泡');
  },
  // 切换视图
  catchChangeView: function (event) {
    console.log('切换视图');
  },
  // 生成图片
  catchGenerateImages: function (enent) {
    console.log('生成图片');
  },
  // 打开预约消息
  catchNavigateOrder: function (event) {
    console.log('打开预约消息');
  },
  // 回到当前
  catchCurrentTableChange: function (event) {
    console.log('回到当前');
    this.setData({
      currentTable: this.data.currentWeek,
      showMenuButton: false,
    });
  }

});