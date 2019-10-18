Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [
      { nameStr: '泽中', name: '刘泽中', phone: '18020220001', times: '05', isTouchMove: false },
      { nameStr: '商量', name: '商量', phone: '18598632214', times: '13', isTouchMove: false },
      { nameStr: '晓东', name: '周晓东', phone: '', times: '05', isTouchMove: false },
      { nameStr: '龙哥', name: '龙哥', phone: '18020220001', times: '00', isTouchMove: false },
      { nameStr: '老公', name: '山东老公', phone: '', times: '', isTouchMove: false },
      { nameStr: '盖伦', name: '德玛西亚之力', phone: '18020220001', times: '05', isTouchMove: false },
      
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
    var studentList = this.data.studentList;
    studentList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      studentList: studentList
    })
  },
  //滑动事件处理
  touchMove: function (e) {
    var studentList = this.data.studentList;
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
    studentList.forEach(function (v, i) {
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
      studentList: studentList
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
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
    
  },


})