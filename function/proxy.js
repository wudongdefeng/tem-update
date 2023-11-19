const _0x18a0c8 = require("got");

let _0x5ef2ee,
    _0xc8a247,
    _0x12b4a6 = true;

try {
    _0x5ef2ee = require("https-proxy-agent").HttpsProxyAgent;
} catch (_0x4a50b7) {
    console.log("未安装https-proxy-agent依赖，无法启用代理");
    process.exit();
}

const _0x135a4e = process.env.DY_PROXY,
    _0x3518f8 = process.env.DY_SOCKS,
    _0x198272 = process.env.PERMIT_API ? (process.env.PERMIT_API + "&test").split("&") : "",
    _0x5580af = true;

let _0xc615ee = 1;

if (_0x3518f8) {
    try {
        _0xc8a247 = require("socks-proxy-agent");
    } catch (_0x1e1f55) {
        console.log(_0x1e1f55);
    }

    console.log("代理模式为SOCKS5\n");
}

!_0x3a72b5(_0x135a4e) && (console.log("\n代理API地址不正确，不启用❗ ❗ ❗\n"), _0x12b4a6 = false);

if (_0x198272 == "") {
    console.log("\n---------------API代理模式（非白名单）已开启---------------\n");
} else {
    _0x198272 && _0x198272.filter(_0x4f2cca => process.mainModule.filename.includes(_0x4f2cca)).length != 0 ? console.log("\n---------------API代理模式（白名单）已开启---------------\n") : _0x12b4a6 = false;
}

async function _0x449acd(_0x200ec9) {
    const _0x57e787 = {
        request: 30000
    };
    const _0xa6b103 = {
        timeout: _0x57e787
    };

    const _0x36c9ec = await _0x18a0c8.get(_0x200ec9, _0xa6b103).catch(_0x4dcfd5 => {
        console.log(_0x4dcfd5);
    });

    return _0x36c9ec.body.replace("\n", "").replace(/^.*:\/\//, "");
}

async function _0xc61b20(_0x465d48) {
    return new Promise(_0x405973 => {
        setTimeout(_0x405973, _0x465d48);
    });
}

function _0x3a72b5(_0x216be4) {
    var _0x36965a = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\u4E00-\\u9FA5\\d%_.,~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");

    return _0x36965a.test(_0x216be4);
}

function _0x2b9493(_0x41363d, _0x40cadc = false) {
    this.failnum = 0;
    return ddd = async (_0x181205, _0x41a2fe) => {
        if (_0x135a4e && _0x12b4a6 && (this.failed || _0x40cadc || _0xc615ee == 1 && _0x5580af)) {
            let _0x4c4684 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

            for (let _0x1d8b71 of Array(3)) {
                this.ip = await _0x449acd(_0x135a4e);

                if (_0x4c4684.test(this.ip) !== false) {
                    break;
                }

                console.log(this.ip);
                this.ip = undefined;
            }

            if (!this.ip) {
                console.log("\n连续三次获取IP失败，请检查代理API是否正常❗ ❗ ❗\n");
            }

            this.agent = this.ip ? new _0x5ef2ee("http://" + this.ip) : undefined;
            this.agent ? console.log("使用代理IP：" + this.ip) : "";
        }

        const _0x381746 = {
            https: this.agent,
            http: this.agent
        };
        _0x181205.agent = _0x381746;
        const _0x5e00fa = {
            request: 30000
        };
        _0x181205.timeout = _0x5e00fa;

        _0x41363d(_0x181205, async (_0x3f3213, _0x3100fd, _0x33119f) => {
            try {
                if (_0x3f3213) {
                    if (this.failnum < 1) {
                        this.failed = true;
                        this.failnum++;
                        await _0xc61b20(1000);
                        await ddd(_0x181205, _0x41a2fe);
                    } else {
                        this.failed = true;
                        this.failnum = 0;

                        _0x41a2fe(_0x3f3213, _0x3100fd, _0x33119f);
                    }
                } else {
                    _0xc615ee++;
                    this.failed = false;
                    this.failnum = 0;

                    _0x41a2fe(_0x3f3213, _0x3100fd, _0x33119f);
                }
            } catch (_0x386dd2) {
                console.log(_0x386dd2);
            }
        });
    };
}

const _0x1d31c9 = {
    intoRequest: _0x2b9493
};
module.exports = _0x1d31c9;