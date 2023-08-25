/**
自动评价
cron 21 15 * * * jd_comment.js
搬运fake
*/
let lnrun = 0;
const $ = new Env('带图评价');

const II1lIiII = $.isNode() ? require("./sendNotify") : "",
    iillIill = $.isNode() ? require("./jdCookie.js") : "",
    liIiiI11 = require("./function/dylanx");

let iIliI1l1 = [],
    I11iIIlI = "";

if ($.isNode()) {
    Object.keys(iillIill).forEach(l1I11I1i => {
        iIliI1l1.push(iillIill[l1I11I1i]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else {
    let lIIliiiI = $.getdata("CookiesJD") || "[]";
    lIIliiiI = jsonParse(lIIliiiI);
    iIliI1l1 = lIIliiiI.map(iIi1iII => iIi1iII.cookie);
    iIliI1l1.reverse();
    iIliI1l1.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    iIliI1l1.reverse();
    iIliI1l1 = iIliI1l1.filter(IiIlIIlI => IiIlIIlI !== "" && IiIlIIlI !== null && IiIlIIlI !== undefined);
}

let i1lIiiii = process.env.userKeyWords && process.env.userKeyWords.split("@") || [],
    II1i1I1l = process.env.wordcount ?? 6,
    l11IiIlI = process.env.isCommentPic ?? false,
    IIIliI1 = ["很垃圾", "质量差", "此用户未填写评价内容"],
    IIllilI = ["网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉，我太感谢你了。", "质量非常好，真出乎我的意料，包装非常仔细，非常感谢，祝生意兴隆。", "这家店还好吧，来买过几次了，服务老客户非常周到，以后还常来。", "卖家的服务态度真好，发货很快。商品质量也相当不错。太喜欢了，谢谢。", "几以前几乎从未认真评价过，也不知道浪费了多少分。我听说评价中有100多个单词，基本上是每周访问一次。在京东购物太方便了，根本停不下来。从那时起，购买日用品时首先想到的就是京东，它是真正的。起初我很担心。现在我习惯了，这真的很好。现在我必须给更多的折扣。我下次会再来。我一直在购物。它仍然是一个非常好的宝贝。真的很好。这是值得的。网上买一次也没用。它还没有安装。我一次买了两个。大品牌值得信赖。", "我真的非常喜欢它，非常支持它，质量非常好，和卖家描述的一模一样，我非常满意。我真的很喜欢它，它完全超出了预期的价值，交货速度非常快，包装非常仔细和紧凑，物流公司有一个良好的服务态度，交货速度非常快，我非常满意购物", "质量非常好，与卖家描述的完全一致，非常满意，真 的很喜欢，完全超出期望值，发货速度非常快，包 装非常仔细、严实，物流公司服务态度很好，运送 速度很快，很满意的一次购质量很好，希望更多的 朋友信赖．店主态度特好，我会再次光顾的，可不 可以再便宜点，我带朋友来你家", "东西收到，很满意！！京东平台真的是超级好的卖家，解答疑问不厌其烦，细致认真，关键是东西好，而且货物发得超快，包装仔细，值得信赖！", "这个价格仍然很划算。经济、便宜、质量非常好，与卖方描述的完全一样。非常满意，完全出乎意料，超划算，划算，购物比实体店便宜多了，非常满意网上购物。我希望卖家的生意会越来越红火，物流会越来越快，包装会越来越结实。六星表扬，多一星不怕你骄傲，犹豫不决的朋友会很快下单，这是良心的推荐。它真的很好，而且价格也很高，所以你将来可以在这里买。给三个好评就满足了！满意了！满意了", "让我们先说说商品的质量：产品总体上是好的，包装很紧。让我们来谈谈商家服务：喜欢它。最后，快递：快递非常快。毕竟，廉价商品更真实。我希望商店能提供更多的折扣，及时通知老客户，并促进回购。祝你生意兴隆。"];
!(async () => {
    if (!iIliI1l1[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    if (l11IiIlI === false) {
        console.log("默认不执行, 需要执行请环境变量设置 isCommentPic 为 true");
        return;
    }

    let il1Iii11 = 0;
    iIliI1l1.length > 10 ? il1Iii11 = 10 : il1Iii11 = iIliI1l1.length;

    for (let IiliiIi = 0; IiliiIi < il1Iii11; IiliiIi++) {
        UA = "jdapp;iPhone;10.0.8;14.6;" + i1i1l1Il() + ";network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222493;appBuild/168841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16E158;supportJDSHWK/1";

        if (iIliI1l1[IiliiIi]) {
            I11iIIlI = iIliI1l1[IiliiIi];
            $.UserName = decodeURIComponent(I11iIIlI.match(/pt_pin=([^; ]+)(?=;?)/) && I11iIIlI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = IiliiIi + 1;
            $.isLogin = true;
            $.nickName = "";
            $.commentWareList = "";
            $.commentInfoList = "";
            await iIil1iiI();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await II1lIiII.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await l11lllIi();
            console.log("等待...");
            await $.wait(20000);
        }
    }
})().catch(IIl11l11 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + IIl11l11 + "!", "");
}).finally(() => {
    $.done();
});

async function l11lllIi() {
    let IiiliiII = [],
        IlIIIli1 = [],
        iIi1Ii1l = [];
    await ilIIIll();

    if (!$.maxPage) {
        console.log("获取待评价数据失败");
        return;
    }

    await $.wait(2000);
    await ilIIIll($.maxPage);
    let i1iII1I1 = $.commentWareList;

    if (i1iII1I1) {
        await IlIiIII1(i1iII1I1.wareId);
        await $.wait(2000);
        let II11Il1i = $.commentInfoList;

        for (const Ii1l11I1 of II11Il1i) {
            if (Ii1l11I1.commentInfo.pictureInfoList) {
                for (const I1lIIllI of Ii1l11I1.commentInfo.pictureInfoList || {}) {
                    if (I1lIIllI.mediaType != "2") {
                        if (I1lIIllI.picURL.indexOf("dpg") !== -1) picURL = I1lIIllI.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, "$1"); else {
                            if (I1lIIllI.picURL.indexOf("webp") !== -1) picURL = I1lIIllI.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, "$1"); else I1lIIllI.picURL.indexOf("avif") !== -1 && (picURL = I1lIIllI.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, "$1"));
                        }
                        IiiliiII.push(picURL);
                    }
                }
            }

            Ii1l11I1.commentInfo.commentScore === "5" && Ii1l11I1.commentInfo.commentData.length > II1i1I1l && IlIIIli1.push(Ii1l11I1.commentInfo.commentData);
        }

        nullKeyword = "";

        for (let iiill1ii of IIIliI1) i1lIiiii.push(iiill1ii);

        for (let ll1iIlli of IlIIIli1) {
            if (i1lIiiii.some(iI1lI1i => ll1iIlli.includes(iI1lI1i) ? nullKeyword = iI1lI1i : "")) {
                console.log("评价内容被过滤，含有关键词-【" + nullKeyword + "】");
            } else iIi1Ii1l.push(ll1iIlli);
        }

        let lII111li = [{
            "picUrl": IiiliiII[0]
        }, {
            "picUrl": IiiliiII[1]
        }],
            il1IiIIi = ll11lI1l(IIllilI);

        if (IiiliiII.length >= 2 && iIi1Ii1l.length >= 2) {
            console.log("去评价 ---> " + i1iII1I1.wname + "\n成功获取到图片，去带图评价!\n");
            await ii11il("pubComment", {
                "productId": i1iII1I1.wareId,
                "kocSynFlag": "0",
                "categoryList": i1iII1I1.categoryList,
                "voucherStatus": "0",
                "extInfo": {
                    "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
                },
                "officerScore": "1699",
                "anonymousFlag": "1",
                "commentScore": "5",
                "shopType": "0",
                "orderId": i1iII1I1.orderId,
                "shopId": i1iII1I1.shopId,
                "addPictureFlag": "0",
                "commentData": il1IiIIi,
                "pictureInfoList": lII111li,
                "officerLevel": "3",
                "isCommentTagContent": "0"
            });
        } else {
            if (IiiliiII.length >= 2 && iIi1Ii1l.length < 2) {
                console.log("去评价 ---> " + i1iII1I1.wname + "\n成功获取到图片，且没有获取到评价内容，采用脚本自带评价，去带图评价!\n");
                await ii11il("pubComment", {
                    "productId": i1iII1I1.wareId,
                    "kocSynFlag": "0",
                    "categoryList": i1iII1I1.categoryList,
                    "voucherStatus": "0",
                    "extInfo": {
                        "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
                    },
                    "officerScore": "1699",
                    "anonymousFlag": "1",
                    "commentScore": "5",
                    "shopType": "0",
                    "orderId": i1iII1I1.orderId,
                    "shopId": i1iII1I1.shopId,
                    "addPictureFlag": "0",
                    "commentData": il1IiIIi,
                    "pictureInfoList": lII111li,
                    "officerLevel": "3",
                    "isCommentTagContent": "0"
                });
            } else {
                if (IiiliiII.length < 2 && iIi1Ii1l.length >= 2) {
                    console.log("去评价 ---> " + i1iII1I1.wname + "\n没有获取到图片，且获取到评价，去评价!\n");
                    await ii11il("pubComment", {
                        "productId": i1iII1I1.wareId,
                        "kocSynFlag": "0",
                        "categoryList": i1iII1I1.ategoryList,
                        "voucherStatus": "0",
                        "officerScore": "1699",
                        "anonymousFlag": "1",
                        "commentScore": "5",
                        "shopType": "0",
                        "orderId": i1iII1I1.orderId,
                        "shopId": i1iII1I1.shopId,
                        "addPictureFlag": "0",
                        "commentData": il1IiIIi,
                        "pictureInfoList": "",
                        "officerLevel": "3",
                        "isCommentTagContent": "0"
                    });
                } else II11Il1i.length <= 1 && (console.log("去评价 ---> " + i1iII1I1.wname + "\n没有获取到评价内容,采用脚本自带评价\n"), await ii11il("pubComment", {
                    "productId": i1iII1I1.wareId,
                    "kocSynFlag": "0",
                    "categoryList": i1iII1I1.ategoryList,
                    "voucherStatus": "0",
                    "officerScore": "1699",
                    "anonymousFlag": "1",
                    "commentScore": "5",
                    "shopType": "0",
                    "orderId": i1iII1I1.orderId,
                    "shopId": i1iII1I1.shopId,
                    "addPictureFlag": "0",
                    "commentData": il1IiIIi,
                    "pictureInfoList": "",
                    "officerLevel": "3",
                    "isCommentTagContent": "0"
                }));
            }
        }
    } else console.log("没有待评价!!");
}

async function IlIiIII1(lIiiiiiI) {
    s = await ii11il("getCommentListWithCard", {
        "sortType": "5",
        "isCurrentSku": false,
        "sku": lIiiiiiI,
        "pictureCommentType": "A",
        "shieldCurrentComment": "1",
        "shopType": "0",
        "type": "4",
        "shadowMainSku": "0",
        "offset": "1",
        "num": "10"
    });
    $.commentInfoList = s.commentInfoList;
    console.log("准备获取评价...");
}

async function ilIIIll(I1iliI1i = "1") {
    s = await ii11il("getCommentWareList", {
        "status": "1",
        "planType": "1",
        "pageIndex": I1iliI1i,
        "pageSize": "10"
    });
    $.maxPage = s.commentWareListInfo?.["maxPage"];
    $.commentWareList = s.commentWareListInfo?.["commentWareList"]["reverse"]()[0];
}

async function ii11il(lII1li11, Illli1l) {
    return s = liIiiI11.getbody(lII1li11, Illli1l), opt = {
        "url": "https://api.m.jd.com/client.action?functionId=" + lII1li11,
        "body": "fuctionId=" + lII1li11 + "&" + s,
        "headers": {
            "Host": "api.m.jd.com",
            "content-type": "application/x-www-form-urlencoded",
            "accept": "*/*",
            "user-agent": UA,
            "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
            "Cookie": I11iIIlI
        }
    }, new Promise(IlIliiI => {
        $.post(opt, (IiiilIiI, lIIl1iIl, IIIi1iIl) => {
            try {
                IiiilIiI ? console.log(IiiilIiI) : IIIi1iIl = JSON.parse(IIIi1iIl);

                switch (lII1li11) {
                    case "pubComment":
                        IIIi1iIl.message && console.log(IIIi1iIl.message);
                        break;

                    default:
                        break;
                }
            } catch (ilIIlI11) {
                console.log(ilIIlI11);
            } finally {
                IlIliiI(IIIi1iIl);
            }
        });
    });
}

function i1i1l1Il() {
    return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}

function ll11lI1l(liliil) {
    return liliil[Math.floor(Math.random() * liliil.length)];
}

function I1i1ilII(ill1Ilii, Il1I1I1I) {
    const II1liiii = {
        "url": "http://fakermetaverse.xyz/sign",
        "body": JSON.stringify({
            "fn": ill1Ilii,
            "body": Il1I1I1I
        }),
        "headers": {
            "Content-Type": "application/json"
        }
    };
    return new Promise(iIIlIi => {
        $.post(II1liiii, async (lli1iI, liiIi1I, ll1lill) => {
            try {
                lli1iI ? console.log(lli1iI) : ll1lill = JSON.parse(ll1lill);
            } catch (I1IiiiIl) {
                $.logErr(I1IiiiIl, liiIi1I);
            } finally {
                iIIlIi(ll1lill || "");
            }
        });
    });
}

function iIil1iiI() {
    return new Promise(async lI1lli1 => {
        const lll1ll11 = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {
                "Host": "wq.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Cookie": I11iIIlI,
                "User-Agent": UA,
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        };
        $.get(lll1ll11, (li1i1ilI, I1iIiiIl, i1il1Il1) => {
            try {
                if (li1i1ilI) $.logErr(li1i1ilI); else {
                    if (i1il1Il1) {
                        if (1001 === (i1il1Il1 = JSON.parse(i1il1Il1)).retcode) return void ($.isLogin = !1);
                        0 === i1il1Il1.retcode && i1il1Il1.data && i1il1Il1.data.hasOwnProperty("userInfo") && ($.nickName = i1il1Il1.data.userInfo.baseInfo.nickname);
                        0 === i1il1Il1.retcode && i1il1Il1.data && i1il1Il1.data.assetInfo && ($.beanCount = i1il1Il1.data && i1il1Il1.data.assetInfo.beanNum);
                    } else console.log("京东服务器返回空数据");
                }
            } catch (IIliilII) {
                $.logErr(IIliilII);
            } finally {
                lI1lli1();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }