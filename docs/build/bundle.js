var app=function(){"use strict";"undefined"!=typeof window&&(window.__svelte||={v:new Set}).v.add("5");const t=Symbol();var e=!1;const n=32,r=128,o=256,l=512,i=1024,u=2048,a=4096,s=8192,f=16384,c=65536,v=1<<20,d=Symbol("$state"),p=Symbol("legacy props"),h=Symbol("");var g=Array.isArray,y=Array.prototype.indexOf,m=Array.from,b=Object.defineProperty,w=Object.getOwnPropertyDescriptor,_=Object.getOwnPropertyDescriptors,x=Object.prototype,S=Array.prototype,k=Object.getPrototypeOf;function E(t){return"function"==typeof t}const $=()=>{};function A(t){return t()}function C(t){for(var e=0;e<t.length;e++)t[e]()}let O=[];function j(){var t=O;O=[],C(t)}function L(t){0===O.length&&queueMicrotask(j),O.push(t)}function N(t){return t===this.v}function P(t,e){return t!=t?e==e:t!==e||null!==t&&"object"==typeof t||"function"==typeof t}function D(t){return!P(t,this.v)}let M=!1;function T(t,e){return{f:0,v:t,reactions:null,equals:N,rv:0,wv:0}}function q(t){return z(T(t))}function I(t,e=!1){const n=T(t);return e||(n.equals=D),M&&null!==ce&&null!==ce.l&&(ce.l.s??=[]).push(n),n}function R(t,e=!1){return z(I(t,e))}function z(t){return null!==dt&&!pt&&2&dt.f&&(null===mt?mt=[t]:mt.push(t)),t}function B(t,e){return null!==dt&&!pt&&he()&&18&dt.f&&(null===mt||!mt.includes(t))&&function(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}(),F(t,e)}function F(t,e){return t.equals(e)||(t.v,t.v=e,t.wv=Et(),W(t,u),he()&&null!==gt&&gt.f&i&&!(96&gt.f)&&(null===_t?function(t){_t=t}([t]):_t.push(t))),e}function W(t,e){var n=t.reactions;if(null!==n)for(var r=he(),o=n.length,l=0;l<o;l++){var i=n[l],s=i.f;s&u||(r||i!==gt)&&(Bt(i,e),1280&s&&(2&s?W(i,a):Tt(i)))}}function H(t){var e=2050,n=null!==dt&&2&dt.f?dt:null;null===gt||null!==n&&n.f&o?e|=o:gt.f|=v;return{ctx:ce,deps:null,effects:null,equals:N,f:e,fn:t,reactions:null,rv:0,v:null,wv:0,parent:n??gt}}function K(t){const e=H(t);return e.equals=D,e}function V(t){var e=t.effects;if(null!==e){t.effects=null;for(var n=0;n<e.length;n+=1)re(e[n])}}function Z(t){var e=function(t){var e,n=gt;yt(function(t){for(var e=t.parent;null!==e;){if(!(2&e.f))return e;e=e.parent}return null}(t));try{V(t),e=Ot(t)}finally{yt(n)}return e}(t);Bt(t,(kt||t.f&o)&&null!==t.deps?a:i),t.equals(e)||(t.v=e,t.wv=Et())}function G(e,n=null,r){if("object"!=typeof e||null===e||d in e)return e;const o=k(e);if(o!==x&&o!==S)return e;var l,i=new Map,u=g(e),a=T(0);return u&&i.set("length",T(e.length)),new Proxy(e,{defineProperty(t,e,n){"value"in n&&!1!==n.configurable&&!1!==n.enumerable&&!1!==n.writable||function(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}();var r=i.get(e);return void 0===r?(r=T(n.value),i.set(e,r)):B(r,G(n.value,l)),!0},deleteProperty(e,n){var r=i.get(n);if(void 0===r)n in e&&i.set(n,T(t));else{if(u&&"string"==typeof n){var o=i.get("length"),l=Number(n);Number.isInteger(l)&&l<o.v&&B(o,l)}B(r,t),U(a)}return!0},get(n,r,o){if(r===d)return e;var u=i.get(r),a=r in n;if(void 0!==u||a&&!w(n,r)?.writable||(u=T(G(a?n[r]:t,l)),i.set(r,u)),void 0!==u){var s=It(u);return s===t?void 0:s}return Reflect.get(n,r,o)},getOwnPropertyDescriptor(e,n){var r=Reflect.getOwnPropertyDescriptor(e,n);if(r&&"value"in r){var o=i.get(n);o&&(r.value=It(o))}else if(void 0===r){var l=i.get(n),u=l?.v;if(void 0!==l&&u!==t)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return r},has(e,n){if(n===d)return!0;var r=i.get(n),o=void 0!==r&&r.v!==t||Reflect.has(e,n);if((void 0!==r||null!==gt&&(!o||w(e,n)?.writable))&&(void 0===r&&(r=T(o?G(e[n],l):t),i.set(n,r)),It(r)===t))return!1;return o},set(e,n,r,o){var s=i.get(n),f=n in e;if(u&&"length"===n)for(var c=r;c<s.v;c+=1){var v=i.get(c+"");void 0!==v?B(v,t):c in e&&(v=T(t),i.set(c+"",v))}void 0===s?f&&!w(e,n)?.writable||(B(s=T(void 0),G(r,l)),i.set(n,s)):(f=s.v!==t,B(s,G(r,l)));var d=Reflect.getOwnPropertyDescriptor(e,n);if(d?.set&&d.set.call(o,r),!f){if(u&&"string"==typeof n){var p=i.get("length"),h=Number(n);Number.isInteger(h)&&h>=p.v&&B(p,h+1)}U(a)}return!0},ownKeys(e){It(a);var n=Reflect.ownKeys(e).filter((e=>{var n=i.get(e);return void 0===n||n.v!==t}));for(var[r,o]of i)o.v===t||r in e||n.push(r);return n},setPrototypeOf(){!function(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}()}})}function U(t,e=1){B(t,t.v+e)}var J,Q,X,Y;function tt(t=""){return document.createTextNode(t)}function et(t){return X.call(t)}function nt(t){return Y.call(t)}function rt(t,e){return et(t)}function ot(t,e){var n=et(t);return n instanceof Comment&&""===n.data?nt(n):n}function lt(t,e=1,n=!1){let r=t;for(;e--;)r=nt(r);return r}let it=!1,ut=!1,at=null,st=!1,ft=!1;function ct(t){ft=t}let vt=[],dt=null,pt=!1;function ht(t){dt=t}let gt=null;function yt(t){gt=t}let mt=null;let bt=null,wt=0,_t=null;let xt=1,St=0,kt=!1;function Et(){return++xt}function $t(t){var e=t.f;if(e&u)return!0;if(e&a){var n=t.deps,r=!!(e&o);if(null!==n){var s,f,c=!!(e&l),v=r&&null!==gt&&!kt,d=n.length;if(c||v){var p=t,h=p.parent;for(s=0;s<d;s++)f=n[s],!c&&f?.reactions?.includes(p)||(f.reactions??=[]).push(p);c&&(p.f^=l),!v||null===h||h.f&o||(p.f^=o)}for(s=0;s<d;s++)if($t(f=n[s])&&Z(f),f.wv>t.wv)return!0}r&&(null===gt||kt)||Bt(t,i)}return!1}function At(t,e,n,o){if(it){if(null===n&&(it=!1),function(t){return!(t.f&f||null!==t.parent&&t.parent.f&r)}(e))throw t}else null!==n&&(it=!0),function(t,e){for(var n=e;null!==n;){if(n.f&r)try{return void n.fn(t)}catch{n.f^=r}n=n.parent}throw it=!1,t}(t,e)}function Ct(t,e,n=!0){var r=t.reactions;if(null!==r)for(var o=0;o<r.length;o++){var l=r[o];2&l.f?Ct(l,e,!1):e===l&&(n?Bt(l,u):l.f&i&&Bt(l,a),Tt(l))}}function Ot(t){var e=bt,n=wt,r=_t,l=dt,i=kt,u=mt,a=ce,s=pt,f=t.f;bt=null,wt=0,_t=null,kt=!!(f&o)&&(pt||!st||null===dt),dt=96&f?null:t,mt=null,ve(t.ctx),pt=!1,St++;try{var c=(0,t.fn)(),v=t.deps;if(null!==bt){var d;if(Lt(t,wt),null!==v&&wt>0)for(v.length=wt+bt.length,d=0;d<bt.length;d++)v[wt+d]=bt[d];else t.deps=v=bt;if(!kt)for(d=wt;d<v.length;d++)(v[d].reactions??=[]).push(t)}else null!==v&&wt<v.length&&(Lt(t,wt),v.length=wt);if(he()&&null!==_t&&!pt&&null!==v&&!(6146&t.f))for(d=0;d<_t.length;d++)Ct(_t[d],t);return null!==l&&St++,c}finally{bt=e,wt=n,_t=r,dt=l,kt=i,mt=u,ve(a),pt=s}}function jt(t,e){let n=e.reactions;if(null!==n){var r=y.call(n,t);if(-1!==r){var o=n.length-1;0===o?n=e.reactions=null:(n[r]=n[o],n.pop())}}null===n&&2&e.f&&(null===bt||!bt.includes(e))&&(Bt(e,a),768&e.f||(e.f^=l),V(e),Lt(e,0))}function Lt(t,e){var n=t.deps;if(null!==n)for(var r=e;r<n.length;r++)jt(t,n[r])}function Nt(t){var r=t.f;if(!(r&f)){Bt(t,i);var o=gt,l=ce,u=st;gt=t,st=!0;try{16&r?function(t){var e=t.first;for(;null!==e;){var r=e.next;e.f&n||re(e),e=r}}(t):ne(t),ee(t);var a=Ot(t);t.teardown="function"==typeof a?a:null,t.wv=xt;t.deps;e}catch(e){At(e,t,o,l||t.ctx)}finally{st=u,gt=o}}}function Pt(){try{!function(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}()}catch(t){if(null===at)throw t;At(t,at,null)}}function Dt(){try{for(var t=0;vt.length>0;){t++>1e3&&Pt();var e=vt,n=e.length;vt=[];for(var r=0;r<n;r++){var o=e[r];o.f&i||(o.f^=i),Mt(qt(o))}}}finally{ut=!1,at=null}}function Mt(t){var e=t.length;if(0!==e)for(var n=0;n<e;n++){var r=t[n];if(!(24576&r.f))try{$t(r)&&(Nt(r),null===r.deps&&null===r.first&&null===r.nodes_start&&(null===r.teardown?oe(r):r.fn=null))}catch(t){At(t,r,null,r.ctx)}}}function Tt(t){ut||(ut=!0,queueMicrotask(Dt));for(var e=at=t;null!==e.parent;){var n=(e=e.parent).f;if(96&n){if(!(n&i))return;e.f^=i}}vt.push(e)}function qt(t){for(var e=[],r=t.first;null!==r;){var o=r.f,l=!!(o&n);if(!(l&&!!(o&i)||o&s)){if(4&o)e.push(r);else if(l)r.f^=i;else{var u=dt;try{dt=r,$t(r)&&Nt(r)}catch(t){At(t,r,null,r.ctx)}finally{dt=u}}var a=r.first;if(null!==a){r=a;continue}}var f=r.parent;for(r=r.next;null===r&&null!==f;)r=f.next,f=f.parent}return e}function It(t){var e=!!(2&t.f);if(null===dt||pt){if(e&&null===t.deps&&null===t.effects){var n=t,r=n.parent;null===r||r.f&o||(n.f^=o)}}else{null!==mt&&mt.includes(t)&&function(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}();var l=dt.deps;t.rv<St&&(t.rv=St,null===bt&&null!==l&&l[wt]===t?wt++:null===bt?bt=[t]:kt&&bt.includes(t)||bt.push(t))}return e&&$t(n=t)&&Z(n),t.v}function Rt(t){var e=pt;try{return pt=!0,t()}finally{pt=e}}const zt=-7169;function Bt(t,e){t.f=t.f&zt|e}function Ft(t){if("object"==typeof t&&t&&!(t instanceof EventTarget))if(d in t)Wt(t);else if(!Array.isArray(t))for(let e in t){const n=t[e];"object"==typeof n&&n&&d in n&&Wt(n)}}function Wt(t,e=new Set){if(!("object"!=typeof t||null===t||t instanceof EventTarget||e.has(t))){e.add(t),t instanceof Date&&t.getTime();for(let n in t)try{Wt(t[n],e)}catch(t){}const n=k(t);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const e=_(n);for(let n in e){const r=e[n].get;if(r)try{r.call(t)}catch(t){}}}}}function Ht(t){null===gt&&null===dt&&function(){throw new Error("https://svelte.dev/e/effect_orphan")}(),null!==dt&&dt.f&o&&null===gt&&function(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}(),ft&&function(){throw new Error("https://svelte.dev/e/effect_in_teardown")}()}function Kt(t,e,n,r=!0){var o=!!(64&t),l=gt,i={ctx:ce,deps:null,nodes_start:null,nodes_end:null,f:t|u,first:null,fn:e,last:null,next:null,parent:o?null:l,prev:null,teardown:null,transitions:null,wv:0};if(n)try{Nt(i),i.f|=32768}catch(t){throw re(i),t}else null!==e&&Tt(i);if(!(n&&null===i.deps&&null===i.first&&null===i.nodes_start&&null===i.teardown&&!(1048704&i.f))&&!o&&r&&(null!==l&&function(t,e){var n=e.last;null===n?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}(i,l),null!==dt&&2&dt.f)){var a=dt;(a.effects??=[]).push(i)}return i}function Vt(t){const e=Kt(8,null,!1);return Bt(e,i),e.teardown=t,e}function Zt(t){if(Ht(),!(null!==gt&&!!(gt.f&n)&&null!==ce&&!ce.m))return Gt(t);var e=ce;(e.e??=[]).push({fn:t,effect:gt,reaction:dt})}function Gt(t){return Kt(4,t,!1)}function Ut(t,e){var n=ce,r={effect:null,ran:!1};n.l.r1.push(r),r.effect=Qt((()=>{t(),r.ran||(r.ran=!0,B(n.l.r2,!0),Rt(e))}))}function Jt(){var t=ce;Qt((()=>{if(It(t.l.r2)){for(var e of t.l.r1){var n=e.effect;n.f&i&&Bt(n,a),$t(n)&&Nt(n),e.ran=!1}t.l.r2.v=!1}}))}function Qt(t){return Kt(8,t,!0)}function Xt(t,e=[],n=H){const r=e.map(n);return Yt((()=>t(...r.map(It))))}function Yt(t,e=0){return Kt(24|e,t,!0)}function te(t,e=!0){return Kt(40,t,!0,e)}function ee(t){var e=t.teardown;if(null!==e){const t=ft,n=dt;ct(!0),ht(null);try{e.call(null)}finally{ct(t),ht(n)}}}function ne(t,e=!1){var n=t.first;for(t.first=t.last=null;null!==n;){var r=n.next;re(n,e),n=r}}function re(t,e=!0){var n=!1;if((e||524288&t.f)&&null!==t.nodes_start){for(var r=t.nodes_start,o=t.nodes_end;null!==r;){var l=r===o?null:nt(r);r.remove(),r=l}n=!0}ne(t,e&&!n),Lt(t,0),Bt(t,f);var i=t.transitions;if(null!==i)for(const t of i)t.stop();ee(t);var u=t.parent;null!==u&&null!==u.first&&oe(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function oe(t){var e=t.parent,n=t.prev,r=t.next;null!==n&&(n.next=r),null!==r&&(r.prev=n),null!==e&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function le(t,e){var n=[];ue(t,n,!0),ie(n,(()=>{re(t),e&&e()}))}function ie(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var o of t)o.out(r)}else e()}function ue(t,e,r){if(!(t.f&s)){if(t.f^=s,null!==t.transitions)for(const n of t.transitions)(n.is_global||r)&&e.push(n);for(var o=t.first;null!==o;){var l=o.next;ue(o,e,!!(!!(o.f&c)||!!(o.f&n))&&r),o=l}}}function ae(t){se(t,!0)}function se(t,e){if(t.f&s){t.f^=s,t.f&i||(t.f^=i),$t(t)&&(Bt(t,u),Tt(t));for(var r=t.first;null!==r;){var o=r.next;se(r,!!(!!(r.f&c)||!!(r.f&n))&&e),r=o}if(null!==t.transitions)for(const n of t.transitions)(n.is_global||e)&&n.in()}}function fe(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let ce=null;function ve(t){ce=t}function de(t,e=!1,n){ce={p:ce,c:null,e:null,m:!1,s:t,x:null,l:null},M&&!e&&(ce.l={s:null,u:null,r1:[],r2:T(!1)})}function pe(t){const e=ce;if(null!==e){const t=e.e;if(null!==t){var n=gt,r=dt;e.e=null;try{for(var o=0;o<t.length;o++){var l=t[o];yt(l.effect),ht(l.reaction),Gt(l.fn)}}finally{yt(n),ht(r)}}ce=e.p,e.m=!0}return{}}function he(){return!M||null!==ce&&null===ce.l}const ge=["touchstart","touchmove"];function ye(t){return ge.includes(t)}let me=!1;function be(t){var e=dt,n=gt;ht(null),yt(null);try{return t()}finally{ht(e),yt(n)}}function we(t,e,n,r=n){t.addEventListener(e,(()=>be(n)));const o=t.__on_r;t.__on_r=o?()=>{o(),r(!0)}:()=>r(!0),me||(me=!0,document.addEventListener("reset",(t=>{Promise.resolve().then((()=>{if(!t.defaultPrevented)for(const e of t.target.elements)e.__on_r?.()}))}),{capture:!0}))}const _e=new Set,xe=new Set;function Se(t,e,n,r,o){var l={capture:r,passive:o},i=function(t,e,n,r={}){function o(t){if(r.capture||Ee.call(e,t),!t.cancelBubble)return be((()=>n?.call(this,t)))}return t.startsWith("pointer")||t.startsWith("touch")||"wheel"===t?L((()=>{e.addEventListener(t,o,r)})):e.addEventListener(t,o,r),o}(t,e,n,l);e!==document.body&&e!==window&&e!==document||Vt((()=>{e.removeEventListener(t,i,l)}))}function ke(t){for(var e=0;e<t.length;e++)_e.add(t[e]);for(var n of xe)n(t)}function Ee(t){var e=this,n=e.ownerDocument,r=t.type,o=t.composedPath?.()||[],l=o[0]||t.target,i=0,u=t.__root;if(u){var a=o.indexOf(u);if(-1!==a&&(e===document||e===window))return void(t.__root=e);var s=o.indexOf(e);if(-1===s)return;a<=s&&(i=a)}if((l=o[i]||t.target)!==e){b(t,"currentTarget",{configurable:!0,get:()=>l||n});var f=dt,c=gt;ht(null),yt(null);try{for(var v,d=[];null!==l;){var p=l.assignedSlot||l.parentNode||l.host||null;try{var h=l["__"+r];if(void 0!==h&&(!l.disabled||t.target===l))if(g(h)){var[y,...m]=h;y.apply(l,[t,...m])}else h.call(l,t)}catch(t){v?d.push(t):v=t}if(t.cancelBubble||p===e||null===p)break;l=p}if(v){for(let t of d)queueMicrotask((()=>{throw t}));throw v}}finally{t.__root=e,delete t.currentTarget,ht(f),yt(c)}}}function $e(t){var e=document.createElement("template");return e.innerHTML=t,e.content}function Ae(t,e){var n=gt;null===n.nodes_start&&(n.nodes_start=t,n.nodes_end=e)}function Ce(t,e){var n,r=!!(1&e),o=!!(2&e),l=!t.startsWith("<!>");return()=>{void 0===n&&(n=$e(l?t:"<!>"+t),r||(n=et(n)));var e=o||Q?document.importNode(n,!0):n.cloneNode(!0);r?Ae(et(e),e.lastChild):Ae(e,e);return e}}function Oe(){var t=document.createDocumentFragment(),e=document.createComment(""),n=tt();return t.append(e,n),Ae(e,n),t}function je(t,e){null!==t&&t.before(e)}let Le=!0;function Ne(t,e){var n=null==e?"":"object"==typeof e?e+"":e;n!==(t.__t??=t.nodeValue)&&(t.__t=n,t.nodeValue=n+"")}const Pe=new Map;let De=new WeakMap;function Me(e,n,r=!1){var o=e,l=null,i=null,u=t,a=!1;const s=(t,e=!0)=>{a=!0,f(e,t)},f=(t,e)=>{u!==(u=t)&&(u?(l?ae(l):e&&(l=te((()=>e(o)))),i&&le(i,(()=>{i=null}))):(i?ae(i):e&&(i=te((()=>e(o)))),l&&le(l,(()=>{l=null}))))};Yt((()=>{a=!1,n(s),a||f(null,null)}),r?c:0)}let Te=null;function qe(t,e){return e}function Ie(t,e,n,r,o,l=null){var i=t,u={flags:e,items:new Map,first:null};!(4&e)||(i=t.appendChild(tt()));var a=null,f=!1,c=K((()=>{var t=n();return g(t)?t:null==t?[]:m(t)}));Yt((()=>{var t=It(c),v=t.length;f&&0===v||(f=0===v,function(t,e,n,r,o,l,i){var u,a,f,c,v,d,p=!!(8&o),h=!!(3&o),g=t.length,y=e.items,b=e.first,w=b,_=null,x=[],S=[];if(p)for(d=0;d<g;d+=1)c=l(f=t[d],d),void 0!==(v=y.get(c))&&(v.a?.measure(),(a??=new Set).add(v));for(d=0;d<g;d+=1)if(c=l(f=t[d],d),void 0!==(v=y.get(c))){if(h&&Re(v,f,d,o),v.e.f&s&&(ae(v.e),p&&(v.a?.unfix(),(a??=new Set).delete(v))),v!==w){if(void 0!==u&&u.has(v)){if(x.length<S.length){var k,E=S[0];_=E.prev;var $=x[0],A=x[x.length-1];for(k=0;k<x.length;k+=1)Be(x[k],E,n);for(k=0;k<S.length;k+=1)u.delete(S[k]);Fe(e,$.prev,A.next),Fe(e,_,$),Fe(e,A,E),w=E,_=A,d-=1,x=[],S=[]}else u.delete(v),Be(v,w,n),Fe(e,v.prev,v.next),Fe(e,v,null===_?e.first:_.next),Fe(e,_,v),_=v;continue}for(x=[],S=[];null!==w&&w.k!==c;)w.e.f&s||(u??=new Set).add(w),S.push(w),w=w.next;if(null===w)continue;v=w}x.push(v),_=v,w=v.next}else{_=ze(w?w.e.nodes_start:n,e,_,null===_?e.first:_.next,f,c,d,r,o,i),y.set(c,_),x=[],S=[],w=_.next}if(null!==w||void 0!==u){for(var C=void 0===u?[]:m(u);null!==w;)w.e.f&s||C.push(w),w=w.next;var O=C.length;if(O>0){var j=4&o&&0===g?n:null;if(p){for(d=0;d<O;d+=1)C[d].a?.measure();for(d=0;d<O;d+=1)C[d].a?.fix()}!function(t,e,n,r){for(var o=[],l=e.length,i=0;i<l;i++)ue(e[i].e,o,!0);var u=l>0&&0===o.length&&null!==n;if(u){var a=n.parentNode;a.textContent="",a.append(n),r.clear(),Fe(t,e[0].prev,e[l-1].next)}ie(o,(()=>{for(var n=0;n<l;n++){var o=e[n];u||(r.delete(o.k),Fe(t,o.prev,o.next)),re(o.e,!u)}}))}(e,C,j,y)}}p&&L((()=>{if(void 0!==a)for(v of a)v.a?.apply()}));gt.first=e.first&&e.first.e,gt.last=_&&_.e}(t,u,i,o,e,r,n),null!==l&&(0===v?a?ae(a):a=te((()=>l(i))):null!==a&&le(a,(()=>{a=null}))),It(c))}))}function Re(t,e,n,r){1&r&&F(t.v,e),2&r?F(t.i,n):t.i=n}function ze(t,e,n,r,o,l,i,u,a,s){var f=Te,c=!!(1&a)?!(16&a)?I(o):T(o):o,v=2&a?T(i):i,d={i:v,v:c,k:l,a:null,e:null,prev:n,next:r};Te=d;try{return d.e=te((()=>u(t,c,v,s)),false),d.e.prev=n&&n.e,d.e.next=r&&r.e,null===n?e.first=d:(n.next=d,n.e.next=d.e),null!==r&&(r.prev=d,r.e.prev=d.e),d}finally{Te=f}}function Be(t,e,n){for(var r=t.next?t.next.e.nodes_start:n,o=e?e.e.nodes_start:n,l=t.e.nodes_start;l!==r;){var i=nt(l);o.before(l),l=i}}function Fe(t,e,n){null===e?t.first=n:(e.next=n,e.e.next=n&&n.e),null!==n&&(n.prev=e,n.e.prev=e&&e.e)}function We(t){var e,n,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"==typeof t)if(Array.isArray(t)){var o=t.length;for(e=0;e<o;e++)t[e]&&(n=We(t[e]))&&(r&&(r+=" "),r+=n)}else for(n in t)t[n]&&(r&&(r+=" "),r+=n);return r}function He(t){return"object"==typeof t?function(){for(var t,e,n=0,r="",o=arguments.length;n<o;n++)(t=arguments[n])&&(e=We(t))&&(r&&(r+=" "),r+=e);return r}(t):t??""}const Ke=[..." \t\n\r\f \v\ufeff"];function Ve(t,e,n,r,o,l){if(t.__className!==n){var i=function(t,e,n){var r=null==t?"":""+t;if(e&&(r=r?r+" "+e:e),n)for(var o in n)if(n[o])r=r?r+" "+o:o;else if(r.length)for(var l=o.length,i=0;(i=r.indexOf(o,i))>=0;){var u=i+l;0!==i&&!Ke.includes(r[i-1])||u!==r.length&&!Ke.includes(r[u])?i=u:r=(0===i?"":r.substring(0,i))+r.substring(u+1)}return""===r?null:r}(n,r,l);null==i?t.removeAttribute("class"):t.className=i,t.__className=n}else if(l)for(var u in l){var a=!!l[u];null!=o&&a===!!o[u]||t.classList.toggle(u,a)}return l}function Ze(t,e){var n=t.__attributes??={};n.value!==(n.value=e??void 0)&&(t.value!==e||0===e&&"PROGRESS"===t.nodeName)&&(t.value=e??"")}function Ge(t,e,n,r){var o=t.__attributes??={};o[e]!==(o[e]=n)&&("style"===e&&"__styles"in t&&(t.__styles={}),"loading"===e&&(t[h]=n),null==n?t.removeAttribute(e):"string"!=typeof n&&function(t){var e,n=Ue.get(t.nodeName);if(n)return n;Ue.set(t.nodeName,n=[]);var r=t,o=Element.prototype;for(;o!==r;){for(var l in e=_(r))e[l].set&&n.push(l);r=k(r)}return n}(t).includes(e)?t[e]=n:t.setAttribute(e,n))}var Ue=new Map;const Je={tick:t=>requestAnimationFrame(t),now:()=>performance.now(),tasks:new Set};function Qe(){const t=Je.now();Je.tasks.forEach((e=>{e.c(t)||(Je.tasks.delete(e),e.f())})),0!==Je.tasks.size&&Je.tick(Qe)}function Xe(t){let e;return 0===Je.tasks.size&&Je.tick(Qe),{promise:new Promise((n=>{Je.tasks.add(e={c:t,f:n})})),abort(){Je.tasks.delete(e)}}}function Ye(t,e){be((()=>{t.dispatchEvent(new CustomEvent(e))}))}function tn(t){if("float"===t)return"cssFloat";if("offset"===t)return"cssOffset";if(t.startsWith("--"))return t;const e=t.split("-");return 1===e.length?e[0]:e[0]+e.slice(1).map((t=>t[0].toUpperCase()+t.slice(1))).join("")}function en(t){const e={},n=t.split(";");for(const t of n){const[n,r]=t.split(":");if(!n||void 0===r)break;e[tn(n.trim())]=r.trim()}return e}const nn=t=>t;function rn(t,e,n,r){var o,l,i,u=!!(1&t),a=!!(2&t),s=!!(4&t),f=u&&a?"both":u?"in":"out",v=e.inert,d=e.style.overflow;function p(){var t=dt,l=gt;ht(null),yt(null);try{return o??=n()(e,r?.()??{},{direction:f})}finally{ht(t),yt(l)}}var h={is_global:s,in(){if(e.inert=v,!u)return i?.abort(),void i?.reset?.();a||l?.abort(),Ye(e,"introstart"),l=on(e,p(),i,1,(()=>{Ye(e,"introend"),l?.abort(),l=o=void 0,e.style.overflow=d}))},out(t){if(!a)return t?.(),void(o=void 0);e.inert=!0,Ye(e,"outrostart"),i=on(e,p(),l,0,(()=>{Ye(e,"outroend"),t?.()}))},stop:()=>{l?.abort(),i?.abort()}},g=gt;if((g.transitions??=[]).push(h),u&&Le){var y=s;if(!y){for(var m=g.parent;m&&m.f&c;)for(;(m=m.parent)&&!(16&m.f););y=!m||!!(32768&m.f)}y&&Gt((()=>{Rt((()=>h.in()))}))}}function on(t,e,n,r,o){var l=1===r;if(E(e)){var i,u=!1;return L((()=>{if(!u){var a=e({direction:l?"in":"out"});i=on(t,a,n,r,o)}})),{abort:()=>{u=!0,i?.abort()},deactivate:()=>i.deactivate(),reset:()=>i.reset(),t:()=>i.t()}}if(n?.deactivate(),!e?.duration)return o(),{abort:$,deactivate:$,reset:$,t:()=>r};const{delay:a=0,css:s,tick:f,easing:c=nn}=e;var v=[];if(l&&void 0===n&&(f&&f(0,1),s)){var d=en(s(0,1));v.push(d,d)}var p=()=>1-r,h=t.animate(v,{duration:a});return h.onfinish=()=>{var l=n?.t()??1-r;n?.abort();var i=r-l,u=e.duration*Math.abs(i),a=[];if(u>0){var v=!1;if(s)for(var d=Math.ceil(u/(1e3/60)),g=0;g<=d;g+=1){var y=l+i*c(g/d),m=en(s(y,1-y));a.push(m),v||="hidden"===m.overflow}v&&(t.style.overflow="hidden"),p=()=>{var t=h.currentTime;return l+i*c(t/u)},f&&Xe((()=>{if("running"!==h.playState)return!1;var t=p();return f(t,1-t),!0}))}(h=t.animate(a,{duration:u,fill:"forwards"})).onfinish=()=>{p=()=>r,f?.(r,1-r),o()}},{abort:()=>{h&&(h.cancel(),h.effect=null,h.onfinish=$)},deactivate:()=>{o=$},reset:()=>{0===r&&f?.(1,0)},t:()=>p()}}function ln(t){var e=t.type;return"number"===e||"range"===e}function un(t){return""===t?null:+t}function an(t=!1){const e=ce,n=e.l.u;if(!n)return;let r=()=>Ft(e.s);if(t){let t=0,n={};const o=H((()=>{let r=!1;const o=e.s;for(const t in o)o[t]!==n[t]&&(n[t]=o[t],r=!0);return r&&t++,t}));r=()=>It(o)}var o;n.b.length&&(o=()=>{sn(e,r),C(n.b)},Ht(),Qt(o)),Zt((()=>{const t=Rt((()=>n.m.map(A)));return()=>{for(const e of t)"function"==typeof e&&e()}})),n.a.length&&Zt((()=>{sn(e,r),C(n.a)}))}function sn(t,e){if(t.l.s)for(const e of t.l.s)It(e);e()}function fn(t){var e,n;null===ce&&fe(),M&&null!==ce.l?(e=ce,n=e.l,n.u??={a:[],b:[],m:[]}).m.push(t):Zt((()=>{const e=Rt(t);if("function"==typeof e)return e}))}function cn(t,e,n){if(null==t)return e(void 0),$;const r=Rt((()=>t.subscribe(e,n)));return r.unsubscribe?()=>r.unsubscribe():r}const vn=[];function dn(t,e=$){let n=null;const r=new Set;function o(e){if(P(t,e)&&(t=e,n)){const e=!vn.length;for(const e of r)e[1](),vn.push(e,t);if(e){for(let t=0;t<vn.length;t+=2)vn[t][0](vn[t+1]);vn.length=0}}}function l(e){o(e(t))}return{set:o,update:l,subscribe:function(i,u=$){const a=[i,u];return r.add(a),1===r.size&&(n=e(o,l)||$),i(t),()=>{r.delete(a),0===r.size&&n&&(n(),n=null)}}}}let pn=!1,hn=Symbol();function gn(t,e,n){const r=n[e]??={store:null,source:I(void 0),unsubscribe:$};if(r.store!==t&&!(hn in n))if(r.unsubscribe(),r.store=t??null,null==t)r.source.v=void 0,r.unsubscribe=$;else{var o=!0;r.unsubscribe=cn(t,(t=>{o?r.source.v=t:B(r.source,t)})),o=!1}return t&&hn in n?function(t){let e;return cn(t,(t=>e=t))(),e}(t):It(r.source)}function yn(){const t={};return[t,function(){Vt((()=>{for(var e in t){t[e].unsubscribe()}b(t,hn,{enumerable:!1,value:!0})}))}]}const mn={get(t,e){let n=t.props.length;for(;n--;){let r=t.props[n];if(E(r)&&(r=r()),"object"==typeof r&&null!==r&&e in r)return r[e]}},set(t,e,n){let r=t.props.length;for(;r--;){let o=t.props[r];E(o)&&(o=o());const l=w(o,e);if(l&&l.set)return l.set(n),!0}return!1},getOwnPropertyDescriptor(t,e){let n=t.props.length;for(;n--;){let r=t.props[n];if(E(r)&&(r=r()),"object"==typeof r&&null!==r&&e in r){const t=w(r,e);return t&&!t.configurable&&(t.configurable=!0),t}}},has(t,e){if(e===d||e===p)return!1;for(let n of t.props)if(E(n)&&(n=n()),null!=n&&e in n)return!0;return!1},ownKeys(t){const e=[];for(let n of t.props){E(n)&&(n=n());for(const t in n)e.includes(t)||e.push(t)}return e}};function bn(t,e,n,r){var o,l=!!(1&n),i=!M||!!(2&n),u=!!(8&n),a=!!(16&n),s=!1;u?[o,s]=function(t){var e=pn;try{return pn=!1,[t(),pn]}finally{pn=e}}((()=>t[e])):o=t[e];var f,c=d in t||p in t,v=u&&(w(t,e)?.set??(c&&e in t&&(n=>t[e]=n)))||void 0,h=r,g=!0,y=!1,m=()=>(y=!0,g&&(g=!1,h=a?Rt(r):r),h);if(void 0===o&&void 0!==r&&(v&&i&&function(){throw new Error("https://svelte.dev/e/props_invalid_value")}(),o=m(),v&&v(o)),i)f=()=>{var n=t[e];return void 0===n?m():(g=!0,y=!1,n)};else{var b=(l?H:K)((()=>t[e]));b.f|=131072,f=()=>{var t=It(b);return void 0!==t&&(h=void 0),void 0===t?h:t}}if(!(4&n))return f;if(v){var _=t.$$legacy;return function(t,e){return arguments.length>0?(i&&e&&!_&&!s||v(e?f():t),t):f()}}var x=!1,S=I(o),k=H((()=>{var t=f(),e=It(S);return x?(x=!1,e):S.v=t}));return l||(k.equals=D),function(t,e){if(arguments.length>0){const n=e?It(k):i&&u?G(t):t;return k.equals(n)||(x=!0,B(S,n),y&&void 0!==h&&(h=n),Rt((()=>It(k)))),t}return It(k)}}M=!0;const wn=t=>t;function _n(t){const e=t-1;return e*e*e+1}function xn(t){const e="string"==typeof t&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}function Sn(t,{delay:e=0,duration:n=400,easing:r=wn}={}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:r,css:t=>"opacity: "+t*o}}function kn(t,{delay:e=0,duration:n=400,easing:r=_n,x:o=0,y:l=0,opacity:i=0}={}){const u=getComputedStyle(t),a=+u.opacity,s="none"===u.transform?"":u.transform,f=a*(1-i),[c,v]=xn(o),[d,p]=xn(l);return{delay:e,duration:n,easing:r,css:(t,e)=>`\n\t\t\ttransform: ${s} translate(${(1-t)*c}${v}, ${(1-t)*d}${p});\n\t\t\topacity: ${a-f*e}`}}function En(t){return t}function $n(t){const e=t-1;return e*e*e+1}function An(t,{from:e,to:n},r={}){var{delay:o=0,duration:l=t=>120*Math.sqrt(t),easing:i=$n}=r,u=getComputedStyle(t),a="none"===u.transform?"":u.transform,[s,f]=u.transformOrigin.split(" ").map(parseFloat);s/=t.clientWidth,f/=t.clientHeight;var c=function(t){if("currentCSSZoom"in t)return t.currentCSSZoom;var e=t,n=1;for(;null!==e;)n*=+getComputedStyle(e).zoom,e=e.parentElement;return n}(t),v=t.clientWidth/n.width/c,d=t.clientHeight/n.height/c,p=e.left+e.width*s,h=e.top+e.height*f,g=n.left+n.width*s,y=n.top+n.height*f,m=(p-g)*v,b=(h-y)*d,w=e.width/n.width,_=e.height/n.height;return{delay:o,duration:"function"==typeof l?l(Math.sqrt(m*m+b*b)):l,easing:i,css:(t,e)=>`transform: ${a} translate(${e*m}px, ${e*b}px) scale(${t+e*w}, ${t+e*_});`}}const Cn={duration:4e3,initial:1,next:0,pausable:!1,dismissable:!0,reversed:!1,intro:{x:256}};const On=function(){const{subscribe:t,update:e}=dn(new Array),n={};let r=0;function o(t){return t instanceof Object}return{subscribe:t,push:function(t,l){const i={target:"default",...o(t)?t:{...l,msg:t}},u=n[i.target]||{},a={...Cn,...u,...i,theme:{...u.theme,...i.theme},classes:[...u.classes||[],...i.classes||[]],id:++r};return e((t=>a.reversed?[...t,a]:[a,...t])),r},pop:function(t){e((e=>{if(!e.length||0===t)return[];if("function"==typeof t)return e.filter((e=>t(e)));if(o(t))return e.filter((e=>e.target!==t.target));const n=t||Math.max(...e.map((t=>t.id)));return e.filter((t=>t.id!==n))}))},set:function(t,n){const r=o(t)?t:{...n,id:t};e((t=>{const e=t.findIndex((t=>t.id===r.id));return e>-1&&(t[e]={...t[e],...r}),t}))},_init:function(t="default",e={}){return n[t]=e,n}}}();function jn(t){return"[object Date]"===Object.prototype.toString.call(t)}function Ln(t,e){if(t===e||t!=t)return()=>t;const n=typeof t;if(n!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const n=e.map(((e,n)=>Ln(t[n],e)));return t=>n.map((e=>e(t)))}if("object"===n){if(!t||!e)throw new Error("Object cannot be null");if(jn(t)&&jn(e)){const n=t.getTime(),r=e.getTime()-n;return t=>new Date(n+t*r)}const n=Object.keys(e),r={};return n.forEach((n=>{r[n]=Ln(t[n],e[n])})),t=>{const e={};return n.forEach((n=>{e[n]=r[n](t)})),e}}if("number"===n){const n=e-t;return e=>t+e*n}return()=>e}var Nn=Ce('<div class="_toastBtn pe svelte-l65oht" role="button" tabindex="0"></div>'),Pn=Ce('<div role="status"><div><!></div> <!> <progress class="_toastBar svelte-l65oht"></progress></div>');function Dn(t,e){de(e,!1);const[n,r]=yn(),o=()=>gn(d,"$progress",n);let l,i,u=bn(e,"item",12),a=R(u().initial),s=R(It(a)),f=R(!1),v=R({});const d=function(t,e={}){const n=dn(t);let r,o=t;function l(l,i){if(o=l,null==t)return n.set(t=l),Promise.resolve();let u=r,a=!1,{delay:s=0,duration:f=400,easing:c=En,interpolate:v=Ln}={...e,...i};if(0===f)return u&&(u.abort(),u=null),n.set(t=o),Promise.resolve();const d=Je.now()+s;let p;return r=Xe((e=>{if(e<d)return!0;a||(p=v(t,l),"function"==typeof f&&(f=f(t,l)),a=!0),u&&(u.abort(),u=null);const r=e-d;return r>f?(n.set(t=l),!1):(n.set(t=p(c(r/f))),!0)})),r.promise}return{set:l,update:(e,n)=>l(e(o,t),n),subscribe:n.subscribe}}(u().initial,{duration:u().duration,easing:En});function p(t){t&&(i=t),On.pop(u().id)}function h(){1!==o()&&0!==o()||p()}function g(){It(f)||o()===It(a)||(d.set(o(),{duration:0}),B(f,!0))}function y(){if(It(f)){const t=u().duration,e=t-t*((o()-It(s))/(It(a)-It(s)));d.set(It(a),{duration:e}).then(h),B(f,!1)}}function m(t,e="undefined"){return typeof t===e}var b;fn((function(t=document){if(m(t.hidden))return;const e=()=>t.hidden?g():y(),n="visibilitychange";t.addEventListener(n,e),l=()=>t.removeEventListener(n,e),e()})),b=()=>{u().onpop&&u().onpop(u().id,{event:i}),l&&l()},null===ce&&fe(),fn((()=>()=>Rt(b))),Ut((()=>(It(a),Ft(u()),o())),(()=>{It(a)!==u().next&&(B(a,u().next),B(s,o()),B(f,!1),d.set(It(a)).then(h))})),Ut((()=>Ft(u())),(()=>{if(u().component){const{props:t={},sendIdTo:e}=u().component;B(v,{...t,...e&&{[e]:u().id}})}})),Ut((()=>Ft(u())),(()=>{m(u().progress)||u(u().next=u().progress,!0)})),Jt(),an();var w=Pn();let _;var x=rt(w);let S;var k=rt(x),E=t=>{var e=Oe();!function(t,e,n){var r,o,l=t;Yt((()=>{r!==(r=e())&&(o&&(le(o),o=null),r&&(o=te((()=>n(l,r)))))}),c)}(ot(e),(()=>u().component.src),((t,e)=>{e(t,function(...t){return new Proxy({props:t},mn)}((()=>It(v))))})),je(t,e)},$=t=>{var e=Oe();!function(t,e){var n,r=t,o="";Yt((()=>{o!==(o=e()??"")&&(void 0!==n&&(re(n),n=void 0),""!==o&&(n=te((()=>{var t=$e(o+"");Ae(et(t),t.lastChild),r.before(t)}))))}))}(ot(e),(()=>u().msg)),je(t,e)};Me(k,(t=>{u().component?t(E):t($,!1)}));var A=lt(x,2),C=t=>{var e=Nn();Se("click",e,(t=>p(t))),Se("keydown",e,(t=>{t instanceof KeyboardEvent&&["Enter"," "].includes(t.key)&&p(t)})),je(t,e)};Me(A,(t=>{u().dismissable&&t(C)}));var O=lt(A,2);Xt((()=>{_=Ve(w,0,"_toastItem svelte-l65oht",null,_,{pe:u().pausable}),S=Ve(x,0,"_toastMsg svelte-l65oht",null,S,{pe:u().component}),Ze(O,o())})),Se("mouseenter",w,(()=>{u().pausable&&g()})),Se("mouseleave",w,y),je(t,w),pe(),r()}var Mn=Ce("<li><!></li>"),Tn=Ce('<ul class="_toastContainer svelte-yh90az"></ul>');function qn(t,e){de(e,!1);const[n,r]=yn(),o=()=>gn(On,"$toast",n);let l=bn(e,"options",24,(()=>({}))),i=bn(e,"target",8,"default"),u=R([]);Ut((()=>(Ft(i()),Ft(l()))),(()=>{On._init(i(),l())})),Ut((()=>(o(),Ft(i()))),(()=>{B(u,o().filter((t=>t.target===i())))})),Jt(),an();var a=Tn();Ie(a,13,(()=>It(u)),(t=>t.id),((t,e)=>{var n=Mn();Dn(rt(n),{get item(){return It(e)}}),Xt(((t,e)=>{Ve(n,0,He(t),"svelte-yh90az"),Ge(n,"style",e)}),[()=>It(e).classes?.join(" "),()=>{return(t=It(e).theme)?Object.keys(t).reduce(((e,n)=>`${e}${n}:${t[n]};`),""):void 0;var t}],K),rn(1,n,(()=>kn),(()=>It(e).intro)),rn(2,n,(()=>Sn)),function(t,e,n){var r,o,l,i=Te,u=null;i.a??={element:t,measure(){r=this.element.getBoundingClientRect()},apply(){if(l?.abort(),o=this.element.getBoundingClientRect(),r.left!==o.left||r.right!==o.right||r.top!==o.top||r.bottom!==o.bottom){const t=e()(this.element,{from:r,to:o},n?.());l=on(this.element,t,void 0,1,(()=>{l?.abort(),l=void 0}))}},fix(){if(!t.getAnimations().length){var{position:e,width:n,height:o}=getComputedStyle(t);if("absolute"!==e&&"fixed"!==e){var l=t.style;u={position:l.position,width:l.width,height:l.height,transform:l.transform},l.position="absolute",l.width=n,l.height=o;var i=t.getBoundingClientRect();if(r.left!==i.left||r.top!==i.top){var a=`translate(${r.left-i.left}px, ${r.top-i.top}px)`;l.transform=l.transform?`${l.transform} ${a}`:a}}}},unfix(){if(u){var e=t.style;e.position=u.position,e.width=u.width,e.height=u.height,e.transform=u.transform}}},i.a.element=t}(n,(()=>An),(()=>({duration:200}))),je(t,n)})),je(t,a),pe(),r()}var In=Ce('<input type="button" data-theme-toggle="">');ke(["click"]);const Rn=()=>{const t=document.querySelectorAll("input[type=text]");t.length<1||t[0].focus()};var zn=Ce('<h2 class="svelte-1uopwy1">Latest Log</h2> <table class="svelte-1uopwy1"><thead><tr><th colspan="1">Log Time</th><th colspan="1">Duration</th><th colspan="1">Activity</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr></tbody></table>',1),Bn=Ce("<tr><td> </td><td> </td><td> </td></tr>"),Fn=Ce('<h2 class="svelte-1uopwy1">Full Summary</h2> <table class="svelte-1uopwy1"><thead><tr><th colspan="1">Log Time</th><th colspan="1">Duration</th><th colspan="1">Activity</th></tr></thead><tbody></tbody></table> <input type="button" value="New Day" class="svelte-1uopwy1">',1),Wn=Ce('<input class="floating svelte-1uopwy1" type="button" value="🖋️">'),Hn=Ce('<!> <h1 class="svelte-1uopwy1">Time Log</h1> <div class="form-wrapper svelte-1uopwy1"><form action="" class="svelte-1uopwy1"><div class="svelte-1uopwy1"><label for="activity">&nbsp;Activity:</label> <br> <input type="text" name="Activity" id="activity" class="svelte-1uopwy1"></div> <input type="submit" value="Log Time" class="svelte-1uopwy1"></form></div> <!> <!> <!> <div id="theme-wrapper" class="svelte-1uopwy1"><!></div> <footer class="svelte-1uopwy1"><a href="https://github.com/matthewnoel/time-log" target="_blank" class="svelte-1uopwy1">The Code</a> <a href="https://raw.githubusercontent.com/matthewnoel/time-log/main/third-party-licenses.txt" target="_blank" class="svelte-1uopwy1">Third-Party Licenses</a></footer>',1);ke(["click"]);var Kn=function(t,e){return function(t,{target:e,anchor:n,props:r={},events:o,context:l,intro:i=!0}){!function(){if(void 0===J){J=window,Q=/Firefox/.test(navigator.userAgent);var t=Element.prototype,e=Node.prototype;X=w(e,"firstChild").get,Y=w(e,"nextSibling").get,t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}();var u=new Set,a=t=>{for(var n=0;n<t.length;n++){var r=t[n];if(!u.has(r)){u.add(r);var o=ye(r);e.addEventListener(r,Ee,{passive:o});var l=Pe.get(r);void 0===l?(document.addEventListener(r,Ee,{passive:o}),Pe.set(r,1)):Pe.set(r,l+1)}}};a(m(_e)),xe.add(a);var s=void 0,f=function(t){const e=Kt(64,t,!0);return(t={})=>new Promise((n=>{t.outro?le(e,(()=>{re(e),n(void 0)})):(re(e),n(void 0))}))}((()=>{var f=n??e.appendChild(tt());return te((()=>{l&&(de({}),ce.c=l);o&&(r.$$events=o),Le=i,s=t(f,r)||{},Le=!0,l&&pe()})),()=>{for(var t of u){e.removeEventListener(t,Ee);var r=Pe.get(t);0==--r?(document.removeEventListener(t,Ee),Pe.delete(t)):Pe.set(t,r)}xe.delete(a),f!==n&&f.parentNode?.removeChild(f)}}));return De.set(s,f),s}(t,e)}((function(t,e){de(e,!0);const n=()=>{const t=Object.assign({},window.localStorage);return delete t.theme,t},r=()=>B(f,G(n())),o=()=>{var t;const e=null!==(t=window.localStorage.getItem("theme"))&&void 0!==t?t:"";window.localStorage.clear(),window.localStorage.setItem("theme",e),r(),On.push("Cleared yesterday's activities!")},l=()=>{var t,e;const n=`${Math.floor(Date.now()/6e4)}`;if(null!=window.localStorage.getItem(n))return void On.push("Cannot update twice per-minute.");(null===(e=null===(t=It(c)[It(c).length-1])||void 0===t?void 0:t.value)||void 0===e?void 0:e.toLowerCase().trim())==It(a).toLowerCase().trim()&&window.localStorage.removeItem(It(c)[It(c).length-1].key),window.localStorage.setItem(n,It(a)),B(a,""),r()},i=t=>{const e=new Date(6e4*t),n=e.getHours(),r=e.getMinutes();return`${n}:${1===`${r}`.length?0:""}${r}`},u=(t,e)=>null==e?"N/A":t-e+" min";let a=q(void 0),s=q(void 0),f=q(G(n())),c=H((()=>Object.entries(It(f)).map((t=>({key:t[0],value:t[1]}))).sort(((t,e)=>Number(t.key)-Number(e.key)))));var v=Hn(),d=ot(v);qn(d,{});var p=lt(d,4),h=rt(p),g=H((()=>{return t=l,function(...e){return e[0].preventDefault(),t?.apply(this,e)};var t})),y=rt(h),m=lt(rt(y),4);Gt((()=>function(t,e,n=e){var r=he();we(t,"input",(o=>{var l=o?t.defaultValue:t.value;if(l=ln(t)?un(l):l,n(l),r&&l!==(l=e())){var i=t.selectionStart,u=t.selectionEnd;t.value=l??"",null!==u&&(t.selectionStart=i,t.selectionEnd=Math.min(u,t.value.length))}})),null==Rt(e)&&t.value&&n(ln(t)?un(t.value):t.value),Qt((()=>{var n=e();ln(t)&&n===un(t.value)||("date"!==t.type||n||t.value)&&n!==t.value&&(t.value=n??"")}))}(m,(()=>It(a)),(t=>B(a,t))))),function(t,e,n){Gt((()=>{var r=Rt((()=>e(t,n?.())||{}));if(r?.destroy)return()=>r.destroy()}))}(m,(t=>(t=>{const e=()=>{B(s,!0),t&&"function"==typeof t.select&&t.select()},n=()=>{B(s,!1)};return t.addEventListener("focus",e),t.addEventListener("blur",n),{destroy(){t.removeEventListener("focus",e),t.removeEventListener("blur",n)}}})?.(t)));var b=lt(y,2),w=lt(p,2),_=t=>{var e=zn(),n=lt(ot(e),2),r=lt(rt(n)),o=rt(r),l=rt(o),a=rt(l),s=lt(l),f=rt(s),v=rt(lt(s));Xt(((t,e)=>{Ne(a,t),Ne(f,e),Ne(v,It(c)[It(c).length-1].value)}),[()=>i(It(c)[It(c).length-1].key),()=>u(It(c)[It(c).length-1].key,It(c)[It(c).length-2].key)]),je(t,e)};Me(w,(t=>{It(c).length>1&&t(_)}));var x=lt(w,2),S=t=>{var e=Fn(),n=lt(ot(e),2);Ie(lt(rt(n)),21,(()=>It(c)),qe,((t,e,n,r)=>{let o=()=>It(e).key;var l=Bn(),a=rt(l),s=rt(a),f=lt(a),v=rt(f),d=rt(lt(f));Xt(((t,n)=>{Ne(s,t),Ne(v,n),Ne(d,It(e).value)}),[()=>i(o()),()=>u(o(),It(c)[n-1]?.key)]),je(t,l)})),lt(n,2).__click=o,je(t,e)};Me(x,(t=>{It(c).length>0&&t(S)}));var k=lt(x,2),E=t=>{var e=Wn();e.__click=[Rn],je(t,e)};Me(k,(t=>{It(s)||t(E)})),function(t,e){var n;de(e,!0);const r=t=>{B(s,G(t===l?"🌞":"🌚")),document.querySelector("html").setAttribute("data-theme",t)},o="light",l="dark",i=null!==(n=localStorage.getItem("theme"))&&void 0!==n?n:"",u=window.matchMedia("(prefers-color-scheme: dark)");let a=(({localStorageTheme:t=i,systemSettingDark:e=u})=>null!==i?i:u.matches?l:o)({localStorageTheme:i,systemSettingDark:u}),s=q("🌞");r(a);var f=In();f.__click=()=>{const t=a===l?o:l;localStorage.setItem("theme",t),r(t),a=t},Xt((()=>{Ge(f,"aria-label","🌚"===It(s)?"Change to dark theme.":"Change to light theme."),Ze(f,It(s))})),je(t,f),pe()}(rt(lt(k,2)),{}),Xt((()=>b.disabled=!It(a))),Se("submit",h,(function(...t){It(g)?.apply(this,t)})),je(t,v),pe()}),{target:document.body});return Kn}();
//# sourceMappingURL=bundle.js.map
