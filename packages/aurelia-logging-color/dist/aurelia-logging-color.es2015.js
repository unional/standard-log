!function(n){"use strict";function t(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(n){if(A===setTimeout)return setTimeout(n,0);if((A===t||!A)&&setTimeout)return A=setTimeout,setTimeout(n,0);try{return A(n,0)}catch(t){try{return A.call(null,n,0)}catch(t){return A.call(this,n,0)}}}function r(n){if(M===clearTimeout)return clearTimeout(n);if((M===o||!M)&&clearTimeout)return M=clearTimeout,clearTimeout(n);try{return M(n)}catch(t){try{return M.call(null,n)}catch(t){return M.call(this,n)}}}function e(){k&&E&&(k=!1,E.length?L=E.concat(L):N=-1,L.length&&u())}function u(){if(!k){var n=i(e);k=!0;for(var t=L.length;t;){for(E=L,L=[];++N<t;)E&&E[N].run();N=-1,t=L.length}E=null,k=!1,r(n)}}function s(n){var t=new Array(arguments.length-1);if(arguments.length>1)for(var o=1;o<arguments.length;o++)t[o-1]=arguments[o];L.push(new c(n,t)),1!==L.length||k||i(u)}function c(n,t){this.fun=n,this.array=t}function a(){}function f(n){throw new Error("process.binding is not supported")}function l(){return"/"}function h(n){throw new Error("process.chdir is not supported")}function p(){return 0}function g(n){var t=.001*U.call(Q),o=Math.floor(t),i=Math.floor(t%1*1e9);return n&&(o-=n[0],i-=n[1],i<0&&(o--,i+=1e9)),[o,i]}function m(){var n=new Date,t=n-W;return t/1e3}function d(){return"undefined"!=typeof C.navigator?C.navigator.appVersion:""}function w(n,t,o,i){const r=[],e=[...n],u=[t[0]-n[0],t[1]-n[1],t[2]-n[2]];i&&(e.push(i[0]),u.push(i[1]-i[0]));for(let s=0;s<o;s++){const n=1/Math.max(o-1,1),t=[Math.round(e[0]+s*u[0]*n),Math.round(e[1]+s*u[1]*n),Math.round(e[2]+s*u[2]*n),i?e[3]+s*u[3]*n:1];r.push(t)}return r}function x(n,t,o){if(t<n.length)throw new Error(`Requires at least ${n.length} shades.`);const i=[],r=[];for(let e=0;e<n.length;e++)r.push(Math.round(n[e].index*t));for(let e=0;e<n.length-1;e++){const t=r[e+1]-r[e],u=n[e].rgb,s=n[e+1].rgb;i.push(...w(u,s,t,o))}return i}function b(n){let t="#";for(let o=0;o<3;o++)t+=v(n[o]);return t}function v(n){let t=(+n).toString(16);return t.length<2?"0"+t:t}function T(){let n=ln.map(n=>[n]);n.push(...ln.map(n=>[n,31])),n.push(...ln.map(n=>[n,32])),n.push(...ln.map(n=>[n,33])),n.push(...ln.map(n=>[n,34])),n.push(...ln.map(n=>[n,35])),n.push(...ln.map(n=>[n,36])),n=n.filter(n=>1===n.length||n[0]!==n[1]+10);const t=n.map(n=>[...n,1]),o=n.map(n=>[...n,2]),i=n.map(n=>[...n,4]);return[...n,...t,...o,...i]}function y(n={}){const t=void 0!==n.css?n.css:en,o=void 0!==n.ansi16m?n.ansi16m:sn,i=void 0!==n.ansi?n.ansi:un;return t?new pn(n):o?new an(n):i?new fn(n):new gn}var C="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},A=t,M=o;"function"==typeof C.setTimeout&&(A=setTimeout),"function"==typeof C.clearTimeout&&(M=clearTimeout);var E,L=[],k=!1,N=-1;c.prototype.run=function(){this.fun.apply(null,this.array)};var D="browser",R="browser",I=!0,S={},j=[],z="",B={},G={},V={},q=a,F=a,H=a,J=a,K=a,O=a,P=a,Q=C.performance||{},U=Q.now||Q.mozNow||Q.msNow||Q.oNow||Q.webkitNow||function(){return(new Date).getTime()},W=new Date,X={nextTick:s,title:D,browser:I,env:S,argv:j,version:z,versions:B,on:q,addListener:F,once:H,off:J,removeListener:K,removeAllListeners:O,emit:P,binding:f,cwd:l,chdir:h,umask:p,hrtime:g,platform:R,release:G,config:V,uptime:m};const Y="undefined"!=typeof navigator?navigator.userAgent:void 0,Z="undefined"!=typeof navigator?navigator.vendor:void 0,$="undefined"!=typeof X?X.platform:void 0,_=parseInt(d().split(".")[0],10),nn=!(!Y||!Z)&&(/Chrome/.test(Y)&&/Google Inc/.test(Z)),tn=!!Y&&/firefox/i.test(Y),on="undefined"!=typeof module&&module.exports,rn=!!$&&/^win/.test($),en=nn||tn,un=on&&(!rn||_<=6),sn=on&&(!rn||_>6),cn=[{index:0,rgb:[150,0,90]},{index:.125,rgb:[0,0,200]},{index:.25,rgb:[0,25,255]},{index:.375,rgb:[0,152,255]},{index:.5,rgb:[44,255,150]},{index:.625,rgb:[151,255,0]},{index:.75,rgb:[255,234,0]},{index:.875,rgb:[255,111,0]},{index:1,rgb:[255,0,0]}];class an{constructor(n={}){this.count=0,this.map={},this.option={maxColor:n.maxColor||20,coloringText:n.coloringText||!1};const t=this.option.coloringText?cn:cn.map(n=>{return{index:n.index,rgb:[n.rgb[0],.7*n.rgb[1],n.rgb[2]]}});this.colors=x(t,n.maxColor||20),this.color=this.option.coloringText?this.colorAnsi16m:this.getAnsi16mBackgroundString}getRgb(n){return this.map[n]=this.map[n]||this.colors[this.count++%this.option.maxColor]}colorAnsi16m(n,...t){const o=this.getRgb(n);return[this.wrapAnsi16m(n,o),...t]}getAnsi16mBackgroundString(n,...t){const o=this.getRgb(n);return[this.wrapAnsi16m(` ${n} `,o,10),...t]}wrapAnsi16m(n,t,o=0){return`[${38+o};2;${t[0]};${t[1]};${t[2]}m`+n+`[${39+o}m`}}class fn{constructor(n={}){this.count=0,this.map={},this.codes=hn=hn||T(),this.option={maxColor:n.maxColor||this.codes.length,coloringText:n.coloringText||!1}}color(n,...t){const o=this.getCodes(n);return[this.wrapAnsi(n,o),...t]}getCodes(n){return this.map[n]=this.map[n]||this.codes[this.count++%this.option.maxColor]}wrapAnsi(n,t){const o=t.join(";");return t.some(n=>n>40)&&(n=` ${n} `),`[${o}m${n}[0m`}}const ln=[41,42,43,44,45,46];let hn;class pn{constructor(n={}){this.count=0,this.map={},this.option={maxColor:n.maxColor||20,coloringText:n.coloringText||!1},this.colors=x(cn,n.maxColor||20)}color(n,...t){const o=this.getRgb(n),i=b(o),r=b(o.map(n=>Math.max(0,n-32))),e=o.every(n=>n<220)?"#ffffff":"#000000";return[`%c ${n} `,`padding: 2px; margin: 2px; line-height: 1.8em;background: ${i};bother: 1px solid ${r};color: ${e};`,...t]}getRgb(n){return this.map[n]=this.map[n]||this.colors[this.count++%this.option.maxColor]}}class gn{color(n,...t){return[n,...t]}}class mn{constructor(n){this.brush=y(n)}error(n,...t){console.error.apply(console,this.brush.color(n.id,...t))}warn(n,...t){console.warn.apply(console,this.brush.color(n.id,...t))}info(n,...t){console.info.apply(console,this.brush.color(n.id,...t))}debug(n,...t){(console.debug||console.log).apply(console,this.brush.color(n.id,...t))}}n.ColorAppender=mn}(this.AureliaLoggingColor=this.AureliaLoggingColor||{});
//# sourceMappingURL=aurelia-logging-color.es2015.js.map