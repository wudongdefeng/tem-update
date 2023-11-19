const _0x3e320a = require("got"),
    _0x3d3653 = require("./dylanx");

let _0x385439 = require("ds");

typeof _0x385439 === "object" && (_0x385439 = _0x385439.DS);

if (process.env.DY_PROXY) {
    const _0x2174fa = require("./proxy.js");

    _0x488669 = _0x2174fa.intoRequest(_0x488669.bind(global));
}

class _0x5e0c77 {
    constructor(_0x2f690b = 0, _0x36dcc4 = null) {
        this.ttl = _0x2f690b || 0;
        this.file = _0x36dcc4;

        if (_0x36dcc4) {
            this.data = new _0x385439(_0x36dcc4);
        } else this.data = new _0x385439();
    }

    ["now"]() {
        return new Date().getTime();
    }

    ["_0x5c09x3e"]() {
        return this.file && this.data.save(this.file), this;
    }

    ["_0x5c09x3f"](_0x3531e9) {
        return delete this.data[_0x3531e9], this._0x5c09x3e(), this;
    }

    ["get"](_0x2f03d7, _0x67fd0f) {
        let _0x30bab2 = null,
            _0x1fa43a = this.data[_0x2f03d7];
        return _0x1fa43a && (_0x1fa43a.expires == 0 || this.now() < _0x1fa43a.expires ? _0x30bab2 = _0x1fa43a.val : (_0x30bab2 = null, this._0x5c09x3f(_0x2f03d7))), _0x67fd0f && _0x67fd0f(_0x30bab2), _0x30bab2;
    }

    ["del"](_0x2cb593, _0x2fe3fc) {
        let _0x266c9f = this.get(_0x2cb593);

        return this._0x5c09x3f(_0x2cb593), _0x2fe3fc && _0x2fe3fc(_0x266c9f), _0x266c9f;
    }

    ["put"](_0x5e7bbd, _0x3f2636 = null, _0x1ad570 = 0, _0x3cf94f) {
        _0x1ad570 == 0 && (_0x1ad570 = this.ttl);

        let _0x30e9bb = _0x1ad570 == 0 ? 0 : this.now() + _0x1ad570;

        var _0x37968b = this.del(_0x5e7bbd);

        return _0x3f2636 !== null && (this.data[_0x5e7bbd] = {
            "expires": _0x30e9bb,
            "val": _0x3f2636
        }, this._0x5c09x3e()), _0x3cf94f && _0x3cf94f(_0x37968b), _0x37968b;
    }

}

let _0x369d0d = 1200000,
    _0x449fa9 = new _0x5e0c77(_0x369d0d, __dirname + "/cache/token.json");

function _0x30ef9d(_0x1c60ec = "", _0x538844) {
    let _0x289665 = _0x538844.exec(_0x1c60ec);

    if (_0x289665 && _0x289665.length > 0) {
        return _0x289665[0].trim();
    }

    return "";
}

function _0x2dce8e(_0x74c9ee, _0x52e343) {
    return _0x74c9ee;
}

function _0x41439e(_0x593578) {
    return new Promise(_0x4ab15d => setTimeout(_0x4ab15d, _0x593578));
}

function _0x488669(_0x4bb753, _0x4cf9ff = () => { }) {
    const {
        url: _0x24f73c,
        ..._0x5eaf28
    } = _0x4bb753;

    _0x3e320a.post(_0x24f73c, _0x5eaf28).then(_0x1a6c18 => {
        const {
            statusCode: _0x4e05f3,
            statusCode: _0x5cfc75,
            headers: _0x5c97a2,
            body: _0x291098
        } = _0x1a6c18;

        _0x4cf9ff(null, {
            "status": _0x4e05f3,
            "statusCode": _0x5cfc75,
            "headers": _0x5c97a2,
            "body": _0x291098
        }, _0x291098);
    }, _0x1099ec => {
        const {
            message: _0x4d7daa,
            response: _0x417c69
        } = _0x1099ec;

        _0x4cf9ff(_0x4d7daa, _0x417c69, _0x417c69 && _0x417c69.body);
    });
}

async function _0x403a5c(_0x6374b4, _0x3dfa71) {
    let _0x334358 = await _0x3d3653.getbody("isvObfuscator", {
        "url": _0x3dfa71,
        "id": ""
    }),
        _0x602f7a;

    if (!_0x334358) return "";
    let _0x36a661 = {
        "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        "body": _0x334358,
        "headers": {
            "Host": "api.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": _0x6374b4,
            "User-Agent": "okhttp/3.12.16;jdmall;android;version/12.1.0;build/98891;",
            "Accept-Language": "zh-Hans-CN;q=1",
            "Accept-Encoding": "gzip, deflate, br"
        },
        "timeout": 30000
    };
    return new Promise(_0x21ff88 => {
        _0x488669(_0x36a661, (_0xebf4c, _0x23f53d, _0x563b08) => {
            try {
                if (_0xebf4c) {
                    console.log("Token请求失败 " + (_0x23f53d.statusCode || ""));
                } else _0x602f7a = JSON.parse(_0x563b08);
            } catch (_0x36bc42) {
                console(_0x36bc42, _0x23f53d);
            } finally {
                _0x21ff88(_0x602f7a);
            }
        });
    });
}

async function _0x208761(_0x43a376, _0x197f57) {
    let _0x461c96 = "";

    try {
        let _0x1f6754 = _0x30ef9d(_0x43a376, /(?<=pt_pin=)([^;]+)/);

        if (_0x1f6754) {
            let _0x21d8c4 = _0x2dce8e(_0x1f6754, _0x197f57);

            _0x461c96 = _0x449fa9.get(_0x21d8c4) || "";

            if (_0x461c96 === "") {
                let _0x300591 = await _0x403a5c(_0x43a376, _0x197f57);

                if (_0x300591) {
                    if (_0x300591.code === "0") _0x300591.errcode == 264 ? console.log("" + _0x300591.message) : (_0x461c96 = _0x300591.token, _0x449fa9.put(_0x21d8c4, _0x461c96, _0x369d0d), console.log("获取token成功\n")); else _0x300591.code === "3" && _0x300591.errcode === 264 ? console.log("获取Token失败 ： 账号无效") : console.log("获取Token异常 ： " + JSON.stringify(_0x300591));
                }
            } else console.log("已读取本地缓存token\n");
        }
    } catch (_0x49051d) {
        console.log(_0x49051d);
        console.log("Token请求失败");
    }

    return _0x461c96;
}

module.exports = _0x208761;
