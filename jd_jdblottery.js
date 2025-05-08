/*
1 2,11 * * * jjd_jdblottery.js
*/
let lnrun = 0;

const $ = new Env('京东保福利大作战 黄金免费拿');
const _0x15089a = $.isNode() ? require("./jdCookie.js") : "",
    _0x5cc25a = $.isNode() ? require("./sendNotify") : "",
    _0x58ae7c = require("./function/dylank");

var _0x16f584 = require("form-data");

const _0x3a8dd7 = require("jsdom");

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

let _0x4c5d8e = [],
    _0x186062 = "",
    _0x117e89 = "",
    _0x1b40bb = "",
    _0x4b16b2 = {},
    _0x134f1b = 0,
    _0x49c58b = process.env.opencard_banpin || "",
    _0xed99fc = process.env["opencard" + (__filename.match(/(\d+\w?).js/) ? __filename.match(/(\d+\w?).js/)[1] : "") + "_code"] || "",
    _0x519975 = "8c12878265e14fcfbd9703ef134d28ad",
    _0x79e9a = "https://lzdz1-isv.isvjcloud.com/m/10402589/dz593951dd4c9586280076ea700f4c/";

$.activityId = "dz593951dd4c9586280076ea700f4c";
$.userId = "10402589";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.followShop = 0;
$.addCart = 0;

