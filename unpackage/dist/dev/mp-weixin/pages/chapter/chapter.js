(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chapter/chapter"],{112:function(n,t,e){"use strict";(function(n){e(5);r(e(4));var t=r(e(113));function r(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e(1)["createPage"])},113:function(n,t,e){"use strict";e.r(t);var r=e(114),u=e(116);for(var c in u)"default"!==c&&function(n){e.d(t,n,(function(){return u[n]}))}(c);e(118);var o,a=e(11),i=Object(a["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);i.options.__file="pages/chapter/chapter.vue",t["default"]=i.exports},114:function(n,t,e){"use strict";e.r(t);var r=e(115);e.d(t,"render",(function(){return r["render"]})),e.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(t,"components",(function(){return r["components"]}))},115:function(n,t,e){"use strict";var r;e.r(t),e.d(t,"render",(function(){return u})),e.d(t,"staticRenderFns",(function(){return o})),e.d(t,"recyclableRender",(function(){return c})),e.d(t,"components",(function(){return r}));var u=function(){var n=this,t=n.$createElement;n._self._c},c=!1,o=[];u._withStripped=!0},116:function(n,t,e){"use strict";e.r(t);var r=e(117),u=e.n(r);for(var c in r)"default"!==c&&function(n){e.d(t,n,(function(){return r[n]}))}(c);t["default"]=u.a},117:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=e(58),u={data:function(){return{list:[]}},onLoad:function(n){var t=n.class_id;this.getChapter(t)},methods:{goProblemPage:function(t){n.navigateTo({url:"/pages/problems/index?id=".concat(t.id)})},getChapter:function(n){var t=this;(0,r.getChapter)({class_id:n}).then((function(n){console.log(n,"章节列表"),t.list=n.map((function(n){return n["pgNum"]=n.train_num/n.num*100,n}))}))}}};t.default=u}).call(this,e(1)["default"])},118:function(n,t,e){"use strict";e.r(t);var r=e(119),u=e.n(r);for(var c in r)"default"!==c&&function(n){e.d(t,n,(function(){return r[n]}))}(c);t["default"]=u.a},119:function(n,t,e){}},[[112,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chapter/chapter.js.map