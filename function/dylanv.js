const _0x215573 = require("crypto-js"),
    _0x24ed8b = require("got"),
    _0x2242cb = {};

function _0x5040c3() {
    var _0x5c24e6,
        _0x4b2eee = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x39c819 = _0x4b2eee.size,
        _0x3c0d67 = "undefined" === _0x39c819 ? 10 : _0x39c819,
        _0x583d60 = _0x4b2eee.num,
        _0x384d32 = "";

    if (_0x583d60 && "string" == typeof _0x583d60) {
        _0x5c24e6 = _0x583d60;
    }

    for (; _0x3c0d67--;) {
        _0x384d32 += _0x5c24e6[Math.floor(Math.random() * _0x5c24e6.length)];
    }

    return _0x384d32;
}

function _0x8a8c1d(_0x5f2058) {
    let _0x168f4d = _0x5f2058.type,
        _0x3b7568 = "",
        _0x14dfd9 = _0x5f2058.customDict;

    if (_0x14dfd9 && "string" == typeof _0x14dfd9) {
        _0x168f4d = _0x14dfd9;
    } else {
        switch (_0x168f4d) {
            case "alphabet":
                _0x168f4d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;

            case "max":
                _0x168f4d = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
                break;

            case "number":
            default:
                _0x168f4d = "0123456789";
        }
    }

    for (; _0x5f2058.size--;) {
        _0x3b7568 += _0x168f4d[Math.random() * _0x168f4d.length | 0];
    }

    return _0x3b7568;
}

function _0xeaacc7() {
    var _0x8d1e18 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x5ab0f3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x1f0e30 = new Date(_0x8d1e18),
        _0x41a211 = _0x5ab0f3,
        _0x115178 = {
            "M+": _0x1f0e30.getMonth() + 1,
            "d+": _0x1f0e30.getDate(),
            "D+": _0x1f0e30.getDate(),
            "h+": _0x1f0e30.getHours(),
            "H+": _0x1f0e30.getHours(),
            "m+": _0x1f0e30.getMinutes(),
            "s+": _0x1f0e30.getSeconds(),
            "w+": _0x1f0e30.getDay(),
            "q+": Math.floor((_0x1f0e30.getMonth() + 3) / 3),
            "S+": _0x1f0e30.getMilliseconds()
        };

    /(y+)/i.test(_0x41a211) && (_0x41a211 = _0x41a211.replace(RegExp.$1, "".concat(_0x1f0e30.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x115178).forEach(function (_0x35d303) {
        if (new RegExp("(".concat(_0x35d303, ")")).test(_0x41a211)) {
            var _0x505d6d = "S+" === _0x35d303 ? "000" : "00";

            _0x41a211 = _0x41a211.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x115178[_0x35d303] : "".concat(_0x505d6d).concat(_0x115178[_0x35d303]).substr("".concat(_0x115178[_0x35d303]).length));
        }
    });
    return _0x41a211;
}

function _0x5d0229(_0x3c8a0f, _0x492fe8, _0xb062a7, _0xd41076) {
    let _0x7d5210 = {
        version: "4.2",
        fp: _0x492fe8,
        appId: _0x3c8a0f,
        timestamp: Date.now(),
        platform: "web",
        expandParams: "",
        fv: "h5_npm_v4.2.0"
    };
    _0x7d5210.expandParams = _0xd41076 || "";
    const _0x22f37e = {
        Host: "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0xb062a7
    };
    let _0x15705f = {
        url: "https://cactus.jd.com/request_algo?g_ty=ajax",
        body: JSON.stringify(_0x7d5210),
        headers: _0x22f37e,
        timeout: 30000
    };
    return new Promise(async _0x391572 => {
        _0x331466(_0x15705f, (_0x5c1ecd, _0x1196df, _0x267908) => {
            try {
                if (_0x5c1ecd) {
                    console.log("" + JSON.stringify(_0x5c1ecd));
                    console.log("algo请求失败，请检查网路重试");
                } else {
                    _0x267908 = JSON.parse(_0x267908);
                    _0x267908 = _0x267908.data.result;
                }
            } catch (_0x28e006) {
                console(_0x28e006, _0x1196df);
            } finally {
                _0x391572(_0x267908);
            }
        });
    });
}

function _0x13fbc0(_0x37749c) {
    let _0x1e1d26 = _0x37749c.size,
        _0x4d4a42 = _0x37749c.num,
        _0xa8da87 = _0x4d4a42,
        _0x4b4752 = "";

    for (; _0x1e1d26--;) {
        _0x4b4752 += _0xa8da87[Math.random() * _0xa8da87.length | 0];
    }

    return _0x4b4752;
}

function _0x4f94cb(_0x56d11d, _0x4a92a5) {
    for (let _0x45acfe = 0; _0x45acfe < _0x4a92a5.length; _0x45acfe++) {
        let _0x5d95ef = _0x56d11d.indexOf(_0x4a92a5[_0x45acfe]);

        _0x5d95ef !== -1 && (_0x56d11d = _0x56d11d.replace(_0x4a92a5[_0x45acfe], ""));
    }

    return _0x56d11d;
}

function _0x31364f(_0x4849d7, _0x9eea24) {
    let _0x289972 = [],
        _0x33184e = _0x4849d7.length;

    for (let _0x4c6052 = 0; _0x4c6052 < 10; _0x4c6052++) {
        let _0x3f4f82 = _0x4849d7[_0x4c6052];

        if (Math.random() * _0x33184e < _0x9eea24 && (_0x289972.push(_0x3f4f82), --_0x9eea24 == 0)) {
            break;
        }

        _0x33184e--;
    }

    let _0x1a9294 = "";

    for (let _0x322ee2 = 0; _0x322ee2 < _0x289972.length; _0x322ee2++) {
        let _0x514854 = Math.random() * (_0x289972.length - _0x322ee2) | 0;

        _0x1a9294 += _0x289972[_0x514854];
        _0x289972[_0x514854] = _0x289972[_0x289972.length - _0x322ee2 - 1];
    }

    return _0x1a9294;
}

function _0xb1fb52() {
    let _0x313718 = "6d0jhqw3pa",
        _0x2f1ca8 = _0x31364f(_0x313718, 4),
        _0x134757 = Math.random() * 10 | 0,
        _0x545c64 = _0x4f94cb(_0x313718, _0x2f1ca8),
        _0x3bf562 = {};

    _0x3bf562.size = _0x134757;
    _0x3bf562.num = _0x545c64;
    const _0x4e46fa = {
        size: 12 - _0x134757 - 1,
        num: _0x545c64
    };

    let _0x2bd899 = _0x13fbc0(_0x3bf562) + _0x2f1ca8 + _0x13fbc0(_0x4e46fa) + _0x134757,
        _0xe97954 = _0x2bd899.split(""),
        _0x91cdf4 = _0xe97954.slice(0, 14),
        _0x2d424c = _0xe97954.slice(14),
        _0x31a112 = [];

    for (; _0x91cdf4.length > 0;) {
        _0x31a112.push((35 - parseInt(_0x91cdf4.pop(), 36)).toString(36));
    }

    _0x31a112 = _0x31a112.concat(_0x2d424c);

    let _0x5f49e7 = _0x31a112.join("");

    return _0x5f49e7;
}

function _0x221247(_0x35018d) {
    let _0x2629f0 = _0x35018d.size,
        _0x2847a2 = _0x35018d.num,
        _0x34a39d = "";

    for (; _0x2629f0--;) {
        _0x34a39d += _0x2847a2[Math.random() * _0x2847a2.length | 0];
    }

    return _0x34a39d;
}

async function _0x33a0cd() {
    let {
        body: _0x4ccaa6,
        ua: _0x299277,
        user: _0x4f13a2,
        ver: _0x434ec5,
        cl: _0x5024d9,
        fn: _0x2d58a2,
        appId: _0x5c19d6,
        code: _0x5ad782,
        apid: _0x5396e2,
        xcr: _0x58c455,
        nco: _0x56d436
    } = arguments[0];
    const _0x4caa03 = {
        size: 10,
        type: "max"
    };

    let _0x471e9a = _0x8a8c1d(_0x4caa03);

    const _0xf8e69 = {
        size: 10,
        type: "max"
    };

    let _0x3ba5b4 = _0x8a8c1d(_0xf8e69);

    (!_0x2242cb[_0x5c19d6] || _0x58c455) && (_0x2242cb[_0x5c19d6] = {}, _0x2242cb[_0x5c19d6].fp = _0xb1fb52());
    _0x4ccaa6 = typeof _0x4ccaa6 !== "string" ? JSON.stringify(_0x4ccaa6) : _0x4ccaa6;
    let _0x17ea0d = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "extend", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
        _0x50d8e8 = {};
    const _0x13ca12 = {
        p1: _0x4f13a2
    };
    const _0x280b7d = {
        wd: 0,
        l: 0,
        ls: 0,
        wk: 0,
        bu1: "9.9.9"
    };
    let _0x174be3 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x299277, _0x299277.match(/\(([^\)]+)\)/)[1], _0x13ca12, _0x280b7d, "", 393, 873, 393, 779, "", "", 2.75, "", _0x471e9a];

    for (let _0x2f7200 in _0x17ea0d) {
        _0x50d8e8[_0x17ea0d[_0x2f7200]] = _0x174be3[_0x2f7200];
    }

    const _0x296786 = {
        referer: "",
        v: "h5_npm_v4.2.0",
        ai: _0x5c19d6,
        fp: _0x2242cb[_0x5c19d6].fp
    };
    const _0x266ac5 = {
        ..._0x50d8e8,
        ..._0x296786
    };

    let _0x54828f = _0x266ac5,
        _0x51d343 = _0x215573.AES.encrypt(JSON.stringify(_0x54828f, null, 2), _0x215573.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            iv: _0x215573.enc.Utf8.parse("0102030405060708"),
            mode: _0x215573.mode.CBC,
            padding: _0x215573.pad.Pkcs7
        }),
        _0x335a17 = _0x51d343.ciphertext.toString(),
        _0x38124b = new Date().getTime();

    if (!_0x2242cb[_0x5c19d6].tk || _0x58c455) {
        let _0x1cfc16 = await _0x5d0229(_0x5c19d6, _0x2242cb[_0x5c19d6].fp, _0x299277, _0x335a17);

        if (!_0x1cfc16) {
            _0x1cfc16 = await _0x5d0229(_0x5c19d6, _0x2242cb[_0x5c19d6].fp, _0x299277, _0x335a17);
        }

        if (!_0x1cfc16) {
            return "functionId=" + _0x2d58a2 + "&appid=" + _0x5396e2 + "&body=" + _0x4ccaa6;
        }

        _0x2242cb[_0x5c19d6].tk = _0x1cfc16.tk;
        _0x2242cb[_0x5c19d6].algo = _0x1cfc16.algo;
    }

    let _0x25e191 = new Date().getTime(),
        _0x5d72f5 = _0xeaacc7(_0x25e191, "yyyyMMddhhmmssSSS"),
        _0x4debfa = _0x2242cb[_0x5c19d6].tk,
        _0x317ef3 = new Function("return " + _0x2242cb[_0x5c19d6].algo)(),
        _0x17af97 = _0x5d72f5 + "74",
        _0xa0403d = await _0x317ef3(_0x4debfa, _0x2242cb[_0x5c19d6].fp, _0x17af97, _0x5c19d6, _0x215573).toString();

    const _0x181f1b = {
        appid: _0x5396e2,
        functionId: _0x2d58a2,
        body: _0x4ccaa6
    };
    _0x5ad782 && (_0x181f1b.t = _0x38124b);
    _0x434ec5 && (_0x181f1b.clientVersion = _0x434ec5);
    _0x5024d9 && (_0x181f1b.client = _0x5024d9);

    let _0x5ae31d = _0x181f1b,
        _0x148072 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x69a97c = _0x148072.filter(_0x16a017 => _0x181f1b[_0x16a017]).map(_0x522896 => _0x522896 + ":" + (_0x522896 == "body" ? _0x215573.SHA256(_0x181f1b[_0x522896]).toString() : _0x181f1b[_0x522896])).join("&"),
        _0x56af0d = Date.now() > "1714520158000" ? _0x215573.MD5(_0x69a97c).toString(_0x215573.enc.Hex) : _0x215573.SHA256(_0xa0403d + _0x69a97c + _0xa0403d).toString(_0x215573.enc.Hex),
        _0x541820 = "",
        _0x275829 = {};

    _0x275829.sua = _0x299277.match(/\(([^\)]+)\)/)[1];
    _0x275829.pp = {};
    _0x275829.fp = _0x2242cb[_0x5c19d6].fp;
    _0x275829.pp.p1 = _0x4f13a2;
    const _0x1ff57a = {
        wd: 0,
        l: 0,
        ls: 0,
        wk: 0,
        bu1: "9.9.9"
    };
    _0x275829.extend = _0x1ff57a;
    _0x275829.random = _0x3ba5b4;
    _0x275829.referer = "";
    _0x275829.v = "h5_npm_v4.2.0";

    let _0x341b40 = _0x215573.AES.encrypt(JSON.stringify(_0x275829, null, 2), _0x215573.enc.Utf8.parse("DNiHi703B0&17hh1"), {
        iv: _0x215573.enc.Utf8.parse("0102030405060708"),
        mode: _0x215573.mode.CBC,
        padding: _0x215573.pad.Pkcs7
    });

    _0x541820 = _0x341b40.ciphertext.toString();

    let _0x3afac9 = [_0x5d72f5, _0x2242cb[_0x5c19d6].fp, _0x5c19d6, _0x4debfa, _0x56af0d, 4.2, _0x25e191, _0x541820].join(";"),
        _0x57e402 = Object.entries(_0x5ae31d).map(([_0x57bc33, _0x2737c9]) => _0x57bc33 + "=" + (typeof _0x2737c9 == "string" ? encodeURIComponent(_0x2737c9) : encodeURIComponent(JSON.stringify(_0x2737c9)))).join("&");

    return _0x57e402 + "&h5st=" + encodeURIComponent(_0x3afac9);
}

function _0x331466(_0x5df958, _0x5db379 = () => { }) {
    const {
        url: _0x397ece,
        ..._0x3777c9
    } = _0x5df958;

    _0x24ed8b.post(_0x397ece, _0x3777c9).then(_0x5e7f12 => {
        const {
            statusCode: _0x3a0753,
            statusCode: _0x408b34,
            headers: _0x234df3,
            body: _0x5f25aa
        } = _0x5e7f12,
            _0x21381d = {
                status: _0x3a0753,
                statusCode: _0x408b34,
                headers: _0x234df3,
                body: _0x5f25aa
            };

        _0x5db379(null, _0x21381d, _0x5f25aa);
    }, _0x276739 => {
        const {
            message: _0x29187d,
            response: _0xe7c0a5
        } = _0x276739;

        _0x5db379(_0x29187d, _0xe7c0a5, _0xe7c0a5 && _0xe7c0a5.body);
    });
}

class _0x2945df {
    constructor(_0x598b07, _0x5a1a73, _0x1f034c) {
        this.appId = _0x598b07;
        this.ua = _0x5a1a73;
        this.fp = _0x1f034c || this.__genFp();
    }

    __genFp() {
        let _0x3f7bbc = "0123456789",
            _0x227396 = 13,
            _0x31ffaa = "";

        for (; _0x227396--;) {
            _0x31ffaa += _0x3f7bbc[Math.random() * _0x3f7bbc.length | 0];
        }

        return (_0x31ffaa + Date.now()).slice(0, 16);
    }

    async __genAlgo() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x29af15
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
        this.tk = _0x29af15.data.result.tk;
        this.rd = _0x29af15.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x29af15.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    __genKey(_0x3ee10c, _0x34a7a3, _0x31901d, _0x3cbe40, _0x3315c2) {
        let _0x1b11d2 = "" + _0x3ee10c + _0x34a7a3 + _0x31901d + _0x3cbe40 + this.rd;

        return _0x3315c2[this.enc](_0x1b11d2, _0x3ee10c);
    }

    __genH5st(_0x1bc663) {
        let _0x56e376 = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
            _0x2ccb0d = "";

        for (let _0x3f19b8 of Object.keys(_0x1bc663)) {
            _0x3f19b8 === "body" ? _0x2ccb0d += _0x3f19b8 + ":" + CryptoJS.SHA256(_0x1bc663[_0x3f19b8]).toString(CryptoJS.enc.Hex) + "&" : _0x2ccb0d += _0x3f19b8 + ":" + _0x1bc663[_0x3f19b8] + "&";
        }

        _0x2ccb0d = _0x2ccb0d.slice(0, -1);
        _0x2ccb0d = CryptoJS.HmacSHA256(_0x2ccb0d, _0x56e376).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this.appId.toString() + ";" + this.tk + ";" + _0x2ccb0d + ";3.0;" + this.time.toString());
    }

}

const _0xa12b = {
    getbody: _0x33a0cd,
    H5ST: _0x2945df
};
module.exports = _0xa12b;
