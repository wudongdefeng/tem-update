/**
自动评价
cron 21 15 * * * jd_comment.js
搬运fake
*/
let lnrun = 0;
const $ = new Env('带图评价');

const _0x6089f0 = $.isNode() ? require("./sendNotify") : "",
    _0x34c8af = $.isNode() ? require("./jdCookie.js") : "",
    _0x3e511c = require("./function/dylanx");

let _0x5a43b7 = [],
    _0x2a758b = "";

if ($.isNode()) {
    Object.keys(_0x34c8af).forEach(_0x204536 => {
        _0x5a43b7.push(_0x34c8af[_0x204536]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    let _0xffedb = $.getdata("CookiesJD") || "[]";

    _0xffedb = jsonParse(_0xffedb);
    _0x5a43b7 = _0xffedb.map(_0x4b456e => _0x4b456e.cookie);

    _0x5a43b7.reverse();

    _0x5a43b7.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);

    _0x5a43b7.reverse();

    _0x5a43b7 = _0x5a43b7.filter(_0x5aa2fa => _0x5aa2fa !== "" && _0x5aa2fa !== null && _0x5aa2fa !== undefined);
}

let _0x2d2778 = process.env.userKeyWords && process.env.userKeyWords.split("@") || [],
    _0x203393 = process.env.wordcount ?? 6,
    _0x3cba3c = process.env.isCommentPic ?? false,
    _0x3c7b88 = ["很垃圾", "质量差", "此用户未填写评价内容"],
    _0x136b32 = ["网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉，我太感谢你了。", "质量非常好，真出乎我的意料，包装非常仔细，非常感谢，祝生意兴隆。", "这家店还好吧，来买过几次了，服务老客户非常周到，以后还常来。", "卖家的服务态度真好，发货很快。商品质量也相当不错。太喜欢了，谢谢。", "几以前几乎从未认真评价过，也不知道浪费了多少分。我听说评价中有100多个单词，基本上是每周访问一次。在京东购物太方便了，根本停不下来。从那时起，购买日用品时首先想到的就是京东，它是真正的。起初我很担心。现在我习惯了，这真的很好。现在我必须给更多的折扣。我下次会再来。我一直在购物。它仍然是一个非常好的宝贝。真的很好。这是值得的。网上买一次也没用。它还没有安装。我一次买了两个。大品牌值得信赖。", "我真的非常喜欢它，非常支持它，质量非常好，和卖家描述的一模一样，我非常满意。我真的很喜欢它，它完全超出了预期的价值，交货速度非常快，包装非常仔细和紧凑，物流公司有一个良好的服务态度，交货速度非常快，我非常满意购物", "质量非常好，与卖家描述的完全一致，非常满意，真 的很喜欢，完全超出期望值，发货速度非常快，包 装非常仔细、严实，物流公司服务态度很好，运送 速度很快，很满意的一次购质量很好，希望更多的 朋友信赖．店主态度特好，我会再次光顾的，可不 可以再便宜点，我带朋友来你家", "东西收到，很满意！！京东平台真的是超级好的卖家，解答疑问不厌其烦，细致认真，关键是东西好，而且货物发得超快，包装仔细，值得信赖！", "这个价格仍然很划算。经济、便宜、质量非常好，与卖方描述的完全一样。非常满意，完全出乎意料，超划算，划算，购物比实体店便宜多了，非常满意网上购物。我希望卖家的生意会越来越红火，物流会越来越快，包装会越来越结实。六星表扬，多一星不怕你骄傲，犹豫不决的朋友会很快下单，这是良心的推荐。它真的很好，而且价格也很高，所以你将来可以在这里买。给三个好评就满足了！满意了！满意了", "让我们先说说商品的质量：产品总体上是好的，包装很紧。让我们来谈谈商家服务：喜欢它。最后，快递：快递非常快。毕竟，廉价商品更真实。我希望商店能提供更多的折扣，及时通知老客户，并促进回购。祝你生意兴隆。"];

!(async () => {
    if (!_0x5a43b7[0]) {
        const _0x36cd7f = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x36cd7f);
        return;
    }

    if (_0x3cba3c === false) {
        console.log("默认不执行, 需要执行请环境变量设置 isCommentPic 为 true");
        return;
    }

    let _0x51f2e9 = 0;
    _0x5a43b7.length > 20 ? _0x51f2e9 = 20 : _0x51f2e9 = _0x5a43b7.length;

    for (let _0x3b6a18 = 0; _0x3b6a18 < _0x51f2e9; _0x3b6a18++) {
        UA = "okhttp/3.12.16;jdmall;android;version/12.1.0;build/98891;";

        if (_0x5a43b7[_0x3b6a18]) {
            _0x2a758b = _0x5a43b7[_0x3b6a18];
            $.UserName = decodeURIComponent(_0x2a758b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2a758b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x3b6a18 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.commentWareList = "";
            $.commentInfoList = "";
            await _0x18268d();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || "60 * 1000";console.log("环境变量jd_task_interval默认为60s");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait($Interval);lnrun = 0}

            if (!$.isLogin) {
                const _0x396ae4 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x396ae4);
                $.isNode() && (await _0x6089f0.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x16ff42();
            console.log("等待...");
            await $.wait(20000);
        }
    }
})().catch(_0x22daf1 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x22daf1 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x16ff42() {
    let _0x2abf39 = [],
        _0x52b704 = [],
        _0x2fa953 = [];
    await _0x366de2();

    if (!$.maxPage) {
        console.log("获取待评价数据失败");
        return;
    }

    await $.wait(2000);
    await _0x366de2($.maxPage);
    await $.wait(1000);
    let _0x544908 = $.commentWareList;

    if (_0x544908) {
        await _0x5a8297(_0x544908.wareId);
        await $.wait(2000);
        let _0x501d68 = $.commentInfoList;

        if (!_0x501d68) {
            return;
        }

        for (const _0x498fbd of _0x501d68) {
            if (_0x498fbd.commentInfo.pictureInfoList) {
                for (const _0x3ab8ad of _0x498fbd.commentInfo.pictureInfoList || {}) {
                    if (_0x3ab8ad.mediaType != "2") {
                        if (_0x3ab8ad.picURL.indexOf("dpg") !== -1) {
                            picURL = _0x3ab8ad.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, "$1");
                        } else {
                            if (_0x3ab8ad.picURL.indexOf("webp") !== -1) {
                                picURL = _0x3ab8ad.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, "$1");
                            } else {
                                if (_0x3ab8ad.picURL.indexOf("avif") !== -1) {
                                    picURL = _0x3ab8ad.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, "$1");
                                }
                            }
                        }

                        _0x2abf39.push(picURL);
                    }
                }
            }

            _0x498fbd.commentInfo.commentScore === "5" && _0x498fbd.commentInfo.commentData.length > _0x203393 && _0x52b704.push(_0x498fbd.commentInfo.commentData);
        }

        nullKeyword = "";

        for (let _0x51fcd6 of _0x3c7b88) _0x2d2778.push(_0x51fcd6);

        for (let _0x4f8a58 of _0x52b704) {
            if (_0x2d2778.some(_0x5cc7b0 => _0x4f8a58.includes(_0x5cc7b0) ? nullKeyword = _0x5cc7b0 : "")) {
                console.log("评价内容被过滤，含有关键词-【" + nullKeyword + "】");
            } else {
                _0x2fa953.push(_0x4f8a58);
            }
        }

        const _0x1a6a41 = {
            "picUrl": _0x2abf39[0]
        };
        const _0x30a317 = {
            "picUrl": _0x2abf39[1]
        };

        let _0x469ac8 = [_0x1a6a41, _0x30a317],
            _0x11fceb = _0x3bc746(_0x136b32);

        if (_0x2abf39.length >= 2 && _0x2fa953.length >= 2) {
            console.log("去评价 ---> " + _0x544908.wname + "\n成功获取到图片，去带图评价!\n");
            const _0x1ddfa0 = {
                "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
            };
            const _0x1d8478 = {
                "productId": _0x544908.wareId,
                "kocSynFlag": "0",
                "categoryList": _0x544908.categoryList,
                "voucherStatus": "0",
                "extInfo": _0x1ddfa0,
                "officerScore": "1699",
                "anonymousFlag": "1",
                "commentScore": "5",
                "shopType": "0",
                "orderId": _0x544908.orderId,
                "shopId": _0x544908.shopId,
                "addPictureFlag": "0",
                "commentData": _0x11fceb,
                "pictureInfoList": _0x469ac8,
                "officerLevel": "3",
                "isCommentTagContent": "0"
            };
            await _0xb72019("pubComment", _0x1d8478);
        } else {
            if (_0x2abf39.length >= 2 && _0x2fa953.length < 2) {
                console.log("去评价 ---> " + _0x544908.wname + "\n成功获取到图片，且没有获取到评价内容，采用脚本自带评价，去带图评价!\n");
                await _0xb72019("pubComment", {
                    "productId": _0x544908.wareId,
                    "kocSynFlag": "0",
                    "categoryList": _0x544908.categoryList,
                    "voucherStatus": "0",
                    "extInfo": {
                        "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
                    },
                    "officerScore": "1699",
                    "anonymousFlag": "1",
                    "commentScore": "5",
                    "shopType": "0",
                    "orderId": _0x544908.orderId,
                    "shopId": _0x544908.shopId,
                    "addPictureFlag": "0",
                    "commentData": _0x11fceb,
                    "pictureInfoList": _0x469ac8,
                    "officerLevel": "3",
                    "isCommentTagContent": "0"
                });
            } else {
                if (_0x2abf39.length < 2 && _0x2fa953.length >= 2) {
                    console.log("去评价 ---> " + _0x544908.wname + "\n没有获取到图片，且获取到评价，去评价!\n");
                    const _0x4fb26e = {
                        "productId": _0x544908.wareId,
                        "kocSynFlag": "0",
                        "categoryList": _0x544908.ategoryList,
                        "voucherStatus": "0",
                        "officerScore": "1699",
                        "anonymousFlag": "1",
                        "commentScore": "5",
                        "shopType": "0",
                        "orderId": _0x544908.orderId,
                        "shopId": _0x544908.shopId,
                        "addPictureFlag": "0",
                        "commentData": _0x11fceb,
                        "pictureInfoList": "",
                        "officerLevel": "3",
                        "isCommentTagContent": "0"
                    };
                    await _0xb72019("pubComment", _0x4fb26e);
                } else {
                    if (_0x501d68.length <= 1) {
                        console.log("去评价 ---> " + _0x544908.wname + "\n没有获取到评价内容,采用脚本自带评价\n");
                        const _0x1257ea = {
                            "productId": _0x544908.wareId,
                            "kocSynFlag": "0",
                            "categoryList": _0x544908.ategoryList,
                            "voucherStatus": "0",
                            "officerScore": "1699",
                            "anonymousFlag": "1",
                            "commentScore": "5",
                            "shopType": "0",
                            "orderId": _0x544908.orderId,
                            "shopId": _0x544908.shopId,
                            "addPictureFlag": "0",
                            "commentData": _0x11fceb,
                            "pictureInfoList": "",
                            "officerLevel": "3",
                            "isCommentTagContent": "0"
                        };
                        await _0xb72019("pubComment", _0x1257ea);
                    }
                }
            }
        }
    } else {
        console.log("没有待评价!!");
    }
}

async function _0x5a8297(_0x4d7861) {
    const _0x1e9c75 = {
        "sortType": "5",
        "isCurrentSku": false,
        "sku": _0x4d7861,
        "pictureCommentType": "A",
        "shieldCurrentComment": "1",
        "shopType": "0",
        "type": "4",
        "shadowMainSku": "0",
        "offset": "1",
        "num": "10"
    };
    s = await _0xb72019("getCommentListWithCard", _0x1e9c75);
    $.commentInfoList = s.commentInfoList;
    console.log("准备获取评价...");
}

async function _0x366de2(_0x51e39b = "1") {
    const _0x269a97 = {
        "status": "1",
        "planType": "1",
        "pageIndex": _0x51e39b,
        "pageSize": "10"
    };
    s = await _0xb72019("getCommentWareList", _0x269a97);
    $.maxPage = s.commentWareListInfo?.["maxPage"];
    $.commentWareList = s.commentWareListInfo?.["commentWareList"]["reverse"]()[0];
}

async function _0xb72019(_0x320f52, _0x22f5d9) {
    s = await _0x3e511c.getbody(_0x320f52, _0x22f5d9, "11.2.2");
    opt = {
        "url": "https://api.m.jd.com/client.action?functionId=" + _0x320f52,
        "body": "fuctionId=" + _0x320f52 + "&" + s,
        "headers": {
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "user-agent": UA,
            "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
            "Cookie": _0x2a758b
        }
    };
    return new Promise(_0x58de20 => {
        $.post(opt, (_0x529a16, _0x1cdea1, _0x509738) => {
            try {
                _0x529a16 ? console.log(_0x529a16) : _0x509738 = JSON.parse(_0x509738);

                switch (_0x320f52) {
                    case "pubComment":
                        _0x509738.message && console.log(_0x509738.message);
                        break;

                    default:
                        break;
                }
            } catch (_0x37bc0e) {
                console.log(_0x37bc0e);
            } finally {
                _0x58de20(_0x509738);
            }
        });
    });
}

function _0x4074bc() {
    return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}

function _0x3bc746(_0x244aa2) {
    return _0x244aa2[Math.floor(Math.random() * _0x244aa2.length)];
}

function _0x3a79d0(_0xa14445, _0x327565) {
    const _0x5b1782 = {
        "fn": _0xa14445,
        "body": _0x327565
    };
    const _0x53559a = {
        "Content-Type": "application/json"
    };
    const _0x51b76f = {
        "url": "http://fakermetaverse.xyz/sign",
        "body": JSON.stringify(_0x5b1782),
        "headers": _0x53559a
    };
    return new Promise(_0x50e9c4 => {
        $.post(_0x51b76f, async (_0x58755e, _0x4cec0f, _0x372637) => {
            try {
                _0x58755e ? console.log(_0x58755e) : _0x372637 = JSON.parse(_0x372637);
            } catch (_0x3de00c) {
                $.logErr(_0x3de00c, _0x4cec0f);
            } finally {
                _0x50e9c4(_0x372637 || "");
            }
        });
    });
}

function _0x18268d() {
    return new Promise(async _0x4fb357 => {
        const _0x45568b = {
            "url": "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
            "headers": {}
        };
        _0x45568b.headers.Host = "wq.jd.com";
        _0x45568b.headers.Accept = "*/*";
        _0x45568b.headers.Connection = "keep-alive";
        _0x45568b.headers.Cookie = _0x2a758b;
        _0x45568b.headers["User-Agent"] = UA;
        _0x45568b.headers["Accept-Language"] = "zh-cn";
        _0x45568b.headers.Referer = "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&";
        _0x45568b.headers["Accept-Encoding"] = "gzip, deflate, br";
        $.get(_0x45568b, (_0x1e7773, _0x154e9f, _0x2ee0b1) => {
            try {
                if (_0x1e7773) {
                    $.logErr(_0x1e7773);
                } else {
                    if (_0x2ee0b1) {
                        if (1001 === (_0x2ee0b1 = JSON.parse(_0x2ee0b1)).retcode) {
                            return void ($.isLogin = !1);
                        }

                        0 === _0x2ee0b1.retcode && _0x2ee0b1.data && _0x2ee0b1.data.hasOwnProperty("userInfo") && ($.nickName = _0x2ee0b1.data.userInfo.baseInfo.nickname);
                        0 === _0x2ee0b1.retcode && _0x2ee0b1.data && _0x2ee0b1.data.assetInfo && ($.beanCount = _0x2ee0b1.data && _0x2ee0b1.data.assetInfo.beanNum);
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x178a0f) {
                $.logErr(_0x178a0f);
            } finally {
                _0x4fb357();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }