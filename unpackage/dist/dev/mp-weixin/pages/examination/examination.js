(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/examination/examination"],{163:function(n,e,t){"use strict";(function(n){t(5);o(t(4));var e=o(t(164));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},164:function(n,e,t){"use strict";t.r(e);var o=t(165),i=t(167);for(var r in i)"default"!==r&&function(n){t.d(e,n,(function(){return i[n]}))}(r);t(169),t(171);var u,l=t(13),s=Object(l["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],u);s.options.__file="pages/examination/examination.vue",e["default"]=s.exports},165:function(n,e,t){"use strict";t.r(e);var o=t(166);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},166:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return i})),t.d(e,"staticRenderFns",(function(){return u})),t.d(e,"recyclableRender",(function(){return r})),t.d(e,"components",(function(){return o}));try{o={uniNavBar:function(){return t.e("node-modules/@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar").then(t.bind(null,256))},uniCountdown:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown")]).then(t.bind(null,263))},uniEasyinput:function(){return t.e("node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput").then(t.bind(null,230))},uniPopup:function(){return t.e("node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup").then(t.bind(null,216))},uniPopupDialog:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog")]).then(t.bind(null,237))}}}catch(l){if(-1===l.message.indexOf("Cannot find module")||-1===l.message.indexOf(".vue"))throw l;console.error(l.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var n=this,e=n.$createElement,t=(n._self._c,n.isLoading?n._f("problemType")(n.problemAllList[n.isProblemNum]):null),o=n.isLoading?[1,2,4].includes(n.problemAllList[n.isProblemNum].type):null,i=n.isLoading?n.__map(n.problemAllList[n.isProblemNum].ans,(function(e,t){var o=n.__get_orig(e),i=n.currentStyle(e);return{$orig:o,m0:i}})):null,r=n.isLoading?[3].includes(n.problemAllList[n.isProblemNum].type):null;n.$mp.data=Object.assign({},{$root:{f0:t,g0:o,l0:i,g1:r}})},r=!1,u=[];i._withStripped=!0},167:function(n,e,t){"use strict";t.r(e);var o=t(168),i=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},168:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(t(86)),i=t(61),r=t(53);function u(n){return n&&n.__esModule?n:{default:n}}function l(n,e,t,o,i,r,u){try{var l=n[r](u),s=l.value}catch(a){return void t(a)}l.done?e(s):Promise.resolve(s).then(o,i)}function s(n){return function(){var e=this,t=arguments;return new Promise((function(o,i){var r=n.apply(e,t);function u(n){l(r,o,i,u,s,"next",n)}function s(n){l(r,o,i,u,s,"throw",n)}u(void 0)}))}}var a=function(){t.e("components/NavBar").then(function(){return resolve(t(223))}.bind(null,t)).catch(t.oe)},c={data:function(){return{MenuButtonObj:{bottom:80,height:32,left:281,right:368,top:48,width:87},isPlLookTyp:!1,stopShow:!1,countdownstart:!1,problemInfo:{},chapter_id:"",msgType:"success",errorMessage:!1,blanksValue:"",isLoading:!1,isProblem:!0,isProblemNum:0,problemAllList:[]}},components:{NavBar:a},onLoad:function(n){console.log(n,"答题的请求参数");var e={id:3},t=e.id;this.chapter_id=t,this.getExamProblem(t),this.$refs.popup.open("center"),this.getHeight()},computed:{currentProblem:function(){return this.problemAllList.filter((function(n){return n.answer_value})).length},emptyProblem:function(){return this.problemAllList.length-this.problemAllList.filter((function(n){return n.answer_value})).length}},filters:{problemType:function(n){var e={1:"单选题",2:"多选题",3:"填空题",4:"判断题"},t=null===n||void 0===n?void 0:n.type;return e[t]}},methods:{back:function(){var e=this;n.showModal({title:"友情提示",content:"返回将提前交卷，是否确认？",success:function(n){n.confirm&&e.dialogConfirm()}})},getHeight:function(){var n=wx.getMenuButtonBoundingClientRect();console.log(n,"胶囊参数"),this.MenuButtonObj=n},change:function(n){this.stopShow=n.show},timeup:function(){var e=this;n.showModal({title:"考试时间到！",content:"点击确认立即交卷",showCancel:!1,success:function(n){n.confirm&&e.dialogConfirm()}})},onBackFun:function(){n.switchTab({url:"/pages/home/home"})},onOutClick:function(){n.navigateBack()},onStart:function(){this.countdownstart=!0,this.$refs.popup.close()},dialogConfirm:function(){console.log("点击确认");var e=this,t=(this.problemAllList.filter((function(n){return n.right_key!=n.answer_value})).map((function(n){return n.id})),this.problemAllList.filter((function(n){return n.right_key==n.answer_value})).map((function(n){return n.id}))),o={exam_id:this.problemInfo.id,right_ids:t};(0,i.subExamResult)(o).then((function(t){n.showToast({mask:!0,title:"提交成功",icon:"none"}),setTimeout((function(){e.onBackFun()}),1500)})).catch((function(n){setTimeout((function(){e.onBackFun()}),1500)}))},onNextProblem:function(){var n=this.problemAllList[this.isProblemNum];this.isPlLookTyp=!1,3==n.type&&(this.problemAllList[this.isProblemNum].answer_value=this.blanksValue,this.blanksValue=""),this.isProblemNum<=this.problemAllList.length-2?(this.isProblemNum+=1,this.isStopButton=!1):this.$refs.alertDialog.open()},currentStyle:function(n){var e=this.problemAllList[this.isProblemNum];if(e["answer_value"].includes(n.number)&&e["answer_value"])return" yse-problem"},onAnswer:function(e){var t=this.problemAllList[this.isProblemNum],o=t["answer_value"];if(console.log(e,e.type,o,"选的项"),o){1!=t.type&&4!=t.type||(n.showToast({title:"请认真审查题型",icon:"none"}),this.isPlLookTyp=!0),o=o.split("");var i=o.includes(e.number);i?o=o.filter((function(n){return n!=e.number})):o.push(e.number)}else o=[],o.push(e.number);o=o.sort(),o=o.join(""),this.problemAllList[this.isProblemNum].answer_value=o},onProblemNumber:function(n,e){this.isProblemNum=e,this.isProblem=!0,this.isPlLookTyp=!1;var t=this.problemAllList[this.isProblemNum];3==(null===t||void 0===t?void 0:t.type)&&(this.blanksValue=t["answer_value"])},onStar:function(){this.isProblem=!0},onCard:function(){this.isProblem=!1},getExamProblem:function(){var e=this;return s(o.default.mark((function t(){var r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.showLoading({title:"加载中",mask:!0}),e.isLoading=!1,t.next=4,(0,i.getExamProblem)();case 4:r=t.sent,e.problemInfo=r.exam_info,e.problemAllList=r.problem.map((function(n){return n["answer_value"]="",n})),e.isLoading=!0,n.hideLoading();case 9:case"end":return t.stop()}}),t)})))()},getToken:function(){(0,i.getTokenApi)().then((function(n){var e=n.token;(0,r.setToken)(e)}))}}};e.default=c}).call(this,t(1)["default"])},169:function(n,e,t){"use strict";t.r(e);var o=t(170),i=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},170:function(n,e,t){},171:function(n,e,t){"use strict";t.r(e);var o=t(172),i=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},172:function(n,e,t){}},[[163,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/examination/examination.js.map