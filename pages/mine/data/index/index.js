// pages/mine/data/index/index.js

import F2 from '../../../../components/f2-canvas/lib/f2';

function initClassHour(canvas, width, height) {
  const data = [{
    time: 'Jan.',
    tem: 1000
  }, {
    time: 'Feb.',
    tem: 2200
  }, {
    time: 'Mar.',
    tem: 2000
  }, {
    time: 'Apr.',
    tem: 2600
  }, {
    time: 'May.',
    tem: 2000
  }, {
    time: 'Jun.',
    tem: 2600
  }, {
    time: 'Jul.',
    tem: 2800
  }, {
    time: 'Aug.',
    tem: 2000
  }];


  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);


  // tooltip 与图例结合
  chart.tooltip({
    showCrosshairs: true,
  });

  chart.scale({
    time: {
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

  chart.area().position('time*tem');
  chart.line().position('time*tem');
  chart.render();
  return chart;
}

function initClassHourTotalPrice(canvas, width, height) {
  const data = [{
    year: '1951 年',
    sales: 38
  }, {
    year: '1952 年',
    sales: 52
  }, {
    year: '1956 年',
    sales: 61
  }, {
    year: '1957 年',
    sales: 145
  }, {
    year: '1958 年',
    sales: 48
  }, {
    year: '1959 年',
    sales: 38
  }, {
    year: '1960 年',
    sales: 38
  }, {
    year: '1962 年',
    sales: 38
  }];

  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  return chart;

}

function initStudentIncrease(canvas, width, height) {
  const data = [{
    'name': '男',
    '月份': 'Jan.',
    '月均降雨量': 18.9
  }, {
    'name': '男',
    '月份': 'Feb.',
    '月均降雨量': 28.8
  }, {
    'name': '男',
    '月份': 'Mar.',
    '月均降雨量': 39.3
  }, {
    'name': '男',
    '月份': 'Apr.',
    '月均降雨量': 81.4
  }, {
    'name': '男',
    '月份': 'May.',
    '月均降雨量': 47
  }, {
    'name': '男',
    '月份': 'Jun.',
    '月均降雨量': 20.3
  }, {
    'name': '男',
    '月份': 'Jul.',
    '月均降雨量': 24
  }, {
    'name': '男',
    '月份': 'Aug.',
    '月均降雨量': 35.6
  }, {
    'name': '女',
    '月份': 'Jan.',
    '月均降雨量': 12.4
  }, {
    'name': '女',
    '月份': 'Feb.',
    '月均降雨量': 23.2
  }, {
    'name': '女',
    '月份': 'Mar.',
    '月均降雨量': 34.5
  }, {
    'name': '女',
    '月份': 'Apr.',
    '月均降雨量': 99.7
  }, {
    'name': '女',
    '月份': 'May.',
    '月均降雨量': 52.6
  }, {
    'name': '女',
    '月份': 'Jun.',
    '月均降雨量': 35.5
  }, {
    'name': '女',
    '月份': 'Jul.',
    '月均降雨量': 37.4
  }, {
    'name': '女',
    '月份': 'Aug.',
    '月均降雨量': 42.4
  }];
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    '月均降雨量': {
      tickCount: 5
    }
  });
  chart.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange: function onChange(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.forEach(function (item) {
        map[item.name] = _.clone(item);
      });
      tooltipItems.forEach(function (item) {
        const name = item.name;
        const value = item.value;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(_.values(map));
    },
    onHide: function onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.interval().position('月份*月均降雨量').color('name').adjust('stack');
  chart.render();
  return chart;
}

function initUserSourse(canvas, width, height) {
  const data = [{
    year: '扫描二维码',
    sales: 38
  }, {
    year: '公众号搜索',
    sales: 52
  }, {
    year: '名片分享',
    sales: 61
  }, {
    year: '视频广告',
    sales: 145
  }, {
    year: '其它途径',
    sales: 48
  }];
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.tooltip({
    showItemMarker: false,
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  return chart;
}

function initUnitPrice(canvas, width, height) {
  const map = {
    '芳华': '40%',
    '妖猫传': '20%',
    '机器之血': '18%',
    '心理罪': '15%',
    '寻梦环游记': '5%',
    '其他': '2%'
  };
  const data = [{
    name: '芳华',
    percent: 0.4,
    a: '1'
  }, {
    name: '妖猫传',
    percent: 0.2,
    a: '1'
  }, {
    name: '机器之血',
    percent: 0.18,
    a: '1'
  }, {
    name: '心理罪',
    percent: 0.15,
    a: '1'
  }, {
    name: '寻梦环游记',
    percent: 0.05,
    a: '1'
  }, {
    name: '其他',
    percent: 0.02,
    a: '1'
  }];
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    percent: {
      formatter: function formatter(val) {
        return val * 100 + '%';
      }
    }
  });
  chart.legend({
    position: 'right',
    itemFormatter: function itemFormatter(val) {
      return val + '  ' + map[val];
    }
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })
    .animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });

  chart.render();
  return chart;
}

