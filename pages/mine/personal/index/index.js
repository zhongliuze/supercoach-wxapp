// pages/mine/personal/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImages: [{
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817220524&di=ab54d71543cb562b4df5763d14cb3206&imgtype=0&src=http%3A%2F%2F01.minipic.eastday.com%2F20170620%2F20170620165027_871c951922c9541ac486616d6ad5bbf2_3.jpeg',
    }, {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575816369982&di=b3ee2ac181af60f820f78072955020f1&imgtype=0&src=http%3A%2F%2F06img.shaqm.com%2Fmobile%2F20171010%2F00ae091ba62cd2a5555c48d7d061882f.jpeg',
    },
    {
      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2647110685,1681591111&fm=11&gp=0.jpg',
    },
    {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817323377&di=3357de31707d197acd5ded220a436257&imgtype=0&src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2995720750-E3357DB1FAEB6CC6DB1E7C770676E2EF%2F0%3Ffmt%3Djpg%26size%3D64%26h%3D600%26w%3D900%26ppv%3D1.jpg',
    },
    {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817323376&di=d9cbe6c7c8548c59ca9adb103194b94d&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fdy%2Fslidenews%2F20_img%2F2017_20%2F87296_5673538_263293.jpg',
    },
    ],

    wxcodePopup: false, // 微信二维码弹窗
    sharePopup: false, // 分享弹窗
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
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
    this.closeSharePopup();
    return {
      title: '【常文静】高级游泳教练',
      path: 'pages/mine/personal/index/index',
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817323376&di=d9cbe6c7c8548c59ca9adb103194b94d&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fdy%2Fslidenews%2F20_img%2F2017_20%2F87296_5673538_263293.jpg',
    }
    
  },

  /**
  * 打开二维码弹窗
  */
  openWxcodePopup: function (event) {
    this.setData({
      wxcodePopup: true,
    });
  },

  /**
   * 关闭二维码弹窗
   */
  closeWxcodePopup: function (event) {
    this.setData({
      wxcodePopup: false,
    });
  },

  /**
* 打开分享弹窗
*/
  openSharePopup: function (event) {
    this.setData({
      sharePopup: true,
    });
  },

  /**
   * 关闭分享弹窗
   */
  closeSharePopup: function (event) {
    this.setData({
      sharePopup: false,
    });
  },

  /**
   * 弹窗后禁止滚动
   */
  catchtouchmove: function () { },

  /**
   * 拨打手机
   */
  callphone: function () {
    wx.makePhoneCall({
      phoneNumber: '18020220001',
    })
  },

  /**
   * 预览轮播图
   */
  previewSwiperImage: function (event) {
    console.log(event);
    var imageurl_id = event.currentTarget.dataset.urlid;
    var headerImages = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817220524&di=ab54d71543cb562b4df5763d14cb3206&imgtype=0&src=http%3A%2F%2F01.minipic.eastday.com%2F20170620%2F20170620165027_871c951922c9541ac486616d6ad5bbf2_3.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575816369982&di=b3ee2ac181af60f820f78072955020f1&imgtype=0&src=http%3A%2F%2F06img.shaqm.com%2Fmobile%2F20171010%2F00ae091ba62cd2a5555c48d7d061882f.jpeg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2647110685,1681591111&fm=11&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817323377&di=3357de31707d197acd5ded220a436257&imgtype=0&src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2995720750-E3357DB1FAEB6CC6DB1E7C770676E2EF%2F0%3Ffmt%3Djpg%26size%3D64%26h%3D600%26w%3D900%26ppv%3D1.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575817323376&di=d9cbe6c7c8548c59ca9adb103194b94d&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fdy%2Fslidenews%2F20_img%2F2017_20%2F87296_5673538_263293.jpg'];

    wx.previewImage({
      current: headerImages[imageurl_id], // 当前显示图片的http链接
      urls: headerImages // 需要预览的图片http链接列表
    })
  },


  /**
   * 预览图片
   */
  previewImage: function (event) {
    var imageurlList = [];
    imageurlList.push(event.currentTarget.dataset.url);
    wx.previewImage({
      urls: imageurlList // 需要预览的图片http链接列表
    })
  },

})