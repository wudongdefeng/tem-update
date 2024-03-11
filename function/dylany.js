const _0x2b95bf = require("crypto-js"),
    _0x1368dd = require("got"),
    _0x2299d8 = {};

function _0x5d1b94(_0x4abef9) {
    if (_0x4abef9 === "3.1") {
        var _0x1d5b6c = "",
            _0xe1049d = "0123456789",
            _0x207597 = _0xe1049d,
            _0x43c7ea = Math.floor(Math.random() * 10),
            _0x425e64,
            _0x10ccf5 = 12;

        do {
            const _0x352cf6 = {
                size: 1,
                num: _0xe1049d
            };
            _0x425e64 = _0xd5f700(_0x352cf6);
            _0x1d5b6c.indexOf(_0x425e64) == -1 && (_0x1d5b6c += _0x425e64);
        } while (_0x1d5b6c.length < 3);

        for (let _0x39a369 of _0x1d5b6c.slice()) {
            _0x207597 = _0x207597.replace(_0x39a369, "");
        }

        const _0x38c9de = {
            size: _0x43c7ea,
            num: _0x207597
        };
        const _0x490a9d = {
            size: _0x10ccf5 - _0x43c7ea,
            num: _0x207597
        };

        var _0x16ca4f = _0xd5f700(_0x38c9de) + _0x1d5b6c + _0xd5f700(_0x490a9d) + _0x43c7ea,
            _0x396be4 = _0x16ca4f.split(""),
            _0x6057ff = [];

        for (; _0x396be4.length;) {
            _0x6057ff.push(9 - parseInt(_0x396be4.pop()));
        }

        _0x16ca4f = _0x6057ff.join("");
    } else {
        var _0x10ccf5 = 12,
            _0x1d5b6c = "",
            _0xe1049d = "0123456789",
            _0x207597 = _0xe1049d,
            _0x43c7ea = Math.floor(Math.random() * 10),
            _0x425e64;

        do {
            const _0x36713f = {
                size: 1,
                num: _0xe1049d
            };
            _0x425e64 = _0xd5f700(_0x36713f);
            _0x1d5b6c.indexOf(_0x425e64) == -1 && (_0x1d5b6c += _0x425e64);
        } while (_0x1d5b6c.length < 3);

        for (let _0x3305e9 of _0x1d5b6c.slice()) {
            _0x207597 = _0x207597.replace(_0x3305e9, "");
        }

        const _0x805df7 = {
            size: _0x43c7ea,
            num: _0x207597
        };
        const _0x2d554a = {
            size: _0x10ccf5 - _0x43c7ea,
            num: _0x207597
        };

        var _0x16ca4f = _0xd5f700(_0x805df7) + _0x1d5b6c + _0xd5f700(_0x2d554a) + _0x43c7ea;
    }

    return _0x16ca4f;
}

function _0xd5f700() {
    var _0x5171c2,
        _0x2eeb28 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x3f47cd = _0x2eeb28.size,
        _0x5ced10 = "undefined" === _0x3f47cd ? 10 : _0x3f47cd,
        _0x115739 = _0x2eeb28.num,
        _0x2e0f89 = "";

    if (_0x115739 && "string" == typeof _0x115739) {
        _0x5171c2 = _0x115739;
    }

    for (; _0x5ced10--;) {
        _0x2e0f89 += _0x5171c2[Math.floor(Math.random() * _0x5171c2.length)];
    }

    return _0x2e0f89;
}

function _0x13799d() {
    var _0x2948e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0x210009 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x50b493 = new Date(_0x2948e2),
        _0x228162 = _0x210009,
        _0x3c3a65 = {
            "M+": _0x50b493.getMonth() + 1,
            "d+": _0x50b493.getDate(),
            "D+": _0x50b493.getDate(),
            "h+": _0x50b493.getHours(),
            "H+": _0x50b493.getHours(),
            "m+": _0x50b493.getMinutes(),
            "s+": _0x50b493.getSeconds(),
            "w+": _0x50b493.getDay(),
            "q+": Math.floor((_0x50b493.getMonth() + 3) / 3),
            "S+": _0x50b493.getMilliseconds()
        };

    /(y+)/i.test(_0x228162) && (_0x228162 = _0x228162.replace(RegExp.$1, "".concat(_0x50b493.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x3c3a65).forEach(function (_0x3936c0) {
        if (new RegExp("(".concat(_0x3936c0, ")")).test(_0x228162)) {
            var _0xb40ac9 = "S+" === _0x3936c0 ? "000" : "00";

            _0x228162 = _0x228162.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3c3a65[_0x3936c0] : "".concat(_0xb40ac9).concat(_0x3c3a65[_0x3936c0]).substr("".concat(_0x3c3a65[_0x3936c0]).length));
        }
    });
    return _0x228162;
}

function _0x2a4da5(_0x3d5d9c, _0x8841fe, _0x57038c, _0x431c87, _0x445bd9) {
    let _0x2afc70 = {
        version: _0x445bd9,
        fp: _0x8841fe,
        appId: _0x3d5d9c,
        timestamp: Date.now(),
        platform: "web",
        expandParams: ""
    };
    _0x2afc70.expandParams = _0x431c87 || "";
    const _0x4a7abc = {
        Host: "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x57038c
    };
    let _0x4bd642 = {
        url: "https://cactus.jd.com/request_algo?g_ty=ajax",
        body: JSON.stringify(_0x2afc70),
        headers: _0x4a7abc,
        timeout: 30000
    };
    return new Promise(async _0x2ec699 => {
        _0x1df113(_0x4bd642, (_0x4e359e, _0x5bbdd3, _0x39d1f7) => {
            try {
                if (_0x4e359e) {
                    console.log("" + JSON.stringify(_0x4e359e));
                    console.log("getgo 请求失败，请检查网路重试");
                } else {
                    _0x39d1f7 = JSON.parse(_0x39d1f7);
                    _0x39d1f7 = _0x39d1f7.data.result;
                }
            } catch (_0xc3f30) {
                console(_0xc3f30, _0x5bbdd3);
            } finally {
                _0x2ec699(_0x39d1f7);
            }
        });
    });
}

async function _0x49514e(_0x459614) {
    let _0x5ef394 = "3.1",
        {
            body: _0x1eb211,
            ua: _0x3eae54,
            user: _0x472a3f,
            ver: _0x2bf2ec,
            cl: _0x88a95d,
            fn: _0x1fc31f,
            appId: _0x4b54b6,
            code: _0x43d775,
            apid: _0x1b9e4e,
            flag: _0x23b329
        } = _0x459614;
    (!_0x2299d8[_0x4b54b6] || _0x23b329) && (_0x2299d8[_0x4b54b6] = {}, _0x2299d8[_0x4b54b6].fp = _0x5d1b94(_0x5ef394));
    _0x1eb211 = typeof _0x1eb211 !== "string" ? JSON.stringify(_0x1eb211) : _0x1eb211;
    let _0x1afc2a = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"],
        _0x34c2a0 = {};
    const _0x453fd1 = {
        p1: _0x472a3f
    };
    let _0x50f047 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x3eae54, _0x3eae54.match(/\(([^\)]+)\)/)[1], _0x453fd1, "", 393, 873, 393, 779, "", "", 2.75, ""];

    for (let _0x5c9ad3 in _0x1afc2a) {
        _0x34c2a0[_0x1afc2a[_0x5c9ad3]] = _0x50f047[_0x5c9ad3];
    }

    const _0x4a67a7 = {
        ai: _0x4b54b6,
        fp: _0x2299d8[_0x4b54b6].fp
    };
    const _0x101191 = {
        ..._0x34c2a0,
        ..._0x4a67a7
    };

    let _0xe28fbd = _0x101191,
        _0x5c7020 = _0x2b95bf.AES.encrypt(JSON.stringify(_0xe28fbd, null, 2), _0x2b95bf.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            iv: _0x2b95bf.enc.Utf8.parse("0102030405060708"),
            mode: _0x2b95bf.mode.CBC,
            padding: _0x2b95bf.pad.Pkcs7
        }),
        _0x15fe09 = _0x5c7020.ciphertext.toString(),
        _0x111449 = new Date().getTime();

    if (!_0x2299d8[_0x4b54b6].tk || _0x23b329) {
        let _0x5bedb0 = await _0x2a4da5(_0x4b54b6, _0x2299d8[_0x4b54b6].fp, _0x3eae54, _0x15fe09, _0x5ef394);

        if (!_0x5bedb0) {
            _0x5bedb0 = await _0x2a4da5(_0x4b54b6, _0x2299d8[_0x4b54b6].fp, _0x3eae54, _0x15fe09, _0x5ef394);
        }

        if (!_0x5bedb0) {
            return "functionId=" + _0x1fc31f + "&appid=" + _0x1b9e4e + "&body=" + _0x1eb211;
        }

        _0x2299d8[_0x4b54b6].tk = _0x5bedb0.tk;
        _0x2299d8[_0x4b54b6].algo = _0x5bedb0.algo;
    }

    let _0x3cee15 = new Date().getTime(),
        _0x36c4f5 = _0x13799d(_0x3cee15, "yyyyMMddhhmmssSSS"),
        _0x5b86c5 = _0x2299d8[_0x4b54b6].tk,
        _0x25e3cd = new Function("return " + _0x2299d8[_0x4b54b6].algo)(),
        _0x4e09a2 = await _0x25e3cd(_0x5b86c5, _0x2299d8[_0x4b54b6].fp, _0x36c4f5, _0x4b54b6, _0x2b95bf).toString();

    const _0x1c9d47 = {
        appid: _0x1b9e4e,
        functionId: _0x1fc31f,
        body: _0x1eb211
    };
    _0x2bf2ec && (_0x1c9d47.clientVersion = _0x2bf2ec);
    _0x88a95d && (_0x1c9d47.client = _0x88a95d);

    if (_0x43d775) {
        _0x1c9d47.t = _0x111449;
    }

    let _0xf0565a = _0x1c9d47,
        _0x51b9dc = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x50674b = _0x51b9dc.filter(_0x14e544 => _0x1c9d47[_0x14e544]).map(_0x16d321 => _0x16d321 + ":" + (_0x16d321 == "body" ? _0x2b95bf.SHA256(_0x1c9d47[_0x16d321]).toString() : _0x1c9d47[_0x16d321])).join("&"),
        _0x56fbbd = Date.now() > "1714520158000" ? _0x2b95bf.MD5(_0x50674b, _0x4e09a2).toString(_0x2b95bf.enc.Hex) : _0x2b95bf.HmacSHA256(_0x50674b, _0x4e09a2).toString(_0x2b95bf.enc.Hex),
        _0x9b0bde = "";

    let _0x498ab7 = {};
    _0x498ab7.sua = _0x3eae54.match(/\(([^\)]+)\)/)[1];
    _0x498ab7.pp = {};
    _0x498ab7.fp = _0x2299d8[_0x4b54b6].fp;
    _0x498ab7.pp.p1 = _0x472a3f;

    let _0x2b5ce1 = _0x2b95bf.AES.encrypt(JSON.stringify(_0x498ab7, null, 2), _0x2b95bf.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        iv: _0x2b95bf.enc.Utf8.parse("0102030405060708"),
        mode: _0x2b95bf.mode.CBC,
        padding: _0x2b95bf.pad.Pkcs7
    });

    _0x9b0bde = _0x2b5ce1.ciphertext.toString();

    let _0x259ff0 = [_0x36c4f5, _0x2299d8[_0x4b54b6].fp, _0x4b54b6, _0x5b86c5, _0x56fbbd, _0x5ef394, _0x3cee15, _0x9b0bde].join(";"),
        _0x41bd6a = Object.entries(_0xf0565a).map(([_0x1021f9, _0xf760f6]) => _0x1021f9 + "=" + (typeof _0xf760f6 == "string" ? encodeURIComponent(_0xf760f6) : encodeURIComponent(JSON.stringify(_0xf760f6)))).join("&");

    return _0x41bd6a + "&h5st=" + encodeURIComponent(_0x259ff0);
}

function _0x1df113(_0x2fbbcb, _0x2e15dc = () => { }) {
    const {
        url: _0x428d1f,
        ..._0x593b88
    } = _0x2fbbcb;
    _0x1368dd.post(_0x428d1f, _0x593b88).then(_0x17b00d => {
        const {
            statusCode: _0x22d3e1,
            statusCode: _0x1c9da2,
            headers: _0x50c9c3,
            body: _0x301c46
        } = _0x17b00d,
            _0x113a19 = {
                status: _0x22d3e1,
                statusCode: _0x1c9da2,
                headers: _0x50c9c3,
                body: _0x301c46
            };

        _0x2e15dc(null, _0x113a19, _0x301c46);
    }, _0x81f009 => {
        const {
            message: _0xe5c7ce,
            response: _0x4d13f8
        } = _0x81f009;

        _0x2e15dc(_0xe5c7ce, _0x4d13f8, _0x4d13f8 && _0x4d13f8.body);
    });
}

class _0x1648ef {
    constructor(_0x49f602, _0x4d0794, _0xbf7118) {
        this[_0x49f602] = _0x49f602;
        this.ua = _0x4d0794;
        this.fp = _0xbf7118 || this.__genFp();
    }

    __genFp() {
        let _0x3d7ea7 = "0123456789",
            _0x21ceb2 = 13,
            _0x3956e4 = "";

        for (; _0x21ceb2--;) {
            _0x3956e4 += _0x3d7ea7[Math.random() * _0x3d7ea7.length | 0];
        }

        return (_0x3956e4 + Date.now()).slice(0, 16);
    }

    async __genAlgo() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x22b20c
        } = await axios.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
            version: "3.0",
            fp: this.fp,
            appId: this[appId].toString(),
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
        this.tk = _0x22b20c.data.result.tk;
        this.rd = _0x22b20c.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x22b20c.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    __genKey(_0x298150, _0x25394f, _0x2b62a6, _0x1d868e, _0x550b1d) {
        let _0x72ba46 = "" + _0x298150 + _0x25394f + _0x2b62a6 + _0x1d868e + this.rd;

        return _0x550b1d[this.enc](_0x72ba46, _0x298150);
    }

    __genH5st(_0xf16b39) {
        let _0xee2142 = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex),
            _0x2019a0 = "";

        for (let _0x218ceb of Object.keys(_0xf16b39)) {
            _0x218ceb === "body" ? _0x2019a0 += _0x218ceb + ":" + CryptoJS.SHA256(_0xf16b39[_0x218ceb]).toString(CryptoJS.enc.Hex) + "&" : _0x2019a0 += _0x218ceb + ":" + _0xf16b39[_0x218ceb] + "&";
        }

        _0x2019a0 = _0x2019a0.slice(0, -1);
        _0x2019a0 = CryptoJS.HmacSHA256(_0x2019a0, _0xee2142).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this[appId].toString() + ";" + this.tk + ";" + _0x2019a0 + ";3.0;" + this.time.toString());
    }

}

const _0xd4c2d0 = {
    getbody: _0x49514e
};
module.exports = _0xd4c2d0;