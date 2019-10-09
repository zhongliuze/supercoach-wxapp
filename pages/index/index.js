//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function(e) {
    for (let i = 0; i < tempWeekList.length; i++) {
        tempWeekList[i]['tableList'] = [{
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
        ]
        if (tempWeekList[i]['day'] == 12) {
          for (let j = this.data.startTime; j <= this.data.endTime; j++) {
            var hasTask = -1;
            var tempTime = [];

            for (let k = 0; k < tempPostList.length; k++) {
              if (tempPostList[k]['beginTime'] == (j + ':00')) {
                // 有整点任务
                hasTask = k;
                tempTime = {
                  hasTask: true,
                  taskDuration: tempPostList[k]['setp'], // 时长
                  taskId: tempPostList[k]['taskId'], // 任务ID
                  titleColor: tempPostList[k]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                  title: tempPostList[k]['title'],
                  height: 104 * tempPostList[k]['setp'] + 10 * (tempPostList[k]['setp'] - 1),
                  paddingBottom: '10',
                }
                tempWeekList[i]['tableList'].push(tempTime);
                j = j + tempPostList[k]['setp'] - 1;
                break;
              } else if (tempPostList[k]['beginTime'] == (j + ':30')) {
                // 有半点任务
                // 判断是否需要半个空白格
                hasTask = k;
                var hasEndTime = -1;
                for (let p = 0; p < tempPostList.length; p++) {
                  if (tempPostList[p]['endTime'] == (j + ':30')) {
                    hasEndTime = p;
                  }
                }
                if (hasEndTime == -1) {
                  // 输出空白格
                  var tempTime0 = {
                    hasTask: false,
                    height: '52',
                    paddingBottom: '0',
                  }
                  tempWeekList[i]['tableList'].push(tempTime0);
                }
                // 输出任务快
                tempTime = {
                  hasTask: true,
                  taskDuration: tempPostList[k]['setp'], // 时长
                  taskId: tempPostList[k]['taskId'], // 任务ID
                  titleColor: tempPostList[k]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                  taskType: tempPostList[k]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                  title: tempPostList[k]['title'],
                  height: (104 * tempPostList[k]['setp']) + (10 * (tempPostList[k]['setp'])),
                  paddingBottom: '0',
                }
                tempWeekList[i]['tableList'].push(tempTime);
                j = j + tempPostList[k]['setp'] - 1;
                break;
              } else if (tempPostList[k]['endTime'] == (j + ':30')) {
                // 有结束任务
                // 输出半个空格
                var hasBeginTime = -1;
                for (let p = 0; p < tempPostList.length; p++) {
                  if (tempPostList[p]['beginTime'] == (j + ':30')) {
                    hasBeginTime = p;
                  }
                }
                if (hasBeginTime == -1) {
                  tempTime = {
                    hasTask: false,
                    height: '52',
                    paddingBottom: '10',
                  }
                  tempWeekList[i]['tableList'].push(tempTime);
                }
                hasTask = k;
              }
            }

            if (hasTask == -1) {
              // 输出默认方块，无任务
              tempTime = {
                hasTask: false,
                height: '104',
                paddingBottom: '10',
              }
              tempWeekList[i]['tableList'].push(tempTime);
            }

          }
        } else {
          tempWeekList[i]['tableList'] = [{
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          {
            date: '2019-09-25 09:00',
            hasTask: false,
            taskDuration: 1,
            height: '104',
            paddingBottom: '10',
          },
          ]
        }
      }
  }
})
