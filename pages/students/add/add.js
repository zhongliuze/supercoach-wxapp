// pages/students/add/add.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const md5 = require('../../../vendor/md5/md5.min.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMore: false,
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    name: '', // 输入姓名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fixedBottomButtonMargin: wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
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
   * 展开填写更多信息
   */
  inputMoreInfo: function(event) {
    console.log(event);
    this.setData({
      inputMore: true,
    });
  },

  /**
   * 输入姓名
   */
  inputName: function(event) {
    this.setData({
      'name': event.detail.value,
    });
  },

  /**
   * 新增学员
   */
  addStudent: function (event) {
    console.log(event);
    var _this = this;
    let timestamp = moment().valueOf();
    if (!event.detail.value.name) {
      wx.showToast({
        title: '请输入学员姓名',
        icon: 'none',
      })
      return ;
    }
    if (event.detail.value.mobile && event.detail.value.mobile.length < 11) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
      })
      return;
    }
    // $.post(
    //   'coachStudent', {
    //     'coachid': wx.getStorageSync('coachid'),
    //     'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
    //     'timestamp': timestamp, // 时间戳
    //     'name': '溜小狗', // 学员姓名
    //     'mobile': '', // 学员手机号
    //     'courseTypeId': '', // 课程类型
    //     'courseNumber': '', // 总课时数
    //     'sourceId': '', // 学员来源ID
    //     'remark': '', // 备注信息
    //   },
    //   function (res) {
    //     console.log(res.data);
    //     if (res.data.code == 0) {
    //       // 获取成功
    //       wx.showToast({
    //         title: '创建成功',
    //         icon: 'success',
    //         success: function () {
    //           setTimeout(function () {
    //             wx.navigateBack({
    //               delta: '1'
    //             })
    //           }, 1500);
    //         }

    //       })
    //     } else {
    //       wx.showToast({
    //         title: '创建失败',
    //         icon: 'none'
    //       })
    //     }
    //   }
    // )
  }
})