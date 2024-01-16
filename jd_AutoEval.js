/**
带图评价
3 12 3 12 * jd_AutoEval.js
*/
let lnrun = 0;
const $ = new Env('带图评价晒单');

const _0x1a8eb1 = $.isNode() ? require('./sendNotify') : '',
    _0x343684 = $.isNode() ? require('./jdCookie.js') : '',
    _0x205d48 = require('./function/dylanx'),
    _0x29bb88 = require('./USER_AGENTS');
let _0x48143a = [],
    _0x3e67a9 = '';
if ($.isNode()) {
    Object.keys(_0x343684).forEach(_0x3a0dd5 => {
        _0x48143a.push(_0x343684[_0x3a0dd5]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let _0x26d94e = $.getdata('CookiesJD') || '[]';
    _0x26d94e = jsonParse(_0x26d94e), _0x48143a = _0x26d94e.map(_0x14a03e => _0x14a03e.cookie), _0x48143a.reverse(), _0x48143a.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]), _0x48143a.reverse(), _0x48143a = _0x48143a.filter(_0x1d01f3 => _0x1d01f3 !== '' && _0x1d01f3 !== null && _0x1d01f3 !== undefined);
}
if (process.env.DY_PROXY) {
    const _0x13a783 = require('./function/proxy.js');
    $.get = _0x13a783.intoRequest($.get.bind($)), $.post = _0x13a783.intoRequest($.post.bind($));
}
let _0x4db059 = process.env.userKeyWords && process.env.userKeyWords.split('@') || [],
    _0x1b7479 = process.env.wordcount ?? 10,
    _0x10242e = process.env.ONEVAL ?? false,
    _0x16a03a = ['很垃圾', '质量差', '评价内容'],
    _0x28b10f = ['这个商品的质量真的很好！外观精美，手感舒适，使用起来非常顺手。卖家的服务态度也很好，让我购物无忧。', '卖家的服务真是周到细致！他们不仅耐心解答我的问题，还给予了很多实用的建议。物流速度也很快，让我及时收到了商品。', '这个商品超出了我的期待！不仅质量上乘，而且功能齐全，性价比很高。卖家的服务态度也非常好，让我有了愉快的购物体验。', '卖家的服务真是一流！他们把顾客的需求放在首位，耐心解答疑问，并提供了专业的建议。物流速度也很快，让我迅速收到了商品。', '这个商品的质量非常可靠！经过使用测试，它表现出色，没有出现任何问题。卖家的服务态度也很好，给予了及时的售后支持。', '这个商品真是物超所值！质量很好，价格也合理。卖家的服务态度也很好，及时回复我的问题，并提供了详细的产品信息。', '卖家的服务真是贴心周到！他们提供了专业的建议，帮助我选择了合适的商品。物流速度也很快，让我顺利收到了商品。', '这个商品的性能真是令人惊喜！质量上乘，使用起来非常顺手。卖家的服务态度也很好，及时回复我的问题，并解决了我的疑惑。', '卖家的服务真是一级棒！他们对待顾客非常友好，给予了专业的建议。物流速度也很快，让我很快就收到了商品。'],
    _0x4a9d5a = ['赠品', '权益', '非实物', '非卖品', '增值服务', '服务'],
    _0x767f3 = ['送的没花钱哈哈', '东西还还不错', '现在的购物体验越来越好', '以前还没有这么多贴心的赠品、增值服务、权益等服务', '给赞', '算不算白嫖'],
    _0x5b20bb = ['以上是我购物感受和体验，仅供参考，也不要只看好评，适合我的不一定适合你。。。。', '总的来说，还可以，我的评价供大家参考借鉴，根据自己情况。。。。', '总之还行，买不了吃亏，买的了上当，嘿嘿！！！！'],
    _0x144adc = [];
!(async () => {
    if (!_0x48143a[0]) {
        const _0x54d294 = {};
        _0x54d294['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x54d294);
        return;
    }
    console.log('版本：2023/12/12 fix没有可评价'), console.log('TG频道：https://t.me/dylan_jdpro');
    if (_0x10242e === false) {
        console.log('默认不执行, 开启变量 ONEVAL=\'true\'');
        return;
    }
    let _0xe8268b = 0;
    _0x48143a.length > 20 ? _0xe8268b = 20 : _0xe8268b = _0x48143a.length;
    for (let _0x26ff63 = 0; _0x26ff63 < _0xe8268b; _0x26ff63++) {
        if (_0x48143a[_0x26ff63]) {
            _0x3e67a9 = _0x48143a[_0x26ff63], $.UserName = decodeURIComponent(_0x3e67a9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3e67a9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x26ff63 + 1, $.isLogin = true, $.nickName = '', $.commentWareList = '', $.commentInfoList = '', $.UA = _0x29bb88.UARAM ? _0x29bb88.UARAM(1) : _0x29bb88.USER_AGENT, await _0x1e2e24(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
            if (!$.isLogin) {
                const _0x2e8d18 = {};
                _0x2e8d18['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x2e8d18), $.isNode() && (await _0x1a8eb1.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x594519(), console.log('\n等待10秒...'), await $.wait(10000);
        }
    }
})().catch(_0x6c6816 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x6c6816 + '!', '');
}).finally(() => {
    $.done();
});
async function _0x594519() {
    try {
        await _0x13025e();
        if (!$.maxPage) {
            console.log('获取待评价数据失败');
            return;
        }
        ;
        $.maxPage > 1 && (await $.wait(2000), await _0x13025e($.maxPage), ($.commentWareList.length == 0 && (await $.wait(2000)), await _0x13025e($.maxPage - 1))), console.log('当前有' + Number($.sdnum) + '个待评价晒单，开始评价最后一页的' + $.commentWareList.length + '个商品');
        for (let _0x4eec0b of $.commentWareList.reverse()) {
            let _0x3e1685 = [],
                _0x3e7788 = [],
                _0x50ed73 = '',
                _0x27bdb9 = [];
            _0x144adc = [], $.log('\n去评价 ---> ' + _0x4eec0b.wname), _0x4eec0b.estJingBean > 0 && $.log('评价完成最多能获得 ' + _0x4eec0b.estJingBean + ' 豆'), await $.wait(5000);
            if (_0x4a9d5a.filter(_0x5123e0 => _0x4eec0b.wname.includes(_0x5123e0)).length == 0) {
                console.log('\n开始获取商品好评和图片...'), await _0x5371a2(_0x4eec0b.wareId), $.maxPage > 1 && (await _0x5371a2(_0x4eec0b.wareId, Math.floor(Math.random() * Math.min.apply(null, [$.maxPage, 10]) + 2))), await $.wait(2000);
                for (const _0x3e40bc of _0x144adc) {
                    if (_0x3e40bc.commentInfo.pictureInfoList) {
                        for (const _0x269e90 of _0x3e40bc.commentInfo.pictureInfoList || {}) {
                            if (_0x269e90.mediaType != '2') {
                                if (_0x269e90.picURL.indexOf('dpg') !== -1) picURL = _0x269e90.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, '$1'); else {
                                    if (_0x269e90.picURL.indexOf('webp') !== -1) picURL = _0x269e90.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, '$1'); else _0x269e90.picURL.indexOf('avif') !== -1 && (picURL = _0x269e90.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, '$1'));
                                }
                                _0x3e1685.push(picURL);
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    _0x3e40bc.commentInfo.commentScore === '5' && _0x50c1fa(_0x3e40bc.commentInfo.commentData) > _0x1b7479 && _0x3e7788.push(_0x3e40bc.commentInfo.commentData);
                    ;
                }
                ;
                for (let _0x26c64a of _0x16a03a) {
                    _0x3e7788 = _0x3e7788.filter(_0x122627 => !_0x122627.includes(_0x26c64a));
                }
                _0x50ed73 = _0xef0ccb(_0x3e7788);
                let _0x3602a7 = _0x11d791(_0x3e1685, 2);
                const _0xd63373 = {};
                _0xd63373.picUrl = _0x3602a7[0];
                const _0x45a15c = {};
                _0x45a15c.picUrl = _0x3602a7[1], _0x27bdb9 = [_0xd63373, _0x45a15c], _0x50ed73 += ' ' + _0xef0ccb(_0x28b10f);
            } else console.log('赠品权益，只发布文字评价'), _0x50ed73 += _0x1d5a8f(_0x767f3);
            _0x50ed73 = _0x50ed73.replace(/\*/gi, ''), _0x4eec0b.estJingBean > 0 && _0x50ed73.length < 60 && ($.log('此评价有豆，字数不够，我在凑点...'), _0x50ed73 += ' ' + _0xef0ccb(_0x5b20bb));
            if (_0x3e1685.length >= 2 && _0x3e7788.length >= 2) {
                console.log('成功获取到图片和评价，开始 发布...\n');
                const _0x33bfad = {};
                _0x33bfad.mediasExt = '[{"VideoIsEditCover":"0","ImagePropId":"0","ImageTakePhotoFilterId":"0","ImageIsCrop":"0","VideoIsEditCrop":"0","VideoEditFilterId":"0","VideoMusicId":"0","ImageEditFilterId":"0","VideoPropId":"0","TakeRate":"0","VideoRecordIsMakup":"0","ImageTakePhotoIsMakup":"0","VideoRecordFilterId":"0","ImageFontId":"0","FromType":"1","ImageStrickId":"0"},{"VideoIsEditCover":"0","ImagePropId":"0","ImageTakePhotoFilterId":"0","ImageIsCrop":"0","VideoIsEditCrop":"0","VideoEditFilterId":"0","VideoMusicId":"0","ImageEditFilterId":"0","VideoPropId":"0","TakeRate":"0","VideoRecordIsMakup":"0","ImageTakePhotoIsMakup":"0","VideoRecordFilterId":"0","ImageFontId":"0","FromType":"1","ImageStrickId":"0"}]';
                const _0x38805d = {};
                _0x38805d.productId = _0x4eec0b.wareId, _0x38805d.kocSynFlag = '0', _0x38805d.categoryList = _0x4eec0b.categoryList, _0x38805d.voucherStatus = '0', _0x38805d.extInfo = _0x33bfad, _0x38805d.officerScore = '1699', _0x38805d.anonymousFlag = '1', _0x38805d.commentScore = '5', _0x38805d.shopType = '0', _0x38805d.orderId = _0x4eec0b.orderId, _0x38805d.shopId = _0x4eec0b.shopId, _0x38805d.addPictureFlag = '0', _0x38805d.commentData = _0x50ed73, _0x38805d.pictureInfoList = _0x27bdb9, _0x38805d.officerLevel = '3', _0x38805d.isCommentTagContent = '0', await _0x2778a3('pubComment', _0x38805d);
            } else {
                if (_0x3e1685.length >= 2 && _0x3e7788.length < 2) {
                    console.log('成功获取到图片，但没有获取到评价内容，使用内置评价，开始 发布...\n');
                    const _0x4fe110 = {};
                    _0x4fe110.mediasExt = '[{"VideoIsEditCover":"0","ImagePropId":"0","ImageTakePhotoFilterId":"0","ImageIsCrop":"0","VideoIsEditCrop":"0","VideoEditFilterId":"0","VideoMusicId":"0","ImageEditFilterId":"0","VideoPropId":"0","TakeRate":"0","VideoRecordIsMakup":"0","ImageTakePhotoIsMakup":"0","VideoRecordFilterId":"0","ImageFontId":"0","FromType":"1","ImageStrickId":"0"},{"VideoIsEditCover":"0","ImagePropId":"0","ImageTakePhotoFilterId":"0","ImageIsCrop":"0","VideoIsEditCrop":"0","VideoEditFilterId":"0","VideoMusicId":"0","ImageEditFilterId":"0","VideoPropId":"0","TakeRate":"0","VideoRecordIsMakup":"0","ImageTakePhotoIsMakup":"0","VideoRecordFilterId":"0","ImageFontId":"0","FromType":"1","ImageStrickId":"0"}]';
                    const _0x532bc2 = {};
                    _0x532bc2.productId = _0x4eec0b.wareId, _0x532bc2.kocSynFlag = '0', _0x532bc2.categoryList = _0x4eec0b.categoryList, _0x532bc2.voucherStatus = '0', _0x532bc2.extInfo = _0x4fe110, _0x532bc2.officerScore = '1699', _0x532bc2.anonymousFlag = '1', _0x532bc2.commentScore = '5', _0x532bc2.shopType = '0', _0x532bc2.orderId = _0x4eec0b.orderId, _0x532bc2.shopId = _0x4eec0b.shopId, _0x532bc2.addPictureFlag = '0', _0x532bc2.commentData = _0x50ed73, _0x532bc2.pictureInfoList = _0x27bdb9, _0x532bc2.officerLevel = '3', _0x532bc2.isCommentTagContent = '0', await _0x2778a3('pubComment', _0x532bc2);
                } else {
                    if (_0x3e1685.length < 2 && _0x3e7788.length >= 2) {
                        console.log('没有获取到图片，但获取到评价，开始 发布...\n');
                        const _0x51c9ab = {};
                        _0x51c9ab.productId = _0x4eec0b.wareId, _0x51c9ab.kocSynFlag = '0', _0x51c9ab.categoryList = _0x4eec0b.ategoryList, _0x51c9ab.voucherStatus = '0', _0x51c9ab.officerScore = '1699', _0x51c9ab.anonymousFlag = '1', _0x51c9ab.commentScore = '5', _0x51c9ab.shopType = '0', _0x51c9ab.orderId = _0x4eec0b.orderId, _0x51c9ab.shopId = _0x4eec0b.shopId, _0x51c9ab.addPictureFlag = '0', _0x51c9ab.commentData = _0x50ed73, _0x51c9ab.pictureInfoList = '', _0x51c9ab.officerLevel = '3', _0x51c9ab.isCommentTagContent = '0', await _0x2778a3('pubComment', _0x51c9ab);
                    } else {
                        if (_0x144adc.length <= 1) {
                            console.log('没有获取到评价和图片,使用内置评价内容，开始 发布...\n');
                            const _0x5aca9a = {};
                            _0x5aca9a.productId = _0x4eec0b.wareId, _0x5aca9a.kocSynFlag = '0', _0x5aca9a.categoryList = _0x4eec0b.ategoryList, _0x5aca9a.voucherStatus = '0', _0x5aca9a.officerScore = '1699', _0x5aca9a.anonymousFlag = '1', _0x5aca9a.commentScore = '5', _0x5aca9a.shopType = '0', _0x5aca9a.orderId = _0x4eec0b.orderId, _0x5aca9a.shopId = _0x4eec0b.shopId, _0x5aca9a.addPictureFlag = '0', _0x5aca9a.commentData = _0x50ed73, _0x5aca9a.pictureInfoList = '', _0x5aca9a.officerLevel = '3', _0x5aca9a.isCommentTagContent = '0', await _0x2778a3('pubComment', _0x5aca9a);
                        }
                    }
                }
            }
            ;
            console.log('----' + _0x50ed73);
        }
    } catch (_0x598ac8) { }
}
async function _0x5371a2(_0x3da198, _0x2d7b7b = 1) {
    const _0xef33b8 = {};
    _0xef33b8.sortType = '5', _0xef33b8.isCurrentSku = false, _0xef33b8.sku = '' + _0x3da198, _0xef33b8.pictureCommentType = 'A', _0xef33b8.shieldCurrentComment = '1', _0xef33b8.shopType = '0', _0xef33b8.type = '4', _0xef33b8.shadowMainSku = '0', _0xef33b8.num = '10', _0xef33b8.offset = '' + _0x2d7b7b, _0xef33b8.pageNum = '' + _0x2d7b7b, _0xef33b8.pageSize = '10', s = await _0x2778a3('getCommentListWithCard', _0xef33b8), _0x144adc = _0x144adc.concat(s.commentInfoList), $.maxPage = s.maxPage;
}
async function _0xe0cdac(_0x1f5fd0, _0x4105ba = 1) {
    const _0xb56c28 = {};
    _0xb56c28.bbtf = '';
    const _0x13aca1 = {};
    _0x13aca1.category = '', _0x13aca1.extInfo = _0xb56c28, _0x13aca1.isCurrentSku = true, _0x13aca1.num = '21', _0x13aca1.offset = '' + _0x4105ba, _0x13aca1.shadowMainSku = '0', _0x13aca1.shopType = '0', _0x13aca1.sku = '' + _0x1f5fd0, s = await _0x2778a3('getShowPictures', _0x13aca1), $.commentInfoList = s.commentShowPicInfoList, $.maxPage = s.maxPage;
}
async function _0x4a6f2c(_0x985ed1, _0x13b1be = 1) {
    const _0x5734c6 = {};
    _0x5734c6.bbtf = '';
    const _0x403d17 = {};
    _0x403d17.category = '', _0x403d17.extInfo = _0x5734c6, _0x403d17.isCurrentSku = false, _0x403d17.num = '10', _0x403d17.offset = '' + _0x13b1be, _0x403d17.shopType = '0', _0x403d17.sku = '' + _0x985ed1, _0x403d17.type = '4', s = await _0x2778a3('getFoldCommentList', _0x403d17), _0x144adc = _0x144adc.concat(s.commentInfoList), $.maxPage = s.maxPage;
}
async function _0x13025e(_0x488c24 = '1') {
    const _0x5ecb9a = {};
    _0x5ecb9a.status = '1', _0x5ecb9a.planType = '1', _0x5ecb9a.pageIndex = _0x488c24, _0x5ecb9a.pageSize = '10', s = await _0x2778a3('getCommentWareList', _0x5ecb9a), $.maxPage = s.commentWareListInfo?.['maxPage'], $.sdnum = s.commentWareListInfo?.['wait4CommentCount'], $.commentWareList = s.commentWareListInfo?.['commentWareList'];
}
async function _0x2778a3(_0x17e3e3, _0x13f1fb) {
    const _0x1c1545 = {};
    return _0x1c1545.Host = 'api.m.jd.com', _0x1c1545.accept = '*/*', _0x1c1545['user-agent'] = $.UA, _0x1c1545['accept-language'] = 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6', _0x1c1545.Cookie = _0x3e67a9, (s = await _0x205d48.getbody(_0x17e3e3, _0x13f1fb, '11.2.2'), opt = {
        'url': 'https://api.m.jd.com/client.action?functionId=' + _0x17e3e3,
        'body': 'fuctionId=' + _0x17e3e3 + '&' + s,
        'headers': _0x1c1545
    }, new Promise(_0x1b6e45 => {
        $.post(opt, (_0x1f9617, _0x56688f, _0x5e3751) => {
            try {
                _0x1f9617 ? console.log(_0x1f9617) : _0x5e3751 = JSON.parse(_0x5e3751);
                switch (_0x17e3e3) {
                    case 'pubComment':
                        _0x5e3751.message && console.log(_0x5e3751.message);
                        break;
                    default:
                        break;
                }
            } catch (_0x142083) {
                console.log(_0x142083);
            } finally {
                _0x1b6e45(_0x5e3751);
            }
        });
    }));
}
function _0x3f396e() {
    return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}
;
function _0xef0ccb(_0x4bd1a3) {
    return _0x4bd1a3[Math.floor(Math.random() * _0x4bd1a3.length)] || '';
}
function _0x11d791(_0x4a096f, _0x1b0efb) {
    const _0x5c3f34 = _0x4a096f.slice();
    let _0x3979b9 = _0x4a096f.length,
        _0x22947e,
        _0x552dfe;
    while (_0x3979b9--) {
        _0x552dfe = Math.floor((_0x3979b9 + 1) * Math.random()), _0x22947e = _0x5c3f34[_0x552dfe], _0x5c3f34[_0x552dfe] = _0x5c3f34[_0x3979b9], _0x5c3f34[_0x3979b9] = _0x22947e;
    }
    return _0x5c3f34.slice(0, _0x1b0efb);
}
function _0x50c1fa(_0x9ec2f4) {
    const _0x17d4a3 = [],
        _0x5ac295 = /[一-龥]/;
    for (let _0x3c2b87 = 0; _0x3c2b87 < _0x9ec2f4.length; _0x3c2b87++) {
        const _0x5bb9ba = _0x9ec2f4[_0x3c2b87];
        _0x5ac295.test(_0x5bb9ba) && !_0x17d4a3.includes(_0x5bb9ba) && _0x17d4a3.push(_0x5bb9ba);
    }
    return _0x17d4a3.length;
}
;
function _0x1d5a8f(_0x2967f8) {
    for (let _0x4fc801 = _0x2967f8.length - 1; _0x4fc801 > 0; _0x4fc801--) {
        const _0xd9794f = Math.floor(Math.random() * (_0x4fc801 + 1));
        [_0x2967f8[_0x4fc801], _0x2967f8[_0xd9794f]] = [_0x2967f8[_0xd9794f], _0x2967f8[_0x4fc801]];
    }
    return _0x2967f8.join(',');
}
function _0x1e2e24() {
    return new Promise(_0x3f84aa => {
        const _0x3650d2 = {};
        _0x3650d2.Cookie = _0x3e67a9, _0x3650d2.referer = 'https://h5.m.jd.com/', _0x3650d2['User-Agent'] = $.UA;
        const _0xe87048 = {};
        _0xe87048.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0xe87048.headers = _0x3650d2, _0xe87048.timeout = 0x2710;
        const _0x4746a2 = _0xe87048;
        $.get(_0x4746a2, (_0x444ed9, _0xa342fa, _0x48f3db) => {
            try {
                if (_0x48f3db) {
                    _0x48f3db = JSON.parse(_0x48f3db);
                    if (_0x48f3db.islogin === '1') { } else _0x48f3db.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0xc47fc9) {
                console.log(_0xc47fc9);
            } finally {
                _0x3f84aa();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }