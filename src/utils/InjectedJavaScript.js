let inject = (window, $) => {
  const themeColor = '#2ca146';
  let pid = 0;
  let uid = 0; //91286199
  function getCookie(name) {
    var strcookie = document.cookie; //获取cookie字符串
    var arrcookie = strcookie.split('; '); //分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=');
      if (arr[0] == name) {
        return arr[1];
      }
    }
    return '';
  }
  function insertCSS(text) {
    var rule = text;
    var css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) css.styleSheet.cssText = rule;
    else css.appendChild(document.createTextNode(rule));
    document.getElementsByTagName('head')[0].appendChild(css);
  }
  function ajax() {
    uid = +getCookie('_logged_');
    $.ajax({
      type: 'GET',
      url: 'https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.change&uid=' + uid + '&pid=' + pid,
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
          if (data.body.productInfo) {
            // 天猫专卖或者专营不会出现出现重复商品信息
            if (pid == data.body.productInfo.pid && !(data.body.productInfo.platform == 13 || data.body.productInfo.platform == 12)) {
              let obj = {
                code: 'WN1001',
                data: data.body.productInfo,
                msg: `出现重复商品信息`
              };
              window.postMessage(JSON.stringify(obj));
            } else {
              pid = data.body.productInfo.pid;
              let productInfo = data.body.productInfo;

              let obj = {
                code: 'WN1005',
                data: productInfo,
                msg: `获取商品信息成功`
              };
              window.postMessage(JSON.stringify(obj));
            }
          } else if (data.body.nextPlatform) {
            // let nextPlatform = data.body.nextPlatform;
            // let obj = {
            //   code: 'WN1004',
            //   data: null,
            //   msg: `程序自动加入 [${nextPlatform.name}] 情报组`
            // }
            // window.postMessage(JSON.stringify(obj))
            changePlatform(nextPlatform.code);
          }
        } else {
          let error = JSON.parse(data);
          if ([1001, 1003].includes(error.code)) {
            let obj = {
              code: 'WN1000',
              data: null,
              msg: '授权失败，请登录贝店!'
            };
            window.postMessage(JSON.stringify(obj));
          } else {
            let obj = {
              code: 'WN1004',
              data: null,
              msg: error.msg
            };
            window.postMessage(JSON.stringify(obj));
          }
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  // 提交价格情报
  function submitBD(params) {
    $.ajax({
      type: 'POST',
      url: 'https://imapi.beidian.com/server/gateway?method=voc.pricetask.submitMission',
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({
        uid: uid,
        outerUrl: params.url,
        id: params.id
      }),
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
          console.log('提交成功');
          getHistory();
        } else {
          console.log('提交失败');
        }
      },
      error: error => {
        console.log('提交出错', error);
      }
    });
  }
  // 获取提交列表
  function getHistory() {
    uid = +getCookie('_logged_');
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
        };
        if (data && data.total > 0) {
          let items = data.items;
          obj.data = items;
          window.postMessage(JSON.stringify(obj));
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  // 切换任务平台
  function changePlatform(p) {
    uid = +getCookie('_logged_');
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
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  // 生成从minNum到maxNum的随机数
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }
  // 获取jyk任务
  function getJykTask() {
    uid = +getCookie('_logged_');
    let random = randomNum(2000, 3000);
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: `https://imapi.beidian.com/server/gateway?method=voc.agentcheck.task.detail.get&uid=${uid}`,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: null,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)'
        },
        xhrFields: {
          withCredentials: true
        },
        beforeSend: (xhr, settings) => {},
        success: data => {
          console.log(data);
          if (data.success) {
            // let checkTaskId = data.body.checkTaskId;
            // let iid = data.body.iid;
            // submitJykTask(checkTaskId);
            let task = data.body;
            let obj = {
              code: 'WN1008',
              data: task,
              msg: '传递jyk任务'
            };
            window.postMessage(JSON.stringify(obj));
          } else {
            let obj = {
              code: 'WN1004',
              data: null,
              msg: data.msg
            };
            window.postMessage(JSON.stringify(obj));
            getJykTask();
          }
        },
        error: error => {
          getJykTask();
        }
      });
    }, random);
  }
  // 提交jyk任务
  function submitJykTask(task) {
    uid = +getCookie('_logged_');
    $.ajax({
      type: 'GET',
      url: `https://imapi.beidian.com/server/gateway?method=voc.agentcheck.task.check.${task.handle}&checkTaskId=${task.checkTaskId}&uid=${uid}`,
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
      success: data => {},
      error: error => {},
      complete: () => {
        getJykTask();
      }
    });
  }
  // 设置cookie
  function setCookie(cookies) {
    cookies.forEach(cookie => {
      document.cookie = cookie.key + '=' + escape(cookie.value) + '; domain=.beidian.com' + '; path=/';
    });
  }
  // 清空所有cookie
  function clearAuthCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; ) {
        document.cookie = keys[i] + '=;expires=' + new Date(0).toUTCString();
      }
    }
  }
  // 监听Native层事件
  document.addEventListener(
    'message',
    function(event) {
      let result = JSON.parse(event.data);
      switch (result.code) {
        case 'NW1001':
          init(result.data);
          break;
        case 'NW1002':
          getHistory();
          break;
        case 'NW1003':
          changePlatform(result.data);
          break;
        case 'NW1007':
          setCookie(result.data);
          break;
        case 'NW1009':
          submitJykTask(result.data);
          break;
        case 'NW1010':
          getJykTask();
          break;
        case 'NW1011':
          console.log(7890);
          // 退出登录
          clearAuthCookie();
          break;
        default:
          submitBD(result);
          break;
      }
    },
    false
  );
  function login() {
    var tel = $('.phone-input').val();
    var code = $('.msg-pin-input').val();
    let obj = {
      code: 'WN1007',
      data: {
        tel: tel,
        code: code
      },
      msg: '原生获取登录jsessionid值'
    };
    window.postMessage(JSON.stringify(obj));
  }
  function init(cookies) {
    insertCSS(
      `html{-webkit-user-select:none;}body{cursor:default;-webkit-tap-highlight-color:rgba(255,0,0,0.5) !important;}.login .login-btn{background-color: ${themeColor};}.login .msg-pin-btn{border: 1px solid ${themeColor};color:${themeColor};}`
    );
    $('.msg-pin-input')
      .attr('type', 'number')
      .attr('pattern', '[0-9]*')
      .attr('oninput', 'if(value.length>4)value=value.slice(0,4)');
    $('.J_login-btn').off('click');
    $('.J_login-btn').on('click', login);
    setCookie(cookies);
    ajax();
    setInterval(ajax, 4500); // 1.2s执行一次
    getHistory();
    getJykTask();
    // 页面心跳，保证页面长时间执行定时器，卡死问题
    setInterval(() => {
      window.location.reload();
    }, 1000 * 60 * 15);
  }
};

export default `(${inject.toString()})(window, Zepto);`;
