/*
39 5 * * * jd_seckillViewTask.js
 */
let lnrun = 0;
const $ = new Env('秒杀浏览商品领豆');
const _0x8168c6 = $.isNode() ? require("./sendNotify") : "",
    _0x1818a4 = $.isNode() ? require("./jdCookie.js") : "",
    _0x11856e = require("./USER_AGENTS");

let _0x429c19 = [],
    _0x4140a8 = "";

if ($.isNode()) {
    Object.keys(_0x1818a4).forEach(_0x42f83b => {
        _0x429c19.push(_0x1818a4[_0x42f83b]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x429c19 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4c4f77($.getdata("CookiesJD") || "[]").map(_0x1fb255 => _0x1fb255.cookie)].filter(_0x560dd6 => !!_0x560dd6);

!(async () => {
    if (!_0x429c19[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.UA = _0x11856e.UARAM ? _0x11856e.UARAM() : _0x11856e.USER_AGENT;
    await _0x268733();

    for (let _0x3fce56 = 0; _0x3fce56 < _0x429c19.length; _0x3fce56++) {
        if (_0x429c19[_0x3fce56]) {
            _0x4140a8 = _0x429c19[_0x3fce56];
            $.UserName = decodeURIComponent(_0x4140a8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4140a8.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x3fce56 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = _0x11856e.UARAM ? _0x11856e.UARAM() : _0x11856e.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x8168c6.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            let _0x3e8197 = await _0x3866b6("{\"taskType\": 0 }");

            if (_0x3e8197.data?.["taskThreshold"] && !_0x3e8197.data?.["awardStatus"]) {
                $.log("开始浏览商品...");

                let _0x665e44 = _0xed98da($.skulist, _0x3e8197.data.taskThreshold - _0x3e8197.data.taskProgress);

                for (let _0x449d62 of _0x665e44) {
                    console.log("浏览 " + _0x449d62);
                    _0x3e8197 = await _0x3866b6("{ \"skuId\": \"" + _0x449d62 + "\", \"taskType\": 1 }");
                    await $.wait(2000);
                }

                _0x3e8197 = await _0x3866b6("{\"taskType\": 2 }");
                _0x3e8197.data?.["awardStatus"] ? console.log("浏览完成，获得 " + _0x3e8197.data.beanNum + "豆") : console.log(JSON.stringify(_0x3e8197));
            } else $.log("今日已完成浏览！！！");

            await $.wait(3000);
        }
    }
})().catch(_0x111a5f => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x111a5f + "!", "");
}).finally(() => {
    $.done();
});

async function _0x268733() {
    let _0x5a9381 = {
        "url": "https://pro.m.jd.com/mall/active/Md9FMi1pJXg2q7qc8CmE9FNYDS4/index.html",
        "headers": {
            "User-Agent": $.UA
        }
    };
    return new Promise(async _0x5def58 => {
        $.get(_0x5a9381, async (_0x6c7afc, _0x6519a1, _0x2cba94) => {
            try {
                _0x6c7afc ? (console.log("" + JSON.stringify(_0x6c7afc)), console.log(" API请求失败，请检查网路重试")) : (_0x2cba94 = _0x2cba94.match(/\"skuId\":\"(\d+)\"/g), $.skulist = [...new Set(_0x2cba94.map(_0x114412 => _0x114412.match(/\d+/)[0]))]);
            } catch (_0x540818) {
                $.logErr(_0x540818, _0x6519a1);
            } finally {
                _0x5def58(_0x2cba94);
            }
        });
    });
}

async function _0x3866b6(_0x51ce14) {
    let _0xe7cdc0 = {
        "url": "https://api.m.jd.com/client.action",
        "body": "appid=signed_wh5_ihub&client=android&clientVersion=" + $.UA.split(";")[2] + "&networkType=wifi&openudid=&uuid=&eu=&fv=&d_model=&body=" + _0x51ce14 + "&functionId=seckillViewTask&t=" + Date.now(),
        "headers": {
            "Origin": "https://pro.m.jd.com",
            "Referer": "https://pro.m.jd.com/mall/active/Md9FMi1pJXg2q7qc8CmE9FNYDS4/index.html",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x4140a8
        }
    };
    return new Promise(async _0x545723 => {
        $.post(_0xe7cdc0, async (_0x43a827, _0x432712, _0x4682ea) => {
            try {
                _0x43a827 ? (console.log("" + JSON.stringify(_0x43a827)), console.log(" API请求失败，请检查网路重试")) : _0x4682ea = JSON.parse(_0x4682ea);
            } catch (_0x1ebd97) {
                $.logErr(_0x1ebd97, _0x432712);
            } finally {
                _0x545723(_0x4682ea);
            }
        });
    });
}

function _0x257ede() {
    return new Promise(_0x25ef34 => {
        const _0x1e89b2 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x4140a8,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x1e89b2, (_0x1b0223, _0x24a35c, _0x51ef37) => {
            try {
                if (_0x51ef37) {
                    _0x51ef37 = JSON.parse(_0x51ef37);

                    if (_0x51ef37.islogin === "1") { } else _0x51ef37.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x10b979) {
                console.log(_0x10b979);
            } finally {
                _0x25ef34();
            }
        });
    });
}

function _0x536d9d(_0x475ca7) {
    for (let _0x18129c = _0x475ca7.length - 1; _0x18129c > 0; _0x18129c--) {
        const _0x3347b5 = Math.floor(Math.random() * (_0x18129c + 1));

        [_0x475ca7[_0x18129c], _0x475ca7[_0x3347b5]] = [_0x475ca7[_0x3347b5], _0x475ca7[_0x18129c]];
    }

    return _0x475ca7;
}

function _0xed98da(_0x227504, _0x14a368) {
    const _0x24c3ec = _0x536d9d(_0x227504),
        _0x2c1253 = [];

    for (let _0x15d5bb = 0; _0x15d5bb < _0x24c3ec.length; _0x15d5bb++) {
        if (_0x2c1253.length === _0x14a368) {
            break;
        }

        const _0x31b987 = _0x24c3ec[_0x15d5bb];
        !_0x2c1253.includes(_0x31b987) && _0x2c1253.push(_0x31b987);
    }

    return _0x2c1253;
}

function _0x4c4f77(_0x55697b) {
    if (typeof _0x55697b == "string") try {
        return JSON.parse(_0x55697b);
    } catch (_0x44ea3f) {
        return console.log(_0x44ea3f), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }