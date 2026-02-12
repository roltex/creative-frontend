import{m as l}from"./index-D4giqbAF.js";/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase()),m=e=>{const t=p(e);return t.charAt(0).toUpperCase()+t.slice(1)},g=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim(),h=e=>e==="";/**
* @license lucide-vue-next v0.544.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
* @license lucide-vue-next v0.544.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const f=({name:e,iconNode:t,absoluteStrokeWidth:r,"absolute-stroke-width":o,strokeWidth:i,"stroke-width":n,size:d=s.width,color:u=s.stroke,...a},{slots:c})=>l("svg",{...s,...a,width:d,height:d,stroke:u,"stroke-width":h(r)||h(o)||r===!0||o===!0?Number(i||n||s["stroke-width"])*24/Number(d):i||n||s["stroke-width"],class:g("lucide",a.class,...e?[`lucide-${w(m(e))}-icon`,`lucide-${w(e)}`]:["lucide-icon"])},[...t.map(k=>l(...k)),...c.default?[c.default()]:[]]);/**
* @license lucide-vue-next v0.544.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const v=(e,t)=>(r,{slots:o,attrs:i})=>l(f,{...i,...r,iconNode:t,name:e},o);export{v};
