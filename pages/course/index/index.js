// pages/course/index/index.js
import $ from '../../../common/common.js';
const util = require('../../../utils/util');
const moment = require('../../../vendor/moment/moment.js');
const md5 = require('../../../vendor/md5/md5.min.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    /**
     * 导航栏相关配置
     */
    startX: 0,
    startY: 0,
    navigation_color: '',
    navigation_background: 'white',

    movableMessageX: '612', // 可移动的通知框初始X轴坐标
    movableMessageY: '1029', // 可移动的通知框初始Y轴坐标

    viewType: 0, // 0为表格视图，1为列表视图
    menuButtonPopup: false, // 左上角菜单弹窗是/否显示

    /**
     * 表格视图相关
     */
    tableStartTime: 8, // 表格视图：每日开始时间
    tableEndTime: 22, // 表格视图：每日结束时间

    timeList: [], // 表格视图：时间字典列表
    courseList: [], // 任务及表格列表
    emptyCourseList: [], // 任务及表格列表,空列表

    tableLoadBefore: 6, // 表格视图：加载当前日期前x周
    tableLoadAfter: 6, // 表格视图：加载当前日期后x周
    tableLoadLength: 6, // 表格视图：每次加载周的长度
    tablePrestrainLength: 2, // 表格视图：当前/后剩余x周时自动加载新的表格

    currentTableWeekIndex: 0, // 表格视图：当前周所在位置
    currentTableScrollIndex: 0, // 表格视图：表格滑动位置
    tableScrollIndex: '', // 表格视图：表格当前滑动位置

    clickTableWeekIndex: 0, // 表格视图：选中周位置
    clickTableDayIndex: 0, // 表格视图：选中日位置
    clickTableHourIndex: 0, // 表格视图：选中小时位置

    tableButtonPopup: false, // 表格视图：表格弹窗按钮是/否显示
    tableButtonPopupType: 0, // 按钮类型，0位空白格弹窗，1为已选中弹窗
    tableButtonPopupStyle: '', // 表格视图：表格弹窗按钮样式
    tableButtonPopupArrowStyle: '', // 表格视图：表格弹窗按钮方向标志样式
    tableButtonPopupDirection: 'left', // 表格视图：表格弹窗按钮方向

    tableScrollYear: '2019年', // 表格视图：当前滑动位置所处年份
    tableScrollMonth: '10月', // 表格视图：当前滑动位置所处月份

    fullScreenPopup: false, // 表格视图：全屏弹窗
    tableSwiperEasing: 'default', // 表格视图：滑动动画模式：linear（线性）、default（默认）
    timeLinePosition: -1, // 表格视图：时间线位置


    /**
     * 日历视图相关
     */
    calendarList: [], // 日历视图：日历列表
    emptyCalendarList: [], // 日历视图，空列表

    calendarView: true, // 日历视图：false为日历隐藏，true为日历展开

    calendarLoadBefore: 2, // 日历视图:加载当前日期前x月
    calendarLoadAfter: 2, // 日历视图:加载当前日期后x-beforeCalendar月
    calendarLoadLength: 2, // 日历视图加载每次加载x月

    calendarScrollIndex: 0, // 日历视图：展开日历当前滑动位置
    reduceCalendarScrollIndex: 0, // 日历视图：缩略日历当前滑动位置

    selectReduceCalendarWeekIndex: 0, // 日历视图：缩略日历选中日期周下标
    selectReduceCalendarDayIndex: 0, // 日历视图：缩略日历选中日期日下标

    selectCalendarMonthIndex: 0, // 日历视图：完整日历视图中当前选中日期月下标
    selectCalendarWeekIndex: 0, // 日历视图：完整日历视图中当前选中日期周下标
    selectCalendarDayIndex: 0, // 日历视图：完整日历视图中当前选中日期日下标

    calendarSwiperEasing: 'default', // 日历视图：滑动动画模式：linear（线性）、default（默认）
    coachLogin: false, // 是否登录

    /**
     * 通用变量
     */

    loadMaxBefore: 12, // 允许最多加载前x周
    loadMaxAfter: 12, // 允许最多加载后x周
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化设置
    this.initSettings();

    // 表格视图：生成时间列表
    var timeList = this.initTimeList(this.data.tableStartTime, this.data.tableEndTime);
    // 表格视图：构建表格日期
    var tableDateList = this.buildTableDateList(0, this.data.tableLoadLength + 1);


    // 表格视图：生成表格视图（无数据）
    var courseListData = this.generateTableList(tableDateList, 'init');
    // 日历视图：生成日历视图（无数据）
    var calendarListData = this.generateCalendarList(0 - this.data.calendarLoadBefore, this.data.calendarLoadAfter);

    // 更新数据
    this.setData({
      'timeList': timeList, // 表格视图：时间列表
      'tableDateList': tableDateList,
      'courseList': courseListData.courseList, // 表格视图：表格列表（无数据）
      'currentTableWeekIndex': courseListData.currentTableWeekIndex,
      'currentTableScrollIndex': courseListData.currentTableWeekIndex,
      'tableScrollIndex': 'tableScrollIndex' + courseListData.currentTableWeekIndex,
      'reduceCalendarScrollIndex': courseListData.currentTableWeekIndex,
      'tableScrollMonth': courseListData.tableScrollMonth,
      'tableScrollYear': courseListData.tableScrollYear,
      'selectReduceCalendarWeekIndex': courseListData.currentTableWeekIndex, // 日历视图中当前选中日历下标
      'selectReduceCalendarDayIndex': courseListData.currentDay, // 日历视图中当前选中日历下标
      'calendarList': calendarListData.calendarList, // 日历视图中日历列表，
      'calendarScrollIndex': calendarListData.calendarScrollIndex,
      'selectCalendarMonthIndex': calendarListData.selectCalendarMonthIndex, // 完整日历视图中当前选中日期月下标
      'selectCalendarWeekIndex': calendarListData.selectCalendarWeekIndex, // 完整日历视图中当前选中日期周下标
      'selectCalendarDayIndex': calendarListData.selectCalendarDayIndex, // 完整日历视图中当前选中日期日下标
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
    var _this = this;
    console.log('向前加载了' + this.data.tableLoadBefore + '周');
    console.log('向后加载了' + this.data.tableLoadAfter + '周');
    console.log(this.data.tableDateList);
    // 表格视图：生成表格视图（无数据）
    var courseListData = this.generateTableList(this.data.tableDateList, 'init');

    // 日历视图：生成日历视图（无数据）
    var calendarListData = this.generateCalendarList(0 - this.data.calendarLoadBefore, this.data.calendarLoadAfter);

    if (!app.globalData.checkLogin) {
      app.checkLoginReadyCallback = () => {
        // 回调等待login登录成功后执行
        if (wx.getStorageSync('coachLogin')) {
          // 表格视图：获取任务数据并填充至表格视图中
          _this.requestCourseTasks(courseListData.courseList);
          // 日历视图：获取任务所在日期并填充至日历列表中
          _this.requestCalendarTasks(calendarListData.calendarList);
          _this.setData({
            'coachLogin': true,
          });
        } else {
          _this.setData({
            'courseList': courseListData.courseList, // 表格视图：表格列表（无数据）
            'calendarList': calendarListData.calendarList, // 日历视图中日历列表，
            'coachLogin': false,
          });
        }
      };
    } else {
      if (wx.getStorageSync('coachLogin')) {
        // 表格视图：获取任务数据并填充至表格视图中
        _this.requestCourseTasks(courseListData.courseList);
        // 日历视图：获取任务所在日期并填充至日历列表中
        _this.requestCalendarTasks(calendarListData.calendarList);
        _this.setData({
          'coachLogin': true,
        });
      } else {
        _this.setData({
          'courseList': courseListData.courseList, // 表格视图：表格列表（无数据）
          'calendarList': calendarListData.calendarList, // 日历视图中日历列表，
          'coachLogin': false,
        });
      }
    }
    //判断onLaunch中login是否执行完毕


    // 更新数据
    _this.setData({
      'timeLinePosition': _this.realTimeLine(), // 更新时间线位置
      'timeList': _this.realTimeList(), // 更新当前时间展示颜色
      'movableMessageY': 1029 + (_this.data.statusBarHeight - 20), // 设置可移动预约消息框初始Y轴坐标
    });
    console.log(_this.data.courseList[_this.data.selectReduceCalendarWeekIndex]['weekList'][_this.data.selectReduceCalendarDayIndex]);
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

  /**
   * 表格视图：滑动加载表格数据
   */
  loadTableData: function(event) {
    // 获取现有表格、日历列表
    var courseList = this.data.courseList;
    var calendarList = this.data.calendarList;

    // 判断是否需要加载数据
    if ((event.detail.current > (courseList.length - this.data.tablePrestrainLength - 1) && this.data.tableLoadAfter < this.data.loadMaxAfter) || (event.detail.current < this.data.tablePrestrainLength && this.data.tableLoadBefore < this.data.loadMaxBefore)) {
      // 需要加载数据
      // 判断是向前还是向后加载周数据
      if (event.detail.current > (courseList.length - this.data.tablePrestrainLength - 1) && this.data.tableLoadAfter < this.data.loadMaxAfter) {
        // 需要向后加载数据
        var loadType = 'loadRight';
        var newTableLoadAfter = this.data.tableLoadAfter + this.data.tableLoadLength;
        // 表格视图：构建表格日期
        var tableDateList = this.buildTableDateList(this.data.tableLoadAfter + 1, newTableLoadAfter + 1, 'loadRight');

        // 判断是否需要向后加载日历列表
        var tableMonth = moment(tableDateList[tableDateList.length - 1][6]).format('YYYY-MM');
        var calendarMonth = moment(calendarList[calendarList.length - 1]['year'] + '-' + moment(calendarList[calendarList.length - 1]['month'])).format('YYYY-MM');
        if (!moment(tableMonth).isBefore(calendarMonth) && !moment(tableMonth).isSame(calendarMonth)) {
          // 需往后加载的总长度
          var loadCalendarLength = moment(tableMonth).diff(moment().format('YYYY-MM'), 'month') - this.data.calendarLoadAfter + 1;
          // 日历视图：生成日历视图（无数据）
          var tempCalendarList = this.generateCalendarList(this.data.calendarLoadAfter, this.data.calendarLoadAfter + loadCalendarLength, 'loadRight');
          // 更新数据
          this.setData({
            'tableDateList': this.data.tableDateList.concat(tableDateList),
            'calendarList': calendarList.concat(tempCalendarList),
            'calendarLoadAfter': this.data.calendarLoadAfter + loadCalendarLength,
          });
          // 日历视图：获取任务所在日期并填充至日历列表中
          this.requestCalendarTasks(tempCalendarList, calendarList, 0, 'loadRight');
        }
      } else if (event.detail.current < this.data.tablePrestrainLength && this.data.tableLoadBefore < this.data.loadMaxBefore) {
        // 需要向前加载数据
        var loadType = 'loadLeft';
        var newTableLoadBefore = this.data.tableLoadBefore + this.data.tableLoadLength;

        // 表格视图：构建表格日期
        var tableDateList = this.buildTableDateList(this.data.tableLoadBefore, newTableLoadBefore, 'loadLeft');

        // 判断是否需要向前加载日历列表
        var tableMonth = moment(tableDateList[0][0]).format('YYYY-MM');
        var calendarMonth = moment(calendarList[0]['year'] + '-' + moment(calendarList[0]['month'])).format('YYYY-MM');
        if (!moment(tableMonth).isAfter(calendarMonth) && !moment(tableMonth).isSame(calendarMonth)) {
          // 需要向前加载日历列表数据
          var calendarLoadBefore = this.data.calendarLoadBefore; // 当前已加载长度
          var loadCalendarLength = moment(moment().format('YYYY-MM')).diff(tableMonth, 'month') - this.data.calendarLoadBefore; // 还需往后加载的长度

          // 日历视图：生成日历视图（无数据）
          var tempCalendarList = this.generateCalendarList(calendarLoadBefore + 1, calendarLoadBefore + loadCalendarLength + 1, 'loadLeft');
          // 更新数据
          this.setData({
            'tableDateList': tableDateList.concat(this.data.tableDateList),
            'calendarList': tempCalendarList.concat(calendarList),
            'calendarLoadBefore': calendarLoadBefore + loadCalendarLength,
          });
          // 日历视图：获取任务所在日期并填充至日历列表中
          this.requestCalendarTasks(tempCalendarList, calendarList, 0, 'loadLeft');
        }
      }

      // 表格视图：生成表格视图（无数据）
      var tableList = this.generateTableList(tableDateList);
      // 表格视图：获取任务数据并填充至表格视图中
      this.requestCourseTasks(tableList, courseList, event.detail.current, loadType);

      // 判断加载方向，赋值更新数据
      if (loadType == 'loadLeft') {
        if (this.data.viewType == 0) {
          this.setData({
            'currentTableScrollIndex': event.detail.current + this.data.tableLoadLength, // 当前显示的周
          });
        } else {
          this.setData({
            'reduceCalendarScrollIndex': event.detail.current + this.data.tableLoadLength, // 当前显示的周
          });
        }
        console.log('向前加载了' + newTableLoadBefore + '周');
        this.setData({
          'tableScrollIndex': 'tableScrollIndex' + (event.detail.current), // 滚动到某个视图
          'tableLoadBefore': newTableLoadBefore, // 距当前周的前距离
          'currentTableWeekIndex': this.data.currentTableWeekIndex + this.data.tableLoadLength, // 当前时间所在周所在位置下标
          'selectReduceCalendarWeekIndex': this.data.selectReduceCalendarWeekIndex + this.data.tableLoadLength,
        });

      } else {
        console.log('向后加载了' + newTableLoadAfter + '周');
        this.setData({
          'tableScrollIndex': 'tableScrollIndex' + (event.detail.current),
          'tableLoadAfter': newTableLoadAfter,
        });
      }
    } else {
      // 无需预加载，直接滚到下一页
      this.setData({
        'tableScrollIndex': 'tableScrollIndex' + (event.detail.current),
        'tableScrollYear': courseList[event.detail.current].year + '年',
        'tableScrollMonth': courseList[event.detail.current].month + '月',
      });
      if (this.data.viewType == 0) {
        this.setData({
          'currentTableScrollIndex': event.detail.current, // 当前显示的周
        });
      } else {
        this.setData({
          'reduceCalendarScrollIndex': event.detail.current, // 当前显示的周
        });
      }
      console.log(event.detail.current);
      console.log(courseList.length);
      if (event.detail.current == courseList.length - 1) {
        wx.showToast({
          title: '最多加载后' + this.data.loadMaxAfter / 4 + '月数据',
          icon: 'none',
        })
      } else if (event.detail.current == 0) {
        wx.showToast({
          title: '最多加载前' + this.data.loadMaxBefore / 4 + '月数据',
          icon: 'none',
        })
      }
    }
    // 关闭所有弹窗
    this.setData({
      'menuButtonPopup': false,
      'tableButtonPopup': false,
    });
    // 设备短震动
    wx.vibrateShort();
  },

  /**
   * 日历视图：滑动加载日历数据 
   */
  loadCalendarData: function(event) {
    // 获取现有表格、日历列表
    var courseList = this.data.courseList;
    var calendarList = this.data.calendarList;
    console.log(event.detail.current);
    console.log(this.data.calendarLoadAfter);
    // 判断是否需要加载日历列表
    if (event.detail.current > this.data.calendarList.length - 2 && this.data.calendarLoadAfter < this.data.loadMaxAfter / 4) {
      // 向右加载列表数据
      // 日历视图：生成日历视图（无数据）
      var newCalendarList = this.generateCalendarList(this.data.calendarLoadAfter, this.data.calendarLoadAfter + this.data.calendarLoadLength, 'loadRight');

      // 判断是否需要同步加载表格列表数据
      var tableLastDay = courseList[courseList.length - 1]['weekList'][6]['date'];
      var calendarLastDay = newCalendarList[newCalendarList.length - 1]['monthList'][5]['weekList'][6]['date'];
      if (!moment(calendarLastDay).isBefore(tableLastDay) && !moment(calendarLastDay).isSame(tableLastDay)) {
        // 需要向后加载表格日期数据
        var newTableLoadAfter = moment(calendarLastDay).diff(moment().format('YYYY-MM-DD'), 'week');
        // 表格视图：构建表格日期
        var tableDateList = this.buildTableDateList(this.data.tableLoadAfter + 1, newTableLoadAfter + 1, 'loadRight');
        // 表格视图：生成表格视图（无数据）
        var tableList = this.generateTableList(tableDateList);
        // 表格视图：获取任务数据并填充至表格视图中
        this.requestCourseTasks(tableList, courseList, 0, 'loadRight');
      }

      // 更新数据
      this.setData({
        'calendarLoadAfter': this.data.calendarLoadAfter + this.data.calendarLoadLength,
        'calendarList': calendarList.concat(newCalendarList),
        'calendarScrollIndex': event.detail.current,
        'tableLoadAfter': newTableLoadAfter,
      });
      // 日历视图：获取任务所在日期并填充至日历列表中
      this.requestCalendarTasks(newCalendarList, calendarList, event.detail.current, 'loadRight');

    } else if (event.detail.current < 1 && this.data.calendarLoadBefore < this.data.loadMaxBefore / 4) {
      // 向前加载数据
      // 日历视图：生成日历视图（无数据）
      var newCalendarList = this.generateCalendarList(this.data.calendarLoadBefore + 1, this.data.calendarLoadBefore + this.data.calendarLoadLength + 1, 'loadLeft');

      // 判断是否需要同步向前加载表格列表数据
      var tableFirstDay = courseList[0]['weekList'][0]['date'];
      var calendarFirstDay = newCalendarList[0]['monthList'][0]['weekList'][0]['date'];
      if (!moment(calendarLastDay).isAfter(tableFirstDay) && !moment(calendarFirstDay).isSame(tableFirstDay)) {
        // 需要向后加载表格日期数据
        // 计算需要加载的总数
        var newTableLoadBefore = moment(moment().format('YYYY-MM-DD')).diff(calendarFirstDay, 'week');
        // 表格视图：构建表格日期
        var tableDateList = this.buildTableDateList(this.data.tableLoadBefore, newTableLoadBefore, 'loadLeft');
        // 表格视图：生成表格视图（无数据）
        var tableList = this.generateTableList(tableDateList);
        // 表格视图：获取任务数据并填充至表格视图中
        this.requestCourseTasks(tableList, courseList, 0, 'loadLeft');
      }

      // 后台获取日历中日期任务（点）状态
      this.setData({
        'calendarLoadBefore': this.data.calendarLoadBefore + this.data.calendarLoadLength,
        'selectCalendarMonthIndex': this.data.selectCalendarMonthIndex + this.data.calendarLoadLength,
        'calendarList': newCalendarList.concat(calendarList),
        'calendarScrollIndex': event.detail.current + this.data.calendarLoadLength, // 当前显示的周
        'tableLoadBefore': newTableLoadBefore,
      });
      // 日历视图：获取任务所在日期并填充至日历列表中
      this.requestCalendarTasks(newCalendarList, calendarList, event.detail.current, 'loadLeft');

    } else {
      // 无需加载数据
      if (event.detail.current == calendarList.length - 1) {
        wx.showToast({
          title: '最多加载后' + this.data.loadMaxAfter / 4 + '月数据',
          icon: 'none',
        })
      } else if (event.detail.current == 0) {
        wx.showToast({
          title: '最多加载前' + this.data.loadMaxBefore / 4 + '月数据',
          icon: 'none',
        })
      }
      this.setData({
        'calendarScrollIndex': event.detail.current, // 当前显示的周
        'calendarList': calendarList,
      });
    }

    // 关闭所有弹窗
    this.setData({
      'menuButtonPopup': false,
      'tableButtonPopup': false,
    });
    // 设备短震动
    wx.vibrateShort();
  },

  /**
   * 表格视图：点击空白区域关闭弹窗
   */
  bindCloseMark: function(event) {
    var clickTableWeekIndex = this.data.clickTableWeekIndex; // 表格弹窗选中周下标
    var clickTableDayIndex = this.data.clickTableDayIndex; // 表格弹窗选中周下标
    var clickTableHourIndex = this.data.clickTableHourIndex; // 表格弹窗选中周下标
    var courseList = this.data.courseList;
    // 选中位置颜色改成默认
    if (courseList[clickTableWeekIndex]['weekList'][clickTableDayIndex]['tableList'][clickTableHourIndex]['hasTask'] == false) {
      courseList[clickTableWeekIndex]['weekList'][clickTableDayIndex]['tableList'][clickTableHourIndex]['titleColor'] = '';
    }

    this.setData({
      'menuButtonPopup': false,
      'tableButtonPopup': false,
      'fullScreenPopup': false,
      'courseList': courseList,
    });
  },

  /**
   * 开启/关闭左上角菜单
   */
  catchMenuButton: function(event) {
    this.setData({
      'menuButtonPopup': !this.data.menuButtonPopup,
    });
    wx.vibrateShort();
  },

  /**
   * 表格视图：点击弹窗自身，阻止冒泡关闭弹窗
   */
  catchMenuButtonBubbling: function(event) {},

  /**
   * 切换表格/日历视图
   */
  catchChangeView: function(event) {
    wx.setStorageSync('viewType', this.data.viewType == 0 ? 1 : 0);
    this.setData({
      viewType: this.data.viewType == 0 ? 1 : 0,
      'menuButtonPopup': false,
    });
  },

  /**
   * 表格视图：生成课表图片
   */
  catchGenerateImages: function(enent) {
    console.log('生成课表图片');
    wx.showToast({
      title: '您未获得该功能的体验资格哦~',
      icon: 'none',
    })
    this.setData({
      'menuButtonPopup': false,
    });
  },

  /**
   * 打开预约消息列表
   */
  catchNavigateOrder: function(event) {
    wx.showToast({
      title: '该功能暂未开放',
      icon: 'none',
    })
    this.setData({
      'menuButtonPopup': false,
    });
    // wx.navigateTo({
    //   url: '../../order/index/index',
    // })
  },

  /**
   * 返回本周所在位置
   */
  catchCurrentTableChange: function(event) {
    console.log('本周位置：' + this.data.currentTableWeekIndex);
    this.setData({
      'currentTableScrollIndex': this.data.currentTableWeekIndex,
      'reduceCalendarScrollIndex': this.data.currentTableWeekIndex,
      'menuButtonPopup': false,
    });
  },

  /**
   * 表格视图：选中表格按钮弹窗
   */
  tableButtonPopup: function(event) {
    var courseList = this.data.courseList; // 任务列表
    console.log(this.data.tableButtonPopup);

    // 判断是否打开，已打开则直接关闭，未打开则计算下面内容
    if (this.data.tableButtonPopup == true) {
      var clickTableWeekIndex = this.data.clickTableWeekIndex; // 表格弹窗选中周下标
      var clickTableDayIndex = this.data.clickTableDayIndex; // 表格弹窗选中周下标
      var clickTableHourIndex = this.data.clickTableHourIndex; // 表格弹窗选中周下标
      // 选中位置颜色改成默认
      if (courseList[clickTableWeekIndex]['weekList'][clickTableDayIndex]['tableList'][clickTableHourIndex]['hasTask'] == false) {
        courseList[clickTableWeekIndex]['weekList'][clickTableDayIndex]['tableList'][clickTableHourIndex]['titleColor'] = '';
      }

      this.setData({
        'tableButtonPopup': false,
        'courseList': courseList,
      });
    } else {
      var courseIndex = event.currentTarget.dataset.courseindex; // 选中周下标位置
      var weekIndex = event.currentTarget.dataset.weekindex; // 选中天下标位置
      var tableIndex = event.currentTarget.dataset.tableindex; // 选中时间位置

      var tableButtonPopupStyle = ''; // 弹窗样式
      var tableButtonPopupArrowStyle = ''; // 弹窗三角标样式
      var tableButtonTop = 20; // 初始化默认加上距顶部的边距

      // 计算弹窗x轴边距
      // 判断弹窗显示位置
      if (weekIndex < 4) {
        // 弹窗显示在左侧
        var tableButtonLeft = (weekIndex + 1) * 90 + 5;
        tableButtonPopupStyle += 'left:' + tableButtonLeft + 'rpx;';
        var tableButtonPopupDirection = 'right';
        // 弹窗三角标左边距
        tableButtonPopupArrowStyle += 'left: -15rpx;'
      } else {
        // 弹窗显示在右侧
        var tableButtonLeft = weekIndex * 80 + (weekIndex + 1) * 10 - 266 + 4;
        tableButtonPopupStyle += 'left:' + tableButtonLeft + 'rpx;';
        var tableButtonPopupDirection = 'left';
        // 弹窗三角标右边距
        tableButtonPopupArrowStyle += 'right: -15rpx;'
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
        var tableButtonPopupType = 1; // 弹窗类型
        tableButtonPopupStyle += 'height: 284rpx;';
      } else if (courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == false) {
        // 无任务
        var tableButtonMarkHeight = 402; // 弹窗高度
        var tableButtonPopupType = 0; // 弹窗类型
        tableButtonPopupStyle += 'height: 402rpx;';
      }

      // 累计高度减去自身高度的一半
      tableButtonTop -= ((tableButtonMarkHeight - parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height'])) / 2 +
        parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) +
        parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['paddingBottom']));

      // 上下边距判断，保证显示在安全位置
      if (tableButtonTop < 0) {
        // 弹窗位置已超过上边距
        tableButtonTop = 20;
        tableButtonPopupStyle += 'top:20rpx;';
        if (tableButtonPopupType == 0) {
          // 无任务区域
          if (tableIndex == 0) {
            tableButtonPopupArrowStyle += 'top: 40rpx;'; // 弹窗三角标位置
          } else if (tableIndex == 1) {
            tableButtonPopupArrowStyle += 'top: 154rpx;'; // 弹窗三角标位置
          }
        } else {
          // 有任务区域
          var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
          tableButtonPopupArrowStyle += 'top:' + tableButtonArrowBottom + 'rpx'; // 弹窗三角标位置
        }

      } else if ((tableButtonTop + tableButtonMarkHeight) > ((this.data.tableEndTime - this.data.tableStartTime + 1) * 114 + 20)) {
        // 弹窗位置已超过上边距，判断方法：计算弹窗按钮区域顶部坐标像素+弹窗按钮区域高度 是否大于 表格区域的总高度
        tableButtonPopupStyle += 'bottom:9rpx;';
        if (tableButtonPopupType == 0) {
          // 无任务区域
          if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 1)) {
            tableButtonPopupArrowStyle += 'bottom: 40rpx;';
          } else if (tableIndex == (courseList[courseIndex]['weekList'][weekIndex]['tableList'].length - 2)) {
            tableButtonPopupArrowStyle += 'bottom: 154rpx;';
          }
        } else {
          // 有任务区域，（弹窗高度-表格区域高度） + 表格区域高度 / 2 + 12
          var tableButtonArrowBottom = (parseInt(courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['height']) / 2 - 12);
          tableButtonPopupArrowStyle += 'bottom:' + tableButtonArrowBottom + 'rpx';
        }
      } else {
        // 位置正常
        tableButtonPopupStyle += 'top:' + tableButtonTop + 'rpx;'; // 上边距
        // 判断弹窗类型，确定三角标位置
        if (tableButtonPopupType == 0) {
          // 无任务
          tableButtonPopupArrowStyle += 'top:189rpx'; // 三角标位置
        } else {
          // 有任务
          tableButtonPopupArrowStyle += 'top:130rpx'; // 三角标位置
        }
      }

      // 选择位置颜色区分

      if (tableButtonPopupType == 0 && courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['hasTask'] == false) {
        courseList[courseIndex]['weekList'][weekIndex]['tableList'][tableIndex]['titleColor'] = '#B2F3B5';
      }


      // 赋值更新数据
      this.setData({
        'tableButtonPopup': !this.data.tableButtonPopup, // 显示/隐藏弹窗
        'tableButtonPopupStyle': tableButtonPopupStyle, // 表格弹窗样式
        'tableButtonPopupDirection': tableButtonPopupDirection, // 弹窗方向
        'tableButtonPopupArrowStyle': tableButtonPopupArrowStyle, // 弹窗箭头指示方向
        'tableButtonPopupType': tableButtonPopupType, // 弹窗类型
        'courseList': courseList,
        'clickTableWeekIndex': courseIndex,
        'clickTableDayIndex': weekIndex,
        'clickTableHourIndex': tableIndex,
      });


    }
  },

  /**
   * 表格视图：点击弹窗中排课、休息、自定义按钮
   */
  clickTableCourse: function(event) {
    wx.showTabBar();
    console.log('coachLogin:' + this.data.coachLogin);
    if (this.data.coachLogin) {
      if (event.currentTarget.dataset.type == 0) {
        // 表格视图进来
        var selectDate = this.data.courseList[this.data.clickTableWeekIndex]['weekList'][this.data.clickTableDayIndex]['tableList'][this.data.clickTableHourIndex]['date'];
      } else if (event.currentTarget.dataset.type == 1) {
        // 日历视图进来
        var selectDate = moment().format('YYYY-MM-DD-HH-00');
      }
      wx.navigateTo({
        url: '../course/course?courseType=' + event.currentTarget.dataset.index + '&selectDate=' + selectDate,
      })
    } else {
      wx.showModal({
        title: '陛下，您还未登录',
        content: '请先登录/注册再进行此操作',
        confirmText: '立即登录',
        cancelText: '朕再看看',
        confirmColor: '#5FCD64',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    this.bindCloseMark();
  },

  /**
   * 表格视图：点击弹窗中编辑按钮
   */
  clickTableEdit: function(event) {
    // 类型：课程？休息？自定义
    if (event.currentTarget.dataset.type == 0) {
      // 表格列表进入
      var clickCourseInfo = this.data.courseList[this.data.clickTableWeekIndex]['weekList'][this.data.clickTableDayIndex]['tableList'][this.data.clickTableHourIndex];
      var courseType = clickCourseInfo['taskType'];
      var courseId = clickCourseInfo['taskId'];
    } else if (event.currentTarget.dataset.type == 1) {
      // 日历列表进入
      var courseType = event.currentTarget.dataset.course_type;
      var courseId = event.currentTarget.dataset.course_id;
    }
    wx.navigateTo({
      url: '../course/course?courseType=' + courseType + '&editCourse=1' + '&courseId=' + courseId,
    })
    this.bindCloseMark();
  },

  /**
   * 表格视图：点击弹窗中删除按钮
   */
  clickTableDelete: function(event) {
    var _this = this;
    // 关闭编辑弹窗
    if (this.data.tableButtonPopup == true) {
      // 编辑弹窗
      var clickTableWeekIndex = this.data.clickTableWeekIndex; // 表格弹窗选中周下标
      var clickTableDayIndex = this.data.clickTableDayIndex; // 表格弹窗选中周下标
      var clickTableHourIndex = this.data.clickTableHourIndex; // 表格弹窗选中周下标
      var task_id = this.data.courseList[clickTableWeekIndex]['weekList'][clickTableDayIndex]['tableList'][clickTableHourIndex]['taskId'];
      this.setData({
        tableButtonPopup: false,
      });
    } else {
      var task_id = event.currentTarget.dataset.task_id;
    }

    wx.showModal({
      title: '确认要取消课程吗？',
      content: '取消后用户将收到课程取消通知',
      cancelText: '确认取消',
      cancelColor: '#000000',
      confirmText: '我再想想',
      confirmColor: '#5FCD64',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          let timestamp = moment().valueOf();
          $.delete(
            'task/task', {
              'coachid': wx.getStorageSync('coachid'),
              'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
              'timestamp': timestamp, //时间戳
              'taskId': task_id,
            },
            function(res) {
              console.log(res.data);
              if (res.data.code == 0) {
                // 获取成功
                wx.showToast({
                  title: '已取消课程',
                  icon: 'success',
                  success: function() {
                    _this.onShow();
                  }
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                  icon: 'none'
                })
              }
            }
          )
        }
      }
    })
  },

  /**
   * 日历视图：点击切换缩略日历和完整日历展示
   */
  switchCalendarView: function(event) {
    // 将日历展开、收起状态写入缓存中
    wx.setStorageSync('calendarView', !this.data.calendarView);
    if (this.data.calendarView == false) {
      // 判断当前选中日所属哪个月
      var selectDate = this.data.courseList[this.data.selectReduceCalendarWeekIndex]['weekList'][this.data.selectReduceCalendarDayIndex]['date'];
      var scrollDate = this.data.courseList[this.data.reduceCalendarScrollIndex]['date'];
      // 设置日历展开后自动滚动到选中月
      var selectMonth = moment(scrollDate).month() + 1;
      // 获取表格日历
      var calendarList = this.data.calendarList;
      // 当前完整日历滑动下标
      var calendarScrollIndex = 0;
      // 是否找到标记
      var calendarFindFlag = false;
      for (let i = 0; i < calendarList.length; i++) {
        if (calendarFindFlag) {
          break;
        }
        for (let j = 0; j < calendarList[i]['monthList'].length; j++) {
          if (calendarFindFlag) {
            break;
          }
          for (let k = 0; k < calendarList[i]['monthList'][j]['weekList'].length; k++) {
            if (calendarList[i]['monthList'][j]['weekList'][k]['date'] == selectDate) {
              var selectCalendarMonthIndex = i;
              var selectCalendarWeekIndex = j;
              var selectCalendarDayIndex = k;
              calendarScrollIndex = i;
              // 如果是当月的，就不要继续往后找了，如果不是当月的，需要继续向后找到属于当月的列表
              if (calendarList[i]['monthList'][j]['weekList'][k]['month'] == calendarList[i]['month']) {
                calendarFindFlag = true;
              }
              break;
            }
          }
        }
      }
      // 如果当前滑块中有选中的日期，则展示到选中日期所在月，如果没有选中的，则展示到当前互动的月份
      if (this.data.selectReduceCalendarWeekIndex != this.data.calendarScrollIndex) {
        for (let i = 0; i < calendarList.length; i++) {
          if (calendarList[i]['month'] == selectMonth) {
            var calendarScrollIndex = i; // 完整日历滑动下标
            break;
          }
        }
      }
      // 在完整日历中选中缩略日历中选中的日期
    }

    // 更新页面
    this.setData({
      'calendarView': !this.data.calendarView,
      'calendarScrollIndex': calendarScrollIndex,
      'selectCalendarMonthIndex': selectCalendarMonthIndex,
      'selectCalendarWeekIndex': selectCalendarWeekIndex,
      'selectCalendarDayIndex': selectCalendarDayIndex,
    });
  },

  /**
   * 侧滑删除：手指触摸动作开始 记录起点X坐标
   */
  touchStart: function(event) {
    //开始触摸时 重置所有删除
    var courseList = this.data.courseList;

    var selectReduceCalendarWeekIndex = this.data.selectReduceCalendarWeekIndex;
    var selectReduceCalendarDayIndex = this.data.selectReduceCalendarDayIndex;

    for (let i = 0; i < courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'].length; i++) {
      if (courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'][i]['isTouchMove']) {
        courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'][i]['isTouchMove'] = false;
      }
    }

    this.setData({
      startX: event.changedTouches[0].clientX,
      startY: event.changedTouches[0].clientY,
      courseList: courseList,
    });

    // var taskList = this.data.taskList;
    // taskList.forEach(function(v, i) {
    //   if (v.isTouchMove) //只操作为true的
    //     v.isTouchMove = false;
    // })
    // this.setData({
    //   startX: e.changedTouches[0].clientX,
    //   startY: e.changedTouches[0].clientY,
    //   taskList: taskList
    // })
  },

  /**
   * 侧滑删除：滑动事件处理
   */
  touchMove: function(event) {

    var courseList = this.data.courseList;
    var taskIndex = event.currentTarget.dataset.index; //当前索引
    var startX = this.data.startX; //开始X坐标
    var startY = this.data.startY; //开始Y坐标
    var touchMoveX = event.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = event.changedTouches[0].clientY; //滑动变化坐标

    //获取滑动角度
    var angle = this.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });


    var courseList = this.data.courseList;

    var selectReduceCalendarWeekIndex = this.data.selectReduceCalendarWeekIndex;
    var selectReduceCalendarDayIndex = this.data.selectReduceCalendarDayIndex;

    for (let i = 0; i < courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'].length; i++) {
      courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'][i]['isTouchMove'] = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) {
        return;
      }
      if (i == taskIndex) {
        if (touchMoveX > startX) {
          courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'][i]['isTouchMove'] = false;
        } else {
          courseList[selectReduceCalendarWeekIndex]['weekList'][selectReduceCalendarDayIndex]['tableList'][i]['isTouchMove'] = true;
        }
      }
    }

    this.setData({
      courseList: courseList
    })

    // var taskList = this.data.taskList;
    // var that = this,
    //   index = e.currentTarget.dataset.index, //当前索引
    //   startX = that.data.startX, //开始X坐标
    //   startY = that.data.startY, //开始Y坐标
    //   touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    //   touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //   //获取滑动角度
    //   angle = that.angle({
    //     X: startX,
    //     Y: startY
    //   }, {
    //     X: touchMoveX,
    //     Y: touchMoveY
    //   });
    // taskList.forEach(function(v, i) {
    //   v.isTouchMove = false
    //   //滑动超过30度角 return
    //   if (Math.abs(angle) > 30) return;
    //   if (i == index) {
    //     if (touchMoveX > startX) //右滑
    //       v.isTouchMove = false
    //     else //左滑
    //       v.isTouchMove = true
    //   }
    // })
    // //更新数据
    // that.setData({
    //   taskList: taskList
    // })
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
    if (this.data.fullScreenPopup == true) {
      // 关闭遮罩层，打开菜单栏
      wx.showTabBar();
    } else if (this.data.fullScreenPopup == false) {
      // 打开遮罩层，关闭菜单栏
      wx.hideTabBar();
    }
    this.setData({
      'fullScreenPopup': !this.data.fullScreenPopup,
    });
  },

  /**
   * 表格视图：将任务数据赋值到表格列表中
   */
  composeCourseTasks: function(taskList, courseList) {
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
              for (let p = _this.data.tableStartTime; p <= _this.data.tableEndTime; p++) {
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
                      'isTouchMove': false, // 是否左侧滑动
                      'beginTimeStr': tempTaskList[q]['beginTimeStr'], // 开始时间
                      'endTimeStr': tempTaskList[q]['endTimeStr'], // 结束时间
                      'avatar': '', // 头像
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
                        'beginTimeStr': tempTaskList[q]['beginTimeStr'], // 开始时间
                        'endTimeStr': tempTaskList[q]['endTimeStr'], // 结束时间
                        'avatar': '', // 头像
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
                      'beginTimeStr': tempTaskList[q]['beginTimeStr'], // 开始时间
                      'endTimeStr': tempTaskList[q]['endTimeStr'], // 结束时间
                      'avatar': '', // 头像
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
   * 表格视图：生成表格视图列表（无数据）
   */
  generateTableList: function(dateList, loadType) {
    var tableList = [];
    // 初始化moment设置
    moment.locale('zh-cn', {
      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    });
    // 组建对象数组
    for (let i = 0; i < dateList.length; i++) {
      var weekList = []; // 周列表
      var currentTableWeekIndex = false; // 是否为当前周
      // 优化日期数组
      for (let j = 0; j < dateList[i].length; j++) {
        var currentDay = false; // 是否为当前天
        // 写入默认空白列表数据
        var taskList = []; // 日任务数据列表
        for (let k = this.data.tableStartTime; k <= this.data.tableEndTime; k++) {
          var taskDate = moment(dateList[i][j]).format('YYYY-MM-DD');
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
        if (dateList[i][j] == moment().format('YYYY-MM-DD')) {
          currentDay = true; // 是当日
          var currentShowWeek = i; // 当前周值下标位置
          var currentShowDay = j; // 当前日下标位置
          var currentShowMonth = moment(dateList[i][0]).format('M月'); // 当前月值
          var currentShowYear = moment(dateList[i][0]).format('YYYY年'); // 当前年份值
        } else {
          currentDay = false; // 不是当日
        }

        // 写入日数据到周列表中
        weekList.push({
          'isCurrent': currentDay, // 是否当日
          'day': moment(dateList[i][j]).date(), // 所属日
          'month': moment(dateList[i][j]).month() + 1, // 所属月
          'year': moment(dateList[i][j]).year(), // 所属年
          'date': moment(dateList[i][j]).format('YYYY-MM-DD'),
          'dateWeek': moment(dateList[i][j]).format('MM月DD日 ddd'),
          'tableList': taskList, // 日列表
          'hasTask': false,
        });
      }

      // 写入列表视图数据
      tableList.push({
        'currentTableWeekIndex': currentTableWeekIndex, // 是否当前周
        'year': moment(dateList[i][0]).year(), // 所属年
        'month': moment(dateList[i][0]).month() + 1, // 所属月
        'date': moment(dateList[i][0]).format('YYYY-MM'),
        'dateStr': moment(dateList[i][0]).format('YYYY年MM月'),
        'weekList': weekList, // 周列表
      });
    }

    if (loadType == 'init') {
      var retrunData = {
        'currentTableWeekIndex': currentShowWeek,
        'currentDay': currentShowDay,
        'tableScrollMonth': currentShowMonth,
        'tableScrollYear': currentShowYear,
        'courseList': tableList,
      }
      return retrunData;
    } else {
      return tableList;
    }
  },

  /**
   * 日历视图：选中缩略日历中日期
   */
  selectReduceCalendarDate: function(event) {
    var weekIndex = event.currentTarget.dataset.week;
    var dayIndex = event.currentTarget.dataset.day;
    this.setData({
      'selectReduceCalendarWeekIndex': weekIndex,
      'selectReduceCalendarDayIndex': dayIndex,
    });
  },

  /**
   * 日历视图：选中完整日历中日期
   */
  selectCalendarDate: function(event) {
    var monthIndex = event.currentTarget.dataset.month;
    var weekIndex = event.currentTarget.dataset.week;
    var dayIndex = event.currentTarget.dataset.day;
    var selectDate = event.currentTarget.dataset.date;

    var courseList = this.data.courseList;
    for (let i = 0; i < courseList.length; i++) {
      for (let j = 0; j < courseList[i]['weekList'].length; j++) {
        if (courseList[i]['weekList'][j]['date'] == selectDate) {
          var selectReduceCalendarWeekIndex = i;
          var selectReduceCalendarDayIndex = j;
        }
      }
    }
    this.setData({
      'selectCalendarMonthIndex': monthIndex,
      'selectCalendarWeekIndex': weekIndex,
      'selectCalendarDayIndex': dayIndex,
      'selectReduceCalendarWeekIndex': selectReduceCalendarWeekIndex,
      'selectReduceCalendarDayIndex': selectReduceCalendarDayIndex,
      'reduceCalendarScrollIndex': selectReduceCalendarWeekIndex,
    });
  },

  /**
   * 日历视图：生成日历视图列表（无数据）
   */
  generateCalendarList: function(beginCalendar, endCalendar, loadType = 'init') {
    var tempCalendarList = [];
    for (let i = beginCalendar; i < endCalendar; i++) {
      if (loadType == 'loadLeft') {
        var currentDate = moment().subtract(i, 'M').format('YYYY-MM');
      } else {
        var currentDate = moment().add(i, 'M').format('YYYY-MM');
      }
      var monthList = [];
      for (let j = 0; j < 6; j++) {
        var weekList = [];
        for (let k = 0; k < 7; k++) {
          // 判断是否是当日
          var isCurrent = false;
          if (moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
            // 是当日
            isCurrent = true;
            if (loadType == 'loadLeft') {
              var selectCalendarMonthIndex = i; // 完整日历视图中当前选中日期月下标
            } else if (loadType == 'loadRight') {
              var selectCalendarMonthIndex = i + this.data.calendarLoadAfter; // 完整日历视图中当前选中日期月下标
            } else {
              // init
              var selectCalendarMonthIndex = i + this.data.calendarLoadBefore; // 完整日历视图中当前选中日期月下标
            }
            var selectCalendarWeekIndex = j; // 完整日历视图中当前选中日期周下标
            var selectCalendarDayIndex = k; // 完整日历视图中当前选中日期日下标
          }
          weekList.push({
            'day': moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).date(),
            'month': moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).month() + 1,
            'year': moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).year(),
            'date': moment(currentDate).date(1).isoWeekday(j * 7 + k + 1).format('YYYY-MM-DD'),
            'hasTask': false,
            'isCurrent': isCurrent,
          });
        }
        monthList.push({
          'weekList': weekList,
        });
      };

      if (moment(currentDate).month() == moment().month()) {
        var calendarScrollIndex = i + this.data.calendarLoadBefore;
      }

      if (loadType == 'loadLeft') {
        tempCalendarList.unshift({
          'monthList': monthList,
          'month': moment(currentDate).month() + 1,
          'year': moment(currentDate).year(),
          'date': moment(currentDate).format('YYYY年MM月'),
          'selected': false,
        });
      } else {
        tempCalendarList.push({
          'monthList': monthList,
          'month': moment(currentDate).month() + 1,
          'year': moment(currentDate).year(),
          'date': moment(currentDate).format('YYYY年MM月'),
          'selected': false,
        });
      }

    }
    if (loadType == 'init') {
      return {
        'calendarList': tempCalendarList,
        'calendarScrollIndex': calendarScrollIndex,
        'selectCalendarMonthIndex': selectCalendarMonthIndex, // 完整日历视图中当前选中日期月下标
        'selectCalendarWeekIndex': selectCalendarWeekIndex, // 完整日历视图中当前选中日期周下标
        'selectCalendarDayIndex': selectCalendarDayIndex, // 完整日历视图中当前选中日期日下标
      };
    } else {
      return tempCalendarList;
    }
  },

  /**
   * 日历视图：获取任务数据并更新日历显示（点）
   */
  requestCalendarTasks: function(newCalendarList, oldCalendarList, scrollCurrent, setType = 'init') {
    if (setType == 'init') {
      wx.showLoading({
        title: '刷新课表中',
      });
    }
    var _this = this;
    let timestamp = moment().valueOf();
    if (newCalendarList[0]['month'] < 10) {
      var beginDate = newCalendarList[0]['year'] + '-0' + newCalendarList[0]['month'] + '-' + '01';
    } else {
      var beginDate = newCalendarList[0]['year'] + '-' + newCalendarList[0]['month'] + '-' + '01';
    }
    if (newCalendarList[newCalendarList.length - 1]['month'] < 10) {
      var endDate = newCalendarList[newCalendarList.length - 1]['year'] + '-0' + newCalendarList[newCalendarList.length - 1]['month'] + '-' + '01';
    } else {
      var endDate = newCalendarList[newCalendarList.length - 1]['year'] + '-' + newCalendarList[newCalendarList.length - 1]['month'] + '-' + '01';
    }

    $.get(
      'task/monthRange', {
        'coachid': wx.getStorageSync('coachid'),
        'beginDate': moment(beginDate).format('YYYY-MM-DD'),
        'endDate': moment(endDate).format('YYYY-MM-DD'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function(res) {
        if (res.data.code == 0) {
          // 获取成功
          var taskList = res.data.data.taskList;
          for (let m = 0; m < newCalendarList.length; m++) {
            for (let i = 0; i < newCalendarList[m]['monthList'].length; i++) {
              for (let j = 0; j < newCalendarList[m]['monthList'][i]['weekList'].length; j++) {
                for (let k = 0; k < taskList.length; k++) {
                  if (newCalendarList[m]['monthList'][i]['weekList'][j]['date'] == taskList[k]) {
                    newCalendarList[m]['monthList'][i]['weekList'][j]['hasTask'] = true;
                  }
                }
              }
            }
          }
        } else {
          wx.showToast({
            title: '课程信息加载失败',
            icon: 'none'
          })
        }

        if (setType == 'init') {
          // 初始化
          _this.setData({
            'calendarList': newCalendarList,
          });
        } else if (setType == 'loadLeft') {
          // 预加载（loadLeft）
          _this.setData({
            'calendarList': newCalendarList.concat(oldCalendarList),
            'calendarScrollIndex': scrollCurrent + _this.data.calendarLoadLength,
          });
        } else if (setType == 'loadRight') {
          // 预加载（loadRight）
          _this.setData({
            'calendarList': oldCalendarList.concat(newCalendarList),
            'calendarScrollIndex': scrollCurrent,
          });
        }
        if (setType == 'init') {
          wx.hideLoading();
        }
      }
    )
  },


  /**
   * 表格视图：获取任务数据并填充至表格视图中
   */
  requestCourseTasks: function(tableList, courseList = [], scrollCurrent = 0, loadType = 'init') {
    var _this = this;
    let timestamp = moment().valueOf(); // 时间戳
    if (loadType == 'init') {
      wx.showLoading({
        title: '加载中',
      });
    }

    $.get(
      'task/weekRange', {
        coachid: wx.getStorageSync('coachid'), // 用户id
        beginDate: tableList[0]['weekList'][0]['date'], //  开始时间
        endDate: tableList[tableList.length - 1]['weekList'][tableList[tableList.length - 1]['weekList'].length - 1]['date'], // 结束时间
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp, //时间戳
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 判断数据加载方向
          if (loadType == 'loadLeft') {
            // 向前加载
            var newCourseList = _this.composeCourseTasks(res.data.data.taskList, tableList).concat(courseList);
          } else if (loadType == 'loadRight') {
            // 向后加载
            var newCourseList = courseList.concat(_this.composeCourseTasks(res.data.data.taskList, tableList));
          } else if (loadType == 'init') {
            var newCourseList = _this.composeCourseTasks(res.data.data.taskList, tableList);
          }
        } else {
          // 服务器数据获取失败，返回空表格
          wx.showToast({
            title: '课程信息加载失败',
            icon: 'none'
          })
          // 判断数据加载方向
          if (loadType == 'loadLeft') {
            // 向前加载
            var newCourseList = tableList.concat(courseList);
          } else if (loadType == 'loadRight') {
            // 向后加载
            var newCourseList = courseList.concat(tableList);
          } else if (loadType == 'init') {
            var newCourseList = tableList;
          }
        }

        console.log(newCourseList);
        // 更新数据
        if (loadType != 'init') {
          _this.setData({
            'courseList': newCourseList,
            'tableScrollYear': newCourseList[scrollCurrent].year + '年',
            'tableScrollMonth': newCourseList[scrollCurrent].month + '月',
          });
        } else {
          _this.setData({
            'courseList': newCourseList,
          });
        }
        if (loadType == 'init') {
          wx.hideLoading();
        };
      }
    )
  },

  /**
   * 表格视图：构建表格日期列表
   */
  buildTableDateList: function(beginCalendar, endCalendar, loadType = 'init') {
    var dateList = [];
    for (let i = beginCalendar; i < endCalendar; i++) {
      var weekArray = [];
      var weekAfterArray = [];
      var weekBeforeArray = [];
      for (let j = 1; j <= 7; j++) {
        if (loadType == 'loadLeft') {
          weekArray.push(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
        } else if (loadType == 'loadRight') {
          weekArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
        } else {
          weekAfterArray.push(moment().weekday(i * 7 + j).format('YYYY-MM-DD'));
          weekBeforeArray.unshift(moment().weekday(0 - i * 7 - j + 1).format('YYYY-MM-DD'));
        }
      }
      if (loadType == 'loadLeft') {
        dateList.unshift(weekArray.reverse());
      } else if (loadType == 'loadRight') {
        dateList.push(weekArray);
      } else {
        dateList.push(weekAfterArray);
        dateList.unshift(weekBeforeArray)
      }
    }
    return dateList;
  },

  /**
   * 表格视图：更新实时时间列表显示
   */
  realTimeList: function() {
    var timeList = this.data.timeList;
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i]['hour'] == moment().hour()) {
        timeList[i]['isCurrent'] = true;
        break;
      }
    }
    return timeList;
  },

  /**
   * 表格视图：更新实时时间线位置
   */
  realTimeLine: function() {
    if (moment().hour() < (this.data.tableEndTime + 1) && moment().hour() > (this.data.tableStartTime - 1)) {
      // 显示时间线
      var timeLinePosition = 20 + (parseInt(moment().hour()) - this.data.tableStartTime) * 114 + (104 / 60) * moment().minute() - 4;
    } else {
      // 不显示时间线
      var timeLinePosition = -1;
    }
    return timeLinePosition;
  },

  /**
   * 初始化页面设置
   */
  initSettings: function() {
    // 获取缓存中视图类型
    var _this = this;
    if (wx.getStorageSync('viewType')) {
      var viewType = wx.getStorageSync('viewType');
    } else {
      var viewType = 0; // 0为表格视图，1为日历视图
    }

    // 获取日历视图是否展开或收起
    if (wx.getStorageSync('calendarView')) {
      var calendarView = wx.getStorageSync('calendarView');
    } else {
      var calendarView = false;
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

    _this.setData({
      viewType: viewType,
      calendarView: calendarView,
    });
  },

  /**
   * 表格视图：初始化时间段列表
   */
  initTimeList(tableStartTime, tableEndTime) {
    var timeList = [];
    for (tableStartTime; tableStartTime <= tableEndTime; tableStartTime++) {
      if (tableStartTime < 10) {
        timeList.push({
          time: '0' + tableStartTime + ':00',
          hour: tableStartTime,
          isCurrent: false
        });
      } else {
        timeList.push({
          time: tableStartTime + ':00',
          hour: tableStartTime,
          isCurrent: false
        });
      }
    }
    return timeList;
  }
});