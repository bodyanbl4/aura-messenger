(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function NE(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jy={exports:{}},Vu={},Fy={exports:{}},ae={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga=Symbol.for("react.element"),DE=Symbol.for("react.portal"),OE=Symbol.for("react.fragment"),VE=Symbol.for("react.strict_mode"),ME=Symbol.for("react.profiler"),LE=Symbol.for("react.provider"),jE=Symbol.for("react.context"),FE=Symbol.for("react.forward_ref"),UE=Symbol.for("react.suspense"),zE=Symbol.for("react.memo"),BE=Symbol.for("react.lazy"),Kp=Symbol.iterator;function $E(t){return t===null||typeof t!="object"?null:(t=Kp&&t[Kp]||t["@@iterator"],typeof t=="function"?t:null)}var Uy={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zy=Object.assign,By={};function Us(t,e,n){this.props=t,this.context=e,this.refs=By,this.updater=n||Uy}Us.prototype.isReactComponent={};Us.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Us.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function $y(){}$y.prototype=Us.prototype;function Dd(t,e,n){this.props=t,this.context=e,this.refs=By,this.updater=n||Uy}var Od=Dd.prototype=new $y;Od.constructor=Dd;zy(Od,Us.prototype);Od.isPureReactComponent=!0;var Gp=Array.isArray,Wy=Object.prototype.hasOwnProperty,Vd={current:null},qy={key:!0,ref:!0,__self:!0,__source:!0};function Hy(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Wy.call(e,r)&&!qy.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:ga,type:t,key:s,ref:o,props:i,_owner:Vd.current}}function WE(t,e){return{$$typeof:ga,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Md(t){return typeof t=="object"&&t!==null&&t.$$typeof===ga}function qE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Qp=/\/+/g;function Cc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?qE(""+t.key):e.toString(36)}function Rl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ga:case DE:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Cc(o,0):r,Gp(i)?(n="",t!=null&&(n=t.replace(Qp,"$&/")+"/"),Rl(i,e,n,"",function(h){return h})):i!=null&&(Md(i)&&(i=WE(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Qp,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Gp(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Cc(s,l);o+=Rl(s,e,n,u,i)}else if(u=$E(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Cc(s,l++),o+=Rl(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function tl(t,e,n){if(t==null)return t;var r=[],i=0;return Rl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function HE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var xt={current:null},xl={transition:null},KE={ReactCurrentDispatcher:xt,ReactCurrentBatchConfig:xl,ReactCurrentOwner:Vd};function Ky(){throw Error("act(...) is not supported in production builds of React.")}ae.Children={map:tl,forEach:function(t,e,n){tl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return tl(t,function(){e++}),e},toArray:function(t){return tl(t,function(e){return e})||[]},only:function(t){if(!Md(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ae.Component=Us;ae.Fragment=OE;ae.Profiler=ME;ae.PureComponent=Dd;ae.StrictMode=VE;ae.Suspense=UE;ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=KE;ae.act=Ky;ae.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=zy({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Vd.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Wy.call(e,u)&&!qy.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:ga,type:t.type,key:i,ref:s,props:r,_owner:o}};ae.createContext=function(t){return t={$$typeof:jE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:LE,_context:t},t.Consumer=t};ae.createElement=Hy;ae.createFactory=function(t){var e=Hy.bind(null,t);return e.type=t,e};ae.createRef=function(){return{current:null}};ae.forwardRef=function(t){return{$$typeof:FE,render:t}};ae.isValidElement=Md;ae.lazy=function(t){return{$$typeof:BE,_payload:{_status:-1,_result:t},_init:HE}};ae.memo=function(t,e){return{$$typeof:zE,type:t,compare:e===void 0?null:e}};ae.startTransition=function(t){var e=xl.transition;xl.transition={};try{t()}finally{xl.transition=e}};ae.unstable_act=Ky;ae.useCallback=function(t,e){return xt.current.useCallback(t,e)};ae.useContext=function(t){return xt.current.useContext(t)};ae.useDebugValue=function(){};ae.useDeferredValue=function(t){return xt.current.useDeferredValue(t)};ae.useEffect=function(t,e){return xt.current.useEffect(t,e)};ae.useId=function(){return xt.current.useId()};ae.useImperativeHandle=function(t,e,n){return xt.current.useImperativeHandle(t,e,n)};ae.useInsertionEffect=function(t,e){return xt.current.useInsertionEffect(t,e)};ae.useLayoutEffect=function(t,e){return xt.current.useLayoutEffect(t,e)};ae.useMemo=function(t,e){return xt.current.useMemo(t,e)};ae.useReducer=function(t,e,n){return xt.current.useReducer(t,e,n)};ae.useRef=function(t){return xt.current.useRef(t)};ae.useState=function(t){return xt.current.useState(t)};ae.useSyncExternalStore=function(t,e,n){return xt.current.useSyncExternalStore(t,e,n)};ae.useTransition=function(){return xt.current.useTransition()};ae.version="18.3.1";Fy.exports=ae;var Q=Fy.exports;const GE=NE(Q);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var QE=Q,XE=Symbol.for("react.element"),YE=Symbol.for("react.fragment"),JE=Object.prototype.hasOwnProperty,ZE=QE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,e1={key:!0,ref:!0,__self:!0,__source:!0};function Gy(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)JE.call(e,r)&&!e1.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:XE,type:t,key:s,ref:o,props:i,_owner:ZE.current}}Vu.Fragment=YE;Vu.jsx=Gy;Vu.jsxs=Gy;jy.exports=Vu;var m=jy.exports,mh={},Qy={exports:{}},Kt={},Xy={exports:{}},Yy={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(q,ee){var Z=q.length;q.push(ee);e:for(;0<Z;){var Ie=Z-1>>>1,ge=q[Ie];if(0<i(ge,ee))q[Ie]=ee,q[Z]=ge,Z=Ie;else break e}}function n(q){return q.length===0?null:q[0]}function r(q){if(q.length===0)return null;var ee=q[0],Z=q.pop();if(Z!==ee){q[0]=Z;e:for(var Ie=0,ge=q.length,Se=ge>>>1;Ie<Se;){var Qt=2*(Ie+1)-1,Xt=q[Qt],Pt=Qt+1,dt=q[Pt];if(0>i(Xt,Z))Pt<ge&&0>i(dt,Xt)?(q[Ie]=dt,q[Pt]=Z,Ie=Pt):(q[Ie]=Xt,q[Qt]=Z,Ie=Qt);else if(Pt<ge&&0>i(dt,Z))q[Ie]=dt,q[Pt]=Z,Ie=Pt;else break e}}return ee}function i(q,ee){var Z=q.sortIndex-ee.sortIndex;return Z!==0?Z:q.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],f=1,g=null,v=3,R=!1,b=!1,N=!1,V=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,T=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(q){for(var ee=n(h);ee!==null;){if(ee.callback===null)r(h);else if(ee.startTime<=q)r(h),ee.sortIndex=ee.expirationTime,e(u,ee);else break;ee=n(h)}}function D(q){if(N=!1,A(q),!b)if(n(u)!==null)b=!0,wn(U);else{var ee=n(h);ee!==null&&Ft(D,ee.startTime-q)}}function U(q,ee){b=!1,N&&(N=!1,k(y),y=-1),R=!0;var Z=v;try{for(A(ee),g=n(u);g!==null&&(!(g.expirationTime>ee)||q&&!x());){var Ie=g.callback;if(typeof Ie=="function"){g.callback=null,v=g.priorityLevel;var ge=Ie(g.expirationTime<=ee);ee=t.unstable_now(),typeof ge=="function"?g.callback=ge:g===n(u)&&r(u),A(ee)}else r(u);g=n(u)}if(g!==null)var Se=!0;else{var Qt=n(h);Qt!==null&&Ft(D,Qt.startTime-ee),Se=!1}return Se}finally{g=null,v=Z,R=!1}}var z=!1,_=null,y=-1,w=5,S=-1;function x(){return!(t.unstable_now()-S<w)}function C(){if(_!==null){var q=t.unstable_now();S=q;var ee=!0;try{ee=_(!0,q)}finally{ee?I():(z=!1,_=null)}}else z=!1}var I;if(typeof T=="function")I=function(){T(C)};else if(typeof MessageChannel<"u"){var Ee=new MessageChannel,jt=Ee.port2;Ee.port1.onmessage=C,I=function(){jt.postMessage(null)}}else I=function(){V(C,0)};function wn(q){_=q,z||(z=!0,I())}function Ft(q,ee){y=V(function(){q(t.unstable_now())},ee)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(q){q.callback=null},t.unstable_continueExecution=function(){b||R||(b=!0,wn(U))},t.unstable_forceFrameRate=function(q){0>q||125<q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<q?Math.floor(1e3/q):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(q){switch(v){case 1:case 2:case 3:var ee=3;break;default:ee=v}var Z=v;v=ee;try{return q()}finally{v=Z}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(q,ee){switch(q){case 1:case 2:case 3:case 4:case 5:break;default:q=3}var Z=v;v=q;try{return ee()}finally{v=Z}},t.unstable_scheduleCallback=function(q,ee,Z){var Ie=t.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?Ie+Z:Ie):Z=Ie,q){case 1:var ge=-1;break;case 2:ge=250;break;case 5:ge=1073741823;break;case 4:ge=1e4;break;default:ge=5e3}return ge=Z+ge,q={id:f++,callback:ee,priorityLevel:q,startTime:Z,expirationTime:ge,sortIndex:-1},Z>Ie?(q.sortIndex=Z,e(h,q),n(u)===null&&q===n(h)&&(N?(k(y),y=-1):N=!0,Ft(D,Z-Ie))):(q.sortIndex=ge,e(u,q),b||R||(b=!0,wn(U))),q},t.unstable_shouldYield=x,t.unstable_wrapCallback=function(q){var ee=v;return function(){var Z=v;v=ee;try{return q.apply(this,arguments)}finally{v=Z}}}})(Yy);Xy.exports=Yy;var t1=Xy.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n1=Q,Ht=t1;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Jy=new Set,Wo={};function Oi(t,e){ks(t,e),ks(t+"Capture",e)}function ks(t,e){for(Wo[t]=e,t=0;t<e.length;t++)Jy.add(e[t])}var er=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gh=Object.prototype.hasOwnProperty,r1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xp={},Yp={};function i1(t){return gh.call(Yp,t)?!0:gh.call(Xp,t)?!1:r1.test(t)?Yp[t]=!0:(Xp[t]=!0,!1)}function s1(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function o1(t,e,n,r){if(e===null||typeof e>"u"||s1(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ct(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var ct={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){ct[t]=new Ct(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];ct[e]=new Ct(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){ct[t]=new Ct(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){ct[t]=new Ct(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){ct[t]=new Ct(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){ct[t]=new Ct(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){ct[t]=new Ct(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){ct[t]=new Ct(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){ct[t]=new Ct(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ld=/[\-:]([a-z])/g;function jd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ld,jd);ct[e]=new Ct(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ld,jd);ct[e]=new Ct(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ld,jd);ct[e]=new Ct(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){ct[t]=new Ct(t,1,!1,t.toLowerCase(),null,!1,!1)});ct.xlinkHref=new Ct("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){ct[t]=new Ct(t,1,!1,t.toLowerCase(),null,!0,!0)});function Fd(t,e,n,r){var i=ct.hasOwnProperty(e)?ct[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(o1(e,n,i,r)&&(n=null),r||i===null?i1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var ur=n1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,nl=Symbol.for("react.element"),ns=Symbol.for("react.portal"),rs=Symbol.for("react.fragment"),Ud=Symbol.for("react.strict_mode"),yh=Symbol.for("react.profiler"),Zy=Symbol.for("react.provider"),ev=Symbol.for("react.context"),zd=Symbol.for("react.forward_ref"),vh=Symbol.for("react.suspense"),_h=Symbol.for("react.suspense_list"),Bd=Symbol.for("react.memo"),Ir=Symbol.for("react.lazy"),tv=Symbol.for("react.offscreen"),Jp=Symbol.iterator;function fo(t){return t===null||typeof t!="object"?null:(t=Jp&&t[Jp]||t["@@iterator"],typeof t=="function"?t:null)}var Me=Object.assign,Pc;function To(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var bc=!1;function Nc(t,e){if(!t||bc)return"";bc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{bc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?To(t):""}function a1(t){switch(t.tag){case 5:return To(t.type);case 16:return To("Lazy");case 13:return To("Suspense");case 19:return To("SuspenseList");case 0:case 2:case 15:return t=Nc(t.type,!1),t;case 11:return t=Nc(t.type.render,!1),t;case 1:return t=Nc(t.type,!0),t;default:return""}}function wh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case rs:return"Fragment";case ns:return"Portal";case yh:return"Profiler";case Ud:return"StrictMode";case vh:return"Suspense";case _h:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ev:return(t.displayName||"Context")+".Consumer";case Zy:return(t._context.displayName||"Context")+".Provider";case zd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Bd:return e=t.displayName||null,e!==null?e:wh(t.type)||"Memo";case Ir:e=t._payload,t=t._init;try{return wh(t(e))}catch{}}return null}function l1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wh(e);case 8:return e===Ud?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Kr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function nv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function u1(t){var e=nv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function rl(t){t._valueTracker||(t._valueTracker=u1(t))}function rv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=nv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Gl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Eh(t,e){var n=e.checked;return Me({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Zp(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Kr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function iv(t,e){e=e.checked,e!=null&&Fd(t,"checked",e,!1)}function Th(t,e){iv(t,e);var n=Kr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ih(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ih(t,e.type,Kr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function em(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ih(t,e,n){(e!=="number"||Gl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Io=Array.isArray;function ms(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Kr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Sh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return Me({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function tm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(Io(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Kr(n)}}function sv(t,e){var n=Kr(e.value),r=Kr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function nm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function ov(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function kh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?ov(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var il,av=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(il=il||document.createElement("div"),il.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=il.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function qo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Po={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},c1=["Webkit","ms","Moz","O"];Object.keys(Po).forEach(function(t){c1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Po[e]=Po[t]})});function lv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Po.hasOwnProperty(t)&&Po[t]?(""+e).trim():e+"px"}function uv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=lv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var h1=Me({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ah(t,e){if(e){if(h1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function Rh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xh=null;function $d(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ch=null,gs=null,ys=null;function rm(t){if(t=_a(t)){if(typeof Ch!="function")throw Error(F(280));var e=t.stateNode;e&&(e=Uu(e),Ch(t.stateNode,t.type,e))}}function cv(t){gs?ys?ys.push(t):ys=[t]:gs=t}function hv(){if(gs){var t=gs,e=ys;if(ys=gs=null,rm(t),e)for(t=0;t<e.length;t++)rm(e[t])}}function dv(t,e){return t(e)}function fv(){}var Dc=!1;function pv(t,e,n){if(Dc)return t(e,n);Dc=!0;try{return dv(t,e,n)}finally{Dc=!1,(gs!==null||ys!==null)&&(fv(),hv())}}function Ho(t,e){var n=t.stateNode;if(n===null)return null;var r=Uu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Ph=!1;if(er)try{var po={};Object.defineProperty(po,"passive",{get:function(){Ph=!0}}),window.addEventListener("test",po,po),window.removeEventListener("test",po,po)}catch{Ph=!1}function d1(t,e,n,r,i,s,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var bo=!1,Ql=null,Xl=!1,bh=null,f1={onError:function(t){bo=!0,Ql=t}};function p1(t,e,n,r,i,s,o,l,u){bo=!1,Ql=null,d1.apply(f1,arguments)}function m1(t,e,n,r,i,s,o,l,u){if(p1.apply(this,arguments),bo){if(bo){var h=Ql;bo=!1,Ql=null}else throw Error(F(198));Xl||(Xl=!0,bh=h)}}function Vi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function mv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function im(t){if(Vi(t)!==t)throw Error(F(188))}function g1(t){var e=t.alternate;if(!e){if(e=Vi(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return im(i),t;if(s===r)return im(i),e;s=s.sibling}throw Error(F(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function gv(t){return t=g1(t),t!==null?yv(t):null}function yv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=yv(t);if(e!==null)return e;t=t.sibling}return null}var vv=Ht.unstable_scheduleCallback,sm=Ht.unstable_cancelCallback,y1=Ht.unstable_shouldYield,v1=Ht.unstable_requestPaint,qe=Ht.unstable_now,_1=Ht.unstable_getCurrentPriorityLevel,Wd=Ht.unstable_ImmediatePriority,_v=Ht.unstable_UserBlockingPriority,Yl=Ht.unstable_NormalPriority,w1=Ht.unstable_LowPriority,wv=Ht.unstable_IdlePriority,Mu=null,Cn=null;function E1(t){if(Cn&&typeof Cn.onCommitFiberRoot=="function")try{Cn.onCommitFiberRoot(Mu,t,void 0,(t.current.flags&128)===128)}catch{}}var gn=Math.clz32?Math.clz32:S1,T1=Math.log,I1=Math.LN2;function S1(t){return t>>>=0,t===0?32:31-(T1(t)/I1|0)|0}var sl=64,ol=4194304;function So(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Jl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=So(l):(s&=o,s!==0&&(r=So(s)))}else o=n&~i,o!==0?r=So(o):s!==0&&(r=So(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-gn(e),i=1<<n,r|=t[n],e&=~i;return r}function k1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function A1(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-gn(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=k1(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Nh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ev(){var t=sl;return sl<<=1,!(sl&4194240)&&(sl=64),t}function Oc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ya(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-gn(e),t[e]=n}function R1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-gn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function qd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-gn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var _e=0;function Tv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Iv,Hd,Sv,kv,Av,Dh=!1,al=[],Or=null,Vr=null,Mr=null,Ko=new Map,Go=new Map,kr=[],x1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function om(t,e){switch(t){case"focusin":case"focusout":Or=null;break;case"dragenter":case"dragleave":Vr=null;break;case"mouseover":case"mouseout":Mr=null;break;case"pointerover":case"pointerout":Ko.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Go.delete(e.pointerId)}}function mo(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=_a(e),e!==null&&Hd(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function C1(t,e,n,r,i){switch(e){case"focusin":return Or=mo(Or,t,e,n,r,i),!0;case"dragenter":return Vr=mo(Vr,t,e,n,r,i),!0;case"mouseover":return Mr=mo(Mr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Ko.set(s,mo(Ko.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Go.set(s,mo(Go.get(s)||null,t,e,n,r,i)),!0}return!1}function Rv(t){var e=yi(t.target);if(e!==null){var n=Vi(e);if(n!==null){if(e=n.tag,e===13){if(e=mv(n),e!==null){t.blockedOn=e,Av(t.priority,function(){Sv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Cl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Oh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);xh=r,n.target.dispatchEvent(r),xh=null}else return e=_a(n),e!==null&&Hd(e),t.blockedOn=n,!1;e.shift()}return!0}function am(t,e,n){Cl(t)&&n.delete(e)}function P1(){Dh=!1,Or!==null&&Cl(Or)&&(Or=null),Vr!==null&&Cl(Vr)&&(Vr=null),Mr!==null&&Cl(Mr)&&(Mr=null),Ko.forEach(am),Go.forEach(am)}function go(t,e){t.blockedOn===e&&(t.blockedOn=null,Dh||(Dh=!0,Ht.unstable_scheduleCallback(Ht.unstable_NormalPriority,P1)))}function Qo(t){function e(i){return go(i,t)}if(0<al.length){go(al[0],t);for(var n=1;n<al.length;n++){var r=al[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Or!==null&&go(Or,t),Vr!==null&&go(Vr,t),Mr!==null&&go(Mr,t),Ko.forEach(e),Go.forEach(e),n=0;n<kr.length;n++)r=kr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<kr.length&&(n=kr[0],n.blockedOn===null);)Rv(n),n.blockedOn===null&&kr.shift()}var vs=ur.ReactCurrentBatchConfig,Zl=!0;function b1(t,e,n,r){var i=_e,s=vs.transition;vs.transition=null;try{_e=1,Kd(t,e,n,r)}finally{_e=i,vs.transition=s}}function N1(t,e,n,r){var i=_e,s=vs.transition;vs.transition=null;try{_e=4,Kd(t,e,n,r)}finally{_e=i,vs.transition=s}}function Kd(t,e,n,r){if(Zl){var i=Oh(t,e,n,r);if(i===null)Wc(t,e,r,eu,n),om(t,r);else if(C1(i,t,e,n,r))r.stopPropagation();else if(om(t,r),e&4&&-1<x1.indexOf(t)){for(;i!==null;){var s=_a(i);if(s!==null&&Iv(s),s=Oh(t,e,n,r),s===null&&Wc(t,e,r,eu,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Wc(t,e,r,null,n)}}var eu=null;function Oh(t,e,n,r){if(eu=null,t=$d(r),t=yi(t),t!==null)if(e=Vi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=mv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return eu=t,null}function xv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_1()){case Wd:return 1;case _v:return 4;case Yl:case w1:return 16;case wv:return 536870912;default:return 16}default:return 16}}var br=null,Gd=null,Pl=null;function Cv(){if(Pl)return Pl;var t,e=Gd,n=e.length,r,i="value"in br?br.value:br.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Pl=i.slice(t,1<r?1-r:void 0)}function bl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ll(){return!0}function lm(){return!1}function Gt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ll:lm,this.isPropagationStopped=lm,this}return Me(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ll)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ll)},persist:function(){},isPersistent:ll}),e}var zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qd=Gt(zs),va=Me({},zs,{view:0,detail:0}),D1=Gt(va),Vc,Mc,yo,Lu=Me({},va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==yo&&(yo&&t.type==="mousemove"?(Vc=t.screenX-yo.screenX,Mc=t.screenY-yo.screenY):Mc=Vc=0,yo=t),Vc)},movementY:function(t){return"movementY"in t?t.movementY:Mc}}),um=Gt(Lu),O1=Me({},Lu,{dataTransfer:0}),V1=Gt(O1),M1=Me({},va,{relatedTarget:0}),Lc=Gt(M1),L1=Me({},zs,{animationName:0,elapsedTime:0,pseudoElement:0}),j1=Gt(L1),F1=Me({},zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),U1=Gt(F1),z1=Me({},zs,{data:0}),cm=Gt(z1),B1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},W1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function q1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=W1[t])?!!e[t]:!1}function Xd(){return q1}var H1=Me({},va,{key:function(t){if(t.key){var e=B1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=bl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?$1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xd,charCode:function(t){return t.type==="keypress"?bl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?bl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),K1=Gt(H1),G1=Me({},Lu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hm=Gt(G1),Q1=Me({},va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xd}),X1=Gt(Q1),Y1=Me({},zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),J1=Gt(Y1),Z1=Me({},Lu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),eT=Gt(Z1),tT=[9,13,27,32],Yd=er&&"CompositionEvent"in window,No=null;er&&"documentMode"in document&&(No=document.documentMode);var nT=er&&"TextEvent"in window&&!No,Pv=er&&(!Yd||No&&8<No&&11>=No),dm=" ",fm=!1;function bv(t,e){switch(t){case"keyup":return tT.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function rT(t,e){switch(t){case"compositionend":return Nv(e);case"keypress":return e.which!==32?null:(fm=!0,dm);case"textInput":return t=e.data,t===dm&&fm?null:t;default:return null}}function iT(t,e){if(is)return t==="compositionend"||!Yd&&bv(t,e)?(t=Cv(),Pl=Gd=br=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Pv&&e.locale!=="ko"?null:e.data;default:return null}}var sT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!sT[t.type]:e==="textarea"}function Dv(t,e,n,r){cv(r),e=tu(e,"onChange"),0<e.length&&(n=new Qd("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Do=null,Xo=null;function oT(t){Wv(t,0)}function ju(t){var e=as(t);if(rv(e))return t}function aT(t,e){if(t==="change")return e}var Ov=!1;if(er){var jc;if(er){var Fc="oninput"in document;if(!Fc){var mm=document.createElement("div");mm.setAttribute("oninput","return;"),Fc=typeof mm.oninput=="function"}jc=Fc}else jc=!1;Ov=jc&&(!document.documentMode||9<document.documentMode)}function gm(){Do&&(Do.detachEvent("onpropertychange",Vv),Xo=Do=null)}function Vv(t){if(t.propertyName==="value"&&ju(Xo)){var e=[];Dv(e,Xo,t,$d(t)),pv(oT,e)}}function lT(t,e,n){t==="focusin"?(gm(),Do=e,Xo=n,Do.attachEvent("onpropertychange",Vv)):t==="focusout"&&gm()}function uT(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ju(Xo)}function cT(t,e){if(t==="click")return ju(e)}function hT(t,e){if(t==="input"||t==="change")return ju(e)}function dT(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var vn=typeof Object.is=="function"?Object.is:dT;function Yo(t,e){if(vn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!gh.call(e,i)||!vn(t[i],e[i]))return!1}return!0}function ym(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function vm(t,e){var n=ym(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ym(n)}}function Mv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Mv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Lv(){for(var t=window,e=Gl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Gl(t.document)}return e}function Jd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function fT(t){var e=Lv(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Mv(n.ownerDocument.documentElement,n)){if(r!==null&&Jd(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=vm(n,s);var o=vm(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var pT=er&&"documentMode"in document&&11>=document.documentMode,ss=null,Vh=null,Oo=null,Mh=!1;function _m(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mh||ss==null||ss!==Gl(r)||(r=ss,"selectionStart"in r&&Jd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Oo&&Yo(Oo,r)||(Oo=r,r=tu(Vh,"onSelect"),0<r.length&&(e=new Qd("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ss)))}function ul(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var os={animationend:ul("Animation","AnimationEnd"),animationiteration:ul("Animation","AnimationIteration"),animationstart:ul("Animation","AnimationStart"),transitionend:ul("Transition","TransitionEnd")},Uc={},jv={};er&&(jv=document.createElement("div").style,"AnimationEvent"in window||(delete os.animationend.animation,delete os.animationiteration.animation,delete os.animationstart.animation),"TransitionEvent"in window||delete os.transitionend.transition);function Fu(t){if(Uc[t])return Uc[t];if(!os[t])return t;var e=os[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in jv)return Uc[t]=e[n];return t}var Fv=Fu("animationend"),Uv=Fu("animationiteration"),zv=Fu("animationstart"),Bv=Fu("transitionend"),$v=new Map,wm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ti(t,e){$v.set(t,e),Oi(e,[t])}for(var zc=0;zc<wm.length;zc++){var Bc=wm[zc],mT=Bc.toLowerCase(),gT=Bc[0].toUpperCase()+Bc.slice(1);ti(mT,"on"+gT)}ti(Fv,"onAnimationEnd");ti(Uv,"onAnimationIteration");ti(zv,"onAnimationStart");ti("dblclick","onDoubleClick");ti("focusin","onFocus");ti("focusout","onBlur");ti(Bv,"onTransitionEnd");ks("onMouseEnter",["mouseout","mouseover"]);ks("onMouseLeave",["mouseout","mouseover"]);ks("onPointerEnter",["pointerout","pointerover"]);ks("onPointerLeave",["pointerout","pointerover"]);Oi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Oi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Oi("onBeforeInput",["compositionend","keypress","textInput","paste"]);Oi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),yT=new Set("cancel close invalid load scroll toggle".split(" ").concat(ko));function Em(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,m1(r,e,void 0,t),t.currentTarget=null}function Wv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Em(i,l,h),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Em(i,l,h),s=u}}}if(Xl)throw t=bh,Xl=!1,bh=null,t}function xe(t,e){var n=e[zh];n===void 0&&(n=e[zh]=new Set);var r=t+"__bubble";n.has(r)||(qv(e,t,2,!1),n.add(r))}function $c(t,e,n){var r=0;e&&(r|=4),qv(n,t,r,e)}var cl="_reactListening"+Math.random().toString(36).slice(2);function Jo(t){if(!t[cl]){t[cl]=!0,Jy.forEach(function(n){n!=="selectionchange"&&(yT.has(n)||$c(n,!1,t),$c(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[cl]||(e[cl]=!0,$c("selectionchange",!1,e))}}function qv(t,e,n,r){switch(xv(e)){case 1:var i=b1;break;case 4:i=N1;break;default:i=Kd}n=i.bind(null,e,n,t),i=void 0,!Ph||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Wc(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=yi(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}pv(function(){var h=s,f=$d(n),g=[];e:{var v=$v.get(t);if(v!==void 0){var R=Qd,b=t;switch(t){case"keypress":if(bl(n)===0)break e;case"keydown":case"keyup":R=K1;break;case"focusin":b="focus",R=Lc;break;case"focusout":b="blur",R=Lc;break;case"beforeblur":case"afterblur":R=Lc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=um;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=V1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=X1;break;case Fv:case Uv:case zv:R=j1;break;case Bv:R=J1;break;case"scroll":R=D1;break;case"wheel":R=eT;break;case"copy":case"cut":case"paste":R=U1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=hm}var N=(e&4)!==0,V=!N&&t==="scroll",k=N?v!==null?v+"Capture":null:v;N=[];for(var T=h,A;T!==null;){A=T;var D=A.stateNode;if(A.tag===5&&D!==null&&(A=D,k!==null&&(D=Ho(T,k),D!=null&&N.push(Zo(T,D,A)))),V)break;T=T.return}0<N.length&&(v=new R(v,b,null,n,f),g.push({event:v,listeners:N}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",R=t==="mouseout"||t==="pointerout",v&&n!==xh&&(b=n.relatedTarget||n.fromElement)&&(yi(b)||b[tr]))break e;if((R||v)&&(v=f.window===f?f:(v=f.ownerDocument)?v.defaultView||v.parentWindow:window,R?(b=n.relatedTarget||n.toElement,R=h,b=b?yi(b):null,b!==null&&(V=Vi(b),b!==V||b.tag!==5&&b.tag!==6)&&(b=null)):(R=null,b=h),R!==b)){if(N=um,D="onMouseLeave",k="onMouseEnter",T="mouse",(t==="pointerout"||t==="pointerover")&&(N=hm,D="onPointerLeave",k="onPointerEnter",T="pointer"),V=R==null?v:as(R),A=b==null?v:as(b),v=new N(D,T+"leave",R,n,f),v.target=V,v.relatedTarget=A,D=null,yi(f)===h&&(N=new N(k,T+"enter",b,n,f),N.target=A,N.relatedTarget=V,D=N),V=D,R&&b)t:{for(N=R,k=b,T=0,A=N;A;A=Xi(A))T++;for(A=0,D=k;D;D=Xi(D))A++;for(;0<T-A;)N=Xi(N),T--;for(;0<A-T;)k=Xi(k),A--;for(;T--;){if(N===k||k!==null&&N===k.alternate)break t;N=Xi(N),k=Xi(k)}N=null}else N=null;R!==null&&Tm(g,v,R,N,!1),b!==null&&V!==null&&Tm(g,V,b,N,!0)}}e:{if(v=h?as(h):window,R=v.nodeName&&v.nodeName.toLowerCase(),R==="select"||R==="input"&&v.type==="file")var U=aT;else if(pm(v))if(Ov)U=hT;else{U=uT;var z=lT}else(R=v.nodeName)&&R.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(U=cT);if(U&&(U=U(t,h))){Dv(g,U,n,f);break e}z&&z(t,v,h),t==="focusout"&&(z=v._wrapperState)&&z.controlled&&v.type==="number"&&Ih(v,"number",v.value)}switch(z=h?as(h):window,t){case"focusin":(pm(z)||z.contentEditable==="true")&&(ss=z,Vh=h,Oo=null);break;case"focusout":Oo=Vh=ss=null;break;case"mousedown":Mh=!0;break;case"contextmenu":case"mouseup":case"dragend":Mh=!1,_m(g,n,f);break;case"selectionchange":if(pT)break;case"keydown":case"keyup":_m(g,n,f)}var _;if(Yd)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else is?bv(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(Pv&&n.locale!=="ko"&&(is||y!=="onCompositionStart"?y==="onCompositionEnd"&&is&&(_=Cv()):(br=f,Gd="value"in br?br.value:br.textContent,is=!0)),z=tu(h,y),0<z.length&&(y=new cm(y,t,null,n,f),g.push({event:y,listeners:z}),_?y.data=_:(_=Nv(n),_!==null&&(y.data=_)))),(_=nT?rT(t,n):iT(t,n))&&(h=tu(h,"onBeforeInput"),0<h.length&&(f=new cm("onBeforeInput","beforeinput",null,n,f),g.push({event:f,listeners:h}),f.data=_))}Wv(g,e)})}function Zo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function tu(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ho(t,n),s!=null&&r.unshift(Zo(t,s,i)),s=Ho(t,e),s!=null&&r.push(Zo(t,s,i))),t=t.return}return r}function Xi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Tm(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=Ho(n,s),u!=null&&o.unshift(Zo(n,u,l))):i||(u=Ho(n,s),u!=null&&o.push(Zo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var vT=/\r\n?/g,_T=/\u0000|\uFFFD/g;function Im(t){return(typeof t=="string"?t:""+t).replace(vT,`
`).replace(_T,"")}function hl(t,e,n){if(e=Im(e),Im(t)!==e&&n)throw Error(F(425))}function nu(){}var Lh=null,jh=null;function Fh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Uh=typeof setTimeout=="function"?setTimeout:void 0,wT=typeof clearTimeout=="function"?clearTimeout:void 0,Sm=typeof Promise=="function"?Promise:void 0,ET=typeof queueMicrotask=="function"?queueMicrotask:typeof Sm<"u"?function(t){return Sm.resolve(null).then(t).catch(TT)}:Uh;function TT(t){setTimeout(function(){throw t})}function qc(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Qo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Qo(e)}function Lr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function km(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Bs=Math.random().toString(36).slice(2),xn="__reactFiber$"+Bs,ea="__reactProps$"+Bs,tr="__reactContainer$"+Bs,zh="__reactEvents$"+Bs,IT="__reactListeners$"+Bs,ST="__reactHandles$"+Bs;function yi(t){var e=t[xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[tr]||n[xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=km(t);t!==null;){if(n=t[xn])return n;t=km(t)}return e}t=n,n=t.parentNode}return null}function _a(t){return t=t[xn]||t[tr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function as(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function Uu(t){return t[ea]||null}var Bh=[],ls=-1;function ni(t){return{current:t}}function Pe(t){0>ls||(t.current=Bh[ls],Bh[ls]=null,ls--)}function ke(t,e){ls++,Bh[ls]=t.current,t.current=e}var Gr={},Tt=ni(Gr),Vt=ni(!1),Si=Gr;function As(t,e){var n=t.type.contextTypes;if(!n)return Gr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Mt(t){return t=t.childContextTypes,t!=null}function ru(){Pe(Vt),Pe(Tt)}function Am(t,e,n){if(Tt.current!==Gr)throw Error(F(168));ke(Tt,e),ke(Vt,n)}function Hv(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(F(108,l1(t)||"Unknown",i));return Me({},n,r)}function iu(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Gr,Si=Tt.current,ke(Tt,t),ke(Vt,Vt.current),!0}function Rm(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=Hv(t,e,Si),r.__reactInternalMemoizedMergedChildContext=t,Pe(Vt),Pe(Tt),ke(Tt,t)):Pe(Vt),ke(Vt,n)}var Hn=null,zu=!1,Hc=!1;function Kv(t){Hn===null?Hn=[t]:Hn.push(t)}function kT(t){zu=!0,Kv(t)}function ri(){if(!Hc&&Hn!==null){Hc=!0;var t=0,e=_e;try{var n=Hn;for(_e=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Hn=null,zu=!1}catch(i){throw Hn!==null&&(Hn=Hn.slice(t+1)),vv(Wd,ri),i}finally{_e=e,Hc=!1}}return null}var us=[],cs=0,su=null,ou=0,en=[],tn=0,ki=null,Kn=1,Gn="";function pi(t,e){us[cs++]=ou,us[cs++]=su,su=t,ou=e}function Gv(t,e,n){en[tn++]=Kn,en[tn++]=Gn,en[tn++]=ki,ki=t;var r=Kn;t=Gn;var i=32-gn(r)-1;r&=~(1<<i),n+=1;var s=32-gn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Kn=1<<32-gn(e)+i|n<<i|r,Gn=s+t}else Kn=1<<s|n<<i|r,Gn=t}function Zd(t){t.return!==null&&(pi(t,1),Gv(t,1,0))}function ef(t){for(;t===su;)su=us[--cs],us[cs]=null,ou=us[--cs],us[cs]=null;for(;t===ki;)ki=en[--tn],en[tn]=null,Gn=en[--tn],en[tn]=null,Kn=en[--tn],en[tn]=null}var qt=null,$t=null,be=!1,pn=null;function Qv(t,e){var n=nn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function xm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,qt=t,$t=Lr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,qt=t,$t=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ki!==null?{id:Kn,overflow:Gn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=nn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,qt=t,$t=null,!0):!1;default:return!1}}function $h(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Wh(t){if(be){var e=$t;if(e){var n=e;if(!xm(t,e)){if($h(t))throw Error(F(418));e=Lr(n.nextSibling);var r=qt;e&&xm(t,e)?Qv(r,n):(t.flags=t.flags&-4097|2,be=!1,qt=t)}}else{if($h(t))throw Error(F(418));t.flags=t.flags&-4097|2,be=!1,qt=t}}}function Cm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;qt=t}function dl(t){if(t!==qt)return!1;if(!be)return Cm(t),be=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Fh(t.type,t.memoizedProps)),e&&(e=$t)){if($h(t))throw Xv(),Error(F(418));for(;e;)Qv(t,e),e=Lr(e.nextSibling)}if(Cm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){$t=Lr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}$t=null}}else $t=qt?Lr(t.stateNode.nextSibling):null;return!0}function Xv(){for(var t=$t;t;)t=Lr(t.nextSibling)}function Rs(){$t=qt=null,be=!1}function tf(t){pn===null?pn=[t]:pn.push(t)}var AT=ur.ReactCurrentBatchConfig;function vo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function fl(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Pm(t){var e=t._init;return e(t._payload)}function Yv(t){function e(k,T){if(t){var A=k.deletions;A===null?(k.deletions=[T],k.flags|=16):A.push(T)}}function n(k,T){if(!t)return null;for(;T!==null;)e(k,T),T=T.sibling;return null}function r(k,T){for(k=new Map;T!==null;)T.key!==null?k.set(T.key,T):k.set(T.index,T),T=T.sibling;return k}function i(k,T){return k=zr(k,T),k.index=0,k.sibling=null,k}function s(k,T,A){return k.index=A,t?(A=k.alternate,A!==null?(A=A.index,A<T?(k.flags|=2,T):A):(k.flags|=2,T)):(k.flags|=1048576,T)}function o(k){return t&&k.alternate===null&&(k.flags|=2),k}function l(k,T,A,D){return T===null||T.tag!==6?(T=Zc(A,k.mode,D),T.return=k,T):(T=i(T,A),T.return=k,T)}function u(k,T,A,D){var U=A.type;return U===rs?f(k,T,A.props.children,D,A.key):T!==null&&(T.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Ir&&Pm(U)===T.type)?(D=i(T,A.props),D.ref=vo(k,T,A),D.return=k,D):(D=jl(A.type,A.key,A.props,null,k.mode,D),D.ref=vo(k,T,A),D.return=k,D)}function h(k,T,A,D){return T===null||T.tag!==4||T.stateNode.containerInfo!==A.containerInfo||T.stateNode.implementation!==A.implementation?(T=eh(A,k.mode,D),T.return=k,T):(T=i(T,A.children||[]),T.return=k,T)}function f(k,T,A,D,U){return T===null||T.tag!==7?(T=Ti(A,k.mode,D,U),T.return=k,T):(T=i(T,A),T.return=k,T)}function g(k,T,A){if(typeof T=="string"&&T!==""||typeof T=="number")return T=Zc(""+T,k.mode,A),T.return=k,T;if(typeof T=="object"&&T!==null){switch(T.$$typeof){case nl:return A=jl(T.type,T.key,T.props,null,k.mode,A),A.ref=vo(k,null,T),A.return=k,A;case ns:return T=eh(T,k.mode,A),T.return=k,T;case Ir:var D=T._init;return g(k,D(T._payload),A)}if(Io(T)||fo(T))return T=Ti(T,k.mode,A,null),T.return=k,T;fl(k,T)}return null}function v(k,T,A,D){var U=T!==null?T.key:null;if(typeof A=="string"&&A!==""||typeof A=="number")return U!==null?null:l(k,T,""+A,D);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case nl:return A.key===U?u(k,T,A,D):null;case ns:return A.key===U?h(k,T,A,D):null;case Ir:return U=A._init,v(k,T,U(A._payload),D)}if(Io(A)||fo(A))return U!==null?null:f(k,T,A,D,null);fl(k,A)}return null}function R(k,T,A,D,U){if(typeof D=="string"&&D!==""||typeof D=="number")return k=k.get(A)||null,l(T,k,""+D,U);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case nl:return k=k.get(D.key===null?A:D.key)||null,u(T,k,D,U);case ns:return k=k.get(D.key===null?A:D.key)||null,h(T,k,D,U);case Ir:var z=D._init;return R(k,T,A,z(D._payload),U)}if(Io(D)||fo(D))return k=k.get(A)||null,f(T,k,D,U,null);fl(T,D)}return null}function b(k,T,A,D){for(var U=null,z=null,_=T,y=T=0,w=null;_!==null&&y<A.length;y++){_.index>y?(w=_,_=null):w=_.sibling;var S=v(k,_,A[y],D);if(S===null){_===null&&(_=w);break}t&&_&&S.alternate===null&&e(k,_),T=s(S,T,y),z===null?U=S:z.sibling=S,z=S,_=w}if(y===A.length)return n(k,_),be&&pi(k,y),U;if(_===null){for(;y<A.length;y++)_=g(k,A[y],D),_!==null&&(T=s(_,T,y),z===null?U=_:z.sibling=_,z=_);return be&&pi(k,y),U}for(_=r(k,_);y<A.length;y++)w=R(_,k,y,A[y],D),w!==null&&(t&&w.alternate!==null&&_.delete(w.key===null?y:w.key),T=s(w,T,y),z===null?U=w:z.sibling=w,z=w);return t&&_.forEach(function(x){return e(k,x)}),be&&pi(k,y),U}function N(k,T,A,D){var U=fo(A);if(typeof U!="function")throw Error(F(150));if(A=U.call(A),A==null)throw Error(F(151));for(var z=U=null,_=T,y=T=0,w=null,S=A.next();_!==null&&!S.done;y++,S=A.next()){_.index>y?(w=_,_=null):w=_.sibling;var x=v(k,_,S.value,D);if(x===null){_===null&&(_=w);break}t&&_&&x.alternate===null&&e(k,_),T=s(x,T,y),z===null?U=x:z.sibling=x,z=x,_=w}if(S.done)return n(k,_),be&&pi(k,y),U;if(_===null){for(;!S.done;y++,S=A.next())S=g(k,S.value,D),S!==null&&(T=s(S,T,y),z===null?U=S:z.sibling=S,z=S);return be&&pi(k,y),U}for(_=r(k,_);!S.done;y++,S=A.next())S=R(_,k,y,S.value,D),S!==null&&(t&&S.alternate!==null&&_.delete(S.key===null?y:S.key),T=s(S,T,y),z===null?U=S:z.sibling=S,z=S);return t&&_.forEach(function(C){return e(k,C)}),be&&pi(k,y),U}function V(k,T,A,D){if(typeof A=="object"&&A!==null&&A.type===rs&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case nl:e:{for(var U=A.key,z=T;z!==null;){if(z.key===U){if(U=A.type,U===rs){if(z.tag===7){n(k,z.sibling),T=i(z,A.props.children),T.return=k,k=T;break e}}else if(z.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===Ir&&Pm(U)===z.type){n(k,z.sibling),T=i(z,A.props),T.ref=vo(k,z,A),T.return=k,k=T;break e}n(k,z);break}else e(k,z);z=z.sibling}A.type===rs?(T=Ti(A.props.children,k.mode,D,A.key),T.return=k,k=T):(D=jl(A.type,A.key,A.props,null,k.mode,D),D.ref=vo(k,T,A),D.return=k,k=D)}return o(k);case ns:e:{for(z=A.key;T!==null;){if(T.key===z)if(T.tag===4&&T.stateNode.containerInfo===A.containerInfo&&T.stateNode.implementation===A.implementation){n(k,T.sibling),T=i(T,A.children||[]),T.return=k,k=T;break e}else{n(k,T);break}else e(k,T);T=T.sibling}T=eh(A,k.mode,D),T.return=k,k=T}return o(k);case Ir:return z=A._init,V(k,T,z(A._payload),D)}if(Io(A))return b(k,T,A,D);if(fo(A))return N(k,T,A,D);fl(k,A)}return typeof A=="string"&&A!==""||typeof A=="number"?(A=""+A,T!==null&&T.tag===6?(n(k,T.sibling),T=i(T,A),T.return=k,k=T):(n(k,T),T=Zc(A,k.mode,D),T.return=k,k=T),o(k)):n(k,T)}return V}var xs=Yv(!0),Jv=Yv(!1),au=ni(null),lu=null,hs=null,nf=null;function rf(){nf=hs=lu=null}function sf(t){var e=au.current;Pe(au),t._currentValue=e}function qh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function _s(t,e){lu=t,nf=hs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Ot=!0),t.firstContext=null)}function an(t){var e=t._currentValue;if(nf!==t)if(t={context:t,memoizedValue:e,next:null},hs===null){if(lu===null)throw Error(F(308));hs=t,lu.dependencies={lanes:0,firstContext:t}}else hs=hs.next=t;return e}var vi=null;function of(t){vi===null?vi=[t]:vi.push(t)}function Zv(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,of(e)):(n.next=i.next,i.next=n),e.interleaved=n,nr(t,r)}function nr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Sr=!1;function af(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function e_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Zn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function jr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,he&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,nr(t,n)}return i=r.interleaved,i===null?(e.next=e,of(r)):(e.next=i.next,i.next=e),r.interleaved=e,nr(t,n)}function Nl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,qd(t,n)}}function bm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function uu(t,e,n,r){var i=t.updateQueue;Sr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?s=h:o.next=h,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var g=i.baseState;o=0,f=h=u=null,l=s;do{var v=l.lane,R=l.eventTime;if((r&v)===v){f!==null&&(f=f.next={eventTime:R,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var b=t,N=l;switch(v=e,R=n,N.tag){case 1:if(b=N.payload,typeof b=="function"){g=b.call(R,g,v);break e}g=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=N.payload,v=typeof b=="function"?b.call(R,g,v):b,v==null)break e;g=Me({},g,v);break e;case 2:Sr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=i.effects,v===null?i.effects=[l]:v.push(l))}else R={eventTime:R,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=R,u=g):f=f.next=R,o|=v;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;v=l,l=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);if(f===null&&(u=g),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ri|=o,t.lanes=o,t.memoizedState=g}}function Nm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(F(191,i));i.call(r)}}}var wa={},Pn=ni(wa),ta=ni(wa),na=ni(wa);function _i(t){if(t===wa)throw Error(F(174));return t}function lf(t,e){switch(ke(na,e),ke(ta,t),ke(Pn,wa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:kh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=kh(e,t)}Pe(Pn),ke(Pn,e)}function Cs(){Pe(Pn),Pe(ta),Pe(na)}function t_(t){_i(na.current);var e=_i(Pn.current),n=kh(e,t.type);e!==n&&(ke(ta,t),ke(Pn,n))}function uf(t){ta.current===t&&(Pe(Pn),Pe(ta))}var Oe=ni(0);function cu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Kc=[];function cf(){for(var t=0;t<Kc.length;t++)Kc[t]._workInProgressVersionPrimary=null;Kc.length=0}var Dl=ur.ReactCurrentDispatcher,Gc=ur.ReactCurrentBatchConfig,Ai=0,Ve=null,Qe=null,Ze=null,hu=!1,Vo=!1,ra=0,RT=0;function mt(){throw Error(F(321))}function hf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!vn(t[n],e[n]))return!1;return!0}function df(t,e,n,r,i,s){if(Ai=s,Ve=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Dl.current=t===null||t.memoizedState===null?bT:NT,t=n(r,i),Vo){s=0;do{if(Vo=!1,ra=0,25<=s)throw Error(F(301));s+=1,Ze=Qe=null,e.updateQueue=null,Dl.current=DT,t=n(r,i)}while(Vo)}if(Dl.current=du,e=Qe!==null&&Qe.next!==null,Ai=0,Ze=Qe=Ve=null,hu=!1,e)throw Error(F(300));return t}function ff(){var t=ra!==0;return ra=0,t}function Rn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?Ve.memoizedState=Ze=t:Ze=Ze.next=t,Ze}function ln(){if(Qe===null){var t=Ve.alternate;t=t!==null?t.memoizedState:null}else t=Qe.next;var e=Ze===null?Ve.memoizedState:Ze.next;if(e!==null)Ze=e,Qe=t;else{if(t===null)throw Error(F(310));Qe=t,t={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},Ze===null?Ve.memoizedState=Ze=t:Ze=Ze.next=t}return Ze}function ia(t,e){return typeof e=="function"?e(t):e}function Qc(t){var e=ln(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=Qe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,h=s;do{var f=h.lane;if((Ai&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var g={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=g,o=r):u=u.next=g,Ve.lanes|=f,Ri|=f}h=h.next}while(h!==null&&h!==s);u===null?o=r:u.next=l,vn(r,e.memoizedState)||(Ot=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Ve.lanes|=s,Ri|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Xc(t){var e=ln(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);vn(s,e.memoizedState)||(Ot=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function n_(){}function r_(t,e){var n=Ve,r=ln(),i=e(),s=!vn(r.memoizedState,i);if(s&&(r.memoizedState=i,Ot=!0),r=r.queue,pf(o_.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ze!==null&&Ze.memoizedState.tag&1){if(n.flags|=2048,sa(9,s_.bind(null,n,r,i,e),void 0,null),et===null)throw Error(F(349));Ai&30||i_(n,e,i)}return i}function i_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ve.updateQueue,e===null?(e={lastEffect:null,stores:null},Ve.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function s_(t,e,n,r){e.value=n,e.getSnapshot=r,a_(e)&&l_(t)}function o_(t,e,n){return n(function(){a_(e)&&l_(t)})}function a_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!vn(t,n)}catch{return!0}}function l_(t){var e=nr(t,1);e!==null&&yn(e,t,1,-1)}function Dm(t){var e=Rn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:t},e.queue=t,t=t.dispatch=PT.bind(null,Ve,t),[e.memoizedState,t]}function sa(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ve.updateQueue,e===null?(e={lastEffect:null,stores:null},Ve.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function u_(){return ln().memoizedState}function Ol(t,e,n,r){var i=Rn();Ve.flags|=t,i.memoizedState=sa(1|e,n,void 0,r===void 0?null:r)}function Bu(t,e,n,r){var i=ln();r=r===void 0?null:r;var s=void 0;if(Qe!==null){var o=Qe.memoizedState;if(s=o.destroy,r!==null&&hf(r,o.deps)){i.memoizedState=sa(e,n,s,r);return}}Ve.flags|=t,i.memoizedState=sa(1|e,n,s,r)}function Om(t,e){return Ol(8390656,8,t,e)}function pf(t,e){return Bu(2048,8,t,e)}function c_(t,e){return Bu(4,2,t,e)}function h_(t,e){return Bu(4,4,t,e)}function d_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function f_(t,e,n){return n=n!=null?n.concat([t]):null,Bu(4,4,d_.bind(null,e,t),n)}function mf(){}function p_(t,e){var n=ln();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&hf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function m_(t,e){var n=ln();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&hf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function g_(t,e,n){return Ai&21?(vn(n,e)||(n=Ev(),Ve.lanes|=n,Ri|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Ot=!0),t.memoizedState=n)}function xT(t,e){var n=_e;_e=n!==0&&4>n?n:4,t(!0);var r=Gc.transition;Gc.transition={};try{t(!1),e()}finally{_e=n,Gc.transition=r}}function y_(){return ln().memoizedState}function CT(t,e,n){var r=Ur(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},v_(t))__(e,n);else if(n=Zv(t,e,n,r),n!==null){var i=Rt();yn(n,t,r,i),w_(n,e,r)}}function PT(t,e,n){var r=Ur(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(v_(t))__(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,vn(l,o)){var u=e.interleaved;u===null?(i.next=i,of(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Zv(t,e,i,r),n!==null&&(i=Rt(),yn(n,t,r,i),w_(n,e,r))}}function v_(t){var e=t.alternate;return t===Ve||e!==null&&e===Ve}function __(t,e){Vo=hu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function w_(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,qd(t,n)}}var du={readContext:an,useCallback:mt,useContext:mt,useEffect:mt,useImperativeHandle:mt,useInsertionEffect:mt,useLayoutEffect:mt,useMemo:mt,useReducer:mt,useRef:mt,useState:mt,useDebugValue:mt,useDeferredValue:mt,useTransition:mt,useMutableSource:mt,useSyncExternalStore:mt,useId:mt,unstable_isNewReconciler:!1},bT={readContext:an,useCallback:function(t,e){return Rn().memoizedState=[t,e===void 0?null:e],t},useContext:an,useEffect:Om,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ol(4194308,4,d_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ol(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ol(4,2,t,e)},useMemo:function(t,e){var n=Rn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Rn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=CT.bind(null,Ve,t),[r.memoizedState,t]},useRef:function(t){var e=Rn();return t={current:t},e.memoizedState=t},useState:Dm,useDebugValue:mf,useDeferredValue:function(t){return Rn().memoizedState=t},useTransition:function(){var t=Dm(!1),e=t[0];return t=xT.bind(null,t[1]),Rn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ve,i=Rn();if(be){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),et===null)throw Error(F(349));Ai&30||i_(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Om(o_.bind(null,r,s,t),[t]),r.flags|=2048,sa(9,s_.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Rn(),e=et.identifierPrefix;if(be){var n=Gn,r=Kn;n=(r&~(1<<32-gn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ra++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=RT++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},NT={readContext:an,useCallback:p_,useContext:an,useEffect:pf,useImperativeHandle:f_,useInsertionEffect:c_,useLayoutEffect:h_,useMemo:m_,useReducer:Qc,useRef:u_,useState:function(){return Qc(ia)},useDebugValue:mf,useDeferredValue:function(t){var e=ln();return g_(e,Qe.memoizedState,t)},useTransition:function(){var t=Qc(ia)[0],e=ln().memoizedState;return[t,e]},useMutableSource:n_,useSyncExternalStore:r_,useId:y_,unstable_isNewReconciler:!1},DT={readContext:an,useCallback:p_,useContext:an,useEffect:pf,useImperativeHandle:f_,useInsertionEffect:c_,useLayoutEffect:h_,useMemo:m_,useReducer:Xc,useRef:u_,useState:function(){return Xc(ia)},useDebugValue:mf,useDeferredValue:function(t){var e=ln();return Qe===null?e.memoizedState=t:g_(e,Qe.memoizedState,t)},useTransition:function(){var t=Xc(ia)[0],e=ln().memoizedState;return[t,e]},useMutableSource:n_,useSyncExternalStore:r_,useId:y_,unstable_isNewReconciler:!1};function dn(t,e){if(t&&t.defaultProps){e=Me({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Hh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Me({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var $u={isMounted:function(t){return(t=t._reactInternals)?Vi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Rt(),i=Ur(t),s=Zn(r,i);s.payload=e,n!=null&&(s.callback=n),e=jr(t,s,i),e!==null&&(yn(e,t,i,r),Nl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Rt(),i=Ur(t),s=Zn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=jr(t,s,i),e!==null&&(yn(e,t,i,r),Nl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Rt(),r=Ur(t),i=Zn(n,r);i.tag=2,e!=null&&(i.callback=e),e=jr(t,i,r),e!==null&&(yn(e,t,r,n),Nl(e,t,r))}};function Vm(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Yo(n,r)||!Yo(i,s):!0}function E_(t,e,n){var r=!1,i=Gr,s=e.contextType;return typeof s=="object"&&s!==null?s=an(s):(i=Mt(e)?Si:Tt.current,r=e.contextTypes,s=(r=r!=null)?As(t,i):Gr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=$u,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Mm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&$u.enqueueReplaceState(e,e.state,null)}function Kh(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},af(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=an(s):(s=Mt(e)?Si:Tt.current,i.context=As(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Hh(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&$u.enqueueReplaceState(i,i.state,null),uu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Ps(t,e){try{var n="",r=e;do n+=a1(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function Yc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Gh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var OT=typeof WeakMap=="function"?WeakMap:Map;function T_(t,e,n){n=Zn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){pu||(pu=!0,id=r),Gh(t,e)},n}function I_(t,e,n){n=Zn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Gh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Gh(t,e),typeof r!="function"&&(Fr===null?Fr=new Set([this]):Fr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Lm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new OT;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=GT.bind(null,t,e,n),e.then(t,t))}function jm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Fm(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Zn(-1,1),e.tag=2,jr(n,e,1))),n.lanes|=1),t)}var VT=ur.ReactCurrentOwner,Ot=!1;function At(t,e,n,r){e.child=t===null?Jv(e,null,n,r):xs(e,t.child,n,r)}function Um(t,e,n,r,i){n=n.render;var s=e.ref;return _s(e,i),r=df(t,e,n,r,s,i),n=ff(),t!==null&&!Ot?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,rr(t,e,i)):(be&&n&&Zd(e),e.flags|=1,At(t,e,r,i),e.child)}function zm(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!If(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,S_(t,e,s,r,i)):(t=jl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Yo,n(o,r)&&t.ref===e.ref)return rr(t,e,i)}return e.flags|=1,t=zr(s,r),t.ref=e.ref,t.return=e,e.child=t}function S_(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Yo(s,r)&&t.ref===e.ref)if(Ot=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Ot=!0);else return e.lanes=t.lanes,rr(t,e,i)}return Qh(t,e,n,r,i)}function k_(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ke(fs,Bt),Bt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ke(fs,Bt),Bt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ke(fs,Bt),Bt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ke(fs,Bt),Bt|=r;return At(t,e,i,n),e.child}function A_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Qh(t,e,n,r,i){var s=Mt(n)?Si:Tt.current;return s=As(e,s),_s(e,i),n=df(t,e,n,r,s,i),r=ff(),t!==null&&!Ot?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,rr(t,e,i)):(be&&r&&Zd(e),e.flags|=1,At(t,e,n,i),e.child)}function Bm(t,e,n,r,i){if(Mt(n)){var s=!0;iu(e)}else s=!1;if(_s(e,i),e.stateNode===null)Vl(t,e),E_(e,n,r),Kh(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=an(h):(h=Mt(n)?Si:Tt.current,h=As(e,h));var f=n.getDerivedStateFromProps,g=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&Mm(e,o,r,h),Sr=!1;var v=e.memoizedState;o.state=v,uu(e,r,o,i),u=e.memoizedState,l!==r||v!==u||Vt.current||Sr?(typeof f=="function"&&(Hh(e,n,f,r),u=e.memoizedState),(l=Sr||Vm(e,n,l,r,v,u,h))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,e_(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:dn(e.type,l),o.props=h,g=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=an(u):(u=Mt(n)?Si:Tt.current,u=As(e,u));var R=n.getDerivedStateFromProps;(f=typeof R=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==g||v!==u)&&Mm(e,o,r,u),Sr=!1,v=e.memoizedState,o.state=v,uu(e,r,o,i);var b=e.memoizedState;l!==g||v!==b||Vt.current||Sr?(typeof R=="function"&&(Hh(e,n,R,r),b=e.memoizedState),(h=Sr||Vm(e,n,h,r,v,b,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,b,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,b,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=b),o.props=r,o.state=b,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Xh(t,e,n,r,s,i)}function Xh(t,e,n,r,i,s){A_(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Rm(e,n,!1),rr(t,e,s);r=e.stateNode,VT.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=xs(e,t.child,null,s),e.child=xs(e,null,l,s)):At(t,e,l,s),e.memoizedState=r.state,i&&Rm(e,n,!0),e.child}function R_(t){var e=t.stateNode;e.pendingContext?Am(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Am(t,e.context,!1),lf(t,e.containerInfo)}function $m(t,e,n,r,i){return Rs(),tf(i),e.flags|=256,At(t,e,n,r),e.child}var Yh={dehydrated:null,treeContext:null,retryLane:0};function Jh(t){return{baseLanes:t,cachePool:null,transitions:null}}function x_(t,e,n){var r=e.pendingProps,i=Oe.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ke(Oe,i&1),t===null)return Wh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Hu(o,r,0,null),t=Ti(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Jh(n),e.memoizedState=Yh,t):gf(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return MT(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=zr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=zr(l,s):(s=Ti(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?Jh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Yh,r}return s=t.child,t=s.sibling,r=zr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function gf(t,e){return e=Hu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function pl(t,e,n,r){return r!==null&&tf(r),xs(e,t.child,null,n),t=gf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function MT(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=Yc(Error(F(422))),pl(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Hu({mode:"visible",children:r.children},i,0,null),s=Ti(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&xs(e,t.child,null,o),e.child.memoizedState=Jh(o),e.memoizedState=Yh,s);if(!(e.mode&1))return pl(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(F(419)),r=Yc(s,r,void 0),pl(t,e,o,r)}if(l=(o&t.childLanes)!==0,Ot||l){if(r=et,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,nr(t,i),yn(r,t,i,-1))}return Tf(),r=Yc(Error(F(421))),pl(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=QT.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,$t=Lr(i.nextSibling),qt=e,be=!0,pn=null,t!==null&&(en[tn++]=Kn,en[tn++]=Gn,en[tn++]=ki,Kn=t.id,Gn=t.overflow,ki=e),e=gf(e,r.children),e.flags|=4096,e)}function Wm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),qh(t.return,e,n)}function Jc(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function C_(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(At(t,e,r.children,n),r=Oe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Wm(t,n,e);else if(t.tag===19)Wm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ke(Oe,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&cu(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Jc(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&cu(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Jc(e,!0,n,null,s);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Vl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function rr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ri|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=zr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=zr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function LT(t,e,n){switch(e.tag){case 3:R_(e),Rs();break;case 5:t_(e);break;case 1:Mt(e.type)&&iu(e);break;case 4:lf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ke(au,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ke(Oe,Oe.current&1),e.flags|=128,null):n&e.child.childLanes?x_(t,e,n):(ke(Oe,Oe.current&1),t=rr(t,e,n),t!==null?t.sibling:null);ke(Oe,Oe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return C_(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ke(Oe,Oe.current),r)break;return null;case 22:case 23:return e.lanes=0,k_(t,e,n)}return rr(t,e,n)}var P_,Zh,b_,N_;P_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Zh=function(){};b_=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,_i(Pn.current);var s=null;switch(n){case"input":i=Eh(t,i),r=Eh(t,r),s=[];break;case"select":i=Me({},i,{value:void 0}),r=Me({},r,{value:void 0}),s=[];break;case"textarea":i=Sh(t,i),r=Sh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=nu)}Ah(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Wo.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Wo.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&xe("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};N_=function(t,e,n,r){n!==r&&(e.flags|=4)};function _o(t,e){if(!be)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function gt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function jT(t,e,n){var r=e.pendingProps;switch(ef(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gt(e),null;case 1:return Mt(e.type)&&ru(),gt(e),null;case 3:return r=e.stateNode,Cs(),Pe(Vt),Pe(Tt),cf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(dl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,pn!==null&&(ad(pn),pn=null))),Zh(t,e),gt(e),null;case 5:uf(e);var i=_i(na.current);if(n=e.type,t!==null&&e.stateNode!=null)b_(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return gt(e),null}if(t=_i(Pn.current),dl(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[xn]=e,r[ea]=s,t=(e.mode&1)!==0,n){case"dialog":xe("cancel",r),xe("close",r);break;case"iframe":case"object":case"embed":xe("load",r);break;case"video":case"audio":for(i=0;i<ko.length;i++)xe(ko[i],r);break;case"source":xe("error",r);break;case"img":case"image":case"link":xe("error",r),xe("load",r);break;case"details":xe("toggle",r);break;case"input":Zp(r,s),xe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},xe("invalid",r);break;case"textarea":tm(r,s),xe("invalid",r)}Ah(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&hl(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&hl(r.textContent,l,t),i=["children",""+l]):Wo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&xe("scroll",r)}switch(n){case"input":rl(r),em(r,s,!0);break;case"textarea":rl(r),nm(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=nu)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ov(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[xn]=e,t[ea]=r,P_(t,e,!1,!1),e.stateNode=t;e:{switch(o=Rh(n,r),n){case"dialog":xe("cancel",t),xe("close",t),i=r;break;case"iframe":case"object":case"embed":xe("load",t),i=r;break;case"video":case"audio":for(i=0;i<ko.length;i++)xe(ko[i],t);i=r;break;case"source":xe("error",t),i=r;break;case"img":case"image":case"link":xe("error",t),xe("load",t),i=r;break;case"details":xe("toggle",t),i=r;break;case"input":Zp(t,r),i=Eh(t,r),xe("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Me({},r,{value:void 0}),xe("invalid",t);break;case"textarea":tm(t,r),i=Sh(t,r),xe("invalid",t);break;default:i=r}Ah(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?uv(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&av(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&qo(t,u):typeof u=="number"&&qo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Wo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&xe("scroll",t):u!=null&&Fd(t,s,u,o))}switch(n){case"input":rl(t),em(t,r,!1);break;case"textarea":rl(t),nm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Kr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?ms(t,!!r.multiple,s,!1):r.defaultValue!=null&&ms(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=nu)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return gt(e),null;case 6:if(t&&e.stateNode!=null)N_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=_i(na.current),_i(Pn.current),dl(e)){if(r=e.stateNode,n=e.memoizedProps,r[xn]=e,(s=r.nodeValue!==n)&&(t=qt,t!==null))switch(t.tag){case 3:hl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&hl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[xn]=e,e.stateNode=r}return gt(e),null;case 13:if(Pe(Oe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(be&&$t!==null&&e.mode&1&&!(e.flags&128))Xv(),Rs(),e.flags|=98560,s=!1;else if(s=dl(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(F(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(F(317));s[xn]=e}else Rs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;gt(e),s=!1}else pn!==null&&(ad(pn),pn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Oe.current&1?Xe===0&&(Xe=3):Tf())),e.updateQueue!==null&&(e.flags|=4),gt(e),null);case 4:return Cs(),Zh(t,e),t===null&&Jo(e.stateNode.containerInfo),gt(e),null;case 10:return sf(e.type._context),gt(e),null;case 17:return Mt(e.type)&&ru(),gt(e),null;case 19:if(Pe(Oe),s=e.memoizedState,s===null)return gt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)_o(s,!1);else{if(Xe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=cu(t),o!==null){for(e.flags|=128,_o(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ke(Oe,Oe.current&1|2),e.child}t=t.sibling}s.tail!==null&&qe()>bs&&(e.flags|=128,r=!0,_o(s,!1),e.lanes=4194304)}else{if(!r)if(t=cu(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),_o(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!be)return gt(e),null}else 2*qe()-s.renderingStartTime>bs&&n!==1073741824&&(e.flags|=128,r=!0,_o(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=qe(),e.sibling=null,n=Oe.current,ke(Oe,r?n&1|2:n&1),e):(gt(e),null);case 22:case 23:return Ef(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Bt&1073741824&&(gt(e),e.subtreeFlags&6&&(e.flags|=8192)):gt(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function FT(t,e){switch(ef(e),e.tag){case 1:return Mt(e.type)&&ru(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Cs(),Pe(Vt),Pe(Tt),cf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return uf(e),null;case 13:if(Pe(Oe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));Rs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Pe(Oe),null;case 4:return Cs(),null;case 10:return sf(e.type._context),null;case 22:case 23:return Ef(),null;case 24:return null;default:return null}}var ml=!1,_t=!1,UT=typeof WeakSet=="function"?WeakSet:Set,K=null;function ds(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){$e(t,e,r)}else n.current=null}function ed(t,e,n){try{n()}catch(r){$e(t,e,r)}}var qm=!1;function zT(t,e){if(Lh=Zl,t=Lv(),Jd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,f=0,g=t,v=null;t:for(;;){for(var R;g!==n||i!==0&&g.nodeType!==3||(l=o+i),g!==s||r!==0&&g.nodeType!==3||(u=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(R=g.firstChild)!==null;)v=g,g=R;for(;;){if(g===t)break t;if(v===n&&++h===i&&(l=o),v===s&&++f===r&&(u=o),(R=g.nextSibling)!==null)break;g=v,v=g.parentNode}g=R}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(jh={focusedElem:t,selectionRange:n},Zl=!1,K=e;K!==null;)if(e=K,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,K=t;else for(;K!==null;){e=K;try{var b=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var N=b.memoizedProps,V=b.memoizedState,k=e.stateNode,T=k.getSnapshotBeforeUpdate(e.elementType===e.type?N:dn(e.type,N),V);k.__reactInternalSnapshotBeforeUpdate=T}break;case 3:var A=e.stateNode.containerInfo;A.nodeType===1?A.textContent="":A.nodeType===9&&A.documentElement&&A.removeChild(A.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(D){$e(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,K=t;break}K=e.return}return b=qm,qm=!1,b}function Mo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&ed(e,n,s)}i=i.next}while(i!==r)}}function Wu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function td(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function D_(t){var e=t.alternate;e!==null&&(t.alternate=null,D_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[xn],delete e[ea],delete e[zh],delete e[IT],delete e[ST])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function O_(t){return t.tag===5||t.tag===3||t.tag===4}function Hm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||O_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function nd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=nu));else if(r!==4&&(t=t.child,t!==null))for(nd(t,e,n),t=t.sibling;t!==null;)nd(t,e,n),t=t.sibling}function rd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(rd(t,e,n),t=t.sibling;t!==null;)rd(t,e,n),t=t.sibling}var st=null,fn=!1;function wr(t,e,n){for(n=n.child;n!==null;)V_(t,e,n),n=n.sibling}function V_(t,e,n){if(Cn&&typeof Cn.onCommitFiberUnmount=="function")try{Cn.onCommitFiberUnmount(Mu,n)}catch{}switch(n.tag){case 5:_t||ds(n,e);case 6:var r=st,i=fn;st=null,wr(t,e,n),st=r,fn=i,st!==null&&(fn?(t=st,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):st.removeChild(n.stateNode));break;case 18:st!==null&&(fn?(t=st,n=n.stateNode,t.nodeType===8?qc(t.parentNode,n):t.nodeType===1&&qc(t,n),Qo(t)):qc(st,n.stateNode));break;case 4:r=st,i=fn,st=n.stateNode.containerInfo,fn=!0,wr(t,e,n),st=r,fn=i;break;case 0:case 11:case 14:case 15:if(!_t&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&ed(n,e,o),i=i.next}while(i!==r)}wr(t,e,n);break;case 1:if(!_t&&(ds(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){$e(n,e,l)}wr(t,e,n);break;case 21:wr(t,e,n);break;case 22:n.mode&1?(_t=(r=_t)||n.memoizedState!==null,wr(t,e,n),_t=r):wr(t,e,n);break;default:wr(t,e,n)}}function Km(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new UT),e.forEach(function(r){var i=XT.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function hn(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:st=l.stateNode,fn=!1;break e;case 3:st=l.stateNode.containerInfo,fn=!0;break e;case 4:st=l.stateNode.containerInfo,fn=!0;break e}l=l.return}if(st===null)throw Error(F(160));V_(s,o,i),st=null,fn=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){$e(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)M_(e,t),e=e.sibling}function M_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(hn(e,t),An(t),r&4){try{Mo(3,t,t.return),Wu(3,t)}catch(N){$e(t,t.return,N)}try{Mo(5,t,t.return)}catch(N){$e(t,t.return,N)}}break;case 1:hn(e,t),An(t),r&512&&n!==null&&ds(n,n.return);break;case 5:if(hn(e,t),An(t),r&512&&n!==null&&ds(n,n.return),t.flags&32){var i=t.stateNode;try{qo(i,"")}catch(N){$e(t,t.return,N)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&iv(i,s),Rh(l,o);var h=Rh(l,s);for(o=0;o<u.length;o+=2){var f=u[o],g=u[o+1];f==="style"?uv(i,g):f==="dangerouslySetInnerHTML"?av(i,g):f==="children"?qo(i,g):Fd(i,f,g,h)}switch(l){case"input":Th(i,s);break;case"textarea":sv(i,s);break;case"select":var v=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var R=s.value;R!=null?ms(i,!!s.multiple,R,!1):v!==!!s.multiple&&(s.defaultValue!=null?ms(i,!!s.multiple,s.defaultValue,!0):ms(i,!!s.multiple,s.multiple?[]:"",!1))}i[ea]=s}catch(N){$e(t,t.return,N)}}break;case 6:if(hn(e,t),An(t),r&4){if(t.stateNode===null)throw Error(F(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(N){$e(t,t.return,N)}}break;case 3:if(hn(e,t),An(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Qo(e.containerInfo)}catch(N){$e(t,t.return,N)}break;case 4:hn(e,t),An(t);break;case 13:hn(e,t),An(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(_f=qe())),r&4&&Km(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(_t=(h=_t)||f,hn(e,t),_t=h):hn(e,t),An(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for(K=t,f=t.child;f!==null;){for(g=K=f;K!==null;){switch(v=K,R=v.child,v.tag){case 0:case 11:case 14:case 15:Mo(4,v,v.return);break;case 1:ds(v,v.return);var b=v.stateNode;if(typeof b.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,b.props=e.memoizedProps,b.state=e.memoizedState,b.componentWillUnmount()}catch(N){$e(r,n,N)}}break;case 5:ds(v,v.return);break;case 22:if(v.memoizedState!==null){Qm(g);continue}}R!==null?(R.return=v,K=R):Qm(g)}f=f.sibling}e:for(f=null,g=t;;){if(g.tag===5){if(f===null){f=g;try{i=g.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=g.stateNode,u=g.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=lv("display",o))}catch(N){$e(t,t.return,N)}}}else if(g.tag===6){if(f===null)try{g.stateNode.nodeValue=h?"":g.memoizedProps}catch(N){$e(t,t.return,N)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===t)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===t)break e;for(;g.sibling===null;){if(g.return===null||g.return===t)break e;f===g&&(f=null),g=g.return}f===g&&(f=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:hn(e,t),An(t),r&4&&Km(t);break;case 21:break;default:hn(e,t),An(t)}}function An(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(O_(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(qo(i,""),r.flags&=-33);var s=Hm(t);rd(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Hm(t);nd(t,l,o);break;default:throw Error(F(161))}}catch(u){$e(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function BT(t,e,n){K=t,L_(t)}function L_(t,e,n){for(var r=(t.mode&1)!==0;K!==null;){var i=K,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ml;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||_t;l=ml;var h=_t;if(ml=o,(_t=u)&&!h)for(K=i;K!==null;)o=K,u=o.child,o.tag===22&&o.memoizedState!==null?Xm(i):u!==null?(u.return=o,K=u):Xm(i);for(;s!==null;)K=s,L_(s),s=s.sibling;K=i,ml=l,_t=h}Gm(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,K=s):Gm(t)}}function Gm(t){for(;K!==null;){var e=K;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:_t||Wu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!_t)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:dn(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Nm(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Nm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var g=f.dehydrated;g!==null&&Qo(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}_t||e.flags&512&&td(e)}catch(v){$e(e,e.return,v)}}if(e===t){K=null;break}if(n=e.sibling,n!==null){n.return=e.return,K=n;break}K=e.return}}function Qm(t){for(;K!==null;){var e=K;if(e===t){K=null;break}var n=e.sibling;if(n!==null){n.return=e.return,K=n;break}K=e.return}}function Xm(t){for(;K!==null;){var e=K;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Wu(4,e)}catch(u){$e(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){$e(e,i,u)}}var s=e.return;try{td(e)}catch(u){$e(e,s,u)}break;case 5:var o=e.return;try{td(e)}catch(u){$e(e,o,u)}}}catch(u){$e(e,e.return,u)}if(e===t){K=null;break}var l=e.sibling;if(l!==null){l.return=e.return,K=l;break}K=e.return}}var $T=Math.ceil,fu=ur.ReactCurrentDispatcher,yf=ur.ReactCurrentOwner,rn=ur.ReactCurrentBatchConfig,he=0,et=null,Ke=null,lt=0,Bt=0,fs=ni(0),Xe=0,oa=null,Ri=0,qu=0,vf=0,Lo=null,Nt=null,_f=0,bs=1/0,qn=null,pu=!1,id=null,Fr=null,gl=!1,Nr=null,mu=0,jo=0,sd=null,Ml=-1,Ll=0;function Rt(){return he&6?qe():Ml!==-1?Ml:Ml=qe()}function Ur(t){return t.mode&1?he&2&&lt!==0?lt&-lt:AT.transition!==null?(Ll===0&&(Ll=Ev()),Ll):(t=_e,t!==0||(t=window.event,t=t===void 0?16:xv(t.type)),t):1}function yn(t,e,n,r){if(50<jo)throw jo=0,sd=null,Error(F(185));ya(t,n,r),(!(he&2)||t!==et)&&(t===et&&(!(he&2)&&(qu|=n),Xe===4&&Ar(t,lt)),Lt(t,r),n===1&&he===0&&!(e.mode&1)&&(bs=qe()+500,zu&&ri()))}function Lt(t,e){var n=t.callbackNode;A1(t,e);var r=Jl(t,t===et?lt:0);if(r===0)n!==null&&sm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&sm(n),e===1)t.tag===0?kT(Ym.bind(null,t)):Kv(Ym.bind(null,t)),ET(function(){!(he&6)&&ri()}),n=null;else{switch(Tv(r)){case 1:n=Wd;break;case 4:n=_v;break;case 16:n=Yl;break;case 536870912:n=wv;break;default:n=Yl}n=q_(n,j_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function j_(t,e){if(Ml=-1,Ll=0,he&6)throw Error(F(327));var n=t.callbackNode;if(ws()&&t.callbackNode!==n)return null;var r=Jl(t,t===et?lt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=gu(t,r);else{e=r;var i=he;he|=2;var s=U_();(et!==t||lt!==e)&&(qn=null,bs=qe()+500,Ei(t,e));do try{HT();break}catch(l){F_(t,l)}while(!0);rf(),fu.current=s,he=i,Ke!==null?e=0:(et=null,lt=0,e=Xe)}if(e!==0){if(e===2&&(i=Nh(t),i!==0&&(r=i,e=od(t,i))),e===1)throw n=oa,Ei(t,0),Ar(t,r),Lt(t,qe()),n;if(e===6)Ar(t,r);else{if(i=t.current.alternate,!(r&30)&&!WT(i)&&(e=gu(t,r),e===2&&(s=Nh(t),s!==0&&(r=s,e=od(t,s))),e===1))throw n=oa,Ei(t,0),Ar(t,r),Lt(t,qe()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:mi(t,Nt,qn);break;case 3:if(Ar(t,r),(r&130023424)===r&&(e=_f+500-qe(),10<e)){if(Jl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){Rt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Uh(mi.bind(null,t,Nt,qn),e);break}mi(t,Nt,qn);break;case 4:if(Ar(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-gn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=qe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*$T(r/1960))-r,10<r){t.timeoutHandle=Uh(mi.bind(null,t,Nt,qn),r);break}mi(t,Nt,qn);break;case 5:mi(t,Nt,qn);break;default:throw Error(F(329))}}}return Lt(t,qe()),t.callbackNode===n?j_.bind(null,t):null}function od(t,e){var n=Lo;return t.current.memoizedState.isDehydrated&&(Ei(t,e).flags|=256),t=gu(t,e),t!==2&&(e=Nt,Nt=n,e!==null&&ad(e)),t}function ad(t){Nt===null?Nt=t:Nt.push.apply(Nt,t)}function WT(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!vn(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ar(t,e){for(e&=~vf,e&=~qu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-gn(e),r=1<<n;t[n]=-1,e&=~r}}function Ym(t){if(he&6)throw Error(F(327));ws();var e=Jl(t,0);if(!(e&1))return Lt(t,qe()),null;var n=gu(t,e);if(t.tag!==0&&n===2){var r=Nh(t);r!==0&&(e=r,n=od(t,r))}if(n===1)throw n=oa,Ei(t,0),Ar(t,e),Lt(t,qe()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,mi(t,Nt,qn),Lt(t,qe()),null}function wf(t,e){var n=he;he|=1;try{return t(e)}finally{he=n,he===0&&(bs=qe()+500,zu&&ri())}}function xi(t){Nr!==null&&Nr.tag===0&&!(he&6)&&ws();var e=he;he|=1;var n=rn.transition,r=_e;try{if(rn.transition=null,_e=1,t)return t()}finally{_e=r,rn.transition=n,he=e,!(he&6)&&ri()}}function Ef(){Bt=fs.current,Pe(fs)}function Ei(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,wT(n)),Ke!==null)for(n=Ke.return;n!==null;){var r=n;switch(ef(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ru();break;case 3:Cs(),Pe(Vt),Pe(Tt),cf();break;case 5:uf(r);break;case 4:Cs();break;case 13:Pe(Oe);break;case 19:Pe(Oe);break;case 10:sf(r.type._context);break;case 22:case 23:Ef()}n=n.return}if(et=t,Ke=t=zr(t.current,null),lt=Bt=e,Xe=0,oa=null,vf=qu=Ri=0,Nt=Lo=null,vi!==null){for(e=0;e<vi.length;e++)if(n=vi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}vi=null}return t}function F_(t,e){do{var n=Ke;try{if(rf(),Dl.current=du,hu){for(var r=Ve.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}hu=!1}if(Ai=0,Ze=Qe=Ve=null,Vo=!1,ra=0,yf.current=null,n===null||n.return===null){Xe=1,oa=e,Ke=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=lt,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,g=f.tag;if(!(f.mode&1)&&(g===0||g===11||g===15)){var v=f.alternate;v?(f.updateQueue=v.updateQueue,f.memoizedState=v.memoizedState,f.lanes=v.lanes):(f.updateQueue=null,f.memoizedState=null)}var R=jm(o);if(R!==null){R.flags&=-257,Fm(R,o,l,s,e),R.mode&1&&Lm(s,h,e),e=R,u=h;var b=e.updateQueue;if(b===null){var N=new Set;N.add(u),e.updateQueue=N}else b.add(u);break e}else{if(!(e&1)){Lm(s,h,e),Tf();break e}u=Error(F(426))}}else if(be&&l.mode&1){var V=jm(o);if(V!==null){!(V.flags&65536)&&(V.flags|=256),Fm(V,o,l,s,e),tf(Ps(u,l));break e}}s=u=Ps(u,l),Xe!==4&&(Xe=2),Lo===null?Lo=[s]:Lo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var k=T_(s,u,e);bm(s,k);break e;case 1:l=u;var T=s.type,A=s.stateNode;if(!(s.flags&128)&&(typeof T.getDerivedStateFromError=="function"||A!==null&&typeof A.componentDidCatch=="function"&&(Fr===null||!Fr.has(A)))){s.flags|=65536,e&=-e,s.lanes|=e;var D=I_(s,l,e);bm(s,D);break e}}s=s.return}while(s!==null)}B_(n)}catch(U){e=U,Ke===n&&n!==null&&(Ke=n=n.return);continue}break}while(!0)}function U_(){var t=fu.current;return fu.current=du,t===null?du:t}function Tf(){(Xe===0||Xe===3||Xe===2)&&(Xe=4),et===null||!(Ri&268435455)&&!(qu&268435455)||Ar(et,lt)}function gu(t,e){var n=he;he|=2;var r=U_();(et!==t||lt!==e)&&(qn=null,Ei(t,e));do try{qT();break}catch(i){F_(t,i)}while(!0);if(rf(),he=n,fu.current=r,Ke!==null)throw Error(F(261));return et=null,lt=0,Xe}function qT(){for(;Ke!==null;)z_(Ke)}function HT(){for(;Ke!==null&&!y1();)z_(Ke)}function z_(t){var e=W_(t.alternate,t,Bt);t.memoizedProps=t.pendingProps,e===null?B_(t):Ke=e,yf.current=null}function B_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=FT(n,e),n!==null){n.flags&=32767,Ke=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Xe=6,Ke=null;return}}else if(n=jT(n,e,Bt),n!==null){Ke=n;return}if(e=e.sibling,e!==null){Ke=e;return}Ke=e=t}while(e!==null);Xe===0&&(Xe=5)}function mi(t,e,n){var r=_e,i=rn.transition;try{rn.transition=null,_e=1,KT(t,e,n,r)}finally{rn.transition=i,_e=r}return null}function KT(t,e,n,r){do ws();while(Nr!==null);if(he&6)throw Error(F(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(R1(t,s),t===et&&(Ke=et=null,lt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||gl||(gl=!0,q_(Yl,function(){return ws(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=rn.transition,rn.transition=null;var o=_e;_e=1;var l=he;he|=4,yf.current=null,zT(t,n),M_(n,t),fT(jh),Zl=!!Lh,jh=Lh=null,t.current=n,BT(n),v1(),he=l,_e=o,rn.transition=s}else t.current=n;if(gl&&(gl=!1,Nr=t,mu=i),s=t.pendingLanes,s===0&&(Fr=null),E1(n.stateNode),Lt(t,qe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(pu)throw pu=!1,t=id,id=null,t;return mu&1&&t.tag!==0&&ws(),s=t.pendingLanes,s&1?t===sd?jo++:(jo=0,sd=t):jo=0,ri(),null}function ws(){if(Nr!==null){var t=Tv(mu),e=rn.transition,n=_e;try{if(rn.transition=null,_e=16>t?16:t,Nr===null)var r=!1;else{if(t=Nr,Nr=null,mu=0,he&6)throw Error(F(331));var i=he;for(he|=4,K=t.current;K!==null;){var s=K,o=s.child;if(K.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(K=h;K!==null;){var f=K;switch(f.tag){case 0:case 11:case 15:Mo(8,f,s)}var g=f.child;if(g!==null)g.return=f,K=g;else for(;K!==null;){f=K;var v=f.sibling,R=f.return;if(D_(f),f===h){K=null;break}if(v!==null){v.return=R,K=v;break}K=R}}}var b=s.alternate;if(b!==null){var N=b.child;if(N!==null){b.child=null;do{var V=N.sibling;N.sibling=null,N=V}while(N!==null)}}K=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,K=o;else e:for(;K!==null;){if(s=K,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Mo(9,s,s.return)}var k=s.sibling;if(k!==null){k.return=s.return,K=k;break e}K=s.return}}var T=t.current;for(K=T;K!==null;){o=K;var A=o.child;if(o.subtreeFlags&2064&&A!==null)A.return=o,K=A;else e:for(o=T;K!==null;){if(l=K,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Wu(9,l)}}catch(U){$e(l,l.return,U)}if(l===o){K=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,K=D;break e}K=l.return}}if(he=i,ri(),Cn&&typeof Cn.onPostCommitFiberRoot=="function")try{Cn.onPostCommitFiberRoot(Mu,t)}catch{}r=!0}return r}finally{_e=n,rn.transition=e}}return!1}function Jm(t,e,n){e=Ps(n,e),e=T_(t,e,1),t=jr(t,e,1),e=Rt(),t!==null&&(ya(t,1,e),Lt(t,e))}function $e(t,e,n){if(t.tag===3)Jm(t,t,n);else for(;e!==null;){if(e.tag===3){Jm(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Fr===null||!Fr.has(r))){t=Ps(n,t),t=I_(e,t,1),e=jr(e,t,1),t=Rt(),e!==null&&(ya(e,1,t),Lt(e,t));break}}e=e.return}}function GT(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Rt(),t.pingedLanes|=t.suspendedLanes&n,et===t&&(lt&n)===n&&(Xe===4||Xe===3&&(lt&130023424)===lt&&500>qe()-_f?Ei(t,0):vf|=n),Lt(t,e)}function $_(t,e){e===0&&(t.mode&1?(e=ol,ol<<=1,!(ol&130023424)&&(ol=4194304)):e=1);var n=Rt();t=nr(t,e),t!==null&&(ya(t,e,n),Lt(t,n))}function QT(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),$_(t,n)}function XT(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),$_(t,n)}var W_;W_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Vt.current)Ot=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Ot=!1,LT(t,e,n);Ot=!!(t.flags&131072)}else Ot=!1,be&&e.flags&1048576&&Gv(e,ou,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Vl(t,e),t=e.pendingProps;var i=As(e,Tt.current);_s(e,n),i=df(null,e,r,t,i,n);var s=ff();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Mt(r)?(s=!0,iu(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,af(e),i.updater=$u,e.stateNode=i,i._reactInternals=e,Kh(e,r,t,n),e=Xh(null,e,r,!0,s,n)):(e.tag=0,be&&s&&Zd(e),At(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Vl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=JT(r),t=dn(r,t),i){case 0:e=Qh(null,e,r,t,n);break e;case 1:e=Bm(null,e,r,t,n);break e;case 11:e=Um(null,e,r,t,n);break e;case 14:e=zm(null,e,r,dn(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:dn(r,i),Qh(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:dn(r,i),Bm(t,e,r,i,n);case 3:e:{if(R_(e),t===null)throw Error(F(387));r=e.pendingProps,s=e.memoizedState,i=s.element,e_(t,e),uu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Ps(Error(F(423)),e),e=$m(t,e,r,n,i);break e}else if(r!==i){i=Ps(Error(F(424)),e),e=$m(t,e,r,n,i);break e}else for($t=Lr(e.stateNode.containerInfo.firstChild),qt=e,be=!0,pn=null,n=Jv(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rs(),r===i){e=rr(t,e,n);break e}At(t,e,r,n)}e=e.child}return e;case 5:return t_(e),t===null&&Wh(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Fh(r,i)?o=null:s!==null&&Fh(r,s)&&(e.flags|=32),A_(t,e),At(t,e,o,n),e.child;case 6:return t===null&&Wh(e),null;case 13:return x_(t,e,n);case 4:return lf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=xs(e,null,r,n):At(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:dn(r,i),Um(t,e,r,i,n);case 7:return At(t,e,e.pendingProps,n),e.child;case 8:return At(t,e,e.pendingProps.children,n),e.child;case 12:return At(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ke(au,r._currentValue),r._currentValue=o,s!==null)if(vn(s.value,o)){if(s.children===i.children&&!Vt.current){e=rr(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Zn(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),qh(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),qh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}At(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,_s(e,n),i=an(i),r=r(i),e.flags|=1,At(t,e,r,n),e.child;case 14:return r=e.type,i=dn(r,e.pendingProps),i=dn(r.type,i),zm(t,e,r,i,n);case 15:return S_(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:dn(r,i),Vl(t,e),e.tag=1,Mt(r)?(t=!0,iu(e)):t=!1,_s(e,n),E_(e,r,i),Kh(e,r,i,n),Xh(null,e,r,!0,t,n);case 19:return C_(t,e,n);case 22:return k_(t,e,n)}throw Error(F(156,e.tag))};function q_(t,e){return vv(t,e)}function YT(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nn(t,e,n,r){return new YT(t,e,n,r)}function If(t){return t=t.prototype,!(!t||!t.isReactComponent)}function JT(t){if(typeof t=="function")return If(t)?1:0;if(t!=null){if(t=t.$$typeof,t===zd)return 11;if(t===Bd)return 14}return 2}function zr(t,e){var n=t.alternate;return n===null?(n=nn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function jl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")If(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case rs:return Ti(n.children,i,s,e);case Ud:o=8,i|=8;break;case yh:return t=nn(12,n,e,i|2),t.elementType=yh,t.lanes=s,t;case vh:return t=nn(13,n,e,i),t.elementType=vh,t.lanes=s,t;case _h:return t=nn(19,n,e,i),t.elementType=_h,t.lanes=s,t;case tv:return Hu(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Zy:o=10;break e;case ev:o=9;break e;case zd:o=11;break e;case Bd:o=14;break e;case Ir:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=nn(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Ti(t,e,n,r){return t=nn(7,t,r,e),t.lanes=n,t}function Hu(t,e,n,r){return t=nn(22,t,r,e),t.elementType=tv,t.lanes=n,t.stateNode={isHidden:!1},t}function Zc(t,e,n){return t=nn(6,t,null,e),t.lanes=n,t}function eh(t,e,n){return e=nn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ZT(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oc(0),this.expirationTimes=Oc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Sf(t,e,n,r,i,s,o,l,u){return t=new ZT(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=nn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},af(s),t}function eI(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ns,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function H_(t){if(!t)return Gr;t=t._reactInternals;e:{if(Vi(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Mt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(Mt(n))return Hv(t,n,e)}return e}function K_(t,e,n,r,i,s,o,l,u){return t=Sf(n,r,!0,t,i,s,o,l,u),t.context=H_(null),n=t.current,r=Rt(),i=Ur(n),s=Zn(r,i),s.callback=e??null,jr(n,s,i),t.current.lanes=i,ya(t,i,r),Lt(t,r),t}function Ku(t,e,n,r){var i=e.current,s=Rt(),o=Ur(i);return n=H_(n),e.context===null?e.context=n:e.pendingContext=n,e=Zn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=jr(i,e,o),t!==null&&(yn(t,i,o,s),Nl(t,i,o)),o}function yu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Zm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function kf(t,e){Zm(t,e),(t=t.alternate)&&Zm(t,e)}function tI(){return null}var G_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Af(t){this._internalRoot=t}Gu.prototype.render=Af.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));Ku(t,e,null,null)};Gu.prototype.unmount=Af.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;xi(function(){Ku(null,t,null,null)}),e[tr]=null}};function Gu(t){this._internalRoot=t}Gu.prototype.unstable_scheduleHydration=function(t){if(t){var e=kv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<kr.length&&e!==0&&e<kr[n].priority;n++);kr.splice(n,0,t),n===0&&Rv(t)}};function Rf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Qu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function eg(){}function nI(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=yu(o);s.call(h)}}var o=K_(e,r,t,0,null,!1,!1,"",eg);return t._reactRootContainer=o,t[tr]=o.current,Jo(t.nodeType===8?t.parentNode:t),xi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=yu(u);l.call(h)}}var u=Sf(t,0,!1,null,null,!1,!1,"",eg);return t._reactRootContainer=u,t[tr]=u.current,Jo(t.nodeType===8?t.parentNode:t),xi(function(){Ku(e,u,n,r)}),u}function Xu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=yu(o);l.call(u)}}Ku(e,o,t,i)}else o=nI(n,e,t,i,r);return yu(o)}Iv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=So(e.pendingLanes);n!==0&&(qd(e,n|1),Lt(e,qe()),!(he&6)&&(bs=qe()+500,ri()))}break;case 13:xi(function(){var r=nr(t,1);if(r!==null){var i=Rt();yn(r,t,1,i)}}),kf(t,1)}};Hd=function(t){if(t.tag===13){var e=nr(t,134217728);if(e!==null){var n=Rt();yn(e,t,134217728,n)}kf(t,134217728)}};Sv=function(t){if(t.tag===13){var e=Ur(t),n=nr(t,e);if(n!==null){var r=Rt();yn(n,t,e,r)}kf(t,e)}};kv=function(){return _e};Av=function(t,e){var n=_e;try{return _e=t,e()}finally{_e=n}};Ch=function(t,e,n){switch(e){case"input":if(Th(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Uu(r);if(!i)throw Error(F(90));rv(r),Th(r,i)}}}break;case"textarea":sv(t,n);break;case"select":e=n.value,e!=null&&ms(t,!!n.multiple,e,!1)}};dv=wf;fv=xi;var rI={usingClientEntryPoint:!1,Events:[_a,as,Uu,cv,hv,wf]},wo={findFiberByHostInstance:yi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},iI={bundleType:wo.bundleType,version:wo.version,rendererPackageName:wo.rendererPackageName,rendererConfig:wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ur.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=gv(t),t===null?null:t.stateNode},findFiberByHostInstance:wo.findFiberByHostInstance||tI,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{Mu=yl.inject(iI),Cn=yl}catch{}}Kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rI;Kt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Rf(e))throw Error(F(200));return eI(t,e,null,n)};Kt.createRoot=function(t,e){if(!Rf(t))throw Error(F(299));var n=!1,r="",i=G_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Sf(t,1,!1,null,null,n,!1,r,i),t[tr]=e.current,Jo(t.nodeType===8?t.parentNode:t),new Af(e)};Kt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=gv(e),t=t===null?null:t.stateNode,t};Kt.flushSync=function(t){return xi(t)};Kt.hydrate=function(t,e,n){if(!Qu(e))throw Error(F(200));return Xu(null,t,e,!0,n)};Kt.hydrateRoot=function(t,e,n){if(!Rf(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=G_;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=K_(e,null,t,1,n??null,i,!1,s,o),t[tr]=e.current,Jo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Gu(e)};Kt.render=function(t,e,n){if(!Qu(e))throw Error(F(200));return Xu(null,t,e,!1,n)};Kt.unmountComponentAtNode=function(t){if(!Qu(t))throw Error(F(40));return t._reactRootContainer?(xi(function(){Xu(null,null,t,!1,function(){t._reactRootContainer=null,t[tr]=null})}),!0):!1};Kt.unstable_batchedUpdates=wf;Kt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Qu(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return Xu(t,e,n,!1,r)};Kt.version="18.3.1-next-f1338f8080-20240426";function Q_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Q_)}catch(t){console.error(t)}}Q_(),Qy.exports=Kt;var sI=Qy.exports,tg=sI;mh.createRoot=tg.createRoot,mh.hydrateRoot=tg.hydrateRoot;var ng={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},oI=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Y_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,g=(s&3)<<4|l>>4;let v=(l&15)<<2|h>>6,R=h&63;u||(R=64,o||(v=64)),r.push(n[f],n[g],n[v],n[R])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(X_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):oI(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const g=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||g==null)throw new aI;const v=s<<2|l>>4;if(r.push(v),h!==64){const R=l<<4&240|h>>2;if(r.push(R),g!==64){const b=h<<6&192|g;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class aI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lI=function(t){const e=X_(t);return Y_.encodeByteArray(e,!0)},vu=function(t){return lI(t).replace(/\./g,"")},J_=function(t){try{return Y_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=()=>uI().__FIREBASE_DEFAULTS__,hI=()=>{if(typeof process>"u"||typeof ng>"u")return;const t=ng.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},dI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&J_(t[1]);return e&&JSON.parse(e)},Yu=()=>{try{return cI()||hI()||dI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Z_=t=>{var e,n;return(n=(e=Yu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},e0=t=>{const e=Z_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},t0=()=>{var t;return(t=Yu())===null||t===void 0?void 0:t.config},n0=t=>{var e;return(e=Yu())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r0(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[vu(JSON.stringify(n)),vu(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(It())}function mI(){var t;const e=(t=Yu())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yI(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function vI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _I(){const t=It();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function wI(){return!mI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function EI(){try{return typeof indexedDB=="object"}catch{return!1}}function TI(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II="FirebaseError";class jn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=II,Object.setPrototypeOf(this,jn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ea.prototype.create)}}class Ea{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?SI(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new jn(i,l,r)}}function SI(t,e){return t.replace(kI,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const kI=/\{\$([^}]+)}/g;function AI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function aa(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(rg(s)&&rg(o)){if(!aa(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function rg(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function RI(t,e){const n=new xI(t,e);return n.subscribe.bind(n)}class xI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");CI(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=th),i.error===void 0&&(i.error=th),i.complete===void 0&&(i.complete=th);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function CI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function th(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(t){return t&&t._delegate?t._delegate:t}class Qr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new fI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(NI(e))try{this.getOrInitializeService({instanceIdentifier:gi})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=gi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=gi){return this.instances.has(e)}getOptions(e=gi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=gi){return this.component?this.component.multipleInstances?e:gi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bI(t){return t===gi?void 0:t}function NI(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new PI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ue||(ue={}));const OI={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},VI=ue.INFO,MI={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},LI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=MI[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xf{constructor(e){this.name=e,this._logLevel=VI,this._logHandler=LI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?OI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const jI=(t,e)=>e.some(n=>t instanceof n);let ig,sg;function FI(){return ig||(ig=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function UI(){return sg||(sg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const i0=new WeakMap,ld=new WeakMap,s0=new WeakMap,nh=new WeakMap,Cf=new WeakMap;function zI(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Br(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&i0.set(n,t)}).catch(()=>{}),Cf.set(e,t),e}function BI(t){if(ld.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});ld.set(t,e)}let ud={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ld.get(t);if(e==="objectStoreNames")return t.objectStoreNames||s0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Br(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function $I(t){ud=t(ud)}function WI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(rh(this),e,...n);return s0.set(r,e.sort?e.sort():[e]),Br(r)}:UI().includes(t)?function(...e){return t.apply(rh(this),e),Br(i0.get(this))}:function(...e){return Br(t.apply(rh(this),e))}}function qI(t){return typeof t=="function"?WI(t):(t instanceof IDBTransaction&&BI(t),jI(t,FI())?new Proxy(t,ud):t)}function Br(t){if(t instanceof IDBRequest)return zI(t);if(nh.has(t))return nh.get(t);const e=qI(t);return e!==t&&(nh.set(t,e),Cf.set(e,t)),e}const rh=t=>Cf.get(t);function HI(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=Br(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Br(o.result),u.oldVersion,u.newVersion,Br(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const KI=["get","getKey","getAll","getAllKeys","count"],GI=["put","add","delete","clear"],ih=new Map;function og(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ih.get(e))return ih.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=GI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||KI.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return ih.set(e,s),s}$I(t=>({...t,get:(e,n,r)=>og(e,n)||t.get(e,n,r),has:(e,n)=>!!og(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(XI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function XI(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const cd="@firebase/app",ag="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=new xf("@firebase/app"),YI="@firebase/app-compat",JI="@firebase/analytics-compat",ZI="@firebase/analytics",eS="@firebase/app-check-compat",tS="@firebase/app-check",nS="@firebase/auth",rS="@firebase/auth-compat",iS="@firebase/database",sS="@firebase/data-connect",oS="@firebase/database-compat",aS="@firebase/functions",lS="@firebase/functions-compat",uS="@firebase/installations",cS="@firebase/installations-compat",hS="@firebase/messaging",dS="@firebase/messaging-compat",fS="@firebase/performance",pS="@firebase/performance-compat",mS="@firebase/remote-config",gS="@firebase/remote-config-compat",yS="@firebase/storage",vS="@firebase/storage-compat",_S="@firebase/firestore",wS="@firebase/vertexai-preview",ES="@firebase/firestore-compat",TS="firebase",IS="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd="[DEFAULT]",SS={[cd]:"fire-core",[YI]:"fire-core-compat",[ZI]:"fire-analytics",[JI]:"fire-analytics-compat",[tS]:"fire-app-check",[eS]:"fire-app-check-compat",[nS]:"fire-auth",[rS]:"fire-auth-compat",[iS]:"fire-rtdb",[sS]:"fire-data-connect",[oS]:"fire-rtdb-compat",[aS]:"fire-fn",[lS]:"fire-fn-compat",[uS]:"fire-iid",[cS]:"fire-iid-compat",[hS]:"fire-fcm",[dS]:"fire-fcm-compat",[fS]:"fire-perf",[pS]:"fire-perf-compat",[mS]:"fire-rc",[gS]:"fire-rc-compat",[yS]:"fire-gcs",[vS]:"fire-gcs-compat",[_S]:"fire-fst",[ES]:"fire-fst-compat",[wS]:"fire-vertex","fire-js":"fire-js",[TS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la=new Map,kS=new Map,dd=new Map;function lg(t,e){try{t.container.addComponent(e)}catch(n){ir.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ci(t){const e=t.name;if(dd.has(e))return ir.debug(`There were multiple attempts to register component ${e}.`),!1;dd.set(e,t);for(const n of la.values())lg(n,t);for(const n of kS.values())lg(n,t);return!0}function Ju(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Qn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$r=new Ea("app","Firebase",AS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RS{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Qr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $r.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi=IS;function o0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:hd,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw $r.create("bad-app-name",{appName:String(i)});if(n||(n=t0()),!n)throw $r.create("no-options");const s=la.get(i);if(s){if(aa(n,s.options)&&aa(r,s.config))return s;throw $r.create("duplicate-app",{appName:i})}const o=new DI(i);for(const u of dd.values())o.addComponent(u);const l=new RS(n,r,o);return la.set(i,l),l}function Pf(t=hd){const e=la.get(t);if(!e&&t===hd&&t0())return o0();if(!e)throw $r.create("no-app",{appName:t});return e}function ug(){return Array.from(la.values())}function bn(t,e,n){var r;let i=(r=SS[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ir.warn(l.join(" "));return}Ci(new Qr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xS="firebase-heartbeat-database",CS=1,ua="firebase-heartbeat-store";let sh=null;function a0(){return sh||(sh=HI(xS,CS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ua)}catch(n){console.warn(n)}}}}).catch(t=>{throw $r.create("idb-open",{originalErrorMessage:t.message})})),sh}async function PS(t){try{const n=(await a0()).transaction(ua),r=await n.objectStore(ua).get(l0(t));return await n.done,r}catch(e){if(e instanceof jn)ir.warn(e.message);else{const n=$r.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ir.warn(n.message)}}}async function cg(t,e){try{const r=(await a0()).transaction(ua,"readwrite");await r.objectStore(ua).put(e,l0(t)),await r.done}catch(n){if(n instanceof jn)ir.warn(n.message);else{const r=$r.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ir.warn(r.message)}}}function l0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bS=1024,NS=30*24*60*60*1e3;class DS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new VS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=hg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=NS}),this._storage.overwrite(this._heartbeatsCache))}catch(r){ir.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=hg(),{heartbeatsToSend:r,unsentEntries:i}=OS(this._heartbeatsCache.heartbeats),s=vu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return ir.warn(n),""}}}function hg(){return new Date().toISOString().substring(0,10)}function OS(t,e=bS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),dg(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),dg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class VS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return EI()?TI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await PS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return cg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return cg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function dg(t){return vu(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MS(t){Ci(new Qr("platform-logger",e=>new QI(e),"PRIVATE")),Ci(new Qr("heartbeat",e=>new DS(e),"PRIVATE")),bn(cd,ag,t),bn(cd,ag,"esm2017"),bn("fire-js","")}MS("");var LS="firebase",jS="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bn(LS,jS,"app");function bf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function u0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const FS=u0,c0=new Ea("auth","Firebase",u0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _u=new xf("@firebase/auth");function US(t,...e){_u.logLevel<=ue.WARN&&_u.warn(`Auth (${Mi}): ${t}`,...e)}function Fl(t,...e){_u.logLevel<=ue.ERROR&&_u.error(`Auth (${Mi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(t,...e){throw Nf(t,...e)}function Nn(t,...e){return Nf(t,...e)}function h0(t,e,n){const r=Object.assign(Object.assign({},FS()),{[e]:n});return new Ea("auth","Firebase",r).create(e,{appName:t.name})}function Wr(t){return h0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Nf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return c0.create(t,...e)}function ne(t,e,...n){if(!t)throw Nf(e,...n)}function Xn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Fl(e),new Error(e)}function or(t,e){t||Xn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function zS(){return fg()==="http:"||fg()==="https:"}function fg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zS()||yI()||"connection"in navigator)?navigator.onLine:!0}function $S(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,n){this.shortDelay=e,this.longDelay=n,or(n>e,"Short delay should be less than long delay!"),this.isMobile=pI()||vI()}get(){return BS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Df(t,e){or(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Xn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Xn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Xn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qS=new Ia(3e4,6e4);function Zu(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function $s(t,e,n,r,i={}){return f0(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=Ta(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},s);return gI()||(h.referrerPolicy="no-referrer"),d0.fetch()(m0(t,t.config.apiHost,n,l),h)})}async function f0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},WS),e);try{const i=new HS(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw vl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw vl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw vl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw vl(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw h0(t,f,h);sr(t,f)}}catch(i){if(i instanceof jn)throw i;sr(t,"network-request-failed",{message:String(i)})}}async function p0(t,e,n,r,i={}){const s=await $s(t,e,n,r,i);return"mfaPendingCredential"in s&&sr(t,"multi-factor-auth-required",{_serverResponse:s}),s}function m0(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Df(t.config,i):`${t.config.apiScheme}://${i}`}class HS{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Nn(this.auth,"network-request-failed")),qS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function vl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Nn(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KS(t,e){return $s(t,"POST","/v1/accounts:delete",e)}async function g0(t,e){return $s(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function GS(t,e=!1){const n=tt(t),r=await n.getIdToken(e),i=Of(r);ne(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Fo(oh(i.auth_time)),issuedAtTime:Fo(oh(i.iat)),expirationTime:Fo(oh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function oh(t){return Number(t)*1e3}function Of(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Fl("JWT malformed, contained fewer than 3 sections"),null;try{const i=J_(n);return i?JSON.parse(i):(Fl("Failed to decode base64 JWT payload"),null)}catch(i){return Fl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function pg(t){const e=Of(t);return ne(e,"internal-error"),ne(typeof e.exp<"u","internal-error"),ne(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ca(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof jn&&QS(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function QS({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XS{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fo(this.lastLoginAt),this.creationTime=Fo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wu(t){var e;const n=t.auth,r=await t.getIdToken(),i=await ca(t,g0(n,{idToken:r}));ne(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?y0(s.providerUserInfo):[],l=JS(t.providerData,o),u=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new pd(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,g)}async function YS(t){const e=tt(t);await wu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function JS(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function y0(t){return t.map(e=>{var{providerId:n}=e,r=bf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZS(t,e){const n=await f0(t,{},async()=>{const r=Ta({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=m0(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",d0.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ek(t,e){return $s(t,"POST","/v2/accounts:revokeToken",Zu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ne(e.idToken,"internal-error"),ne(typeof e.idToken<"u","internal-error"),ne(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ne(e.length!==0,"internal-error");const n=pg(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ne(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await ZS(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Es;return r&&(ne(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(ne(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(ne(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Es,this.toJSON())}_performRefresh(){return Xn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(t,e){ne(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Yn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=bf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new XS(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new pd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await ca(this,this.stsTokenManager.getToken(this.auth,e));return ne(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return GS(this,e)}reload(){return YS(this)}_assign(e){this!==e&&(ne(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Yn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ne(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await wu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qn(this.auth.app))return Promise.reject(Wr(this.auth));const e=await this.getIdToken();return await ca(this,KS(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,h,f;const g=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(i=n.email)!==null&&i!==void 0?i:void 0,R=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,b=(o=n.photoURL)!==null&&o!==void 0?o:void 0,N=(l=n.tenantId)!==null&&l!==void 0?l:void 0,V=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,k=(h=n.createdAt)!==null&&h!==void 0?h:void 0,T=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:A,emailVerified:D,isAnonymous:U,providerData:z,stsTokenManager:_}=n;ne(A&&_,e,"internal-error");const y=Es.fromJSON(this.name,_);ne(typeof A=="string",e,"internal-error"),Er(g,e.name),Er(v,e.name),ne(typeof D=="boolean",e,"internal-error"),ne(typeof U=="boolean",e,"internal-error"),Er(R,e.name),Er(b,e.name),Er(N,e.name),Er(V,e.name),Er(k,e.name),Er(T,e.name);const w=new Yn({uid:A,auth:e,email:v,emailVerified:D,displayName:g,isAnonymous:U,photoURL:b,phoneNumber:R,tenantId:N,stsTokenManager:y,createdAt:k,lastLoginAt:T});return z&&Array.isArray(z)&&(w.providerData=z.map(S=>Object.assign({},S))),V&&(w._redirectEventId=V),w}static async _fromIdTokenResponse(e,n,r=!1){const i=new Es;i.updateFromServerResponse(n);const s=new Yn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await wu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];ne(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?y0(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Es;l.updateFromIdToken(r);const u=new Yn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new pd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=new Map;function Jn(t){or(t instanceof Function,"Expected a class definition");let e=mg.get(t);return e?(or(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,mg.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}v0.type="NONE";const gg=v0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(t,e,n){return`firebase:${t}:${e}:${n}`}class Ts{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ul(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ul("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Yn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ts(Jn(gg),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||Jn(gg);const o=Ul(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const f=await h._get(o);if(f){const g=Yn._fromJSON(e,f);h!==s&&(l=g),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Ts(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Ts(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(T0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(S0(e))return"Blackberry";if(k0(e))return"Webos";if(w0(e))return"Safari";if((e.includes("chrome/")||E0(e))&&!e.includes("edge/"))return"Chrome";if(I0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _0(t=It()){return/firefox\//i.test(t)}function w0(t=It()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function E0(t=It()){return/crios\//i.test(t)}function T0(t=It()){return/iemobile/i.test(t)}function I0(t=It()){return/android/i.test(t)}function S0(t=It()){return/blackberry/i.test(t)}function k0(t=It()){return/webos/i.test(t)}function Vf(t=It()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function tk(t=It()){var e;return Vf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function nk(){return _I()&&document.documentMode===10}function A0(t=It()){return Vf(t)||I0(t)||k0(t)||S0(t)||/windows phone/i.test(t)||T0(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R0(t,e=[]){let n;switch(t){case"Browser":n=yg(It());break;case"Worker":n=`${yg(It())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Mi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ik(t,e={}){return $s(t,"GET","/v2/passwordPolicy",Zu(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sk=6;class ok{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:sk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vg(this),this.idTokenSubscription=new vg(this),this.beforeStateQueue=new rk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=c0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Jn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ts.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await g0(this,{idToken:e}),r=await Yn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Qn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ne(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await wu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$S()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qn(this.app))return Promise.reject(Wr(this));const n=e?tt(e):null;return n&&ne(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ne(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qn(this.app)?Promise.reject(Wr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qn(this.app)?Promise.reject(Wr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Jn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ik(this),n=new ok(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ea("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ek(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Jn(e)||this._popupRedirectResolver;ne(n,this,"argument-error"),this.redirectPersistenceManager=await Ts.create(this,[Jn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(ne(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ne(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=R0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&US(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ec(t){return tt(t)}class vg{constructor(e){this.auth=e,this.observer=null,this.addObserver=RI(n=>this.observer=n)}get next(){return ne(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mf={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lk(t){Mf=t}function uk(t){return Mf.loadJS(t)}function ck(){return Mf.gapiScript}function hk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dk(t,e){const n=Ju(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(aa(s,e??{}))return i;sr(i,"already-initialized")}return n.initialize({options:e})}function fk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Jn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function pk(t,e,n){const r=ec(t);ne(r._canInitEmulator,r,"emulator-config-failed"),ne(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=x0(e),{host:o,port:l}=mk(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),gk()}function x0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function mk(t){const e=x0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:_g(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:_g(o)}}}function _g(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Xn("not implemented")}_getIdTokenResponse(e){return Xn("not implemented")}_linkToIdToken(e,n){return Xn("not implemented")}_getReauthenticationResolver(e){return Xn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(t,e){return p0(t,"POST","/v1/accounts:signInWithIdp",Zu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yk="http://localhost";class Pi extends C0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Pi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):sr("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=bf(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Pi(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Is(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Is(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Is(e,n)}buildRequest(){const e={requestUri:yk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ta(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa extends P0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends Sa{constructor(){super("facebook.com")}static credential(e){return Pi._fromParams({providerId:Rr.PROVIDER_ID,signInMethod:Rr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rr.credentialFromTaggedObject(e)}static credentialFromError(e){return Rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rr.credential(e.oauthAccessToken)}catch{return null}}}Rr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr extends Sa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Pi._fromParams({providerId:xr.PROVIDER_ID,signInMethod:xr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return xr.credentialFromTaggedObject(e)}static credentialFromError(e){return xr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return xr.credential(n,r)}catch{return null}}}xr.GOOGLE_SIGN_IN_METHOD="google.com";xr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr extends Sa{constructor(){super("github.com")}static credential(e){return Pi._fromParams({providerId:Cr.PROVIDER_ID,signInMethod:Cr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Cr.credentialFromTaggedObject(e)}static credentialFromError(e){return Cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Cr.credential(e.oauthAccessToken)}catch{return null}}}Cr.GITHUB_SIGN_IN_METHOD="github.com";Cr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr extends Sa{constructor(){super("twitter.com")}static credential(e,n){return Pi._fromParams({providerId:Pr.PROVIDER_ID,signInMethod:Pr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Pr.credentialFromTaggedObject(e)}static credentialFromError(e){return Pr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Pr.credential(n,r)}catch{return null}}}Pr.TWITTER_SIGN_IN_METHOD="twitter.com";Pr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vk(t,e){return p0(t,"POST","/v1/accounts:signUp",Zu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Yn._fromIdTokenResponse(e,r,i),o=wg(r);return new Xr({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=wg(r);return new Xr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function wg(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _k(t){var e;if(Qn(t.app))return Promise.reject(Wr(t));const n=ec(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Xr({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await vk(n,{returnSecureToken:!0}),i=await Xr._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu extends jn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Eu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Eu(e,n,r,i)}}function b0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Eu._fromErrorAndOperation(t,s,e,r):s})}async function wk(t,e,n=!1){const r=await ca(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Xr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ek(t,e,n=!1){const{auth:r}=t;if(Qn(r.app))return Promise.reject(Wr(r));const i="reauthenticate";try{const s=await ca(t,b0(r,i,e,t),n);ne(s.idToken,r,"internal-error");const o=Of(s.idToken);ne(o,r,"internal-error");const{sub:l}=o;return ne(t.uid===l,r,"user-mismatch"),Xr._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&sr(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tk(t,e,n=!1){if(Qn(t.app))return Promise.reject(Wr(t));const r="signIn",i=await b0(t,r,e),s=await Xr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function Ik(t,e,n,r){return tt(t).onIdTokenChanged(e,n,r)}function Sk(t,e,n){return tt(t).beforeAuthStateChanged(e,n)}function kk(t,e,n,r){return tt(t).onAuthStateChanged(e,n,r)}const Tu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Tu,"1"),this.storage.removeItem(Tu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ak=1e3,Rk=10;class D0 extends N0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=A0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);nk()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Rk):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Ak)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}D0.type="LOCAL";const xk=D0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O0 extends N0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}O0.type="SESSION";const V0=O0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ck(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new tc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),u=await Ck(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}tc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const h=Lf("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){const v=g;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(v.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(){return window}function bk(t){Dn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M0(){return typeof Dn().WorkerGlobalScope<"u"&&typeof Dn().importScripts=="function"}async function Nk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Dk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ok(){return M0()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0="firebaseLocalStorageDb",Vk=1,Iu="firebaseLocalStorage",j0="fbase_key";class ka{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function nc(t,e){return t.transaction([Iu],e?"readwrite":"readonly").objectStore(Iu)}function Mk(){const t=indexedDB.deleteDatabase(L0);return new ka(t).toPromise()}function md(){const t=indexedDB.open(L0,Vk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Iu,{keyPath:j0})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Iu)?e(r):(r.close(),await Mk(),e(await md()))})})}async function Eg(t,e,n){const r=nc(t,!0).put({[j0]:e,value:n});return new ka(r).toPromise()}async function Lk(t,e){const n=nc(t,!1).get(e),r=await new ka(n).toPromise();return r===void 0?null:r.value}function Tg(t,e){const n=nc(t,!0).delete(e);return new ka(n).toPromise()}const jk=800,Fk=3;class F0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await md(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Fk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return M0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=tc._getInstance(Ok()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Nk(),!this.activeServiceWorker)return;this.sender=new Pk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Dk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await md();return await Eg(e,Tu,"1"),await Tg(e,Tu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Eg(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Lk(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Tg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=nc(i,!1).getAll();return new ka(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),jk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}F0.type="LOCAL";const Uk=F0;new Ia(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zk(t,e){return e?Jn(e):(ne(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf extends C0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Is(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Is(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Is(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Bk(t){return Tk(t.auth,new jf(t),t.bypassAuthState)}function $k(t){const{auth:e,user:n}=t;return ne(n,e,"internal-error"),Ek(n,new jf(t),t.bypassAuthState)}async function Wk(t){const{auth:e,user:n}=t;return ne(n,e,"internal-error"),wk(n,new jf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U0{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Bk;case"linkViaPopup":case"linkViaRedirect":return Wk;case"reauthViaPopup":case"reauthViaRedirect":return $k;default:sr(this.auth,"internal-error")}}resolve(e){or(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){or(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qk=new Ia(2e3,1e4);class ps extends U0{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ps.currentPopupAction&&ps.currentPopupAction.cancel(),ps.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ne(e,this.auth,"internal-error"),e}async onExecution(){or(this.filter.length===1,"Popup operations only handle one event");const e=Lf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Nn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Nn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ps.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Nn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qk.get())};e()}}ps.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hk="pendingRedirect",zl=new Map;class Kk extends U0{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=zl.get(this.auth._key());if(!e){try{const r=await Gk(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}zl.set(this.auth._key(),e)}return this.bypassAuthState||zl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Gk(t,e){const n=Yk(e),r=Xk(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Qk(t,e){zl.set(t._key(),e)}function Xk(t){return Jn(t._redirectPersistence)}function Yk(t){return Ul(Hk,t.config.apiKey,t.name)}async function Jk(t,e,n=!1){if(Qn(t.app))return Promise.reject(Wr(t));const r=ec(t),i=zk(r,e),o=await new Kk(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk=10*60*1e3;class e2{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!t2(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!z0(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Nn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Zk&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ig(e))}saveEventToCache(e){this.cachedEventUids.add(Ig(e)),this.lastProcessedEventTime=Date.now()}}function Ig(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function z0({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function t2(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return z0(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n2(t,e={}){return $s(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r2=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,i2=/^https?/;async function s2(t){if(t.config.emulator)return;const{authorizedDomains:e}=await n2(t);for(const n of e)try{if(o2(n))return}catch{}sr(t,"unauthorized-domain")}function o2(t){const e=fd(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!i2.test(n))return!1;if(r2.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a2=new Ia(3e4,6e4);function Sg(){const t=Dn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function l2(t){return new Promise((e,n)=>{var r,i,s;function o(){Sg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Sg(),n(Nn(t,"network-request-failed"))},timeout:a2.get()})}if(!((i=(r=Dn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Dn().gapi)===null||s===void 0)&&s.load)o();else{const l=hk("iframefcb");return Dn()[l]=()=>{gapi.load?o():n(Nn(t,"network-request-failed"))},uk(`${ck()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Bl=null,e})}let Bl=null;function u2(t){return Bl=Bl||l2(t),Bl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c2=new Ia(5e3,15e3),h2="__/auth/iframe",d2="emulator/auth/iframe",f2={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},p2=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function m2(t){const e=t.config;ne(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Df(e,d2):`https://${t.config.authDomain}/${h2}`,r={apiKey:e.apiKey,appName:t.name,v:Mi},i=p2.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ta(r).slice(1)}`}async function g2(t){const e=await u2(t),n=Dn().gapi;return ne(n,t,"internal-error"),e.open({where:document.body,url:m2(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:f2,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Nn(t,"network-request-failed"),l=Dn().setTimeout(()=>{s(o)},c2.get());function u(){Dn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y2={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},v2=500,_2=600,w2="_blank",E2="http://localhost";class kg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function T2(t,e,n,r=v2,i=_2){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},y2),{width:r.toString(),height:i.toString(),top:s,left:o}),h=It().toLowerCase();n&&(l=E0(h)?w2:n),_0(h)&&(e=e||E2,u.scrollbars="yes");const f=Object.entries(u).reduce((v,[R,b])=>`${v}${R}=${b},`,"");if(tk(h)&&l!=="_self")return I2(e||"",l),new kg(null);const g=window.open(e||"",l,f);ne(g,t,"popup-blocked");try{g.focus()}catch{}return new kg(g)}function I2(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S2="__/auth/handler",k2="emulator/auth/handler",A2=encodeURIComponent("fac");async function Ag(t,e,n,r,i,s){ne(t.config.authDomain,t,"auth-domain-config-required"),ne(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Mi,eventId:i};if(e instanceof P0){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",AI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))o[f]=g}if(e instanceof Sa){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),h=u?`#${A2}=${encodeURIComponent(u)}`:"";return`${R2(t)}?${Ta(l).slice(1)}${h}`}function R2({config:t}){return t.emulator?Df(t,k2):`https://${t.authDomain}/${S2}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah="webStorageSupport";class x2{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=V0,this._completeRedirectFn=Jk,this._overrideRedirectResult=Qk}async _openPopup(e,n,r,i){var s;or((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Ag(e,n,r,fd(),i);return T2(e,o,Lf())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Ag(e,n,r,fd(),i);return bk(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(or(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await g2(e),r=new e2(e);return n.register("authEvent",i=>(ne(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ah,{type:ah},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[ah];o!==void 0&&n(!!o),sr(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=s2(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return A0()||w0()||Vf()}}const C2=x2;var Rg="@firebase/auth",xg="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P2{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ne(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b2(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function N2(t){Ci(new Qr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;ne(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:R0(t)},h=new ak(r,i,s,u);return fk(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ci(new Qr("auth-internal",e=>{const n=ec(e.getProvider("auth").getImmediate());return(r=>new P2(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),bn(Rg,xg,b2(t)),bn(Rg,xg,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D2=5*60,O2=n0("authIdTokenMaxAge")||D2;let Cg=null;const V2=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>O2)return;const i=n==null?void 0:n.token;Cg!==i&&(Cg=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function M2(t=Pf()){const e=Ju(t,"auth");if(e.isInitialized())return e.getImmediate();const n=dk(t,{popupRedirectResolver:C2,persistence:[Uk,xk,V0]}),r=n0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=V2(s.toString());Sk(n,o,()=>o(n.currentUser)),Ik(n,l=>o(l))}}const i=Z_("auth");return i&&pk(n,`http://${i}`),n}function L2(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}lk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Nn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",L2().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});N2("Browser");var Pg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ii,B0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,y){function w(){}w.prototype=y.prototype,_.D=y.prototype,_.prototype=new w,_.prototype.constructor=_,_.C=function(S,x,C){for(var I=Array(arguments.length-2),Ee=2;Ee<arguments.length;Ee++)I[Ee-2]=arguments[Ee];return y.prototype[x].apply(S,I)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(_,y,w){w||(w=0);var S=Array(16);if(typeof y=="string")for(var x=0;16>x;++x)S[x]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(x=0;16>x;++x)S[x]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=_.g[0],w=_.g[1],x=_.g[2];var C=_.g[3],I=y+(C^w&(x^C))+S[0]+3614090360&4294967295;y=w+(I<<7&4294967295|I>>>25),I=C+(x^y&(w^x))+S[1]+3905402710&4294967295,C=y+(I<<12&4294967295|I>>>20),I=x+(w^C&(y^w))+S[2]+606105819&4294967295,x=C+(I<<17&4294967295|I>>>15),I=w+(y^x&(C^y))+S[3]+3250441966&4294967295,w=x+(I<<22&4294967295|I>>>10),I=y+(C^w&(x^C))+S[4]+4118548399&4294967295,y=w+(I<<7&4294967295|I>>>25),I=C+(x^y&(w^x))+S[5]+1200080426&4294967295,C=y+(I<<12&4294967295|I>>>20),I=x+(w^C&(y^w))+S[6]+2821735955&4294967295,x=C+(I<<17&4294967295|I>>>15),I=w+(y^x&(C^y))+S[7]+4249261313&4294967295,w=x+(I<<22&4294967295|I>>>10),I=y+(C^w&(x^C))+S[8]+1770035416&4294967295,y=w+(I<<7&4294967295|I>>>25),I=C+(x^y&(w^x))+S[9]+2336552879&4294967295,C=y+(I<<12&4294967295|I>>>20),I=x+(w^C&(y^w))+S[10]+4294925233&4294967295,x=C+(I<<17&4294967295|I>>>15),I=w+(y^x&(C^y))+S[11]+2304563134&4294967295,w=x+(I<<22&4294967295|I>>>10),I=y+(C^w&(x^C))+S[12]+1804603682&4294967295,y=w+(I<<7&4294967295|I>>>25),I=C+(x^y&(w^x))+S[13]+4254626195&4294967295,C=y+(I<<12&4294967295|I>>>20),I=x+(w^C&(y^w))+S[14]+2792965006&4294967295,x=C+(I<<17&4294967295|I>>>15),I=w+(y^x&(C^y))+S[15]+1236535329&4294967295,w=x+(I<<22&4294967295|I>>>10),I=y+(x^C&(w^x))+S[1]+4129170786&4294967295,y=w+(I<<5&4294967295|I>>>27),I=C+(w^x&(y^w))+S[6]+3225465664&4294967295,C=y+(I<<9&4294967295|I>>>23),I=x+(y^w&(C^y))+S[11]+643717713&4294967295,x=C+(I<<14&4294967295|I>>>18),I=w+(C^y&(x^C))+S[0]+3921069994&4294967295,w=x+(I<<20&4294967295|I>>>12),I=y+(x^C&(w^x))+S[5]+3593408605&4294967295,y=w+(I<<5&4294967295|I>>>27),I=C+(w^x&(y^w))+S[10]+38016083&4294967295,C=y+(I<<9&4294967295|I>>>23),I=x+(y^w&(C^y))+S[15]+3634488961&4294967295,x=C+(I<<14&4294967295|I>>>18),I=w+(C^y&(x^C))+S[4]+3889429448&4294967295,w=x+(I<<20&4294967295|I>>>12),I=y+(x^C&(w^x))+S[9]+568446438&4294967295,y=w+(I<<5&4294967295|I>>>27),I=C+(w^x&(y^w))+S[14]+3275163606&4294967295,C=y+(I<<9&4294967295|I>>>23),I=x+(y^w&(C^y))+S[3]+4107603335&4294967295,x=C+(I<<14&4294967295|I>>>18),I=w+(C^y&(x^C))+S[8]+1163531501&4294967295,w=x+(I<<20&4294967295|I>>>12),I=y+(x^C&(w^x))+S[13]+2850285829&4294967295,y=w+(I<<5&4294967295|I>>>27),I=C+(w^x&(y^w))+S[2]+4243563512&4294967295,C=y+(I<<9&4294967295|I>>>23),I=x+(y^w&(C^y))+S[7]+1735328473&4294967295,x=C+(I<<14&4294967295|I>>>18),I=w+(C^y&(x^C))+S[12]+2368359562&4294967295,w=x+(I<<20&4294967295|I>>>12),I=y+(w^x^C)+S[5]+4294588738&4294967295,y=w+(I<<4&4294967295|I>>>28),I=C+(y^w^x)+S[8]+2272392833&4294967295,C=y+(I<<11&4294967295|I>>>21),I=x+(C^y^w)+S[11]+1839030562&4294967295,x=C+(I<<16&4294967295|I>>>16),I=w+(x^C^y)+S[14]+4259657740&4294967295,w=x+(I<<23&4294967295|I>>>9),I=y+(w^x^C)+S[1]+2763975236&4294967295,y=w+(I<<4&4294967295|I>>>28),I=C+(y^w^x)+S[4]+1272893353&4294967295,C=y+(I<<11&4294967295|I>>>21),I=x+(C^y^w)+S[7]+4139469664&4294967295,x=C+(I<<16&4294967295|I>>>16),I=w+(x^C^y)+S[10]+3200236656&4294967295,w=x+(I<<23&4294967295|I>>>9),I=y+(w^x^C)+S[13]+681279174&4294967295,y=w+(I<<4&4294967295|I>>>28),I=C+(y^w^x)+S[0]+3936430074&4294967295,C=y+(I<<11&4294967295|I>>>21),I=x+(C^y^w)+S[3]+3572445317&4294967295,x=C+(I<<16&4294967295|I>>>16),I=w+(x^C^y)+S[6]+76029189&4294967295,w=x+(I<<23&4294967295|I>>>9),I=y+(w^x^C)+S[9]+3654602809&4294967295,y=w+(I<<4&4294967295|I>>>28),I=C+(y^w^x)+S[12]+3873151461&4294967295,C=y+(I<<11&4294967295|I>>>21),I=x+(C^y^w)+S[15]+530742520&4294967295,x=C+(I<<16&4294967295|I>>>16),I=w+(x^C^y)+S[2]+3299628645&4294967295,w=x+(I<<23&4294967295|I>>>9),I=y+(x^(w|~C))+S[0]+4096336452&4294967295,y=w+(I<<6&4294967295|I>>>26),I=C+(w^(y|~x))+S[7]+1126891415&4294967295,C=y+(I<<10&4294967295|I>>>22),I=x+(y^(C|~w))+S[14]+2878612391&4294967295,x=C+(I<<15&4294967295|I>>>17),I=w+(C^(x|~y))+S[5]+4237533241&4294967295,w=x+(I<<21&4294967295|I>>>11),I=y+(x^(w|~C))+S[12]+1700485571&4294967295,y=w+(I<<6&4294967295|I>>>26),I=C+(w^(y|~x))+S[3]+2399980690&4294967295,C=y+(I<<10&4294967295|I>>>22),I=x+(y^(C|~w))+S[10]+4293915773&4294967295,x=C+(I<<15&4294967295|I>>>17),I=w+(C^(x|~y))+S[1]+2240044497&4294967295,w=x+(I<<21&4294967295|I>>>11),I=y+(x^(w|~C))+S[8]+1873313359&4294967295,y=w+(I<<6&4294967295|I>>>26),I=C+(w^(y|~x))+S[15]+4264355552&4294967295,C=y+(I<<10&4294967295|I>>>22),I=x+(y^(C|~w))+S[6]+2734768916&4294967295,x=C+(I<<15&4294967295|I>>>17),I=w+(C^(x|~y))+S[13]+1309151649&4294967295,w=x+(I<<21&4294967295|I>>>11),I=y+(x^(w|~C))+S[4]+4149444226&4294967295,y=w+(I<<6&4294967295|I>>>26),I=C+(w^(y|~x))+S[11]+3174756917&4294967295,C=y+(I<<10&4294967295|I>>>22),I=x+(y^(C|~w))+S[2]+718787259&4294967295,x=C+(I<<15&4294967295|I>>>17),I=w+(C^(x|~y))+S[9]+3951481745&4294967295,_.g[0]=_.g[0]+y&4294967295,_.g[1]=_.g[1]+(x+(I<<21&4294967295|I>>>11))&4294967295,_.g[2]=_.g[2]+x&4294967295,_.g[3]=_.g[3]+C&4294967295}r.prototype.u=function(_,y){y===void 0&&(y=_.length);for(var w=y-this.blockSize,S=this.B,x=this.h,C=0;C<y;){if(x==0)for(;C<=w;)i(this,_,C),C+=this.blockSize;if(typeof _=="string"){for(;C<y;)if(S[x++]=_.charCodeAt(C++),x==this.blockSize){i(this,S),x=0;break}}else for(;C<y;)if(S[x++]=_[C++],x==this.blockSize){i(this,S),x=0;break}}this.h=x,this.o+=y},r.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var y=1;y<_.length-8;++y)_[y]=0;var w=8*this.o;for(y=_.length-8;y<_.length;++y)_[y]=w&255,w/=256;for(this.u(_),_=Array(16),y=w=0;4>y;++y)for(var S=0;32>S;S+=8)_[w++]=this.g[y]>>>S&255;return _};function s(_,y){var w=l;return Object.prototype.hasOwnProperty.call(w,_)?w[_]:w[_]=y(_)}function o(_,y){this.h=y;for(var w=[],S=!0,x=_.length-1;0<=x;x--){var C=_[x]|0;S&&C==y||(w[x]=C,S=!1)}this.g=w}var l={};function u(_){return-128<=_&&128>_?s(_,function(y){return new o([y|0],0>y?-1:0)}):new o([_|0],0>_?-1:0)}function h(_){if(isNaN(_)||!isFinite(_))return g;if(0>_)return V(h(-_));for(var y=[],w=1,S=0;_>=w;S++)y[S]=_/w|0,w*=4294967296;return new o(y,0)}function f(_,y){if(_.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(_.charAt(0)=="-")return V(f(_.substring(1),y));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(y,8)),S=g,x=0;x<_.length;x+=8){var C=Math.min(8,_.length-x),I=parseInt(_.substring(x,x+C),y);8>C?(C=h(Math.pow(y,C)),S=S.j(C).add(h(I))):(S=S.j(w),S=S.add(h(I)))}return S}var g=u(0),v=u(1),R=u(16777216);t=o.prototype,t.m=function(){if(N(this))return-V(this).m();for(var _=0,y=1,w=0;w<this.g.length;w++){var S=this.i(w);_+=(0<=S?S:4294967296+S)*y,y*=4294967296}return _},t.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(b(this))return"0";if(N(this))return"-"+V(this).toString(_);for(var y=h(Math.pow(_,6)),w=this,S="";;){var x=D(w,y).g;w=k(w,x.j(y));var C=((0<w.g.length?w.g[0]:w.h)>>>0).toString(_);if(w=x,b(w))return C+S;for(;6>C.length;)C="0"+C;S=C+S}},t.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function b(_){if(_.h!=0)return!1;for(var y=0;y<_.g.length;y++)if(_.g[y]!=0)return!1;return!0}function N(_){return _.h==-1}t.l=function(_){return _=k(this,_),N(_)?-1:b(_)?0:1};function V(_){for(var y=_.g.length,w=[],S=0;S<y;S++)w[S]=~_.g[S];return new o(w,~_.h).add(v)}t.abs=function(){return N(this)?V(this):this},t.add=function(_){for(var y=Math.max(this.g.length,_.g.length),w=[],S=0,x=0;x<=y;x++){var C=S+(this.i(x)&65535)+(_.i(x)&65535),I=(C>>>16)+(this.i(x)>>>16)+(_.i(x)>>>16);S=I>>>16,C&=65535,I&=65535,w[x]=I<<16|C}return new o(w,w[w.length-1]&-2147483648?-1:0)};function k(_,y){return _.add(V(y))}t.j=function(_){if(b(this)||b(_))return g;if(N(this))return N(_)?V(this).j(V(_)):V(V(this).j(_));if(N(_))return V(this.j(V(_)));if(0>this.l(R)&&0>_.l(R))return h(this.m()*_.m());for(var y=this.g.length+_.g.length,w=[],S=0;S<2*y;S++)w[S]=0;for(S=0;S<this.g.length;S++)for(var x=0;x<_.g.length;x++){var C=this.i(S)>>>16,I=this.i(S)&65535,Ee=_.i(x)>>>16,jt=_.i(x)&65535;w[2*S+2*x]+=I*jt,T(w,2*S+2*x),w[2*S+2*x+1]+=C*jt,T(w,2*S+2*x+1),w[2*S+2*x+1]+=I*Ee,T(w,2*S+2*x+1),w[2*S+2*x+2]+=C*Ee,T(w,2*S+2*x+2)}for(S=0;S<y;S++)w[S]=w[2*S+1]<<16|w[2*S];for(S=y;S<2*y;S++)w[S]=0;return new o(w,0)};function T(_,y){for(;(_[y]&65535)!=_[y];)_[y+1]+=_[y]>>>16,_[y]&=65535,y++}function A(_,y){this.g=_,this.h=y}function D(_,y){if(b(y))throw Error("division by zero");if(b(_))return new A(g,g);if(N(_))return y=D(V(_),y),new A(V(y.g),V(y.h));if(N(y))return y=D(_,V(y)),new A(V(y.g),y.h);if(30<_.g.length){if(N(_)||N(y))throw Error("slowDivide_ only works with positive integers.");for(var w=v,S=y;0>=S.l(_);)w=U(w),S=U(S);var x=z(w,1),C=z(S,1);for(S=z(S,2),w=z(w,2);!b(S);){var I=C.add(S);0>=I.l(_)&&(x=x.add(w),C=I),S=z(S,1),w=z(w,1)}return y=k(_,x.j(y)),new A(x,y)}for(x=g;0<=_.l(y);){for(w=Math.max(1,Math.floor(_.m()/y.m())),S=Math.ceil(Math.log(w)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),C=h(w),I=C.j(y);N(I)||0<I.l(_);)w-=S,C=h(w),I=C.j(y);b(C)&&(C=v),x=x.add(C),_=k(_,I)}return new A(x,_)}t.A=function(_){return D(this,_).h},t.and=function(_){for(var y=Math.max(this.g.length,_.g.length),w=[],S=0;S<y;S++)w[S]=this.i(S)&_.i(S);return new o(w,this.h&_.h)},t.or=function(_){for(var y=Math.max(this.g.length,_.g.length),w=[],S=0;S<y;S++)w[S]=this.i(S)|_.i(S);return new o(w,this.h|_.h)},t.xor=function(_){for(var y=Math.max(this.g.length,_.g.length),w=[],S=0;S<y;S++)w[S]=this.i(S)^_.i(S);return new o(w,this.h^_.h)};function U(_){for(var y=_.g.length+1,w=[],S=0;S<y;S++)w[S]=_.i(S)<<1|_.i(S-1)>>>31;return new o(w,_.h)}function z(_,y){var w=y>>5;y%=32;for(var S=_.g.length-w,x=[],C=0;C<S;C++)x[C]=0<y?_.i(C+w)>>>y|_.i(C+w+1)<<32-y:_.i(C+w);return new o(x,_.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,B0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Ii=o}).apply(typeof Pg<"u"?Pg:typeof self<"u"?self:typeof window<"u"?window:{});var _l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $0,Ao,W0,$l,gd,q0,H0,K0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof _l=="object"&&_l];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(a,c){if(c)e:{var d=r;a=a.split(".");for(var p=0;p<a.length-1;p++){var P=a[p];if(!(P in d))break e;d=d[P]}a=a[a.length-1],p=d[a],c=c(p),c!=p&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function s(a,c){a instanceof String&&(a+="");var d=0,p=!1,P={next:function(){if(!p&&d<a.length){var O=d++;return{value:c(O,a[O]),done:!1}}return p=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}i("Array.prototype.values",function(a){return a||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function f(a,c,d){return a.call.apply(a.bind,arguments)}function g(a,c,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,p),a.apply(c,P)}}return function(){return a.apply(c,arguments)}}function v(a,c,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,v.apply(null,arguments)}function R(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function b(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,P,O){for(var $=Array(arguments.length-2),Te=2;Te<arguments.length;Te++)$[Te-2]=arguments[Te];return c.prototype[P].apply(p,$)}}function N(a){const c=a.length;if(0<c){const d=Array(c);for(let p=0;p<c;p++)d[p]=a[p];return d}return[]}function V(a,c){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const P=a.length||0,O=p.length||0;a.length=P+O;for(let $=0;$<O;$++)a[P+$]=p[$]}else a.push(p)}}class k{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function T(a){return/^[\s\xa0]*$/.test(a)}function A(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function D(a){return D[" "](a),a}D[" "]=function(){};var U=A().indexOf("Gecko")!=-1&&!(A().toLowerCase().indexOf("webkit")!=-1&&A().indexOf("Edge")==-1)&&!(A().indexOf("Trident")!=-1||A().indexOf("MSIE")!=-1)&&A().indexOf("Edge")==-1;function z(a,c,d){for(const p in a)c.call(d,a[p],p,a)}function _(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function y(a){const c={};for(const d in a)c[d]=a[d];return c}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,c){let d,p;for(let P=1;P<arguments.length;P++){p=arguments[P];for(d in p)a[d]=p[d];for(let O=0;O<w.length;O++)d=w[O],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function x(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function C(a){l.setTimeout(()=>{throw a},0)}function I(){var a=ee;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class Ee{constructor(){this.h=this.g=null}add(c,d){const p=jt.get();p.set(c,d),this.h?this.h.next=p:this.g=p,this.h=p}}var jt=new k(()=>new wn,a=>a.reset());class wn{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ft,q=!1,ee=new Ee,Z=()=>{const a=l.Promise.resolve(void 0);Ft=()=>{a.then(Ie)}};var Ie=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(d){C(d)}var c=jt;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}q=!1};function ge(){this.s=this.s,this.C=this.C}ge.prototype.s=!1,ge.prototype.ma=function(){this.s||(this.s=!0,this.N())},ge.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var Qt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function Xt(a,c){if(Se.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(U){e:{try{D(c.nodeName);var P=!0;break e}catch{}P=!1}P||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Pt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Xt.aa.h.call(this)}}b(Xt,Se);var Pt={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var dt="closure_listenable_"+(1e6*Math.random()|0),Fi=0;function Un(a,c,d,p,P){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!p,this.ha=P,this.key=++Fi,this.da=this.fa=!1}function En(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Yt(a){this.src=a,this.g={},this.h=0}Yt.prototype.add=function(a,c,d,p,P){var O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);var $=Qs(a,c,p,P);return-1<$?(c=a[$],d||(c.fa=!1)):(c=new Un(c,this.src,O,!!p,P),c.fa=d,a.push(c)),c};function cr(a,c){var d=c.type;if(d in a.g){var p=a.g[d],P=Array.prototype.indexOf.call(p,c,void 0),O;(O=0<=P)&&Array.prototype.splice.call(p,P,1),O&&(En(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Qs(a,c,d,p){for(var P=0;P<a.length;++P){var O=a[P];if(!O.da&&O.listener==c&&O.capture==!!d&&O.ha==p)return P}return-1}var si="closure_lm_"+(1e6*Math.random()|0),St={};function Ui(a,c,d,p,P){if(Array.isArray(c)){for(var O=0;O<c.length;O++)Ui(a,c[O],d,p,P);return null}return d=Bi(d),a&&a[dt]?a.K(c,d,h(p)?!!p.capture:!1,P):vp(a,c,d,!1,p,P)}function vp(a,c,d,p,P,O){if(!c)throw Error("Invalid event type");var $=h(P)?!!P.capture:!!P,Te=zn(a);if(Te||(a[si]=Te=new Yt(a)),d=Te.add(c,d,p,$,O),d.proxy)return d;if(p=Tc(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)Qt||(P=$),P===void 0&&(P=!1),a.addEventListener(c.toString(),p,P);else if(a.attachEvent)a.attachEvent(zi(c.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Tc(){function a(d){return c.call(a.src,a.listener,d)}const c=de;return a}function Xs(a,c,d,p,P){if(Array.isArray(c))for(var O=0;O<c.length;O++)Xs(a,c[O],d,p,P);else p=h(p)?!!p.capture:!!p,d=Bi(d),a&&a[dt]?(a=a.i,c=String(c).toString(),c in a.g&&(O=a.g[c],d=Qs(O,d,p,P),-1<d&&(En(O[d]),Array.prototype.splice.call(O,d,1),O.length==0&&(delete a.g[c],a.h--)))):a&&(a=zn(a))&&(c=a.g[c.toString()],a=-1,c&&(a=Qs(c,d,p,P)),(d=-1<a?c[a]:null)&&oi(d))}function oi(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[dt])cr(c.i,a);else{var d=a.type,p=a.proxy;c.removeEventListener?c.removeEventListener(d,p,a.capture):c.detachEvent?c.detachEvent(zi(d),p):c.addListener&&c.removeListener&&c.removeListener(p),(d=zn(c))?(cr(d,a),d.h==0&&(d.src=null,c[si]=null)):En(a)}}}function zi(a){return a in St?St[a]:St[a]="on"+a}function de(a,c){if(a.da)a=!0;else{c=new Xt(c,this);var d=a.listener,p=a.ha||a.src;a.fa&&oi(a),a=d.call(p,c)}return a}function zn(a){return a=a[si],a instanceof Yt?a:null}var hr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bi(a){return typeof a=="function"?a:(a[hr]||(a[hr]=function(c){return a.handleEvent(c)}),a[hr])}function je(){ge.call(this),this.i=new Yt(this),this.M=this,this.F=null}b(je,ge),je.prototype[dt]=!0,je.prototype.removeEventListener=function(a,c,d,p){Xs(this,a,c,d,p)};function Fe(a,c){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=c.type||c,typeof c=="string")c=new Se(c,a);else if(c instanceof Se)c.target=c.target||a;else{var P=c;c=new Se(p,a),S(c,P)}if(P=!0,d)for(var O=d.length-1;0<=O;O--){var $=c.g=d[O];P=Ys($,p,!0,c)&&P}if($=c.g=a,P=Ys($,p,!0,c)&&P,P=Ys($,p,!1,c)&&P,d)for(O=0;O<d.length;O++)$=c.g=d[O],P=Ys($,p,!1,c)&&P}je.prototype.N=function(){if(je.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],p=0;p<d.length;p++)En(d[p]);delete a.g[c],a.h--}}this.F=null},je.prototype.K=function(a,c,d,p){return this.i.add(String(a),c,!1,d,p)},je.prototype.L=function(a,c,d,p){return this.i.add(String(a),c,!0,d,p)};function Ys(a,c,d,p){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var P=!0,O=0;O<c.length;++O){var $=c[O];if($&&!$.da&&$.capture==d){var Te=$.listener,rt=$.ha||$.src;$.fa&&cr(a.i,$),P=Te.call(rt,p)!==!1&&P}}return P&&!p.defaultPrevented}function Da(a,c,d){if(typeof a=="function")d&&(a=v(a,d));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function Tn(a){a.g=Da(()=>{a.g=null,a.i&&(a.i=!1,Tn(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class Ic extends ge{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Tn(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function In(a){ge.call(this),this.h=a,this.g={}}b(In,ge);var ai=[];function Oa(a){z(a.g,function(c,d){this.g.hasOwnProperty(d)&&oi(c)},a),a.g={}}In.prototype.N=function(){In.aa.N.call(this),Oa(this)},In.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Sn=l.JSON.stringify,dr=l.JSON.parse,fr=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Jt(){}Jt.prototype.h=null;function bt(a){return a.h||(a.h=a.i())}function Ut(){}var pr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function $i(){Se.call(this,"d")}b($i,Se);function Js(){Se.call(this,"c")}b(Js,Se);var Bn={},Zs=null;function Wi(){return Zs=Zs||new je}Bn.La="serverreachability";function Va(a){Se.call(this,Bn.La,a)}b(Va,Se);function mr(a){const c=Wi();Fe(c,new Va(c))}Bn.STAT_EVENT="statevent";function Ma(a,c){Se.call(this,Bn.STAT_EVENT,a),this.stat=c}b(Ma,Se);function nt(a){const c=Wi();Fe(c,new Ma(c,a))}Bn.Ma="timingevent";function La(a,c){Se.call(this,Bn.Ma,a),this.size=c}b(La,Se);function li(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function gr(){this.g=!0}gr.prototype.xa=function(){this.g=!1};function ja(a,c,d,p,P,O){a.info(function(){if(a.g)if(O)for(var $="",Te=O.split("&"),rt=0;rt<Te.length;rt++){var pe=Te[rt].split("=");if(1<pe.length){var ft=pe[0];pe=pe[1];var pt=ft.split("_");$=2<=pt.length&&pt[1]=="type"?$+(ft+"="+pe+"&"):$+(ft+"=redacted&")}}else $=null;else $=O;return"XMLHTTP REQ ("+p+") [attempt "+P+"]: "+c+`
`+d+`
`+$})}function Fa(a,c,d,p,P,O,$){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+P+"]: "+c+`
`+d+`
`+O+" "+$})}function un(a,c,d,p){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+eo(a,d)+(p?" "+p:"")})}function Ua(a,c){a.info(function(){return"TIMEOUT: "+c})}gr.prototype.info=function(){};function eo(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var P=p[1];if(Array.isArray(P)&&!(1>P.length)){var O=P[0];if(O!="noop"&&O!="stop"&&O!="close")for(var $=1;$<P.length;$++)P[$]=""}}}}return Sn(d)}catch{return c}}var qi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},yr={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},to;function Hi(){}b(Hi,Jt),Hi.prototype.g=function(){return new XMLHttpRequest},Hi.prototype.i=function(){return{}},to=new Hi;function kn(a,c,d,p){this.j=a,this.i=c,this.l=d,this.R=p||1,this.U=new In(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new no}function no(){this.i=null,this.g="",this.h=!1}var za={},ui={};function ci(a,c,d){a.L=1,a.v=Ha($n(c)),a.m=d,a.P=!0,ro(a,null)}function ro(a,c){a.F=Date.now(),hi(a),a.A=$n(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),kp(d.i,"t",p),a.C=0,d=a.j.J,a.h=new no,a.g=$p(a.j,d?c:null,!a.m),0<a.O&&(a.M=new Ic(v(a.Y,a,a.g),a.O)),c=a.U,d=a.g,p=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(ai[0]=P.toString()),P=ai);for(var O=0;O<P.length;O++){var $=Ui(d,P[O],p||c.handleEvent,!1,c.h||c);if(!$)break;c.g[$.key]=$}c=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),mr(),ja(a.i,a.u,a.A,a.l,a.R,a.m)}kn.prototype.ca=function(a){a=a.target;const c=this.M;c&&Wn(a)==3?c.j():this.Y(a)},kn.prototype.Y=function(a){try{if(a==this.g)e:{const pt=Wn(this.g);var c=this.g.Ba();const Qi=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Np(this.g)))){this.J||pt!=4||c==7||(c==8||0>=Qi?mr(3):mr(2)),j(this);var d=this.g.Z();this.X=d;t:if(io(this)){var p=Np(this.g);a="";var P=p.length,O=Wn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){B(this),W(this);var $="";break t}this.h.i=new l.TextDecoder}for(c=0;c<P;c++)this.h.h=!0,a+=this.h.i.decode(p[c],{stream:!(O&&c==P-1)});p.length=0,this.h.g+=a,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=d==200,Fa(this.i,this.u,this.A,this.l,this.R,pt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Te,rt=this.g;if((Te=rt.g?rt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(Te)){var pe=Te;break t}}pe=null}if(d=pe)un(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,H(this,d);else{this.o=!1,this.s=3,nt(12),B(this),W(this);break e}}if(this.P){d=!0;let cn;for(;!this.J&&this.C<$.length;)if(cn=Ba(this,$),cn==ui){pt==4&&(this.s=4,nt(14),d=!1),un(this.i,this.l,null,"[Incomplete Response]");break}else if(cn==za){this.s=4,nt(15),un(this.i,this.l,$,"[Invalid Chunk]"),d=!1;break}else un(this.i,this.l,cn,null),H(this,cn);if(io(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||$.length!=0||this.h.h||(this.s=1,nt(16),d=!1),this.o=this.o&&d,!d)un(this.i,this.l,$,"[Invalid Chunked Response]"),B(this),W(this);else if(0<$.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Rc(ft),ft.M=!0,nt(11))}}else un(this.i,this.l,$,null),H(this,$);pt==4&&B(this),this.o&&!this.J&&(pt==4?Fp(this.j,this):(this.o=!1,hi(this)))}else PE(this.g),d==400&&0<$.indexOf("Unknown SID")?(this.s=3,nt(12)):(this.s=0,nt(13)),B(this),W(this)}}}catch{}finally{}};function io(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Ba(a,c){var d=a.C,p=c.indexOf(`
`,d);return p==-1?ui:(d=Number(c.substring(d,p)),isNaN(d)?za:(p+=1,p+d>c.length?ui:(c=c.slice(p,p+d),a.C=p+d,c)))}kn.prototype.cancel=function(){this.J=!0,B(this)};function hi(a){a.S=Date.now()+a.I,E(a,a.I)}function E(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=li(v(a.ba,a),c)}function j(a){a.B&&(l.clearTimeout(a.B),a.B=null)}kn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ua(this.i,this.A),this.L!=2&&(mr(),nt(17)),B(this),this.s=2,W(this)):E(this,this.S-a)};function W(a){a.j.G==0||a.J||Fp(a.j,a)}function B(a){j(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,Oa(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function H(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||fe(d.h,a))){if(!a.K&&fe(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var P=p;if(P[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ja(d),Xa(d);else break e;Ac(d),nt(18)}}else d.za=P[1],0<d.za-d.T&&37500>P[2]&&d.F&&d.v==0&&!d.C&&(d.C=li(v(d.Za,d),6e3));if(1>=Ne(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else fi(d,11)}else if((a.K||d.g==a)&&Ja(d),!T(c))for(P=d.Da.g.parse(c),c=0;c<P.length;c++){let pe=P[c];if(d.T=pe[0],pe=pe[1],d.G==2)if(pe[0]=="c"){d.K=pe[1],d.ia=pe[2];const ft=pe[3];ft!=null&&(d.la=ft,d.j.info("VER="+d.la));const pt=pe[4];pt!=null&&(d.Aa=pt,d.j.info("SVER="+d.Aa));const Qi=pe[5];Qi!=null&&typeof Qi=="number"&&0<Qi&&(p=1.5*Qi,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const cn=a.g;if(cn){const el=cn.g?cn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(el){var O=p.h;O.g||el.indexOf("spdy")==-1&&el.indexOf("quic")==-1&&el.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(Ue(O,O.h),O.h=null))}if(p.D){const xc=cn.g?cn.g.getResponseHeader("X-HTTP-Session-Id"):null;xc&&(p.ya=xc,Re(p.I,p.D,xc))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var $=a;if(p.qa=Bp(p,p.J?p.ia:null,p.W),$.K){kt(p.h,$);var Te=$,rt=p.L;rt&&(Te.I=rt),Te.B&&(j(Te),hi(Te)),p.g=$}else Lp(p);0<d.i.length&&Ya(d)}else pe[0]!="stop"&&pe[0]!="close"||fi(d,7);else d.G==3&&(pe[0]=="stop"||pe[0]=="close"?pe[0]=="stop"?fi(d,7):kc(d):pe[0]!="noop"&&d.l&&d.l.ta(pe),d.v=0)}}mr(4)}catch{}}var Y=class{constructor(a,c){this.g=a,this.map=c}};function te(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ae(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ne(a){return a.h?1:a.g?a.g.size:0}function fe(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function Ue(a,c){a.g?a.g.add(c):a.h=c}function kt(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}te.prototype.cancel=function(){if(this.i=$a(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function $a(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return N(a.i)}function mE(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,p=0;p<d;p++)c.push(a[p]);return c}c=[],d=0;for(p in a)c[d++]=a[p];return c}function gE(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const p in a)c[d++]=p;return c}}}function _p(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=gE(a),p=mE(a),P=p.length,O=0;O<P;O++)c.call(void 0,p[O],d&&d[O],a)}var wp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function yE(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),P=null;if(0<=p){var O=a[d].substring(0,p);P=a[d].substring(p+1)}else O=a[d];c(O,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function di(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof di){this.h=a.h,Wa(this,a.j),this.o=a.o,this.g=a.g,qa(this,a.s),this.l=a.l;var c=a.i,d=new ao;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Ep(this,d),this.m=a.m}else a&&(c=String(a).match(wp))?(this.h=!1,Wa(this,c[1]||"",!0),this.o=so(c[2]||""),this.g=so(c[3]||"",!0),qa(this,c[4]),this.l=so(c[5]||"",!0),Ep(this,c[6]||"",!0),this.m=so(c[7]||"")):(this.h=!1,this.i=new ao(null,this.h))}di.prototype.toString=function(){var a=[],c=this.j;c&&a.push(oo(c,Tp,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(oo(c,Tp,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(oo(d,d.charAt(0)=="/"?wE:_E,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",oo(d,TE)),a.join("")};function $n(a){return new di(a)}function Wa(a,c,d){a.j=d?so(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function qa(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function Ep(a,c,d){c instanceof ao?(a.i=c,IE(a.i,a.h)):(d||(c=oo(c,EE)),a.i=new ao(c,a.h))}function Re(a,c,d){a.i.set(c,d)}function Ha(a){return Re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function so(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function oo(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,vE),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function vE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Tp=/[#\/\?@]/g,_E=/[#\?:]/g,wE=/[#\?]/g,EE=/[#\?@]/g,TE=/#/g;function ao(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function vr(a){a.g||(a.g=new Map,a.h=0,a.i&&yE(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=ao.prototype,t.add=function(a,c){vr(this),this.i=null,a=Ki(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function Ip(a,c){vr(a),c=Ki(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Sp(a,c){return vr(a),c=Ki(a,c),a.g.has(c)}t.forEach=function(a,c){vr(this),this.g.forEach(function(d,p){d.forEach(function(P){a.call(c,P,p,this)},this)},this)},t.na=function(){vr(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let p=0;p<c.length;p++){const P=a[p];for(let O=0;O<P.length;O++)d.push(c[p])}return d},t.V=function(a){vr(this);let c=[];if(typeof a=="string")Sp(this,a)&&(c=c.concat(this.g.get(Ki(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return vr(this),this.i=null,a=Ki(this,a),Sp(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function kp(a,c,d){Ip(a,c),0<d.length&&(a.i=null,a.g.set(Ki(a,c),N(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var p=c[d];const O=encodeURIComponent(String(p)),$=this.V(p);for(p=0;p<$.length;p++){var P=O;$[p]!==""&&(P+="="+encodeURIComponent(String($[p]))),a.push(P)}}return this.i=a.join("&")};function Ki(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function IE(a,c){c&&!a.j&&(vr(a),a.i=null,a.g.forEach(function(d,p){var P=p.toLowerCase();p!=P&&(Ip(this,p),kp(this,P,d))},a)),a.j=c}function SE(a,c){const d=new gr;if(l.Image){const p=new Image;p.onload=R(_r,d,"TestLoadImage: loaded",!0,c,p),p.onerror=R(_r,d,"TestLoadImage: error",!1,c,p),p.onabort=R(_r,d,"TestLoadImage: abort",!1,c,p),p.ontimeout=R(_r,d,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else c(!1)}function kE(a,c){const d=new gr,p=new AbortController,P=setTimeout(()=>{p.abort(),_r(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:p.signal}).then(O=>{clearTimeout(P),O.ok?_r(d,"TestPingServer: ok",!0,c):_r(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(P),_r(d,"TestPingServer: error",!1,c)})}function _r(a,c,d,p,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),p(d)}catch{}}function AE(){this.g=new fr}function RE(a,c,d){const p=d||"";try{_p(a,function(P,O){let $=P;h(P)&&($=Sn(P)),c.push(p+O+"="+encodeURIComponent($))})}catch(P){throw c.push(p+"type="+encodeURIComponent("_badmap")),P}}function Ka(a){this.l=a.Ub||null,this.j=a.eb||!1}b(Ka,Jt),Ka.prototype.g=function(){return new Ga(this.l,this.j)},Ka.prototype.i=function(a){return function(){return a}}({});function Ga(a,c){je.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Ga,je),t=Ga.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,uo(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,lo(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,uo(this)),this.g&&(this.readyState=3,uo(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ap(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ap(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?lo(this):uo(this),this.readyState==3&&Ap(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,lo(this))},t.Qa=function(a){this.g&&(this.response=a,lo(this))},t.ga=function(){this.g&&lo(this)};function lo(a){a.readyState=4,a.l=null,a.j=null,a.v=null,uo(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function uo(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ga.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Rp(a){let c="";return z(a,function(d,p){c+=p,c+=":",c+=d,c+=`\r
`}),c}function Sc(a,c,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Rp(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):Re(a,c,d))}function ze(a){je.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(ze,je);var xE=/^https?$/i,CE=["POST","PUT"];t=ze.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():to.g(),this.v=this.o?bt(this.o):bt(to),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(O){xp(this,O);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var P in p)d.set(P,p[P]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const O of p.keys())d.set(O,p.get(O));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(O=>O.toLowerCase()=="content-type"),P=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(CE,c,void 0))||p||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,$]of d)this.g.setRequestHeader(O,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{bp(this),this.u=!0,this.g.send(a),this.u=!1}catch(O){xp(this,O)}};function xp(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Cp(a),Qa(a)}function Cp(a){a.A||(a.A=!0,Fe(a,"complete"),Fe(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Fe(this,"complete"),Fe(this,"abort"),Qa(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qa(this,!0)),ze.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Pp(this):this.bb())},t.bb=function(){Pp(this)};function Pp(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Wn(a)!=4||a.Z()!=2)){if(a.u&&Wn(a)==4)Da(a.Ea,0,a);else if(Fe(a,"readystatechange"),Wn(a)==4){a.h=!1;try{const $=a.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var p;if(p=$===0){var P=String(a.D).match(wp)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),p=!xE.test(P?P.toLowerCase():"")}d=p}if(d)Fe(a,"complete"),Fe(a,"success");else{a.m=6;try{var O=2<Wn(a)?a.g.statusText:""}catch{O=""}a.l=O+" ["+a.Z()+"]",Cp(a)}}finally{Qa(a)}}}}function Qa(a,c){if(a.g){bp(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||Fe(a,"ready");try{d.onreadystatechange=p}catch{}}}function bp(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Wn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Wn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),dr(c)}};function Np(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function PE(a){const c={};a=(a.g&&2<=Wn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(T(a[p]))continue;var d=x(a[p]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const O=c[P]||[];c[P]=O,O.push(d)}_(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function co(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function Dp(a){this.Aa=0,this.i=[],this.j=new gr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=co("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=co("baseRetryDelayMs",5e3,a),this.cb=co("retryDelaySeedMs",1e4,a),this.Wa=co("forwardChannelMaxRetries",2,a),this.wa=co("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new te(a&&a.concurrentRequestLimit),this.Da=new AE,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Dp.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,p){nt(0),this.W=a,this.H=c||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Bp(this,null,this.W),Ya(this)};function kc(a){if(Op(a),a.G==3){var c=a.U++,d=$n(a.I);if(Re(d,"SID",a.K),Re(d,"RID",c),Re(d,"TYPE","terminate"),ho(a,d),c=new kn(a,a.j,c),c.L=2,c.v=Ha($n(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=$p(c.j,null),c.g.ea(c.v)),c.F=Date.now(),hi(c)}zp(a)}function Xa(a){a.g&&(Rc(a),a.g.cancel(),a.g=null)}function Op(a){Xa(a),a.u&&(l.clearTimeout(a.u),a.u=null),Ja(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ya(a){if(!Ae(a.h)&&!a.s){a.s=!0;var c=a.Ga;Ft||Z(),q||(Ft(),q=!0),ee.add(c,a),a.B=0}}function bE(a,c){return Ne(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=li(v(a.Ga,a,c),Up(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new kn(this,this.j,a);let O=this.o;if(this.S&&(O?(O=y(O),S(O,this.S)):O=this.S),this.m!==null||this.O||(P.H=O,O=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Mp(this,P,c),d=$n(this.I),Re(d,"RID",a),Re(d,"CVER",22),this.D&&Re(d,"X-HTTP-Session-Id",this.D),ho(this,d),O&&(this.O?c="headers="+encodeURIComponent(String(Rp(O)))+"&"+c:this.m&&Sc(d,this.m,O)),Ue(this.h,P),this.Ua&&Re(d,"TYPE","init"),this.P?(Re(d,"$req",c),Re(d,"SID","null"),P.T=!0,ci(P,d,null)):ci(P,d,c),this.G=2}}else this.G==3&&(a?Vp(this,a):this.i.length==0||Ae(this.h)||Vp(this))};function Vp(a,c){var d;c?d=c.l:d=a.U++;const p=$n(a.I);Re(p,"SID",a.K),Re(p,"RID",d),Re(p,"AID",a.T),ho(a,p),a.m&&a.o&&Sc(p,a.m,a.o),d=new kn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=Mp(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ue(a.h,d),ci(d,p,c)}function ho(a,c){a.H&&z(a.H,function(d,p){Re(c,p,d)}),a.l&&_p({},function(d,p){Re(c,p,d)})}function Mp(a,c,d){d=Math.min(a.i.length,d);var p=a.l?v(a.l.Na,a.l,a):null;e:{var P=a.i;let O=-1;for(;;){const $=["count="+d];O==-1?0<d?(O=P[0].g,$.push("ofs="+O)):O=0:$.push("ofs="+O);let Te=!0;for(let rt=0;rt<d;rt++){let pe=P[rt].g;const ft=P[rt].map;if(pe-=O,0>pe)O=Math.max(0,P[rt].g-100),Te=!1;else try{RE(ft,$,"req"+pe+"_")}catch{p&&p(ft)}}if(Te){p=$.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,p}function Lp(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;Ft||Z(),q||(Ft(),q=!0),ee.add(c,a),a.v=0}}function Ac(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=li(v(a.Fa,a),Up(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,jp(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=li(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,nt(10),Xa(this),jp(this))};function Rc(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function jp(a){a.g=new kn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=$n(a.qa);Re(c,"RID","rpc"),Re(c,"SID",a.K),Re(c,"AID",a.T),Re(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&Re(c,"TO",a.ja),Re(c,"TYPE","xmlhttp"),ho(a,c),a.m&&a.o&&Sc(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Ha($n(c)),d.m=null,d.P=!0,ro(d,a)}t.Za=function(){this.C!=null&&(this.C=null,Xa(this),Ac(this),nt(19))};function Ja(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Fp(a,c){var d=null;if(a.g==c){Ja(a),Rc(a),a.g=null;var p=2}else if(fe(a.h,c))d=c.D,kt(a.h,c),p=1;else return;if(a.G!=0){if(c.o)if(p==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var P=a.B;p=Wi(),Fe(p,new La(p,d)),Ya(a)}else Lp(a);else if(P=c.s,P==3||P==0&&0<c.X||!(p==1&&bE(a,c)||p==2&&Ac(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),P){case 1:fi(a,5);break;case 4:fi(a,10);break;case 3:fi(a,6);break;default:fi(a,2)}}}function Up(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function fi(a,c){if(a.j.info("Error code "+c),c==2){var d=v(a.fb,a),p=a.Xa;const P=!p;p=new di(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Wa(p,"https"),Ha(p),P?SE(p.toString(),d):kE(p.toString(),d)}else nt(2);a.G=0,a.l&&a.l.sa(c),zp(a),Op(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),nt(2)):(this.j.info("Failed to ping google.com"),nt(1))};function zp(a){if(a.G=0,a.ka=[],a.l){const c=$a(a.h);(c.length!=0||a.i.length!=0)&&(V(a.ka,c),V(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function Bp(a,c,d){var p=d instanceof di?$n(d):new di(d);if(p.g!="")c&&(p.g=c+"."+p.g),qa(p,p.s);else{var P=l.location;p=P.protocol,c=c?c+"."+P.hostname:P.hostname,P=+P.port;var O=new di(null);p&&Wa(O,p),c&&(O.g=c),P&&qa(O,P),d&&(O.l=d),p=O}return d=a.D,c=a.ya,d&&c&&Re(p,d,c),Re(p,"VER",a.la),ho(a,p),p}function $p(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new ze(new Ka({eb:d})):new ze(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Wp(){}t=Wp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Za(){}Za.prototype.g=function(a,c){return new zt(a,c)};function zt(a,c){je.call(this),this.g=new Dp(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!T(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!T(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new Gi(this)}b(zt,je),zt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){kc(this.g)},zt.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Sn(a),a=d);c.i.push(new Y(c.Ya++,a)),c.G==3&&Ya(c)},zt.prototype.N=function(){this.g.l=null,delete this.j,kc(this.g),delete this.g,zt.aa.N.call(this)};function qp(a){$i.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}b(qp,$i);function Hp(){Js.call(this),this.status=1}b(Hp,Js);function Gi(a){this.g=a}b(Gi,Wp),Gi.prototype.ua=function(){Fe(this.g,"a")},Gi.prototype.ta=function(a){Fe(this.g,new qp(a))},Gi.prototype.sa=function(a){Fe(this.g,new Hp)},Gi.prototype.ra=function(){Fe(this.g,"b")},Za.prototype.createWebChannel=Za.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,K0=function(){return new Za},H0=function(){return Wi()},q0=Bn,gd={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qi.NO_ERROR=0,qi.TIMEOUT=8,qi.HTTP_ERROR=6,$l=qi,yr.COMPLETE="complete",W0=yr,Ut.EventType=pr,pr.OPEN="a",pr.CLOSE="b",pr.ERROR="c",pr.MESSAGE="d",je.prototype.listen=je.prototype.K,Ao=Ut,ze.prototype.listenOnce=ze.prototype.L,ze.prototype.getLastError=ze.prototype.Ka,ze.prototype.getLastErrorCode=ze.prototype.Ba,ze.prototype.getStatus=ze.prototype.Z,ze.prototype.getResponseJson=ze.prototype.Oa,ze.prototype.getResponseText=ze.prototype.oa,ze.prototype.send=ze.prototype.ea,ze.prototype.setWithCredentials=ze.prototype.Ha,$0=ze}).apply(typeof _l<"u"?_l:typeof self<"u"?self:typeof window<"u"?window:{});const bg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ws="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=new xf("@firebase/firestore");function Eo(){return bi.logLevel}function X(t,...e){if(bi.logLevel<=ue.DEBUG){const n=e.map(Ff);bi.debug(`Firestore (${Ws}): ${t}`,...n)}}function ar(t,...e){if(bi.logLevel<=ue.ERROR){const n=e.map(Ff);bi.error(`Firestore (${Ws}): ${t}`,...n)}}function Ns(t,...e){if(bi.logLevel<=ue.WARN){const n=e.map(Ff);bi.warn(`Firestore (${Ws}): ${t}`,...n)}}function Ff(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(t="Unexpected state"){const e=`FIRESTORE (${Ws}) INTERNAL ASSERTION FAILED: `+t;throw ar(e),new Error(e)}function we(t,e){t||re()}function se(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class G extends jn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class j2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(vt.UNAUTHENTICATED))}shutdown(){}}class F2{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class U2{constructor(e){this.t=e,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){we(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new qr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new qr,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new qr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(we(typeof r.accessToken=="string"),new G0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return we(e===null||typeof e=="string"),new vt(e)}}class z2{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class B2{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new z2(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $2{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class W2{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){we(this.o===void 0);const r=s=>{s.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,X("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(we(typeof n.token=="string"),this.R=n.token,new $2(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q2(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=q2(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function me(t,e){return t<e?-1:t>e?1:0}function Ds(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new G(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new G(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new G(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new G(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ye.fromMillis(Date.now())}static fromDate(e){return Ye.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ye(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?me(this.nanoseconds,e.nanoseconds):me(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ie(e)}static min(){return new ie(new Ye(0,0))}static max(){return new ie(new Ye(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,n,r){n===void 0?n=0:n>e.length&&re(),r===void 0?r=e.length-n:r>e.length-n&&re(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return ha.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ha?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ce extends ha{construct(e,n,r){return new Ce(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new G(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new Ce(n)}static emptyPath(){return new Ce([])}}const H2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends ha{construct(e,n,r){return new at(e,n,r)}static isValidIdentifier(e){return H2.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new at(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new G(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new G(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new G(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new G(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new at(n)}static emptyPath(){return new at([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(Ce.fromString(e))}static fromName(e){return new J(Ce.fromString(e).popFirst(5))}static empty(){return new J(Ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ce.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new Ce(e.slice()))}}function K2(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=ie.fromTimestamp(r===1e9?new Ye(n+1,0):new Ye(n,r));return new Yr(i,J.empty(),e)}function G2(t){return new Yr(t.readTime,t.key,-1)}class Yr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Yr(ie.min(),J.empty(),-1)}static max(){return new Yr(ie.max(),J.empty(),-1)}}function Q2(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=J.comparator(t.documentKey,e.documentKey),n!==0?n:me(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Y2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Aa(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==X2)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&re(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(i=>i?L.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new L((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{o[h]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new L((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function J2(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ra(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Uf.oe=-1;function rc(t){return t==null}function Su(t){return t===0&&1/t==-1/0}function Z2(t){return typeof t=="number"&&Number.isInteger(t)&&!Su(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Li(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function X0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,n){this.comparator=e,this.root=n||ot.EMPTY}insert(e,n){return new Le(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ot.BLACK,null,null))}remove(e){return new Le(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ot.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new wl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new wl(this.root,e,this.comparator,!1)}getReverseIterator(){return new wl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new wl(this.root,e,this.comparator,!0)}}class wl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ot{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??ot.RED,this.left=i??ot.EMPTY,this.right=s??ot.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new ot(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ot.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return ot.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ot.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ot.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw re();const e=this.left.check();if(e!==this.right.check())throw re();return e+(this.isRed()?0:1)}}ot.EMPTY=null,ot.RED=!0,ot.BLACK=!1;ot.EMPTY=new class{constructor(){this.size=0}get key(){throw re()}get value(){throw re()}get color(){throw re()}get left(){throw re()}get right(){throw re()}copy(e,n,r,i,s){return this}insert(e,n,r){return new ot(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.comparator=e,this.data=new Le(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Dg(this.data.getIterator())}getIteratorFrom(e){return new Dg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ut)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ut(this.comparator);return n.data=e,n}}class Dg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.fields=e,e.sort(at.comparator)}static empty(){return new Wt([])}unionWith(e){let n=new ut(at.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Wt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Ds(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Y0("Invalid base64 string: "+s):s}}(e);return new ht(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new ht(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return me(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const eA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Jr(t){if(we(!!t),typeof t=="string"){let e=0;const n=eA.exec(t);if(we(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(t.seconds),nanos:We(t.nanos)}}function We(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ni(t){return typeof t=="string"?ht.fromBase64String(t):ht.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Bf(t){const e=t.mapValue.fields.__previous_value__;return zf(e)?Bf(e):e}function da(t){const e=Jr(t.mapValue.fields.__local_write_time__.timestampValue);return new Ye(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e,n,r,i,s,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class fa{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new fa("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof fa&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El={mapValue:{}};function Di(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?zf(t)?4:rA(t)?9007199254740991:nA(t)?10:11:re()}function Mn(t,e){if(t===e)return!0;const n=Di(t);if(n!==Di(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return da(t).isEqual(da(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Jr(i.timestampValue),l=Jr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Ni(i.bytesValue).isEqual(Ni(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return We(i.geoPointValue.latitude)===We(s.geoPointValue.latitude)&&We(i.geoPointValue.longitude)===We(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return We(i.integerValue)===We(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=We(i.doubleValue),l=We(s.doubleValue);return o===l?Su(o)===Su(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Ds(t.arrayValue.values||[],e.arrayValue.values||[],Mn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Ng(o)!==Ng(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Mn(o[u],l[u])))return!1;return!0}(t,e);default:return re()}}function pa(t,e){return(t.values||[]).find(n=>Mn(n,e))!==void 0}function Os(t,e){if(t===e)return 0;const n=Di(t),r=Di(e);if(n!==r)return me(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return me(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=We(s.integerValue||s.doubleValue),u=We(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Og(t.timestampValue,e.timestampValue);case 4:return Og(da(t),da(e));case 5:return me(t.stringValue,e.stringValue);case 6:return function(s,o){const l=Ni(s),u=Ni(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=me(l[h],u[h]);if(f!==0)return f}return me(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=me(We(s.latitude),We(o.latitude));return l!==0?l:me(We(s.longitude),We(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Vg(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,h,f;const g=s.fields||{},v=o.fields||{},R=(l=g.value)===null||l===void 0?void 0:l.arrayValue,b=(u=v.value)===null||u===void 0?void 0:u.arrayValue,N=me(((h=R==null?void 0:R.values)===null||h===void 0?void 0:h.length)||0,((f=b==null?void 0:b.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Vg(R,b)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===El.mapValue&&o===El.mapValue)return 0;if(s===El.mapValue)return 1;if(o===El.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let g=0;g<u.length&&g<f.length;++g){const v=me(u[g],f[g]);if(v!==0)return v;const R=Os(l[u[g]],h[f[g]]);if(R!==0)return R}return me(u.length,f.length)}(t.mapValue,e.mapValue);default:throw re()}}function Og(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return me(t,e);const n=Jr(t),r=Jr(e),i=me(n.seconds,r.seconds);return i!==0?i:me(n.nanos,r.nanos)}function Vg(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Os(n[i],r[i]);if(s)return s}return me(n.length,r.length)}function Vs(t){return yd(t)}function yd(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Jr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Ni(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return J.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=yd(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${yd(n.fields[o])}`;return i+"}"}(t.mapValue):re()}function Mg(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function vd(t){return!!t&&"integerValue"in t}function $f(t){return!!t&&"arrayValue"in t}function Lg(t){return!!t&&"nullValue"in t}function jg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Wl(t){return!!t&&"mapValue"in t}function nA(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Uo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Li(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Uo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Uo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function rA(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Wl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Uo(n)}setAll(e){let n=at.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Uo(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Wl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Mn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Wl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Li(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Dt(Uo(this.value))}}function J0(t){const e=[];return Li(t.fields,(n,r)=>{const i=new at([n]);if(Wl(r)){const s=J0(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Wt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new wt(e,0,ie.min(),ie.min(),ie.min(),Dt.empty(),0)}static newFoundDocument(e,n,r,i){return new wt(e,1,n,ie.min(),r,i,0)}static newNoDocument(e,n){return new wt(e,2,n,ie.min(),ie.min(),Dt.empty(),0)}static newUnknownDocument(e,n){return new wt(e,3,n,ie.min(),ie.min(),Dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof wt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new wt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,n){this.position=e,this.inclusive=n}}function Fg(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),n.key):r=Os(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ug(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Mn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e,n="asc"){this.field=e,this.dir=n}}function iA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{}class Ge extends Z0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new oA(e,n,r):n==="array-contains"?new uA(e,r):n==="in"?new cA(e,r):n==="not-in"?new hA(e,r):n==="array-contains-any"?new dA(e,r):new Ge(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new aA(e,r):new lA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Os(n,this.value)):n!==null&&Di(this.value)===Di(n)&&this.matchesComparison(Os(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class _n extends Z0{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new _n(e,n)}matches(e){return ew(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ew(t){return t.op==="and"}function tw(t){return sA(t)&&ew(t)}function sA(t){for(const e of t.filters)if(e instanceof _n)return!1;return!0}function _d(t){if(t instanceof Ge)return t.field.canonicalString()+t.op.toString()+Vs(t.value);if(tw(t))return t.filters.map(e=>_d(e)).join(",");{const e=t.filters.map(n=>_d(n)).join(",");return`${t.op}(${e})`}}function nw(t,e){return t instanceof Ge?function(r,i){return i instanceof Ge&&r.op===i.op&&r.field.isEqual(i.field)&&Mn(r.value,i.value)}(t,e):t instanceof _n?function(r,i){return i instanceof _n&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&nw(o,i.filters[l]),!0):!1}(t,e):void re()}function rw(t){return t instanceof Ge?function(n){return`${n.field.canonicalString()} ${n.op} ${Vs(n.value)}`}(t):t instanceof _n?function(n){return n.op.toString()+" {"+n.getFilters().map(rw).join(" ,")+"}"}(t):"Filter"}class oA extends Ge{constructor(e,n,r){super(e,n,r),this.key=J.fromName(r.referenceValue)}matches(e){const n=J.comparator(e.key,this.key);return this.matchesComparison(n)}}class aA extends Ge{constructor(e,n){super(e,"in",n),this.keys=iw("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class lA extends Ge{constructor(e,n){super(e,"not-in",n),this.keys=iw("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function iw(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>J.fromName(r.referenceValue))}class uA extends Ge{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return $f(n)&&pa(n.arrayValue,this.value)}}class cA extends Ge{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&pa(this.value.arrayValue,n)}}class hA extends Ge{constructor(e,n){super(e,"not-in",n)}matches(e){if(pa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!pa(this.value.arrayValue,n)}}class dA extends Ge{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!$f(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>pa(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.ue=null}}function zg(t,e=null,n=[],r=[],i=null,s=null,o=null){return new fA(t,e,n,r,i,s,o)}function Wf(t){const e=se(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>_d(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),rc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Vs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Vs(r)).join(",")),e.ue=n}return e.ue}function qf(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!iA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!nw(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ug(t.startAt,e.startAt)&&Ug(t.endAt,e.endAt)}function wd(t){return J.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function pA(t,e,n,r,i,s,o,l){return new xa(t,e,n,r,i,s,o,l)}function ic(t){return new xa(t)}function Bg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function sw(t){return t.collectionGroup!==null}function zo(t){const e=se(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ut(at.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Au(s,r))}),n.has(at.keyField().canonicalString())||e.ce.push(new Au(at.keyField(),r))}return e.ce}function On(t){const e=se(t);return e.le||(e.le=mA(e,zo(t))),e.le}function mA(t,e){if(t.limitType==="F")return zg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Au(i.field,s)});const n=t.endAt?new ku(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ku(t.startAt.position,t.startAt.inclusive):null;return zg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ed(t,e){const n=t.filters.concat([e]);return new xa(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Td(t,e,n){return new xa(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function sc(t,e){return qf(On(t),On(e))&&t.limitType===e.limitType}function ow(t){return`${Wf(On(t))}|lt:${t.limitType}`}function Zi(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>rw(i)).join(", ")}]`),rc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Vs(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Vs(i)).join(",")),`Target(${r})`}(On(t))}; limitType=${t.limitType})`}function oc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):J.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of zo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const h=Fg(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,zo(r),i)||r.endAt&&!function(o,l,u){const h=Fg(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,zo(r),i))}(t,e)}function gA(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function aw(t){return(e,n)=>{let r=!1;for(const i of zo(t)){const s=yA(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function yA(t,e,n){const r=t.field.isKeyField()?J.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),h=l.data.field(s);return u!==null&&h!==null?Os(u,h):re()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return re()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Li(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return X0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA=new Le(J.comparator);function lr(){return vA}const lw=new Le(J.comparator);function Ro(...t){let e=lw;for(const n of t)e=e.insert(n.key,n);return e}function uw(t){let e=lw;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function wi(){return Bo()}function cw(){return Bo()}function Bo(){return new qs(t=>t.toString(),(t,e)=>t.isEqual(e))}const _A=new Le(J.comparator),wA=new ut(J.comparator);function le(...t){let e=wA;for(const n of t)e=e.add(n);return e}const EA=new ut(me);function TA(){return EA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Su(e)?"-0":e}}function hw(t){return{integerValue:""+t}}function IA(t,e){return Z2(e)?hw(e):Hf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this._=void 0}}function SA(t,e,n){return t instanceof Ru?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&zf(s)&&(s=Bf(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof Ms?fw(t,e):t instanceof ma?pw(t,e):function(i,s){const o=dw(i,s),l=$g(o)+$g(i.Pe);return vd(o)&&vd(i.Pe)?hw(l):Hf(i.serializer,l)}(t,e)}function kA(t,e,n){return t instanceof Ms?fw(t,e):t instanceof ma?pw(t,e):n}function dw(t,e){return t instanceof xu?function(r){return vd(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ru extends ac{}class Ms extends ac{constructor(e){super(),this.elements=e}}function fw(t,e){const n=mw(e);for(const r of t.elements)n.some(i=>Mn(i,r))||n.push(r);return{arrayValue:{values:n}}}class ma extends ac{constructor(e){super(),this.elements=e}}function pw(t,e){let n=mw(e);for(const r of t.elements)n=n.filter(i=>!Mn(i,r));return{arrayValue:{values:n}}}class xu extends ac{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function $g(t){return We(t.integerValue||t.doubleValue)}function mw(t){return $f(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AA{constructor(e,n){this.field=e,this.transform=n}}function RA(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Ms&&i instanceof Ms||r instanceof ma&&i instanceof ma?Ds(r.elements,i.elements,Mn):r instanceof xu&&i instanceof xu?Mn(r.Pe,i.Pe):r instanceof Ru&&i instanceof Ru}(t.transform,e.transform)}class xA{constructor(e,n){this.version=e,this.transformResults=n}}class sn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new sn}static exists(e){return new sn(void 0,e)}static updateTime(e){return new sn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ql(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class lc{}function gw(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Kf(t.key,sn.none()):new Ca(t.key,t.data,sn.none());{const n=t.data,r=Dt.empty();let i=new ut(at.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new ii(t.key,r,new Wt(i.toArray()),sn.none())}}function CA(t,e,n){t instanceof Ca?function(i,s,o){const l=i.value.clone(),u=qg(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof ii?function(i,s,o){if(!ql(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=qg(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(yw(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function $o(t,e,n,r){return t instanceof Ca?function(s,o,l,u){if(!ql(s.precondition,o))return l;const h=s.value.clone(),f=Hg(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof ii?function(s,o,l,u){if(!ql(s.precondition,o))return l;const h=Hg(s.fieldTransforms,u,o),f=o.data;return f.setAll(yw(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(t,e,n,r):function(s,o,l){return ql(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function PA(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=dw(r.transform,i||null);s!=null&&(n===null&&(n=Dt.empty()),n.set(r.field,s))}return n||null}function Wg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Ds(r,i,(s,o)=>RA(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ca extends lc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ii extends lc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function yw(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function qg(t,e,n){const r=new Map;we(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,kA(o,l,n[i]))}return r}function Hg(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,SA(s,o,e))}return r}class Kf extends lc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bA extends lc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NA{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&CA(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=$o(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=$o(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=cw();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=gw(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),le())}isEqual(e){return this.batchId===e.batchId&&Ds(this.mutations,e.mutations,(n,r)=>Wg(n,r))&&Ds(this.baseMutations,e.baseMutations,(n,r)=>Wg(n,r))}}class Gf{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){we(e.mutations.length===r.length);let i=function(){return _A}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Gf(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var He,ce;function VA(t){switch(t){default:return re();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function vw(t){if(t===void 0)return ar("GRPC error has no .code"),M.UNKNOWN;switch(t){case He.OK:return M.OK;case He.CANCELLED:return M.CANCELLED;case He.UNKNOWN:return M.UNKNOWN;case He.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case He.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case He.INTERNAL:return M.INTERNAL;case He.UNAVAILABLE:return M.UNAVAILABLE;case He.UNAUTHENTICATED:return M.UNAUTHENTICATED;case He.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case He.NOT_FOUND:return M.NOT_FOUND;case He.ALREADY_EXISTS:return M.ALREADY_EXISTS;case He.PERMISSION_DENIED:return M.PERMISSION_DENIED;case He.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case He.ABORTED:return M.ABORTED;case He.OUT_OF_RANGE:return M.OUT_OF_RANGE;case He.UNIMPLEMENTED:return M.UNIMPLEMENTED;case He.DATA_LOSS:return M.DATA_LOSS;default:return re()}}(ce=He||(He={}))[ce.OK=0]="OK",ce[ce.CANCELLED=1]="CANCELLED",ce[ce.UNKNOWN=2]="UNKNOWN",ce[ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ce[ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ce[ce.NOT_FOUND=5]="NOT_FOUND",ce[ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",ce[ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",ce[ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",ce[ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ce[ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ce[ce.ABORTED=10]="ABORTED",ce[ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",ce[ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",ce[ce.INTERNAL=13]="INTERNAL",ce[ce.UNAVAILABLE=14]="UNAVAILABLE",ce[ce.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=new Ii([4294967295,4294967295],0);function Kg(t){const e=MA().encode(t),n=new B0;return n.update(e),new Uint8Array(n.digest())}function Gg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ii([n,r],0),new Ii([i,s],0)]}class Qf{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new xo(`Invalid padding: ${n}`);if(r<0)throw new xo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new xo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new xo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Ii.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(Ii.fromNumber(r)));return i.compare(LA)===1&&(i=new Ii([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Kg(e),[r,i]=Gg(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Qf(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Kg(e),[r,i]=Gg(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class xo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Pa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new uc(ie.min(),i,new Le(me),lr(),le())}}class Pa{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Pa(r,n,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class _w{constructor(e,n){this.targetId=e,this.me=n}}class ww{constructor(e,n,r=ht.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class Qg{constructor(){this.fe=0,this.ge=Yg(),this.pe=ht.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=le(),n=le(),r=le();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:re()}}),new Pa(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Yg()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,we(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class jA{constructor(e){this.Le=e,this.Be=new Map,this.ke=lr(),this.qe=Xg(),this.Qe=new Le(me)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:re()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(wd(s))if(r===0){const o=new J(s.path);this.Ue(n,o,wt.newNoDocument(o,ie.min()))}else we(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=Ni(r).toUint8Array()}catch(u){if(u instanceof Y0)return Ns("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Qf(o,i,s)}catch(u){return Ns(u instanceof xo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const l=this.Je(o);if(l){if(s.current&&wd(l.target)){const u=new J(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,wt.newNoDocument(u,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=le();this.qe.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new uc(e,n,this.Qe,this.ke,r);return this.ke=lr(),this.qe=Xg(),this.Qe=new Le(me),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Qg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ut(me),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Qg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Xg(){return new Le(J.comparator)}function Yg(){return new Le(J.comparator)}const FA={asc:"ASCENDING",desc:"DESCENDING"},UA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zA={and:"AND",or:"OR"};class BA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Id(t,e){return t.useProto3Json||rc(e)?e:{value:e}}function Cu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ew(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function $A(t,e){return Cu(t,e.toTimestamp())}function Vn(t){return we(!!t),ie.fromTimestamp(function(n){const r=Jr(n);return new Ye(r.seconds,r.nanos)}(t))}function Xf(t,e){return Sd(t,e).canonicalString()}function Sd(t,e){const n=function(i){return new Ce(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Tw(t){const e=Ce.fromString(t);return we(Rw(e)),e}function kd(t,e){return Xf(t.databaseId,e.path)}function lh(t,e){const n=Tw(e);if(n.get(1)!==t.databaseId.projectId)throw new G(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new G(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new J(Sw(n))}function Iw(t,e){return Xf(t.databaseId,e)}function WA(t){const e=Tw(t);return e.length===4?Ce.emptyPath():Sw(e)}function Ad(t){return new Ce(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Sw(t){return we(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Jg(t,e,n){return{name:kd(t,e),fields:n.value.mapValue.fields}}function qA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:re()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(we(f===void 0||typeof f=="string"),ht.fromBase64String(f||"")):(we(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ht.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?M.UNKNOWN:vw(h.code);return new G(f,h.message||"")}(o);n=new ww(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=lh(t,r.document.name),s=Vn(r.document.updateTime),o=r.document.createTime?Vn(r.document.createTime):ie.min(),l=new Dt({mapValue:{fields:r.document.fields}}),u=wt.newFoundDocument(i,s,o,l),h=r.targetIds||[],f=r.removedTargetIds||[];n=new Hl(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=lh(t,r.document),s=r.readTime?Vn(r.readTime):ie.min(),o=wt.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Hl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=lh(t,r.document),s=r.removedTargetIds||[];n=new Hl([],s,i,null)}else{if(!("filter"in e))return re();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new OA(i,s),l=r.targetId;n=new _w(l,o)}}return n}function HA(t,e){let n;if(e instanceof Ca)n={update:Jg(t,e.key,e.value)};else if(e instanceof Kf)n={delete:kd(t,e.key)};else if(e instanceof ii)n={update:Jg(t,e.key,e.data),updateMask:tR(e.fieldMask)};else{if(!(e instanceof bA))return re();n={verify:kd(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof Ru)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ms)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ma)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof xu)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw re()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:$A(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:re()}(t,e.precondition)),n}function KA(t,e){return t&&t.length>0?(we(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?Vn(i.updateTime):Vn(s);return o.isEqual(ie.min())&&(o=Vn(s)),new xA(o,i.transformResults||[])}(n,e))):[]}function GA(t,e){return{documents:[Iw(t,e.path)]}}function QA(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Iw(t,i);const s=function(h){if(h.length!==0)return Aw(_n.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(h){if(h.length!==0)return h.map(f=>function(v){return{field:es(v.field),direction:JA(v.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Id(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:i}}function XA(t){let e=WA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){we(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(g){const v=kw(g);return v instanceof _n&&tw(v)?v.getFilters():[v]}(n.where));let o=[];n.orderBy&&(o=function(g){return g.map(v=>function(b){return new Au(ts(b.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(v))}(n.orderBy));let l=null;n.limit&&(l=function(g){let v;return v=typeof g=="object"?g.value:g,rc(v)?null:v}(n.limit));let u=null;n.startAt&&(u=function(g){const v=!!g.before,R=g.values||[];return new ku(R,v)}(n.startAt));let h=null;return n.endAt&&(h=function(g){const v=!g.before,R=g.values||[];return new ku(R,v)}(n.endAt)),pA(e,i,o,s,l,"F",u,h)}function YA(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function kw(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ts(n.unaryFilter.field);return Ge.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ts(n.unaryFilter.field);return Ge.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ts(n.unaryFilter.field);return Ge.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ts(n.unaryFilter.field);return Ge.create(o,"!=",{nullValue:"NULL_VALUE"});default:return re()}}(t):t.fieldFilter!==void 0?function(n){return Ge.create(ts(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return re()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return _n.create(n.compositeFilter.filters.map(r=>kw(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return re()}}(n.compositeFilter.op))}(t):re()}function JA(t){return FA[t]}function ZA(t){return UA[t]}function eR(t){return zA[t]}function es(t){return{fieldPath:t.canonicalString()}}function ts(t){return at.fromServerFormat(t.fieldPath)}function Aw(t){return t instanceof Ge?function(n){if(n.op==="=="){if(jg(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NAN"}};if(Lg(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(jg(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NAN"}};if(Lg(n.value))return{unaryFilter:{field:es(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:es(n.field),op:ZA(n.op),value:n.value}}}(t):t instanceof _n?function(n){const r=n.getFilters().map(i=>Aw(i));return r.length===1?r[0]:{compositeFilter:{op:eR(n.op),filters:r}}}(t):re()}function tR(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Rw(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,n,r,i,s=ie.min(),o=ie.min(),l=ht.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Dr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Dr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(e){this.ct=e}}function rR(t){const e=XA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Td(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{constructor(){this.un=new sR}addToCollectionParentIndex(e,n){return this.un.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(Yr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(Yr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class sR{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new ut(Ce.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ut(Ce.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ls(0)}static kn(){return new Ls(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oR{constructor(){this.changes=new qs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,wt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&$o(r.mutation,i,Wt.empty(),Ye.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,le()).next(()=>r))}getLocalViewOfDocuments(e,n,r=le()){const i=wi();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=Ro();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=wi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,le()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=lr();const o=Bo(),l=function(){return Bo()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof ii)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),$o(f.mutation,h,f.mutation.getFieldMask(),Ye.now())):o.set(h.key,Wt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),n.forEach((h,f)=>{var g;return l.set(h,new aR(f,(g=o.get(h))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,n){const r=Bo();let i=new Le((o,l)=>o-l),s=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||Wt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const g=(i.get(l.batchId)||le()).add(u);i=i.insert(l.batchId,g)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,g=cw();f.forEach(v=>{if(!s.has(v)){const R=gw(n.get(v),r.get(v));R!==null&&g.set(v,R),s=s.add(v)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,g))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return J.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):sw(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):L.resolve(wi());let l=-1,u=s;return o.next(h=>L.forEach(h,(f,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,le())).next(f=>({batchId:l,changes:uw(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new J(n)).next(r=>{let i=Ro();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=Ro();return this.indexManager.getCollectionParents(e,s).next(l=>L.forEach(l,u=>{const h=function(g,v){return new xa(v,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((g,v)=>{o=o.insert(g,v)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,wt.newInvalidDocument(f)))});let l=Ro();return o.forEach((u,h)=>{const f=s.get(u);f!==void 0&&$o(f.mutation,h,Wt.empty(),Ye.now()),oc(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return L.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:Vn(i.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:rR(i.bundledQuery),readTime:Vn(i.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cR{constructor(){this.overlays=new Le(J.comparator),this.Ir=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=wi();return L.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const i=wi(),s=n.length+1,o=new J(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return L.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Le((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=wi(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=wi(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return L.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new DA(n,r));let s=this.Ir.get(n);s===void 0&&(s=le(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(){this.Tr=new ut(Je.Er),this.dr=new ut(Je.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Je(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Je(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new J(new Ce([])),r=new Je(n,e),i=new Je(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new J(new Ce([])),r=new Je(n,e),i=new Je(n,e+1);let s=le();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Je(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Je{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return J.comparator(e.key,n.key)||me(e.wr,n.wr)}static Ar(e,n){return me(e.wr,n.wr)||J.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ut(Je.Er)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new NA(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.br=this.br.add(new Je(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return L.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Je(n,0),i=new Je(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const l=this.Dr(o.wr);s.push(l)}),L.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ut(me);return n.forEach(i=>{const s=new Je(i,0),o=new Je(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],l=>{r=r.add(l.wr)})}),L.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;J.isDocumentKey(s)||(s=s.child(""));const o=new Je(new J(s),0);let l=new ut(me);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.wr)),!0)},o),L.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){we(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return L.forEach(n.mutations,i=>{const s=new Je(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Je(n,0),i=this.br.firstAfterOrEqual(r);return L.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fR{constructor(e){this.Mr=e,this.docs=function(){return new Le(J.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():wt.newInvalidDocument(n))}getEntries(e,n){let r=lr();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():wt.newInvalidDocument(i))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=lr();const o=n.path,l=new J(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Q2(G2(f),r)<=0||(i.has(f.key)||oc(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return L.resolve(s)}getAllFromCollectionGroup(e,n,r,i){re()}Or(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new pR(this)}getSize(e){return L.resolve(this.size)}}class pR extends oR{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mR{constructor(e){this.persistence=e,this.Nr=new qs(n=>Wf(n),qf),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Yf,this.targetCount=0,this.kr=Ls.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),L.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ls(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.Kn(n),L.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),L.waitFor(s).next(()=>i)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),L.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Uf(0),this.Kr=!1,this.Kr=!0,this.$r=new hR,this.referenceDelegate=e(this),this.Ur=new mR(this),this.indexManager=new iR,this.remoteDocumentCache=function(i){return new fR(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new nR(n),this.Gr=new uR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new cR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new dR(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const i=new yR(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return L.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class yR extends Y2{constructor(e){super(),this.currentSequenceNumber=e}}class Jf{constructor(e){this.persistence=e,this.Jr=new Yf,this.Yr=null}static Zr(e){return new Jf(e)}get Xr(){if(this.Yr)return this.Yr;throw re()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),L.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.Xr,r=>{const i=J.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,ie.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return L.or([()=>L.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=le(),i=le();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Zf(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return wI()?8:J2(It())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new vR;return this.Xi(e,n,o).next(l=>{if(s.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(Eo()<=ue.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",Zi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),L.resolve()):(Eo()<=ue.DEBUG&&X("QueryEngine","Query:",Zi(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Eo()<=ue.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",Zi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,On(n))):L.resolve())}Yi(e,n){if(Bg(n))return L.resolve(null);let r=On(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Td(n,null,"F"),r=On(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=le(...s);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,Td(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,i){return Bg(n)||i.isEqual(ie.min())?L.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?L.resolve(null):(Eo()<=ue.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Zi(n)),this.rs(e,o,n,K2(i,-1)).next(l=>l))})}ts(e,n){let r=new ut(aw(e));return n.forEach((i,s)=>{oc(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return Eo()<=ue.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",Zi(n)),this.Ji.getDocumentsMatchingQuery(e,n,Yr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new Le(me),this._s=new qs(s=>Wf(s),qf),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new lR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function ER(t,e,n,r){return new wR(t,e,n,r)}async function xw(t,e){const n=se(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=le();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function TR(t,e){const n=se(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const g=h.batch,v=g.keys();let R=L.resolve();return v.forEach(b=>{R=R.next(()=>f.getEntry(u,b)).next(N=>{const V=h.docVersions.get(b);we(V!==null),N.version.compareTo(V)<0&&(g.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),R.next(()=>l.mutationQueue.removeMutationBatch(u,g))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=le();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function Cw(t){const e=se(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function IR(t,e){const n=se(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const l=[];e.targetChanges.forEach((f,g)=>{const v=i.get(g);if(!v)return;l.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,g).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,g)));let R=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?R=R.withResumeToken(ht.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,r)),i=i.insert(g,R),function(N,V,k){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0}(v,R,f)&&l.push(n.Ur.updateTargetData(s,R))});let u=lr(),h=le();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(SR(s,o,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!r.isEqual(ie.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(g=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(n.os=i,s))}function SR(t,e,n){let r=le(),i=le();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=lr();return n.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):X("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function kR(t,e){const n=se(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function AR(t,e){const n=se(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,L.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new Dr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Rd(t,e,n){const r=se(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Ra(o))throw o;X("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Zg(t,e,n){const r=se(t);let i=ie.min(),s=le();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const g=se(u),v=g._s.get(f);return v!==void 0?L.resolve(g.os.get(v)):g.Ur.getTargetData(h,f)}(r,o,On(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:ie.min(),n?s:le())).next(l=>(RR(r,gA(e),l),{documents:l,Ts:s})))}function RR(t,e,n){let r=t.us.get(e)||ie.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class ey{constructor(){this.activeTargetIds=TA()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xR{constructor(){this.so=new ey,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ey,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){X("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){X("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tl=null;function uh(){return Tl===null?Tl=function(){return 268435456+Math.round(2147483648*Math.random())}():Tl++,"0x"+Tl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="WebChannelConnection";class NR extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const l=uh(),u=this.xo(n,r.toUriEncodedString());X("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(n,u,h,i).then(f=>(X("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw Ns("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,o,l){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ws}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=PR[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=uh();return new Promise((o,l)=>{const u=new $0;u.setWithCredentials(!0),u.listenOnce(W0.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case $l.NO_ERROR:const f=u.getResponseJson();X(yt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case $l.TIMEOUT:X(yt,`RPC '${e}' ${s} timed out`),l(new G(M.DEADLINE_EXCEEDED,"Request time out"));break;case $l.HTTP_ERROR:const g=u.getStatus();if(X(yt,`RPC '${e}' ${s} failed with status:`,g,"response text:",u.getResponseText()),g>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const R=v==null?void 0:v.error;if(R&&R.status&&R.message){const b=function(V){const k=V.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(k)>=0?k:M.UNKNOWN}(R.status);l(new G(b,R.message))}else l(new G(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new G(M.UNAVAILABLE,"Connection failed."));break;default:re()}}finally{X(yt,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);X(yt,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const i=uh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=K0(),l=H0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");X(yt,`Creating RPC '${e}' stream ${i}: ${f}`,u);const g=o.createWebChannel(f,u);let v=!1,R=!1;const b=new bR({Io:V=>{R?X(yt,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(v||(X(yt,`Opening RPC '${e}' stream ${i} transport.`),g.open(),v=!0),X(yt,`RPC '${e}' stream ${i} sending:`,V),g.send(V))},To:()=>g.close()}),N=(V,k,T)=>{V.listen(k,A=>{try{T(A)}catch(D){setTimeout(()=>{throw D},0)}})};return N(g,Ao.EventType.OPEN,()=>{R||(X(yt,`RPC '${e}' stream ${i} transport opened.`),b.yo())}),N(g,Ao.EventType.CLOSE,()=>{R||(R=!0,X(yt,`RPC '${e}' stream ${i} transport closed`),b.So())}),N(g,Ao.EventType.ERROR,V=>{R||(R=!0,Ns(yt,`RPC '${e}' stream ${i} transport errored:`,V),b.So(new G(M.UNAVAILABLE,"The operation could not be completed")))}),N(g,Ao.EventType.MESSAGE,V=>{var k;if(!R){const T=V.data[0];we(!!T);const A=T,D=A.error||((k=A[0])===null||k===void 0?void 0:k.error);if(D){X(yt,`RPC '${e}' stream ${i} received error:`,D);const U=D.status;let z=function(w){const S=He[w];if(S!==void 0)return vw(S)}(U),_=D.message;z===void 0&&(z=M.INTERNAL,_="Unknown error status: "+U+" with message "+D.message),R=!0,b.So(new G(z,_)),g.close()}else X(yt,`RPC '${e}' stream ${i} received:`,T),b.bo(T)}}),N(l,q0.STAT_EVENT,V=>{V.stat===gd.PROXY?X(yt,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===gd.NOPROXY&&X(yt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{b.wo()},0),b}}function ch(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(t){return new BA(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&X("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e,n,r,i,s,o,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Pw(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(ar(n.toString()),ar("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new G(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return X("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(X("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class DR extends bw{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=qA(this.serializer,e),r=function(s){if(!("targetChange"in s))return ie.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?Vn(o.readTime):ie.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Ad(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=wd(u)?{documents:GA(s,u)}:{query:QA(s,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Ew(s,o.resumeToken);const h=Id(s,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(ie.min())>0){l.readTime=Cu(s,o.snapshotVersion.toTimestamp());const h=Id(s,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=YA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Ad(this.serializer),n.removeTarget=e,this.a_(n)}}class OR extends bw{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return we(!!e.streamToken),this.lastStreamToken=e.streamToken,we(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){we(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=KA(e.writeResults,e.commitTime),r=Vn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Ad(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>HA(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VR extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new G(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Sd(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new G(M.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Sd(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new G(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class MR{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ar(n),this.D_=!1):X("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{ji(this)&&(X("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=se(u);h.L_.add(4),await ba(h),h.q_.set("Unknown"),h.L_.delete(4),await hc(h)}(this))})}),this.q_=new MR(r,i)}}async function hc(t){if(ji(t))for(const e of t.B_)await e(!0)}async function ba(t){for(const e of t.B_)await e(!1)}function Nw(t,e){const n=se(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),rp(n)?np(n):Hs(n).r_()&&tp(n,e))}function ep(t,e){const n=se(t),r=Hs(n);n.N_.delete(e),r.r_()&&Dw(n,e),n.N_.size===0&&(r.r_()?r.o_():ji(n)&&n.q_.set("Unknown"))}function tp(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Hs(t).A_(e)}function Dw(t,e){t.Q_.xe(e),Hs(t).R_(e)}function np(t){t.Q_=new jA({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Hs(t).start(),t.q_.v_()}function rp(t){return ji(t)&&!Hs(t).n_()&&t.N_.size>0}function ji(t){return se(t).L_.size===0}function Ow(t){t.Q_=void 0}async function jR(t){t.q_.set("Online")}async function FR(t){t.N_.forEach((e,n)=>{tp(t,e)})}async function UR(t,e){Ow(t),rp(t)?(t.q_.M_(e),np(t)):t.q_.set("Unknown")}async function zR(t,e,n){if(t.q_.set("Online"),e instanceof ww&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.N_.delete(l),i.Q_.removeTarget(l))}(t,e)}catch(r){X("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Pu(t,r)}else if(e instanceof Hl?t.Q_.Ke(e):e instanceof _w?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ie.min()))try{const r=await Cw(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Q_.rt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(ht.EMPTY_BYTE_STRING,f.snapshotVersion)),Dw(s,u);const g=new Dr(f.target,u,h,f.sequenceNumber);tp(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){X("RemoteStore","Failed to raise snapshot:",r),await Pu(t,r)}}async function Pu(t,e,n){if(!Ra(e))throw e;t.L_.add(1),await ba(t),t.q_.set("Offline"),n||(n=()=>Cw(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{X("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await hc(t)})}function Vw(t,e){return e().catch(n=>Pu(t,n,e))}async function dc(t){const e=se(t),n=Zr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;BR(e);)try{const i=await kR(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,$R(e,i)}catch(i){await Pu(e,i)}Mw(e)&&Lw(e)}function BR(t){return ji(t)&&t.O_.length<10}function $R(t,e){t.O_.push(e);const n=Zr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Mw(t){return ji(t)&&!Zr(t).n_()&&t.O_.length>0}function Lw(t){Zr(t).start()}async function WR(t){Zr(t).p_()}async function qR(t){const e=Zr(t);for(const n of t.O_)e.m_(n.mutations)}async function HR(t,e,n){const r=t.O_.shift(),i=Gf.from(r,e,n);await Vw(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await dc(t)}async function KR(t,e){e&&Zr(t).V_&&await async function(r,i){if(function(o){return VA(o)&&o!==M.ABORTED}(i.code)){const s=r.O_.shift();Zr(r).s_(),await Vw(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await dc(r)}}(t,e),Mw(t)&&Lw(t)}async function ny(t,e){const n=se(t);n.asyncQueue.verifyOperationInProgress(),X("RemoteStore","RemoteStore received new credentials");const r=ji(n);n.L_.add(3),await ba(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await hc(n)}async function GR(t,e){const n=se(t);e?(n.L_.delete(2),await hc(n)):e||(n.L_.add(2),await ba(n),n.q_.set("Unknown"))}function Hs(t){return t.K_||(t.K_=function(n,r,i){const s=se(n);return s.w_(),new DR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:jR.bind(null,t),Ro:FR.bind(null,t),mo:UR.bind(null,t),d_:zR.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),rp(t)?np(t):t.q_.set("Unknown")):(await t.K_.stop(),Ow(t))})),t.K_}function Zr(t){return t.U_||(t.U_=function(n,r,i){const s=se(n);return s.w_(),new OR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:WR.bind(null,t),mo:KR.bind(null,t),f_:qR.bind(null,t),g_:HR.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await dc(t)):(await t.U_.stop(),t.O_.length>0&&(X("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new qr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new ip(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new G(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sp(t,e){if(ar("AsyncQueue",`${e}: ${t}`),Ra(t))return new G(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e){this.comparator=e?(n,r)=>e(n,r)||J.comparator(n.key,r.key):(n,r)=>J.comparator(n.key,r.key),this.keyedMap=Ro(),this.sortedSet=new Le(this.comparator)}static emptySet(e){return new Ss(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ss)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ss;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(){this.W_=new Le(J.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):re():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class js{constructor(e,n,r,i,s,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new js(e,n,Ss.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&sc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QR{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class XR{constructor(){this.queries=iy(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=se(n),s=i.queries;i.queries=iy(),s.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new G(M.ABORTED,"Firestore shutting down"))}}function iy(){return new qs(t=>ow(t),sc)}async function jw(t,e){const n=se(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new QR,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=sp(o,`Initialization of query '${Zi(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&op(n)}async function Fw(t,e){const n=se(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function YR(t,e){const n=se(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.j_)l.X_(i)&&(r=!0);o.z_=i}}r&&op(n)}function JR(t,e,n){const r=se(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function op(t){t.Y_.forEach(e=>{e.next()})}var xd,sy;(sy=xd||(xd={})).ea="default",sy.Cache="cache";class Uw{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new js(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=js.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==xd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(e){this.key=e}}class Bw{constructor(e){this.key=e}}class ZR{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=le(),this.mutatedKeys=le(),this.Aa=aw(e),this.Ra=new Ss(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new ry,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,g)=>{const v=i.get(f),R=oc(this.query,g)?g:null,b=!!v&&this.mutatedKeys.has(v.key),N=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let V=!1;v&&R?v.data.isEqual(R.data)?b!==N&&(r.track({type:3,doc:R}),V=!0):this.ga(v,R)||(r.track({type:2,doc:R}),V=!0,(u&&this.Aa(R,u)>0||h&&this.Aa(R,h)<0)&&(l=!0)):!v&&R?(r.track({type:0,doc:R}),V=!0):v&&!R&&(r.track({type:1,doc:v}),V=!0,(u||h)&&(l=!0)),V&&(R?(o=o.add(R),s=N?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:l,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,g)=>function(R,b){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re()}};return N(R)-N(b)}(f.type,g.type)||this.Aa(f.doc,g.doc)),this.pa(r),i=i!=null&&i;const l=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new js(this.query,e.Ra,s,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new ry,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=le(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new Bw(r))}),this.da.forEach(r=>{e.has(r)||n.push(new zw(r))}),n}ba(e){this.Ta=e.Ts,this.da=le();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return js.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class ex{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class tx{constructor(e){this.key=e,this.va=!1}}class nx{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new qs(l=>ow(l),sc),this.Ma=new Map,this.xa=new Set,this.Oa=new Le(J.comparator),this.Na=new Map,this.La=new Yf,this.Ba={},this.ka=new Map,this.qa=Ls.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function rx(t,e,n=!0){const r=Gw(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await $w(r,e,n,!0),i}async function ix(t,e){const n=Gw(t);await $w(n,e,!0,!1)}async function $w(t,e,n,r){const i=await AR(t.localStore,On(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await sx(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&Nw(t.remoteStore,i),l}async function sx(t,e,n,r,i){t.Ka=(g,v,R)=>async function(N,V,k,T){let A=V.view.ma(k);A.ns&&(A=await Zg(N.localStore,V.query,!1).then(({documents:_})=>V.view.ma(_,A)));const D=T&&T.targetChanges.get(V.targetId),U=T&&T.targetMismatches.get(V.targetId)!=null,z=V.view.applyChanges(A,N.isPrimaryClient,D,U);return ay(N,V.targetId,z.wa),z.snapshot}(t,g,v,R);const s=await Zg(t.localStore,e,!0),o=new ZR(e,s.Ts),l=o.ma(s.documents),u=Pa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),h=o.applyChanges(l,t.isPrimaryClient,u);ay(t,n,h.wa);const f=new ex(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function ox(t,e,n){const r=se(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!sc(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Rd(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&ep(r.remoteStore,i.targetId),Cd(r,i.targetId)}).catch(Aa)):(Cd(r,i.targetId),await Rd(r.localStore,i.targetId,!0))}async function ax(t,e){const n=se(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),ep(n.remoteStore,r.targetId))}async function lx(t,e,n){const r=mx(t);try{const i=await function(o,l){const u=se(o),h=Ye.now(),f=l.reduce((R,b)=>R.add(b.key),le());let g,v;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let b=lr(),N=le();return u.cs.getEntries(R,f).next(V=>{b=V,b.forEach((k,T)=>{T.isValidDocument()||(N=N.add(k))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,b)).next(V=>{g=V;const k=[];for(const T of l){const A=PA(T,g.get(T.key).overlayedDocument);A!=null&&k.push(new ii(T.key,A,J0(A.value.mapValue),sn.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,k,l)}).next(V=>{v=V;const k=V.applyToLocalDocumentSet(g,N);return u.documentOverlayCache.saveOverlays(R,V.batchId,k)})}).then(()=>({batchId:v.batchId,changes:uw(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new Le(me)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,i.batchId,n),await Na(r,i.changes),await dc(r.remoteStore)}catch(i){const s=sp(i,"Failed to persist write");n.reject(s)}}async function Ww(t,e){const n=se(t);try{const r=await IR(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(we(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?we(o.va):i.removedDocuments.size>0&&(we(o.va),o.va=!1))}),await Na(n,r,e)}catch(r){await Aa(r)}}function oy(t,e,n){const r=se(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const l=o.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=se(o);u.onlineState=l;let h=!1;u.queries.forEach((f,g)=>{for(const v of g.j_)v.Z_(l)&&(h=!0)}),h&&op(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ux(t,e,n){const r=se(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new Le(J.comparator);o=o.insert(s,wt.newNoDocument(s,ie.min()));const l=le().add(s),u=new uc(ie.min(),new Map,new Le(me),o,l);await Ww(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),ap(r)}else await Rd(r.localStore,e,!1).then(()=>Cd(r,e,n)).catch(Aa)}async function cx(t,e){const n=se(t),r=e.batch.batchId;try{const i=await TR(n.localStore,e);Hw(n,r,null),qw(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Na(n,i)}catch(i){await Aa(i)}}async function hx(t,e,n){const r=se(t);try{const i=await function(o,l){const u=se(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(g=>(we(g!==null),f=g.keys(),u.mutationQueue.removeMutationBatch(h,g))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Hw(r,e,n),qw(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Na(r,i)}catch(i){await Aa(i)}}function qw(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function Hw(t,e,n){const r=se(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Cd(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||Kw(t,r)})}function Kw(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(ep(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),ap(t))}function ay(t,e,n){for(const r of n)r instanceof zw?(t.La.addReference(r.key,e),dx(t,r)):r instanceof Bw?(X("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||Kw(t,r.key)):re()}function dx(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(X("SyncEngine","New document in limbo: "+n),t.xa.add(r),ap(t))}function ap(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new J(Ce.fromString(e)),r=t.qa.next();t.Na.set(r,new tx(n)),t.Oa=t.Oa.insert(n,r),Nw(t.remoteStore,new Dr(On(ic(n.path)),r,"TargetPurposeLimboResolution",Uf.oe))}}async function Na(t,e,n){const r=se(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(h){i.push(h);const g=Zf.Wi(u.targetId,h);s.push(g)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,h){const f=se(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>L.forEach(h,v=>L.forEach(v.$i,R=>f.persistence.referenceDelegate.addReference(g,v.targetId,R)).next(()=>L.forEach(v.Ui,R=>f.persistence.referenceDelegate.removeReference(g,v.targetId,R)))))}catch(g){if(!Ra(g))throw g;X("LocalStore","Failed to update sequence numbers: "+g)}for(const g of h){const v=g.targetId;if(!g.fromCache){const R=f.os.get(v),b=R.snapshotVersion,N=R.withLastLimboFreeSnapshotVersion(b);f.os=f.os.insert(v,N)}}}(r.localStore,s))}async function fx(t,e){const n=se(t);if(!n.currentUser.isEqual(e)){X("SyncEngine","User change. New user:",e.toKey());const r=await xw(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new G(M.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Na(n,r.hs)}}function px(t,e){const n=se(t),r=n.Na.get(e);if(r&&r.va)return le().add(r.key);{let i=le();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const l=n.Fa.get(o);i=i.unionWith(l.view.Va)}return i}}function Gw(t){const e=se(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ww.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=px.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ux.bind(null,e),e.Ca.d_=YR.bind(null,e.eventManager),e.Ca.$a=JR.bind(null,e.eventManager),e}function mx(t){const e=se(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cx.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=hx.bind(null,e),e}class bu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=cc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return ER(this.persistence,new _R,e.initialUser,this.serializer)}Ga(e){return new gR(Jf.Zr,this.serializer)}Wa(e){return new xR}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}bu.provider={build:()=>new bu};class Pd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>oy(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=fx.bind(null,this.syncEngine),await GR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new XR}()}createDatastore(e){const n=cc(e.databaseInfo.databaseId),r=function(s){return new NR(s)}(e.databaseInfo);return function(s,o,l,u){return new VR(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new LR(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>oy(this.syncEngine,n,0),function(){return ty.D()?new ty:new CR}())}createSyncEngine(e,n){return function(i,s,o,l,u,h,f){const g=new nx(i,s,o,l,u,h);return f&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=se(i);X("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await ba(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Pd.provider={build:()=>new Pd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ar("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gx{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=vt.UNAUTHENTICATED,this.clientId=Q0.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{X("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(X("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new qr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=sp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function hh(t,e){t.asyncQueue.verifyOperationInProgress(),X("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await xw(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function ly(t,e){t.asyncQueue.verifyOperationInProgress();const n=await yx(t);X("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>ny(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>ny(e.remoteStore,i)),t._onlineComponents=e}async function yx(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X("FirestoreClient","Using user provided OfflineComponentProvider");try{await hh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Ns("Error using user provided cache. Falling back to memory cache: "+n),await hh(t,new bu)}}else X("FirestoreClient","Using default OfflineComponentProvider"),await hh(t,new bu);return t._offlineComponents}async function Xw(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X("FirestoreClient","Using user provided OnlineComponentProvider"),await ly(t,t._uninitializedComponentsProvider._online)):(X("FirestoreClient","Using default OnlineComponentProvider"),await ly(t,new Pd))),t._onlineComponents}function vx(t){return Xw(t).then(e=>e.syncEngine)}async function bd(t){const e=await Xw(t),n=e.eventManager;return n.onListen=rx.bind(null,e.syncEngine),n.onUnlisten=ox.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=ix.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=ax.bind(null,e.syncEngine),n}function _x(t,e,n={}){const r=new qr;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,h){const f=new Qw({next:v=>{f.Za(),o.enqueueAndForget(()=>Fw(s,g));const R=v.docs.has(l);!R&&v.fromCache?h.reject(new G(M.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&v.fromCache&&u&&u.source==="server"?h.reject(new G(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(v)},error:v=>h.reject(v)}),g=new Uw(ic(l.path),f,{includeMetadataChanges:!0,_a:!0});return jw(s,g)}(await bd(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(t,e,n){if(!n)throw new G(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function wx(t,e,n,r){if(e===!0&&r===!0)throw new G(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function cy(t){if(!J.isDocumentKey(t))throw new G(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function hy(t){if(J.isDocumentKey(t))throw new G(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function fc(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":re()}function on(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new G(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=fc(t);throw new G(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new G(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new G(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wx("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yw((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new G(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new G(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new G(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class pc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new dy({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new G(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new G(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new dy(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new j2;switch(r.type){case"firstParty":return new B2(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new G(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=uy.get(n);r&&(X("ComponentProvider","Removing Datastore"),uy.delete(n),r.terminate())}(this),Promise.resolve()}}function Ex(t,e,n,r={}){var i;const s=(t=on(t,pc))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Ns("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=vt.MOCK_USER;else{l=r0(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new G(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new vt(h)}t._authCredentials=new F2(new G0(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ks(this.firestore,e,this._query)}}class Et{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Hr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Et(this.firestore,e,this._key)}}class Hr extends Ks{constructor(e,n,r){super(e,n,ic(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Et(this.firestore,null,new J(e))}withConverter(e){return new Hr(this.firestore,e,this._path)}}function Zt(t,e,...n){if(t=tt(t),Jw("collection","path",e),t instanceof pc){const r=Ce.fromString(e,...n);return hy(r),new Hr(t,null,r)}{if(!(t instanceof Et||t instanceof Hr))throw new G(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ce.fromString(e,...n));return hy(r),new Hr(t.firestore,null,r)}}function De(t,e,...n){if(t=tt(t),arguments.length===1&&(e=Q0.newId()),Jw("doc","path",e),t instanceof pc){const r=Ce.fromString(e,...n);return cy(r),new Et(t,null,new J(r))}{if(!(t instanceof Et||t instanceof Hr))throw new G(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ce.fromString(e,...n));return cy(r),new Et(t.firestore,t instanceof Hr?t.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Pw(this,"async_queue_retry"),this.Vu=()=>{const r=ch();r&&X("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=ch();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=ch();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new qr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ra(e))throw e;X("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw ar("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=ip.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&re()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function py(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class ei extends pc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new fy,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fy(e),this._firestoreClient=void 0,await e}}}function Tx(t,e){const n=typeof t=="object"?t:Pf(),r=typeof t=="string"?t:"(default)",i=Ju(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=e0("firestore");s&&Ex(i,...s)}return i}function lp(t){if(t._terminated)throw new G(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||Ix(t),t._firestoreClient}function Ix(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new tA(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Yw(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new gx(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Fs(ht.fromBase64String(e))}catch(n){throw new G(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Fs(ht.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new G(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new G(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new G(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return me(this._lat,e._lat)||me(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sx=/^__.*__$/;class kx{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new ii(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ca(e,this.data,n,this.fieldTransforms)}}class Zw{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new ii(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function eE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re()}}class yc{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new yc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Nu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(eE(this.Cu)&&Sx.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Ax{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||cc(e)}Qu(e,n,r,i=!1){return new yc({Cu:e,methodName:n,qu:r,path:at.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vc(t){const e=t._freezeSettings(),n=cc(t._databaseId);return new Ax(t._databaseId,!!e.ignoreUndefinedProperties,n)}function tE(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);dp("Data must be an object, but it was:",o,r);const l=nE(r,o);let u,h;if(s.merge)u=new Wt(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const g of s.mergeFields){const v=Nd(e,g,n);if(!o.contains(v))throw new G(M.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);iE(f,v)||f.push(v)}u=new Wt(f),h=o.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,h=o.fieldTransforms;return new kx(new Dt(l),u,h)}class _c extends gc{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof _c}}function Rx(t,e,n){return new yc({Cu:3,qu:e.settings.qu,methodName:t._methodName,xu:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class hp extends gc{constructor(e,n){super(e),this.Ku=n}_toFieldTransform(e){const n=Rx(this,e,!0),r=this.Ku.map(s=>Gs(s,n)),i=new Ms(r);return new AA(e.path,i)}isEqual(e){return e instanceof hp&&aa(this.Ku,e.Ku)}}function xx(t,e,n,r){const i=t.Qu(1,e,n);dp("Data must be an object, but it was:",i,r);const s=[],o=Dt.empty();Li(r,(u,h)=>{const f=fp(e,u,n);h=tt(h);const g=i.Nu(f);if(h instanceof _c)s.push(f);else{const v=Gs(h,g);v!=null&&(s.push(f),o.set(f,v))}});const l=new Wt(s);return new Zw(o,l,i.fieldTransforms)}function Cx(t,e,n,r,i,s){const o=t.Qu(1,e,n),l=[Nd(e,r,n)],u=[i];if(s.length%2!=0)throw new G(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)l.push(Nd(e,s[v])),u.push(s[v+1]);const h=[],f=Dt.empty();for(let v=l.length-1;v>=0;--v)if(!iE(h,l[v])){const R=l[v];let b=u[v];b=tt(b);const N=o.Nu(R);if(b instanceof _c)h.push(R);else{const V=Gs(b,N);V!=null&&(h.push(R),f.set(R,V))}}const g=new Wt(h);return new Zw(f,g,o.fieldTransforms)}function Px(t,e,n,r=!1){return Gs(n,t.Qu(r?4:3,e))}function Gs(t,e){if(rE(t=tt(t)))return dp("Unsupported field value:",e,t),nE(t,e);if(t instanceof gc)return function(r,i){if(!eE(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=Gs(l,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=tt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return IA(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ye.fromDate(r);return{timestampValue:Cu(i.serializer,s)}}if(r instanceof Ye){const s=new Ye(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Cu(i.serializer,s)}}if(r instanceof up)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Fs)return{bytesValue:Ew(i.serializer,r._byteString)};if(r instanceof Et){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Xf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof cp)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Hf(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${fc(r)}`)}(t,e)}function nE(t,e){const n={};return X0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Li(t,(r,i)=>{const s=Gs(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function rE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ye||t instanceof up||t instanceof Fs||t instanceof Et||t instanceof gc||t instanceof cp)}function dp(t,e,n){if(!rE(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=fc(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Nd(t,e,n){if((e=tt(e))instanceof mc)return e._internalPath;if(typeof e=="string")return fp(t,e);throw Nu("Field path arguments must be of type string or ",t,!1,void 0,n)}const bx=new RegExp("[~\\*/\\[\\]]");function fp(t,e,n){if(e.search(bx)>=0)throw Nu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new mc(...e.split("."))._internalPath}catch{throw Nu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Nu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new G(M.INVALID_ARGUMENT,l+t+u)}function iE(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Nx(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(pp("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Nx extends sE{data(){return super.data()}}function pp(t,e){return typeof e=="string"?fp(t,e):e instanceof mc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dx(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new G(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class mp{}class Ox extends mp{}function Vx(t,e,...n){let r=[];e instanceof mp&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof gp).length,l=s.filter(u=>u instanceof wc).length;if(o>1||o>0&&l>0)throw new G(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class wc extends Ox{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new wc(e,n,r)}_apply(e){const n=this._parse(e);return oE(e._query,n),new Ks(e.firestore,e.converter,Ed(e._query,n))}_parse(e){const n=vc(e.firestore);return function(s,o,l,u,h,f,g){let v;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new G(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){yy(g,f);const R=[];for(const b of g)R.push(gy(u,s,b));v={arrayValue:{values:R}}}else v=gy(u,s,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||yy(g,f),v=Px(l,o,g,f==="in"||f==="not-in");return Ge.create(h,f,v)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function my(t,e,n){const r=e,i=pp("where",t);return wc._create(i,r,n)}class gp extends mp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new gp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:_n.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)oE(o,u),o=Ed(o,u)}(e._query,n),new Ks(e.firestore,e.converter,Ed(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function gy(t,e,n){if(typeof(n=tt(n))=="string"){if(n==="")throw new G(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!sw(e)&&n.indexOf("/")!==-1)throw new G(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Ce.fromString(n));if(!J.isDocumentKey(r))throw new G(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Mg(t,new J(r))}if(n instanceof Et)return Mg(t,n._key);throw new G(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fc(n)}.`)}function yy(t,e){if(!Array.isArray(t)||t.length===0)throw new G(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function oE(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new G(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new G(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Mx{convertValue(e,n="none"){switch(Di(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ni(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw re()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Li(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>We(o.doubleValue));return new cp(s)}convertGeoPoint(e){return new up(We(e.latitude),We(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Bf(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(da(e));default:return null}}convertTimestamp(e){const n=Jr(e);return new Ye(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ce.fromString(e);we(Rw(r));const i=new fa(r.get(1),r.get(3)),s=new J(r.popFirst(5));return i.isEqual(n)||ar(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aE(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lE extends sE{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Kl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(pp("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Kl extends lE{data(e={}){return super.data(e)}}class Lx{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Co(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Kl(this._firestore,this._userDataWriter,r.key,r,new Co(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new G(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Kl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Co(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Kl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Co(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:jx(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function jx(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(t){t=on(t,Et);const e=on(t.firestore,ei);return _x(lp(e),t._key).then(n=>cE(e,t,n))}class uE extends Mx{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Et(this.firestore,null,n)}}function vy(t,e,n){t=on(t,Et);const r=on(t.firestore,ei),i=aE(t.converter,e);return Ec(r,[tE(vc(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,sn.none())])}function it(t,e,n,...r){t=on(t,Et);const i=on(t.firestore,ei),s=vc(i);let o;return o=typeof(e=tt(e))=="string"||e instanceof mc?Cx(s,"updateDoc",t._key,e,n,r):xx(s,"updateDoc",t._key,e),Ec(i,[o.toMutation(t._key,sn.exists(!0))])}function _y(t){return Ec(on(t.firestore,ei),[new Kf(t._key,sn.none())])}function Yi(t,e){const n=on(t.firestore,ei),r=De(t),i=aE(t.converter,e);return Ec(n,[tE(vc(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,sn.exists(!1))]).then(()=>r)}function Tr(t,...e){var n,r,i;t=tt(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||py(e[o])||(s=e[o],o++);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(py(e[o])){const g=e[o];e[o]=(n=g.next)===null||n===void 0?void 0:n.bind(g),e[o+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[o+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let u,h,f;if(t instanceof Et)h=on(t.firestore,ei),f=ic(t._key.path),u={next:g=>{e[o]&&e[o](cE(h,t,g))},error:e[o+1],complete:e[o+2]};else{const g=on(t,Ks);h=on(g.firestore,ei),f=g._query;const v=new uE(h);u={next:R=>{e[o]&&e[o](new Lx(h,v,g,R))},error:e[o+1],complete:e[o+2]},Dx(t._query)}return function(v,R,b,N){const V=new Qw(N),k=new Uw(R,V,b);return v.asyncQueue.enqueueAndForget(async()=>jw(await bd(v),k)),()=>{V.Za(),v.asyncQueue.enqueueAndForget(async()=>Fw(await bd(v),k))}}(lp(h),f,l,u)}function Ec(t,e){return function(r,i){const s=new qr;return r.asyncQueue.enqueueAndForget(async()=>lx(await vx(r),i,s)),s.promise}(lp(t),e)}function cE(t,e,n){const r=n.docs.get(e._key),i=new uE(t);return new lE(t,i,e._key,r,new Co(n.hasPendingWrites,n.fromCache),e.converter)}function Fx(...t){return new hp("arrayUnion",t)}(function(e,n=!0){(function(i){Ws=i})(Mi),Ci(new Qr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new ei(new U2(r.getProvider("auth-internal")),new W2(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new G(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new fa(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),bn(bg,"4.7.3",e),bn(bg,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE="firebasestorage.googleapis.com",Ux="storageBucket",zx=2*60*1e3,Bx=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends jn{constructor(e,n,r=0){super(dh(e),`Firebase Storage: ${n} (${dh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Fn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return dh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ln;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ln||(Ln={}));function dh(t){return"storage/"+t}function $x(){const t="An unknown error occurred, please check the error payload for server response.";return new Fn(Ln.UNKNOWN,t)}function Wx(){return new Fn(Ln.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function qx(){return new Fn(Ln.CANCELED,"User canceled the upload/download.")}function Hx(t){return new Fn(Ln.INVALID_URL,"Invalid URL '"+t+"'.")}function Kx(t){return new Fn(Ln.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function wy(t){return new Fn(Ln.INVALID_ARGUMENT,t)}function dE(){return new Fn(Ln.APP_DELETED,"The Firebase app was deleted.")}function Gx(t){return new Fn(Ln.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=mn.makeFromUrl(e,n)}catch{return new mn(e,"")}if(r.path==="")return r;throw Kx(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(D){D.path.charAt(D.path.length-1)==="/"&&(D.path_=D.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function h(D){D.path_=decodeURIComponent(D.path)}const f="v[A-Za-z0-9_]+",g=n.replace(/[.]/g,"\\."),v="(/([^?#]*).*)?$",R=new RegExp(`^https?://${g}/${f}/b/${i}/o${v}`,"i"),b={bucket:1,path:3},N=n===hE?"(?:storage.googleapis.com|storage.cloud.google.com)":n,V="([^?#]*)",k=new RegExp(`^https?://${N}/${i}/${V}`,"i"),A=[{regex:l,indices:u,postModify:s},{regex:R,indices:b,postModify:h},{regex:k,indices:{bucket:1,path:2},postModify:h}];for(let D=0;D<A.length;D++){const U=A[D],z=U.regex.exec(e);if(z){const _=z[U.indices.bucket];let y=z[U.indices.path];y||(y=""),r=new mn(_,y),U.postModify(r);break}}if(r==null)throw Hx(e);return r}}class Qx{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xx(t,e,n){let r=1,i=null,s=null,o=!1,l=0;function u(){return l===2}let h=!1;function f(...V){h||(h=!0,e.apply(null,V))}function g(V){i=setTimeout(()=>{i=null,t(R,u())},V)}function v(){s&&clearTimeout(s)}function R(V,...k){if(h){v();return}if(V){v(),f.call(null,V,...k);return}if(u()||o){v(),f.call(null,V,...k);return}r<64&&(r*=2);let A;l===1?(l=2,A=0):A=(r+Math.random())*1e3,g(A)}let b=!1;function N(V){b||(b=!0,v(),!h&&(i!==null?(V||(l=2),clearTimeout(i),g(0)):V||(l=1)))}return g(0),s=setTimeout(()=>{o=!0,N(!0)},n),N}function Yx(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jx(t){return t!==void 0}function Ey(t,e,n,r){if(r<e)throw wy(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw wy(`Invalid value for '${t}'. Expected ${n} or less.`)}function Zx(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var Du;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Du||(Du={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eC(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,n,r,i,s,o,l,u,h,f,g,v=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=g,this.retry=v,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,b)=>{this.resolve_=R,this.reject_=b,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Sl(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const u=l.loaded,h=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,h)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===Du.NO_ERROR,u=s.getStatus();if(!l||eC(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===Du.ABORT;r(!1,new Sl(!1,null,f));return}const h=this.successCodes_.indexOf(u)!==-1;r(!0,new Sl(h,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());Jx(u)?s(u):s()}catch(u){o(u)}else if(l!==null){const u=$x();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(i.canceled){const u=this.appDelete_?dE():qx();o(u)}else{const u=Wx();o(u)}};this.canceled_?n(!1,new Sl(!1,null,!0)):this.backoffId_=Xx(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Yx(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Sl{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function nC(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function rC(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function iC(t,e){e&&(t["X-Firebase-GMPID"]=e)}function sC(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function oC(t,e,n,r,i,s,o=!0){const l=Zx(t.urlParams),u=t.url+l,h=Object.assign({},t.headers);return iC(h,e),nC(h,n),rC(h,s),sC(h,r),new tC(u,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aC(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function lC(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,n){this._service=e,n instanceof mn?this._location=n:this._location=mn.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Ou(e,n)}get root(){const e=new mn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return lC(this._location.path)}get storage(){return this._service}get parent(){const e=aC(this._location.path);if(e===null)return null;const n=new mn(this._location.bucket,e);return new Ou(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Gx(e)}}function Ty(t,e){const n=e==null?void 0:e[Ux];return n==null?null:mn.makeFromBucketSpec(n,t)}function uC(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken=typeof i=="string"?i:r0(i,t.app.options.projectId))}class cC{constructor(e,n,r,i,s){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=hE,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=zx,this._maxUploadRetryTime=Bx,this._requests=new Set,i!=null?this._bucket=mn.makeFromBucketSpec(i,this._host):this._bucket=Ty(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=mn.makeFromBucketSpec(this._url,e):this._bucket=Ty(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ey("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ey("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ou(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new Qx(dE());{const o=oC(e,this._appId,r,i,n,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const Iy="@firebase/storage",Sy="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE="storage";function hC(t=Pf(),e){t=tt(t);const r=Ju(t,fE).getImmediate({identifier:e}),i=e0("storage");return i&&dC(r,...i),r}function dC(t,e,n,r={}){uC(t,e,n,r)}function fC(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new cC(n,r,i,e,Mi)}function pC(){Ci(new Qr(fE,fC,"PUBLIC").setMultipleInstances(!0)),bn(Iy,Sy,""),bn(Iy,Sy,"esm2017")}pC();/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var mC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gC=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),oe=(t,e)=>{const n=Q.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:l="",children:u,...h},f)=>Q.createElement("svg",{ref:f,...mC,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${gC(t)}`,l].join(" "),...h},[...e.map(([g,v])=>Q.createElement(g,v)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yC=oe("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=oe("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vC=oe("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=oe("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wC=oe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ay=oe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ry=oe("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EC=oe("Eraser",[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",key:"182aya"}],["path",{d:"M22 21H7",key:"t4ddhn"}],["path",{d:"m5 11 9 9",key:"1mo9qw"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=oe("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TC=oe("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IC=oe("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SC=oe("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=oe("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cy=oe("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AC=oe("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Py=oe("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=oe("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xC=oe("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CC=oe("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=oe("Paperclip",[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",key:"1u3ebp"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bC=oe("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NC=oe("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by=oe("PhoneCall",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94",key:"vmijpz"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10",key:"13nbpp"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DC=oe("PhoneForwarded",[["polyline",{points:"18 2 22 6 18 10",key:"6vjanh"}],["line",{x1:"14",x2:"22",y1:"6",y2:"6",key:"1jsywh"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=oe("PhoneIncoming",[["polyline",{points:"16 2 16 8 22 8",key:"1ygljm"}],["line",{x1:"22",x2:"16",y1:"2",y2:"8",key:"1xzwqn"}],["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=oe("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kl=oe("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Al=oe("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pE=oe("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=oe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=oe("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jC=oe("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=oe("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=oe("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ny=oe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=oe("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=oe("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=oe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fh=oe("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),BC={apiKey:"AIzaSyBI5cMQ-zwjU1s4je2zzqBPpepSfBy0mKg",authDomain:"aura-748c8.firebaseapp.com",projectId:"aura-748c8",storageBucket:"aura-748c8.firebasestorage.app",messagingSenderId:"654947850743",appId:"1:654947850743:web:91991c4c3d818ed20f36f2",measurementId:"G-9X9QMW22Z1"},ye="aura-pro-v28",yp=ug().length?ug()[0]:o0(BC),ph=M2(yp),ve=Tx(yp);hC(yp);const $C="https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3",WC="https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3",Oy={iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"}]};class qC extends Q.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("Aura Guard:",e,n)}render(){return this.state.hasError?m.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#050505",color:"white"},children:[m.jsx(yC,{size:64,color:"#FF3B30",style:{marginBottom:20}}),m.jsx("h2",{style:{fontSize:28,fontWeight:800},children:"Сбой компонента"}),m.jsx("p",{style:{opacity:.6,marginBottom:30},children:"Мы перехватили ошибку и спасли приложение от вылета."}),m.jsx("button",{onClick:()=>{localStorage.removeItem("aura_msgs_cache"),this.setState({hasError:!1}),window.location.reload()},style:{padding:"16px 32px",background:"#FF3B30",color:"white",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700},children:"Очистить кэш и продолжить"})]}):this.props.children}}const Be=t=>{if(typeof t=="string")return t;if(typeof t=="number")return String(t);if(t&&typeof t=="object"){if(t.text)return Be(t.text);if(t.name)return Be(t.name)}return"[Медиафайл]"},HC=t=>typeof t=="string"?t:t&&typeof t=="object"&&t.reaction?t.reaction:"",KC=t=>new Promise(e=>{const n=new FileReader;n.onload=r=>{const i=new Image;i.onload=()=>{const s=document.createElement("canvas"),o=800;let l=i.width,u=i.height;l>u&&l>o?(u*=o/l,l=o):u>o&&(l*=o/u,u=o),s.width=l,s.height=u,s.getContext("2d").drawImage(i,0,0,l,u),e(s.toDataURL("image/jpeg",.6))},i.src=r.target.result},n.readAsDataURL(t)}),Vy=t=>{const e=t==="dark"||t==="mirror",n=t==="mirror",r=t==="light";return`
  :root { 
    --aura-red: #FF3B30; 
    --aura-red-glow: rgba(255, 59, 48, 0.4);
    --bg-main: ${n||e?"#000000":"#F2F2F7"};
    --bg-side: ${n?"rgba(15,15,20,0.8)":e?"#1C1C1E":"#FFFFFF"};
    --bg-card: ${n?"rgba(25,25,30,0.7)":e?"#1C1C1E":"#FFFFFF"};
    --text-main: ${r?"#000000":"#FFFFFF"};
    --text-sec: #8E8E93;
    --border: ${r?"rgba(60,60,67,0.1)":"rgba(84,84,88,0.3)"};
    --nav-bg: ${n?"rgba(0,0,0,0.75)":e?"rgba(28,28,30,0.85)":"rgba(255,255,255,0.85)"};
    --glass: blur(30px) saturate(200%);
    
    --bubble-me: #007AFF; 
    --bubble-me-text: #FFFFFF;
    --bubble-other: ${e?"#262628":"#E9E9EB"};
    --bubble-other-text: ${e?"#FFFFFF":"#000000"};
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  
  body, html { 
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; 
    background: var(--bg-main); color: var(--text-main); 
    overflow: hidden; height: 100vh; width: 100vw;
    position: fixed; inset: 0; overscroll-behavior: none; 
    user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
    letter-spacing: -0.01em;
  }
  
  button { appearance: none !important; -webkit-appearance: none !important; background: transparent; border: none; cursor: pointer; transition: 0.2s; color: inherit; font-family: inherit; }
  input, textarea, select { appearance: none !important; -webkit-appearance: none !important; font-family: inherit; background: transparent; border: none; color: inherit; outline: none; user-select: text; -webkit-user-select: text; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(150,150,150,0.4); border-radius: 10px; }
  
  .aura-viewport { display: flex; width: 100vw; height: 100vh; overflow: hidden; background: var(--bg-main); justify-content: center; position: relative; }
  
  .auth-overlay { position: absolute; inset: 0; background: #000; display: flex; align-items: center; justify-content: center; z-index: 100000; }
  .auth-card { background: var(--bg-card); border: 1px solid var(--border); padding: 40px 30px; border-radius: 36px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.5); animation: fadeUp 0.6s cubic-bezier(0.32, 0.72, 0, 1); }
  @keyframes fadeUp { from { opacity:0; transform: translateY(40px) scale(0.95); } to { opacity:1; transform: translateY(0) scale(1); } }
  
  .app-container { display: flex; width: 100%; height: 100%; background: var(--bg-main); position: relative; }
  
  .sidebar { width: 380px; height: 100%; background: var(--bg-main); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; z-index: 100; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
  .main-stage { flex: 1; height: 100%; display: flex; justify-content: center; background: var(--bg-main); position: relative; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
  .chat-wrapper { flex: 1; display: flex; flex-direction: column; height: 100%; background: var(--bg-main); position: relative; animation: slideInRight 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
  
  @media (max-width: 800px) {
    .sidebar { width: 100%; position: absolute; left: 0; top: 0; }
    .sidebar.hide { transform: translateX(-30%); opacity: 0; pointer-events: none; }
    .main-stage { width: 100%; position: absolute; left: 0; top: 0; z-index: 200; }
    .main-stage.hide { transform: translateX(100%); box-shadow: -10px 0 30px rgba(0,0,0,0.3); }
    .chat-wrapper { border: none; }
  }
  
  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }

  /* iOS Nav Bar */
  .nav-bar { 
    height: calc(50px + env(safe-area-inset-top)); 
    padding: env(safe-area-inset-top) 16px 0 16px; 
    display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid var(--border); 
    background: var(--nav-bg); backdrop-filter: var(--glass); -webkit-backdrop-filter: var(--glass); z-index: 50; flex-shrink: 0; 
  }
  
  /* iOS Tab Bar */
  .tab-bar { 
    height: calc(50px + env(safe-area-inset-bottom)); 
    padding-bottom: env(safe-area-inset-bottom); 
    border-top: 0.5px solid var(--border); display: flex; justify-content: space-around; align-items: center;
    background: var(--nav-bg); backdrop-filter: var(--glass); -webkit-backdrop-filter: var(--glass); flex-shrink: 0; z-index: 50;
  }
  .tab-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--text-sec); flex: 1; font-size: 10px; font-weight: 500; height: 50px; }
  .tab-btn.active { color: var(--aura-red); }
  
  /* iOS Chat Input */
  .chat-input-wrapper { 
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); 
    background: var(--nav-bg); backdrop-filter: var(--glass); -webkit-backdrop-filter: var(--glass);
    border-top: 0.5px solid var(--border); display: flex; gap: 12px; align-items: center; z-index: 50;
  }
  
  /* iOS List Items */
  .list-item { display: flex; align-items: center; padding: 10px 16px; cursor: pointer; width: 100%; text-align: left; transition: background 0.2s; position: relative; }
  .list-item::after { content: ''; position: absolute; bottom: 0; right: 0; left: 76px; height: 0.5px; background: var(--border); }
  .list-item:active { background: rgba(150,150,150,0.1); }
  .list-item.active { background: rgba(0,122,255,0.1); }
  .list-item.pinned { background: rgba(150,150,150,0.05); }
  
  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background: #222; flex-shrink: 0; border: 0.5px solid rgba(0,0,0,0.1); }
  .status-dot { width: 14px; height: 14px; border-radius: 50%; background: #34C759; border: 2.5px solid var(--bg-main); position: absolute; bottom: 0; right: 0; }
  
  .chat-scroll { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 4px; user-select: text; touch-action: pan-y; scroll-behavior: smooth; }
  
  /* iMessage Style Bubbles */
  .bubble { 
    max-width: 75%; padding: 10px 16px; font-size: 16px; line-height: 1.4; 
    position: relative; animation: msgIn 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards; 
    box-shadow: 0 1px 2px rgba(0,0,0,0.05); cursor: pointer;
  }
  
  @keyframes msgIn { 
    0% { opacity: 0; transform: translateY(10px) scale(0.95); } 
    100% { opacity: 1; transform: translateY(0) scale(1); } 
  }
  
  .bubble-me { background: var(--bubble-me); color: var(--bubble-me-text); align-self: flex-end; border-radius: 20px 20px 4px 20px; }
  .bubble-other { background: var(--bubble-other); color: var(--bubble-other-text); align-self: flex-start; border-radius: 20px 20px 20px 4px; }
  
  /* iOS Text Input */
  .premium-input { width: 100%; padding: 8px 16px; border-radius: 20px; background: var(--bubble-other); color: var(--text-main); font-size: 16px; border: 0.5px solid var(--border); }
  .btn-aura-action { background: var(--aura-red); color: white; padding: 16px; border-radius: 14px; font-weight: 600; width: 100%; font-size: 17px; }
  
  /* Typing Indicator (iOS style) */
  .typing-indicator { display: flex; gap: 4px; padding: 12px 18px; background: var(--bubble-other); border-radius: 20px 20px 20px 4px; width: fit-content; align-self: flex-start; animation: msgIn 0.3s ease; margin-bottom: 5px; }
  .typing-dot { width: 8px; height: 8px; background: var(--text-sec); border-radius: 50%; animation: typeBounce 1.4s infinite ease-in-out both; }
  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes typeBounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }

  /* Call UI iOS adaptation */
  .call-overlay { position: fixed; inset: 0; background: #000; z-index: 150000; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; overflow: hidden; transition: all 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
  .call-overlay.minimized { 
      inset: auto; top: calc(10px + env(safe-area-inset-top)); left: 50%; transform: translateX(-50%); 
      width: auto; height: auto; background: transparent; padding: 0; cursor: pointer; border-radius: 30px; 
  }
  
  .call-video-main { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 5; }
  .call-video-pip { position: absolute; bottom: calc(140px + env(safe-area-inset-bottom)); right: 20px; width: 120px; height: 180px; border-radius: 16px; object-fit: cover; border: 1.5px solid rgba(255,255,255,0.3); z-index: 15; background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  
  .call-header-glass { position: absolute; top: calc(40px + env(safe-area-inset-top)); display: flex; flex-direction: column; align-items: center; z-index: 20; }
  .call-avatar-pulse { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; background: #111; border: 2px solid transparent; }
  
  .call-status-text { font-size: 18px; color: rgba(255,255,255,0.6); margin-top: 12px; font-variant-numeric: tabular-nums; }

  .call-controls { position: absolute; bottom: calc(40px + env(safe-area-inset-bottom)); display: flex; align-items: center; gap: 25px; z-index: 30; }
  .btn-call { width: 66px; height: 66px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.2); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: none; cursor: pointer; }
  
  .device-wrapper { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 8px 16px; border-radius: 20px; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); }
  .call-device-select { background: transparent; color: white; border: none; outline: none; font-size: 13px; max-width: 140px; }
  `},GC=({data:t,onClose:e,onClick:n})=>(Q.useEffect(()=>{try{new Audio($C).play().catch(()=>{})}catch{}const r=setTimeout(e,5e3);return()=>clearTimeout(r)},[]),m.jsxs("div",{className:"aura-toast",onClick:n,style:{position:"fixed",top:"calc(20px + env(safe-area-inset-top))",left:16,right:16,background:"var(--nav-bg)",backdropFilter:"blur(20px)",padding:"12px 16px",borderRadius:20,display:"flex",alignItems:"center",gap:14,zIndex:999999,boxShadow:"0 10px 40px rgba(0,0,0,0.2)",animation:"toastPop 0.5s cubic-bezier(0.32, 0.72, 0, 1)"},children:[m.jsx("img",{src:t.avatar||`https://api.dicebear.com/7.x/initials/svg?seed=${Be(t.name)}`,style:{width:46,height:46,borderRadius:"50%"},alt:"av"}),m.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[m.jsx("b",{style:{display:"block",fontSize:15,color:"var(--text-main)",marginBottom:2},children:Be(t.name)}),m.jsx("p",{style:{fontSize:14,opacity:.6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:Be(t.text)})]})]})),My=({msg:t})=>{const e=Q.useRef(null),[n,r]=Q.useState(!1);return typeof t.text!="string"?m.jsx("div",{style:{color:"red",fontSize:12},children:"Сбой видео"}):m.jsxs("div",{className:"circle-video",style:{width:220,height:220,borderRadius:"50%",overflow:"hidden",position:"relative",cursor:"pointer"},onClick:()=>{e.current&&(n?e.current.pause():e.current.play(),r(!n))},children:[!n&&m.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.2)",zIndex:2},children:m.jsx(pE,{color:"white",size:40})}),m.jsx("video",{ref:e,src:t.text,playsInline:!0,loop:!0,style:{width:"100%",height:"100%",objectFit:"cover"}})]})},Ly=({src:t,isMine:e})=>{const n=Q.useRef(null),[r,i]=Q.useState(!1),[s,o]=Q.useState(0);return typeof t!="string"?m.jsx("div",{style:{color:"red",fontSize:12},children:"Сбой аудио"}):(Q.useEffect(()=>{const l=n.current;if(!l)return;const u=()=>o(l.currentTime/(l.duration||1)*100);return l.addEventListener("timeupdate",u),l.addEventListener("ended",()=>i(!1)),()=>{l.removeEventListener("timeupdate",u)}},[]),m.jsxs("div",{className:"voice-player",style:{display:"flex",alignItems:"center",gap:12,minWidth:200},children:[m.jsx("button",{className:"voice-btn",onClick:()=>{r?n.current.pause():n.current.play(),i(!r)},style:{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:e?"rgba(255,255,255,0.2)":"var(--aura-red)"},children:r?m.jsx(bC,{size:18,color:"white"}):m.jsx(pE,{size:18,color:"white",style:{marginLeft:2}})}),m.jsxs("div",{className:"voice-progress",style:{flex:1,height:4,background:"rgba(150,150,150,0.3)",borderRadius:2},children:[m.jsx("audio",{ref:n,src:t}),m.jsx("div",{className:"voice-bar",style:{width:`${s}%`,height:"100%",borderRadius:2,transition:"width 0.1s linear",background:e?"white":"var(--aura-red)"}})]})]}))};function QC(){var ro,io,Ba,hi;const[t,e]=Q.useState({active:!1,message:""}),[n,r]=Q.useState(null),[i,s]=Q.useState("chats"),[o,l]=Q.useState(null),[u,h]=Q.useState([]),[f,g]=Q.useState([]),[v,R]=Q.useState([]),[b,N]=Q.useState(""),[V,k]=Q.useState(""),[T,A]=Q.useState("login"),[D,U]=Q.useState({username:"",password:"",name:""}),[z,_]=Q.useState(""),[y,w]=Q.useState(localStorage.getItem("aura_theme")||"dark"),[S,x]=Q.useState(null),[C,I]=Q.useState(null),[Ee,jt]=Q.useState(null),[wn,Ft]=Q.useState(null),[q,ee]=Q.useState(!1),[Z,Ie]=Q.useState("image"),[ge,Se]=Q.useState(null),[Qt,Xt]=Q.useState(0),[Pt,dt]=Q.useState(!1),[Fi,Un]=Q.useState({active:!1,progress:0,fileName:""}),En=Q.useRef(null),[Yt,cr]=Q.useState(null),[Qs,si]=Q.useState(!1),St=Q.useRef(null),Ui=Q.useRef([]),[vp,Tc]=Q.useState(0),Xs=Q.useRef(),oi=Q.useRef(null),zi=Q.useRef(null),[de,zn]=Q.useState(null),[hr,Bi]=Q.useState(0),[je,Fe]=Q.useState(!1),[Ys,Da]=Q.useState({audioIn:[],audioOut:[],videoIn:[]}),[Tn,Ic]=Q.useState({audioIn:"",audioOut:"",videoIn:""}),[In,ai]=Q.useState({micMuted:!1,screenShare:!1}),[Oa,Sn]=Q.useState(!1),dr=Q.useRef(null),fr=Q.useRef(null),Jt=Q.useRef(null),bt=Q.useRef(null),Ut=Q.useRef(null);Q.useEffect(()=>{Ut.current=new Audio(WC),Ut.current.loop=!0;const E=setInterval(()=>Tc(H=>H+1),2e4);kk(ph,async H=>{H||await _k(ph);const Y=JSON.parse(localStorage.getItem("aura_creds")||"{}");if(Y.username)try{const te=await Il(De(ve,"artifacts",ye,"public","data","users",Y.username));te.exists()&&r(te.data())}catch{}});const j=()=>{const H=JSON.parse(localStorage.getItem("aura_creds")||"{}");if(H.username&&document.visibilityState==="visible"){if(H.showLastSeen===!1)return;it(De(ve,"artifacts",ye,"public","data","users",H.username),{status:"online",lastActiveTS:Date.now()}).catch(()=>{})}},W=()=>{const H=JSON.parse(localStorage.getItem("aura_creds")||"{}");H.username&&(document.visibilityState==="hidden"?it(De(ve,"artifacts",ye,"public","data","users",H.username),{status:Date.now(),lastActiveTS:Date.now()}).catch(()=>{}):j())};j();const B=setInterval(j,2e4);return document.addEventListener("visibilitychange",W),window.addEventListener("pagehide",W),()=>{clearInterval(B),clearInterval(E),document.removeEventListener("visibilitychange",W),window.removeEventListener("pagehide",W)}},[]),Q.useEffect(()=>{if(!ph.currentUser||!(n!=null&&n.username))return;try{const Y=localStorage.getItem("aura_msgs_cache");Y&&g(JSON.parse(Y))}catch{}const E=Tr(Zt(ve,"artifacts",ye,"public","data","users"),Y=>{h(Y.docs.map(te=>te.data()))}),j=Tr(Zt(ve,"artifacts",ye,"public","data","messages"),Y=>{var Ae,Ne;const te=Y.docs.map(fe=>({id:fe.id,...fe.data()})).sort((fe,Ue)=>fe.ts-Ue.ts);if(localStorage.setItem("aura_msgs_cache",JSON.stringify(te.slice(-150))),f.length>0&&te.length>f.length){const fe=te[te.length-1];if(fe.uid!==n.username&&(!o||o.username!==fe.uid)){let Ue=fe.type==="text"?fe.text:fe.type==="image"?" 📷  Фото":fe.type==="file"?" 📁  Файл":" 🎤  Медиа";x({name:fe.name,text:Ue,avatar:(Ae=u.find(kt=>kt.username===fe.uid))==null?void 0:Ae.avatar,uid:fe.uid}),document.visibilityState==="hidden"&&"Notification"in window&&Notification.permission==="granted"&&new Notification(fe.name,{body:Ue,icon:(Ne=u.find(kt=>kt.username===fe.uid))==null?void 0:Ne.avatar})}}g(te)}),W=Tr(Zt(ve,"artifacts",ye,"public","data","calls"),Y=>{const te=Y.docs.map(Ae=>({id:Ae.id,...Ae.data()})).filter(Ae=>Ae.caller===n.username||Ae.callee===n.username).sort((Ae,Ne)=>Ne.ts-Ae.ts);R(te)}),B=Vx(Zt(ve,"artifacts",ye,"public","data","calls"),my("callee","==",n.username),my("status","==","calling")),H=Tr(B,Y=>{Y.docChanges().forEach(te=>{if(te.type==="added"){const Ae=te.doc.data(),Ne=u.find(fe=>fe.username===Ae.caller)||{name:Ae.caller};zn({id:te.doc.id,...Ae,peer:Ne,isInitiator:!1}),$i(),Sn(!1),Fe(!1),Ut.current&&Ut.current.play().catch(()=>{})}})});return()=>{E(),j(),H(),W()}},[n==null?void 0:n.username,o==null?void 0:o.username,f.length]);const pr=o&&o.username!=="global"&&((ro=u.find(E=>E.username===o.username))==null?void 0:ro.typingTo)===(n==null?void 0:n.username);Q.useEffect(()=>{if(!n||!o||f.length===0)return;const E=f.filter(j=>j.to===n.username&&j.uid===o.username&&!j.read);E.length>0&&E.forEach(j=>{it(De(ve,"artifacts",ye,"public","data","messages",j.id),{read:!0}).catch(()=>{})}),oi.current&&setTimeout(()=>{oi.current.scrollIntoView({behavior:"smooth"})},50)},[f,o,n,Pt,ge,pr]),Q.useEffect(()=>{let E;return de&&de.status==="active"?E=setInterval(()=>Bi(j=>j+1),1e3):Bi(0),()=>clearInterval(E)},[de==null?void 0:de.status]),Q.useEffect(()=>{Jt.current&&Tn.audioOut&&typeof Jt.current.setSinkId=="function"&&Jt.current.setSinkId(Tn.audioOut).catch(E=>console.warn(E))},[Tn.audioOut,de==null?void 0:de.status]);const $i=async()=>{var E,j,W;try{if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return;const B=await navigator.mediaDevices.enumerateDevices();Da({audioIn:B.filter(H=>H.kind==="audioinput")||[],audioOut:B.filter(H=>H.kind==="audiooutput")||[],videoIn:B.filter(H=>H.kind==="videoinput")||[]}),B.length&&Ic({audioIn:((E=B.find(H=>H.kind==="audioinput"))==null?void 0:E.deviceId)||"",audioOut:((j=B.find(H=>H.kind==="audiooutput"))==null?void 0:j.deviceId)||"",videoIn:((W=B.find(H=>H.kind==="videoinput"))==null?void 0:W.deviceId)||""})}catch{}},Js=async()=>{const{username:E,password:j,name:W}=D;if(!E||!j)return _("Заполните поля!");_("");const B=E.toLowerCase().trim(),H=De(ve,"artifacts",ye,"public","data","users",B);try{if(T==="reg"){if((await Il(H)).exists())return _("Логин занят");const te={username:B,password:j,name:W||B,avatar:`https://api.dicebear.com/7.x/avataaars/svg?seed=${B}`,status:"online",showLastSeen:!0,ts:Date.now(),pinnedChats:[],hiddenChats:[]};await vy(H,te),r(te)}else{const Y=await Il(H);if(Y.exists()&&Y.data().password===j)r(Y.data());else return _("Неверный логин или пароль")}localStorage.setItem("aura_creds",JSON.stringify({username:B,password:j,showLastSeen:!0})),it(De(ve,"artifacts",ye,"public","data","users",B),{status:"online",lastActiveTS:Date.now()}).catch(()=>{})}catch{_("Ошибка сервера")}},Bn=()=>{En.current&&(En.current.abort(),En.current=null),Un({active:!1,progress:0,fileName:""}),dt(!1)};async function Zs(E){Un({active:!0,progress:15,fileName:E.name||"Медиафайл"});const j=`${Date.now()}_${E.name||"media.webm"}`;if(Un({active:!0,progress:45,fileName:E.name||"Медиафайл"}),!(await fetch(`https://fghqfzjphljuosmqzste.supabase.co/storage/v1/object/files/${j}`,{method:"POST",headers:{Authorization:"Bearer sb_publishable_VddqU4_ZwSDcaPVvXh4zWA_rc-dHSnq",apikey:"sb_publishable_VddqU4_ZwSDcaPVvXh4zWA_rc-dHSnq","Content-Type":E.type||"application/octet-stream"},body:E})).ok)throw new Error("Ошибка загрузки Supabase");Un({active:!0,progress:85,fileName:E.name||"Медиафайл"});const B=`https://fghqfzjphljuosmqzste.supabase.co/storage/v1/object/public/files/${j}`;return Un({active:!0,progress:100,fileName:E.name||"Медиафайл"}),B}const Wi=async(E,j,W)=>{E.stopPropagation();try{const H=await(await fetch(j)).blob(),Y=window.URL.createObjectURL(H),te=document.createElement("a");te.style.display="none",te.href=Y,te.download=W||"download",document.body.appendChild(te),te.click(),window.URL.revokeObjectURL(Y)}catch{window.open(j,"_blank")}},Va=E=>{N(E.target.value),o&&o.username!=="global"&&n&&(it(De(ve,"artifacts",ye,"public","data","users",n.username),{typingTo:o.username}).catch(()=>{}),clearTimeout(zi.current),zi.current=setTimeout(()=>{it(De(ve,"artifacts",ye,"public","data","users",n.username),{typingTo:null}).catch(()=>{})},1500))},mr=async(E=b,j="text",W=null,B="",H="")=>{if(Yt){const Y=Yt;if(cr(null),b.trim()){const te=o?o.username:"global";await Yi(Zt(ve,"artifacts",ye,"public","data","messages"),{text:b,fileName:"",uid:n.username,to:te,ts:Date.now(),name:n.name||"User",type:"text",read:!1,replyTo:Ee?{text:Ee.text,name:Ee.name}:null,reactions:{}}),N("")}dt(!0);try{if(Y.type.startsWith("image/")){const te=await KC(Y);await gr(te,"image",Y.name)}else{const te=await Zs(Y);if(te){const Ae=o?o.username:"global";await Yi(Zt(ve,"artifacts",ye,"public","data","messages"),{text:te,fileName:Y.name,uid:n.username,to:Ae,ts:Date.now(),name:n.name||"User",type:"file",read:!1,replyTo:Ee?{text:Ee.text,name:Ee.name}:null,reactions:{}})}}}catch{}finally{dt(!1),Un({active:!1,progress:0,fileName:""}),En.current=null}jt(null);return}if(!(j==="text"&&(!E||typeof E!="string"||!E.trim()))){if(wn&&j==="text"){await it(De(ve,"artifacts",ye,"public","data","messages",wn.id),{text:E,edited:!0}),Ft(null),N("");return}try{let Y=E;const te=o?o.username:"global";await Yi(Zt(ve,"artifacts",ye,"public","data","messages"),{text:Y,fileName:H||"",uid:n.username,to:te,ts:Date.now(),name:n.name||"User",type:j,read:!1,replyTo:Ee?{text:Ee.text,name:Ee.name}:null,reactions:{}}),N(""),jt(null),Se(null),o&&o.username!=="global"&&(it(De(ve,"artifacts",ye,"public","data","users",n.username),{typingTo:null}).catch(()=>{}),clearTimeout(zi.current))}catch{dt(!1),Un({active:!1,progress:0,fileName:""}),En.current=null}}},Ma=E=>{E.preventDefault(),o&&si(!0)},nt=E=>{E.preventDefault(),si(!1)},La=async E=>{if(E.preventDefault(),si(!1),!o)return;const j=E.dataTransfer.files[0];j&&cr(j)},li=async E=>{const j=E.target.files[0];j&&(cr(j),E.target.value="")},gr=async(E,j,W="")=>{const B=o?o.username:"global";await Yi(Zt(ve,"artifacts",ye,"public","data","messages"),{text:E,fileName:W,uid:n.username,to:B,ts:Date.now(),name:n.name||"User",type:j,read:!1,replyTo:Ee?{text:Ee.text,name:Ee.name}:null,reactions:{}}),jt(null)},ja=async E=>{try{const j=await navigator.mediaDevices.getUserMedia({audio:!0,video:E==="video"});St.current=new MediaRecorder(j,{mimeType:E==="video"?"video/webm;codecs=vp8":"audio/webm;codecs=opus"}),Ui.current=[],St.current.ondataavailable=B=>{B.data.size>0&&Ui.current.push(B.data)},St.current.onstop=async()=>{const B=new Blob(Ui.current,{type:E==="video"?"video/webm":"audio/webm"});j.getTracks().forEach(H=>H.stop()),dt(!0);try{const H=new File([B],E==="video"?"video_message.webm":"voice_message.webm",{type:B.type}),Y=await Zs(H);await gr(Y,E==="video"?"video_circle":"voice")}catch{}finally{dt(!1)}},St.current.start(),Se(E),Xt(0);const W=setInterval(()=>{Xt(B=>B+1)},1e3);St.current.timer=W}catch{}},Fa=(E=!1)=>{if(!St.current||St.current.state==="inactive"){Se(null);return}E&&(St.current.onstop=null),St.current.stop(),clearInterval(St.current.timer),Se(null)},un=E=>!E||E.showLastSeen===!1?!1:E.status==="online"?!(E.lastActiveTS&&Date.now()-E.lastActiveTS>45e3):!1,Ua=E=>{if(!E||E.showLastSeen===!1)return"был(а) недавно";if(un(E))return"в сети";const j=typeof E.status=="number"?E.status:E.lastActiveTS||Date.now(),W=Math.floor((Date.now()-j)/6e4);return W<1?"только что":W<60?`${W} мин. назад`:W<1440?`${Math.floor(W/60)} ч. назад`:"давно"},eo=async(E,j=o)=>{if(!j)return;await $i();const W=n.username+"_"+Date.now();zn({id:W,status:"calling",peer:j,type:E,isInitiator:!0}),Sn(!1),Fe(!1);try{const B=new RTCPeerConnection(Oy);dr.current=B;const H={audio:Tn.audioIn?{deviceId:{exact:Tn.audioIn}}:!0,video:E==="video"},Y=await navigator.mediaDevices.getUserMedia(H);fr.current=Y,setTimeout(()=>{bt.current&&(bt.current.srcObject=Y)},100),Y.getTracks().forEach(Ue=>B.addTrack(Ue,Y)),B.ontrack=Ue=>{Jt.current&&(Jt.current.srcObject=Ue.streams[0],Sn(!0))};const te=De(ve,"artifacts",ye,"public","data","calls",W),Ae=Zt(te,"callerCandidates"),Ne=Zt(te,"calleeCandidates");B.onicecandidate=Ue=>{Ue.candidate&&Yi(Ae,Ue.candidate.toJSON())};const fe=await B.createOffer();await B.setLocalDescription(fe),await vy(te,{caller:n.username,callee:j.username,status:"calling",type:E,ts:Date.now(),offer:{type:fe.type,sdp:fe.sdp}}),Tr(te,Ue=>{const kt=Ue.data();if(kt){if(kt.status==="ended"||kt.status==="rejected"){yr(!1);return}kt.answer&&!B.currentRemoteDescription&&(B.setRemoteDescription(new RTCSessionDescription(kt.answer)).catch(()=>{}),zn($a=>({...$a,status:"active"})))}}),Tr(Ne,Ue=>{Ue.docChanges().forEach(kt=>{kt.type==="added"&&B.addIceCandidate(new RTCIceCandidate(kt.doc.data())).catch(()=>{})})})}catch{yr(!0)}},qi=async()=>{Ut.current&&(Ut.current.pause(),Ut.current.currentTime=0),zn(E=>({...E,status:"active"})),Sn(!1),Fe(!1);try{const E=new RTCPeerConnection(Oy);dr.current=E;const j={audio:Tn.audioIn?{deviceId:{exact:Tn.audioIn}}:!0,video:de.type==="video"},W=await navigator.mediaDevices.getUserMedia(j);fr.current=W,bt.current&&(bt.current.srcObject=W),W.getTracks().forEach(Ne=>E.addTrack(Ne,W)),E.ontrack=Ne=>{Jt.current&&(Jt.current.srcObject=Ne.streams[0],Sn(!0))};const B=De(ve,"artifacts",ye,"public","data","calls",de.id),H=Zt(B,"callerCandidates"),Y=Zt(B,"calleeCandidates");E.onicecandidate=Ne=>{Ne.candidate&&Yi(Y,Ne.candidate.toJSON())};const te=(await Il(B)).data();await E.setRemoteDescription(new RTCSessionDescription(te.offer));const Ae=await E.createAnswer();await E.setLocalDescription(Ae),await it(B,{status:"active",answer:{type:Ae.type,sdp:Ae.sdp}}),Tr(B,Ne=>{var fe,Ue;(((fe=Ne.data())==null?void 0:fe.status)==="ended"||((Ue=Ne.data())==null?void 0:Ue.status)==="rejected")&&yr(!1)}),Tr(H,Ne=>{Ne.docChanges().forEach(fe=>{fe.type==="added"&&E.addIceCandidate(new RTCIceCandidate(fe.doc.data())).catch(()=>{})})})}catch{yr(!0)}},yr=async(E=!0)=>{if(Ut.current&&(Ut.current.pause(),Ut.current.currentTime=0),fr.current&&fr.current.getTracks().forEach(j=>j.stop()),dr.current&&dr.current.close(),E&&(de!=null&&de.id)){const j=de.status==="calling"&&!de.isInitiator?"rejected":"ended";await it(De(ve,"artifacts",ye,"public","data","calls",de.id),{status:j}).catch(()=>{})}zn(null),Sn(!1),Bi(0),Fe(!1)},to=()=>{if(fr.current){const E=fr.current.getAudioTracks()[0];E&&(E.enabled=!E.enabled,ai(j=>({...j,micMuted:!E.enabled})))}},Hi=async()=>{try{if(In.screenShare){const E=await navigator.mediaDevices.getUserMedia({video:!0});bt.current&&(bt.current.srcObject=E);const j=E.getVideoTracks()[0],W=dr.current.getSenders().find(B=>{var H;return((H=B.track)==null?void 0:H.kind)==="video"});W&&W.replaceTrack(j),ai(B=>({...B,screenShare:!1}))}else{const E=await navigator.mediaDevices.getDisplayMedia({video:!0});bt.current&&(bt.current.srcObject=E);const j=E.getVideoTracks()[0],W=dr.current.getSenders().find(B=>{var H;return((H=B.track)==null?void 0:H.kind)==="video"});W&&W.replaceTrack(j),ai(B=>({...B,screenShare:!0})),j.onended=async()=>{const B=await navigator.mediaDevices.getUserMedia({video:!0}),H=B.getVideoTracks()[0];W&&W.replaceTrack(H),bt.current&&(bt.current.srcObject=B),ai(Y=>({...Y,screenShare:!1}))}}}catch{}},kn=async E=>{const j=n.pinnedChats||[],W=j.includes(E)?j.filter(B=>B!==E):[...j,E];await it(De(ve,"artifacts",ye,"public","data","users",n.username),{pinnedChats:W}),r({...n,pinnedChats:W})},no=async(E,j)=>{if(j)f.filter(W=>W.uid===n.username&&W.to===E||W.uid===E&&W.to===n.username).forEach(W=>_y(De(ve,"artifacts",ye,"public","data","messages",W.id)));else{const W=n.hiddenChats||[];await it(De(ve,"artifacts",ye,"public","data","users",n.username),{hiddenChats:[...W,E]}),r({...n,hiddenChats:[...W,E]})}l(null)};if(!n)return m.jsxs("div",{className:"aura-viewport",children:[m.jsx("style",{children:Vy(y)}),m.jsx("div",{className:"auth-overlay",children:m.jsxs("div",{className:"auth-card",children:[m.jsx("div",{className:"logo-box",children:m.jsx(fh,{size:45,color:"white",fill:"white"})}),m.jsx("h1",{style:{color:"white",fontSize:38,fontWeight:900,marginBottom:8},children:"AURA"}),m.jsx("p",{style:{color:"#777",fontSize:15,marginBottom:40},children:"Безопасность. Стиль. Будущее."}),m.jsxs("div",{style:{width:"100%"},children:[m.jsx("input",{className:"premium-input",placeholder:"Логин",value:D.username,onChange:E=>U({...D,username:E.target.value}),style:{marginBottom:12}}),m.jsx("input",{className:"premium-input",type:"password",placeholder:"Пароль",value:D.password,onChange:E=>U({...D,password:E.target.value}),style:{marginBottom:12}}),T==="reg"&&m.jsx("input",{className:"premium-input",placeholder:"Отображаемое имя",value:D.name,onChange:E=>U({...D,name:E.target.value}),style:{marginBottom:12}}),z&&m.jsx("p",{style:{color:"var(--aura-red)",marginBottom:12,fontSize:14},children:z}),m.jsx("button",{className:"btn-aura-action",onClick:Js,children:T==="login"?"ВОЙТИ В СИСТЕМУ":"СОЗДАТЬ АККАУНТ"}),m.jsx("button",{onClick:()=>{A(T==="login"?"reg":"login"),_("")},style:{marginTop:20,color:"var(--aura-red)",fontWeight:800,fontSize:14},children:T==="login"?"У меня ещё нет аккаунта":"Уже есть аккаунт? Войти"})]})]})})]});const za=[...u].filter(E=>E.username!==(n==null?void 0:n.username)&&!((n==null?void 0:n.hiddenChats)||[]).includes(E.username)&&E.name.toLowerCase().includes(V.toLowerCase())).sort((E,j)=>{var H,Y;const W=(H=n==null?void 0:n.pinnedChats)!=null&&H.includes(E.username)?1:0;return((Y=n==null?void 0:n.pinnedChats)!=null&&Y.includes(j.username)?1:0)-W}),ui=f.filter(E=>(o==null?void 0:o.username)==="global"?E.to==="global":E.uid===(n==null?void 0:n.username)&&E.to===(o==null?void 0:o.username)||E.uid===(o==null?void 0:o.username)&&E.to===(n==null?void 0:n.username)),ci=ui.find(E=>E.isPinned);return m.jsxs("div",{className:"aura-viewport",onDragOver:Ma,onDragLeave:nt,onDrop:La,children:[m.jsx("style",{children:Vy(y)}),Qs&&m.jsxs("div",{className:"drag-overlay",children:[m.jsx(Ry,{size:60,color:"var(--aura-red)"}),m.jsx("h2",{style:{fontSize:24,fontWeight:700},children:"Отпустите файл для отправки"})]}),m.jsxs("div",{className:"app-container",children:[m.jsxs("div",{className:`sidebar ${o&&(i==="chats"||i==="calls")?"hide":""}`,children:[m.jsxs("div",{className:"nav-bar",children:[m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[m.jsx(fh,{size:28,color:"var(--aura-red)",fill:"var(--aura-red)"}),m.jsx("h2",{style:{fontWeight:900,fontSize:24},children:"Aura"})]}),m.jsx(ky,{size:20,color:"var(--aura-red)",style:{cursor:"pointer"}})]}),i==="chats"&&m.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[m.jsx("div",{style:{padding:16},children:m.jsxs("div",{className:"premium-input",style:{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:16},children:[m.jsx(jC,{size:18,color:"#8E8E93"}),m.jsx("input",{style:{width:"100%"},placeholder:"Поиск в Aura...",value:V,onChange:E=>k(E.target.value)})]})}),m.jsxs("div",{style:{flex:1,overflowY:"auto"},children:[m.jsxs("button",{className:`list-item ${(o==null?void 0:o.username)==="global"?"active":""}`,onClick:()=>l({username:"global",name:"Общий чат",avatar:""}),children:[m.jsx("div",{style:{width:48,height:48,borderRadius:16,background:"var(--aura-red)",display:"flex",alignItems:"center",justifyContent:"center",marginRight:16,flexShrink:0},children:m.jsx(TC,{size:24,color:"white"})}),m.jsxs("div",{style:{flex:1},children:[m.jsx("b",{children:"Общий чат"}),m.jsx("p",{style:{fontSize:13,opacity:.6,margin:0},children:"Весь мир Aura"})]})]}),za.map(E=>{var W,B;const j=f.filter(H=>H.uid===E.username&&H.to===n.username&&!H.read).length;return m.jsxs("button",{className:`list-item ${(o==null?void 0:o.username)===E.username?"active":""} ${(W=n.pinnedChats)!=null&&W.includes(E.username)?"pinned":""}`,onClick:()=>l(E),onContextMenu:H=>{H.preventDefault(),I({type:"user",item:E,rect:H.currentTarget.getBoundingClientRect()})},children:[m.jsxs("div",{style:{position:"relative"},children:[m.jsx("img",{src:Be(E.avatar),className:"avatar",alt:"av"}),un(E)&&m.jsx("div",{className:"status-dot"})]}),m.jsxs("div",{style:{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",gap:4,paddingLeft:12},children:[m.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[m.jsx("b",{style:{fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:"var(--text-main)"},children:Be(E.name)}),m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[j>0&&m.jsx("span",{style:{background:"#34C759",color:"white",padding:"2px 7px",borderRadius:10,fontSize:11,fontWeight:800},children:j}),((B=n.pinnedChats)==null?void 0:B.includes(E.username))&&m.jsx(Al,{size:12,color:"var(--text-sec)"})]})]}),m.jsx("p",{style:{fontSize:13,color:un(E)?"#34C759":"var(--text-sec)",margin:0},children:Ua(E)})]})]},E.username)})]})]}),i==="calls"&&m.jsxs("div",{style:{flex:1,overflowY:"auto",padding:20},children:[m.jsx("h3",{style:{fontSize:13,textTransform:"uppercase",color:"var(--text-sec)",marginBottom:20,letterSpacing:1},children:"История звонков"}),v.length===0?m.jsxs("div",{style:{textAlign:"center",marginTop:100,opacity:.3},children:[m.jsx(kl,{size:60,style:{margin:"0 auto 15px"}}),m.jsx("p",{children:"Нет звонков"})]}):v.map(E=>{const j=E.callee===n.username,W=j?E.caller:E.callee,B=u.find(Y=>Y.username===W),H=E.status==="calling"||E.status==="rejected"||E.status==="ended"&&!E.answer;return m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:15,marginBottom:20},children:[m.jsx("div",{style:{width:44,height:44,borderRadius:"50%",background:H?"rgba(255,59,48,0.15)":"rgba(52,199,89,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:j?m.jsx(OC,{size:20,color:H?"#FF3B30":"#34C759"}):m.jsx(DC,{size:20,color:H?"#FF3B30":"#34C759"})}),m.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[m.jsx("div",{style:{fontSize:16,fontWeight:700,color:"var(--text-main)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:B?Be(B.name):W}),m.jsx("div",{style:{fontSize:13,color:"var(--text-sec)",marginTop:2},children:E.ts?new Date(E.ts).toLocaleString():"Неизвестно"})]}),m.jsx("button",{onClick:()=>{l(B||{username:W,name:W,avatar:""}),s("chats")},style:{width:36,height:36,borderRadius:"50%",background:"var(--bg-card)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:m.jsx(Cy,{size:16,color:"var(--aura-red)"})}),m.jsx("button",{onClick:()=>{const Y=B||{username:W,name:W,avatar:""};l(Y),s("chats"),eo(E.type||"voice",Y)},style:{width:36,height:36,borderRadius:"50%",background:"var(--bg-card)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:m.jsx(by,{size:16,color:"var(--aura-red)"})})]},E.id)})]}),m.jsxs("div",{className:"tab-bar",children:["              ",m.jsxs("button",{className:`tab-btn ${i==="chats"?"active":""}`,onClick:()=>{s("chats"),l(null)},children:[m.jsx(Cy,{size:24}),"Чаты"]}),"              ",m.jsxs("button",{className:`tab-btn ${i==="calls"?"active":""}`,onClick:()=>{s("calls"),l(null)},children:[m.jsx(kl,{size:24}),"Звонки"]}),"              ",m.jsxs("button",{className:`tab-btn ${i==="settings"?"active":""}`,onClick:()=>s("settings"),children:[m.jsx(UC,{size:24}),"Настройки"]}),"            "]}),"          "]}),"          ",(i==="chats"||i==="calls")&&m.jsxs("div",{className:`main-stage ${o?"":"hide"}`,children:["                ",o?m.jsxs("div",{className:"chat-wrapper",children:["                      ",m.jsxs("div",{className:"nav-bar",children:["                        ",m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:15},children:["                          ",m.jsx("button",{className:"md:hide",onClick:()=>l(null),style:{color:"var(--aura-red)"},children:m.jsx(Ay,{size:32})}),"                          ",m.jsx("img",{src:Be(o.avatar)||`https://api.dicebear.com/7.x/initials/svg?seed=${o.username}`,className:"avatar",style:{width:40,height:40},alt:"p"}),"                          ",m.jsxs("div",{children:[m.jsx("b",{style:{fontSize:17,display:"block"},children:Be(o.name)}),m.jsx("span",{style:{fontSize:12,color:un(u.find(E=>E.username===o.username))?"#34C759":"var(--text-sec)"},children:Ua(u.find(E=>E.username===o.username))})]}),"                        "]}),"                        ",m.jsxs("div",{style:{display:"flex",gap:20},children:[m.jsx("button",{onClick:()=>eo("voice"),children:m.jsx(kl,{size:22,color:"var(--aura-red)"})}),m.jsx("button",{onClick:()=>eo("video"),children:m.jsx(zC,{size:24,color:"var(--aura-red)"})}),m.jsx("button",{onClick:()=>ee(!q),children:m.jsx(SC,{size:22,color:"var(--aura-red)"})})]}),"                      "]}),"                      ",ci&&m.jsxs("button",{className:"pinned-msg-bar",onClick:()=>Xs.current.scrollTo(0,0),children:[m.jsx(Al,{size:16,color:"var(--aura-red)"}),m.jsx("div",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:13},children:Be(ci.text)}),m.jsx(Ji,{size:16,opacity:.5,onClick:E=>{E.stopPropagation(),it(De(ve,"artifacts",ye,"public","data","messages",ci.id),{isPinned:!1})}})]}),"                      ",m.jsxs("div",{ref:Xs,className:"chat-scroll",children:["                        ",m.jsx("div",{style:{flex:1}}),"                        ",ui.filter(E=>!(E.hiddenFor||[]).includes(n.username)).map(E=>m.jsxs("div",{className:`bubble ${E.uid===n.username?"bubble-me":"bubble-other"}`,onContextMenu:j=>{j.preventDefault(),I({type:"msg",id:E.id,rect:j.currentTarget.getBoundingClientRect(),item:E})},children:["                              ",E.uid!==n.username&&o.username==="global"&&m.jsx("div",{style:{fontSize:11,fontWeight:800,marginBottom:4,color:"var(--aura-red)"},children:Be(E.name)}),"                              ",E.replyTo&&m.jsxs("div",{className:"reply-preview",children:["Ответ: ",Be(E.replyTo.text)]}),"                              ",E.type==="video_circle"?m.jsx(My,{msg:E}):E.type==="voice"?m.jsx(Ly,{src:E.text,isMine:E.uid===n.username}):E.type==="image"?m.jsx("img",{src:E.text,className:"msg-image",onClick:()=>window.open(E.text,"_blank"),alt:"img"}):E.type==="file"?m.jsxs("div",{className:"file-message",onClick:j=>Wi(j,E.text,E.fileName),children:[m.jsx("div",{className:"file-icon",children:m.jsx(xy,{size:20})}),m.jsx("div",{className:"file-name",children:Be(E.fileName||"Файл")}),m.jsx(Ry,{size:16,style:{marginLeft:"auto",opacity:.7}})]}):m.jsxs("div",{style:{wordBreak:"break-word"},children:[Be(E.text)," ",E.edited&&m.jsx("span",{style:{fontSize:10,opacity:.5},children:"(изм.)"})]}),"                              ",m.jsxs("div",{style:{fontSize:10,opacity:.6,textAlign:"right",marginTop:6},children:[new Date(E.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),E.uid===n.username&&(E.read?m.jsx(_C,{size:14,color:"#34C759",style:{marginLeft:4,verticalAlign:"middle"}}):m.jsx(wC,{size:14,style:{marginLeft:4,verticalAlign:"middle"}}))]}),"                              ",E.reactions&&Object.keys(E.reactions).length>0&&m.jsx("div",{className:"reactions-bar",children:Object.values(E.reactions).filter(j=>j).map((j,W)=>m.jsx("span",{className:"reaction-pill",children:HC(j)},W))}),"                            "]},E.id)),pr&&m.jsxs("div",{className:"typing-indicator",children:[m.jsx("div",{className:"typing-dot"}),m.jsx("div",{className:"typing-dot"}),m.jsx("div",{className:"typing-dot"})]}),m.jsx("div",{ref:oi,style:{height:1}})]}),"                      ",Ee&&m.jsxs("div",{className:"edit-mode-bar",children:[m.jsxs("span",{children:["Ответ: ",Be(Ee.text).substring(0,30),"..."]}),m.jsx("button",{onClick:()=>jt(null),children:m.jsx(Ji,{size:16})})]}),"                      ",wn&&m.jsxs("div",{className:"edit-mode-bar",children:[m.jsx("span",{children:"Редактирование..."}),m.jsx("button",{onClick:()=>Ft(null),children:m.jsx(Ji,{size:16})})]}),"                      ","                      ",Yt&&!Pt&&m.jsxs("div",{className:"edit-mode-bar",style:{background:"var(--bg-card)",borderTop:"1px solid var(--border)",borderRadius:"16px 16px 0 0",margin:"0 20px",padding:"12px 16px",display:"flex",alignItems:"center",gap:12},children:["                            ",m.jsxs("div",{style:{width:40,height:40,borderRadius:8,background:"var(--aura-red)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:["                              ",m.jsx(xy,{size:20,color:"white"}),"                            "]}),"                            ",m.jsxs("div",{style:{flex:1,overflow:"hidden"},children:["                              ",m.jsx("div",{style:{fontSize:14,fontWeight:600,color:"var(--text-main)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:Yt.name}),"                              ",m.jsxs("div",{style:{fontSize:12,color:"var(--text-sec)"},children:[(Yt.size/1024/1024).toFixed(2)," MB"]}),"                            "]}),"                            ",m.jsx("button",{onClick:()=>cr(null),style:{background:"rgba(255,255,255,0.1)",padding:4,borderRadius:"50%",display:"flex"},children:m.jsx(Ji,{size:16,color:"var(--text-sec)"})}),"                          "]}),"                      ","                      ",m.jsxs("div",{className:"chat-input-wrapper",children:["                        ","                        ",Pt&&Fi.active?m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:15,flex:1,padding:"5px 10px"},children:["                              ",m.jsxs("div",{style:{position:"relative",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center"},children:["                                ",m.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 40 40",style:{transform:"rotate(-90deg)"},children:["                                  ",m.jsx("circle",{cx:"20",cy:"20",r:"18",fill:"none",stroke:"var(--border)",strokeWidth:"3"}),"                                  ",m.jsx("circle",{cx:"20",cy:"20",r:"18",fill:"none",stroke:"var(--aura-red)",strokeWidth:"3",strokeDasharray:"113.097",strokeDashoffset:113.097-113.097*Fi.progress/100,strokeLinecap:"round",style:{transition:"stroke-dashoffset 0.2s ease-out"}}),"                                "]}),"                                ",m.jsx("button",{onClick:Bn,style:{position:"absolute",background:"var(--bg-card)",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"1px solid var(--border)"},children:m.jsx(Ji,{size:12,color:"var(--text-main)"})}),"                              "]}),"                              ",m.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"},children:["                                ",m.jsx("span",{style:{fontSize:14,fontWeight:600,color:"var(--text-main)",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"},children:Fi.fileName}),"                                ",m.jsxs("span",{style:{fontSize:12,color:"var(--text-sec)"},children:["Загрузка... ",Math.round(Fi.progress),"%"]}),"                              "]}),"                            "]}):Pt?m.jsxs("div",{style:{display:"flex",justifyContent:"center",width:"100%",padding:"10px 0"},children:["                              ",m.jsx(MC,{className:"animate-spin",color:"var(--aura-red)",size:24}),"                            "]}):m.jsxs(m.Fragment,{children:["                              ",m.jsx("button",{onClick:()=>{document.getElementById("photo-upload").click()},children:m.jsx(PC,{size:26,color:"var(--aura-red)"})}),"                              ",m.jsx("input",{type:"file",id:"photo-upload",accept:"*/*",style:{display:"none"},onChange:li}),"                              ",m.jsx("input",{className:"premium-input",value:b,onChange:Va,onKeyDown:E=>E.key==="Enter"&&mr(),placeholder:Yt?"Подпись (необязательно)...":"Сообщение..."}),"                              ",b.trim()||wn||Yt?m.jsx("button",{onClick:()=>mr(),children:m.jsx(FC,{size:24,color:"var(--aura-red)"})}):m.jsxs("div",{style:{display:"flex",gap:20},children:["                                    ",m.jsx("button",{onClick:()=>ja("video"),children:m.jsx(vC,{size:26,color:"var(--aura-red)"})}),"                                    ",m.jsx("button",{onClick:()=>ja("voice"),children:m.jsx(Py,{size:26,color:"var(--aura-red)"})}),"                                  "]}),"                            "]}),"                      "]}),"                    "]}):m.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:.04},children:[m.jsx(fh,{size:300,fill:"currentColor"}),m.jsx("h1",{style:{letterSpacing:25,fontSize:70,fontWeight:900},children:"AURA"})]}),"                ",q&&o&&m.jsxs("div",{className:"media-panel",children:["                      ",m.jsxs("div",{className:"nav-bar",children:[m.jsx("b",{style:{fontSize:15},children:"Медиа история"}),m.jsx("button",{onClick:()=>ee(!1),children:m.jsx(Ji,{size:20,style:{opacity:.5}})})]}),"                      ",m.jsxs("div",{style:{display:"flex",gap:10,padding:15,borderBottom:"1px solid var(--border)"},children:[m.jsxs("button",{style:{flex:1,background:Z==="image"?"rgba(255,59,48,0.1)":"transparent",color:Z==="image"?"var(--aura-red)":"var(--text-main)",padding:"8px",borderRadius:10,fontWeight:600},onClick:()=>Ie("image"),children:[m.jsx(IC,{size:16,style:{marginRight:5,verticalAlign:"middle"}})," Фото"]}),m.jsxs("button",{style:{flex:1,background:Z==="voice"?"rgba(255,59,48,0.1)":"transparent",color:Z==="voice"?"var(--aura-red)":"var(--text-main)",padding:"8px",borderRadius:10,fontWeight:600},onClick:()=>Ie("voice"),children:[m.jsx(CC,{size:16,style:{marginRight:5,verticalAlign:"middle"}})," Голос"]})]}),"                      ",m.jsx("div",{style:{flex:1,overflowY:"auto",padding:10,display:"grid",gridTemplateColumns:Z==="image"?"1fr 1fr":"1fr",gap:10,alignContent:"start"},children:ui.filter(E=>Z==="image"?E.type==="image":E.type==="voice"||E.type==="video_circle").map(E=>Z==="image"?m.jsx("img",{src:Be(E.text),style:{width:"100%",aspectRatio:"1/1",objectFit:"cover",borderRadius:12,cursor:"pointer"},onClick:()=>window.open(E.text,"_blank"),alt:"img"},E.id):m.jsx("div",{style:{background:"var(--bg-card)",padding:10,borderRadius:12},children:E.type==="voice"?m.jsx(Ly,{src:E.text}):m.jsx(My,{msg:E})},E.id))}),"                    "]}),"              "]}),"          ",i==="settings"&&m.jsxs("div",{style:{flex:1,background:"var(--bg-main)",display:"flex",flexDirection:"column"},children:["                ",m.jsxs("div",{className:"nav-bar",children:[m.jsx("button",{onClick:()=>s("chats"),children:m.jsx(Ay,{size:32,color:"var(--text-main)"})}),m.jsx("h2",{children:"Настройки Aura"}),m.jsx("div",{style:{width:32}})]}),"                ",m.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"40px 20px",textAlign:"center"},children:[m.jsx("img",{src:Be(n==null?void 0:n.avatar),className:"avatar",style:{width:140,height:140,border:"4px solid var(--aura-red)",margin:"0 auto 20px",boxShadow:"0 10px 40px var(--aura-red-glow)",display:"block"},alt:"me"}),m.jsx("h2",{style:{fontSize:32},children:Be(n==null?void 0:n.name)}),m.jsxs("p",{style:{opacity:.5,marginBottom:40},children:["@",Be(n==null?void 0:n.username)]}),"                  ",m.jsxs("div",{style:{maxWidth:600,margin:"0 auto",display:"grid",gap:20},children:["                    ","                    ",m.jsxs("div",{style:{background:"var(--bg-card)",padding:25,borderRadius:24,border:"1px solid var(--border)",textAlign:"left"},children:["                      ",m.jsx("label",{style:{fontSize:12,textTransform:"uppercase",opacity:.6,fontWeight:800,letterSpacing:1},children:"Уведомления (iOS)"}),"                      ",m.jsx("p",{style:{fontSize:13,opacity:.7,marginTop:5},children:"Разрешите системе отправлять пуши, когда приложение свернуто."}),"                      ",m.jsxs("button",{onClick:()=>{"Notification"in window?Notification.requestPermission().then(E=>{alert(E==="granted"?"Уведомления успешно включены!":"Разрешение не получено. Проверьте настройки iOS.")}):alert("Ваш браузер/iOS пока не поддерживает системные уведомления.")},style:{width:"100%",padding:16,marginTop:15,borderRadius:16,background:"rgba(52,199,89,0.1)",color:"#34C759",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontWeight:700},children:["                        ",m.jsx(ky,{size:20})," Включить уведомления                      "]}),"                    "]}),"                    ",m.jsxs("div",{style:{background:"var(--bg-card)",padding:25,borderRadius:24,border:"1px solid var(--border)",textAlign:"left"},children:[m.jsx("label",{style:{fontSize:12,textTransform:"uppercase",opacity:.6,fontWeight:800,letterSpacing:1},children:"Оформление"}),m.jsxs("div",{style:{display:"flex",gap:10,marginTop:15},children:[m.jsx("button",{onClick:()=>{w("light"),localStorage.setItem("aura_theme","light")},style:{flex:1,padding:14,borderRadius:16,border:"1px solid var(--border)",background:y==="light"?"var(--aura-red)":"var(--bg-main)",color:y==="light"?"#fff":"var(--text-main)",fontWeight:700},children:"Light"}),m.jsx("button",{onClick:()=>{w("dark"),localStorage.setItem("aura_theme","dark")},style:{flex:1,padding:14,borderRadius:16,border:"1px solid var(--border)",background:y==="dark"?"var(--aura-red)":"var(--bg-main)",color:y==="dark"?"#fff":"var(--text-main)",fontWeight:700},children:"Dark"}),m.jsx("button",{onClick:()=>{w("mirror"),localStorage.setItem("aura_theme","mirror")},style:{flex:1,padding:14,borderRadius:16,border:"1px solid var(--border)",background:y==="mirror"?"var(--aura-red)":"var(--bg-main)",color:y==="mirror"?"#fff":"var(--text-main)",fontWeight:700},children:"Mirror"})]})]}),"                    ",m.jsxs("div",{style:{background:"var(--bg-card)",padding:25,borderRadius:24,border:"1px solid var(--border)",textAlign:"left"},children:[m.jsx("label",{style:{fontSize:12,textTransform:"uppercase",opacity:.6,fontWeight:800,letterSpacing:1},children:"Приватность"}),m.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:15},children:[m.jsx("span",{style:{fontWeight:600},children:"Показывать время захода"}),m.jsx("div",{onClick:()=>{const E=n.showLastSeen===!1;r(W=>({...W,showLastSeen:E})),it(De(ve,"artifacts",ye,"public","data","users",n.username),{showLastSeen:E,status:E?"online":Date.now(),lastActiveTS:Date.now()}).catch(console.error);const j=JSON.parse(localStorage.getItem("aura_creds")||"{}");j.showLastSeen=E,localStorage.setItem("aura_creds",JSON.stringify(j))},style:{width:50,height:28,borderRadius:14,background:n.showLastSeen!==!1?"#34C759":"rgba(255,255,255,0.1)",position:"relative",cursor:"pointer",transition:"background 0.3s ease"},children:m.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:"white",position:"absolute",top:2,left:n.showLastSeen!==!1?24:2,transition:"left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",boxShadow:"0 2px 5px rgba(0,0,0,0.2)"}})})]})]}),"                    ",m.jsxs("div",{style:{background:"var(--bg-card)",padding:25,borderRadius:24,border:"1px solid var(--border)",textAlign:"left"},children:[m.jsx("label",{style:{fontSize:12,textTransform:"uppercase",opacity:.6,fontWeight:800,letterSpacing:1},children:"Кэш и Данные"}),m.jsxs("button",{onClick:()=>{localStorage.removeItem("aura_msgs_cache"),window.location.reload()},style:{width:"100%",padding:16,marginTop:15,borderRadius:16,background:"rgba(255,59,48,0.1)",color:"#FF3B30",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontWeight:700},children:[m.jsx(EC,{size:20})," Очистить локальный кэш"]})]}),"                    ",m.jsx("button",{className:"btn-aura-action",style:{background:"#FF3B30"},onClick:()=>{localStorage.clear(),window.location.reload()},children:"ВЫЙТИ ИЗ АККАУНТА"}),"                  "]})]})]}),"          ",C&&m.jsx("div",{style:{position:"fixed",inset:0,zIndex:5e3},onClick:()=>I(null),children:m.jsx("div",{className:"context-menu",style:{top:C.rect.top,left:C.type==="msg"?C.rect.left-100:C.rect.left+50},children:C.type==="msg"?m.jsxs(m.Fragment,{children:[m.jsx("div",{style:{padding:"10px",display:"flex",gap:8,borderBottom:"1px solid var(--border)",justifyContent:"center"},children:[" ❤️ "," 👍 "," 🔥 "," 😮 "," 😡 "].map(E=>m.jsx("button",{style:{fontSize:20},onClick:()=>{it(De(ve,"artifacts",ye,"public","data","messages",C.id),{[`reactions.${n.username}`]:E}),I(null)},children:E},E))}),m.jsxs("button",{className:"context-item",onClick:()=>{jt(C.item),I(null)},children:[m.jsx(LC,{size:16})," Ответить"]}),m.jsxs("button",{className:"context-item",onClick:()=>{it(De(ve,"artifacts",ye,"public","data","messages",C.id),{isPinned:!C.item.isPinned}),I(null)},children:[m.jsx(Al,{size:16})," ",C.item.isPinned?"Открепить":"Закрепить"]}),C.item.uid===n.username&&m.jsxs("button",{className:"context-item",onClick:()=>{Ft(C.item),N(typeof C.item.text=="string"?C.item.text:""),I(null)},children:[m.jsx(NC,{size:16})," Изменить"]}),m.jsxs("button",{className:"context-item danger",onClick:()=>{it(De(ve,"artifacts",ye,"public","data","messages",C.id),{hiddenFor:Fx(n.username)}),I(null)},children:[m.jsx(Dy,{size:16})," Удалить у себя"]}),(C.item.uid===n.username||n.role==="admin")&&m.jsxs("button",{className:"context-item danger",onClick:()=>{_y(De(ve,"artifacts",ye,"public","data","messages",C.id)),I(null)},children:[m.jsx(Ny,{size:16})," Удалить у всех"]})]}):m.jsxs(m.Fragment,{children:[m.jsxs("button",{className:"context-item",onClick:()=>{kn(C.item.username),I(null)},children:[m.jsx(Al,{size:16})," ",(io=n.pinnedChats)!=null&&io.includes(C.item.username)?"Открепить диалог":"Закрепить диалог"]}),m.jsxs("button",{className:"context-item danger",onClick:()=>{no(C.item.username,!1),I(null)},children:[m.jsx(Dy,{size:16})," Удалить у себя"]}),m.jsxs("button",{className:"context-item danger",onClick:()=>{no(C.item.username,!0),I(null)},children:[m.jsx(Ny,{size:16})," Удалить у обоих"]})]})})}),de&&m.jsxs("div",{className:`call-overlay ${je?"minimized":""}`,onClick:()=>je&&Fe(!1),children:[je?m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#34C759",padding:"10px 20px",borderRadius:30,color:"white",fontWeight:600,boxShadow:"0 10px 25px rgba(52,199,89,0.4)"},children:[m.jsx(by,{size:20,className:"animate-pulse"}),m.jsx("span",{children:de.status==="active"?`${Math.floor(hr/60).toString().padStart(2,"0")}:${(hr%60).toString().padStart(2,"0")}`:"Звонок..."}),m.jsx(kC,{size:18,style:{marginLeft:10}})]}):m.jsxs(m.Fragment,{children:[m.jsx("button",{onClick:E=>{E.stopPropagation(),Fe(!0)},style:{position:"absolute",top:"calc(20px + env(safe-area-inset-top))",left:20,zIndex:50,background:"rgba(255,255,255,0.15)",padding:12,borderRadius:"50%",border:"none",cursor:"pointer",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:m.jsx(RC,{color:"white",size:24})}),m.jsx("div",{className:"call-bg-blob"}),(!Oa||de.type!=="video"||de.status==="calling")&&m.jsxs("div",{className:"call-header-glass",children:[m.jsx("div",{className:`call-avatar-wrapper ${de.status==="calling"?"calling":""}`,children:m.jsx("img",{src:((Ba=de.peer)==null?void 0:Ba.avatar)||`https://api.dicebear.com/7.x/initials/svg?seed=${Be(de.caller)}`,className:"call-avatar-pulse",alt:"avatar"})}),m.jsx("h2",{style:{fontSize:26,fontWeight:800,margin:0,zIndex:2},children:Be(((hi=de.peer)==null?void 0:hi.name)||de.caller)}),m.jsx("div",{className:"call-status-text",children:de.status==="active"?`${Math.floor(hr/60).toString().padStart(2,"0")}:${(hr%60).toString().padStart(2,"0")}`:de.isInitiator?"Исходящий вызов...":"Входящий звонок..."})]}),m.jsxs("div",{className:"call-controls",children:[m.jsx("button",{className:"btn-call",onClick:E=>{E.stopPropagation(),to()},style:{background:In.micMuted?"#FF3B30":"rgba(255,255,255,0.15)"},children:In.micMuted?m.jsx(AC,{color:"white",size:22}):m.jsx(Py,{color:"white",size:22})}),de.type==="video"&&m.jsx("button",{className:"btn-call",onClick:E=>{E.stopPropagation(),Hi()},style:{background:In.screenShare?"var(--aura-red)":"rgba(255,255,255,0.15)"},children:m.jsx(xC,{color:"white",size:22})}),!de.isInitiator&&de.status==="calling"&&m.jsx("button",{onClick:E=>{E.stopPropagation(),qi()},className:"btn-call",style:{background:"#34C759"},children:m.jsx(kl,{color:"white",size:26})}),m.jsx("button",{onClick:E=>{E.stopPropagation(),yr()},className:"btn-call",style:{background:"#FF3B30"},children:m.jsx(VC,{color:"white",size:26})})]})]}),m.jsx("video",{ref:Jt,className:"call-video-main",autoPlay:!0,playsInline:!0,style:{display:je?"none":"block"}}),m.jsx("video",{ref:bt,className:"call-video-pip",autoPlay:!0,playsInline:!0,muted:!0,style:{display:je?"none":"block"}})]}),"          ",ge&&m.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:2e5,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:["            ",m.jsxs("div",{style:{display:"flex",alignItems:"center",gap:15,marginBottom:20},children:["              ",m.jsx("div",{style:{width:16,height:16,background:"#FF3B30",borderRadius:"50%",animation:"pulse 1s infinite"}}),"              ",m.jsxs("span",{style:{fontSize:40,fontWeight:800},children:[Math.floor(Qt/60),":",(Qt%60).toString().padStart(2,"0")]}),"            "]}),"            ",ge==="video"&&m.jsx("div",{className:"circle-video",style:{marginBottom:30,width:280,height:280},children:m.jsx("video",{ref:E=>{var j;E&&(E.srcObject=(j=St.current)==null?void 0:j.stream)},autoPlay:!0,muted:!0,style:{width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)"}})}),"            ",m.jsxs("div",{style:{display:"flex",gap:30},children:["              ",m.jsx("button",{onClick:()=>{Fa(!0)},style:{background:"rgba(255,255,255,0.1)",color:"white",padding:"16px 40px",borderRadius:25,fontWeight:700},children:"ОТМЕНА"}),"              ",m.jsx("button",{onClick:()=>Fa(!1),style:{background:"var(--aura-red)",color:"white",padding:"16px 50px",borderRadius:25,fontWeight:800},children:"ОТПРАВИТЬ"}),"            "]}),"          "]}),"          ",S&&m.jsx(GC,{data:S,onClose:()=>x(null),onClick:()=>{l(u.find(E=>E.username===S.uid)),s("chats"),x(null)}}),"        "]}),"      "]})}function XC(){return m.jsx(qC,{children:m.jsx(QC,{})})}mh.createRoot(document.getElementById("root")).render(m.jsx(GE.StrictMode,{children:m.jsx(XC,{})}));
