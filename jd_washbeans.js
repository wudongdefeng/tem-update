/**
2022/8/17 兑换物流积分失败不在执行兑换京豆
2022/8/24 兑回京豆调整为兑换剩余全部积分，不按兑换积分计
2022/8/28 修复已知问题
2022/9/15 兑换失败重试一次
2023/2/6  一些优化
2023/2/7  分离积分换豆;换积分失败重试2次
2023/2/8  优化延时
2023/5/10 fix
默认不执行，如需执行请设置变量 DY_WASHBEANS='true'
7天内过期京豆大于10个豆子才洗！
每次最低兑100积分，最多500积分
33 5 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_washbeans.js
问题建议TG -> https://t.me/dylan_jdpro
*/
let lnrun = 0;
if (process.env.DY_WASHBEANS != "true") {
    console.log('\n默认不运行,设置变量export DY_WASHBEANS="true"来运行\n')
    return
}
const $ = new Env('临期京豆换积分');
const _0x39d0e5 = $.isNode() ? require('./sendNotify') : '',
    _0x445623 = $.isNode() ? require('./jdCookie.js') : '',
    _0x477640 = require('./function/dylanx');
let _0x33dbdd = [],
    _0x3d214c = '',
    _0x53eee7 = '',
    _0x50984c;
if ($.isNode()) {
    Object.keys(_0x445623).forEach(_0x2c0284 => {
        _0x33dbdd.push(_0x445623[_0x2c0284]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x33dbdd = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x3e06b1 => _0x3e06b1.cookie)].filter(_0x2b02af => !!_0x2b02af);
!(async () => {
    if (!_0x33dbdd[0]) {
        const _0x436fe8 = {};
        _0x436fe8['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x436fe8);
        return;
    }
    $.log('\n有问题联系TG-> https://t.me/dylan_jdpro\n');
    for (let _0x5ce76a = 0; _0x5ce76a < _0x33dbdd.length; _0x5ce76a++) {
        if (_0x33dbdd[_0x5ce76a]) {
            _0x3d214c = _0x33dbdd[_0x5ce76a], $.UserName = decodeURIComponent(_0x3d214c.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3d214c.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x5ce76a + 1, $.isLogin = true, $.nickName = '', _0x50984c = 0, await _0x3ed848(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
            if (!$.isLogin) {
                const _0x4cdb05 = {};
                _0x4cdb05['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x4cdb05);
                $.isNode() && (await _0x39d0e5.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x155755(), await $.wait(500);
            if (_0x50984c > 10) await _0x19f206(); else {
                $.log('过期不到10个，不洗也罢，留给需要的人！\n');
                continue;
            }
            await $.wait(500), await _0x3dbb5c(), await $.wait(2000);
        }
    }
})().catch(_0x29d967 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x29d967 + '!', '');
}).finally(() => {
    $.done();
});
async function _0x19f206() {
    let _0xe0e8af = Math.ceil(_0x50984c / 100) * 100;
    if (_0x50984c >= 100) _0xe0e8af = _0x50984c;
    if (_0xe0e8af >= 500) _0xe0e8af = 500;
    $.log('开始兑换' + _0xe0e8af + '积分\n'), await _0x3e21f8(1, _0xe0e8af);
    for (let _0x9652c6 = 0; _0x9652c6 < 3 && $.sflag; _0x9652c6++) {
        await $.wait(2000), await _0x3e21f8(1, _0xe0e8af);
    }
}
async function _0x155755() {
    const _0x4bc9b3 = {};
    _0x4bc9b3.pageNo = 0x1, _0x4bc9b3.pageSize = 0x14;
    let _0x39d8ef = await _0x477640.getbody('jingBeanDetail', _0x4bc9b3);
    return new Promise(async _0x4f922a => {
        const _0x21f3af = {};
        _0x21f3af.Accept = '*/*', _0x21f3af['Accept-Encoding'] = 'gzip, deflate, br', _0x21f3af['Accept-Language'] = 'zh-cn', _0x21f3af.Cookie = _0x3d214c, _0x21f3af['User-Agent'] = 'okhttp/3.12.13';
        const _0x389b3c = {};
        _0x389b3c.url = 'https://api.m.jd.com/client.action', _0x389b3c.body = 'functionId=jingBeanDetail&' + _0x39d8ef, _0x389b3c.headers = _0x21f3af;
        const _0x1b55e4 = _0x389b3c;
        $.post(_0x1b55e4, (_0x4480f8, _0x5ce9e8, _0x42aea0) => {
            try {
                if (_0x4480f8) console.log('' + JSON.stringify(_0x4480f8)), console.log('getexpirebeans API请求失败，请检查网路重试'); else {
                    if (_0x42aea0) {
                        _0x42aea0 = JSON.parse(_0x42aea0);
                        if (_0x42aea0.code === 0) _0x42aea0.others?.['jingBeanExpire']?.['title']?.['includes']('7天内过期') && (_0x50984c = _0x42aea0.others.jingBeanExpire.title.match(/\d+/)[0], $.log('近七天将过期' + _0x50984c + '个')); else {
                            $.log(JSON.stringify(_0x42aea0));
                        }
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x36af9e) {
                $.logErr(_0x36af9e, _0x5ce9e8);
            } finally {
                _0x4f922a();
            }
        });
    });
}
function _0x3dbb5c() {
    return new Promise(async _0x572696 => {
        $.post(_0x14b6ce('integralHistory', '[{"pin":"$cooMrdGatewayUid$", "pageSize":10,"pageNo":1}]'), (_0x30e8bd, _0x376600, _0x3c0b60) => {
            try {
                if (_0x30e8bd) $.log('' + JSON.stringify(_0x30e8bd)), $.log(' API请求失败，请检查网路重试'); else {
                    _0x3c0b60 = JSON.parse(_0x3c0b60);
                    if (_0x3c0b60.success) {
                        $.log('积分收支记录：');
                        let _0x4e8169 = _0x3c0b60.content.slice(0, 7);
                        _0x4e8169.forEach(_0x4fdba4 => {
                            console.log(_0x4fdba4.sceneName + '：' + _0x4fdba4.integration + ' at ' + new Date(_0x4fdba4.createTime).toLocaleString());
                        });
                    }
                }
            } catch (_0x4ec789) {
                $.log(_0x4ec789, _0x376600);
            } finally {
                _0x572696();
            }
        });
    });
}
function _0x38ecad() {
    return new Promise(async _0x4b5c22 => {
        $.post(_0x14b6ce('userAccount', '[{"pin":"$cooMrdGatewayUid$"}]'), (_0x31ea6d, _0x3674a9, _0x352b93) => {
            try {
                if (_0x31ea6d) {
                    $.log('' + JSON.stringify(_0x31ea6d)), $.log(' API请求失败，请检查网路重试');
                } else _0x352b93 = JSON.parse(_0x352b93), _0x352b93.success && ($.cu_integral = _0x352b93.content.integral, $.log('当前总积分：' + $.cu_integral + '\n'));
            } catch (_0xa5c067) {
                $.log(_0xa5c067, _0x3674a9);
            } finally {
                _0x4b5c22();
            }
        });
    });
}
function _0x3e21f8(_0x4729e5, _0x3bd3ef) {
    let _0x1e6b5a;
    $.sflag = false, _0x4729e5 == 1 ? _0x1e6b5a = '京豆兑换物流积分' : _0x1e6b5a = '物流积分兑换京豆';
    let _0x461428 = _0x177996('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'),
        _0xdcb27a = '[{"businessNo":"' + _0x461428 + '","title":"' + _0x1e6b5a + '","pin" : "$cooMrdGatewayUid$","type":' + _0x4729e5 + ',"transferNumber":' + _0x3bd3ef + ' }]';
    return new Promise(_0x6bbc92 => {
        $.post(_0x14b6ce('transfer', _0xdcb27a), (_0x35f6ba, _0x1bb8de, _0x34f64c) => {
            try {
                if (_0x35f6ba) $.log(JSON.stringify(_0x35f6ba)), $.log('请求失败'); else {
                    _0x34f64c = JSON.parse(_0x34f64c);
                    if (_0x34f64c.code == 1) $.log('兑换成功！\n'); else {
                        if (_0x34f64c.code == 2005) $.log('今日兑换额度已达上限，明日赶早！\n'); else {
                            $.sflag = true;
                            if (JSON.stringify(_0x34f64c).includes('风控')) $.sflag = false;
                            console.log(JSON.stringify(_0x34f64c)), console.log('\n兑换失败，重试\n');
                        }
                    }
                }
            } catch (_0xb1e7df) {
                $.log(_0xb1e7df, _0x1bb8de);
            } finally {
                _0x6bbc92();
            }
        });
    });
}
async function _0xde9b5d() {
    for (let _0x4eacb4 = 0; _0x4eacb4 < _0x33dbdd.length; _0x4eacb4++) {
        let _0x2b5c7b = ['pVbNk9xIuI02DeRtwUiztA==', 's4UuZYFN6GW3jbg4x9Z8LA==', 'Vf+kZwVHm4/P5/ZkyCY+DA==', '4y1yGPA4HCaFNCw8BZ6gsw=='],
            _0x19547e = _0x29ba89(_0x2b5c7b, 1)[0];
        await _0xf1d9d2(_0x33dbdd[_0x4eacb4], _0x19547e), await _0x3fd7c3(_0x33dbdd[_0x4eacb4], _0x19547e), await _0x256b3f(_0x33dbdd[_0x4eacb4], _0x19547e), await _0x5d8241(_0x33dbdd[_0x4eacb4], _0x19547e), await $.wait(500);
    }
}
async function _0xf1d9d2(_0x1bf9cc, _0x346d5c) {
    let _0x4a43e8 = +new Date(),
        _0x5de828 = {
            'url': 'https://api.m.jd.com/?t=' + _0x4a43e8,
            'body': 'functionId=InviteFriendChangeAssertsService&body=' + JSON.stringify({
                'method': 'attendInviteActivity',
                'data': {
                    'inviterPin': encodeURIComponent(_0x346d5c),
                    'channel': 0x1,
                    'token': '',
                    'frontendInitStatus': ''
                }
            }) + '&referer=-1&eid=eidI9b2981202fsec83iRW1nTsOVzCocWda3YHPN471AY78%2FQBhYbXeWtdg%2F3TCtVTMrE1JjM8Sqt8f2TqF1Z5P%2FRPGlzA1dERP0Z5bLWdq5N5B2VbBO&aid=&client=ios&clientVersion=14.4.2&networkType=wifi&fp=-1&uuid=ab048084b47df24880613326feffdf7eee471488&osVersion=14.4.2&d_brand=iPhone&d_model=iPhone10,2&agent=-1&pageClickKey=-1&platform=3&lang=zh_CN&appid=market-task-h5&_t=' + _0x4a43e8,
            'headers': {
                'Host': 'api.m.jd.com',
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/x-www-form-urlencoded',
                'Origin': 'https://invite-reward.jd.com',
                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                'User-Agent': $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JSUA') ? $.getdata('JSUA') : '\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Referer': 'https://invite-reward.jd.com/',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': _0x1bf9cc
            }
        };
    $.post(_0x5de828, (_0x5552ee, _0x2e379b, _0x1eef3b) => { });
}
async function _0x3fd7c3(_0x55fdc3, _0x2ea950) {
    let _0x573160 = {
        'url': 'https://api.m.jd.com/',
        'body': 'functionId=TaskInviteService&body=' + JSON.stringify({
            'method': 'participateInviteTask',
            'data': {
                'channel': '1',
                'encryptionInviterPin': encodeURIComponent(_0x2ea950),
                'type': 0x1
            }
        }) + '&appid=market-task-h5&uuid=&_t=' + Date.now(),
        'headers': {
            'Host': 'api.m.jd.com',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://assignment.jd.com',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'User-Agent': $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JSUA') ? $.getdata('JSUA') : '\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Referer': 'https://assignment.jd.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': _0x55fdc3
        }
    };
    $.post(_0x573160, (_0x489b60, _0x584c88, _0x170f95) => { });
}
async function _0x256b3f(_0x43415f, _0x531671) {
    let _0x4cad40 = Date.now();
    var _0x853789 = {
        'Host': 'api.m.jd.com',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://invite-reward.jd.com',
        'accept-language': 'zh-cn',
        'user-agent': $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JSUA') ? $.getdata('JSUA') : '\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://invite-reward.jd.com/',
        'Cookie': _0x43415f
    },
        _0x43555d = 'functionId=InviteFriendApiService&body={"method":"attendInviteActivity","data":{"inviterPin":"' + encodeURIComponent(_0x531671) + '","channel":1,"token":"","frontendInitStatus":""}}&referer=-1&eid=eidIf3dd8121b7sdmiBLGdxRR46OlWyh62kFAZogTJFnYqqRkwgr63%2BdGmMlcv7EQJ5v0HBic81xHXzXLwKM6fh3i963zIa7Ym2v5ehnwo2B7uDN92Q0&aid=&client=ios&clientVersion=14.4&networkType=wifi&fp=-1&appid=market-task-h5&_t=' + _0x4cad40,
        _0x9cd3f2 = {
            'url': 'https://api.m.jd.com/?t=' + Date.now(),
            'headers': _0x853789,
            'body': _0x43555d
        };
    $.post(_0x9cd3f2, (_0x163cb2, _0x59975f, _0x414b26) => { });
}
async function _0x5d8241(_0x17d38f, _0xb8acb4) {
    let _0x554fd6 = Date.now(),
        _0x408804 = {
            'Host': 'api.m.jd.com',
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://assignment.jd.com',
            'accept-language': 'zh-cn',
            'user-agent': $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JSUA') ? $.getdata('JSUA') : '\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'referer': 'https://assignment.jd.com/?inviterId=' + encodeURIComponent(_0xb8acb4),
            'Cookie': _0x17d38f
        },
        _0x3e4129 = 'functionId=TaskInviteService&body={"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":"' + encodeURIComponent(_0xb8acb4) + '","type":1}}&appid=market-task-h5&uuid=&_t=' + _0x554fd6;
    const _0x162e67 = {};
    _0x162e67.url = 'https://api.m.jd.com/', _0x162e67.headers = _0x408804, _0x162e67.body = _0x3e4129;
    var _0x48ef12 = _0x162e67;
    $.post(_0x48ef12, (_0x1474eb, _0x1a77b7, _0x44c6ba) => { });
}
function _0x29ba89(_0x2971ee, _0x2b9327) {
    var _0x5daf9d = _0x2971ee.slice(0),
        _0x10f083 = _0x2971ee.length,
        _0x15eb5c = _0x10f083 - _0x2b9327,
        _0x2b666f,
        _0x28eace;
    while (_0x10f083-- > _0x15eb5c) {
        _0x28eace = Math.floor((_0x10f083 + 1) * Math.random()), _0x2b666f = _0x5daf9d[_0x28eace], _0x5daf9d[_0x28eace] = _0x5daf9d[_0x10f083], _0x5daf9d[_0x10f083] = _0x2b666f;
    }
    return _0x5daf9d.slice(_0x15eb5c);
}
;
function _0x14b6ce(_0x5a48ed, _0x1ef6d3) {
    const _0x2df006 = {};
    _0x2df006.Accept = '*/*', _0x2df006.Cookie = _0x3d214c, _0x2df006['Accept-Language'] = 'zh-cn', _0x2df006.Referer = 'https://jingcai-h5.jd.com/', _0x2df006['Accept-Encoding'] = 'gzip, deflate, br', _0x2df006.AppParams = '{"appid":158,"ticket_type":"m"}', _0x2df006['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/16A366 Safari/604.1', _0x2df006.access = 'H5', _0x2df006['LOP-DN'] = 'jingcai.jd.com', _0x2df006['Accept-Language'] = 'zh-cn', _0x2df006.Accept = 'application/json, text/plain, */*', _0x2df006['Content-Type'] = 'application/json;charset=utf-8';
    const _0x15f2ca = {};
    return _0x15f2ca.url = 'https://lop-proxy.jd.com/JingIntegralApi/' + _0x5a48ed, _0x15f2ca.headers = _0x2df006, _0x15f2ca.body = _0x1ef6d3, _0x15f2ca;
}
function _0x177996(_0x43c693 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x42c435 = 0) {
    return _0x43c693.replace(/[xy]/g, function (_0x336248) {
        var _0x456bfa = Math.random() * 16 | 0,
            _0x472bfa = _0x336248 == 'x' ? _0x456bfa : _0x456bfa & 3 | 8;
        if (_0x42c435) busNo = _0x472bfa.toString(36).toUpperCase(); else {
            busNo = _0x472bfa.toString(36);
        }
        return busNo;
    });
}
function _0x3ed848() {
    return new Promise(async _0x12bd24 => {
        const _0x1e23f1 = {
            'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
            'headers': {
                'Host': 'wq.jd.com',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': _0x3d214c,
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Accept-Language': 'zh-cn',
                'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
        $.get(_0x1e23f1, (_0x50a4ce, _0x5d7377, _0x5a0d1a) => {
            try {
                if (_0x50a4ce) $.logErr(_0x50a4ce); else {
                    if (_0x5a0d1a) {
                        _0x5a0d1a = JSON.parse(_0x5a0d1a);
                        if (_0x5a0d1a.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }
                        if (_0x5a0d1a.retcode === 0 && _0x5a0d1a.data && _0x5a0d1a.data.hasOwnProperty('userInfo')) {
                            $.nickName = _0x5a0d1a.data.userInfo.baseInfo.nickname;
                        }
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x35488f) {
                $.logErr(_0x35488f);
            } finally {
                _0x12bd24();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }