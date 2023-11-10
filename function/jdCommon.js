/*
通用代码库
new Env('jdCommon');
*/

const Ill1liI1 = require("crypto-js/sha1"),
    iiIIII1i = require("got");

class ill11lIi {
    constructor() {
        this.ck = "";
        this.UserAgent = "";
        this.H5st = null;
    }

    ["parseUrl"](l11IliIi) {
        try {
            const I1ll1iiI = new URL(l11IliIi);
            return I1ll1iiI;
        } catch (Illlili) {
            return {};
        }
    }

    ["parseUrlParameter"](iIi1I1i1) {
        try {
            const ll1i111I = this.parseUrl(iIi1I1i1),
                lI1li1i = new URLSearchParams(ll1i111I?.["search"]),
                iiIII = {};

            for (const [lii11iIi, lIlliiiI] of lI1li1i) {
                iiIII[lii11iIi] = lIlliiiI;
            }

            return iiIII;
        } catch {
            return {};
        }
    }

    ["getUrlParameter"](iIliIIil, i1iIl1l1) {
        try {
            const I1li1II = this.parseUrl(iIliIIil),
                IIIiiIil = I1li1II.searchParams.get(i1iIl1l1);
            return IIIiiIil || "";
        } catch {
            return "";
        }
    }

    ["objectToQueryString"](I1ilIiil) {
        const i1l1IliI = [];

        for (const illilIll in I1ilIiil) {
            if (I1ilIiil.hasOwnProperty(illilIll)) {
                const iI1l1il = I1ilIiil[illilIll];

                if (iI1l1il !== undefined && iI1l1il !== null) {
                    const i1iI1lII = encodeURIComponent(illilIll),
                        liill11I = encodeURIComponent(iI1l1il);
                    i1l1IliI.push(i1iI1lII + "=" + liill11I);
                }
            }
        }

        return i1l1IliI.join("&");
    }

    ["getResponseCookie"](IIlIi1ll, lllI1lII) {
        let I11II1li = "";
        if (IIlIi1ll.headers["set-cookie"]) for (let ii11liIi of IIlIi1ll.headers["set-cookie"]) {
            I11II1li += ii11liIi.split(";")[0].split("=")[0] + "=" + ii11liIi.split(";")[0].split("=")[1] + "; ";
        } else {
            lllI1lII && (I11II1li = lllI1lII);
        }
        return I11II1li;
    }

    ["getCookieValue"](lliI1ll, liillIiI) {
        if (!lliI1ll || !liillIiI) return "";
        var i11iili1 = new RegExp(liillIiI + "=" + "([^;]*)" + ";"),
            lI1lliII = i11iili1.exec(lliI1ll);
        return lI1lliII && lI1lliII[1] || "";
    }

    ["parseCookie"](lIIIlI11) {
        const lllli111 = {},
            IliIIIll = lIIIlI11.split(";");

        for (const llIiiil of IliIIIll) {
            const [li11Ill1, liii1lli] = llIiiil.trim().split("=");
            lllli111[li11Ill1] = liii1lli;
        }

        return lllli111;
    }

    ["genUuid"](iI1l1IlI = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", i1iI1l1l = "0123456789abcdef") {
        let Ili1li11 = "";

        for (let iIllIliI of iI1l1IlI) {
            if (iIllIliI == "x") {
                Ili1li11 += i1iI1l1l.charAt(Math.floor(Math.random() * i1iI1l1l.length));
            } else iIllIliI == "X" ? Ili1li11 += i1iI1l1l.charAt(Math.floor(Math.random() * i1iI1l1l.length)).toUpperCase() : Ili1li11 += iIllIliI;
        }

        return Ili1li11;
    }

    ["genEp"](iI1iiI, liiIlllI = "jd", IiI111lI = "17.1") {
        let Iiiilli1 = {
            "ciphertype": 5,
            "cipher": {
                "ud": this._base64Encode(Ill1liI1(iI1iiI).toString()),
                "sv": this._base64Encode(IiI111lI),
                "iad": ""
            },
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": liiIlllI === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
            "ridx": -1
        };
        return JSON.stringify(Iiiilli1);
    }

    ["genUA"](IlIi1llI, IliIlI1I = "jd") {
        const li1i1Ili = {
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
            I11ilIiI = IliIlI1I === "lite" ? "lite" : "jd",
            {
                app: ll1Ii1l,
                appBuild: lII1Ii1l,
                client: l1lI11il,
                clientVersion: I1il1llI
            } = li1i1Ili[I11ilIiI],
            iIlil11 = ["17.1", "17.0.3", "17.0", "16.7", "16.6", "16.1", "16.0", "15.6"],
            lll1Iill = iIlil11[Math.floor(Math.random() * iIlil11.length)],
            liiilil = "iPhone; CPU iPhone OS " + lll1Iill.replace(".", "_") + " like Mac OS X",
            IiIIIiII = this.genEp(IlIi1llI, I11ilIiI, lll1Iill),
            IlI1llli = this.genUuid(),
            IiI1IiIl = [ll1Ii1l, l1lI11il, I1il1llI, "", "rn/" + IlI1llli, "M/5.0", "appBuild/" + lII1Ii1l, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(IiIIIiII), "Mozilla/5.0 (" + liiilil + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
            lli11II1 = IiI1IiIl.join(";");
        if (this.ck) this.UserAgent = lli11II1;
        return lli11II1;
    }

    async ["loadH5st"]() {
        if (!this.H5st) try {
            this.H5st = require(__dirname + "/krgetH5st");
        } catch (iIIll11i) {
            console.log("❌ H5st 加载失败");
        }
    }

    async ["getLoginStatus"](i1iII1l = this.ck) {
        if (!i1iII1l) return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;
        let lllilll = 0,
            iIiilII1 = null;
        const lIilil11 = 1;

        while (lllilll < lIilil11) {
            const i1l1lll1 = "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                i1i11l11 = {
                    "headers": {
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                        "Connection": "keep-alive",
                        "Cookie": i1iII1l,
                        "Host": "plogin.m.jd.com",
                        "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
                    },
                    "timeout": 30000
                };

            try {
                const III111l = await iiIIII1i.post(i1l1lll1, i1i11l11);
                if (III111l.body) try {
                    const ll1I1i1 = JSON.parse(III111l.body);

                    if (ll1I1i1) {
                        if (ll1I1i1.islogin === "1") return true; else {
                            if (ll1I1i1.islogin === "0") {
                                return false;
                            }
                        }
                    }
                } catch (Iiili1i) {
                    iIiilII1 = "🚫 getLoginStatus 处理响应数据失败 ➜ " + (Iiili1i.message || Iiili1i);
                    lllilll++;
                } else {
                    iIiilII1 = "🚫 getLoginStatus 请求失败 ➜ 无响应数据";
                    lllilll++;
                }
            } catch (i1lIIii) {
                iIiilII1 = "🚫 getLoginStatus 请求异常 ➜ " + (i1lIIii.message || i1lIIii);
                lllilll++;
            }
        }

        return lllilll >= lIilil11 && console.log(iIiilII1), undefined;
    }

    async ["joinShopMember"](llllilll, i1llliIi = this.ck) {
        if (!i1llliIi) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
        if (!llllilll) return undefined;
        await this.loadH5st();
        const l1liI11 = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "bindWithVender",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
                "venderId": llllilll,
                "shopId": llllilll,
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
            IllIi1il = await this.H5st.getH5st(l1liI11),
            llIII1i1 = IllIi1il.params + "&area=&uuid=88888",
            ll11l1l = "https://api.m.jd.com/client.action",
            lI1IlIIi = {
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://pages.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": i1llliIi
                },
                "body": llIII1i1,
                "timeout": 30000
            };

        try {
            const i1il1i11 = await iiIIII1i.post(ll11l1l, lI1IlIIi);

            if (i1il1i11.body) {
                const ill11I1i = JSON.parse(i1il1i11.body);

                if (ill11I1i.success === true) {
                    if (ill11I1i.result && ill11I1i.result?.["giftInfo"]) for (let iII1I1I of ill11I1i.result?.["giftInfo"]?.["giftList"]) {
                        console.log(" >> 入会获得：" + iII1I1I.discountString + iII1I1I.prizeName + iII1I1I.secondLineDesc);
                    }
                    if (ill11I1i.message === "加入店铺会员成功") return true; else return ill11I1i.message === "活动太火爆，请稍后再试" ? (console.log("🚫 加入店铺会员失败 ➜ " + ill11I1i.message), undefined) : (console.log("🚫 加入店铺会员失败 ➜ " + ill11I1i.message), false);
                } else {
                    if (ill11I1i.message) {
                        return console.log("🚫 加入店铺会员失败 ➜ " + ill11I1i.message), false;
                    } else {
                        console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(ill11I1i));
                    }
                }
            } else console.log("🚫 bindWithVender API请求失败 ➜ 无响应数据");
        } catch (ilIIIii1) {
            console.log("🚫 bindWithVender API在处理请求时遇到了错误 ➜ " + (ilIIIii1.message || ilIIIii1));
        }

        return undefined;
    }

    async ["getShopMemberStatus"](llil1lII, lIiIi1ll = this.ck) {
        if (!lIiIi1ll) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
        if (!llil1lII) return undefined;
        await this.loadH5st();
        const l1il1 = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "getShopOpenCardInfo",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
                "venderId": llil1lII,
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
            iIIl1i1l = await this.H5st.getH5st(l1il1),
            illii = "https://api.m.jd.com/client.action?" + iIIl1i1l.params,
            iIi1i11l = {
                "headers": {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "https://api.m.jd.com",
                    "Host": "api.m.jd.com",
                    "accept": "*/*",
                    "User-Agent": this.UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": lIiIi1ll
                },
                "timeout": 30000
            };

        try {
            const lI11il11 = await iiIIII1i.get(illii, iIi1i11l);

            if (lI11il11.body) {
                const I1IliIlI = JSON.parse(lI11il11.body);

                if (I1IliIlI.success === true) {
                    console.log("去加入：" + (I1IliIlI.result.shopMemberCardInfo.venderCardName || "未知"));
                    openCardStatus = I1IliIlI.result?.["userInfo"]?.["openCardStatus"];

                    if (openCardStatus === 1) {
                        return true;
                    } else return false;
                } else I1IliIlI.message ? console.log("🚫 获取店铺会员状态异常 ➜ " + I1IliIlI.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(I1IliIlI));
            } else console.log("🚫 getShopOpenCardInfo API请求失败 ➜ 无响应数据");
        } catch (llill11i) {
            console.log("🚫 getShopOpenCardInfo API在处理请求时遇到了错误 ➜ " + (llill11i.message || llill11i));
        }

        return undefined;
    }

    async ["concTask"](lili1Il = "3", l1l1Ilil, iIIlilii) {
        let i11l1llI = false,
            IlliI1I = 0,
            I1lIi1Ii = 0;

        async function IIl1I11l(I1liiiII, li111I1) {
            const I1IIlI = await iIIlilii(I1liiiII, li111I1);

            if (I1IIlI) {
                if (typeof I1IIlI === "boolean") {
                    i11l1llI = true;
                } else {
                    if (typeof I1IIlI === "object") {
                        if (I1IIlI?.["runEnd"]) {
                            i11l1llI = true;
                        }
                    }
                }
            }

            IlliI1I--;
            ii1IiI11();
        }

        async function ii1IiI11() {
            while (IlliI1I < lili1Il && l1l1Ilil.length > 0 && !i11l1llI) {
                const iIlillIl = l1l1Ilil.shift();
                IlliI1I++;
                I1lIi1Ii++;
                await IIl1I11l(iIlillIl, I1lIi1Ii);
            }

            if (i11l1llI) {
                await new Promise(iIiI11lI => {
                    const lIilliii = setInterval(() => {
                        IlliI1I === 0 && (clearInterval(lIilliii), iIiI11lI());
                    }, 100);
                });
            }
        }

        const IlIliII = Math.min(l1l1Ilil.length, lili1Il),
            ilI1l1Ii = [];

        for (let l1ili1I1 = 0; l1ili1I1 < IlIliII; l1ili1I1++) {
            const IIilIiii = l1l1Ilil.shift();
            IlliI1I++;
            I1lIi1Ii++;
            ilI1l1Ii.push(IIl1I11l(IIilIiii, I1lIi1Ii));
        }

        await Promise.all(ilI1l1Ii);
        ii1IiI11();
        await new Promise(iiiiI11I => {
            const l1Ii1ii = setInterval(() => {
                (IlliI1I === 0 || i11l1llI) && (clearInterval(l1Ii1ii), iiiiI11I());
            }, 100);
        });
    }

    async ["concTaskNormal"](iIlIii = "3", iIi1ll1l = 100, iI1i11i1) {
        let llill11l = false,
            ilI1I11I = 0,
            Il1lII = 0;

        async function IIiIii1i(iii1IIll) {
            const I1IlI1Ii = await iI1i11i1(iii1IIll);

            if (I1IlI1Ii) {
                if (typeof I1IlI1Ii === "boolean") llill11l = true; else {
                    if (typeof I1IlI1Ii === "object") {
                        I1IlI1Ii?.["runEnd"] && (llill11l = true);
                    }
                }
            }

            ilI1I11I--;
            lillllII();
        }

        async function lillllII() {
            while (ilI1I11I < iIlIii && iIi1ll1l > 0 && !llill11l) {
                iIi1ll1l--;
                ilI1I11I++;
                Il1lII++;
                await IIiIii1i(Il1lII);
            }

            llill11l && (await new Promise(lI1iii => {
                const IliiI11 = setInterval(() => {
                    ilI1I11I === 0 && (clearInterval(IliiI11), lI1iii());
                }, 100);
            }));
        }

        const ll1Il1li = Math.min(iIi1ll1l, iIlIii),
            iiI1li = [];

        for (let IllIlII = 0; IllIlII < ll1Il1li; IllIlII++) {
            iIi1ll1l--;
            ilI1I11I++;
            Il1lII++;
            iiI1li.push(IIiIii1i(Il1lII));
        }

        await Promise.all(iiI1li);
        lillllII();
        await new Promise(l1ilI11I => {
            const iIi1I1I1 = setInterval(() => {
                (ilI1I11I === 0 || llill11l) && (clearInterval(iIi1I1I1), l1ilI11I());
            }, 100);
        });
    }

    ["setCookie"](il111I1I) {
        this.ck = il111I1I;
    }

    ["unsetCookie"]() {
        this.ck = "";
        this.UserAgent = "";
    }

    ["_utf8Encode"](II1Iil11) {
        II1Iil11 = II1Iil11.replace(/rn/g, "n");

        for (var ii1IIl1 = 0; ii1IIl1 < II1Iil11.length; ii1IIl1++) {
            var iiiii1i1 = "",
                Il1iIl11 = II1Iil11.charCodeAt(ii1IIl1);

            if (Il1iIl11 < 128) {
                iiiii1i1 += String.fromCharCode(Il1iIl11);
            } else Il1iIl11 > 127 && Il1iIl11 < 2048 ? (iiiii1i1 += String.fromCharCode(Il1iIl11 >> 6 | 192), iiiii1i1 += String.fromCharCode(Il1iIl11 & 63 | 128)) : (iiiii1i1 += String.fromCharCode(Il1iIl11 >> 12 | 224), iiiii1i1 += String.fromCharCode(Il1iIl11 >> 6 & 63 | 128), iiiii1i1 += String.fromCharCode(Il1iIl11 & 63 | 128));
        }

        return iiiii1i1;
    }

    ["_base64Encode"](l111illi, iiilliI = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        var lIl1iIl = "";
        var ll1lIlil, lI1iII1I, I1li1ii1, l1i11IiI, iIIiII11, iIIlIlii, iiIii111;
        var IlIiil = 0;
        l111illi = this._utf8Encode(l111illi);

        while (IlIiil < l111illi.length) {
            ll1lIlil = l111illi.charCodeAt(IlIiil++);
            lI1iII1I = l111illi.charCodeAt(IlIiil++);
            I1li1ii1 = l111illi.charCodeAt(IlIiil++);
            l1i11IiI = ll1lIlil >> 2;
            iIIiII11 = (ll1lIlil & 3) << 4 | lI1iII1I >> 4;
            iIIlIlii = (lI1iII1I & 15) << 2 | I1li1ii1 >> 6;
            iiIii111 = I1li1ii1 & 63;

            if (isNaN(lI1iII1I)) {
                iIIlIlii = iiIii111 = 64;
            } else isNaN(I1li1ii1) && (iiIii111 = 64);

            lIl1iIl = lIl1iIl + iiilliI.charAt(l1i11IiI) + iiilliI.charAt(iIIiII11) + iiilliI.charAt(iIIlIlii) + iiilliI.charAt(iiIii111);
        }

        while (lIl1iIl.length % 4 > 1) lIl1iIl += "=";

        return lIl1iIl;
    }

}

module.exports = new ill11lIi();