/**
2023/2/7  create
只积分换豆，换积分用jd_washbean.js
默认定时不执行，自行设置
33 2 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_fen2bean.js
问题建议TG -> https://t.me/dylan_jdpro
*/
let lnrun = 0;

const $ = new Env("物流积分换豆");
const _0x43cfd3 = $.isNode() ? require("./sendNotify") : "",
    _0x379fa0 = $.isNode() ? require("./jdCookie.js") : "";
let _0x2b1b05 = [],
    _0x125d65 = "",
    _0x113667;
if ($.isNode()) {
    Object.keys(_0x379fa0).forEach(_0x473cc2 => {
        _0x2b1b05.push(_0x379fa0[_0x473cc2]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x2b1b05 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x39fb52 => _0x39fb52.cookie)].filter(_0x40b818 => !!_0x40b818);
}
!(async () => {
    if (!_0x2b1b05[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    $.log("\n有问题联系TG-> https://t.me/dylan_jdpro\n");
    for (let _0x2d894c = 0; _0x2d894c < _0x2b1b05.length; _0x2d894c++) {
        if (_0x2b1b05[_0x2d894c]) {
            _0x125d65 = _0x2b1b05[_0x2d894c];
            $.UserName = decodeURIComponent(_0x125d65.match(/pt_pin=([^; ]+)(?=;?)/) && _0x125d65.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2d894c + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x5bae1c();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
            if (!$.isLogin) {
                const _0x3b1109 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x3b1109);
                $.isNode() && (await _0x43cfd3.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }
            await _0x2ba0d5();
            await $.wait(2000);
        }
    }
})().catch(_0x1f1564 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1f1564 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x2ba0d5() {
    await _0xcc707d();
    await $.wait(500);
    if ($.cu_integral == undefined) {
        console.log("未获取到积分信息，跳出！");
        return;
    }
    if ($.cu_integral >= "5000") {
        $.cu_integral = 2000;
    }
    if ($.cu_integral >= "100") {
        $.log("开始兑换" + $.cu_integral + "京豆\n");
        await _0x10213a(2, $.cu_integral);
        $.sflag && (await $.wait(1000), await _0x10213a(2, $.cu_integral));
    } else {
        {
            $.log("积分不足100，跳过兑换\n");
            return;
        }
    }
}
function _0x44da0f() {
    return new Promise(async _0x542955 => {
        const _0xca471d = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": _0x125d65,
            "Host": "wq.jd.com",
            "Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
        };
        const _0x45b439 = {
            "url": "https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=" + Date.now() + "&g_login_type=1&sceneval=2",
            "headers": _0xca471d
        };
        $.get(_0x45b439, (_0x5ebe65, _0x22dad6, _0x1067be) => {
            try {
                if (_0x5ebe65) {
                    console.log("" + JSON.stringify(_0x5ebe65));
                    console.log("getexpirebeans API请求失败，请检查网路重试");
                } else {
                    if (_0x1067be) {
                        _0x1067be = JSON.parse(_0x1067be.slice(23, -13));
                        _0x113667 = 0;
                        if (_0x1067be.ret === 0) {
                            _0x1067be.expirejingdou.forEach(_0x599855 => {
                                _0x113667 += _0x599855.expireamount;
                            });
                            $.log("近七天将过期京豆" + _0x113667 + "个\n");
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x2c9df3) {
                $.logErr(_0x2c9df3, _0x22dad6);
            } finally {
                _0x542955();
            }
        });
    });
}
function _0x98bbd8() {
    return new Promise(async _0x50ac6f => {
        $.post(_0x38ab4c("integralHistory", "[{\"pin\":\"$cooMrdGatewayUid$\", \"pageSize\":10,\"pageNo\":1}]"), (_0x1a09c2, _0x252c9d, _0x3b7aa6) => {
            try {
                if (_0x1a09c2) {
                    $.log("" + JSON.stringify(_0x1a09c2));
                    $.log(" API请求失败，请检查网路重试");
                } else {
                    _0x3b7aa6 = JSON.parse(_0x3b7aa6);
                    if (_0x3b7aa6.success) {
                        $.log("积分收支记录：");
                        let _0x3be3c8 = _0x3b7aa6.content.slice(0, 7);
                        _0x3be3c8.forEach(_0x3cd8a9 => {
                            console.log(_0x3cd8a9.sceneName + "：" + _0x3cd8a9.integration + " at " + new Date(_0x3cd8a9.createTime).toLocaleString());
                        });
                    }
                }
            } catch (_0x5757af) {
                $.log(_0x5757af, _0x252c9d);
            } finally {
                _0x50ac6f();
            }
        });
    });
}
function _0xcc707d() {
    return new Promise(async _0x12b516 => {
        $.post(_0x38ab4c("userAccount", "[{\"pin\":\"$cooMrdGatewayUid$\"}]"), (_0x208431, _0x4e34d9, _0x13fff7) => {
            try {
                _0x208431 ? ($.log("" + JSON.stringify(_0x208431)), $.log(" API请求失败，请检查网路重试")) : (_0x13fff7 = JSON.parse(_0x13fff7), _0x13fff7.success && ($.cu_integral = _0x13fff7.content.integral, $.log("当前总积分：" + $.cu_integral + "\n")));
            } catch (_0x1ec4df) {
                $.log(_0x1ec4df, _0x4e34d9);
            } finally {
                _0x12b516();
            }
        });
    });
}
function _0x10213a(_0x6b70a6, _0x35235a) {
    let _0x181997;
    $.sflag = false;
    _0x6b70a6 == 1 ? _0x181997 = "京豆兑换物流积分" : _0x181997 = "物流积分兑换京豆";
    let _0x390f7d = _0x4521be("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
        _0x178bde = "[{\"businessNo\":\"" + _0x390f7d + "\",\"title\":\"" + _0x181997 + "\",\"pin\" : \"$cooMrdGatewayUid$\",\"type\":" + _0x6b70a6 + ",\"transferNumber\":" + _0x35235a + " }]";
    return new Promise(_0x2d0ed7 => {
        $.post(_0x38ab4c("transfer", _0x178bde), (_0x57c8d0, _0x282962, _0x5ef1ca) => {
            try {
                if (_0x57c8d0) {
                    $.log(JSON.stringify(_0x57c8d0));
                    $.log("请求失败");
                } else {
                    _0x5ef1ca = JSON.parse(_0x5ef1ca);
                    if (_0x5ef1ca.code == 1) {
                        $.log("兑换成功！\n");
                    } else {
                        _0x5ef1ca.code == 2005 ? $.log("今日兑换额度已达上限，明日赶早！\n") : ($.sflag = true, console.log(JSON.stringify(_0x5ef1ca)), console.log("\n兑换失败，重试\n"));
                    }
                }
            } catch (_0xc2f3a4) {
                $.log(_0xc2f3a4, _0x282962);
            } finally {
                _0x2d0ed7();
            }
        });
    });
}
function _0x3be4b9(_0x44b275, _0x58c20f) {
    var _0x20542a = _0x44b275.slice(0),
        _0x4fbee7 = _0x44b275.length,
        _0x28f9bf = _0x4fbee7 - _0x58c20f,
        _0x38b3a6,
        _0x5d4332;
    while (_0x4fbee7-- > _0x28f9bf) {
        _0x5d4332 = Math.floor((_0x4fbee7 + 1) * Math.random());
        _0x38b3a6 = _0x20542a[_0x5d4332];
        _0x20542a[_0x5d4332] = _0x20542a[_0x4fbee7];
        _0x20542a[_0x4fbee7] = _0x38b3a6;
    }
    return _0x20542a.slice(_0x28f9bf);
}
function _0x38ab4c(_0x22f158, _0x54faaf) {
    const _0x141940 = {
        "peHfn": "*/*",
        "HmkVo": "zh-cn",
        "sLjqd": "https://jingcai-h5.jd.com/",
        "yQSlh": "gzip, deflate, br",
        "LsBfi": "{\"appid\":158,\"ticket_type\":\"m\"}",
        "wRnyc": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/16A366 Safari/604.1",
        "rWyxB": "jingcai.jd.com",
        "JQGme": "application/json, text/plain, */*"
    };
    const _0x121fb9 = {
        "Accept": _0x141940.peHfn,
        "Cookie": _0x125d65,
        "Accept-Language": _0x141940.HmkVo,
        "Referer": _0x141940.sLjqd,
        "Accept-Encoding": _0x141940.yQSlh,
        "AppParams": _0x141940.LsBfi,
        "User-Agent": _0x141940.wRnyc,
        "access": "H5",
        "LOP-DN": _0x141940.rWyxB,
        "Content-Type": "application/json;charset=utf-8"
    };
    _0x121fb9.Accept = _0x141940.peHfn;
    _0x121fb9.Cookie = _0x125d65;
    _0x121fb9["Accept-Language"] = _0x141940.HmkVo;
    _0x121fb9.Referer = _0x141940.sLjqd;
    _0x121fb9["Accept-Encoding"] = _0x141940.yQSlh;
    _0x121fb9.AppParams = _0x141940.LsBfi;
    _0x121fb9["User-Agent"] = _0x141940.wRnyc;
    _0x121fb9.access = "H5";
    _0x121fb9["LOP-DN"] = _0x141940.rWyxB;
    _0x121fb9["Accept-Language"] = _0x141940.HmkVo;
    _0x121fb9.Accept = _0x141940.JQGme;
    _0x121fb9["Content-Type"] = "application/json;charset=utf-8";
    const _0x4b5ea5 = {
        "url": "https://lop-proxy.jd.com/JingIntegralApi/" + _0x22f158,
        "headers": _0x121fb9,
        "body": _0x54faaf
    };
    return _0x4b5ea5;
}
function _0x4521be(_0x3e49cb = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x467e98 = 0) {
    return _0x3e49cb.replace(/[xy]/g, function (_0x183cdc) {
        var _0x4b968c = Math.random() * 16 | 0,
            _0x6dca43 = _0x183cdc == "x" ? _0x4b968c : _0x4b968c & 3 | 8;
        _0x467e98 ? busNo = _0x6dca43.toString(36).toUpperCase() : busNo = _0x6dca43.toString(36);
        return busNo;
    });
}
function _0x5bae1c() {
    return new Promise(async _0x48a888 => {
        const _0x482c4f = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": _0x125d65,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(_0x482c4f, (_0x8f5d4f, _0x3e9f2d, _0x484c6a) => {
            try {
                if (_0x8f5d4f) {
                    $.logErr(_0x8f5d4f);
                } else {
                    if (_0x484c6a) {
                        _0x484c6a = JSON.parse(_0x484c6a);
                        if (_0x484c6a.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }
                        _0x484c6a.retcode === 0 && _0x484c6a.data && _0x484c6a.data.hasOwnProperty("userInfo") && ($.nickName = _0x484c6a.data.userInfo.baseInfo.nickname);
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0xe90596) {
                $.logErr(_0xe90596);
            } finally {
                _0x48a888();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
