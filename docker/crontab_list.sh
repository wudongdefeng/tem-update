# 每5天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */5 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

15 0,16 * * * node /scripts/jd_beanSign.js >> /scripts/logs/jd_beanSign.log
11 11,21 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log
25 2,14 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log
20 22 * * * node /scripts/jd_bean_info.js >> /scripts/logs/jd_bean_info.log
3 3,10 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log
11 11 11 11 * node /scripts/jd_car_play_exchange.js >> /scripts/logs/jd_car_play_exchange.log
13 */6 * * * node /scripts/jd_check_cookie.js >> /scripts/logs/jd_check_cookie.log
30 7 * * * node /scripts/jd_ddnc_farmpark.js >> /scripts/logs/jd_ddnc_farmpark.log
1 1 1 1 * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log
6 6,14 * * * node /scripts/jd_dwapp.js >> /scripts/logs/jd_dwapp.log
6 5,13 * * * node /scripts/jd_dygetbeans.js >> /scripts/logs/jd_dygetbeans.log
7 4,12 * * * node /scripts/jd_dygetbeans.js >> /scripts/logs/jd_dygetbeans.log
10 10 * * * node /scripts/jd_fruit_friend.js >> /scripts/logs/jd_fruit_friend.log
13 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log
21 9 * * * node /scripts/jd_gua_MMdou_Mod.js >> /scripts/logs/jd_gua_MMdou_Mod.log
21 8 * * * node /scripts/jd_gwfd.js >> /scripts/logs/jd_gwfd.log
45 20 * * * node /scripts/jd_hbCount.js >> /scripts/logs/jd_hbCount.log
15 13,20 * * * node /scripts/jd_hdcheck.js >> /scripts/logs/jd_hdcheck.log
13 0,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log
8 8 8 8 7 node /scripts/jd_healthCheck.js >> /scripts/logs/jd_healthCheck.log
10 12,20 * * * node /scripts/jd_insight.js >> /scripts/logs/jd_insight.log
16 12,20 * * * node /scripts/jd_jdjoypark.js >> /scripts/logs/jd_jdjoypark.log
20 12,20 * * * node /scripts/jd_jdkd.js >> /scripts/logs/jd_jdkd.log
40 12,20 * * * node /scripts/jd_jksq.js >> /scripts/logs/jd_jksq.log
40 0,10 * * * node /scripts/jd_jrsign.js >> /scripts/logs/jd_jrsign.log
1 3 * * * node /scripts/jd_marketmh.js >> /scripts/logs/jd_marketmh.log
1 5,11,15,19 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log
12 1,9 * * * node /scripts/jd_sign_graphics1.js >> /scripts/logs/jd_sign_graphics1.log
2 1,10 * * * node /scripts/jd_signbeanact.js >> /scripts/logs/jd_signbeanact.log
2 2,11 * * * node /scripts/jd_slider_sign.js >> /scripts/logs/jd_slider_sign.log
8 0-23/3 * * * node /scripts/jd_speed.js >> /scripts/logs/jd_speed.log
20 0,22 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log
20 5,21 * * * node /scripts/jd_speed_signfree.js >> /scripts/logs/jd_speed_signfree.log
30 9,14,18 * * * node /scripts/jd_superBrandJK_1.js >> /scripts/logs/jd_superBrandJK_1.log
30 21 * * * node /scripts/jd_superBrandStar.js >> /scripts/logs/jd_superBrandStar.log
39 */2 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log
39 20 * * * node /scripts/jd_vipgrowth.js >> /scripts/logs/jd_vipgrowth.log
2 0-23/4 * * * node /scripts/jd_wind_cash_Mod_Panda.js >> /scripts/logs/jd_wind_cash_Mod_Panda.log
29 */2 * * * node /scripts/jd_wind_gua_cleancart.js >> /scripts/logs/jd_wind_gua_cleancart.log
21 3,9 * * * node /scripts/jd_wind_sign_xd.js >> /scripts/logs/jd_wind_sign_xd.log
21 2,8 * * * node /scripts/jd_wind_speed_sign_new.js >> /scripts/logs/jd_wind_speed_sign_new.log
10 1,11 * * * node /scripts/jddj_plantBeans.js >> /scripts/logs/jddj_plantBeans.log
30 1,11 * * * node /scripts/jd_wq_wxsign.js >> /scripts/logs/jd_wq_wxsign.log
9 19 * * * node /scripts/jd_wyw.js >> /scripts/logs/jd_wyw.log
9 7 * * * node /scripts/jd_xiaoshou_sendBean.js >> /scripts/logs/jd_xiaoshou_sendBean.log
7 7 7 7 7 node /scripts/jd_fruit_watering.js >> /scripts/logs/jd_fruit_watering.log
10 0,9 * * * node /scripts/jd_fruit_help.js >> /scripts/logs/jd_fruit_help.log
30 0-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log
