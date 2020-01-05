// pages/course/students/students.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectStudentName: '', // 选中学员姓名
    selectStudentId: 0, // 选中学员ID
    selectStudentNamestr: '', // 选中学员头像名称
    customIndex: 0,
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    custom_index: -1,
    student_index: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.selectStudentId != -1) {
      this.setData({
        selectStudentId: options.selectStudentId,
      });
    }
    this.setData({
      fixedBottomButtonMargin: wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    let timestamp = moment().valueOf();

    $.get(
      'coachStudentList', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          _this.bulidStudenList(res.data.data.coachStudentList);
        } else {
          wx.showToast({
            title: '学员获取失败',
            icon: 'none'
          })
        }
      }
    )
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
   * 打开添加学员页面
   */
  navigateToAdd: function() {
    wx.navigateTo({
      url: '../../students/add/add',
    })
  },

  /**
   * 处理服务器返回学员列表
   */
  bulidStudenList: function(getStudentList) {
    // 特别关注列表
    var starStudentList = [];
    // 普通列表
    var customStudentList = {};

    for (var i = 0; i < 26; i++) {
      var key = String.fromCharCode(65 + i);
      customStudentList[key] = [];
    }

    for (var i = 0; i < getStudentList.length; i++) {
      var tempStudentList = getStudentList[i];
      tempStudentList['nameStr'] = tempStudentList['name'].substring(tempStudentList['name'].length - 2);
      if (tempStudentList['follow']) {
        // 是特别关注学员
        starStudentList.push(tempStudentList);
      } else {
        // 普通学员
        if (tempStudentList['namePinYinHeadChar'][0]) {
          // 存在拼音缩写字符串
          // 判断是否有所属大写字母列
          if (!customStudentList[tempStudentList['namePinYinHeadChar'][0].toUpperCase()]) {
            // 没有，先创建列
            customStudentList[tempStudentList['namePinYinHeadChar'][0].toUpperCase()] = [];
          }
          // 写入数据
          customStudentList[tempStudentList['namePinYinHeadChar'][0].toUpperCase()].push(tempStudentList);
        } else {
          // 不存在
          // 判断是否有#列
          if (!customStudentList['#']) {
            // 没有，先创建列
            customStudentList['#'] = [];
          }
          // 写入数据
          customStudentList['#'].push(tempStudentList);
        }
      }
    }

    customStudentList['star'] = starStudentList;
    
    console.log(customStudentList);

    // selectStudentId
    var selectStudentName = '';
    var selectStudentNamestr = '';
    for (let key in customStudentList) {
      for (var i = 0; i < customStudentList[key].length; i++) {
        if (customStudentList[key][i]['id'] == this.data.selectStudentId) {
          customStudentList[key][i]['checked'] = true;
          selectStudentName = customStudentList[key][i]['name'];
          selectStudentNamestr = customStudentList[key][i]['nameStr'];
        }
      }
    }

    this.setData({
      totalStudents: getStudentList.length,
      customStudentList: customStudentList,
      selectStudentName: selectStudentName,
    });
  },

  /**
   * 选中学员
   */
  selectRadio: function(event) {
    var custom_index = event.currentTarget.dataset.custom_index;
    var student_index = event.currentTarget.dataset.student_index;
    var customStudentList = this.data.customStudentList;

    for (let key in customStudentList) {
      for (var i = 0; i < customStudentList[key].length; i++) {
        customStudentList[key][i]['checked'] = false;
      }
    }

    customStudentList[custom_index][student_index]['checked'] = true;
    this.setData({
      customStudentList: customStudentList,
      selectStudentName: customStudentList[custom_index][student_index]['name'],
      selectStudentNamestr: customStudentList[custom_index][student_index]['nameStr'],
      selectStudentId: customStudentList[custom_index][student_index]['id'],
    });
  },

  /**
   * 确认选中
   */
  confirmSelect: function(event) {
    // 向前一页赋值
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一页

    prevPage.setData({
      selectStudentId: this.data.selectStudentId,
      selectStudentNamestr: this.data.selectStudentNamestr,
    });

    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  },
})