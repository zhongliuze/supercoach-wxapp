// pages/students/source/source.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceList: [
      { name: '自定义来源', selected: false, canDelete: true },
      { name: '学员转介绍', selected: false, canDelete: false },
      { name: '门店同事转介绍', selected: false, canDelete: false },
      { name: '电话约访', selected: false, canDelete: false },
      { name: '自访', selected: false, canDelete: false },
      { name: '场开', selected: false, canDelete: false },
      { name: '其它', selected: false, canDelete: false },

    ],
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
    var sourceList = this.data.sourceList;
    sourceList.forEach(function (v, i) {
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
  touchMove: function (e) {
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
    sourceList.forEach(function (v, i) {
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
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  catchDelete: function (event) {
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
  },


  // 选择提醒类型
  selectSource: function (event) {
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
    });

    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  }
})