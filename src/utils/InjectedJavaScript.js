const inject = (window, $) => {
  const themeColor = '#2ca146'
  let pid = 0
  let uid = 0 //91286199
  let isJykFast = false
  function getCookie(name) {
    var strcookie = document.cookie //获取cookie字符串
    var arrcookie = strcookie.split('; ') //分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0] == name) {
        return arr[1]
      }
    }
    return ''
  }
  function insertCSS(text) {
    var rule = text
    var css = document.createElement('style')
    css.type = 'text/css'
    if (css.styleSheet) css.styleSheet.cssText = rule
    else css.appendChild(document.createTextNode(rule))
    document.getElementsByTagName('head')[0].appendChild(css)
  }
  function ajax() {
    uid = +getCookie('_logged_')
    $.ajax({
      type: 'GET',
      url: 'https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.change&uid=' + uid + '&pid=' + pid || 0,
      data: null,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)',
        Referer: 'https://m.beidian.com/promote/price_info.html'
      },
      xhrFields: {
        withCredentials: true
      },
      success: data => {
        if (data.success) {
          // 存在productInfo时
          if (data.body.productInfo && data.body.productInfo.id != null) {
            // 天猫专卖或者专营不会出现出现重复商品信息
            if (pid == data.body.productInfo.pid) {
              setTimeout(() => {
                ajax()
              }, 2000)
              // let obj = {
              //   code: 'WN1001',
              //   data: data.body.productInfo,
              //   msg: `出现重复商品信息`
              // }
              // window.postMessage(JSON.stringify(obj))
            } else {
              pid = data.body.productInfo.pid
              let productInfo = data.body.productInfo

              let obj = {
                code: 'WN1005',
                data: productInfo,
                msg: `获取商品信息成功`
              }
              window.postMessage(JSON.stringify(obj))
            }
          } else if (data.body.nextPlatform) {
            let nextPlatform = data.body.nextPlatform
            // 跳过京东,进入下一个平台“唯品会”
            if (nextPlatform.code == 2) {
              nextPlatform.code = 6
              nextPlatform.name = '唯品会'
            }

            setTimeout(() => {
              let obj = {
                code: 'WN1010',
                data: null,
                msg: `系统自动加入 [${nextPlatform.name}] 情报组`
              }
              window.postMessage(JSON.stringify(obj))
              changePlatform(nextPlatform.code)
            }, 2000)
          }
        } else {
          let error = JSON.parse(data)
          if ([1001, 1003].includes(error.code)) {
            let obj = {
              code: 'WN1000',
              data: null,
              msg: '授权失败，请登录贝店!'
            }
            window.postMessage(JSON.stringify(obj))
          } else {
            let obj = {
              code: 'WN1004',
              data: null,
              msg: error.msg
            }
            window.postMessage(JSON.stringify(obj))
          }
        }
      },
      error: error => {
        setTimeout(() => {
          ajax()
        }, 2000)
      }
    })
  }
  // 提交价格情报
  function submitBD(params) {
    let gmtCreate = params.gmtCreate
    let submitTimestamp = gmtCreate + 1000 * 15 - new Date().getTime()
    setTimeout(() => {
      let reqParams = {
        uid: uid,
        outerUrl: params.url,
        id: params.id
      }
      $.ajax({
        type: 'POST',
        url: 'https://imapi.beidian.com/server/gateway?method=voc.pricetask.submitMission',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(reqParams),
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)',
          Referer: 'https://m.beidian.com/promote/price_info.html'
        },
        xhrFields: {
          withCredentials: true
        },
        success: data => {
          if (data.success) {
            if (data.body == true) {
              getHistory()
              ajax()
            } else {
              let obj = {
                code: 'WN1011',
                data: {
                  type: 'info',
                  time: new Date().getTime(),
                  msg: `${JSON.stringify(reqParams)}
                  ${JSON.stringify(data)}
                  `
                },
                msg: `记录日志`
              }
              window.postMessage(JSON.stringify(obj))
              ajax()
            }
          } else {
            console.log('提交失败')
            ajax()
          }
        },
        error: error => {
          let obj = {
            code: 'WN1011',
            data: {
              type: 'error',
              time: new Date().getTime(),
              msg: JSON.stringify(error)
            },
            msg: `记录日志`
          }
          window.postMessage(JSON.stringify(obj))

          ajax()
        },
        complete: () => {}
      })
    }, submitTimestamp)
  }
  // 获取提交列表
  function getHistory() {
    uid = +getCookie('_logged_')
    $.ajax({
      type: 'POST',
      url: 'https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.history',
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({
        uid: uid,
        page: 1,
        size: 100
      }),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)',
        Referer: 'https://m.beidian.com/promote/price_info.html'
      },
      xhrFields: {
        withCredentials: true
      },
      beforeSend: (xhr, settings) => {},
      success: data => {
        let obj = {
          code: 'WN1002',
          data: [],
          msg: '历史提交记录'
        }
        if (data && data.total > 0) {
          let items = data.items
          obj.data = items
          window.postMessage(JSON.stringify(obj))
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }
  // 切换任务平台
  function changePlatform(p) {
    uid = +getCookie('_logged_')
    $.ajax({
      type: 'GET',
      url: 'https://imapi.beidian.com/server/gateway?method=voc.price.hunter.agency.change&uid=' + uid + '&platform=' + p,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      data: null,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)',
        Referer: 'https://m.beidian.com/promote/price_info.html'
      },
      xhrFields: {
        withCredentials: true
      },
      beforeSend: (xhr, settings) => {},
      success: data => {
        ajax()
      },
      error: error => {
        console.log('切换平台报错~', error)
        ajax()
      },
      complete: () => {}
    })
  }
  // 生成从minNum到maxNum的随机数
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10)
        break
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        break
      default:
        return 0
        break
    }
  }
  // 获取jyk任务
  function getJykTask() {
    uid = +getCookie('_logged_')
    let jykTaskStatus = +getCookie('jykTaskStatus')
    // 开启了检验科才刷任务0:关闭,1:开启
    if (jykTaskStatus == 1) {
      // let uid = 90132158;
      // let hour = new Date().getHours()
      // let random = null
      // // 早上6点前慢速（原）
      // if (hour < 6) {
      //   random = randomNum(1000, 3000)
      // } else {
      //   if (isJykFast) {
      //     random = randomNum(0, 10)
      //   } else {
      //     random = randomNum(700, 1000)
      //   }
      // }
      $.ajax({
        type: 'POST',
        url: `https://imapi.beidian.com/server/gateway?method=voc.agentcheck.task.detail.get`,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({}),
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)'
        },
        xhrFields: {
          withCredentials: true
        },
        beforeSend: (xhr, settings) => {},
        success: data => {
          console.log(data)
          if (data.success) {
            isJykFast = true
            // let checkTaskId = data.body.checkTaskId;
            // let iid = data.body.iid;
            // submitJykTask(checkTaskId);
            let task = data.body
            let obj = {
              code: 'WN1008',
              data: task,
              msg: '传递jyk任务~'
            }
            window.postMessage(JSON.stringify(obj))
          } else if (data.msg == '行迹可疑暂停任务资格') {
            let obj = {
              code: 'WN1004',
              data: null,
              msg: data.msg
            }
            window.postMessage(JSON.stringify(obj))
          } else {
            isJykFast = false
            setTimeout(() => {
              getJykTask()
            }, 2000)
          }
        },
        error: error => {
          isJykFast = false
          setTimeout(() => {
            getJykTask()
          }, 2000)
        }
      })
    }
  }
  // 提交jyk任务
  function submitJykTask(task) {
    setTimeout(() => {
      uid = +getCookie('_logged_')
      // let uid = 90132158;
      task.handle = 'accept'
      let url = `https://imapi.beidian.com/server/gateway?method=voc.agentcheck.task.check.${task.handle}&checkTaskId=${task.checkTaskId}&uid=${uid}`
      $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: null,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)',
          Referer: 'https://m.beidian.com/promote/price_info.html'
        },
        xhrFields: {
          withCredentials: true
        },
        beforeSend: (xhr, settings) => {},
        success: data => {
          if (data.success && data.body == null && data.msg == null) {
            console.log('jyk success')
          } else {
            let obj = {
              code: 'WN1011',
              data: {
                type: 'info',
                time: new Date().getTime(),
                msg: `${url}
                ${JSON.stringify(data)}
                `
              },
              msg: `记录日志`
            }
            window.postMessage(JSON.stringify(obj))
          }
        },
        error: error => {
          let obj = {
            code: 'WN1011',
            data: {
              type: 'error',
              time: new Date().getTime(),
              msg: JSON.stringify(error)
            },
            msg: `记录日志`
          }
          window.postMessage(JSON.stringify(obj))
        },
        complete: () => {
          getJykTask()
        }
      })
    }, 6000)
  }
  // 设置cookie
  function setCookie(cookies) {
    cookies.forEach(cookie => {
      document.cookie = cookie.key + '=' + escape(cookie.value) + '; domain=.beidian.com' + '; path=/'
    })
  }
  // 清空所有cookie
  function clearAuthCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--; ) {
        document.cookie = keys[i] + '=;expires=' + new Date(0).toUTCString()
      }
    }
  }
  // 监听Native层事件
  document.addEventListener(
    'message',
    function(event) {
      let result = JSON.parse(event.data)
      switch (result.code) {
        case 'NW1001':
          init(result.data)
          break
        case 'NW1002':
          getHistory()
          break
        case 'NW1003':
          changePlatform(result.data)
          break
        case 'NW1007':
          setCookie(result.data)
          setTimeout(() => {
            ajax()
          }, 1000)
          break
        case 'NW1009':
          submitJykTask(result.data)
          break
        case 'NW1010':
          getJykTask()
          break
        case 'NW1011':
          console.log(7890)
          // 退出登录
          clearAuthCookie()
          break
        case 'NW1012':
          // 切换是否开启情报检验科
          setCookie(result.data)
          getJykTask()
          break
        case 'NW1013':
          setTimeout(() => {
            ajax()
          }, 2000)
          break
        case 'NW1014':
          submitBD(result.data)
          break
        default:
          break
      }
    },
    false
  )
  function login() {
    var tel = $('.phone-input').val()
    var code = $('.msg-pin-input').val()
    let obj = {
      code: 'WN1007',
      data: {
        tel: tel,
        code: code
      },
      msg: '原生获取登录jsessionid值'
    }
    window.postMessage(JSON.stringify(obj))
  }
  function init(cookies) {
    insertCSS(
      `html{-webkit-user-select:none;}body{cursor:default;-webkit-tap-highlight-color:rgba(255,0,0,0.5) !important;}.login .login-btn.active{background-color: ${themeColor};}.login .msg-pin-btn.active{border: 1px solid ${themeColor};background-color: ${themeColor};}`
    )
    $('.msg-pin-input')
      .attr('type', 'number')
      .attr('pattern', '[0-9]*')
      .attr('oninput', 'if(value.length>4)value=value.slice(0,4)')
    $('.J_login-btn')
      .off('click')
      .on('click', login)
    // $('.J_login-btn').on('click', login);
    setCookie(cookies)
    setTimeout(() => {
      changePlatform(6)
      getHistory()
      getJykTask()
    }, 1000)
    // 页面心跳，保证页面长时间执行定时器，卡死问题
    // setInterval(() => {
    //   window.location.reload()
    // }, 1000 * 60 * 15)
  }
}

export default `(${inject.toString()})(window, Zepto);`
