const _0x204c29 = require("crypto-js"),
    _0x2df9ec = require("got"),
    _0x3448b6 = {};

function _0x5c0246() {
    var _0x7e0080,
        _0x29c835 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x3d2b4b = _0x29c835.size,
        _0x2a72f5 = "undefined" === _0x3d2b4b ? 10 : _0x3d2b4b,
        _0x1fd4f1 = _0x29c835.num,
        _0x329f8b = "";

    if (_0x1fd4f1 && "string" == typeof _0x1fd4f1) {
        _0x7e0080 = _0x1fd4f1;
    }

    for (; _0x2a72f5--;) {
        _0x329f8b += _0x7e0080[Math.floor(Math.random() * _0x7e0080.length)];
    }

    return _0x329f8b;
}

function _0x5e7e74(_0x2ff1f0) {
    let _0x5343e8 = _0x2ff1f0.type,
        _0x5c5e2a = "",
        _0x29ebae = _0x2ff1f0.customDict;

    if (_0x29ebae && "string" == typeof _0x29ebae) {
        _0x5343e8 = _0x29ebae;
    } else {
        switch (_0x5343e8) {
            case "alphabet":
                _0x5343e8 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;

            case "max":
                _0x5343e8 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
                break;

            case "number":
            default:
                _0x5343e8 = "0123456789";
        }
    }

    for (; _0x2ff1f0.size--;) {
        _0x5c5e2a += _0x5343e8[Math.random() * _0x5343e8.length | 0];
    }

    return _0x5c5e2a;
}

function _0x4e6299() {
    var _0x16b767 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x43ad7c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0xb25fa8 = new Date(_0x16b767),
        _0x4a5827 = _0x43ad7c,
        _0x3c36f4 = {
            "M+": _0xb25fa8.getMonth() + 1,
            "d+": _0xb25fa8.getDate(),
            "D+": _0xb25fa8.getDate(),
            "h+": _0xb25fa8.getHours(),
            "H+": _0xb25fa8.getHours(),
            "m+": _0xb25fa8.getMinutes(),
            "s+": _0xb25fa8.getSeconds(),
            "w+": _0xb25fa8.getDay(),
            "q+": Math.floor((_0xb25fa8.getMonth() + 3) / 3),
            "S+": _0xb25fa8.getMilliseconds()
        };

    /(y+)/i.test(_0x4a5827) && (_0x4a5827 = _0x4a5827.replace(RegExp.$1, "".concat(_0xb25fa8.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x3c36f4).forEach(function (_0x267493) {
        if (new RegExp("(".concat(_0x267493, ")")).test(_0x4a5827)) {
            var _0x224ab4 = "S+" === _0x267493 ? "000" : "00";

            _0x4a5827 = _0x4a5827.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3c36f4[_0x267493] : "".concat(_0x224ab4).concat(_0x3c36f4[_0x267493]).substr("".concat(_0x3c36f4[_0x267493]).length));
        }
    });
    return _0x4a5827;
}

function _0x550c20(_0x4640d6, _0x4dbf2d, _0x511695, _0x31d04e) {
    let _0x2293a2 = {
        version: "4.1",
        fp: _0x4dbf2d,
        appId: _0x4640d6,
        timestamp: Date.now(),
        platform: "applet",
        expandParams: ""
    };
    _0x2293a2.expandParams = _0x31d04e || "";
    const _0x5edeab = {
        Host: "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x511695
    };
    let _0x3eb159 = {
        url: "https://cactus.jd.com/request_algo?g_ty=ajax",
        body: JSON.stringify(_0x2293a2),
        headers: _0x5edeab,
        timeout: 30000
    };
    return new Promise(async _0x43b714 => {
        _0x2ddedb(_0x3eb159, (_0x2295fb, _0xcf2cd1, _0x3040f1) => {
            try {
                _0x2295fb ? (console.log("" + JSON.stringify(_0x2295fb)), console.log("algo请求失败，请检查网路重试")) : (_0x3040f1 = JSON.parse(_0x3040f1), _0x3040f1 = _0x3040f1.data.result);
            } catch (_0x3f3bf2) {
                console(_0x3f3bf2, _0xcf2cd1);
            } finally {
                _0x43b714(_0x3040f1);
            }
        });
    });
}

function _0x43a38f(_0x32cabd) {
    let _0x348876 = _0x32cabd.size,
        _0x1a7028 = _0x32cabd.num,
        _0x3e1180 = _0x1a7028,
        _0x494391 = "";

    for (; _0x348876--;) {
        _0x494391 += _0x3e1180[Math.random() * _0x3e1180.length | 0];
    }

    return _0x494391;
}

function _0x1a24bd(_0x211dad, _0x167c2d) {
    for (let _0x1738aa = 0; _0x1738aa < _0x167c2d.length; _0x1738aa++) {
        let _0x634fa = _0x211dad.indexOf(_0x167c2d[_0x1738aa]);

        _0x634fa !== -1 && (_0x211dad = _0x211dad.replace(_0x167c2d[_0x1738aa], ""));
    }

    return _0x211dad;
}

function _0xc2bc22(_0x4f90a0, _0x400bcd) {
    let _0x1783f2 = [],
        _0x16c259 = _0x4f90a0.length;

    for (let _0x468d71 = 0; _0x468d71 < 10; _0x468d71++) {
        let _0x33df0a = _0x4f90a0[_0x468d71];

        if (Math.random() * _0x16c259 < _0x400bcd && (_0x1783f2.push(_0x33df0a), --_0x400bcd == 0)) {
            break;
        }

        _0x16c259--;
    }

    let _0x40cad3 = "";

    for (let _0x3ed467 = 0; _0x3ed467 < _0x1783f2.length; _0x3ed467++) {
        let _0x12a4c3 = Math.random() * (_0x1783f2.length - _0x3ed467) | 0;

        _0x40cad3 += _0x1783f2[_0x12a4c3];
        _0x1783f2[_0x12a4c3] = _0x1783f2[_0x1783f2.length - _0x3ed467 - 1];
    }

    return _0x40cad3;
}

function _0x17d2df() {
    let _0x589138 = "uct6d0jhqw",
        _0x2c95b1 = _0xc2bc22(_0x589138, 6),
        _0x251617 = Math.random() * 10 | 0,
        _0x553768 = _0x1a24bd(_0x589138, _0x2c95b1),
        _0x168cf6 = {};

    _0x168cf6.size = _0x251617;
    _0x168cf6.num = _0x553768;

    let _0x506b16 = _0x43a38f(_0x168cf6) + _0x2c95b1 + _0x43a38f({
        size: 10 - _0x251617 - 1,
        num: _0x553768
    }) + _0x251617,
        _0x30e763 = _0x506b16.split(""),
        _0xd9d44b = _0x30e763.slice(0, 14),
        _0x479c4e = _0x30e763.slice(14),
        _0x13cff1 = [];

    for (; _0xd9d44b.length > 0;) {
        _0x13cff1.push((35 - parseInt(_0xd9d44b.pop(), 36)).toString(36));
    }

    _0x13cff1 = _0x13cff1.concat(_0x479c4e);

    let _0x4a1e3c = _0x13cff1.join("");

    return _0x4a1e3c;
}

function _0x244a45(_0x1c2da0) {
    let _0x5abf71 = _0x1c2da0.size,
        _0x3ee4a9 = _0x1c2da0.num,
        _0x5406c4 = "";

    for (; _0x5abf71--;) {
        _0x5406c4 += _0x3ee4a9[Math.random() * _0x3ee4a9.length | 0];
    }

    return _0x5406c4;
}

async function _0x58e67b() {
    let {
        body: _0x5c38ed,
        ua: _0x4bce16,
        user: _0x4a73ea,
        ver: _0x413ba4,
        cl: _0x2615d4,
        fn: _0x617f18,
        appId: _0xa8ede5,
        code: _0x3896d2,
        apid: _0x1d88f8,
        xcr: _0x134017,
        nco: _0x205f6a
    } = arguments[0];
    const _0x2915e0 = {
        size: 10,
        type: "max"
    };

    let _0x2aa7cf = _0x5e7e74(_0x2915e0);

    const _0x6f2644 = {
        size: 10,
        type: "max"
    };

    let _0x4c601d = _0x5e7e74(_0x6f2644);

    if (!_0x3448b6[_0xa8ede5] || _0x134017) {
        _0x3448b6[_0xa8ede5] = {};
        _0x3448b6[_0xa8ede5].fp = _0x17d2df();
    }

    _0x5c38ed = typeof _0x5c38ed !== "string" ? JSON.stringify(_0x5c38ed) : _0x5c38ed;
    let _0x275cbb = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
        _0x1ef1ed = {};
    const _0x4c296c = {
        p1: _0x4a73ea
    };
    let _0x289a49 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x4bce16, _0x4bce16.match(/\(([^\)]+)\)/)[1], _0x4c296c, "", 393, 873, 393, 779, "", "", 2.75, "", _0x2aa7cf];

    for (let _0x3bdfaf in _0x275cbb) {
        _0x1ef1ed[_0x275cbb[_0x3bdfaf]] = _0x289a49[_0x3bdfaf];
    }

    const _0x13eb3e = {
        referer: "",
        v: "v3.2.0",
        ai: _0xa8ede5,
        fp: _0x3448b6[_0xa8ede5].fp
    };
    const _0x40a45b = {
        ..._0x1ef1ed,
        ..._0x13eb3e
    };

    let _0x5c6037 = _0x40a45b,
        _0x2bc62e = _0x204c29.AES.encrypt(JSON.stringify(_0x5c6037, null, 2), _0x204c29.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            iv: _0x204c29.enc.Utf8.parse("0102030405060708"),
            mode: _0x204c29.mode.CBC,
            padding: _0x204c29.pad.Pkcs7
        }),
        _0x4643bc = _0x2bc62e.ciphertext.toString(),
        _0x3dc089 = new Date().getTime();

    if (!_0x3448b6[_0xa8ede5].tk || _0x134017) {
        let _0x23318e = await _0x550c20(_0xa8ede5, _0x3448b6[_0xa8ede5].fp, _0x4bce16, _0x4643bc);

        if (!_0x23318e) {
            _0x23318e = await _0x550c20(_0xa8ede5, _0x3448b6[_0xa8ede5].fp, _0x4bce16, _0x4643bc);
        }

        if (!_0x23318e) {
            return "functionId=" + _0x617f18 + "&appid=" + _0x1d88f8 + "&body=" + _0x5c38ed;
        }

        _0x3448b6[_0xa8ede5].tk = _0x23318e.tk;
        _0x3448b6[_0xa8ede5].algo = _0x23318e.algo;
    }

    let _0x481cfb = new Date().getTime(),
        _0x24bca0 = _0x4e6299(_0x481cfb, "yyyyMMddhhmmssSSS"),
        _0x424977 = _0x3448b6[_0xa8ede5].tk,
        _0xdcbb45 = new Function("return " + _0x3448b6[_0xa8ede5].algo)(),
        _0x3e165f = _0x24bca0 + "04",
        _0x280944 = await _0xdcbb45(_0x424977, _0x3448b6[_0xa8ede5].fp, _0x3e165f, _0xa8ede5, _0x204c29).toString();

    const _0x4b4450 = {
        appid: _0x1d88f8,
        functionId: _0x617f18,
        body: _0x5c38ed
    };
    _0x3896d2 && (_0x4b4450.t = _0x3dc089);
    _0x413ba4 && (_0x4b4450.clientVersion = _0x413ba4);
    _0x2615d4 && (_0x4b4450.client = _0x2615d4);

    let _0x43909d = _0x4b4450,
        _0x5ca0e8 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x44ca11 = _0x5ca0e8.filter(_0x354b4e => _0x4b4450[_0x354b4e]).map(_0x461f67 => _0x461f67 + ":" + (_0x461f67 == "body" ? _0x204c29.SHA256(_0x4b4450[_0x461f67]).toString() : _0x4b4450[_0x461f67])).join("&"),
        _0x3b3364 = Date.now() > "1709563237000" ? _0x204c29.MD5(_0x44ca11).toString(_0x204c29.enc.Hex) : _0x204c29.MD5(_0x280944 + _0x44ca11 + _0x280944).toString(_0x204c29.enc.Hex),
        _0x28ae96 = "",
        _0x34c938 = {};

    _0x34c938.sua = _0x4bce16.match(/\(([^\)]+)\)/)[1];
    _0x34c938.pp = {};
    _0x34c938.fp = _0x3448b6[_0xa8ede5].fp;
    _0x34c938.pp.p1 = _0x4a73ea;
    _0x34c938.random = _0x4c601d;
    _0x34c938.referer = "";
    _0x34c938.v = "v3.2.0";

    let _0x194304 = _0x204c29.AES.encrypt(JSON.stringify(_0x34c938, null, 2), _0x204c29.enc.Utf8.parse("HL4|FW#Chc3#q?0)"), {
        iv: _0x204c29.enc.Utf8.parse("0102030405060708"),
        mode: _0x204c29.mode.CBC,
        padding: _0x204c29.pad.Pkcs7
    });

    _0x28ae96 = _0x194304.ciphertext.toString();

    let _0x383a02 = [_0x24bca0, _0x3448b6[_0xa8ede5].fp, _0xa8ede5, _0x424977, _0x3b3364, 4.1, _0x481cfb, _0x28ae96].join(";"),
        _0x538faf = Object.entries(_0x43909d).map(([_0xe9c70c, _0x4a1b42]) => _0xe9c70c + "=" + (typeof _0x4a1b42 == "string" ? encodeURIComponent(_0x4a1b42) : encodeURIComponent(JSON.stringify(_0x4a1b42)))).join("&");

    return _0x538faf + "&h5st=" + encodeURIComponent(_0x383a02);
}

function _0x2ddedb(_0x21359d, _0x1eefb1 = () => { }) {
    const {
        url: _0x3b7140,
        ..._0x1035e7
    } = _0x21359d;

    _0x2df9ec.post(_0x3b7140, _0x1035e7).then(_0x1119af => {
        const {
            statusCode: _0x4de5d8,
            statusCode: _0xabf632,
            headers: _0xc10488,
            body: _0xf83318
        } = _0x1119af,
            _0x64d97d = {
                status: _0x4de5d8,
                statusCode: _0xabf632,
                headers: _0xc10488,
                body: _0xf83318
            };

        _0x1eefb1(null, _0x64d97d, _0xf83318);
    }, _0x411e98 => {
        const {
            message: _0xc3843c,
            response: _0x59d190
        } = _0x411e98;

        _0x1eefb1(_0xc3843c, _0x59d190, _0x59d190 && _0x59d190.body);
    });
}

class _0x3da2f2 {
    constructor(_0x1f32e8, _0x3fca76, _0xea2c6b) {
        this.appId = _0x1f32e8;
        this.ua = _0x3fca76;
        this.fp = _0xea2c6b || this.__genFp();
    }

    __genFp() {
        let _0x461879 = "0123456789",
            _0x2ea773 = 13,
            _0x2803a3 = "";

        for (; _0x2ea773--;) {
            _0x2803a3 += _0x461879[Math.random() * _0x461879.length | 0];
        }

        return (_0x2803a3 + Date.now()).slice(0, 16);
    }

    async __genAlgo() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x5369d5
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
        this.tk = _0x5369d5.data.result.tk;
        this.rd = _0x5369d5.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x5369d5.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    __genKey(_0x2462cd, _0x955cb, _0x2e1332, _0x110c13, _0x4ad307) {
        let _0x7058fb = "" + _0x2462cd + _0x955cb + _0x2e1332 + _0x110c13 + this.rd;

        return _0x4ad307[this.enc](_0x7058fb, _0x2462cd);
    }

    __genH5st(_0x147f1c) {
        let _0x5053be = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
            _0xaba915 = "";

        for (let _0x5be9c7 of Object.keys(_0x147f1c)) {
            _0x5be9c7 === "body" ? _0xaba915 += _0x5be9c7 + ":" + CryptoJS.SHA256(_0x147f1c[_0x5be9c7]).toString(CryptoJS.enc.Hex) + "&" : _0xaba915 += _0x5be9c7 + ":" + _0x147f1c[_0x5be9c7] + "&";
        }

        _0xaba915 = _0xaba915.slice(0, -1);
        _0xaba915 = CryptoJS.HmacSHA256(_0xaba915, _0x5053be).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this.appId.toString() + ";" + this.tk + ";" + _0xaba915 + ";3.0;" + this.time.toString());
    }

}

const _0x139fc4 = {
    getbody: _0x58e67b,
    H5ST: _0x3da2f2
};
module.exports = _0x139fc4;