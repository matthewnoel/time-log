var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function r(){return Object.create(null)}function s(t){t.forEach(o)}function i(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function u(t){return null==t?"":t}function a(t){const e="string"==typeof t&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}const f="undefined"!=typeof window;let d=f?()=>window.performance.now():()=>Date.now(),h=f?t=>requestAnimationFrame(t):t;const p=new Set;function m(t){p.forEach((e=>{e.c(t)||(p.delete(e),e.f())})),0!==p.size&&h(m)}function g(t){let e;return 0===p.size&&h(m),{promise:new Promise((n=>{p.add(e={c:t,f:n})})),abort(){p.delete(e)}}}function $(t,e){t.appendChild(e)}function y(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function v(t){const e=k("style");return function(t,e){$(t.head||t,e),e.sheet}(y(t),e),e.sheet}function b(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode&&t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function _(){return x(" ")}function E(){return x("")}function C(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function L(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function A(t,e){e=""+e,t.data!==e&&(t.data=e)}function T(t,e){t.value=null==e?"":e}function N(t,e,n){t.classList[n?"add":"remove"](e)}class S{constructor(t=!1){this.is_svg=!1,this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,e,n=null){var o;this.e||(this.is_svg?this.e=(o=e.nodeName,document.createElementNS("http://www.w3.org/2000/svg",o)):this.e=k(11===e.nodeType?"TEMPLATE":e.nodeName),this.t="TEMPLATE"!==e.tagName?e:e.content,this.c(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from("TEMPLATE"===this.e.nodeName?this.e.content.childNodes:this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)b(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(w)}}function M(t,e){return new t(e)}const j=new Map;let O,D=0;function q(t,e,n,o,r,s,i,c=0){const l=16.666/o;let u="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*s(t);u+=100*t+`%{${i(o,1-o)}}\n`}const a=u+`100% {${i(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${c}`,d=y(t),{stylesheet:h,rules:p}=j.get(d)||function(t,e){const n={stylesheet:v(e),rules:{}};return j.set(t,n),n}(d,t);p[f]||(p[f]=!0,h.insertRule(`@keyframes ${f} ${a}`,h.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${f} ${o}ms linear ${r}ms 1 both`,D+=1,f}function P(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),D-=r,D||h((()=>{D||(j.forEach((t=>{const{ownerNode:e}=t.stylesheet;e&&w(e)})),j.clear())})))}function z(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),r="none"===o.transform?"":o.transform;t.style.transform=`${r} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function R(t){O=t}function B(){if(!O)throw new Error("Function called outside component initialization");return O}const I=[],F=[];let H=[];const K=[],G=Promise.resolve();let J=!1;function Q(t){H.push(t)}const U=new Set;let V,W=0;function X(){if(0!==W)return;const t=O;do{try{for(;W<I.length;){const t=I[W];W++,R(t),Y(t.$$)}}catch(t){throw I.length=0,W=0,t}for(R(null),I.length=0,W=0;F.length;)F.pop()();for(let t=0;t<H.length;t+=1){const e=H[t];U.has(e)||(U.add(e),e())}H.length=0}while(I.length);for(;K.length;)K.pop()();J=!1,U.clear(),R(t)}function Y(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Q)}}function Z(){return V||(V=Promise.resolve(),V.then((()=>{V=null}))),V}function tt(t,e,n){t.dispatchEvent(function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,o,e),r}(`${e?"intro":"outro"}${n}`))}const et=new Set;let nt;function ot(){nt={r:0,c:[],p:nt}}function rt(){nt.r||s(nt.c),nt=nt.p}function st(t,e){t&&t.i&&(et.delete(t),t.i(e))}function it(t,e,n,o){if(t&&t.o){if(et.has(t))return;et.add(t),nt.c.push((()=>{et.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}const ct={duration:0};function lt(t,e){t.f(),function(t,e){it(t,1,1,(()=>{e.delete(t.key)}))}(t,e)}function ut(t){t&&t.c()}function at(t,e,n,r){const{fragment:c,after_update:l}=t.$$;c&&c.m(e,n),r||Q((()=>{const e=t.$$.on_mount.map(o).filter(i);t.$$.on_destroy?t.$$.on_destroy.push(...e):s(e),t.$$.on_mount=[]})),l.forEach(Q)}function ft(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];H.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),H=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){-1===t.$$.dirty[0]&&(I.push(t),J||(J=!0,G.then(X)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ht(e,n,o,i,c,l,u,a=[-1]){const f=O;R(e);const d=e.$$={fragment:null,ctx:[],props:l,update:t,not_equal:c,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:r(),dirty:a,skip_bound:!1,root:n.target||f.$$.root};u&&u(d.root);let h=!1;if(d.ctx=o?o(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),h&&dt(e,t)),n})):[],d.update(),h=!0,s(d.before_update),d.fragment=!!i&&i(d.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(w)}else d.fragment&&d.fragment.c();n.intro&&st(e.$$.fragment),at(e,n.target,n.anchor,n.customElement),X()}R(f)}class pt{$destroy(){ft(this,1),this.$destroy=t}$on(e,n){if(!i(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function mt(t){const e=t-1;return e*e*e+1}function gt(t,{delay:n=0,duration:o=400,easing:r=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:r,css:t=>"opacity: "+t*s}}function $t(t,{delay:e=0,duration:n=400,easing:o=mt,x:r=0,y:s=0,opacity:i=0}={}){const c=getComputedStyle(t),l=+c.opacity,u="none"===c.transform?"":c.transform,f=l*(1-i),[d,h]=a(r),[p,m]=a(s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*d}${h}, ${(1-t)*p}${m});\n\t\t\topacity: ${l-f*e}`}}function yt(t,{from:e,to:n},o={}){const r=getComputedStyle(t),s="none"===r.transform?"":r.transform,[c,l]=r.transformOrigin.split(" ").map(parseFloat),u=e.left+e.width*c/n.width-(n.left+c),a=e.top+e.height*l/n.height-(n.top+l),{delay:f=0,duration:d=(t=>120*Math.sqrt(t)),easing:h=mt}=o;return{delay:f,duration:i(d)?d(Math.sqrt(u*u+a*a)):d,easing:h,css:(t,o)=>{const r=o*u,i=o*a,c=t+o*e.width/n.width,l=t+o*e.height/n.height;return`transform: ${s} translate(${r}px, ${i}px) scale(${c}, ${l});`}}}const vt=[];function bt(e,n=t){let o;const r=new Set;function s(t){if(c(e,t)&&(e=t,o)){const t=!vt.length;for(const t of r)t[1](),vt.push(t,e);if(t){for(let t=0;t<vt.length;t+=2)vt[t][0](vt[t+1]);vt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(i,c=t){const l=[i,c];return r.add(l),1===r.size&&(o=n(s)||t),i(e),()=>{r.delete(l),0===r.size&&o&&(o(),o=null)}}}}const wt={duration:4e3,initial:1,next:0,pausable:!1,dismissable:!0,reversed:!1,intro:{x:256}};const kt=function(){const{subscribe:t,update:e}=bt(new Array),n={};let o=0;function r(t){return t instanceof Object}return{subscribe:t,push:function(t,s){const i={target:"default",...r(t)?t:{...s,msg:t}},c=n[i.target]||{},l={...wt,...c,...i,theme:{...c.theme,...i.theme},classes:[...c.classes||[],...i.classes||[]],id:++o};return e((t=>l.reversed?[...t,l]:[l,...t])),o},pop:function(t){e((e=>{if(!e.length||0===t)return[];if("function"==typeof t)return e.filter((e=>t(e)));if(r(t))return e.filter((e=>e.target!==t.target));const n=t||Math.max(...e.map((t=>t.id)));return e.filter((t=>t.id!==n))}))},set:function(t,n){const o=r(t)?t:{...n,id:t};e((t=>{const e=t.findIndex((t=>t.id===o.id));return e>-1&&(t[e]={...t[e],...o}),t}))},_init:function(t="default",e={}){return n[t]=e,n}}}();function xt(t){return"[object Date]"===Object.prototype.toString.call(t)}function _t(t,e){if(t===e||t!=t)return()=>t;const n=typeof t;if(n!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const n=e.map(((e,n)=>_t(t[n],e)));return t=>n.map((e=>e(t)))}if("object"===n){if(!t||!e)throw new Error("Object cannot be null");if(xt(t)&&xt(e)){t=t.getTime();const n=(e=e.getTime())-t;return e=>new Date(t+e*n)}const n=Object.keys(e),o={};return n.forEach((n=>{o[n]=_t(t[n],e[n])})),t=>{const e={};return n.forEach((n=>{e[n]=o[n](t)})),e}}if("number"===n){const n=e-t;return e=>t+e*n}throw new Error(`Cannot interpolate ${n} values`)}function Et(e){let n,o,r=e[0].msg+"";return{c(){n=new S(!1),o=E(),n.a=o},m(t,e){n.m(r,t,e),b(t,o,e)},p(t,e){1&e&&r!==(r=t[0].msg+"")&&n.p(r)},i:t,o:t,d(t){t&&w(o),t&&n.d()}}}function Ct(t){let e,o,r;const s=[t[2]];var i=t[0].component.src;function c(t){let e={};for(let t=0;t<s.length;t+=1)e=n(e,s[t]);return{props:e}}return i&&(e=M(i,c())),{c(){e&&ut(e.$$.fragment),o=E()},m(t,n){e&&at(e,t,n),b(t,o,n),r=!0},p(t,n){const r=4&n?function(t,e){const n={},o={},r={$$scope:1};let s=t.length;for(;s--;){const i=t[s],c=e[s];if(c){for(const t in i)t in c||(o[t]=1);for(const t in c)r[t]||(n[t]=c[t],r[t]=1);t[s]=c}else for(const t in i)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(s,[(l=t[2],"object"==typeof l&&null!==l?l:{})]):{};var l;if(1&n&&i!==(i=t[0].component.src)){if(e){ot();const t=e;it(t.$$.fragment,1,0,(()=>{ft(t,1)})),rt()}i?(e=M(i,c()),ut(e.$$.fragment),st(e.$$.fragment,1),at(e,o.parentNode,o)):e=null}else i&&e.$set(r)},i(t){r||(e&&st(e.$$.fragment,t),r=!0)},o(t){e&&it(e.$$.fragment,t),r=!1},d(t){t&&w(o),e&&ft(e,t)}}}function Lt(e){let n,o,r;return{c(){n=k("div"),L(n,"class","_toastBtn pe svelte-95rq8t"),L(n,"role","button"),L(n,"tabindex","0")},m(t,s){b(t,n,s),o||(r=[C(n,"click",e[4]),C(n,"keydown",e[8])],o=!0)},p:t,d(t){t&&w(n),o=!1,s(r)}}}function At(t){let e,n,o,r,i,c,l,u,a,f;const d=[Ct,Et],h=[];function p(t,e){return t[0].component?0:1}o=p(t),r=h[o]=d[o](t);let m=t[0].dismissable&&Lt(t);return{c(){e=k("div"),n=k("div"),r.c(),i=_(),m&&m.c(),c=_(),l=k("progress"),L(n,"class","_toastMsg svelte-95rq8t"),N(n,"pe",t[0].component),L(l,"class","_toastBar svelte-95rq8t"),l.value=t[1],L(e,"role","status"),L(e,"class","_toastItem svelte-95rq8t"),N(e,"pe",t[0].pausable)},m(r,s){b(r,e,s),$(e,n),h[o].m(n,null),$(e,i),m&&m.m(e,null),$(e,c),$(e,l),u=!0,a||(f=[C(e,"mouseenter",t[9]),C(e,"mouseleave",t[6])],a=!0)},p(t,[s]){let i=o;o=p(t),o===i?h[o].p(t,s):(ot(),it(h[i],1,1,(()=>{h[i]=null})),rt(),r=h[o],r?r.p(t,s):(r=h[o]=d[o](t),r.c()),st(r,1),r.m(n,null)),(!u||1&s)&&N(n,"pe",t[0].component),t[0].dismissable?m?m.p(t,s):(m=Lt(t),m.c(),m.m(e,c)):m&&(m.d(1),m=null),(!u||2&s)&&(l.value=t[1]),(!u||1&s)&&N(e,"pe",t[0].pausable)},i(t){u||(st(r),u=!0)},o(t){it(r),u=!1},d(t){t&&w(e),h[o].d(),m&&m.d(),a=!1,s(f)}}}function Tt(t,e="undefined"){return typeof t===e}function Nt(t,o,r){let s,i,{item:c}=o,u=c.initial,a=u,f=!1,h={};const p=function(t,o={}){const r=bt(t);let s,i=t;function c(c,l){if(null==t)return r.set(t=c),Promise.resolve();i=c;let u=s,a=!1,{delay:f=0,duration:h=400,easing:p=e,interpolate:m=_t}=n(n({},o),l);if(0===h)return u&&(u.abort(),u=null),r.set(t=i),Promise.resolve();const $=d()+f;let y;return s=g((e=>{if(e<$)return!0;a||(y=m(t,c),"function"==typeof h&&(h=h(t,c)),a=!0),u&&(u.abort(),u=null);const n=e-$;return n>h?(r.set(t=c),!1):(r.set(t=y(p(n/h))),!0)})),s.promise}return{set:c,update:(e,n)=>c(e(i,t),n),subscribe:r.subscribe}}(c.initial,{duration:c.duration,easing:e});function m(){kt.pop(c.id)}function $(){1!==s&&0!==s||m()}function y(){f||s===u||(p.set(s,{duration:0}),f=!0)}function v(){if(f){const t=c.duration,e=t-t*((s-a)/(u-a));p.set(u,{duration:e}).then($),f=!1}}var b;l(t,p,(t=>r(1,s=t))),b=function(t=document){if(Tt(t.hidden))return;const e=()=>t.hidden?y():v(),n="visibilitychange";t.addEventListener(n,e),i=()=>t.removeEventListener(n,e),e()},B().$$.on_mount.push(b),function(t){B().$$.on_destroy.push(t)}((()=>{Tt(c.onpop,"function")&&c.onpop(c.id),i&&i()}));return t.$$set=t=>{"item"in t&&r(0,c=t.item)},t.$$.update=()=>{if(1&t.$$.dirty&&(Tt(c.progress)||r(0,c.next=c.progress,c)),131&t.$$.dirty&&u!==c.next&&(r(7,u=c.next),a=s,f=!1,p.set(u).then($)),1&t.$$.dirty&&c.component){const{props:t={},sendIdTo:e}=c.component;r(2,h={...t,...e&&{[e]:c.id}})}},[c,s,h,p,m,y,v,u,t=>{t instanceof KeyboardEvent&&["Enter"," "].includes(t.key)&&m()},()=>{c.pausable&&y()}]}class St extends pt{constructor(t){super(),ht(this,t,Nt,At,c,{item:0})}}function Mt(t,e,n){const o=t.slice();return o[4]=e[n],o}function jt(n,o){let r,c,l,a,f,h,p,m,y,v=t;return c=new St({props:{item:o[4]}}),{key:n,first:null,c(){r=k("li"),ut(c.$$.fragment),l=_(),L(r,"class",a=u(o[4].classes?.join(" "))+" svelte-1u812xz"),L(r,"style",f=Dt(o[4].theme)),this.first=r},m(t,e){b(t,r,e),at(c,r,null),$(r,l),y=!0},p(t,e){o=t;const n={};1&e&&(n.item=o[4]),c.$set(n),(!y||1&e&&a!==(a=u(o[4].classes?.join(" "))+" svelte-1u812xz"))&&L(r,"class",a),(!y||1&e&&f!==(f=Dt(o[4].theme)))&&L(r,"style",f)},r(){m=r.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,r=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,z(t,r)}}(r),v(),z(r,m)},a(){v(),v=function(n,o,r,s){if(!o)return t;const i=n.getBoundingClientRect();if(o.left===i.left&&o.right===i.right&&o.top===i.top&&o.bottom===i.bottom)return t;const{delay:c=0,duration:l=300,easing:u=e,start:a=d()+c,end:f=a+l,tick:h=t,css:p}=r(n,{from:o,to:i},s);let m,$=!0,y=!1;function v(){p&&P(n,m),$=!1}return g((t=>{if(!y&&t>=a&&(y=!0),y&&t>=f&&(h(1,0),v()),!$)return!1;if(y){const e=0+1*u((t-a)/l);h(e,1-e)}return!0})),p&&(m=q(n,0,1,l,c,u,p)),c||(y=!0),h(0,1),v}(r,m,yt,{duration:200})},i(n){y||(st(c.$$.fragment,n),Q((()=>{y&&(p&&p.end(1),h=function(n,o,r){const s={direction:"in"};let c,l,u=o(n,r,s),a=!1,f=0;function h(){c&&P(n,c)}function p(){const{delay:o=0,duration:r=300,easing:s=e,tick:i=t,css:p}=u||ct;p&&(c=q(n,0,1,r,o,s,p,f++)),i(0,1);const m=d()+o,$=m+r;l&&l.abort(),a=!0,Q((()=>tt(n,!0,"start"))),l=g((t=>{if(a){if(t>=$)return i(1,0),tt(n,!0,"end"),h(),a=!1;if(t>=m){const e=s((t-m)/r);i(e,1-e)}}return a}))}let m=!1;return{start(){m||(m=!0,P(n),i(u)?(u=u(s),Z().then(p)):p())},invalidate(){m=!1},end(){a&&(h(),a=!1)}}}(r,$t,o[4].intro),h.start())})),y=!0)},o(n){it(c.$$.fragment,n),h&&h.invalidate(),p=function(n,o,r){const c={direction:"out"};let l,u=o(n,r,c),a=!0;const f=nt;function h(){const{delay:o=0,duration:r=300,easing:i=e,tick:c=t,css:h}=u||ct;h&&(l=q(n,1,0,r,o,i,h));const p=d()+o,m=p+r;Q((()=>tt(n,!1,"start"))),g((t=>{if(a){if(t>=m)return c(0,1),tt(n,!1,"end"),--f.r||s(f.c),!1;if(t>=p){const e=i((t-p)/r);c(1-e,e)}}return a}))}return f.r+=1,i(u)?Z().then((()=>{u=u(c),h()})):h(),{end(t){t&&u.tick&&u.tick(1,0),a&&(l&&P(n,l),a=!1)}}}(r,gt,{}),y=!1},d(t){t&&w(r),ft(c),t&&p&&p.end()}}}function Ot(t){let e,n,o=[],r=new Map,i=t[0];const c=t=>t[4].id;for(let e=0;e<i.length;e+=1){let n=Mt(t,i,e),s=c(n);r.set(s,o[e]=jt(s,n))}return{c(){e=k("ul");for(let t=0;t<o.length;t+=1)o[t].c();L(e,"class","_toastContainer svelte-1u812xz")},m(t,r){b(t,e,r);for(let t=0;t<o.length;t+=1)o[t]&&o[t].m(e,null);n=!0},p(t,[n]){if(1&n){i=t[0],ot();for(let t=0;t<o.length;t+=1)o[t].r();o=function(t,e,n,o,r,i,c,l,u,a,f,d){let h=t.length,p=i.length,m=h;const g={};for(;m--;)g[t[m].key]=m;const $=[],y=new Map,v=new Map,b=[];for(m=p;m--;){const t=d(r,i,m),s=n(t);let l=c.get(s);l?o&&b.push((()=>l.p(t,e))):(l=a(s,t),l.c()),y.set(s,$[m]=l),s in g&&v.set(s,Math.abs(m-g[s]))}const w=new Set,k=new Set;function x(t){st(t,1),t.m(l,f),c.set(t.key,t),f=t.first,p--}for(;h&&p;){const e=$[p-1],n=t[h-1],o=e.key,r=n.key;e===n?(f=e.first,h--,p--):y.has(r)?!c.has(o)||w.has(o)?x(e):k.has(r)?h--:v.get(o)>v.get(r)?(k.add(o),x(e)):(w.add(r),h--):(u(n,c),h--)}for(;h--;){const e=t[h];y.has(e.key)||u(e,c)}for(;p;)x($[p-1]);return s(b),$}(o,n,c,1,t,i,r,e,lt,jt,null,Mt);for(let t=0;t<o.length;t+=1)o[t].a();rt()}},i(t){if(!n){for(let t=0;t<i.length;t+=1)st(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)it(o[t]);n=!1},d(t){t&&w(e);for(let t=0;t<o.length;t+=1)o[t].d()}}}function Dt(t){return t?Object.keys(t).reduce(((e,n)=>`${e}${n}:${t[n]};`),""):void 0}function qt(t,e,n){let o;l(t,kt,(t=>n(3,o=t)));let{options:r={}}=e,{target:s="default"}=e,i=[];return t.$$set=t=>{"options"in t&&n(1,r=t.options),"target"in t&&n(2,s=t.target)},t.$$.update=()=>{6&t.$$.dirty&&kt._init(s,r),12&t.$$.dirty&&n(0,i=o.filter((t=>t.target===s)))},[i,r,s,o]}class Pt extends pt{constructor(t){super(),ht(this,t,qt,Ot,c,{options:1,target:2})}}function zt(t,e,n){const o=t.slice();return o[13]=e[n].key,o[2]=e[n].value,o[15]=n,o}function Rt(t){let e,n,o,r,s,i,c,l,u,a,f,d,h,p,m,g=t[6](t[1][t[1].length-1].key)+"",y=t[7](t[1][t[1].length-1].key,t[1][t[1].length-2].key)+"",v=t[1][t[1].length-1].value+"";return{c(){e=k("h2"),e.textContent="Latest Log",n=_(),o=k("table"),r=k("thead"),r.innerHTML='<tr><th colspan="1">Log Time</th> \n                <th colspan="1">Duration</th> \n                <th colspan="1">Activity</th></tr>',s=_(),i=k("tbody"),c=k("tr"),l=k("td"),u=x(g),a=_(),f=k("td"),d=x(y),h=_(),p=k("td"),m=x(v),L(e,"class","svelte-111a4rr"),L(o,"class","svelte-111a4rr")},m(t,g){b(t,e,g),b(t,n,g),b(t,o,g),$(o,r),$(o,s),$(o,i),$(i,c),$(c,l),$(l,u),$(c,a),$(c,f),$(f,d),$(c,h),$(c,p),$(p,m)},p(t,e){2&e&&g!==(g=t[6](t[1][t[1].length-1].key)+"")&&A(u,g),2&e&&y!==(y=t[7](t[1][t[1].length-1].key,t[1][t[1].length-2].key)+"")&&A(d,y),2&e&&v!==(v=t[1][t[1].length-1].value+"")&&A(m,v)},d(t){t&&w(e),t&&w(n),t&&w(o)}}}function Bt(t){let e,n,o,r,s,i,c,l,u,a,f=t[1],d=[];for(let e=0;e<f.length;e+=1)d[e]=It(zt(t,f,e));return{c(){e=k("h2"),e.textContent="Full Summary",n=_(),o=k("table"),r=k("thead"),r.innerHTML='<tr><th colspan="1">Log Time</th> \n                <th colspan="1">Duration</th> \n                <th colspan="1">Activity</th></tr>',s=_(),i=k("tbody");for(let t=0;t<d.length;t+=1)d[t].c();c=_(),l=k("input"),L(e,"class","svelte-111a4rr"),L(o,"class","svelte-111a4rr"),L(l,"type","button"),l.value="New Day",L(l,"class","svelte-111a4rr")},m(f,h){b(f,e,h),b(f,n,h),b(f,o,h),$(o,r),$(o,s),$(o,i);for(let t=0;t<d.length;t+=1)d[t]&&d[t].m(i,null);b(f,c,h),b(f,l,h),u||(a=C(l,"click",t[3]),u=!0)},p(t,e){if(194&e){let n;for(f=t[1],n=0;n<f.length;n+=1){const o=zt(t,f,n);d[n]?d[n].p(o,e):(d[n]=It(o),d[n].c(),d[n].m(i,null))}for(;n<d.length;n+=1)d[n].d(1);d.length=f.length}},d(t){t&&w(e),t&&w(n),t&&w(o),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(d,t),t&&w(c),t&&w(l),u=!1,a()}}}function It(t){let e,n,o,r,s,i,c,l,u,a,f=t[6](t[13])+"",d=t[7](t[13],t[1][t[15]-1]?.key)+"",h=t[2]+"";return{c(){e=k("tr"),n=k("td"),o=x(f),r=_(),s=k("td"),i=x(d),c=_(),l=k("td"),u=x(h),a=_()},m(t,f){b(t,e,f),$(e,n),$(n,o),$(e,r),$(e,s),$(s,i),$(e,c),$(e,l),$(l,u),$(e,a)},p(t,e){2&e&&f!==(f=t[6](t[13])+"")&&A(o,f),2&e&&d!==(d=t[7](t[13],t[1][t[15]-1]?.key)+"")&&A(i,d),2&e&&h!==(h=t[2]+"")&&A(u,h)},d(t){t&&w(e)}}}function Ft(e){let n,o,r;return{c(){n=k("input"),L(n,"class","floating svelte-111a4rr"),L(n,"type","button"),n.value="🖋️"},m(t,s){b(t,n,s),o||(r=C(n,"click",e[5]),o=!0)},p:t,d(t){t&&w(n),o=!1,r()}}}function Ht(e){let n,o,r,c,l,u,a,f,d,h,p,m,g,y,v,x,E,A,N,S,M,j,O;n=new Pt({});let D=e[1].length>1&&Rt(e),q=e[1].length>0&&Bt(e),P=!e[0]&&Ft(e);return{c(){ut(n.$$.fragment),o=_(),r=k("h1"),r.textContent="Time Tracker",c=_(),l=k("div"),u=k("form"),a=k("div"),f=k("label"),f.textContent=" Activity:",d=_(),h=k("br"),p=_(),m=k("input"),g=_(),y=k("input"),x=_(),D&&D.c(),E=_(),q&&q.c(),A=_(),P&&P.c(),N=_(),S=k("footer"),S.innerHTML='<a href="https://github.com/matthewnoel/time-tracker" target="_blank" class="svelte-111a4rr">The Code</a> \n    <a href="https://raw.githubusercontent.com/matthewnoel/time-tracker/main/third-party-licenses.txt" target="_blank" class="svelte-111a4rr">Third-Party Licenses</a>',L(r,"class","svelte-111a4rr"),L(f,"for","activity"),L(m,"type","text"),L(m,"name","Activity"),L(m,"id","activity"),L(m,"class","svelte-111a4rr"),L(a,"class","svelte-111a4rr"),L(y,"type","submit"),y.disabled=v=!e[2],y.value="Log Time",L(y,"class","svelte-111a4rr"),L(u,"action",""),L(u,"class","svelte-111a4rr"),L(l,"class","form-wrapper svelte-111a4rr"),L(S,"class","svelte-111a4rr")},m(s,v){var w,k;at(n,s,v),b(s,o,v),b(s,r,v),b(s,c,v),b(s,l,v),$(l,u),$(u,a),$(a,f),$(a,d),$(a,h),$(a,p),$(a,m),T(m,e[2]),$(u,g),$(u,y),b(s,x,v),D&&D.m(s,v),b(s,E,v),q&&q.m(s,v),b(s,A,v),P&&P.m(s,v),b(s,N,v),b(s,S,v),M=!0,j||(O=[C(m,"input",e[10]),(k=e[8].call(null,m),k&&i(k.destroy)?k.destroy:t),C(u,"submit",(w=e[4],function(t){return t.preventDefault(),w.call(this,t)}))],j=!0)},p(t,[e]){4&e&&m.value!==t[2]&&T(m,t[2]),(!M||4&e&&v!==(v=!t[2]))&&(y.disabled=v),t[1].length>1?D?D.p(t,e):(D=Rt(t),D.c(),D.m(E.parentNode,E)):D&&(D.d(1),D=null),t[1].length>0?q?q.p(t,e):(q=Bt(t),q.c(),q.m(A.parentNode,A)):q&&(q.d(1),q=null),t[0]?P&&(P.d(1),P=null):P?P.p(t,e):(P=Ft(t),P.c(),P.m(N.parentNode,N))},i(t){M||(st(n.$$.fragment,t),M=!0)},o(t){it(n.$$.fragment,t),M=!1},d(t){ft(n,t),t&&w(o),t&&w(r),t&&w(c),t&&w(l),t&&w(x),D&&D.d(t),t&&w(E),q&&q.d(t),t&&w(A),P&&P.d(t),t&&w(N),t&&w(S),j=!1,s(O)}}}function Kt(t,e,n){let o;const r=()=>Object.assign({},window.localStorage),s=()=>n(9,l=r());let i,c,l=r();return t.$$.update=()=>{512&t.$$.dirty&&n(1,o=Object.entries(l).map((t=>({key:t[0],value:t[1]}))).sort(((t,e)=>t.key-e.key)))},[c,o,i,()=>{window.localStorage.clear(),s(),kt.push("Cleared yesterday's activities!")},()=>{const t=`${Math.floor(Date.now()/6e4)}`;if(null!=window.localStorage.getItem(t))return void kt.push("Cannot update twice per-minute.");const e=o[o.length-1]?.value?.toLowerCase().trim();e==i.toLowerCase().trim()&&window.localStorage.removeItem(o[o.length-1].key),window.localStorage.setItem(t,i),n(2,i=""),s()},()=>{const t=document.querySelectorAll("input[type=text]");t.length<1||t[0].focus()},t=>{const e=new Date(6e4*t),n=e.getHours(),o=e.getMinutes();return`${n}:${1===`${o}`.length?0:""}${o}`},(t,e)=>null==e?"N/A":t-e+" min",t=>{const e=e=>{n(0,c=!0),t&&"function"==typeof t.select&&t.select()},o=t=>{n(0,c=!1)};return t.addEventListener("focus",e),t.addEventListener("blur",o),{destroy(){t.removeEventListener("focus",e),t.removeEventListener("blur",o)}}},l,function(){i=this.value,n(2,i)}]}return new class extends pt{constructor(t){super(),ht(this,t,Kt,Ht,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
