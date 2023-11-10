const _0xf16ac6 = require("got");

let _0x440aa9 = "https://6dy.jdpro.site/sign";

// if (!__filename.includes("6dy")) {
//     _0x440aa9 = "http://api.nolanstore.cc/sign";
// }

const _0x2c1efc = process.env.SIGN_URL ? process.env.SIGN_URL : _0x440aa9;

async function _0x63cb62(_0x47c9d3, _0x367dd8, _0xe7dcd2) {
    const _0x3a9a5a = {
        fn: _0x47c9d3,
        body: _0x367dd8
    };
    let _0x960714 = "",
        _0x44fb3e = "";
    _0xe7dcd2 && (_0x3a9a5a.ver = _0xe7dcd2);
    const _0x2c15da = {
        limit: 1,
        methods: ["GET", "POST"]
    };
    const _0x4edd2e = {
        beforeRetry: [(_0x37c285, _0x445f51) => {
            _0x445f51;
        }]
    };
    const _0x53a1fe = {
        request: 30000
    };
    const _0x230e85 = {
        json: _0x3a9a5a,
        retry: _0x2c15da,
        hooks: _0x4edd2e,
        timeout: _0x53a1fe
    };
    _0x960714 = await _0xf16ac6.post(_0x2c1efc, _0x230e85).json().catch(async _0x24eae4 => {
        console.log("sign获取失败,重试...\n");
        _0x44fb3e = await _0x362c10(_0x47c9d3, _0x367dd8);
    });
    return _0x44fb3e ? _0x44fb3e.body : _0x960714.body;
}

async function _0x362c10(_0xb3616f, _0x4dfefe) {
    const _0x3ec3fa = {
        fn: _0xb3616f,
        body: _0x4dfefe
    };
    const _0xfb6de = {
        limit: 1,
        methods: ["GET", "POST"]
    };
    const _0x4180a7 = {
        beforeRetry: [(_0x38b3ea, _0x195d7e) => {
            _0x195d7e;
        }]
    };
    const _0x41cc6c = {
        request: 30000
    };
    const _0x36af90 = {
        json: _0x3ec3fa,
        retry: _0xfb6de,
        hooks: _0x4180a7,
        timeout: _0x41cc6c
    };

    let _0x4d2918 = await _0xf16ac6.post("http://api.nolanstore.cc/sign", _0x36af90).json().catch(_0x377ba9 => {
        console.log(_0x377ba9.message);
        console.log("sign获取失败,请检查网络！\n");
    });

    return _0x4d2918;
}

async function _0x33db4a(_0x55d10c, _0x13aa46) {
    const _0x39922e = {
        fn: _0x55d10c,
        body: _0x13aa46
    };
    const _0x2f0184 = {
        limit: 1,
        methods: ["GET", "POST"]
    };
    const _0x312c4a = {
        beforeRetry: [(_0x2262d3, _0x3c15e0) => {
            _0x3c15e0;
        }]
    };
    const _0x39772a = {
        request: 30000
    };
    const _0x3c8b4a = {
        json: _0x39922e,
        retry: _0x2f0184,
        hooks: _0x312c4a,
        timeout: _0x39772a
    };

    let _0x644183 = await _0xf16ac6.post("http://api.nolanstore.cc/sign", _0x3c8b4a).json().catch(_0x1e9286 => {
        console.log(_0x1e9286.message);
        console.log("sign获取失败,请检查网络！\n");
    });

    return _0x644183.body;
}

const _0x4edf35 = {
    getbody: _0x63cb62,
    getbody2: _0x33db4a
};
module.exports = _0x4edf35;
