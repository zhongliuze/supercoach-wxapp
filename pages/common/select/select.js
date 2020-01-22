// pages/common/select/select.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [],
    selectName: '', // 已选中来源名称
    selectContentType: 1, // 0:学员来源，1:课程名称，2：课程类型
    requestComplete: false, // 加载完毕
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.selectName) {
      this.setData({
        'selectName': options.selectName,
      });
    }
    var selectContentType = options.selectContentType;
    if (selectContentType == 0) {
      // 选择学员来源
      wx.setNavigationBarTitle({
        title: '选择学员来源',
      })
    } else if (selectContentType == 1) {
      // 选择课程名称
      wx.setNavigationBarTitle({
        title: '选择课程名称',
      })
    } else if (selectContentType == 2) {
      // 选择课程类型
      wx.setNavigationBarTitle({
        title: '选择课程类型',
      })
    }
    this.setData({
      'selectContentType': selectContentType,
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
    var _this = this;
    let timestamp = moment().valueOf();
    if(this.data.selectContentType == 0) {
      // 选择学员来源
      var requestURL = 'listStudentSource';
    } else if (this.data.selectContentType == 1) {
      // 选择课程名称
      var requestURL = 'listCourseName';
    } else if (this.data.selectContentType == 2) {
      // 选择课程类型
      var requestURL = 'listCourseType';
    }
    $.get(
      requestURL, {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'pageNumber ': 1, // 第几页
        'pageSize ': 100, // 每页多少条
      },
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var selectList = res.data.data.content;
          if (requestURL == 'listStudentSource') {
            for (let i = 0; i < selectList.length; i++) {
              if (selectList[i]['name'] == _this.data.selectName && _this.data.selectName) {
                selectList[i]['selected'] = true;
              } else {
                selectList[i]['selected'] = false;
              }
              selectList[i]['id'] = selectList[i]['sourceId'];
            }
          } else if (requestURL == 'listCourseName') {
            for (let i = 0; i < selectList.length; i++) {
              if (selectList[i]['courseName'] == _this.data.selectName && _this.data.selectName) {
                selectList[i]['selected'] = true;
              } else {
                selectList[i]['selected'] = false;
              }
              selectList[i]['id'] = selectList[i]['courseNameId'];
              selectList[i]['name'] = selectList[i]['courseName'];
            }
          } else if (requestURL == 'listCourseType') {
            for (let i = 0; i < selectList.length; i++) {
              if (selectList[i]['typeName'] == _this.data.selectName && _this.data.selectName) {
                selectList[i]['selected'] = true;
              } else {
                selectList[i]['selected'] = false;
              }
              selectList[i]['id'] = selectList[i]['typeId'];
              selectList[i]['name'] = selectList[i]['typeName'];
            }
          }
          _this.setData({
            'selectList': selectList,
            'requestComplete': true,
          });
        } else {
          wx.showToast({
            title: '加载失败',
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
    var selectList = this.data.selectList;
    selectList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      selectList: selectList
    })
  },
  //滑动事件处理
  touchMove: function (e) {
    var selectList = this.data.selectList;
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
    selectList.forEach(function (v, i) {
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
      selectList: selectList
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

  /**
   * 删除
   */
  catchDelete: function (event) {
    var _this = this;
    let timestamp = moment().valueOf();
    var requestData = {
      'coachid': wx.getStorageSync('coachid'),
      'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
      'timestamp': timestamp, // 时间戳
    };
    if (this.data.selectContentType == 0) {
      // 选择学员来源
      var requestURL = 'studentSource';
      requestData['sourceId'] = event.currentTarget.dataset.id;
    } else if (this.data.selectContentType == 1) {
      // 选择课程名称
      var requestURL = 'courseName';
      requestData['courseNameId'] = event.currentTarget.dataset.id;
    } else if (this.data.selectContentType == 2) {
      // 选择课程类型
      var requestURL = 'courseType';
      requestData['typeId'] = event.currentTarget.dataset.id;
    }

    $.delete(
      requestURL, requestData,
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            success: function() {
              setTimeout(function(){
                _this.onShow();
              },1500);
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
  },


  // 自定义来源
  customSelect: function (event) {
    wx.navigateTo({
      url: '../../common/custom/custom?customType=' + this.data.selectContentType,
    })
  },

  // 选择
  bindSelect: function (event) {
    var index = event.currentTarget.dataset.index;
    var selectList = this.data.selectList;
    if (index == this.data.selectIndex) {
      return;
    }

    for (let i = 0; i < selectList.length; i++) {
      if (i == index) {
        selectList[i]['selected'] = true;
      } else {
        selectList[i]['selected'] = false;
      }
    }

    // 向前一页赋值
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一页
    if (this.data.selectContentType == 0) {
      // 选择学员来源
      var prevData = {
        'selectName': selectList[index]['name'],
        'selectId': selectList[index]['id'],
      };
    } else if (this.data.selectContentType == 1) {
      // 选择课程名称
      var prevData = {
        'courseName': selectList[index]['name'],
        'courseNameId': selectList[index]['id'],
      };
    } else if (this.data.selectContentType == 2) {
      // 选择课程类型
      var prevData = {
        'courseType': selectList[index]['name'],
        'courseTypeId': selectList[index]['id'],
      };
    }
    prevPage.setData(prevData);

    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  }
})