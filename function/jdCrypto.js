/*
new Env('jdCrypto');
*/

const fs = require('fs')
const jsdom = require('jsdom')
const CryptoJS = require('crypto-js')
const querystring = require('querystring')
const common = require('./jdCommon')

function wuxianDefense() {
    const I11I11iI = ["/api/task/building/build", "/api/prize/draw", "/api/task/member/rank/getMember", "/api/task/rank/getRankInfo", "/api/task/member/rank/getMember", "/api/prize/receive/acquire", "/api/task/daySign/getSignClick", "/api/task/addSku/toDo", "/api/task/followGoods/followGoods", "/api/task/dmpss/toDo", "/api/task/dailyGift/todo", "/api/group/draw/toDo", "/api/basic/task/toDo", "/api/task/jiugongge/toDo", "/api/task/niudanji/toDo", "/api/task/organizeTeam/saveMember"],
        IlllI1 = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"],
        i1IiIlil = [...I11I11iI, ...IlllI1];

    function iii1ii1I(iillill, IiIII1iI, ll1i1i1) {
        function IIllii1I(lI1lIil) {
            lI1lIil = lI1lIil.split("").reverse().join("");
            const iIiilIl = new Uint8Array(12),
                l1i1IiII = new TextEncoder().encode(lI1lIil);

            for (let iiIIlIiI = 0; iiIIlIiI < l1i1IiII.length; iiIIlIiI += 2) {
                let lIllil1 = l1i1IiII[iiIIlIiI] << 5 | l1i1IiII[iiIIlIiI + 1] & 255;
                lIllil1 %= 63;
                iIiilIl[iiIIlIiI >> 1] = lIllil1;
            }

            let Illilli1 = "";

            for (let liIiil11 = 0; liIiil11 < iIiilIl.length; liIiil11++) {
                Illilli1 += (iIiilIl[liIiil11] + 256).toString(2).slice(1);
            }

            let iI1iiii = "",
                lil1i1Il = "";

            for (let i1IliII1 = 0; i1IliII1 < 16; i1IliII1++) {
                if (i1IliII1 !== 0) {
                    const llII1IlI = i1IliII1 * 6,
                        I1l1i11i = Illilli1.substring(llII1IlI, llII1IlI + 6);
                    let II1il1l = parseInt(I1l1i11i, 2);
                    const llIllli = lil1i1Il.split("");

                    for (let iI1I1li = 0; iI1I1li < llIllli.length; iI1I1li++) {
                        llIllli[iI1I1li] === "1" && (II1il1l = (II1il1l >> 6 - iI1I1li | II1il1l << iI1I1li) & 63);
                    }

                    lil1i1Il = (II1il1l & 63).toString(2).padStart(6, "0");
                } else lil1i1Il = Illilli1.substring(0, 6);

                iI1iiii += lil1i1Il;
            }

            for (let lI1I11ll = 0; lI1I11ll < 12; lI1I11ll++) {
                const l1i1Ill = lI1I11ll * 8;
                iIiilIl[lI1I11ll] = parseInt(iI1iiii.substring(l1i1Ill, l1i1Ill + 8), 2);
            }

            const Il1il1l = btoa(String.fromCharCode.apply(null, iIiilIl));
            return Il1il1l;
        }

        const IIllIiI1 = ["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"];
        let lllii1ii = Date.now() + parseInt(ll1i1i1);
        typeof iillill != "object" && (iillill = JSON.parse(iillill));
        iillill.nowTime = lllii1ii;
        let Illi11l1 = IiIII1iI + lllii1ii;
        const Ii1ilil1 = Illi11l1.substring(0, Illi11l1.length - 5);
        let lI1i1111 = "";

        for (let iill11l = 0; iill11l < Ii1ilil1.length; iill11l++) {
            let il1I1ii = Ii1ilil1.charCodeAt(iill11l),
                i1liiIi = il1I1ii % 10,
                I1IiI1iI = IIllIiI1[i1liiIi][iill11l];
            lI1i1111 += I1IiI1iI;
        }

        var IIIIiIl = lI1i1111.length,
            II1Il1I1 = Math.floor(IIIIiIl / 24),
            iI11I1I = "";

        for (var llll1ll1 = 0; llll1ll1 < 24; llll1ll1++) {
            var I11l1ill = (llll1ll1 + 1) * II1Il1I1;
            llll1ll1 === 23 && (I11l1ill = IIIIiIl);
            var liIIliI1 = lI1i1111.substring(llll1ll1 * II1Il1I1, I11l1ill);
            var lIiIiiI1 = [];

            for (var llI1iIIi = 0; llI1iIIi < liIIliI1.length; llI1iIIi++) {
                lIiIiiI1.push(liIIliI1.charCodeAt(llI1iIIi));
            }

            var iIli1111 = lIiIiiI1.reduce(function (IIiIl1I, ll1iiIl) {
                return IIiIl1I + ll1iiIl;
            }, 0);
            var I1l11I = Math.floor(iIli1111 / lIiIiiI1.length);
            iI11I1I += String.fromCharCode(I1l11I);
        }

        lI1i1111 = iI11I1I;
        const il11Illi = IIllii1I(lI1i1111),
            iI1lIiI = CryptoJS.enc.Utf8.parse(il11Illi),
            I1l11i11 = CryptoJS.enc.Utf8.parse(""),
            iil1Ilil = CryptoJS.AES.encrypt(JSON.stringify(iillill), iI1lIiI, {
                "iv": I1l11i11,
                "mode": CryptoJS.mode.ECB,
                "padding": CryptoJS.pad.Pkcs7
            });
        return iil1Ilil.toString();
    }

    function II111I(lI1il1ii) {
        const lI1II11l = i1IiIlil,
            l111Il1l = Object.fromEntries(lI1II11l.map(l1111 => [l1111, true])),
            iIIiIi11 = l111Il1l[lI1il1ii] !== undefined;
        return iIIiIi11;
    }

    function illIilii() {
        const l1IliIll = CryptoJS.enc.Utf8.parse("Hd5W5ONsYKmGm9QA"),
            Il1i111 = CryptoJS.enc.Utf8.parse("2JjUvJEAsA2Yog==");

        function iiIi1I1i(i1iliili) {
            const iII1iiii = CryptoJS.enc.Utf8.parse(i1iliili),
                l1iilIli = CryptoJS.AES.encrypt(iII1iiii, l1IliIll, {
                    "iv": Il1i111,
                    "mode": CryptoJS.mode.CBC,
                    "padding": CryptoJS.pad.Pkcs7
                });
            return CryptoJS.enc.Base64.stringify(l1iilIli.ciphertext);
        }

        function i1ll111i(ilIl1I1) {
            const ili1il1i = CryptoJS.enc.Base64.parse(ilIl1I1),
                li1liii = CryptoJS.enc.Base64.stringify(ili1il1i),
                II111lli = CryptoJS.AES.decrypt(li1liii, l1IliIll, {
                    "iv": Il1i111,
                    "mode": CryptoJS.mode.CBC,
                    "padding": CryptoJS.pad.Pkcs7
                });
            return CryptoJS.enc.Utf8.stringify(II111lli).toString();
        }

        return {
            "encrypt": iiIi1I1i,
            "decrypt": i1ll111i
        };
    }

    return {
        "encrypt": iii1ii1I,
        "isDefenseApi": II111I,
        "interactionV2": illIilii
    };
}

async function jsTk(l1ll1li, i1lliii, i1ili1ll = {}, iiIiiliI = {}) {
    let IiiiIIII = {
        "eid": "",
        "jsToken": "",
        "fp": ""
    };

    function I1i1ii1(liI11I11) {
        liI11I11 = JSON.stringify(liI11I11);
        liI11I11 = encodeURIComponent(liI11I11);
        var lilli1il = "",
            lii111Ii = 0;

        do {
            var I1Iilii = liI11I11.charCodeAt(lii111Ii++);
            var I1ilil1l = liI11I11.charCodeAt(lii111Ii++);
            var lliIIlII = liI11I11.charCodeAt(lii111Ii++);
            var l1iIlII1 = I1Iilii >> 2;
            I1Iilii = (I1Iilii & 3) << 4 | I1ilil1l >> 4;
            var ilIIlIl = (I1ilil1l & 15) << 2 | lliIIlII >> 6;
            var li1llli = lliIIlII & 63;
            isNaN(I1ilil1l) ? ilIIlIl = li1llli = 64 : isNaN(lliIIlII) && (li1llli = 64);
            lilli1il = lilli1il + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(l1iIlII1) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(I1Iilii) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(ilIIlIl) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(li1llli);
        } while (lii111Ii < liI11I11.length);

        return lilli1il + "/";
    }

    function lIiilIii() {
        function III1iIi1(IIiIIli, ilIliIiI) {
            IIiIIli = [IIiIIli[0] >>> 16, 65535 & IIiIIli[0], IIiIIli[1] >>> 16, 65535 & IIiIIli[1]];
            ilIliIiI = [ilIliIiI[0] >>> 16, 65535 & ilIliIiI[0], ilIliIiI[1] >>> 16, 65535 & ilIliIiI[1]];
            var i1ilIll = [0, 0, 0, 0];
            return i1ilIll[3] += IIiIIli[3] + ilIliIiI[3], i1ilIll[2] += i1ilIll[3] >>> 16, i1ilIll[3] &= 65535, i1ilIll[2] += IIiIIli[2] + ilIliIiI[2], i1ilIll[1] += i1ilIll[2] >>> 16, i1ilIll[2] &= 65535, i1ilIll[1] += IIiIIli[1] + ilIliIiI[1], i1ilIll[0] += i1ilIll[1] >>> 16, i1ilIll[1] &= 65535, i1ilIll[0] += IIiIIli[0] + ilIliIiI[0], i1ilIll[0] &= 65535, [i1ilIll[0] << 16 | i1ilIll[1], i1ilIll[2] << 16 | i1ilIll[3]];
        }

        function l1ll11il(II11I11l, I11III1i) {
            II11I11l = [II11I11l[0] >>> 16, 65535 & II11I11l[0], II11I11l[1] >>> 16, 65535 & II11I11l[1]];
            I11III1i = [I11III1i[0] >>> 16, 65535 & I11III1i[0], I11III1i[1] >>> 16, 65535 & I11III1i[1]];
            var IlIli1ii = [0, 0, 0, 0];
            return IlIli1ii[3] += II11I11l[3] * I11III1i[3], IlIli1ii[2] += IlIli1ii[3] >>> 16, IlIli1ii[3] &= 65535, IlIli1ii[2] += II11I11l[2] * I11III1i[3], IlIli1ii[1] += IlIli1ii[2] >>> 16, IlIli1ii[2] &= 65535, IlIli1ii[2] += II11I11l[3] * I11III1i[2], IlIli1ii[1] += IlIli1ii[2] >>> 16, IlIli1ii[2] &= 65535, IlIli1ii[1] += II11I11l[1] * I11III1i[3], IlIli1ii[0] += IlIli1ii[1] >>> 16, IlIli1ii[1] &= 65535, IlIli1ii[1] += II11I11l[2] * I11III1i[2], IlIli1ii[0] += IlIli1ii[1] >>> 16, IlIli1ii[1] &= 65535, IlIli1ii[1] += II11I11l[3] * I11III1i[1], IlIli1ii[0] += IlIli1ii[1] >>> 16, IlIli1ii[1] &= 65535, IlIli1ii[0] += II11I11l[0] * I11III1i[3] + II11I11l[1] * I11III1i[2] + II11I11l[2] * I11III1i[1] + II11I11l[3] * I11III1i[0], IlIli1ii[0] &= 65535, [IlIli1ii[0] << 16 | IlIli1ii[1], IlIli1ii[2] << 16 | IlIli1ii[3]];
        }

        function ill11llI(liIIIlI1, i1liIiI) {
            return 32 === (i1liIiI %= 64) ? [liIIIlI1[1], liIIIlI1[0]] : i1liIiI < 32 ? [liIIIlI1[0] << i1liIiI | liIIIlI1[1] >>> 32 - i1liIiI, liIIIlI1[1] << i1liIiI | liIIIlI1[0] >>> 32 - i1liIiI] : [liIIIlI1[1] << (i1liIiI -= 32) | liIIIlI1[0] >>> 32 - i1liIiI, liIIIlI1[0] << i1liIiI | liIIIlI1[1] >>> 32 - i1liIiI];
        }

        function liII11ll(lI1iIIII, il11illi) {
            return 0 === (il11illi %= 64) ? lI1iIIII : il11illi < 32 ? [lI1iIIII[0] << il11illi | lI1iIIII[1] >>> 32 - il11illi, lI1iIIII[1] << il11illi] : [lI1iIIII[1] << il11illi - 32, 0];
        }

        function Ilili11I(iiiIlii1, llI11iI1) {
            return [iiiIlii1[0] ^ llI11iI1[0], iiiIlii1[1] ^ llI11iI1[1]];
        }

        function lI1I11(iili1I) {
            return iili1I = Ilili11I(iili1I, [0, iili1I[0] >>> 1]), iili1I = Ilili11I(iili1I = l1ll11il(iili1I, [4283543511, 3981806797]), [0, iili1I[0] >>> 1]), Ilili11I(iili1I = l1ll11il(iili1I, [3301882366, 444984403]), [0, iili1I[0] >>> 1]);
        }

        return {
            "hash128": function (i1lIIi1, iI1lIi11) {
                for (var lII1iii1, I11Ii1ll, iIiIIlli = iI1lIi11 || 0, IiiIi11I = (iI1lIi11 = (i1lIIi1 = i1lIIi1 || "").length % 16, i1lIIi1.length - iI1lIi11), iIl1Ili = [0, iIiIIlli], iIiIIlli = [0, iIiIIlli], ill1iIi1 = [2277735313, 289559509], l11IIi1i = [1291169091, 658871167], IIIi1lI1 = 0; IIIi1lI1 < IiiIi11I; IIIi1lI1 += 16) lII1iii1 = [255 & i1lIIi1.charCodeAt(IIIi1lI1 + 4) | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 5)) << 8 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 6)) << 16 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 7)) << 24, 255 & i1lIIi1.charCodeAt(IIIi1lI1) | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 1)) << 8 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 2)) << 16 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 3)) << 24], I11Ii1ll = [255 & i1lIIi1.charCodeAt(IIIi1lI1 + 12) | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 13)) << 8 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 14)) << 16 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 15)) << 24, 255 & i1lIIi1.charCodeAt(IIIi1lI1 + 8) | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 9)) << 8 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 10)) << 16 | (255 & i1lIIi1.charCodeAt(IIIi1lI1 + 11)) << 24], lII1iii1 = ill11llI(lII1iii1 = l1ll11il(lII1iii1, ill1iIi1), 31), iIl1Ili = III1iIi1(iIl1Ili = ill11llI(iIl1Ili = Ilili11I(iIl1Ili, lII1iii1 = l1ll11il(lII1iii1, l11IIi1i)), 27), iIiIIlli), iIl1Ili = III1iIi1(l1ll11il(iIl1Ili, [0, 5]), [0, 1390208809]), I11Ii1ll = ill11llI(I11Ii1ll = l1ll11il(I11Ii1ll, l11IIi1i), 33), iIiIIlli = III1iIi1(iIiIIlli = ill11llI(iIiIIlli = Ilili11I(iIiIIlli, I11Ii1ll = l1ll11il(I11Ii1ll, ill1iIi1)), 31), iIl1Ili), iIiIIlli = III1iIi1(l1ll11il(iIiIIlli, [0, 5]), [0, 944331445]);

                switch (lII1iii1 = [0, 0], I11Ii1ll = [0, 0], iI1lIi11) {
                    case 15:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 14)], 48));

                    case 14:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 13)], 40));

                    case 13:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 12)], 32));

                    case 12:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 11)], 24));

                    case 11:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 10)], 16));

                    case 10:
                        I11Ii1ll = Ilili11I(I11Ii1ll, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 9)], 8));

                    case 9:
                        I11Ii1ll = l1ll11il(I11Ii1ll = Ilili11I(I11Ii1ll, [0, i1lIIi1.charCodeAt(IIIi1lI1 + 8)]), l11IIi1i), iIiIIlli = Ilili11I(iIiIIlli, I11Ii1ll = l1ll11il(I11Ii1ll = ill11llI(I11Ii1ll, 33), ill1iIi1));

                    case 8:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 7)], 56));

                    case 7:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 6)], 48));

                    case 6:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 5)], 40));

                    case 5:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 4)], 32));

                    case 4:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 3)], 24));

                    case 3:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 2)], 16));

                    case 2:
                        lII1iii1 = Ilili11I(lII1iii1, liII11ll([0, i1lIIi1.charCodeAt(IIIi1lI1 + 1)], 8));

                    case 1:
                        lII1iii1 = l1ll11il(lII1iii1 = Ilili11I(lII1iii1, [0, i1lIIi1.charCodeAt(IIIi1lI1)]), ill1iIi1), iIl1Ili = Ilili11I(iIl1Ili, lII1iii1 = l1ll11il(lII1iii1 = ill11llI(lII1iii1, 31), l11IIi1i));
                }

                return iIl1Ili = III1iIi1(iIl1Ili = Ilili11I(iIl1Ili, [0, i1lIIi1.length]), iIiIIlli = Ilili11I(iIiIIlli, [0, i1lIIi1.length])), iIiIIlli = III1iIi1(iIiIIlli, iIl1Ili), iIl1Ili = III1iIi1(iIl1Ili = lI1I11(iIl1Ili), iIiIIlli = lI1I11(iIiIIlli)), iIiIIlli = III1iIi1(iIiIIlli, iIl1Ili), ("00000000" + (iIl1Ili[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (iIl1Ili[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (iIiIIlli[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (iIiIIlli[1] >>> 0).toString(16)).slice(-8);
            }
        };
    }

    try {
        const IIll1ili = lIiilIii().hash128([l1ll1li.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "896x414", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null].join("~~~"), 31);
        IiiiIIII.fp = IIll1ili;
        const illiI1Ii = I1i1ii1(Object.assign({}, {
            "pin": "",
            "oid": "",
            "bizId": "jd-babelh5",
            "fc": "",
            "mode": "strict",
            "p": /^https:/.test(i1lliii) ? "s" : "h",
            "fp": IIll1ili,
            "ctype": 1,
            "v": "3.2.1.1",
            "f": "3",
            "o": i1lliii.replace(/^https?:\/\//, ""),
            "qs": "",
            "jsTk": "",
            "qi": "",
            "stk": ""
        }, i1ili1ll)),
            IlIIii = I1i1ii1(Object.assign({}, {
                "ts": {
                    "deviceTime": Date.now(),
                    "deviceEndTime": Date.now() + 20
                },
                "ca": {
                    "tdHash": ""
                },
                "m": {
                    "compatMode": "CSS1Compat"
                },
                "fo": ["Bauhaus 93", "Chalkduster", "Impact", "Menlo", "Papyrus", "Rockwell"],
                "n": {
                    "standalone": false,
                    "hardwareConcurrency": 4,
                    "webdriver": false,
                    "maxTouchPoints": 5,
                    "cookieEnabled": true,
                    "appCodeName": "Mozilla",
                    "appName": "Netscape",
                    "appVersion": /\/(.+)/g.exec(l1ll1li) && /\/(.+)/g.exec(l1ll1li)[1] || l1ll1li,
                    "platform": "iPhone",
                    "product": "Gecko",
                    "productSub": "20030107",
                    "userAgent": l1ll1li,
                    "vendor": "Apple Computer, Inc.",
                    "vendorSub": "",
                    "language": "zh-CN",
                    "onLine": true,
                    "pdfViewerEnabled": true,
                    "javaEnabled": false,
                    "enumerationOrder": ["sendBeacon", "standalone", "hardwareConcurrency", "clipboard", "audioSession", "credentials", "geolocation", "mediaCapabilities", "mediaSession", "mediaDevices", "permissions", "wakeLock", "locks", "webdriver", "maxTouchPoints", "userActivation", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "productSub", "userAgent", "vendor", "vendorSub", "language", "languages", "onLine", "plugins", "mimeTypes", "pdfViewerEnabled", "storage", "requestMediaKeySystemAccess", "getGamepads", "javaEnabled", "canShare", "share"]
                },
                "p": [],
                "w": {
                    "devicePixelRatio": 1,
                    "screenTop": 0,
                    "screenLeft": 0
                },
                "s": {
                    "availHeight": 844,
                    "availWidth": 390,
                    "colorDepth": 24,
                    "height": 844,
                    "width": 390,
                    "pixelDepth": 24
                },
                "sc": {
                    "ActiveBorder": "rgb(118, 118, 118)",
                    "ActiveCaption": "rgb(0, 0, 0)",
                    "AppWorkspace": "rgb(255, 255, 255)",
                    "Background": "rgb(255, 255, 255)",
                    "ButtonFace": "rgb(239, 239, 239)",
                    "ButtonHighlight": "rgb(239, 239, 239)",
                    "ButtonShadow": "rgb(239, 239, 239)",
                    "ButtonText": "rgb(0, 0, 0)",
                    "CaptionText": "rgb(0, 0, 0)",
                    "GrayText": "rgb(128, 128, 128)",
                    "Highlight": "rgba(51, 181, 229, 0.4)",
                    "HighlightText": "rgb(255, 255, 255)",
                    "InactiveBorder": "rgb(118, 118, 118)",
                    "InactiveCaption": "rgb(255, 255, 255)",
                    "InactiveCaptionText": "rgb(128, 128, 128)",
                    "InfoBackground": "rgb(255, 255, 255)",
                    "InfoText": "rgb(0, 0, 0)",
                    "Menu": "rgb(255, 255, 255)",
                    "MenuText": "rgb(0, 0, 0)",
                    "Scrollbar": "rgb(255, 255, 255)",
                    "ThreeDDarkShadow": "rgb(118, 118, 118)",
                    "ThreeDFace": "rgb(239, 239, 239)",
                    "ThreeDHighlight": "rgb(118, 118, 118)",
                    "ThreeDLightShadow": "rgb(118, 118, 118)",
                    "ThreeDShadow": "rgb(118, 118, 118)",
                    "Window": "rgb(255, 255, 255)",
                    "WindowFrame": "rgb(118, 118, 118)",
                    "WindowText": "rgb(0, 0, 0)"
                },
                "ss": {
                    "cookie": true,
                    "localStorage": true,
                    "sessionStorage": true,
                    "globalStorage": false,
                    "indexedDB": true
                },
                "tz": -480,
                "lil": "",
                "wil": ""
            }, iiIiiliI)),
            iI1111l1 = {
                "url": "https://gia.jd.com/jsTk.do",
                "method": "POST",
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Connection": "keep-alive",
                    "Host": "gia.jd.com",
                    "Origin": common.parseUrl(i1lliii)?.["origin"] || "https://pro.m.jd.com",
                    "Referer": i1lliii,
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "User-Agent": l1ll1li
                },
                "params": {
                    "a": illiI1Ii
                },
                "data": {
                    "d": IlIIii
                },
                "proxy": null,
                "timeout": 60000,
                "debug": false
            };
        let lIIIiIll = 0,
            I11iIII = null;
        const Ii1lIl1 = 1;

        while (lIIIiIll < Ii1lIl1) {
            const lliI11I1 = await common.request(iI1111l1);

            if (!lliI11I1.success) {
                I11iIII = "❌ jsTk 请求失败 ➜ " + lliI11I1.error;
                lIIIiIll++;
                continue;
            }

            if (!lliI11I1.data) {
                I11iIII = "🚫 jsTk 请求失败 ➜ 无响应数据";
                lIIIiIll++;
                continue;
            }

            try {
                const il1i1i1i = lliI11I1.data;
                if (il1i1i1i?.["data"]?.["eid"] && il1i1i1i?.["data"]?.["token"]) return IiiiIIII.eid = il1i1i1i.data.eid, IiiiIIII.jsToken = il1i1i1i.data.token, IiiiIIII;
                I11iIII = "🚫 jsTk 请求异常 ➜ " + JSON.stringify(il1i1i1i);
            } catch (IIIllllI) {
                I11iIII = "❌ jsTk 在处理接口响应时遇到了错误 ➜ " + (IIIllllI.message || IIIllllI);
            }

            lIIIiIll++;
        }

        lIIIiIll >= Ii1lIl1 && console.log(I11iIII);
    } catch (ili1I1iI) {
        console.log("❌ 在处理 jsTk 时遇到了错误 ➜ " + (ili1I1iI.message || ili1I1iI));
    }

    return IiiiIIII;
}

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

    async ["_sleep"](l1IIIliI) {
        return new Promise((ll1il1ll, I1IlIIi) => {
            setTimeout(() => {
                ll1il1ll(l1IIIliI);
            }, l1IIIliI);
        });
    }

    async ["_loadH5Sdk"](lii11I1l, llliIlil) {
        const {
            JSDOM: i111lliI
        } = jsdom;
        let i1I1l1 = new jsdom.ResourceLoader({
            "userAgent": llliIlil
        }),
            I1IIili = new jsdom.VirtualConsole(),
            liII1iIl = {
                "url": "http://localhost",
                "userAgent": llliIlil,
                "runScripts": "dangerously",
                "resources": i1I1l1,
                "includeNodeLocations": true,
                "storageQuota": 1000000000,
                "pretendToBeVisual": true,
                "virtualConsole": I1IIili
            },
            iliii11I = "";

        switch (lii11I1l) {
            case "3.1":
                iliii11I = "<script>" + fs.readFileSync(__dirname + "/assets/index_1.js", "utf-8") + "</script>";
                break;

            case "4.1":
                iliii11I = "<script>" + fs.readFileSync(__dirname + "/assets/index_2.js", "utf-8") + "</script>";
                break;

            case "4.2":
                iliii11I = "<script>" + fs.readFileSync(__dirname + "/assets/index_3.js", "utf-8") + "</script>";
                break;

            case "4.3":
                iliii11I = "<script>" + fs.readFileSync(__dirname + "/assets/index_4.js", "utf-8") + "</script>";
                break;

            case "4.4":
                iliii11I = "<script>" + fs.readFileSync(__dirname + "/assets/index_5.js", "utf-8") + "</script>";
                break;
        }

        const llli1ll1 = new i111lliI("<body>\n    " + iliii11I + "\n</body>", liII1iIl);

        do {
            await this._sleep(100);
        } while (!llli1ll1.window.ParamsSign);

        switch (lii11I1l) {
            case "3.1":
                this.domWindow3_1 = llli1ll1.window;
                break;

            case "4.1":
                this.domWindow4_1 = llli1ll1.window;
                break;

            case "4.2":
                this.domWindow4_2 = llli1ll1.window;
                break;

            case "4.3":
                this.domWindow4_3 = llli1ll1.window;
                break;

            case "4.4":
                this.domWindow4_4 = llli1ll1.window;
                break;
        }
    }

    async ["_signWaap"](illiIIII, IilIl1i1, ilI1lI1l) {
        const i1ilIlli = new ilI1lI1l.ParamsSign({
            "appId": illiIIII,
            "preRequest": false,
            "debug": false,

            "onSign"({
                code: IlliliII,
                message: I1iiIii,
                data: IliIl11
            }) { },

            "onRequestTokenRemotely"({
                code: Ii1Illl,
                message: i1l1lIll
            }) { },

            "onRequestToken"({
                code: i111i1II,
                message: IlIIII11
            }) { }

        });
        let llIi11ll = {
            "appid": IilIl1i1.appid,
            "body": this._SHA256(JSON.stringify(IilIl1i1.body)).toString(),
            "client": IilIl1i1.client || "",
            "clientVersion": IilIl1i1.clientVersion || "",
            "functionId": IilIl1i1.functionId
        };

        for (const Iill1iiI of ["client", "clientVersion"]) {
            if (!IilIl1i1[Iill1iiI]) {
                delete llIi11ll[Iill1iiI];
            }
        }

        IilIl1i1?.["t"] && (llIi11ll.t = IilIl1i1.t);
        let i1I11ili = await i1ilIlli.sign(llIi11ll);

        if (!i1I11ili?.["h5st"] || i1I11ili.h5st === "null") {
            console.log("❌ getH5st 签名生成失败");
            i1I11ili.h5st = "";
        }

        return i1I11ili?.["h5st"] || "";
    }

    async ["getH5st"](iIlIl1ii) {
        let I1l1liI = Object.assign({}, iIlIl1ii, {
            "h5st": "",
            "params": "",
            "paramsData": {}
        });

        try {
            if (!(typeof iIlIl1ii === "object" && iIlIl1ii !== null)) return console.log("❌ getH5st 传入参数有误"), I1l1liI; else {
                const i1iIiilI = ["appId", "appid", "body", "functionId"],
                    ilIl1ill = i1iIiilI.filter(llI1111 => !iIlIl1ii[llI1111]);
                if (ilIl1ill.length > 0) return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + ilIl1ill.join(", ")), I1l1liI;
            }

            switch (iIlIl1ii?.["version"]) {
                case "3.1":
                case "4.1":
                case "4.2":
                case "4.3":
                case "4.4":
                    break;

                default:
                    iIlIl1ii.version = "4.3";
                    break;
            }

            const {
                appId: i11IIl1i,
                appid: il1lIlil,
                body: li1ilIil,
                client: IIIIIl,
                clientVersion: illli1li,
                functionId: lIiIIl,
                version: lIIIillI
            } = iIlIl1ii,
                IiiIl1l1 = Math.floor(Date.now() / 1000),
                li1liiI1 = "jdapp;iPhone;12.3.1;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + IiiIl1l1 + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
                ll1lI1ii = iIlIl1ii?.["ua"] || li1liiI1,
                Il1ilI1i = "domWindow" + lIIIillI.replace(".", "_"),
                iI1iIIl = Il1ilI1i + "_UA";
            (!this[Il1ilI1i] || this[iI1iIIl] && this[iI1iIIl] !== ll1lI1ii) && (await this._loadH5Sdk(lIIIillI, ll1lI1ii), this[iI1iIIl] = ll1lI1ii);
            const il11illI = {
                "appid": il1lIlil,
                "body": li1ilIil,
                "client": IIIIIl,
                "clientVersion": illli1li,
                "functionId": lIiIIl
            };
            iIlIl1ii?.["t"] && typeof iIlIl1ii.t === "boolean" ? (iIlIl1ii.t = Date.now(), il11illI.t = iIlIl1ii.t) : iIlIl1ii.t = "";
            if (!il11illI.client) delete il11illI.client;
            if (!il11illI.clientVersion) delete il11illI.clientVersion;
            const lii1llii = await this._signWaap(i11IIl1i, il11illI, this[Il1ilI1i]),
                l1lIiil = {
                    "functionId": lIiIIl,
                    "body": JSON.stringify(li1ilIil),
                    "t": "",
                    "appid": il1lIlil,
                    "client": "",
                    "clientVersion": "",
                    "h5st": lii1llii || ""
                };

            for (const iIIIilII of ["t", "client", "clientVersion"]) {
                iIlIl1ii[iIIIilII] ? l1lIiil[iIIIilII] = iIlIl1ii[iIIIilII] : delete l1lIiil[iIIIilII];
            }

            return Object.assign(I1l1liI, {
                "h5st": lii1llii || "",
                "params": querystring.stringify(l1lIiil),
                "paramsData": l1lIiil
            }), I1l1liI;
        } catch (II11IIli) {
            console.log("❌ getH5st 遇到了错误 " + (II11IIli.message || II11IIli));
        }

        return I1l1liI;
    }

    ["_SHA256"](IiiiIlI) {
        var lli111l = 8,
            IIlll1i1 = 0;

        function li111iIl(i1i1llll, iIiIlI1I) {
            var III1I1l = (i1i1llll & 65535) + (iIiIlI1I & 65535),
                illilII = (i1i1llll >> 16) + (iIiIlI1I >> 16) + (III1I1l >> 16);
            return illilII << 16 | III1I1l & 65535;
        }

        function Ii1I1lll(II1iiIi1, liiiI1ll) {
            return II1iiIi1 >>> liiiI1ll | II1iiIi1 << 32 - liiiI1ll;
        }

        function lIl1liIi(llli1IlI, l1ilIiII) {
            return llli1IlI >>> l1ilIiII;
        }

        function lI1lII1i(Ii1ilIil, ll1iI1iI, Il1IIl11) {
            return Ii1ilIil & ll1iI1iI ^ ~Ii1ilIil & Il1IIl11;
        }

        function lllI1li1(l1II11iI, iilIiIi1, iIlilIii) {
            return l1II11iI & iilIiIi1 ^ l1II11iI & iIlilIii ^ iilIiIi1 & iIlilIii;
        }

        function i1ll1lii(il1ili1) {
            return Ii1I1lll(il1ili1, 2) ^ Ii1I1lll(il1ili1, 13) ^ Ii1I1lll(il1ili1, 22);
        }

        function lII11i1(II1i1li) {
            return Ii1I1lll(II1i1li, 6) ^ Ii1I1lll(II1i1li, 11) ^ Ii1I1lll(II1i1li, 25);
        }

        function lI1l1lii(iIilil) {
            return Ii1I1lll(iIilil, 7) ^ Ii1I1lll(iIilil, 18) ^ lIl1liIi(iIilil, 3);
        }

        function Iii11ili(I1lI1l) {
            return Ii1I1lll(I1lI1l, 17) ^ Ii1I1lll(I1lI1l, 19) ^ lIl1liIi(I1lI1l, 10);
        }

        function Iil11llI(Ili1lII1, II1lii1l) {
            var I1l11lIi = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                lIllilIi = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                I1lliII1 = new Array(64),
                lIillI,
                liillli1,
                Ii1iIiI1,
                lI1lI11I,
                i1ili1Ii,
                IlIIi1lI,
                lIIIliii,
                iii1l111,
                iiilii1i,
                iiI1iIIi,
                l1ll1ill,
                ii1I1ll1;
            Ili1lII1[II1lii1l >> 5] |= 128 << 24 - II1lii1l % 32;
            Ili1lII1[(II1lii1l + 64 >> 9 << 4) + 15] = II1lii1l;

            for (var iiilii1i = 0; iiilii1i < Ili1lII1.length; iiilii1i += 16) {
                lIillI = lIllilIi[0];
                liillli1 = lIllilIi[1];
                Ii1iIiI1 = lIllilIi[2];
                lI1lI11I = lIllilIi[3];
                i1ili1Ii = lIllilIi[4];
                IlIIi1lI = lIllilIi[5];
                lIIIliii = lIllilIi[6];
                iii1l111 = lIllilIi[7];

                for (var iiI1iIIi = 0; iiI1iIIi < 64; iiI1iIIi++) {
                    if (iiI1iIIi < 16) I1lliII1[iiI1iIIi] = Ili1lII1[iiI1iIIi + iiilii1i]; else I1lliII1[iiI1iIIi] = li111iIl(li111iIl(li111iIl(Iii11ili(I1lliII1[iiI1iIIi - 2]), I1lliII1[iiI1iIIi - 7]), lI1l1lii(I1lliII1[iiI1iIIi - 15])), I1lliII1[iiI1iIIi - 16]);
                    l1ll1ill = li111iIl(li111iIl(li111iIl(li111iIl(iii1l111, lII11i1(i1ili1Ii)), lI1lII1i(i1ili1Ii, IlIIi1lI, lIIIliii)), I1l11lIi[iiI1iIIi]), I1lliII1[iiI1iIIi]);
                    ii1I1ll1 = li111iIl(i1ll1lii(lIillI), lllI1li1(lIillI, liillli1, Ii1iIiI1));
                    iii1l111 = lIIIliii;
                    lIIIliii = IlIIi1lI;
                    IlIIi1lI = i1ili1Ii;
                    i1ili1Ii = li111iIl(lI1lI11I, l1ll1ill);
                    lI1lI11I = Ii1iIiI1;
                    Ii1iIiI1 = liillli1;
                    liillli1 = lIillI;
                    lIillI = li111iIl(l1ll1ill, ii1I1ll1);
                }

                lIllilIi[0] = li111iIl(lIillI, lIllilIi[0]);
                lIllilIi[1] = li111iIl(liillli1, lIllilIi[1]);
                lIllilIi[2] = li111iIl(Ii1iIiI1, lIllilIi[2]);
                lIllilIi[3] = li111iIl(lI1lI11I, lIllilIi[3]);
                lIllilIi[4] = li111iIl(i1ili1Ii, lIllilIi[4]);
                lIllilIi[5] = li111iIl(IlIIi1lI, lIllilIi[5]);
                lIllilIi[6] = li111iIl(lIIIliii, lIllilIi[6]);
                lIllilIi[7] = li111iIl(iii1l111, lIllilIi[7]);
            }

            return lIllilIi;
        }

        function IililI11(llIIi) {
            var llil1Ii1 = Array(),
                ii1iIl1 = (1 << lli111l) - 1;

            for (var II1I1Iii = 0; II1I1Iii < llIIi.length * lli111l; II1I1Iii += lli111l) {
                llil1Ii1[II1I1Iii >> 5] |= (llIIi.charCodeAt(II1I1Iii / lli111l) & ii1iIl1) << 24 - II1I1Iii % 32;
            }

            return llil1Ii1;
        }

        function I1liI11(lIiii1lI) {
            lIiii1lI = lIiii1lI.replace(/\r\n/g, "\n");
            var I111Ilil = "";

            for (var lI1ll11l = 0; lI1ll11l < lIiii1lI.length; lI1ll11l++) {
                var IllilI1i = lIiii1lI.charCodeAt(lI1ll11l);
                if (IllilI1i < 128) I111Ilil += String.fromCharCode(IllilI1i); else IllilI1i > 127 && IllilI1i < 2048 ? (I111Ilil += String.fromCharCode(IllilI1i >> 6 | 192), I111Ilil += String.fromCharCode(IllilI1i & 63 | 128)) : (I111Ilil += String.fromCharCode(IllilI1i >> 12 | 224), I111Ilil += String.fromCharCode(IllilI1i >> 6 & 63 | 128), I111Ilil += String.fromCharCode(IllilI1i & 63 | 128));
            }

            return I111Ilil;
        }

        function illlil1(ll11iII1) {
            var iiIIi1Ii = IIlll1i1 ? "0123456789ABCDEF" : "0123456789abcdef",
                il1lii1 = "";

            for (var IIIll1il = 0; IIIll1il < ll11iII1.length * 4; IIIll1il++) {
                il1lii1 += iiIIi1Ii.charAt(ll11iII1[IIIll1il >> 2] >> (3 - IIIll1il % 4) * 8 + 4 & 15) + iiIIi1Ii.charAt(ll11iII1[IIIll1il >> 2] >> (3 - IIIll1il % 4) * 8 & 15);
            }

            return il1lii1;
        }

        return IiiiIlI = I1liI11(IiiiIlI), illlil1(Iil11llI(IililI11(IiiiIlI), IiiiIlI.length * lli111l));
    }

}

module.exports = {
    "wuxianDefense": wuxianDefense(),
    "jsTk": jsTk,
    "H5st": new H5st()
};