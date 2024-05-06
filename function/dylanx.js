const _0x9f46f9 = require("crypto-js"),
    _0x491d04 = require("got"),
    _0x31ae71 = process.env.SIGN_URL ? process.env.SIGN_URL : "";

_0x31ae71 ? console.log("🈯当前使用指定sign：" + _0x31ae71 + "\n") : console.log("♻️当前使用内置sign，控制变量SIGN_URL\n");

function _0x1ff6b9(_0x5e2e5c = "") {
    return _0x5e2e5c;
}

function _0x2b2487(_0x61d64e) {
    let _0x168593 = [];

    for (let _0xcada3b of _0x61d64e.split("")) {
        let _0x5f3639 = _0xcada3b.charCodeAt();

        _0x168593 = _0x168593.concat([(_0x5f3639 & 128) >> 7, (_0x5f3639 & 64) >> 6, (_0x5f3639 & 32) >> 5, (_0x5f3639 & 16) >> 4, (_0x5f3639 & 8) >> 3, (_0x5f3639 & 4) >> 2, (_0x5f3639 & 2) >> 1, _0x5f3639 & 1]);
    }

    return _0x168593;
}

function _0x347df8(_0xf1138b) {
    let _0x3995ab = Array.from({
        "length": parseInt(_0xf1138b.length / 8)
    }).map(_0x4a2eb7 => 0);

    for (let _0x5d9f2c in _0x3995ab) {
        _0x3995ab[_0x5d9f2c] = _0xf1138b[_0x5d9f2c * 8] << 7 | _0xf1138b[_0x5d9f2c * 8 + 1] << 6 | _0xf1138b[_0x5d9f2c * 8 + 2] << 5 | _0xf1138b[_0x5d9f2c * 8 + 3] << 4 | _0xf1138b[_0x5d9f2c * 8 + 4] << 3 | _0xf1138b[_0x5d9f2c * 8 + 5] << 2 | _0xf1138b[_0x5d9f2c * 8 + 6] << 1 | _0xf1138b[_0x5d9f2c * 8 + 7];
    }

    return _0x1ff6b9(_0x3995ab);
}

function _0x2b3391(_0x568e58) {
    let _0x1cf739 = [55, 146, 68, 104, 165, 61, 204, 127, 187, 15, 217, 136, 238, 154, 233, 90],
        _0x35f613 = "80306f4370b39fd5630ad0529f77adb6",
        _0x3a3c8c = Array.from({
            "length": _0x568e58.length
        }).map(_0x265d50 => 0),
        _0x2681fe,
        _0x35e78b,
        _0x220144,
        _0x23786c;

    for (i in _0x3a3c8c) {
        _0x2681fe = _0x568e58[i].charCodeAt();
        _0x220144 = _0x1cf739[i & 15];
        _0x23786c = _0x35f613[i & 7].charCodeAt();
        _0x2681fe = _0x220144 ^ _0x2681fe;
        _0x2681fe = _0x2681fe ^ _0x23786c;
        _0x2681fe = _0x2681fe + _0x220144;
        _0x220144 = _0x220144 ^ _0x2681fe;
        _0x35e78b = _0x35f613[i & 7].charCodeAt();
        _0x220144 = _0x220144 ^ _0x35e78b;
        _0x3a3c8c[i] = _0x220144 & 255;
    }

    return _0x1ff6b9(_0x3a3c8c);
}

function _0x1c9e20(_0x3987da) {
    let _0x4848c6 = [[0, 0], [1, 4], [2, 61], [3, 15], [4, 56], [5, 40], [6, 6], [7, 59], [8, 62], [9, 58], [10, 17], [11, 2], [12, 12], [13, 8], [14, 32], [15, 60], [16, 13], [17, 45], [18, 34], [19, 14], [20, 36], [21, 21], [22, 22], [23, 39], [24, 23], [25, 25], [26, 26], [27, 20], [28, 1], [29, 33], [30, 46], [31, 55], [32, 35], [33, 24], [34, 57], [35, 19], [36, 53], [37, 37], [38, 38], [39, 5], [40, 30], [41, 41], [42, 42], [43, 18], [44, 47], [45, 27], [46, 9], [47, 44], [48, 51], [49, 7], [50, 49], [51, 63], [52, 28], [53, 43], [54, 54], [55, 52], [56, 31], [57, 10], [58, 29], [59, 11], [60, 3], [61, 16], [62, 50], [63, 48]],
        _0x217b95 = _0x2b2487(_0x3987da),
        _0x476eda = Array.from({
            "length": _0x217b95.length
        }).map(_0x4f0178 => 0);

    for (let _0x1f0154 in _0x476eda) {
        _0x476eda[_0x4848c6[_0x1f0154][1]] = _0x217b95[_0x4848c6[_0x1f0154][0]];
    }

    return _0x347df8(_0x476eda);
}

