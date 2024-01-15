/*

*/
let lnrun = 0;

const $ = new Env('接龙车抢888元超市卡')
const _0x1230e8 = $.isNode() ? require("./jdCookie.js") : "",
    _0x4b08a1 = $.isNode() ? require("./sendNotify") : "",
    _0x49cc9b = require("./function/dylank"),
    _0x53aa2c = require("./function/dylany");

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

let _0x593304 = [],
    _0x1c2ccb = "",
    _0x3960be = "",
    _0x473ee3 = "",
    _0x15beb1 = {},
    _0x3a4920 = 0,
    _0x24aad4 = process.env.OPENCARD || "",
    _0x58cbff = "https://pro.m.jd.com/mall/active/27HMs4YePQRF5GtsWJREUVira5M9/index.html";

$.activityId = "dzde1239fd45a590fdfb19baa3d339";
$.userId = "1000004064";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.followShop = 0;
$.addCart = 0;

if ($.isNode()) {
    Object.keys(_0x1230e8).forEach(_0x1fac22 => {
        _0x593304.push(_0x1230e8[_0x1fac22]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x593304 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x1daa02 => _0x1daa02.cookie)].filter(_0x1003f0 => !!_0x1003f0);

!(async () => {
    if (!_0x593304[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("入口 ：搜接龙");
    $.log("默认不开卡 OPENCARD ='true'开启");
    $.log("代理API DY_PROXY='apiurl'");

    let _0x191ff0 = "";

    if (_0x191ff0 == "") $.shareUuid = "", $.sid = ""; else {
        $.shareUuid = "";
        $.sid = _0x191ff0.data[Math.floor(Math.random() * _0x191ff0.data.length)];
        $.ver = _0x191ff0.ver;
    }

    for (let _0x38cc36 = 0; _0x38cc36 < _0x593304.length; _0x38cc36++) {
        _0x1c2ccb = _0x593304[_0x38cc36];
        originCookie = _0x593304[_0x38cc36];

        if (_0x1c2ccb) {
            $.UserName = decodeURIComponent(_0x1c2ccb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1c2ccb.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x38cc36 + 1;
            $.hotFlag = false;
            $.nickName = "";
            $.isLogin = true;
            $.stop = false;
            $.empty = 0;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            _0x2dc216();

            await _0x2b65f1();

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x4b08a1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x57c84d();
            if ($.outFlag || $.activityEnd) break;
            await $.wait(2000);
        }

        $.index % 5 == 0 && (console.log("\n休息一下，可持续发展......"), await $.wait(parseInt(Math.random() * 2000 + 8000, 10)));
    }

    if ($.outFlag) {
        let _0x490bdb = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x490bdb);
        $.isNode() && (await _0x4b08a1.sendNotify("" + $.name, "" + _0x490bdb));
    }

    _0x3960be && $.msg($.name, "", "" + _0x3960be);
})().catch(_0x4e24a4 => {
    return $.logErr(_0x4e24a4);
}).finally(() => {
    return $.done();
});

async function _0x57c84d() {
    try {
        $.hasEnd = false;
        $.endTime = 0;
        $.followShop = 0;
        $.addCart = 0;
        $.Token = "";
        $.Pin = "";
        _0x473ee3 = "";
        $.Token = await _0x49cc9b(_0x1c2ccb, "https://lzdz4-isv.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取Token失败");
            return;
        }

        for (let _0x6e18f4 of Array(3)) {
            await _0x34b5a7();
            if (_0x473ee3) break;
            await $.wait(1000);
        }

        if (!_0x473ee3) {
            console.log("获取cookie失败");
            return;
        }

        if ($.activityEnd === true) return;

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await _0x55dd78("getMyCidPing");

        if (!$.Pin) {
            console.log("获取Pin失败");
            return;
        }

        await _0x55dd78("init");
        await _0x55dd78("accessLogWithAD");
        await _0x55dd78("getUserInfo");
        await _0x55dd78("firstContent");
        await _0x55dd78("activityContent");
        if ($.hotFlag) return;

        if (!$.uuid) {
            console.log("获取uid失败");
            return;
        }

        if ($.hasEnd === true || $.endTime && Date.now() > $.endTime) {
            $.activityEnd = true;
            console.log("活动结束！！！");
            return;
        } else $.index == 1 && console.log($.activityName), $.index == 1 && console.log("结束时间：" + _0x2a4cfc($.endTime));

        if ($.ver !== 0 && $.index == $.ver) {
            let _0x5038a2 = $.shareUuid;
            $.shareUuid = $.sid;
            await _0x55dd78("assist");
            $.shareUuid = _0x5038a2;
            await $.wait(500);
        }

        $.shareUuid && (await _0x55dd78("assist"));
        console.log("去签到和任务...");
        $.taskType = 0;
        $.taskValue = 0;
        await _0x55dd78("saveTask");

        for (let _0x5da9ad of $.taskList) {
            if (_0x5da9ad.status) continue;
            $.taskType = 12;
            $.taskValue = _0x5da9ad.value;
            console.log("" + _0x5da9ad.name);
            await _0x55dd78("saveTask");
            await $.wait(1000);
        }

        if (!$.openMap.openCard && _0x24aad4 == "true") {
            console.log("\n去开卡...");
            $.openCard = false;
            $.shopactivityId = "";
            $.joinVenderId = $.openMap.venderId;

            for (let _0x267b5a of Array(3)) {
                await _0x4156bc();
                if ($.errorJoinShop.indexOf("失败") == -1 || $.errorJoinShop.indexOf("火爆") == -1) break;
                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }

            if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                console.log("可能开卡黑了,跳出");
                return;
            }

            await $.wait(parseInt(Math.random() * 1000 + 500, 10));
            await _0x55dd78("activityContent");
        } else { }

        console.log("\n去刮奖...");

        for (let _0x4c66a0 of $.mileList) {
            if (_0x4c66a0.isDraw) continue;
            _0x4c66a0.lcbScore == 5 && ($.prizeId = 1);
            _0x4c66a0.lcbScore == 10 && ($.prizeId = 2);
            _0x4c66a0.lcbScore == 30 && ($.prizeId = 3);
            await _0x55dd78("mileStoneDraw");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }

        for (let _0x22c1d6 of Array(500)) {
            await _0x55dd78("stockDraw");
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
            if ($.stop || $.empty > 2) break;
        }

        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
        $.shareUuid && console.log("\n去助力 -> " + $.shareUuid);
        $.shareUuid && console.log($.assistState === 1 ? "助力成功 ✅" : $.assistState === 2 ? "已经助力过TA" : $.assistState === 23 ? "已达上限" : $.assistState === 11 ? "已助力其他用户" : $.assistState === 0 ? "不能助力自己" : "未知-" + $.assistState);
        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
        await _0x55dd78("activityContent");

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
        $.index == 1 && ($.shareUuid = $.uuid, console.log("\n后面都会助力 -> [" + $.UserName + "]" + $.shareUuid));
        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
        $.allCoach > 0 && console.log("我的车厢：" + $.allCoach + "节");
    } catch (_0x547dff) {
        console.log(_0x547dff);
    }
}

async function _0x55dd78(_0xcbc77c) {
    if ($.outFlag) {
        return;
    }

    let _0x5eff51 = "https://lzdz4-isv.isvjcloud.com",
        _0x4fde2a = "",
        _0x14f598 = "",
        _0x566334 = "POST";

    switch (_0xcbc77c) {
        case "isvObfuscator":
            _0x14f598 = "https://api.m.jd.com/client.action?functionId=isvObfuscator", _0x4fde2a = "";
            break;

        case "getSimpleActInfoVo":
            _0x14f598 = _0x5eff51 + "/dz/common/getSimpleActInfoVo", _0x4fde2a = "activityId=" + $.activityId;
            break;

        case "getMyPing":
            _0x14f598 = _0x5eff51 + "/customer/getMyPing", _0x4fde2a = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP";
            break;

        case "getMyCidPing":
            _0x14f598 = _0x5eff51 + "/customer/getMyCidPing", _0x4fde2a = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP&activityId=" + $.activityId + "&pin=";
            break;

        case "init":
            _0x14f598 = _0x5eff51 + "/dingzhi/taskact/common/init", _0x4fde2a = "activityId=" + $.activityId + "&dzActivityType=0&pin=";
            break;

        case "accessLogWithAD":
            _0x14f598 = _0x5eff51 + "/common/accessLogWithAD";

            let _0x274740 = _0x5eff51 + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.userId + "&adSource=&shareUuid=" + $.shareUuid + "&sid=&un_area=";

            _0x4fde2a = "venderId=" + ($.userId || "") + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x274740) + "&subType=app&adSource=";
            break;

        case "getUserInfo":
            _0x14f598 = _0x5eff51 + "/wxActionCommon/getUserInfo", _0x4fde2a = "pin=" + encodeURIComponent($.Pin);
            break;

        case "activityContent":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/activityContent", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=" + $.shareUuid;
            break;

        case "firstContent":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/firstContent", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname);
            break;

        case "saveTask":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/saveTask", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&taskType=" + $.taskType + "&taskValue=" + $.taskValue;
            break;

        case "stockDraw":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/stockDraw", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid;
            break;

        case "mileStoneDraw":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/mileStoneDraw", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&prizeId=" + $.prizeId;
            break;

        case "addCart":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/doTask", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid;
            break;

        case "browseGoods":
            _0x14f598 = _0x5eff51 + "/dingzhi/opencard/" + _0xcbc77c, _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);

            if (_0xcbc77c == "browseGoods") {
                _0x4fde2a += "&value=" + $.visitSkuValue;
            }

            break;

        case "browseShops":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/doTask", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.uuid + "&taskType=10&taskValue=" + $.shopId;
            break;

        case "assist":
            _0x14f598 = _0x5eff51 + "/dingzhi/jdNHJ/active/assist", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&shareUuid=" + $.shareUuid;
            break;

        case "taskInfo":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/taskInfo", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
            break;

        case "taskRecord":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/taskRecord", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.uuid + "&taskType=";
            break;

        case "sign":
        case "viewVideo":
        case "visitSku":
        case "toShop":
            break;

        case "addSku":
            _0x14f598 = _0x5eff51 + "/dingzhi/opencard/" + _0xcbc77c;
            let _0x453944 = "",
                _0x57c9ef = "";
            _0xcbc77c == "viewVideo" ? (_0x453944 = 31, _0x57c9ef = 31) : _0xcbc77c == "visitSku" ? (_0x453944 = 5, _0x57c9ef = $.visitSkuValue || 5) : _0xcbc77c == "toShop" ? (_0x453944 = 14, _0x57c9ef = $.toShopValue || 14) : _0xcbc77c == "addSku" && (_0x453944 = 2, _0x57c9ef = $.addSkuValue || 2);
            _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.uuid + "&taskType=" + _0x453944 + "&taskValue=" + _0x57c9ef;
            break;

        case "drawRecord":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/drawRecord", _0x4fde2a = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.uuid;
            break;

        case "shareRecord":
            _0x14f598 = _0x5eff51 + "/dingzhi/joinCommon/shareRecord", _0x4fde2a = "activityId=" + $.activityId + "&uuid=" + $.uuid + "&pin=" + encodeURIComponent($.Pin) + "&num=30";
            break;

        case "draw":
            _0x14f598 = _0x5eff51 + "/dingzhi/opencard/draw", _0x4fde2a = "activityId=" + $.activityId + "&uuid=" + $.uuid + "&pin=" + encodeURIComponent($.Pin);
            break;

        default:
            console.log("错误" + _0xcbc77c);
    }

    let _0xeee81a = _0x2c0858(_0x14f598, _0x4fde2a, _0x566334);

    return new Promise(async _0x243794 => {
        $.dpost(_0xeee81a, async (_0x16bd8d, _0x159cf5, _0xac4c69) => {
            try {
                if (_0x16bd8d) {
                    if (_0x159cf5 && typeof _0x159cf5.statusCode != "undefined") {
                        if (_0x159cf5.statusCode == 493) {
                            if (_0x3a4920 < 6) {
                                _0x3a4920++;
                                await _0x55dd78(_0xcbc77c);
                                return;
                            }

                            console.log("ip可能被限制，过10分钟后再执行脚本\n");
                            $.outFlag = true;
                        }
                    }

                    console.log("" + $.toStr(_0x16bd8d, _0x16bd8d));
                } else {
                    if (_0xac4c69.includes("doctype") && _0x3a4920 < 6) {
                        _0x3a4920++;
                        await _0x55dd78(_0xcbc77c);
                        return;
                    }

                    _0x3a4920 = 0;

                    _0x55aa0a(_0x159cf5);

                    _0x2fe2fd(_0xcbc77c, _0xac4c69);
                }
            } catch (_0x381cf1) {
                console.log(_0x381cf1, _0x159cf5);
            } finally {
                _0x243794();
            }
        });
    });
}

async function _0x2fe2fd(_0xa55b8d, _0x16e1db) {
    let _0x1ad14a = "";

    try {
        (_0xa55b8d != "accessLogWithAD" || _0xa55b8d != "drawContent") && _0x16e1db && (_0x1ad14a = JSON.parse(_0x16e1db));
    } catch (_0x563e29) {
        console.log(_0xa55b8d + " 执行任务异常");
    }

    try {
        switch (_0xa55b8d) {
            case "isvObfuscator":
                if (typeof _0x1ad14a == "object") _0x1ad14a.errcode == 0 ? typeof _0x1ad14a.token != "undefined" && ($.Token = _0x1ad14a.token) : _0x1ad14a.message ? console.log("isvObfuscator " + (_0x1ad14a.message || "")) : console.log(_0x16e1db); else { }
                break;

            case "getSimpleActInfoVo":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result && _0x1ad14a.result === true ? (typeof _0x1ad14a.data.shopId != "undefined" && ($.shopId = _0x1ad14a.data.shopId), typeof _0x1ad14a.data.venderId != "undefined" && ($.venderId = _0x1ad14a.data.venderId)) : _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db); else { }
                break;

            case "init":
                if (_0x1ad14a.result == true && _0x1ad14a.data) {
                    $.userId = _0x1ad14a.data.userId;
                    $.venderId = _0x1ad14a.data.venderId;
                    $.jdActivityId = _0x1ad14a.data.jdActivityId;
                    $.activityType = _0x1ad14a.data.activityType;
                    $.endTime = _0x1ad14a.data.endTime;
                }

                break;

            case "getMyPing":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result && _0x1ad14a.result === true ? (_0x1ad14a.data && typeof _0x1ad14a.data.secretPin != "undefined" && ($.Pin = _0x1ad14a.data.secretPin), _0x1ad14a.data && typeof _0x1ad14a.data.nickname != "undefined" && ($.nickname = _0x1ad14a.data.nickname)) : _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db); else { }
                break;

            case "getMyCidPing":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        if (_0x1ad14a.data && typeof _0x1ad14a.data.secretPin != "undefined") {
                            $.Pin = _0x1ad14a.data.secretPin;
                        }

                        if (_0x1ad14a.data && typeof _0x1ad14a.data.nickname != "undefined") {
                            $.nickname = _0x1ad14a.data.nickname;
                        }
                    } else {
                        if (_0x1ad14a.errorMessage) console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")); else {
                            console.log("" + _0xa55b8d + _0x16e1db);
                        }
                    }
                } else { }

                break;

            case "getUserInfo":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        if (_0x1ad14a.data && typeof _0x1ad14a.data.yunMidImageUrl != "undefined") {
                            $.attrTouXiang = _0x1ad14a.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                        }
                    } else _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db);
                } else { }

                break;

            case "activityContent":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        $.activityName = "接龙车抢888元超市卡";
                        $.uuid = _0x1ad14a.data.actorUuid || "";
                        $.jdActivityId = _0x1ad14a.data.jdActivityId;
                        $.endTime = _0x1ad14a.data.endTime || _0x1ad14a.data.activityVo && _0x1ad14a.data.activityVo.endTime || _0x1ad14a.data.activity.endTime || 0;
                        $.hasEnd = _0x1ad14a.data.hasEnd || false;
                        $.shopId = _0x1ad14a.data.shopId;
                        $.venderId = _0x1ad14a.data.userId;
                        $.allCoach = _0x1ad14a.data.allCoach;
                        $.taskList = _0x1ad14a.data.toMainSetting;
                        $.openMap = _0x1ad14a.data.openMap;
                        $.allCoach = _0x1ad14a.data.allCoach;
                        $.mileList = _0x1ad14a.data.mileList;
                    } else _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db);
                } else { }

                break;

            case "browseShops":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result && _0x1ad14a.result === true ? (_0x1ad14a.data.score > 0 || _0x1ad14a.data.beans > 0) && console.log("获得：" + (_0x1ad14a.data.beans > 0 ? _0x1ad14a.data.beans + "京豆 " : "") + (_0x1ad14a.data.score > 0 ? _0x1ad14a.data.score + "积分 " : "")) : _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db); else { }
                break;

            case "followShop":
            case "viewVideo":
            case "visitSku":
            case "toShop":
            case "addSku":
            case "sign":
            case "addCart":
            case "browseGoods":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        if (typeof _0x1ad14a.data == "object") {
                            let _0x4983dd = "",
                                _0x5c2aa8 = "抽奖";
                            _0x1ad14a.data.addBeanNum && (_0x4983dd = _0x1ad14a.data.addBeanNum + "京豆");
                            _0x1ad14a.data.addPoint && (_0x4983dd += " " + _0x1ad14a.data.addPoint + "游戏机会");
                            if (_0xa55b8d == "followShop") _0x5c2aa8 = "关注", _0x1ad14a.data.beans != "0" && (_0x4983dd += _0x1ad14a.data.beans + "京豆 🐶"); else {
                                if (_0xa55b8d == "addSku" || _0xa55b8d == "addCart") _0x5c2aa8 = "加购", _0x1ad14a.data.beans != "0" && (_0x4983dd += _0x1ad14a.data.beans + "京豆 🐶"); else {
                                    if (_0xa55b8d == "viewVideo") _0x5c2aa8 = "热门文章"; else {
                                        if (_0xa55b8d == "toShop") _0x5c2aa8 = "浏览店铺"; else {
                                            if (_0xa55b8d == "visitSku" || _0xa55b8d == "browseGoods") _0x5c2aa8 = "浏览商品"; else {
                                                if (_0xa55b8d == "sign") _0x5c2aa8 = "签到"; else {
                                                    let _0xd4dc5d = typeof _0x1ad14a.data.drawOk === "object" && _0x1ad14a.data.drawOk || _0x1ad14a.data;

                                                    _0x4983dd = _0xd4dc5d.drawOk == true && _0xd4dc5d.name || "";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            !_0x4983dd && (_0x4983dd = "空气 💨");
                            console.log(_0x5c2aa8 + " 获得：" + (_0x4983dd || _0x16e1db));
                        } else {
                            console.log(_0x16e1db);
                        }
                    } else _0x1ad14a.errorMessage ? ($.runFalag = false, console.log(_0x1ad14a.errorMessage || "")) : console.log(_0x16e1db);
                } else console.log(_0x16e1db);

                break;

            case "draw":
                console.log("draw -> " + _0x16e1db);
                break;

            case "mileStoneDraw":
            case "stockDraw":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        if (typeof _0x1ad14a.data == "object") {
                            if (_0x1ad14a.data.drawStatus) {
                                console.log("获得 " + _0x1ad14a.data.value.rewardName);
                            } else console.log("获得 空气"), $.empty++;
                        } else console.log(_0x1ad14a);
                    } else _0x1ad14a.errorMessage && (console.log(_0x1ad14a.errorMessage), $.stop = true);
                } else console.log("" + _0x16e1db);

                break;

            case "drawRecord":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true) {
                        let _0x2a1369 = 0;

                        for (let _0x412022 of _0x1ad14a.data) {
                            let _0x215ea1 = _0x412022.infoType,
                                _0x35ebb7 = _0x412022.infoName;

                            switch (_0x215ea1) {
                                case 6:
                                    _0x35ebb7 = Number(_0x35ebb7.replace("京豆", "")), _0x2a1369 += _0x35ebb7;
                                    break;

                                case 7:
                                    console.log("🎉 恭喜获得实物 " + _0x35ebb7 + " ，去活动页填写收货地址~"), await _0x4b08a1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + _0x35ebb7 + "，去活动页填写地址领取。" + _0x58cbff);
                                    break;

                                case 13:
                                    console.log("🎉 恭喜获得" + _0x35ebb7), await _0x4b08a1.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + _0x35ebb7);
                                    break;
                            }
                        }

                        _0x2a1369 > 0 && console.log("总计获得" + _0x2a1369 + "京豆 🥔");
                    } else _0x1ad14a.errorMessage ? console.log("" + (_0x1ad14a.errorMessage || "")) : console.log(_0x16e1db);
                } else console.log(_0x16e1db);

                break;

            case "shareRecord":
                if (typeof _0x1ad14a == "object") {
                    if (_0x1ad14a.result && _0x1ad14a.result === true && _0x1ad14a.data) {
                        $.ShareCount = _0x1ad14a.data.length;
                        $.log("你邀请了: " + $.ShareCount + "个");
                    } else _0x1ad14a.errorMessage ? console.log("" + _0xa55b8d + (_0x1ad14a.errorMessage || "")) : console.log("" + _0xa55b8d + _0x16e1db);
                } else { }

                break;

            case "assist":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result && _0x1ad14a.result === true && _0x1ad14a.data && ($.assistState = _0x1ad14a.data.assistStatus); else { }
                break;

            case "saveTask":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result && _0x1ad14a.result === true && _0x1ad14a.data ? console.log(_0x16e1db) : console.log(_0x1ad14a.errorMessage); else { }
                break;

            case "taskRecord":
                if (typeof _0x1ad14a == "object") _0x1ad14a.result == true && _0x1ad14a.data ? ($.followShop = _0x1ad14a.data[20].recordCount ? _0x1ad14a.data[20].recordCount : 0, $.addCart = _0x1ad14a.data[23].recordCount ? _0x1ad14a.data[23].recordCount : 0, $.browseshop = _0x1ad14a.data[10].taskValueList) : console.log(_0x16e1db); else { }
                break;

            case "accessLogWithAD":
            case "drawContent":
            case "firstContent":
                break;

            default:
                console.log(_0xa55b8d + " -> " + _0x16e1db);
        }

        typeof _0x1ad14a == "object" && _0x1ad14a.errorMessage && _0x1ad14a.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    } catch (_0xd40a74) {
        console.log(_0xa55b8d + " " + _0xd40a74);
    }
}

function _0x2c0858(_0x1d0078, _0x1d44e8, _0x31cf02 = "POST") {
    let _0x5743e7 = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x1c2ccb,
        "User-Agent": $.UA
    };
    return _0x1d0078.indexOf("https://lzdz4-isv.isvjcloud.com") > -1 && (_0x5743e7.Referer = _0x58cbff, _0x5743e7.Cookie = "AUTH_C_USER=" + ($.Pin || "") + ";" + _0x473ee3), {
        "url": _0x1d0078,
        "method": _0x31cf02,
        "headers": _0x5743e7,
        "body": _0x1d44e8,
        "timeout": 30000
    };
}

function _0x34b5a7() {
    return new Promise(async _0x329b8e => {
        let _0x32d790 = {
            "url": "https://lzdz4-isv.isvjcloud.com/wxCommonInfo/token?t=" + Date.now(),
            "followRedirect": false,
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": _0x58cbff,
                "User-Agent": $.UA
            },
            "timeout": 30000
        };
        $.dget(_0x32d790, async (_0x8ca577, _0x46ccb5, _0x1e9ce1) => {
            try {
                if (_0x8ca577) {
                    if (_0x46ccb5 && typeof _0x46ccb5.statusCode != "undefined") {
                        if (_0x46ccb5.statusCode == 493) { }
                    }

                    console.log("" + $.toStr(_0x8ca577));
                } else _0x55aa0a(_0x46ccb5);
            } catch (_0x1bf16f) {
                $.logErr(_0x1bf16f, _0x46ccb5);
            } finally {
                _0x329b8e();
            }
        });
    });
}

function _0x55aa0a(_0x1645f3) {
    if (_0x1645f3.headers["set-cookie"]) {
        _0x1c2ccb = originCookie + ";";

        for (let _0xa4df1c of _0x1645f3.headers["set-cookie"]) {
            _0x15beb1[_0xa4df1c.split(";")[0].substr(0, _0xa4df1c.split(";")[0].indexOf("="))] = _0xa4df1c.split(";")[0].substr(_0xa4df1c.split(";")[0].indexOf("=") + 1);
        }

        for (const _0x5b2406 of Object.keys(_0x15beb1)) {
            _0x1c2ccb += _0x5b2406 + "=" + _0x15beb1[_0x5b2406] + ";";
        }

        _0x473ee3 = _0x1c2ccb;
    }
}

async function _0x2dc216() {
    $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x5825d6(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x5825d6(_0x27d87f) {
    _0x27d87f = _0x27d87f || 32;
    let _0x39cf54 = "abcdef0123456789",
        _0x408ff0 = _0x39cf54.length,
        _0x40ebf9 = "";

    for (i = 0; i < _0x27d87f; i++) {
        _0x40ebf9 += _0x39cf54.charAt(Math.floor(Math.random() * _0x408ff0));
    }

    return _0x40ebf9;
}

function _0x348008(_0x549973) {
    if (typeof _0x549973 == "string") try {
        return JSON.parse(_0x549973);
    } catch (_0x4d7504) {
        return console.log(_0x4d7504), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

async function _0x4156bc() {
    if (!$.joinVenderId) return;
    return new Promise(async _0xb555d3 => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        $.shopactivityId = "";
        let _0x38ced4 = {
            "venderId": "" + $.joinVenderId + "",
            "shopId": "" + $.joinVenderId + "",
            "bindByVerifyCodeFlag": 1,
            "registerExtend": {},
            "writeChildFlag": 0,
            "channel": 406
        };
        $.shopactivityId == "" && delete _0x38ced4.activityId;
        let _0x507ce9 = {
            "appId": "27004",
            "fn": "bindWithVender",
            "body": _0x38ced4,
            "apid": "shopmember_m_jd_com",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": $.UA
        };
        _0x38ced4 = await _0x53aa2c.getbody(_0x507ce9);
        const _0x5867b1 = {
            "url": "https://api.m.jd.com/client.action?" + _0x38ced4 + "&uuid=88888",
            "headers": {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": _0x1c2ccb,
                "origin": "https://shopmember.m.jd.com/",
                "user-agent": $.UA
            },
            "timeout": 30000
        };
        $.dget(_0x5867b1, async (_0x2f5368, _0x12c406, _0x236760) => {
            try {
                _0x236760 = _0x236760 && _0x236760.match(/jsonp_.*?\((.*?)\);/) && _0x236760.match(/jsonp_.*?\((.*?)\);/)[1] || _0x236760;

                let _0x2a9c51 = $.toObj(_0x236760, _0x236760);

                if (_0x2a9c51 && typeof _0x2a9c51 == "object") {
                    if (_0x2a9c51 && _0x2a9c51.success === true) {
                        console.log("    " + _0x2a9c51.message);
                        $.errorJoinShop = _0x2a9c51.message;

                        if (_0x2a9c51.result && _0x2a9c51.result.giftInfo) {
                            for (let _0x1b7fa3 of _0x2a9c51.result.giftInfo.giftList) {
                                console.log("\u5165\u4F1A\u83B7\u5F97:" + _0x1b7fa3.discountString + _0x1b7fa3.prizeName + _0x1b7fa3.secondLineDesc);
                            }
                        }
                    } else _0x2a9c51 && typeof _0x2a9c51 == "object" && _0x2a9c51.message ? ($.errorJoinShop = _0x2a9c51.message, console.log("" + (_0x2a9c51.message || ""))) : console.log(_0x236760);
                } else console.log(_0x236760);
            } catch (_0x2849b0) {
                $.logErr(_0x2849b0, _0x12c406);
            } finally {
                _0xb555d3();
            }
        });
    });
}

async function _0x341c1d() {
    return new Promise(async _0x4883a4 => {
        let _0x8cb89b = {
            "venderId": $.joinVenderId,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "ef79a",
            "needSecurity": true,
            "bizId": "shop_view_app",
            "channel": 406
        },
            _0x28dc5a = {
                "appId": "ef79a",
                "fn": "getShopOpenCardInfo",
                "body": _0x8cb89b,
                "apid": "jd_shop_member",
                "ver": "9.2.0",
                "cl": "H5",
                "user": $.UserName,
                "code": 0,
                "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
            };
        _0x8cb89b = await _0x53aa2c.getbody(_0x28dc5a);
        const _0x4f25be = {
            "url": "https://api.m.jd.com/client.action?" + _0x8cb89b + "&uuid=88888",
            "headers": {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": _0x1c2ccb,
                "origin": "https://shopmember.m.jd.com/",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
            },
            "timeout": 60000
        };
        $.get(_0x4f25be, async (_0x46847d, _0x4ad6ec, _0x3aea6d) => {
            try {
                _0x3aea6d = _0x3aea6d && _0x3aea6d.match(/jsonp_.*?\((.*?)\);/) && _0x3aea6d.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3aea6d;

                let _0x8aab2 = $.toObj(_0x3aea6d, _0x3aea6d);

                _0x8aab2 && typeof _0x8aab2 == "object" ? _0x8aab2 && _0x8aab2.success == true && (console.log("去加入 -> " + (_0x8aab2.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x8aab2.result[0].interestsRuleList && _0x8aab2.result[0].interestsRuleList[0] && _0x8aab2.result[0].interestsRuleList[0].interestsInfo && _0x8aab2.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x3aea6d);
            } catch (_0x838e0f) {
                $.logErr(_0x838e0f, _0x4ad6ec);
            } finally {
                _0x4883a4();
            }
        });
    });
}

function _0x57bb58(_0x551866, _0x441f41) {
    return Math.floor(Math.random() * (_0x441f41 - _0x551866)) + _0x551866;
}

function _0x2a4cfc(_0x5ada5f = +new Date()) {
    var _0x351d55 = new Date(_0x5ada5f + 8 * 3600 * 1000);

    return _0x351d55.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}

function _0x5cb0d9() {
    let _0x3cd99e = {
        "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jlc",
        "timeout": 30000
    };
    return new Promise(_0x1f9ead => {
        let _0x215728 = "";
        $.get(_0x3cd99e, async (_0x3b3d86, _0x3f14c0, _0x224b13) => {
            try {
                if (_0x3b3d86) { } else {
                    if (_0x224b13) {
                        _0x224b13 = JSON.parse(_0x224b13);

                        if (_0x224b13.code === 200) {
                            _0x215728 = _0x224b13;
                        } else { }
                    }
                }
            } catch (_0x5bf7a1) {
                $.logErr(_0x5bf7a1, _0x3f14c0);
            } finally {
                _0x1f9ead(_0x215728);
            }
        });
    });
}

function _0x2b65f1() {
    return new Promise(_0x15a1d7 => {
        const _0x470fe3 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x1c2ccb,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x470fe3, (_0x2d001b, _0xa319b8, _0x3c9010) => {
            try {
                if (_0x3c9010) {
                    _0x3c9010 = JSON.parse(_0x3c9010);

                    if (_0x3c9010.islogin === "1") { } else _0x3c9010.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x2e0eb1) {
                console.log(_0x2e0eb1);
            } finally {
                _0x15a1d7();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
