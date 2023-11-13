/*
店铺签到，有新的店铺直接添加token即可
可设置变量DPSTOKEN='A&B&C'
或DPSTOKEN="A
B
C"
优先使用变量token，没有则使用内置token
每日最多签到22家店铺，超出失败
更新日期:2023-8-21 fix
cron 3 0,23 * * * jd_dpsign.js, tag=店铺签到
*/
let lnrun = 0;

var token = [//内置token
    //"72486155DE9716BB143C16A41C96EF26",
    //"4C82289AE45A4CC696232B7A4AF282D3",
    //"CA9FEDDCABD4DA31223441563C163B47",
    //"E00B0DC7738C5662F745A7BC6D137B97",
    //"776D3DAAD242B860E89DF11077F82169",
    //"F95A1A59A36015BE04EE37236DB6CE87",
    //"33D71DB237DA8C9D84DC3B34F74AAC07",
    //"E969CCB6A0DF9392A021E3D604D892A2",
    //"D4A243F51F645969EF77A35C93F686A5",
    //"445AF0A22B42AFE6D6ABADDE2FD161C2",
    //"43B0F3550B339D30B1DC1B85198F5871",
    //"710F970D2C9D83AE4547C6CD97754DCB",
    //"264D069FBD411345AC26F8173FB9ABDB",
]

const $ = new Env('店铺签到');
const _0x54c16c = $.isNode() ? require("./sendNotify") : "",
    _0x1dd514 = $.isNode() ? require("./jdCookie") : "",
    _0x30806e = require("child_process").execSync,
    _0x1b46be = require("./function/dylany"),
    _0x2ff18a = require("fs");

let _0x54772d = [],
    _0x4aad35 = "",
    _0x5f1d11,
    _0x29359b = 0,
    _0x44fd98 = [];

const _0x4cc7d6 = "https://api.m.jd.com/api?appid=interCenter_shopSign";
$.activityId = "";
$.venderId = "";
$.activityEnd = false;

if ($.isNode()) {
    Object.keys(_0x1dd514).forEach(_0x3c8a7e => {
        _0x54772d.push(_0x1dd514[_0x3c8a7e]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    let _0x5ceaa8 = $.getdata("CookiesJD") || "[]";

    _0x5ceaa8 = _0x136084(_0x5ceaa8);
    _0x54772d = _0x5ceaa8.map(_0x39f1db => _0x39f1db.cookie);

    _0x54772d.reverse();

    _0x54772d.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);

    _0x54772d.reverse();

    _0x54772d = _0x54772d.filter(_0x4d7013 => _0x4d7013 !== "" && _0x4d7013 !== null && _0x4d7013 !== undefined);
}

let _0x2ee385 = [],
    _0x3cfdc7 = [],
    _0x320476 = 0;
process.env.DPSTOKEN && (process.env.DPSTOKEN.indexOf("\n") > -1 || process.env.DPSTOKEN.indexOf("&") > -1 ? _0x2ee385 = process.env.DPSTOKEN.split(/[&\n]/) : _0x2ee385.push(process.env.DPSTOKEN), token = _0x2ee385);

const _0x49d221 = require("./USER_AGENTS");

let _0x4c0b21 = _0x2ff18a.existsSync("/ql/data/config") ? "/ql/data/config/config.sh" : "/ql/config/config.sh";

!(async () => {
    if (!_0x54772d[0]) {
        const _0x4a46c6 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x4a46c6);
        return;
    }

    $.TokenLists = [];
    $.TokenLists.push(...token);
    $.TokenLists = [...new Set($.TokenLists)].filter(_0x2f1554 => !!_0x2f1554 && _0x2f1554.length === 32);

    if ($.TokenLists.length === 0) {
        console.log("无店铺签到token，退出！");
        return;
    } else {
        console.log("共" + $.TokenLists.length + "个店铺，开始签到...");
    }

    for (let _0x5705dc = 0; _0x5705dc < _0x54772d.length; _0x5705dc++) {
        if (_0x54772d[_0x5705dc]) {
            _0x4aad35 = _0x54772d[_0x5705dc];
            $.UserName = decodeURIComponent(_0x4aad35.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4aad35.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x5705dc + 1;
            $.isLogin = true;
            $.nickName = "";
            _0x5f1d11 = "";

            if ($.TokenLists.length == 0) {
                break;
            }

            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******");
      let Interval = process.env.jd_jk_interval || "60 * 1000";console.log("环境变量jd_jk_interval默认为60s");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait($jd_jk_interval);lnrun = 0}

            if (!$.isLogin) {
                const _0x530298 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x530298);

                if ($.isNode()) {
                    await _0x54c16c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            $.UA = _0x49d221.UARAM ? _0x49d221.UARAM() : _0x49d221.USER_AGENT;
            await _0x108422();
            await $.wait(1000);

            try {
                if ($.index === 1 && _0x2ee385.length !== 0) {
                    _0x320476 = _0x3cfdc7.length;

                    for (let _0x2df6fa of _0x3cfdc7) {
                        $.TokenLists = $.TokenLists.filter(_0x1d1cc6 => _0x1d1cc6 != _0x2df6fa);

                        _0x30806e("sed -i \"s!" + _0x2df6fa + "!!g\" " + _0x4c0b21);
                    }
                }
            } catch (_0xc6fe89) { }
        }
    }

    console.log("\n" + (_0x320476 > 0 ? _0x320476 + "个失效token，变量已移除" : ""));
})().catch(_0xc1907a => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xc1907a + "!", "");
}).finally(() => {
    $.done();
});

async function _0x108422() {
    for (var _0x5800e4 = 0; _0x5800e4 < $.TokenLists.length; _0x5800e4++) {
        console.log("\n店铺->" + (_0x5800e4 + 1) + ":" + $.TokenLists[_0x5800e4]);
        _0x29359b = 0;

        if ($.index == 1) {
            _0x44fd98[$.TokenLists[_0x5800e4]] = {};
            await _0x986c3f($.TokenLists[_0x5800e4]);

            if (_0x44fd98[$.TokenLists[_0x5800e4]].vid == "") {
                continue;
            }

            await _0x213d58($.venderId);
        }

        if (_0x44fd98[$.TokenLists[_0x5800e4]].vid == "") {
            continue;
        }

        await _0x150416($.TokenLists[_0x5800e4], _0x44fd98[$.TokenLists[_0x5800e4]].vid, _0x44fd98[$.TokenLists[_0x5800e4]].aid);
        await $.wait(500);
        await _0x3721a6($.TokenLists[_0x5800e4], _0x44fd98[$.TokenLists[_0x5800e4]].vid);
    }
}

async function _0x986c3f(_0x463b46) {
    const _0x141283 = {
        "token": "" + _0x463b46,
        "venderId": ""
    };
    let _0x141b07 = _0x141283;
    const _0x549d36 = {
        "appId": "4da33",
        "fn": "interact_center_shopSign_getActivityInfo",
        "body": _0x141b07,
        "apid": "interCenter_shopSign",
        "ver": "11.6.5",
        "cl": "android",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0x141b07 = await _0x1b46be.getbody(_0x549d36);
    return new Promise(_0x4d3661 => {
        const _0x44c1e7 = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x4aad35,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x1cfe5b = {
            "url": "https://api.m.jd.com/api?loginType=2&" + _0x141b07,
            "headers": _0x44c1e7
        };
        $.get(_0x1cfe5b, (_0x1a140e, _0x4ac389, _0x59682d) => {
            try {
                if (_0x1a140e) {
                    console.log("查询店铺API请求失败‼️");
                    console.log(_0x1a140e);
                } else {
                    _0x59682d = JSON.parse(_0x59682d);

                    if (_0x59682d.code == 402) {
                        _0x44fd98[_0x463b46].vid = "";
                        console.log("活动已失效");
                        $.activityEnd = true;

                        _0x3cfdc7.push(_0x463b46);
                    } else {
                        $.venderId = _0x59682d.data.venderId;
                        $.activityId = _0x59682d.data.id;
                        _0x44fd98[_0x463b46].vid = $.venderId;
                        _0x44fd98[_0x463b46].aid = $.activityId;
                        let _0x479972 = _0x59682d.data.startTime,
                            _0x19945d = _0x59682d.data.endTime;
                        console.log("开始时间：" + _0x350c31(new Date(parseInt(_0x479972))) + "\n结束时间：" + _0x350c31(new Date(parseInt(_0x19945d))));
                        let _0x19c7b7 = "";

                        for (let _0x5a6b9d = 0; _0x5a6b9d < _0x59682d.data.continuePrizeRuleList.length; _0x5a6b9d++) {
                            const _0x66a7d8 = _0x59682d.data.continuePrizeRuleList[_0x5a6b9d].level;

                            for (let _0x35eddf of _0x59682d.data.continuePrizeRuleList[_0x5a6b9d].prizeList) {
                                if (_0x35eddf.type == 4) {
                                    if (_0x5a6b9d != _0x59682d.data.continuePrizeRuleList.length - 1) {
                                        _0x19c7b7 += _0x66a7d8 + "天" + _0x35eddf.discount + "豆" + _0x35eddf.number + "份|";
                                    } else {
                                        _0x19c7b7 += _0x66a7d8 + "天" + _0x35eddf.discount + "豆" + _0x35eddf.number + "份";
                                    }
                                } else {
                                    if (_0x35eddf.type == 14) {
                                        _0x5a6b9d != _0x59682d.data.continuePrizeRuleList.length - 1 ? _0x19c7b7 += _0x66a7d8 + "天" + _0x35eddf.discount / 100 + "红包" + _0x35eddf.number + "份|" : _0x19c7b7 += _0x66a7d8 + "天" + _0x35eddf.discount / 100 + "红包" + _0x35eddf.number + "份";
                                    }
                                }
                            }
                        }

                        !_0x19c7b7 && (_0x19c7b7 = "无豆无红包，积分优惠券！");
                        console.log("奖品：" + _0x19c7b7);
                    }
                }
            } catch (_0x46699c) {
                $.logErr(_0x46699c, _0x4ac389);
            } finally {
                _0x4d3661(_0x59682d);
            }
        });
    });
}

async function _0x213d58(_0x2ed9fa) {
    return new Promise(_0x43562e => {
        const _0x3f38c9 = {
            "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22" + _0x2ed9fa + "%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + new Date().valueOf() + "%2C%22source%22%3A%22m-shop%22%7D&t=" + new Date().valueOf() + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224",
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://shop.m.jd.com/",
                "User-Agent": $.UA
            }
        };
        $.get(_0x3f38c9, (_0x282d51, _0x234289, _0xc376c) => {
            try {
                if (_0x282d51) {
                    console.log("查询店铺名称API请求失败‼️");
                    console.log(_0x282d51);
                } else {
                    _0xc376c = JSON.parse(_0xc376c);
                    let _0x3dc55b = _0xc376c.data.shopBaseInfo.shopName;
                    console.log("店铺名称：" + _0x3dc55b + "\n店铺链接：https://shop.m.jd.com/?venderId=" + _0x2ed9fa);
                    _0x5f1d11 += "【" + _0x3dc55b + "】";
                }
            } catch (_0x139710) {
                $.logErr(_0x139710, _0x234289);
            } finally {
                _0x43562e(_0xc376c);
            }
        });
    });
}

async function _0x3260ae(_0x23a8f2, _0x285308) {
    return new Promise(_0x4ac2f1 => {
        const _0x2bd204 = {
            "url": _0x4cc7d6 + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22" + _0x23a8f2 + "%22,%22venderId%22:" + _0x285308 + "}&jsonp=jsonp1005",
            "headers": {
                "accept": "accept",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": _0x4aad35,
                "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x23a8f2 + "&sceneval=2",
                "User-Agent": $.UA
            }
        };
        $.get(_0x2bd204, (_0xfeadb6, _0x20e5ee, _0x2007bb) => {
            try {
                if (_0xfeadb6) {
                    console.log("查询活动信息API请求失败‼️");
                    console.log(_0xfeadb6);
                } else {
                    _0x2007bb = JSON.parse(/{(.*)}/g.exec(_0x2007bb)[0]);
                    $.activityId = _0x2007bb.data.id;
                    let _0x1eab27 = _0x2007bb.data.startTime,
                        _0x5cd344 = _0x2007bb.data.endTime;

                    if ($.index == 1) {
                        console.log("开始时间：" + new Date(parseInt(_0x1eab27)).toLocaleString() + "\n结束时间：" + new Date(parseInt(_0x5cd344)).toLocaleString());
                        let _0x43df6d = "";

                        for (let _0x580f02 = 0; _0x580f02 < _0x2007bb.data.continuePrizeRuleList.length; _0x580f02++) {
                            const _0x4a26a5 = _0x2007bb.data.continuePrizeRuleList[_0x580f02].level;

                            for (let _0x3a4575 of _0x2007bb.data.continuePrizeRuleList[_0x580f02].prizeList) {
                                if (_0x3a4575.type == 4) {
                                    _0x580f02 != _0x2007bb.data.continuePrizeRuleList.length - 1 ? _0x43df6d += _0x4a26a5 + "天" + _0x3a4575.discount + "豆" + _0x3a4575.number + "份|" : _0x43df6d += _0x4a26a5 + "天" + _0x3a4575.discount + "豆" + _0x3a4575.number + "份";
                                } else {
                                    if (_0x3a4575.type == 14) {
                                        _0x580f02 != _0x2007bb.data.continuePrizeRuleList.length - 1 ? _0x43df6d += _0x4a26a5 + "天" + _0x3a4575.discount / 100 + "红包" + _0x3a4575.number + "份|" : _0x43df6d += _0x4a26a5 + "天" + _0x3a4575.discount / 100 + "红包" + _0x3a4575.number + "份";
                                    }
                                }
                            }
                        }

                        !_0x43df6d && (_0x43df6d = "无豆无红包，积分优惠券！");
                        console.log("奖励：" + _0x43df6d);
                    }
                }
            } catch (_0x3f73f2) {
                $.logErr(_0x3f73f2, _0x20e5ee);
            } finally {
                _0x4ac2f1(_0x2007bb);
            }
        });
    });
}

async function _0x150416(_0x2d8387, _0x20b1b2, _0x3806f7) {
    const _0x28876c = {
        "token": "" + _0x2d8387,
        "venderId": _0x20b1b2,
        "activityId": _0x3806f7,
        "type": 56,
        "actionType": 7
    };
    let _0x53bfbe = _0x28876c;
    const _0x3d1a24 = {
        "appId": "4da33",
        "fn": "interact_center_shopSign_signCollectGift",
        "body": _0x53bfbe,
        "apid": "interCenter_shopSign",
        "ver": "11.6.5",
        "cl": "android",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0x53bfbe = await _0x1b46be.getbody(_0x3d1a24);
    return new Promise(_0x19b216 => {
        const _0x20e008 = {
            "accept": "accept",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x4aad35,
            "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x2d8387 + "&sceneval=2",
            "User-Agent": $.UA
        };
        const _0x56ed15 = {
            "url": "https://api.m.jd.com/api?loginType=2&" + _0x53bfbe,
            "headers": _0x20e008
        };
        $.get(_0x56ed15, async (_0x18d33f, _0x19e10d, _0x4b69d8) => {
            try {
                if (_0x18d33f) {
                    console.log("签到API请求失败‼️");
                    console.log(_0x18d33f);
                } else {
                    _0x4b69d8 = JSON.parse(_0x4b69d8);

                    if (_0x4b69d8.success && _0x4b69d8.success === true) {
                        let _0x2897f7 = 0;

                        for (let _0x26633a of _0x4b69d8.data) {
                            for (i of _0x26633a.prizeList) switch (i.type) {
                                case 4:
                                    _0x2897f7 += i.discount;
                                    break;
                            }
                        }

                        console.log("结果：签到成功! " + (_0x2897f7 > 0 ? "获得 " + _0x2897f7 + " 京豆🥔" : ""));
                        _0x29359b = 0;
                    } else {
                        if (_0x4b69d8.msg) {
                            console.log("签到失败：" + _0x4b69d8.msg);
                        } else {
                            console.log("签到失败!");
                            console.log(JSON.stringify(_0x4b69d8));
                            _0x29359b++;

                            if (_0x29359b > 6) {
                                return;
                            }

                            await $.wait(100);
                            await _0x150416(_0x2d8387, _0x20b1b2, _0x3806f7);
                        }
                    }
                }
            } catch (_0x3a338d) {
                $.logErr(_0x3a338d, _0x19e10d);
            } finally {
                _0x19b216(_0x4b69d8);
            }
        });
    });
}

async function _0x3721a6(_0x417520, _0x35b5ea) {
    return new Promise(_0x44a443 => {
        const _0x426308 = {
            "url": _0x4cc7d6 + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + _0x417520 + "%22,%22venderId%22:" + _0x35b5ea + ",%22activityId%22:" + $.activityId + ",%22type%22:56}&jsonp=jsonp1006",
            "headers": {
                "accept": "application/json",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9",
                "cookie": _0x4aad35,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            }
        };
        $.get(_0x426308, (_0x514443, _0x4e53cc, _0x38e55) => {
            try {
                _0x514443 ? (console.log("API请求失败‼️"), console.log(_0x514443)) : (_0x38e55 = JSON.parse(/{(.*)}/g.exec(_0x38e55)[0]), console.log("当前已签到 " + _0x38e55.data.days + " 天"), _0x5f1d11 += "已签到：" + _0x38e55.data.days + "天\n");
            } catch (_0x135d3d) {
                $.logErr(_0x135d3d, _0x4e53cc);
            } finally {
                _0x44a443(_0x38e55);
            }
        });
    });
}

async function _0x53df88() {
    $.isNode() && ($.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x5f1d11), allMessage += "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x5f1d11 + ($.index !== _0x54772d.length ? "\n\n" : ""));
}

function _0x26d20b() {
    return new Promise(_0x3515ee => {
        const _0x20a80f = {
            "Cookie": _0x4aad35,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x1490d8 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x20a80f,
            "timeout": 10000
        };
        $.get(_0x1490d8, (_0x5ad9b2, _0x2d72d1, _0x348dc5) => {
            try {
                if (_0x348dc5) {
                    _0x348dc5 = JSON.parse(_0x348dc5);

                    if (!(_0x348dc5.islogin === "1")) {
                        _0x348dc5.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x7e6022) {
                console.log(_0x7e6022);
            } finally {
                _0x3515ee();
            }
        });
    });
}

function _0x350c31(_0x5f5b96) {
    const _0xe0675f = _0x5f5b96.getFullYear(),
        _0x547546 = ("0" + (_0x5f5b96.getMonth() + 1)).slice(-2),
        _0x460589 = ("0" + _0x5f5b96.getDate()).slice(-2),
        _0x13ebc2 = ("0" + _0x5f5b96.getHours()).slice(-2),
        _0x54c493 = ("0" + _0x5f5b96.getMinutes()).slice(-2),
        _0x1ea6fb = ("0" + _0x5f5b96.getSeconds()).slice(-2);

    return _0xe0675f + "/" + _0x547546 + "/" + _0x460589 + " " + _0x13ebc2 + ":" + _0x54c493 + ":" + _0x1ea6fb;
}

function _0x136084(_0xc9d186) {
    if (typeof _0xc9d186 == "string") {
        try {
            return JSON.parse(_0xc9d186);
        } catch (_0xc09fc) {
            console.log(_0xc09fc);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x4bf20c(_0x83a519) {
    _0x83a519 = _0x83a519 || 32;
    let _0x1d2513 = "abcdef0123456789",
        _0x11e328 = _0x1d2513.length,
        _0x3ac9c5 = "";

    for (i = 0; i < _0x83a519; i++) {
        _0x3ac9c5 += _0x1d2513.charAt(Math.floor(Math.random() * _0x11e328));
    }

    return _0x3ac9c5;
}

function _0x35df12() {
    $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + _0x4bf20c(40) + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }