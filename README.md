# GoodideaWeb
本方案為國立高雄第一科技大學創意創新雲端平台一般用戶前端部分。

本方案包含兩個子專案，以下分別對兩者進行簡單說明：

1. GoodideaJsLib：為創意創新雲端平台之JavaScript/TypeScript語言SDK

2. GoodideaWeb：創意創新雲端平台前端

[2016/7/6]有關CSRF風險，已於後端(非公開專案)移除原api之origin參數之效果，JsLib中所傳遞的origin參數將為無效，除goodidea.nkfust.edu.tw與www.goodidea.nkfust.edu.tw對於其跨站請求並未允許，僅開放127.0.0.0或localhost開頭不限埠號之開發用網域進行存取。
