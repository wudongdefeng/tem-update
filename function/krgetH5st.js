/*
new Env('getH5st');
*/
const fs = require("fs"),
    jsdom = require("jsdom"),
    querystring = require("querystring");

class H5st {
    constructor() {
        this.domWindow3_1 = null;
        this.domWindow3_1_UA = null;
        this.domWindow4_1 = null;
        this.domWindow4_1_UA = null;
        this.domWindow4_2 = null;
        this.domWindow4_2_UA = null;
        this.domWindow4_3 = null;
        this.domWindow4_3_UA = null;
        this.domWindow4_4 = null;
        this.domWindow4_4_UA = null;
    }

    async ["_sleep"](ilil11lI) {
        return new Promise((illIliI1, IliiIllI) => {
            setTimeout(() => {
                illIliI1(ilil11lI);
            }, ilil11lI);
        });
    }

    async ["_loadH5Sdk"](iIl1Iill, llliiili) {
        const {
            JSDOM: iliIil1I
        } = jsdom;
        let l111I1lI = new jsdom.ResourceLoader({
            "userAgent": llliiili
        }),
            li1111iI = new jsdom.VirtualConsole(),
            III11iI1 = {
                "url": "http://localhost",
                "userAgent": llliiili,
                "runScripts": "dangerously",
                "resources": l111I1lI,
                "includeNodeLocations": true,
                "storageQuota": 1000000000,
                "pretendToBeVisual": true,
                "virtualConsole": li1111iI
            },
            li1l1ii1 = "";

        switch (iIl1Iill) {
            case "3.1":
                li1l1ii1 = "<script>" + fs.readFileSync(__dirname + "/assets/index_1.js", "utf-8") + "</script>";
                break;

            case "4.1":
                li1l1ii1 = "<script>" + fs.readFileSync(__dirname + "/assets/index_2.js", "utf-8") + "</script>";
                break;

            case "4.2":
                li1l1ii1 = "<script>" + fs.readFileSync(__dirname + "/assets/index_3.js", "utf-8") + "</script>";
                break;

            case "4.3":
                li1l1ii1 = "<script>" + fs.readFileSync(__dirname + "/assets/index_4.js", "utf-8") + "</script>";
                break;

            case "4.4":
                li1l1ii1 = "<script>" + fs.readFileSync(__dirname + "/assets/index_5.js", "utf-8") + "</script>";
                break;
        }

        const lIlIli11 = new iliIil1I("<body>\n    " + li1l1ii1 + "\n</body>", III11iI1);

        do {
            await this._sleep(100);
        } while (!lIlIli11.window.ParamsSign);

        switch (iIl1Iill) {
            case "3.1":
                this.domWindow3_1 = lIlIli11.window;
                break;

            case "4.1":
                this.domWindow4_1 = lIlIli11.window;
                break;

            case "4.2":
                this.domWindow4_2 = lIlIli11.window;
                break;

            case "4.3":
                this.domWindow4_3 = lIlIli11.window;
                break;

            case "4.4":
                this.domWindow4_4 = lIlIli11.window;
                break;
        }
    }

    async ["_signWaap"](lilI1ii1, lI11I1ii, iiiIl1i1) {
        const ilIlilII = new iiiIl1i1.ParamsSign({
            "appId": lilI1ii1,
            "preRequest": false,
            "debug": false,

            "onSign"({
                code: i1lII1Il,
                message: II1ilI,
                data: i11lI1II
            }) { },

            "onRequestTokenRemotely"({
                code: IiI1IllI,
                message: iI11lIli
            }) { },

            "onRequestToken"({
                code: liiiIi,
                message: ill1Iiii
            }) { }

        });
        let il1l1l1l = {
            "appid": lI11I1ii.appid,
            "body": this._SHA256(JSON.stringify(lI11I1ii.body)).toString(),
            "client": lI11I1ii.client || "",
            "clientVersion": lI11I1ii.clientVersion || "",
            "functionId": lI11I1ii.functionId
        };

        for (const IiIiIiI1 of ["client", "clientVersion"]) {
            !lI11I1ii[IiIiIiI1] && delete il1l1l1l[IiIiIiI1];
        }

        lI11I1ii?.["t"] && (il1l1l1l.t = lI11I1ii.t);
        let I11I1I11 = await ilIlilII.sign(il1l1l1l);

        if (!I11I1I11?.["h5st"] || I11I1I11.h5st === "null") {
            console.log("❌ getH5st 签名生成失败");
            I11I1I11.h5st = "";
        }

        return I11I1I11?.["h5st"] || "";
    }

    async ["getH5st"](liIl1lll) {
        let i1lIl11i = {
            ...liIl1lll,
            "h5st": "",
            "params": "",
            "paramsData": {}
        };

        try {
            if (!(typeof liIl1lll === "object" && liIl1lll !== null)) {
                return console.log("❌ getH5st 传入参数有误"), i1lIl11i;
            } else {
                const Ili1lI1i = ["appId", "appid", "body", "functionId"],
                    IliIilII = Ili1lI1i.filter(IiliIlii => !liIl1lll[IiliIlii]);

                if (IliIilII.length > 0) {
                    return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + IliIilII.join(", ")), i1lIl11i;
                }
            }

            switch (liIl1lll?.["version"]) {
                case "3.1":
                case "4.1":
                case "4.2":
                case "4.3":
                case "4.4":
                    break;

                default:
                    liIl1lll.version = "4.3";
                    break;
            }

            const {
                appId: illlIlll,
                appid: Iil1ill1,
                body: I111i1il,
                client: II1i1lli,
                clientVersion: IIIll1il,
                functionId: li1iI11,
                version: iIil1i1l
            } = liIl1lll,
                llli1li = Math.floor(Date.now() / 1000),
                illIllI = "jdapp;iPhone;12.3.1;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + llli1li + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
                iil1i111 = liIl1lll?.["ua"] || illIllI,
                I1iiil1I = "domWindow" + iIil1i1l.replace(".", "_"),
                lili1IIi = I1iiil1I + "_UA";

            if (!this[I1iiil1I] || this[lili1IIi] && this[lili1IIi] !== iil1i111) {
                await this._loadH5Sdk(iIil1i1l, iil1i111);
                this[lili1IIi] = iil1i111;
            }

            const IiiliI1i = {
                "appid": Iil1ill1,
                "body": I111i1il,
                "client": II1i1lli,
                "clientVersion": IIIll1il,
                "functionId": li1iI11
            };
            if (liIl1lll?.["t"] && typeof liIl1lll.t === "boolean") liIl1lll.t = Date.now(), IiiliI1i.t = liIl1lll.t; else {
                liIl1lll.t = "";
            }
            if (!IiiliI1i.client) delete IiiliI1i.client;
            if (!IiiliI1i.clientVersion) delete IiiliI1i.clientVersion;
            const ilIi1lI1 = await this._signWaap(illlIlll, IiiliI1i, this[I1iiil1I]),
                III1i1l1 = {
                    "functionId": li1iI11,
                    "body": JSON.stringify(I111i1il),
                    "t": "",
                    "appid": Iil1ill1,
                    "client": "",
                    "clientVersion": "",
                    "h5st": ilIi1lI1 || ""
                };

            for (const lil11Il of ["t", "client", "clientVersion"]) {
                if (liIl1lll[lil11Il]) {
                    III1i1l1[lil11Il] = liIl1lll[lil11Il];
                } else delete III1i1l1[lil11Il];
            }

            return i1lIl11i = {
                ...liIl1lll,
                "h5st": ilIi1lI1 || "",
                "params": querystring.stringify(III1i1l1),
                "paramsData": III1i1l1
            }, i1lIl11i;
        } catch (Ii1i1iIl) {
            console.log("❌ getH5st 遇到了错误 " + (Ii1i1iIl.message || Ii1i1iIl));
        }

        return i1lIl11i;
    }

    ["_SHA256"](lI1l1i1l) {
        var il1I11ll = 8,
            iIlli11I = 0;

        function ll11lII(i1llI11, iiII1I1) {
            var il11I11l = (i1llI11 & 65535) + (iiII1I1 & 65535),
                ii1Ill11 = (i1llI11 >> 16) + (iiII1I1 >> 16) + (il11I11l >> 16);
            return ii1Ill11 << 16 | il11I11l & 65535;
        }

        function il1l1lIi(Illil1l, l1iiIili) {
            return Illil1l >>> l1iiIili | Illil1l << 32 - l1iiIili;
        }

        function I11ilIli(illliI1i, iIlIIIiI) {
            return illliI1i >>> iIlIIIiI;
        }

        function ll11lii(IliiiIiI, lIlIIlil, i1iIiii) {
            return IliiiIiI & lIlIIlil ^ ~IliiiIiI & i1iIiii;
        }

        function Iii11iiI(iIiiIlI, llll1l1l, i11lIi1) {
            return iIiiIlI & llll1l1l ^ iIiiIlI & i11lIi1 ^ llll1l1l & i11lIi1;
        }

        function Iii11II1(iI11Il1) {
            return il1l1lIi(iI11Il1, 2) ^ il1l1lIi(iI11Il1, 13) ^ il1l1lIi(iI11Il1, 22);
        }

        function I1ilil1(iIi11iiI) {
            return il1l1lIi(iIi11iiI, 6) ^ il1l1lIi(iIi11iiI, 11) ^ il1l1lIi(iIi11iiI, 25);
        }

        function lilillI(i1I1lIil) {
            return il1l1lIi(i1I1lIil, 7) ^ il1l1lIi(i1I1lIil, 18) ^ I11ilIli(i1I1lIil, 3);
        }

        function l1II1IIi(IilIil1l) {
            return il1l1lIi(IilIil1l, 17) ^ il1l1lIi(IilIil1l, 19) ^ I11ilIli(IilIil1l, 10);
        }

        function I1llIii1(l1II11Ii, IIIlIi1) {
            var IliII1I1 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                lI1iiI1 = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                lIII1i1 = new Array(64),
                l1IIlIi,
                illI1IIi,
                IIii1l1I,
                llIillll,
                III1liI1,
                IIIliIi1,
                IIil1Ill,
                l1Iil1lI,
                li11lll1,
                liiIl1l1,
                IIIi11ii,
                i1iIIIl;
            l1II11Ii[IIIlIi1 >> 5] |= 128 << 24 - IIIlIi1 % 32;
            l1II11Ii[(IIIlIi1 + 64 >> 9 << 4) + 15] = IIIlIi1;

            for (var li11lll1 = 0; li11lll1 < l1II11Ii.length; li11lll1 += 16) {
                l1IIlIi = lI1iiI1[0];
                illI1IIi = lI1iiI1[1];
                IIii1l1I = lI1iiI1[2];
                llIillll = lI1iiI1[3];
                III1liI1 = lI1iiI1[4];
                IIIliIi1 = lI1iiI1[5];
                IIil1Ill = lI1iiI1[6];
                l1Iil1lI = lI1iiI1[7];

                for (var liiIl1l1 = 0; liiIl1l1 < 64; liiIl1l1++) {
                    if (liiIl1l1 < 16) lIII1i1[liiIl1l1] = l1II11Ii[liiIl1l1 + li11lll1]; else lIII1i1[liiIl1l1] = ll11lII(ll11lII(ll11lII(l1II1IIi(lIII1i1[liiIl1l1 - 2]), lIII1i1[liiIl1l1 - 7]), lilillI(lIII1i1[liiIl1l1 - 15])), lIII1i1[liiIl1l1 - 16]);
                    IIIi11ii = ll11lII(ll11lII(ll11lII(ll11lII(l1Iil1lI, I1ilil1(III1liI1)), ll11lii(III1liI1, IIIliIi1, IIil1Ill)), IliII1I1[liiIl1l1]), lIII1i1[liiIl1l1]);
                    i1iIIIl = ll11lII(Iii11II1(l1IIlIi), Iii11iiI(l1IIlIi, illI1IIi, IIii1l1I));
                    l1Iil1lI = IIil1Ill;
                    IIil1Ill = IIIliIi1;
                    IIIliIi1 = III1liI1;
                    III1liI1 = ll11lII(llIillll, IIIi11ii);
                    llIillll = IIii1l1I;
                    IIii1l1I = illI1IIi;
                    illI1IIi = l1IIlIi;
                    l1IIlIi = ll11lII(IIIi11ii, i1iIIIl);
                }

                lI1iiI1[0] = ll11lII(l1IIlIi, lI1iiI1[0]);
                lI1iiI1[1] = ll11lII(illI1IIi, lI1iiI1[1]);
                lI1iiI1[2] = ll11lII(IIii1l1I, lI1iiI1[2]);
                lI1iiI1[3] = ll11lII(llIillll, lI1iiI1[3]);
                lI1iiI1[4] = ll11lII(III1liI1, lI1iiI1[4]);
                lI1iiI1[5] = ll11lII(IIIliIi1, lI1iiI1[5]);
                lI1iiI1[6] = ll11lII(IIil1Ill, lI1iiI1[6]);
                lI1iiI1[7] = ll11lII(l1Iil1lI, lI1iiI1[7]);
            }

            return lI1iiI1;
        }

        function iIIIllii(iil11li1) {
            var Ii1l11il = Array(),
                iiillI1l = (1 << il1I11ll) - 1;

            for (var I11IiI = 0; I11IiI < iil11li1.length * il1I11ll; I11IiI += il1I11ll) {
                Ii1l11il[I11IiI >> 5] |= (iil11li1.charCodeAt(I11IiI / il1I11ll) & iiillI1l) << 24 - I11IiI % 32;
            }

            return Ii1l11il;
        }

        function IIliili(Iilll1iI) {
            Iilll1iI = Iilll1iI.replace(/\r\n/g, "\n");
            var IiiiI11l = "";

            for (var i1iIiliI = 0; i1iIiliI < Iilll1iI.length; i1iIiliI++) {
                var iiiliI1l = Iilll1iI.charCodeAt(i1iIiliI);
                if (iiiliI1l < 128) IiiiI11l += String.fromCharCode(iiiliI1l); else iiiliI1l > 127 && iiiliI1l < 2048 ? (IiiiI11l += String.fromCharCode(iiiliI1l >> 6 | 192), IiiiI11l += String.fromCharCode(iiiliI1l & 63 | 128)) : (IiiiI11l += String.fromCharCode(iiiliI1l >> 12 | 224), IiiiI11l += String.fromCharCode(iiiliI1l >> 6 & 63 | 128), IiiiI11l += String.fromCharCode(iiiliI1l & 63 | 128));
            }

            return IiiiI11l;
        }

        function i111ll1I(II1l1il) {
            var iII1Iii = iIlli11I ? "0123456789ABCDEF" : "0123456789abcdef",
                Iiili1l1 = "";

            for (var iiiI1Ii1 = 0; iiiI1Ii1 < II1l1il.length * 4; iiiI1Ii1++) {
                Iiili1l1 += iII1Iii.charAt(II1l1il[iiiI1Ii1 >> 2] >> (3 - iiiI1Ii1 % 4) * 8 + 4 & 15) + iII1Iii.charAt(II1l1il[iiiI1Ii1 >> 2] >> (3 - iiiI1Ii1 % 4) * 8 & 15);
            }

            return Iiili1l1;
        }

        return lI1l1i1l = IIliili(lI1l1i1l), i111ll1I(I1llIii1(iIIIllii(lI1l1i1l), lI1l1i1l.length * il1I11ll));
    }

}

module.exports = new H5st();