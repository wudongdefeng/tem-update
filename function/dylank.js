const _0x2b5f60 = require("got"),
    _0x1c6f12 = require("./dylanx");

let _0x5ada21 = require("ds");

typeof _0x5ada21 === "object" && (_0x5ada21 = _0x5ada21.DS);

if (process.env.DY_PROXY) {
    const _0x2b828c = require("./proxy.js");

    _0x4dafd7 = _0x2b828c.intoRequest(_0x4dafd7.bind(global));
}

class _0x3df854 {
    constructor(_0xc7da2c = 0, _0x5b1383 = null) {
        this.ttl = _0xc7da2c || 0;
        this.file = _0x5b1383;
        _0x5b1383 ? this.data = new _0x5ada21(_0x5b1383) : this.data = new _0x5ada21();
    }

    ["now"]() {
        return new Date().getTime();
    }

    ["_0x5c09x3e"]() {
        return this.file && this.data.save(this.file), this;
    }

    ["_0x5c09x3f"](_0xf1852b) {
        return delete this.data[_0xf1852b], this._0x5c09x3e(), this;
    }

    ["get"](_0x3ada11, _0x599815) {
        let _0x55ee4a = null,
            _0x29e9a1 = this.data[_0x3ada11];
        return _0x29e9a1 && (_0x29e9a1.expires == 0 || this.now() < _0x29e9a1.expires ? _0x55ee4a = _0x29e9a1.val : (_0x55ee4a = null, this._0x5c09x3f(_0x3ada11))), _0x599815 && _0x599815(_0x55ee4a), _0x55ee4a;
    }

    ["del"](_0x256fb7, _0x4ba6b1) {
        let _0x42be6f = this.get(_0x256fb7);

        return this._0x5c09x3f(_0x256fb7), _0x4ba6b1 && _0x4ba6b1(_0x42be6f), _0x42be6f;
    }

    ["put"](_0x598871, _0x3b779b = null, _0x5a2d30 = 0, _0x538864) {
        _0x5a2d30 == 0 && (_0x5a2d30 = this.ttl);

        let _0x3de55f = _0x5a2d30 == 0 ? 0 : this.now() + _0x5a2d30;

        var _0x1ab37c = this.del(_0x598871);

        return _0x3b779b !== null && (this.data[_0x598871] = {
            "expires": _0x3de55f,
            "val": _0x3b779b
        }, this._0x5c09x3e()), _0x538864 && _0x538864(_0x1ab37c), _0x1ab37c;
    }

}

let _0x461d3 = 1200000,
    _0x2c00c8 = new _0x3df854(_0x461d3, __dirname + "/cache/token.json");

function _0x347271(_0x5792ad = "", _0x37fd4b) {
    let _0x1e79f6 = _0x37fd4b.exec(_0x5792ad);

    if (_0x1e79f6 && _0x1e79f6.length > 0) return _0x1e79f6[0].trim();
    return "";
}

function _0x171a5e(_0x228ea6, _0x1a2f3e) {
    return _0x228ea6;
}

function _0x3b06d4(_0x35d175) {
    return new Promise(_0x20e5bd => setTimeout(_0x20e5bd, _0x35d175));
}

function _0x4dafd7(_0x2b70ef, _0x12e0f4 = () => { }) {
    const {
        url: _0x1b59e9,
        ..._0x4bc14d
    } = _0x2b70ef;

    _0x2b5f60.post(_0x1b59e9, _0x4bc14d).then(_0x232f36 => {
        const {
            statusCode: _0x19df14,
            statusCode: _0x3a0f3e,
            headers: _0x3867d7,
            body: _0x5b721f
        } = _0x232f36;

        _0x12e0f4(null, {
            "status": _0x19df14,
            "statusCode": _0x3a0f3e,
            "headers": _0x3867d7,
            "body": _0x5b721f
        }, _0x5b721f);
    }, _0x195739 => {
        const {
            message: _0x4214a9,
            response: _0x7980b0
        } = _0x195739;

        _0x12e0f4(_0x4214a9, _0x7980b0, _0x7980b0 && _0x7980b0.body);
    });
}

async function _0x87710d(_0x460c32, _0x405de6) {
    let _0x406973 = await _0x1c6f12.getbody("isvObfuscator", {
        "url": _0x405de6,
        "id": ""
    }),
        _0x51c4c6;

    if (!_0x406973) return "";
    let _0x139e3d = {
        "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        "body": _0x406973,
        "headers": {
            "Host": "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": _0x460c32,
            "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br"
        },
        "timeout": 30000
    };
    return new Promise(_0x4984d7 => {
        _0x4dafd7(_0x139e3d, (_0x17e587, _0x488236, _0x42cf47) => {
            try {
                if (_0x17e587) console.log("Token请求失败 " + (_0x488236.statusCode || "")); else {
                    _0x51c4c6 = JSON.parse(_0x42cf47);
                }
            } catch (_0x24681d) {
                console(_0x24681d, _0x488236);
            } finally {
                _0x4984d7(_0x51c4c6);
            }
        });
    });
}

async function _0x2ee242(_0x15b60b, _0x420040) {
    let _0x3ca507 = "";

    try {
        let _0x1e6097 = _0x347271(_0x15b60b, /(?<=pt_pin=)([^;]+)/);

        if (_0x1e6097) {
            let _0x1390a7 = _0x171a5e(_0x1e6097, _0x420040);

            _0x3ca507 = _0x2c00c8.get(_0x1390a7) || "";

            if (_0x3ca507 === "") {
                let _0x1546ab = await _0x87710d(_0x15b60b, _0x420040);

                if (_0x1546ab) {
                    if (_0x1546ab.code === "0") {
                        if (_0x1546ab.errcode == 264) console.log("" + _0x1546ab.message); else {
                            _0x3ca507 = _0x1546ab.token;

                            _0x2c00c8.put(_0x1390a7, _0x3ca507, _0x461d3);

                            console.log("获取token成功\n");
                        }
                    } else _0x1546ab.code === "3" && _0x1546ab.errcode === 264 ? console.log("获取Token失败 ： 账号无效") : console.log("获取Token异常 ： " + JSON.stringify(_0x1546ab));
                }
            } else {
                console.log("已读取本地缓存token\n");
            }
        }
    } catch (_0x2c0639) {
        console.log(_0x2c0639);
        console.log("Token请求失败");
    }

    return _0x3ca507;
}

module.exports = _0x2ee242;