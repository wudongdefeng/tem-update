/*
new Env('getH5st');
*/
const iiIIIl1i = require("jsdom");

class Iillilii {
    constructor() {
        this.domWindow3_1 = null;
        this.domWindow4_1 = null;
        this.domWindow4_2 = null;
        this.signMap = {};
    }

    async ["_sleep"](Ill1IIi) {
        return new Promise((l1iII1l1, liiIlll) => {
            setTimeout(() => {
                l1iII1l1(Ill1IIi);
            }, Ill1IIi);
        });
    }

    async ["_loadH5Sdk"](IIiIiIl1, lI1111li = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0") {
        const {
            JSDOM: IliliIIi
        } = iiIIIl1i;
        let IIilIIl = new iiIIIl1i.ResourceLoader({
            "userAgent": lI1111li
        }),
            lilli11I = new iiIIIl1i.VirtualConsole(),
            I11iillI = {
                "url": "http://localhost",
                "userAgent": lI1111li,
                "runScripts": "dangerously",
                "resources": IIilIIl,
                "includeNodeLocations": true,
                "storageQuota": 1000000000,
                "pretendToBeVisual": true,
                "virtualConsole": lilli11I
            },
            I1ii111l = "";

        switch (IIiIiIl1) {
            case "3.1":
                I1ii111l = "v3_0.1.3";
                break;

            case "4.1":
                I1ii111l = "v3_0.1.8";
                break;

            case "4.2":
                I1ii111l = "v3_0.1.9";
                break;
        }

        const l1iliI11 = new IliliIIi("<body>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_" + I1ii111l + ".js\"></script>\n    </body>", I11iillI);

        do {
            await this._sleep(100);
        } while (!l1iliI11.window.ParamsSign);

        switch (IIiIiIl1) {
            case "3.1":
                this.domWindow3_1 = l1iliI11.window;
                break;

            case "4.1":
                this.domWindow4_1 = l1iliI11.window;
                break;

            case "4.2":
                this.domWindow4_2 = l1iliI11.window;
                break;
        }
    }

    async ["_signWaap"](Ii1i1I1, III1IiIi, lll1l1il) {
        let i1iil1l1 = this.signMap?.["appId"];
        !i1iil1l1 && (i1iil1l1 = new lll1l1il.ParamsSign({
            "appId": Ii1i1I1,
            "preRequest": false,
            "debug": false,

            "onSign"({
                code: iIIlilII,
                message: iIIil1,
                data: iiIiII1i
            }) { },

            "onRequestTokenRemotely"({
                code: illiilll,
                message: iiiIii11
            }) { },

            "onRequestToken"({
                code: iIi11II1,
                message: I1I1iiIi
            }) { }

        }), this.signMap.appId = i1iil1l1);
        let illlIIIi = {
            "appid": III1IiIi.appid,
            "body": this._SHA256(JSON.stringify(III1IiIi.body)).toString(),
            "client": III1IiIi.client,
            "clientVersion": III1IiIi.clientVersion,
            "functionId": III1IiIi.functionId
        };
        III1IiIi.t && (illlIIIi.t = III1IiIi.t);
        let iiI1i1iI = await i1iil1l1.sign(illlIIIi);
        return iiI1i1iI.h5st;
    }

    async ["getH5st"](l1I1lIII) {
        let lI1lIi1 = {
            ...l1I1lIII,
            "h5st": "",
            "params": ""
        };

        try {
            if (!(typeof l1I1lIII === "object" && l1I1lIII !== null)) return console.log("❌ getH5st 传入参数有误"), lI1lIi1; else {
                const lilIIIlI = ["appId", "appid", "body", "client", "clientVersion", "functionId"],
                    IllIIli = lilIIIlI.filter(iiIill => !l1I1lIII[iiIill]);

                if (IllIIli.length > 0) {
                    return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + IllIIli.join(", ")), lI1lIi1;
                }
            }

            switch (l1I1lIII?.["version"]) {
                case "3.1":
                case "4.1":
                case "4.2":
                    break;

                default:
                    l1I1lIII.version = "4.1";
                    break;
            }

            const {
                appId: ii1111l1,
                appid: i11l1l1I,
                body: i1lili1I,
                client: liI1llii,
                clientVersion: iI1iIliI,
                functionId: iiiilIl,
                version: I1I1li1i
            } = l1I1lIII;

            switch (I1I1li1i) {
                case "3.1":
                    !this.domWindow3_1 && (await this._loadH5Sdk(I1I1li1i, l1I1lIII?.["ua"] || ""));
                    break;

                case "4.1":
                    !this.domWindow4_1 && (await this._loadH5Sdk(I1I1li1i, l1I1lIII?.["ua"] || ""));
                    break;

                case "4.2":
                    !this.domWindow4_2 && (await this._loadH5Sdk(I1I1li1i, l1I1lIII?.["ua"] || ""));
                    break;
            }

            l1I1lIII?.["t"] && typeof l1I1lIII.t === "boolean" ? l1I1lIII.t = Date.now() : l1I1lIII.t = "";
            lI1lIi1.params = "functionId=" + iiiilIl + "&body=" + encodeURIComponent(JSON.stringify(i1lili1I)) + (l1I1lIII?.["t"] ? "&t=" + l1I1lIII.t : "") + "&appid=" + i11l1l1I + "&client=" + liI1llii + "&clientVersion=" + iI1iIliI + "&h5st=";
            let llI1iiI = "";

            switch (I1I1li1i) {
                case "3.1":
                    llI1iiI = await this._signWaap(ii1111l1, l1I1lIII, this.domWindow3_1);
                    break;

                case "4.1":
                    llI1iiI = await this._signWaap(ii1111l1, l1I1lIII, this.domWindow4_1);
                    break;

                case "4.2":
                    llI1iiI = await this._signWaap(ii1111l1, l1I1lIII, this.domWindow4_2);
                    break;
            }

            return lI1lIi1.h5st = llI1iiI || "", lI1lIi1.params += llI1iiI || "", lI1lIi1;
        } catch (IiIi1iIi) {
            console.log("❌ getH5st 遇到了错误 " + (IiIi1iIi.message || IiIi1iIi));
        }

        return lI1lIi1;
    }

    ["_SHA256"](Iii11II1) {
        var llIlIIii = 8,
            i1Il111l = 0;

        function IiIiI1il(llIIil1l, ili1IlI1) {
            var i1l1lll = (llIIil1l & 65535) + (ili1IlI1 & 65535),
                IIiIiI1l = (llIIil1l >> 16) + (ili1IlI1 >> 16) + (i1l1lll >> 16);
            return IIiIiI1l << 16 | i1l1lll & 65535;
        }

        function iI1IlIiI(IIil111l, i1lil1l1) {
            return IIil111l >>> i1lil1l1 | IIil111l << 32 - i1lil1l1;
        }

        function I1liIlI(iiIlil, iilIii1i) {
            return iiIlil >>> iilIii1i;
        }

        function ilIli1i1(i111iii, l1I1IilI, IiIliil) {
            return i111iii & l1I1IilI ^ ~i111iii & IiIliil;
        }

        function llii111l(l1IiIi1l, I1lI1I1i, i1li1iiI) {
            return l1IiIi1l & I1lI1I1i ^ l1IiIi1l & i1li1iiI ^ I1lI1I1i & i1li1iiI;
        }

        function I11lll1l(liI1lll) {
            return iI1IlIiI(liI1lll, 2) ^ iI1IlIiI(liI1lll, 13) ^ iI1IlIiI(liI1lll, 22);
        }

        function lIi1IilI(lIiI1i) {
            return iI1IlIiI(lIiI1i, 6) ^ iI1IlIiI(lIiI1i, 11) ^ iI1IlIiI(lIiI1i, 25);
        }

        function iIi11I1I(iiI11Ili) {
            return iI1IlIiI(iiI11Ili, 7) ^ iI1IlIiI(iiI11Ili, 18) ^ I1liIlI(iiI11Ili, 3);
        }

        function i1IiII1(I11iiIli) {
            return iI1IlIiI(I11iiIli, 17) ^ iI1IlIiI(I11iiIli, 19) ^ I1liIlI(I11iiIli, 10);
        }

        function iilIIl(l1iiIIIl, i11lIliI) {
            var l1111iIi = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                IiliiiI = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                Ii1iIi = new Array(64),
                ll1II1ll,
                I1IIIil,
                iiIlIiI,
                lIilI1II,
                IiIlIiI1,
                lIl1I1l,
                ilII1l1I,
                i1iiiI,
                lllIIIIi,
                I1i1lIll,
                l111lli,
                l11ilI1i;
            l1iiIIIl[i11lIliI >> 5] |= 128 << 24 - i11lIliI % 32;
            l1iiIIIl[(i11lIliI + 64 >> 9 << 4) + 15] = i11lIliI;

            for (var lllIIIIi = 0; lllIIIIi < l1iiIIIl.length; lllIIIIi += 16) {
                ll1II1ll = IiliiiI[0];
                I1IIIil = IiliiiI[1];
                iiIlIiI = IiliiiI[2];
                lIilI1II = IiliiiI[3];
                IiIlIiI1 = IiliiiI[4];
                lIl1I1l = IiliiiI[5];
                ilII1l1I = IiliiiI[6];
                i1iiiI = IiliiiI[7];

                for (var I1i1lIll = 0; I1i1lIll < 64; I1i1lIll++) {
                    if (I1i1lIll < 16) Ii1iIi[I1i1lIll] = l1iiIIIl[I1i1lIll + lllIIIIi]; else Ii1iIi[I1i1lIll] = IiIiI1il(IiIiI1il(IiIiI1il(i1IiII1(Ii1iIi[I1i1lIll - 2]), Ii1iIi[I1i1lIll - 7]), iIi11I1I(Ii1iIi[I1i1lIll - 15])), Ii1iIi[I1i1lIll - 16]);
                    l111lli = IiIiI1il(IiIiI1il(IiIiI1il(IiIiI1il(i1iiiI, lIi1IilI(IiIlIiI1)), ilIli1i1(IiIlIiI1, lIl1I1l, ilII1l1I)), l1111iIi[I1i1lIll]), Ii1iIi[I1i1lIll]);
                    l11ilI1i = IiIiI1il(I11lll1l(ll1II1ll), llii111l(ll1II1ll, I1IIIil, iiIlIiI));
                    i1iiiI = ilII1l1I;
                    ilII1l1I = lIl1I1l;
                    lIl1I1l = IiIlIiI1;
                    IiIlIiI1 = IiIiI1il(lIilI1II, l111lli);
                    lIilI1II = iiIlIiI;
                    iiIlIiI = I1IIIil;
                    I1IIIil = ll1II1ll;
                    ll1II1ll = IiIiI1il(l111lli, l11ilI1i);
                }

                IiliiiI[0] = IiIiI1il(ll1II1ll, IiliiiI[0]);
                IiliiiI[1] = IiIiI1il(I1IIIil, IiliiiI[1]);
                IiliiiI[2] = IiIiI1il(iiIlIiI, IiliiiI[2]);
                IiliiiI[3] = IiIiI1il(lIilI1II, IiliiiI[3]);
                IiliiiI[4] = IiIiI1il(IiIlIiI1, IiliiiI[4]);
                IiliiiI[5] = IiIiI1il(lIl1I1l, IiliiiI[5]);
                IiliiiI[6] = IiIiI1il(ilII1l1I, IiliiiI[6]);
                IiliiiI[7] = IiIiI1il(i1iiiI, IiliiiI[7]);
            }

            return IiliiiI;
        }

        function IiI11II(i1IIllI) {
            var I11lI1Ii = Array(),
                Ili1iii = (1 << llIlIIii) - 1;

            for (var llI1lIiI = 0; llI1lIiI < i1IIllI.length * llIlIIii; llI1lIiI += llIlIIii) {
                I11lI1Ii[llI1lIiI >> 5] |= (i1IIllI.charCodeAt(llI1lIiI / llIlIIii) & Ili1iii) << 24 - llI1lIiI % 32;
            }

            return I11lI1Ii;
        }

        function I1l1Il1l(iIiIIIIl) {
            iIiIIIIl = iIiIIIIl.replace(/\r\n/g, "\n");
            var Ill1iIii = "";

            for (var I1llilii = 0; I1llilii < iIiIIIIl.length; I1llilii++) {
                var lI1iliII = iIiIIIIl.charCodeAt(I1llilii);
                if (lI1iliII < 128) Ill1iIii += String.fromCharCode(lI1iliII); else {
                    if (lI1iliII > 127 && lI1iliII < 2048) {
                        Ill1iIii += String.fromCharCode(lI1iliII >> 6 | 192);
                        Ill1iIii += String.fromCharCode(lI1iliII & 63 | 128);
                    } else Ill1iIii += String.fromCharCode(lI1iliII >> 12 | 224), Ill1iIii += String.fromCharCode(lI1iliII >> 6 & 63 | 128), Ill1iIii += String.fromCharCode(lI1iliII & 63 | 128);
                }
            }

            return Ill1iIii;
        }

        function l1l1Iiii(iiIlIilI) {
            var iIlllli1 = i1Il111l ? "0123456789ABCDEF" : "0123456789abcdef",
                iI111il1 = "";

            for (var ll1lIlII = 0; ll1lIlII < iiIlIilI.length * 4; ll1lIlII++) {
                iI111il1 += iIlllli1.charAt(iiIlIilI[ll1lIlII >> 2] >> (3 - ll1lIlII % 4) * 8 + 4 & 15) + iIlllli1.charAt(iiIlIilI[ll1lIlII >> 2] >> (3 - ll1lIlII % 4) * 8 & 15);
            }

            return iI111il1;
        }

        return Iii11II1 = I1l1Il1l(Iii11II1), l1l1Iiii(iilIIl(IiI11II(Iii11II1), Iii11II1.length * llIlIIii));
    }

}

module.exports = new Iillilii();
