如果您要把代码用于非法用途，请不要下载。
如果用于非法用途，请自觉删除。
如果您用于非法用途，违反国家法律，作者概不负责！

## 自动登记实物奖品收货地址

export WX_ADDRESS="" # 变量格式：收件人@手机号@省份@城市@区县@详细地址@6位行政区划代码@邮编，需按照顺序依次填写，多个用管道符分开（6位行政区划代码自己查地图，也可用身份证号前六位）

export WX_ADDRESS_BLOCK="" # 黑名单关键词，多个关键词用@分开

## 代理组件库相关控制变量
# 定义 HTTP 代理地址（必填）
export RS_PROXY_TUNNRL="" # 例：http://127.0.0.1:8080
# 过滤不需要代理的地址（必填）
export RS_NO_PROXY='127.0.0.1,172.17.0.1,*.telegram.org,oapi.dingtalk.com' # 用英文逗号分割多个地址，这里特别注意要把用到的内网ip过滤掉
# 定义代理白名单（js文件名关键字如fruit），多个用 & 隔开
export RS_TUNNRL_WHITRLIST="" # 例：export RS_TUNNRL_WHITRLIST="fruit&car"  # 用&隔开，代表含有‘fruit’，‘car’文件名的脚本会启用全局代理。前提是已经填写上述变量才能启用成功。
需要额外安装代理依赖库才能使用 npm install -g axios ，npm install -g https-proxy-agent

## 自定义SIGN
export JD_SIGN_API="http://127.0.0.1:32772/sign"

## 全局或非全局禁止PIN运行任务
配置用法：变量 RS_FilterPin(任务1|任务2@pin1,pn2,pin3&任务3@pin4,pin5&pin6)
支持PIN全局不运行任务
支持部分PIN任务不运行
支持部分PIN多个任务不运行
export RS_FilterPin="任务1|任务2@pin1,pn2,pin3&任务3@pin4,pin5&pin6"   // 请注意修改成自己的任务名和PIN值
解释：
任务1和任务2，禁止pin1,pn2,pin3执行任务，任务3，禁止pin4,pin5执行任务，pin6全局不执行任务
