/*
金融签到，领取双签礼包
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jrsign.js
只运行前10，多了也是黑ip
updatetime:2023/05/27 fix 
* */

const $ = new Env('金融签到');
const _0x3d1636 = $.isNode() ? require('jsdom') : '',
    _0x1c6aa8 = 'https://ms.jr.jd.com/gw2/generic/jrSign/h5/m/',
    _0x2efa1f = $.isNode() ? require('./sendNotify') : '',
    _0x53fce5 = $.isNode() ? require('./jdCookie.js') : '';
let _0x4b28fe = [],
    _0x541190 = '';
if ($.isNode()) {
    Object.keys(_0x53fce5).forEach(_0x5685e5 => {
        _0x4b28fe.push(_0x53fce5[_0x5685e5]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x4b28fe = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x2a10ab($.getdata('CookiesJD') || '[]').map(_0x193508 => _0x193508.cookie)].filter(_0x25789b => !!_0x25789b);
!(async () => {
    if (!_0x4b28fe[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }
    console.log('只跑前10，多了也是黑ip！！！'), $.getid = {};
    await _0x2d6b32();
    JSON.stringify($.getid) == '{}' && ($.getid.jstub = 'BW6T4437AB2RMXKMPMWZOV3PBU6KWRQV2GIOLTKZKUEYGJ44RCKTUZXGZQ7N553SU4HPEDYDHP7B6SWDOVCGYDKRQTC3NGZC2OCTQ5Q', $.getid.sdkToken = '', $.getid.token = '4NZZKHI4EJTZ5OP4Y7S7B4WZBA243SHJSMLKFKPWIX4G27GYSEZU2XJKGBOQERJIDIIWEUF7ILI2M');
    $.getid.eid = '';
    for (let _0x448116 = 0; _0x448116 < '10'; _0x448116++) {
        if (_0x4b28fe[_0x448116]) {
            _0x541190 = _0x4b28fe[_0x448116], $.UserName = decodeURIComponent(_0x541190.match(/pt_pin=([^; ]+)(?=;?)/) && _0x541190.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x448116 + 1, $.isLogin = true, $.nickName = '', $.stopNext = false, $.getid.fp = _0x3dfdc2('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), $.UA = require('./USER_AGENTS').UARAM(), await _0x33c48f(), console.log('\n***********开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '********\n');
            if (!$.isLogin) {
                const _0x5bdcaf = {};
                _0x5bdcaf['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x5bdcaf);
                $.isNode() && (await _0x2efa1f.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x358db7(), await $.wait(10000);
        }
    }
})().catch(_0x18181c => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x18181c + '!', '');
}).finally(() => {
    $.done();
});
async function _0x358db7() {
    await _0x25e011();
    await $.wait(500);
    await _0x3dc3b9();
    await $.wait(500);
    await _0x5bcd86();
}
function _0x25e011() {
    const _0x31b20c = {};
    _0x31b20c.channel = 'sy';
    _0x31b20c.channelLv = 'sy';
    return body = _0x31b20c, new Promise(async _0x559ea1 => {
        $.post(_0x1cb824('switchWFS', body), (_0x422c6b, _0x5c0dce, _0x16d5e5) => {
            try {
                _0x422c6b ? (console.log('' + JSON.stringify(_0x422c6b)), console.log('switchWFS API请求失败，请检查网路重试')) : _0x16d5e5 ? (_0x16d5e5 = JSON.parse(_0x16d5e5), _0x16d5e5.resultData && _0x16d5e5.resultCode === 0 && ($.rsaKey = _0x16d5e5.resultData.resBusiData)) : console.log('京东服务器返回空数据');
            } catch (_0x488dd1) {
                $.logErr(_0x488dd1, _0x5c0dce);
            } finally {
                _0x559ea1();
            }
        });
    });
}
function _0x4a0a83() {
    const _0x5a7fe2 = {};
    _0x5a7fe2.channelSource = 'JRAPP6.0', _0x5a7fe2.riskDeviceParam = '{"eid":"","fp":"","sdkToken":"","token":""}';
    return _0x5a7fe2.site = 'JD_JR_APP', _0x5a7fe2.channel = 'sy', _0x5a7fe2.channelLv = 'sy', body = _0x5a7fe2, new Promise(async _0x47d5bc => {
        $.post(_0x1cb824('querySignCalendar', body), (_0x5e1328, _0x15dfec, _0x5eab76) => {
            try {
                _0x5e1328 ? (console.log('' + JSON.stringify(_0x5e1328)), console.log('queryDrawChance API请求失败，请检查网路重试')) : _0x5eab76 ? (_0x5eab76 = JSON.parse(_0x5eab76), _0x5eab76.resultData && _0x5eab76.resultCode === 0 && ($.noa = _0x5eab76.resultData.resBusiData.noa)) : console.log('京东服务器返回空数据');
            } catch (_0x28cfdf) {
                $.logErr(_0x28cfdf, _0x15dfec);
            } finally {
                _0x47d5bc();
            }
        });
    });
}
function _0x3dc3b9() {
    let _0x4913a4 = $.ar2.nonce();
    const _0x89cf94 = {
        ...$.getid
    };
    let _0x40e28d = {
        'site': 'JD_JR_APP',
        'videoId': '311372930347370496',
        'channelSource': 'JRAPP6.0',
        'riskDeviceParam': _0x89cf94,
        'deviceInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'adInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'clientType': 'android',
        'arrEncrypt': true
    };
    sign = $.ar2.sign(JSON.stringify(_0x40e28d), _0x4913a4);
    const _0x4cb4d4 = {
        ...$.getid
    },
        _0x2b546f = {};
    _0x2b546f.deviceId = '', _0x2b546f.clientType = 'android', _0x2b546f.user_agent = $.UA, _0x2b546f.iosType = 'android', _0x2b546f.osv = '12';
    _0x2b546f.brand = 'Redmi', _0x2b546f.hwv = '', _0x2b546f.network = 0x1, _0x2b546f.mac = '', _0x2b546f.androidId = '', _0x2b546f.oaid = '';
    const _0x338a87 = {};
    return _0x338a87.deviceId = '', _0x338a87.clientType = 'android', _0x338a87.user_agent = $.UA, _0x338a87.iosType = 'android', _0x338a87.osv = '12', _0x338a87.brand = 'Redmi', _0x338a87.hwv = '', _0x338a87.network = 0x1, _0x338a87.mac = '', _0x338a87.androidId = '', _0x338a87.oaid = '', body = {
        'site': 'JD_JR_APP',
        'videoId': '311372930347370496',
        'channelSource': 'JRAPP6.0',
        'riskDeviceParam': JSON.stringify(_0x4cb4d4),
        'deviceInfo': JSON.stringify(_0x2b546f),
        'adInfo': JSON.stringify(_0x338a87),
        'clientType': 'android',
        'arrEncrypt': true,
        'signData': JSON.stringify(_0x40e28d),
        'signature': sign,
        'nonce': _0x4913a4,
        'channel': 'sy',
        'channelLv': 'sy'
    }, new Promise(async _0x54740f => {
        $.post(_0x1cb824('weekSign', body), (_0x17bb51, _0x3bd8ae, _0x40974e) => {
            try {
                if (_0x17bb51) console.log('' + JSON.stringify(_0x17bb51)), console.log('weekSign API请求失败，请检查网路重试'); else {
                    if (_0x40974e) {
                        _0x40974e = JSON.parse(_0x40974e);
                        if (_0x40974e.resultData && _0x40974e.resultCode === 0) {
                            if (_0x40974e.resultData.resBusiCode == 0) console.log('签到成功！'); else _0x40974e.resultData.resBusiCode == 15 ? console.log('今日已签到！') : console.log(_0x40974e.resultData.resBusiMsg);
                        }
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x566a66) {
                $.logErr(_0x566a66, _0x3bd8ae);
            } finally {
                _0x54740f();
            }
        });
    });
}
function _0x5bcd86(_0x48885d = false) {
    let _0x22e182 = $.ar2.nonce(),
        _0x19f9bf = Date.now(),
        _0x3c9edb = $.ar2.sign(JSON.stringify({
            't': _0x19f9bf
        }), _0x22e182),
        _0x27260a = {
            'channel': 'JD',
            'actCode': 'F68B2C3E71',
            'type': 0x4,
            'frontParam': {
                'channel': 'JD',
                'belong': 'jingdou',
                'signData': JSON.stringify({
                    't': _0x19f9bf
                }),
                'nonce': _0x22e182,
                'signature': _0x3c9edb,
                'riskDeviceParam': {
                    ...$.getid
                }
            },
            'riskDeviceParam': {}
        };
    const _0x5579f5 = {};
    _0x5579f5.Host = 'nu.jr.jd.com', _0x5579f5.Accept = 'application/json', _0x5579f5['User-Agent'] = $.UA, _0x5579f5.Origin = 'https://m.jr.jd.com', _0x5579f5.Referer = 'https://m.jr.jd.com/', _0x5579f5.cookie = _0x541190;
    _0x5579f5['X-Requested-With'] = 'com.jingdong.app.mall';
    let _0xe96dc2 = {
        'url': 'https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?_=' + new Date().getTime(),
        'headers': _0x5579f5,
        'body': 'reqData=' + encodeURIComponent(JSON.stringify(_0x27260a))
    };
    return new Promise(async _0x180e49 => {
        $.post(_0xe96dc2, (_0x34cdf2, _0x2b9570, _0x42ba39) => {
            try {
                _0x34cdf2 ? (console.log('' + JSON.stringify(_0x34cdf2)), console.log('signaward API请求失败，请检查网路重试')) : _0x42ba39 ? (_0x42ba39 = JSON.parse(_0x42ba39), _0x42ba39.resultData && _0x42ba39.resultCode === 0 && (_0x42ba39.resultData.data.businessData.businessCode == '000sq' ? console.log('双签礼包：' + _0x42ba39.resultData.data.businessData.businessData.awardListVo[0].name) : console.log('双签礼包：' + _0x42ba39.resultData.data.businessData.businessMsg))) : console.log('京东服务器返回空数据');
            } catch (_0x368f6d) {
                $.logErr(_0x368f6d, _0x2b9570);
            } finally {
                _0x180e49();
            }
        });
    });
}
function _0x33c48f() {
    return new Promise(_0x4b6050 => {
        {
            const _0x279aba = {};
            _0x279aba.Cookie = _0x541190, _0x279aba.referer = 'https://h5.m.jd.com/', _0x279aba['User-Agent'] = $.UA;
            const _0x23db52 = {};
            _0x23db52.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x23db52.headers = _0x279aba, _0x23db52.timeout = 0x2710;
            const _0x29bc11 = _0x23db52;
            $.get(_0x29bc11, (_0x62b91b, _0x1d7860, _0x2722ef) => {
                try {
                    if (_0x2722ef) {
                        _0x2722ef = JSON.parse(_0x2722ef);
                        if (_0x2722ef.islogin === '1') { } else _0x2722ef.islogin === '0' && ($.isLogin = false);
                    }
                } catch (_0x1f213c) {
                    console.log(_0x1f213c);
                } finally {
                    _0x4b6050();
                }
            });
        }
    });
}
function _0x1cb824(_0x168771, _0x122e1c) {
    return {
        'url': _0x1c6aa8 + '/' + _0x168771,
        'headers': {
            'Host': 'ms.jr.jd.com',
            'Accept': 'application/json',
            'User-Agent': $.UA,
            'Origin': 'https://member.jr.jd.com',
            'Referer': 'https://member.jr.jd.com/',
            'cookie': _0x541190
        },
        'body': 'reqData=' + encodeURIComponent(JSON.stringify(_0x122e1c))
    };
}
async function _0x2d6b32() {
    const {
        JSDOM: _0x20c118
    } = _0x3d1636,
        _0x227818 = {};
    _0x227818.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0', _0x227818.referer = 'https://u.jr.jd.com/';
    let _0x192a11 = new _0x3d1636.ResourceLoader(_0x227818),
        _0x181fb4 = new _0x3d1636.VirtualConsole();
    const _0x517ee9 = {};
    _0x517ee9.url = 'https://u.jr.jd.com/uc-fe-wxgrowing/18-quan-yi-day/index.html', _0x517ee9.referer = 'https://u.jr.jd.com/', _0x517ee9.userAgent = 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36', _0x517ee9.runScripts = 'dangerously', _0x517ee9.resources = _0x192a11, _0x517ee9.includeNodeLocations = true, _0x517ee9.storageQuota = 0x989680, _0x517ee9.pretendToBeVisual = true, _0x517ee9.virtualConsole = _0x181fb4;
    let _0x64d43d = _0x517ee9;
    const _0x1a4e44 = new _0x20c118('<body>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js"></script>\n  <script src="https://m.jr.jd.com/common/jssdk/jrbridge/2.0.9/jrbridge.js"></script>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js"></script>\n  <script src="//gia.jd.com/m.html"></script>\n  <script src="//gias.jd.com/js/m.js"></script>\n  </body>', _0x64d43d);
    await $.wait(1500);
    try {
        $.getid = _0x1a4e44.window.getJdEid(), _0x1a4e44.window.AAR2.init(), $.ar2 = new _0x1a4e44.window.AAR2(), $.cry = _0x1a4e44.window.cryptico;
    } catch (_0x39d26b) {
        $.log('\n请求失败，换个时间再试试！！！'), process.exit(11);
    }
}
function _0x2a10ab(_0x822ee6) {
    if (typeof _0x822ee6 == 'string') try {
        return JSON.parse(_0x822ee6);
    } catch (_0x3aaf1e) {
        return console.log(_0x3aaf1e), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}
;
function _0x3dfdc2(_0x56f41b = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x8dbe06 = 0) {
    return _0x56f41b.replace(/[xy]/g, function (_0x2bb5af) {
        var _0x30f821 = Math.random() * 16 | 0,
            _0x3cb2e9 = _0x2bb5af == 'x' ? _0x30f821 : _0x30f821 & 3 | 8;
        _0x8dbe06 ? uuid = _0x3cb2e9.toString(36).toUpperCase() : uuid = _0x3cb2e9.toString(36);
        return uuid;
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
