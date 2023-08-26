/*
任务，抽奖
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/8/12  不抽奖X
 */
let lnrun = 0;

const wudoutimes = '15';//连续几次没有豆就不抽奖只做任务
const $ = new Env('派对狂欢城');
const _0x5732be = $.isNode() ? require("./sendNotify") : "",
    _0x52f0ad = $.isNode() ? require("./jdCookie.js") : "",
    _0x4aec2e = require("./function/dylany.js"),
    _0x4fcb76 = require("./USER_AGENTS"),
    _0x13a2ff = require("crypto-js");

let _0x1b0834 = true,
    _0x1650c3 = [],
    _0x892ba2 = "",
    _0x5198a5 = "",
    _0x56bc5e = false,
    _0x598bbb = true;

if ($.isNode()) {
    Object.keys(_0x52f0ad).forEach(_0x5a3986 => {
        _0x1650c3.push(_0x52f0ad[_0x5a3986]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x1650c3 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3a3fa4($.getdata("CookiesJD") || "[]").map(_0x1f5835 => _0x1f5835.cookie)].filter(_0x5a8a4b => !!_0x5a8a4b);
}

!(async () => {
    if (!_0x1650c3[0]) {
        const _0x1d7921 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x1d7921);
        return;
    }

    $.log("\n当前版本：V2.0.0");
    $.log("\n问题建议TG：https://t.me/dylan_jdpro");

    for (let _0x19be98 = 0; _0x19be98 < _0x1650c3.length; _0x19be98++) {
        if (_0x1650c3[_0x19be98]) {
            _0x892ba2 = _0x1650c3[_0x19be98];
            $.UserName = decodeURIComponent(_0x892ba2.match(/pt_pin=([^; ]+)(?=;?)/) && _0x892ba2.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x19be98 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.notimes = false;
            $.airnum = 0;
            $.UA = _0x4fcb76.UARAM ? _0x4fcb76.UARAM() : _0x4fcb76.USER_AGENT;
            await _0x503476();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}

            if (!$.isLogin) {
                const _0xec3ede = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0xec3ede);
                $.isNode() && (await _0x5732be.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x5bd97e();
            await $.wait(200);
            await _0xa640f6();
            await $.wait(200);
            await _0x59795b();
            await $.wait(200);
            await _0x379b79();
            await $.wait(200);

            if ($.taskList) {
                $.log("去做任务...");

                for (let _0x5e7484 of $.taskList) {
                    if (!!_0x5e7484.assignmentName && _0x5e7484.assignmentName !== "积分兑换" && _0x5e7484.assignmentName.indexOf("抽奖奖池") == -1 && _0x5e7484.assignmentName.indexOf("加购") == -1 && _0x5e7484.assignmentName.indexOf("会员") == -1) {
                        $.log("\n----" + _0x5e7484.assignmentName);

                        if (_0x5e7484.completionFlag) {
                            $.log("----已完成");
                            continue;
                        }

                        if (_0x5e7484.ext.shoppingActivity || _0x5e7484.ext.followShop) {
                            for (let _0x5b3ef3 = 0; _0x5b3ef3 < _0x5e7484.assignmentTimesLimit - _0x5e7484.completionCnt; _0x5b3ef3++) {
                                let _0x59bfe5 = _0x5e7484.ext.shoppingActivity ? _0x5e7484.ext.shoppingActivity[_0x5b3ef3]?.["itemId"] : _0x5e7484.ext.followShop[_0x5b3ef3]?.["itemId"];

                                if (!_0x59bfe5) {
                                    _0x59bfe5 = _0x5e7484.ext.shoppingActivity ? _0x5e7484.ext.shoppingActivity[Math.floor(Math.random(0, _0x5e7484.ext.shoppingActivity.length))].itemId : _0x5e7484.ext.followShop[Math.floor(Math.random(0, _0x5e7484.ext.followShop.length))].itemId;
                                }

                                await _0x4d97e1(_0x5e7484.encryptAssignmentId, _0x59bfe5);
                                await $.wait(1000);
                            }

                            continue;
                        }

                        await _0x4d97e1(_0x5e7484.encryptAssignmentId);
                        await $.wait(500);
                    }
                }
            }

            if (_0x598bbb) {
                $.log("\n\n元宝抽奖...");

                for (let _0x131669 of Array(50)) {
                    if ($.notimes) {
                        break;
                    }

                    if ($.airnum > wudoutimes) {
                        $.log("\n\n连续无豆达到设定值, 不抽奖只做任务！！！");
                        _0x598bbb = false;
                        break;
                    }

                    await _0x32ecab();
                    await $.wait(1000);
                }
            }

            await $.wait(5000);
        }
    }
})().catch(_0x2f16b5 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2f16b5 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x5bd97e() {
    return new Promise(async _0x36ffd2 => {
        const _0xf96b5f = {
            "templateId": "790088977"
        };
        $.post(_0x1bc6f6("arvrMeta2RoomSortListByTemplateId", _0xf96b5f), async (_0xd8f514, _0x19c564, _0x13214c) => {
            try {
                _0xd8f514 ? (console.log("" + JSON.stringify(_0xd8f514)), console.log(" API请求失败，请检查网路重试")) : (_0x56bc5e && console.log(_0x13214c), _0x13214c = JSON.parse(_0x13214c), _0x13214c.code == 0 ? $.roomId = _0x13214c.data[0].roomId : console.log(_0x13214c.msg));
            } catch (_0xfb8fc1) {
                $.logErr(_0xfb8fc1, _0x19c564);
            } finally {
                _0x36ffd2(_0x13214c);
            }
        });
    });
}

async function _0xa640f6() {
    return new Promise(async _0x1099c7 => {
        $.post(_0x1bc6f6("meta2LoginGame", {
            "channel": "1",
            "roomId": $.roomId
        }), async (_0x5d9206, _0x335406, _0x5e1747) => {
            try {
                if (_0x5d9206) {
                    console.log("" + JSON.stringify(_0x5d9206));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x56bc5e && console.log(_0x5e1747);
                    _0x5e1747 = JSON.parse(_0x5e1747);

                    if (!(_0x5e1747.code == 0)) {
                        console.log(_0x5e1747.msg);
                    }
                }
            } catch (_0x262635) {
                $.logErr(_0x262635, _0x335406);
            } finally {
                _0x1099c7(_0x5e1747);
            }
        });
    });
}

async function _0x59795b() {
    const _0x30c48c = {
        "rewardType": 6,
        "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
        "appId": "app_440"
    };
    _0x30c48c = _0x3d677b(_0x30c48c);
    return new Promise(async _0x18757e => {
        $.post(_0x1bc6f6("arvr_getRequestToken", _0x30c48c), async (_0x1740d9, _0x47be4a, _0x37f0bd) => {
            try {
                _0x1740d9 ? (console.log("" + JSON.stringify(_0x1740d9)), console.log(" API请求失败，请检查网路重试")) : (_0x56bc5e && console.log(_0x37f0bd), _0x37f0bd = JSON.parse(_0x37f0bd), _0x37f0bd.code == 200 ? $.token = _0x37f0bd.data : console.log(_0x37f0bd.msg));
            } catch (_0x1da7a7) {
                $.logErr(_0x1da7a7, _0x47be4a);
            } finally {
                _0x18757e(_0x37f0bd);
            }
        });
    });
}

async function _0x379b79() {
    const _0x444009 = {
        "projectId": "1563959",
        "sourceCode": 2
    };
    _0x444009 = _0x3d677b(_0x444009);
    return new Promise(async _0x5b402c => {
        $.post(_0x1bc6f6("arvr_queryInteractiveInfo", _0x444009), async (_0x47518c, _0x31e052, _0x458384) => {
            try {
                _0x47518c ? (console.log("" + JSON.stringify(_0x47518c)), console.log(" API请求失败，请检查网路重试")) : (_0x56bc5e && console.log(_0x458384), _0x458384 = JSON.parse(_0x458384), _0x458384.subCode == 0 ? $.taskList = _0x458384.assignmentList : console.log(_0x458384.msg));
            } catch (_0x4433e1) {
                $.logErr(_0x4433e1, _0x31e052);
            } finally {
                _0x5b402c(_0x458384);
            }
        });
    });
}

async function _0x32ecab() {
    const _0x327538 = {
        "projectId": "1563959",
        "sourceCode": 2,
        "accessToken": $.token,
        "subTaskId": "o5mVnPZZChSZyaD1qcXXXfWwhEb",
        "subTaskIdSecret": true,
        "exchangeNum": 1
    };
    _0x327538 = _0x3d677b(_0x327538);
    const _0x31b66f = {
        "appId": "e5749",
        "fn": "arvr_doInteractiveAssignment",
        "body": _0x327538,
        "apid": "commonActivity",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };

    let _0x727018 = await _0x4aec2e.getbody(_0x31b66f);

    const _0x38f160 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x892ba2
    };
    const _0x4ab8b6 = {
        "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
        "body": "" + _0x727018,
        "headers": _0x38f160
    };
    return new Promise(async _0x5d344d => {
        $.post(_0x4ab8b6, async (_0x8f87a5, _0x5bfae7, _0x3f6bae) => {
            try {
                if (_0x8f87a5) {
                    console.log("" + JSON.stringify(_0x8f87a5));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x3f6bae = JSON.parse(_0x3f6bae);

                    if (_0x3f6bae.subCode == 0) {
                        if (_0x3f6bae.rewardsInfo.failRewards && _0x3f6bae.rewardsInfo.failRewards.length != 0) {
                            if (_0x3f6bae.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                                process.stdout.write("黑号，不继续抽了！");
                                $.notimes = true;
                                return;
                            }
                        }

                        if (_0x3f6bae.rewardsInfo.successRewards && JSON.stringify(_0x3f6bae.rewardsInfo.successRewards) != "{}") {
                            process.stdout.write(Object.values(_0x3f6bae.rewardsInfo.successRewards)[0][0].rewardName + " ");
                            Object.values(_0x3f6bae.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0;
                        } else {
                            process.stdout.write("空气 ");
                            $.airnum++;
                        }
                    } else {
                        _0x3f6bae.msg.includes("不足") ? (console.log(_0x3f6bae.msg), $.notimes = true) : console.log(_0x3f6bae.msg);
                    }
                }
            } catch (_0xc544f7) {
                $.logErr(_0xc544f7, _0x5bfae7);
            } finally {
                _0x5d344d(_0x3f6bae);
            }
        });
    });
}

async function _0x4d97e1(_0x49421e, _0x512e9f) {
    const _0x332bc8 = {
        "projectId": "1563959",
        "sourceCode": 2,
        "accessToken": $.token,
        "subTaskId": _0x49421e,
        "subTaskIdSecret": true,
        "itemId": _0x512e9f
    };

    if (!_0x512e9f) {
        delete _0x332bc8.itemId;
    }

    _0x332bc8 = _0x3d677b(_0x332bc8);
    const _0xc28271 = {
        "appId": "e5749",
        "fn": "arvr_doInteractiveAssignment",
        "body": _0x332bc8,
        "apid": "commonActivity",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };

    let _0x17220f = await _0x4aec2e.getbody(_0xc28271);

    const _0x54a17d = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x892ba2
    };
    const _0x39ad97 = {
        "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
        "body": "" + _0x17220f,
        "headers": _0x54a17d
    };
    return new Promise(async _0x395338 => {
        $.post(_0x39ad97, async (_0x47cf24, _0x3c5f43, _0xa7b80e) => {
            try {
                _0x47cf24 ? (console.log("" + JSON.stringify(_0x47cf24)), console.log("dotask 请求失败，请检查网路重试")) : (_0x56bc5e && console.log(_0xa7b80e), _0xa7b80e = JSON.parse(_0xa7b80e), _0xa7b80e.subCode == 0 ? _0xa7b80e.rewardsInfo.successRewards && process.stdout.write("" + _0xa7b80e.rewardsInfo.successRewards[1].quantityDetails[0].quantity + _0xa7b80e.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ") : console.log(_0xa7b80e.msg));
            } catch (_0x111da1) {
                $.logErr(_0x111da1, _0x3c5f43);
            } finally {
                _0x395338(_0xa7b80e);
            }
        });
    });
}

function _0x1bc6f6(_0x1eca8f, _0x200946) {
    const _0x9ea694 = {
        "Host": "api.m.jd.com",
        "Origin": "https://pro.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x892ba2
    };
    return {
        "url": "https://api.m.jd.com/api/" + _0x1eca8f,
        "body": "appid=commonActivity&functionId=" + _0x1eca8f + "&body=" + encodeURIComponent(JSON.stringify(_0x200946)) + "&t=" + Date.now(),
        "headers": _0x9ea694
    };
}

function _0x3d677b(_0x180019) {
    let _0x13698b = "",
        _0x5d8404 = Object.keys(_0x180019).sort(function (_0xe0b935, _0x4e1dff) {
            return _0xe0b935.localeCompare(_0x4e1dff);
        });

    for (let _0x43fd1d of _0x5d8404) {
        _0x13698b = _0x13698b.concat(_0x180019[_0x43fd1d]);
    }

    let _0x4ed999 = Date.now();

    r = "".concat("c4491f13dce9c71f").concat(_0x13698b).concat(_0x4ed999);

    let _0x1aa608 = _0x13a2ff.MD5(r).toString();

    _0x180019.timestamp = _0x4ed999;
    _0x180019.sign = _0x1aa608;
    _0x180019.signKey = "c4491f13dce9c71f";
    return _0x180019;
}

function _0x503476() {
    return new Promise(_0x2b85e9 => {
        const _0x503679 = {
            "Cookie": _0x892ba2,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x561cbf = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x503679,
            "timeout": 10000
        };
        $.get(_0x561cbf, (_0xed938e, _0x2b9ea9, _0x37a973) => {
            try {
                if (_0x37a973) {
                    _0x37a973 = JSON.parse(_0x37a973);

                    if (!(_0x37a973.islogin === "1")) {
                        _0x37a973.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x232a3c) {
                console.log(_0x232a3c);
            } finally {
                _0x2b85e9();
            }
        });
    });
}

function _0x259323() {
    return new Promise(_0x36a505 => {
        !_0x1b0834 ? $.msg($.name, "", "" + _0x5198a5) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x5198a5);

        _0x36a505();
    });
}

function _0x12f0ca(_0x1e4239) {
    try {
        if (typeof JSON.parse(_0x1e4239) == "object") {
            return true;
        }
    } catch (_0x994e26) {
        console.log(_0x994e26);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x3a3fa4(_0x3cb85e) {
    if (typeof _0x3cb85e == "string") {
        try {
            return JSON.parse(_0x3cb85e);
        } catch (_0x5c3984) {
            console.log(_0x5c3984);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }