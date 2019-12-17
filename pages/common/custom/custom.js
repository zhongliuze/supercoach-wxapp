// pages/common/custom/custom.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const md5 = require('../../../vendor/md5/md5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customValue: '',
    customType: 0,
    inputName: '自定义名称'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.customType == 1) {
      // 自定义学员来源
      wx.setNavigationBarTitle({
        title: '自定义学员来源',
      })
      this.setData({
        customType: options.customType,
        inputName: '来源名称'
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
   * 输入自定义名称
   */
  customInput: function(event) {
    this.setData({
      customValue: event.detail.value,
    });
  },

  /**
   * 保存自定义名称
   */
  saveCustom: function(event) {
    if (this.data.customType == 1) {
      // 自定义学员来源
      if (this.data.customValue) {
        this.saveStudentSource();
      } else {
        wx.showToast({
          title: '请输入来源名称',
          icon: 'none',
        })
      }
    }
  },

  /**
   * 保存自定义学员来源
   */
  saveStudentSource: function() {
    var _this = this;
    let timestamp = moment().valueOf();
    $.post(
      'studentSource', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'sourceName': this.data.customValue, // 来源名称
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 保存成功
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                  delta: '1'
                })
              }, 1500);
            }
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      }
    )
  },
})