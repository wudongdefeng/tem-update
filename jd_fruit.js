/*
更新时间：2023-8-24 
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd免费水果
15 3,13,18 * * * jd_fruit.js, tag=东东农场, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true

变量：
export DO_TEN_WATER_AGAIN='true' 攒水滴只交10次水，默认不攒水滴
export FRUIT_FAST_CARD='true' 使用快速浇水卡，水多可开启
epxort FRUIT_DELAY = '1000',设置等待时间(毫秒)，默认请求5次接口等待10秒（10000）
*/
let lnrun = 0;
const $ = new Env('东东农场-任务');
let cookiesArr = [], cookie = '', jdFruitShareArr = [], isBox = false, notify, newShareCodes, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
let shareCodes = ['']
const dy = require('./function/dylanz')
let message = '', subTitle = '', option = {}, isFruitFinished = false, ct = 0;
const retainWater = 100;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
const _0x40bb2e = "https://api.m.jd.com/client.action",
    _0x578b39 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    _0x577b84 = process.env.FRUIT_DELAY || 10000,
    _0x1431d8 = require("./function/dylany");

let _0x427b03 = [];
$.reqnum = 1;

async function _0x2b58ae() {
    subTitle = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x2a2627();

        if ($.farmInfo.farmUserPro) {
            message = "【水果名称】" + $.farmInfo.farmUserPro.name + "\n";
            console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.farmUserPro.shareCode + "\n");
            console.log("\n【已成功兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n");
            message += "【已兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n";

            if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
                option["open-url"] = _0x578b39;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
                $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看"));
                return;
            } else {
                if ($.farmInfo.treeState === 1) {
                    console.log("\n" + $.farmInfo.farmUserPro.name + "种植中...\n");
                } else {
                    if ($.farmInfo.treeState === 0) {
                        option["open-url"] = _0x578b39;
                        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", option);
                        $.isNode() && (await notify.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
                        return;
                    }
                }
            }

            _0x427b03.push($.farmInfo.farmUserPro.shareCode);

            await _0x52762d();
            await _0x534e1e();
            await _0x20cef1();
            await _0x578009();
            await _0x1743dc();
            await _0x12d680();
            !process.env.DO_TEN_WATER_AGAIN ? (console.log("执行再次浇水"), await _0x10798f()) : console.log("不执行再次浇水，攒水滴");
            await $.wait(3000);
            await _0x30f5a4();
        } else {
            JSON.stringify($.farmInfo).includes("winTexts") ? (console.log("初始化农场数据异常, 请确认此账号是否开通农场"), message = "【数据异常】请确认此账号是否开通农场") : (console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo)), message = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常");
        }
    } catch (_0x1cd31c) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️");
        $.logErr(_0x1cd31c);
    }

    await _0xa33003();
}

async function _0x52762d() {
    await _0x262e66();
    console.log("被水滴砸中： " + ($.farmInfo.todayGotWaterGoalTask.canPop ? "是" : "否"));
    $.farmInfo.todayGotWaterGoalTask.canPop && (await _0x3c90d7(), $.goalResult.code === "0" && console.log("【被水滴砸中】获得" + $.goalResult.addEnergy + "g💧\\n"));
    console.log("签到结束,开始浏览任务");
    let _0x1bca6f = $.farmTask.gotBrowseTaskAdInit.userBrowseTaskAds,
        _0xb2f85d = 0,
        _0x242f81 = 0,
        _0x3e7d7c = 0;

    for (let _0x568156 of _0x1bca6f) {
        if (_0x568156.limit <= _0x568156.hadFinishedTimes) {
            console.log(_0x568156.mainTitle + "+ ' 已完成");
            continue;
        }

        console.log("正在进行广告浏览任务: " + _0x568156.mainTitle);
        await _0x19697c(_0x568156.advertId, 0);
        $.browseResult.code === "0" ? (console.log(_0x568156.mainTitle + "浏览任务完成"), await _0x19697c(_0x568156.advertId, 1), $.browseRwardResult.code === "0" ? (console.log("领取浏览" + _0x568156.mainTitle + "广告奖励成功,获得" + $.browseRwardResult.amount + "g"), _0xb2f85d += $.browseRwardResult.amount, _0x242f81++) : (_0x3e7d7c++, console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult)))) : (_0x3e7d7c++, console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult)));
    }

    _0x3e7d7c > 0 ? console.log("【广告浏览】完成" + _0x242f81 + "个,失败" + _0x3e7d7c + ",获得" + _0xb2f85d + "g💧\\n") : console.log("【广告浏览】完成" + _0x242f81 + "个,获得" + _0xb2f85d + "g💧\n");
    !$.farmTask.gotThreeMealInit.f ? (await _0x490207(), $.threeMeal.code === "0" ? console.log("【定时领水】获得" + $.threeMeal.amount + "g💧\n") : console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal))) : console.log("当前不在定时领水时间断或者已经领过\n");
    !$.farmTask.waterFriendTaskInit.f ? $.farmTask.waterFriendTaskInit.waterFriendCountKey < $.farmTask.waterFriendTaskInit.waterFriendMax && (await _0x5cdd61()) : console.log("给" + $.farmTask.waterFriendTaskInit.waterFriendMax + "个好友浇水任务已完成\n");

    if ($.farmTask["treasureBoxInit-getBean"] && !$.farmTask["treasureBoxInit-getBean"].f) {
        console.log("" + $.farmTask["treasureBoxInit-getBean"].taskMainTitle);
        await _0x42c476();
    } else {
        console.log("逛领京豆任务已完成\n");
    }

    await _0x56be3a();
    await _0x2cbb27();
    await _0x3f1f72();
    await _0x192956();
}

async function _0x30f5a4() {
    console.log("开始预测水果成熟时间\n");
    await _0x2a2627();
    await _0x262e66();
    let _0x13a6a7 = $.farmTask.firstWaterInit.totalWaterTimes;
    message += "【今日共浇水】" + _0x13a6a7 + "次\n";
    message += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    message += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";

    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        message += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else {
        $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (message += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");
    }

    let _0xebd4d8 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10,
        _0x255d4b = Math.ceil(_0xebd4d8 / _0x13a6a7);

    message += "【预测】" + (_0x255d4b === 1 ? "明天" : _0x255d4b === 2 ? "后天" : _0x255d4b + "天之后") + "(" + _0x437962(86400000 * _0x255d4b + Date.now()) + "日)可兑换水果🍉\n";
}

async function _0x534e1e() {
    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
    await _0x417c4c();
    const {
        fastCard: _0x2eda4d,
        doubleCard: _0x59a37c,
        beanCard: _0x44215f,
        signCard: _0x1f705e
    } = $.myCardInfoRes;

    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && _0x44215f > 0) {
        console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + _0x44215f + "张, 跳过10次浇水任务");
        return;
    }

    if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log("\n准备浇水十次");
        let _0x2edad4 = 0;
        isFruitFinished = false;

        for (; _0x2edad4 < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit - $.farmTask.totalWaterTaskInit.totalWaterTaskTimes; _0x2edad4++) {
            console.log("第" + (_0x2edad4 + 1) + "次浇水");
            await _0x5d5685();
            console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

            if ($.waterResult.code === "0") {
                console.log("剩余水滴" + $.waterResult.totalEnergy + "g");

                if ($.waterResult.finished) {
                    isFruitFinished = true;
                    break;
                } else {
                    if ($.waterResult.totalEnergy < 10) {
                        console.log("水滴不够，结束浇水");
                        break;
                    }

                    await _0x1bfc04();
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        isFruitFinished && (option["open-url"] = _0x578b39, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
    } else {
        console.log("\n今日已完成10次浇水任务\n");
    }
}

async function _0x20cef1() {
    await _0x262e66();

    if (!$.farmTask.firstWaterInit.f && $.farmTask.firstWaterInit.totalWaterTimes > 0) {
        await _0x2029aa();
        $.firstWaterReward.code === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward.amount + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward));
    } else {
        console.log("首次浇水奖励已领取\n");
    }
}

async function _0x578009() {
    if (!$.farmTask.totalWaterTaskInit.f && $.farmTask.totalWaterTaskInit.totalWaterTaskTimes >= $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        await _0x145f95();
        $.totalWaterReward.code === "0" ? console.log("【十次浇水奖励】获得" + $.totalWaterReward.totalWaterTaskEnergy + "g💧\n") : console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));
    } else {
        $.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask.totalWaterTaskInit.totalWaterTaskTimes + "次\n");
    }

    console.log("finished 水果任务完成!");
}

async function _0x10798f() {
    console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
    await _0x2a2627();
    let _0x4f4c5f = $.farmInfo.farmUserPro.totalEnergy;
    console.log("剩余水滴" + _0x4f4c5f + "g\n");
    await _0x417c4c();
    const {
        fastCard: _0x358d2a,
        doubleCard: _0x55c3e3,
        beanCard: _0x53e6da,
        signCard: _0x244392
    } = $.myCardInfoRes;
    console.log("背包已有道具:\n快速浇水卡:" + (_0x358d2a === -1 ? "未解锁" : _0x358d2a + "张") + "\n水滴翻倍卡:" + (_0x55c3e3 === -1 ? "未解锁" : _0x55c3e3 + "张") + "\n水滴换京豆卡:" + (_0x53e6da === -1 ? "未解锁" : _0x53e6da + "张") + "\n加签卡:" + (_0x244392 === -1 ? "未解锁" : _0x244392 + "张") + "\n");

    if (_0x4f4c5f >= 100 && _0x55c3e3 > 0) {
        for (let _0xcfc2c3 = 0; _0xcfc2c3 < new Array(_0x55c3e3).fill("").length; _0xcfc2c3++) {
            await _0x197e87("doubleCard");
            console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
        }

        await _0x2a2627();
        _0x4f4c5f = $.farmInfo.farmUserPro.totalEnergy;
    }

    if (_0x244392 > 0) {
        for (let _0x3c98fe = 0; _0x3c98fe < 3; _0x3c98fe++) {
            await _0x197e87("signCard");
            console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
        }

        await _0x2a2627();
        _0x4f4c5f = $.farmInfo.farmUserPro.totalEnergy;
    }

    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);

    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
        console.log("\n您设置的是水滴换豆功能,现在为您换豆");

        if (_0x4f4c5f >= 100 && $.myCardInfoRes.beanCard > 0) {
            await _0x197e87("beanCard");
            console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));

            if ($.userMyCardRes.code === "0") {
                message += "【水滴换豆卡】获得" + $.userMyCardRes.beanCount + "个京豆\n";
                return;
            }
        } else {
            console.log("您目前水滴:" + _0x4f4c5f + "g,水滴换豆卡" + $.myCardInfoRes.beanCard + "张,暂不满足水滴换豆的条件,为您继续浇水");
        }
    }

    if (process.env.FRUIT_FAST_CARD && _0x4f4c5f > 100 && $.myCardInfoRes.fastCard > 0) {
        for (let _0x3836c8 = 0; _0x3836c8 < new Array(_0x358d2a).fill("").length; _0x3836c8++) {
            await _0x197e87("fastCard");
            console.log("使用快速浇水卡结果:" + JSON.stringify($.userMyCardRes));
            $.userMyCardRes.code === "0" && console.log("已使用快速浇水卡浇水" + $.userMyCardRes.waterEnergy + "g");

            if ($.userMyCardRes.treeFinished) {
                break;
            }

            await $.wait(1000);
            await _0x2a2627();
            _0x4f4c5f = $.farmInfo.farmUserPro.totalEnergy;

            if (_0x4f4c5f < 100) {
                break;
            }
        }
    }

    let _0x43c936 = _0x4f4c5f - retainWater;

    if (_0x4f4c5f >= $.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) {
        isFruitFinished = false;

        for (let _0x32afbd = 0; _0x32afbd < ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10; _0x32afbd++) {
            await _0x5d5685();
            await $.wait(500);
            console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));

            if ($.waterResult.code === "0") {
                console.log("\n浇水10g成功\n");

                if ($.waterResult.finished) {
                    isFruitFinished = true;
                    break;
                } else {
                    console.log("目前水滴【" + $.waterResult.totalEnergy + "】g,继续浇水，水果马上就可以兑换了");
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        isFruitFinished && (option["open-url"] = _0x578b39, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
    } else {
        if (_0x43c936 >= 10) {
            console.log("目前剩余水滴：【" + _0x4f4c5f + "】g，可继续浇水");
            isFruitFinished = false;

            for (let _0x1c557e = 0; _0x1c557e < parseInt(_0x43c936 / 10); _0x1c557e++) {
                await _0x5d5685();
                console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

                if ($.waterResult.code === "0") {
                    console.log("\n浇水10g成功,剩余" + $.waterResult.totalEnergy + "\n");

                    if ($.waterResult.finished) {
                        isFruitFinished = true;
                        break;
                    } else {
                        await _0x1bfc04();
                    }
                } else {
                    console.log("浇水出现失败异常,跳出不在继续浇水");
                    break;
                }
            }

            isFruitFinished && (option["open-url"] = _0x578b39, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
        } else {
            console.log("目前剩余水滴：【" + _0x4f4c5f + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
        }
    }
}

function _0x1bfc04() {
    return new Promise(async _0x5dc364 => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g水滴");
            await _0x28ca5d("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));

            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "\n");
            }
        } else {
            if ($.waterResult.waterStatus === 1) {
                console.log("果树开花了,奖励40g水滴");
                await _0x28ca5d("2");
                console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
                $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            } else {
                $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g水滴"), await _0x28ca5d("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
            }
        }

        _0x5dc364();
    });
}

async function _0x192956() {
    await _0x54ab51();

    if ($.initForTurntableFarmRes.code === "0") {
        let {
            timingIntervalHours: _0xf1dd46,
            timingLastSysTime: _0x4e44e7,
            sysTime: _0x39ca3f,
            timingGotStatus: _0x5751e8,
            remainLotteryTimes: _0x530308,
            turntableInfos: _0x2cf271
        } = $.initForTurntableFarmRes;
        !_0x5751e8 ? (console.log("是否到了领取免费赠送的抽奖机会----" + (_0x39ca3f > _0x4e44e7 + 3600 * _0xf1dd46 * 1000)), _0x39ca3f > _0x4e44e7 + 3600 * _0xf1dd46 * 1000 ? (await _0x53e079(), console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes)), await _0x54ab51(), _0x530308 = $.initForTurntableFarmRes.remainLotteryTimes) : console.log("免费赠送的抽奖机会未到时间")) : console.log("4小时候免费赠送的抽奖机会已领取");

        if ($.initForTurntableFarmRes.turntableBrowserAds && $.initForTurntableFarmRes.turntableBrowserAds.length > 0) {
            for (let _0x95ce26 = 0; _0x95ce26 < $.initForTurntableFarmRes.turntableBrowserAds.length; _0x95ce26++) {
                !$.initForTurntableFarmRes.turntableBrowserAds[_0x95ce26].status ? (console.log("开始浏览天天抽奖的第" + (_0x95ce26 + 1) + "个逛会场任务"), await _0x5e5c07(1, $.initForTurntableFarmRes.turntableBrowserAds[_0x95ce26].adId), $.browserForTurntableFarmRes.code === "0" && $.browserForTurntableFarmRes.status && (console.log("第" + (_0x95ce26 + 1) + "个逛会场任务完成，开始领取水滴奖励\n"), await _0x5e5c07(2, $.initForTurntableFarmRes.turntableBrowserAds[_0x95ce26].adId), $.browserForTurntableFarmRes.code === "0" && (console.log("第" + (_0x95ce26 + 1) + "个逛会场任务领取水滴奖励完成\n"), await _0x54ab51(), _0x530308 = $.initForTurntableFarmRes.remainLotteryTimes))) : console.log("浏览天天抽奖的第" + (_0x95ce26 + 1) + "个逛会场任务已完成");
            }
        }

        console.log("---天天抽奖次数remainLotteryTimes----" + _0x530308 + "次");

        if (_0x530308 > 0) {
            console.log("开始抽奖");
            let _0xab93cc = "";

            for (let _0x305b27 = 0; _0x305b27 < new Array(_0x530308).fill("").length; _0x305b27++) {
                await _0x273d5e();
                await $.wait(500);
                console.log("第" + (_0x305b27 + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));

                if ($.lotteryRes.code === "0") {
                    _0x2cf271.map(_0x550957 => {
                        if (_0x550957.type === $.lotteryRes.type) {
                            console.log("lotteryRes.type" + $.lotteryRes.type);

                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                                _0xab93cc += _0x550957.name + "个，";
                            } else {
                                $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? _0xab93cc += _0x550957.name + "，" : _0xab93cc += _0x550957.name + "，";
                            }
                        }
                    });

                    if ($.lotteryRes.remainLotteryTimes === 0) {
                        break;
                    }
                }
            }

            _0xab93cc && console.log("【天天抽奖】" + _0xab93cc.substr(0, _0xab93cc.length - 1) + "\n");
        } else {
            console.log("天天抽奖--抽奖机会为0次");
        }
    } else {
        console.log("初始化天天抽奖得好礼失败");
    }
}

async function _0x3f1f72() {
    await _0x3ed097();

    if ($.farmAssistResult.code === "0") {
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length >= 2) {
            if ($.farmAssistResult.status === 2) {
                let _0x18dc76 = 0;

                for (let _0x22b9b0 of Object.keys($.farmAssistResult.assistStageList)) {
                    let _0x4a94ba = $.farmAssistResult.assistStageList[_0x22b9b0];

                    if (_0x4a94ba.stageStaus === 2) {
                        await _0x3a32f3();
                        await $.wait(500);

                        if ($.receiveStageEnergy.code === "0") {
                            console.log("成功领取第" + (Number(_0x22b9b0) + 1) + "段助力奖励：【" + $.receiveStageEnergy.amount + "】g水");
                            _0x18dc76 += $.receiveStageEnergy.amount;
                        }
                    }
                }

                message += "【额外奖励】" + _0x18dc76 + "g水领取成功\n";
            } else {
                $.farmAssistResult.status === 3 && (console.log("已经领取过8好友助力额外奖励"), message += "【额外奖励】已被领取过\n");
            }
        } else {
            console.log("助力好友未达到2个");
            message += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
        }

        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length > 0) {
            let _0x379b96 = "";
            $.farmAssistResult.assistFriendList.map((_0x51f0ce, _0x139af5) => {
                _0x139af5 === $.farmAssistResult.assistFriendList.length - 1 ? _0x379b96 += _0x51f0ce.nickName || "匿名用户" : _0x379b96 += (_0x51f0ce.nickName || "匿名用户") + ",";

                let _0xe3e1a5 = new Date(_0x51f0ce.time),
                    _0x1a7abe = _0xe3e1a5.getFullYear() + "-" + (_0xe3e1a5.getMonth() + 1) + "-" + _0xe3e1a5.getDate() + " " + _0xe3e1a5.getHours() + ":" + _0xe3e1a5.getMinutes() + ":" + _0xe3e1a5.getMinutes();

                console.log("【" + (_0x51f0ce.nickName || "匿名用户") + "】 在 " + _0x1a7abe + " 给您助过力");
            });
            message += "【助力您的好友】" + _0x379b96 + "\n";
        }

        console.log("领取额外奖励水滴结束\n");
    } else {
        await _0x2caa55();

        if ($.masterHelpResult.code === "0") {
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
                !$.masterHelpResult.masterGotFinal ? (await _0x4d20ca(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g水"), message += "【额外奖励】" + $.masterGotFinished.amount + "g水领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), message += "【额外奖励】已被领取过\n");
            } else {
                console.log("助力好友未达到5个");
                message += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";
            }

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x4a1e0a = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x189411, _0x3b2efa) => {
                    _0x3b2efa === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x4a1e0a += _0x189411.nickName || "匿名用户" : _0x4a1e0a += (_0x189411.nickName || "匿名用户") + ",";

                    let _0x36058a = new Date(_0x189411.time),
                        _0x2d5c4c = _0x36058a.getFullYear() + "-" + (_0x36058a.getMonth() + 1) + "-" + _0x36058a.getDate() + " " + _0x36058a.getHours() + ":" + _0x36058a.getMinutes() + ":" + _0x36058a.getMinutes();

                    console.log("【" + (_0x189411.nickName || "匿名用户") + "】 在 " + _0x2d5c4c + " 给您助过力");
                });
                message += "【助力您的好友】" + _0x4a1e0a + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x31bfad() {
    console.log("开始助力好友");
    let _0x1bad46 = 0,
        _0x5e8351 = 3,
        _0x4f7c60 = "";

    for (let _0x397aef of newShareCodes) {
        console.log("去助力: " + _0x397aef);

        if (!_0x397aef) {
            continue;
        }

        if (_0x397aef === $.farmInfo.farmUserPro.shareCode) {
            console.log("不能为自己助力哦，跳过自己的shareCode\n");
            continue;
        }

        await _0x3951f5(_0x397aef);
        await $.wait(1000);

        if ($.helpResult.code === "0") {
            if ($.helpResult.helpResult.code === "0") {
                _0x1bad46 += $.helpResult.helpResult.salveHelpAddWater;
                console.log("【助力结果】: 助力成功");
                console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴");
                _0x4f7c60 += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ",";
            } else {
                if ($.helpResult.helpResult.code === "8") {
                    console.log("【助力结果】: 助力失败，今天助力次数已耗尽");
                } else {
                    if ($.helpResult.helpResult.code === "9") {
                        console.log("【助力结果】: 已经助力过TA了");
                    } else {
                        $.helpResult.helpResult.code === "10" ? console.log("【助力结果】: 对方已满助力") : console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
                    }
                }
            }

            console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
            _0x5e8351 = $.helpResult.helpResult.remainTimes;

            if ($.helpResult.helpResult.remainTimes === 0) {
                console.log("您当前助力次数已耗尽，跳出助力");
                break;
            }
        } else {
            console.log("助力失败::" + JSON.stringify($.helpResult));
            break;
        }
    }

    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let _0x94d7a3 = _0x437962() + $.farmInfo.farmUserPro.shareCode;

        !$.getdata(_0x94d7a3) && ($.setdata("", _0x437962(Date.now() - 86400000) + $.farmInfo.farmUserPro.shareCode), $.setdata("", _0x94d7a3));

        if (_0x4f7c60) {
            if ($.getdata(_0x94d7a3)) {
                $.setdata($.getdata(_0x94d7a3) + "," + _0x4f7c60, _0x94d7a3);
            } else {
                $.setdata(_0x4f7c60, _0x94d7a3);
            }
        }

        _0x4f7c60 = $.getdata(_0x94d7a3);
    }

    _0x1bad46 > 0 && console.log("【助力好友👬】获得" + _0x1bad46 + "g💧\n");
    message += "【今日剩余助力👬】" + _0x5e8351 + "次\n";
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0x2cbb27() {
    let _0x1a20a7 = !$.farmTask.waterRainInit.f;

    if (_0x1a20a7) {
        console.log("水滴雨任务，每天两次，最多可得10g水滴");
        console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));
        $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 10800000 && (_0x1a20a7 = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask.waterRainInit.lastTime + 10800000).toLocaleTimeString() + "再试\n"));
        _0x1a20a7 && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x5d0c44(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g水滴\n")));
    }
}

async function _0x56be3a() {
    console.log("开始打卡领水活动（签到，关注，领券）");
    await _0x48c86a();

    if ($.clockInInit.code === "0") {
        !$.clockInInit.todaySigned && (console.log("开始今日签到"), await _0x413a69(), console.log("打卡结果" + JSON.stringify($.clockInForFarmRes)), $.clockInForFarmRes.code === "0" && (console.log("【第" + $.clockInForFarmRes.signDay + "天签到】获得" + $.clockInForFarmRes.amount + "g💧\n"), $.clockInForFarmRes.signDay === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await _0x36a7d2(), $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n"))));

        if ($.clockInInit.todaySigned && $.clockInInit.totalSigned === 7) {
            console.log("开始领取--惊喜礼包38g水滴");
            await _0x36a7d2();
            $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n");
        }

        if ($.clockInInit.themes && $.clockInInit.themes.length > 0) {
            for (let _0x5ae19d of $.clockInInit.themes) {
                !_0x5ae19d.hadGot && (console.log("关注ID" + _0x5ae19d.id), await _0x58e101(_0x5ae19d.id, "theme", "1"), console.log("themeStep1--结果" + JSON.stringify($.themeStep1)), $.themeStep1.code === "0" && (await _0x58e101(_0x5ae19d.id, "theme", "2"), console.log("themeStep2--结果" + JSON.stringify($.themeStep2)), $.themeStep2.code === "0" && console.log("关注" + _0x5ae19d.name + "，获得水滴" + $.themeStep2.amount + "g")));
            }
        }

        if ($.clockInInit.venderCoupons && $.clockInInit.venderCoupons.length > 0) {
            for (let _0x907ece of $.clockInInit.venderCoupons) {
                !_0x907ece.hadGot && (console.log("领券的ID" + _0x907ece.id), await _0x58e101(_0x907ece.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1.code === "0" && (await _0x58e101(_0x907ece.id, "venderCoupon", "2"), $.venderCouponStep2.code === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + _0x907ece.name + "领券，获得水滴" + $.venderCouponStep2.amount + "g"))));
            }
        }
    }

    console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}

async function _0x53f918() {
    await _0x1f4850();

    if ($.friendList) {
        console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个");
        console.log("开始删除" + ($.friendList.friends && $.friendList.friends.length) + "个好友,可拿每天的邀请奖励");

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            for (let _0x5ea254 of $.friendList.friends) {
                console.log("开始删除好友 [" + _0x5ea254.shareCode + "]");
                const _0x440330 = {
                    shareCode: "" + _0x5ea254.shareCode,
                    version: 8,
                    channel: 1
                };

                const _0x20e642 = await _0x334f12("deleteFriendForFarm", _0x440330);

                _0x20e642 && _0x20e642.code === "0" && console.log("删除成功！\n");
            }
        }

        await _0xd86418();

        if ($.friendList.inviteFriendCount > 0) {
            $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await _0x5f29ad(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes)));
        } else {
            console.log("今日未邀请过好友");
        }
    } else {
        console.log("查询好友列表失败\n");
    }
}

async function _0x5cdd61() {
    await _0x1f4850();
    console.log("开始给好友浇水...");
    await _0x262e66();
    const {
        waterFriendCountKey: _0x55f3a9,
        waterFriendMax: _0x19c00e
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0x55f3a9 + "个好友浇水");

    if (_0x55f3a9 < _0x19c00e) {
        let _0x506ad7 = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x393a5c, _0x214ea5) => {
                _0x393a5c.friendState === 1 && _0x506ad7.length < _0x19c00e - _0x55f3a9 && _0x506ad7.push(_0x393a5c.shareCode);
            });
            console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(_0x506ad7));
            let _0x14927d = 0,
                _0x1f8b25 = "";

            for (let _0x425aa8 = 0; _0x425aa8 < _0x506ad7.length; _0x425aa8++) {
                await _0x4e7325(_0x506ad7[_0x425aa8]);
                console.log("为第" + (_0x425aa8 + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x14927d++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");

                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x1f8b25 += "水滴换豆卡,";
                        } else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") {
                                console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                _0x1f8b25 += "快速浇水卡,";
                            } else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") {
                                    console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                    _0x1f8b25 += "水滴翻倍卡,";
                                } else {
                                    if ($.waterFriendForFarmRes.cardInfo.type === "signCard") {
                                        console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                        _0x1f8b25 += "加签卡,";
                                    }
                                }
                            }
                        }
                    }
                } else {
                    $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
                }
            }

            console.log("【好友浇水】已给" + _0x14927d + "个好友浇水,消耗" + _0x14927d * 10 + "g水\n");
            _0x1f8b25 && _0x1f8b25.length > 0 && console.log("【好友浇水奖励】" + _0x1f8b25.substr(0, _0x1f8b25.length - 1) + "\n");
        } else {
            console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
        }
    } else {
        console.log("今日已为好友浇水量已达" + _0x19c00e + "个");
    }
}

async function _0x1743dc() {
    await _0x262e66();
    const {
        waterFriendCountKey: _0xa4d944,
        waterFriendMax: _0x44565d,
        waterFriendSendWater: _0x590798,
        waterFriendGotAward: _0x44bdb2
    } = $.farmTask.waterFriendTaskInit;
    _0xa4d944 >= _0x44565d ? !_0x44bdb2 ? (await _0x313dc5(), console.log("领取给" + _0x44565d + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes)), $.waterFriendGotAwardRes.code === "0" && console.log("【给" + _0x44565d + "好友浇水】奖励" + $.waterFriendGotAwardRes.addWater + "g水滴\n")) : console.log("给好友浇水的" + _0x590798 + "g水滴奖励已领取\n") : console.log("暂未给" + _0x44565d + "个好友浇水\n");
}

async function _0xd86418() {
    for (let _0x293850 of newShareCodes) {
        if (_0x293850 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0x551c03(_0x293850);

        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
            console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
        } else {
            $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
        }
    }
}

async function _0x12d680() {
    for (let _0x287282 = 0; _0x287282 < 10; _0x287282++) {
        await _0x3da6b5();

        if ($.duckRes.code === "0") {
            if (!$.duckRes.hasLimit) {
                console.log("小鸭子游戏:" + $.duckRes.title);
            } else {
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

async function _0x3da6b5() {
    return new Promise(_0x2c8aab => {
        const _0x3498aa = _0x237fdc;
        $.post(_0x2f36a1("getFullCollectionReward", _0x3498aa), (_0x49eca2, _0x5f0480, _0x209b4e) => {
            try {
                if (_0x49eca2) {
                    console.log("\n东东农场: API查询请求失败 ‼️‼️");
                    console.log(JSON.stringify(_0x49eca2));
                    $.logErr(_0x49eca2);
                } else {
                    _0x3a81c9(_0x209b4e) && ($.duckRes = JSON.parse(_0x209b4e));
                }
            } catch (_0x1cd2c7) {
                $.logErr(_0x1cd2c7, _0x5f0480);
            } finally {
                _0x2c8aab();
            }
        });
    });
}

async function _0x145f95() {
    $.totalWaterReward = await _0x334f12("totalWaterTaskForFarm");
}

async function _0x2029aa() {
    $.firstWaterReward = await _0x334f12("firstWaterTaskForFarm");
}

async function _0x313dc5() {
    $.waterFriendGotAwardRes = await _0x334f12("waterFriendGotAwardForFarm", _0x3db231);
}

async function _0x417c4c() {
    $.myCardInfoRes = await _0x334f12("myCardInfoForFarm", _0x132707);
}

async function _0x197e87(_0x4423eb) {
    const _0x2670d1 = {
        cardType: _0x4423eb
    };
    $.userMyCardRes = await _0x334f12("userMyCardForFarm", _0x2670d1);
}

async function _0x28ca5d(_0x12b433) {
    const _0x2e17f7 = {
        type: _0x12b433
    };
    $.gotStageAwardForFarmRes = await _0x334f12("gotStageAwardForFarm", _0x2e17f7);
}

async function _0x5d5685() {
    await $.wait(1000);
    console.log("等待了1秒");
    $.waterResult = await _0x334f12("waterGoodForFarm");
}

async function _0x54ab51() {
    $.initForTurntableFarmRes = await _0x334f12("initForTurntableFarm", _0x54c143);
}

async function _0x273d5e() {
    await $.wait(2000);
    console.log("等待了2秒");
    $.lotteryRes = await _0x334f12("lotteryForTurntableFarm", _0x51c4e1);
}

async function _0x53e079() {
    $.timingAwardRes = await _0x334f12("timingAwardForTurntableFarm", _0x431bfd);
}

async function _0x5e5c07(_0x2e078f, _0x597f50) {
    _0x2e078f === 1 && console.log("浏览爆品会场");

    if (_0x2e078f === 2) {
        console.log("天天抽奖浏览任务领取水滴");
    }

    const _0x7c3de7 = {
        type: _0x2e078f,
        adId: _0x597f50,
        version: 4,
        channel: 1
    };
    const _0x52c0e0 = _0x7c3de7;
    $.browserForTurntableFarmRes = await _0x334f12("browserForTurntableFarm", _0x52c0e0);
}

async function _0x437bcb(_0x5bc6b2) {
    const _0xa8e2d7 = {
        type: 2,
        adId: _0x5bc6b2,
        version: 4,
        channel: 1
    };
    const _0x93181d = _0xa8e2d7;
    $.browserForTurntableFarm2Res = await _0x334f12("browserForTurntableFarm", _0x93181d);
}

async function _0x3ae55c() {
    const _0x2b9503 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-3",
        babelChannel: "3",
        version: 4,
        channel: 1
    };
    $.lotteryMasterHelpRes = await _0x334f12("initForFarm", _0x2b9503);
}

async function _0x4d20ca() {
    $.masterGotFinished = await _0x334f12("masterGotFinishedTaskForFarm");
}

async function _0x2caa55() {
    $.masterHelpResult = await _0x334f12("masterHelpTaskInitForFarm");
}

async function _0x3ed097() {
    $.farmAssistResult = await _0x334f12("farmAssistInit", _0x51fd4c);
}

async function _0x3a32f3() {
    $.receiveStageEnergy = await _0x334f12("receiveStageEnergy", _0x15830c);
}

async function _0x551c03() {
    $.inviteFriendRes = await _0x334f12("initForFarm", {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-inviteFriend",
        version: 4,
        channel: 2
    });
}

async function _0x3951f5() {
    const _0x5af0cd = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    };
    $.helpResult = await _0x334f12("initForFarm", _0x5af0cd);
}

async function _0x5d0c44() {
    const _0x1b60c6 = _0x345842;
    $.waterRain = await _0x334f12("waterRainForFarm", _0x1b60c6);
}

async function _0x48c86a() {
    $.clockInInit = await _0x334f12("clockInInitForFarm");
}

async function _0x413a69() {
    $.clockInForFarmRes = await _0x334f12("clockInForFarm", _0x2956fe);
}

async function _0x58e101(_0x1fb323, _0x48c62b, _0x27689b) {
    const _0x535251 = "clockInFollowForFarm",
        _0x5c0686 = {
            id: _0x1fb323,
            type: _0x48c62b,
            step: _0x27689b
        };
    let _0x59ce8f = _0x5c0686;

    if (_0x48c62b === "theme") {
        if (_0x27689b === "1") {
            $.themeStep1 = await _0x334f12(_0x535251, _0x59ce8f);
        } else {
            _0x27689b === "2" && ($.themeStep2 = await _0x334f12(_0x535251, _0x59ce8f));
        }
    } else {
        if (_0x48c62b === "venderCoupon") {
            if (_0x27689b === "1") {
                $.venderCouponStep1 = await _0x334f12(_0x535251, _0x59ce8f);
            } else {
                _0x27689b === "2" && ($.venderCouponStep2 = await _0x334f12(_0x535251, _0x59ce8f));
            }
        }
    }
}

async function _0x36a7d2() {
    $.gotClockInGiftRes = await _0x334f12("gotClockInGift", _0x56c789);
}

async function _0x490207() {
    $.threeMeal = await _0x334f12("gotThreeMealForFarm");
}

async function _0x19697c(_0x4baa10, _0x4d6cc4) {
    if (_0x4d6cc4 === 0) {
        const _0x23971b = {
            advertId: _0x4baa10,
            type: _0x4d6cc4
        };
        $.browseResult = await _0x334f12("browseAdTaskForFarm", _0x23971b);
    } else {
        if (_0x4d6cc4 === 1) {
            const _0x47ef85 = {
                advertId: _0x4baa10,
                type: _0x4d6cc4
            };
            $.browseRwardResult = await _0x334f12("browseAdTaskForFarm", _0x47ef85);
        }
    }
}

async function _0x3c90d7() {
    $.goalResult = await _0x334f12("gotWaterGoalTaskForFarm", _0x4889fc);
}

async function _0x5e1606() {
    $.signResult = await _0x334f12("signForFarm");
}

async function _0x2a2627() {
    await $.wait(500);

    if (ct > "1") {
        return;
    }

    let _0x464400 = _0x4648e1,
        _0x591bf7 = {
            appId: "8a2af",
            fn: "initForFarm",
            body: _0x464400,
            apid: "signed_wh5",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x464400 = await _0x1431d8.getbody(_0x591bf7);
    return new Promise(_0x4477a2 => {
        const _0x20a43e = {
            cookie: cookie,
            origin: "https://carry.m.jd.com",
            referer: "https://carry.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x158c2a = {
            url: "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x464400,
            headers: _0x20a43e,
            timeout: 10000
        };
        const _0x51120a = _0x158c2a;
        $.get(_0x51120a, async (_0x3f7651, _0x8218d0, _0x3348a9) => {
            try {
                _0x3f7651 ? (console.log("initForFarm: 请求失败 ‼️‼️"), console.log(JSON.stringify(_0x3f7651))) : _0x3a81c9(_0x3348a9) && ($.farmInfo = JSON.parse(_0x3348a9), $.farmInfo.code != 0 && (ct++, await _0x2a2627()), ct = 0);
            } catch (_0x108acf) {
                $.logErr(_0x108acf, _0x8218d0);
            } finally {
                _0x4477a2();
            }
        });
    });
}

async function _0x262e66() {
    console.log("\n初始化任务列表");
    $.farmTask = await _0x334f12("taskInitForFarm", _0x5c9a85);
}

async function _0x1f4850() {
    $.friendList = await _0x334f12("friendListInitForFarm", _0x5a86d0);
}

async function _0x5f29ad() {
    $.awardInviteFriendRes = await _0x334f12("awardInviteFriendForFarm");
}

async function _0x4e7325(_0x19bccd) {
    const _0x1eac66 = {
        shareCode: _0x19bccd,
        version: 6,
        channel: 1
    };
    const _0x36a20 = _0x1eac66;
    $.waterFriendForFarmRes = await _0x334f12("waterFriendForFarm", _0x36a20);
}

async function _0xa33003() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else {
        $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";
    }

    if ($.ctrTemp) {
        $.msg($.name, subTitle, message, option);

        if ($.isNode()) {
            allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : "");
        }
    } else {
        $.log("\n" + message + "\n");
    }
}

function _0x437962(_0x28ebb0) {
    let _0x531f32;

    _0x28ebb0 ? _0x531f32 = new Date(_0x28ebb0) : _0x531f32 = new Date();
    return _0x531f32.getFullYear() + "-" + (_0x531f32.getMonth() + 1 >= 10 ? _0x531f32.getMonth() + 1 : "0" + (_0x531f32.getMonth() + 1)) + "-" + (_0x531f32.getDate() >= 10 ? _0x531f32.getDate() : "0" + _0x531f32.getDate());
}

function _0x402062() {
    return new Promise(async _0xdca353 => {
        $.get(_0x4f0dce, (_0x207f11, _0x18e0aa, _0x477b0d) => {
            try {
                _0x207f11 ? (console.log(JSON.stringify(_0x207f11)), console.log($.name + " API请求失败，请检查网路重试")) : _0x477b0d && (_0x477b0d = JSON.parse(_0x477b0d));
            } catch (_0x4dc399) {
                $.logErr(_0x4dc399, _0x18e0aa);
            } finally {
                _0xdca353(_0x477b0d);
            }
        });
        await $.wait(10000);

        _0xdca353();
    });
}

function _0x37f10e() {
    return new Promise(async _0x3dec42 => {
        newShareCodes = [];

        if ($.shareCodesArr[$.index - 1]) {
            newShareCodes = $.shareCodesArr[$.index - 1].split("@");
        } else {
            const _0x2346bf = $.index > shareCodes.length ? shareCodes.length - 1 : $.index - 1;

            newShareCodes = shareCodes[_0x2346bf].split("@");
        }

        const _0x82cf0a = await _0x402062();

        _0x82cf0a && _0x82cf0a.code === 200 && (newShareCodes = [...new Set([...newShareCodes, ...(_0x82cf0a.data || [])])]);
        console.log("第" + $.index + "个京东账号将要助力的好友" + JSON.stringify(newShareCodes));

        _0x3dec42();
    });
}

function _0x2a26d5() {
    return new Promise(_0x797995 => {
        console.log("开始获取配置文件\n");
        notify = $.isNode() ? require("./sendNotify") : "";

        const _0x2fe70c = $.isNode() ? require("./jdCookie.js") : "";

        $.isNode() && process.env.FRUITSHARECODES && (process.env.FRUITSHARECODES.indexOf("\n") > -1 ? shareCodes = process.env.FRUITSHARECODES.split("\n") : shareCodes = process.env.FRUITSHARECODES.split("&"));

        if ($.isNode()) {
            Object.keys(_0x2fe70c).forEach(_0xe65894 => {
                _0x2fe70c[_0xe65894] && cookiesArr.push(_0x2fe70c[_0xe65894]);
            });

            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
                console.log = () => { };
            }
        } else {
            cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x53c9f3($.getdata("CookiesJD") || "[]").map(_0x26f225 => _0x26f225.cookie)].filter(_0x2fae5a => !!_0x2fae5a);
        }

        $.shareCodesArr = [];

        if ($.isNode()) {
            Object.keys(shareCodes).forEach(_0x22aa08 => {
                shareCodes[_0x22aa08] && $.shareCodesArr.push(shareCodes[_0x22aa08]);
            });
        } else {
            if ($.getdata("jd_fruit_inviter")) {
                $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x353a91 => !!_0x353a91);
            }

            console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
        }

        _0x797995();
    });
}

async function _0x42c476() {
    await _0x334f12("ddnc_getTreasureBoxAward", _0x4b00f0);
    await $.wait(500);
    await _0x3e623f();
    await $.wait(2000);

    let _0x1f5159 = await _0x334f12("ddnc_getTreasureBoxAward", _0x5b1436);

    _0x1f5159.code == 0 && $.log("完成，获得" + _0x1f5159.waterGram + "g💧\n");
}

function _0x3e623f() {
    return new Promise(_0x541728 => {
        const _0x37a417 = {
            Cookie: cookie,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x4924c0 = {
            url: "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            headers: _0x37a417,
            timeout: 10000
        };
        const _0x3b9cef = _0x4924c0;
        $.get(_0x3b9cef, (_0x5707c9, _0x25ca29, _0x40baf3) => {
            _0x541728();
        });
    });
}

function _0x105307() {
    return new Promise(_0x586690 => {
        const _0x3a8d77 = {
            Cookie: cookie,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x584098 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x3a8d77,
            timeout: 10000
        };
        const _0x407f53 = _0x584098;
        $.get(_0x407f53, (_0x58ee8e, _0x434f0d, _0x39574a) => {
            try {
                if (_0x39574a) {
                    _0x39574a = JSON.parse(_0x39574a);

                    if (!(_0x39574a.islogin === "1")) {
                        _0x39574a.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x266a59) {
                console.log(_0x266a59);
            } finally {
                _0x586690();
            }
        });
    });
}

function _0x334f12(_0x140881, _0x463011 = {}, _0x27d1cc = 1000) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x577b84 / 1000 + "秒......\n"), _0x27d1cc = _0x577b84);
    $.reqnum++;
    return new Promise(_0x4574c6 => {
        setTimeout(() => {
            $.get(_0x2f36a1(_0x140881, _0x463011), (_0x47ce9b, _0x3b9874, _0x34e67e) => {
                try {
                    _0x47ce9b ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x47ce9b)), console.log("function_id:" + _0x140881), $.logErr(_0x47ce9b)) : _0x3a81c9(_0x34e67e) && (_0x34e67e = JSON.parse(_0x34e67e));
                } catch (_0xe491a0) {
                    $.logErr(_0xe491a0, _0x3b9874);
                } finally {
                    _0x4574c6(_0x34e67e);
                }
            });
        }, _0x27d1cc);
    });
}

function _0x3a81c9(_0xa218d7) {
    try {
        if (typeof JSON.parse(_0xa218d7) == "object") {
            return true;
        }
    } catch (_0x528783) {
        console.log(_0x528783);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x2f36a1(_0x4a0a0a, _0x229680 = {}) {
    return {
        url: _0x40bb2e + "?functionId=" + _0x4a0a0a + "&body=" + encodeURIComponent(JSON.stringify(_0x229680)) + "&appid=wh5",
        headers: {
            Host: "api.m.jd.com",
            Accept: "*/*",
            Origin: "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Referer: "https://carry.m.jd.com/",
            Cookie: cookie
        },
        timeout: 10000
    };
}

function _0x53c9f3(_0x98065b) {
    if (typeof _0x98065b == "string") {
        try {
            return JSON.parse(_0x98065b);
        } catch (_0x173cb9) {
            console.log(_0x173cb9);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }