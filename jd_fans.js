/*
 粉丝互动
 1 0 * * * jd_fans.js
 环境变量：
 RUHUI,是否自动入会，默认不入会，设置RUHUI=1，则会自动入会
 RUNCK,执行多少CK，默认前5个，设置RUNCK=10，则脚本会运行前10个CK
* */
let lnrun = 0;

//活动列表
let activityList = [
    //{ 'id': "10c1e44c87fe4a2ab7c6b8af0e912962", 'endTime': 1680796799000 },
    //{ 'id': "0a1e21d27165458fa034922e71ee6efe", 'endTime': 1682870399000 },
    //{ 'id': "304a300b232643a2926d86a3ad1db61f", 'endTime': 1681228799000 },
    //{ 'id': "0eeb28db4b8a42b2a3bcf10878ffd22d", 'endTime': 1683043199000 },
];

const $ = new Env('粉丝互动');
const iIlIiil = $.isNode() ? require("./sendNotify") : "",
    l1illil = $.isNode() ? require("./jdCookie.js") : "",
    iIiiIli1 = $.isNode() ? process.env.RUHUI ? process.env.RUHUI : 0 : 0,
    iiiIIl11 = $.isNode() ? process.env.RUNCK ? process.env.RUNCK : 5 : 5;
let II1l1IIi = [],
    iilI1I1I = "";

if ($.isNode()) {
    Object.keys(l1illil).forEach(lIilIIi1 => {
        II1l1IIi.push(l1illil[lIilIIi1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else II1l1IIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(li1lI1 => li1lI1.cookie)].filter(il1i => !!il1i);

$.CryptoJS = require("crypto-js");
!(async () => {
    $.appId = "8adfb";
    $.fingerprint = iliI11I();
    $.tokenTk = "";
    $.ua = IIilll11();

    if (activityList.length == 0) {
        $.log("无活动id，退出");
        return;
    }

    await iIi1iI1();
    activityList = lIiil1ii(activityList, activityList.length);
    $.helpFalg = false;

    // if ($.helpFalg) {
    //     II1Il1l();
    // }

    $.cookiesArr = II1l1IIi;

    for (let l1lIliIi = 0; l1lIliIi < iiiIIl11; l1lIliIi++) {
        $.cookie = $.cookiesArr[l1lIliIi];

        if ($.cookie) {
            $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1]);
            $.index = l1lIliIi + 1;
            console.log("\n********开始【京东账号" + $.index + "】" + $.UserName + "********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
            $.UA = IIilll11();
            $.token = "";
            $.token = await I11lii1l();

            if (!$.token) {
                console.log("获取token失败");
                return;
            }

            for (let lii1lilI = 0; lii1lilI < activityList.length; lii1lilI++) {
                let IilI1lI1 = activityList[lii1lilI].id,
                    lilllll1 = Date.now();

                if (lilllll1 < activityList[lii1lilI].endTime) {
                    let iili11il = "https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity/" + IilI1lI1 + "?activityId=" + IilI1lI1;
                    console.log("\n活动链接" + (lii1lilI + 1) + "：" + iili11il);
                    $.thisActivityUrl = iili11il;
                    $.activityId = III1ili($.thisActivityUrl, "activityId");
                    $.host = "lzkjdz-isv.isvjcloud.com";

                    try {
                        await lIiIIIii($);
                    } catch (I111iill) { }

                    await $.wait(3000);
                } else console.log("\n活动ID：" + IilI1lI1 + ",已过期");
            }
        }
    }

    iilI1I1I && (await iIlIiil.sendNotify("粉丝互动ID：" + $.activityId, iilI1I1I));
})().catch(I1lii1Ii => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + I1lii1Ii + "!", "");
}).finally(() => {
    $.done();
});

async function lIiIIIii(ii1l11i) {
    ii1l11i.LZ_TOKEN_KEY = "";
    ii1l11i.LZ_TOKEN_VALUE = "";
    ii1l11i.lz_jdpin_token = "";
    ii1l11i.pin = "";
    ii1l11i.nickname = "";
    ii1l11i.venderId = "";
    ii1l11i.activityType = "";
    ii1l11i.LZ_AES_PIN = "";
    ii1l11i.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
    await iiiiI1(ii1l11i);

    if (!ii1l11i.LZ_TOKEN_KEY || !ii1l11i.LZ_TOKEN_VALUE) {
        console.log("初始化失败1");
        return;
    }

    let I11IIi = await l1IiliIi(ii1l11i, "customer/getSimpleActInfoVo");
    ii1l11i.venderId = I11IIi.data.venderId || "";
    ii1l11i.activityType = I11IIi.data.activityType || "";
    console.log("venderId:" + ii1l11i.venderId);
    let IIll11i = await l1IiliIi(ii1l11i, "customer/getMyPing");
    ii1l11i.pin = IIll11i.data.secretPin;
    ii1l11i.nickname = IIll11i.data.nickname;

    if (!ii1l11i.pin) {
        console.log("获取pin失败,该账号可能是黑号");
        return;
    }

    await l1IiliIi(ii1l11i, "common/accessLogWithAD");
    let il11iI1 = await l1IiliIi(ii1l11i, "wxActionCommon/getUserInfo"),
        iIlIlIl1 = await l1IiliIi(ii1l11i, "wxActionCommon/getShopInfoVO"),
        iiilli = await l1IiliIi(ii1l11i, "wxCommonInfo/getActMemberInfo");
    il11iI1 && il11iI1.data && il11iI1.data.yunMidImageUrl && (ii1l11i.attrTouXiang = il11iI1.data.yunMidImageUrl);
    let IiIIiIll = await l1IiliIi(ii1l11i, "wxFansInterActionActivity/activityContent");
    ii1l11i.activityData = IiIIiIll.data || {};
    ii1l11i.actinfo = ii1l11i.activityData.actInfo;
    ii1l11i.actorInfo = ii1l11i.activityData.actorInfo;
    ii1l11i.nowUseValue = Number(ii1l11i.actorInfo.fansLoveValue) + Number(ii1l11i.actorInfo.energyValue);

    if (JSON.stringify(ii1l11i.activityData) === "{}") {
        console.log("获取活动信息失败");
        return;
    }

    console.log(ii1l11i.actinfo.actName + "," + iIlIlIl1.data.shopName);
    console.log("当前积分：" + ii1l11i.nowUseValue);
    console.log("活动结束时间：" + liiIlIII(ii1l11i.activityData.actInfo.endTime));
    let llii1Il1 = [],
        ii1ii1ll = ["One", "Two", "Three"];

    for (let li1Iill1 = 0; li1Iill1 < ii1ii1ll.length; li1Iill1++) {
        let IIII1IIl = ii1l11i.activityData.actInfo["giftLevel" + ii1ii1ll[li1Iill1]] || "";

        if (IIII1IIl) {
            IIII1IIl = JSON.parse(IIII1IIl);
            llii1Il1.push(IIII1IIl[0].name);
        }
    }

    console.log("奖品列表：" + llii1Il1.toString());

    if (ii1l11i.actorInfo.prizeOneStatus && ii1l11i.actorInfo.prizeTwoStatus && ii1l11i.actorInfo.prizeThreeStatus) {
        console.log("已完成抽奖");
        return;
    }

    if (iiilli.data.actMemberStatus === 1 && !iiilli.data.openCard) {
        console.log("活动需要入会后才能参与，如需自动入会请设置变量RUHUI=1");

        if (Number(iIiiIli1) === 1) {
            console.log("去入会");
            let ilIIIli = await i1II(ii1l11i.venderId);
            if (!ilIIIli.includes("成功")) return;
            IiIIiIll = await l1IiliIi(ii1l11i, "wxFansInterActionActivity/activityContent");
            ii1l11i.activityData = IiIIiIll.data || {};
            await ii1l11i.wait(3000);
        } else {
            console.log("不执行入会，跳出");
            return;
        }
    } else {
        if (iiilli.data.openCard) { }
    }

    if (ii1l11i.activityData.actorInfo && !ii1l11i.activityData.actorInfo.follow) {
        console.log("去关注店铺");
        ii1l11i.body = "activityId=" + ii1l11i.activityId + "&uuid=" + ii1l11i.activityData.actorInfo.uuid;
        let llIIIl11 = await l1IiliIi(ii1l11i, "wxFansInterActionActivity/followShop", ii1l11i.body);
        console.log(JSON.stringify(llIIIl11));
        await ii1l11i.wait(3000);
    }

    ii1l11i.upFlag = false;
    await IiiI1II1(ii1l11i);
    await illlllI(ii1l11i);
}

async function illlllI(III1ll1I) {
    if (III1ll1I.upFlag) {
        activityData = await l1IiliIi(III1ll1I, "wxFansInterActionActivity/activityContent");
        III1ll1I.activityData = activityData.data || {};
        await III1ll1I.wait(3000);
    }

    let IliiII1i = Number(III1ll1I.activityData.actorInfo.fansLoveValue) + Number(III1ll1I.activityData.actorInfo.energyValue),
        IliIl1l1 = ["One", "Two", "Three"],
        l1i11iIl = {
            "One": "01",
            "Two": "02",
            "Three": "03"
        };

    for (let lII1ii1l = 0; lII1ii1l < IliIl1l1.length; lII1ii1l++) {
        if (IliiII1i >= III1ll1I.activityData.actConfig["prizeScore" + IliIl1l1[lII1ii1l]] && III1ll1I.activityData.actorInfo["prize" + IliIl1l1[lII1ii1l] + "Status"] === false) {
            console.log("\n开始第" + Number(l1i11iIl[IliIl1l1[lII1ii1l]]) + "次抽奖");
            III1ll1I.body = "activityId=" + III1ll1I.activityId + "&uuid=" + III1ll1I.activityData.actorInfo.uuid + "&drawType=" + l1i11iIl[IliIl1l1[lII1ii1l]];
            let II1iIil = await l1IiliIi(III1ll1I, "wxFansInterActionActivity/startDraw", III1ll1I.body);

            if (II1iIil.result && II1iIil.count === 0) {
                let l11l1l1 = II1iIil.data;

                if (!l11l1l1.drawOk) {
                    console.log("抽奖获得:空气");
                } else {
                    console.log("抽奖获得:" + l11l1l1.name);
                    iilI1I1I += III1ll1I.UserName + ",获得：" + (l11l1l1.name || "未知") + "\n";
                }
            } else {
                console.log("抽奖异常");
            }

            console.log(JSON.stringify(II1iIil));
            await III1ll1I.wait(3000);
        }
    }
}

async function IiiI1II1(llIlii11) {
    let I1l1IIli = 0;

    if (llIlii11.activityData.task2BrowGoods) {
        if (llIlii11.activityData.task2BrowGoods.finishedCount !== llIlii11.activityData.task2BrowGoods.upLimit) {
            I1l1IIli = Number(llIlii11.activityData.task2BrowGoods.upLimit) - Number(llIlii11.activityData.task2BrowGoods.finishedCount);
            console.log("开始做浏览商品任务");
            llIlii11.upFlag = true;

            for (let Ii1i1il = 0; Ii1i1il < llIlii11.activityData.task2BrowGoods.taskGoodList.length && I1l1IIli > 0; Ii1i1il++) {
                llIlii11.oneGoodInfo = llIlii11.activityData.task2BrowGoods.taskGoodList[Ii1i1il];

                if (llIlii11.oneGoodInfo.finished === false) {
                    console.log("浏览:" + (llIlii11.oneGoodInfo.skuName || ""));
                    llIlii11.body = "activityId=" + llIlii11.activityId + "&uuid=" + llIlii11.activityData.actorInfo.uuid + "&skuId=" + llIlii11.oneGoodInfo.skuId;
                    let ilII = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doBrowGoodsTask", llIlii11.body);
                    console.log(JSON.stringify(ilII));
                    await llIlii11.wait(3000);
                    I1l1IIli--;
                }
            }
        } else console.log("浏览商品任务已完成");
    }

    if (llIlii11.activityData.task6GetCoupon) {
        if (llIlii11.activityData.task6GetCoupon.finishedCount !== llIlii11.activityData.task6GetCoupon.upLimit) {
            I1l1IIli = Number(llIlii11.activityData.task6GetCoupon.upLimit) - Number(llIlii11.activityData.task6GetCoupon.finishedCount);
            console.log("开始做领取优惠券");
            llIlii11.upFlag = true;

            for (let iiIlI1Il = 0; iiIlI1Il < llIlii11.activityData.task6GetCoupon.taskCouponInfoList.length && I1l1IIli > 0; iiIlI1Il++) {
                llIlii11.oneCouponInfo = llIlii11.activityData.task6GetCoupon.taskCouponInfoList[iiIlI1Il];

                if (llIlii11.oneCouponInfo.finished === false) {
                    llIlii11.body = "activityId=" + llIlii11.activityId + "&uuid=" + llIlii11.activityData.actorInfo.uuid + "&couponId=" + llIlii11.oneCouponInfo.couponInfo.couponId;
                    let l1I11 = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doGetCouponTask", llIlii11.body);
                    console.log(JSON.stringify(l1I11));
                    await llIlii11.wait(3000);
                    I1l1IIli--;
                }
            }
        } else console.log("领取优惠券已完成");
    }

    llIlii11.body = "activityId=" + llIlii11.activityId + "&uuid=" + llIlii11.activityData.actorInfo.uuid;

    if (llIlii11.activityData.task1Sign && llIlii11.activityData.task1Sign.finishedCount === 0) {
        console.log("执行每日签到");
        let Ill1i1I = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doSign", llIlii11.body);
        console.log(JSON.stringify(Ill1i1I));
        await llIlii11.wait(3000);
        llIlii11.upFlag = true;
    } else console.log("已签到");

    if (llIlii11.activityData.task4Share) {
        if (llIlii11.activityData.task4Share.finishedCount !== llIlii11.activityData.task4Share.upLimit) {
            I1l1IIli = Number(llIlii11.activityData.task4Share.upLimit) - Number(llIlii11.activityData.task4Share.finishedCount);
            console.log("开始做分享任务");
            llIlii11.upFlag = true;

            for (let Iilill1l = 0; Iilill1l < I1l1IIli; Iilill1l++) {
                console.log("执行第" + (Iilill1l + 1) + "次分享");
                let i1IIIlIi = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doShareTask", llIlii11.body);
                console.log(JSON.stringify(i1IIIlIi));
                await llIlii11.wait(3000);
            }
        } else console.log("分享任务已完成");
    }

    if (llIlii11.activityData.task5Remind) {
        if (llIlii11.activityData.task5Remind.finishedCount !== llIlii11.activityData.task5Remind.upLimit) {
            console.log("执行设置活动提醒");
            llIlii11.upFlag = true;
            let i11lIiI1 = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doRemindTask", llIlii11.body);
            console.log(JSON.stringify(i11lIiI1));
            await llIlii11.wait(3000);
        } else console.log("设置活动提醒已完成");
    }

    if (llIlii11.activityData.task7MeetPlaceVo) {
        if (llIlii11.activityData.task7MeetPlaceVo.finishedCount !== llIlii11.activityData.task7MeetPlaceVo.upLimit) {
            console.log("执行逛会场");
            llIlii11.upFlag = true;
            let li1lll1i = await l1IiliIi(llIlii11, "wxFansInterActionActivity/doMeetingTask", llIlii11.body);
            console.log(JSON.stringify(li1lll1i));
            await llIlii11.wait(3000);
        } else console.log("逛会场已完成");
    }
}

function III1ili(l1lI1II1, l1iliIlI) {
    if (typeof URL !== "undefined") {
        let iillIli = new URL(l1lI1II1),
            I11I1il = iillIli.searchParams.get(l1iliIlI);
        return I11I1il ? I11I1il : "";
    } else {
        const IiIilI1I = l1lI1II1.match(/\?.*/)[0].substring(1),
            il1Iiiil = IiIilI1I.split("&");

        for (let i1i1l1il = 0; i1i1l1il < il1Iiiil.length; i1i1l1il++) {
            const ilII1Iil = il1Iiiil[i1i1l1il].split("=");
            if (ilII1Iil[0] === l1iliIlI) return il1Iiiil[i1i1l1il].substr(il1Iiiil[i1i1l1il].indexOf("=") + 1);
        }

        return "";
    }
}

async function I11lii1l() {
    for (let i11i11iI = 0; i11i11iI < 3; i11i11iI++) {
        var illlliI = await lIiili1I("isvObfuscator", {
            "id": "",
            "url": "https://lzkjdz-isv.isvjcloud.com"
        });
        if (illlliI) break;
        await $.wait(5000);
    }

    let II1lllIi = {
        "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        "body": illlliI,
        "headers": {
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
            "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
            "content-type": "application/x-www-form-urlencoded",
            "Cookie": $.cookie
        }
    };
    return new Promise(i11IliI1 => {
        $.post(II1lllIi, async (iIliIli, iIlI11Il, IliiI1Ii) => {
            try {
                iIliIli ? (console.log("" + JSON.stringify(iIliIli)), console.log($.name + " API请求失败，请检查网路重试")) : IliiI1Ii = JSON.parse(IliiI1Ii);
            } catch (IlllIiI1) {
                $.logErr(IlllIiI1, iIlI11Il);
            } finally {
                i11IliI1(IliiI1Ii.token || "");
            }
        });
    });
}

async function iiiiI1(Ili1I1I1) {
    let IIliil1i = {
        "url": Ili1I1I1.thisActivityUrl,
        "headers": {
            "Host": Ili1I1I1.host,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Cookie": "IsvToken=" + Ili1I1I1.token + ";" + Ili1I1I1.cookie,
            "User-Agent": Ili1I1I1.UA,
            "Accept-Language": "zh-cn",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive"
        }
    };
    return new Promise(Ii1Ii1il => {
        Ili1I1I1.get(IIliil1i, (lIIIIlI, IlIi11il, Iiil1i11) => {
            try {
                IIiiiiIi(Ili1I1I1, IlIi11il);
            } catch (IIlIlII) {
                Ili1I1I1.logErr(IIlIlII, IlIi11il);
            } finally {
                Ii1Ii1il(Iiil1i11);
            }
        });
    });
}

function IIiiiiIi(iIlili, Illil11i) {
    if (Illil11i === undefined) {
        return;
    }

    let IIlII1lI = Illil11i.headers["set-cookie"] || Illil11i.headers["Set-Cookie"] || "";

    if (IIlII1lI) {
        let Ii11illi = IIlII1lI.filter(I11ii111 => I11ii111.indexOf("lz_jdpin_token") !== -1)[0];
        Ii11illi && Ii11illi.indexOf("lz_jdpin_token=") > -1 && (iIlili.lz_jdpin_token = Ii11illi.split(";") && Ii11illi.split(";")[0] + ";" || "");
        let i1lil1li = IIlII1lI.filter(iIIII1lI => iIIII1lI.indexOf("LZ_TOKEN_KEY") !== -1)[0];

        if (i1lil1li && i1lil1li.indexOf("LZ_TOKEN_KEY=") > -1) {
            let i1IiIli1 = i1lil1li.split(";") && i1lil1li.split(";")[0] || "";
            iIlili.LZ_TOKEN_KEY = i1IiIli1.replace("LZ_TOKEN_KEY=", "");
        }

        let IlIIIliI = IIlII1lI.filter(Il1Illii => Il1Illii.indexOf("LZ_TOKEN_VALUE") !== -1)[0];

        if (IlIIIliI && IlIIIliI.indexOf("LZ_TOKEN_VALUE=") > -1) {
            let Ill11il = IlIIIliI.split(";") && IlIIIliI.split(";")[0] || "";
            iIlili.LZ_TOKEN_VALUE = Ill11il.replace("LZ_TOKEN_VALUE=", "");
        }

        let I1l1iIi1 = IIlII1lI.filter(i1I111II => i1I111II.indexOf("LZ_AES_PIN") !== -1)[0];

        if (I1l1iIi1 && I1l1iIi1.indexOf("LZ_AES_PIN=") > -1) {
            let i1IlliIl = I1l1iIi1.split(";") && I1l1iIi1.split(";")[0] || "";
            iIlili.LZ_AES_PIN = i1IlliIl.replace("LZ_AES_PIN=", "");
        }
    }
}

async function l1IiliIi(iiIliill, l1iIlil1, IllI1llI = "activityId=" + iiIliill.activityId + "&pin=" + encodeURIComponent(iiIliill.pin)) {
    let il1II1i = "https://" + iiIliill.host + "/" + l1iIlil1;

    switch (l1iIlil1) {
        case "customer/getSimpleActInfoVo":
        case "dz/common/getSimpleActInfoVo":
        case "wxCommonInfo/initActInfo":
        case "wxCollectionActivity/shopInfo":
        case "wxCollectCard/shopInfo":
        case "wxCollectCard/drawContent":
            IllI1llI = "activityId=" + iiIliill.activityId;
            break;

        case "customer/getMyPing":
            IllI1llI = "userId=" + iiIliill.venderId + "&token=" + encodeURIComponent(iiIliill.token) + "&fromType=APP";
            break;

        case "common/accessLogWithAD":
        case "common/accessLog":
            IllI1llI = "venderId=" + iiIliill.venderId + "&code=" + iiIliill.activityType + "&pin=" + encodeURIComponent(iiIliill.pin) + "&activityId=" + iiIliill.activityId + "&pageUrl=" + encodeURIComponent(iiIliill.thisActivityUrl) + "&subType=app&adSource=null";
            break;

        case "wxActionCommon/getUserInfo":
            IllI1llI = "pin=" + encodeURIComponent(iiIliill.pin);
            break;

        case "wxCommonInfo/getActMemberInfo":
            IllI1llI = "venderId=" + iiIliill.venderId + "&activityId=" + iiIliill.activityId + "&pin=" + encodeURIComponent(iiIliill.pin);
            break;

        case "wxActionCommon/getShopInfoVO":
            IllI1llI = "userId=" + iiIliill.venderId;
            break;

        case "2222":
            IllI1llI = "222";
            break;
    }

    const II1lIIi1 = {
        "X-Requested-With": "XMLHttpRequest",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://" + iiIliill.host,
        "User-Agent": iiIliill.UA,
        "Cookie": iiIliill.cookie + " LZ_TOKEN_KEY=" + iiIliill.LZ_TOKEN_KEY + "; LZ_TOKEN_VALUE=" + iiIliill.LZ_TOKEN_VALUE + "; LZ_AES_PIN = " + iiIliill.LZ_AES_PIN + ";AUTH_C_USER=" + iiIliill.pin + "; " + iiIliill.lz_jdpin_token,
        "Host": iiIliill.host,
        "Referer": iiIliill.thisActivityUrl,
        "Accept-Language": "zh-cn",
        "Accept": "application/json"
    };
    let l1lii1I1 = {
        "url": il1II1i,
        "method": "POST",
        "headers": II1lIIi1,
        "body": IllI1llI
    };
    return new Promise(async Ili11lii => {
        iiIliill.post(l1lii1I1, (I1liiIii, iII111l, i11ii1i) => {
            try {
                IIiiiiIi(iiIliill, iII111l);
                i11ii1i && (i11ii1i = JSON.parse(i11ii1i));
            } catch (III1iiiI) {
                console.log(i11ii1i);
                iiIliill.logErr(III1iiiI, iII111l);
            } finally {
                Ili11lii(i11ii1i);
            }
        });
    });
}

function i1II(iIIl1l1l) {
    const IiilI1li = {
        "url": "https://api.m.jd.com/?appid=jd_shop_member&functionId=bindWithVender&body=" + JSON.stringify({
            "venderId": iIIl1l1l,
            "shopId": iIIl1l1l,
            "bindByVerifyCodeFlag": 1
        }),
        "headers": {
            "Cookie": $.cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Referer": "https://shopmember.m.jd.com/"
        }
    };
    return new Promise(lIl1lI => {
        $.post(IiilI1li, (lIIliIl, liIIill1, ii1i1ii1) => {
            try {
                if (lIIliIl) $.logErr(lIIliIl); else {
                    if (ii1i1ii1) {
                        ii1i1ii1 = JSON.parse(ii1i1ii1);

                        if (ii1i1ii1.busiCode == "0") {
                            $.log(ii1i1ii1.message);
                            if (ii1i1ii1.result && ii1i1ii1.result.giftInfo) for (let IlIlli1 of lIIII1il.result.giftInfo.giftList) {
                                console.log(" >> 入会获得：" + IlIlli1.discountString + IlIlli1.prizeName + IlIlli1.secondLineDesc);
                            }
                        } else {
                            $.log(ii1i1ii1.message);
                        }
                    } else $.log("京东返回了空数据");
                }
            } catch (Il11li1) {
                $.logErr(Il11li1);
            } finally {
                lIl1lI(ii1i1ii1.message);
            }
        });
    });
}

function lIiil1ii(IiI1IIli, i11II1Il) {
    var I1ll1III = IiI1IIli.slice(0),
        I1ilI1Ii = IiI1IIli.length,
        l11IIl1 = I1ilI1Ii - i11II1Il,
        i1i11II,
        iill111i;

    while (I1ilI1Ii-- > l11IIl1) {
        iill111i = Math.floor((I1ilI1Ii + 1) * Math.random());
        i1i11II = I1ll1III[iill111i];
        I1ll1III[iill111i] = I1ll1III[I1ilI1Ii];
        I1ll1III[I1ilI1Ii] = i1i11II;
    }

    return I1ll1III.slice(l11IIl1);
}

function lIiili1I(l1liIil, ll1II1I) {
    var Ii1lIii1 = "";
    let lIil11iI = {
        "body": JSON.stringify(ll1II1I),
        "fn": l1liIil
    };
    return new Promise(Ill1ii11 => {
        let iIiilIli = {
            "url": "https://api.nolanstore.cc/sign",
            "body": JSON.stringify(lIil11iI),
            "headers": {
                "Content-Type": "application/json"
            },
            "timeout": 30000
        };
        $.post(iIiilIli, async (ilIll11I, ll1IIlI, lii1l1l) => {
            try {
                lii1l1l ? (console.log("连接服务成功"), lii1l1l = JSON.parse(lii1l1l), Ii1lIii1 = lii1l1l.body) : console.log("连接服务失败，重试。。。");
            } catch (iIlili1l) {
                $.logErr(iIlili1l, ll1IIlI);
            } finally {
                Ill1ii11(Ii1lIii1);
            }
        });
    });
}

function liiIlIII(I1IllI1l) {
    let Ii1illl1 = new Date(I1IllI1l),
        i111iI1 = Ii1illl1.getFullYear(),
        l1iiI1l1 = Ii1illl1.getMonth() + 1,
        IIlllIll = Ii1illl1.getDate();
    return i111iI1 + "-" + (l1iiI1l1 < 10 ? "0" + l1iiI1l1 : l1iiI1l1) + "-" + (IIlllIll < 10 ? "0" + IIlllIll : IIlllIll) + " " + Ii1illl1.toTimeString().substr(0, 8);
}

async function iII1lIi1(I1lllIIl, IlllillI) {
    let IIlilll1 = {
        "url": "https://api.m.jd.com/",
        "body": "functionId=TaskInviteServiceNew&body=" + JSON.stringify({
            "method": "participateInviteTask",
            "data": {
                "channel": "1",
                "encryptionInviterPin": encodeURIComponent(IlllillI),
                "type": 1
            }
        }) + "&appid=jx_h5&uuid=&_t=" + Date.now(),
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://assignment.jd.com",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "User-Agent": $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require("./function/JS_USER_AGENTS").USER_AGENT : $.getdata("JSUA") ? $.getdata("JSUA") : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            "Referer": "https://assignment.jd.com/",
            "Accept-Encoding": "gzip, deflate, br",
            "Cookie": I1lllIIl
        }
    };
    $.post(IIlilll1, (lilIiil1, IilIlI11, l1llii1l) => { });
}

async function I1illii1(liI1l1lI, iIiI1il) {
    let i1lliili = Date.now(),
        I1IIi1Il = {
            "Host": "api.m.jd.com",
            "accept": "application/json, text/plain, */*",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://assignment.jd.com",
            "accept-language": "zh-cn",
            "user-agent": $.isNode() ? process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : require("./function/JS_USER_AGENTS").USER_AGENT : $.getdata("JSUA") ? $.getdata("JSUA") : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            "referer": "https://assignment.jd.com/?inviterId=" + encodeURIComponent(iIiI1il),
            "Cookie": liI1l1lI
        },
        Ill1lIIi = "functionId=TaskInviteServiceNew&body={\"method\":\"participateInviteTask\",\"data\":{\"channel\":\"1\",\"encryptionInviterPin\":\"" + encodeURIComponent(iIiI1il) + "\",\"type\":1}}&appid=jx_h5&uuid=&_t=" + i1lliili;
    var I1ili1l1 = {
        "url": "https://api.m.jd.com/",
        "headers": I1IIi1Il,
        "body": Ill1lIIi
    };
    $.post(I1ili1l1, (ii1i1il, iIiI1III, il1IIiiI) => { });
}

function IIilll11() {
    $.UUID = iilllIll(40);
    const Iil1Iil = {
        "167814": "10.1.4",
        "167841": "10.1.6"
    };
    $.osVersion = iiI1lIiI(12, 14) + "." + iiI1lIiI(0, 6);
    let IiIII1iI = "network/" + ["4g", "5g", "wifi"][iiI1lIiI(0, 2)];
    return $.mobile = "iPhone" + iiI1lIiI(9, 13) + "," + iiI1lIiI(1, 3), $.build = ["167814", "167841", "167894"][iiI1lIiI(0, 1)], $.appVersion = Iil1Iil[$.build], "jdapp;iPhone;" + $.appVersion + ";" + $.osVersion + ";" + $.UUID + ";" + IiIII1iI + ";model/" + $.mobile + ";addressid/" + iiI1lIiI(1000000000) + ";appBuild/" + $.build + ";jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + $.osVersion.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function iilllIll(liiI11li, li1ll1II = 0) {
    var IlliiIiI = "",
        illi11Il = liiI11li;
    li1ll1II && (illi11Il = Math.floor(Math.random() * li1ll1II - liiI11li + 1 + liiI11li));

    for (let llli11l1 = 0; llli11l1 < illi11Il;) {
        let illlll1 = Math.random().toString(16).substring(2);
        illi11Il - llli11l1 > illlll1.length ? (IlliiIiI += illlll1, llli11l1 += illlll1.length) : (IlliiIiI += illlll1.slice(llli11l1 - illi11Il), llli11l1 += illlll1.length);
    }

    return IlliiIiI;
}

function iiI1lIiI(i1lI1i1I, li1III1i) {
    if (arguments.length === 0) return Math.random();
    if (!li1III1i) li1III1i = 10 ** Math.log(i1lI1i1I) * Math.LOG10E + 1 | 0 - 1;
    return Math.floor(Math.random() * li1III1i - i1lI1i1I + 1 + i1lI1i1I);
}

function iliI11I() {
    const lii111Il = "0123456789",
        II1i1lI = 3,
        ili1iI1l = Math.random() * 10 | 0,
        iiIilIli = 16;
    let IlIilll = "",
        iil11iII = "";
    return !((l1l111i1, i1lll1i1) => {
        let I1i1iIl = i1lll1i1.split(""),
            Il11iii1 = [];

        for (let IiI1i1l = 0; IiI1i1l < l1l111i1; IiI1i1l++) {
            let il1iiiIi = Math.random() * I1i1iIl.length - 1 | 0;
            Il11iii1.push(I1i1iIl[il1iiiIi]);
            I1i1iIl.splice(il1iiiIi, 1);
        }

        IlIilll = Il11iii1.join("");
        iil11iII = I1i1iIl.join("");
    })(II1i1lI, lii111Il), ((iI1Iilll, l1iilliI) => {
        let il1IiIii = iI1Iilll,
            i1lii1il = iiIilIli - II1i1lI - iI1Iilll.toString().length - iI1Iilll,
            Ii1llill = "";

        while (il1IiIii--) Ii1llill += l1iilliI[Math.random() * l1iilliI.length | 0];

        Ii1llill += IlIilll;

        while (i1lii1il--) Ii1llill += l1iilliI[Math.random() * l1iilliI.length | 0];

        return Ii1llill += iI1Iilll, Ii1llill;
    })(ili1iI1l, iil11iII);
}

async function iIi1iI1() {
    const I1I1Ii1i = {
        "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
        "headers": {
            "Authority": "cactus.jd.com",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Accept": "application/json",
            "User-Agent": $.ua,
            "Content-Type": "application/json",
            "Origin": "https://st.jingxi.com",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://st.jingxi.com/",
            "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7"
        },
        "body": JSON.stringify({
            "version": "3.0",
            "fp": $.fingerprint,
            "appId": $.appId,
            "timestamp": Date.now(),
            "platform": "web",
            "expandParams": ""
        })
    };
    return new Promise(async i1liil11 => {
        $.post(I1I1Ii1i, (Il11l111, i1Il1lI1, I1lllI1l) => {
            try {
                if (Il11l111) {
                    console.log("" + JSON.stringify(Il11l111));
                    console.log("request_algo 签名参数API请求失败，请检查网路重试");
                } else {
                    if (I1lllI1l) {
                        I1lllI1l = JSON.parse(I1lllI1l);

                        if (I1lllI1l.status === 200) {
                            $.tokenTk = I1lllI1l.data.result.tk;
                            let iIIiiii1 = I1lllI1l.data.result.algo;
                            if (iIIiiii1) $.enCryptMethodJD = new Function("return " + iIIiiii1)();
                        } else {
                            console.log("request_algo 签名参数API请求失败:");
                        }
                    } else console.log("京东服务器返回空数据");
                }
            } catch (iIl1iiIi) {
                $.logErr(iIl1iiIi, i1Il1lI1);
            } finally {
                i1liil11();
            }
        });
    });
}

async function iIii1Ili(IIIili11, lIiii1Ii) {
    const II1Il1I = $.CryptoJS.SHA256(lIiii1Ii).toString($.CryptoJS.enc.Hex);
    let l1iI1iiI = "jsonp_" + Date.now() + "_52022",
        ii1i1iil = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=" + IIIili11 + "&body=" + II1Il1I + "&clientVersion=9.2.0&client=H5&uuid=88888&jsonp=" + l1iI1iiI;
    const l1Iil1li = "appid,body,client,clientVersion,functionId,jsonp",
        iiii1iil = Date.now(),
        llIiI1i1 = Ili11Il("yyyyMMddhhmmssSSS", new Date(iiii1iil));
    let I1lI1ll = $.enCryptMethodJD($.tokenTk, $.fingerprint.toString(), llIiI1i1.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex),
        iliiIIii = "";
    l1Iil1li.split(",").map((I1liiII1, iI1Ii11l) => {
        iliiIIii += I1liiII1 + ":" + III1ili(ii1i1iil, I1liiII1) + (iI1Ii11l === l1Iil1li.split(",").length - 1 ? "" : "&");
    });
    const iiI1ii1i = $.CryptoJS.HmacSHA256(iliiIIii, I1lI1ll.toString()).toString($.CryptoJS.enc.Hex);
    let I1l1Iil = ["".concat(llIiI1i1.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.tokenTk), "".concat(iiI1ii1i), "".concat("3.0"), "".concat(iiii1iil)].join(";"),
        iliiIiI = encodeURIComponent(lIiii1Ii) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1l1Iil) + "&jsonp=" + l1iI1iiI;
    return iliiIiI;
}

function Ili11Il(il1Ii1li, lIlIll1) {
    var lIiillIl = il1Ii1li,
        iII1I1I1 = {
            "M+": lIlIll1.getMonth() + 1,
            "d+": lIlIll1.getDate(),
            "D+": lIlIll1.getDate(),
            "h+": lIlIll1.getHours(),
            "H+": lIlIll1.getHours(),
            "m+": lIlIll1.getMinutes(),
            "s+": lIlIll1.getSeconds(),
            "w+": lIlIll1.getDay(),
            "q+": Math.floor(lIlIll1.getMonth() + 3 / 3),
            "S+": lIlIll1.getMilliseconds()
        };
    /(y+)/i.test(lIiillIl) && (lIiillIl = lIiillIl.replace(RegExp.$1, "".concat(lIlIll1.getFullYear()).substr(4 - RegExp.$1.length)));

    for (var iIliilii in iII1I1I1) {
        if (new RegExp("(".concat(iIliilii, ")")).test(lIiillIl)) {
            var Il11i = "S+" === iIliilii ? "000" : "00";
            lIiillIl = lIiillIl.replace(RegExp.$1, 1 == RegExp.$1.length ? iII1I1I1[iIliilii] : ("".concat(Il11i) + iII1I1I1[iIliilii]).substr("".concat(iII1I1I1[iIliilii]).length));
        }
    }

    return lIiillIl;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

