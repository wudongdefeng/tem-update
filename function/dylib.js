const _0x21a843 = require("axios"),
    _0x402daf = require("https"),
    _0x107e00 = require("crypto-js");

class _0x4ac699 {
    constructor() { }

    TDEncrypt(_0x4afd72) {
        _0x4afd72 = JSON.stringify(_0x4afd72);
        _0x4afd72 = encodeURIComponent(_0x4afd72);
        var _0x48446e = "",
            _0x424268 = 0;

        do {
            var _0x360958 = _0x4afd72.charCodeAt(_0x424268++);

            var _0x41d4f7 = _0x4afd72.charCodeAt(_0x424268++);

            var _0x12f2da = _0x4afd72.charCodeAt(_0x424268++);

            var _0x34f017 = _0x360958 >> 2;

            _0x360958 = (_0x360958 & 3) << 4 | _0x41d4f7 >> 4;

            var _0x2c830d = (_0x41d4f7 & 15) << 2 | _0x12f2da >> 6;

            var _0x1f221e = _0x12f2da & 63;

            isNaN(_0x41d4f7) ? _0x2c830d = _0x1f221e = 64 : isNaN(_0x12f2da) && (_0x1f221e = 64);
            _0x48446e += "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x34f017) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x360958) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x2c830d) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(_0x1f221e);
        } while (_0x424268 < _0x4afd72.length);

        return _0x48446e + "/";
    }

    async jddToken(_0x3a6364) {
        const _0x28fdfa = {
            bizId: "jd-babelh5",
            ctype: 1,
            f: "3",
            fc: null,
            fp: "4203d33db9131c1eea0b92354da7056d",
            jsTk: null,
            mode: "strict",
            o: _0x3a6364,
            oid: "",
            p: "s",
            pin: "",
            qi: "",
            qs: "",
            v: "3.2.1.1"
        };
        const _0x1a65c5 = {
            tdHash: "dcb1f95eb3274ea89fd36d01730c1757",
            contextName: "webgl,experimental-webgl",
            webglversion: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
            shadingLV: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
            vendor: "WebKit",
            renderer: "WebKit WebGL",
            extensions: ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_half_float", "EXT_float_blend", "EXT_texture_filter_anisotropic", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_depth_texture", "WEBGL_lose_context", "WEBGL_multi_draw"],
            wuv: "Qualcomm",
            wur: "Adreno (TM) 650"
        };
        const _0x5bf6da = {
            compatMode: "BackCompat"
        };
        const _0x230d97 = {
            devicePixelRatio: 2.75,
            screenTop: 0,
            screenLeft: 0
        };
        const _0x1d5e7d = {
            availHeight: 873,
            availWidth: 393,
            colorDepth: 24,
            height: 873,
            width: 393,
            pixelDepth: 24
        };
        const _0x281599 = {
            cookie: true,
            localStorage: true,
            sessionStorage: true,
            globalStorage: false,
            indexedDB: true
        };

        let _0x423840 = {
            ts: {
                deviceTime: new Date().getTime(),
                deviceEndTime: new Date().getTime() + 111
            },
            ca: _0x1a65c5,
            m: _0x5bf6da,
            fo: ["Bauhaus 93", "Casual"],
            n: {
                vendorSub: "",
                productSub: "20030107",
                vendor: "Google Inc.",
                maxTouchPoints: 5,
                pdfViewerEnabled: false,
                hardwareConcurrency: 8,
                cookieEnabled: true,
                appCodeName: "Mozilla",
                appName: "Netscape",
                appVersion: "",
                platform: "Linux armv8l",
                product: "Gecko",
                userAgent: "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
                language: "zh-CN",
                onLine: true,
                webdriver: false,
                javaEnabled: false,
                deviceMemory: 4,
                enumerationOrder: ["sendBeacon", "vendorSub", "productSub", "vendor", "maxTouchPoints", "scheduling", "userActivation", "doNotTrack", "geolocation", "connection", "plugins", "mimeTypes", "pdfViewerEnabled", "webkitTemporaryStorage", "webkitPersistentStorage", "hardwareConcurrency", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "userAgent", "language", "languages", "onLine", "webdriver", "getGamepads", "javaEnabled", "vibrate", "clipboard", "credentials", "keyboard", "managed", "mediaDevices", "storage", "serviceWorker", "virtualKeyboard", "wakeLock", "deviceMemory", "contacts", "ink", "locks", "mediaCapabilities", "gpu", "clearAppBadge", "getBattery", "getUserMedia", "requestMIDIAccess", "requestMediaKeySystemAccess", "setAppBadge", "webkitGetUserMedia"]
            },
            p: [],
            w: _0x230d97,
            s: _0x1d5e7d,
            sc: {
                ActiveBorder: "rgb(118, 118, 118)",
                ActiveCaption: "rgb(0, 0, 0)",
                AppWorkspace: "rgb(255, 255, 255)",
                Background: "rgb(255, 255, 255)",
                ButtonFace: "rgb(239, 239, 239)",
                ButtonHighlight: "rgb(239, 239, 239)",
                ButtonShadow: "rgb(239, 239, 239)",
                ButtonText: "rgb(0, 0, 0)",
                CaptionText: "rgb(0, 0, 0)",
                GrayText: "rgb(128, 128, 128)",
                Highlight: "rgb(181, 213, 255)",
                HighlightText: "rgb(0, 0, 0)",
                InactiveBorder: "rgb(118, 118, 118)",
                InactiveCaption: "rgb(255, 255, 255)",
                InactiveCaptionText: "rgb(128, 128, 128)",
                InfoBackground: "rgb(255, 255, 255)",
                InfoText: "rgb(0, 0, 0)",
                Menu: "rgb(255, 255, 255)",
                MenuText: "rgb(0, 0, 0)",
                Scrollbar: "rgb(255, 255, 255)",
                ThreeDDarkShadow: "rgb(118, 118, 118)",
                ThreeDFace: "rgb(239, 239, 239)",
                ThreeDHighlight: "rgb(118, 118, 118)",
                ThreeDLightShadow: "rgb(118, 118, 118)",
                ThreeDShadow: "rgb(118, 118, 118)",
                Window: "rgb(255, 255, 255)",
                WindowFrame: "rgb(118, 118, 118)",
                WindowText: "rgb(0, 0, 0)"
            },
            ss: _0x281599,
            tz: -480,
            lil: "",
            wil: ""
        },
            _0x1d6d36 = this.TDEncrypt(_0x423840),
            _0x289b65 = "https://gia.jd.com/jsTk.do?a=" + this.TDEncrypt(_0x28fdfa);

        const _0x358b23 = {
            d: _0x1d6d36
        };
        const _0x395c04 = {
            d: _0x1d6d36
        };
        let {
            status: _0x4975c7,
            data: _0x1371dd
        } = await _0x21a843({
            url: _0x289b65,
            method: "POST",
            data: Object.keys(_0x358b23).map(_0x230ea0 => _0x230ea0 + "=" + encodeURIComponent(_0x395c04[_0x230ea0])).join("&")
        });

        if (_0x4975c7 === 200 && _0x1371dd.data) {
            return _0x1371dd.data;
        } else {
            return null;
        }
    }

    get_agent() {
        let _0x1e8183 = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA";
        const _0x4054a1 = {
            ciphers: _0x1e8183,
            minVersion: "TLSv1.3"
        };
        return new _0x402daf.Agent(_0x4054a1);
    }

    cpstr = "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256";

    Check_Login(_0x2327fe, _0x3d52f3) {
        return new Promise(_0x255175 => {
            const _0x24286a = {
                url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                headers: {},
                timeout: 10000
            };
            _0x24286a.headers.Cookie = _0x2327fe;
            _0x24286a.headers.referer = "https://h5.m.jd.com/";
            _0x24286a.headers["User-Agent"] = _0x3d52f3;
            $.get(_0x24286a, (_0x4e04b0, _0x4b2bae, _0x1051b5) => {
                try {
                    if (_0x1051b5) {
                        _0x1051b5 = JSON.parse(_0x1051b5);

                        if (!(_0x1051b5.islogin === "1")) {
                            _0x1051b5.islogin === "0" && ($.isLogin = false);
                        }
                    }
                } catch (_0x5d2125) {
                    console.log(_0x5d2125);
                } finally {
                    _0x255175();
                }
            });
        });
    }

    Get_Code() {
        // const _0x4f7b1 = {
        //     url: "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jd50cxj",
        //     timeout: 30000
        // };
        // return new Promise(_0x51e315 => {
        //     $.get(_0x4f7b1, async (_0x10653a, _0x188c29, _0x3c80b0) => {
        //         try {
        //             if (_0x10653a) {
        //                 console.log("\n服务连接失败，终止执行！");
        //                 process.exit(111);
        //             } else {
        //                 if (_0x3c80b0) {
        //                     _0x3c80b0 = JSON.parse(_0x3c80b0);

        //                     if (_0x3c80b0.code === 200) {
        //                         authcode = _0x3c80b0.data;
        //                     }
        //                 }
        //             }
        //         } catch (_0x31014d) {
        //             $.logErr(_0x31014d, _0x188c29);
        //         } finally {
        //             _0x51e315(authcode);
        //         }
        //     });
        // });
        return [];
    }

    Format_Date(_0x45479a) {
        const _0x22fc66 = _0x45479a.getFullYear(),
            _0x99a6c4 = ("0" + (_0x45479a.getMonth() + 1)).slice(-2),
            _0x1fe255 = ("0" + _0x45479a.getDate()).slice(-2),
            _0x22e629 = ("0" + _0x45479a.getHours()).slice(-2),
            _0x1f3b3b = ("0" + _0x45479a.getMinutes()).slice(-2),
            _0x3bcf12 = ("0" + _0x45479a.getSeconds()).slice(-2);

        return _0x22fc66 + "/" + _0x99a6c4 + "/" + _0x1fe255 + " " + _0x22e629 + ":" + _0x1f3b3b + ":" + _0x3bcf12;
    }

    jsonfomat(_0x4e1ef0) {
        if (typeof _0x4e1ef0 == "string") {
            try {
                return JSON.parse(_0x4e1ef0);
            } catch (_0x3c5095) {
                console.log(_0x3c5095);
                $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
                return [];
            }
        }
    }

    aesDecrypt(_0x4cce5f) {
        let _0x4ab7d6 = _0x107e00.enc.Utf8.parse("40d9d9a0b49d1384"),
            _0x473497 = _0x107e00.enc.Utf8.parse("1111111111111111"),
            _0x3c6cc1 = _0x107e00.enc.Hex.parse(_0x4cce5f),
            _0x2adec4 = _0x107e00.enc.Base64.stringify(_0x3c6cc1),
            _0x2512f1 = _0x107e00.AES.decrypt(_0x2adec4, _0x4ab7d6, {
                iv: _0x473497,
                mode: _0x107e00.mode.CBC,
                padding: _0x107e00.pad.Pkcs7
            }),
            _0x4e888e = _0x2512f1.toString(_0x107e00.enc.Utf8);

        return _0x4e888e.toString();
    }

    aesEncrypt(_0x268c14) {
        let _0x3d5711 = _0x107e00.enc.Utf8.parse("40d9d9a0b49d1384"),
            _0x155503 = _0x107e00.enc.Utf8.parse(_0x268c14),
            _0x46c74d = _0x107e00.AES.encrypt(_0x155503, _0x3d5711, {
                iv: _0x107e00.enc.Utf8.parse("1111111111111111".substr(0, 16)),
                mode: _0x107e00.mode.CBC,
                padding: _0x107e00.pad.Pkcs7
            });

        return _0x46c74d.ciphertext.toString();
    }

    getUA() {
        const _0x1cf312 = {
            A: "K",
            B: "L",
            C: "M",
            D: "N",
            E: "O",
            F: "P",
            G: "Q",
            H: "R",
            I: "S",
            J: "T",
            K: "A",
            L: "B",
            M: "C",
            N: "D",
            O: "E",
            P: "F",
            Q: "G",
            R: "H",
            S: "I",
            T: "J",
            e: "o",
            f: "p",
            g: "q",
            h: "r",
            i: "s",
            j: "t",
            k: "u",
            l: "v",
            m: "w",
            n: "x",
            o: "e",
            p: "f",
            q: "g",
            r: "h",
            s: "i",
            t: "j",
            u: "k",
            v: "l",
            w: "m",
            x: "n"
        };
        let _0x2e89fe = ["MI9 Build/QKQ1.190825.002", "MI8 Build/OPM1.171019.026", "HLK-AL00 Build/HONORHLK-AL00", "SM-G9750 Build/QP1A.190711.020", "LIO-AL00 Build/HUAWEILIO-AL00", "ELE-AL00 Build/HUAWEIELE-AL00", "ANE-AL00 Build/HUAWEIANE-AL00", "22021211RC Build/SKQ1.211006.001"],
            _0xf76f3a = ["9", "10", "11", "12", "13"],
            _0x3727c7 = ["11.2.8", "11.2.6", "11.2.5", "11.2.4", "11.2.3", "11.1.4", "11.1.3", "11.2.0", "11.3.0"],
            _0x1dea2a = ["98413", "98416", "98415", "98417", "98450", "98527"];
        $.dv = _0x2e89fe[Math.floor(Math.random() * _0x2e89fe.length)];
        $.iv = _0xf76f3a[Math.floor(Math.random() * _0xf76f3a.length)];
        $.av = _0x3727c7[Math.floor(Math.random() * _0x3727c7.length)];
        $.bv = _0x1dea2a[Math.floor(Math.random() * _0x1dea2a.length)];

        getstr = function (_0x490bf8) {
            let _0x1f9c0f = "",
                _0x35ec81 = "0123456789abcdef";

            for (let _0x23ae59 = 0; _0x23ae59 < _0x490bf8; _0x23ae59++) {
                let _0x12b3ea = Math.round(Math.random() * (_0x35ec81.length - 1));

                _0x1f9c0f += _0x35ec81.substring(_0x12b3ea, _0x12b3ea + 1);
            }

            return _0x1f9c0f;
        };

        let _0x1d4f0d = Buffer.from(getstr(16)).toString("base64"),
            _0x2784dc = Buffer.from(getstr(16)).toString("base64"),
            _0x123ff5 = Buffer.from($.iv).toString("base64").split("").map(_0x13fc2a => _0x1cf312[_0x13fc2a] || _0x13fc2a).join(""),
            _0x278a7c = Buffer.from("31").toString("base64").split("").map(_0x1da9e4 => _0x1cf312[_0x1da9e4] || _0x1da9e4).join("");

        _0x2784dc = _0x2784dc.split("").map(_0x3b676b => _0x1cf312[_0x3b676b] || _0x3b676b).join("");
        _0x1d4f0d = _0x1d4f0d.split("").map(_0x3bc914 => _0x1cf312[_0x3bc914] || _0x3bc914).join("");
        const _0x3cfc12 = {
            sv: _0x123ff5,
            ad: _0x1d4f0d,
            od: _0x2784dc,
            ov: _0x278a7c,
            ud: _0x1d4f0d
        };

        let _0x3b98ff = encodeURIComponent(JSON.stringify({
            hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            ts: Date.now(),
            ridx: -1,
            cipher: _0x3cfc12,
            ciphertype: 5,
            version: "1.2.0",
            appname: "com.jingdong.app.mall"
        }));

        $.UA = "jdapp;android;" + $.av + ";;;appBuild/" + $.bv + ";ef/1;ep/" + _0x3b98ff + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android " + $.iv + "; " + $.dv + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36";
    }

    UUID(_0x367feb = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x4c5c4d = 0) {
        let _0x32d5a8 = "";
        return _0x367feb.replace(/[xy]/g, function (_0xca2229) {
            var _0x5effa6 = Math.random() * 16 | 0,
                _0x145dbd = _0xca2229 == "x" ? _0x5effa6 : _0x5effa6 & 3 | 8;

            if (_0x4c5c4d) {
                _0x32d5a8 = _0x145dbd.toString(36).toUpperCase();
            } else {
                _0x32d5a8 = _0x145dbd.toString(36);
            }

            return _0x32d5a8;
        });
    }

    jsonParse(_0x51395a) {
        try {
            _0x51395a = JSON.parse(_0x51395a);
        } catch (_0x3fb591) {
            let _0x42b420 = match([/^try\s*\{\s*\n*\s*(\w+)/, /^(\w+)\s*\n*\s*\(/], _0x51395a);

            if (_0x42b420) {
                let _0x12c9da = "",
                    _0x1209fd = _0x51395a.replace(_0x42b420, "tempdata=");

                eval(_0x1209fd);
                _0x12c9da && (_0x51395a = _0x12c9da);
            }
        }

        return _0x51395a;
    }

    dymatch(_0x22007a, _0x38ec9f) {
        _0x22007a = _0x22007a instanceof Array ? _0x22007a : [_0x22007a];

        for (let _0x3163c3 of _0x22007a) {
            let _0x15d320 = _0x3163c3.exec(_0x38ec9f);

            if (_0x15d320) {
                let _0x47d969 = _0x15d320.length;

                if (_0x47d969 == 1) {
                    return _0x15d320;
                } else {
                    if (_0x47d969 == 2) {
                        return _0x15d320[1];
                    } else {
                        let _0x40b143 = [];

                        for (let _0x31ea5a = 1; _0x31ea5a < _0x47d969; _0x31ea5a++) {
                            _0x40b143.push(_0x15d320[_0x31ea5a]);
                        }

                        return _0x40b143;
                    }
                }

                break;
            }
        }

        return "";
    }

    getExtract(_0x59d3ba) {
        const _0x1d349e = (_0x87a425, _0x44d98b) => Math.floor(Math.random() * (_0x44d98b - _0x87a425) + _0x87a425);

        let _0x240877 = _0x1d349e(0, _0x59d3ba.length);

        return _0x59d3ba.splice(_0x240877, 1);
    }

}

module.exports = new _0x4ac699();