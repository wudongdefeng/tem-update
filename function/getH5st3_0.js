/*
一个废弃的模块，不再为新业务使用
new Env('getH5st3_0');
*/
const { H5st } = require('./jdCrypto')

async function getH5st(liIiii1I, ili11iil, iIiiI1I1 = "3.1") {
    const iiiiii1 = Object.assign({
        "appId": liIiii1I,
        "version": iIiiI1I1
    }, ili11iil),
        ili1ll1l = await H5st.getH5st(iiiiii1);
    return ili1ll1l?.["h5st"];
}

module.exports = getH5st;