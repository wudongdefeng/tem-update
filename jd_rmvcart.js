/*
1 1 1 1 * jd_rmvcart.js
 */
let lnrun = 0;
const $ = new Env('清空购物车');
const _0x44f8b9 = $.isNode() ? require("./sendNotify") : "",
    _0xf8827a = $.isNode() ? require("./jdCookie.js") : "",
    _0x1ace8b = require("./function/dylanv.js"),
    _0x1a1e1d = require("./USER_AGENTS"),
    _0x563b16 = process.env.RMVCART || "false";

let _0x216279 = true,
    _0x42a803 = [],
    _0x1aba62 = "",
    _0x1429bd = "";

if ($.isNode()) {
    Object.keys(_0xf8827a).forEach(_0x5a9663 => {
        _0x42a803.push(_0xf8827a[_0x5a9663]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x42a803 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x899685($.getdata("CookiesJD") || "[]").map(_0x7b7117 => _0x7b7117.cookie)].filter(_0x432f5a => !!_0x432f5a);

!(async () => {
    if (!_0x42a803[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    console.log("\n2024/1/4 全部清空，条件筛选暂无");

    if (_0x563b16 != "true") {
        console.log("默认不执行清空购物车，清设置变量RMVCART='true");
        return;
    }

    for (let _0x48f673 = 0; _0x48f673 < _0x42a803.length; _0x48f673++) {
        if (_0x42a803[_0x48f673]) {
            _0x1aba62 = _0x42a803[_0x48f673];
            $.UserName = decodeURIComponent(_0x1aba62.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1aba62.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x48f673 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.delList = [];
            $.UA = _0x1a1e1d.UARAM ? _0x1a1e1d.UARAM() : _0x1a1e1d.USER_AGENT;
            await _0x4b7312();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x44f8b9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x22f351();
            console.log("购物车有" + $.delList.length + "件商品");
            await $.wait(1000);
            $.delList.length != 0 ? (console.log("去清空购物车"), await _0x25432e($.delList)) : $.log("没有商品，无需清空");
            await $.wait(5000);
        }
    }
})().catch(_0x51d9d0 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x51d9d0 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x22f351(_0x1d00d7 = []) {
    let _0x3c8158 = {
        "fckr": 0,
        "templete": 1,
        "locationid": "0-0-0-0",
        "pingouchannel": 0,
        "tabMenuType": "",
        "traceid": "",
        "referer": "http://wq.jd.com/wxapp/pages/cart/cart/index",
        "appType": 1,
        "bizType": "2",
        "platform": 2,
        "externalLoginType": 1,
        "source": "wxapp",
        "djrh": 1,
        "pageId": "W_jdgwxcx_cart",
        "cartVersion": "1.0.0"
    },
        _0x5ca30a = {
            "appId": "6f459",
            "fn": "deal_mshopcart_cartview",
            "body": _0x3c8158,
            "apid": "wx_cart_new",
            "ver": "8.0.33",
            "cl": "android",
            "user": $.UserName,
            "code": 1,
            "ua": "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android"
        };
    $.fg == 1 && ($.fg = 0);
    _0x3c8158 = await _0x1ace8b.getbody(_0x5ca30a);
    if (!_0x3c8158) return;
    let _0x1c2ff5 = {
        "url": "https://api.m.jd.com/client.action/deal/mshopcart/cartview?loginType=2&clientType=wxapp&client=android&clientVersion=8.0.33&build=&networkType=wifi&lang=zh_CN&" + _0x3c8158 + "&g_ty=ls&g_tk=375929731",
        "headers": {
            "Cookie": _0x1aba62,
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/737/page-frame.html",
            "Content-Type": "application/json"
        }
    };
    return new Promise(async _0x224060 => {
        $.get(_0x1c2ff5, async (_0x5f10e1, _0x119e79, _0x1c5825) => {
            try {
                if (_0x5f10e1) console.log("" + JSON.stringify(_0x5f10e1)), console.log("cardata 请求失败，请检查网路重试"); else {
                    _0x1c5825 = JSON.parse(_0x1c5825);
                    if (_0x1c5825) for (let _0x1a3265 of _0x1c5825.cart.venderCart) {
                        for (let _0x55a3af of _0x1a3265.sortedItems) {
                            for (let _0x30b19d of _0x55a3af.polyItem.products) {
                                if (_0x1d00d7.length > 0 && _0x1d00d7.includes(_0x30b19d.mainSku.id.toString()) || _0x1d00d7.length === 0) {
                                    const _0x725a13 = _0x55a3af.polyItem?.["promotion"]?.["pid"];

                                    _0x725a13 ? $.delList.push(_0x30b19d.mainSku.id + ",," + _0x30b19d.num + "," + _0x30b19d.mainSku.id + ",11," + _0x55a3af.polyItem.promotion.pid + ",0,skuUuid:" + _0x30b19d.skuUuid + "@@useUuid:0@@isJingXi:0,,,,") : $.delList.push(_0x30b19d.mainSku.id + ",," + _0x30b19d.num + "," + _0x30b19d.mainSku.id + ",1,,0,skuUuid:" + _0x30b19d.skuUuid + "@@useUuid:0@@isJingXi:0,,,,");
                                }
                            }
                        }
                    }
                }
            } catch (_0x1580c9) {
                $.logErr(_0x1580c9, _0x119e79);
            } finally {
                _0x224060(_0x1c5825);
            }
        });
    });
}

async function _0x25432e(_0x5a1e93) {
    let _0xa53ed7 = {
        "templete": 1,
        "commlist": _0x5a1e93.join("$"),
        "type": 0,
        "checked": 0,
        "locationid": "0-0-0-0",
        "reg": 1,
        "t": 0,
        "pingouchannel": 0,
        "tabMenuType": "1",
        "traceid": "",
        "referer": "http://wq.jd.com/wxapp/pages/cart/cart/index",
        "appType": 1,
        "bizType": "2",
        "platform": 2,
        "externalLoginType": 1,
        "source": "wxapp",
        "djrh": 1,
        "pageId": "W_jdgwxcx_cart",
        "cartVersion": "1.0.0"
    },
        _0x5078ac = {
            "appId": "62c74",
            "fn": "deal_mshopcart_rmvCmdy",
            "body": _0xa53ed7,
            "apid": "wx_cart_new",
            "ver": "8.0.33",
            "cl": "android",
            "user": $.UserName,
            "code": 1,
            "ua": "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android"
        };
    $.fg == 1 && ($.fg = 0);
    _0xa53ed7 = await _0x1ace8b.getbody(_0x5078ac);
    if (!_0xa53ed7) return;
    let _0xc5a72a = {
        "url": "https://api.m.jd.com/client.action/deal/mshopcart/rmvCmdy?g_ty=ls&g_tk=375929731",
        "body": _0xa53ed7,
        "headers": {
            "Cookie": _0x1aba62,
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/737/page-frame.html"
        }
    };
    return new Promise(async _0x45ec39 => {
        $.post(_0xc5a72a, async (_0x26e09c, _0x58ab54, _0x3c3945) => {
            try {
                if (_0x26e09c) console.log("" + JSON.stringify(_0x26e09c)), console.log("cardata 请求失败，请检查网路重试"); else {
                    _0x3c3945 = JSON.parse(_0x3c3945);
                    if (_0x3c3945.errMsg) console.log(_0x3c3945.errMsg); else {
                        if (_0x3c3945.cart?.["venderCart"] && _0x3c3945.cart.venderCart.length == 0) console.log("清空成功"); else _0x3c3945.cart?.["venderCart"] && _0x3c3945.cart.venderCart.length != 0 && $.log("清空失败,重新执行试试");
                    }
                }
            } catch (_0x256376) {
                $.logErr(_0x256376, _0x58ab54);
            } finally {
                _0x45ec39(_0x3c3945);
            }
        });
    });
}

function _0x2a9386() {
    return {
        "url": "https://api.m.jd.com",
        "body": "appid=wh5&clientVersion=1.0.0&functionId=wanrentuan_superise_send&body={\"channel\":2}&area=2_2813_61130_0",
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://h5.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x1aba62
        }
    };
}

function _0x4b7312() {
    return new Promise(_0x5bea1b => {
        const _0xb5ccbb = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x1aba62,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0xb5ccbb, (_0x3684a8, _0x3a304a, _0x5953df) => {
            try {
                if (_0x5953df) {
                    _0x5953df = JSON.parse(_0x5953df);

                    if (_0x5953df.islogin === "1") { } else _0x5953df.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x2afde1) {
                console.log(_0x2afde1);
            } finally {
                _0x5bea1b();
            }
        });
    });
}

function _0x1adc9e() {
    return new Promise(_0x572d9e => {
        !_0x216279 ? $.msg($.name, "", "" + _0x1429bd) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x1429bd);

        _0x572d9e();
    });
}

function _0x45b2d6(_0x120142) {
    try {
        if (typeof JSON.parse(_0x120142) == "object") return true;
    } catch (_0x4e8a39) {
        return console.log(_0x4e8a39), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x899685(_0x2aeeaa) {
    if (typeof _0x2aeeaa == "string") {
        try {
            return JSON.parse(_0x2aeeaa);
        } catch (_0x19d1ad) {
            return console.log(_0x19d1ad), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }