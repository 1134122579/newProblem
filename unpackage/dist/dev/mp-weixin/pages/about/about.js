(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/about/about"],{101:function(n,e,t){"use strict";(function(n){t(5);o(t(4));var e=o(t(102));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},102:function(n,e,t){"use strict";t.r(e);var o=t(103),r=t(105);for(var u in r)"default"!==u&&function(n){t.d(e,n,(function(){return r[n]}))}(u);t(107);var c,a=t(14),i=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],c);i.options.__file="pages/about/about.vue",e["default"]=i.exports},103:function(n,e,t){"use strict";t.r(e);var o=t(104);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},104:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return c})),t.d(e,"recyclableRender",(function(){return u})),t.d(e,"components",(function(){return o}));try{o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(t.bind(null,173))},tabbar:function(){return t.e("components/tabbar/tabbar").then(t.bind(null,181))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement;n._self._c},u=!1,c=[];r._withStripped=!0},105:function(n,e,t){"use strict";t.r(e);var o=t(106),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},106:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(61),r=t(11),u=function(){t.e("components/tabbar/tabbar").then(function(){return resolve(t(181))}.bind(null,t)).catch(t.oe)},c={data:function(){return{active:"我的",userinfo:{}}},components:{tabbar:u},onLoad:function(){},onShow:function(){this.userinfo=(0,r.getDefineToken)("userinfo")},methods:{onCollect:function(){n.navigateTo({url:"/pages/collect/collect"})},onmyExamLog:function(){n.navigateTo({url:"/pages/myExamLog/myExamLog"})},onscoreLog:function(){n.navigateTo({url:"/pages/scoreLog/index"})},goPage:function(){n.navigateTo({url:"/pages/userinfo/userinfo"})},getToken:function(){(0,o.getTokenApi)().then((function(n){var e=n.token;(0,r.setToken)(e)}))}}};e.default=c}).call(this,t(1)["default"])},107:function(n,e,t){"use strict";t.r(e);var o=t(108),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},108:function(n,e,t){}},[[101,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/about/about.js.map