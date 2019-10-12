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
    calendarScrollIndex: '', // 日历缩略列表自动滚动
    courseList: [],
    beforeWeek: 6, // 默认加载当前日期前x周
    aftherWeek: 5, // 默认加载当前日期前y周
    defaultWeekLength: 5, // 默认加载周列表长度，左右各5
    weekSetpLength: 5, // 每次新加载x周
    prestrainWeek: 2, // 当前后剩余x周时候提前加载
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
    operateMark: false, // 操作蒙层
    currentButtonWeekIndex: 0, // 表格弹窗选中周下标
    currentButtonDayIndex: 0, // 表格弹窗选中日下标
    currentButtonHourIndex: 0, // 表格弹窗选中小时下标
    calendarList: [], // 日历视图中日历表格

    currentCalendarWeekIndex: 0, // 日历视图中当前选中日期周下标
    currentCalendarDayIndex: 0, // 日历视图中当前选中日期日下标
    testi: 6,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    // 获取缓存中视图类型
    if (wx.getStorageSync('viewType')) {
      var viewType = wx.getStorageSync('viewType');
    } else {
      var viewType = 0; // 0为表格视图，1为日历视图
    }

    // 获取日历视图是否展开或收起
    if (wx.getStorageSync('calendarShow')) {
      var calendarShow = wx.getStorageSync('calendarShow');
    } else {
      var calendarShow = false;
    }

    // 顶部导航栏机型自适应设置
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

    // 生成表格视图中左侧时间列表
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

    // for (let i = 0; i < 3; i++) {
    //   var monthList = [];
    //   var currentDate = moment().add(i - 1, 'M').format('YYYY-MM');
    //   // 获取本月开始、结束时间
    //   for (let j = moment(currentDate).startOf('month').date(); j <= moment(currentDate).endOf('month').date(); j++) {
    //     monthList.push({
    //       'day': j,
    //       'selected': false,
    //       'hasTask': false,
    //     });
    //   }
    //   lineCalendarList.push({
    //     'monthList': monthList,
    //     'month': moment(currentDate).month() + 1,
    //     'year': moment(currentDate).year(),
    //     'selected': false,
    //   });
    // }
    // console.log(lineCalendarList);

    /**
     * 构建表格视图基础列表
     */
    var tempCourseList = [];
    const defaultWeekLength = this.data.defaultWeekLength;
    // 获取当前周及前后n周日期数据
    for (let i = 0; i <= defaultWeekLength; i++) {
      var weekAfterArray = [];
      var weekBeforeArray = [];
      for (let j = 1; j <= 7; j++) {
        weekAfterArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
        weekBeforeArray.unshift(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
      }
      tempCourseList.push(weekAfterArray);
      tempCourseList.unshift(weekBeforeArray)
    }


    /**
     * 构建日历视图基础列表
     */
    var calendarList = [];
    for (let i = 0; i < 3; i++) {
      var currentDate = moment().add(i - 1, 'M').format('YYYY-MM');
      var monthList = [];
      for (let j = 0; j < 6; j++) {
        var weekList = [];
        for (let k = 0; k < 7; k++) {
          weekList.push({
            day: moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).date(),
            month: moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).month() + 1,
            year: moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).year(),
            selected: false,
            hasTask: false,
          });
        }
        monthList.push({
          'weekList': weekList,
        });
      };
      calendarList.push({
        'monthList': monthList,
        'month': moment(currentDate).month() + 1,
        'year': moment(currentDate).year(),
        'selected': false,
      });
    }

    console.log(calendarList);
    
    // 构建空表格
    var courseData = this.getCourseTableList(tempCourseList, 'onload');
    // 更新数据
    this.setData({
      courseList: courseData.courseList,
      currentWeek: courseData.currentWeek,
      currentTable: courseData.currentWeek,
      scrollData: 'scrollData' + courseData.currentWeek,
      calendarScrollIndex: 'calendarScroll' + courseData.currentWeek,
      currentMonth: courseData.currentMonth,
      currentYear: courseData.currentYear,
      timeList: timeList,
      viewType: viewType,
      calendarShow: calendarShow,
      calendarList: calendarList, // 日历视图中日历列表，
      currentCalendarWeekIndex: courseData.currentWeek, // 日历视图中当前选中日历下标
      currentCalendarDayIndex: courseData.currentDay, // 日历视图中当前选中日历下标
      
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('本周位置：' + this.data.currentWeek);
    console.log(this.data.courseList);
    console.log(this.data.calendarScrollIndex);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var courseList = this.data.courseList; // 已生成课表数据
    console.log('courseList:');
    console.log(courseList);
    // 获取当前时间，展示时间线
    if (moment().hour() < (this.data.endTime + 1) && moment().hour() > (this.data.startTime - 1)) {
      // 显示时间线
      var timeLineTop = 20 + (parseInt(moment().hour()) - this.data.startTime) * 114 + (104 / 60) * moment().minute() - 4;
    } else {
      // 不显示时间线
      var timeLineTop = -1;
    }

    // 寻找当前时间，标红展示
    var timeList = this.data.timeList;
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i]['hour'] == moment().hour()) {
        timeList[i]['isCurrent'] = true;
        break;
      }
    }

    let timestamp = moment().valueOf();
    $.get(
      'task/range', {
        coachid: wx.getStorageSync('coachid'),
        beginDate: courseList[0]['weekList'][0]['date'], // 周时间（默认为本周，格式 yyyy-MM-dd）
        endDate: courseList[courseList.length - 1]['weekList'][courseList[courseList.length - 1]['weekList'].length - 1]['date'],
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp, //时间戳
      },
      function (res) {
        if (res.data.code == 0) {
          // 获取成功
          console.log(res.data);
          _this.setData({
            courseList: _this.getCourseTasksList(res.data.data.taskList, courseList),
          });
        } else {
          wx.showToast({
            title: '课程信息加载失败',
            icon: 'none'
          })
        }
      }
    )

    _this.setData({
      timeLineTop: timeLineTop, // 当前时间线位置
      timeList: timeList, // 更新当前时间展示颜色
      movableMessageY: 1029 + (this.data.statusBarHeight - 20), // 设置可移动预约消息框初始Y轴坐标
    });
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
   * 滑动加载表格数据
   */
  bindTableChange: function (event) {
    var _this = this;
    // 获取现有列表
    var courseList = this.data.courseList;
    var tempCoursePostList = [];
    // 获取当前显示周及需要加载周的长度
    const afterWeek = this.data.aftherWeek;
    const beforeWeek = this.data.beforeWeek;
    var newAfterWeek = afterWeek;
    var newBeforeWeek = beforeWeek;
    // 加载方向
    var loadDirection = 'right';

    // 判断是否需要加载数据
    if (event.detail.current > (courseList.length - this.data.prestrainWeek - 1) || event.detail.current < this.data.prestrainWeek) {
      // 需要加载数据
      var dataList = [];
      // 判断是向前还是向后加载周数据
      if (event.detail.current > (courseList.length - this.data.prestrainWeek - 1)) {
        // 需要向后加载数据
        loadDirection = 'right';
        newAfterWeek = newAfterWeek + this.data.weekSetpLength;
        // 获取当前周及后n周日期列表
        for (let i = afterWeek + 1; i <= newAfterWeek; i++) {
          var weekAfterArray = [];
          for (let j = 1; j <= 7; j++) {
            weekAfterArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
          }
          dataList.push(weekAfterArray);
        }
      } else if (event.detail.current < this.data.prestrainWeek) {
        // 需要向前加载数据
        loadDirection = 'left';
        newBeforeWeek = beforeWeek + this.data.weekSetpLength;
        // 获取当前周及后n周日期列表
        for (let i = beforeWeek; i < newBeforeWeek; i++) {
          var weekBeforeArray = [];
          for (let j = 1; j <= 7; j++) {
            weekBeforeArray.push(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
          }
          dataList.unshift(weekBeforeArray.reverse());
        }
      }

      // 组建对象数组
      var tableList = this.getCourseTableList(dataList);
      // 获取时间戳
      let timestamp = moment().valueOf();
      $.get(
        'task/range', {
          coachid: wx.getStorageSync('coachid'), // 用户id
          beginDate: tableList[0]['weekList'][0]['date'], //  开始时间
          endDate: tableList[tableList.length - 1]['weekList'][tableList[tableList.length - 1]['weekList'].length - 1]['date'], // 结束时间
          sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
          timestamp: timestamp, //时间戳
        },
        function (res) {
          if (res.data.code == 0) {
            // 判断数据加载方向
            if (loadDirection == 'left') {
              // 向前加载
              var newCourseList = _this.getCourseTasksList(res.data.data.taskList, tableList).concat(courseList);
            } else if (loadDirection == 'right') {
              // 向后加载
              var newCourseList = courseList.concat(_this.getCourseTasksList(res.data.data.taskList, tableList));
            }
            // 更新数据
            _this.setData({
              courseList: newCourseList,
              currentYear: newCourseList[event.detail.current].year + '年',
              currentMonth: newCourseList[event.detail.current].month + '月',

            });
          } else {
            // 服务器数据获取失败，返回空表格
            wx.showToast({
              title: '课程信息加载失败',
              icon: 'none'
            })
            // 判断数据加载方向
            if (loadDirection == 'left') {
              // 向前加载
              var newCourseList = tableList.concat(courseList);
            } else if (loadDirection == 'right') {
              // 向后加载
              var newCourseList = courseList.concat(tableList);
            }
            // 更新数据
            _this.setData({
              courseList: newCourseList,
              currentYear: newCourseList[event.detail.current].year + '年',
              currentMonth: newCourseList[event.detail.current].month + '月',
            });
          }
        }
      )

      // 判断加载方向，赋值更新数据
      if (loadDirection == 'left') {
        _this.setData({
          scrollData: 'scrollData' + (event.detail.current), // 滚动到某个视图
          beforeWeek: newBeforeWeek, // 距当前周的前距离
          aftherWeek: newAfterWeek, // 距当前周的后距离
          currentTable: event.detail.current + _this.data.weekSetpLength, // 当前显示的周
          currentWeek: _this.data.currentWeek + _this.data.weekSetpLength, // 当前时间所在周所在位置下标
        });
      } else {
        _this.setData({
          scrollData: 'scrollData' + (event.detail.current),
          beforeWeek: newBeforeWeek,
          aftherWeek: newAfterWeek,
        });
      }

    } else {
      // 无需预加载，直接滚到下一页
      this.setData({
        scrollData: 'scrollData' + (event.detail.current),
        currentYear: courseList[event.detail.current].year + '年',
        currentMonth: courseList[event.detail.current].month + '月',
        currentTable: event.detail.current,
      });
    }

    // 关闭所有弹窗
    _this.setData({
      showMenuButton: false,
      showTableButton: false,
    });
    // 设备短震动
    wx.vibrateShort();
  },


  /**
   * 点击空白区域关闭弹窗
   */
  bindCloseMark: function (event) {
    var currentButtonWeekIndex = this.data.currentButtonWeekIndex; // 表格弹窗选中周下标
    var currentButtonDayIndex = this.data.currentButtonDayIndex; // 表格弹窗选中周下标
    var currentButtonHourIndex = this.data.currentButtonHourIndex; // 表格弹窗选中周下标
    var courseList = this.data.courseList;
    // 选中位置颜色改成默认
    courseList[currentButtonWeekIndex]['weekList'][currentButtonDayIndex]['tableList'][currentButtonHourIndex]['titleColor'] = '';
    this.setData({
      showMenuButton: false,
      showTableButton: false,
      operateMark: false,
      courseList: courseList,
    });
  },

  /**
   * 开启关闭菜单弹窗
   */
  catchMenuButton: function (event) {
    this.setData({
      showMenuButton: !this.data.showMenuButton,
    });
    wx.vibrateShort();
  },

  /**
   * 点击弹窗自身，阻止冒泡关闭弹窗
   */
  catchMenuButtonBubbling: function (event) { },

  /**
   * 切换视图
   */
  catchChangeView: function (event) {
    wx.setStorageSync('viewType', this.data.viewType == 0 ? 1 : 0);
    this.setData({
      viewType: this.data.viewType == 0 ? 1 : 0,
      showMenuButton: false,

    });
  },

  /**
   * 生成图片
   */
  catchGenerateImages: function (enent) {
    console.log('生成图片');
  },

  /**
   * 打开预约消息
   */
  catchNavigateOrder: function (event) {
    console.log('打开预约消息');
  },

  /**
   * 返回本周
   */
  catchCurrentTableChange: function (event) {
    console.log('本周位置：' + this.data.currentWeek);
    this.setData({
      currentTable: this.data.currentWeek,
      showMenuButton: false,
    });
  },

  /**
   * 选中表格按钮弹窗
   */
  catchTableMark: function (event) {
    var courseList = this.data.courseList; // 任务列表

    // 判断是否打开，已打开则直接关闭，未打开则计算下面内容
    if (this.data.showTableButton == true) {
      var currentButtonWeekIndex = this.data.currentButtonWeekIndex; // 表格弹窗选中周下标
      var currentButtonDayIndex = this.data.currentButtonDayIndex; // 表格弹窗选中周下标
      var currentButtonHourIndex = this.data.currentButtonHourIndex; // 表格弹窗选中周下标
      // 选中位置颜色改成默认
      courseList[currentButtonWeekIndex]['weekList'][currentButtonDayIndex]['tableList'][currentButtonHourIndex]['titleColor'] = '';
      this.setData({
        showTableButton: false,
        courseList: courseList,
      });
      return;
    }

    var courseIndex = event.currentTarget.dataset.courseindex; // 选中周下标位置
    var weekIndex = event.currentTarget.dataset.weekindex; // 选中天下标位置
    var tableIndex = event.currentTarget.dataset.tableindex; // 选中时间位置

    var tableButtonStyle = ''; // 弹窗样式
    var tableButtonArrowStyle = ''; // 弹窗三角标样式
    var tableButtonTop = 20; // 初始化默认加上距顶部的边距

    // 计算弹窗x轴边距
    // 判断弹窗显示位置
    if (weekIndex < 4) {
      // 弹窗显示在左侧
      var tableButtonLeft = (weekIndex + 1) * 90 + 5;
      tableButtonStyle += 'left:' + tableButtonLeft + 'rpx;';
      var showTableDirection = 'right';
      // 弹窗三角标左边距
      tableButtonArrowStyle += 'left: -15rpx;'
    } else {
      // 弹窗显示在右侧
      var tableButtonLeft = weekIndex * 80 + (weekIndex + 1) * 10 - this.data.tableButtonMarkWidth + 4;
      tableButtonStyle += 'left:' + tableButtonLeft + 'rpx;';
      var showTableDirection = 'left';
      // 弹窗三角标右边距
      tableButtonArrowStyle += 'right: -15rpx;'
    }

    // 计算弹窗Y轴边距
    for (var i = 0; i <= tableIndex; i++) {
      // 累加上方所有表格的高度
      tableButtonTop += parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][i]['height']) +
        parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][i]['paddingBottom']);
    }

    // 判断选中表格是否有任务
    if (courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == true) {
      // 有任务
      var tableButtonMarkHeight = 284; // 弹窗高度
      var tableButtonType = 1; // 弹窗类型
      tableButtonStyle += 'height: 284rpx;';
    } else if (courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == false) {
      // 无任务
      var tableButtonMarkHeight = 402; // 弹窗高度
      var tableButtonType = 0; // 弹窗类型
      tableButtonStyle += 'height: 402rpx;';
    }

    // 累计高度减去自身高度的一半
    tableButtonTop -= ((tableButtonMarkHeight - parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height'])) / 2 +
      parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) +
      parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['paddingBottom']));

    // 上下边距判断，保证显示在安全位置
    if (tableButtonTop < 0) {
      // 弹窗位置已超过上边距
      tableButtonTop = 20;
      tableButtonStyle += 'top:20rpx;';
      if (tableButtonType == 0) {
        // 无任务区域
        if (tableIndex == 0) {
          tableButtonArrowStyle += 'top: 40rpx;'; // 弹窗三角标位置
        } else if (tableIndex == 1) {
          tableButtonArrowStyle += 'top: 154rpx;'; // 弹窗三角标位置
        }
      } else {
        // 有任务区域
        var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
        tableButtonArrowStyle += 'top:' + tableButtonArrowBottom + 'rpx'; // 弹窗三角标位置

      }

    } else if ((tableButtonTop + tableButtonMarkHeight) > ((this.data.endTime - this.data.startTime + 1) * 114 + 20)) {
      // 弹窗位置已超过上边距，判断方法：计算弹窗按钮区域顶部坐标像素+弹窗按钮区域高度 是否大于 表格区域的总高度
      tableButtonStyle += 'bottom:9rpx;';
      if (tableButtonType == 0) {
        // 无任务区域
        if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 1)) {
          tableButtonArrowStyle += 'bottom: 40rpx;';
        } else if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 2)) {
          tableButtonArrowStyle += 'bottom: 154rpx;';
        }
      } else {
        // 有任务区域，（弹窗高度-表格区域高度） + 表格区域高度 / 2 + 12
        var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
        tableButtonArrowStyle += 'bottom:' + tableButtonArrowBottom + 'rpx';
      }
    } else {
      // 位置正常
      tableButtonStyle += 'top:' + tableButtonTop + 'rpx;'; // 上边距
      // 判断弹窗类型，确定三角标位置
      if (tableButtonType == 0) {
        // 无任务
        tableButtonArrowStyle += 'top:189rpx'; // 三角标位置
      } else {
        // 有任务
        tableButtonArrowStyle += 'top:130rpx'; // 三角标位置
      }
    }

    // 选择位置颜色区分
    courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['titleColor'] = '#B2F3B5';

    // 赋值更新数据
    this.setData({
      showTableButton: !this.data.showTableButton, // 显示/隐藏弹窗
      tableButtonTop: tableButtonTop, // 表格弹窗按钮上方位置
      tableButtonLeft: tableButtonLeft, // 表格弹窗按钮左侧位置
      tableButtonStyle: tableButtonStyle, // 表格弹窗样式
      showTableDirection: showTableDirection, // 弹窗方向
      tableButtonArrowStyle: tableButtonArrowStyle, // 弹窗箭头指示方向
      tableButtonType: tableButtonType, // 弹窗类型
      courseList: courseList,
      currentButtonWeekIndex: courseIndex,
      currentButtonDayIndex: weekIndex,
      currentButtonHourIndex: tableIndex,
    });
  },

  /**
   * 点击排课按钮
   */
  catchCourse: function (event) {
    wx.showTabBar();
    wx.navigateTo({
      url: '../course/course?courseType=0',
    })
    this.bindCloseMark();
  },

  /**
   * 点击休息按钮
   */
  catchRest: function (event) {
    wx.showTabBar();
    wx.navigateTo({
      url: '../course/course?courseType=1',
    })
    this.bindCloseMark();
  },

  /**
   * 点击自定义按钮
   */
  catchCustom: function (event) {
    wx.showTabBar();
    wx.navigateTo({
      url: '../course/course?courseType=2',
    })
    this.bindCloseMark();
  },

  catchEdit: function (event) {

  },

  catchDelete: function (event) {
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

  changeCalendarShow: function (event) {
    wx.setStorageSync('calendarShow', !this.data.calendarShow);
    this.setData({
      calendarShow: !this.data.calendarShow,
    });
  },

  /**
   * 侧滑删除：手指触摸动作开始 记录起点X坐标
   */
  touchStart: function (e) {
    //开始触摸时 重置所有删除
    var taskList = this.data.taskList;
    taskList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      taskList: taskList
    })
  },

  /**
   * 侧滑删除：滑动事件处理
   */
  touchMove: function (e) {
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
    taskList.forEach(function (v, i) {
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
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  catchUnwind: function (event) {
    if (this.data.operateMark == true) {
      // 关闭遮罩层，打开菜单栏
      wx.showTabBar();
    } else if (this.data.operateMark == false) {
      // 打开遮罩层，关闭菜单栏
      wx.hideTabBar();
    }
    this.setData({
      operateMark: !this.data.operateMark,
    });
  },

  /**
   * 在空列表基础上拼接任务
   */
  getCourseTasksList: function (taskList, courseList) {
    var _this = this;
    for (let i = 0; i < taskList.length; i++) {
      for (let j = 0; j < courseList.length; j++) {
        // 寻找相同年、月的数据
        if (moment(taskList[i]['taskDate']).format('YYYY-MM') == courseList[j]['date'] || moment(taskList[i]['taskDate']).format('YYYY-MM') == moment(courseList[j]['weekList'][6]['date']).format('YYYY-MM')) {
          for (let k = 0; k < courseList[j]['weekList'].length; k++) {
            // 寻找相同日的数据
            if (taskList[i]['taskDate'] == courseList[j]['weekList'][k]['date']) {
              // 寻找到相同日，将该日表格重写
              // 取出返回数据中taskList的值
              var tempTaskList = taskList[i]['taskList'];
              // 临时存放某天数据列表的数组
              var tempDayList = [];
              // 从开始时间统计到结束时间，默认步长1小时
              for (let p = _this.data.startTime; p <= _this.data.endTime; p++) {
                var hasTask = -1; // 是否有任务
                var tempTime = []; // 临时存放每个时段数据的数组
                // 遍历Post返回数据的任务列表
                // var dayDate = moment(tempCourseList[i][j]).format('YYYY-MM-DD');
                var dayTime = p < 10 ? '0' + p : p; // 当前小时
                for (let q = 0; q < tempTaskList.length; q++) {
                  // 判断是否有整点（00分）开始任务
                  if (tempTaskList[q]['beginTimeStr'] == (dayTime + ':00')) {
                    // 有整点开始任务
                    // 是否有任务，有任务为任务的下标，无任务在为-1； 
                    hasTask = q;
                    // 组建当前时间段数组
                    tempTime = {
                      'date': taskList[i]['taskDate'] + '-' + dayTime + '-00', // 日期
                      'hasTask': true, // 有任务
                      'taskDuration': tempTaskList[q]['step'], // 任务时长
                      'taskId': tempTaskList[q]['taskId'], // 任务ID
                      'titleColor': tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                      'taskType': tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                      'title': tempTaskList[q]['title'], // 任务名称、标题
                      'height': 104 * tempTaskList[q]['step'] + 10 * (tempTaskList[q]['step'] - 1), // 任务列方块高度
                      'paddingBottom': '10', // 任务列方块距底部间距
                      'isTouchMove': false,  // 是否左侧滑动
                      'beginTimeStr': tempTaskList[q]['beginTimeStr'],  // 开始时间
                      'endTimeStr': tempTaskList[q]['endTimeStr'],  // 结束时间
                      'avatar': '',  // 头像
                      'studentId': tempTaskList[q]['studentId'], // 学员ID
                      'taskStatus': tempTaskList[q]['taskStatus'], // 任务ID
                      'studentName': tempTaskList[q]['title'].substr(-2), // 学员姓名，截取最后2为字符
                      'surplusCourse': '08', // 剩余课时数
                      'courseContent': '蛙泳蹬腿划手练习' // 本节课内容
                    }
                    // 将时间块写入到日列表中
                    tempDayList.push(tempTime);
                    // 根据任务时长调整日列表中方块数量
                    p = p + tempTaskList[q]['step'] - 1;
                    break;
                  } else if (tempTaskList[q]['beginTimeStr'] == (dayTime + ':30')) {
                    // 有半点（30分）开始任务
                    // 判断是否需要半个空任务（空白格）
                    hasTask = q; // 是否有任务，有任务为任务的下标，无任务在为-1；
                    var hasEndTime = -1; // 是否有相同的结束时间冲突状态，默认没有；
                    // 遍历当日任务数组，判断是否有某个结束时间与开始时间相同；
                    for (let m = 0; m < tempTaskList.length; m++) {
                      // 寻找当前时间的半点（30分）是否与某个任务的结束时间相同
                      if (tempTaskList[m]['endTimeStr'] == (dayTime + ':30')) {
                        hasEndTime = m;
                      }
                    }
                    // 判断遍历结果，hasEndTime为-1则未找到，为其它值则找到
                    if (hasEndTime == -1) {
                      // 未找到则输出空任务方块（空白格），找到则不输出
                      tempDayList.push({
                        'date': taskList[i]['taskDate'] + '-' + dayTime + '-30', // 日期
                        'taskDuration': '0.5', // 任务时长
                        'hasTask': false,
                        'height': '52',
                        'paddingBottom': '0',
                        'marginTop': '0',
                        'isTouchMove': false,
                      });
                      // 输出正常的任务块
                      tempTime = {
                        'date': taskList[i]['taskDate'] + '-' + dayTime + '-30', // 日期
                        'hasTask': true, // 有任务
                        'taskDuration': tempTaskList[q]['step'], // 任务时长
                        'taskId': tempTaskList[q]['taskId'], // 任务ID
                        'titleColor': tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                        'taskType': tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                        'title': tempTaskList[q]['title'], // 任务标题、名称
                        'height': (104 * tempTaskList[q]['step']) + (10 * (tempTaskList[q]['step'])), // 任务列方块高度                   
                        'marginTop': '0',
                        'paddingBottom': '0', // 任务列方块距底部间距
                        'isTouchMove': false,
                        'beginTimeStr': tempTaskList[q]['beginTimeStr'],  // 开始时间
                        'endTimeStr': tempTaskList[q]['endTimeStr'],  // 结束时间
                        'avatar': '',  // 头像
                        'studentId': tempTaskList[q]['studentId'], // 学员ID
                        'taskStatus': tempTaskList[q]['taskStatus'], // 任务ID
                        'studentName': tempTaskList[q]['title'].substr(-2), // 学员姓名，截取最后2为字符
                        'surplusCourse': '08', // 剩余课时数
                        'courseContent': '蛙泳蹬腿划手练习' // 本节课内容
                      }
                    }
                    // 判断是否有相邻两个且颜色相同的任务块，若有则有1像素的分隔线，若无则正常显示
                    if (hasEndTime != -1 && tempTaskList[hasEndTime]['titleColor'] == tempTaskList[q]['titleColor']) {
                      var tempTimeHeight = (103 * tempTaskList[q]['step']) + (10 * (tempTaskList[q]['step'])); // 任务列方块高度
                      var tempMarginTop = 1 * tempTaskList[q]['step'];
                    } else {
                      var tempTimeHeight = (104 * tempTaskList[q]['step']) + (10 * (tempTaskList[q]['step'])); // 任务列方块高度
                      var tempMarginTop = '0';
                    }
                    // 将时间块写入到日列表中
                    tempDayList.push({
                      'date': taskList[i]['taskDate'] + '-' + dayTime + '-30', // 日期
                      'hasTask': true, // 有任务
                      'taskDuration': tempTaskList[q]['step'], // 任务时长
                      'taskId': tempTaskList[q]['taskId'], // 任务ID
                      'titleColor': tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                      'taskType': tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                      'title': tempTaskList[q]['title'], // 任务标题、名称
                      'height': tempTimeHeight, // 任务列方块高度                         
                      'marginTop': tempMarginTop,
                      'paddingBottom': '0', // 任务列方块距底部间距
                      'isTouchMove': false,
                      'beginTimeStr': tempTaskList[q]['beginTimeStr'],  // 开始时间
                      'endTimeStr': tempTaskList[q]['endTimeStr'],  // 结束时间
                      'avatar': '',  // 头像
                      'studentId': tempTaskList[q]['studentId'], // 学员ID
                      'taskStatus': tempTaskList[q]['taskStatus'], // 任务ID
                      'studentName': tempTaskList[q]['title'].substr(-2), // 学员姓名，截取最后2为字符
                      'surplusCourse': '08', // 剩余课时数
                      'courseContent': '蛙泳蹬腿划手练习' // 本节课内容
                    });
                    // 根据任务时长调整日列表中方块数量
                    p = p + tempTaskList[q]['step'] - 1;
                    break;
                  } else if (tempTaskList[q]['endTimeStr'] == (p + ':30')) {
                    // 有某个半点（30分）结束时间与开始时间相同
                    var hasBeginTime = -1; // 是否有相同的开始时间冲突状态，默认没有；
                    // 遍历当日任务数组，判断是否有某个开始时间与之相同；
                    for (let m = 0; m < tempTaskList.length; m++) {
                      // 寻找当前时间的半点（30分）是否与某个任务的开始时间相同
                      if (tempTaskList[m]['beginTimeStr'] == (p + ':30')) {
                        hasBeginTime = m;
                      }
                    }
                    // 判断遍历结果，hasBeginTime为-1则未找到，为其它值则找到
                    if (hasBeginTime == -1) {
                      tempDayList.push({
                        'date': taskList[i]['taskDate'] + '-' + dayTime + '-30', // 日期
                        'taskDuration': '0.5', // 任务时长
                        'hasTask': false,
                        'height': '52',
                        'paddingBottom': '10',
                        'marginTop': '0',
                        'isTouchMove': false,
                      });
                    }
                    // 是否有任务，有任务为任务的下标，无任务在为-1；
                    hasTask = q;
                  }
                }
                // 未匹配到任务
                if (hasTask == -1) {
                  // 无任务，输出默认方块
                  // 拼接数据
                  tempDayList.push({
                    'date': taskList[i]['taskDate'] + '-' + dayTime + '-00', // 日期
                    'hasTask': false,
                    'taskDuration': 1, // 任务时长
                    'height': '104', // 列表高度
                    'paddingBottom': '10', // 距底部距离
                    'marginTop': '0',
                  });
                }
              }
              courseList[j]['weekList'][k]['tableList'] = tempDayList;
              courseList[j]['weekList'][k]['hasTask'] = true;
            }
          }
        }
      }
    }
    return courseList;
  },

  /**
   * 生成空的表格列表
   */
  getCourseTableList: function (dataList, type) {
    var tableList = [];
    // 初始化moment设置
    moment.locale('zh-cn', {
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    });
    // 组建对象数组
    for (let i = 0; i < dataList.length; i++) {
      var weekList = []; // 周列表
      var currentWeek = false; // 是否为当前周
      // 优化日期数组
      for (let j = 0; j < dataList[i].length; j++) {
        var currentDay = false; // 是否为当前天

        // 写入默认空白列表数据
        var taskList = []; // 日任务数据列表
        for (let k = this.data.startTime; k <= this.data.endTime; k++) {
          var taskDate = moment(dataList[i][j]).format('YYYY-MM-DD');
          var taskTime = k < 10 ? '0' + k : k;
          // 拼接数据
          taskList.push({
            'date': taskDate + '-' + taskTime + '-00', // 日期
            'hasTask': false, // 是否有任务
            'taskDuration': 1, // 任务时长
            'height': '104', // 列表高度
            'paddingBottom': '10', // 距底部距离
            'marginTop': '0',
            'isTouchMove': false,
          });
        }

        // 判断是否是当日
        if (dataList[i][j] == moment().format('YYYY-MM-DD')) {
          currentDay = true; // 是当日
          var currentShowWeek = i; // 当前周值下标位置
          var currentShowDay = j; // 当前日下标位置
          var currentShowMonth = moment(dataList[i][0]).format('M月'); // 当前月值
          var currentShowYear = moment(dataList[i][0]).format('YYYY年'); // 当前年份值
        } else {
          currentDay = false; // 不是当日
        }

        // 写入日数据到周列表中
        weekList.push({
          'isCurrent': currentDay, // 是否当日
          'day': moment(dataList[i][j]).date(), // 所属日
          'month': moment(dataList[i][j]).month() + 1, // 所属月
          'year': moment(dataList[i][j]).year(), // 所属年
          'date': moment(dataList[i][j]).format('YYYY-MM-DD'),
          'dateWeek': moment(dataList[i][j]).format('MM月DD日 ddd'),
          'tableList': taskList, // 日列表
          'hasTask': false,
        });
      }

      // 写入列表视图数据
      tableList.push({
        'currentWeek': currentWeek, // 是否当前周
        'year': moment(dataList[i][0]).year(), // 所属年
        'month': moment(dataList[i][0]).month() + 1, // 所属月
        'date': moment(dataList[i][0]).format('YYYY-MM'),
        'weekList': weekList, // 周列表
      });
    }

    if (type == 'onload') {
      var retrunData = {
        currentWeek: currentShowWeek,
        currentDay: currentShowDay,
        currentMonth: currentShowMonth,
        currentYear: currentShowYear,
        courseList: tableList,
      }
      return retrunData;
    } else {
      return tableList;
    }
  },

  /**
   * 日历视图，缩略日历滚动到左边
   * 需要往右加载数据
   */
  courseScrollToupper: function (event) {
    console.log('滚动到顶部/左边时触发');
    console.log(event);

  },

  /**
   * 日历视图，缩略日历滚动到右边
   * 需要往右加载数据
   */
  courseScrollTolower: function (event) {
    var _this = this;
    // 获取现有列表
    var courseList = this.data.courseList;
    var tempCoursePostList = [];
    // 获取当前显示周及需要加载周的长度
    const afterWeek = this.data.aftherWeek;
    var newAfterWeek = afterWeek;

    var dataList = [];
    newAfterWeek = newAfterWeek + this.data.weekSetpLength;
    // 获取当前周及后n周日期列表
    for (let i = afterWeek + 1; i <= newAfterWeek; i++) {
      var weekAfterArray = [];
      for (let j = 1; j <= 7; j++) {
        weekAfterArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
      }
      dataList.push(weekAfterArray);
    }

    // 组建对象数组
    var tableList = this.getCourseTableList(dataList);

    // 获取时间戳
    let timestamp = moment().valueOf();
    // 向服务器请求任务数据
    $.get(
      'task/range', {
        coachid: wx.getStorageSync('coachid'), // 用户id
        beginDate: tableList[0]['weekList'][0]['date'], //  开始时间
        endDate: tableList[tableList.length - 1]['weekList'][tableList[tableList.length - 1]['weekList'].length - 1]['date'], // 结束时间
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp, //时间戳
      },
      function (res) {
        if (res.data.code == 0) {
          // 更新数据
          var newCourseList = courseList.concat(_this.getCourseTasksList(res.data.data.taskList, tableList));
          _this.setData({
            courseList: newCourseList,
            // currentYear: newCourseList[event.detail.current].year + '年',
            // currentMonth: newCourseList[event.detail.current].month + '月',
          });
        } else {
          // 服务器数据获取失败，返回空表格
          wx.showToast({
            title: '课程信息加载失败',
            icon: 'none'
          })
          // 判断数据加载方向
          var newCourseList = courseList.concat(tableList);
          // 更新数据
          _this.setData({
            courseList: newCourseList,
            // currentYear: newCourseList[event.detail.current].year + '年',
            // currentMonth: newCourseList[event.detail.current].month + '月',
          });
        }
      }
    )

    // 关闭所有弹窗
    _this.setData({
      showMenuButton: false,
      showTableButton: false,
      calendarScrollIndex: 'calendarScroll' + event.detail.current,
      beforeWeek: newBeforeWeek,
      aftherWeek: newAfterWeek,
    });
  },

  /**
   * 切换缩略日历日期
   */
  changeCalendarDate: function(event) {
    console.log(event)
    var weekIndex = event.currentTarget.dataset.week;
    var dayIndex = event.currentTarget.dataset.day;
    this.setData({
      'currentCalendarWeekIndex': weekIndex,
      'currentCalendarDayIndex': dayIndex,
    });
  },

  /**
   * 缩略日历滑动时触发
   */
  // shrinkCalendarScroll: function(event) {
  //   console.log(event);
  //   var i = this.data.testi;
  //   console.log(375 * i + 30);
  //   if (event.detail.scrollLeft > (375 * i + 50)) {
  //     this.setData({
  //       calendarScrollIndex: 'calendarScroll'+ (i+1),
  //       testi : i+1
  //     });
  //     wx.vibrateShort();
  //   }
  // }
});