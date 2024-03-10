const _0x566912 = require("crypto-js"),
      _0x550b19 = require("got"),
      _0x3eed74 = {};

function _0x510065() {
  var _0x2e79fa,
      _0x5ecbcf = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
      _0x176a44 = _0x5ecbcf.size,
      _0x5b0912 = "undefined" === _0x176a44 ? 10 : _0x176a44,
      _0x44dabd = _0x5ecbcf.num,
      _0x40fb0a = "";

  if (_0x44dabd && "string" == typeof _0x44dabd) {
    _0x2e79fa = _0x44dabd;
  }

  for (; _0x5b0912--;) {
    _0x40fb0a += _0x2e79fa[Math.floor(Math.random() * _0x2e79fa.length)];
  }

  return _0x40fb0a;
}

function _0x2f63c9(_0x371650) {
  let _0x52619f = _0x371650.type,
      _0x33eeb8 = "",
      _0xd22385 = _0x371650.customDict;

  if (_0xd22385 && "string" == typeof _0xd22385) {
    _0x52619f = _0xd22385;
  } else {
    switch (_0x52619f) {
      case "alphabet":
        _0x52619f = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;

      case "max":
        _0x52619f = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
        break;

      case "number":
      default:
        _0x52619f = "0123456789";
    }
  }

  for (; _0x371650.size--;) {
    _0x33eeb8 += _0x52619f[Math.random() * _0x52619f.length | 0];
  }

  return _0x33eeb8;
}

const _0x34a843 = {
  local_key_1: _0x566912.MD5,
  local_key_2: _0x566912.SHA256,
  local_key_3: _0x566912.HmacSHA256
};

function _0x393cf8(_0x3a0838, _0x54bd19, _0x38816f, _0x519c83) {
  function _0xb3cca9(_0x3444ea) {
    return (_0x3444ea + String.prototype.slice.call("===", (_0x3444ea.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  }

  const _0x4ca13a = "" + _0x3a0838 + _0x54bd19 + _0x38816f + _0x519c83 + "qV!+A!",
        _0x26e2a6 = _0x566912.enc.Utf8.stringify(_0x566912.enc.Base64.parse(_0xb3cca9(_0x155634(_0x3a0838, 16, 28)))),
        _0x9d0da3 = _0x26e2a6.match(/^[123]([x+][123])+/);

  let _0x4d4c15 = "";

  if (_0x9d0da3) {
    const _0x3576d4 = _0x9d0da3[0].split("");

    let _0x350945 = "";
    Array.prototype.forEach.call(_0x3576d4, _0x35930b => {
      if (isNaN(_0x35930b)) {
        if (["+", "x"].includes(_0x35930b)) {
          _0x350945 = _0x35930b;
        }
      } else {
        const _0x24b825 = "local_key_" + _0x35930b;

        if (_0x34a843[_0x24b825]) {
          switch (_0x350945) {
            case "+":
              _0x4d4c15 = "" + _0x4d4c15 + _0x44f133(_0x24b825, _0x4ca13a, _0x3a0838);
              break;

            case "x":
              _0x4d4c15 = _0x44f133(_0x24b825, _0x4d4c15, _0x3a0838);
              break;

            default:
              _0x4d4c15 = _0x44f133(_0x24b825, _0x4ca13a, _0x3a0838);
          }
        }
      }
    });
  }

  return _0x4d4c15;
}

function _0x44f133(_0x112435, _0xfab08e, _0x4918d5) {
  let _0x4c6945 = _0x34a843[_0x112435];
  return _0x112435 === "local_key_3" ? _0x4c6945(_0xfab08e, _0x4918d5).toString(_0x566912.enc.Hex) : _0x4c6945(_0xfab08e).toString(_0x566912.enc.Hex);
}

function _0x5a31a4(_0x488d2a, _0x16e5fd) {
  let _0x4ff1e2 = 1,
      _0x3baafb = 0,
      _0x3ae90e = _0x488d2a.length,
      _0x38d6d2 = 0;
  "number" == typeof _0x16e5fd && (_0x4ff1e2 = 65535 & _0x16e5fd, _0x3baafb = _0x16e5fd >>> 16 & 65535);

  for (let _0x52ae77 = 0; _0x52ae77 < _0x3ae90e;) {
    for (_0x38d6d2 = Math.min(_0x3ae90e - _0x52ae77, 3850) + _0x52ae77; _0x52ae77 < _0x38d6d2; _0x52ae77++) {
      _0x3baafb += _0x4ff1e2 += 255 & _0x488d2a[_0x52ae77];
    }

    _0x4ff1e2 = 15 * (_0x4ff1e2 >>> 16) + (65535 & _0x4ff1e2);
    _0x3baafb = 15 * (_0x3baafb >>> 16) + (65535 & _0x3baafb);
  }

  return _0x3baafb % 65521 << 16 | _0x4ff1e2 % 65521;
}

function _0x1d6104(_0x4cda37, _0x40b42c) {
  let _0x51a93c = 1,
      _0x4a0ca2 = 0,
      _0x2dcadc = _0x4cda37.length,
      _0x45cfd1 = 0,
      _0x3d4ce7 = 0,
      _0x492b02 = 0;
  "number" == typeof _0x40b42c && (_0x51a93c = 65535 & _0x40b42c, _0x4a0ca2 = _0x40b42c >>> 16);

  for (let _0x2e7192 = 0; _0x2e7192 < _0x2dcadc;) {
    for (_0x45cfd1 = Math.min(_0x2dcadc - _0x2e7192, 3850); _0x45cfd1 > 0;) {
      (_0x3d4ce7 = _0x4cda37.charCodeAt(_0x2e7192++)) < 128 ? _0x51a93c += _0x3d4ce7 : _0x3d4ce7 < 2048 ? (_0x4a0ca2 += _0x51a93c += 192 | _0x3d4ce7 >> 6 & 31, --_0x45cfd1, _0x51a93c += 128 | 63 & _0x3d4ce7) : _0x3d4ce7 >= 55296 && _0x3d4ce7 < 57344 ? (_0x4a0ca2 += _0x51a93c += 240 | (_0x3d4ce7 = 64 + (1023 & _0x3d4ce7)) >> 8 & 7, --_0x45cfd1, _0x4a0ca2 += _0x51a93c += 128 | _0x3d4ce7 >> 2 & 63, --_0x45cfd1, _0x4a0ca2 += _0x51a93c += 128 | (_0x492b02 = 1023 & _0x4cda37.charCodeAt(_0x2e7192++)) >> 6 & 15 | (3 & _0x3d4ce7) << 4, --_0x45cfd1, _0x51a93c += 128 | 63 & _0x492b02) : (_0x4a0ca2 += _0x51a93c += 224 | _0x3d4ce7 >> 12 & 15, --_0x45cfd1, _0x4a0ca2 += _0x51a93c += 128 | _0x3d4ce7 >> 6 & 63, --_0x45cfd1, _0x51a93c += 128 | 63 & _0x3d4ce7);
      _0x4a0ca2 += _0x51a93c;
      --_0x45cfd1;
    }

    _0x51a93c = 15 * (_0x51a93c >>> 16) + (65535 & _0x51a93c);
    _0x4a0ca2 = 15 * (_0x4a0ca2 >>> 16) + (65535 & _0x4a0ca2);
  }

  return _0x4a0ca2 % 65521 << 16 | _0x51a93c % 65521;
}

function _0x155634(_0x3a5787, _0x1db1ad, _0x18c44c) {
  if (_0x3a5787) {
    return String.prototype.slice.call(_0x3a5787, _0x1db1ad, _0x18c44c);
  }

  return "";
}

function _0x3d420e(_0x2f3468) {
  var _0x5d3d53 = {
    magic: "tk",
    version: "02",
    platform: "w",
    expires: "41",
    producer: "l",
    expr: _0x45b05f(),
    cipher: _0x1f19cc(_0x2f3468)
  };
  _0x5d3d53.adler32 = _0x48de36(_0x5d3d53.magic + _0x5d3d53.version + _0x5d3d53.platform + _0x5d3d53.expires + _0x5d3d53.producer + _0x5d3d53.expr + _0x5d3d53.cipher);
  return _0x5d3d53.magic + _0x5d3d53.version + _0x5d3d53.platform + _0x5d3d53.adler32 + _0x5d3d53.expires + _0x5d3d53.producer + _0x5d3d53.expr + _0x5d3d53.cipher;
}

function _0x233ae3(_0x764720) {
  var _0x2e9f0e = new Uint8Array(_0x764720.length);

  Array.prototype.forEach.call(_0x2e9f0e, function (_0x20bf0b, _0x20bef9, _0x388c1f) {
    _0x388c1f[_0x20bef9] = _0x764720.charCodeAt(_0x20bef9);
  });
  return _0x267e6d(_0x2e9f0e);
}

function _0x267e6d(_0x13fb7d) {
  return Array.prototype.map.call(_0x13fb7d, function (_0x1d02ae) {
    var _0x42de23 = "00" + (_0x1d02ae & 255).toString(16);

    return _0x42de23.slice(-2);
  }).join("");
}

function _0x1bd728(_0x2e232f) {
  return _0x267e6d(_0x69668e(_0x2e232f));
}

function _0x1f19cc(_0x358040) {
  const _0x25227e = {
    size: 32,
    dictType: "max",
    customDict: null
  };
  _0x1353c8(_0x25227e);
  var _0x31b2e9 = "";

  var _0x5d8eeb = Date.now();

  var _0x587220 = "(>";
  var _0x527645 = "HiO81-Ei89DH";

  var _0x2c90e4 = _0x4a332a(_0x358040, _0x5d8eeb, _0x587220, _0x527645);

  _0x31b2e9 += _0x233ae3(_0x2c90e4);
  _0x31b2e9 += _0x233ae3(_0x587220);
  _0x31b2e9 += _0x233ae3(_0x527645);
  _0x31b2e9 += _0x1bd728(_0x5d8eeb);
  _0x31b2e9 += _0x233ae3(_0x358040);

  var _0x11e2eb = _0x566912.enc.Hex.parse(_0x31b2e9);

  var _0x23b280 = _0x566912.AES.encrypt(_0x11e2eb, _0x566912.enc.Utf8.parse("eHL4|FW#Chc3#q?0"), {
    iv: _0x566912.enc.Utf8.parse("0102030405060708")
  });

  return _0x231333(_0x566912.enc.Base64.stringify(_0x23b280.ciphertext));
}

function _0x231333(_0x2511bc) {
  return _0x2511bc.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function _0x4a332a(_0x450002, _0x45cba9, _0x27bd0f, _0x21c993) {
  var _0x285c55 = new Uint8Array(16);

  Array.prototype.forEach.call(_0x285c55, function (_0x1f4a03, _0x187165, _0x7a7167) {
    _0x7a7167[_0x187165] = _0x450002.charCodeAt(_0x187165);
  });

  var _0x475d07 = _0x69668e(_0x45cba9),
      _0x615de6 = new Uint8Array(2);

  Array.prototype.forEach.call(_0x615de6, function (_0x36ee1c, _0x26a920, _0x298912) {
    _0x298912[_0x26a920] = _0x27bd0f.charCodeAt(_0x26a920);
  });

  var _0x4389a1 = new Uint8Array(12);

  Array.prototype.forEach.call(_0x4389a1, function (_0x55493d, _0x12b27f, _0x1ae2c2) {
    _0x1ae2c2[_0x12b27f] = _0x21c993.charCodeAt(_0x12b27f);
  });

  var _0x325fc6 = new Uint8Array(38);

  _0x325fc6.set(_0x615de6);

  _0x325fc6.set(_0x4389a1, 2);

  _0x325fc6.set(_0x475d07, 14);

  _0x325fc6.set(_0x285c55, 22);

  var _0x44dbe2 = _0x5a31a4(_0x325fc6);

  _0x44dbe2 >>>= 0;

  var _0x3e7694 = "00000000" + _0x44dbe2.toString(16);

  return _0x3e7694.substr(_0x3e7694.length - 8);
}

function _0x69668e(_0x5de169) {
  var _0x5b5611 = void 0;

  _0x5b5611 = new ArrayBuffer(2);
  new DataView(_0x5b5611).setInt16(0, 256, !0);

  var _0x5ad36f = new Int16Array(_0x5b5611)[0] === 256,
      _0x2c6bf2 = Math.floor(_0x5de169 / Math.pow(2, 32)),
      _0x1e622d = _0x5de169 % Math.pow(2, 32),
      _0x2ff022 = new ArrayBuffer(8),
      _0x47c140 = new DataView(_0x2ff022);

  _0x5ad36f ? (_0x47c140.setUint32(0, _0x1e622d, _0x5ad36f), _0x47c140.setUint32(4, _0x2c6bf2, _0x5ad36f)) : (_0x47c140.setUint32(0, _0x2c6bf2, _0x5ad36f), _0x47c140.setUint32(4, _0x1e622d, _0x5ad36f));
  return new Uint8Array(_0x2ff022);
}

function _0x45b05f() {
  const _0x187cb9 = {
    size: 32,
    dictType: "max",
    customDict: null
  };

  var _0x43e51b = _0x1353c8(_0x187cb9),
      _0x58c3bd = ["1", "2", "3"];

  for (var _0x323d89 = ["+", "x"], _0x184fba = 2 + Math.floor(Math.random() * 4), _0x5e5857 = "", _0x3547fb = 0; _0x3547fb < _0x184fba; _0x3547fb++) {
    _0x5e5857 += _0x58c3bd[Math.floor(Math.random() * 3)];
    _0x3547fb < _0x184fba - 1 && (_0x5e5857 += _0x323d89[Math.floor(Math.random() * 2)]);
  }

  _0x5e5857.length < 9 && (_0x5e5857 += _0x43e51b.substr(0, 9 - _0x5e5857.length));

  var _0x44440e = _0x566912.enc.Utf8.parse(_0x5e5857),
      _0x44886a = _0x566912.enc.Base64.stringify(_0x44440e);

  return _0x231333(_0x44886a);
}

function _0x1353c8() {
  var _0x5e3852,
      _0x41c4f6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      _0x4ef4f6 = _0x41c4f6.size,
      _0x43d26b = void 0 === _0x4ef4f6 ? 10 : _0x4ef4f6,
      _0x2bb598 = _0x41c4f6.dictType,
      _0x16c69c = void 0 === _0x2bb598 ? "number" : _0x2bb598,
      _0x17cc1d = _0x41c4f6.customDict,
      _0x2fc0e7 = "";

  if (_0x17cc1d && "string" == typeof _0x17cc1d) {
    _0x5e3852 = _0x17cc1d;
  } else {
    switch (_0x16c69c) {
      case "alphabet":
        _0x5e3852 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;

      case "max":
        _0x5e3852 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
        break;

      default:
        _0x5e3852 = "0123456789";
    }
  }

  for (; _0x43d26b--;) {
    _0x2fc0e7 += _0x5e3852[Math.random() * _0x5e3852.length | 0];
  }

  return _0x2fc0e7;
}

function _0x48de36(_0x17e867) {
  var _0x29a73f = _0x1d6104(_0x17e867) >>> 0,
      _0xe8a75d = "00000000" + _0x29a73f.toString(16);

  return _0xe8a75d.substr(_0xe8a75d.length - 8);
}

function _0x1f80f1() {
  var _0x4b324f = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
      _0x47edd4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
      _0x4eae96 = new Date(_0x4b324f),
      _0x52d349 = _0x47edd4,
      _0x114393 = {
    "M+": _0x4eae96.getMonth() + 1,
    "d+": _0x4eae96.getDate(),
    "D+": _0x4eae96.getDate(),
    "h+": _0x4eae96.getHours(),
    "H+": _0x4eae96.getHours(),
    "m+": _0x4eae96.getMinutes(),
    "s+": _0x4eae96.getSeconds(),
    "w+": _0x4eae96.getDay(),
    "q+": Math.floor((_0x4eae96.getMonth() + 3) / 3),
    "S+": _0x4eae96.getMilliseconds()
  };

  /(y+)/i.test(_0x52d349) && (_0x52d349 = _0x52d349.replace(RegExp.$1, "".concat(_0x4eae96.getFullYear()).substr(4 - RegExp.$1.length)));
  Object.keys(_0x114393).forEach(function (_0x50efc6) {
    if (new RegExp("(".concat(_0x50efc6, ")")).test(_0x52d349)) {
      var _0x331af4 = "S+" === _0x50efc6 ? "000" : "00";

      _0x52d349 = _0x52d349.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x114393[_0x50efc6] : "".concat(_0x331af4).concat(_0x114393[_0x50efc6]).substr("".concat(_0x114393[_0x50efc6]).length));
    }
  });
  return _0x52d349;
}

function _0x357a59(_0x479757, _0xc2c880, _0x347050, _0x5777ff) {
  let _0x5e2175 = {
    version: "4.4",
    fp: _0xc2c880,
    appId: _0x479757,
    timestamp: Date.now(),
    platform: "web",
    expandParams: "",
    fv: "h5_file_v4.4.0"
  };
  _0x5e2175.expandParams = _0x5777ff || "";
  const _0x316bd6 = {
    Host: "cactus.jd.com",
    "Content-Type": "application/json",
    "User-agent": _0x347050
  };
  let _0x3ffc07 = {
    url: "https://cactus.jd.com/request_algo?g_ty=ajax",
    body: JSON.stringify(_0x5e2175),
    headers: _0x316bd6,
    timeout: 30000
  };
  return new Promise(async _0x52f975 => {
    _0x1e89cf(_0x3ffc07, (_0x1ab715, _0x4a33fb, _0x5bcf09) => {
      try {
        _0x1ab715 ? (console.log("" + JSON.stringify(_0x1ab715)), console.log("algo请求失败，请检查网路重试")) : (_0x5bcf09 = JSON.parse(_0x5bcf09), _0x5bcf09 = _0x5bcf09.data.result);
      } catch (_0x18baf5) {
        console(_0x18baf5, _0x4a33fb);
      } finally {
        _0x52f975(_0x5bcf09);
      }
    });
  });
}

function _0x51ebbe(_0x32c997) {
  let _0x1267f3 = _0x32c997.size,
      _0x56667f = _0x32c997.num,
      _0x486a14 = _0x56667f,
      _0x5ad54a = "";

  for (; _0x1267f3--;) {
    _0x5ad54a += _0x486a14[Math.random() * _0x486a14.length | 0];
  }

  return _0x5ad54a;
}

function _0x1c861f(_0x48cc88, _0x2d1436) {
  for (let _0x3a04a5 = 0; _0x3a04a5 < _0x2d1436.length; _0x3a04a5++) {
    let _0x41214a = _0x48cc88.indexOf(_0x2d1436[_0x3a04a5]);

    _0x41214a !== -1 && (_0x48cc88 = _0x48cc88.replace(_0x2d1436[_0x3a04a5], ""));
  }

  return _0x48cc88;
}

function _0x329043(_0x45c867, _0x49d1d4) {
  let _0x582e97 = [],
      _0x23cc51 = _0x45c867.length;

  for (let _0x542bf1 = 0; _0x542bf1 < 10; _0x542bf1++) {
    let _0x34857b = _0x45c867[_0x542bf1];

    if (Math.random() * _0x23cc51 < _0x49d1d4 && (_0x582e97.push(_0x34857b), --_0x49d1d4 == 0)) {
      break;
    }

    _0x23cc51--;
  }

  let _0xb68b21 = "";

  for (let _0x21d08b = 0; _0x21d08b < _0x582e97.length; _0x21d08b++) {
    let _0x339008 = Math.random() * (_0x582e97.length - _0x21d08b) | 0;

    _0xb68b21 += _0x582e97[_0x339008];
    _0x582e97[_0x339008] = _0x582e97[_0x582e97.length - _0x21d08b - 1];
  }

  return _0xb68b21;
}

function _0x395c7f() {
  let _0x2b27f5 = "1uct6d0jhq",
      _0x2295ef = _0x329043(_0x2b27f5, 4),
      _0x2e7a94 = Math.random() * 10 | 0,
      _0x269611 = _0x1c861f(_0x2b27f5, _0x2295ef),
      _0x3ab42c = {};

  _0x3ab42c.size = _0x2e7a94;
  _0x3ab42c.num = _0x269611;

  let _0x4be80f = _0x51ebbe(_0x3ab42c) + _0x2295ef + _0x51ebbe({
    size: 12 - _0x2e7a94 - 1,
    num: _0x269611
  }) + _0x2e7a94,
      _0x96af69 = _0x4be80f.split(""),
      _0x22e5a5 = _0x96af69.slice(0, 8),
      _0x19aad8 = _0x96af69.slice(8),
      _0x2cbad9 = [];

  for (; _0x22e5a5.length > 0;) {
    _0x2cbad9.push((35 - parseInt(_0x22e5a5.pop(), 36)).toString(36));
  }

  _0x2cbad9 = _0x2cbad9.concat(_0x19aad8);

  let _0x6e85d = _0x2cbad9.join("");

  return _0x6e85d;
}

function _0x159786(_0x3bd3e5) {
  let _0x590a07 = _0x3bd3e5.size,
      _0x13166b = _0x3bd3e5.num,
      _0x4ef0dd = "";

  for (; _0x590a07--;) {
    _0x4ef0dd += _0x13166b[Math.random() * _0x13166b.length | 0];
  }

  return _0x4ef0dd;
}

async function _0x575158() {
  let {
    body: _0x29e8b0,
    ua: _0x29ec07,
    user: _0x38547c,
    ver: _0x384e2a,
    cl: _0x8b4f4d,
    fn: _0x4dece9,
    appId: _0x3fde3f,
    code: _0x25665b,
    apid: _0x238454,
    xcr: _0x59ef9e,
    nco: _0x2bdc3c
  } = arguments[0];
  const _0x31dbba = {
    size: _0x2bdc3c || 12,
    type: "max"
  };

  let _0x44a183 = _0x2f63c9(_0x31dbba),
      _0x40d13f = _0x2f63c9({
    size: _0x2bdc3c || 12,
    type: "max"
  });

  (!_0x3eed74[_0x3fde3f] || _0x59ef9e) && (_0x3eed74[_0x3fde3f] = {}, _0x3eed74[_0x3fde3f].fp = _0x395c7f());
  _0x29e8b0 = typeof _0x29e8b0 !== "string" ? JSON.stringify(_0x29e8b0) : _0x29e8b0;
  let _0x1e461e = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "extend", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re", "random"],
      _0x9e7200 = {};
  const _0x25ab2b = {
    p1: _0x38547c
  };
  const _0x5d014f = {
    wd: 0,
    l: 0,
    ls: 0,
    wk: 0,
    bu1: "0.1.7",
    bu2: -1,
    bu3: 88,
    bu4: 0,
    b5: 0
  };
  let _0x1b7416 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x29ec07, _0x29ec07.match(/\(([^\)]+)\)/)[1], _0x25ab2b, _0x5d014f, "", 393, 873, 393, 779, "", "", 2.75, "", _0x44a183];

  for (let _0x4c4e6f in _0x1e461e) {
    _0x9e7200[_0x1e461e[_0x4c4e6f]] = _0x1b7416[_0x4c4e6f];
  }

  const _0x2864bc = {
    referer: "",
    v: "h5_file_v4.4.0",
    ai: _0x3fde3f,
    fp: _0x3eed74[_0x3fde3f].fp
  };
  const _0x781720 = { ..._0x9e7200,
    ..._0x2864bc
  };

  let _0x31f0df = _0x781720,
      _0x44d42d = _0x566912.AES.encrypt(JSON.stringify(_0x31f0df, null, 2), _0x566912.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
    iv: _0x566912.enc.Utf8.parse("0102030405060708"),
    mode: _0x566912.mode.CBC,
    padding: _0x566912.pad.Pkcs7
  }),
      _0x26e60f = _0x44d42d.ciphertext.toString(),
      _0x39bc6d = new Date().getTime();

  if (!_0x3eed74[_0x3fde3f].tk || _0x59ef9e) {
    let _0x4d6870 = await _0x357a59(_0x3fde3f, _0x3eed74[_0x3fde3f].fp, _0x29ec07, _0x26e60f);

    if (!_0x4d6870) {
      _0x4d6870 = await _0x357a59(_0x3fde3f, _0x3eed74[_0x3fde3f].fp, _0x29ec07, _0x26e60f);
    }

    if (!_0x4d6870) {
      return "functionId=" + _0x4dece9 + "&appid=" + _0x238454 + "&body=" + _0x29e8b0;
    }

    _0x3eed74[_0x3fde3f].tk = _0x4d6870.tk;
    _0x3eed74[_0x3fde3f].algo = _0x4d6870.algo;
  }

  let _0x4e58f9 = new Date().getTime(),
      _0x2d91a1 = _0x1f80f1(_0x4e58f9, "yyyyMMddhhmmssSSS"),
      _0x18a2d8 = new Function("return " + _0x3eed74[_0x3fde3f].algo)(),
      _0x191dee = _0x2d91a1 + "88",
      _0x2a507d = await _0x18a2d8(_0x3eed74[_0x3fde3f].tk, _0x3eed74[_0x3fde3f].fp, _0x191dee, _0x3fde3f, _0x566912).toString();

  const _0x44852b = {
    appid: _0x238454,
    functionId: _0x4dece9,
    body: _0x29e8b0
  };
  _0x25665b && (_0x44852b.t = _0x39bc6d);
  _0x384e2a && (_0x44852b.clientVersion = _0x384e2a);
  _0x8b4f4d && (_0x44852b.client = _0x8b4f4d);

  let _0x139cc1 = _0x44852b,
      _0x51ee8e = ["appid", "body", "client", "clientVersion", "functionId", "t"],
      _0x404100 = _0x51ee8e.filter(_0x2982da => _0x44852b[_0x2982da]).map(_0x286f75 => _0x286f75 + ":" + (_0x286f75 == "body" ? _0x566912.SHA256(_0x44852b[_0x286f75]).toString() : _0x44852b[_0x286f75])).join("&"),
      _0x68ecd9 = Date.now() > "1714520158000" ? _0x566912.MD5(_0x404100).toString(_0x566912.enc.Hex) : _0x566912.MD5(_0x2a507d + _0x404100 + _0x2a507d).toString(_0x566912.enc.Hex),
      _0x31d19d = "",
      _0x4dc8a3 = {};

  _0x4dc8a3.sua = _0x29ec07.match(/\(([^\)]+)\)/)[1];
  _0x4dc8a3.pp = {};
  _0x4dc8a3.pp.p1 = _0x38547c;
  const _0x2104fa = {
    wd: 0,
    l: 0,
    ls: 0,
    wk: 0,
    bu1: "0.1.7",
    bu2: -1,
    bu3: 89,
    bu4: 0,
    bu5: 0
  };
  _0x4dc8a3.extend = _0x2104fa;
  _0x4dc8a3.random = _0x40d13f;
  _0x4dc8a3.v = "h5_file_v4.4.0";
  _0x4dc8a3.fp = _0x3eed74[_0x3fde3f].fp;

  let _0x1eba05 = _0x566912.AES.encrypt(JSON.stringify(_0x4dc8a3, null, 2), _0x566912.enc.Utf8.parse("r1T.6Vinpb.k+/a)"), {
    iv: _0x566912.enc.Utf8.parse("0102030405060708"),
    mode: _0x566912.mode.CBC,
    padding: _0x566912.pad.Pkcs7
  });

  _0x31d19d = _0x1eba05.ciphertext.toString();

  let _0x2b0c31 = [_0x2d91a1, _0x3eed74[_0x3fde3f].fp, _0x3fde3f, _0x3eed74[_0x3fde3f].tk, _0x68ecd9, 4.4, _0x4e58f9, _0x31d19d].join(";"),
      _0x267914 = Object.entries(_0x139cc1).map(([_0x47fdff, _0x2171a6]) => _0x47fdff + "=" + (typeof _0x2171a6 == "string" ? encodeURIComponent(_0x2171a6) : encodeURIComponent(JSON.stringify(_0x2171a6)))).join("&");

  return _0x267914 + "&h5st=" + encodeURIComponent(_0x2b0c31);
}

function _0x1e89cf(_0x6950ea, _0x149369 = () => {}) {
  const {
    url: _0x469d73,
    ..._0x18af0d
  } = _0x6950ea;
  _0x550b19.post(_0x469d73, _0x18af0d).then(_0x1fc341 => {
    const {
      statusCode: _0x1b91c7,
      statusCode: _0xd3e8c2,
      headers: _0x595e45,
      body: _0x16e8a8
    } = _0x1fc341,
          _0x105a1a = {
      status: _0x1b91c7,
      statusCode: _0xd3e8c2,
      headers: _0x595e45,
      body: _0x16e8a8
    };

    _0x149369(null, _0x105a1a, _0x16e8a8);
  }, _0x3ead2a => {
    const {
      message: _0x2f3bae,
      response: _0x2b89b6
    } = _0x3ead2a;

    _0x149369(_0x2f3bae, _0x2b89b6, _0x2b89b6 && _0x2b89b6.body);
  });
}

const _0x24f2a8 = {
  getbody: _0x575158
};
module.exports = _0x24f2a8;