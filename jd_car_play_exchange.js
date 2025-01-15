/*
头文字J

兑换

变量:export jd_car_play_exchangeid="兑换ID"

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#头文字J
11 11 11 11 * jd_car_play_exchange.js, tag=头文字J兑换, enabled=true
*/
const $ = new Env("头文字J兑换");
const _0x1aa198 = $.isNode() ? require("./jdCookie.js") : "",
    _0x583d67 = $.isNode() ? require("./sendNotify") : "",
    _0x42fc6a = require("./function/krgetToken");

CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let _0x3f2ba4 = [],
    _0x18f1b8 = "";
$.isNode() ? (Object.keys(_0x1aa198).forEach(_0x1ebec4 => {
    _0x3f2ba4.push(_0x1aa198[_0x1ebec4]);
}), process.env.JD_DEBUG && process.env.JD_DEBUG === "false" && (console.log = () => { })) : _0x3f2ba4 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3a88ab($.getdata("CookiesJD") || "[]").map(_0x1d84ee => {
    return _0x1d84ee.cookie;
})].filter(_0x4ea0c0 => {
    return !!_0x4ea0c0;
});

const _0x1f52fb = new Date();

_0x1f52fb.setHours(10, 0, 0, 0);

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.prizeInfoId = process.env.jd_car_play_exchangeid ? process.env.jd_car_play_exchangeid : "10082bd15b4707";
!(async () => {
    if (!_0x3f2ba4[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    $.appkey = "21699045";
    $.userId = "10299171";
    $.actId = "1760007";
    $.MixNicks = "";
    $.inviteNick = "";
    await _0xd3b331();

    for (let _0xdb532f = 0; _0xdb532f < _0x3f2ba4.length; _0xdb532f++) {
        _0x18f1b8 = _0x3f2ba4[_0xdb532f];

        if (_0x18f1b8) {
            $.UserName = decodeURIComponent(_0x18f1b8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x18f1b8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0xdb532f + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            $.UA = await _0x1d6675();
            await _0x5597ee();
            if ($.outFlag || $.activityEnd) break;
        }
    }

    if ($.outFlag) {
        let _0x16fe2f = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x16fe2f);
        $.isNode() && (await _0x583d67.sendNotify("" + $.name, "" + _0x16fe2f));
    }
})().catch(_0x413ed3 => {
    return $.logErr(_0x413ed3);
}).finally(() => {
    return $.done();
});

async function _0x5597ee() {
    try {
        $.hasEnd = true;
        $.endTime = 0;
        lz_jdpin_token_cookie = "";
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";
        if ($.activityEnd) return;

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        $.Token = await _0x42fc6a(_0x18f1b8, "https://mpdz-car-dz.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取[token]失败！");
            return;
        }

        await _0x3afb65("activity_load");

        if ($.hotFlag) {
            return;
        }

        if ($.MixNick == "") {
            console.log("获取cookie失败");
            return;
        }

        console.log("目前分值：" + $.remainPoint);

        if ($.index == 1) {
            await _0x3afb65("exchangeLoad");

            for (const _0x153bae of $.awardSettings) {
                console.log("");
                console.log("奖品：" + _0x153bae.awardName + "  积分：" + _0x153bae.awardDes + "  库存：" + _0x153bae.remainNum + "  兑换ID：" + _0x153bae.id);
            }
        }

        let _0x6e2b75 = _0x1f52fb.getTime() - Date.now() + ($.difftime || 0);

        await $.wait(_0x6e2b75);

        if ($.prizeInfoId) {
            console.log("");
            await _0x3afb65("exchangeJdMarket");
        } else {
            console.log("");
            console.log("未填写兑换ID，退出运行");
            $.activityEnd = true;
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } catch (_0x12afa1) {
        console.log(_0x12afa1);
    }
}

async function _0x3afb65(_0x3da50b) {
    if ($.outFlag) {
        return;
    }

    let _0xa6257e = "https://mpdz-car-dz.isvjcloud.com",
        _0x126373 = "",
        _0x54815f = "POST",
        _0xfe87ac = "";

    switch (_0x3da50b) {
        case "activity_load":
            url = _0xa6257e + "/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&push_way=1&user_id=" + $.userId;
            _0xfe87ac = {
                "jdToken": $.Token,
                "inviteNick": $.inviteNick || ""
            };
            $.joinVenderId && (_0xfe87ac = {
                ..._0xfe87ac,
                "shopId": "" + $.joinVenderId
            });
            _0x126373 = _0x2e70cd("/jdCardRunning/activity/load", _0xfe87ac);
            break;

        case "exchangeLoad":
            url = _0xa6257e + "/dm/front/jdCardRunning/exchange/exchangeLoad?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
            _0xfe87ac = {};
            _0x126373 = _0x2e70cd("/jdCardRunning/exchange/exchangeLoad", _0xfe87ac);
            break;

        case "exchangeJdMarket":
            url = _0xa6257e + "/dm/front/jdCardRunning/exchange/exchangeJdMarket?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
            _0xfe87ac = {
                "awardId": $.prizeInfoId
            };
            _0x126373 = _0x2e70cd("/jdCardRunning/exchange/exchangeJdMarket", _0xfe87ac);
            break;

        default:
            console.log("错误" + _0x3da50b);
    }

    let _0x41b466 = _0x2d75b5(url, _0x126373, _0x54815f);

    return new Promise(async _0x2fde84 => {
        $.post(_0x41b466, (_0x4dfadb, _0xf2c110, _0x51301f) => {
            try {
                _0x4dfadb ? (_0xf2c110 && _0xf2c110.statusCode && _0xf2c110.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(_0x4dfadb, _0x4dfadb)), console.log(_0x3da50b + " API请求失败，请检查网路重试")) : _0x2af3c9(_0x3da50b, _0x51301f);
            } catch (_0x32a6fa) {
                console.log(_0x32a6fa, _0xf2c110);
            } finally {
                _0x2fde84();
            }
        });
    });
}

async function _0x2af3c9(_0x45a2f7, _0x49d148) {
    let _0x34f0d4 = "";

    try {
        (_0x45a2f7 != "accessLogWithAD" || _0x45a2f7 != "drawContent") && _0x49d148 && (_0x34f0d4 = JSON.parse(_0x49d148));
    } catch (_0x1a938c) {
        console.log(_0x45a2f7 + " 执行任务异常");
        $.runFalag = false;
    }

    try {
        let _0x5112ed = "";

        switch (_0x45a2f7) {
            case "exchangeLoad":
                if (typeof _0x34f0d4 == "object") {
                    if (_0x34f0d4.success && _0x34f0d4.success === true && _0x34f0d4.data) {
                        _0x34f0d4.data.status && _0x34f0d4.data.status == 200 && ($.awardSettings = _0x34f0d4.data.data.awardSettings || []);
                    } else {
                        if (_0x34f0d4.message) {
                            console.log(_0x45a2f7 + " " + (_0x34f0d4.message || ""));
                        } else {
                            console.log(_0x49d148);
                        }
                    }
                } else console.log(_0x49d148);

                break;

            case "accessLogWithAD":
            case "drawContent":
                break;

            case "activity_load":
            case "exchangeJdMarket":
                _0x5112ed = "";

                if (typeof _0x34f0d4 == "object") {
                    if (_0x34f0d4.success && _0x34f0d4.success === true && _0x34f0d4.data) {
                        if (_0x34f0d4.data.status && _0x34f0d4.data.status == 200) {
                            _0x34f0d4 = _0x34f0d4.data;
                            _0x45a2f7 != "setMixNick" && (_0x34f0d4.msg || _0x34f0d4.data.isOpenCard || _0x34f0d4.data.remark) && console.log("" + (_0x5112ed && _0x5112ed + ":" || "") + (_0x34f0d4.msg || _0x34f0d4.data.isOpenCard || _0x34f0d4.data.remark || ""));

                            if (_0x45a2f7 == "activity_load") {
                                if (_0x34f0d4.data) {
                                    $.endTime = _0x34f0d4.data.cusActivity.endTime || 0;
                                    $.MixNick = _0x34f0d4.data.missionCustomer.buyerNick || "";
                                    $.hasCollectShop = _0x34f0d4.data.missionCustomer.hasCollectShop || 0;
                                    $.totalPoint = _0x34f0d4.data.missionCustomer.totalPoint || 0;
                                    $.remainPoint = _0x34f0d4.data.missionCustomer.remainPoint || 0;
                                    $.remainChance = _0x34f0d4.data.missionCustomer.remainChance || 0;
                                }
                            } else _0x45a2f7 == "shopList" ? ($.openList = _0x34f0d4.data.cusShopList || [], renwulists = _0x34f0d4.data.data || []) : _0x45a2f7 == "missionInviteList" && console.log("邀请人数(" + _0x34f0d4.data.total + ")");
                        } else {
                            if (_0x34f0d4.data.msg) {
                                _0x34f0d4.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                                console.log("" + (_0x34f0d4.data.msg || ""));
                            } else {
                                if (_0x34f0d4.errorMessage) {
                                    if (_0x34f0d4.errorMessage.indexOf("火爆") > -1) { }

                                    console.log("" + (_0x34f0d4.errorMessage || ""));
                                } else console.log("" + _0x49d148);
                            }
                        }
                    } else _0x34f0d4.errorMessage ? console.log("" + (_0x34f0d4.errorMessage || "")) : console.log("" + _0x49d148);
                } else console.log("" + _0x49d148);

                break;

            default:
                console.log("" + _0x49d148);
        }

        if (typeof _0x34f0d4 == "object") {
            if (_0x34f0d4.errorMessage) {
                if (_0x34f0d4.errorMessage.indexOf("火爆") > -1) { }
            }
        }
    } catch (_0x16dbf1) { }
}

function _0x2d75b5(_0x37d1fe, _0x4752a5, _0x4b6ccf = "POST") {
    let _0x39fb6c = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x18f1b8,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    return _0x37d1fe.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1 && (_0x39fb6c.Origin = "https://mpdz-car-dz.isvjcloud.com", _0x39fb6c.host = "mpdz-car-dz.isvjcloud.com", _0x39fb6c["Content-Type"] = "application/json;charset=utf-8", delete _0x39fb6c.Cookie), {
        "url": _0x37d1fe,
        "method": _0x4b6ccf,
        "headers": _0x39fb6c,
        "body": _0x4752a5,
        "timeout": 60000
    };
}

function _0x2e70cd(_0x289356, _0x189f09) {
    d = {
        "actId": $.actId,
        ..._0x189f09,
        "method": _0x289356,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    sign2 = _0xb77bd6(d);
    const _0x132049 = {
        "jsonRpc": "2.0",
        "params": {
            "commonParameter": {
                "m": "POST",
                "sign": sign2.sign,
                "timestamp": sign2.timeStamp,
                "userId": $.userId
            },
            "admJson": {
                "actId": $.actId,
                ..._0x189f09,
                "method": _0x289356,
                "userId": $.userId,
                "buyerNick": $.MixNick || ""
            }
        }
    };
    return _0x289356.indexOf("missionInviteList") > -1 && delete _0x132049.params.admJson.actId, $.toStr(_0x132049, _0x132049);
}

function _0x4c38e1(_0x2e547e, _0x2f7c02) {
    return Math.floor(Math.random() * (_0x2f7c02 - _0x2e547e)) + _0x2e547e;
}

function _0xb77bd6(_0x53fe28) {
    time2 = new Date().valueOf();
    s2 = encodeURIComponent(JSON.stringify(_0x53fe28));
    c = new RegExp("'", "g");
    A = new RegExp("~", "g");
    s2 = s2.replace(c, "%27");
    s2 = s2.replace(A, "%7E");
    signBody = "k9mbrALjx4pLq5sgpO" + s2 + "z" + time2 + "xgwky6n09be8ih0x63s9i5zwdfdmou00";
    sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
    return {
        "sign": sign,
        "timeStamp": time2
    };
}

function _0xd3b331() {
    return new Promise(_0x496a4a => {
        const _0x590a90 = {
            "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
            "headers": {
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x590a90, (_0x24bb8c, _0x3e6f44, _0x1fa12b) => {
            try {
                _0x1fa12b && (_0x1fa12b = JSON.parse(_0x1fa12b), $.difftime = Date.now() - _0x1fa12b.timestamp);
            } catch (_0x13783a) {
                console.log(_0x13783a);
            } finally {
                _0x496a4a();
            }
        });
    });
}

async function _0x1d6675() {
    id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
    CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";

    const _0x4fa074 = CryptoJS.enc.Utf8.parse(id),
        _0x407c98 = CryptoJS.enc.Base64.stringify(_0x4fa074);

    return ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "EG==",
            "ad": _0x407c98,
            "od": "",
            "ov": "Ctq=",
            "ud": _0x407c98
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}

function _0x3a88ab(_0x5aa71e) {
    if (typeof _0x5aa71e == "string") try {
        return JSON.parse(_0x5aa71e);
    } catch (_0x2166aa) {
        return console.log(_0x2166aa), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