if ($.isNode()) {
    Object.keys(_0x15089a).forEach(_0xef7b41 => {
        _0x4c5d8e.push(_0x15089a[_0xef7b41]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x4c5d8e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x59cc9e => _0x59cc9e.cookie)].filter(_0x171897 => !!_0x171897);

_0x4c5d8e.length == 1 && _0xed99fc && (_0x519975 = _0xed99fc);
$.shareUuid = [_0x519975][_0x43e10b(0, [_0x519975].length)];
!(async () => {
    if (!_0x4c5d8e[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\nTG频道：https://t.me/dylan_jdpro");
    $.log("支持代理API");
    await _0x34f857();
    $.encdata = new $.encrypt();
    $.encdata.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyeRxpomX9iM6C/tK+q6DeHJRhTyrMgxXsbY8tigCEEJgAWz7mR2ryOldVXBE7aOXlIlODmsvBw5r2NRCdakoKnwV8pa6SCxD0kV/8CRL+MTVhl3teNVV0GP1nlWEZC5maVqJLHl7GGWUddYp19LWpWgN1YQtD3gP76aVtNyq0BQIDAQAB");

    for (let _0x28351e = 0; _0x28351e < 10; _0x28351e++) {
        _0x186062 = _0x4c5d8e[_0x28351e];
        originCookie = _0x4c5d8e[_0x28351e];

        if (_0x186062) {
            $.UserName = decodeURIComponent(_0x186062.match(/pt_pin=([^; ]+)(?=;?)/) && _0x186062.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x28351e + 1;
            $.hotFlag = false;
            $.nickName = "";
            $.isLogin = true;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (_0x49c58b.indexOf($.UserName) > -1) {
                console.log("黑名单pin,跳出！");
                continue;
            }

            _0x5acef9();

            await _0x3d1b30();

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x5cc25a.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x17662a();

            if ($.outFlag || $.activityEnd) {
                break;
            }

            await $.wait(2000);
        }

        if ($.index % 5 == 0) {
            console.log("\n休息一下，可持续发展......");
            await $.wait(parseInt(Math.random() * 2000 + 8000, 10));
        }
    }

    if ($.outFlag) {
        let _0x39b0fb = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x39b0fb);

        if ($.isNode()) {
            await _0x5cc25a.sendNotify("" + $.name, "" + _0x39b0fb);
        }
    }

    _0x117e89 && $.msg($.name, "", "" + _0x117e89);
})().catch(_0x3b44f0 => {
    return $.logErr(_0x3b44f0);
}).finally(() => {
    return $.done();
});

async function _0x17662a() {
    try {
        $.hasEnd = false;
        $.endTime = 0;
        $.followShop = 0;
        $.addCart = 0;
        $.Token = "";
        $.Pin = "";
        _0x1b40bb = "";
        $.Token = await _0x58ae7c(_0x186062, "https://lzdz1-isv.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取Token失败");
            return;
        }

        for (let _0x568f67 of Array(3)) {
            await _0x451b86();
            if (_0x1b40bb) break;
            await $.wait(1000);
        }

        if (!_0x1b40bb) {
            console.log("获取cookie失败");
            return;
        }

        if ($.activityEnd === true) {
            return;
        }

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await _0x4880cc("getMyCidPing");

        if (!$.Pin) {
            console.log("获取Pin失败");
            return;
        }

        await _0x4880cc("init");
        await _0x4880cc("accessLogWithAD");
        await _0x4880cc("getUserInfo");
        await _0x4880cc("activityContent");

        if ($.hotFlag) {
            return;
        }

        if (!$.uuid) {
            console.log("获取uid失败");
            return;
        }

        if ($.hasEnd === true || $.endTime && Date.now() > $.endTime) {
            $.activityEnd = true;
            console.log("活动结束！！！");
            return;
        } else $.index == 1 && console.log($.activityName), $.index == 1 && console.log("结束时间：" + _0x299ba0($.endTime));

        if ([...$.followPeonySetting, ...$.followShopSetting, ...$.toMainSetting].filter(_0x3cd684 => !_0x3cd684.status).length > 0) {
            $.log("去做任务获取游戏次数...");

            for (let _0x49fc34 of $.followPeonySetting) {
                if (_0x49fc34.status) continue;
                $.taskType = 6;
                $.taskValue = _0x49fc34.value;
                await _0x4880cc("saveTask");
                await $.wait(1000);
            }

            for (let _0x43a37 of $.followShopSetting) {
                if (_0x43a37.status) continue;
                $.taskType = 1;
                $.taskValue = _0x43a37.value;
                await _0x4880cc("saveTask");
                await $.wait(1000);
            }

            for (let _0x1e098f of $.toMainSetting) {
                if (_0x1e098f.status) continue;
                $.taskType = 12;
                $.taskValue = _0x1e098f.value;
                await _0x4880cc("saveTask");
                await $.wait(1000);
            }

            await _0x4880cc("activityContent");
        } else $.log("任务已全部完成!");

        $.log("\n任务完成，去游戏...");
        $.log($.gameChance + "次");

        for (let _0x292472 of Array($.gameChance)) {
            await _0x4880cc("drawContent");
            await _0x4880cc("startGame");
            await $.wait(5000);
            await _0x4880cc("endGame");
            await $.wait(2000);
            await _0x4880cc("draw");
        }

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    } catch (_0x5aa1db) {
        console.log(_0x5aa1db);
    }
}

async function _0x4880cc(_0x3d8753) {
    if ($.outFlag) {
        return;
    }

    let _0x2c26c2 = "https://lzdz1-isv.isvjcloud.com",
        _0x58001e = "",
        _0xd6f446 = "",
        _0x580431 = "POST",
        _0x5d5733 = new _0x16f584();

    switch (_0x3d8753) {
        case "isvObfuscator":
            _0xd6f446 = "https://api.m.jd.com/client.action?functionId=isvObfuscator", _0x58001e = "";
            break;

        case "getSimpleActInfoVo":
            _0xd6f446 = _0x2c26c2 + "/dz/common/getSimpleActInfoVo", _0x58001e = "activityId=" + $.activityId;
            break;

        case "getMyPing":
            _0xd6f446 = _0x2c26c2 + "/customer/getMyPing", _0x58001e = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP";
            break;

        case "getMyCidPing":
            _0xd6f446 = _0x2c26c2 + "/customer/getMyCidPing", _0x58001e = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP&activityId=" + $.activityId + "&pin=";
            break;

        case "init":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/taskact/common/init", _0x58001e = "activityId=" + $.activityId + "&dzActivityType=0&pin=";
            break;

        case "accessLogWithAD":
            _0xd6f446 = _0x2c26c2 + "/common/accessLogWithAD";
            let _0x44af6c = "https://lzdz1-isv.isvjcloud.com/m/10402589/dz593951dd4c9586280076ea700f4c/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=&utm_term=a72e6e69569f456fbf235f29a0e29a09&navh=49&stath=29&sid=&un_area=";
            _0x58001e = "venderId=" + ($.userId || "") + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x44af6c) + "&subType=app&adSource=";
            break;

        case "getUserInfo":
            _0xd6f446 = _0x2c26c2 + "/wxActionCommon/getUserInfo", _0x58001e = "pin=" + encodeURIComponent($.Pin);
            break;

        case "activityContent":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/insurance/game/activityContent", _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=";
            break;

        case "startGame":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/insurance/game/startGame", _0x5d5733.append("activityId", $.activityId), _0x5d5733.append("actorUuid", $.uuid), _0x5d5733.append("pin", encodeURIComponent($.Pin)), _0x58001e = _0x5d5733, _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid;
            break;

        case "endGame":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/insurance/game/endGame", _0x5d5733.append("pin", encodeURIComponent($.Pin)), _0x5d5733.append("activityId", $.activityId), _0x5d5733.append("actorUuid", $.uuid), _0x5d5733.append("gameId", $.encdata.encrypt($.gameId).toString()), _0x5d5733.append("score", 1), _0x58001e = _0x5d5733, _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&gameId=" + encodeURIComponent($.encdata.encrypt($.gameId).toString()) + "&score=1";
            break;

        case "drawContent":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/taskact/common/drawContent", _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
            break;

        case "saveTask":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/insurance/game/saveTask", _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&taskType=" + $.taskType + "&taskValue=" + $.taskValue;
            break;

        case "draw":
            _0xd6f446 = _0x2c26c2 + "/dingzhi/insurance/game/draw", _0x5d5733.append("activityId", $.activityId), _0x5d5733.append("actorUuid", $.uuid), _0x5d5733.append("pin", encodeURIComponent($.Pin)), _0x58001e = _0x5d5733, _0x58001e = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid;
            break;

        default:
            console.log("错误" + _0x3d8753);
    }

    let _0xd43d62 = _0x5e01b2(_0xd6f446, _0x58001e, _0x580431);

    return new Promise(async _0xe27ef9 => {
        $.dpost(_0xd43d62, async (_0xc57c4c, _0x369621, _0x5d1f54) => {
            try {
                if (_0xc57c4c) {
                    if (_0x369621 && typeof _0x369621.statusCode != "undefined") {
                        if (_0x369621.statusCode == 493) {
                            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
                            $.outFlag = true;
                        }
                    }

                    console.log("" + $.toStr(_0xc57c4c, _0xc57c4c));
                } else {
                    if (_0x5d1f54.includes("doctype") && _0x134f1b < 6) {
                        _0x134f1b++;
                        await _0x4880cc(_0x3d8753);
                        return;
                    }

                    _0x134f1b = 0;

                    _0x150754(_0x369621);

                    _0x3cbbcd(_0x3d8753, _0x5d1f54);
                }
            } catch (_0x20b062) {
                console.log(_0x20b062, _0x369621);
            } finally {
                _0xe27ef9();
            }
        });
    });
}

async function _0x3cbbcd(_0x241297, _0x259137) {
    let _0x143ace = "";

    try {
        (_0x241297 != "accessLogWithAD" || _0x241297 != "drawContent") && _0x259137 && (_0x143ace = JSON.parse(_0x259137));
    } catch (_0x175d9f) {
        console.log(_0x241297 + " 执行任务异常");
    }

    try {
        switch (_0x241297) {
            case "isvObfuscator":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.errcode == 0) {
                        typeof _0x143ace.token != "undefined" && ($.Token = _0x143ace.token);
                    } else _0x143ace.message ? console.log("isvObfuscator " + (_0x143ace.message || "")) : console.log(_0x259137);
                } else { }

                break;

            case "getSimpleActInfoVo":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true) {
                        typeof _0x143ace.data.shopId != "undefined" && ($.shopId = _0x143ace.data.shopId);
                        typeof _0x143ace.data.venderId != "undefined" && ($.venderId = _0x143ace.data.venderId);
                    } else _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137);
                } else { }

                break;

            case "init":
                if (_0x143ace.result == true && _0x143ace.data) {
                    $.userId = _0x143ace.data.userId;
                    $.venderId = _0x143ace.data.venderId;
                    $.jdActivityId = _0x143ace.data.jdActivityId;
                    $.activityType = _0x143ace.data.activityType;
                    $.endTime = _0x143ace.data.endTime;
                }

                break;

            case "getMyPing":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? (_0x143ace.data && typeof _0x143ace.data.secretPin != "undefined" && ($.Pin = _0x143ace.data.secretPin), _0x143ace.data && typeof _0x143ace.data.nickname != "undefined" && ($.nickname = _0x143ace.data.nickname)) : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "getMyCidPing":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? (_0x143ace.data && typeof _0x143ace.data.secretPin != "undefined" && ($.Pin = _0x143ace.data.secretPin), _0x143ace.data && typeof _0x143ace.data.nickname != "undefined" && ($.nickname = _0x143ace.data.nickname)) : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "getUserInfo":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? _0x143ace.data && typeof _0x143ace.data.yunMidImageUrl != "undefined" && ($.attrTouXiang = _0x143ace.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "activityContent":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true) {
                        $.activityName = _0x143ace.data.activityName;
                        $.gameChance = _0x143ace.data.gameChance || 0;
                        $.uuid = _0x143ace.data.actorUuid || "";
                        $.jdActivityId = _0x143ace.data.jdActivityId;
                        $.endTime = _0x143ace.data.endTime || _0x143ace.data.activityVo && _0x143ace.data.activityVo.endTime || _0x143ace.data.activity.endTime || 0;
                        $.hasEnd = _0x143ace.data.hasEnd || false;
                        $.shopId = _0x143ace.data.shopId;
                        $.venderId = _0x143ace.data.userId;
                        $.followPeonySetting = _0x143ace.data.followPeonySetting;
                        $.followShopSetting = _0x143ace.data.followShopSetting;
                        $.toMainSetting = _0x143ace.data.toMainSetting;
                    } else _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137);
                } else { }

                break;

            case "saveTask":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? console.log("任务完成，游戏次数+" + _0x143ace.data.addScore) : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "startGame":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? $.gameId = _0x143ace.data.gameId : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "endGame":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true) $.log("游戏完成，去抽奖..."); else {
                        _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137);
                    }
                } else { }

                break;

            case "draw":
                if (typeof _0x143ace == "object") _0x143ace.result && _0x143ace.result === true ? _0x143ace.data.wdsrvo.name ? $.log("获得 " + _0x143ace.data.wdsrvo.name) : $.log("获得 空气") : _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137); else { }
                break;

            case "followShop":
            case "viewVideo":
            case "visitSku":
            case "toShop":
            case "addSku":
            case "sign":
            case "addCart":
            case "browseGoods":
            case "startDraw":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true) {
                        if (typeof _0x143ace.data == "object") {
                            let _0x5d5529 = "",
                                _0x1b4ddd = "抽奖";
                            _0x143ace.data.addBeanNum && (_0x5d5529 = _0x143ace.data.addBeanNum + "京豆");
                            _0x143ace.data.addPoint && (_0x5d5529 += " " + _0x143ace.data.addPoint + "游戏机会");
                            if (_0x241297 == "followShop") _0x1b4ddd = "关注", _0x143ace.data.beans != "0" && (_0x5d5529 += _0x143ace.data.beans + "京豆 🐶"); else {
                                if (_0x241297 == "addSku" || _0x241297 == "addCart") _0x1b4ddd = "加购", _0x143ace.data.beans != "0" && (_0x5d5529 += _0x143ace.data.beans + "京豆 🐶"); else {
                                    if (_0x241297 == "viewVideo") _0x1b4ddd = "热门文章"; else {
                                        if (_0x241297 == "toShop") {
                                            _0x1b4ddd = "浏览店铺";
                                        } else {
                                            if (_0x241297 == "visitSku" || _0x241297 == "browseGoods") _0x1b4ddd = "浏览商品"; else {
                                                if (_0x241297 == "sign") _0x1b4ddd = "签到"; else {
                                                    let _0x272608 = typeof _0x143ace.data.drawOk === "object" && _0x143ace.data.drawOk || _0x143ace.data;

                                                    _0x5d5529 = _0x272608.drawOk == true && _0x272608.name || "";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            !_0x5d5529 && (_0x5d5529 = "空气 💨");
                            console.log(_0x1b4ddd + " 获得：" + (_0x5d5529 || _0x259137));
                        } else console.log(_0x259137);
                    } else _0x143ace.errorMessage ? ($.runFalag = false, console.log(_0x143ace.errorMessage || "")) : console.log(_0x259137);
                } else console.log(_0x259137);

                break;

            case "draw":
                console.log("draw -> " + _0x259137);
                break;

            case "drawRecord":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true) {
                        let _0x376539 = 0;

                        for (let _0x7446b2 of _0x143ace.data) {
                            let _0x2cda7d = _0x7446b2.infoType,
                                _0x49dbf2 = _0x7446b2.infoName;

                            switch (_0x2cda7d) {
                                case 6:
                                    _0x49dbf2 = Number(_0x49dbf2.replace("京豆", "")), _0x376539 += _0x49dbf2;
                                    break;

                                case 7:
                                    console.log("🎉 恭喜获得实物 " + _0x49dbf2 + " ，去活动页填写收货地址~"), await _0x5cc25a.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + _0x49dbf2 + "，去活动页填写地址领取。" + _0x79e9a);
                                    break;

                                case 13:
                                    console.log("🎉 恭喜获得" + _0x49dbf2), await _0x5cc25a.sendNotify("" + $.name, "【账号" + $.UserName + "】抽中" + _0x49dbf2);
                                    break;
                            }
                        }

                        _0x376539 > 0 && console.log("总计获得" + _0x376539 + "京豆 🥔");
                    } else _0x143ace.errorMessage ? console.log("" + (_0x143ace.errorMessage || "")) : console.log(_0x259137);
                } else console.log(_0x259137);

                break;

            case "shareRecord":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true && _0x143ace.data) {
                        $.ShareCount = _0x143ace.data.length;
                        $.log("你邀请了: " + $.ShareCount + "个");
                    } else {
                        _0x143ace.errorMessage ? console.log("" + _0x241297 + (_0x143ace.errorMessage || "")) : console.log("" + _0x241297 + _0x259137);
                    }
                } else { }

                break;

            case "assist":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true && _0x143ace.data) {
                        $.openList = [];
                        $.hasNewOpen = _0x143ace.data.openCardInfo.hasNewOpen;
                        $.openVenderId = _0x143ace.data.openCardInfo.openVenderId;
                        $.openall = _0x143ace.data.openCardInfo.openAll;
                        $.score = _0x143ace.data.openCardInfo.score;
                        $.beans = _0x143ace.data.openCardInfo.beans;
                        $.assistState = _0x143ace.data.assistState;
                        $.openList = $.shopCardList.filter(_0x180256 => {
                            return $.openVenderId.indexOf(_0x180256) == -1;
                        });
                    }
                } else { }

                break;

            case "taskInfo":
                if (typeof _0x143ace == "object") {
                    if (_0x143ace.result && _0x143ace.result === true && _0x143ace.data) {
                        let _0x3d223d = _0x143ace.data[1].settingInfo || [];

                        $.shopList = _0x143ace.data[10].settingInfo || [];
                        $.shopCardList = [];

                        if (_0x3d223d.length >= 1) {
                            for (let _0x4ad35b of _0x3d223d) {
                                $.shopCardList.push(parseInt(_0x4ad35b.value));
                            }
                        }
                    }
                } else { }

                break;

            case "taskRecord":
                if (typeof _0x143ace == "object") _0x143ace.result == true && _0x143ace.data ? ($.followShop = _0x143ace.data[20].recordCount ? _0x143ace.data[20].recordCount : 0, $.addCart = _0x143ace.data[23].recordCount ? _0x143ace.data[23].recordCount : 0, $.browseshop = _0x143ace.data[10].taskValueList) : console.log(_0x259137); else { }
                break;

            case "accessLogWithAD":
            case "drawContent":
                break;

            default:
                console.log(_0x241297 + " -> " + _0x259137);
        }

        if (typeof _0x143ace == "object") {
            _0x143ace.errorMessage && _0x143ace.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
        }
    } catch (_0x614a43) {
        console.log(_0x241297 + " " + _0x614a43);
    }
}

function _0x5e01b2(_0x5ec16e, _0xfaf7a1, _0x1d32c2 = "POST") {
    let _0x2380ff = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x186062,
        "Connection": "keep-alive",
        "User-Agent": $.UA
    };
    return _0x5ec16e.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (_0x2380ff.Referer = _0x79e9a, _0x2380ff.Cookie = _0x1b40bb, _0x2380ff.Cookie += !_0x1b40bb.includes("AUTH_C_USER") ? "AUTH_C_USER=" + ($.Pin || "") + ";" : ""), (_0x5ec16e.indexOf("endGame") > -1 || _0x5ec16e.indexOf("startGame") > -1 || _0x5ec16e.indexOf("draw") > -1) && (_0x2380ff.Origin = "https://lzdz1-isv.isvjcloud.com", _0x2380ff.Referer = "https://lzdz1-isv.isvjcloud.com/lzclient/dzgames/ParkourJDBX/index.html?activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.uuid + "&adsource=null&gameChance=" + $.gameChance, delete _0x2380ff["Content-Type"]), {
        "url": _0x5ec16e,
        "method": _0x1d32c2,
        "headers": _0x2380ff,
        "body": _0xfaf7a1,
        "timeout": 30000
    };
}

function _0x451b86() {
    return new Promise(async _0x275e43 => {
        let _0x4be140 = {
            "url": "https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token?t=" + Date.now(),
            "followRedirect": false,
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": _0x186062,
                "Referer": _0x79e9a,
                "User-Agent": $.UA
            },
            "timeout": 30000
        };
        $.dget(_0x4be140, async (_0x569197, _0x214254, _0x17722b) => {
            try {
                _0x569197 ? (_0x214254 && typeof _0x214254.statusCode != "undefined" && _0x214254.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(_0x569197))) : _0x150754(_0x214254);
            } catch (_0x3bcbb1) {
                $.logErr(_0x3bcbb1, _0x214254);
            } finally {
                _0x275e43();
            }
        });
    });
}

function _0x150754(_0x18a039) {
    if (_0x18a039.headers["set-cookie"]) {
        _0x186062 = originCookie + ";";

        for (let _0x1a248f of _0x18a039.headers["set-cookie"]) {
            _0x4b16b2[_0x1a248f.split(";")[0].substr(0, _0x1a248f.split(";")[0].indexOf("="))] = _0x1a248f.split(";")[0].substr(_0x1a248f.split(";")[0].indexOf("=") + 1);
        }

        for (const _0x1a0305 of Object.keys(_0x4b16b2)) {
            _0x186062 += _0x1a0305 + "=" + _0x4b16b2[_0x1a0305] + ";";
        }

        _0x1b40bb = _0x186062;
    }
}

async function _0x5acef9() {
    $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x29c872(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x29c872(_0x5636ca) {
    _0x5636ca = _0x5636ca || 32;
    let _0x4af244 = "abcdef0123456789",
        _0x3b7470 = _0x4af244.length,
        _0x5f577c = "";

    for (i = 0; i < _0x5636ca; i++) {
        _0x5f577c += _0x4af244.charAt(Math.floor(Math.random() * _0x3b7470));
    }

    return _0x5f577c;
}

function _0x1abd3e(_0x152360) {
    if (typeof _0x152360 == "string") {
        try {
            return JSON.parse(_0x152360);
        } catch (_0x53305d) {
            return console.log(_0x53305d), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}

function _0x43e10b(_0x5945cf, _0x139e03) {
    return Math.floor(Math.random() * (_0x139e03 - _0x5945cf)) + _0x5945cf;
}

function _0x299ba0(_0x25f9ee = +new Date()) {
    var _0x37761a = new Date(_0x25f9ee + 8 * 3600 * 1000);

    return _0x37761a.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}

async function _0x34f857() {
    const {
        JSDOM: _0x43833b
    } = _0x3a8dd7;

    let _0x2106ff = new _0x3a8dd7.ResourceLoader({
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0"
    }),
        _0x267f49 = new _0x3a8dd7.VirtualConsole(),
        _0x3d93c3 = {
            "url": "http://localhost",
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
            "runScripts": "dangerously",
            "resources": _0x2106ff,
            "includeNodeLocations": true,
            "storageQuota": 10000000,
            "pretendToBeVisual": true,
            "virtualConsole": _0x267f49
        };

    const _0x46f257 = new _0x43833b("<body><script src=\"https://lzdz1-isv.isvjcloud.com/lzclient/dzgames/ParkourJDBX/src/assets/Scripts/jsencrypt.min.93442.js\"></script></body>", _0x3d93c3);

    await $.wait(1000);

    try {
        $.encrypt = _0x46f257.window.JSEncrypt;
    } catch (_0x187081) { }
}

function _0x3d1b30() {
    return new Promise(_0x25d04 => {
        const _0x217357 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x186062,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x217357, (_0x38eba4, _0x771f94, _0x122b37) => {
            try {
                if (_0x122b37) {
                    _0x122b37 = JSON.parse(_0x122b37);

                    if (_0x122b37.islogin === "1") { } else _0x122b37.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x42ae16) {
                console.log(_0x42ae16);
            } finally {
                _0x25d04();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }