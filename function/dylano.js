const _0xfc82fe = require("crypto-js"),
      _0x1de634 = require("got"),
      _0x315bcc = {};

function _0x36e6cd() {
  var _0x487f03,
      _0xc9c177 = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
      _0x59d96d = _0xc9c177.size,
      _0x2e1554 = "undefined" === _0x59d96d ? 10 : _0x59d96d,
      _0x48f3c1 = _0xc9c177.num,
      _0x3a8496 = "";

  if (_0x48f3c1 && "string" == typeof _0x48f3c1) {
    _0x487f03 = _0x48f3c1;
  }

  for (; _0x2e1554--;) {
    _0x3a8496 += _0x487f03[Math.floor(Math.random() * _0x487f03.length)];
  }

  return _0x3a8496;
}

function _0x259bd9(_0x25fad3) {
  let _0x1c1499 = _0x25fad3.type,
      _0x5ac9e8 = "",
      _0x28a82c = _0x25fad3.customDict;

  if (_0x28a82c && "string" == typeof _0x28a82c) {
    _0x1c1499 = _0x28a82c;
  } else {
    switch (_0x1c1499) {
      case "alphabet":
        _0x1c1499 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;

      case "max":
        _0x1c1499 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
        break;

      case "number":
      default:
        _0x1c1499 = "0123456789";
    }
  }

  for (; _0x25fad3.size--;) {
    _0x5ac9e8 += _0x1c1499[Math.random() * _0x1c1499.length | 0];
  }

  return _0x5ac9e8;
}

function _0x3c0785() {
  var _0x414a27 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
      _0x51c792 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
      _0x474e2d = new Date(_0x414a27),
      _0x477780 = _0x51c792,
      _0x95f826 = {
    "M+": _0x474e2d.getMonth() + 1,
    "d+": _0x474e2d.getDate(),
    "D+": _0x474e2d.getDate(),
    "h+": _0x474e2d.getHours(),
    "H+": _0x474e2d.getHours(),
    "m+": _0x474e2d.getMinutes(),
    "s+": _0x474e2d.getSeconds(),
    "w+": _0x474e2d.getDay(),
    "q+": Math.floor((_0x474e2d.getMonth() + 3) / 3),
    "S+": _0x474e2d.getMilliseconds()
  };

  /(y+)/i.test(_0x477780) && (_0x477780 = _0x477780.replace(RegExp.$1, "".concat(_0x474e2d.getFullYear()).substr(4 - RegExp.$1.length)));
  Object.keys(_0x95f826).forEach(function (_0x3312df) {
    if (new RegExp("(".concat(_0x3312df, ")")).test(_0x477780)) {
      var _0x2ddaf1 = "S+" === _0x3312df ? "000" : "00";

      _0x477780 = _0x477780.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x95f826[_0x3312df] : "".concat(_0x2ddaf1).concat(_0x95f826[_0x3312df]).substr("".concat(_0x95f826[_0x3312df]).length));
    }
  });
  return _0x477780;
}

function _0x4631f8(_0x2a2146, _0x300edb, _0x2cd773, _0x4c85cc) {
  let _0x782374 = {
    version: "4.3",
    fp: _0x300edb,
    appId: _0x2a2146,
    timestamp: Date.now(),
    platform: "web",
    expandParams: "",
    fv: "h5_file_v4.3.1"
  };
  _0x782374.expandParams = _0x4c85cc || "";
  const _0x590409 = {
    Host: "cactus.jd.com",
    "Content-Type": "application/json",
    "User-agent": _0x2cd773
  };
  let _0x24ae70 = {
    url: "https://cactus.jd.com/request_algo?g_ty=ajax",
    body: JSON.stringify(_0x782374),
    headers: _0x590409,
    timeout: 30000
  };
  return new Promise(async _0x360a46 => {
    _0x5010de(_0x24ae70, (_0x52d1a2, _0x4b1be0, _0x4bd5b4) => {
      try {
        _0x52d1a2 ? (console.log("" + JSON.stringify(_0x52d1a2)), console.log("algo请求失败，请检查网路重试")) : (_0x4bd5b4 = JSON.parse(_0x4bd5b4), _0x4bd5b4 = _0x4bd5b4.data.result);
      } catch (_0xcbf4a0) {
        console(_0xcbf4a0, _0x4b1be0);
      } finally {
        _0x360a46(_0x4bd5b4);
      }
    });
  });
}

function _0x45ed43(_0x3206db) {
  let _0x5dd3ea = _0x3206db.size,
      _0x49ebf2 = _0x3206db.num,
      _0x3c3b4e = _0x49ebf2,
      _0x2526c8 = "";

  for (; _0x5dd3ea--;) {
    _0x2526c8 += _0x3c3b4e[Math.random() * _0x3c3b4e.length | 0];
  }

  return _0x2526c8;
}

function _0xce18d6(_0x4892b3, _0x2e1b42) {
  for (let _0x21a878 = 0; _0x21a878 < _0x2e1b42.length; _0x21a878++) {
    let _0x19f9bb = _0x4892b3.indexOf(_0x2e1b42[_0x21a878]);

    _0x19f9bb !== -1 && (_0x4892b3 = _0x4892b3.replace(_0x2e1b42[_0x21a878], ""));
  }

  return _0x4892b3;
}

function _0x7ae70b(_0x2794e9, _0x648e9f) {
  let _0x11df61 = [],
      _0x302e05 = _0x2794e9.length;

  for (let _0x395540 = 0; _0x395540 < 10; _0x395540++) {
    let _0x5b8ee7 = _0x2794e9[_0x395540];

    if (Math.random() * _0x302e05 < _0x648e9f && (_0x11df61.push(_0x5b8ee7), --_0x648e9f == 0)) {
      break;
    }

    _0x302e05--;
  }

  let _0x49d995 = "";

  for (let _0x349e10 = 0; _0x349e10 < _0x11df61.length; _0x349e10++) {
    let _0x5ac05c = Math.random() * (_0x11df61.length - _0x349e10) | 0;

    _0x49d995 += _0x11df61[_0x5ac05c];
    _0x11df61[_0x5ac05c] = _0x11df61[_0x11df61.length - _0x349e10 - 1];
  }

  return _0x49d995;
}

function _0x364e37() {
  let _0x48e42f = "kl9i1uct6d",
      _0x5a6b69 = _0x7ae70b(_0x48e42f, 3),
      _0x5807d4 = Math.random() * 10 | 0,
      _0x6850a9 = _0xce18d6(_0x48e42f, _0x5a6b69),
      _0x93138 = {};

  _0x93138.size = _0x5807d4;
  _0x93138.num = _0x6850a9;
  const _0x1febe4 = {
    size: 13 - _0x5807d4 - 1,
    num: _0x6850a9
  };

  let _0x589696 = _0x45ed43(_0x93138) + _0x5a6b69 + _0x45ed43(_0x1febe4) + _0x5807d4,
      _0xf315c0 = _0x589696.split(""),
      _0x5c5e40 = _0xf315c0.slice(0, 10),
      _0xbda55c = _0xf315c0.slice(10),
      _0x18b6dd = [];

  for (; _0x5c5e40.length > 0;) {
    _0x18b6dd.push((35 - parseInt(_0x5c5e40.pop(), 36)).toString(36));
  }

  _0x18b6dd = _0x18b6dd.concat(_0xbda55c);

  let _0x264d0c = _0x18b6dd.join("");

  return _0x264d0c;
}

function _0x3f0b4f(_0x39827e) {
  let _0xe1734f = _0x39827e.size,
      _0x15e0d4 = _0x39827e.num,
      _0x3d3c28 = "";

  for (; _0xe1734f--;) {
    _0x3d3c28 += _0x15e0d4[Math.random() * _0x15e0d4.length | 0];
  }

  return _0x3d3c28;
}

async function _0x742fe1() {
  let {
    body: _0x13e694,
    ua: _0x28a6c2,
    user: _0xe69b64,
    ver: _0x1014b2,
    cl: _0x4e203c,
    fn: _0x278301,
    appId: _0xee6a54,
    code: _0x3b581f,
    apid: _0x256be1,
    xcr: _0x86cfe3,
    nco: _0x4e5e70
  } = arguments[0];
  const _0x1e69e9 = {
    size: 10,
    type: "max"
  };

  let _0x33f389 = _0x259bd9(_0x1e69e9);

  const _0x52f226 = {
    size: 10,
    type: "max"
  };

  let _0x57315e = _0x259bd9(_0x52f226);

  (!_0x315bcc[_0xee6a54] || _0x86cfe3) && (_0x315bcc[_0xee6a54] = {}, _0x315bcc[_0xee6a54].fp = _0x364e37());
  _0x13e694 = typeof _0x13e694 !== "string" ? JSON.stringify(_0x13e694) : _0x13e694;
  let _0x3bc5f9 = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "extend", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
      _0x13e600 = {};
  const _0x28e530 = {
    p1: _0xe69b64
  };
  let _0x296c63 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x28a6c2, _0x28a6c2.match(/\(([^\)]+)\)/)[1], _0x28e530, {
    wd: 0,
    l: 0,
    ls: 0,
    wk: 0,
    bu1: "0.1.7",
    bu2: 0,
    bu3: 88
  }, "", 393, 873, 393, 779, "", "", 2.75, "", _0x33f389];

  for (let _0x2af751 in _0x3bc5f9) {
    _0x13e600[_0x3bc5f9[_0x2af751]] = _0x296c63[_0x2af751];
  }

  const _0x13d021 = {
    referer: "",
    v: "h5_file_v4.3.1",
    ai: _0xee6a54,
    fp: _0x315bcc[_0xee6a54].fp
  };
  const _0x38234a = { ..._0x13e600,
    ..._0x13d021
  };

  let _0x46db5b = _0x38234a,
      _0x5accb6 = _0xfc82fe.AES.encrypt(JSON.stringify(_0x46db5b, null, 2), _0xfc82fe.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
    iv: _0xfc82fe.enc.Utf8.parse("0102030405060708"),
    mode: _0xfc82fe.mode.CBC,
    padding: _0xfc82fe.pad.Pkcs7
  }),
      _0x1621d8 = _0x5accb6.ciphertext.toString(),
      _0x675ae2 = new Date().getTime();

  if (!_0x315bcc[_0xee6a54].tk || _0x86cfe3) {
    let _0x4810ae = await _0x4631f8(_0xee6a54, _0x315bcc[_0xee6a54].fp, _0x28a6c2, _0x1621d8);

    if (!_0x4810ae) {
      _0x4810ae = await _0x4631f8(_0xee6a54, _0x315bcc[_0xee6a54].fp, _0x28a6c2, _0x1621d8);
    }

    if (!_0x4810ae) {
      return "functionId=" + _0x278301 + "&appid=" + _0x256be1 + "&body=" + _0x13e694;
    }

    _0x315bcc[_0xee6a54].tk = _0x4810ae.tk;
    _0x315bcc[_0xee6a54].algo = _0x4810ae.algo;
  }

  let _0x5954a6 = new Date().getTime(),
      _0x5c5a7a = _0x3c0785(_0x5954a6, "yyyyMMddhhmmssSSS"),
      _0x46031d = _0x315bcc[_0xee6a54].tk,
      _0xb625e9 = new Function("return " + _0x315bcc[_0xee6a54].algo)(),
      _0x3aca14 = _0x5c5a7a + "22",
      _0x282ff1 = await _0xb625e9(_0x46031d, _0x315bcc[_0xee6a54].fp, _0x3aca14, _0xee6a54, _0xfc82fe).toString();

  const _0x50d5f8 = {
    appid: _0x256be1,
    functionId: _0x278301,
    body: _0x13e694
  };
  _0x3b581f && (_0x50d5f8.t = _0x675ae2);
  _0x1014b2 && (_0x50d5f8.clientVersion = _0x1014b2);
  _0x4e203c && (_0x50d5f8.client = _0x4e203c);

  let _0x15ca55 = _0x50d5f8,
      _0x1081c3 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
      _0xf0bc41 = _0x1081c3.filter(_0x534918 => _0x50d5f8[_0x534918]).map(_0x558341 => _0x558341 + ":" + (_0x558341 == "body" ? _0xfc82fe.SHA256(_0x50d5f8[_0x558341]).toString() : _0x50d5f8[_0x558341])).join("&"),
      _0x17b713 = Date.now() > "1714520158000" ? _0xfc82fe.MD5(_0xf0bc41).toString(_0xfc82fe.enc.Hex) : _0xfc82fe.HmacSHA256(_0xf0bc41, _0x282ff1).toString(_0xfc82fe.enc.Hex),
      _0x1d6899 = "",
      _0x5e6cd0 = {};

  _0x5e6cd0.sua = _0x28a6c2.match(/\(([^\)]+)\)/)[1];
  _0x5e6cd0.pp = {};
  _0x5e6cd0.fp = _0x315bcc[_0xee6a54].fp;
  _0x5e6cd0.pp.p1 = _0xe69b64;
  const _0x1f435d = {
    wd: 0,
    l: 0,
    ls: 0,
    wk: 0,
    bu1: "0.1.7",
    bu2: 0,
    bu3: 88
  };
  _0x5e6cd0.extend = _0x1f435d;
  _0x5e6cd0.random = _0x57315e;
  _0x5e6cd0.referer = "";
  _0x5e6cd0.v = "h5_file_v4.3.1";

  let _0x567377 = _0xfc82fe.AES.encrypt(JSON.stringify(_0x5e6cd0, null, 2), _0xfc82fe.enc.Utf8.parse("&d74&yWoV.EYbWbZ"), {
    iv: _0xfc82fe.enc.Utf8.parse("0102030405060708"),
    mode: _0xfc82fe.mode.CBC,
    padding: _0xfc82fe.pad.Pkcs7
  });

  _0x1d6899 = _0x567377.ciphertext.toString();

  let _0x582095 = [_0x5c5a7a, _0x315bcc[_0xee6a54].fp, _0xee6a54, _0x46031d, _0x17b713, 4.3, _0x5954a6, _0x1d6899].join(";"),
      _0x58484f = Object.entries(_0x15ca55).map(([_0x21074b, _0x1bf93f]) => _0x21074b + "=" + (typeof _0x1bf93f == "string" ? encodeURIComponent(_0x1bf93f) : encodeURIComponent(JSON.stringify(_0x1bf93f)))).join("&");

  return _0x58484f + "&h5st=" + encodeURIComponent(_0x582095);
}

function _0x5010de(_0x3d889d, _0x3da950 = () => {}) {
  const {
    url: _0x44eaaa,
    ..._0x3d1ffa
  } = _0x3d889d;

  _0x1de634.post(_0x44eaaa, _0x3d1ffa).then(_0x1f692f => {
    const {
      statusCode: _0x2d2a37,
      statusCode: _0x4659f9,
      headers: _0x55f7d1,
      body: _0x439e2e
    } = _0x1f692f,
          _0x2ba6d9 = {
      status: _0x2d2a37,
      statusCode: _0x4659f9,
      headers: _0x55f7d1,
      body: _0x439e2e
    };

    _0x3da950(null, _0x2ba6d9, _0x439e2e);
  }, _0x170053 => {
    const {
      message: _0x1a5d49,
      response: _0x2d2fb8
    } = _0x170053;

    _0x3da950(_0x1a5d49, _0x2d2fb8, _0x2d2fb8 && _0x2d2fb8.body);
  });
}

class _0x16a130 {
  constructor(_0x1c603a, _0x127205, _0x4c4fb3) {
    this.appId = _0x1c603a;
    this.ua = _0x127205;
    this.fp = _0x4c4fb3 || this.__genFp();
  }

  __genFp() {
    let _0x17e73a = "0123456789",
        _0x9687e7 = 13,
        _0x1f70d4 = "";

    for (; _0x9687e7--;) {
      _0x1f70d4 += _0x17e73a[Math.random() * _0x17e73a.length | 0];
    }

    return (_0x1f70d4 + Date.now()).slice(0, 16);
  }

  async __genAlgo() {
    this.time = Date.now();
    this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
    let {
      data: _0x25520c
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
    this.tk = _0x25520c.data.result.tk;
    this.rd = _0x25520c.data.result.algo.match(/rd='(.*)'/)[1];
    this.enc = _0x25520c.data.result.algo.match(/algo\.(.*)\(/)[1];
  }

  __genKey(_0x38f977, _0x34127d, _0x4df399, _0x4b6dc9, _0x4fe8c2) {
    let _0x13838b = "" + _0x38f977 + _0x34127d + _0x4df399 + _0x4b6dc9 + this.rd;

    return _0x4fe8c2[this.enc](_0x13838b, _0x38f977);
  }

  __genH5st(_0x37181d) {
    let _0x18279c = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
        _0x53378d = "";

    for (let _0x1ce081 of Object.keys(_0x37181d)) {
      _0x1ce081 === "body" ? _0x53378d += _0x1ce081 + ":" + CryptoJS.SHA256(_0x37181d[_0x1ce081]).toString(CryptoJS.enc.Hex) + "&" : _0x53378d += _0x1ce081 + ":" + _0x37181d[_0x1ce081] + "&";
    }

    _0x53378d = _0x53378d.slice(0, -1);
    _0x53378d = CryptoJS.HmacSHA256(_0x53378d, _0x18279c).toString(CryptoJS.enc.Hex);
    return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this.appId.toString() + ";" + this.tk + ";" + _0x53378d + ";3.0;" + this.time.toString());
  }

}

const _0x50790d = {
  getbody: _0x742fe1,
  H5ST: _0x16a130
};
module.exports = _0x50790d;