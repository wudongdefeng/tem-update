
/*
转赚红包,只抽奖提现
1 1 29 2 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb_draw.js
 */
let lnrun = 0;

const $ = new Env('Jd转赚红包_抽奖提现');
const fuck_0xf9222c = $.isNode() ? require("./jdCookie.js") : "",
    fuck_0x55d6cc = require("./function/dylanw"),
    fuck_0x11df87 = require("./USER_AGENTS"),
    fuck_0x2f1ef5 = require("./function/dylib");

let fuck_0x409e24 = true,
    fuck_0x2c0435 = [],
    fuck_0x2d11ee = [],
    fuck_0x2a1653 = [],
    fuck_0x10e612 = [],
    fuck_0xa35a00 = {},
    fuck_0xeae33e = [],
    fuck_0x144194 = "",
    fuck_0x132133 = "";
const fuck_0x390e6e = process.env.JDZHBLTNUM || "-1",
    fuck_0x6b3d71 = process.env.JDZHBDELAY || "1",
    fuck_0x5eb4db = process.env.TXDELAY || "5",
    fuck_0x4d111d = process.env.TXIVAL || "1",
    fuck_0x376b86 = process.env.JDZHBTORED || false,
    fuck_0x280a3e = process.env.TXSILENT || false,
    fuck_0x399638 = process.env.CXJLJQ_COUNT || "10",
    fuck_0x2ae5ab = process.env.TX_MODE || "0",
    fuck_0xfa146c = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        fuck_0xa35a00 = require("./function/proxy.js");
        $.dget = fuck_0xa35a00.intoRequest($.get.bind($));
        $.dpost = fuck_0xa35a00.intoRequest($.post.bind($));
    } catch {
        $.dget = $.get;
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
    $.dget = $.get;
}

if ($.isNode()) {
    Object.keys(fuck_0xf9222c).forEach(_0x257297 => {
        fuck_0xeae33e.push(fuck_0xf9222c[_0x257297]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    fuck_0xeae33e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...fuck_0x368bd7($.getdata("CookiesJD") || "[]").map(_0x5e5283 => _0x5e5283.cookie)].filter(_0x479e82 => !!_0x479e82);
}

!(async () => {
    if (!fuck_0xeae33e[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
    $.log("\n当前版本：20240309 ");
    console.log("执行流程，抽奖--提现");
    console.log("TG频道：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  抽奖次数：默认抽完  JDZHBLTNUM='200'\n  抽奖间隔：默认1秒  JDZHBDELAY='3'\n  提现间隔：默认5秒  TXDELAY='3'\n  提现范围：默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包：JDZHBTORED='true'\n  开启代理：API DY_PROXY='apiurl'\n  垃圾券数量：默认10次，CXJLJQ_COUNT='20'\n  提现模式：默认提当前所得，设置1开启查列表提现，TX_MODE='1'\n  关闭提现：NOTX='true'\n");
    console.log("\n开始抽奖和提现(间隔" + fuck_0x6b3d71 + "秒 连续" + fuck_0x399638 + "次垃圾券停止)...");
    fuck_0x390e6e > -1 && console.log("\n已设置本次运行抽奖次数 " + fuck_0x390e6e);

    let _0x58a437 = new Date();

    _0x58a437.setDate(_0x58a437.getDate() - fuck_0x4d111d);

    for (let _0x32a7d5 = 0; _0x32a7d5 < fuck_0xeae33e.length; _0x32a7d5++) {
        if (fuck_0xeae33e[_0x32a7d5]) {
            fuck_0x144194 = fuck_0xeae33e[_0x32a7d5];
            $.UserName = decodeURIComponent(fuck_0x144194.match(/pt_pin=([^; ]+)(?=;?)/) && fuck_0x144194.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x32a7d5 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            fuck_0x2d11ee = [];
            fuck_0x2a1653 = [];
            txjscore = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.txjsuc = false;
            $.banip = false;
            $.UA = fuck_0x11df87.UARAM ? fuck_0x11df87.UARAM() : fuck_0x11df87.USER_AGENT;
            $.uuid = fuck_0x2f1ef5.UUID();
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x8459d3 = await fuck_0x8802b3(1);

            await $.wait(1000);

            if (_0x8459d3.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x8459d3.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);

            if (_0x8459d3.data.cashVo) {
                if (_0x8459d3.data?.["cashVo"]?.["state"] === 1) {
                    $.log("本轮提现金进度：" + _0x8459d3.data.cashVo.amount + "/" + _0x8459d3.data.cashVo.totalAmount + "(-" + _0x8459d3.data.cashVo.leftAmount + ")");
                } else {
                    _0x8459d3.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x8459d3.data.cashVo.amount + "/" + _0x8459d3.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
                }
            } else {
                $.txj = false;
            }

            $.log("本轮结束时间： " + fuck_0x282be4(new Date(Date.now() + _0x8459d3.data.countDownTime)));

            for (let _0x49a9be = 0; _0x49a9be < (fuck_0x390e6e > -1 && fuck_0x390e6e < $.times ? fuck_0x390e6e : $.times); _0x49a9be++) {
                process.stdout.write("\n第" + (_0x49a9be + 1) + "次抽奖结果：");

                for (let _0x23337f of Array(3)) {
                    await fuck_0x384a43(_0x23337f + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + fuck_0x6b3d71 * 1000);
                }

                if ($.end || $.banip) {
                    break;
                }

                $.txj && (await fuck_0x303802());
                await $.wait(Math.random() * 500 + fuck_0x6b3d71 * 1000);

                if ($.fail > fuck_0x399638) {
                    $.log("连续垃圾券，不继续抽了");
                    break;
                }
            }

            fuck_0x2a1653.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + fuck_0x2a1653.reduce((_0x3f1146, _0x24f6f2) => _0x3f1146 + _0x24f6f2 * 100, 0) / 100 + "元");
            fuck_0x2d11ee.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + fuck_0x2d11ee.reduce((_0x3d9caf, _0x24c1cf) => _0x3d9caf + _0x24c1cf * 100, 0) / 100 + "元");

            if (txjscore.length !== 0) {
                let _0x451cd3 = txjscore.reduce((_0x28816b, _0x4fa54c) => _0x28816b + _0x4fa54c * 100, 0) / 100;

                $.log("\n\n本次抽奖获得提现金：" + _0x451cd3 + "个, 平均" + (_0x451cd3 / (fuck_0x390e6e > -1 ? Math.min.apply(null, [fuck_0x390e6e, $.times]) : $.times)).toFixed(4) + "个/抽");
            }

            if ($.end) {
                continue;
            }

            if (fuck_0xfa146c != "true") {
                if (new Date().getHours() < 6 && fuck_0x280a3e) {
                    continue;
                }

                $.log("\n——————————————开始提现（间隔" + fuck_0x5eb4db + "秒）————————————————");
                $.log("\n当前提现模式：" + (fuck_0x2ae5ab == "1" ? fuck_0x4d111d + "天内历史" : "本次所抽现金"));
                $.log("上限转红包：" + (fuck_0x376b86 ? "开启" : "关闭(续期♻️)"));
                $.txsuc = [];
                $.toredsuc = [];
                $.failtxlist = [];
                $.banip = false;

                if (fuck_0x2ae5ab == "1") {
                    for (let _0x414ac0 = 0; _0x414ac0 < 500; _0x414ac0++) {
                        process.stdout.write("\n" + (_0x414ac0 + 1) + "页：");

                        if ($.nocashnum > 2 || $.toredfailnum > 4 || $.banip) {
                            break;
                        }

                        let _0x482666 = await fuck_0x2b4423(_0x414ac0 + 1);

                        _0x482666 == "" && (await $.wait(5000), await fuck_0x2b4423(_0x414ac0 + 1));

                        if (!$.baglist || $.baglist.length === 0) {
                            break;
                        }

                        for (let _0x43b479 of $.baglist) {
                            if (Math.max.apply(null, [new Date(_0x43b479.createTime), new Date(_0x43b479.startTime)]) < _0x58a437 || $.toredfailnum > 4) {
                                $.nocashnum = 5;
                                break;
                            }

                            if (_0x43b479.prizeType == 4) {
                                $.txfail = false;

                                if (_0x43b479.state == 0 || _0x43b479.state == 2) {
                                    process.stdout.write("" + Number(_0x43b479.amount));

                                    let _0x882794 = await fuck_0x38493f(_0x43b479, Number(_0x43b479.amount));

                                    $.txfail && (await $.wait(5000), _0x882794 = await fuck_0x38493f(_0x43b479, Number(_0x43b479.amount)));
                                    $.txfail && $.failtxlist.push(_0x43b479);

                                    if (_0x882794.data.message.includes("上限") && fuck_0x376b86 == "true" && $.toredfailnum < 5) {
                                        await fuck_0x252e09(_0x43b479, Number(_0x43b479.amount));
                                    }

                                    await $.wait(fuck_0x5eb4db * 1000);
                                } else {
                                    _0x43b479.state == 8;
                                }
                            }
                        }

                        await $.wait(3000);
                    }

                    $.banip = false;

                    while ($.failtxlist.length > 0) {
                        console.log("\n\n" + $.failtxlist.length);

                        for (let _0x4d5e51 = 0; _0x4d5e51 < $.failtxlist.length;) {
                            let _0x1beec4 = $.failtxlist[_0x4d5e51];

                            if (_0x1beec4.prizeType == 4) {
                                $.txfail = false;
                                process.stdout.write("" + Number(_0x1beec4.amount));

                                let _0x58766e = await fuck_0x38493f(_0x1beec4, Number(_0x1beec4.amount));

                                if ($.txfail) {
                                    await $.wait(5000);
                                    _0x58766e = await fuck_0x38493f(_0x1beec4, Number(_0x1beec4.amount));
                                }

                                if ($.txfail) {
                                    _0x4d5e51++;
                                } else {
                                    $.failtxlist.splice(_0x4d5e51, 1);
                                }

                                if (_0x58766e.data.message.includes("上限") && fuck_0x376b86 == "true" && $.toredfailnum < 5) {
                                    await fuck_0x252e09(_0x1beec4, Number(_0x1beec4.amount));
                                }

                                await $.wait(fuck_0x5eb4db * 1000);
                            }
                        }
                    }
                } else {
                    for (let _0x1ef09b = 0; _0x1ef09b < 1; _0x1ef09b++) {
                        if ($.nocashnum > 2 || $.toredfailnum > 4) {
                            break;
                        }

                        while (fuck_0x10e612.length > 0) {
                            console.log("\n" + fuck_0x10e612.length);

                            for (let _0x1feb52 = 0; _0x1feb52 < fuck_0x10e612.length;) {
                                let _0x5c1417 = fuck_0x10e612[_0x1feb52];

                                if (_0x5c1417.prizeType == 4) {
                                    $.txfail = false;
                                    process.stdout.write("" + Number(_0x5c1417.amount));

                                    let _0x1154ce = await fuck_0x38493f(_0x5c1417, Number(_0x5c1417.amount));

                                    $.txfail && (await $.wait(5000), _0x1154ce = await fuck_0x38493f(_0x5c1417, Number(_0x5c1417.amount)));
                                    $.txfail ? _0x1feb52++ : fuck_0x10e612.splice(_0x1feb52, 1);

                                    if (_0x1154ce.data.message.includes("上限") && fuck_0x376b86 == "true" && $.toredfailnum < 5) {
                                        await fuck_0x252e09(_0x5c1417, Number(_0x5c1417.amount));
                                    }

                                    await $.wait(fuck_0x5eb4db * 1000);
                                }
                            }

                            await $.wait(2000);
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x53877a, _0x242245) => _0x53877a + _0x242245 * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x3a67ca, _0x28ab68) => _0x3a67ca + _0x28ab68 * 100, 0) / 100 + "元");
            } else {
                $.log("\n\n⚠已设置不提现！");
            }

            fuck_0x10e612 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x573b9e => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x573b9e + "!", "");
}).finally(() => {
    $.done();
});

async function fuck_0x8802b3(_0x442ed6) {
    const _0x5446a5 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        inviter: ""
    };
    let _0x14d103 = _0x5446a5,
        _0x581640 = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x14d103,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x14d103 = await fuck_0x55d6cc.getbody(_0x581640);

    if (!_0x14d103) {
        return;
    }

    return new Promise(async _0x2ade1d => {
        $.dpost(fuck_0xb02cb4(_0x14d103), async (_0x48ee5b, _0x5dbd43, _0x59f13d) => {
            try {
                if (_0x48ee5b) {
                    console.log("" + JSON.stringify(_0x48ee5b));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x59f13d = JSON.parse(_0x59f13d);

                    if (_0x59f13d.code == 0) {
                        $.times = _0x59f13d.data.prizeNum;

                        if (_0x442ed6) {
                            console.log("我的助力码：" + _0x59f13d.data.inviter);
                        }

                        fuck_0x2c0435.push(_0x59f13d.data.inviter);
                    } else {
                        console.log(_0x59f13d.errMsg);
                    }
                }
            } catch (_0x446201) {
                $.logErr(_0x446201, _0x5dbd43);
            } finally {
                _0x2ade1d(_0x59f13d);
            }
        });
    });
}

async function fuck_0x303802() {
    const _0x432799 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x290c67 = _0x432799,
        _0x47ec90 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x290c67,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x290c67 = await fuck_0x55d6cc.getbody(_0x47ec90);

    if (!_0x290c67) {
        return;
    }

    return new Promise(async _0x79f9b => {
        $.dpost(fuck_0xb02cb4(_0x290c67), async (_0xb3b8db, _0x175947, _0x30c5d4) => {
            try {
                if (_0xb3b8db) {
                    console.log("" + JSON.stringify(_0xb3b8db));
                    console.log("receive请求失败，请检查网路重试");

                    if (_0xb3b8db.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x30c5d4 = JSON.parse(_0x30c5d4);

                    if (_0x30c5d4.code == 0) {
                        process.stdout.write("----提现金" + _0x30c5d4.data.amount + "(+" + _0x30c5d4.data.receiveList[0].amount + ")");
                        txjscore.push(_0x30c5d4.data.receiveList[0].amount);
                        _0x30c5d4.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
                    } else {
                        if (_0x30c5d4.code == 80208) {
                            process.stdout.write("----送的抽奖次数没有提现金");
                        } else {
                            if (_0x30c5d4.code == 80209) {
                                process.stdout.write("----完成标识");
                                $.txj = false;
                            } else {
                                console.log(JSON.stringify(_0x30c5d4));
                            }
                        }
                    }
                }
            } catch (_0x449ef5) {
                $.logErr(_0x449ef5, _0x175947);
            } finally {
                _0x79f9b(_0x30c5d4);
            }
        });
    });
}

async function fuck_0x384a43(_0x4a3c1c) {
    const _0x12b0d2 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x2fc947 = _0x12b0d2,
        _0x419aac = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x2fc947,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x2fc947 = await fuck_0x55d6cc.getbody(_0x419aac);

    if (!_0x2fc947) {
        return;
    }

    return new Promise(async _0xf27cd7 => {
        $.dpost(fuck_0xb02cb4(_0x2fc947), async (_0x36bb35, _0x3d41d1, _0x33f88e) => {
            try {
                if (_0x36bb35) {
                    console.log("" + JSON.stringify(_0x36bb35));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x36bb35.includes("403") && ($.banip = true);
                } else {
                    _0x33f88e = JSON.parse(_0x33f88e);

                    if (_0x33f88e.code == 0) {
                        const _0x2ee765 = _0x33f88e.data.prizeType;

                        if (!_0x2ee765) {
                            fail++;
                        }

                        switch (_0x2ee765) {
                            case 1:
                                process.stdout.write("垃.圾.券⚫");
                                $.txjsuc && $.fail++;
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x534478 = parseFloat(_0x33f88e.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x534478 + "现金💰️");
                                fuck_0x2d11ee.push(_0x534478);
                                const _0xf4cd90 = {
                                    prizeValue: _0x33f88e.data.prizeValue,
                                    id: _0x33f88e.data.id,
                                    poolBaseId: _0x33f88e.data.poolBaseId,
                                    prizeGroupId: _0x33f88e.data.prizeGroupId,
                                    prizeBaseId: _0x33f88e.data.prizeBaseId,
                                    prizeType: _0x33f88e.data.prizeType,
                                    amount: _0x33f88e.data.amount
                                };
                                fuck_0x10e612.push(_0xf4cd90);
                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x3e4096 = parseFloat(_0x33f88e.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x3e4096 + "红包🧧");
                                fuck_0x2a1653.push(_0x3e4096);
                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x33f88e.data));
                        }
                    } else {
                        if (_0x33f88e.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            if (_0x33f88e.errMsg.includes("结束")) {
                                $.end = true;
                                $.hotflag = false;
                                console.log(_0x33f88e.errMsg);
                            } else {
                                _0x33f88e.errMsg.includes("未登录") ? ($.end = true, $.hotflag = false, console.log(_0x33f88e.errMsg)) : ($.hotflag = false, console.log(_0x33f88e.errMsg));
                            }
                        }
                    }
                }
            } catch (_0x253e45) {
                $.logErr(_0x253e45, _0x3d41d1);
            } finally {
                _0xf27cd7(_0x33f88e);
            }
        });
    });
}

async function fuck_0x2b4423(_0x964b9e) {
    const _0x529197 = {
        pageNum: _0x964b9e,
        pageSize: 100,
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        business: "fission"
    };
    let _0x5e6486 = _0x529197,
        _0x49daa5 = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x5e6486,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x5e6486 = await fuck_0x55d6cc.getbody(_0x49daa5);

    if (!_0x5e6486) {
        return;
    }

    const _0x1860e7 = {
        url: "https://api.m.jd.com/api",
        body: _0x5e6486 + "&loginType=2&loginWQBiz=wegame&uuid=" + $.uuid + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone10,2&lang=zh_CN&osVersion=&partner=-1&cthr=1",
        headers: {},
        ciphers: fuck_0x2f1ef5.cpstr
    };
    _0x1860e7.headers.Accept = "application/json, text/plain, */*";
    _0x1860e7.headers["x-rp-client"] = "h5_1.0.0";
    _0x1860e7.headers["Accept-Language"] = "zh-cn";
    _0x1860e7.headers["Accept-Encoding"] = "gzip, deflate, br";
    _0x1860e7.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _0x1860e7.headers.Origin = "https://pro.m.jd.com";
    _0x1860e7.headers["User-Agent"] = $.UA;
    _0x1860e7.headers.Referer = "https://pro.m.jd.com/";
    _0x1860e7.headers["x-referer-page"] = "https://pro.m.jd.com/";
    _0x1860e7.headers["request-from"] = "native";
    _0x1860e7.headers.Cookie = fuck_0x144194;
    return new Promise(async _0x588b8e => {
        $.dpost(_0x1860e7, async (_0x1612fe, _0x3b5d0b, _0x56d28e) => {
            try {
                _0x1612fe ? (console.log("" + JSON.stringify(_0x1612fe)), console.log(" API请求失败，请检查网路重试"), _0x1612fe.includes("403") && ($.banip = true), _0x56d28e = "") : (_0x56d28e = JSON.parse(_0x56d28e), _0x56d28e.code == 0 ? $.baglist = _0x56d28e.data.items : console.log(_0x56d28e.errMsg));
            } catch (_0xb1d910) {
                $.logErr(_0xb1d910, _0x3b5d0b);
            } finally {
                _0x588b8e(_0x56d28e);
            }
        });
    });
}

async function fuck_0x38493f(_0xeb1acd, _0x4baf4a) {
    let _0x817c5c = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0xeb1acd.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0xeb1acd.poolBaseId + ",\"prizeGroupId\":" + _0xeb1acd.prizeGroupId + ",\"prizeBaseId\":" + _0xeb1acd.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x3b77cf => {
        $.dpost(fuck_0xb02cb4(_0x817c5c), async (_0x554434, _0x84faf8, _0x54240b) => {
            try {
                if (_0x554434) {
                    console.log("" + JSON.stringify(_0x554434));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x554434.includes("403") && ($.banip = true);
                } else {
                    _0x54240b = JSON.parse(_0x54240b);

                    if (_0x54240b.code == 0) {
                        if (_0x54240b.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("" + (!$.txfail ? "❌" : "❌ "));
                            $.txfail = true;
                        } else {
                            if (_0x54240b.data.message.includes("上限")) {
                                !fuck_0x376b86 && process.stdout.write("♻️ ");
                                $.txfull = true;
                                $.txfail = false;
                            } else {
                                _0x54240b.data.message.includes("提现") ? (process.stdout.write("✔️ "), $.txsuc.push(_0x4baf4a), $.txfail = false) : console.log(_0x54240b.data.message);
                            }
                        }
                    } else {
                        console.log(_0x54240b.errMsg);
                    }
                }
            } catch (_0xec5342) {
                $.logErr(_0xec5342, _0x84faf8);
            } finally {
                _0x3b77cf(_0x54240b);
            }
        });
    });
}

async function fuck_0x252e09(_0x53af45, _0x57c23b) {
    let _0x1321e1 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x53af45.id + ",\"business\":\"fission\",\"poolId\":" + _0x53af45.poolBaseId + ",\"prizeGroupId\":" + _0x53af45.prizeGroupId + ",\"prizeId\":" + _0x53af45.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x26e968 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: fuck_0x144194
    };
    const _0x57a4ae = {
        url: "https://api.m.jd.com/api",
        body: _0x1321e1,
        headers: _0x26e968
    };
    return new Promise(async _0x22389f => {
        $.dpost(_0x57a4ae, async (_0x176173, _0x2295a8, _0x3db70c) => {
            try {
                if (_0x176173) {
                    console.log("" + JSON.stringify(_0x176173));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x176173.includes("403") && ($.banip = true);
                } else {
                    _0x3db70c = JSON.parse(_0x3db70c);

                    if (_0x3db70c.code == 0) {
                        _0x3db70c.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x57c23b)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x3db70c.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3db70c.errMsg);
                    }
                }
            } catch (_0x24418e) {
                $.logErr(_0x24418e, _0x2295a8);
            } finally {
                _0x22389f(_0x3db70c);
            }
        });
    });
}

function fuck_0xb02cb4(_0x153e5c) {
    const _0x2dd72d = {
        Host: "api.m.jd.com",
        Origin: "https://pro.m.jd.com",
        Referer: "https://pro.m.jd.com/",
        "User-Agent": $.UA,
        Cookie: fuck_0x144194
    };
    const _0x4127c5 = {
        url: "https://api.m.jd.com/?" + _0x153e5c,
        headers: _0x2dd72d
    };
    return _0x4127c5;
}

function fuck_0x4d2ba2() {
    return new Promise(_0x3a22fe => {
        const _0x3a2daf = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: {},
            timeout: 10000
        };
        _0x3a2daf.headers.Cookie = fuck_0x144194;
        _0x3a2daf.headers.referer = "https://h5.m.jd.com/";
        _0x3a2daf.headers["User-Agent"] = $.UA;
        $.get(_0x3a2daf, (_0x4c91a4, _0x1e41f2, _0x18eb1f) => {
            try {
                if (_0x18eb1f) {
                    _0x18eb1f = JSON.parse(_0x18eb1f);

                    if (!(_0x18eb1f.islogin === "1")) {
                        _0x18eb1f.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x404327) {
                console.log(_0x404327);
            } finally {
                _0x3a22fe();
            }
        });
    });
}

function fuck_0x22542f() {
    return new Promise(_0x298f92 => {
        !fuck_0x409e24 ? $.msg($.name, "", "" + fuck_0x132133) : $.log("京东账号" + $.index + $.nickName + "\n" + fuck_0x132133);

        _0x298f92();
    });
}

function fuck_0x2d17ab(_0x19bf6a) {
    try {
        if (typeof JSON.parse(_0x19bf6a) == "object") {
            return true;
        }
    } catch (_0x133512) {
        console.log(_0x133512);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function fuck_0x282be4(_0x2749e1) {
    const _0x186af1 = _0x2749e1.getFullYear(),
        _0x5a6284 = ("0" + (_0x2749e1.getMonth() + 1)).slice(-2),
        _0x12cba1 = ("0" + _0x2749e1.getDate()).slice(-2),
        _0x2be304 = ("0" + _0x2749e1.getHours()).slice(-2),
        _0x16f582 = ("0" + _0x2749e1.getMinutes()).slice(-2),
        _0x31a86f = ("0" + _0x2749e1.getSeconds()).slice(-2);

    return _0x186af1 + "/" + _0x5a6284 + "/" + _0x12cba1 + " " + _0x2be304 + ":" + _0x16f582 + ":" + _0x31a86f;
}

function fuck_0x368bd7(_0x30a1db) {
    if (typeof _0x30a1db == "string") {
        try {
            return JSON.parse(_0x30a1db);
        } catch (_0x242ce7) {
            console.log(_0x242ce7);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }