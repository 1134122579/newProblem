(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/problemType/problemType"],{70:function(n,e,t){"use strict";(function(n){t(5);r(t(4));var e=r(t(71));function r(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},71:function(n,e,t){"use strict";t.r(e);var r=t(72),i=t(74);for(var c in i)"default"!==c&&function(n){t.d(e,n,(function(){return i[n]}))}(c);t(76);var o,u=t(11),a=Object(u["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,"38533bfa",null,!1,r["components"],o);a.options.__file="pages/problemType/problemType.vue",e["default"]=a.exports},72:function(n,e,t){"use strict";t.r(e);var r=t(73);t.d(e,"render",(function(){return r["render"]})),t.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(e,"components",(function(){return r["components"]}))},73:function(n,e,t){"use strict";var r;t.r(e),t.d(e,"render",(function(){return i})),t.d(e,"staticRenderFns",(function(){return o})),t.d(e,"recyclableRender",(function(){return c})),t.d(e,"components",(function(){return r}));var i=function(){var n=this,e=n.$createElement;n._self._c},c=!1,o=[];i._withStripped=!0},74:function(n,e,t){"use strict";t.r(e);var r=t(75),i=t.n(r);for(var c in r)"default"!==c&&function(n){t.d(e,n,(function(){return r[n]}))}(c);e["default"]=i.a},75:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(59),i={data:function(){return{activeId:0,list:[],show:!0,sonlist:[]}},onLoad:function(){this.getclassify()},methods:{goProblemPage:function(e){console.log(e),n.navigateTo({url:"/pages/chapter/chapter?class_id=".concat(e.id)})},oclabelClick:function(n){this.activeId!=n.id&&(this.sonlist=n.children,this.activeId=n.id)},getclassify:function(){var n=this;(0,r.getclassify)().then((function(e){n.list=e,n.sonlist=e[0].children,n.activeId=e[0].id}))}}};e.default=i}).call(this,t(1)["default"])},76:function(n,e,t){"use strict";t.r(e);var r=t(77),i=t.n(r);for(var c in r)"default"!==c&&function(n){t.d(e,n,(function(){return r[n]}))}(c);e["default"]=i.a},77:function(n,e,t){}},[[70,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/problemType/problemType.js.map