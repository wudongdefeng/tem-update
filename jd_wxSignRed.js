/*
微信签到领红包
2 2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_wxSignRed.js
*/
let lnrun = 0;
const $ = new Env("微信签到红包-加密");
const iI1iiiI = $.isNode() ? require("./jdCookie.js") : "",
    lI1lIiiI = $.isNode() ? require("./sendNotify") : "";
let I1iI111l = [],
    l1I1l1I = "";

if ($.isNode()) {
    // var lI1liiiI = new Buffer.from("44796c616e", "Hex").toString("utf8");
    Object.keys(iI1iiiI).forEach(liIliI1 => {
        I1iI111l.push(iI1iiiI[liIliI1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") $.log = () => { };
} else {
    let iIIl1i = $.getdata("CookiesJD") || "[]";
    iIIl1i = JSON.parse(iIIl1i);
    I1iI111l = iIIl1i.map(iiIi1ii1 => iiIi1ii1.cookie);
    I1iI111l.reverse();
    I1iI111l.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    I1iI111l.reverse();
    I1iI111l = I1iI111l.filter(iIi1I1I => !!iIi1I1I);
}

!(async () => {
    if (!I1iI111l[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let illI1iiI = 0; illI1iiI < I1iI111l.length; illI1iiI++) {
        if (I1iI111l[illI1iiI]) {
            l1I1l1I = I1iI111l[illI1iiI];
            $.UserName = decodeURIComponent(l1I1l1I.match(/pt_pin=(.+?);/) && l1I1l1I.match(/pt_pin=(.+?);/)[1]);
            $.index = illI1iiI + 1;
            $.isLogin = true;
            $.nickName = "";
            await llI1lill();
            $.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await lI1lIiiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await IIlI1i1I();
        }
    }
})().catch(IIIil => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + IIIil + "!", "");
}).finally(() => {
    $.done();
});

async function IIlI1i1I() {
    try {
        await iIIliiI();
        await I1III1l1();
        await IilIill();
        let I11llil1 = await lI1lllii();
        await $.wait(1000);

        if (I11llil1) {
            if (I11llil1.completionFlag) {
                $.log("任务已完成");
                return;
            }

            $.log("开始任务--" + I11llil1.configTitle);
            await i1l1l1ii(I11llil1.itemId, I11llil1.scanAssignmentId, 0);
        }
    } catch (I1i1l1li) {
        $.logErr(I1i1l1li);
    }
}

const l1l1ii1I = require("axios"),
    lil1III1 = require("crypto-js"),
    {
        format: l11il1ll
    } = require("date-fns");

function IilIill() {
    let lii1lIi1 = "SignComponent_doSignTask",
        ilIl1111 = {
            "activityId": "10004"
        },
        illillll = lllIIli1({
            "timestamp": Date.now(),
            "body": lil1III1.SHA256(JSON.stringify(ilIl1111)).toString(),
            "functionId": lii1lIi1
        });
    return new Promise(async iiIiiiII => {
        const l1I1iili = {
            "url": "https://api.m.jd.com/signTask/doSignTask?functionId=" + lii1lIi1 + "&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={\"activityId\":\"10004\"}&h5st=" + encodeURIComponent(illillll),
            "headers": {
                "Host": "api.m.jd.com",
                "Connection": "keep-alive",
                "content-type": "application/json",
                "referer": "https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36",
                "cookie": l1I1l1I
            }
        };
        $.post(l1I1iili, (Iiili1ii, lIiil11I, lIli1lli) => {
            try {
                if (Iiili1ii) {
                    $.logErr(Iiili1ii);
                    $.log("dailysign api请求失败，请检查网路重试");
                } else {
                    if (lIli1lli) {
                        lIli1lli = JSON.parse(lIli1lli);
                        lIli1lli.subCode == 0 ? $.log("签到: " + lIli1lli.data.signDays + "天, 获得红包: " + lIli1lli.data.rewardValue + "元") : $.log(lIli1lli.message);
                    }
                }
            } catch (iilllili) {
                $.logErr(iilllili);
            } finally {
                iiIiiiII();
            }
        });
    });
}

function lI1lllii() {
    return new Promise(async i1II1111 => {
        const iii11iii = {
            "url": "https://api.m.jd.com/signTask/querySignList?functionId=SignComponent_querySignList&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={\"activityId\":\"10004\"}",
            "headers": {
                "Host": "api.m.jd.com",
                "Connection": "keep-alive",
                "content-type": "application/json",
                "referer": "https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36",
                "cookie": l1I1l1I
            }
        };
        $.post(iii11iii, (l1IlilI1, I1111l11, IIii1Ili) => {
            try {
                if (l1IlilI1) {
                    $.logErr(l1IlilI1);
                    $.log("querySignList api请求失败，请检查网路重试");
                } else {
                    if (IIii1Ili) {
                        IIii1Ili = JSON.parse(IIii1Ili);

                        if (IIii1Ili.subCode == 0) {
                            $.taskList = IIii1Ili.data.scanTaskInfo;
                            i1II1111($.taskList);
                        } else $.log(IIii1Ili.message);
                    }
                }
            } catch (l11i11II) {
                $.logErr(l11i11II);
            } finally {
                i1II1111();
            }
        });
    });
}

function i1l1l1ii(l1iii1lI, iiilIII, il1l1II1) {
    let IIllIi1l = "SignComponent_doScanTask",
        Ii1ii1il = {
            "itemId": l1iii1lI,
            "activityId": "10004",
            "scanAssignmentId": iiilIII,
            "actionType": il1l1II1
        },
        i11III1i = lllIIli1({
            "timestamp": Date.now(),
            "body": lil1III1.SHA256(JSON.stringify(Ii1ii1il)).toString(),
            "functionId": IIllIi1l
        });
    return new Promise(async ii1llII => {
        const iiii1IIi = {
            "url": "https://api.m.jd.com/scanTask/startScanTask?functionId=SignComponent_doScanTask&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={\"itemId\":\"" + l1iii1lI + "\",\"activityId\":\"10004\",\"scanAssignmentId\":\"" + iiilIII + "\",\"actionType\":" + il1l1II1 + "}&h5st=" + encodeURIComponent(i11III1i),
            "headers": {
                "Host": "api.m.jd.com",
                "Connection": "keep-alive",
                "content-type": "application/json",
                "referer": "https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36",
                "cookie": l1I1l1I
            }
        };
        $.post(iiii1IIi, (lll1Il11, I11Iiil1, iIiI1lII) => {
            try {
                if (lll1Il11) {
                    $.logErr(lll1Il11);
                    $.log("dotask api请求失败，请检查网路重试");
                } else {
                    if (iIiI1lII) {
                        iIiI1lII = JSON.parse(iIiI1lII);
                        if (il1l1II1 === 0) $.log("任务完成，获得红包: " + $.taskList.amount + "元"); else { }
                    }
                }
            } catch (II1Ill1) {
                $.logErr(II1Ill1);
            } finally {
                ii1llII();
            }
        });
    });
}

let IiIIIl1 = "",
    I11I1I1 = null;

function I1III1l1() {
    return new Promise(async liiiIIil => {
        l1l1ii1I.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
            "version": "3.0",
            "fp": $.fp,
            "appId": "9a38a",
            "timestamp": Date.now(),
            "platform": "web",
            "expandParams": ""
        }, {
            "headers": {
                "Content-Type": "application/json",
                "host": "cactus.jd.com",
                "Referer": "https://cactus.jd.com",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac"
            }
        }).then(ill1lIlI => {
            IiIIIl1 = ill1lIlI.data.data.result.tk;
            I11I1I1 = new Function("return " + ill1lIlI.data.data.result.algo)();
            liiiIIil();
        });
    });
}

function lllIIli1(liIliii1) {
    let IlIilIi = [{
        "key": "appid",
        "value": "hot_channel"
    }, {
        "key": "body",
        "value": liIliii1.body
    }, {
        "key": "functionId",
        "value": liIliii1.functionId
    }],
        IIl11I1i = "";
    IlIilIi.forEach(({
        key: lll1lIiI,
        value: liI1l1I1
    }) => {
        IIl11I1i += lll1lIiI + ":" + liI1l1I1 + "&";
    });
    IIl11I1i = IIl11I1i.slice(0, -1);
    let ilII1lIi = Date.now(),
        IIIii1 = l11il1ll(ilII1lIi, "yyyyMMddHHmmssSSS"),
        Ilili1 = I11I1I1(IiIIIl1, $.fp, IIIii1.toString(), "9a38a", lil1III1).toString(lil1III1.enc.Hex);
    return IIl11I1i = lil1III1.HmacSHA256(IIl11I1i, Ilili1).toString(lil1III1.enc.Hex), [IIIii1.toString(), $.fp, "9a38a", IiIIIl1, IIl11I1i, "3.0", ilII1lIi.toString()].join(";");
}

function llI1lill() {
    return new Promise(async li1lI1Il => {
        const l1l1lliI = {
            "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": l1I1l1I,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            }
        };
        $.post(l1l1lliI, (i1lIl1li, lIIiIIl, lIl1iiil) => {
            try {
                if (i1lIl1li) {
                    $.log("" + JSON.stringify(i1lIl1li));
                    $.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (lIl1iiil) {
                        lIl1iiil = JSON.parse(lIl1iiil);

                        if (lIl1iiil.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }

                        if (lIl1iiil.retcode === 0) {
                            $.nickName = lIl1iiil.base && lIl1iiil.base.nickname || $.UserName;
                        } else $.nickName = $.UserName;
                    } else $.log("京东服务器返回空数据");
                }
            } catch (iil111I) {
                $.logErr(iil111I, lIIiIIl);
            } finally {
                li1lI1Il();
            }
        });
    });
}

function iIIliiI() {
    let II111I11 = 12,
        Ill1i1li = "",
        llli1l = "0123456789",
        l1lIIIiI = llli1l,
        l1iIIll = Math.random() * 10 | 0,
        liI111i1;

    do {
        liI111i1 = Ii1iiI1({
            "size": 1,
            "num": llli1l
        });
        Ill1i1li.indexOf(liI111i1) == -1 && (Ill1i1li += liI111i1);
    } while (Ill1i1li.length < 3);

    for (let il11I1il of Ill1i1li.slice()) {
        l1lIIIiI = l1lIIIiI.replace(il11I1il, "");
    }

    $.fp = Ii1iiI1({
        "size": l1iIIll,
        "num": l1lIIIiI
    }) + Ill1i1li + Ii1iiI1({
        "size": II111I11 - l1iIIll,
        "num": l1lIIIiI
    }) + l1iIIll;
}

function Ii1iiI1() {
    let I1iiI11i = arguments.length > 0 ? arguments[0] : {},
        l1ill1Ii = I1iiI11i.size,
        IilIlIil = I1iiI11i.num,
        illI11Il = "";

    for (; l1ill1Ii--;) illI11Il += IilIlIil[Math.random() * IilIlIil.length | 0];

    return illI11Il;
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }