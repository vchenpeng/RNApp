
let inject = (window, $) => {
    var pid = 0;
    let uid = 0; //91286199
    function getCookie(name) {
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split("; ");//分割
        //遍历匹配
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == name) {
                return arr[1];
            }
        }
        return "";
    }
    function insertCSS(text) {
        var rule = text;
        var css = document.createElement('style');
        css.type = 'text/css';
        if (css.styleSheet) css.styleSheet.cssText = rule;
        else css.appendChild(document.createTextNode(rule));
        document.getElementsByTagName("head")[0].appendChild(css);
    }
    function ajax() {
        uid = +getCookie('_logged_');
        // if (uid > 0 && window.location.href == "https://m.beidian.com/login/fast_login.html") {
        //     window.location.replace("https://m.beidian.com/promote/price_info_detail.html");
        // }
        $.ajax({
            type: "GET",
            url: "https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.change&uid=" + uid + "&pid=" + pid,
            data: null,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                "Referer": "https://m.beidian.com/promote/price_info.html"
            },
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                if (data.success) {
                    // 存在productInfo时
                    if (data.body.productInfo) {
                        if (pid == data.body.productInfo.pid) {
                            let obj = {
                                code: "WN1001",
                                data: null,
                                msg: `出现重复商品信息`
                            };
                            window.postMessage(JSON.stringify(obj));
                        } else {
                            pid = data.body.productInfo.pid;
                            let productInfo = data.body.productInfo;
                            window.postMessage(JSON.stringify(productInfo));
                        }
                    } else if (data.body.nextPlatform) {
                        let obj = {
                            code: "WN1001",
                            data: null,
                            msg: `程序自动加入 [${data.body.nextPlatform.name}] 情报组`
                        };
                        window.postMessage(JSON.stringify(obj));
                        changePlatform(data.body.nextPlatform.code);
                    }
                } else {
                    let error = JSON.parse(data);
                    if (error.code == 1003) {
                        let obj = {
                            code: "WN1001",
                            data: null,
                            msg: "授权失败，请登录贝店"
                        };
                        window.postMessage(JSON.stringify(obj));
                    } else {
                        let obj = {
                            code: "WN1001",
                            data: null,
                            msg: error.msg
                        };
                        window.postMessage(JSON.stringify(obj));
                    }
                }
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function submitBD(params) {
        $.ajax({
            type: "POST",
            url: "https://imapi.beidian.com/server/gateway?method=voc.pricetask.submitMission",
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                "uid": uid,
                "outerUrl": params.url,
                "id": params.id
            }),
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                "Referer": "https://m.beidian.com/promote/price_info.html"
            },
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                if (data.success) {
                    console.log("提交成功");
                    getHistory();
                } else {
                    console.log("提交失败");
                }
            },
            error: (error) => {
                console.log("提交出错", error);
            }
        });
    }
    function getHistory() {
        uid = +getCookie('_logged_');
        $.ajax({
            type: "POST",
            url: "https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.history",
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                "uid": uid,
                "page": 1,
                "size": 150
            }),
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                "Referer": "https://m.beidian.com/promote/price_info.html"
            },
            xhrFields: {
                withCredentials: true
            },
            beforeSend: (xhr, settings) => {

            },
            "success": (data) => {
                let obj = {
                    code: "WN1002",
                    data: [],
                    msg: "历史提交记录"
                };
                if (data && data.total > 0) {
                    let items = data.items;
                    obj.data = items;
                    // alert(JSON.stringify(items[items.length - 2]));
                    window.postMessage(JSON.stringify(obj));
                }
            },
            "error": (error) => {
                console.log(error);
            }
        });
    }
    function changePlatform(p) {
        uid = +getCookie('_logged_');
        $.ajax({
            type: "GET",
            url: "https://imapi.beidian.com/server/gateway?method=voc.price.hunter.agency.change&uid=" + uid + "&platform=" + p,
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: null,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                "Referer": "https://m.beidian.com/promote/price_info.html"
            },
            xhrFields: {
                withCredentials: true
            },
            beforeSend: (xhr, settings) => {

            },
            "success": (data) => {
                console.log(data);
            },
            "error": (error) => {
                console.log(error);
            }
        });
    }
    document.addEventListener("message", function (event) {
        let result = JSON.parse(event.data);
        switch (result.code) {
            case "NW1001":
                init();
                break;
            case "NW1002":
                getHistory();
                break;
            case "NW1003":
                changePlatform(result.data);
                break;
            default:
                submitBD(result);
                break;
        }
    }, false);
    function init() {
        insertCSS('html{-webkit-user-select:none;}body{cursor:default;-webkit-tap-highlight-color:rgba(255,0,0,0.5) !important;}.login .login-btn{background-color: #3bafda;}.login .msg-pin-btn{border: 1px solid #3bafda;color:#3bafda;}');
        $(".msg-pin-input").attr("type", "number").attr("pattern", "[0-9]*");
        ajax();
        getHistory();
        setInterval(ajax, 3000);
    }
};

export default `(${inject.toString()})(window, Zepto);`