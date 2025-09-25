/*
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd新农场
33 6,16 * * * jd_fruit_new.js

*/
let lnrun = 0;
const $ = new Env('新农场任务');
const _0x44b5a1 = 100;

let _0x8373d2 = false,
    _0x55cd64 = [],
    _0x508fe9 = "",
    _0x5ab902,
    _0x325e00,
    _0x3f5b84 = "",
    _0x1e0def = "",
    _0x18174f = "",
    _0x5ee868 = {},
    _0x5b0491 = false,
    _0xd90c02 = 0;

const _0x505ab6 = "https://api.m.jd.com/client.action",
    _0x21d592 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";

let _0x1ea173 = process.env.FRUIT_ID ? process.env.FRUIT_ID : "";

const _0x28fc45 = require("./USER_AGENTS"),
    _0xb25d5b = require("fs"),
    _0x12df80 = require("./function/dylib"),
    _0x36137a = require("./function/dylanv"),
    _0xb02211 = require("./function/jdCommon1"),
    {
        H5st: _0x26c9b1
    } = require("./function/jdCrypto");

if (process.env.DY_PROXY) {
    const _0x397819 = require("./function/proxy.js");

    $.get = _0x397819.intoRequest($.get.bind($));
    $.post = _0x397819.intoRequest($.post.bind($));
}

let _0x1278eb = [];
$.reqnum = 1;
const _0x15d46f = {
    "farm_home": "c57f6",
    "farm_do_task": "28981",
    "farm_task_receive_award": "33e0f",
    "farm_water": "28981",
    "farm_assist_receive_award": "c4332",
    "farm_rain_round_icon": "c57f6",
    "farm_rain_reward": "c57f6"
},
    _0x4b0b7f = {
        "dongDongFarmSignHome": "deba1",
        "dongDongFarmSignIn": "65f9d",
        "wheelsHome": "c06b7",
        "wheelsLottery": "bd6c8",
        "apsDoTask": "54ed7"
    };
!(async () => {
    await _0x30387c();

    if (!_0x55cd64[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n版本：2023/3/7 优化");
    $.log("问题建议：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量（可选项）：");
    $.log("export DY_PROXY='api_url' 可使用代理API");
    $.log("export FRUIT_ID='UID' 未种植可设置商品UID来自动种植\n");
    if (process.env.NO_WATER == "true" && 0) _0x3f5b84 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n"); else {
        if (process.env.DO_TEN_WATER_AGAIN == "true" && 0) {
            _0x3f5b84 = "【攒水滴模式已开启，每天只浇水10次！】\n\n";
            $.log("【攒水滴模式已开启，每天只浇水10次！】\n");
        }
    }

    for (let _0x5a2ba1 = 0; _0x5a2ba1 < _0x55cd64.length; _0x5a2ba1++) {
        if (_0x55cd64[_0x5a2ba1]) {
            _0x508fe9 = _0x55cd64[_0x5a2ba1];
            $.UserName = decodeURIComponent(_0x508fe9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x508fe9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x5a2ba1 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            ct = 0;
            $.kuwei = false;
            await _0x4aaaa5();
            console.log("\n------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x5ab902.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x1e0def = "";
            _0x18174f = "";
            _0x5ee868 = {};
            $.UA = _0x28fc45.UARAM ? _0x28fc45.UARAM() : _0x28fc45.USER_AGENT;
            $.UUID = _0xb02211.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            await _0x584f34();
            await $.wait(2000);
        }
    }

    _0xb25d5b.writeFile("./fruit_helpcode_new", JSON.stringify(_0x1278eb), _0x2563fe => {
        _0x2563fe && console.log(_0x2563fe);
    });

    $.isNode() && _0x3f5b84 && $.ctrTemp && (await _0x5ab902.sendNotify("" + $.name, "" + _0x3f5b84));
})().catch(_0x1602d0 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1602d0 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x584f34() {
    _0x18174f = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x308e22();
        await $.wait(500);

        if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
            _0x1e0def = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
            console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
            console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
            _0x1e0def += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";

            _0x1278eb.push($.farmInfo.data.result.farmHomeShare.inviteCode);

            await _0x777aea();

            if ($.farmInfo.data.result.treeFullStage === 5 || $.kuwei) {
                if ($.farmInfo.data.result.treeFullStage === 5) _0x5ee868["open-url"] = _0x21d592, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x5ee868), await _0x5ab902.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换"); else $.kuwei && console.log("\n" + $.farmInfo.data.result.skuName + "   枯萎了，重新种植吧！");
                console.log("\n种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
                await _0xfe2753();

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                    console.log("\n===============1级商品(UID)最快20天种成=================");

                    for (let _0x16ce6e of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                        console.log(_0x16ce6e.skuName + "(" + _0x16ce6e.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                    console.log("\n===============2级商品(UID)最快30天种成=================");

                    for (let _0x3a2232 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                        console.log(_0x3a2232.skuName + "(" + _0x3a2232.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                    console.log("\n===============3级商品(UID)最快41天种成=================");

                    for (let _0x4c1ad0 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                        console.log(_0x4c1ad0.skuName + "(" + _0x4c1ad0.uid + ")");
                    }
                }

                if (_0x1ea173) {
                    console.log("\n\n已设置种植目标，开始种植。。。");
                    await _0x34c915(_0x1ea173);

                    if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
                        console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
                        return;
                    }
                }

                return;
            } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"));

            await _0x449698();
            $.rain_round.data.result.curRoundToken && (console.log("\n开始水滴红包雨..."), await $.wait(1000), await _0x4cdb4b($.rain_round.data.result.curRoundToken), await _0x4cd30f($.rain_round.data.result.curRoundToken), $.rain_reward.data.bizCode == 0 && console.log("获得水滴" + $.rain_reward.data.result.waterRainPrize[0].value + "g💧"));
            await _0x2efa06();
            await _0x120956();
            process.env.DO_TEN_WATER_AGAIN != "true" || 1 ? ($.log("执行继续浇水..."), await _0x2fda93()) : $.log("不执行再次浇水，攒水滴!");
            await $.wait(500);
            await _0x308e22();
            console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%");
            _0x1e0def += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n";
            _0x1e0def += "【剩余水滴】" + _0xd90c02 + "g💧\n";
        } else {
            if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
                console.log("没有种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
                await _0xfe2753();

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                    console.log("\n===============1级商品(UID)最快20天种成=================");

                    for (let _0x348ba3 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                        console.log(_0x348ba3.skuName + "(" + _0x348ba3.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                    console.log("\n===============2级商品(UID)最快30天种成=================");

                    for (let _0x8650fa of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                        console.log(_0x8650fa.skuName + "(" + _0x8650fa.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                    console.log("\n===============3级商品(UID)最快41天种成=================");

                    for (let _0x3b2fbb of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                        console.log(_0x3b2fbb.skuName + "(" + _0x3b2fbb.uid + ")");
                    }
                }

                if (_0x1ea173) {
                    console.log("\n\n已设置种植目标，开始种植。。。");
                    await _0x34c915(_0x1ea173);

                    if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
                        console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
                        return;
                    }
                }

                $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
                $.isNode() && (await _0x5ab902.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
                return;
            } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x1e0def = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
        }
    } catch (_0x32722b) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
        $.logErr(_0x32722b);
    }

    await _0x264751();
}

async function _0x120956() {
    await _0x468ce7();
    console.log("\n开始日常任务...");

    for (let _0x4dfc6d of $.farmTask.data.result.taskList) {
        if (_0x4dfc6d.taskStatus == 3) {
            console.log(_0x4dfc6d.mainTitle + "已完成");
            continue;
        }

        console.log("去做 " + _0x4dfc6d.mainTitle);

        if (_0x4dfc6d.taskStatus == 2) {
            await _0x3fc871(_0x4dfc6d.taskType, _0x4dfc6d.taskId);
            $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
            continue;
        }

        switch (_0x4dfc6d.taskType) {
            case "CUMULATIVE_TIMES":
                break;

            case "ORDER_MARK":
                break;

            case "EXTERNAL_BROWSE":
            case "BROWSE_CHANNEL":
            case "BROWSE_PRODUCT":
                if (!_0x4dfc6d.taskSourceUrl) {
                    await _0x592486(_0x4dfc6d.taskType, _0x4dfc6d.taskId);
                    let _0xf036c8 = $.taskDetail.data.result.taskDetaiList;
                    _0x4dfc6d.taskSourceUrl = _0xf036c8[Math.floor(Math.random() * _0xf036c8.length)].itemId;
                }

                await _0x333df4(_0x4dfc6d.taskType, _0x4dfc6d.taskId, Buffer.from(_0x4dfc6d.taskSourceUrl).toString("base64")), await $.wait(_0x4dfc6d.timePeriod * 1000), await _0x3fc871(_0x4dfc6d.taskType, _0x4dfc6d.taskId);
                $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
                break;

            default:
                console.log(_0x4dfc6d.taskType + " 类型未支持");
                break;
        }
    }

    await _0xe4f976();
    await $.wait(500);
}

async function _0x3bdc30() {
    console.log("开始预测水果成熟时间...\n");
    await initForFarm();
    if (!$.farmInfo.farmUserPro) await initForFarm();
    await _0x468ce7();
    let _0x1e1217 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x1e0def += "【今日共浇水】" + _0x1e1217 + "次\n";
    _0x1e0def += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    _0x1e0def += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";

    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        _0x1e0def += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x1e0def += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");

    let _0x3a4993 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

    if (_0x1e1217 > 2) {
        let _0x43dd89 = Math.ceil(_0x3a4993 / _0x1e1217) || 0;

        _0x1e0def += "【预测】" + (_0x43dd89 === 1 ? "明天" : _0x43dd89 === 2 ? "后天" : _0x43dd89 + "天之后") + "(" + _0x8f2ed9(24 * 60 * 60 * 1000 * _0x43dd89 + Date.now()) + "日)可兑换水果🍉\n";
    } else _0x1e0def += "【预测】不浇水无限期\n";
}

async function _0x2efa06() {
    await _0x468ce7();

    if (JSON.stringify($.farmTask.data.result.taskList).includes("\"每日累计浇水10次\",\"singleTask\":true,\"subTitle\":\"完成任务，奖励10g水滴\",\"taskDoTimes\":10") === false) {
        console.log("\n准备浇水十次");
        _0x5b0491 = false;

        for (let _0x553dc7 = 0; _0x553dc7 < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x553dc7++) {
            console.log("第" + (_0x553dc7 + 1) + "次浇水");
            await _0x407223(1);

            if ($.waterResult.data.bizCode === 0) {
                console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);

                if ($.waterResult.data.result.finished) {
                    _0x5b0491 = true;
                    break;
                } else {
                    if ($.waterResult.data.result.bottleWater < 10) {
                        console.log("水滴不够，结束浇水\n");
                        break;
                    }
                }
            } else {
                if ($.waterResult.data.bizCode === 4) {
                    console.log("水滴不够，结束浇水\n");
                    break;
                } else {
                    console.log("浇水出现失败异常,跳出不在继续浇水\n");
                    break;
                }
            }

            _0xd90c02 = $.waterResult.data.result.bottleWater;
        }

        _0x5b0491 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP查看"), $.done(), $.isNode() && (await _0x5ab902.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
    } else console.log("\n今日已完成10次浇水任务\n");
}

async function _0x2fda93() {
    console.log("检查剩余水滴能否继续浇水...\n");
    await _0x308e22();
    _0xd90c02 = $.farmInfo.data.result.bottleWater;
    console.log("剩余水滴" + _0xd90c02 + "g\n");

    let _0x37b52b = _0xd90c02 - _0x44b5a1;

    if (_0x37b52b >= 10) {
        $.log("\n开始浇水...");
        console.log("目前剩余水滴：" + _0xd90c02 + "g，可继续浇水");
        _0x5b0491 = false;

        for (let _0x289479 = 0; _0x289479 < parseInt(_0x37b52b / 10); _0x289479++) {
            $.log("浇水" + (_0x289479 + 1) + "次");
            await _0x407223(1);

            if ($.waterResult.code === 0) {
                console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");

                if ($.waterResult.data.result.finished) {
                    _0x5b0491 = true;
                    $.log("水果已成熟啦！\n");
                    break;
                } else { }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        _0xd90c02 = $.waterResult.data.result.bottleWater;
    } else console.log("目前剩余水滴：【" + _0xd90c02 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");

    if (_0x5b0491) {
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看");
        $.done();
        $.isNode() && (await _0x5ab902.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换"));
    }
}

function _0x3b2725() {
    return new Promise(async _0x153d2d => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g💧");
            await _0x91e520("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));

            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");
            }
        } else {
            if ($.waterResult.waterStatus === 1) console.log("果树开花了,奖励40g💧"), await _0x91e520("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"); else $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g💧"), await _0x91e520("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
        }

        _0x153d2d();
    });
}

async function _0xbdf075() {
    await _0x492242();

    if ($.initForTurntableFarmRes && $.initForTurntableFarmRes.code === 0) {
        console.log("\n开始天天抽奖任务...");
        await _0x3ff8cd();
        if ($.wheeltaskRes.code == 0) for (let _0x5455bd of $.wheeltaskRes.data) {
            if (_0x5455bd.taskFinished) {
                console.log(_0x5455bd.taskTitle + "----" + _0x5455bd.taskShowTitle + " 已完成");
                continue;
            }

            await _0x24bcae(_0x5455bd.taskType, _0x5455bd.id, _0x5455bd.taskSourceUrl);
            if ($.wheeldoRes && $.wheeldoRes.code == 0) console.log("任务完成，获得1次抽奖机会"); else {
                console.log("错误了，403");
                break;
            }
            await $.wait(3000);
        }
        await _0x492242();

        if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
            console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
            console.log("开始抽奖...");
            let _0x487c22 = "";

            for (let _0x1e07cb = 0; _0x1e07cb < $.initForTurntableFarmRes.data.lotteryChances; _0x1e07cb++) {
                await _0x424b6b();
                console.log("第" + (_0x1e07cb + 1) + "次抽奖");

                if ($.lotteryRes && $.lotteryRes.code === 0) {
                    _0x487c22 += $.lotteryRes.data.prizeName + "，";

                    if ($.lotteryRes.data.lotteryChances === 0) {
                        break;
                    }
                } else {
                    console.log("错误了！");
                    break;
                }

                await $.wait(3000);
            }

            _0x487c22 && console.log("天天抽奖奖励：" + _0x487c22.substr(0, _0x487c22.length - 1) + "\n");
        } else console.log("天天抽奖无次数！");
    } else console.log("初始化天天抽奖得好礼失败！");
}

async function _0xe4f976() {
    await _0x3c4545();

    if ($.farmAssistResult.code === 0) {
        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 2) {
            if ($.farmAssistResult.data.result.status === 2) {
                let _0x222118 = 0;

                for (let _0x25235e of Object.keys($.farmAssistResult.data.result.assistStageList)) {
                    let _0x259ffa = $.farmAssistResult.data.result.assistStageList[_0x25235e];
                    _0x259ffa.stageStaus === 2 && (await _0x22c17c(), await $.wait(500), $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x25235e) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x222118 += $.receiveStageEnergy.data.result.amount));
                }

                _0x1e0def += "【额外奖励】" + _0x222118 + "g💧领取完成\n";
                console.log("【额外奖励】" + _0x222118 + "g💧领取完成\n");
            } else $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x1e0def += "【额外奖励】已领取过\n");
        } else console.log("助力好友未达到2个"), _0x1e0def += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
            let _0x54130e = "";
            $.farmAssistResult.data.result.assistFriendList.map((_0x588cd1, _0x2a3126) => {
                _0x2a3126 === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x54130e += _0x588cd1.nickname || "匿名用户" : _0x54130e += (_0x588cd1.nickname || "匿名用户") + ",";

                let _0x2948a1 = new Date(_0x588cd1.time),
                    _0x1ce3eb = _0x2948a1.getFullYear() + "/" + ("0" + (_0x2948a1.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x2948a1.getDate()).slice(-2) + " " + ("0" + _0x2948a1.getHours()).slice(-2) + ":" + ("0" + _0x2948a1.getMinutes()).slice(-2) + ":" + ("0" + _0x2948a1.getSeconds()).slice(-2);

                console.log("【" + (_0x588cd1.nickname || "匿名用户") + "】 在 " + _0x1ce3eb + " 给您助过力");
            });
            _0x1e0def += "【助力您的好友】" + _0x54130e + "\n";
        }

        console.log("\n领取额外奖励水滴结束\n");
    } else {
        await _0x2ce96c();

        if ($.masterHelpResult.code === "0") {
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
                if (!$.masterHelpResult.masterGotFinal) {
                    await _0x43a6e9();
                    $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x1e0def += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n");
                } else console.log("已经领取过5好友助力额外奖励"), _0x1e0def += "【额外奖励】已被领取过\n";
            } else console.log("助力好友未达到5个"), _0x1e0def += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x5cf52d = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x1e5213, _0x3bb90d) => {
                    _0x3bb90d === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x5cf52d += _0x1e5213.nickName || "匿名用户" : _0x5cf52d += (_0x1e5213.nickName || "匿名用户") + ",";

                    let _0x2a07b2 = new Date(_0x1e5213.time),
                        _0x770054 = _0x2a07b2.getFullYear() + "-" + (_0x2a07b2.getMonth() + 1) + "-" + _0x2a07b2.getDate() + " " + _0x2a07b2.getHours() + ":" + _0x2a07b2.getMinutes() + ":" + _0x2a07b2.getMinutes();

                    console.log("【" + (_0x1e5213.nickName || "匿名用户") + "】 在 " + _0x770054 + " 给您助过力");
                });
                _0x1e0def += "【助力您的好友】" + _0x5cf52d + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x3b49f4() {
    let _0x26f9aa = !$.farmTask.waterRainInit.f;

    if (_0x26f9aa) {
        console.log("水滴雨任务，每天两次，最多可得10g水滴");
        console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));

        if ($.farmTask.waterRainInit.lastTime) {
            if (Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000) {
                _0x26f9aa = false;
                console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n");
            }
        }

        if (_0x26f9aa) {
            console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次");
            await _0x1ae390();
            console.log("水滴雨waterRain");

            if ($.waterRain.code === "0") {
                console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧");
                console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n");
            }
        }
    } else {
        console.log("【水滴雨】已全部完成\n");
    }
}

async function _0x777aea() {
    await _0x41ba61();

    if ($.clockInInit.code === 0) {
        if ($.clockInInit.data.signInFlag == 0) {
            console.log("\n开始今日签到");
            await _0x2c2f07();
            if ($.clockInForFarmRes.code === 0) console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n"); else $.clockInForFarmRes.code === 210000 ? (console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)), $.kuwei = true) : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
        }
    }
}

async function _0x8904() {
    await _0x3a5aed();
    console.log("\n开始给好友浇水...");
    await _0x468ce7();
    const {
        waterFriendCountKey: _0x4b1b6c,
        waterFriendMax: _0x5ea051
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0x4b1b6c + "个好友浇水");

    if (_0x4b1b6c < _0x5ea051) {
        let _0x461dd6 = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x5d8e82, _0x5b78a8) => {
                _0x5d8e82.friendState === 1 && _0x461dd6.length < _0x5ea051 - _0x4b1b6c && _0x461dd6.push(_0x5d8e82.shareCode);
            });
            _0x461dd6.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x461dd6));
            _0x461dd6.length == 0 && console.log("没有需要浇水的好友!\n");
            let _0x1f16ee = 0,
                _0x31779f = "";

            for (let _0x38f331 = 0; _0x38f331 < _0x461dd6.length; _0x38f331++) {
                await _0x33d0bb(_0x461dd6[_0x38f331]);
                console.log("为第" + (_0x38f331 + 1) + "个好友浇水");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x1f16ee++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");
                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x31779f += "水滴换豆卡,"; else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x31779f += "快速浇水卡,"; else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x31779f += "水滴翻倍卡,"; else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x31779f += "加签卡,");
                            }
                        }
                    }
                } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
            }

            _0x1f16ee > 0 && console.log("已给" + _0x1f16ee + "个好友浇水,消耗" + _0x1f16ee * 10 + "g水\n");
            _0x31779f && _0x31779f.length > 0 && console.log("【好友浇水奖励】" + _0x31779f.substr(0, _0x31779f.length - 1) + "\n");
        } else console.log("好友列表无好友,快去邀请您的好友吧!\n");
    } else console.log("今日已为" + _0x5ea051 + "个好友浇水\n");
}

async function _0x224a4d() {
    await _0x468ce7();
    const {
        waterFriendCountKey: _0x33f1fa,
        waterFriendMax: _0x5150ca,
        waterFriendSendWater: _0x18263b,
        waterFriendGotAward: _0x2fafe9
    } = $.farmTask.waterFriendTaskInit;
    _0x33f1fa >= _0x5150ca ? !_0x2fafe9 ? (await _0x3cce32(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n") : console.log("给" + _0x5150ca + "个好友浇水未完成\n");
}

async function _0x17afe3() {
    for (let _0x273ef0 of _0x325e00) {
        if (_0x273ef0 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0x54e3bb(_0x273ef0);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友"); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
}

async function _0xf4f1f2() {
    for (let _0x4292d4 = 0; _0x4292d4 < 10; _0x4292d4++) {
        $.duckRes = await _0x387508("getFullCollectionReward", {
            "type": 2,
            "version": 24,
            "channel": 1,
            "babelChannel": "121"
        });

        if ($.duckRes.code === "0") {
            if (!$.duckRes.hasLimit) console.log("小鸭子游戏:" + $.duckRes.title); else {
                console.log("" + $.duckRes.title);
                break;
            }
        } else {
            if ($.duckRes.code === "10") {
                console.log("小鸭子游戏达到上限");
                break;
            }
        }
    }
}

async function _0x331a13() {
    $.totalWaterReward = await _0x387508("totalWaterTaskForFarm");
}

async function _0x2f931b() {
    $.firstWaterReward = await _0x387508("firstWaterTaskForFarm");
}

async function _0x181b8a() {
    $.newtaskinfo = await _0x387508("gotNewUserTaskForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x26a87e() {
    $.newtaskinfo = await _0x387508("gotLowFreqWaterForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x308e22() {
    $.farmInfo = await _0x387508("farm_home", {
        "version": 1
    });
}

async function _0x449698() {
    $.rain_round = await _0x387508("farm_rain_round_icon", {
        "version": 1
    });
}

async function _0x4cdb4b(_0x434f5f) {
    $.rain_page = await _0x387508("farm_rain_page", {
        "version": 1,
        "token": _0x434f5f
    });
}

async function _0x4cd30f(_0x26cd16) {
    $.rain_reward = await _0x387508("farm_rain_reward", {
        "version": 1,
        "token": _0x26cd16,
        "bcc": 200,
        "scc": 0
    });
}

async function _0x3cce32() {
    $.waterFriendGotAwardRes = await _0x387508("waterFriendGotAwardForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x45fe77() {
    $.myCardInfoRes = await _0x387508("myCardInfoForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x52deb1(_0x25671d) {
    $.userMyCardRes = await _0x387508("userMyCardForFarm", {
        "cardType": _0x25671d
    });
}

async function _0x91e520(_0x17bf8f) {
    $.gotStageAwardForFarmRes = await _0x387508("gotStageAwardForFarm", {
        "type": _0x17bf8f
    });
}

async function _0x407223(_0x58fb2c) {
    await $.wait(1000);
    $.waterResult = await _0x387508("farm_water", {
        "version": 1,
        "waterType": _0x58fb2c
    });
}

async function _0x492242() {
    $.initForTurntableFarmRes = await _0x512e18("wheelsHome", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0x3ff8cd() {
    $.wheeltaskRes = await _0x512e18("apTaskList", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0x24bcae(_0x4bb160, _0x4919c4, _0x528c23) {
    $.wheeldoRes = await _0x512e18("apsDoTask", {
        "taskType": _0x4bb160,
        "taskId": _0x4919c4,
        "channel": 4,
        "checkVersion": true,
        "linkId": "VssYBUKJOen7HZXpC8dRFA",
        "itemId": _0x528c23
    });
}

async function _0x424b6b() {
    $.lotteryRes = await _0x512e18("wheelsLottery", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0xfe2753() {
    $.treeboardRes = await _0x387508("farm_tree_board", {
        "version": 1
    });
}

async function _0x34c915(_0x45af86) {
    $.planttreeRes = await _0x387508("farm_plant_tree", {
        "version": 1,
        "uid": _0x45af86
    });
}

async function _0x1a3d95(_0x4dd6f5) {
    const _0x2738b5 = {
        "type": 2,
        "adId": _0x4dd6f5,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.browserForTurntableFarm2Res = await _0x387508("browserForTurntableFarm", _0x2738b5);
}

async function _0x23e10d() {
    $.lotteryMasterHelpRes = await _0x387508("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 24,
        "channel": 1
    });
}

async function _0x43a6e9() {
    $.masterGotFinished = await _0x387508("masterGotFinishedTaskForFarm");
}

async function _0x2ce96c() {
    $.masterHelpResult = await _0x387508("masterHelpTaskInitForFarm");
}

async function _0x3c4545() {
    $.farmAssistResult = await _0x387508("farm_assist_init_info", {
        "version": 1
    });
}

async function _0x22c17c() {
    $.receiveStageEnergy = await _0x387508("farm_assist_receive_award", {
        "version": 1
    });
}

async function _0x54e3bb() {
    $.inviteFriendRes = await _0x387508("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 4,
        "channel": 2
    });
}

async function _0x395489() {
    $.helpResult = await _0x387508("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0],
        "babelChannel": "3",
        "version": 2,
        "channel": 1
    });
}

async function _0x1ae390() {
    const _0x13a12f = {
        "type": 1,
        "hongBaoTimes": 100,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterRain = await _0x387508("waterRainForFarm", _0x13a12f);
}

async function _0x41ba61() {
    $.clockInInit = await _0x512e18("dongDongFarmSignHome", {
        "linkId": "LCH-fV7hSnChB-6i5f4ayw"
    });
}

async function _0x2c2f07() {
    $.clockInForFarmRes = await _0x512e18("dongDongFarmSignIn", {
        "linkId": "LCH-fV7hSnChB-6i5f4ayw"
    });
}

async function _0x27298a(_0x4e3660, _0x4f0916, _0x539c1a) {
    const _0x2658be = "clockInFollowForFarm";
    let _0x4860af = {
        "id": _0x4e3660,
        "type": _0x4f0916,
        "step": _0x539c1a
    };

    if (_0x4f0916 === "theme") {
        if (_0x539c1a === "1") $.themeStep1 = await _0x387508(_0x2658be, _0x4860af); else _0x539c1a === "2" && ($.themeStep2 = await _0x387508(_0x2658be, _0x4860af));
    } else {
        if (_0x4f0916 === "venderCoupon") {
            if (_0x539c1a === "1") $.venderCouponStep1 = await _0x387508(_0x2658be, _0x4860af); else _0x539c1a === "2" && ($.venderCouponStep2 = await _0x387508(_0x2658be, _0x4860af));
        }
    }
}

async function _0x52a699() {
    $.gotClockInGiftRes = await _0x387508("clockInForFarm", {
        "type": 2,
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x5018ed() {
    $.threeMeal = await _0x387508("gotThreeMealForFarm");
}

async function _0x333df4(_0x1ce483, _0x56f0bd, _0x4036de) {
    $.browseResult = await _0x387508("farm_do_task", {
        "version": 1,
        "taskType": _0x1ce483,
        "taskId": _0x56f0bd,
        "taskInsert": true,
        "itemId": _0x4036de,
        "channel": 0
    });
}

async function _0x3fc871(_0x3c5d19, _0x2b8c85) {
    $.dotaskResult = await _0x387508("farm_task_receive_award", {
        "version": 1,
        "taskType": _0x3c5d19,
        "taskId": _0x2b8c85,
        "channel": 0
    });
}

async function _0x592486(_0x5f5a18, _0xd051a0) {
    $.taskDetail = await _0x387508("farm_task_detail", {
        "version": 1,
        "taskType": _0x5f5a18,
        "taskId": _0xd051a0,
        "channel": 0
    });
}

async function _0x515108() {
    $.goalResult = await _0x387508("gotWaterGoalTaskForFarm", {
        "type": 3
    });
}

async function _0x468ce7() {
    $.farmTask = await _0x387508("farm_task_list", {
        "version": 1,
        "channel": 0
    });
}

async function _0x11e671() {
    $.farmTask = await _0x387508("taskInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "45",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x3a5aed() {
    $.friendList = await _0x387508("friendListInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x3c4690() {
    $.awardInviteFriendRes = await _0x387508("awardInviteFriendForFarm");
}

async function _0x33d0bb(_0x3019f0) {
    const _0x4bfbc2 = {
        "shareCode": _0x3019f0,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterFriendForFarmRes = await _0x387508("waterFriendForFarm", _0x4bfbc2);
}

async function _0x264751() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false"; else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + _0x8373d2 === "false";

    if ($.ctrTemp) {
        $.msg($.name, _0x18174f, _0x1e0def, _0x5ee868);

        if ($.isNode()) {
            _0x3f5b84 += _0x18174f + "\n" + _0x1e0def + ($.index !== _0x55cd64.length ? "\n\n" : "");
        }
    } else $.log("\n" + _0x1e0def + "\n");
}

function _0x8f2ed9(_0x2f2463) {
    let _0x3d08bf;

    return _0x2f2463 ? _0x3d08bf = new Date(_0x2f2463) : _0x3d08bf = new Date(), _0x3d08bf.getFullYear() + "-" + (_0x3d08bf.getMonth() + 1 >= 10 ? _0x3d08bf.getMonth() + 1 : "0" + (_0x3d08bf.getMonth() + 1)) + "-" + (_0x3d08bf.getDate() >= 10 ? _0x3d08bf.getDate() : "0" + _0x3d08bf.getDate());
}

function _0x30387c() {
    return new Promise(_0x21f08e => {
        console.log("开始获取配置文件\n");
        _0x5ab902 = $.isNode() ? require("./sendNotify") : "";

        const _0x26d92a = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0x26d92a).forEach(_0x593c02 => {
                if (_0x26d92a[_0x593c02]) {
                    _0x55cd64.push(_0x26d92a[_0x593c02]);
                }
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else {
            _0x55cd64 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x52f772($.getdata("CookiesJD") || "[]").map(_0x485cde => _0x485cde.cookie)].filter(_0x2d2a1f => !!_0x2d2a1f);
        }

        _0x21f08e();
    });
}

async function _0x1e8027() {
    await _0x387508("ddnc_getTreasureBoxAward", {
        "type": 1,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });
    await $.wait(500);
    await _0x281153();
    await $.wait(2000);

    let _0x5f42a = await _0x387508("ddnc_getTreasureBoxAward", {
        "type": 2,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });

    return _0x5f42a;
}

async function _0x8d3a88() {
    await _0x387508("ddnc_getTreasureBoxAward", {
        "type": 1,
        "babelChannel": "121",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });
    await $.wait(500);
    await _0x11e671();
    await $.wait(2000);

    let _0x37e87c = await _0x387508("ddnc_getTreasureBoxAward", {
        "type": 2,
        "babelChannel": "45",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });

    return _0x37e87c;
}

function _0x281153() {
    return new Promise(_0x11afa5 => {
        const _0x4073d1 = {
            "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            "headers": {
                "Cookie": _0x508fe9,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x4073d1, (_0x230355, _0x31d47a, _0x97f515) => {
            _0x11afa5();
        });
    });
}

function _0x4aaaa5() {
    return new Promise(_0x438974 => {
        const _0x515bdc = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x508fe9,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x515bdc, (_0x4cc095, _0x21a4b0, _0x319312) => {
            try {
                if (_0x319312) {
                    _0x319312 = JSON.parse(_0x319312);

                    if (_0x319312.islogin === "1") { } else _0x319312.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x3ba448) {
                console.log(_0x3ba448);
            } finally {
                _0x438974();
            }
        });
    });
}

async function _0x387508(_0x2ea09c, _0x45810d = {}, _0x45f139 = 1500) {
    $.reqnum++;

    if (_0x15d46f[_0x2ea09c]) {
        let _0x46a6a9 = {
            "appId": _0x15d46f[_0x2ea09c],
            "fn": _0x2ea09c,
            "body": _0x45810d,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x45810d = await _0x36137a.getbody(_0x46a6a9);
    } else {
        _0x45810d = "functionId=" + _0x2ea09c + "&body=" + encodeURIComponent(JSON.stringify(_0x45810d)) + "&appid=signed_wh5";
    }

    return new Promise(_0x5a23a3 => {
        setTimeout(() => {
            $.get(_0x3e1282(_0x45810d), (_0x40f612, _0x287d24, _0x4cc42a) => {
                try {
                    _0x40f612 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x40f612)), console.log("function_id:" + _0x2ea09c), $.logErr(_0x40f612)) : _0x397b0e(_0x4cc42a) && (_0x4cc42a = JSON.parse(_0x4cc42a));
                } catch (_0x1d544f) {
                    $.logErr(_0x1d544f, _0x287d24);
                } finally {
                    _0x5a23a3(_0x4cc42a);
                }
            });
        }, _0x45f139);
    });
}

async function _0x454a07(_0x221974, _0x4a5c26 = {}) {
    return new Promise(async _0xdfd0ba => {
        let _0x3c9682 = "POST",
            _0x4625bb;

        const _0x4758f7 = {
            "wqDefault": "false",
            "rfs": "0000",
            "cthr": "1",
            "loginType": "",
            "loginWQBiz": "wegame",
            "openudid": $.UUID,
            "uuid": $.UUID,
            "build": "169107",
            "screen": "430*932",
            "networkType": "wifi",
            "d_brand": "iPhone",
            "d_model": "iPhone16,2",
            "lang": "zh_CN",
            "osVersion": _0xb02211.getLatestIOSVersion(),
            "partner": ""
        };

        if (_0x4b0b7f[_0x221974]) {
            _0x1d7f09 = {
                "appId": _0x4b0b7f[_0x221974],
                "functionId": _0x221974,
                "appid": "activities_platform",
                "clientVersion": _0xb02211.getLatestAppVersion(),
                "client": "ios",
                "body": _0x4a5c26,
                "version": "4.4",
                "ua": $.UA,
                "t": true
            };

            let _0x5ba666 = await _0x26c9b1.getH5st(_0x1d7f09);

            _0x4a5c26 = _0x5ba666.paramsData;
        } else {
            _0x3c9682 = "GET";
            _0x4a5c26 = {
                "functionId": _0x221974,
                "body": JSON.stringify(_0x4a5c26),
                "t": Date.now(),
                "appid": "activities_platform",
                "client": "ios",
                "clientVersion": _0xb02211.getLatestAppVersion()
            };
            _0x4625bb = Object.assign(_0x4a5c26, _0x4758f7);
        }

        const _0x389b07 = {
            "url": "https://api.m.jd.com/api",
            "method": _0x3c9682,
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": _0x508fe9,
                "Host": "api.m.jd.com",
                "Referer": "https://h5.m.jd.com/",
                "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
                "Origin": "https://h5.m.jd.com",
                "x-rp-client": "h5_1.0.0",
                "User-Agent": $.UA
            },
            "params": _0x4625bb,
            "data": _0x4a5c26,
            "timeout": 30000,
            "httpsTlsOptions": ["wheelsHome", "wheelsLottery"].includes(_0x221974) ? _0xb02211.useAppTls() : null
        };
        ["wheelsHome", "apsDoTask", "wheelsLottery", "apTaskList"].includes(_0x221974) && (_0x389b07.headers.Referer = "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA", _0x389b07.headers.Origin = "https://lotterydraw-new.jd.com", _0x389b07.headers["X-Referer-Page"] = "https://lotterydraw-new.jd.com/");

        const _0x461f8d = await _0xb02211.request(_0x389b07);

        _0xdfd0ba(_0x461f8d.data);
    });
}

function _0x466ac6(_0x20b895, _0x4c7c4a, _0x429b46) {
    if (_0x20b895 == null) return "";
    var _0x266af3 = [];

    var _0x4dec85 = typeof _0x20b895;

    if (_0x4dec85 == "string" || _0x4dec85 == "number" || _0x4dec85 == "boolean") _0x266af3.push(_0x4c7c4a + "=" + (_0x429b46 == null || _0x429b46 ? encodeURIComponent(_0x20b895) : _0x20b895)); else for (var _0x35adc3 in _0x20b895) {
        var _0x17fc97 = _0x4c7c4a == null ? _0x35adc3 : _0x4c7c4a + (_0x20b895 instanceof Array ? "[" + _0x35adc3 + "]" : "." + _0x35adc3);

        _0x266af3.push(_0x466ac6(_0x20b895[_0x35adc3], _0x17fc97, _0x429b46));
    }
    return _0x266af3.join("&");
}

async function _0x512e18(_0x221fdb, _0x2f8f58 = {}, _0x38293e = 1500) {
    $.reqnum++;

    if (_0x4b0b7f[_0x221fdb]) {
        let _0xa3d81e = {
            "appId": _0x4b0b7f[_0x221fdb],
            "functionId": _0x221fdb,
            "appid": "activities_platform",
            "clientVersion": $.UA.split(";")[2],
            "client": "ios",
            "body": _0x2f8f58,
            "version": "4.4",
            "ua": $.UA,
            "t": true
        },
            _0x4c1f45 = await _0x26c9b1.getH5st(_0xa3d81e);

        _0x2f8f58 = _0x466ac6(_0x4c1f45.paramsData);
    } else _0x2f8f58 = "functionId=" + _0x221fdb + "&body=" + encodeURIComponent(JSON.stringify(_0x2f8f58)) + "&appid=activities_platform";

    return new Promise(_0x4bca57 => {
        setTimeout(() => {
            $.post(_0x473ec1(_0x2f8f58), (_0xdac666, _0x32cbb9, _0x24c362) => {
                try {
                    _0xdac666 ? (console.log("\n东东农场: API请求失败 ‼️‼️"), console.log(JSON.stringify(_0xdac666)), console.log("function_id:" + _0x221fdb), $.logErr(_0xdac666)) : _0x397b0e(_0x24c362) && (_0x24c362 = JSON.parse(_0x24c362));
                } catch (_0x344055) {
                    $.logErr(_0x344055, _0x32cbb9);
                } finally {
                    _0x4bca57(_0x24c362);
                }
            });
        }, _0x38293e);
    });
}

function _0x397b0e(_0x3c1da7) {
    try {
        if (typeof JSON.parse(_0x3c1da7) == "object") {
            return true;
        }
    } catch (_0x57cca5) {
        return console.log(_0x57cca5), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x3e1282(_0x56f77b = {}) {
    return {
        "url": _0x505ab6 + "?" + _0x56f77b,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://h5.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://h5.m.jd.com/",
            "Cookie": _0x508fe9
        },
        "timeout": 30000
    };
}

function _0x473ec1(_0x1f9ea8 = {}) {
    return {
        "url": "https://api.m.jd.com/api",
        "body": _0x1f9ea8 + "&cthr=1&loginType=&loginWQBiz=wegame&openudid=" + $.UUID + "&uuid=" + $.UUID + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone&lang=zh_CN&osVersion=&partner=-1",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": _0x508fe9,
            "Host": "api.m.jd.com",
            "Referer": "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA",
            "x-referer-page": "https://lotterydraw-new.jd.com/",
            "Origin": "https://lotterydraw-new.jd.com",
            "x-rp-client": "h5_1.0.0",
            "User-Agent": $.UA,
            "request-from": "native"
        },
        "ciphers": _0x12df80.cpstr,
        "timeout": 30000
    };
}

function _0x3aa1a(_0x4383a3, _0x10d9b3 = {}) {
    return {
        "url": _0x505ab6 + "?" + _0x10d9b3,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x508fe9
        },
        "timeout": 10000
    };
}

function _0x52f772(_0x4987d6) {
    if (typeof _0x4987d6 == "string") try {
        return JSON.parse(_0x4987d6);
    } catch (_0xdedcba) {
        return console.log(_0xdedcba), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }