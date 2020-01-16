// pages/students/source/source.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceList: [],
    selectSourceName: '', // 已选中来源名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.selectSourceName) {
      this.setData({
        'selectSourceName': options.selectSourceName,
      });
    }
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
      'listStudentSource', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'pageNumber ': 1, // 第几页
        'pageSize ': 100, // 每页多少条
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var sourceList = res.data.data.content;
          if (_this.data.selectSourceName) {
            for (let i = 0; i < sourceList.length; i++) {
              if (sourceList[i]['name'] == _this.data.selectSourceName) {
                sourceList[i]['selected'] = true;
              } else {
                sourceList[i]['selected'] = false;
              }
            }
          }
          _this.setData({
            sourceList: sourceList,
          });
        } else {
          wx.showToast({
            title: '来源获取失败',
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

  //手指触摸动作开始 记录起点X坐标
  touchStart: function(e) {
    //开始触摸时 重置所有删除
    var sourceList = this.data.sourceList;
    sourceList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      sourceList: sourceList
    })
  },
  //滑动事件处理
  touchMove: function(e) {
    var sourceList = this.data.sourceList;
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
    sourceList.forEach(function(v, i) {
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
      sourceList: sourceList
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

  /**
   * 删除
   */
  catchDelete: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.delete(
      'studentSource', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'sourceId': event.currentTarget.dataset.sourceid, // 学员来源ID
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
          _this.onShow();
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      }
    )
  },


  // 自定义来源
  customSource: function(event) {
    wx.navigateTo({
      url: '../../common/custom/custom?customType=1',
    })
  },

  // 选择
  selectSource: function(event) {
    var index = event.currentTarget.dataset.index;
    var sourceList = this.data.sourceList;
    if (index == this.data.sourceIndex) {
      return;
    }

    for (let i = 0; i < sourceList.length; i++) {
      if (i == index) {
        sourceList[i]['selected'] = true;
      } else {
        sourceList[i]['selected'] = false;
      }
    }

    // 向前一页赋值
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一页
    prevPage.setData({
      // remindType: index
      sourceName: sourceList[index]['name'],
      sourceId: sourceList[index]['sourceId'],
    });

    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  }
})