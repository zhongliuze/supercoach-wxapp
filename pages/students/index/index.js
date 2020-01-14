const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customIndex: 0,
    starStudentList: [],
    customStudentList: [],
    totalStudents: 0, // 学员总计
    searchKey: '',
    searchStudentList: [],
    coachLogin: false, // 登录态

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    //判断onLaunch中login是否执行完毕
    if (!app.globalData.checkLogin) {
      app.checkLoginReadyCallback = () => {
        // 回调等待login登录成功后执行
        if (wx.getStorageSync('coachLogin')) {
          _this.getCommonSetting();
          _this.requestStudentList();
          _this.setData({
            'coachLogin': true,
          });
        } else {
          _this.setData({
            'coachLogin': false,
          });
        }
      };
    } else {
      if (wx.getStorageSync('coachLogin')) {
        _this.getCommonSetting();
        _this.requestStudentList();
        _this.setData({
          'coachLogin': true,
        });
      } else {
        _this.setData({
          'coachLogin': false,
        });
      }
    }

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
    var starStudentList = this.data.starStudentList;
    starStudentList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      starStudentList: starStudentList
    })
  },
  //滑动事件处理
  touchMove: function(e) {
    var starStudentList = this.data.starStudentList;
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
    starStudentList.forEach(function(v, i) {
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
      starStudentList: starStudentList
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchStartSearch: function(e) {
    //开始触摸时 重置所有删除
    var searchStudentList = this.data.searchStudentList;
    searchStudentList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      searchStudentList: searchStudentList
    })
  },
  //滑动事件处理
  touchMoveSearch: function(e) {
    var searchStudentList = this.data.searchStudentList;
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
    searchStudentList.forEach(function(v, i) {
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
      searchStudentList: searchStudentList
    })
  },


  //手指触摸动作开始 记录起点X坐标
  touchStartStudent: function(e) {
    //开始触摸时 重置所有删除
    var customStudentList = this.data.customStudentList;
    var tempStudentList = customStudentList[e.currentTarget.dataset.custom_index];

    tempStudentList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    customStudentList[e.currentTarget.dataset.custom_index] = tempStudentList;
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      customStudentList: customStudentList
    })
  },

  //滑动事件处理
  touchMoveStudent: function(e) {
    var customStudentList = this.data.customStudentList;
    var tempStudentList = customStudentList[e.currentTarget.dataset.custom_index];

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
    tempStudentList.forEach(function(v, i) {
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
    customStudentList[e.currentTarget.dataset.custom_index] = tempStudentList;
    that.setData({
      customStudentList: customStudentList
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

  catchDelete: function(event) {
    console.log(event);
    var student_id = event.currentTarget.dataset.student_id;
    var _this = this;
    wx.showModal({
      title: '确认要删除吗？',
      content: '该操作将清空学员的所有信息',
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
            'coachStudent', {
              'coachid': wx.getStorageSync('coachid'),
              'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
              'timestamp': timestamp, // 时间戳
              'coachStudentId': student_id, // 教练与学员关系ID
            },
            function(res) {
              console.log(res.data);
              if (res.data.code == 0) {
                // 获取成功
                wx.showToast({
                  title: '已删除',
                  icon: 'success',
                  complete: function() {
                    setTimeout(function() {
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

  /**
   * 进入新增学员页面
   */
  navigateToAdd: function() {
    if (this.data.coachLogin) {
      wx.navigateTo({
        url: '../add/add',
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
  },

  /**
   * 进入学员信息页面
   */
  navigateToBasic: function(event) {
    wx.navigateTo({
      url: '../student/student?student_id=' + event.currentTarget.dataset.student_id + '&displayStudentAlias=' + this.data.generalSettings.displayStudentAlias,
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
      tempStudentList['aliasStr'] = tempStudentList['alias'].substring(tempStudentList['alias'].length - 2);
      tempStudentList['remark'] = tempStudentList['remark'].substring(0, 12) + (tempStudentList['remark'].length > 12 ? '…' : '');
      if (tempStudentList['follow']) {
        // 是特别关注学员
        starStudentList.push(tempStudentList);
      } else {
        // 普通学员
        // 判断是否优先展示备注名
        if (this.data.generalSettings.displayStudentAlias == 1 && tempStudentList['aliasPinYinHeadChar'][0]) {
          // 存在拼音缩写字符串
          // 判断是否有所属大写字母列
          if (!customStudentList[tempStudentList['aliasPinYinHeadChar'][0].toUpperCase()]) {
            // 没有，先创建列
            customStudentList[tempStudentList['aliasPinYinHeadChar'][0].toUpperCase()] = [];
          }
          // 写入数据
          customStudentList[tempStudentList['aliasPinYinHeadChar'][0].toUpperCase()].push(tempStudentList);
        } else if (tempStudentList['namePinYinHeadChar'][0]) {
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

    this.setData({
      starStudentList: starStudentList,
      totalStudents: getStudentList.length,
      customStudentList: customStudentList,
    });
  },

  /**
   * 搜索输入框
   */
  bindSearch: function(event) {
    // 搜索关键字
    var searchKey = event.detail.value;

    // 搜索学员并保存结果信息
    var searchStudentList = this.searchStudents(searchKey);
    this.setData({
      'searchKey': searchKey,
      'searchStudentList': searchStudentList,
    });
  },

  /**
   * 搜索学员
   */
  searchStudents: function(searchKey) {
    var starStudentList = this.data.starStudentList;
    var customStudentList = this.data.customStudentList;
    var searchStudentList = [];

    if (searchKey) {
      // 查找星标学员
      for (var i = 0; i < starStudentList.length; i++) {
        if (starStudentList[i]['name'].indexOf(searchKey) != -1 || starStudentList[i]['namePinYin'].indexOf(searchKey) != -1) {
          starStudentList[i]['searchType'] = 0; // 通过名称找到
          searchStudentList.push(starStudentList[i]);
        } else if (starStudentList[i]['alias'].indexOf(searchKey) != -1 || starStudentList[i]['aliasPinYin'].indexOf(searchKey) != -1) {
          starStudentList[i]['searchType'] = 1; // 通过昵称找到
          searchStudentList.push(starStudentList[i]);
        }
      }

      // 查找普通列表中学员
      for (let key in customStudentList) {
        for (var i = 0; i < customStudentList[key].length; i++) {
          if (customStudentList[key][i]['name'].indexOf(searchKey) != -1 || customStudentList[key][i]['namePinYin'].indexOf(searchKey) != -1) {
            customStudentList[key][i]['searchType'] = 0; // 通过名称找到
            searchStudentList.push(customStudentList[key][i]);
          } else if (customStudentList[key][i]['alias'].indexOf(searchKey) != -1 || customStudentList[key][i]['aliasPinYin'].indexOf(searchKey) != -1) {
            customStudentList[key][i]['searchType'] = 1; // 通过昵称找到
            searchStudentList.push(customStudentList[key][i]);
          }
        }
      }
    }
    return searchStudentList;
  },

  /**
   * 点击搜索按钮
   */
  searchConfirm: function(event) {
    if (this.data.searchStudentList == '') {
      wx.showToast({
        title: '抱歉，未找到该学员',
        icon: 'none'
      })
    }
  },

  /**
   * 请求服务器获取学员列表信息
   */
  requestStudentList: function() {
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
          // 获取成功，学员信息处理
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
   * 获取通用设置
   */
  getCommonSetting: function() {
    var _this = this;
    let timestamp = moment().valueOf();
    $.get(
      'settings/settings', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var generalSettings = res.data.data.generalSettings;
          _this.setData({
            'generalSettings': res.data.data.generalSettings,
          });
        }
      }
    )
  },
})