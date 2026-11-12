# 每5天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */5 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

3 12 3 12 * node /scripts/jd_AutoEval.js >> /scripts/logs/jd_AutoEval.log
55 11 * * * node /scripts/jd_OnceApply.js >> /scripts/logs/jd_OnceApply.log
1 1 1 1 * node /scripts/jd_XinFarm_draw.js >> /scripts/logs/jd_XinFarm_draw.log
1 1 1 1 * node /scripts/jd_XinFarm_water.js >> /scripts/logs/jd_XinFarm_water.log
28 8,21 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log
1 1 1 1 * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log
58 59 23 * * * node /scripts/jd_dpqd_sign.js >> /scripts/logs/jd_dpqd_sign.log
38 2,15 * * * node /scripts/jd_dwapp.js >> /scripts/logs/jd_dwapp.log
12 5,10 * * * node /scripts/jd_farmnew_ck_help.js >> /scripts/logs/jd_farmnew_ck_help.log
22 2 29 2 * node /scripts/jd_farmnew_code_help.js >> /scripts/logs/jd_farmnew_code_help.log
15 6,16 * * * node /scripts/jd_fruit_new.js >> /scripts/logs/jd_fruit_new.log
53 7,15 * * * node /scripts/jd_newfarmlottery.js >> /scripts/logs/jd_newfarmlottery.log
21 7-21/2 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log
1 8,14,20 * * * node /scripts/jd_plantBean_friend.js >> /scripts/logs/jd_plantBean_friend.log
22 5,15 * * * node /scripts/jd_plantBean_help.js >> /scripts/logs/jd_plantBean_help.log
15 1 29 2 * node /scripts/jd_water_new.js >> /scripts/logs/jd_water_new.log
