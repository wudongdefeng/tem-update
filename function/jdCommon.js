/*
通用代码库
new Env('jdCommon');
*/

const IilIl = require("crypto-js/sha1"),
    IilIi = require("got");

class Ili1Il {
    constructor() {
        this.ck = "";
        this.UserAgent = "";
        this.H5st = null;
    }

    ["parseUrl"](i1liI) {
        try {
            const Ili1Ii = new URL(i1liI);
            return Ili1Ii;
        } catch (Ii1l1I) {
            return {};
        }
    }

    ["parseUrlParameter"](iiiI11) {
        try {
            const IilII = this.parseUrl(iiiI11),
                ili1l = new URLSearchParams(IilII?.["search"]),
                i1lii = {};

            for (const [iilIII, liI1Il] of ili1l) {
                i1lii[iilIII] = liI1Il;
            }

            return i1lii;
        } catch {
            return {};
        }
    }

    ["getUrlParameter"](I1iIi, iiiI1I) {
        try {
            const lilI11 = this.parseUrl(I1iIi),
                Ili1II = lilI11.searchParams.get(iiiI1I);
            return Ili1II || "";
        } catch {
            return "";
        }
    }

    ["objectToQueryString"](ili1i) {
        const l1Ii1 = [];

        for (const I1Ill1 in ili1i) {
            if (ili1i.hasOwnProperty(I1Ill1)) {
                const IIlI1I = ili1i[I1Ill1];

                if (IIlI1I !== undefined && IIlI1I !== null) {
                    const llIIIi = encodeURIComponent(I1Ill1),
                        IiIiIl = encodeURIComponent(IIlI1I);
                    l1Ii1.push(llIIIi + "=" + IiIiIl);
                }
            }
        }

        return l1Ii1.join("&");
    }

    ["getResponseCookie"](l1I1I1, I1Ilii) {
        let l1Iil = "";

        if (l1I1I1.headers["set-cookie"]) {
            for (let III1II of l1I1I1.headers["set-cookie"]) {
                l1Iil += III1II.split(";")[0].split("=")[0] + "=" + III1II.split(";")[0].split("=")[1] + "; ";
            }
        } else I1Ilii && (l1Iil = I1Ilii);

        return l1Iil;
    }

    ["getCookieValue"](iIIlil, IiIiI1) {
        if (!iIIlil || !IiIiI1) {
            return "";
        }

        var llIII1 = new RegExp(IiIiI1 + "=" + "([^;]*)" + ";"),
            IiIiI = llIII1.exec(iIIlil);
        return IiIiI && IiIiI[1] || "";
    }

    ["parseCookie"](l1iiIi) {
        const I1lI1i = {},
            illili = l1iiIi.split(";");

        for (const IiIlI of illili) {
            const [iIlI1i, iII1Il] = IiIlI.trim().split("=");
            I1lI1i[iIlI1i] = iII1Il;
        }

        return I1lI1i;
    }

    ["genUuid"](iII1Ii = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", iIlI1l = "0123456789abcdef") {
        let l1IIii = "";

        for (let l1l1I of iII1Ii) {
            if (l1l1I == "x") l1IIii += iIlI1l.charAt(Math.floor(Math.random() * iIlI1l.length)); else {
                if (l1l1I == "X") {
                    l1IIii += iIlI1l.charAt(Math.floor(Math.random() * iIlI1l.length)).toUpperCase();
                } else l1IIii += l1l1I;
            }
        }

        return l1IIii;
    }

    ["genEp"](IIIl, IIIi = "jd", l1IIli = "17.1") {
        let iiiIIi = {
            "ciphertype": 5,
            "cipher": {
                "ud": this._base64Encode(IilIl(IIIl).toString()),
                "sv": this._base64Encode(l1IIli),
                "iad": ""
            },
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": IIIi === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
            "ridx": -1
        };
        return JSON.stringify(iiiIIi);
    }

    ["genUA"](iiiIIl, lIIi11 = "jd") {
        const IIIll1 = {
            "jd": {
                "app": "jdapp",
                "appBuild": "168919",
                "client": "iPhone",
                "clientVersion": "12.2.0"
            },
            "lite": {
                "app": "jdltapp",
                "appBuild": "1490",
                "client": "iPhone",
                "clientVersion": "6.14.0"
            }
        },
            illiil = lIIi11 === "lite" ? "lite" : "jd",
            {
                app: liI11l,
                appBuild: l1l1i,
                client: I1I1II,
                clientVersion: i11ll
            } = IIIll1[illiil],
            Ili11I = ["17.1", "17.0", "16.7", "16.6", "16.1", "16.0", "15.6"],
            i11li = Ili11I[Math.floor(Math.random() * Ili11I.length)],
            Illil = "iPhone; CPU iPhone OS " + i11li.replace(".", "_") + " like Mac OS X",
            iil11i = this.genEp(iiiIIl, illiil, i11li),
            Ill1II = this.genUuid(),
            llIili = [liI11l, I1I1II, i11ll, "", "rn/" + Ill1II, "M/5.0", "appBuild/" + l1l1i, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(iil11i), "Mozilla/5.0 (" + Illil + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
            Illii = llIili.join(";");
        if (this.ck) this.UserAgent = Illii;
        return Illii;
    }

    ["genRandomString"](Ill1I1 = 32, lIi1ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
        const liI11i = lIi1ii.length;
        let l1l1l = "";

        for (var illilI = 0; illilI < Ill1I1; illilI++) {
            l1l1l += lIi1ii.charAt(Math.floor(Math.random() * liI11i));
        }

        return l1l1l;
    }

    async ["loadH5st"]() {
        if (!this.H5st) try {
            this.H5st = require(__dirname + "/krgetH5st");
        } catch (IlliI) {
            console.log("❌ H5st 加载失败");
        }
    }

    async ["getLoginStatus"](I1I1I1 = this.ck) {
        if (!I1I1I1) {
            return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;
        }

        let Ili111 = 0,
            Il11 = null;
        const iiil11 = 1;

        while (Ili111 < iiil11) {
            const IiIi11 = "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                ii1i1l = {
                    "headers": {
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                        "Connection": "keep-alive",
                        "Cookie": I1I1I1,
                        "Host": "plogin.m.jd.com",
                        "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
                    },
                    "timeout": 30000
                };

            try {
                const iillII = await IilIi.post(IiIi11, ii1i1l);

                if (iillII.body) {
                    try {
                        const Illli = JSON.parse(iillII.body);

                        if (Illli) {
                            if (Illli.islogin === "1") {
                                return true;
                            } else {
                                if (Illli.islogin === "0") return false;
                            }
                        }
                    } catch (I1lI1l) {
                        Il11 = "🚫 getLoginStatus 处理响应数据失败 ➜ " + (I1lI1l.message || I1lI1l);
                        Ili111++;
                    }
                } else {
                    Il11 = "🚫 getLoginStatus 请求失败 ➜ 无响应数据";
                    Ili111++;
                }
            } catch (iIliil) {
                Il11 = "🚫 getLoginStatus 请求异常 ➜ " + (iIliil.message || iIliil);
                Ili111++;
            }
        }

        if (Ili111 >= iiil11) {
            console.log(Il11);
        }

        return undefined;
    }

    async ["joinShopMember"](I1liii, liiiIi = this.ck) {
        if (!liiiIi) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
        if (!I1liii) return undefined;
        await this.loadH5st();
        const I1liil = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "bindWithVender",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
                "venderId": I1liii,
                "shopId": I1liii,
                "bindByVerifyCodeFlag": 1,
                "registerExtend": {},
                "writeChildFlag": 0,
                "channel": 102,
                "appid": "27004",
                "needSecurity": true,
                "bizId": "shopmember_m_jd_com"
            },
            "version": "4.1",
            "t": true,
            "ua": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
        },
            IliIi1 = await this.H5st.getH5st(I1liil),
            Iii1ll = IliIi1.params + "&area=&uuid=88888",
            liiiIl = "https://api.m.jd.com/client.action",
            liIIiI = {
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://pages.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": liiiIi
                },
                "body": Iii1ll,
                "timeout": 30000
            };

        try {
            const ilIIl1 = await IilIi.post(liiiIl, liIIiI);

            if (ilIIl1.body) {
                const ii1l = JSON.parse(ilIIl1.body);

                if (ii1l.success === true) {
                    if (ii1l.result && ii1l.result?.["giftInfo"]) {
                        for (let iIl1I of ii1l.result?.["giftInfo"]?.["giftList"]) {
                            console.log(" >> 入会获得：" + iIl1I.discountString + iIl1I.prizeName + iIl1I.secondLineDesc);
                        }
                    }

                    if (ii1l.message === "加入店铺会员成功") return true; else {
                        if (ii1l.message === "活动太火爆，请稍后再试") return console.log("🚫 加入店铺会员失败 ➜ " + ii1l.message), undefined; else {
                            return console.log("🚫 加入店铺会员失败 ➜ " + ii1l.message), false;
                        }
                    }
                } else {
                    if (ii1l.message) return console.log("🚫 加入店铺会员失败 ➜ " + ii1l.message), false; else console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(ii1l));
                }
            } else console.log("🚫 bindWithVender API请求失败 ➜ 无响应数据");
        } catch (liIIl1) {
            console.log("🚫 bindWithVender API在处理请求时遇到了错误 ➜ " + (liIIl1.message || liIIl1));
        }

        return undefined;
    }

    async ["getShopMemberStatus"](iIliiI, IIiilI = this.ck) {
        if (!IIiilI) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
        if (!iIliiI) return undefined;
        await this.loadH5st();
        const ilIIlI = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "getShopOpenCardInfo",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
                "venderId": iIliiI,
                "channel": 2,
                "payUpShop": true,
                "queryVersion": "10.5.2",
                "appid": "27004",
                "needSecurity": true,
                "bizId": "shopmember_m_jd_com"
            },
            "version": "3.1",
            "ua": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
        },
            liiiI1 = await this.H5st.getH5st(ilIIlI),
            iIl11 = "https://api.m.jd.com/client.action?" + liiiI1.params,
            ii1I = {
                "headers": {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "https://api.m.jd.com",
                    "Host": "api.m.jd.com",
                    "accept": "*/*",
                    "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": IIiilI
                },
                "timeout": 30000
            };

        try {
            const IIiili = await IilIi.get(iIl11, ii1I);

            if (IIiili.body) {
                const IIiiiI = JSON.parse(IIiili.body);

                if (IIiiiI.success === true) {
                    console.log("去加入：" + (IIiiiI.result.shopMemberCardInfo.venderCardName || "未知"));
                    openCardStatus = IIiiiI.result?.["userInfo"]?.["openCardStatus"];
                    if (openCardStatus === 1) return true; else {
                        return false;
                    }
                } else {
                    if (IIiiiI.message) console.log("🚫 获取店铺会员状态异常 ➜ " + IIiiiI.message); else {
                        console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(IIiiiI));
                    }
                }
            } else console.log("🚫 getShopOpenCardInfo API请求失败 ➜ 无响应数据");
        } catch (IIIlll) {
            console.log("🚫 getShopOpenCardInfo API在处理请求时遇到了错误 ➜ " + (IIIlll.message || IIIlll));
        }

        return undefined;
    }

    async ["concTask"](llli1I = "3", IlilI1, iIIIi) {
        let Iii1iI = false,
            lIi1lI = 0,
            IIiiil = 0;

        async function iIIIl(l1IIi1, IIiii1) {
            const IlilII = await iIIIi(l1IIi1, IIiii1);

            if (IlilII) {
                if (typeof IlilII === "boolean") Iii1iI = true; else {
                    if (typeof IlilII === "object") {
                        IlilII?.["runEnd"] && (Iii1iI = true);
                    }
                }
            }

            lIi1lI--;
            IIiiii();
        }

        async function IIiiii() {
            while (lIi1lI < llli1I && IlilI1.length > 0 && !Iii1iI) {
                const Ii1Ii1 = IlilI1.shift();
                lIi1lI++;
                IIiiil++;
                await iIIIl(Ii1Ii1, IIiiil);
            }

            if (Iii1iI) {
                await new Promise(IIll1I => {
                    const lI1iIi = setInterval(() => {
                        lIi1lI === 0 && (clearInterval(lI1iIi), IIll1I());
                    }, 100);
                });
            }
        }

        const liIIll = Math.min(IlilI1.length, llli1I),
            l1IlIi = [];

        for (let liii1l = 0; liii1l < liIIll; liii1l++) {
            const liliIi = IlilI1.shift();
            lIi1lI++;
            IIiiil++;
            l1IlIi.push(iIIIl(liliIi, IIiiil));
        }

        await Promise.all(l1IlIi);
        IIiiii();
        await new Promise(i1Ili => {
            const lIiIi1 = setInterval(() => {
                (lIi1lI === 0 || Iii1iI) && (clearInterval(lIiIi1), i1Ili());
            }, 100);
        });
    }

    async ["concTaskNormal"](l1I1li = "3", li1ii = 100, lI1iI1) {
        let lIiIiI = false,
            ilIliI = 0,
            II1li = 0;

        async function Ii1lIi(lIl1Ii) {
            const lIl1Il = await lI1iI1(lIl1Ii);

            if (lIl1Il) {
                if (typeof lIl1Il === "boolean") lIiIiI = true; else typeof lIl1Il === "object" && lIl1Il?.["runEnd"] && (lIiIiI = true);
            }

            ilIliI--;
            li11il();
        }

        async function li11il() {
            while (ilIliI < l1I1li && li1ii > 0 && !lIiIiI) {
                li1ii--;
                ilIliI++;
                II1li++;
                await Ii1lIi(II1li);
            }

            if (lIiIiI) {
                await new Promise(li1l1 => {
                    const IIiI1l = setInterval(() => {
                        ilIliI === 0 && (clearInterval(IIiI1l), li1l1());
                    }, 100);
                });
            }
        }

        const ll1lII = Math.min(li1ii, l1I1li),
            Ii1lIl = [];

        for (let Il1I1l = 0; Il1I1l < ll1lII; Il1I1l++) {
            li1ii--;
            ilIliI++;
            II1li++;
            Ii1lIl.push(Ii1lIi(II1li));
        }

        await Promise.all(Ii1lIl);
        li11il();
        await new Promise(Ii1Il1 => {
            const iIIIli = setInterval(() => {
                (ilIliI === 0 || lIiIiI) && (clearInterval(iIIIli), Ii1Il1());
            }, 100);
        });
    }

    ["setCookie"](I1IIll) {
        this.ck = I1IIll;
    }

    ["unsetCookie"]() {
        this.ck = "";
        this.UserAgent = "";
    }

    ["_utf8Encode"](i1Ii1) {
        i1Ii1 = i1Ii1.replace(/rn/g, "n");

        for (var ilIlli = 0; ilIlli < i1Ii1.length; ilIlli++) {
            var I1IIlI = "",
                ilIlll = i1Ii1.charCodeAt(ilIlli);

            if (ilIlll < 128) {
                I1IIlI += String.fromCharCode(ilIlll);
            } else {
                if (ilIlll > 127 && ilIlll < 2048) I1IIlI += String.fromCharCode(ilIlll >> 6 | 192), I1IIlI += String.fromCharCode(ilIlll & 63 | 128); else {
                    I1IIlI += String.fromCharCode(ilIlll >> 12 | 224);
                    I1IIlI += String.fromCharCode(ilIlll >> 6 & 63 | 128);
                    I1IIlI += String.fromCharCode(ilIlll & 63 | 128);
                }
            }
        }

        return I1IIlI;
    }

    ["_base64Encode"](iilIiI, III1li = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        var lIlll1 = "",
            Ili1i1,
            I1I11I,
            iII11l,
            i1IiI1,
            l1lIII,
            iII11i,
            l1iI1i,
            lIlllI = 0;
        iilIiI = this._utf8Encode(iilIiI);

        while (lIlllI < iilIiI.length) {
            Ili1i1 = iilIiI.charCodeAt(lIlllI++);
            I1I11I = iilIiI.charCodeAt(lIlllI++);
            iII11l = iilIiI.charCodeAt(lIlllI++);
            i1IiI1 = Ili1i1 >> 2;
            l1lIII = (Ili1i1 & 3) << 4 | I1I11I >> 4;
            iII11i = (I1I11I & 15) << 2 | iII11l >> 6;
            l1iI1i = iII11l & 63;
            if (isNaN(I1I11I)) iII11i = l1iI1i = 64; else isNaN(iII11l) && (l1iI1i = 64);
            lIlll1 = lIlll1 + III1li.charAt(i1IiI1) + III1li.charAt(l1lIII) + III1li.charAt(iII11i) + III1li.charAt(l1iI1i);
        }

        while (lIlll1.length % 4 > 1) lIlll1 += "=";

        return lIlll1;
    }

}

module.exports = new Ili1Il();