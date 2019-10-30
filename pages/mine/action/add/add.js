// pages/mine/action/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleList: ['热身训练', '力量训练', '有氧训练', '拉伸训练'], // 所属模块列表
    intensityList: ['使用阻力等级(有氧器械)', '使用速度等级(有氧器械)', '使用哑铃(kg)', '使用杠铃片(kg)', '使用钢索(kg)', '使用拉伸', '保持动作姿势'], // 动作强度/类型列表
    repeatList: ['次数', '保持分钟数', '保持秒数'], // 重复次数/保持时间列表

    selectModule: 0, // 选中模块
    selectModuleFormat: '请选择', // 选中模块名称
    selectIntensity: 0, // 选中强度/类型
    selectIntensityFormat: '请选择', // 选中强度/类型名称
    selectRepeat: 0, // 选中重复次数/保持时间
    selectRepeatFormat: '请选择', // 选中重复次数/保持时间名称
    actionName: '', // 动作名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'selectModule': options.module,
      'selectModuleFormat': this.data.moduleList[options.module],
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
   * 选择所属模块
   */
  bindPickerModule: function(event) {
    this.setData({
      'selectModule': event.detail.value,
      'selectModuleFormat': this.data.moduleList[event.detail.value],
    });
  },

  /**
   * 选择动作强度
   */
  bindPickerIntensity: function(event) {
    this.setData({
      'selectIntensity': event.detail.value,
      'selectIntensityFormat': this.data.intensityList[event.detail.value],
    });
  },

  /**
   * 选择重复次数
   */
  bindPickerRepeat: function(event) {
    this.setData({
      'selectRepeat': event.detail.value,
      'selectRepeatFormat': this.data.repeatList[event.detail.value],
    });
  },

  /**
   * 新增动作
   */
  addAction: function(event) {
    wx.showToast({
      title: '创建成功',
      icon: 'success',
      success: function(res) {
        setTimeout(function() {
          wx.navigateBack();
        }, 1500);
      }
    })
  },

  /**
   * 输入动作名称
   */
  inputActionName: function(event) {
    this.setData({
      'actionName': event.detail.value,
    });
  }
})