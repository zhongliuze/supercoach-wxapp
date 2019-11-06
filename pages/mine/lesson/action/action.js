// pages/mine/lesson/action/action.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    moduleList: [{
      name: '热身训练',
      id: 0
    },
    {
      name: '热身训练',
      id: 1
    },
    {
      name: '热身训练',
      id: 2
    },
    {
      name: '热身训练',
      id: 3
    },
    {
      name: '热身训练',
      id: 4
    },
    {
      name: '热身训练',
      id: 5
    },
    ],
    selectModule: 0,

    actionList: [
      { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' }, { name: '热身训练' },
    ],
    selectAction: -1,
    showMoreAction: false, // 展开更多动作

    selectGroup: -1, // 选中组数
    selectTimes: -1, // 选中次数
    selectStrength: -1, // 选中强度
    selectInterval: -1, // 选中间歇

    inputGroup: '', // 输入组数内容
    inputTimes: '', // 输入次数内容
    inputStrength: '', // 输入强度内容
    inputInterval: '', // 输入间歇内容
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
   * 选择训练类型
   */
  selectModule: function (event) {
    this.setData({
      'selectModule': event.currentTarget.dataset.index,
    });
  },

  /**
   * 展示更多的动作
   */
  showMoreAction: function(evnet) {
    this.setData({
      'showMoreAction': !this.data.showMoreAction,
    });
  },

  /**
   * 选择组数
   */
  selectGroup: function(event) {
    this.setData({
      'selectGroup': event.currentTarget.dataset.id,
    });
  },

  /**
   * 选择次数
   */
  selectTimes: function (event) {
    this.setData({
      'selectTimes': event.currentTarget.dataset.id,
    });
  },

  /**
 * 选择强度
 */
  selectStrength: function (event) {
    this.setData({
      'selectStrength': event.currentTarget.dataset.id,
    });
  },

  /**
 * 选择间歇
 */
  selectInterval: function (event) {
    this.setData({
      'selectInterval': event.currentTarget.dataset.id,
    });
  },

  /**
   * 输入组数
   */
  inputGroup: function(event) {
    this.setData({
      'inputGroup': event.detail.value,
    });
  },

  /**
  * 输入次数
  */
  inputTimes: function (event) {
    this.setData({
      'inputTimes': event.detail.value,
    });
  },

  /**
* 输入强度
*/
  inputStrength: function (event) {
    this.setData({
      'inputStrength': event.detail.value,
    });
  },

  /**
* 输入间歇
*/
  inputInterval: function (event) {
    this.setData({
      'inputInterval': event.detail.value,
    });
  },

  /**
   * 选择训练动作
   */
  selectAction: function (event) {
    this.setData({
      'selectAction': event.currentTarget.dataset.index,
    });
  },

  /**
   * 点击保存按钮
   */
  bindSave: function(event) {
    wx.navigateBack();
  }
})