function initCurriculum(canvas, width, height) {
  const data = [{
    name: '其他消费',
    y: 6371664,
    const: 'const'
  }, {
    name: '生活用品',
    y: 7216301,
    const: 'const'
  }, {
    name: '通讯物流',
    y: 1500621,
    const: 'const'
  }, {
    name: '交通出行',
    y: 586622,
    const: 'const'
  }, {
    name: '饮食',
    y: 900000,
    const: 'const'
  }];

  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
  });

  chart.source(data);
  chart.coord('polar', {
    transposed: true,
    radius: 0.75
  });
  chart.legend(false);
  chart.axis(false);
  chart.tooltip(false);

  // 添加饼图文本
  chart.pieLabel({
    sidePadding: 40,
    label1: function label1(data, color) {
      return {
        text: data.name,
        fill: color
      };
    },
    label2: function label2(data) {
      return {
        text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        fill: '#808080',
        fontWeight: 'bold'
      };
    }
  });

  chart.interval().position('const*y').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
  chart.render();
  return chart;
}

function initClassTime(canvas, width, height) {
  const data = [{
    time: 'Jan.',
    tem: 1000
  }, {
    time: 'Feb.',
    tem: 2200
  }, {
    time: 'Mar.',
    tem: 2000
  }, {
    time: 'Apr.',
    tem: 2600
  }, {
    time: 'May.',
    tem: 2000
  }, {
    time: 'Jun.',
    tem: 2600
  }, {
    time: 'Jul.',
    tem: 2800
  }, {
    time: 'Aug.',
    tem: 2000
  }];
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data);
  chart.tooltip({
    showCrosshairs: true
  });
  chart.scale({
    time: {
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
  chart.area().position('time*tem');
  chart.line().position('time*tem');
  chart.render();
  return chart;
}

function initWorkMatters(canvas, width, height) {
  const data = [
    { name: '芳华', percent: 0.4, type: '1' },
    { name: '妖猫传', percent: 0.2, type: '1' },
    { name: '机器之血', percent: 0.18, type: '1' },
    { name: '心理罪', percent: 0.15, type: '1' },
    { name: '寻梦环游记', percent: 0.05, type: '1' },
    { name: '其他', percent: 0.12, type: '1' },
    { name: '芳华', percent: 0.4, type: '2' },
    { name: '妖猫传', percent: 0.2, type: '2' },
    { name: '机器之血', percent: 0.18, type: '2' },
    { name: '心理罪', percent: 0.15, type: '2' },
    { name: '寻梦环游记', percent: 0.05, type: '2' },
    { name: '其他', percent: 0.12, type: '2' }
  ];

  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
  });
  chart.source(data);
  chart.legend({
    position: 'right'
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.8,
    inner: 0.5
  });
  chart.axis(false);
  chart.interval()
    .position('type*percent')
    .color('name', [
      '#1890FF',
      '#13C2C2',
      '#2FC25B',
      '#FACC14',
      '#F04864',
      '#8543E0'
    ])
    .adjust('stack');

  chart.interaction('pie-select', {
    startEvent: 'tap',
    animate: {
      duration: 300,
      easing: 'backOut'
    },
    cancelable: true
  });
  chart.render();
  return chart;
}

function initStudentRank(canvas, width, height) {
  const data = [{
    year: '刘泽中',
    sales: 38
  }, {
    year: '李俊杰',
    sales: 52
  }, {
    year: 'Alime',
    sales: 61
  }, {
    year: '日本鬼子',
    sales: 145
  }, {
    year: '小王八',
    sales: 48
  }];
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.tooltip({
    showItemMarker: false,
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  return chart;
}

function initStudentSex(canvas, width, height) {
  const data = [{
    name: '男性',
    y: 6371664,
    const: 'const'
  }, {
    name: '女性',
    y: 7216301,
    const: 'const'
  }];

  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
  });

  chart.source(data);
  chart.coord('polar', {
    transposed: true,
    radius: 0.75
  });
  chart.legend(false);
  chart.axis(false);
  chart.tooltip(false);

  // 添加饼图文本
  chart.pieLabel({
    sidePadding: 40,
    label1: function label1(data, color) {
      return {
        text: data.name,
        fill: color
      };
    },
    label2: function label2(data) {
      return {
        text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        fill: '#808080',
        fontWeight: 'bold'
      };
    }
  });

  chart.interval().position('const*y').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
  chart.render();
  return chart;
}

