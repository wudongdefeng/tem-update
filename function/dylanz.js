const _0x153b87 = require("crypto-js"),
    _0x16cefb = require("got"),
    _0x177cc3 = {};

function _0x4fbe48() {
    var _0x507116,
        _0x518cd5 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x258af8 = _0x518cd5.size,
        _0x3de791 = "undefined" === _0x258af8 ? 10 : _0x258af8,
        _0x410f8d = _0x518cd5.num,
        _0x388d22 = "";

    if (_0x410f8d && "string" == typeof _0x410f8d) {
        _0x507116 = _0x410f8d;
    }

    for (; _0x3de791--;) {
        _0x388d22 += _0x507116[Math.floor(Math.random() * _0x507116.length)];
    }

    return _0x388d22;
}

function _0x4981c6(_0xdd1017) {
    let _0x2f1565 = _0xdd1017.type,
        _0x1939ec = "",
        _0x21d6f3 = _0xdd1017.customDict;

    if (_0x21d6f3 && "string" == typeof _0x21d6f3) {
        _0x2f1565 = _0x21d6f3;
    } else {
        switch (_0x2f1565) {
            case "alphabet":
                _0x2f1565 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;

            case "max":
                _0x2f1565 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
                break;

            case "number":
            default:
                _0x2f1565 = "0123456789";
        }
    }

    for (; _0xdd1017.size--;) {
        _0x1939ec += _0x2f1565[Math.random() * _0x2f1565.length | 0];
    }

    return _0x1939ec;
}

function _0x412b2f() {
    var _0x185a63 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x81118f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x4d4c67 = new Date(_0x185a63),
        _0x420ea7 = _0x81118f,
        _0x1b81f9 = {
            "M+": _0x4d4c67.getMonth() + 1,
            "d+": _0x4d4c67.getDate(),
            "D+": _0x4d4c67.getDate(),
            "h+": _0x4d4c67.getHours(),
            "H+": _0x4d4c67.getHours(),
            "m+": _0x4d4c67.getMinutes(),
            "s+": _0x4d4c67.getSeconds(),
            "w+": _0x4d4c67.getDay(),
            "q+": Math.floor((_0x4d4c67.getMonth() + 3) / 3),
            "S+": _0x4d4c67.getMilliseconds()
        };

    /(y+)/i.test(_0x420ea7) && (_0x420ea7 = _0x420ea7.replace(RegExp.$1, "".concat(_0x4d4c67.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x1b81f9).forEach(function (_0x300e93) {
        if (new RegExp("(".concat(_0x300e93, ")")).test(_0x420ea7)) {
            var _0x532ac3 = "S+" === _0x300e93 ? "000" : "00";

            _0x420ea7 = _0x420ea7.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1b81f9[_0x300e93] : "".concat(_0x532ac3).concat(_0x1b81f9[_0x300e93]).substr("".concat(_0x1b81f9[_0x300e93]).length));
        }
    });
    return _0x420ea7;
}

function _0x508ec5(_0x5d7fb9, _0x1a4e8e, _0x5c2539, _0x3bd016) {
    let _0x3a928e = {
        version: "4.1",
        fp: _0x1a4e8e,
        appId: _0x5d7fb9,
        timestamp: Date.now(),
        platform: "applet",
        expandParams: ""
    };
    _0x3a928e.expandParams = _0x3bd016 || "";
    const _0x5b3ba3 = {
        Host: "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x5c2539
    };
    let _0xc5fe37 = {
        url: "https://cactus.jd.com/request_algo?g_ty=ajax",
        body: JSON.stringify(_0x3a928e),
        headers: _0x5b3ba3,
        timeout: 30000
    };
    return new Promise(async _0x451e65 => {
        _0x5dd2b9(_0xc5fe37, (_0x363486, _0x9684c2, _0x57b105) => {
            try {
                if (_0x363486) {
                    console.log("" + JSON.stringify(_0x363486));
                    console.log("algo请求失败，请检查网路重试");
                } else {
                    _0x57b105 = JSON.parse(_0x57b105);
                    _0x57b105 = _0x57b105.data.result;
                }
            } catch (_0x3d8380) {
                console(_0x3d8380, _0x9684c2);
            } finally {
                _0x451e65(_0x57b105);
            }
        });
    });
}

function _0x3a6d2a(_0x4371cc) {
    let _0x1c3de4 = _0x4371cc.size,
        _0x1908dd = _0x4371cc.num,
        _0x4a3019 = _0x1908dd,
        _0xfad51 = "";

    for (; _0x1c3de4--;) {
        _0xfad51 += _0x4a3019[Math.random() * _0x4a3019.length | 0];
    }

    return _0xfad51;
}

function _0x5635d3(_0x3519ae, _0x30f1c8) {
    for (let _0x1e1066 = 0; _0x1e1066 < _0x30f1c8.length; _0x1e1066++) {
        let _0x3c05ae = _0x3519ae.indexOf(_0x30f1c8[_0x1e1066]);

        _0x3c05ae !== -1 && (_0x3519ae = _0x3519ae.replace(_0x30f1c8[_0x1e1066], ""));
    }

    return _0x3519ae;
}

function _0x6e6844(_0x1b8126, _0x37ef57) {
    let _0x5850df = [],
        _0x269fa6 = _0x1b8126.length;

    for (let _0x3e1862 = 0; _0x3e1862 < 10; _0x3e1862++) {
        let _0x363ea7 = _0x1b8126[_0x3e1862];

        if (Math.random() * _0x269fa6 < _0x37ef57 && (_0x5850df.push(_0x363ea7), --_0x37ef57 == 0)) {
            break;
        }

        _0x269fa6--;
    }

    let _0x32da1a = "";

    for (let _0x1f44fc = 0; _0x1f44fc < _0x5850df.length; _0x1f44fc++) {
        let _0xd9c4fa = Math.random() * (_0x5850df.length - _0x1f44fc) | 0;

        _0x32da1a += _0x5850df[_0xd9c4fa];
        _0x5850df[_0xd9c4fa] = _0x5850df[_0x5850df.length - _0x1f44fc - 1];
    }

    return _0x32da1a;
}

function _0x240f8e() {
    let _0x51064a = "uct6d0jhqw",
        _0x2b9e96 = _0x6e6844(_0x51064a, 6),
        _0x98cc6d = Math.random() * 10 | 0,
        _0x28db78 = _0x5635d3(_0x51064a, _0x2b9e96),
        _0x585447 = {};

    _0x585447.size = _0x98cc6d;
    _0x585447.num = _0x28db78;

    let _0xd3432e = _0x3a6d2a(_0x585447) + _0x2b9e96 + _0x3a6d2a({
        size: 10 - _0x98cc6d - 1,
        num: _0x28db78
    }) + _0x98cc6d,
        _0x193478 = _0xd3432e.split(""),
        _0x55164f = _0x193478.slice(0, 14),
        _0xe122c3 = _0x193478.slice(14),
        _0x3718d8 = [];

    for (; _0x55164f.length > 0;) {
        _0x3718d8.push((35 - parseInt(_0x55164f.pop(), 36)).toString(36));
    }

    _0x3718d8 = _0x3718d8.concat(_0xe122c3);

    let _0x1b566c = _0x3718d8.join("");

    return _0x1b566c;
}

function _0xb40d13(_0x5072b3) {
    let _0x36afe9 = _0x5072b3.size,
        _0x43c086 = _0x5072b3.num,
        _0xad84c2 = "";

    for (; _0x36afe9--;) {
        _0xad84c2 += _0x43c086[Math.random() * _0x43c086.length | 0];
    }

    return _0xad84c2;
}

async function _0x2b5e46() {
    let {
        body: _0x142895,
        ua: _0x50e893,
        user: _0x29e2a0,
        ver: _0xcbbb12,
        cl: _0x5874e8,
        fn: _0x4d085b,
        appId: _0x1676e8,
        code: _0x76ed07,
        apid: _0x4e6ad5,
        xcr: _0x168625,
        nco: _0x1bf75a
    } = arguments[0];
    const _0xaa049f = {
        size: 10,
        type: "max"
    };

    let _0x429614 = _0x4981c6(_0xaa049f);

    const _0x251a77 = {
        size: 10,
        type: "max"
    };

    let _0x27ae60 = _0x4981c6(_0x251a77);

    (!_0x177cc3[_0x1676e8] || _0x168625) && (_0x177cc3[_0x1676e8] = {}, _0x177cc3[_0x1676e8].fp = _0x240f8e());
    _0x142895 = typeof _0x142895 !== "string" ? JSON.stringify(_0x142895) : _0x142895;
    let _0x3d6ab7 = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
        _0x481a83 = {};
    const _0x2683ff = {
        p1: _0x29e2a0
    };
    let _0x5e0082 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x50e893, _0x50e893.match(/\(([^\)]+)\)/)[1], _0x2683ff, "", 393, 873, 393, 779, "", "", 2.75, "", _0x429614];

    for (let _0xdbdb40 in _0x3d6ab7) {
        _0x481a83[_0x3d6ab7[_0xdbdb40]] = _0x5e0082[_0xdbdb40];
    }

    const _0x5954d9 = {
        referer: "",
        v: "v3.2.0",
        ai: _0x1676e8,
        fp: _0x177cc3[_0x1676e8].fp
    };
    const _0x318241 = {
        ..._0x481a83,
        ..._0x5954d9
    };

    let _0x29052a = _0x318241,
        _0x5e752d = _0x153b87.AES.encrypt(JSON.stringify(_0x29052a, null, 2), _0x153b87.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            iv: _0x153b87.enc.Utf8.parse("0102030405060708"),
            mode: _0x153b87.mode.CBC,
            padding: _0x153b87.pad.Pkcs7
        }),
        _0x2bc7dc = _0x5e752d.ciphertext.toString(),
        _0x1efb78 = new Date().getTime();

    if (!_0x177cc3[_0x1676e8].tk || _0x168625) {
        let _0x151502 = await _0x508ec5(_0x1676e8, _0x177cc3[_0x1676e8].fp, _0x50e893, _0x2bc7dc);

        if (!_0x151502) {
            _0x151502 = await _0x508ec5(_0x1676e8, _0x177cc3[_0x1676e8].fp, _0x50e893, _0x2bc7dc);
        }

        if (!_0x151502) {
            return "functionId=" + _0x4d085b + "&appid=" + _0x4e6ad5 + "&body=" + _0x142895;
        }

        _0x177cc3[_0x1676e8].tk = _0x151502.tk;
        _0x177cc3[_0x1676e8].algo = _0x151502.algo;
    }

    let _0xfcc64a = new Date().getTime(),
        _0x7ce054 = _0x412b2f(_0xfcc64a, "yyyyMMddhhmmssSSS"),
        _0x472918 = _0x177cc3[_0x1676e8].tk,
        _0x692dec = new Function("return " + _0x177cc3[_0x1676e8].algo)(),
        _0x16a40a = _0x7ce054 + "04",
        _0x4f7101 = await _0x692dec(_0x472918, _0x177cc3[_0x1676e8].fp, _0x16a40a, _0x1676e8, _0x153b87).toString();

    const _0xedc88a = {
        appid: _0x4e6ad5,
        functionId: _0x4d085b,
        body: _0x142895
    };
    _0x76ed07 && (_0xedc88a.t = _0x1efb78);
    _0xcbbb12 && (_0xedc88a.clientVersion = _0xcbbb12);
    _0x5874e8 && (_0xedc88a.client = _0x5874e8);

    let _0x58606d = _0xedc88a,
        _0x5ed848 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x4ceac6 = _0x5ed848.filter(_0x3f2d6c => _0xedc88a[_0x3f2d6c]).map(_0x855591 => _0x855591 + ":" + (_0x855591 == "body" ? _0x153b87.SHA256(_0xedc88a[_0x855591]).toString() : _0xedc88a[_0x855591])).join("&"),
        _0x5868b8 = Date.now() > "1714520158000" ? _0x153b87.MD5(_0x4ceac6).toString(_0x153b87.enc.Hex) : _0x153b87.MD5(_0x4f7101 + _0x4ceac6 + _0x4f7101).toString(_0x153b87.enc.Hex),
        _0x18fd85 = "",
        _0x18d684 = {};

    _0x18d684.sua = _0x50e893.match(/\(([^\)]+)\)/)[1];
    _0x18d684.pp = {};
    _0x18d684.fp = _0x177cc3[_0x1676e8].fp;
    _0x18d684.pp.p1 = _0x29e2a0;
    _0x18d684.random = _0x27ae60;
    _0x18d684.referer = "";
    _0x18d684.v = "v3.2.0";

    let _0x457a32 = _0x153b87.AES.encrypt(JSON.stringify(_0x18d684, null, 2), _0x153b87.enc.Utf8.parse("HL4|FW#Chc3#q?0)"), {
        iv: _0x153b87.enc.Utf8.parse("0102030405060708"),
        mode: _0x153b87.mode.CBC,
        padding: _0x153b87.pad.Pkcs7
    });

    _0x18fd85 = _0x457a32.ciphertext.toString();

    let _0x572dbf = [_0x7ce054, _0x177cc3[_0x1676e8].fp, _0x1676e8, _0x472918, _0x5868b8, 4.1, _0xfcc64a, _0x18fd85].join(";"),
        _0x1af32a = Object.entries(_0x58606d).map(([_0x12ba8c, _0x33b885]) => _0x12ba8c + "=" + (typeof _0x33b885 == "string" ? encodeURIComponent(_0x33b885) : encodeURIComponent(JSON.stringify(_0x33b885)))).join("&");

    return _0x1af32a + "&h5st=" + encodeURIComponent(_0x572dbf);
}

