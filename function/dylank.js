const _0xff9278 = require("ds").DS,
    _0x33e9ee = require("got"),
    _0x3faa32 = require("./dylanx");

if (process.env.DY_PROXY) {
    const _0x3d8b48 = require("./proxy.js");

    _0x356326 = _0x3d8b48.intoRequest(_0x356326.bind(global));
}

class _0x14f994 {
    constructor(_0x1d1630 = 0, _0x297d49 = null) {
        this.ttl = _0x1d1630 || 0;
        this.file = _0x297d49;

        if (_0x297d49) {
            this.data = new _0xff9278(_0x297d49);
        } else {
            this.data = new _0xff9278();
        }
    }

    now() {
        return new Date().getTime();
    }

    _0x5c09x3e() {
        if (this.file) {
            this.data.save(this.file);
        }

        return this;
    }

    _0x5c09x3f(_0x39477d) {
        delete this.data[_0x39477d];

        this._0x5c09x3e();

        return this;
    }

    get(_0x1e1e7f, _0x5c203d) {
        let _0x26acb3 = null,
            _0x4c3e94 = this.data[_0x1e1e7f];
        _0x4c3e94 && (_0x4c3e94.expires == 0 || this.now() < _0x4c3e94.expires ? _0x26acb3 = _0x4c3e94.val : (_0x26acb3 = null, this._0x5c09x3f(_0x1e1e7f)));
        _0x5c203d && _0x5c203d(_0x26acb3);
        return _0x26acb3;
    }

    del(_0x4b2417, _0x185432) {
        let _0x5d8647 = this.get(_0x4b2417);

        this._0x5c09x3f(_0x4b2417);

        _0x185432 && _0x185432(_0x5d8647);
        return _0x5d8647;
    }

    put(_0x14bc78, _0x346b05 = null, _0x3f8f45 = 0, _0x6dd648) {
        _0x3f8f45 == 0 && (_0x3f8f45 = this.ttl);

        let _0x3e94e8 = _0x3f8f45 == 0 ? 0 : this.now() + _0x3f8f45;

        var _0x54d6bb = this.del(_0x14bc78);

        if (_0x346b05 !== null) {
            const _0x5b9439 = {
                expires: _0x3e94e8,
                val: _0x346b05
            };
            this.data[_0x14bc78] = _0x5b9439;

            this._0x5c09x3e();
        }

        _0x6dd648 && _0x6dd648(_0x54d6bb);
        return _0x54d6bb;
    }

}

let _0x2f68dd = 1200000,
    _0x1bc5cf = new _0x14f994(_0x2f68dd, __dirname + "/cache/token.json");

function _0x3a1f74(_0x91278f = "", _0x42569b) {
    let _0x25dac5 = _0x42569b.exec(_0x91278f);

    if (_0x25dac5 && _0x25dac5.length > 0) {
        return _0x25dac5[0].trim();
    }

    return "";
}

function _0x417f6a(_0x1ec9a0, _0x30f57f) {
    return _0x1ec9a0;
}

function _0x33e346(_0x2a0d45) {
    return new Promise(_0xfdda08 => setTimeout(_0xfdda08, _0x2a0d45));
}

function _0x356326(_0x215610, _0x377ffd = () => { }) {
    const {
        url: _0x146680,
        ..._0x1fb37d
    } = _0x215610;

    _0x33e9ee.post(_0x146680, _0x1fb37d).then(_0x5611c1 => {
        const {
            statusCode: _0x31fcbd,
            statusCode: _0x1326b0,
            headers: _0x349224,
            body: _0x2a276a
        } = _0x5611c1,
            _0x3fd436 = {
                status: _0x31fcbd,
                statusCode: _0x1326b0,
                headers: _0x349224,
                body: _0x2a276a
            };

        _0x377ffd(null, _0x3fd436, _0x2a276a);
    }, _0x2c7f4c => {
        const {
            message: _0x53f754,
            response: _0xbc4980
        } = _0x2c7f4c;

        _0x377ffd(_0x53f754, _0xbc4980, _0xbc4980 && _0xbc4980.body);
    });
}

async function _0x210264(_0xe8e959, _0x28ae95) {
    const _0x5b8186 = {
        url: _0x28ae95,
        id: ""
    };

    let _0x16005e = await _0x3faa32.getbody("isvObfuscator", _0x5b8186),
        _0x2f6897;

    if (!_0x16005e) {
        return "";
    }

    const _0x232f2f = {
        Host: "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0xe8e959,
        "User-Agent": "okhttp/3.12.16;jdmall;android;version/12.1.0;build/98891;",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br"
    };
    const _0x2f8ee3 = {
        url: "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        body: _0x16005e,
        headers: _0x232f2f,
        timeout: 30000
    };
    return new Promise(_0xe09e12 => {
        _0x356326(_0x2f8ee3, (_0xda56b2, _0x48c2cd, _0x1bf70e) => {
            try {
                _0xda56b2 ? console.log("Token请求失败 " + (_0x48c2cd.statusCode || "")) : _0x2f6897 = JSON.parse(_0x1bf70e);
            } catch (_0x716241) {
                console(_0x716241, _0x48c2cd);
            } finally {
                _0xe09e12(_0x2f6897);
            }
        });
    });
}

async function _0x2b19a8(_0x1ea376, _0x20f6ba) {
    let _0x20ccd1 = "";

    try {
        let _0x8cfcda = _0x3a1f74(_0x1ea376, /(?<=pt_pin=)([^;]+)/);

        if (_0x8cfcda) {
            let _0x51ec34 = _0x417f6a(_0x8cfcda, _0x20f6ba);

            _0x20ccd1 = _0x1bc5cf.get(_0x51ec34) || "";

            if (_0x20ccd1 === "") {
                let _0x4bf21f = await _0x210264(_0x1ea376, _0x20f6ba);

                if (_0x4bf21f) {
                    if (_0x4bf21f.code === "0") {
                        _0x4bf21f.errcode == 264 ? console.log("" + _0x4bf21f.message) : (_0x20ccd1 = _0x4bf21f.token, _0x1bc5cf.put(_0x51ec34, _0x20ccd1, _0x2f68dd), console.log("获取token成功\n"));
                    } else {
                        _0x4bf21f.code === "3" && _0x4bf21f.errcode === 264 ? console.log("获取Token失败 ： 账号无效") : console.log("获取Token异常 ： " + JSON.stringify(_0x4bf21f));
                    }
                }
            } else {
                console.log("已读取本地缓存token\n");
            }
        }
    } catch (_0x5e32d4) {
        console.log(_0x5e32d4);
        console.log("Token请求失败");
    }

    return _0x20ccd1;
}

module.exports = _0x2b19a8;