function _0x3c8a00(_0x196898) {
    let _0x16d4c8 = [[0, 6, 0, 1], [1, 4, 1, 0], [2, 5, 0, 1], [3, 0, 0, 1], [4, 2, 0, 1], [5, 3, 0, 1], [6, 1, 1, 0], [7, 7, 0, 1]],
        _0x4b84c7 = _0x2b2487(_0x196898),
        _0x4ae6d6 = [0, 0, 0, 0, 0, 0, 0, 0];

    for (var _0x1ff2a9 in _0x4ae6d6) {
        _0x4b84c7[_0x1ff2a9] == 0 ? _0x4ae6d6[_0x16d4c8[_0x1ff2a9][1]] = _0x16d4c8[_0x1ff2a9][2] : _0x4ae6d6[_0x16d4c8[_0x1ff2a9][1]] = _0x16d4c8[_0x1ff2a9][3];
    }

    return _0x347df8(_0x4ae6d6);
}

function _0x4dcf02(_0xeeab4b) {
    let _0x302975 = [];

    for (let _0x1fd01f = 0; _0x1fd01f < _0xeeab4b.length; _0x1fd01f += 8) {
        let _0x2c7e4e = _0xeeab4b.slice(_0x1fd01f, _0x1fd01f + 8);

        _0x2c7e4e.length == 1 ? _0x302975 = _0x302975.concat(_0x3c8a00(_0x2c7e4e)) : _0x302975 = _0x302975.concat(_0x1c9e20(_0x2c7e4e));
    }

    return _0x302975;
}

function _0xf43ab5(_0x495cda, _0x4c19e3, _0x4a8349) {
    let _0x46b7bd = [0, 1, 2];
    _0x4a8349 == 1 && (_0x46b7bd = [1, 2, 0]);
    _0x4a8349 == 2 && (_0x46b7bd = [2, 0, 1]);
    let _0x2c9255 = _0x46b7bd[_0x4c19e3];
    if (_0x2c9255 == 0) return _0x4dcf02(_0x495cda);
    if (_0x2c9255 == 2) return _0x2b3391(_0x495cda);
}

function _0x573975(_0x482970) {
    let _0x47cfc0 = "",
        _0x582f3f = [],
        _0x376eb4 = "";
    const _0x47115c = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";

    for (let _0x427ab1 = 0; _0x427ab1 < _0x482970.length; _0x427ab1++) {
        _0x47cfc0 += ("00000000" + _0x482970.charCodeAt(_0x427ab1).toString(2)).slice(-8);
    }

    for (let _0x2d7cbb = 0; _0x2d7cbb < _0x47cfc0.length; _0x2d7cbb += 6) {
        _0x582f3f.push("000000" + _0x47cfc0.substr(_0x2d7cbb, 6));
    }

    for (let _0x462d08 = 0; _0x462d08 < _0x582f3f.length; _0x462d08++) {
        _0x376eb4 += _0x47115c[parseInt(_0x582f3f[_0x462d08], 2)];
    }

    if (_0x376eb4.length % 4 == 2) _0x376eb4 += "=="; else {
        if (_0x376eb4.length % 4 == 3) {
            _0x376eb4 += "=";
        }
    }
    return _0x376eb4;
}

function _0x1b2697(_0x4c32c6) {
    let _0x2844a4 = {
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": Date.now(),
        "ridx": -1,
        "cipher": {
            "area": "CP8mXzLpCK==",
            "d_model": "UwVubWvBDNLJ",
            "wifiBssid": "dW5hbw93bq==",
            "osVersion": "CJS=",
            "d_brand": "WQvrb21f",
            "screen": "CtS3DsenCNqm",
            "uuid": _0x573975(_0x4c32c6),
            "aid": _0x573975(_0x4c32c6),
            "openudid": _0x573975(_0x4c32c6)
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    };
    return encodeURIComponent(JSON.stringify(_0x2844a4));
}

function _0x56c520() {
    var _0x4b6259 = new Date().getTime();

    if (typeof performance !== "undefined" && typeof performance.now === "function") {
        _0x4b6259 += performance.now();
    }

    var _0x3583ed = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (_0x56c58f) {
        var _0x26be4c = (_0x4b6259 + Math.random() * 16) % 16 | 0;

        return _0x4b6259 = Math.floor(_0x4b6259 / 16), (_0x56c58f == "x" ? _0x26be4c : _0x26be4c & 3 | 8).toString(16);
    });

    return _0x3583ed;
}

async function _0x399dc6(_0x4aea7c, _0x131577, _0x5b8d86) {
    if (_0x31ae71) {
        let _0x14b512 = await _0x491d04.post(_0x31ae71, {
            "json": {
                "fn": _0x4aea7c,
                "body": _0x131577
            },
            "retry": {
                "limit": 1,
                "methods": ["GET", "POST"]
            },
            "hooks": {
                "beforeRetry": [(_0x57dcf2, _0x1460d9) => {
                    if (_0x1460d9) { }
                }]
            },
            "timeout": {
                "request": 30000
            }
        }).json().catch(_0x239018 => {
            return console.log(_0x239018.message), console.log("指定sign获取失败,请检查！\n"), "";
        });

        if (_0x14b512?.["body"]) return _0x14b512?.["body"]; else {
            if (_0x14b512?.["data"]?.["convertUrl"]) {
                return _0x14b512?.["data"]?.["convertUrl"];
            }
        }
    } else {
        let _0x2f3a0f = "android",
            _0x4dfbb6 = _0x5b8d86 || "12.2.2",
            _0x1aaa82 = [[0, 2], [1, 1], [2, 0]],
            _0x5964b6,
            _0x4c77b9;

        [_0x5964b6, _0x4c77b9] = _0x1aaa82[Math.floor(Math.random() * _0x1aaa82.length)];

        let _0x4a7414 = "1" + _0x5964b6 + _0x4c77b9,
            _0xd296dd = new Date().getTime();

        _0x131577 = typeof _0x131577 == "string" ? _0x131577 : JSON.stringify(_0x131577);

        let _0x278cbb = new Buffer.from(_0x131577).toString("latin1"),
            _0x16f51f = _0x56c520(),
            _0x3d477f = _0x1b2697(_0x16f51f),
            _0xe266b6 = "functionId=" + _0x4aea7c + "&body=" + _0x278cbb + "&uuid=" + _0x16f51f + "&client=" + _0x2f3a0f + "&clientVersion=" + _0x4dfbb6 + "&st=" + _0xd296dd + "&sv=" + _0x4a7414,
            _0x1d1b30 = _0xf43ab5(_0xe266b6, _0x5964b6, _0x4c77b9),
            _0x23e395 = new Buffer.from(_0x1d1b30).toString("base64"),
            _0x5bfd20 = _0x9f46f9.MD5(_0x23e395).toString();

        return "clientVersion=" + _0x4dfbb6 + "&client=" + _0x2f3a0f + "&networkType=wifi&ef=1&ep=" + _0x3d477f + "&st=" + _0xd296dd + "&sign=" + _0x5bfd20 + "&sv=" + _0x4a7414 + "&body=" + encodeURIComponent(_0x131577);
    }
}

async function _0x2ee574(_0x4084ea, _0x42759b) {
    let _0xc3ed9f = await _0x491d04.post("http://api.nolanstore.cc/sign", {
        "json": {
            "fn": _0x4084ea,
            "body": _0x42759b
        },
        "retry": {
            "limit": 1,
            "methods": ["GET", "POST"]
        },
        "hooks": {
            "beforeRetry": [(_0x249a8d, _0x5cd703) => {
                if (_0x5cd703) { }
            }]
        },
        "timeout": {
            "request": 30000
        }
    }).json().catch(_0x575b95 => {
        console.log(_0x575b95.message);
        console.log("sign获取失败,请检查网络！\n");
    });

    return _0xc3ed9f.body;
}

module.exports = {
    "getbody": _0x399dc6,
    "getbody2": _0x2ee574
};