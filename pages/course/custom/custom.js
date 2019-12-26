// pages/course/custom/custom.js
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const moment = require('../../../vendor/moment/moment.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customArray: [
      { color: '#444756', name: '会议', selected: false, canDelete: false, isTouchMove: false },
      { color: '#EA6E7F', name: '团建', selected: false, canDelete: false, isTouchMove: false },
      { color: '#E89CA4', name: '团体课', selected: false, canDelete: false, isTouchMove: false },
      { color: '#306BF5', name: '学习培训', selected: false, canDelete: false, isTouchMove: false },
      { color: '#5392E8', name: '他店帮扶', selected: false, canDelete: false, isTouchMove: false },
      { color: '#F1A044', name: '大姨妈', selected: false, canDelete: true, isTouchMove: false },
      { color: '#F4BA40', name: '看病', selected: false, canDelete: true, isTouchMove: false },
      { color: '#5392E8', name: '家中有事', selected: false, canDelete: true, isTouchMove: false },
      { color: '#F1A044', name: '其它', selected: false, canDelete: true, isTouchMove: false },
    ],
    customIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    let timestamp = moment().valueOf();

    $.get(
      'commonTaskTitleList', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          _this.setData({
            customArray: res.data.data.commonTaskTitleList,
          });
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }
      }
    )
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

  //手指触摸动作开始 记录起点X坐标
  touchStart: function (e) {
    //开始触摸时 重置所有删除
    var customArray = this.data.customArray;
    customArray.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      customArray: customArray
    })
  },
  //滑动事件处理
  touchMove: function (e) {
    var customArray = this.data.customArray;
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
    customArray.forEach(function (v, i) {
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
      customArray: customArray
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

  catchDelete: function (event) {
    console.log(event);
    var title_id = event.currentTarget.dataset.title_id;
    var _this = this;
    wx.showModal({
      title: '确认要删除吗？',
      content: '删除后可手动输入重新添加',
      cancelText: '删除',
      cancelColor: '#000000',
      confirmText: '取消',
      confirmColor: '#5FCD64',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

        } else if (res.cancel) {
          console.log('用户点击取消')

          let timestamp = moment().valueOf();
          $.delete(
            'commonTaskTitle', {
              'coachid': wx.getStorageSync('coachid'),
              'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
              'timestamp': timestamp, // 时间戳
              'titleId': title_id, // 教练与学员关系ID
            },
            function (res) {
              console.log(res.data);
              if (res.data.code == 0) {
                // 获取成功
                wx.showToast({
                  title: '已删除',
                  icon: 'success',
                  complete: function () {
                    setTimeout(function () {
                      _this.onShow();
                    }, 1500);
                  }
                })
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            }
          )

        }
      }
    })
  },

  // 选中某事项
  chooseCustom: function (event) {
    var index = event.currentTarget.dataset.index;
    // 向前一页赋值
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一页
    var scrollIntoView = '';
    var colorArray = prevPage.data.colorArray;

    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i]['color'] == this.data.customArray[index]['color']) {
        colorArray[i]['selected'] = true;
        scrollIntoView = 'color' + i;
      } else {
        colorArray[i]['selected'] = false;
      }
    }

    prevPage.setData({
      customTitle: this.data.customArray[index]['name'],
      colorArray: colorArray,
      scrollIntoView: scrollIntoView,
    });

    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  }
})