function initBrowseData(canvas, width, height) {
  const data = [{
    time: '2016-08-08 00:00:00',
    value: 10,
    type: '预期收益率'
  }, {
    time: '2016-08-08 00:10:00',
    value: 22,
    type: '预期收益率'
  }, {
    time: '2016-08-08 00:30:00',
    value: 16,
    type: '预期收益率'
  }, {
    time: '2016-08-09 00:35:00',
    value: 26,
    type: '预期收益率'
  }, {
    time: '2016-08-09 01:00:00',
    value: 12,
    type: '预期收益率'
  }, {
    time: '2016-08-09 01:20:00',
    value: 26,
    type: '预期收益率'
  }, {
    time: '2016-08-10 01:40:00',
    value: 18,
    type: '预期收益率'
  }, {
    time: '2016-08-10 02:00:00',
    value: 26,
    type: '预期收益率'
  }, {
    time: '2016-08-10 02:20:00',
    value: 12,
    type: '预期收益率'
  }, {
    time: '2016-08-08 00:00:00',
    value: 4,
    type: '实际收益率'
  }, {
    time: '2016-08-08 00:10:00',
    value: 3,
    type: '实际收益率'
  }, {
    time: '2016-08-08 00:30:00',
    value: 6,
    type: '实际收益率'
  }, {
    time: '2016-08-09 00:35:00',
    value: -12,
    type: '实际收益率'
  }, {
    time: '2016-08-09 01:00:00',
    value: 1,
    type: '实际收益率'
  }, {
    time: '2016-08-09 01:20:00',
    value: 9,
    type: '实际收益率'
  }, {
    time: '2016-08-10 01:40:00',
    value: 13,
    type: '实际收益率'
  }, {
    time: '2016-08-10 02:00:00',
    value: -3,
    type: '实际收益率'
  }, {
    time: '2016-08-10 02:20:00',
    value: 11,
    type: '实际收益率'
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
      mask: 'hh:mm',
      range: [0, 1]
    },
    value: {
      tickCount: 3,
      formatter: function formatter(ivalue) {
        return ivalue + '%';
      }
    }
  });
  chart.axis('time', {
    line: null,
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
  chart.axis('tem', {
    grid: function grid(text) {
      if (text === '0%') {
        return {
          lineDash: null,
          lineWidth: 1
        };
      }
    }
  });
  chart.legend({
    position: 'bottom',
    offsetY: -5
  });
  chart.line()
    .position('time*value')
    .color('type')
    .shape('type', function (type) {
      if (type === '预期收益率') {
        return 'line';
      }
      if (type === '实际收益率') {
        return 'dash';
      }
    });


  chart.render();
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataTypeList: [{
      'type_id': '1',
      'name': '课时统计',
      'selected': false
    },
    {
      'type_id': '2',
      'name': '课时总价统计',
      'selected': true
    },
    {
      'type_id': '3',
      'name': '学员新增统计',
      'selected': false
    },
    {
      'type_id': '4',
      'name': '新增用户来源',
      'selected': false
    },
    {
      'type_id': '5',
      'name': '客单价占比分析',
      'selected': false
    },
    {
      'type_id': '6',
      'name': '课程占比分析',
      'selected': false
    },
    {
      'type_id': '7',
      'name': '上课时段分布',
      'selected': false
    },
    {
      'type_id': '8',
      'name': '工作事项占比',
      'selected': false
    },
    {
      'type_id': '9',
      'name': '上课学员排行',
      'selected': false
    },
    {
      'type_id': '10',
      'name': '学员性别比例',
      'selected': false
    },
    {
      'type_id': '11',
      'name': '个人主页浏览数据',
      'selected': false
    },
    ],
    // 课时统计
    classHour: {
      onInit: initClassHour
    },

    // 课时总价统计
    classHourTotalPrice: {
      onInit: initClassHourTotalPrice
    },

    // 学员新增统计
    studentIncrease: {
      onInit: initStudentIncrease
    },

    // 新增学员来源
    userSourse: {
      onInit: initUserSourse
    },

    // 客单价占比分析
    unitPrice: {
      onInit: initUnitPrice
    },

    // 课程占比分析
    curriculum: {
      onInit: initCurriculum
    },

    // 上课时段分析
    classTime: {
      onInit: initClassTime
    },

    // 工作事项占比
    workMatters: {
      onInit: initWorkMatters
    },

    // 上课学员排行
    studentRank: {
      onInit: initStudentRank
    },

    // 学员性别比例
    studentSex: {
      onInit: initStudentSex
    },

    // 个人主页浏览数据
    browseData: {
      onInit: initBrowseData
    },

    tgcAppId: "wx8abaf00ee8c3202e",  // 吐个槽小程序ID
    tgcExtraData: {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "98007",
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
    return {
      title: '我的私教数据',
      path: 'pages/mine/data/index/index',
    }
  },

  /**
   * 进入开通会员页
   */
  navigateToMember: function() {
    wx.navigateTo({
      url: '../../../members/index/index',
    })
  }
})