function _0x5dd2b9(_0xdfada8, _0x805516 = () => { }) {
    const {
        url: _0x55ad4d,
        ..._0x27a967
    } = _0xdfada8;
    _0x16cefb.post(_0x55ad4d, _0x27a967).then(_0x34026e => {
        const {
            statusCode: _0x287b26,
            statusCode: _0x18a37e,
            headers: _0x18c34e,
            body: _0x91b392
        } = _0x34026e,
            _0x1c48c7 = {
                status: _0x287b26,
                statusCode: _0x18a37e,
                headers: _0x18c34e,
                body: _0x91b392
            };

        _0x805516(null, _0x1c48c7, _0x91b392);
    }, _0xf77779 => {
        const {
            message: _0x1b4059,
            response: _0x4aba1f
        } = _0xf77779;

        _0x805516(_0x1b4059, _0x4aba1f, _0x4aba1f && _0x4aba1f.body);
    });
}

class _0x5de1a4 {
    constructor(_0x1e205b, _0x480008, _0x2ac13a) {
        this.appId = _0x1e205b;
        this.ua = _0x480008;
        this.fp = _0x2ac13a || this.__genFp();
    }

    __genFp() {
        let _0x50f0df = "0123456789",
            _0x145b2b = 13,
            _0x5cb16a = "";

        for (; _0x145b2b--;) {
            _0x5cb16a += _0x50f0df[Math.random() * _0x50f0df.length | 0];
        }

        return (_0x5cb16a + Date.now()).slice(0, 16);
    }

    async __genAlgo() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x49c768
        } = await axios.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
            version: "3.0",
            fp: this.fp,
            appId: this.appId.toString(),
            timestamp: this.time,
            platform: "web",
            expandParams: ""
        }, {
            headers: {
                Host: "cactus.jd.com",
                accept: "application/json",
                "content-type": "application/json",
                "user-agent": this.ua
            }
        });
        this.tk = _0x49c768.data.result.tk;
        this.rd = _0x49c768.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x49c768.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    __genKey(_0x4cf1f1, _0x5d3a5d, _0x134069, _0x881064, _0x57764c) {
        let _0x17be66 = "" + _0x4cf1f1 + _0x5d3a5d + _0x134069 + _0x881064 + this.rd;

        return _0x57764c[this.enc](_0x17be66, _0x4cf1f1);
    }

    __genH5st(_0x54ea9d) {
        let _0x379a4b = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
            _0x1f9cea = "";

        for (let _0x2a0b25 of Object.keys(_0x54ea9d)) {
            _0x2a0b25 === "body" ? _0x1f9cea += _0x2a0b25 + ":" + CryptoJS.SHA256(_0x54ea9d[_0x2a0b25]).toString(CryptoJS.enc.Hex) + "&" : _0x1f9cea += _0x2a0b25 + ":" + _0x54ea9d[_0x2a0b25] + "&";
        }

        _0x1f9cea = _0x1f9cea.slice(0, -1);
        _0x1f9cea = CryptoJS.HmacSHA256(_0x1f9cea, _0x379a4b).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this.appId.toString() + ";" + this.tk + ";" + _0x1f9cea + ";3.0;" + this.time.toString());
    }

}

const _0x1357a8 = {
    getbody: _0x2b5e46,
    H5ST: _0x5de1a4
};
module.exports = _0x1357a8;