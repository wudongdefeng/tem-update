#!/usr/bin/env bash
#

# 青龙一键安装脚本
# GitHub仓库： https://github.com/wudongdefeng/tem-update

# 安装报错，请提交Issue

# 有其他需要的依赖，欢迎到源仓库提交Pull Request

TIME() {
[[ -z "$1" ]] && {
	echo -ne " "
} || {
     case $1 in
	r) export Color="\e[31;1m";;
	g) export Color="\e[32;1m";;
	b) export Color="\e[34;1m";;
	y) export Color="\e[33;1m";;
	z) export Color="\e[35;1m";;
	l) export Color="\e[36;1m";;
      esac
	[[ $# -lt 2 ]] && echo -e "\e[36m\e[0m ${1}" || {
		echo -e "\e[36m\e[0m ${Color}${2}\e[0m"
	 }
      }
}
echo
echo
echo
TIME l "安装依赖..."
echo
TIME y "安装依赖需要时间，请耐心等待!"
echo
sleep 3
echo
echo
npm_ver=$(pnpm -v | awk -F. '{print $1}')
if [[ $npm_ver -ge 7 ]]; then
    export PNPM_HOME="/root/.local/share/pnpm"
    export PATH="$PNPM_HOME:$PATH"
fi

echo -e "安装脚本所需依赖，不一定一次全部安装成功，请自己检查\n"
echo -e "开始安装............\n"

#apk add g++ make pixman-dev pango-dev cairo-dev pkgconf --no-cache
apk add g++ make --no-cache
pnpm config set registry https://registry.npmmirror.com
pnpm install -g
pnpm install -g ds
pnpm install -g adler-32
pnpm install -g png-js
pnpm install -g date-fns
pnpm install -g axios@1.6.7
pnpm install -g crypto-js
pnpm install -g ts-md5
pnpm install -g tslib
pnpm install -g global-agent
pnpm install -g @types/node
pnpm install -g request
pnpm install -g jsdom
pnpm install -g crc
pnpm install -g qs
pnpm install -g moment
pnpm install -g cheerio
pnpm install -g dotenv
pnpm install -g got@11.8.6
pnpm install -g tough-cookie
pnpm install -g https-proxy-agent@7.0.2
pnpm install -g http-cookie-agent
pnpm install -g console-table-printer@2.12.0
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple/ jieba
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple/ requests
rm -rf /usr/local/pnpm-global/5/node_modules/.pnpm/canvas*
rm -rf /root/.local/share/pnpm/global/5/.pnpm/canvas*
echo -e "\n所需依赖安装完成，请检查有没有报错，可尝试再次运行"


echo
TIME g "依赖安装完毕...建议重启 Docker "

echo
TIME g "有任何问题，请在此仓库提交Issue： https://github.com/wudongdefeng/tem-update"
echo
exit 0
