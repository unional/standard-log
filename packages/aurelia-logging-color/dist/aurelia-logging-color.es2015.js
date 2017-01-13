!function(n,o){"use strict";function t(){throw new Error("setTimeout has not been defined")}function e(){throw new Error("clearTimeout has not been defined")}function i(n){if(T===setTimeout)return setTimeout(n,0);if((T===t||!T)&&setTimeout)return T=setTimeout,setTimeout(n,0);try{return T(n,0)}catch(o){try{return T.call(null,n,0)}catch(o){return T.call(this,n,0)}}}function r(n){if(y===clearTimeout)return clearTimeout(n);if((y===e||!y)&&clearTimeout)return y=clearTimeout,clearTimeout(n);try{return y(n)}catch(o){try{return y.call(null,n)}catch(o){return y.call(this,n)}}}function s(){M&&C&&(M=!1,C.length?A=C.concat(A):L=-1,A.length&&u())}function u(){if(!M){var n=i(s);M=!0;for(var o=A.length;o;){for(C=A,A=[];++L<o;)C&&C[L].run();L=-1,o=A.length}C=null,M=!1,r(n)}}function c(n){var o=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)o[t-1]=arguments[t];A.push(new a(n,o)),1!==A.length||M||i(u)}function a(n,o){this.fun=n,this.array=o}function f(){}function l(n){throw new Error("process.binding is not supported")}function h(){return"/"}function p(n){throw new Error("process.chdir is not supported")}function m(){return 0}function g(n){var o=.001*O.call(K),t=Math.floor(o),e=Math.floor(o%1*1e9);return n&&(t-=n[0],e-=n[1],e<0&&(t--,e+=1e9)),[t,e]}function d(){var n=new Date,o=n-P;return o/1e3}function w(){return"undefined"!=typeof v.navigator?v.navigator.appVersion:""}function x(){let n=cn.map(n=>[n]);n.push(...cn.map(n=>[n,31])),n.push(...cn.map(n=>[n,32])),n.push(...cn.map(n=>[n,33])),n.push(...cn.map(n=>[n,34])),n.push(...cn.map(n=>[n,35])),n.push(...cn.map(n=>[n,36])),n=n.filter(n=>1===n.length||n[0]!==n[1]+10);const o=n.map(n=>[...n,1]),t=n.map(n=>[...n,2]),e=n.map(n=>[...n,4]);return[...n,...o,...t,...e]}function b(n={}){const o=void 0!==n.css?n.css:on,t=void 0!==n.ansi16m?n.ansi16m:en,e=void 0!==n.ansi?n.ansi:tn;return o?new fn(n):t?new sn(n):e?new un(n):new ln}var v="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},T=t,y=e;"function"==typeof v.setTimeout&&(T=setTimeout),"function"==typeof v.clearTimeout&&(y=clearTimeout);var C,A=[],M=!1,L=-1;a.prototype.run=function(){this.fun.apply(null,this.array)};var k="browser",E="browser",N=!0,D={},R=[],F="",H={},I={},j={},z=f,B=f,G=f,S=f,V=f,q=f,J=f,K=v.performance||{},O=K.now||K.mozNow||K.msNow||K.oNow||K.webkitNow||function(){return(new Date).getTime()},P=new Date,Q={nextTick:c,title:k,browser:N,env:D,argv:R,version:F,versions:H,on:z,addListener:B,once:G,off:S,removeListener:V,removeAllListeners:q,emit:J,binding:l,cwd:h,chdir:p,umask:m,hrtime:g,platform:E,release:I,config:j,uptime:d};const U="undefined"!=typeof navigator?navigator.userAgent:void 0,W="undefined"!=typeof navigator?navigator.vendor:void 0,X="undefined"!=typeof Q?Q.platform:void 0,Y=parseInt(w().split(".")[0],10),Z=!(!U||!W)&&(/Chrome/.test(U)&&/Google Inc/.test(W)),$=!!U&&/firefox/i.test(U),_="undefined"!=typeof module&&module.exports,nn=!!X&&/^win/.test(X),on=Z||$,tn=_&&(!nn||Y<=6),en=_&&(!nn||Y>6),rn=[{index:0,rgb:[150,0,90]},{index:.125,rgb:[0,0,200]},{index:.25,rgb:[0,25,255]},{index:.375,rgb:[0,152,255]},{index:.5,rgb:[44,255,150]},{index:.625,rgb:[151,255,0]},{index:.75,rgb:[255,234,0]},{index:.875,rgb:[255,111,0]},{index:1,rgb:[255,0,0]}];class sn{constructor(n={}){this.count=0,this.map={},this.option={maxColor:n.maxColor||20,coloringText:n.coloringText||!1};const t=this.option.coloringText?rn:rn.map(n=>{return{index:n.index,rgb:[n.rgb[0],.7*n.rgb[1],n.rgb[2]]}});this.colors=o.createColorsFromMap(t,n.maxColor||20),this.color=this.option.coloringText?this.colorAnsi16m:this.getAnsi16mBackgroundString}getRgb(n){return this.map[n]=this.map[n]||this.colors[this.count++%this.option.maxColor]}colorAnsi16m(n,...o){const t=this.getRgb(n);return[this.wrapAnsi16m(n,t),...o]}getAnsi16mBackgroundString(n,...o){const t=this.getRgb(n);return[this.wrapAnsi16m(` ${n} `,t,10),...o]}wrapAnsi16m(n,o,t=0){return`[${38+t};2;${o[0]};${o[1]};${o[2]}m`+n+`[${39+t}m`}}class un{constructor(n={}){this.count=0,this.map={},this.codes=an=an||x(),this.option={maxColor:n.maxColor||this.codes.length,coloringText:n.coloringText||!1}}color(n,...o){const t=this.getCodes(n);return[this.wrapAnsi(n,t),...o]}getCodes(n){return this.map[n]=this.map[n]||this.codes[this.count++%this.option.maxColor]}wrapAnsi(n,o){const t=o.join(";");return o.some(n=>n>40)&&(n=` ${n} `),`[${t}m${n}[0m`}}const cn=[41,42,43,44,45,46];let an;class fn{constructor(n={}){this.count=0,this.map={},this.option={maxColor:n.maxColor||20,coloringText:n.coloringText||!1},this.colors=o.createColorsFromMap(rn,n.maxColor||20)}color(n,...t){const e=this.getRgb(n),i=o.rgbHex(e),r=o.rgbHex(e.map(n=>Math.max(0,n-32))),s=e.every(n=>n<220)?"#ffffff":"#000000";return[`%c ${n} `,`padding: 2px; margin: 2px; line-height: 1.8em;background: ${i};bother: 1px solid ${r};color: ${s};`,...t]}getRgb(n){return this.map[n]=this.map[n]||this.colors[this.count++%this.option.maxColor]}}class ln{color(n,...o){return[n,...o]}}class hn{constructor(n){this.brush=b(n)}error(n,...o){console.error.apply(console,this.brush.color(n.id,...o))}warn(n,...o){console.warn.apply(console,this.brush.color(n.id,...o))}info(n,...o){console.info.apply(console,this.brush.color(n.id,...o))}debug(n,...o){(console.debug||console.log).apply(console,this.brush.color(n.id,...o))}}n.ColorAppender=hn}(this.AureliaLoggingColor=this.AureliaLoggingColor||{},ColorMap);
//# sourceMappingURL=aurelia-logging-color.es2015.js.map
