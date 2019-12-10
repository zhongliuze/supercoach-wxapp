// pages/students/physical/index/index.js
function initChart(canvas, width, height, F2) {
  const data = [{
    time: '2020-12-01 00:00:00',
    tem: 85
  }, {
      time: '2020-12-01 00:10:00',
    tem: 70
  }, {
      time: '2020-12-02 00:30:00',
    tem: 95
  }, {
      time: '2020-12-08 00:35:00',
    tem: 102
  }, {
      time: '2020-12-09 01:00:00',
    tem: 98
  }, {
      time: '2020-12-09 01:20:00',
    tem: 89
  }, {
      time: '2020-12-10 01:40:00',
    tem: 105
  }, {
    time: '2020-12-10 02:00:00',
    tem: 92
  }, {
    time: '2020-12-10 02:20:00',
    tem: 95
  }];
  

  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    time: {
      type: 'timeCat',
      tickCount: 3,
      range: [0, 1]
    },
    tem: {
      tickCount: 5,
      min: 0
    }
  });

  chart.axis('time', {
    label: function label(text, index, total) {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.tooltip({
    showCrosshairs: true
  });

  chart.area().position('time*tem').color('l(90) 0:#1890FF 1:#f7f7f7').shape('smooth');
  chart.line().position('time*tem').color('l(90) 0:#1890FF 1:#f7f7f7').shape('smooth');
  chart.render();
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts: {
      onInit: initChart
    }
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

  }
})