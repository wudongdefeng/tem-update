/*
12 12 * * * jx_joypark_task.js
*/
let lnrun = 0;
const $ = new Env('牛牛乐园任务');
const _0x58375b = $.isNode() ? require("./jdCookie.js") : "",
    _0x4c0c37 = $.isNode() ? require("./sendNotify") : "",
    _0x6f8af6 = require("./function/dylany"),
    _0x5d1e43 = require("./USER_AGENTS");

let _0x1fe2b1 = [],
    _0x3f77c3 = "";

if ($.isNode()) {
    Object.keys(_0x58375b).forEach(_0x5b0dd9 => {
        _0x1fe2b1.push(_0x58375b[_0x5b0dd9]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x1fe2b1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1d294a($.getdata("CookiesJD") || "[]").map(_0x3985f5 => _0x3985f5.cookie)].filter(_0x3218dd => !!_0x3218dd);
}

$.invitePinTaskList = [];
$.invitePin = [];
message = "";
!(async () => {
    if (!_0x1fe2b1[0]) {
        const _0x5dcbe0 = {
            "open-url": "https://bean.m.jd.com/"
        };
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x5dcbe0);
        return;
    }

    $.log("执行流程，任务--助力");
    $.log("问题建议：https://t.me/dylan_jdpro");

    for (let _0x4b51ef = 0; _0x4b51ef < _0x1fe2b1.length; _0x4b51ef++) {
        _0x3f77c3 = _0x1fe2b1[_0x4b51ef];

        if (_0x3f77c3) {
            $.UserName = decodeURIComponent(_0x3f77c3.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f77c3.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x4b51ef + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            $.UA = _0x5d1e43.UARAM ? _0x5d1e43.UARAM() : _0x5d1e43.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

            if (!$.isLogin) {
                const _0x282b0e = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x282b0e);
                $.isNode() && (await _0x4c0c37.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            const _0x2bc242 = {
                taskId: "",
                inviteType: "",
                inviterPin: "",
                linkId: "LsQNxL7iWDlXUs6cFl-AAg"
            };
            await _0x43ea7a(_0x2bc242);
            await _0x4f0602();

            for (const _0x4b603d of $.taskList) {
                if (_0x4b603d.taskFinished && !_0x4b603d.canDrawAwardNum) {
                    continue;
                }

                _0x4b603d.taskType === "SIGN" && ($.log("" + _0x4b603d.taskTitle), await _0x5185f7(_0x4b603d.id, _0x4b603d.taskType, undefined), $.log(_0x4b603d.taskTitle + " 领取奖励"), await _0x123c16(_0x4b603d.id, _0x4b603d.taskType));

                if (_0x4b603d.taskType === "BROWSE_PRODUCT" || _0x4b603d.taskType === "BROWSE_CHANNEL" && _0x4b603d.taskLimitTimes !== 1) {
                    let _0x403a9d = await _0x5008d2(_0x4b603d.id, _0x4b603d.taskType),
                        _0x217fa1 = 5;

                    if (_0x403a9d.length === 0) {
                        let _0x198d74 = await _0x123c16(_0x4b603d.id, _0x4b603d.taskType);

                        !_0x198d74.success && ($.log(_0x4b603d.taskTitle + "|" + _0x4b603d.taskShowTitle + " 领取完成!"), _0x403a9d = await _0x5008d2(_0x4b603d.id, _0x4b603d.taskType));
                    }

                    while (_0x4b603d.taskLimitTimes - _0x4b603d.taskDoTimes > 0) {
                        if (_0x403a9d.length === 0) {
                            $.log(_0x4b603d.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(_0x4b603d.taskTitle + " " + _0x4b603d.taskDoTimes + "/" + _0x4b603d.taskLimitTimes);

                        let _0xc6f4b8 = await _0x5185f7(_0x4b603d.id, _0x4b603d.taskType, _0x403a9d[_0x217fa1].itemId, _0x403a9d[_0x217fa1].appid);

                        await $.wait(1000);

                        if (_0xc6f4b8.code === 2005 || _0xc6f4b8.code === 0) {
                            $.log(_0x4b603d.taskTitle + "|" + _0x4b603d.taskShowTitle + " 任务完成！");
                        } else {
                            $.log(_0xc6f4b8.echo + " 任务失败！");
                        }

                        _0x217fa1++;
                        _0x4b603d.taskDoTimes++;

                        if (!_0x403a9d[_0x217fa1]) {
                            break;
                        }
                    }

                    for (let _0x4d2fdf = 0; _0x4d2fdf < _0x4b603d.taskLimitTimes; _0x4d2fdf++) {
                        let _0x375d38 = await _0x123c16(_0x4b603d.id, _0x4b603d.taskType);

                        if (!_0x375d38.success) {
                            $.log(_0x4b603d.taskTitle + "|" + _0x4b603d.taskShowTitle + " 领取完成!");
                            break;
                        }
                    }
                } else {
                    if (_0x4b603d.taskType === "SHARE_INVITE") {
                        $.yq_taskid = _0x4b603d.id;

                        for (let _0x2769b1 = 0; _0x2769b1 < _0x4b603d.canDrawAwardNum; _0x2769b1++) {
                            let _0x2cd73a = await _0x123c16($.yq_taskid, "SHARE_INVITE");

                            if (!_0x2cd73a.success) {
                                break;
                            }

                            await $.wait(1000);
                            $.log("助力奖励领取成功！");
                        }
                    }
                }

                _0x4b603d.taskType === "BROWSE_CHANNEL" && _0x4b603d.taskLimitTimes === 1 && ($.log(_0x4b603d.taskTitle + "|" + _0x4b603d.taskShowTitle), await _0x381b60(_0x4b603d.id, _0x4b603d.taskType, _0x4b603d.taskSourceUrl), $.log(_0x4b603d.taskTitle + "|" + _0x4b603d.taskShowTitle + " 领取奖励"), await _0x123c16(_0x4b603d.id, _0x4b603d.taskType));
            }

            await $.wait(2000);
        }
    }

    await $.wait(2000);
    $.log("\n======开始内部互助======\n");
    $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
    let _0x3d16ae = 0;

    for (const _0x323ac0 of $.newinvitePinTaskList) {
        $.suc = 0;
        $.log("\n去助力 " + _0x323ac0);

        for (let _0x2543f1 = _0x3d16ae; _0x2543f1 < _0x1fe2b1.length; _0x2543f1++) {
            _0x3f77c3 = _0x1fe2b1[_0x2543f1];

            if (_0x3f77c3) {
                $.UserName = decodeURIComponent(_0x3f77c3.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f77c3.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x2543f1 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x5d1e43.UARAM ? _0x5d1e43.UARAM() : _0x5d1e43.USER_AGENT;
                console.log("\n******开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
                const _0x32059d = {
                    taskId: $.yq_taskid,
                    inviteType: "1",
                    inviterPin: _0x323ac0,
                    linkId: "LsQNxL7iWDlXUs6cFl-AAg"
                };

                let _0x47c105 = await _0x43ea7a(_0x32059d);

                if (_0x47c105.success) {
                    if (_0x47c105.data.helpState === 1) {
                        $.log("助力成功 " + ++$.suc);

                        if ($.suc == 5) {
                            _0x3d16ae = _0x2543f1 + 1;
                            break;
                        }
                    } else {
                        if (_0x47c105.data.helpState === 0) {
                            $.log("不能助力自己！");
                        } else {
                            if (_0x47c105.data.helpState === 2) {
                                $.log("已助力过TA！");
                            } else {
                                if (_0x47c105.data.helpState === 3) {
                                    $.log("没有助力次数了！");
                                } else {
                                    if (_0x47c105.data.helpState === 4) {
                                        $.log("对方助力已满！");
                                        _0x3d16ae = _0x2543f1;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    $.log("数据异常 助力失败！\n\n");
                }

                await $.wait(2000);
            }
        }

        if ($.index === _0x1fe2b1.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }
})().catch(_0x14feee => $.logErr(_0x14feee)).finally(() => $.done());

async function _0x43ea7a(_0x56038a) {
    const _0x3fac30 = {
        appId: "4abce",
        fn: "joyBaseInfo",
        body: _0x56038a,
        apid: "activities_platform",
        ver: "3.8.20",
        cl: "ios",
        user: $.UserName,
        code: 0,
        ua: $.UA
    };
    _0x56038a = await _0x6f8af6.getbody(_0x3fac30);
    return new Promise(async _0x2ead5c => {
        let _0xb6e8d9 = _0x584b0a(_0x56038a, "joyBaseInfo", "4abce");

        $.post(_0xb6e8d9, async (_0x45acc4, _0x325cc6, _0x45b2a4) => {
            try {
                if (_0x45acc4) {
                    console.log("" + JSON.stringify(_0x45acc4));
                    console.log("getJoyBaseInfo API请求失败，请检查网路重试");
                } else {
                    _0x45b2a4 = JSON.parse(_0x45b2a4);

                    if (_0x45b2a4.success) {
                        $.invitePin.push(_0x45b2a4.data.invitePin);
                    } else {
                        $.log(_0x45b2a4.errMsg);
                    }
                }
            } catch (_0x315cd0) {
                $.logErr(_0x315cd0, _0x325cc6);
            } finally {
                _0x2ead5c(_0x45b2a4);
            }
        });
    });
}

function _0x4f0602() {
    return new Promise(_0xfae3b3 => {
        $.post(_0x584b0a("body=%7B%22linkId%22%3A%22LsQNxL7iWDlXUs6cFl-AAg%22%7D&appid=activities_platform", "apTaskList"), async (_0x35a3f9, _0x5128d1, _0x99dc6b) => {
            $.log("=== 任务列表 start ===");

            try {
                if (_0x35a3f9) {
                    console.log("" + JSON.stringify(_0x35a3f9));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    _0x99dc6b = JSON.parse(_0x99dc6b);
                    $.taskList = _0x99dc6b.data;

                    for (const _0x10f09a of $.taskList) {
                        $.log(_0x10f09a.taskTitle + " " + _0x10f09a.taskDoTimes + "/" + _0x10f09a.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (_0x36f3e5) {
                $.logErr(_0x36f3e5, _0x5128d1);
            } finally {
                _0xfae3b3(_0x99dc6b);
            }
        });
    });
}

async function _0x5185f7(_0x154bfb, _0x1bde5d, _0x137855 = "", _0x4d1269 = "activities_platform") {
    let _0x314792 = "{\"taskType\":\"" + _0x1bde5d + "\",\"taskId\":" + _0x154bfb + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + _0x137855 + "\"}",
        _0x3e7847 = {
            appId: "cd949",
            fn: "apDoTask",
            body: _0x314792,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };

    _0x314792 = await _0x6f8af6.getbody(_0x3e7847);

    if (!_0x314792) {
        return;
    }

    return new Promise(_0x18f2e7 => {
        $.post(_0x584b0a(_0x314792, "apDoTask"), async (_0x1079ab, _0x15c7b6, _0x504873) => {
            try {
                _0x1079ab ? (console.log("" + JSON.stringify(_0x1079ab)), console.log($.name + " API请求失败，请检查网路重试")) : _0x504873 = JSON.parse(_0x504873);
            } catch (_0x3edc7c) {
                $.logErr(_0x3edc7c, _0x15c7b6);
            } finally {
                _0x18f2e7(_0x504873);
            }
        });
    });
}

function _0x381b60(_0x423f04, _0x1ecc93, _0x15f18e, _0xceb959 = "activities_platform") {
    return new Promise(_0x3fd9f2 => {
        $.post(_0x584b0a("body={\"taskType\":\"" + _0x1ecc93 + "\",\"taskId\":" + _0x423f04 + ",\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\",\"itemId\":\"" + _0x15f18e + "\"}&appid=" + _0xceb959, "apDoTask"), async (_0x3603fd, _0x1dab5f, _0x4bc2e0) => {
            try {
                _0x3603fd ? (console.log("" + JSON.stringify(_0x3603fd)), console.log($.name + " API请求失败，请检查网路重试")) : _0x4bc2e0 = JSON.parse(_0x4bc2e0);
            } catch (_0x22ccfd) {
                $.logErr(_0x22ccfd, _0x1dab5f);
            } finally {
                _0x3fd9f2(_0x4bc2e0);
            }
        });
    });
}

function _0x5008d2(_0x4b3759, _0x1a6e41) {
    return new Promise(_0x80f4a7 => {
        $.post(_0x584b0a("functionId=apTaskDetail&body={\"taskType\":\"" + _0x1a6e41 + "\",\"taskId\":" + _0x4b3759 + ",\"channel\":4,\"linkId\":\"LsQNxL7iWDlXUs6cFl-AAg\"}&appid=activities_platform", "apTaskDetail"), async (_0x1efe20, _0xe6b479, _0x40dd03) => {
            try {
                _0x1efe20 ? (console.log("" + JSON.stringify(_0x1efe20)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x40dd03 = JSON.parse(_0x40dd03), !_0x40dd03.success ? $.taskDetailList = [] : $.taskDetailList = _0x40dd03.data.taskItemList);
            } catch (_0x2fb988) {
                $.logErr(_0x2fb988, _0xe6b479);
            } finally {
                !_0x40dd03.success ? _0x80f4a7([]) : _0x80f4a7(_0x40dd03.data.taskItemList);
            }
        });
    });
}

async function _0x123c16(_0x2d236d, _0x3f22da) {
    let _0x3f1ba9 = "{ \"taskType\": \"" + _0x3f22da + "\", \"taskId\": " + _0x2d236d + ",\"linkId\": \"LsQNxL7iWDlXUs6cFl-AAg\"}",
        _0x4ba3fe = {
            appId: "55276",
            fn: "apTaskDrawAward",
            body: _0x3f1ba9,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };

    _0x3f1ba9 = await _0x6f8af6.getbody(_0x4ba3fe);

    if (!_0x3f1ba9) {
        return;
    }

    return new Promise(_0x52b795 => {
        $.post(_0x584b0a(_0x3f1ba9, "apTaskDrawAward"), async (_0x5cb517, _0x30b615, _0x4d6ae4) => {
            try {
                _0x5cb517 ? (console.log("" + JSON.stringify(_0x5cb517)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x4d6ae4 = JSON.parse(_0x4d6ae4), $.log("领取奖励"));
            } catch (_0x4bd051) {
                $.logErr(_0x4bd051, _0x30b615);
            } finally {
                _0x52b795(_0x4d6ae4);
            }
        });
    });
}

function _0x584b0a(_0x1f66a5, _0x26040c) {
    const _0x502313 = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "api.m.jd.com",
        Origin: "https://joypark.jd.com",
        Referer: "https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
        Cookie: _0x3f77c3
    };
    const _0x256c12 = {
        url: "https://api.m.jd.com/" + (_0x26040c ? "?functionId=" + _0x26040c : ""),
        body: _0x1f66a5,
        headers: _0x502313
    };
    return _0x256c12;
}

function _0x2ead06(_0x4e2eaa) {
    _0x4e2eaa = _0x4e2eaa || 32;
    let _0x4ef858 = "abcdef0123456789",
        _0x5c0c35 = _0x4ef858.length,
        _0x55a850 = "";

    for (i = 0; i < _0x4e2eaa; i++) {
        _0x55a850 += _0x4ef858.charAt(Math.floor(Math.random() * _0x5c0c35));
    }

    return _0x55a850;
}

function _0x1d294a(_0x2b1e1b) {
    if (typeof _0x2b1e1b == "string") {
        try {
            return JSON.parse(_0x2b1e1b);
        } catch (_0x14f46b) {
            console.log(_0x14f46b);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }