(()=>{var e={9669:(e,t,r)=>{e.exports=r(1609)},5448:(e,t,r)=>{"use strict";var n=r(4867),o=r(6026),a=r(4372),i=r(5327),s=r(4097),u=r(4109),c=r(7985),l=r(5061);e.exports=function(e){return new Promise((function(t,r){var d=e.data,f=e.headers;n.isFormData(d)&&delete f["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(h+":"+m)}var A=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),i(A,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?u(p.getAllResponseHeaders()):null,a={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:e,request:p};o(t,r,a),p=null}},p.onabort=function(){p&&(r(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){r(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var v=(e.withCredentials||c(A))&&e.xsrfCookieName?a.read(e.xsrfCookieName):void 0;v&&(f[e.xsrfHeaderName]=v)}if("setRequestHeader"in p&&n.forEach(f,(function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete f[t]:p.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),r(e),p=null)})),d||(d=null),p.send(d)}))}},1609:(e,t,r)=>{"use strict";var n=r(4867),o=r(1849),a=r(321),i=r(7185);function s(e){var t=new a(e),r=o(a.prototype.request,t);return n.extend(r,a.prototype,t),n.extend(r,t),r}var u=s(r(6419));u.Axios=a,u.create=function(e){return s(i(u.defaults,e))},u.Cancel=r(5263),u.CancelToken=r(4972),u.isCancel=r(6502),u.all=function(e){return Promise.all(e)},u.spread=r(8713),u.isAxiosError=r(6268),e.exports=u,e.exports.default=u},5263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},4972:(e,t,r)=>{"use strict";var n=r(5263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},6502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(4867),o=r(5327),a=r(782),i=r(3572),s=r(7185);function u(e){this.defaults=e,this.interceptors={request:new a,response:new a}}u.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},u.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){u.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){u.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=u},782:(e,t,r)=>{"use strict";var n=r(4867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},4097:(e,t,r)=>{"use strict";var n=r(9699),o=r(7303);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},5061:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,o,a){var i=new Error(e);return n(i,t,r,o,a)}},3572:(e,t,r)=>{"use strict";var n=r(4867),o=r(8527),a=r(6502),i=r(6419);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},7185:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],a=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function u(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function c(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=u(void 0,e[o])):r[o]=u(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=u(void 0,t[e]))})),n.forEach(a,c),n.forEach(i,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=u(void 0,e[o])):r[o]=u(void 0,t[o])})),n.forEach(s,(function(n){n in t?r[n]=u(e[n],t[n]):n in e&&(r[n]=u(void 0,e[n]))}));var l=o.concat(a).concat(i).concat(s),d=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(d,c),r}},6026:(e,t,r)=>{"use strict";var n=r(5061);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},8527:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},6419:(e,t,r)=>{"use strict";var n=r(4867),o=r(6016),a={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,u={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=r(5448)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){u.headers[e]=n.merge(a)})),e.exports=u},1849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},5327:(e,t,r)=>{"use strict";var n=r(4867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var a;if(r)a=r(t);else if(n.isURLSearchParams(t))a=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),a=i.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},7303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},4372:(e,t,r)=>{"use strict";var n=r(4867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},9699:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},6268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},7985:(e,t,r)=>{"use strict";var n=r(4867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},6016:(e,t,r)=>{"use strict";var n=r(4867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},4109:(e,t,r)=>{"use strict";var n=r(4867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,a,i={};return e?(n.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=n.trim(e.substr(0,a)).toLowerCase(),r=n.trim(e.substr(a+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},8713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},4867:(e,t,r)=>{"use strict";var n=r(1849),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function u(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function c(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:u,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):a(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},1599:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(4015),o=r.n(n),a=r(3645),i=r.n(a)()(o());i.push([e.id,"* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.teacherForm {\r\n    display: grid;\r\n    grid-template-rows: auto;\r\n    place-items: center;\r\n}\r\n\r\n.teacherForm__select {\r\n    width: 25vw;\r\n    margin-top: 3vh;\r\n    margin-bottom: 3vh;\r\n}\r\n\r\n#wrapper {\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n.teacherForm__inputName, .teacherForm__inputTitle, .contact__container__form__submit {\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    width: 50vw;\r\n    height: 10vh;\r\n    padding: 0px 15px 0px 15px;\r\n    \r\n    background: transparent;\r\n    outline: none;\r\n    color: #000;\r\n    \r\n    border: solid 1px #000;\r\n    border-bottom: none;\r\n    \r\n    transition: all 0.3s ease-in-out;\r\n    -webkit-transition: all 0.3s ease-in-out;\r\n    -moz-transition: all 0.3s ease-in-out;\r\n    -ms-transition: all 0.3s ease-in-out;\r\n}\r\n  \r\n.teacherForm__inputName:hover, .teacherForm__inputTitle:hover, .teacherForm__submit:hover  {\r\n    background: #b3aca7;\r\n    color: #e2dedb;\r\n}\r\n  \r\n.teacherForm__message {\r\n    width: 50vw;\r\n    height: 25vh;\r\n    padding: 15px;\r\n    \r\n    background: transparent;\r\n    outline: none;\r\n    \r\n    color: #000;\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    \r\n    border: solid 1px #000;\r\n    \r\n    transition: all 0.3s ease-in-out;\r\n    -webkit-transition: all 0.3s ease-in-out;\r\n    -moz-transition: all 0.3s ease-in-out;\r\n    -ms-transition: all 0.3s ease-in-out;\r\n}\r\n  \r\n.teacherForm__message:hover {\r\n    background: #b3aca7;\r\n    color: #e2dedb;\r\n}\r\n  \r\n.teacherForm__inputDate {\r\n    width: 100%;\r\n    height: 10vh;\r\n    color: #000;\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    \r\n    border: solid 1px #000;\r\n    border-top: none;\r\n}\r\n\r\n.teacherForm__submit {\r\n    width: 50vw;\r\n    height: 10vh;\r\n    padding: 0;\r\n    margin: -5px 0px 0px 0px;\r\n    \r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    color: #000;\r\n    background-color: #fff;\r\n    outline:none;\r\n    cursor: pointer;\r\n    \r\n    border: solid 1px #000;\r\n}\r\n  \r\n.teacherForm__submit:hover {\r\n    color: #e2dedb;\r\n}","",{version:3,sources:["webpack://./src/assets/css/announcementsTeacher.css"],names:[],mappings:"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,wBAAwB;IACxB,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,+BAA+B;IAC/B,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,0BAA0B;;IAE1B,uBAAuB;IACvB,aAAa;IACb,WAAW;;IAEX,sBAAsB;IACtB,mBAAmB;;IAEnB,gCAAgC;IAChC,wCAAwC;IACxC,qCAAqC;IACrC,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;;IAEb,uBAAuB;IACvB,aAAa;;IAEb,WAAW;IACX,+BAA+B;IAC/B,kBAAkB;;IAElB,sBAAsB;;IAEtB,gCAAgC;IAChC,wCAAwC;IACxC,qCAAqC;IACrC,oCAAoC;AACxC;;AAEA;IACI,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,WAAW;IACX,+BAA+B;IAC/B,kBAAkB;;IAElB,sBAAsB;IACtB,gBAAgB;AACpB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,UAAU;IACV,wBAAwB;;IAExB,+BAA+B;IAC/B,kBAAkB;IAClB,WAAW;IACX,sBAAsB;IACtB,YAAY;IACZ,eAAe;;IAEf,sBAAsB;AAC1B;;AAEA;IACI,cAAc;AAClB",sourcesContent:["* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.teacherForm {\r\n    display: grid;\r\n    grid-template-rows: auto;\r\n    place-items: center;\r\n}\r\n\r\n.teacherForm__select {\r\n    width: 25vw;\r\n    margin-top: 3vh;\r\n    margin-bottom: 3vh;\r\n}\r\n\r\n#wrapper {\r\n    display: grid;\r\n    place-items: center;\r\n}\r\n\r\n.teacherForm__inputName, .teacherForm__inputTitle, .contact__container__form__submit {\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    width: 50vw;\r\n    height: 10vh;\r\n    padding: 0px 15px 0px 15px;\r\n    \r\n    background: transparent;\r\n    outline: none;\r\n    color: #000;\r\n    \r\n    border: solid 1px #000;\r\n    border-bottom: none;\r\n    \r\n    transition: all 0.3s ease-in-out;\r\n    -webkit-transition: all 0.3s ease-in-out;\r\n    -moz-transition: all 0.3s ease-in-out;\r\n    -ms-transition: all 0.3s ease-in-out;\r\n}\r\n  \r\n.teacherForm__inputName:hover, .teacherForm__inputTitle:hover, .teacherForm__submit:hover  {\r\n    background: #b3aca7;\r\n    color: #e2dedb;\r\n}\r\n  \r\n.teacherForm__message {\r\n    width: 50vw;\r\n    height: 25vh;\r\n    padding: 15px;\r\n    \r\n    background: transparent;\r\n    outline: none;\r\n    \r\n    color: #000;\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    \r\n    border: solid 1px #000;\r\n    \r\n    transition: all 0.3s ease-in-out;\r\n    -webkit-transition: all 0.3s ease-in-out;\r\n    -moz-transition: all 0.3s ease-in-out;\r\n    -ms-transition: all 0.3s ease-in-out;\r\n}\r\n  \r\n.teacherForm__message:hover {\r\n    background: #b3aca7;\r\n    color: #e2dedb;\r\n}\r\n  \r\n.teacherForm__inputDate {\r\n    width: 100%;\r\n    height: 10vh;\r\n    color: #000;\r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    \r\n    border: solid 1px #000;\r\n    border-top: none;\r\n}\r\n\r\n.teacherForm__submit {\r\n    width: 50vw;\r\n    height: 10vh;\r\n    padding: 0;\r\n    margin: -5px 0px 0px 0px;\r\n    \r\n    font-family: 'Lato', sans-serif;\r\n    font-size: 0.875em;\r\n    color: #000;\r\n    background-color: #fff;\r\n    outline:none;\r\n    cursor: pointer;\r\n    \r\n    border: solid 1px #000;\r\n}\r\n  \r\n.teacherForm__submit:hover {\r\n    color: #e2dedb;\r\n}"],sourceRoot:""}]);const s=i},3645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r=e(t);return t[2]?"@media ".concat(t[2]," {").concat(r,"}"):r})).join("")},t.i=function(e,r,n){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(n)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);n&&o[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),t.push(u))}},t}},4015:e=>{"use strict";function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}e.exports=function(e){var r,n,o=(n=4,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw a}}return r}}(r,n)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[1],i=o[3];if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),c="/*# ".concat(u," */"),l=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[a].concat(l).concat([c]).join("\n")}return[a].join("\n")}},1270:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(3379),o=r.n(n),a=r(1599);o()(a.Z,{insert:"head",singleton:!1});const i=a.Z.locals||{}},3379:(e,t,r)=>{"use strict";var n,o=function(){var e={};return function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[t]=r}return e[t]}}(),a=[];function i(e){for(var t=-1,r=0;r<a.length;r++)if(a[r].identifier===e){t=r;break}return t}function s(e,t){for(var r={},n=[],o=0;o<e.length;o++){var s=e[o],u=t.base?s[0]+t.base:s[0],c=r[u]||0,l="".concat(u," ").concat(c);r[u]=c+1;var d=i(l),f={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(a[d].references++,a[d].updater(f)):a.push({identifier:l,updater:m(f,t),references:1}),n.push(l)}return n}function u(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var a=r.nc;a&&(n.nonce=a)}if(Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])})),"function"==typeof e.insert)e.insert(t);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var c,l=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function d(e,t,r,n){var o=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(e.styleSheet)e.styleSheet.cssText=l(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function f(e,t,r){var n=r.css,o=r.media,a=r.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var p=null,h=0;function m(e,t){var r,n,o;if(t.singleton){var a=h++;r=p||(p=u(t)),n=d.bind(null,r,a,!1),o=d.bind(null,r,a,!0)}else r=u(t),n=f.bind(null,r,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var r=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var n=0;n<r.length;n++){var o=i(r[n]);a[o].references--}for(var u=s(e,t),c=0;c<r.length;c++){var l=i(r[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}r=u}}}},101:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(1909)),a=n(r(5638)),i=n(r(2956));r(1270);var s=document.querySelector(".teacherFormContainer"),u=o.default();null==s||s.appendChild(u),null==u||u.addEventListener("submit",(function(e){e.preventDefault();var t=a.default();i.default.post("announcements.json",t).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}))},5638:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=document.querySelector(".teacherForm__select").value,t=document.querySelector(".teacherForm__inputName").value,r=document.querySelector(".teacherForm__inputTitle").value,n=document.querySelector(".teacherForm__message").value,o=Date.now().valueOf();return"exam"===e?{type:e,name:t,title:r,message:n,date:document.querySelector(".teacherForm__inputDate").value,timestamp:o}:{type:e,name:t,title:r,message:n,timestamp:o}}},1909:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=document.createElement("form");e.setAttribute("method","post"),e.setAttribute("class","teacherForm");var t=document.createElement("select");t.setAttribute("class","teacherForm__select"),["Please select type","Important","Normal","Exam"].forEach((function(e){var r=document.createElement("option");r.setAttribute("class","teacherForm__select__option"),r.innerHTML=e,r.setAttribute("value",""+e.toLowerCase()),t.appendChild(r)}));var r=document.createElement("div");r.setAttribute("id","wrapper");var n=document.createElement("p");function o(e){var t=document.createElement("div");if("selectType"==e){var r=document.createElement("p");return r.setAttribute("class","teacherForm__defaultText"),r.innerHTML="Please select the type of announcement",t.appendChild(r),t}var n=document.createElement("input");n.setAttribute("type","text"),n.setAttribute("placeholder","Your full name"),n.setAttribute("class","teacherForm__inputName"),n.setAttribute("required","true");var o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("placeholder","Your title of announcement"),o.setAttribute("class","teacherForm__inputTitle"),o.setAttribute("required","true");var a=document.createElement("textarea");a.setAttribute("placeholder","text here"),a.setAttribute("class","teacherForm__message"),a.setAttribute("required","true");var i=document.createElement("input");if(i.setAttribute("type","submit"),i.setAttribute("value","Submit"),i.setAttribute("class","teacherForm__submit"),t.setAttribute("id","wrapper"),t.appendChild(n),t.appendChild(o),t.appendChild(a),"exam"===e){var s=document.createElement("input");s.setAttribute("type","date"),s.setAttribute("placeholder","Enter the date"),s.setAttribute("class","teacherForm__inputDate"),s.setAttribute("required","true"),t.appendChild(s)}return t.appendChild(i),t}return n.setAttribute("class","teacherForm__defaultText"),n.innerHTML="Please select the type of announcement",r.appendChild(n),e.appendChild(t),e.appendChild(r),t.addEventListener("change",(function(){"important"===this.value?(e.removeChild(e.childNodes[1]),e.appendChild(o("important"))):"exam"===this.value?(e.removeChild(e.childNodes[1]),e.appendChild(o("exam"))):"normal"===this.value?(e.removeChild(e.childNodes[1]),e.appendChild(o("normal"))):(e.removeChild(e.childNodes[1]),e.appendChild(o("selectType")))})),e}},2956:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(9669)).default.create({baseURL:"https://gradebook-395ff-default-rtdb.firebaseio.com/"});t.default=o}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={id:n,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(101)})();
//# sourceMappingURL=announcementsTeacher.js.map