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
  },

  test: function() {
    for (let i = 0; i < taskList.length; i++) {
      for (let j = 0; j < courseList.length; j++) {
        // 寻找相同年、月的数据
        if (moment(taskList[i]['taskDate']).format('YYYY-MM') == courseList[j]['date']) {
          for (let k = 0; k < courseList[j]['weekList'].length; k++) {
            // 寻找相同日的数据
            if (taskList[i]['taskDate'] == courseList[j]['weekList'][k]['date']) {
              // 寻找到相同日，将该日表格重写
              console.log(courseList[j]['weekList'][k]['tableList']);
              console.log(taskList[i]['taskList']);
              // 取出返回数据中taskList的值
              var tempTaskList = taskList[i]['taskList'];
              // 临时存放某天数据列表的数组
              var tempDayList = [];
              // 从开始时间统计到结束时间，默认步长1小时
              for (let p = _this.data.startTime; p <= _this.data.endTime; p++) {
                var hasTask = -1;  // 是否有任务
                var tempTime = [];  // 临时存放每个时段数据的数组
                // 遍历Post返回数据的任务列表
                for (let q = 0; q < tempTaskList.length; q++) {
                  // 判断是否有整点（00分）开始任务
                  if (tempTaskList[q]['beginTimeStr'] == (p + ':00')) {
                    // 有整点开始任务
                    // 是否有任务，有任务为任务的下标，无任务在为-1；
                    hasTask = q;
                    // 组建当前时间段数组
                    tempTime = {
                      hasTask: true,  // 有任务
                      taskDuration: tempTaskList[q]['setp'], // 任务时长
                      taskId: tempTaskList[q]['taskId'], // 任务ID
                      titleColor: tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                      taskType: tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                      title: tempTaskList[q]['title'],  // 任务名称、标题
                      height: 104 * tempTaskList[q]['setp'] + 10 * (tempTaskList[q]['setp'] - 1), // 任务列方块高度
                      paddingBottom: '10',  // 任务列方块距底部间距
                    }
                    // 将时间块写入到日列表中
                    tempDayList.push(tempTime);
                    // 根据任务时长调整日列表中方块数量
                    p = p + tempTaskList[q]['setp'] - 1;
                    break;

                  } else if (tempTaskList[q]['beginTimeStr'] == (p + ':30')) {
                    // 有半点（30分）开始任务
                    // 判断是否需要半个空任务（空白格）
                    hasTask = q;  // 是否有任务，有任务为任务的下标，无任务在为-1；
                    var hasEndTime = -1;  // 是否有相同的结束时间冲突状态，默认没有；
                    // 遍历当日任务数组，判断是否有某个结束时间与开始时间相同；
                    for (let m = 0; m < tempTaskList.length; m++) {
                      // 寻找当前时间的半点（30分）是否与某个任务的结束时间相同
                      if (tempTaskList[m]['endTimeStr'] == (p + ':30')) {
                        hasEndTime = m;
                      }
                    }
                    // 判断遍历结果，hasEndTime为-1则未找到，为其它值则找到
                    if (hasEndTime == -1) {
                      // 未找到则输出空任务方块（空白格），找到则不输出
                      tempDayList.push({
                        hasTask: false,
                        height: '52',
                        paddingBottom: '0',
                      });
                    }
                    // 输出正常的任务块
                    tempTime = {
                      hasTask: true,  // 有任务
                      taskDuration: tempTaskList[q]['setp'], // 任务时长
                      taskId: tempTaskList[q]['taskId'], // 任务ID
                      titleColor: tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
                      taskType: tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
                      title: tempTaskList[q]['title'],  // 任务标题、名称
                      height: (104 * tempTaskList[q]['setp']) + (10 * (tempTaskList[q]['setp'])),   // 任务列方块高度
                      paddingBottom: '0',  // 任务列方块距底部间距
                    }
                    // 将时间块写入到日列表中
                    tempDayList.push(tempTime);
                    // 根据任务时长调整日列表中方块数量
                    p = p + tempTaskList[q]['setp'] - 1;
                    break;
                  } else if (tempTaskList[q]['endTimeStr'] == (p + ':30')) {
                    // 有某个半点（30分）结束时间与开始时间相同
                    var hasBeginTime = -1;  // 是否有相同的开始时间冲突状态，默认没有；
                    // 遍历当日任务数组，判断是否有某个开始时间与之相同；
                    for (let m = 0; m < tempTaskList.length; m++) {
                      // 寻找当前时间的半点（30分）是否与某个任务的开始时间相同
                      if (tempTaskList[m]['beginTimeStr'] == (p + ':30')) {
                        hasBeginTime = m;
                      }
                    }
                    // 判断遍历结果，hasBeginTime为-1则未找到，为其它值则找到
                    if (hasBeginTime == -1) {
                      tempDayList.push({
                        hasTask: false,
                        height: '52',
                        paddingBottom: '10',
                      });
                    }
                    // 是否有任务，有任务为任务的下标，无任务在为-1；
                    hasTask = q;
                  }
                }
                // 未匹配到任务
                if (hasTask == -1) {
                  // 无任务，输出默认方块
                  tempDayList.push({
                    hasTask: false,
                    height: '104',
                    paddingBottom: '10',
                  });
                }
              }
              console.log('新的day列表');
              console.log(tempDayList);
            }
          }
        }
      }
    }
  },

  onTest: function() {
    console.log('onShow start');
    var _this = this;
    var courseList = this.data.courseList; // 已生成课表数据

    // 获取当前时间，展示时间线
    if (moment().hour() < (this.data.endTime + 1) && moment().hour() > (this.data.startTime - 1)) {
      // 显示时间线
      var timeLineTop = 20 + (parseInt(moment().hour()) - this.data.startTime) * 114 + (104 / 60) * moment().minute() - 4;
    } else {
      // 不显示时间线
      var timeLineTop = -1;
    }

    // 寻找当前时间，标红展示
    var timeList = this.data.timeList;
    for (let i = 0; i < timeList.length; i++) {
      if (timeList[i]['hour'] == moment().hour()) {
        timeList[i]['isCurrent'] = true;
        break;
      }
    }

    let timestamp = moment().valueOf();
    $.get(
      'task/range', {
        coachid: wx.getStorageSync('coachid'),
        beginDate: '2019-09-16', // 周时间（默认为本周，格式 yyyy-MM-dd）
        endDate: '2019-10-10',
        sign: util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        timestamp: timestamp, //时间戳
      },
      function (res) {
        if (res.data.code == 0) {
          // 获取成功
          var taskList = res.data.data.taskList;  // 服务器返回结果
          for (let i = 0; i < taskList.length; i++) {
            for (let j = 0; j < courseList.length; j++) {
              courseList[j]['weekList'][2]['tableList'] = [{
                hasTask: true,
                taskDuration: 1, // 时长
                taskId: 1, // 任务ID
                titleColor: '#5fcd64', // 任务背景颜色  0:#ffc229  1 :#5fcd64
                taskType: 0, // 任务类型   0:排课，1:休息，2:自定义
                title: '刘泽中',
                height: '104',
                paddingBottom: '10',
              }, {
                hasTask: true,
                taskDuration: 1, // 时长
                taskId: 1, // 任务ID
                titleColor: '#5fcd64', // 任务背景颜色   0:#ffc229  1 :#5fcd64
                taskType: 0, // 任务类型   0:排课，1:休息，2:自定义
                title: '刘泽中',
                height: '104',
                paddingBottom: '10',
              }, {
                hasTask: true,
                taskDuration: 1, // 时长
                taskId: 1, // 任务ID
                titleColor: '#5fcd64', // 任务背景颜色   0:#ffc229  1 :#5fcd64
                taskType: 0, // 任务类型   0:排课，1:休息，2:自定义
                title: '刘泽中',
                height: '104',
                paddingBottom: '10',
              }];
              // 寻找相同年、月的数据
              // if (moment(taskList[i]['taskDate']).format('YYYY-MM') == courseList[j]['date']) {
              //   for (let k = 0; k < courseList[j]['weekList'].length; k++) {
              //     // 寻找相同日的数据
              //     if (taskList[i]['taskDate'] == courseList[j]['weekList'][k]['date']) {
              //       // 寻找到相同日，将该日表格重写
              //       // 取出返回数据中taskList的值
              //       var tempTaskList = taskList[i]['taskList'];
              //       // 临时存放某天数据列表的数组
              //       var tempDayList = [];
              //       // 从开始时间统计到结束时间，默认步长1小时
              //       for (let p = _this.data.startTime; p <= _this.data.endTime; p++) {
              //         var hasTask = -1;  // 是否有任务
              //         var tempTime = [];  // 临时存放每个时段数据的数组
              //         // 遍历Post返回数据的任务列表
              //         for (let q = 0; q < tempTaskList.length; q++) {
              //           // 判断是否有整点（00分）开始任务
              //           if (tempTaskList[q]['beginTimeStr'] == (p + ':00')) {
              //             // 有整点开始任务
              //             // 是否有任务，有任务为任务的下标，无任务在为-1； 
              //             hasTask = q;
              //             // 组建当前时间段数组
              //             tempTime = {
              //               hasTask: true,  // 有任务
              //               taskDuration: tempTaskList[q]['step'], // 任务时长
              //               taskId: tempTaskList[q]['taskId'], // 任务ID
              //               titleColor: tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
              //               taskType: tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
              //               title: tempTaskList[q]['title'],  // 任务名称、标题
              //               height: 104 * tempTaskList[q]['step'] + 10 * (tempTaskList[q]['step'] - 1), // 任务列方块高度
              //               paddingBottom: '10',  // 任务列方块距底部间距
              //             }
              //             // 将时间块写入到日列表中
              //             tempDayList.push(tempTime);
              //             // 根据任务时长调整日列表中方块数量
              //             p = p + tempTaskList[q]['step'] - 1;
              //             break;
              //           } else if (tempTaskList[q]['beginTimeStr'] == (p + ':30')) {
              //             // 有半点（30分）开始任务
              //             // 判断是否需要半个空任务（空白格）
              //             hasTask = q;  // 是否有任务，有任务为任务的下标，无任务在为-1；
              //             var hasEndTime = -1;  // 是否有相同的结束时间冲突状态，默认没有；
              //             // 遍历当日任务数组，判断是否有某个结束时间与开始时间相同；
              //             for (let m = 0; m < tempTaskList.length; m++) {
              //               // 寻找当前时间的半点（30分）是否与某个任务的结束时间相同
              //               if (tempTaskList[m]['endTimeStr'] == (p + ':30')) {
              //                 hasEndTime = m;
              //               }
              //             }
              //             // 判断遍历结果，hasEndTime为-1则未找到，为其它值则找到
              //             if (hasEndTime == -1) {
              //               // 未找到则输出空任务方块（空白格），找到则不输出
              //               tempDayList.push({
              //                 hasTask: false,
              //                 height: '52',
              //                 paddingBottom: '0',
              //               });
              //             }
              //             // 输出正常的任务块
              //             tempTime = {
              //               hasTask: true,  // 有任务
              //               taskDuration: tempTaskList[q]['step'], // 任务时长
              //               taskId: tempTaskList[q]['taskId'], // 任务ID
              //               titleColor: tempTaskList[q]['titleColor'], // 任务背景颜色   0:#ffc229  1 :#5fcd64
              //               taskType: tempTaskList[q]['taskType'], // 任务类型   0:排课，1:休息，2:自定义
              //               title: tempTaskList[q]['title'],  // 任务标题、名称
              //               height: (104 * tempTaskList[q]['step']) + (10 * (tempTaskList[q]['step'])),   // 任务列方块高度
              //               paddingBottom: '0',  // 任务列方块距底部间距
              //             }
              //             // 将时间块写入到日列表中
              //             tempDayList.push(tempTime);
              //             // 根据任务时长调整日列表中方块数量
              //             p = p + tempTaskList[q]['step'] - 1;
              //             break;
              //           } else if (tempTaskList[q]['endTimeStr'] == (p + ':30')) {
              //             // 有某个半点（30分）结束时间与开始时间相同
              //             var hasBeginTime = -1;  // 是否有相同的开始时间冲突状态，默认没有；
              //             // 遍历当日任务数组，判断是否有某个开始时间与之相同；
              //             for (let m = 0; m < tempTaskList.length; m++) {
              //               // 寻找当前时间的半点（30分）是否与某个任务的开始时间相同
              //               if (tempTaskList[m]['beginTimeStr'] == (p + ':30')) {
              //                 hasBeginTime = m;
              //               }
              //             }
              //             // 判断遍历结果，hasBeginTime为-1则未找到，为其它值则找到
              //             if (hasBeginTime == -1) {
              //               tempDayList.push({
              //                 hasTask: false,
              //                 height: '52',
              //                 paddingBottom: '10',
              //               });
              //             }
              //             // 是否有任务，有任务为任务的下标，无任务在为-1；
              //             hasTask = q;
              //           }
              //         }
              //         // 未匹配到任务
              //         if (hasTask == -1) {
              //           // 无任务，输出默认方块
              //           tempDayList.push({
              //             hasTask: false,
              //             height: '104',
              //             paddingBottom: '10',
              //           });
              //         }
              //       }
              //       courseList[j]['weekList'][k]['tableList'] = tempDayList;
              //     }
              //   }
              // }
            }
          }
        } else {
          wx.showToast({
            title: '课程信息加载失败',
            icon: 'none'
          })
        }
      }
    )
    console.log(courseList);
    _this.setData({
      timeLineTop: timeLineTop,  // 当前时间线位置
      timeList: timeList,  // 更新当前时间展示颜色
      movableMessageY: 1029 + (this.data.statusBarHeight - 20),  // 设置可移动预约消息框初始Y轴坐标
      courseList: courseList,
    });
    console.log('onShow end');
  }
})
