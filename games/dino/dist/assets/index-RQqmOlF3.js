(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const El="170",ap=0,Yf=1,op=2,bu=1,cp=2,ri=3,pi=0,$e=1,Fe=2,Bi=0,Or=1,Sc=2,$f=3,Kf=4,Xi=5,ai=100,lp=101,fp=102,up=103,hp=104,wl=200,ji=201,ts=202,dp=203,_r=204,Vs=205,pp=206,mp=207,gp=208,_p=209,vp=210,xp=211,Mp=212,yp=213,Sp=214,bc=0,Ec=1,wc=2,Gr=3,Tc=4,Ac=5,Rc=6,Cc=7,Tl=0,bp=1,Ep=2,Gi=0,wp=1,Tp=2,Ap=3,Rp=4,Cp=5,Pp=6,Lp=7,Eu=300,Vr=301,Hr=302,Pc=303,Lc=304,ro=306,ka=1e3,$n=1001,Ic=1002,xn=1003,Ip=1004,ya=1005,vn=1006,ic=1007,fi=1008,mi=1009,wu=1010,Tu=1011,Hs=1012,Al=1013,vr=1014,ui=1015,Zs=1016,Rl=1017,Cl=1018,Wr=1020,Au=35902,Ru=1021,Cu=1022,Nn=1023,Pu=1024,Lu=1025,kr=1026,Xr=1027,Iu=1028,Pl=1029,Du=1030,Ll=1031,Il=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,Dc=35840,Uc=35841,Nc=35842,Fc=35843,Oc=36196,kc=37492,zc=37496,Bc=37808,Gc=37809,Vc=37810,Hc=37811,Wc=37812,Xc=37813,jc=37814,qc=37815,Yc=37816,$c=37817,Kc=37818,Zc=37819,Jc=37820,Qc=37821,Pa=36492,tl=36494,el=36495,Uu=36283,nl=36284,il=36285,rl=36286,Dp=3200,Up=3201,Nu=0,Np=1,Pi="",on="srgb",es="srgb-linear",so="linear",_e="srgb",Lr=7680,Zf=519,Fp=512,Op=513,kp=514,Fu=515,zp=516,Bp=517,Gp=518,Vp=519,sl=35044,Jf="300 es",hi=2e3,za=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bh=1234567;const La=Math.PI/180,Ba=180/Math.PI;function Vi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function hn(n,t,e){return Math.max(t,Math.min(e,n))}function Ou(n,t){return(n%t+t)%t}function B0(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function G0(n,t,e){return n!==t?(e-n)/(t-n):0}function Ia(n,t,e){return(1-e)*n+e*t}function V0(n,t,e,i){return Ia(n,t,1-Math.exp(-e*i))}function H0(n,t=1){return t-Math.abs(Ou(n,t*2)-t)}function W0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function X0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function j0(n,t){return n+Math.floor(Math.random()*(t-n+1))}function q0(n,t){return n+Math.random()*(t-n)}function Y0(n){return n*(.5-Math.random())}function $0(n){n!==void 0&&(bh=n);let t=bh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function K0(n){return n*La}function Z0(n){return n*Ba}function J0(n){return(n&n-1)===0&&n!==0}function Q0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function tg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function eg(n,t,e,i,r){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+i)/2),f=a((t+i)/2),u=s((t-i)/2),h=a((t-i)/2),m=s((i-t)/2),g=a((i-t)/2);switch(r){case"XYX":n.set(o*f,c*u,c*h,o*l);break;case"YZY":n.set(c*h,o*f,c*u,o*l);break;case"ZXZ":n.set(c*u,c*h,o*f,o*l);break;case"XZX":n.set(o*f,c*g,c*m,o*l);break;case"YXY":n.set(c*m,o*f,c*g,o*l);break;case"ZYZ":n.set(c*g,c*m,o*f,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function qn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ve(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Li={DEG2RAD:La,RAD2DEG:Ba,generateUUID:Vi,clamp:hn,euclideanModulo:Ou,mapLinear:B0,inverseLerp:G0,lerp:Ia,damp:V0,pingpong:H0,smoothstep:W0,smootherstep:X0,randInt:j0,randFloat:q0,randFloatSpread:Y0,seededRandom:$0,degToRad:K0,radToDeg:Z0,isPowerOfTwo:J0,ceilPowerOfTwo:Q0,floorPowerOfTwo:tg,setQuaternionFromProperEuler:eg,normalize:ve,denormalize:qn};class ie{constructor(t=0,e=0){ie.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(hn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,i,r,s,a,o,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,l)}set(t,e,i,r,s,a,o,c,l){const f=this.elements;return f[0]=t,f[1]=r,f[2]=o,f[3]=e,f[4]=s,f[5]=c,f[6]=i,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],f=i[4],u=i[7],h=i[2],m=i[5],g=i[8],x=r[0],p=r[3],d=r[6],b=r[1],A=r[4],y=r[7],I=r[2],P=r[5],C=r[8];return s[0]=a*x+o*b+c*I,s[3]=a*p+o*A+c*P,s[6]=a*d+o*y+c*C,s[1]=l*x+f*b+u*I,s[4]=l*p+f*A+u*P,s[7]=l*d+f*y+u*C,s[2]=h*x+m*b+g*I,s[5]=h*p+m*A+g*P,s[8]=h*d+m*y+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],f=t[8];return e*a*f-e*o*l-i*s*f+i*o*c+r*s*l-r*a*c}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],f=t[8],u=f*a-o*l,h=o*c-f*s,m=l*s-a*c,g=e*u+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(r*l-f*i)*x,t[2]=(o*i-r*a)*x,t[3]=h*x,t[4]=(f*e-r*c)*x,t[5]=(r*s-o*e)*x,t[6]=m*x,t[7]=(i*c-l*e)*x,t[8]=(a*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Wl.makeScale(t,e)),this}rotate(t){return this.premultiply(Wl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wl=new Jt;function Hp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ga(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Wp(){const n=Ga("canvas");return n.style.display="block",n}const Eh={};function Sa(n){n in Eh||(Eh[n]=!0,console.warn(n))}function ng(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function ig(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rg(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const oe={enabled:!0,workingColorSpace:es,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===_e&&(n.r=Hi(n.r),n.g=Hi(n.g),n.b=Hi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===_e&&(n.r=ks(n.r),n.g=ks(n.g),n.b=ks(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Pi?so:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ks(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const wh=[.64,.33,.3,.6,.15,.06],Th=[.2126,.7152,.0722],Ah=[.3127,.329],Rh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ch=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);oe.define({[es]:{primaries:wh,whitePoint:Ah,transfer:so,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:Th,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:wh,whitePoint:Ah,transfer:_e,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:Th,outputColorSpaceConfig:{drawingBufferColorSpace:on}}});let os;class Xp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{os===void 0&&(os=Ga("canvas")),os.width=t.width,os.height=t.height;const i=os.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=os}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ga("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hi(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Hi(e[i]/255)*255):e[i]=Hi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sg=0;class ku{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Vi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Xl(r[a].image)):s.push(Xl(r[a]))}else s=Xl(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Xl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ag=0;class Qe extends ns{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=$n,r=$n,s=vn,a=fi,o=Nn,c=mi,l=Qe.DEFAULT_ANISOTROPY,f=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Vi(),this.name="",this.source=new ku(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Eu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ka:t.x=t.x-Math.floor(t.x);break;case $n:t.x=t.x<0?0:1;break;case Ic:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ka:t.y=t.y-Math.floor(t.y);break;case $n:t.y=t.y<0?0:1;break;case Ic:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Eu;Qe.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,i=0,r=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const c=t.elements,l=c[0],f=c[4],u=c[8],h=c[1],m=c[5],g=c[9],x=c[2],p=c[6],d=c[10];if(Math.abs(f-h)<.01&&Math.abs(u-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(f+h)<.1&&Math.abs(u+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(l+1)/2,y=(m+1)/2,I=(d+1)/2,P=(f+h)/4,C=(u+x)/4,L=(g+p)/4;return A>y&&A>I?A<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(A),r=P/i,s=C/i):y>I?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=P/r,s=L/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=C/s,r=L/s),this.set(i,r,s,e),this}let b=Math.sqrt((p-g)*(p-g)+(u-x)*(u-x)+(h-f)*(h-f));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-x)/b,this.z=(h-f)/b,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jp extends ns{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Qe(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ku(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xr extends jp{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class zu extends Qe{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qp extends Qe{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let c=i[r+0],l=i[r+1],f=i[r+2],u=i[r+3];const h=s[a+0],m=s[a+1],g=s[a+2],x=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=f,t[e+3]=u;return}if(o===1){t[e+0]=h,t[e+1]=m,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==h||l!==m||f!==g){let p=1-o;const d=c*h+l*m+f*g+u*x,b=d>=0?1:-1,A=1-d*d;if(A>Number.EPSILON){const I=Math.sqrt(A),P=Math.atan2(I,d*b);p=Math.sin(p*P)/I,o=Math.sin(o*P)/I}const y=o*b;if(c=c*p+h*y,l=l*p+m*y,f=f*p+g*y,u=u*p+x*y,p===1-o){const I=1/Math.sqrt(c*c+l*l+f*f+u*u);c*=I,l*=I,f*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=f,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],f=i[r+3],u=s[a],h=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+f*u+c*m-l*h,t[e+1]=c*g+f*h+l*u-o*m,t[e+2]=l*g+f*m+o*h-c*u,t[e+3]=f*g-o*u-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),f=o(r/2),u=o(s/2),h=c(i/2),m=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*f*u+l*m*g,this._y=l*m*u-h*f*g,this._z=l*f*g+h*m*u,this._w=l*f*u-h*m*g;break;case"YXZ":this._x=h*f*u+l*m*g,this._y=l*m*u-h*f*g,this._z=l*f*g-h*m*u,this._w=l*f*u+h*m*g;break;case"ZXY":this._x=h*f*u-l*m*g,this._y=l*m*u+h*f*g,this._z=l*f*g+h*m*u,this._w=l*f*u-h*m*g;break;case"ZYX":this._x=h*f*u-l*m*g,this._y=l*m*u+h*f*g,this._z=l*f*g-h*m*u,this._w=l*f*u+h*m*g;break;case"YZX":this._x=h*f*u+l*m*g,this._y=l*m*u+h*f*g,this._z=l*f*g-h*m*u,this._w=l*f*u-h*m*g;break;case"XZY":this._x=h*f*u-l*m*g,this._y=l*m*u-h*f*g,this._z=l*f*g+h*m*u,this._w=l*f*u+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],f=e[6],u=e[10],h=i+o+u;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(hn(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,f=e._w;return this._x=i*f+a*o+r*l-s*c,this._y=r*f+a*c+s*o-i*l,this._z=s*f+a*l+i*c-r*o,this._w=a*f-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),f=Math.atan2(l,o),u=Math.sin((1-e)*f)/l,h=Math.sin(e*f)/l;return this._w=a*u+this._w*h,this._x=i*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ph.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ph.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*i),f=2*(o*e-s*r),u=2*(s*i-a*e);return this.x=e+c*l+a*u-o*f,this.y=i+c*f+o*l-s*u,this.z=r+c*u+s*f-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return jl.copy(this).projectOnVector(t),this.sub(jl)}reflect(t){return this.sub(jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(hn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jl=new O,Ph=new Mr;class Js{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Gn):Gn.fromBufferAttribute(s,a),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(t.matrixWorld),this.union(vo)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ca),xo.subVectors(this.max,ca),cs.subVectors(t.a,ca),ls.subVectors(t.b,ca),fs.subVectors(t.c,ca),Qi.subVectors(ls,cs),tr.subVectors(fs,ls),Er.subVectors(cs,fs);let e=[0,-Qi.z,Qi.y,0,-tr.z,tr.y,0,-Er.z,Er.y,Qi.z,0,-Qi.x,tr.z,0,-tr.x,Er.z,0,-Er.x,-Qi.y,Qi.x,0,-tr.y,tr.x,0,-Er.y,Er.x,0];return!ql(e,cs,ls,fs,xo)||(e=[1,0,0,0,1,0,0,0,1],!ql(e,cs,ls,fs,xo))?!1:(Mo.crossVectors(Qi,tr),e=[Mo.x,Mo.y,Mo.z],ql(e,cs,ls,fs,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yi=[new O,new O,new O,new O,new O,new O,new O,new O],Gn=new O,vo=new Js,cs=new O,ls=new O,fs=new O,Qi=new O,tr=new O,Er=new O,ca=new O,xo=new O,Mo=new O,wr=new O;function ql(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){wr.fromArray(n,s);const o=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),c=t.dot(wr),l=e.dot(wr),f=i.dot(wr);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const og=new Js,la=new O,Yl=new O;class Qs{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):og.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;la.subVectors(t,this.center);const e=la.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(la,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(la.copy(t.center).add(Yl)),this.expandByPoint(la.copy(t.center).sub(Yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Si=new O,$l=new O,yo=new O,er=new O,Kl=new O,So=new O,Zl=new O;class Bu{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Si.copy(this.origin).addScaledVector(this.direction,e),Si.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){$l.copy(t).add(e).multiplyScalar(.5),yo.copy(e).sub(t).normalize(),er.copy(this.origin).sub($l);const s=t.distanceTo(e)*.5,a=-this.direction.dot(yo),o=er.dot(this.direction),c=-er.dot(yo),l=er.lengthSq(),f=Math.abs(1-a*a);let u,h,m,g;if(f>0)if(u=a*c-o,h=a*o-c,g=s*f,u>=0)if(h>=-g)if(h<=g){const x=1/f;u*=x,h*=x,m=u*(u+a*h+2*o)+h*(a*u+h+2*c)+l}else h=s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;else h=-s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;else h<=-g?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+h*(h+2*c)+l):h<=g?(u=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+l):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+h*(h+2*c)+l);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy($l).addScaledVector(yo,h),m}intersectSphere(t,e){Si.subVectors(t.center,this.origin);const i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,r=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,r=(t.min.x-h.x)*l),f>=0?(s=(t.min.y-h.y)*f,a=(t.max.y-h.y)*f):(s=(t.max.y-h.y)*f,a=(t.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-h.z)*u,c=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,c=(t.min.z-h.z)*u),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Si)!==null}intersectTriangle(t,e,i,r,s){Kl.subVectors(e,t),So.subVectors(i,t),Zl.crossVectors(Kl,So);let a=this.direction.dot(Zl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;er.subVectors(this.origin,t);const c=o*this.direction.dot(So.crossVectors(er,So));if(c<0)return null;const l=o*this.direction.dot(Kl.cross(er));if(l<0||c+l>a)return null;const f=-o*er.dot(Zl);return f<0?null:this.at(f/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(t,e,i,r,s,a,o,c,l,f,u,h,m,g,x,p){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,l,f,u,h,m,g,x,p)}set(t,e,i,r,s,a,o,c,l,f,u,h,m,g,x,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=f,d[10]=u,d[14]=h,d[3]=m,d[7]=g,d[11]=x,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/us.setFromMatrixColumn(t,0).length(),s=1/us.setFromMatrixColumn(t,1).length(),a=1/us.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),f=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const h=a*f,m=a*u,g=o*f,x=o*u;e[0]=c*f,e[4]=-c*u,e[8]=l,e[1]=m+g*l,e[5]=h-x*l,e[9]=-o*c,e[2]=x-h*l,e[6]=g+m*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*f,m=c*u,g=l*f,x=l*u;e[0]=h+x*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*u,e[5]=a*f,e[9]=-o,e[2]=m*o-g,e[6]=x+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*f,m=c*u,g=l*f,x=l*u;e[0]=h-x*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*f,e[9]=x-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*f,m=a*u,g=o*f,x=o*u;e[0]=c*f,e[4]=g*l-m,e[8]=h*l+x,e[1]=c*u,e[5]=x*l+h,e[9]=m*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*f,e[4]=x-h*u,e[8]=g*u+m,e[1]=u,e[5]=a*f,e[9]=-o*f,e[2]=-l*f,e[6]=m*u+g,e[10]=h-x*u}else if(t.order==="XZY"){const h=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*f,e[4]=-u,e[8]=l*f,e[1]=h*u+x,e[5]=a*f,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*f,e[10]=x*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cg,t,lg)}lookAt(t,e,i){const r=this.elements;return Sn.subVectors(t,e),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),nr.crossVectors(i,Sn),nr.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),nr.crossVectors(i,Sn)),nr.normalize(),bo.crossVectors(Sn,nr),r[0]=nr.x,r[4]=bo.x,r[8]=Sn.x,r[1]=nr.y,r[5]=bo.y,r[9]=Sn.y,r[2]=nr.z,r[6]=bo.z,r[10]=Sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],f=i[1],u=i[5],h=i[9],m=i[13],g=i[2],x=i[6],p=i[10],d=i[14],b=i[3],A=i[7],y=i[11],I=i[15],P=r[0],C=r[4],L=r[8],v=r[12],_=r[1],w=r[5],k=r[9],N=r[13],B=r[2],j=r[6],R=r[10],V=r[14],U=r[3],rt=r[7],q=r[11],J=r[15];return s[0]=a*P+o*_+c*B+l*U,s[4]=a*C+o*w+c*j+l*rt,s[8]=a*L+o*k+c*R+l*q,s[12]=a*v+o*N+c*V+l*J,s[1]=f*P+u*_+h*B+m*U,s[5]=f*C+u*w+h*j+m*rt,s[9]=f*L+u*k+h*R+m*q,s[13]=f*v+u*N+h*V+m*J,s[2]=g*P+x*_+p*B+d*U,s[6]=g*C+x*w+p*j+d*rt,s[10]=g*L+x*k+p*R+d*q,s[14]=g*v+x*N+p*V+d*J,s[3]=b*P+A*_+y*B+I*U,s[7]=b*C+A*w+y*j+I*rt,s[11]=b*L+A*k+y*R+I*q,s[15]=b*v+A*N+y*V+I*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],f=t[2],u=t[6],h=t[10],m=t[14],g=t[3],x=t[7],p=t[11],d=t[15];return g*(+s*c*u-r*l*u-s*o*h+i*l*h+r*o*m-i*c*m)+x*(+e*c*m-e*l*h+s*a*h-r*a*m+r*l*f-s*c*f)+p*(+e*l*u-e*o*m-s*a*u+i*a*m+s*o*f-i*l*f)+d*(-r*o*f-e*c*u+e*o*h+r*a*u-i*a*h+i*c*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],f=t[8],u=t[9],h=t[10],m=t[11],g=t[12],x=t[13],p=t[14],d=t[15],b=u*p*l-x*h*l+x*c*m-o*p*m-u*c*d+o*h*d,A=g*h*l-f*p*l-g*c*m+a*p*m+f*c*d-a*h*d,y=f*x*l-g*u*l+g*o*m-a*x*m-f*o*d+a*u*d,I=g*u*c-f*x*c-g*o*h+a*x*h+f*o*p-a*u*p,P=e*b+i*A+r*y+s*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return t[0]=b*C,t[1]=(x*h*s-u*p*s-x*r*m+i*p*m+u*r*d-i*h*d)*C,t[2]=(o*p*s-x*c*s+x*r*l-i*p*l-o*r*d+i*c*d)*C,t[3]=(u*c*s-o*h*s-u*r*l+i*h*l+o*r*m-i*c*m)*C,t[4]=A*C,t[5]=(f*p*s-g*h*s+g*r*m-e*p*m-f*r*d+e*h*d)*C,t[6]=(g*c*s-a*p*s-g*r*l+e*p*l+a*r*d-e*c*d)*C,t[7]=(a*h*s-f*c*s+f*r*l-e*h*l-a*r*m+e*c*m)*C,t[8]=y*C,t[9]=(g*u*s-f*x*s-g*i*m+e*x*m+f*i*d-e*u*d)*C,t[10]=(a*x*s-g*o*s+g*i*l-e*x*l-a*i*d+e*o*d)*C,t[11]=(f*o*s-a*u*s-f*i*l+e*u*l+a*i*m-e*o*m)*C,t[12]=I*C,t[13]=(f*x*r-g*u*r+g*i*h-e*x*h-f*i*p+e*u*p)*C,t[14]=(g*o*r-a*x*r-g*i*c+e*x*c+a*i*p-e*o*p)*C,t[15]=(a*u*r-f*o*r+f*i*c-e*u*c-a*i*h+e*o*h)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,c=t.z,l=s*a,f=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,f*o+i,f*c-r*a,0,l*c-r*o,f*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,f=a+a,u=o+o,h=s*l,m=s*f,g=s*u,x=a*f,p=a*u,d=o*u,b=c*l,A=c*f,y=c*u,I=i.x,P=i.y,C=i.z;return r[0]=(1-(x+d))*I,r[1]=(m+y)*I,r[2]=(g-A)*I,r[3]=0,r[4]=(m-y)*P,r[5]=(1-(h+d))*P,r[6]=(p+b)*P,r[7]=0,r[8]=(g+A)*C,r[9]=(p-b)*C,r[10]=(1-(h+x))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=us.set(r[0],r[1],r[2]).length();const a=us.set(r[4],r[5],r[6]).length(),o=us.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Vn.copy(this);const l=1/s,f=1/a,u=1/o;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=f,Vn.elements[5]*=f,Vn.elements[6]*=f,Vn.elements[8]*=u,Vn.elements[9]*=u,Vn.elements[10]*=u,e.setFromRotationMatrix(Vn),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=hi){const c=this.elements,l=2*s/(e-t),f=2*s/(i-r),u=(e+t)/(e-t),h=(i+r)/(i-r);let m,g;if(o===hi)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===za)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=hi){const c=this.elements,l=1/(e-t),f=1/(i-r),u=1/(a-s),h=(e+t)*l,m=(i+r)*f;let g,x;if(o===hi)g=(a+s)*u,x=-2*u;else if(o===za)g=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*f,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const us=new O,Vn=new Ht,cg=new O(0,0,0),lg=new O(1,1,1),nr=new O,bo=new O,Sn=new O,Lh=new Ht,Ih=new Mr;class kn{constructor(t=0,e=0,i=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],f=r[9],u=r[2],h=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(hn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-hn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Lh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ih.setFromEuler(this),this.setFromQuaternion(Ih,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Gu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fg=0;const Dh=new O,hs=new Mr,bi=new Ht,Eo=new O,fa=new O,ug=new O,hg=new Mr,Uh=new O(1,0,0),Nh=new O(0,1,0),Fh=new O(0,0,1),Oh={type:"added"},dg={type:"removed"},ds={type:"childadded",child:null},Jl={type:"childremoved",child:null};class Ve extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new O,e=new kn,i=new Mr,r=new O(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Jt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.multiply(hs),this}rotateOnWorldAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.premultiply(hs),this}rotateX(t){return this.rotateOnAxis(Uh,t)}rotateY(t){return this.rotateOnAxis(Nh,t)}rotateZ(t){return this.rotateOnAxis(Fh,t)}translateOnAxis(t,e){return Dh.copy(t).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uh,t)}translateY(t){return this.translateOnAxis(Nh,t)}translateZ(t){return this.translateOnAxis(Fh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Eo.copy(t):Eo.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(fa,Eo,this.up):bi.lookAt(Eo,fa,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),hs.setFromRotationMatrix(bi),this.quaternion.premultiply(hs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Oh),ds.child=t,this.dispatchEvent(ds),ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dg),Jl.child=t,this.dispatchEvent(Jl),Jl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Oh),ds.child=t,this.dispatchEvent(ds),ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,t,ug),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,hg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),f=a(t.images),u=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),f.length>0&&(i.images=f),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Ve.DEFAULT_UP=new O(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hn=new O,Ei=new O,Ql=new O,wi=new O,ps=new O,ms=new O,kh=new O,tf=new O,ef=new O,nf=new O,rf=new xe,sf=new xe,af=new xe;class wn{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Hn.subVectors(t,e),r.cross(Hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Hn.subVectors(r,e),Ei.subVectors(i,e),Ql.subVectors(t,e);const a=Hn.dot(Hn),o=Hn.dot(Ei),c=Hn.dot(Ql),l=Ei.dot(Ei),f=Ei.dot(Ql),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,m=(l*c-o*f)*h,g=(a*f-o*c)*h;return s.set(1-m-g,g,m)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(t,e,i,r,s,a,o,c){return this.getBarycoord(t,e,i,r,wi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,wi.x),c.addScaledVector(a,wi.y),c.addScaledVector(o,wi.z),c)}static getInterpolatedAttribute(t,e,i,r,s,a){return rf.setScalar(0),sf.setScalar(0),af.setScalar(0),rf.fromBufferAttribute(t,e),sf.fromBufferAttribute(t,i),af.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(rf,s.x),a.addScaledVector(sf,s.y),a.addScaledVector(af,s.z),a}static isFrontFacing(t,e,i,r){return Hn.subVectors(i,e),Ei.subVectors(t,e),Hn.cross(Ei).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Hn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Hn.cross(Ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return wn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;ps.subVectors(r,i),ms.subVectors(s,i),tf.subVectors(t,i);const c=ps.dot(tf),l=ms.dot(tf);if(c<=0&&l<=0)return e.copy(i);ef.subVectors(t,r);const f=ps.dot(ef),u=ms.dot(ef);if(f>=0&&u<=f)return e.copy(r);const h=c*u-f*l;if(h<=0&&c>=0&&f<=0)return a=c/(c-f),e.copy(i).addScaledVector(ps,a);nf.subVectors(t,s);const m=ps.dot(nf),g=ms.dot(nf);if(g>=0&&m<=g)return e.copy(s);const x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(ms,o);const p=f*g-m*u;if(p<=0&&u-f>=0&&m-g>=0)return kh.subVectors(s,r),o=(u-f)/(u-f+(m-g)),e.copy(r).addScaledVector(kh,o);const d=1/(p+x+h);return a=x*d,o=h*d,e.copy(i).addScaledVector(ps,a).addScaledVector(ms,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},wo={h:0,s:0,l:0};function of(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Yt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=oe.workingColorSpace){if(t=Ou(t,1),e=hn(e,0,1),i=hn(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=of(a,s,t+1/3),this.g=of(a,s,t),this.b=of(a,s,t-1/3)}return oe.toWorkingColorSpace(this,r),this}setStyle(t,e=on){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){const i=Yp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}copyLinearToSRGB(t){return this.r=ks(t.r),this.g=ks(t.g),this.b=ks(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return oe.fromWorkingColorSpace(rn.copy(this),t),Math.round(hn(rn.r*255,0,255))*65536+Math.round(hn(rn.g*255,0,255))*256+Math.round(hn(rn.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(rn.copy(this),e);const i=rn.r,r=rn.g,s=rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=f<=.5?u/(a+o):u/(2-a-o),a){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=f,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=on){oe.fromWorkingColorSpace(rn.copy(this),t);const e=rn.r,i=rn.g,r=rn.b;return t!==on?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(ir),this.setHSL(ir.h+t,ir.s+e,ir.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ir),t.getHSL(wo);const i=Ia(ir.h,wo.h,e),r=Ia(ir.s,wo.s,e),s=Ia(ir.l,wo.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new Yt;Yt.NAMES=Yp;let pg=0;class Sr extends ns{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Vi(),this.name="",this.blending=Or,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_r,this.blendDst=Vs,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lr,this.stencilZFail=Lr,this.stencilZPass=Lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Or&&(i.blending=this.blending),this.side!==pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_r&&(i.blendSrc=this.blendSrc),this.blendDst!==Vs&&(i.blendDst=this.blendDst),this.blendEquation!==ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Gr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Lr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Lr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Lr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class An extends Sr{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ke=new O,To=new ie;class ye{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=sl,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)To.fromBufferAttribute(this,e),To.applyMatrix3(t),this.setXY(e,To.x,To.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=qn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ve(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),r=ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),r=ve(r,this.array),s=ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sl&&(t.usage=this.usage),t}}class Vu extends ye{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Hu extends ye{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Je extends ye{constructor(t,e,i){super(new Float32Array(t),e,i)}}let mg=0;const Ln=new Ht,cf=new Ve,gs=new O,bn=new Js,ua=new Js,je=new O;class Ge extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hp(t)?Hu:Vu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Jt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,i){return Ln.makeTranslation(t,e,i),this.applyMatrix4(Ln),this}scale(t,e,i){return Ln.makeScale(t,e,i),this.applyMatrix4(Ln),this}lookAt(t){return cf.lookAt(t),cf.updateMatrix(),this.applyMatrix4(cf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Je(i,3))}else{for(let i=0,r=e.count;i<r;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Js);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(bn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];ua.setFromBufferAttribute(o),this.morphTargetsRelative?(je.addVectors(bn.min,ua.min),bn.expandByPoint(je),je.addVectors(bn.max,ua.max),bn.expandByPoint(je)):(bn.expandByPoint(ua.min),bn.expandByPoint(ua.max))}bn.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)je.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(je));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)je.fromBufferAttribute(o,l),c&&(gs.fromBufferAttribute(t,l),je.add(gs)),r=Math.max(r,i.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<i.count;L++)o[L]=new O,c[L]=new O;const l=new O,f=new O,u=new O,h=new ie,m=new ie,g=new ie,x=new O,p=new O;function d(L,v,_){l.fromBufferAttribute(i,L),f.fromBufferAttribute(i,v),u.fromBufferAttribute(i,_),h.fromBufferAttribute(s,L),m.fromBufferAttribute(s,v),g.fromBufferAttribute(s,_),f.sub(l),u.sub(l),m.sub(h),g.sub(h);const w=1/(m.x*g.y-g.x*m.y);isFinite(w)&&(x.copy(f).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(w),p.copy(u).multiplyScalar(m.x).addScaledVector(f,-g.x).multiplyScalar(w),o[L].add(x),o[v].add(x),o[_].add(x),c[L].add(p),c[v].add(p),c[_].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,v=b.length;L<v;++L){const _=b[L],w=_.start,k=_.count;for(let N=w,B=w+k;N<B;N+=3)d(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const A=new O,y=new O,I=new O,P=new O;function C(L){I.fromBufferAttribute(r,L),P.copy(I);const v=o[L];A.copy(v),A.sub(I.multiplyScalar(I.dot(v))).normalize(),y.crossVectors(P,v);const w=y.dot(c[L])<0?-1:1;a.setXYZW(L,A.x,A.y,A.z,w)}for(let L=0,v=b.length;L<v;++L){const _=b[L],w=_.start,k=_.count;for(let N=w,B=w+k;N<B;N+=3)C(t.getX(N+0)),C(t.getX(N+1)),C(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new O,s=new O,a=new O,o=new O,c=new O,l=new O,f=new O,u=new O;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),x=t.getX(h+1),p=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,p),o.add(f),c.add(f),l.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(o,c){const l=o.array,f=o.itemSize,u=o.normalized,h=new l.constructor(c.length*f);let m=0,g=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*f;for(let d=0;d<f;d++)h[g++]=l[m++]}return new ye(h,f,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,i);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let f=0,u=l.length;f<u;f++){const h=l[f],m=t(h,i);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let u=0,h=l.length;u<h;u++){const m=l[u];f.push(m.toJSON(t.data))}f.length>0&&(r[c]=f,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const l in r){const f=r[l];this.setAttribute(l,f.clone(e))}const s=t.morphAttributes;for(const l in s){const f=[],u=s[l];for(let h=0,m=u.length;h<m;h++)f.push(u[h].clone(e));this.morphAttributes[l]=f}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,f=a.length;l<f;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zh=new Ht,Tr=new Bu,Ao=new Qs,Bh=new O,Ro=new O,Co=new O,Po=new O,lf=new O,Lo=new O,Gh=new O,Io=new O;class pe extends Ve{constructor(t=new Ge,e=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Lo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const f=o[c],u=s[c];f!==0&&(lf.fromBufferAttribute(u,t),a?Lo.addScaledVector(lf,f):Lo.addScaledVector(lf.sub(e),f))}e.add(Lo)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(s),Tr.copy(t.ray).recast(t.near),!(Ao.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(Ao,Bh)===null||Tr.origin.distanceToSquared(Bh)>(t.far-t.near)**2))&&(zh.copy(s).invert(),Tr.copy(t.ray).applyMatrix4(zh),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Tr)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,f=s.attributes.uv1,u=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const p=h[g],d=a[p.materialIndex],b=Math.max(p.start,m.start),A=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,I=A;y<I;y+=3){const P=o.getX(y),C=o.getX(y+1),L=o.getX(y+2);r=Do(this,d,t,i,l,f,u,P,C,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=g,d=x;p<d;p+=3){const b=o.getX(p),A=o.getX(p+1),y=o.getX(p+2);r=Do(this,a,t,i,l,f,u,b,A,y),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const p=h[g],d=a[p.materialIndex],b=Math.max(p.start,m.start),A=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,I=A;y<I;y+=3){const P=y,C=y+1,L=y+2;r=Do(this,d,t,i,l,f,u,P,C,L),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=g,d=x;p<d;p+=3){const b=p,A=p+1,y=p+2;r=Do(this,a,t,i,l,f,u,b,A,y),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function gg(n,t,e,i,r,s,a,o){let c;if(t.side===$e?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,t.side===pi,o),c===null)return null;Io.copy(o),Io.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Io);return l<e.near||l>e.far?null:{distance:l,point:Io.clone(),object:n}}function Do(n,t,e,i,r,s,a,o,c,l){n.getVertexPosition(o,Ro),n.getVertexPosition(c,Co),n.getVertexPosition(l,Po);const f=gg(n,t,e,i,Ro,Co,Po,Gh);if(f){const u=new O;wn.getBarycoord(Gh,Ro,Co,Po,u),r&&(f.uv=wn.getInterpolatedAttribute(r,o,c,l,u,new ie)),s&&(f.uv1=wn.getInterpolatedAttribute(s,o,c,l,u,new ie)),a&&(f.normal=wn.getInterpolatedAttribute(a,o,c,l,u,new O),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new O,materialIndex:0};wn.getNormal(Ro,Co,Po,h.normal),f.face=h,f.barycoord=u}return f}class ta extends Ge{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],f=[],u=[];let h=0,m=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,r,a,2),g("x","z","y",1,-1,t,i,-e,r,a,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(u,2));function g(x,p,d,b,A,y,I,P,C,L,v){const _=y/C,w=I/L,k=y/2,N=I/2,B=P/2,j=C+1,R=L+1;let V=0,U=0;const rt=new O;for(let q=0;q<R;q++){const J=q*w-N;for(let lt=0;lt<j;lt++){const ht=lt*_-k;rt[x]=ht*b,rt[p]=J*A,rt[d]=B,l.push(rt.x,rt.y,rt.z),rt[x]=0,rt[p]=0,rt[d]=P>0?1:-1,f.push(rt.x,rt.y,rt.z),u.push(lt/C),u.push(1-q/L),V+=1}}for(let q=0;q<L;q++)for(let J=0;J<C;J++){const lt=h+J+j*q,ht=h+J+j*(q+1),G=h+(J+1)+j*(q+1),Y=h+(J+1)+j*q;c.push(lt,ht,Y),c.push(ht,G,Y),U+=6}o.addGroup(m,U,v),m+=U,h+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ws(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function un(n){const t={};for(let e=0;e<n.length;e++){const i=Ws(n[e]);for(const r in i)t[r]=i[r]}return t}function _g(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function $p(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const Kp={clone:Ws,merge:un};var vg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends Sr{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vg,this.fragmentShader=xg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=_g(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Wu extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=hi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rr=new O,Vh=new ie,Hh=new ie;class _n extends Wu{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ba*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rr.x,rr.y).multiplyScalar(-t/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-t/rr.z)}getViewSize(t,e){return this.getViewBounds(t,Vh,Hh),e.subVectors(Hh,Vh)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(La*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,vs=1;class Zp extends Ve{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new _n(_s,vs,t,e);r.layers=this.layers,this.add(r);const s=new _n(_s,vs,t,e);s.layers=this.layers,this.add(s);const a=new _n(_s,vs,t,e);a.layers=this.layers,this.add(a);const o=new _n(_s,vs,t,e);o.layers=this.layers,this.add(o);const c=new _n(_s,vs,t,e);c.layers=this.layers,this.add(c);const l=new _n(_s,vs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===za)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,f]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,c),t.setRenderTarget(i,4,r),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),t.render(e,f),t.setRenderTarget(u,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Xu extends Qe{constructor(t,e,i,r,s,a,o,c,l,f){t=t!==void 0?t:[],e=e!==void 0?e:Vr,super(t,e,i,r,s,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Jp extends xr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Xu(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ta(5,5,5),s=new qi({name:"CubemapFromEquirect",uniforms:Ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$e,blending:Bi});s.uniforms.tEquirect.value=e;const a=new pe(r,s),o=e.minFilter;return e.minFilter===fi&&(e.minFilter=vn),new Zp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}const ff=new O,Mg=new O,yg=new Jt;class or{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=ff.subVectors(i,e).cross(Mg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ff),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||yg.getNormalMatrix(t),r=this.coplanarPoint(ff).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ar=new Qs,Uo=new O;class ao{constructor(t=new or,e=new or,i=new or,r=new or,s=new or,a=new or){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hi){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],f=r[5],u=r[6],h=r[7],m=r[8],g=r[9],x=r[10],p=r[11],d=r[12],b=r[13],A=r[14],y=r[15];if(i[0].setComponents(c-s,h-l,p-m,y-d).normalize(),i[1].setComponents(c+s,h+l,p+m,y+d).normalize(),i[2].setComponents(c+a,h+f,p+g,y+b).normalize(),i[3].setComponents(c-a,h-f,p-g,y-b).normalize(),i[4].setComponents(c-o,h-u,p-x,y-A).normalize(),e===hi)i[5].setComponents(c+o,h+u,p+x,y+A).normalize();else if(e===za)i[5].setComponents(o,u,x,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ar.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(t){return Ar.center.set(0,0,0),Ar.radius=.7071067811865476,Ar.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Uo.x=r.normal.x>0?t.max.x:t.min.x,Uo.y=r.normal.y>0?t.max.y:t.min.y,Uo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Uo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qp(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Sg(n){const t=new WeakMap;function e(o,c){const l=o.array,f=o.usage,u=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,f),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){const f=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,f);else{u.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<u.length;m++){const g=u[h],x=u[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,u[h]=x)}u.length=h+1;for(let m=0,g=u.length;m<g;m++){const x=u[m];n.bufferSubData(l,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}class Yi extends Ge{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),c=Math.floor(r),l=o+1,f=c+1,u=t/o,h=e/c,m=[],g=[],x=[],p=[];for(let d=0;d<f;d++){const b=d*h-a;for(let A=0;A<l;A++){const y=A*u-s;g.push(y,-b,0),x.push(0,0,1),p.push(A/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const A=b+l*d,y=b+l*(d+1),I=b+1+l*(d+1),P=b+1+l*d;m.push(A,y,P),m.push(y,I,P)}this.setIndex(m),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yi(t.width,t.height,t.widthSegments,t.heightSegments)}}var bg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ag=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ig=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ug=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ng=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Og=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$g=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qg="gl_FragColor = linearToOutputTexel( gl_FragColor );",t_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,e_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,n_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,i_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,r_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,s_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,a_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,o_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,c_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,l_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,u_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,h_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,d_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,p_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,m_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,g_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,__=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,v_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,x_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,y_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,S_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,b_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,E_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,T_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,C_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,P_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,L_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,I_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,D_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,U_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,N_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,F_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,O_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,z_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,B_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,G_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,V_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,X_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,j_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,K_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Z_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,J_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Q_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ev=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,av=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ov=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_v=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ov=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$v=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ex=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:bg,alphahash_pars_fragment:Eg,alphamap_fragment:wg,alphamap_pars_fragment:Tg,alphatest_fragment:Ag,alphatest_pars_fragment:Rg,aomap_fragment:Cg,aomap_pars_fragment:Pg,batching_pars_vertex:Lg,batching_vertex:Ig,begin_vertex:Dg,beginnormal_vertex:Ug,bsdfs:Ng,iridescence_fragment:Fg,bumpmap_pars_fragment:Og,clipping_planes_fragment:kg,clipping_planes_pars_fragment:zg,clipping_planes_pars_vertex:Bg,clipping_planes_vertex:Gg,color_fragment:Vg,color_pars_fragment:Hg,color_pars_vertex:Wg,color_vertex:Xg,common:jg,cube_uv_reflection_fragment:qg,defaultnormal_vertex:Yg,displacementmap_pars_vertex:$g,displacementmap_vertex:Kg,emissivemap_fragment:Zg,emissivemap_pars_fragment:Jg,colorspace_fragment:Qg,colorspace_pars_fragment:t_,envmap_fragment:e_,envmap_common_pars_fragment:n_,envmap_pars_fragment:i_,envmap_pars_vertex:r_,envmap_physical_pars_fragment:m_,envmap_vertex:s_,fog_vertex:a_,fog_pars_vertex:o_,fog_fragment:c_,fog_pars_fragment:l_,gradientmap_pars_fragment:f_,lightmap_pars_fragment:u_,lights_lambert_fragment:h_,lights_lambert_pars_fragment:d_,lights_pars_begin:p_,lights_toon_fragment:g_,lights_toon_pars_fragment:__,lights_phong_fragment:v_,lights_phong_pars_fragment:x_,lights_physical_fragment:M_,lights_physical_pars_fragment:y_,lights_fragment_begin:S_,lights_fragment_maps:b_,lights_fragment_end:E_,logdepthbuf_fragment:w_,logdepthbuf_pars_fragment:T_,logdepthbuf_pars_vertex:A_,logdepthbuf_vertex:R_,map_fragment:C_,map_pars_fragment:P_,map_particle_fragment:L_,map_particle_pars_fragment:I_,metalnessmap_fragment:D_,metalnessmap_pars_fragment:U_,morphinstance_vertex:N_,morphcolor_vertex:F_,morphnormal_vertex:O_,morphtarget_pars_vertex:k_,morphtarget_vertex:z_,normal_fragment_begin:B_,normal_fragment_maps:G_,normal_pars_fragment:V_,normal_pars_vertex:H_,normal_vertex:W_,normalmap_pars_fragment:X_,clearcoat_normal_fragment_begin:j_,clearcoat_normal_fragment_maps:q_,clearcoat_pars_fragment:Y_,iridescence_pars_fragment:$_,opaque_fragment:K_,packing:Z_,premultiplied_alpha_fragment:J_,project_vertex:Q_,dithering_fragment:tv,dithering_pars_fragment:ev,roughnessmap_fragment:nv,roughnessmap_pars_fragment:iv,shadowmap_pars_fragment:rv,shadowmap_pars_vertex:sv,shadowmap_vertex:av,shadowmask_pars_fragment:ov,skinbase_vertex:cv,skinning_pars_vertex:lv,skinning_vertex:fv,skinnormal_vertex:uv,specularmap_fragment:hv,specularmap_pars_fragment:dv,tonemapping_fragment:pv,tonemapping_pars_fragment:mv,transmission_fragment:gv,transmission_pars_fragment:_v,uv_pars_fragment:vv,uv_pars_vertex:xv,uv_vertex:Mv,worldpos_vertex:yv,background_vert:Sv,background_frag:bv,backgroundCube_vert:Ev,backgroundCube_frag:wv,cube_vert:Tv,cube_frag:Av,depth_vert:Rv,depth_frag:Cv,distanceRGBA_vert:Pv,distanceRGBA_frag:Lv,equirect_vert:Iv,equirect_frag:Dv,linedashed_vert:Uv,linedashed_frag:Nv,meshbasic_vert:Fv,meshbasic_frag:Ov,meshlambert_vert:kv,meshlambert_frag:zv,meshmatcap_vert:Bv,meshmatcap_frag:Gv,meshnormal_vert:Vv,meshnormal_frag:Hv,meshphong_vert:Wv,meshphong_frag:Xv,meshphysical_vert:jv,meshphysical_frag:qv,meshtoon_vert:Yv,meshtoon_frag:$v,points_vert:Kv,points_frag:Zv,shadow_vert:Jv,shadow_frag:Qv,sprite_vert:tx,sprite_frag:ex},wt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},jn={basic:{uniforms:un([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:un([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:un([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:un([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:un([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:un([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:un([wt.points,wt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:un([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:un([wt.common,wt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:un([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:un([wt.sprite,wt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:un([wt.common,wt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:un([wt.lights,wt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};jn.physical={uniforms:un([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const No={r:0,b:0,g:0},Rr=new kn,nx=new Ht;function ix(n,t,e,i,r,s,a){const o=new Yt(0);let c=s===!0?0:1,l,f,u=null,h=0,m=null;function g(b){let A=b.isScene===!0?b.background:null;return A&&A.isTexture&&(A=(b.backgroundBlurriness>0?e:t).get(A)),A}function x(b){let A=!1;const y=g(b);y===null?d(o,c):y&&y.isColor&&(d(y,1),A=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(b,A){const y=g(A);y&&(y.isCubeTexture||y.mapping===ro)?(f===void 0&&(f=new pe(new ta(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:Ws(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(I,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Rr.copy(A.backgroundRotation),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),f.material.uniforms.envMap.value=y,f.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(nx.makeRotationFromEuler(Rr)),f.material.toneMapped=oe.getTransfer(y.colorSpace)!==_e,(u!==y||h!==y.version||m!==n.toneMapping)&&(f.material.needsUpdate=!0,u=y,h=y.version,m=n.toneMapping),f.layers.enableAll(),b.unshift(f,f.geometry,f.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new pe(new Yi(2,2),new qi({name:"BackgroundMaterial",uniforms:Ws(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=oe.getTransfer(y.colorSpace)!==_e,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,m=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function d(b,A){b.getRGB(No,$p(n)),i.buffers.color.setClear(No.r,No.g,No.b,A,a)}return{getClearColor:function(){return o},setClearColor:function(b,A=1){o.set(b),c=A,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,d(o,c)},render:x,addToRenderList:p}}function rx(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(_,w,k,N,B){let j=!1;const R=u(N,k,w);s!==R&&(s=R,l(s.object)),j=m(_,N,k,B),j&&g(_,N,k,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(_,w,k,N),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function f(_){return n.deleteVertexArray(_)}function u(_,w,k){const N=k.wireframe===!0;let B=i[_.id];B===void 0&&(B={},i[_.id]=B);let j=B[w.id];j===void 0&&(j={},B[w.id]=j);let R=j[N];return R===void 0&&(R=h(c()),j[N]=R),R}function h(_){const w=[],k=[],N=[];for(let B=0;B<e;B++)w[B]=0,k[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:k,attributeDivisors:N,object:_,attributes:{},index:null}}function m(_,w,k,N){const B=s.attributes,j=w.attributes;let R=0;const V=k.getAttributes();for(const U in V)if(V[U].location>=0){const q=B[U];let J=j[U];if(J===void 0&&(U==="instanceMatrix"&&_.instanceMatrix&&(J=_.instanceMatrix),U==="instanceColor"&&_.instanceColor&&(J=_.instanceColor)),q===void 0||q.attribute!==J||J&&q.data!==J.data)return!0;R++}return s.attributesNum!==R||s.index!==N}function g(_,w,k,N){const B={},j=w.attributes;let R=0;const V=k.getAttributes();for(const U in V)if(V[U].location>=0){let q=j[U];q===void 0&&(U==="instanceMatrix"&&_.instanceMatrix&&(q=_.instanceMatrix),U==="instanceColor"&&_.instanceColor&&(q=_.instanceColor));const J={};J.attribute=q,q&&q.data&&(J.data=q.data),B[U]=J,R++}s.attributes=B,s.attributesNum=R,s.index=N}function x(){const _=s.newAttributes;for(let w=0,k=_.length;w<k;w++)_[w]=0}function p(_){d(_,0)}function d(_,w){const k=s.newAttributes,N=s.enabledAttributes,B=s.attributeDivisors;k[_]=1,N[_]===0&&(n.enableVertexAttribArray(_),N[_]=1),B[_]!==w&&(n.vertexAttribDivisor(_,w),B[_]=w)}function b(){const _=s.newAttributes,w=s.enabledAttributes;for(let k=0,N=w.length;k<N;k++)w[k]!==_[k]&&(n.disableVertexAttribArray(k),w[k]=0)}function A(_,w,k,N,B,j,R){R===!0?n.vertexAttribIPointer(_,w,k,B,j):n.vertexAttribPointer(_,w,k,N,B,j)}function y(_,w,k,N){x();const B=N.attributes,j=k.getAttributes(),R=w.defaultAttributeValues;for(const V in j){const U=j[V];if(U.location>=0){let rt=B[V];if(rt===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(rt=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(rt=_.instanceColor)),rt!==void 0){const q=rt.normalized,J=rt.itemSize,lt=t.get(rt);if(lt===void 0)continue;const ht=lt.buffer,G=lt.type,Y=lt.bytesPerElement,$=G===n.INT||G===n.UNSIGNED_INT||rt.gpuType===Al;if(rt.isInterleavedBufferAttribute){const F=rt.data,tt=F.stride,at=rt.offset;if(F.isInstancedInterleavedBuffer){for(let st=0;st<U.locationSize;st++)d(U.location+st,F.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let st=0;st<U.locationSize;st++)p(U.location+st);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let st=0;st<U.locationSize;st++)A(U.location+st,J/U.locationSize,G,q,tt*Y,(at+J/U.locationSize*st)*Y,$)}else{if(rt.isInstancedBufferAttribute){for(let F=0;F<U.locationSize;F++)d(U.location+F,rt.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let F=0;F<U.locationSize;F++)p(U.location+F);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let F=0;F<U.locationSize;F++)A(U.location+F,J/U.locationSize,G,q,J*Y,J/U.locationSize*F*Y,$)}}else if(R!==void 0){const q=R[V];if(q!==void 0)switch(q.length){case 2:n.vertexAttrib2fv(U.location,q);break;case 3:n.vertexAttrib3fv(U.location,q);break;case 4:n.vertexAttrib4fv(U.location,q);break;default:n.vertexAttrib1fv(U.location,q)}}}}b()}function I(){L();for(const _ in i){const w=i[_];for(const k in w){const N=w[k];for(const B in N)f(N[B].object),delete N[B];delete w[k]}delete i[_]}}function P(_){if(i[_.id]===void 0)return;const w=i[_.id];for(const k in w){const N=w[k];for(const B in N)f(N[B].object),delete N[B];delete w[k]}delete i[_.id]}function C(_){for(const w in i){const k=i[w];if(k[_.id]===void 0)continue;const N=k[_.id];for(const B in N)f(N[B].object),delete N[B];delete k[_.id]}}function L(){v(),a=!0,s!==r&&(s=r,l(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:v,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:p,disableUnusedAttributes:b}}function sx(n,t,e){let i;function r(l){i=l}function s(l,f){n.drawArrays(i,l,f),e.update(f,i,1)}function a(l,f,u){u!==0&&(n.drawArraysInstanced(i,l,f,u),e.update(f,i,u))}function o(l,f,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,f,0,u);let m=0;for(let g=0;g<u;g++)m+=f[g];e.update(m,i,1)}function c(l,f,u,h){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],f[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,f,0,h,0,u);let g=0;for(let x=0;x<u;x++)g+=f[x]*h[x];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function ax(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==Nn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const L=C===Zs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==mi&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ui&&!L)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const f=c(l);f!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const u=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:y,vertexTextures:I,maxSamples:P}}function ox(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new or,o=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const m=u.length!==0||h||i!==0||r;return r=h,i=u.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){e=f(u,h,0)},this.setState=function(u,h,m){const g=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,d=n.get(u);if(!r||g===null||g.length===0||s&&!p)s?f(null):l();else{const b=s?0:i,A=b*4;let y=d.clippingState||null;c.value=y,y=f(g,h,A,m);for(let I=0;I!==A;++I)y[I]=e[I];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(u,h,m,g){const x=u!==null?u.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const d=m+x*4,b=h.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let A=0,y=m;A!==x;++A,y+=4)a.copy(u[A]).applyMatrix4(b,o),a.normal.toArray(p,y),p[y+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function cx(n){let t=new WeakMap;function e(a,o){return o===Pc?a.mapping=Vr:o===Lc&&(a.mapping=Hr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Pc||o===Lc)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Jp(c.height);return l.fromEquirectangularTexture(n,a),t.set(a,l),a.addEventListener("dispose",r),e(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Dl extends Wu{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Us=4,Wh=[.125,.215,.35,.446,.526,.582],Dr=20,uf=new Dl,Xh=new Yt;let hf=null,df=0,pf=0,mf=!1;const Ir=(1+Math.sqrt(5))/2,xs=1/Ir,jh=[new O(-Ir,xs,0),new O(Ir,xs,0),new O(-xs,0,Ir),new O(xs,0,Ir),new O(0,Ir,-xs),new O(0,Ir,xs),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class Qf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),pf=this._renderer.getActiveMipmapLevel(),mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(hf,df,pf),this._renderer.xr.enabled=mf,t.scissorTest=!1,Fo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vr||t.mapping===Hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),pf=this._renderer.getActiveMipmapLevel(),mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Zs,format:Nn,colorSpace:es,depthBuffer:!1},r=qh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qh(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lx(s)),this._blurMaterial=fx(s,t,e)}return r}_compileMaterial(t){const e=new pe(this._lodPlanes[0],t);this._renderer.compile(e,uf)}_sceneToCubeUV(t,e,i,r){const o=new _n(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,h=f.toneMapping;f.getClearColor(Xh),f.toneMapping=Gi,f.autoClear=!1;const m=new An({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new pe(new ta,m);let x=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,x=!0):(m.color.copy(Xh),x=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):b===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const A=this._cubeSize;Fo(r,b*A,d>2?A:0,A,A),f.setRenderTarget(r),x&&f.render(g,o),f.render(t,o)}g.geometry.dispose(),g.material.dispose(),f.toneMapping=h,f.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Vr||t.mapping===Hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$h()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new pe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;Fo(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,uf)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=jh[(r-s-1)%jh.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,u=new pe(this._lodPlanes[r],l),h=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Dr-1),x=s/g,p=isFinite(s)?1+Math.floor(f*x):Dr;p>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Dr}`);const d=[];let b=0;for(let C=0;C<Dr;++C){const L=C/x,v=Math.exp(-L*L/2);d.push(v),C===0?b+=v:C<p&&(b+=2*v)}for(let C=0;C<d.length;C++)d[C]=d[C]/b;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-i;const y=this._sizeLods[r],I=3*y*(r>A-Us?r-A+Us:0),P=4*(this._cubeSize-y);Fo(e,I,P,3*y,2*y),c.setRenderTarget(e),c.render(u,uf)}}function lx(n){const t=[],e=[],i=[];let r=n;const s=n-Us+1+Wh.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-Us?c=Wh[a-n+Us-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),f=-l,u=1+l,h=[f,f,u,f,u,u,f,f,u,u,f,u],m=6,g=6,x=3,p=2,d=1,b=new Float32Array(x*g*m),A=new Float32Array(p*g*m),y=new Float32Array(d*g*m);for(let P=0;P<m;P++){const C=P%3*2/3-1,L=P>2?0:-1,v=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];b.set(v,x*g*P),A.set(h,p*g*P);const _=[P,P,P,P,P,P];y.set(_,d*g*P)}const I=new Ge;I.setAttribute("position",new ye(b,x)),I.setAttribute("uv",new ye(A,p)),I.setAttribute("faceIndex",new ye(y,d)),t.push(I),r>Us&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function qh(n,t,e){const i=new xr(n,t,e);return i.texture.mapping=ro,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fo(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function fx(n,t,e){const i=new Float32Array(Dr),r=new O(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Yh(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function $h(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function ju(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ux(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Pc||c===Lc,f=c===Vr||c===Hr;if(l||f){let u=t.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new Qf(n)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||f&&m&&r(m)?(e===null&&(e=new Qf(n)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let c=0;const l=6;for(let f=0;f<l;f++)o[f]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function hx(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Sa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function dx(n,t,e,i){const r={},s=new WeakMap;function a(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const x=h.morphAttributes[g];for(let p=0,d=x.length;p<d;p++)t.remove(x[p])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(t.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function c(u){const h=u.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const x=m[g];for(let p=0,d=x.length;p<d;p++)t.update(x[p],n.ARRAY_BUFFER)}}function l(u){const h=[],m=u.index,g=u.attributes.position;let x=0;if(m!==null){const b=m.array;x=m.version;for(let A=0,y=b.length;A<y;A+=3){const I=b[A+0],P=b[A+1],C=b[A+2];h.push(I,P,P,C,C,I)}}else if(g!==void 0){const b=g.array;x=g.version;for(let A=0,y=b.length/3-1;A<y;A+=3){const I=A+0,P=A+1,C=A+2;h.push(I,P,P,C,C,I)}}else return;const p=new(Hp(h)?Hu:Vu)(h,1);p.version=x;const d=s.get(u);d&&t.remove(d),s.set(u,p)}function f(u){const h=s.get(u);if(h){const m=u.index;m!==null&&h.version<m.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:f}}function px(n,t,e){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,m){n.drawElements(i,m,s,h*a),e.update(m,i,1)}function l(h,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,h*a,g),e.update(m,i,g))}function f(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];e.update(p,i,1)}function u(h,m,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<h.length;d++)l(h[d]/a,m[d],x[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,x,0,g);let d=0;for(let b=0;b<g;b++)d+=m[b]*x[b];e.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f,this.renderMultiDrawInstances=u}function mx(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function gx(n,t,e){const i=new WeakMap,r=new xe;function s(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let _=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var m=_;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),p===!0&&(y=3);let I=o.attributes.position.count*y,P=1;I>t.maxTextureSize&&(P=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const C=new Float32Array(I*P*4*u),L=new zu(C,I,P,u);L.type=ui,L.needsUpdate=!0;const v=y*4;for(let w=0;w<u;w++){const k=d[w],N=b[w],B=A[w],j=I*P*4*w;for(let R=0;R<k.count;R++){const V=R*v;g===!0&&(r.fromBufferAttribute(k,R),C[j+V+0]=r.x,C[j+V+1]=r.y,C[j+V+2]=r.z,C[j+V+3]=0),x===!0&&(r.fromBufferAttribute(N,R),C[j+V+4]=r.x,C[j+V+5]=r.y,C[j+V+6]=r.z,C[j+V+7]=0),p===!0&&(r.fromBufferAttribute(B,R),C[j+V+8]=r.x,C[j+V+9]=r.y,C[j+V+10]=r.z,C[j+V+11]=B.itemSize===4?r.w:1)}}h={count:u,texture:L,size:new ie(I,P)},i.set(o,h),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function _x(n,t,e,i){let r=new WeakMap;function s(c){const l=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return u}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}class qu extends Qe{constructor(t,e,i,r,s,a,o,c,l,f=kr){if(f!==kr&&f!==Xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===kr&&(i=vr),i===void 0&&f===Xr&&(i=Wr),super(null,r,s,a,o,c,f,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:xn,this.minFilter=c!==void 0?c:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const tm=new Qe,Kh=new qu(1,1),em=new zu,nm=new qp,im=new Xu,Zh=[],Jh=[],Qh=new Float32Array(16),td=new Float32Array(9),ed=new Float32Array(4);function ea(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Zh[r];if(s===void 0&&(s=new Float32Array(r),Zh[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function We(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ul(n,t){let e=Jh[t];e===void 0&&(e=new Int32Array(t),Jh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function vx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function xx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2fv(this.addr,t),Xe(e,t)}}function Mx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;n.uniform3fv(this.addr,t),Xe(e,t)}}function yx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4fv(this.addr,t),Xe(e,t)}}function Sx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;ed.set(i),n.uniformMatrix2fv(this.addr,!1,ed),Xe(e,i)}}function bx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;td.set(i),n.uniformMatrix3fv(this.addr,!1,td),Xe(e,i)}}function Ex(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;Qh.set(i),n.uniformMatrix4fv(this.addr,!1,Qh),Xe(e,i)}}function wx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Tx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2iv(this.addr,t),Xe(e,t)}}function Ax(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3iv(this.addr,t),Xe(e,t)}}function Rx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4iv(this.addr,t),Xe(e,t)}}function Cx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Px(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2uiv(this.addr,t),Xe(e,t)}}function Lx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3uiv(this.addr,t),Xe(e,t)}}function Ix(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4uiv(this.addr,t),Xe(e,t)}}function Dx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Kh.compareFunction=Fu,s=Kh):s=tm,e.setTexture2D(t||s,r)}function Ux(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||nm,r)}function Nx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||im,r)}function Fx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||em,r)}function Ox(n){switch(n){case 5126:return vx;case 35664:return xx;case 35665:return Mx;case 35666:return yx;case 35674:return Sx;case 35675:return bx;case 35676:return Ex;case 5124:case 35670:return wx;case 35667:case 35671:return Tx;case 35668:case 35672:return Ax;case 35669:case 35673:return Rx;case 5125:return Cx;case 36294:return Px;case 36295:return Lx;case 36296:return Ix;case 35678:case 36198:case 36298:case 36306:case 35682:return Dx;case 35679:case 36299:case 36307:return Ux;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Fx}}function kx(n,t){n.uniform1fv(this.addr,t)}function zx(n,t){const e=ea(t,this.size,2);n.uniform2fv(this.addr,e)}function Bx(n,t){const e=ea(t,this.size,3);n.uniform3fv(this.addr,e)}function Gx(n,t){const e=ea(t,this.size,4);n.uniform4fv(this.addr,e)}function Vx(n,t){const e=ea(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Hx(n,t){const e=ea(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Wx(n,t){const e=ea(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Xx(n,t){n.uniform1iv(this.addr,t)}function jx(n,t){n.uniform2iv(this.addr,t)}function qx(n,t){n.uniform3iv(this.addr,t)}function Yx(n,t){n.uniform4iv(this.addr,t)}function $x(n,t){n.uniform1uiv(this.addr,t)}function Kx(n,t){n.uniform2uiv(this.addr,t)}function Zx(n,t){n.uniform3uiv(this.addr,t)}function Jx(n,t){n.uniform4uiv(this.addr,t)}function Qx(n,t,e){const i=this.cache,r=t.length,s=Ul(e,r);We(i,s)||(n.uniform1iv(this.addr,s),Xe(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||tm,s[a])}function t1(n,t,e){const i=this.cache,r=t.length,s=Ul(e,r);We(i,s)||(n.uniform1iv(this.addr,s),Xe(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||nm,s[a])}function e1(n,t,e){const i=this.cache,r=t.length,s=Ul(e,r);We(i,s)||(n.uniform1iv(this.addr,s),Xe(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||im,s[a])}function n1(n,t,e){const i=this.cache,r=t.length,s=Ul(e,r);We(i,s)||(n.uniform1iv(this.addr,s),Xe(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||em,s[a])}function i1(n){switch(n){case 5126:return kx;case 35664:return zx;case 35665:return Bx;case 35666:return Gx;case 35674:return Vx;case 35675:return Hx;case 35676:return Wx;case 5124:case 35670:return Xx;case 35667:case 35671:return jx;case 35668:case 35672:return qx;case 35669:case 35673:return Yx;case 5125:return $x;case 36294:return Kx;case 36295:return Zx;case 36296:return Jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Qx;case 35679:case 36299:case 36307:return t1;case 35680:case 36300:case 36308:case 36293:return e1;case 36289:case 36303:case 36311:case 36292:return n1}}class r1{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ox(e.type)}}class s1{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=i1(e.type)}}class a1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const gf=/(\w+)(\])?(\[|\.)?/g;function nd(n,t){n.seq.push(t),n.map[t.id]=t}function o1(n,t,e){const i=n.name,r=i.length;for(gf.lastIndex=0;;){const s=gf.exec(i),a=gf.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){nd(e,l===void 0?new r1(o,n,t):new s1(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new a1(o),nd(e,u)),e=u}}}class rc{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);o1(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function id(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const c1=37297;let l1=0;function f1(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const rd=new Jt;function u1(n){oe._getMatrix(rd,oe.workingColorSpace,n);const t=`mat3( ${rd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case so:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function sd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+f1(n.getShaderSource(t),a)}else return r}function h1(n,t){const e=u1(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function d1(n,t){let e;switch(t){case wp:e="Linear";break;case Tp:e="Reinhard";break;case Ap:e="Cineon";break;case Rp:e="ACESFilmic";break;case Pp:e="AgX";break;case Lp:e="Neutral";break;case Cp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Oo=new O;function p1(){oe.getLuminanceCoefficients(Oo);const n=Oo.x.toFixed(4),t=Oo.y.toFixed(4),e=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ba).join(`
`)}function g1(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function _1(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ba(n){return n!==""}function ad(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function od(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const v1=/^[ \t]*#include +<([\w\d./]+)>/gm;function tu(n){return n.replace(v1,M1)}const x1=new Map;function M1(n,t){let e=Kt[t];if(e===void 0){const i=x1.get(t);if(i!==void 0)e=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return tu(e)}const y1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cd(n){return n.replace(y1,S1)}function S1(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ld(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function b1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===bu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===cp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ri&&(t="SHADOWMAP_TYPE_VSM"),t}function E1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Vr:case Hr:t="ENVMAP_TYPE_CUBE";break;case ro:t="ENVMAP_TYPE_CUBE_UV";break}return t}function w1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Hr:t="ENVMAP_MODE_REFRACTION";break}return t}function T1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Tl:t="ENVMAP_BLENDING_MULTIPLY";break;case bp:t="ENVMAP_BLENDING_MIX";break;case Ep:t="ENVMAP_BLENDING_ADD";break}return t}function A1(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function R1(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=b1(e),l=E1(e),f=w1(e),u=T1(e),h=A1(e),m=m1(e),g=g1(s),x=r.createProgram();let p,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ba).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ba).join(`
`),d.length>0&&(d+=`
`)):(p=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ba).join(`
`),d=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+f:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gi?"#define TONE_MAPPING":"",e.toneMapping!==Gi?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Gi?d1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,h1("linearToOutputTexel",e.outputColorSpace),p1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ba).join(`
`)),a=tu(a),a=ad(a,e),a=od(a,e),o=tu(o),o=ad(o,e),o=od(o,e),a=cd(a),o=cd(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===Jf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const A=b+p+a,y=b+d+o,I=id(r,r.VERTEX_SHADER,A),P=id(r,r.FRAGMENT_SHADER,y);r.attachShader(x,I),r.attachShader(x,P),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function C(w){if(n.debug.checkShaderErrors){const k=r.getProgramInfoLog(x).trim(),N=r.getShaderInfoLog(I).trim(),B=r.getShaderInfoLog(P).trim();let j=!0,R=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,I,P);else{const V=sd(r,I,"vertex"),U=sd(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+k+`
`+V+`
`+U)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(N===""||B==="")&&(R=!1);R&&(w.diagnostics={runnable:j,programLog:k,vertexShader:{log:N,prefix:p},fragmentShader:{log:B,prefix:d}})}r.deleteShader(I),r.deleteShader(P),L=new rc(r,x),v=_1(r,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(x,c1)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=l1++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=P,this}let C1=0;class P1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new L1(t),e.set(t,i)),i}}class L1{constructor(t){this.id=C1++,this.code=t,this.usedTimes=0}}function I1(n,t,e,i,r,s,a){const o=new Gu,c=new P1,l=new Set,f=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function p(v,_,w,k,N){const B=k.fog,j=N.geometry,R=v.isMeshStandardMaterial?k.environment:null,V=(v.isMeshStandardMaterial?e:t).get(v.envMap||R),U=V&&V.mapping===ro?V.image.height:null,rt=g[v.type];v.precision!==null&&(m=r.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const q=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,J=q!==void 0?q.length:0;let lt=0;j.morphAttributes.position!==void 0&&(lt=1),j.morphAttributes.normal!==void 0&&(lt=2),j.morphAttributes.color!==void 0&&(lt=3);let ht,G,Y,$;if(rt){const ge=jn[rt];ht=ge.vertexShader,G=ge.fragmentShader}else ht=v.vertexShader,G=v.fragmentShader,c.update(v),Y=c.getVertexShaderID(v),$=c.getFragmentShaderID(v);const F=n.getRenderTarget(),tt=n.state.buffers.depth.getReversed(),at=N.isInstancedMesh===!0,st=N.isBatchedMesh===!0,Ot=!!v.map,kt=!!v.matcap,Rt=!!V,D=!!v.aoMap,Tt=!!v.lightMap,pt=!!v.bumpMap,yt=!!v.normalMap,ct=!!v.displacementMap,Pt=!!v.emissiveMap,Mt=!!v.metalnessMap,E=!!v.roughnessMap,M=v.anisotropy>0,H=v.clearcoat>0,nt=v.dispersion>0,ot=v.iridescence>0,K=v.sheen>0,At=v.transmission>0,dt=M&&!!v.anisotropyMap,_t=H&&!!v.clearcoatMap,Wt=H&&!!v.clearcoatNormalMap,gt=H&&!!v.clearcoatRoughnessMap,Lt=ot&&!!v.iridescenceMap,Bt=ot&&!!v.iridescenceThicknessMap,Gt=K&&!!v.sheenColorMap,It=K&&!!v.sheenRoughnessMap,re=!!v.specularMap,$t=!!v.specularColorMap,me=!!v.specularIntensityMap,z=At&&!!v.transmissionMap,Et=At&&!!v.thicknessMap,it=!!v.gradientMap,Z=!!v.alphaMap,vt=v.alphaTest>0,bt=!!v.alphaHash,Xt=!!v.extensions;let Re=Gi;v.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Re=n.toneMapping);const en={shaderID:rt,shaderType:v.type,shaderName:v.name,vertexShader:ht,fragmentShader:G,defines:v.defines,customVertexShaderID:Y,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:st,batchingColor:st&&N._colorsTexture!==null,instancing:at,instancingColor:at&&N.instanceColor!==null,instancingMorph:at&&N.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:F===null?n.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:es,alphaToCoverage:!!v.alphaToCoverage,map:Ot,matcap:kt,envMap:Rt,envMapMode:Rt&&V.mapping,envMapCubeUVHeight:U,aoMap:D,lightMap:Tt,bumpMap:pt,normalMap:yt,displacementMap:h&&ct,emissiveMap:Pt,normalMapObjectSpace:yt&&v.normalMapType===Np,normalMapTangentSpace:yt&&v.normalMapType===Nu,metalnessMap:Mt,roughnessMap:E,anisotropy:M,anisotropyMap:dt,clearcoat:H,clearcoatMap:_t,clearcoatNormalMap:Wt,clearcoatRoughnessMap:gt,dispersion:nt,iridescence:ot,iridescenceMap:Lt,iridescenceThicknessMap:Bt,sheen:K,sheenColorMap:Gt,sheenRoughnessMap:It,specularMap:re,specularColorMap:$t,specularIntensityMap:me,transmission:At,transmissionMap:z,thicknessMap:Et,gradientMap:it,opaque:v.transparent===!1&&v.blending===Or&&v.alphaToCoverage===!1,alphaMap:Z,alphaTest:vt,alphaHash:bt,combine:v.combine,mapUv:Ot&&x(v.map.channel),aoMapUv:D&&x(v.aoMap.channel),lightMapUv:Tt&&x(v.lightMap.channel),bumpMapUv:pt&&x(v.bumpMap.channel),normalMapUv:yt&&x(v.normalMap.channel),displacementMapUv:ct&&x(v.displacementMap.channel),emissiveMapUv:Pt&&x(v.emissiveMap.channel),metalnessMapUv:Mt&&x(v.metalnessMap.channel),roughnessMapUv:E&&x(v.roughnessMap.channel),anisotropyMapUv:dt&&x(v.anisotropyMap.channel),clearcoatMapUv:_t&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:It&&x(v.sheenRoughnessMap.channel),specularMapUv:re&&x(v.specularMap.channel),specularColorMapUv:$t&&x(v.specularColorMap.channel),specularIntensityMapUv:me&&x(v.specularIntensityMap.channel),transmissionMapUv:z&&x(v.transmissionMap.channel),thicknessMapUv:Et&&x(v.thicknessMap.channel),alphaMapUv:Z&&x(v.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(yt||M),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!j.attributes.uv&&(Ot||Z),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:tt,skinning:N.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:lt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&w.length>0,shadowMapType:n.shadowMap.type,toneMapping:Re,decodeVideoTexture:Ot&&v.map.isVideoTexture===!0&&oe.getTransfer(v.map.colorSpace)===_e,decodeVideoTextureEmissive:Pt&&v.emissiveMap.isVideoTexture===!0&&oe.getTransfer(v.emissiveMap.colorSpace)===_e,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Fe,flipSided:v.side===$e,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Xt&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&v.extensions.multiDraw===!0||st)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return en.vertexUv1s=l.has(1),en.vertexUv2s=l.has(2),en.vertexUv3s=l.has(3),l.clear(),en}function d(v){const _=[];if(v.shaderID?_.push(v.shaderID):(_.push(v.customVertexShaderID),_.push(v.customFragmentShaderID)),v.defines!==void 0)for(const w in v.defines)_.push(w),_.push(v.defines[w]);return v.isRawShaderMaterial===!1&&(b(_,v),A(_,v),_.push(n.outputColorSpace)),_.push(v.customProgramCacheKey),_.join()}function b(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)}function A(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const _=g[v.type];let w;if(_){const k=jn[_];w=Kp.clone(k.uniforms)}else w=v.uniforms;return w}function I(v,_){let w;for(let k=0,N=f.length;k<N;k++){const B=f[k];if(B.cacheKey===_){w=B,++w.usedTimes;break}}return w===void 0&&(w=new R1(n,_,v,s),f.push(w)),w}function P(v){if(--v.usedTimes===0){const _=f.indexOf(v);f[_]=f[f.length-1],f.pop(),v.destroy()}}function C(v){c.remove(v)}function L(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:y,acquireProgram:I,releaseProgram:P,releaseShaderCache:C,programs:f,dispose:L}}function D1(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function U1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function fd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ud(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(u,h,m,g,x,p){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:h,material:m,groupOrder:g,renderOrder:u.renderOrder,z:x,group:p},n[t]=d):(d.id=u.id,d.object=u,d.geometry=h,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=x,d.group=p),t++,d}function o(u,h,m,g,x,p){const d=a(u,h,m,g,x,p);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):e.push(d)}function c(u,h,m,g,x,p){const d=a(u,h,m,g,x,p);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):e.unshift(d)}function l(u,h){e.length>1&&e.sort(u||U1),i.length>1&&i.sort(h||fd),r.length>1&&r.sort(h||fd)}function f(){for(let u=t,h=n.length;u<h;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:f,sort:l}}function N1(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new ud,n.set(i,[a])):r>=s.length?(a=new ud,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function F1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Yt};break;case"SpotLight":e={position:new O,direction:new O,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function O1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let k1=0;function z1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function B1(n){const t=new F1,e=O1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const r=new O,s=new Ht,a=new Ht;function o(l){let f=0,u=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let m=0,g=0,x=0,p=0,d=0,b=0,A=0,y=0,I=0,P=0,C=0;l.sort(z1);for(let v=0,_=l.length;v<_;v++){const w=l[v],k=w.color,N=w.intensity,B=w.distance,j=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)f+=k.r*N,u+=k.g*N,h+=k.b*N;else if(w.isLightProbe){for(let R=0;R<9;R++)i.probe[R].addScaledVector(w.sh.coefficients[R],N);C++}else if(w.isDirectionalLight){const R=t.get(w);if(R.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const V=w.shadow,U=e.get(w);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,i.directionalShadow[m]=U,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=w.shadow.matrix,b++}i.directional[m]=R,m++}else if(w.isSpotLight){const R=t.get(w);R.position.setFromMatrixPosition(w.matrixWorld),R.color.copy(k).multiplyScalar(N),R.distance=B,R.coneCos=Math.cos(w.angle),R.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),R.decay=w.decay,i.spot[x]=R;const V=w.shadow;if(w.map&&(i.spotLightMap[I]=w.map,I++,V.updateMatrices(w),w.castShadow&&P++),i.spotLightMatrix[x]=V.matrix,w.castShadow){const U=e.get(w);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,i.spotShadow[x]=U,i.spotShadowMap[x]=j,y++}x++}else if(w.isRectAreaLight){const R=t.get(w);R.color.copy(k).multiplyScalar(N),R.halfWidth.set(w.width*.5,0,0),R.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=R,p++}else if(w.isPointLight){const R=t.get(w);if(R.color.copy(w.color).multiplyScalar(w.intensity),R.distance=w.distance,R.decay=w.decay,w.castShadow){const V=w.shadow,U=e.get(w);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,U.shadowCameraNear=V.camera.near,U.shadowCameraFar=V.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=w.shadow.matrix,A++}i.point[g]=R,g++}else if(w.isHemisphereLight){const R=t.get(w);R.skyColor.copy(w.color).multiplyScalar(N),R.groundColor.copy(w.groundColor).multiplyScalar(N),i.hemi[d]=R,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=u,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==m||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==p||L.hemiLength!==d||L.numDirectionalShadows!==b||L.numPointShadows!==A||L.numSpotShadows!==y||L.numSpotMaps!==I||L.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=p,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=y+I-P,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=C,L.directionalLength=m,L.pointLength=g,L.spotLength=x,L.rectAreaLength=p,L.hemiLength=d,L.numDirectionalShadows=b,L.numPointShadows=A,L.numSpotShadows=y,L.numSpotMaps=I,L.numLightProbes=C,i.version=k1++)}function c(l,f){let u=0,h=0,m=0,g=0,x=0;const p=f.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const A=l[d];if(A.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),u++}else if(A.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(A.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(A.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(p),h++}else if(A.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(p),x++}}}return{setup:o,setupView:c,state:i}}function hd(n){const t=new B1(n),e=[],i=[];function r(f){l.camera=f,e.length=0,i.length=0}function s(f){e.push(f)}function a(f){i.push(f)}function o(){t.setup(e)}function c(f){t.setupView(e,f)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function G1(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new hd(n),t.set(r,[o])):s>=a.length?(o=new hd(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class rm extends Sr{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sm extends Sr{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const V1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function W1(n,t,e){let i=new ao;const r=new ie,s=new ie,a=new xe,o=new rm({depthPacking:Up}),c=new sm,l={},f=e.maxTextureSize,u={[pi]:$e,[$e]:pi,[Fe]:Fe},h=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:V1,fragmentShader:H1}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ge;g.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new pe(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bu;let d=this.type;this.render=function(P,C,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const v=n.getRenderTarget(),_=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Bi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const N=d!==ri&&this.type===ri,B=d===ri&&this.type!==ri;for(let j=0,R=P.length;j<R;j++){const V=P[j],U=V.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const rt=U.getFrameExtents();if(r.multiply(rt),s.copy(U.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/rt.x),r.x=s.x*rt.x,U.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/rt.y),r.y=s.y*rt.y,U.mapSize.y=s.y)),U.map===null||N===!0||B===!0){const J=this.type!==ri?{minFilter:xn,magFilter:xn}:{};U.map!==null&&U.map.dispose(),U.map=new xr(r.x,r.y,J),U.map.texture.name=V.name+".shadowMap",U.camera.updateProjectionMatrix()}n.setRenderTarget(U.map),n.clear();const q=U.getViewportCount();for(let J=0;J<q;J++){const lt=U.getViewport(J);a.set(s.x*lt.x,s.y*lt.y,s.x*lt.z,s.y*lt.w),k.viewport(a),U.updateMatrices(V,J),i=U.getFrustum(),y(C,L,U.camera,V,this.type)}U.isPointLightShadow!==!0&&this.type===ri&&b(U,L),U.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(v,_,w)};function b(P,C){const L=t.update(x);h.defines.VSM_SAMPLES!==P.blurSamples&&(h.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new xr(r.x,r.y)),h.uniforms.shadow_pass.value=P.map.texture,h.uniforms.resolution.value=P.mapSize,h.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(C,null,L,h,x,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(C,null,L,m,x,null)}function A(P,C,L,v){let _=null;const w=L.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(w!==void 0)_=w;else if(_=L.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const k=_.uuid,N=C.uuid;let B=l[k];B===void 0&&(B={},l[k]=B);let j=B[N];j===void 0&&(j=_.clone(),B[N]=j,C.addEventListener("dispose",I)),_=j}if(_.visible=C.visible,_.wireframe=C.wireframe,v===ri?_.side=C.shadowSide!==null?C.shadowSide:C.side:_.side=C.shadowSide!==null?C.shadowSide:u[C.side],_.alphaMap=C.alphaMap,_.alphaTest=C.alphaTest,_.map=C.map,_.clipShadows=C.clipShadows,_.clippingPlanes=C.clippingPlanes,_.clipIntersection=C.clipIntersection,_.displacementMap=C.displacementMap,_.displacementScale=C.displacementScale,_.displacementBias=C.displacementBias,_.wireframeLinewidth=C.wireframeLinewidth,_.linewidth=C.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const k=n.properties.get(_);k.light=L}return _}function y(P,C,L,v,_){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&_===ri)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,P.matrixWorld);const N=t.update(P),B=P.material;if(Array.isArray(B)){const j=N.groups;for(let R=0,V=j.length;R<V;R++){const U=j[R],rt=B[U.materialIndex];if(rt&&rt.visible){const q=A(P,rt,v,_);P.onBeforeShadow(n,P,C,L,N,q,U),n.renderBufferDirect(L,null,N,q,P,U),P.onAfterShadow(n,P,C,L,N,q,U)}}}else if(B.visible){const j=A(P,B,v,_);P.onBeforeShadow(n,P,C,L,N,j,null),n.renderBufferDirect(L,null,N,j,P,null),P.onAfterShadow(n,P,C,L,N,j,null)}}const k=P.children;for(let N=0,B=k.length;N<B;N++)y(k[N],C,L,v,_)}function I(P){P.target.removeEventListener("dispose",I);for(const L in l){const v=l[L],_=P.target.uuid;_ in v&&(v[_].dispose(),delete v[_])}}}const X1={[bc]:Ec,[wc]:Rc,[Tc]:Cc,[Gr]:Ac,[Ec]:bc,[Rc]:wc,[Cc]:Tc,[Ac]:Gr};function j1(n,t){function e(){let z=!1;const Et=new xe;let it=null;const Z=new xe(0,0,0,0);return{setMask:function(vt){it!==vt&&!z&&(n.colorMask(vt,vt,vt,vt),it=vt)},setLocked:function(vt){z=vt},setClear:function(vt,bt,Xt,Re,en){en===!0&&(vt*=Re,bt*=Re,Xt*=Re),Et.set(vt,bt,Xt,Re),Z.equals(Et)===!1&&(n.clearColor(vt,bt,Xt,Re),Z.copy(Et))},reset:function(){z=!1,it=null,Z.set(-1,0,0,0)}}}function i(){let z=!1,Et=!1,it=null,Z=null,vt=null;return{setReversed:function(bt){if(Et!==bt){const Xt=t.get("EXT_clip_control");Et?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const Re=vt;vt=null,this.setClear(Re)}Et=bt},getReversed:function(){return Et},setTest:function(bt){bt?F(n.DEPTH_TEST):tt(n.DEPTH_TEST)},setMask:function(bt){it!==bt&&!z&&(n.depthMask(bt),it=bt)},setFunc:function(bt){if(Et&&(bt=X1[bt]),Z!==bt){switch(bt){case bc:n.depthFunc(n.NEVER);break;case Ec:n.depthFunc(n.ALWAYS);break;case wc:n.depthFunc(n.LESS);break;case Gr:n.depthFunc(n.LEQUAL);break;case Tc:n.depthFunc(n.EQUAL);break;case Ac:n.depthFunc(n.GEQUAL);break;case Rc:n.depthFunc(n.GREATER);break;case Cc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=bt}},setLocked:function(bt){z=bt},setClear:function(bt){vt!==bt&&(Et&&(bt=1-bt),n.clearDepth(bt),vt=bt)},reset:function(){z=!1,it=null,Z=null,vt=null,Et=!1}}}function r(){let z=!1,Et=null,it=null,Z=null,vt=null,bt=null,Xt=null,Re=null,en=null;return{setTest:function(ge){z||(ge?F(n.STENCIL_TEST):tt(n.STENCIL_TEST))},setMask:function(ge){Et!==ge&&!z&&(n.stencilMask(ge),Et=ge)},setFunc:function(ge,zn,xi){(it!==ge||Z!==zn||vt!==xi)&&(n.stencilFunc(ge,zn,xi),it=ge,Z=zn,vt=xi)},setOp:function(ge,zn,xi){(bt!==ge||Xt!==zn||Re!==xi)&&(n.stencilOp(ge,zn,xi),bt=ge,Xt=zn,Re=xi)},setLocked:function(ge){z=ge},setClear:function(ge){en!==ge&&(n.clearStencil(ge),en=ge)},reset:function(){z=!1,Et=null,it=null,Z=null,vt=null,bt=null,Xt=null,Re=null,en=null}}}const s=new e,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let f={},u={},h=new WeakMap,m=[],g=null,x=!1,p=null,d=null,b=null,A=null,y=null,I=null,P=null,C=new Yt(0,0,0),L=0,v=!1,_=null,w=null,k=null,N=null,B=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let R=!1,V=0;const U=n.getParameter(n.VERSION);U.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(U)[1]),R=V>=1):U.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),R=V>=2);let rt=null,q={};const J=n.getParameter(n.SCISSOR_BOX),lt=n.getParameter(n.VIEWPORT),ht=new xe().fromArray(J),G=new xe().fromArray(lt);function Y(z,Et,it,Z){const vt=new Uint8Array(4),bt=n.createTexture();n.bindTexture(z,bt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xt=0;Xt<it;Xt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(Et,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(Et+Xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return bt}const $={};$[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),F(n.DEPTH_TEST),a.setFunc(Gr),pt(!1),yt(Yf),F(n.CULL_FACE),D(Bi);function F(z){f[z]!==!0&&(n.enable(z),f[z]=!0)}function tt(z){f[z]!==!1&&(n.disable(z),f[z]=!1)}function at(z,Et){return u[z]!==Et?(n.bindFramebuffer(z,Et),u[z]=Et,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Et),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Et),!0):!1}function st(z,Et){let it=m,Z=!1;if(z){it=h.get(Et),it===void 0&&(it=[],h.set(Et,it));const vt=z.textures;if(it.length!==vt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,Xt=vt.length;bt<Xt;bt++)it[bt]=n.COLOR_ATTACHMENT0+bt;it.length=vt.length,Z=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,Z=!0);Z&&n.drawBuffers(it)}function Ot(z){return g!==z?(n.useProgram(z),g=z,!0):!1}const kt={[ai]:n.FUNC_ADD,[lp]:n.FUNC_SUBTRACT,[fp]:n.FUNC_REVERSE_SUBTRACT};kt[up]=n.MIN,kt[hp]=n.MAX;const Rt={[wl]:n.ZERO,[ji]:n.ONE,[ts]:n.SRC_COLOR,[_r]:n.SRC_ALPHA,[vp]:n.SRC_ALPHA_SATURATE,[gp]:n.DST_COLOR,[pp]:n.DST_ALPHA,[dp]:n.ONE_MINUS_SRC_COLOR,[Vs]:n.ONE_MINUS_SRC_ALPHA,[_p]:n.ONE_MINUS_DST_COLOR,[mp]:n.ONE_MINUS_DST_ALPHA,[xp]:n.CONSTANT_COLOR,[Mp]:n.ONE_MINUS_CONSTANT_COLOR,[yp]:n.CONSTANT_ALPHA,[Sp]:n.ONE_MINUS_CONSTANT_ALPHA};function D(z,Et,it,Z,vt,bt,Xt,Re,en,ge){if(z===Bi){x===!0&&(tt(n.BLEND),x=!1);return}if(x===!1&&(F(n.BLEND),x=!0),z!==Xi){if(z!==p||ge!==v){if((d!==ai||y!==ai)&&(n.blendEquation(n.FUNC_ADD),d=ai,y=ai),ge)switch(z){case Or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sc:n.blendFunc(n.ONE,n.ONE);break;case $f:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case $f:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}b=null,A=null,I=null,P=null,C.set(0,0,0),L=0,p=z,v=ge}return}vt=vt||Et,bt=bt||it,Xt=Xt||Z,(Et!==d||vt!==y)&&(n.blendEquationSeparate(kt[Et],kt[vt]),d=Et,y=vt),(it!==b||Z!==A||bt!==I||Xt!==P)&&(n.blendFuncSeparate(Rt[it],Rt[Z],Rt[bt],Rt[Xt]),b=it,A=Z,I=bt,P=Xt),(Re.equals(C)===!1||en!==L)&&(n.blendColor(Re.r,Re.g,Re.b,en),C.copy(Re),L=en),p=z,v=!1}function Tt(z,Et){z.side===Fe?tt(n.CULL_FACE):F(n.CULL_FACE);let it=z.side===$e;Et&&(it=!it),pt(it),z.blending===Or&&z.transparent===!1?D(Bi):D(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const Z=z.stencilWrite;o.setTest(Z),Z&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Pt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?F(n.SAMPLE_ALPHA_TO_COVERAGE):tt(n.SAMPLE_ALPHA_TO_COVERAGE)}function pt(z){_!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),_=z)}function yt(z){z!==ap?(F(n.CULL_FACE),z!==w&&(z===Yf?n.cullFace(n.BACK):z===op?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):tt(n.CULL_FACE),w=z}function ct(z){z!==k&&(R&&n.lineWidth(z),k=z)}function Pt(z,Et,it){z?(F(n.POLYGON_OFFSET_FILL),(N!==Et||B!==it)&&(n.polygonOffset(Et,it),N=Et,B=it)):tt(n.POLYGON_OFFSET_FILL)}function Mt(z){z?F(n.SCISSOR_TEST):tt(n.SCISSOR_TEST)}function E(z){z===void 0&&(z=n.TEXTURE0+j-1),rt!==z&&(n.activeTexture(z),rt=z)}function M(z,Et,it){it===void 0&&(rt===null?it=n.TEXTURE0+j-1:it=rt);let Z=q[it];Z===void 0&&(Z={type:void 0,texture:void 0},q[it]=Z),(Z.type!==z||Z.texture!==Et)&&(rt!==it&&(n.activeTexture(it),rt=it),n.bindTexture(z,Et||$[z]),Z.type=z,Z.texture=Et)}function H(){const z=q[rt];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function nt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ot(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function At(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function _t(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Wt(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Lt(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Bt(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Gt(z){ht.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ht.copy(z))}function It(z){G.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),G.copy(z))}function re(z,Et){let it=l.get(Et);it===void 0&&(it=new WeakMap,l.set(Et,it));let Z=it.get(z);Z===void 0&&(Z=n.getUniformBlockIndex(Et,z.name),it.set(z,Z))}function $t(z,Et){const Z=l.get(Et).get(z);c.get(Et)!==Z&&(n.uniformBlockBinding(Et,Z,z.__bindingPointIndex),c.set(Et,Z))}function me(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},rt=null,q={},u={},h=new WeakMap,m=[],g=null,x=!1,p=null,d=null,b=null,A=null,y=null,I=null,P=null,C=new Yt(0,0,0),L=0,v=!1,_=null,w=null,k=null,N=null,B=null,ht.set(0,0,n.canvas.width,n.canvas.height),G.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:F,disable:tt,bindFramebuffer:at,drawBuffers:st,useProgram:Ot,setBlending:D,setMaterial:Tt,setFlipSided:pt,setCullFace:yt,setLineWidth:ct,setPolygonOffset:Pt,setScissorTest:Mt,activeTexture:E,bindTexture:M,unbindTexture:H,compressedTexImage2D:nt,compressedTexImage3D:ot,texImage2D:Lt,texImage3D:Bt,updateUBOMapping:re,uniformBlockBinding:$t,texStorage2D:Wt,texStorage3D:gt,texSubImage2D:K,texSubImage3D:At,compressedTexSubImage2D:dt,compressedTexSubImage3D:_t,scissor:Gt,viewport:It,reset:me}}function dd(n,t,e,i){const r=q1(i);switch(e){case Ru:return n*t;case Pu:return n*t;case Lu:return n*t*2;case Iu:return n*t/r.components*r.byteLength;case Pl:return n*t/r.components*r.byteLength;case Du:return n*t*2/r.components*r.byteLength;case Ll:return n*t*2/r.components*r.byteLength;case Cu:return n*t*3/r.components*r.byteLength;case Nn:return n*t*4/r.components*r.byteLength;case Il:return n*t*4/r.components*r.byteLength;case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Uc:case Fc:return Math.max(n,16)*Math.max(t,8)/4;case Dc:case Nc:return Math.max(n,8)*Math.max(t,8)/2;case Oc:case kc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case zc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Bc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Gc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Vc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Hc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Wc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case jc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case qc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Yc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case $c:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Kc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Zc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Jc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Qc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pa:case tl:case el:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Uu:case nl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case il:case rl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function q1(n){switch(n){case mi:case wu:return{byteLength:1,components:1};case Hs:case Tu:case Zs:return{byteLength:2,components:1};case Rl:case Cl:return{byteLength:2,components:4};case vr:case Al:case ui:return{byteLength:4,components:1};case Au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Y1(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ie,f=new WeakMap;let u;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return m?new OffscreenCanvas(E,M):Ga("canvas")}function x(E,M,H){let nt=1;const ot=Mt(E);if((ot.width>H||ot.height>H)&&(nt=H/Math.max(ot.width,ot.height)),nt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const K=Math.floor(nt*ot.width),At=Math.floor(nt*ot.height);u===void 0&&(u=g(K,At));const dt=M?g(K,At):u;return dt.width=K,dt.height=At,dt.getContext("2d").drawImage(E,0,0,K,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+K+"x"+At+")."),dt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),E;return E}function p(E){return E.generateMipmaps}function d(E){n.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(E,M,H,nt,ot=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let K=M;if(M===n.RED&&(H===n.FLOAT&&(K=n.R32F),H===n.HALF_FLOAT&&(K=n.R16F),H===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.R8UI),H===n.UNSIGNED_SHORT&&(K=n.R16UI),H===n.UNSIGNED_INT&&(K=n.R32UI),H===n.BYTE&&(K=n.R8I),H===n.SHORT&&(K=n.R16I),H===n.INT&&(K=n.R32I)),M===n.RG&&(H===n.FLOAT&&(K=n.RG32F),H===n.HALF_FLOAT&&(K=n.RG16F),H===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RG8UI),H===n.UNSIGNED_SHORT&&(K=n.RG16UI),H===n.UNSIGNED_INT&&(K=n.RG32UI),H===n.BYTE&&(K=n.RG8I),H===n.SHORT&&(K=n.RG16I),H===n.INT&&(K=n.RG32I)),M===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGB8UI),H===n.UNSIGNED_SHORT&&(K=n.RGB16UI),H===n.UNSIGNED_INT&&(K=n.RGB32UI),H===n.BYTE&&(K=n.RGB8I),H===n.SHORT&&(K=n.RGB16I),H===n.INT&&(K=n.RGB32I)),M===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),H===n.UNSIGNED_INT&&(K=n.RGBA32UI),H===n.BYTE&&(K=n.RGBA8I),H===n.SHORT&&(K=n.RGBA16I),H===n.INT&&(K=n.RGBA32I)),M===n.RGB&&H===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),M===n.RGBA){const At=ot?so:oe.getTransfer(nt);H===n.FLOAT&&(K=n.RGBA32F),H===n.HALF_FLOAT&&(K=n.RGBA16F),H===n.UNSIGNED_BYTE&&(K=At===_e?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(E,M){let H;return E?M===null||M===vr||M===Wr?H=n.DEPTH24_STENCIL8:M===ui?H=n.DEPTH32F_STENCIL8:M===Hs&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===vr||M===Wr?H=n.DEPTH_COMPONENT24:M===ui?H=n.DEPTH_COMPONENT32F:M===Hs&&(H=n.DEPTH_COMPONENT16),H}function I(E,M){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==xn&&E.minFilter!==vn?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function P(E){const M=E.target;M.removeEventListener("dispose",P),L(M),M.isVideoTexture&&f.delete(M)}function C(E){const M=E.target;M.removeEventListener("dispose",C),_(M)}function L(E){const M=i.get(E);if(M.__webglInit===void 0)return;const H=E.source,nt=h.get(H);if(nt){const ot=nt[M.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&v(E),Object.keys(nt).length===0&&h.delete(H)}i.remove(E)}function v(E){const M=i.get(E);n.deleteTexture(M.__webglTexture);const H=E.source,nt=h.get(H);delete nt[M.__cacheKey],a.memory.textures--}function _(E){const M=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(M.__webglFramebuffer[nt]))for(let ot=0;ot<M.__webglFramebuffer[nt].length;ot++)n.deleteFramebuffer(M.__webglFramebuffer[nt][ot]);else n.deleteFramebuffer(M.__webglFramebuffer[nt]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[nt])}else{if(Array.isArray(M.__webglFramebuffer))for(let nt=0;nt<M.__webglFramebuffer.length;nt++)n.deleteFramebuffer(M.__webglFramebuffer[nt]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let nt=0;nt<M.__webglColorRenderbuffer.length;nt++)M.__webglColorRenderbuffer[nt]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[nt]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=E.textures;for(let nt=0,ot=H.length;nt<ot;nt++){const K=i.get(H[nt]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(H[nt])}i.remove(E)}let w=0;function k(){w=0}function N(){const E=w;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),w+=1,E}function B(E){const M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function j(E,M){const H=i.get(E);if(E.isVideoTexture&&ct(E),E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){const nt=E.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(H,E,M);return}}e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+M)}function R(E,M){const H=i.get(E);if(E.version>0&&H.__version!==E.version){G(H,E,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+M)}function V(E,M){const H=i.get(E);if(E.version>0&&H.__version!==E.version){G(H,E,M);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+M)}function U(E,M){const H=i.get(E);if(E.version>0&&H.__version!==E.version){Y(H,E,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+M)}const rt={[ka]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[Ic]:n.MIRRORED_REPEAT},q={[xn]:n.NEAREST,[Ip]:n.NEAREST_MIPMAP_NEAREST,[ya]:n.NEAREST_MIPMAP_LINEAR,[vn]:n.LINEAR,[ic]:n.LINEAR_MIPMAP_NEAREST,[fi]:n.LINEAR_MIPMAP_LINEAR},J={[Fp]:n.NEVER,[Vp]:n.ALWAYS,[Op]:n.LESS,[Fu]:n.LEQUAL,[kp]:n.EQUAL,[Gp]:n.GEQUAL,[zp]:n.GREATER,[Bp]:n.NOTEQUAL};function lt(E,M){if(M.type===ui&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===vn||M.magFilter===ic||M.magFilter===ya||M.magFilter===fi||M.minFilter===vn||M.minFilter===ic||M.minFilter===ya||M.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,rt[M.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,rt[M.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,rt[M.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,q[M.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,q[M.minFilter]),M.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,J[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===xn||M.minFilter!==ya&&M.minFilter!==fi||M.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function ht(E,M){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",P));const nt=M.source;let ot=h.get(nt);ot===void 0&&(ot={},h.set(nt,ot));const K=B(M);if(K!==E.__cacheKey){ot[K]===void 0&&(ot[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ot[K].usedTimes++;const At=ot[E.__cacheKey];At!==void 0&&(ot[E.__cacheKey].usedTimes--,At.usedTimes===0&&v(M)),E.__cacheKey=K,E.__webglTexture=ot[K].texture}return H}function G(E,M,H){let nt=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(nt=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(nt=n.TEXTURE_3D);const ot=ht(E,M),K=M.source;e.bindTexture(nt,E.__webglTexture,n.TEXTURE0+H);const At=i.get(K);if(K.version!==At.__version||ot===!0){e.activeTexture(n.TEXTURE0+H);const dt=oe.getPrimaries(oe.workingColorSpace),_t=M.colorSpace===Pi?null:oe.getPrimaries(M.colorSpace),Wt=M.colorSpace===Pi||dt===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let gt=x(M.image,!1,r.maxTextureSize);gt=Pt(M,gt);const Lt=s.convert(M.format,M.colorSpace),Bt=s.convert(M.type);let Gt=A(M.internalFormat,Lt,Bt,M.colorSpace,M.isVideoTexture);lt(nt,M);let It;const re=M.mipmaps,$t=M.isVideoTexture!==!0,me=At.__version===void 0||ot===!0,z=K.dataReady,Et=I(M,gt);if(M.isDepthTexture)Gt=y(M.format===Xr,M.type),me&&($t?e.texStorage2D(n.TEXTURE_2D,1,Gt,gt.width,gt.height):e.texImage2D(n.TEXTURE_2D,0,Gt,gt.width,gt.height,0,Lt,Bt,null));else if(M.isDataTexture)if(re.length>0){$t&&me&&e.texStorage2D(n.TEXTURE_2D,Et,Gt,re[0].width,re[0].height);for(let it=0,Z=re.length;it<Z;it++)It=re[it],$t?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Lt,Bt,It.data):e.texImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,Lt,Bt,It.data);M.generateMipmaps=!1}else $t?(me&&e.texStorage2D(n.TEXTURE_2D,Et,Gt,gt.width,gt.height),z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt.width,gt.height,Lt,Bt,gt.data)):e.texImage2D(n.TEXTURE_2D,0,Gt,gt.width,gt.height,0,Lt,Bt,gt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){$t&&me&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,Gt,re[0].width,re[0].height,gt.depth);for(let it=0,Z=re.length;it<Z;it++)if(It=re[it],M.format!==Nn)if(Lt!==null)if($t){if(z)if(M.layerUpdates.size>0){const vt=dd(It.width,It.height,M.format,M.type);for(const bt of M.layerUpdates){const Xt=It.data.subarray(bt*vt/It.data.BYTES_PER_ELEMENT,(bt+1)*vt/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,bt,It.width,It.height,1,Lt,Xt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,It.width,It.height,gt.depth,Lt,It.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,Gt,It.width,It.height,gt.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,It.width,It.height,gt.depth,Lt,Bt,It.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,Gt,It.width,It.height,gt.depth,0,Lt,Bt,It.data)}else{$t&&me&&e.texStorage2D(n.TEXTURE_2D,Et,Gt,re[0].width,re[0].height);for(let it=0,Z=re.length;it<Z;it++)It=re[it],M.format!==Nn?Lt!==null?$t?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Lt,It.data):e.compressedTexImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,It.width,It.height,Lt,Bt,It.data):e.texImage2D(n.TEXTURE_2D,it,Gt,It.width,It.height,0,Lt,Bt,It.data)}else if(M.isDataArrayTexture)if($t){if(me&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,Gt,gt.width,gt.height,gt.depth),z)if(M.layerUpdates.size>0){const it=dd(gt.width,gt.height,M.format,M.type);for(const Z of M.layerUpdates){const vt=gt.data.subarray(Z*it/gt.data.BYTES_PER_ELEMENT,(Z+1)*it/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,gt.width,gt.height,1,Lt,Bt,vt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Lt,Bt,gt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Gt,gt.width,gt.height,gt.depth,0,Lt,Bt,gt.data);else if(M.isData3DTexture)$t?(me&&e.texStorage3D(n.TEXTURE_3D,Et,Gt,gt.width,gt.height,gt.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Lt,Bt,gt.data)):e.texImage3D(n.TEXTURE_3D,0,Gt,gt.width,gt.height,gt.depth,0,Lt,Bt,gt.data);else if(M.isFramebufferTexture){if(me)if($t)e.texStorage2D(n.TEXTURE_2D,Et,Gt,gt.width,gt.height);else{let it=gt.width,Z=gt.height;for(let vt=0;vt<Et;vt++)e.texImage2D(n.TEXTURE_2D,vt,Gt,it,Z,0,Lt,Bt,null),it>>=1,Z>>=1}}else if(re.length>0){if($t&&me){const it=Mt(re[0]);e.texStorage2D(n.TEXTURE_2D,Et,Gt,it.width,it.height)}for(let it=0,Z=re.length;it<Z;it++)It=re[it],$t?z&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,Lt,Bt,It):e.texImage2D(n.TEXTURE_2D,it,Gt,Lt,Bt,It);M.generateMipmaps=!1}else if($t){if(me){const it=Mt(gt);e.texStorage2D(n.TEXTURE_2D,Et,Gt,it.width,it.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Lt,Bt,gt)}else e.texImage2D(n.TEXTURE_2D,0,Gt,Lt,Bt,gt);p(M)&&d(nt),At.__version=K.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function Y(E,M,H){if(M.image.length!==6)return;const nt=ht(E,M),ot=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+H);const K=i.get(ot);if(ot.version!==K.__version||nt===!0){e.activeTexture(n.TEXTURE0+H);const At=oe.getPrimaries(oe.workingColorSpace),dt=M.colorSpace===Pi?null:oe.getPrimaries(M.colorSpace),_t=M.colorSpace===Pi||At===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Wt=M.isCompressedTexture||M.image[0].isCompressedTexture,gt=M.image[0]&&M.image[0].isDataTexture,Lt=[];for(let Z=0;Z<6;Z++)!Wt&&!gt?Lt[Z]=x(M.image[Z],!0,r.maxCubemapSize):Lt[Z]=gt?M.image[Z].image:M.image[Z],Lt[Z]=Pt(M,Lt[Z]);const Bt=Lt[0],Gt=s.convert(M.format,M.colorSpace),It=s.convert(M.type),re=A(M.internalFormat,Gt,It,M.colorSpace),$t=M.isVideoTexture!==!0,me=K.__version===void 0||nt===!0,z=ot.dataReady;let Et=I(M,Bt);lt(n.TEXTURE_CUBE_MAP,M);let it;if(Wt){$t&&me&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,re,Bt.width,Bt.height);for(let Z=0;Z<6;Z++){it=Lt[Z].mipmaps;for(let vt=0;vt<it.length;vt++){const bt=it[vt];M.format!==Nn?Gt!==null?$t?z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,0,0,bt.width,bt.height,Gt,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,re,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,0,0,bt.width,bt.height,Gt,It,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,re,bt.width,bt.height,0,Gt,It,bt.data)}}}else{if(it=M.mipmaps,$t&&me){it.length>0&&Et++;const Z=Mt(Lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,re,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(gt){$t?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Lt[Z].width,Lt[Z].height,Gt,It,Lt[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,re,Lt[Z].width,Lt[Z].height,0,Gt,It,Lt[Z].data);for(let vt=0;vt<it.length;vt++){const Xt=it[vt].image[Z].image;$t?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,0,0,Xt.width,Xt.height,Gt,It,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,re,Xt.width,Xt.height,0,Gt,It,Xt.data)}}else{$t?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Gt,It,Lt[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,re,Gt,It,Lt[Z]);for(let vt=0;vt<it.length;vt++){const bt=it[vt];$t?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,0,0,Gt,It,bt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,re,Gt,It,bt.image[Z])}}}p(M)&&d(n.TEXTURE_CUBE_MAP),K.__version=ot.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function $(E,M,H,nt,ot,K){const At=s.convert(H.format,H.colorSpace),dt=s.convert(H.type),_t=A(H.internalFormat,At,dt,H.colorSpace),Wt=i.get(M),gt=i.get(H);if(gt.__renderTarget=M,!Wt.__hasExternalTextures){const Lt=Math.max(1,M.width>>K),Bt=Math.max(1,M.height>>K);ot===n.TEXTURE_3D||ot===n.TEXTURE_2D_ARRAY?e.texImage3D(ot,K,_t,Lt,Bt,M.depth,0,At,dt,null):e.texImage2D(ot,K,_t,Lt,Bt,0,At,dt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),yt(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,ot,gt.__webglTexture,0,pt(M)):(ot===n.TEXTURE_2D||ot>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,nt,ot,gt.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function F(E,M,H){if(n.bindRenderbuffer(n.RENDERBUFFER,E),M.depthBuffer){const nt=M.depthTexture,ot=nt&&nt.isDepthTexture?nt.type:null,K=y(M.stencilBuffer,ot),At=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=pt(M);yt(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt,K,M.width,M.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,K,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,K,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,At,n.RENDERBUFFER,E)}else{const nt=M.textures;for(let ot=0;ot<nt.length;ot++){const K=nt[ot],At=s.convert(K.format,K.colorSpace),dt=s.convert(K.type),_t=A(K.internalFormat,At,dt,K.colorSpace),Wt=pt(M);H&&yt(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,_t,M.width,M.height):yt(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,_t,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,_t,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function tt(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=i.get(M.depthTexture);nt.__renderTarget=M,(!nt.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),j(M.depthTexture,0);const ot=nt.__webglTexture,K=pt(M);if(M.depthTexture.format===kr)yt(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ot,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ot,0);else if(M.depthTexture.format===Xr)yt(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ot,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function at(E){const M=i.get(E),H=E.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==E.depthTexture){const nt=E.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),nt){const ot=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,nt.removeEventListener("dispose",ot)};nt.addEventListener("dispose",ot),M.__depthDisposeCallback=ot}M.__boundDepthTexture=nt}if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");tt(M.__webglFramebuffer,E)}else if(H){M.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[nt]),M.__webglDepthbuffer[nt]===void 0)M.__webglDepthbuffer[nt]=n.createRenderbuffer(),F(M.__webglDepthbuffer[nt],E,!1);else{const ot=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[nt];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),F(M.__webglDepthbuffer,E,!1);else{const nt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,ot)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function st(E,M,H){const nt=i.get(E);M!==void 0&&$(nt.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&at(E)}function Ot(E){const M=E.texture,H=i.get(E),nt=i.get(M);E.addEventListener("dispose",C);const ot=E.textures,K=E.isWebGLCubeRenderTarget===!0,At=ot.length>1;if(At||(nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture()),nt.__version=M.version,a.memory.textures++),K){H.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[dt]=[];for(let _t=0;_t<M.mipmaps.length;_t++)H.__webglFramebuffer[dt][_t]=n.createFramebuffer()}else H.__webglFramebuffer[dt]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let dt=0;dt<M.mipmaps.length;dt++)H.__webglFramebuffer[dt]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(At)for(let dt=0,_t=ot.length;dt<_t;dt++){const Wt=i.get(ot[dt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&yt(E)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let dt=0;dt<ot.length;dt++){const _t=ot[dt];H.__webglColorRenderbuffer[dt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[dt]);const Wt=s.convert(_t.format,_t.colorSpace),gt=s.convert(_t.type),Lt=A(_t.internalFormat,Wt,gt,_t.colorSpace,E.isXRRenderTarget===!0),Bt=pt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt,Lt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,H.__webglColorRenderbuffer[dt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),F(H.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,nt.__webglTexture),lt(n.TEXTURE_CUBE_MAP,M);for(let dt=0;dt<6;dt++)if(M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)$(H.__webglFramebuffer[dt][_t],E,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,_t);else $(H.__webglFramebuffer[dt],E,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);p(M)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let dt=0,_t=ot.length;dt<_t;dt++){const Wt=ot[dt],gt=i.get(Wt);e.bindTexture(n.TEXTURE_2D,gt.__webglTexture),lt(n.TEXTURE_2D,Wt),$(H.__webglFramebuffer,E,Wt,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,0),p(Wt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let dt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,nt.__webglTexture),lt(dt,M),M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)$(H.__webglFramebuffer[_t],E,M,n.COLOR_ATTACHMENT0,dt,_t);else $(H.__webglFramebuffer,E,M,n.COLOR_ATTACHMENT0,dt,0);p(M)&&d(dt),e.unbindTexture()}E.depthBuffer&&at(E)}function kt(E){const M=E.textures;for(let H=0,nt=M.length;H<nt;H++){const ot=M[H];if(p(ot)){const K=b(E),At=i.get(ot).__webglTexture;e.bindTexture(K,At),d(K),e.unbindTexture()}}}const Rt=[],D=[];function Tt(E){if(E.samples>0){if(yt(E)===!1){const M=E.textures,H=E.width,nt=E.height;let ot=n.COLOR_BUFFER_BIT;const K=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,At=i.get(E),dt=M.length>1;if(dt)for(let _t=0;_t<M.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ot|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ot|=n.STENCIL_BUFFER_BIT)),dt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,At.__webglColorRenderbuffer[_t]);const Wt=i.get(M[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Wt,0)}n.blitFramebuffer(0,0,H,nt,0,0,H,nt,ot,n.NEAREST),c===!0&&(Rt.length=0,D.length=0,Rt.push(n.COLOR_ATTACHMENT0+_t),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Rt.push(K),D.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Rt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),dt)for(let _t=0;_t<M.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,At.__webglColorRenderbuffer[_t]);const Wt=i.get(M[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,Wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const M=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function pt(E){return Math.min(r.maxSamples,E.samples)}function yt(E){const M=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ct(E){const M=a.render.frame;f.get(E)!==M&&(f.set(E,M),E.update())}function Pt(E,M){const H=E.colorSpace,nt=E.format,ot=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||H!==es&&H!==Pi&&(oe.getTransfer(H)===_e?(nt!==Nn||ot!==mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function Mt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=R,this.setTexture3D=V,this.setTextureCube=U,this.rebindTextures=st,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=$,this.useMultisampledRTT=yt}function am(n,t){function e(i,r=Pi){let s;const a=oe.getTransfer(r);if(i===mi)return n.UNSIGNED_BYTE;if(i===Rl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Cl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Au)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wu)return n.BYTE;if(i===Tu)return n.SHORT;if(i===Hs)return n.UNSIGNED_SHORT;if(i===Al)return n.INT;if(i===vr)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===Zs)return n.HALF_FLOAT;if(i===Ru)return n.ALPHA;if(i===Cu)return n.RGB;if(i===Nn)return n.RGBA;if(i===Pu)return n.LUMINANCE;if(i===Lu)return n.LUMINANCE_ALPHA;if(i===kr)return n.DEPTH_COMPONENT;if(i===Xr)return n.DEPTH_STENCIL;if(i===Iu)return n.RED;if(i===Pl)return n.RED_INTEGER;if(i===Du)return n.RG;if(i===Ll)return n.RG_INTEGER;if(i===Il)return n.RGBA_INTEGER;if(i===Ta||i===Aa||i===Ra||i===Ca)if(a===_e)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ta)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ta)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Aa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dc||i===Uc||i===Nc||i===Fc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Dc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oc||i===kc||i===zc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Oc||i===kc)return a===_e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===zc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Bc||i===Gc||i===Vc||i===Hc||i===Wc||i===Xc||i===jc||i===qc||i===Yc||i===$c||i===Kc||i===Zc||i===Jc||i===Qc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Bc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Gc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$c)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Jc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qc)return a===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pa||i===tl||i===el)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Pa)return a===_e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===el)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Uu||i===nl||i===il||i===rl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Pa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===nl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===il)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Wr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class om extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class cn extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $1={type:"move"};class _f{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,i),d=this._getHandJoint(l,x);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const f=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=f.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($1)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new cn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const K1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class J1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Qe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new qi({vertexShader:K1,fragmentShader:Z1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pe(new Yi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Q1 extends ns{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,f=null,u=null,h=null,m=null,g=null;const x=new J1,p=e.getContextAttributes();let d=null,b=null;const A=[],y=[],I=new ie;let P=null;const C=new _n;C.viewport=new xe;const L=new _n;L.viewport=new xe;const v=[C,L],_=new om;let w=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Y=A[G];return Y===void 0&&(Y=new _f,A[G]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(G){let Y=A[G];return Y===void 0&&(Y=new _f,A[G]=Y),Y.getGripSpace()},this.getHand=function(G){let Y=A[G];return Y===void 0&&(Y=new _f,A[G]=Y),Y.getHandSpace()};function N(G){const Y=y.indexOf(G.inputSource);if(Y===-1)return;const $=A[Y];$!==void 0&&($.update(G.inputSource,G.frame,l||a),$.dispatchEvent({type:G.type,data:G.inputSource}))}function B(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",j);for(let G=0;G<A.length;G++){const Y=y[G];Y!==null&&(y[G]=null,A[G].disconnect(Y))}w=null,k=null,x.reset(),t.setRenderTarget(d),m=null,h=null,u=null,r=null,b=null,ht.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",B),r.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(I),r.renderState.layers===void 0){const Y={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,Y),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new xr(m.framebufferWidth,m.framebufferHeight,{format:Nn,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Y=null,$=null,F=null;p.depth&&(F=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=p.stencil?Xr:kr,$=p.stencil?Wr:vr);const tt={colorFormat:e.RGBA8,depthFormat:F,scaleFactor:s};u=new XRWebGLBinding(r,e),h=u.createProjectionLayer(tt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),b=new xr(h.textureWidth,h.textureHeight,{format:Nn,type:mi,depthTexture:new qu(h.textureWidth,h.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ht.setContext(r),ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(G){for(let Y=0;Y<G.removed.length;Y++){const $=G.removed[Y],F=y.indexOf($);F>=0&&(y[F]=null,A[F].disconnect($))}for(let Y=0;Y<G.added.length;Y++){const $=G.added[Y];let F=y.indexOf($);if(F===-1){for(let at=0;at<A.length;at++)if(at>=y.length){y.push($),F=at;break}else if(y[at]===null){y[at]=$,F=at;break}if(F===-1)break}const tt=A[F];tt&&tt.connect($)}}const R=new O,V=new O;function U(G,Y,$){R.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition($.matrixWorld);const F=R.distanceTo(V),tt=Y.projectionMatrix.elements,at=$.projectionMatrix.elements,st=tt[14]/(tt[10]-1),Ot=tt[14]/(tt[10]+1),kt=(tt[9]+1)/tt[5],Rt=(tt[9]-1)/tt[5],D=(tt[8]-1)/tt[0],Tt=(at[8]+1)/at[0],pt=st*D,yt=st*Tt,ct=F/(-D+Tt),Pt=ct*-D;if(Y.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Pt),G.translateZ(ct),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),tt[10]===-1)G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Mt=st+ct,E=Ot+ct,M=pt-Pt,H=yt+(F-Pt),nt=kt*Ot/E*Mt,ot=Rt*Ot/E*Mt;G.projectionMatrix.makePerspective(M,H,nt,ot,Mt,E),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function rt(G,Y){Y===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Y.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let Y=G.near,$=G.far;x.texture!==null&&(x.depthNear>0&&(Y=x.depthNear),x.depthFar>0&&($=x.depthFar)),_.near=L.near=C.near=Y,_.far=L.far=C.far=$,(w!==_.near||k!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,k=_.far),C.layers.mask=G.layers.mask|2,L.layers.mask=G.layers.mask|4,_.layers.mask=C.layers.mask|L.layers.mask;const F=G.parent,tt=_.cameras;rt(_,F);for(let at=0;at<tt.length;at++)rt(tt[at],F);tt.length===2?U(_,C,L):_.projectionMatrix.copy(C.projectionMatrix),q(G,_,F)};function q(G,Y,$){$===null?G.matrix.copy(Y.matrixWorld):(G.matrix.copy($.matrixWorld),G.matrix.invert(),G.matrix.multiply(Y.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ba*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(G){c=G,h!==null&&(h.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let J=null;function lt(G,Y){if(f=Y.getViewerPose(l||a),g=Y,f!==null){const $=f.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let F=!1;$.length!==_.cameras.length&&(_.cameras.length=0,F=!0);for(let at=0;at<$.length;at++){const st=$[at];let Ot=null;if(m!==null)Ot=m.getViewport(st);else{const Rt=u.getViewSubImage(h,st);Ot=Rt.viewport,at===0&&(t.setRenderTargetTextures(b,Rt.colorTexture,h.ignoreDepthValues?void 0:Rt.depthStencilTexture),t.setRenderTarget(b))}let kt=v[at];kt===void 0&&(kt=new _n,kt.layers.enable(at),kt.viewport=new xe,v[at]=kt),kt.matrix.fromArray(st.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(st.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),at===0&&(_.matrix.copy(kt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),F===!0&&_.cameras.push(kt)}const tt=r.enabledFeatures;if(tt&&tt.includes("depth-sensing")){const at=u.getDepthInformation($[0]);at&&at.isValid&&at.texture&&x.init(t,at,r.renderState)}}for(let $=0;$<A.length;$++){const F=y[$],tt=A[$];F!==null&&tt!==void 0&&tt.update(F,Y,l||a)}J&&J(G,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const ht=new Qp;ht.setAnimationLoop(lt),this.setAnimationLoop=function(G){J=G},this.dispose=function(){}}}const Cr=new kn,tM=new Ht;function eM(n,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,$p(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,b,A,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),u(p,d)):d.isMeshPhongMaterial?(s(p,d),f(p,d)):d.isMeshStandardMaterial?(s(p,d),h(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(s(p,d),g(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),x(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,b,A):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===$e&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===$e&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=t.get(d),A=b.envMap,y=b.envMapRotation;A&&(p.envMap.value=A,Cr.copy(y),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),p.envMapRotation.value.setFromMatrix4(tM.makeRotationFromEuler(Cr)),p.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,b,A){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=A*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function f(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===$e&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function x(p,d){const b=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function nM(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,A){const y=A.program;i.uniformBlockBinding(b,y)}function l(b,A){let y=r[b.id];y===void 0&&(g(b),y=f(b),r[b.id]=y,b.addEventListener("dispose",p));const I=A.program;i.updateUBOMapping(b,I);const P=t.render.frame;s[b.id]!==P&&(h(b),s[b.id]=P)}function f(b){const A=u();b.__bindingPointIndex=A;const y=n.createBuffer(),I=b.__size,P=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,I,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,y),y}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const A=r[b.id],y=b.uniforms,I=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let P=0,C=y.length;P<C;P++){const L=Array.isArray(y[P])?y[P]:[y[P]];for(let v=0,_=L.length;v<_;v++){const w=L[v];if(m(w,P,v,I)===!0){const k=w.__offset,N=Array.isArray(w.value)?w.value:[w.value];let B=0;for(let j=0;j<N.length;j++){const R=N[j],V=x(R);typeof R=="number"||typeof R=="boolean"?(w.__data[0]=R,n.bufferSubData(n.UNIFORM_BUFFER,k+B,w.__data)):R.isMatrix3?(w.__data[0]=R.elements[0],w.__data[1]=R.elements[1],w.__data[2]=R.elements[2],w.__data[3]=0,w.__data[4]=R.elements[3],w.__data[5]=R.elements[4],w.__data[6]=R.elements[5],w.__data[7]=0,w.__data[8]=R.elements[6],w.__data[9]=R.elements[7],w.__data[10]=R.elements[8],w.__data[11]=0):(R.toArray(w.__data,B),B+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,A,y,I){const P=b.value,C=A+"_"+y;if(I[C]===void 0)return typeof P=="number"||typeof P=="boolean"?I[C]=P:I[C]=P.clone(),!0;{const L=I[C];if(typeof P=="number"||typeof P=="boolean"){if(L!==P)return I[C]=P,!0}else if(L.equals(P)===!1)return L.copy(P),!0}return!1}function g(b){const A=b.uniforms;let y=0;const I=16;for(let C=0,L=A.length;C<L;C++){const v=Array.isArray(A[C])?A[C]:[A[C]];for(let _=0,w=v.length;_<w;_++){const k=v[_],N=Array.isArray(k.value)?k.value:[k.value];for(let B=0,j=N.length;B<j;B++){const R=N[B],V=x(R),U=y%I,rt=U%V.boundary,q=U+rt;y+=rt,q!==0&&I-q<V.storage&&(y+=I-q),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=V.storage}}}const P=y%I;return P>0&&(y+=I-P),b.__size=y,b.__cache={},this}function x(b){const A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),A}function p(b){const A=b.target;A.removeEventListener("dispose",p);const y=a.indexOf(A.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function d(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}class cm{constructor(t={}){const{canvas:e=Wp(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const g=new Uint32Array(4),x=new Int32Array(4);let p=null,d=null;const b=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=on,this.toneMapping=Gi,this.toneMappingExposure=1;const y=this;let I=!1,P=0,C=0,L=null,v=-1,_=null;const w=new xe,k=new xe;let N=null;const B=new Yt(0);let j=0,R=e.width,V=e.height,U=1,rt=null,q=null;const J=new xe(0,0,R,V),lt=new xe(0,0,R,V);let ht=!1;const G=new ao;let Y=!1,$=!1;const F=new Ht,tt=new Ht,at=new O,st=new xe,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function Rt(){return L===null?U:1}let D=i;function Tt(S,W){return e.getContext(S,W)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${El}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),D===null){const W="webgl2";if(D=Tt(W,S),D===null)throw Tt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let pt,yt,ct,Pt,Mt,E,M,H,nt,ot,K,At,dt,_t,Wt,gt,Lt,Bt,Gt,It,re,$t,me,z;function Et(){pt=new hx(D),pt.init(),$t=new am(D,pt),yt=new ax(D,pt,t,$t),ct=new j1(D,pt),yt.reverseDepthBuffer&&h&&ct.buffers.depth.setReversed(!0),Pt=new mx(D),Mt=new D1,E=new Y1(D,pt,ct,Mt,yt,$t,Pt),M=new cx(y),H=new ux(y),nt=new Sg(D),me=new rx(D,nt),ot=new dx(D,nt,Pt,me),K=new _x(D,ot,nt,Pt),Gt=new gx(D,yt,E),gt=new ox(Mt),At=new I1(y,M,H,pt,yt,me,gt),dt=new eM(y,Mt),_t=new N1,Wt=new G1(pt),Bt=new ix(y,M,H,ct,K,m,c),Lt=new W1(y,K,yt),z=new nM(D,Pt,yt,ct),It=new sx(D,pt,Pt),re=new px(D,pt,Pt),Pt.programs=At.programs,y.capabilities=yt,y.extensions=pt,y.properties=Mt,y.renderLists=_t,y.shadowMap=Lt,y.state=ct,y.info=Pt}Et();const it=new Q1(y,D);this.xr=it,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=pt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=pt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(S){S!==void 0&&(U=S,this.setSize(R,V,!1))},this.getSize=function(S){return S.set(R,V)},this.setSize=function(S,W,Q=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=S,V=W,e.width=Math.floor(S*U),e.height=Math.floor(W*U),Q===!0&&(e.style.width=S+"px",e.style.height=W+"px"),this.setViewport(0,0,S,W)},this.getDrawingBufferSize=function(S){return S.set(R*U,V*U).floor()},this.setDrawingBufferSize=function(S,W,Q){R=S,V=W,U=Q,e.width=Math.floor(S*Q),e.height=Math.floor(W*Q),this.setViewport(0,0,S,W)},this.getCurrentViewport=function(S){return S.copy(w)},this.getViewport=function(S){return S.copy(J)},this.setViewport=function(S,W,Q,et){S.isVector4?J.set(S.x,S.y,S.z,S.w):J.set(S,W,Q,et),ct.viewport(w.copy(J).multiplyScalar(U).round())},this.getScissor=function(S){return S.copy(lt)},this.setScissor=function(S,W,Q,et){S.isVector4?lt.set(S.x,S.y,S.z,S.w):lt.set(S,W,Q,et),ct.scissor(k.copy(lt).multiplyScalar(U).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(S){ct.setScissorTest(ht=S)},this.setOpaqueSort=function(S){rt=S},this.setTransparentSort=function(S){q=S},this.getClearColor=function(S){return S.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(S=!0,W=!0,Q=!0){let et=0;if(S){let X=!1;if(L!==null){const St=L.texture.format;X=St===Il||St===Ll||St===Pl}if(X){const St=L.texture.type,Ct=St===mi||St===vr||St===Hs||St===Wr||St===Rl||St===Cl,Ut=Bt.getClearColor(),Nt=Bt.getClearAlpha(),qt=Ut.r,Qt=Ut.g,Ft=Ut.b;Ct?(g[0]=qt,g[1]=Qt,g[2]=Ft,g[3]=Nt,D.clearBufferuiv(D.COLOR,0,g)):(x[0]=qt,x[1]=Qt,x[2]=Ft,x[3]=Nt,D.clearBufferiv(D.COLOR,0,x))}else et|=D.COLOR_BUFFER_BIT}W&&(et|=D.DEPTH_BUFFER_BIT),Q&&(et|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),_t.dispose(),Wt.dispose(),Mt.dispose(),M.dispose(),H.dispose(),K.dispose(),me.dispose(),z.dispose(),At.dispose(),it.dispose(),it.removeEventListener("sessionstart",mh),it.removeEventListener("sessionend",gh),br.stop()};function Z(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const S=Pt.autoReset,W=Lt.enabled,Q=Lt.autoUpdate,et=Lt.needsUpdate,X=Lt.type;Et(),Pt.autoReset=S,Lt.enabled=W,Lt.autoUpdate=Q,Lt.needsUpdate=et,Lt.type=X}function bt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xt(S){const W=S.target;W.removeEventListener("dispose",Xt),Re(W)}function Re(S){en(S),Mt.remove(S)}function en(S){const W=Mt.get(S).programs;W!==void 0&&(W.forEach(function(Q){At.releaseProgram(Q)}),S.isShaderMaterial&&At.releaseShaderCache(S))}this.renderBufferDirect=function(S,W,Q,et,X,St){W===null&&(W=Ot);const Ct=X.isMesh&&X.matrixWorld.determinant()<0,Ut=O0(S,W,Q,et,X);ct.setMaterial(et,Ct);let Nt=Q.index,qt=1;if(et.wireframe===!0){if(Nt=ot.getWireframeAttribute(Q),Nt===void 0)return;qt=2}const Qt=Q.drawRange,Ft=Q.attributes.position;let le=Qt.start*qt,Se=(Qt.start+Qt.count)*qt;St!==null&&(le=Math.max(le,St.start*qt),Se=Math.min(Se,(St.start+St.count)*qt)),Nt!==null?(le=Math.max(le,0),Se=Math.min(Se,Nt.count)):Ft!=null&&(le=Math.max(le,0),Se=Math.min(Se,Ft.count));const we=Se-le;if(we<0||we===1/0)return;me.setup(X,et,Ut,Q,Nt);let mn,ue=It;if(Nt!==null&&(mn=nt.get(Nt),ue=re,ue.setIndex(mn)),X.isMesh)et.wireframe===!0?(ct.setLineWidth(et.wireframeLinewidth*Rt()),ue.setMode(D.LINES)):ue.setMode(D.TRIANGLES);else if(X.isLine){let zt=et.linewidth;zt===void 0&&(zt=1),ct.setLineWidth(zt*Rt()),X.isLineSegments?ue.setMode(D.LINES):X.isLineLoop?ue.setMode(D.LINE_LOOP):ue.setMode(D.LINE_STRIP)}else X.isPoints?ue.setMode(D.POINTS):X.isSprite&&ue.setMode(D.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ue.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))ue.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const zt=X._multiDrawStarts,Mi=X._multiDrawCounts,he=X._multiDrawCount,Bn=Nt?nt.get(Nt).bytesPerElement:1,as=Mt.get(et).currentProgram.getUniforms();for(let yn=0;yn<he;yn++)as.setValue(D,"_gl_DrawID",yn),ue.render(zt[yn]/Bn,Mi[yn])}else if(X.isInstancedMesh)ue.renderInstances(le,we,X.count);else if(Q.isInstancedBufferGeometry){const zt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Mi=Math.min(Q.instanceCount,zt);ue.renderInstances(le,we,Mi)}else ue.render(le,we)};function ge(S,W,Q){S.transparent===!0&&S.side===Fe&&S.forceSinglePass===!1?(S.side=$e,S.needsUpdate=!0,_o(S,W,Q),S.side=pi,S.needsUpdate=!0,_o(S,W,Q),S.side=Fe):_o(S,W,Q)}this.compile=function(S,W,Q=null){Q===null&&(Q=S),d=Wt.get(Q),d.init(W),A.push(d),Q.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),S!==Q&&S.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),d.setupLights();const et=new Set;return S.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const St=X.material;if(St)if(Array.isArray(St))for(let Ct=0;Ct<St.length;Ct++){const Ut=St[Ct];ge(Ut,Q,X),et.add(Ut)}else ge(St,Q,X),et.add(St)}),A.pop(),d=null,et},this.compileAsync=function(S,W,Q=null){const et=this.compile(S,W,Q);return new Promise(X=>{function St(){if(et.forEach(function(Ct){Mt.get(Ct).currentProgram.isReady()&&et.delete(Ct)}),et.size===0){X(S);return}setTimeout(St,10)}pt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let zn=null;function xi(S){zn&&zn(S)}function mh(){br.stop()}function gh(){br.start()}const br=new Qp;br.setAnimationLoop(xi),typeof self<"u"&&br.setContext(self),this.setAnimationLoop=function(S){zn=S,it.setAnimationLoop(S),S===null?br.stop():br.start()},it.addEventListener("sessionstart",mh),it.addEventListener("sessionend",gh),this.render=function(S,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(W),W=it.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,W,L),d=Wt.get(S,A.length),d.init(W),A.push(d),tt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),G.setFromProjectionMatrix(tt),$=this.localClippingEnabled,Y=gt.init(this.clippingPlanes,$),p=_t.get(S,b.length),p.init(),b.push(p),it.enabled===!0&&it.isPresenting===!0){const St=y.xr.getDepthSensingMesh();St!==null&&Hl(St,W,-1/0,y.sortObjects)}Hl(S,W,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(rt,q),kt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,kt&&Bt.addToRenderList(p,S),this.info.render.frame++,Y===!0&&gt.beginShadows();const Q=d.state.shadowsArray;Lt.render(Q,S,W),Y===!0&&gt.endShadows(),this.info.autoReset===!0&&this.info.reset();const et=p.opaque,X=p.transmissive;if(d.setupLights(),W.isArrayCamera){const St=W.cameras;if(X.length>0)for(let Ct=0,Ut=St.length;Ct<Ut;Ct++){const Nt=St[Ct];vh(et,X,S,Nt)}kt&&Bt.render(S);for(let Ct=0,Ut=St.length;Ct<Ut;Ct++){const Nt=St[Ct];_h(p,S,Nt,Nt.viewport)}}else X.length>0&&vh(et,X,S,W),kt&&Bt.render(S),_h(p,S,W);L!==null&&(E.updateMultisampleRenderTarget(L),E.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(y,S,W),me.resetDefaultState(),v=-1,_=null,A.pop(),A.length>0?(d=A[A.length-1],Y===!0&&gt.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function Hl(S,W,Q,et){if(S.visible===!1)return;if(S.layers.test(W.layers)){if(S.isGroup)Q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(W);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||G.intersectsSprite(S)){et&&st.setFromMatrixPosition(S.matrixWorld).applyMatrix4(tt);const Ct=K.update(S),Ut=S.material;Ut.visible&&p.push(S,Ct,Ut,Q,st.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||G.intersectsObject(S))){const Ct=K.update(S),Ut=S.material;if(et&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),st.copy(S.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),st.copy(Ct.boundingSphere.center)),st.applyMatrix4(S.matrixWorld).applyMatrix4(tt)),Array.isArray(Ut)){const Nt=Ct.groups;for(let qt=0,Qt=Nt.length;qt<Qt;qt++){const Ft=Nt[qt],le=Ut[Ft.materialIndex];le&&le.visible&&p.push(S,Ct,le,Q,st.z,Ft)}}else Ut.visible&&p.push(S,Ct,Ut,Q,st.z,null)}}const St=S.children;for(let Ct=0,Ut=St.length;Ct<Ut;Ct++)Hl(St[Ct],W,Q,et)}function _h(S,W,Q,et){const X=S.opaque,St=S.transmissive,Ct=S.transparent;d.setupLightsView(Q),Y===!0&&gt.setGlobalState(y.clippingPlanes,Q),et&&ct.viewport(w.copy(et)),X.length>0&&go(X,W,Q),St.length>0&&go(St,W,Q),Ct.length>0&&go(Ct,W,Q),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function vh(S,W,Q,et){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[et.id]===void 0&&(d.state.transmissionRenderTarget[et.id]=new xr(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?Zs:mi,minFilter:fi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));const St=d.state.transmissionRenderTarget[et.id],Ct=et.viewport||w;St.setSize(Ct.z,Ct.w);const Ut=y.getRenderTarget();y.setRenderTarget(St),y.getClearColor(B),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),kt&&Bt.render(Q);const Nt=y.toneMapping;y.toneMapping=Gi;const qt=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),d.setupLightsView(et),Y===!0&&gt.setGlobalState(y.clippingPlanes,et),go(S,Q,et),E.updateMultisampleRenderTarget(St),E.updateRenderTargetMipmap(St),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Ft=0,le=W.length;Ft<le;Ft++){const Se=W[Ft],we=Se.object,mn=Se.geometry,ue=Se.material,zt=Se.group;if(ue.side===Fe&&we.layers.test(et.layers)){const Mi=ue.side;ue.side=$e,ue.needsUpdate=!0,xh(we,Q,et,mn,ue,zt),ue.side=Mi,ue.needsUpdate=!0,Qt=!0}}Qt===!0&&(E.updateMultisampleRenderTarget(St),E.updateRenderTargetMipmap(St))}y.setRenderTarget(Ut),y.setClearColor(B,j),qt!==void 0&&(et.viewport=qt),y.toneMapping=Nt}function go(S,W,Q){const et=W.isScene===!0?W.overrideMaterial:null;for(let X=0,St=S.length;X<St;X++){const Ct=S[X],Ut=Ct.object,Nt=Ct.geometry,qt=et===null?Ct.material:et,Qt=Ct.group;Ut.layers.test(Q.layers)&&xh(Ut,W,Q,Nt,qt,Qt)}}function xh(S,W,Q,et,X,St){S.onBeforeRender(y,W,Q,et,X,St),S.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),X.onBeforeRender(y,W,Q,et,S,St),X.transparent===!0&&X.side===Fe&&X.forceSinglePass===!1?(X.side=$e,X.needsUpdate=!0,y.renderBufferDirect(Q,W,et,X,S,St),X.side=pi,X.needsUpdate=!0,y.renderBufferDirect(Q,W,et,X,S,St),X.side=Fe):y.renderBufferDirect(Q,W,et,X,S,St),S.onAfterRender(y,W,Q,et,X,St)}function _o(S,W,Q){W.isScene!==!0&&(W=Ot);const et=Mt.get(S),X=d.state.lights,St=d.state.shadowsArray,Ct=X.state.version,Ut=At.getParameters(S,X.state,St,W,Q),Nt=At.getProgramCacheKey(Ut);let qt=et.programs;et.environment=S.isMeshStandardMaterial?W.environment:null,et.fog=W.fog,et.envMap=(S.isMeshStandardMaterial?H:M).get(S.envMap||et.environment),et.envMapRotation=et.environment!==null&&S.envMap===null?W.environmentRotation:S.envMapRotation,qt===void 0&&(S.addEventListener("dispose",Xt),qt=new Map,et.programs=qt);let Qt=qt.get(Nt);if(Qt!==void 0){if(et.currentProgram===Qt&&et.lightsStateVersion===Ct)return yh(S,Ut),Qt}else Ut.uniforms=At.getUniforms(S),S.onBeforeCompile(Ut,y),Qt=At.acquireProgram(Ut,Nt),qt.set(Nt,Qt),et.uniforms=Ut.uniforms;const Ft=et.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ft.clippingPlanes=gt.uniform),yh(S,Ut),et.needsLights=z0(S),et.lightsStateVersion=Ct,et.needsLights&&(Ft.ambientLightColor.value=X.state.ambient,Ft.lightProbe.value=X.state.probe,Ft.directionalLights.value=X.state.directional,Ft.directionalLightShadows.value=X.state.directionalShadow,Ft.spotLights.value=X.state.spot,Ft.spotLightShadows.value=X.state.spotShadow,Ft.rectAreaLights.value=X.state.rectArea,Ft.ltc_1.value=X.state.rectAreaLTC1,Ft.ltc_2.value=X.state.rectAreaLTC2,Ft.pointLights.value=X.state.point,Ft.pointLightShadows.value=X.state.pointShadow,Ft.hemisphereLights.value=X.state.hemi,Ft.directionalShadowMap.value=X.state.directionalShadowMap,Ft.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ft.spotShadowMap.value=X.state.spotShadowMap,Ft.spotLightMatrix.value=X.state.spotLightMatrix,Ft.spotLightMap.value=X.state.spotLightMap,Ft.pointShadowMap.value=X.state.pointShadowMap,Ft.pointShadowMatrix.value=X.state.pointShadowMatrix),et.currentProgram=Qt,et.uniformsList=null,Qt}function Mh(S){if(S.uniformsList===null){const W=S.currentProgram.getUniforms();S.uniformsList=rc.seqWithValue(W.seq,S.uniforms)}return S.uniformsList}function yh(S,W){const Q=Mt.get(S);Q.outputColorSpace=W.outputColorSpace,Q.batching=W.batching,Q.batchingColor=W.batchingColor,Q.instancing=W.instancing,Q.instancingColor=W.instancingColor,Q.instancingMorph=W.instancingMorph,Q.skinning=W.skinning,Q.morphTargets=W.morphTargets,Q.morphNormals=W.morphNormals,Q.morphColors=W.morphColors,Q.morphTargetsCount=W.morphTargetsCount,Q.numClippingPlanes=W.numClippingPlanes,Q.numIntersection=W.numClipIntersection,Q.vertexAlphas=W.vertexAlphas,Q.vertexTangents=W.vertexTangents,Q.toneMapping=W.toneMapping}function O0(S,W,Q,et,X){W.isScene!==!0&&(W=Ot),E.resetTextureUnits();const St=W.fog,Ct=et.isMeshStandardMaterial?W.environment:null,Ut=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:es,Nt=(et.isMeshStandardMaterial?H:M).get(et.envMap||Ct),qt=et.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Qt=!!Q.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Ft=!!Q.morphAttributes.position,le=!!Q.morphAttributes.normal,Se=!!Q.morphAttributes.color;let we=Gi;et.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(we=y.toneMapping);const mn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ue=mn!==void 0?mn.length:0,zt=Mt.get(et),Mi=d.state.lights;if(Y===!0&&($===!0||S!==_)){const Pn=S===_&&et.id===v;gt.setState(et,S,Pn)}let he=!1;et.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Mi.state.version||zt.outputColorSpace!==Ut||X.isBatchedMesh&&zt.batching===!1||!X.isBatchedMesh&&zt.batching===!0||X.isBatchedMesh&&zt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&zt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&zt.instancing===!1||!X.isInstancedMesh&&zt.instancing===!0||X.isSkinnedMesh&&zt.skinning===!1||!X.isSkinnedMesh&&zt.skinning===!0||X.isInstancedMesh&&zt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&zt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&zt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&zt.instancingMorph===!1&&X.morphTexture!==null||zt.envMap!==Nt||et.fog===!0&&zt.fog!==St||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==gt.numPlanes||zt.numIntersection!==gt.numIntersection)||zt.vertexAlphas!==qt||zt.vertexTangents!==Qt||zt.morphTargets!==Ft||zt.morphNormals!==le||zt.morphColors!==Se||zt.toneMapping!==we||zt.morphTargetsCount!==ue)&&(he=!0):(he=!0,zt.__version=et.version);let Bn=zt.currentProgram;he===!0&&(Bn=_o(et,W,X));let as=!1,yn=!1,aa=!1;const Te=Bn.getUniforms(),Qn=zt.uniforms;if(ct.useProgram(Bn.program)&&(as=!0,yn=!0,aa=!0),et.id!==v&&(v=et.id,yn=!0),as||_!==S){ct.buffers.depth.getReversed()?(F.copy(S.projectionMatrix),ig(F),rg(F),Te.setValue(D,"projectionMatrix",F)):Te.setValue(D,"projectionMatrix",S.projectionMatrix),Te.setValue(D,"viewMatrix",S.matrixWorldInverse);const Zi=Te.map.cameraPosition;Zi!==void 0&&Zi.setValue(D,at.setFromMatrixPosition(S.matrixWorld)),yt.logarithmicDepthBuffer&&Te.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Te.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),_!==S&&(_=S,yn=!0,aa=!0)}if(X.isSkinnedMesh){Te.setOptional(D,X,"bindMatrix"),Te.setOptional(D,X,"bindMatrixInverse");const Pn=X.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Te.setValue(D,"boneTexture",Pn.boneTexture,E))}X.isBatchedMesh&&(Te.setOptional(D,X,"batchingTexture"),Te.setValue(D,"batchingTexture",X._matricesTexture,E),Te.setOptional(D,X,"batchingIdTexture"),Te.setValue(D,"batchingIdTexture",X._indirectTexture,E),Te.setOptional(D,X,"batchingColorTexture"),X._colorsTexture!==null&&Te.setValue(D,"batchingColorTexture",X._colorsTexture,E));const oa=Q.morphAttributes;if((oa.position!==void 0||oa.normal!==void 0||oa.color!==void 0)&&Gt.update(X,Q,Bn),(yn||zt.receiveShadow!==X.receiveShadow)&&(zt.receiveShadow=X.receiveShadow,Te.setValue(D,"receiveShadow",X.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(Qn.envMap.value=Nt,Qn.flipEnvMap.value=Nt.isCubeTexture&&Nt.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&W.environment!==null&&(Qn.envMapIntensity.value=W.environmentIntensity),yn&&(Te.setValue(D,"toneMappingExposure",y.toneMappingExposure),zt.needsLights&&k0(Qn,aa),St&&et.fog===!0&&dt.refreshFogUniforms(Qn,St),dt.refreshMaterialUniforms(Qn,et,U,V,d.state.transmissionRenderTarget[S.id]),rc.upload(D,Mh(zt),Qn,E)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(rc.upload(D,Mh(zt),Qn,E),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Te.setValue(D,"center",X.center),Te.setValue(D,"modelViewMatrix",X.modelViewMatrix),Te.setValue(D,"normalMatrix",X.normalMatrix),Te.setValue(D,"modelMatrix",X.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){const Pn=et.uniformsGroups;for(let Zi=0,Ji=Pn.length;Zi<Ji;Zi++){const Sh=Pn[Zi];z.update(Sh,Bn),z.bind(Sh,Bn)}}return Bn}function k0(S,W){S.ambientLightColor.needsUpdate=W,S.lightProbe.needsUpdate=W,S.directionalLights.needsUpdate=W,S.directionalLightShadows.needsUpdate=W,S.pointLights.needsUpdate=W,S.pointLightShadows.needsUpdate=W,S.spotLights.needsUpdate=W,S.spotLightShadows.needsUpdate=W,S.rectAreaLights.needsUpdate=W,S.hemisphereLights.needsUpdate=W}function z0(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,W,Q){Mt.get(S.texture).__webglTexture=W,Mt.get(S.depthTexture).__webglTexture=Q;const et=Mt.get(S);et.__hasExternalTextures=!0,et.__autoAllocateDepthBuffer=Q===void 0,et.__autoAllocateDepthBuffer||pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,W){const Q=Mt.get(S);Q.__webglFramebuffer=W,Q.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(S,W=0,Q=0){L=S,P=W,C=Q;let et=!0,X=null,St=!1,Ct=!1;if(S){const Nt=Mt.get(S);if(Nt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(D.FRAMEBUFFER,null),et=!1;else if(Nt.__webglFramebuffer===void 0)E.setupRenderTarget(S);else if(Nt.__hasExternalTextures)E.rebindTextures(S,Mt.get(S.texture).__webglTexture,Mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ft=S.depthTexture;if(Nt.__boundDepthTexture!==Ft){if(Ft!==null&&Mt.has(Ft)&&(S.width!==Ft.image.width||S.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(S)}}const qt=S.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Ct=!0);const Qt=Mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Qt[W])?X=Qt[W][Q]:X=Qt[W],St=!0):S.samples>0&&E.useMultisampledRTT(S)===!1?X=Mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Qt)?X=Qt[Q]:X=Qt,w.copy(S.viewport),k.copy(S.scissor),N=S.scissorTest}else w.copy(J).multiplyScalar(U).floor(),k.copy(lt).multiplyScalar(U).floor(),N=ht;if(ct.bindFramebuffer(D.FRAMEBUFFER,X)&&et&&ct.drawBuffers(S,X),ct.viewport(w),ct.scissor(k),ct.setScissorTest(N),St){const Nt=Mt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+W,Nt.__webglTexture,Q)}else if(Ct){const Nt=Mt.get(S.texture),qt=W||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.__webglTexture,Q||0,qt)}v=-1},this.readRenderTargetPixels=function(S,W,Q,et,X,St,Ct){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut){ct.bindFramebuffer(D.FRAMEBUFFER,Ut);try{const Nt=S.texture,qt=Nt.format,Qt=Nt.type;if(!yt.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=S.width-et&&Q>=0&&Q<=S.height-X&&D.readPixels(W,Q,et,X,$t.convert(qt),$t.convert(Qt),St)}finally{const Nt=L!==null?Mt.get(L).__webglFramebuffer:null;ct.bindFramebuffer(D.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(S,W,Q,et,X,St,Ct){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut){const Nt=S.texture,qt=Nt.format,Qt=Nt.type;if(!yt.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=S.width-et&&Q>=0&&Q<=S.height-X){ct.bindFramebuffer(D.FRAMEBUFFER,Ut);const Ft=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.bufferData(D.PIXEL_PACK_BUFFER,St.byteLength,D.STREAM_READ),D.readPixels(W,Q,et,X,$t.convert(qt),$t.convert(Qt),0);const le=L!==null?Mt.get(L).__webglFramebuffer:null;ct.bindFramebuffer(D.FRAMEBUFFER,le);const Se=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await ng(D,Se,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ft),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,St),D.deleteBuffer(Ft),D.deleteSync(Se),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,W=null,Q=0){S.isTexture!==!0&&(Sa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1]);const et=Math.pow(2,-Q),X=Math.floor(S.image.width*et),St=Math.floor(S.image.height*et),Ct=W!==null?W.x:0,Ut=W!==null?W.y:0;E.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,Q,0,0,Ct,Ut,X,St),ct.unbindTexture()},this.copyTextureToTexture=function(S,W,Q=null,et=null,X=0){S.isTexture!==!0&&(Sa("WebGLRenderer: copyTextureToTexture function signature has changed."),et=arguments[0]||null,S=arguments[1],W=arguments[2],X=arguments[3]||0,Q=null);let St,Ct,Ut,Nt,qt,Qt,Ft,le,Se;const we=S.isCompressedTexture?S.mipmaps[X]:S.image;Q!==null?(St=Q.max.x-Q.min.x,Ct=Q.max.y-Q.min.y,Ut=Q.isBox3?Q.max.z-Q.min.z:1,Nt=Q.min.x,qt=Q.min.y,Qt=Q.isBox3?Q.min.z:0):(St=we.width,Ct=we.height,Ut=we.depth||1,Nt=0,qt=0,Qt=0),et!==null?(Ft=et.x,le=et.y,Se=et.z):(Ft=0,le=0,Se=0);const mn=$t.convert(W.format),ue=$t.convert(W.type);let zt;W.isData3DTexture?(E.setTexture3D(W,0),zt=D.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(E.setTexture2DArray(W,0),zt=D.TEXTURE_2D_ARRAY):(E.setTexture2D(W,0),zt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,W.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,W.unpackAlignment);const Mi=D.getParameter(D.UNPACK_ROW_LENGTH),he=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Bn=D.getParameter(D.UNPACK_SKIP_PIXELS),as=D.getParameter(D.UNPACK_SKIP_ROWS),yn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,we.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,we.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Nt),D.pixelStorei(D.UNPACK_SKIP_ROWS,qt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Qt);const aa=S.isDataArrayTexture||S.isData3DTexture,Te=W.isDataArrayTexture||W.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Qn=Mt.get(S),oa=Mt.get(W),Pn=Mt.get(Qn.__renderTarget),Zi=Mt.get(oa.__renderTarget);ct.bindFramebuffer(D.READ_FRAMEBUFFER,Pn.__webglFramebuffer),ct.bindFramebuffer(D.DRAW_FRAMEBUFFER,Zi.__webglFramebuffer);for(let Ji=0;Ji<Ut;Ji++)aa&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Mt.get(S).__webglTexture,X,Qt+Ji),S.isDepthTexture?(Te&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Mt.get(W).__webglTexture,X,Se+Ji),D.blitFramebuffer(Nt,qt,St,Ct,Ft,le,St,Ct,D.DEPTH_BUFFER_BIT,D.NEAREST)):Te?D.copyTexSubImage3D(zt,X,Ft,le,Se+Ji,Nt,qt,St,Ct):D.copyTexSubImage2D(zt,X,Ft,le,Se+Ji,Nt,qt,St,Ct);ct.bindFramebuffer(D.READ_FRAMEBUFFER,null),ct.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Te?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(zt,X,Ft,le,Se,St,Ct,Ut,mn,ue,we.data):W.isCompressedArrayTexture?D.compressedTexSubImage3D(zt,X,Ft,le,Se,St,Ct,Ut,mn,we.data):D.texSubImage3D(zt,X,Ft,le,Se,St,Ct,Ut,mn,ue,we):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,X,Ft,le,St,Ct,mn,ue,we.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,X,Ft,le,we.width,we.height,mn,we.data):D.texSubImage2D(D.TEXTURE_2D,X,Ft,le,St,Ct,mn,ue,we);D.pixelStorei(D.UNPACK_ROW_LENGTH,Mi),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Bn),D.pixelStorei(D.UNPACK_SKIP_ROWS,as),D.pixelStorei(D.UNPACK_SKIP_IMAGES,yn),X===0&&W.generateMipmaps&&D.generateMipmap(zt),ct.unbindTexture()},this.copyTextureToTexture3D=function(S,W,Q=null,et=null,X=0){return S.isTexture!==!0&&(Sa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,et=arguments[1]||null,S=arguments[2],W=arguments[3],X=arguments[4]||0),Sa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,W,Q,et,X)},this.initRenderTarget=function(S){Mt.get(S).__webglFramebuffer===void 0&&E.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),ct.unbindTexture()},this.resetState=function(){P=0,C=0,L=null,ct.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}class Yu extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class lm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=sl,this.updateRanges=[],this.version=0,this.uuid=Vi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const fn=new O;class Va{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)fn.fromBufferAttribute(this,e),fn.applyMatrix4(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)fn.fromBufferAttribute(this,e),fn.applyNormalMatrix(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)fn.fromBufferAttribute(this,e),fn.transformDirection(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=qn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ve(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=qn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),r=ve(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),r=ve(r,this.array),s=ve(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Va(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $u extends Sr{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ms;const ha=new O,ys=new O,Ss=new O,bs=new ie,da=new ie,fm=new Ht,ko=new O,pa=new O,zo=new O,pd=new ie,vf=new ie,md=new ie;class um extends Ve{constructor(t=new $u){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new Ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new lm(e,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Va(i,3,0,!1)),Ms.setAttribute("uv",new Va(i,2,3,!1))}this.geometry=Ms,this.material=t,this.center=new ie(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ys.setFromMatrixScale(this.matrixWorld),fm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ys.multiplyScalar(-Ss.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Bo(ko.set(-.5,-.5,0),Ss,a,ys,r,s),Bo(pa.set(.5,-.5,0),Ss,a,ys,r,s),Bo(zo.set(.5,.5,0),Ss,a,ys,r,s),pd.set(0,0),vf.set(1,0),md.set(1,1);let o=t.ray.intersectTriangle(ko,pa,zo,!1,ha);if(o===null&&(Bo(pa.set(-.5,.5,0),Ss,a,ys,r,s),vf.set(0,1),o=t.ray.intersectTriangle(ko,zo,pa,!1,ha),o===null))return;const c=t.ray.origin.distanceTo(ha);c<t.near||c>t.far||e.push({distance:c,point:ha.clone(),uv:wn.getInterpolation(ha,ko,pa,zo,pd,vf,md,new ie),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Bo(n,t,e,i,r,s){bs.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(da.x=s*bs.x-r*bs.y,da.y=r*bs.x+s*bs.y):da.copy(bs),n.copy(t),n.x+=da.x,n.y+=da.y,n.applyMatrix4(fm)}class hm extends Qe{constructor(t=null,e=1,i=1,r,s,a,o,c,l=xn,f=xn,u,h){super(null,a,o,c,l,f,r,s,u,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ku extends Sr{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const al=new O,ol=new O,gd=new Ht,ma=new Bu,Go=new Qs,xf=new O,_d=new O;class dm extends Ve{constructor(t=new Ge,e=new Ku){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)al.fromBufferAttribute(e,r-1),ol.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=al.distanceTo(ol);t.setAttribute("lineDistance",new Je(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Go.copy(i.boundingSphere),Go.applyMatrix4(r),Go.radius+=s,t.ray.intersectsSphere(Go)===!1)return;gd.copy(r).invert(),ma.copy(t.ray).applyMatrix4(gd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const d=f.getX(x),b=f.getX(x+1),A=Vo(this,t,ma,c,d,b);A&&e.push(A)}if(this.isLineLoop){const x=f.getX(g-1),p=f.getX(m),d=Vo(this,t,ma,c,x,p);d&&e.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const d=Vo(this,t,ma,c,x,x+1);d&&e.push(d)}if(this.isLineLoop){const x=Vo(this,t,ma,c,g-1,m);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vo(n,t,e,i,r,s){const a=n.geometry.attributes.position;if(al.fromBufferAttribute(a,r),ol.fromBufferAttribute(a,s),e.distanceSqToSegment(al,ol,xf,_d)>i)return;xf.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(xf);if(!(c<t.near||c>t.far))return{distance:c,point:_d.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const vd=new O,xd=new O;class pm extends dm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)vd.fromBufferAttribute(e,r),xd.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+vd.distanceTo(xd);t.setAttribute("lineDistance",new Je(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nl extends Sr{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nu,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ha={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class mm{constructor(t,e,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(f){o++,s===!1&&r.onStart!==void 0&&r.onStart(f,a,o),s=!0},this.itemEnd=function(f){a++,r.onProgress!==void 0&&r.onProgress(f,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return c?c(f):f},this.setURLModifier=function(f){return c=f,this},this.addHandler=function(f,u){return l.push(f,u),this},this.removeHandler=function(f){const u=l.indexOf(f);return u!==-1&&l.splice(u,2),this},this.getHandler=function(f){for(let u=0,h=l.length;u<h;u+=2){const m=l[u],g=l[u+1];if(m.global&&(m.lastIndex=0),m.test(f))return g}return null}}}const gm=new mm;class na{constructor(t){this.manager=t!==void 0?t:gm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(r,s){i.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}na.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ti={};class iM extends Error{constructor(t,e){super(t),this.response=e}}class _m extends na{constructor(t){super(t)}load(t,e,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Ha.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Ti[t]!==void 0){Ti[t].push({onLoad:e,onProgress:i,onError:r});return}Ti[t]=[],Ti[t].push({onLoad:e,onProgress:i,onError:r});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const f=Ti[t],u=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=h?parseInt(h):0,g=m!==0;let x=0;const p=new ReadableStream({start(d){b();function b(){u.read().then(({done:A,value:y})=>{if(A)d.close();else{x+=y.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:m});for(let P=0,C=f.length;P<C;P++){const L=f[P];L.onProgress&&L.onProgress(I)}d.enqueue(y),b()}},A=>{d.error(A)})}}});return new Response(p)}else throw new iM(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(f=>new DOMParser().parseFromString(f,o));case"json":return l.json();default:if(o===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(h);return l.arrayBuffer().then(g=>m.decode(g))}}}).then(l=>{Ha.add(t,l);const f=Ti[t];delete Ti[t];for(let u=0,h=f.length;u<h;u++){const m=f[u];m.onLoad&&m.onLoad(l)}}).catch(l=>{const f=Ti[t];if(f===void 0)throw this.manager.itemError(t),l;delete Ti[t];for(let u=0,h=f.length;u<h;u++){const m=f[u];m.onError&&m.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class vm extends na{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=Ha.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=Ga("img");function c(){f(),Ha.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(u){f(),r&&r(u),s.manager.itemError(t),s.manager.itemEnd(t)}function f(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class xm extends na{constructor(t){super(t)}load(t,e,i,r){const s=this,a=new hm,o=new _m(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(t,function(c){let l;try{l=s.parse(c)}catch(f){if(r!==void 0)r(f);else{console.error(f);return}}l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:$n,a.wrapT=l.wrapT!==void 0?l.wrapT:$n,a.magFilter=l.magFilter!==void 0?l.magFilter:vn,a.minFilter=l.minFilter!==void 0?l.minFilter:vn,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(a.colorSpace=l.colorSpace),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=fi),l.mipmapCount===1&&(a.minFilter=vn),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,e&&e(a,l)},i,r),a}}class Fl extends na{constructor(t){super(t)}load(t,e,i,r){const s=new Qe,a=new vm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},i,r),s}}class Ol extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Mf=new Ht,Md=new O,yd=new O;class Mm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ao,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Md.setFromMatrixPosition(t.matrixWorld),e.position.copy(Md),yd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yd),e.updateMatrixWorld(),Mf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mf),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Mf)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sd=new Ht,ga=new O,yf=new O;class rM extends Mm{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new xe(2,1,1,1),new xe(0,1,1,1),new xe(3,1,1,1),new xe(1,1,1,1),new xe(3,0,1,1),new xe(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,r=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ga.setFromMatrixPosition(t.matrixWorld),i.position.copy(ga),yf.copy(i.position),yf.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(yf),i.updateMatrixWorld(),r.makeTranslation(-ga.x,-ga.y,-ga.z),Sd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sd)}}class ym extends Ol{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new rM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class sM extends Mm{constructor(){super(new Dl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sm extends Ol{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new sM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class bm extends Ol{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Em extends pm{constructor(t=10,e=10,i=4473924,r=8947848){i=new Yt(i),r=new Yt(r);const s=e/2,a=t/e,o=t/2,c=[],l=[];for(let h=0,m=0,g=-o;h<=e;h++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const x=h===s?i:r;x.toArray(l,m),m+=3,x.toArray(l,m),m+=3,x.toArray(l,m),m+=3,x.toArray(l,m),m+=3}const f=new Ge;f.setAttribute("position",new Je(c,3)),f.setAttribute("color",new Je(l,3));const u=new Ku({vertexColors:!0,toneMapped:!1});super(f,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:El}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=El);const aM=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Rp,AddEquation:ai,AddOperation:Ep,AdditiveBlending:Sc,AgXToneMapping:Pp,AlphaFormat:Ru,AlwaysCompare:Vp,AlwaysDepth:Ec,AlwaysStencilFunc:Zf,AmbientLight:bm,ArrayCamera:om,BackSide:$e,BasicDepthPacking:Dp,Box3:Js,BoxGeometry:ta,BufferAttribute:ye,BufferGeometry:Ge,ByteType:wu,Cache:Ha,Camera:Wu,CineonToneMapping:Ap,ClampToEdgeWrapping:$n,Color:Yt,ColorManagement:oe,ConstantAlphaFactor:yp,ConstantColorFactor:xp,CubeCamera:Zp,CubeReflectionMapping:Vr,CubeRefractionMapping:Hr,CubeTexture:Xu,CubeUVReflectionMapping:ro,CullFaceBack:Yf,CullFaceFront:op,CullFaceNone:ap,CustomBlending:Xi,CustomToneMapping:Cp,Data3DTexture:qp,DataArrayTexture:zu,DataTexture:hm,DataTextureLoader:xm,DefaultLoadingManager:gm,DepthFormat:kr,DepthStencilFormat:Xr,DepthTexture:qu,DirectionalLight:Sm,DoubleSide:Fe,DstAlphaFactor:pp,DstColorFactor:gp,EqualCompare:kp,EqualDepth:Tc,EquirectangularReflectionMapping:Pc,EquirectangularRefractionMapping:Lc,Euler:kn,EventDispatcher:ns,FileLoader:_m,Float32BufferAttribute:Je,FloatType:ui,FrontSide:pi,Frustum:ao,GLSL3:Jf,GreaterCompare:zp,GreaterDepth:Rc,GreaterEqualCompare:Gp,GreaterEqualDepth:Ac,GridHelper:Em,Group:cn,HalfFloatType:Zs,ImageLoader:vm,ImageUtils:Xp,IntType:Al,InterleavedBuffer:lm,InterleavedBufferAttribute:Va,KeepStencilOp:Lr,Layers:Gu,LessCompare:Op,LessDepth:wc,LessEqualCompare:Fu,LessEqualDepth:Gr,Light:Ol,Line:dm,LineBasicMaterial:Ku,LineSegments:pm,LinearFilter:vn,LinearMipmapLinearFilter:fi,LinearMipmapNearestFilter:ic,LinearSRGBColorSpace:es,LinearToneMapping:wp,LinearTransfer:so,Loader:na,LoadingManager:mm,LuminanceAlphaFormat:Lu,LuminanceFormat:Pu,Material:Sr,MathUtils:Li,Matrix3:Jt,Matrix4:Ht,MaxEquation:hp,Mesh:pe,MeshBasicMaterial:An,MeshDepthMaterial:rm,MeshDistanceMaterial:sm,MeshLambertMaterial:Nl,MinEquation:up,MirroredRepeatWrapping:Ic,MixOperation:bp,MultiplyBlending:Kf,MultiplyOperation:Tl,NearestFilter:xn,NearestMipmapLinearFilter:ya,NearestMipmapNearestFilter:Ip,NeutralToneMapping:Lp,NeverCompare:Fp,NeverDepth:bc,NoBlending:Bi,NoColorSpace:Pi,NoToneMapping:Gi,NormalBlending:Or,NotEqualCompare:Bp,NotEqualDepth:Cc,Object3D:Ve,ObjectSpaceNormalMap:Np,OneFactor:ji,OneMinusConstantAlphaFactor:Sp,OneMinusConstantColorFactor:Mp,OneMinusDstAlphaFactor:mp,OneMinusDstColorFactor:_p,OneMinusSrcAlphaFactor:Vs,OneMinusSrcColorFactor:dp,OrthographicCamera:Dl,PCFShadowMap:bu,PCFSoftShadowMap:cp,PMREMGenerator:Qf,PerspectiveCamera:_n,Plane:or,PlaneGeometry:Yi,PointLight:ym,Quaternion:Mr,RED_GREEN_RGTC2_Format:il,RED_RGTC1_Format:Uu,REVISION:El,RGBADepthPacking:Up,RGBAFormat:Nn,RGBAIntegerFormat:Il,RGBA_ASTC_10x10_Format:Zc,RGBA_ASTC_10x5_Format:Yc,RGBA_ASTC_10x6_Format:$c,RGBA_ASTC_10x8_Format:Kc,RGBA_ASTC_12x10_Format:Jc,RGBA_ASTC_12x12_Format:Qc,RGBA_ASTC_4x4_Format:Bc,RGBA_ASTC_5x4_Format:Gc,RGBA_ASTC_5x5_Format:Vc,RGBA_ASTC_6x5_Format:Hc,RGBA_ASTC_6x6_Format:Wc,RGBA_ASTC_8x5_Format:Xc,RGBA_ASTC_8x6_Format:jc,RGBA_ASTC_8x8_Format:qc,RGBA_BPTC_Format:Pa,RGBA_ETC2_EAC_Format:zc,RGBA_PVRTC_2BPPV1_Format:Fc,RGBA_PVRTC_4BPPV1_Format:Nc,RGBA_S3TC_DXT1_Format:Aa,RGBA_S3TC_DXT3_Format:Ra,RGBA_S3TC_DXT5_Format:Ca,RGBFormat:Cu,RGB_BPTC_SIGNED_Format:tl,RGB_BPTC_UNSIGNED_Format:el,RGB_ETC1_Format:Oc,RGB_ETC2_Format:kc,RGB_PVRTC_2BPPV1_Format:Uc,RGB_PVRTC_4BPPV1_Format:Dc,RGB_S3TC_DXT1_Format:Ta,RGFormat:Du,RGIntegerFormat:Ll,Ray:Bu,RedFormat:Iu,RedIntegerFormat:Pl,ReinhardToneMapping:Tp,RenderTarget:jp,RepeatWrapping:ka,ReverseSubtractEquation:fp,SIGNED_RED_GREEN_RGTC2_Format:rl,SIGNED_RED_RGTC1_Format:nl,SRGBColorSpace:on,SRGBTransfer:_e,Scene:Yu,ShaderChunk:Kt,ShaderLib:jn,ShaderMaterial:qi,ShortType:Tu,Source:ku,Sphere:Qs,Sprite:um,SpriteMaterial:$u,SrcAlphaFactor:_r,SrcAlphaSaturateFactor:vp,SrcColorFactor:ts,StaticDrawUsage:sl,SubtractEquation:lp,SubtractiveBlending:$f,TangentSpaceNormalMap:Nu,Texture:Qe,TextureLoader:Fl,Triangle:wn,UVMapping:Eu,Uint16BufferAttribute:Vu,Uint32BufferAttribute:Hu,UniformsLib:wt,UniformsUtils:Kp,UnsignedByteType:mi,UnsignedInt248Type:Wr,UnsignedInt5999Type:Au,UnsignedIntType:vr,UnsignedShort4444Type:Rl,UnsignedShort5551Type:Cl,UnsignedShortType:Hs,VSMShadowMap:ri,Vector2:ie,Vector3:O,Vector4:xe,WebGLCoordinateSystem:hi,WebGLCubeRenderTarget:Jp,WebGLRenderTarget:xr,WebGLRenderer:cm,WebGLUtils:am,WebGPUCoordinateSystem:za,ZeroFactor:wl,createCanvasElement:Wp},Symbol.toStringTag,{value:"Module"}));class wm extends xm{constructor(t){super(t)}parse(t){function e(R){switch(R.image_type){case h:case x:if(R.colormap_length>256||R.colormap_size!==24||R.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case m:case g:case p:case d:if(R.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case u:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+R.image_type)}if(R.width<=0||R.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(R.pixel_size!==8&&R.pixel_size!==16&&R.pixel_size!==24&&R.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+R.pixel_size)}function i(R,V,U,rt,q){let J,lt;const ht=U.pixel_size>>3,G=U.width*U.height*ht;if(V&&(lt=q.subarray(rt,rt+=U.colormap_length*(U.colormap_size>>3))),R){J=new Uint8Array(G);let Y,$,F,tt=0;const at=new Uint8Array(ht);for(;tt<G;)if(Y=q[rt++],$=(Y&127)+1,Y&128){for(F=0;F<ht;++F)at[F]=q[rt++];for(F=0;F<$;++F)J.set(at,tt+F*ht);tt+=ht*$}else{for($*=ht,F=0;F<$;++F)J[tt+F]=q[rt++];tt+=$}}else J=q.subarray(rt,rt+=V?U.width*U.height:G);return{pixel_data:J,palettes:lt}}function r(R,V,U,rt,q,J,lt,ht,G){const Y=G;let $,F=0,tt,at;const st=_.width;for(at=V;at!==rt;at+=U)for(tt=q;tt!==lt;tt+=J,F++)$=ht[F],R[(tt+st*at)*4+3]=255,R[(tt+st*at)*4+2]=Y[$*3+0],R[(tt+st*at)*4+1]=Y[$*3+1],R[(tt+st*at)*4+0]=Y[$*3+2];return R}function s(R,V,U,rt,q,J,lt,ht){let G,Y=0,$,F;const tt=_.width;for(F=V;F!==rt;F+=U)for($=q;$!==lt;$+=J,Y+=2)G=ht[Y+0]+(ht[Y+1]<<8),R[($+tt*F)*4+0]=(G&31744)>>7,R[($+tt*F)*4+1]=(G&992)>>2,R[($+tt*F)*4+2]=(G&31)<<3,R[($+tt*F)*4+3]=G&32768?0:255;return R}function a(R,V,U,rt,q,J,lt,ht){let G=0,Y,$;const F=_.width;for($=V;$!==rt;$+=U)for(Y=q;Y!==lt;Y+=J,G+=3)R[(Y+F*$)*4+3]=255,R[(Y+F*$)*4+2]=ht[G+0],R[(Y+F*$)*4+1]=ht[G+1],R[(Y+F*$)*4+0]=ht[G+2];return R}function o(R,V,U,rt,q,J,lt,ht){let G=0,Y,$;const F=_.width;for($=V;$!==rt;$+=U)for(Y=q;Y!==lt;Y+=J,G+=4)R[(Y+F*$)*4+2]=ht[G+0],R[(Y+F*$)*4+1]=ht[G+1],R[(Y+F*$)*4+0]=ht[G+2],R[(Y+F*$)*4+3]=ht[G+3];return R}function c(R,V,U,rt,q,J,lt,ht){let G,Y=0,$,F;const tt=_.width;for(F=V;F!==rt;F+=U)for($=q;$!==lt;$+=J,Y++)G=ht[Y],R[($+tt*F)*4+0]=G,R[($+tt*F)*4+1]=G,R[($+tt*F)*4+2]=G,R[($+tt*F)*4+3]=255;return R}function l(R,V,U,rt,q,J,lt,ht){let G=0,Y,$;const F=_.width;for($=V;$!==rt;$+=U)for(Y=q;Y!==lt;Y+=J,G+=2)R[(Y+F*$)*4+0]=ht[G+0],R[(Y+F*$)*4+1]=ht[G+0],R[(Y+F*$)*4+2]=ht[G+0],R[(Y+F*$)*4+3]=ht[G+1];return R}function f(R,V,U,rt,q){let J,lt,ht,G,Y,$;switch((_.flags&b)>>A){default:case P:J=0,ht=1,Y=V,lt=0,G=1,$=U;break;case y:J=0,ht=1,Y=V,lt=U-1,G=-1,$=-1;break;case C:J=V-1,ht=-1,Y=-1,lt=0,G=1,$=U;break;case I:J=V-1,ht=-1,Y=-1,lt=U-1,G=-1,$=-1;break}if(N)switch(_.pixel_size){case 8:c(R,lt,G,$,J,ht,Y,rt);break;case 16:l(R,lt,G,$,J,ht,Y,rt);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(_.pixel_size){case 8:r(R,lt,G,$,J,ht,Y,rt,q);break;case 16:s(R,lt,G,$,J,ht,Y,rt);break;case 24:a(R,lt,G,$,J,ht,Y,rt);break;case 32:o(R,lt,G,$,J,ht,Y,rt);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return R}const u=0,h=1,m=2,g=3,x=9,p=10,d=11,b=48,A=4,y=0,I=1,P=2,C=3;if(t.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let L=0;const v=new Uint8Array(t),_={id_length:v[L++],colormap_type:v[L++],image_type:v[L++],colormap_index:v[L++]|v[L++]<<8,colormap_length:v[L++]|v[L++]<<8,colormap_size:v[L++],origin:[v[L++]|v[L++]<<8,v[L++]|v[L++]<<8],width:v[L++]|v[L++]<<8,height:v[L++]|v[L++]<<8,pixel_size:v[L++],flags:v[L++]};if(e(_),_.id_length+L>t.length)throw new Error("THREE.TGALoader: No data.");L+=_.id_length;let w=!1,k=!1,N=!1;switch(_.image_type){case x:w=!0,k=!0;break;case h:k=!0;break;case p:w=!0;break;case m:break;case d:w=!0,N=!0;break;case g:N=!0;break}const B=new Uint8Array(_.width*_.height*4),j=i(w,k,_,L,v);return f(B,_.width,_.height,j.pixel_data,j.palettes),{data:B,width:_.width,height:_.height,flipY:!0,generateMipmaps:!0,minFilter:fi}}}const Tm="./assets/",is=async n=>new TextDecoder("latin1").decode(await(await fetch(Tm+n)).arrayBuffer()),oo=async n=>(await fetch(Tm+n)).arrayBuffer();function Zu(n){const t=new DataView(n),e=t.getUint32(29,!0),i=t.getUint32(33,!0);let r=37;const s=new Float32Array(e*3);for(let c=0;c<e*3;c++,r+=4)s[c]=t.getFloat32(r,!0);const a=new Int32Array(i*3);for(let c=0;c<i*3;c++,r+=4)a[c]=t.getInt32(r,!0);const o=new Float32Array(i*6);for(let c=0;c<i*6;c++,r+=4)o[c]=t.getFloat32(r,!0);return{V:e,T:i,pos:s,idx:a,uv:o,smooth:t.getUint8(3)!==0,offset:[t.getFloat32(4,!0),t.getFloat32(8,!0),t.getFloat32(12,!0)]}}function Am(n){const t={};for(const e of n.split(/\r?\n/)){const i=e.match(/^\s*([^=\[\];]+?)\s*=\s*(.*?)\s*$/);i&&(t[i[1].toLowerCase()]=i[2])}return t}function oM(n){const t=n.indexOf("map="),e=Am(n.slice(0,t)),i=n.slice(t+4).replace(/^\r?\n/,"").split(/\r?\n/),r=i[0].length,s=i.slice(0,r).findIndex(o=>o.length===0),a=i.slice(0,s>=0?s:r);for(;a.length<r;)a.push(".".repeat(r));for(let o=0;o<r;o++)a[o].length<r&&(a[o]=a[o].padEnd(r,"."));return{head:e,N:r,grid:a}}async function Ju(n){const t=await oo(n),e=new DataView(t),i=e.getUint32(0,!0),r=e.getUint32(4,!0);let s=8;const a=new Float32Array(r*3);for(let g=0;g<r*3;g++,s+=4)a[g]=e.getFloat32(s,!0);const o=[];for(let g=0;g<i;g++){const x=[];for(let p=0;p<3;p++,s+=20){const d=e.getFloat32(s,!0);d!==0&&x.push({w:d,b:e.getInt32(s+4,!0),x:e.getFloat32(s+8,!0),y:e.getFloat32(s+12,!0),z:e.getFloat32(s+16,!0)})}o.push(x)}const c=[],l=[];for(let g=0;g<r;g++,s+=56){const x=e.getInt32(s,!0),p=[];for(let b=0;b<x;b++)p.push(e.getInt32(s+4+b*4,!0));c.push(p);let d=s+24;for(;d<s+56&&e.getUint8(d);)d++;l.push(String.fromCharCode(...new Uint8Array(t,s+24,d-s-24)))}const f=e.getUint32(s,!0);s+=4;const u=new Int32Array(f*3);for(let g=0;g<f*3;g++,s+=4)u[g]=e.getInt32(s,!0);const h=new Float32Array(f*6);for(let g=0;g<f*6;g++,s+=4)h[g]=e.getFloat32(s,!0);const m=new Int32Array(r).fill(-1);return c.forEach((g,x)=>g.forEach(p=>m[p]=x)),{NV:i,NB:r,off:a,inf:o,children:c,parent:m,names:l,NT:f,idx:u,uv:h}}async function Qu(n){const t=await oo(n),e=new DataView(t),i=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0);let a=12;const o=new Float32Array(s*3);for(let l=0;l<s*3;l++,a+=4)o[l]=e.getFloat32(a,!0);const c=new Float32Array(i*s*3);for(let l=0;l<i*s*3;l++,a+=4)c[l]=e.getFloat32(a,!0);return{B:i,ms:r,F:s,root:o,ang:c}}const Ho={order:"ZYX",scale:1},bd=new kn,Wo=new Ht;new Ht;function Ed(n,t,e){let i=n.x*t.x+n.y*t.y+n.z*t.z+n.w*t.w,r=t.x,s=t.y,a=t.z,o=t.w;i>=0||(i=-i,r=-r,s=-s,a=-a,o=-o);let c,l;if(1-i<=.001)c=1-e,l=e;else{const f=Math.acos(i),u=Math.sin(f);c=Math.sin((1-e)*f)/u,l=Math.sin(e*f)/u}return n.set(l*r+c*n.x,l*s+c*n.y,l*a+c*n.z,l*o+c*n.w),n}const Sf=n=>n%3===0?n:n%3===1?n+1:n-1;class th{constructor(t,e){this.skl=t;const i=new Ge;i.setAttribute("position",new ye(new Float32Array(t.NT*9),3));const r=new Float32Array(t.NT*6);for(let a=0;a<t.NT*3;a++){const o=Sf(a);r[a*2]=t.uv[o*2],r[a*2+1]=t.uv[o*2+1]}i.setAttribute("uv",new ye(r,2));const s=new Fl().load("./assets/textures/"+e);s.colorSpace=on,this.mesh=new pe(i,new Nl({map:s,side:Fe})),this.mesh.frustumCulled=!1,this.world=Array.from({length:t.NB},()=>new Ht),this.vpos=new Float32Array(t.NV*3),this.clip=null,this.time=0,this.loop=!0}play(t,e=!0,i=200){if(!this.clip){this.clip=t,this.time=0,this.loop=e;return}this.blend={to:t,loop:e,t:0,dur:i}}update(t){let e=this.clip;if(!e)return;const i=t*1e3,r=this.blend;r?(r.t<r.dur&&(r.t+=i),r.t>=r.dur?(this.time=r.t-r.dur,this.clip=e=r.to,this.loop=r.loop,this.blend=null):this.time+=i):this.time+=i;const s=e.F*e.ms;this.loop?(this.time>s&&(this.time-=s),this.time>s&&(this.time%=s)):this.time=Math.min(this.time,s-.001),this.pose(e,this.time/e.ms)}localQ(t,e,i,r){return bd.set(t.ang[(e*t.F+i)*3]*Ho.scale,t.ang[(e*t.F+i)*3+1]*Ho.scale,t.ang[(e*t.F+i)*3+2]*Ho.scale,Ho.order),r.setFromEuler(bd)}pose(t,e){const i=this.blend,r=this.skl,s=Math.floor(e)%t.F,a=(s+1)%t.F,o=e-Math.floor(e),c=new Mr,l=new Mr,f=(d,b)=>{this.localQ(t,d,s,c),this.localQ(t,d,a,l),Ed(c,l,o),i&&(this.localQ(i.to,d,0,l),Ed(c,l,i.t/i.dur));const A=this.world[d];Wo.makeRotationFromQuaternion(c);let y=r.off[d*3],I=r.off[d*3+1],P=r.off[d*3+2],C=0,L=0,v=0;if(d===0&&(C=t.root[s*3]*(1-o)+t.root[a*3]*o,L=t.root[s*3+1]*(1-o)+t.root[a*3+1]*o,v=t.root[s*3+2]*(1-o)+t.root[a*3+2]*o,y+=C,I+=L,P+=v),d===0&&i){const _=i.t/i.dur;y+=(i.to.root[0]-C)*_,I+=(i.to.root[1]-L)*_,P+=(i.to.root[2]-v)*_}Wo.setPosition(y,I,P),this.ovr&&this.ovr[d]&&Wo.multiply(this.ovr[d]),A.copy(b).multiply(Wo);for(const _ of r.children[d])f(_,A)};f(0,new Ht);const u=new O;for(let d=0;d<r.NV;d++){let b=0,A=0,y=0;for(const I of r.inf[d])u.set(I.x,I.y,I.z).applyMatrix4(this.world[I.b]),b+=u.x*I.w,A+=u.y*I.w,y+=u.z*I.w;this.vpos[d*3]=b,this.vpos[d*3+1]=y,this.vpos[d*3+2]=A}const h=this.mesh.geometry.attributes.position.array;for(let d=0;d<r.NT*3;d++){const b=r.idx[Sf(d)]*3;h[d*3]=this.vpos[b],h[d*3+1]=this.vpos[b+1],h[d*3+2]=this.vpos[b+2]}this.mesh.geometry.attributes.position.needsUpdate=!0;const m=r.NV,g=this._nv||(this._nv=new Float32Array(m*3));g.fill(0);for(let d=0;d<r.NT;d++){const b=r.idx[d*3]*3,A=r.idx[d*3+2]*3,y=r.idx[d*3+1]*3,I=this.vpos,P=I[A]-I[b],C=I[A+1]-I[b+1],L=I[A+2]-I[b+2],v=I[y]-I[b],_=I[y+1]-I[b+1],w=I[y+2]-I[b+2],k=C*w-L*_,N=L*v-P*w,B=P*_-C*v;for(const j of[b,A,y])g[j]+=k,g[j+1]+=N,g[j+2]+=B}let x=this.mesh.geometry.attributes.normal;x||(x=new ye(new Float32Array(r.NT*9),3),this.mesh.geometry.setAttribute("normal",x));const p=x.array;for(let d=0;d<r.NT*3;d++){const b=r.idx[Sf(d)]*3,A=g[b],y=g[b+1],I=g[b+2],P=Math.hypot(A,y,I)||1;p[d*3]=A/P,p[d*3+1]=y/P,p[d*3+2]=I/P}x.needsUpdate=!0}}const gi=Math.PI/180,wd=Uint8Array.from("101cac1f34bc5ae91b13e859389daa9b82d02d3de48473f9d733667b981a968f94b304df45e05d05023f8ea958550dbef418e67ede422f9025d54993f1f056b70a9fef5211cbfa37d34a974d63ecb6e78c7092e174d4122bfb7a3264ca3c6b89ddc0ab9c2ceeaecda8eb7cc217462a5fb09954bdf5c81e14fe88f7db0e1daf2920ffe24187164348f3fc5000a6b5a021b9a1cc2e4c51f8d180b8e55bed4b5395ba8dc7fd094475406a032706c686f2d6dae3153124d95c61b48aa4309a77266d787f6fa50757015e0bc491723ac360796e760c6971a765add235bbc122a308f6399edc83bf3eea8b36a26cb262c54e8581b17dc9ce2823680f473b4fcf6719d8".match(/../g),n=>parseInt(n,16));let bf=0,Ef=0;const Td=()=>(bf=bf+1&255,Ef=Ef+3&255,wd[bf]<<8|wd[Ef]),cM=()=>{const n=new Array(16).fill(0);return n[0]=n[5]=n[10]=n[15]=1,n},ti=(n,t)=>{const e=Math.cos(t*gi),i=Math.sin(t*gi);for(let r=0;r<4;r++){const s=n[4+r],a=n[8+r];n[4+r]=e*s+i*a,n[8+r]=-i*s+e*a}},Xo=(n,t)=>{const e=Math.cos(t*gi),i=Math.sin(t*gi);for(let r=0;r<4;r++){const s=n[r],a=n[4+r];n[r]=e*s+i*a,n[4+r]=-i*s+e*a}},lM=(n,t)=>{const e=Math.cos(t*gi),i=Math.sin(t*gi);for(let r=0;r<4;r++){const s=n[r],a=n[8+r];n[r]=e*s-i*a,n[8+r]=i*s+e*a}},sc=(n,t,e,i)=>{for(let r=0;r<4;r++)n[12+r]+=t*n[r]+e*n[4+r]+i*n[8+r]},jo=n=>[n[0],n[4],n[8]],ei=n=>[n[1],n[5],n[9]],ni=n=>[n[2],n[6],n[10]],Ce=(n,t)=>n.map(e=>e*t),Wn=(...n)=>n.reduce((t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]]),In=(n,t)=>sc(n,t[0],t[1],t[2]);function fM(n,t,e=[0,0,0]){const i=cM();if(n===1)ti(i,-135),In(i,Wn(Ce(ni(i),40),Ce(ei(i),4.5))),sc(i,31,42,0);else if(n>=2&&n<6)ti(i,-125),In(i,Wn(Ce(ei(i),6.5),Ce(ni(i),60))),sc(i,-31,-35,0);else if(n>=6&&n<15&&n!==15)ti(i,-125),In(i,Wn(Ce(ei(i),6.5),Ce(ni(i),54))),sc(i,-31,-35,0);else if(n===15)ti(i,-135),In(i,Wn(Ce(ei(i),6.5),Ce(ni(i),55))),In(i,[15-e[0],19-e[1],0-e[2]]);else{const r=eu(t);if(r===0)ti(i,-130),Xo(i,Math.cos(t/2e3)*10),In(i,Wn(Ce(ei(i),4.5),Ce(ni(i),60)));else if(r===1){ti(i,-136),Xo(i,-30);const s=Math.sin(t/2500)*.2+1;In(i,Wn(Ce(ei(i),5),Ce(ni(i),60*s)))}else if(r===2){ti(i,-130),lM(i,Math.sin(t/2e4)*-10);const s=Math.cos(t/2500);In(i,Wn(Ce(ei(i),3),Ce(ni(i),60*.8),Ce(jo(i),10*s)))}else if(r===3){ti(i,-130);const s=Math.sin(t/1300)*.1+1;In(i,Wn(Ce(ei(i),3),Ce(jo(i),5),Ce(ni(i),60*.8*s)))}else r===4?(ti(i,-127),Xo(i,-40),In(i,Wn(Ce(ei(i),0),Ce(ni(i),60*.6)))):(ti(i,-130),Xo(i,35),In(i,Wn(Ce(ei(i),1),Ce(jo(i),8),Ce(ni(i),60*.8))));In(i,Wn(Ce(jo(i),-5),[0,9,0]))}return i}const eu=n=>n<5e3?0:n<1e4?1:n<15e3?2:n<18e3?3:n<2e4?4:5,uM=new Ht().makeScale(1,1,-1),hM=new Ht().set(1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1);function dM(n,t){const e=new Ht().set(t[0],t[4],t[8],t[12],t[1],t[5],t[9],t[13],t[2],t[6],t[10],t[14],t[3],t[7],t[11],t[15]),i=uM.clone().multiply(e).multiply(hM);n.matrixAutoUpdate=!1,n.matrixWorldInverse.copy(i),n.matrixWorld.copy(i).invert(),n.matrixWorldNeedsUpdate=!1,n.matrixWorld.decompose(n.position,n.quaternion,n.scale)}const nu=[-25,30,0],Rm=[{skl:"vilka",tex:"vilka_screen.jpg",s:.8,an:["vilka_pause","vilka_perekrest","vilka_ataka"],zr:8,type:5},{skl:"sniper",tex:"snayper_screen.jpg",s:.8,an:["sniper_pause","sniper_perekrest","sniper_perekrest"],zr:14,type:6},{skl:"dlinnyi",tex:"dlinnyi_screen.jpg",s:1,an:["dlinnyi_pause","dlinnyi_perekrest","dlinnyi_perekrest"],zr:17,type:7},{skl:"bugai",tex:"bugai_screen.jpg",s:1,an:["bugai_pause","bugai_perekrest","bugai_attack"],zr:17,type:7}],wf=[["bomb2.cgo","ñ"],["bomb2.cgo","ð"],["bomb2.cgo","ï"],["key.cgo","k"],["batareyka.cgo","á"],["bonus_life.cgo","ÿ"],["bonus_ananas.cgo","à"],["bonus_nevidimka.cgo","í"],["bonus_clock.cgo","÷"]];let Yn=null,fe=null;async function pM(n){Yn=n;const t=l=>Qu("animations/"+l+".anm"),e=new cn;e.visible=!1,n.scene.add(e);const i=async(l,f)=>{const u=new th(await Ju("characters/"+l+".skl"),f),h=new cn;return h.add(u.mesh),e.add(h),{ch:u,o:h}},r=await i("pups","glavnyi_screen.jpg");r.an={glav:await t("glavnyi_sintezator"),hist:await t("history")},r.ch.play(r.an.glav),r.ch.update(0);const s=[];for(const l of Rm){const f=await i(l.skl,l.tex);f.an=[];for(const u of l.an)f.an.push(await t(u));f.ch.play(f.an[0]),f.ch.update(0),f.o.scale.setScalar(l.s),f.o.rotation.y=-80*gi,f.o.position.set(22,0,55),s.push(f)}const a=[];for(let l=0;l<wf.length;l++){const f=await n.loadCgo(wf[l][0]),u=new cn;for(const g of f)u.add(new pe(g.geometry,g.material.clone()));u.position.set(22,0,55),e.add(u);const h=Td()/32768*1e3-1e3,m=Td()%360;a.push({o:u,c:wf[l][1],t:0,ob:{pa:m,pt:h}})}const o=await n.loadCgo("sintezator.cgo"),c=new cn;for(const l of o)c.add(new pe(l.geometry,l.material.clone()));c.position.set(-2.5,0,3),c.rotation.y=-210*gi,e.add(c),fe={root:e,main:r,mon:s,bon:a,sint:c,cyc:0,tmr:0,idx:0,fade:0,rem:0,mode:-1}}const Ad=(n,t)=>n.traverse(e=>{e.isMesh&&e.material&&(e.material.transparent=t<1||e.material.alphaTest>0,e.material.opacity=t)});function mM(n,t){const{main:e,mon:i,bon:r}=fe,s=Rm;if(t===15&&n===0&&(e.ch.play(e.an.glav),e.ch.clip=e.an.glav,e.ch.time=0,e.ch.blend=null,e.o.position.set(0,0,0),e.o.rotation.y=-120*gi),n===15)e.ch.clip=e.an.hist,e.ch.time=0,e.ch.blend=null,e.o.position.set(nu[0],0,nu[1]),e.o.rotation.y=-90*gi;else if(n>=2&&n<=5){const a=n-2;fe.idx=a,fe.fade=800,fe.tmr=i[a].an[fe.cyc].F*i[a].an[fe.cyc].ms;for(let o=0;o<50;o++){const c=Yn.prand0(s[a].zr),l=Yn.prand(3),f=Yn.prand(3);Yn.spawnPart(s[a].type,22+f,c,55+l)}}else if(n>=6&&n<15){fe.fade=800,fe.bidx=n-6;for(let a=0;a<20;a++)Yn.spawnPart(11,22,0,55)}}let Es=0,qo=-1;const gM={mode:0,frame(n,t,e,i){let r=e==="credits"?1:e==="history"?15:e==="monsters"?2+i:e==="bonuses"?6+i:0;if(fe&&r!==qo&&mM(r,qo<0?0:qo),qo=r,this.mode=r,Es+=t,Es>22e3&&(Es=0),dM(n,fM(r,Es,nu)),!fe)return;const s=t/1e3,{main:a,mon:o,bon:c,sint:l}=fe;if(Yn.hero.obj&&(Yn.hero.obj.visible=!1),fe.root.visible=!0,a.o.visible=r===0||r===15,l.visible=r===0,o.forEach((u,h)=>{u.o.visible=r===2+h}),c.forEach((u,h)=>{const m=r===6+h;u.o.visible=m&&!u.g,u.g&&(u.g.visible=m)}),(r===0||r===15)&&a.ch.update(s),r>=2&&r<=5){const u=o[fe.idx];if(fe.tmr-=t,fe.tmr<0){fe.cyc=(fe.cyc+1)%3;const h=u.an[fe.cyc];fe.tmr=h.F*h.ms,u.ch.play(h,!0,50)}u.ch.update(s)}if(r>=6&&r<15&&Yn.pickupAnim(c[fe.bidx],s),r===0&&(eu(Es)===3||eu(Es)===4)){const u=fe.rem+Math.round(t),h=u>>3;fe.rem=u&7;for(let m=0;m<h;m++)Yn.spawnPart(17,0,32,0)}else fe.rem=fe.rem+Math.round(t)&7;let f=1;if(fe.fade>0){fe.fade-=t;const u=1-Math.max(0,fe.fade)/800;f=u*u*u,fe.fade<0&&(fe.fade=0)}r>=2&&r<=5?Ad(o[fe.idx].o,f):r>=6&&r<15&&Ad(c[fe.bidx].o,f),Yn.stepParticles(s)}},Cm={0:0,1:6,2:46,3:76,4:92,5:112,6:135,7:160,8:183,9:227,10:249};let Le=null,Wa=null,ac=null,Ns=null,Pm=!1;const iu={},Rd={},oc=[],Lm=(n,t)=>{try{const e=localStorage.getItem(n);return e===null?t:+e}catch{return t}};let cl=Lm("dino_musvol",50),ll=Lm("dino_samvol",50),Xa=0,Fs=0,fl=!1,Ps=null,ul=0;const _M=()=>cl,Im=()=>ll;function Dm(n){cl=Math.max(0,Math.min(100,n));try{localStorage.setItem("dino_musvol",cl)}catch{}Xs()}function Um(n){ll=Math.max(0,Math.min(100,n));try{localStorage.setItem("dino_samvol",ll)}catch{}Xs()}function Xs(){Le&&(Wa.gain.value=ll/100,ac.gain.value=cl/100*(hl/100))}let hl=100;async function Nm(n){iu[n]||Rd[n]||!Le||(Rd[n]=fetch(`./assets/sounds/${n}.ogg`).then(t=>t.arrayBuffer()).then(t=>Le.decodeAudioData(t)).then(t=>{iu[n]=t}).catch(()=>{}))}async function vM(){if(Le){Le.state==="suspended"&&Le.resume();return}const n=window.AudioContext||window.webkitAudioContext;if(n){Le=new n,Wa=Le.createGain(),Wa.connect(Le.destination),ac=Le.createGain(),ac.connect(Le.destination),Xs(),["menu","menu2","chpok1","logo","ananas","apple1","batareyka","bomb","key1","invisible","clock","push","teleport","podskazka","herohaha","stephero1","stephero2","stephero3","herodamage1","herodamage2","herodamage3","herodamage4","explode1","explode2","tickyellow","tickblue","tickred","bulletend","snipershot","objectspark","laservkl","vorota1","vorota2","vorota3","vilkaataka","dlinnyataka","bugaystand","bugaymah","bugaykick","vilkapunish","sniperpunish","dlinnypunish","bugaypunish","chihanie"].forEach(Nm);try{await Le.audioWorklet.addModule("./vendor/music.worklet.js"),Ns=new AudioWorkletNode(Le,"dino-mo3",{numberOfInputs:0,outputChannelCount:[2]}),Ns.connect(ac),Ns.port.onmessage=e=>{e.data.cmd==="loaded"&&(Pm=!0)};const t=await(await fetch("./assets/music/music.mo3")).arrayBuffer();Ns.port.postMessage({cmd:"load",buf:t},[t])}catch(t){console.warn("music init failed",t)}}}for(const n of["pointerdown","keydown","touchstart"])addEventListener(n,vM,{passive:!0});document.addEventListener("visibilitychange",()=>{Le&&(document.hidden?Le.suspend():Le.resume())});function ja(n){Xa=Cm[n]??Xa,Fs=1200,fl=!0}function qa(n){Xa=Cm[n]??Xa,Fs=0,hl=100,Xs(),fl=!0}const Fm=n=>!n||n.x===0&&n.y===0&&n.z===0;function Om(n){if(Fm(n)||!Ps)return{vol:100,pan:0};const t=Math.hypot(Ps.x-n.x,Ps.y-n.y,Ps.z-n.z);let e=100-Math.trunc(t);e<0&&(e=e<-100?0:1);const i=Math.max(-100,Math.min(100,Math.trunc((n.x-Ps.x)*3)));return{vol:e,pan:i/100}}function jt(n,t){if(!Le||Le.state!=="running")return;const e=iu[n];if(!e){Nm(n);return}const i=Le.createBufferSource();i.buffer=e;const r=Le.createGain(),s=Le.createStereoPanner?Le.createStereoPanner():null;i.connect(r),s?(r.connect(s),s.connect(Wa)):r.connect(Wa);const a={src:i,g:r,pn:s,pos:Fm(t)?null:{x:t.x,y:t.y,z:t.z}},o=Om(a.pos);r.gain.value=o.vol/100,s&&(s.pan.value=o.pan),i.onended=()=>{const c=oc.indexOf(a);c>=0&&oc.splice(c,1)},oc.push(a),i.start()}let Tf=0;function kl(n){ul<=0&&(jt("herodamage"+(Tf+1)),Tf=Tf+1+(n?n():0)&3,ul=400)}function xM(n,t){Ps=t,ul>0&&(ul-=n);for(const e of oc)if(e.pos){const i=Om(e.pos);e.g.gain.value=i.vol/100,e.pn&&(e.pn.pan.value=i.pan)}if(!(!Le||!Ns||!Pm)){if(Fs>0&&(Fs-=n,Fs>0)){hl=Math.trunc(Fs/12),Xs();return}fl&&(hl=100,Xs(),Ns.port.postMessage({cmd:"order",o:Xa}),fl=!1)}}const ru=10,MM=[44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,13,12,20,30,22,44,30,9,16,16,24,32,10,22,10,22,24,16,24,22,25,22,22,21,25,24,12,10,30,29,30,20,32,24,24,24,25,21,20,25,25,12,20,26,18,34,26,24,24,25,26,22,20,25,24,36,24,24,24,21,26,21,21,33,9,21,21,18,22,20,13,20,21,10,12,21,9,32,20,20,21,21,13,17,13,21,20,30,20,20,18,25,12,24,26,44,44,44,24,44,28,36,22,20,44,29,44,10,44,44,44,44,44,25,32,13,16,32,12,9,44,18,44,9,44,44,44,44,28,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,9,44,44,44,44,44,44,44,44,24,22,24,16,25,21,40,22,26,26,25,24,34,26,24,26,24,24,20,22,34,24,28,24,38,40,30,36,24,22,38,28,21,18,20,16,18,20,32,18,24,24,21,20,30,21,20,22,21,18,18,20,32,20,22,20,32,33,22,29,18,18,32,21],yM=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,0,59,0,0,60,61,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,63,0,0,0,0,64,0,65,66,0,0,0,0,0,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131],SM=1.65/(512/ru),eh=n=>MM[n&255]*SM;function Ya(n,t){let e=0;for(const i of n)e+=t*eh(i.charCodeAt(0));return e}function bM(n,t,e,i,r=!1){const s=[],a=n.split(/\r?\n/);let o=e;for(const c of a){let l=r?i/2-Ya(c,i)/2:0;for(const f of c){const u=f.charCodeAt(0)&255,h=yM[u],m=t+l,g=h%ru,x=h/ru|0,p=g*.1-.01,d=x*.1;s.push({x0:m-i,y0:o+i*.8,x1:m+i,y1:o-i*.8,u0:p,v0:d,u1:p+.09,v1:d+.1}),l+=i*eh(u)}o-=1.4*i}return s}function dl(n,t,e,i,r,s,a=!1){for(const o of bM(e,i,r,s,a))n.drawImage(t,o.u0*512,o.v0*512,(o.u1-o.u0)*512,(o.v1-o.v0)*512,o.x0+400,300-o.y0,o.x1-o.x0,o.y0-o.y1)}function nh(n,t,e){const i=[];for(const r of n.split(/\r?\n/)){let s="",a=0;const o=e*eh(32);for(const c of r.split(" ")){const l=Ya(c,e);s&&a+o+l>t?(i.push(s),s=c,a=l):(s=s?s+" "+c:c,a=s?Ya(s,e):0)}i.push(s)}return i}const $i={},Yo=(n,t)=>new Promise(e=>{const i=new Image;i.onload=()=>{$i[n]=i,e()},i.onerror=e,i.src=t}),km=Promise.all([Yo("font","./assets/textures/font.png"),Yo("tex","./assets/textures/menutex.png"),Yo("glow","./assets/textures/podsvet.jpg"),Yo("logo","./assets/textures/menulogo.png")]),Oe=document.createElement("canvas");Oe.id="menucv";Oe.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;display:none;z-index:20;touch-action:none";document.body.appendChild(Oe);const de=Oe.getContext("2d");function su(){const n=devicePixelRatio||1,t=innerWidth*n|0,e=innerHeight*n|0;(Oe.width!==t||Oe.height!==e)&&(Oe.width=t,Oe.height=e),de.setTransform(Oe.width/800,0,0,Oe.height/600,0,0),de.globalAlpha=1,de.globalCompositeOperation="source-over",de.clearRect(0,0,800,600)}const zm=(n,t)=>({x:n*800/innerWidth-400,y:300-t*600/innerHeight}),Rn=Ya,jr=n=>n+400,qr=n=>300-n,Bm={0:[0,0,1,1],1:[1,0,1,1],2:[0,1,1,1],3:[1,1,1,1],4:[0,2,1,1],5:[1,2,1,1],6:[2,4,2,1],7:[0,3,1,2],8:[1,3,1,1.5],9:[2,0,1,4],10:[3,0,1,4],11:[0,7,1,1],12:[1,7,1,1],13:[0,5,1,1],14:[0,6,1,1],15:[2,5,1,1],16:[3,5,1,1],17:[1,6,1,1],18:[1,5,1,1],19:[3,7,1,1],20:[2,7,1,1]};function Gm(n){const[t,e,i,r]=Bm[n],s=t/4+.005,a=(t+i)/4-.005,o=e/8+.005,c=(e+r)/8-.005;return[s*256,o*512,(a-s)*256,(c-o)*512]}function be(n,t,e,i=1){const[,,r,s]=Bm[n],a=i*r*21,o=i*s*21,c=Gm(n);de.drawImage($i.tex,c[0],c[1],c[2],c[3],jr(t)-a,qr(e)-o,a*2,o*2)}function $o(n,t,e,i,r,s=1){const a=Gm(n),o=s*42*.9;n===5?de.drawImage($i.tex,a[0],a[1],a[2],a[3],jr(t)-o/2,qr(Math.max(e,r)),o,Math.abs(r-e)):de.drawImage($i.tex,a[0],a[1],a[2],a[3],jr(Math.min(t,i)),qr(e)-o/2,Math.abs(i-t),o)}const ih=(n,t,e,i,r,s,a,o)=>{de.fillStyle=`rgba(${r},${s},${a},${o/255})`,de.fillRect(jr(n),qr(t),e,i)};function rh(n){const{x:t,top:e,w:i,h:r}=n;ih(t,e,i,r,30,0,0,180),$o(4,t,e,t+i,e),$o(4,t,e-r,t+i,e-r),$o(5,t,e,t,e-r),$o(5,t+i,e,t+i,e-r),be(0,t,e),be(1,t+i,e),be(2,t,e-r),be(3,t+i,e-r)}function Mn(n,t){rh(n);const{x:e,top:i,w:r,h:s}=n;t===0?(be(9,e+r*.2,i+65.1),be(10,e+r*.8,i+65.1),be(6,e+r*.8,i-s),be(7,e,i-70),be(8,e+r-8,i-s+50)):t===1?be(6,e+r*.5,i-s):(be(8,e+r-8,i-s+50),be(8,e-8,i-70),be(6,e+r*.5,i-s),be(9,e+r*.2,i+65.1),be(10,e+r*.8,i+65.1))}function co(n){rh(n),be(7,n.x+n.w*.2,n.top+21),be(7,n.x+n.w*.8,n.top+21)}function ce(n,t,e,i,r=!1,s=1){de.globalAlpha=s,dl(de,$i.font,n,t,e,i,r),de.globalAlpha=1}const pl=document.createElement("canvas");pl.width=64;pl.height=32;function _i(n,t,e,i,r=1,s=[255,200,100]){ce(n,t,e,i,!1,r);const a=t+i*.2-i*3,o=t+i*.2+Ya(n,i)+i,c=pl.getContext("2d");c.globalCompositeOperation="source-over",c.clearRect(0,0,64,32),c.drawImage($i.glow,0,0,64,32),c.globalCompositeOperation="multiply",c.fillStyle=`rgb(${s[0]},${s[1]},${s[2]})`,c.fillRect(0,0,64,32),de.globalCompositeOperation="lighter",de.globalAlpha=r,de.drawImage(pl,jr(a),qr(e+5+i),o-a,2*i),de.globalCompositeOperation="source-over",de.globalAlpha=1}function Vm(n,t,e,i,r){de.globalCompositeOperation="lighter",de.fillStyle=`rgba(255,200,100,${r})`,de.fillRect(jr(n),qr(t),e-n,t-i),de.globalCompositeOperation="source-over"}function js(n,t,e,i,r,s=1){n&&(de.globalAlpha=s,de.drawImage(n,jr(t)-i,qr(e)-r,i*2,r*2),de.globalAlpha=1)}const Hm=()=>$i.logo,Af={};function $a(n){const t=Af[n];if(t)return t.ok?t.i:null;const e=new Image;return Af[n]={i:e,ok:!1},e.onload=()=>{Af[n].ok=!0},e.src=n,null}const ii=document.createElement("canvas"),Dn=ii.getContext("2d"),Ls=document.createElement("canvas"),_a=Ls.getContext("2d");function oi(n,t,e,i,r,s,a){if(s<=0)return;(ii.width!==Oe.width||ii.height!==Oe.height)&&(ii.width=Ls.width=Oe.width,ii.height=Ls.height=Oe.height);const o=[Oe.width/800,0,0,Oe.height/600,0,0];Dn.setTransform(1,0,0,1,0,0),Dn.globalCompositeOperation="source-over",Dn.clearRect(0,0,ii.width,ii.height),Dn.setTransform(...o),dl(Dn,$i.font,n,t,e,i,r),_a.setTransform(1,0,0,1,0,0),_a.globalCompositeOperation="source-over",_a.clearRect(0,0,Ls.width,Ls.height),_a.setTransform(...o),dl(_a,$i.font,n,t,e,i,r),Dn.setTransform(1,0,0,1,0,0),Dn.globalCompositeOperation="multiply",Dn.fillStyle=`rgb(${a[0]},${a[1]},${a[2]})`,Dn.fillRect(0,0,ii.width,ii.height),Dn.globalCompositeOperation="destination-in",Dn.drawImage(Ls,0,0),Dn.globalCompositeOperation="source-over";const c=de.getTransform();de.setTransform(1,0,0,1,0,0),de.globalAlpha=s,de.drawImage(ii,0,0),de.globalAlpha=1,de.setTransform(c)}const EM=Object.freeze(Object.defineProperty({__proto__:null,begin:su,cv:Oe,fill:ih,getImg:$a,glow:Vm,image:js,logo:Hm,panel:rh,panelBtn:co,panelOrn:Mn,ready:km,sprite:be,text:ce,textCol:oi,textHi:_i,toUI:zm,tw:Rn},Symbol.toStringTag,{value:"Module"})),Da=["p02_l04","p02_l05","p02_l10","p03_l01","p03_l02","p03_l08","p03_l11","p04_l03"],Wm=n=>"?level="+Da[n]+"&demo=1",zs={};is("texts/menutext.txt").then(n=>{const t=/\[([a-z0-9_]+)\/\][ \t]*\r?\n([\s\S]*?)\[\/\1\]/g;let e;for(;e=t.exec(n);)zs[e[1]]=e[2].replace(/\s+$/,"");Xm=(zs.credits||"").split(/\r?\n\s*\r?\n/).map(i=>i.split(/\r?\n/).map(r=>r.trim()).filter((r,s,a)=>r||a.slice(0,s).some(o=>o))).filter(i=>i.length&&i.some(Boolean)).map(i=>[i[0]||"",i[1]||""])});let Xm=[];const jm=(n,t)=>Array.from({length:t},(e,i)=>zs[n+(i+1)]||"");let ci=0,au=0,cc=0;const sh={history:3,monsters:4,bonuses:9},wM=()=>ci,TM=n=>n==="history"||n==="monsters"||n==="bonuses";function AM(n){ci=0,n==="credits"&&(au=0,cc=0)}const RM=["bomb","bomb","bomb","key1","batareyka","apple1","ananas","invisible","clock"];function ou(n,t){const e=sh[n];return e?(n==="history"?ci=Math.max(0,Math.min(e-1,ci+t)):(ci=(ci+t+e)%e,jt(n==="monsters"?"chpok1":RM[ci])),!0):!1}const ml=(n,t,e,i,r)=>{n.G.sprite(e===6?11:12,i,r,1.4),n.widgets.push({id:t,type:e,rect:[i-21,r+21,i+21,r-21]})};function qm(n,t,e,i=22){const r=Rn(n.L("back"),i)+60,s=e-34.5,a=i*.8+t+30;return co({x:t,top:Math.trunc(e),w:Math.trunc(r),h:60}),n.sel()===0?_i(n.L("back"),a,s,i,n.pulse()):ce(n.L("back"),a,s,i),n.regItem(a-i,i*.75*1.2+s,a+r-60,s-i*.75*.8),r}function Ym(n,t,e,i,r){ce(CM(n,i,r).join(`
`),t+r*.5,e-r*.5,r)}const CM=(n,t,e)=>nh(n||"",t,e);function PM(n,t){const e=Math.trunc(t)+230,i=-365,r=500,s=360;Mn({x:i,top:e,w:r,h:s},2),ml(n,"pprev",6,-205,t-80),ml(n,"pnext",7,-25,t-80),ce(`${ci+1} / ${sh.history}`,-115,t-80,17,!0),Ym(jm("history",3)[ci],i+37,e-42,r-42,13);const a=Rn(n.L("back"),22)+60;qm(n,i+r-Math.trunc(a),e-s-45)}function LM(n,t,e){const i=t==="bonuses",r=Math.trunc(e)+230-(i?30:0),s=50,a=320,o=380-(i?60:0);Mn({x:s,top:r,w:a,h:o},0);const c=e+(i?-70:-100);ml(n,"pprev",6,140,c),ml(n,"pnext",7,280,c),Ym(jm(i?"bonus":"monster",sh[t])[ci],s+37,r-42,a-42,14),qm(n,s,r-o-45)}function IM(n,t,e){t==="history"?PM(n,e):LM(n,t,e)}function DM(n,t){const e=cc?Math.min(100,t-cc):0;cc=t;let i=au*.03-200;i<1860&&(au+=e),Xm.forEach(([r,s],a)=>{const o=Math.max(0,Math.min(255,Math.trunc(200-Math.abs(i-40))))/255,c=[255,255,0],l=[255,255,255];a<7?(oi(r,0,i,20,!0,o,c),i-=40,oi(s,0,i,23,!0,o,l),i-=100):(oi(r,0,i,23,!0,o,l),i-=40,oi(s,0,i,20,!0,o,c),i-=100)})}const Cd=(n,t)=>{try{const e=JSON.parse(localStorage.getItem(n));return e??t}catch{return t}};function UM(n,t){const e=Math.trunc(t)+180;Mn({x:-275,top:e,w:350,h:280},0);const i=n.joy.ed;n.checkbox(-180,e-60,"joyen",!!i.en),ce(n.L("joyenable"),-140,e-60,15),ce(n.L("joysens"),-100,e-110,15,!0),n.slider(-180,-20,e-135,Math.round(i.sens*30),30,"joysens"),ce("-                          +",-100,e-155,14,!0),["setbomb","nextweapon","usething"].forEach((r,s)=>{const a=e-188-25*s,o=n.L(r);ce(o,-100-Rn(o,14),a,14),n.joy.wait===s?_i("_",-72,a,14,n.pulse()):ce(i.btn[s]<0?"????":`${n.L("joybutton")} ${i.btn[s]+1}`,-72,a,14,!1,155/255),n.widgets.push({id:"jb"+s,type:3,rect:[-100,a+14,20,a-14]})})}let cu=!0;function NM(n,t){const e=Math.trunc(t)+180;Mn({x:-275,top:e,w:350,h:300},0),ce(n.L("resolution"),-100,e-45,15,!0),n.slider(-180,-20,e-70,0,2,"res"),ce(`${innerWidth} X ${innerHeight}`,-100,e-95,15,!0),n.checkbox(-200,e-140,"bit32",cu),n.checkbox(-45,e-140,"bit16",!cu),ce(`32 ${n.L("bit")}`,-160,e-140,15),ce(`16 ${n.L("bit")}`,-5,e-140,15),ce(n.L("gamma"),-100,e-180,15,!0),n.slider(-180,-20,e-205,Cd("dino_gamma",25),50,"gamma"),n.checkbox(-180,e-255,"vsync",!!Cd("dino_vsync",0)),ce(n.L("vsync"),-140,e-255,15)}function FM(n,t){return t.type===6?ou(n.scr(),-1)||!0:t.type===7?ou(n.scr(),1)||!0:t.id==="joyen"?(n.joy.ed.en=n.joy.ed.en?0:1,jt("menu"),!0):t.type===3&&/^jb\d$/.test(t.id)?(n.joy.wait=n.joy.wait===+t.id[2]?-1:+t.id[2],jt("menu"),!0):t.id==="bit32"||t.id==="bit16"?(cu=t.id==="bit32",jt("menu"),!0):t.id==="res"||t.type===3}function OM(n,t,e){return n.id==="joysens"?(e.joy.ed.sens=t/30,!0):n.id==="res"}const ws=300/(130*Math.tan(Math.PI/8));let Ea=0,lc=0;function kM(){Ea=0,lc=0,jt("logo")}function zM(n){Ea+=lc?Math.min(100,n-lc):0,lc=n,ih(-400,300,800,600,0,0,0,255);const t=Ea>=1800?1:Ea/1800;return js($a("./assets/textures/nevologo.jpg"),0,10*ws,25*ws,25*ws,t),js($a("./assets/textures/nevosoft.jpg"),0,-20*ws,30*ws,30*ws/4,t),Ea>4100}(function(){if(typeof document>"u"||!/[?&]level=/.test(location.search))return;const t=document.createElement("div");t.style.cssText="position:fixed;inset:0;background:#000;z-index:40;display:flex;align-items:center;justify-content:center";const e=document.createElement("img");e.src="./assets/loading.bmp",e.style.cssText=`width:${(204/8).toFixed(2)}vw;height:${(52/6).toFixed(2)}vh;image-rendering:auto`,t.appendChild(e),document.body.appendChild(t);const i=setInterval(()=>{window.__ready&&(clearInterval(i),t.remove())},50)})();const BM=["gamenag","startmenunag","levelpassnag","startgamenag","gameplaynag","endtrialnag","congratulationsnag","exitgamenag"],GM=n=>BM.includes(n)||n==="congratulations",VM={gamenag:"gamenagtext",gameplaynag:"gamenagtext",startmenunag:"startmenunagtext",congratulationsnag:"startmenunagtext"};function Pd(n,t,e){const r=t.map(c=>Rn(n.L(c),22)+60),s=20;let o=-(r.reduce((c,l)=>c+l,0)+s*(t.length-1))/2;t.forEach((c,l)=>{const f=r[l],u=e-34.5,h=22*.8+o+30;co({x:Math.trunc(o),top:Math.trunc(e),w:Math.trunc(f),h:60}),n.sel()===l?_i(n.L(c),h,u,22,n.pulse()):ce(n.L(c),h,u,22),n.regItem(h-22,22*.75*1.2+u,h+f-60,u-22*.75*.8),o+=f+s})}function HM(n,t,e,i){if(t==="congratulations"){const c=Math.trunc(i)+180,l=235;Mn({x:-200,top:c,w:400,h:l},0);let f=c-55;oi(n.L("congratulations"),0,f,22,!0,1,[255,255,0]);const u=(zs.congrat_text||"").split(/\r?\n/).map(h=>h.trim()).filter(Boolean);f-=45,ce(u[0]||"",0,f,19,!0),f-=35,oi(n.packName?n.packName():"",0,f,22,!0,1,[255,255,0]),f-=35,ce(u[3]||"",0,f,19,!0),Pd(n,e,c-l-53);return}const r=Math.trunc(i)+230,s=335;Mn({x:-250,top:r,w:500,h:s},2);let a=r-45;oi(n.L(t==="endtrialnag"?"endtrialnagtitle":t==="exitgamenag"?"exitnagtitle":"gamenagtitle"),0,a,20,!0,1,[255,255,0]),a-=60;const o=nh(zs[VM[t]||"levelpassnagtext"]||"",416,14).join(`
`);oi(o,-201,a-7,14,!1,1,[255,250,250]),oi(zs.benefits||"",-190,a-60,14,!1,1,[125,255,125]),Pd(n,e,r-s-53)}const WM="./assets/textures/",Yr=document.createElement("canvas");Yr.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:5";document.body.appendChild(Yr);const Ke=Yr.getContext("2d");function $m(){const n=devicePixelRatio||1;Yr.width=Math.round(innerWidth*n),Yr.height=Math.round(innerHeight*n)}$m();addEventListener("resize",$m);const Ii={};async function XM(n){const t=WM+n;if(n.endsWith(".tga")){const e=new wm().parse(await(await fetch(t)).arrayBuffer()),i=document.createElement("canvas");i.width=e.width,i.height=e.height;const r=new ImageData(new Uint8ClampedArray(e.data),e.width,e.height);return i.getContext("2d").putImageData(r,0,0),e.flipY,i}return new Promise((e,i)=>{const r=new Image;r.onload=()=>e(r),r.onerror=i,r.src=t})}const jM=["font.tga","iconhero.tga","iconbatareyka.tga","iconkey.tga","icontablo.tga","iconshorty.tga","iconsniper.tga","icondlinny.tga","iconbugay.tga","iconbomb1.tga","menutex.tga","white.jpg","bomb_sphere0.jpg","bomb_sphere1.jpg","bomb_sphere2.jpg"],qM=Promise.all(jM.map(async n=>{Ii[n]=await XM(n)})).then(()=>!0).catch(n=>(console.warn("hud assets",n),!1));let Km=!1;qM.then(n=>{Km=n});const fc={};is("texts/menutext.txt").then(n=>{for(const t of n.split(/\r?\n/)){const e=t.match(/^([\w. ]+?)\s*=\s*(.*)$/);e&&(fc[e[1].toLowerCase()]=e[2])}}).catch(()=>{});const Rf=new Map;function Ld(n,t,e,i){const r=n+t+e+i;if(Rf.has(r))return Rf.get(r);const s=Ii[n],a=document.createElement("canvas");a.width=s.width,a.height=s.height;const o=a.getContext("2d");return o.drawImage(s,0,0),o.globalCompositeOperation="multiply",o.fillStyle=`rgb(${t},${e},${i})`,o.fillRect(0,0,a.width,a.height),o.globalCompositeOperation="destination-in",o.drawImage(s,0,0),Rf.set(r,a),a}function va(n,t,e,i,r){const s=n.width*.99,a=n.height*.99;Ke.drawImage(n,0,0,s,a,t-i+400,300-(e+r),i*2,r*2)}const gn=(n,t,e,i,r=!1,s=Ii["font.tga"])=>dl(Ke,s,n,t,e,i,r),YM={0:[0,0,1,1],1:[1,0,1,1],2:[0,1,1,1],3:[1,1,1,1],4:[0,2,1,1],5:[1,2,1,1],6:[2,4,2,1],7:[0,3,1,2],8:[1,3,1,1.5],9:[2,0,1,4],10:[3,0,1,4]};function En(n,t,e,i=1,r=1){const[s,a,o,c]=YM[n],l=Ii["menutex.tga"],f=l.width,u=l.height,h=s/4+.005,m=(s+o)/4-.005,g=a/8+.005,x=(a+c)/8-.005,p=o*42*i,d=c*42*r;Ke.drawImage(l,h*f,g*u,(m-h)*f,(x-g)*u,t-p/2+400,300-e-d/2,p,d)}function $M(n,t,e,i){Ke.save(),Ke.fillStyle="rgba(30,0,0,"+180/255+")",Ke.fillRect(n+400,300-t,e,i),Ke.restore(),En(4,n+e/2,t,e/42,1),En(4,n+e/2,t-i,e/42,1),En(5,n,t-i/2,1,i/42),En(5,n+e,t-i/2,1,i/42),En(0,n,t),En(1,n+e,t),En(2,n,t-i),En(3,n+e,t-i)}function KM(n,t,e,i){$M(n,t,e,i),En(9,e*.2+n,t+65.1),En(10,e*.8+n,t+65.1),En(6,e*.8+n,t-i),En(7,n,t-70),En(8,n+e-8,t-i+50)}let Cf=0,Pf=0,Ka=!1,Fi=!1,Ai=0,Zm="",Bs=!1,Ko=0,Id="",Dd="",Jm="",uc=0,lu=!1;const Ud=[0,0,0,0],Pr=[0,0,0,0],Wi={showClock:!1,paused:()=>Ka||Fi||Bs,openTablet(n){!Fi&&!lu&&(Fi=!0,Zm=n)},message(n){Jm=n,uc=5e3}};addEventListener("keydown",n=>{if(!n.repeat){if(Bs){Bs=!1;return}if(Fi&&Ai>375){Fi=!1,lu=!0,setTimeout(()=>{lu=!1},0);return}(n.code==="KeyP"||n.code==="Pause")&&(Ka=!Ka)}});const Lf=n=>String(n).padStart(2,"0");let Nd=0;function ZM(n){const t=performance.now(),e=Pf?Math.min(100,t-Pf):0;Pf=t;const i=Yr.width/800,r=Yr.height/600;if(Ke.setTransform(i,0,0,r,0,0),Ke.clearRect(0,0,800,600),!Km)return;n.title&&Dd!==n.level&&(Dd=n.level,Bs=!0,Ko=0,n.lvlIdx,Id=n.title),Cf+=e,Ke.globalAlpha=1,va(Ii["iconhero.tga"],-360,-245,25,25);let s=n.hp*100;s<1&&s>0&&(s=1),gn(String(Math.trunc(s)),-350,-285,19);let a=-360;for(let h=0;h<3;h++)n.ammo[h]&&(a+=65,gn(String(n.ammo[h]),a+25,-285,20));const o=n.facing||{},c=()=>(Math.sin(Cf*.04)+1)*3;let l=0;n.keys>0&&l++,n.bat>0&&l++,o.tablet&&l++;let f=l>0?l*65-65:0;if(f=-f/2,n.keys>0){const h=o.lock?c():0;va(Ii["iconkey.tga"],f,-260,25+h,25+h),gn(String(n.keys),f+25,-285,20),f+=65}if(n.bat>0){const h=o.laser?c():0;va(Ii["iconbatareyka.tga"],f,-260,25+h,25+h),gn(String(n.bat),f+25,-285,20),f+=65}if(o.tablet){const h=Fi?0:c();va(Ii["icontablo.tga"],f,-260,25+h,25+h)}const u=["iconshorty.tga","iconsniper.tga","icondlinny.tga","iconbugay.tga"];for(let h=0;h<4;h++){const m=n.enemies[h],g=h*60+185;let x=Ii[u[h]];Ke.globalAlpha=1,m<1&&(x=Ld(u[h],158,158,158),Ke.globalAlpha=215/255),Ud[h]!==m&&(Pr[h]=500);let p=0;const d=Math.sin(Pr[h]/1e3*Math.PI)*3;Pr[h]>0&&(p=Math.sin(Pr[h]/5)*d+Math.sin(Pr[h]/7)*d),va(x,g,-260,25+p,25+p),Ke.globalAlpha=1,gn(String(m),g+25,-285,20),Ud[h]=m,Pr[h]=Math.max(0,Pr[h]-e)}if(Wi.showClock&&n.levelMs!==void 0){const h=n.levelMs,m=Math.trunc(h/1e3);gn(`${Lf(Math.trunc(m/60))}:${Lf(m%60)}:${Lf(Math.trunc((h-m*1e3)/10))}`,-360,210,20)}if(n.showFps){const h=Wi.showClock?165:215;gn(`${n.fps.toFixed(1)} FPS`,-360,h,17),gn(`${n.tri} TRI`,-360,h-25,17)}if(Nd+=e,n.replaying&&!Ka&&gn("R",360,230,Math.sin(Nd*.01)*10+40),Fi?Ai=Ai>=750?750:Ai+e:Ai>0?Ai-=e:Ai=0,Fi||Ai>0){const h=Ai/750,m=200+Math.trunc(Math.abs(Math.cos(2*Math.PI*h)*(h-1)*(h-1)*400)),g=14,x=400,p=-200,d=nh(Zm,x-63,g);let b=0;for(let y=0;y<d.length;y++)b+=y<d.length-1?1.4*g:.5*g;const A=Math.trunc(b)+84;KM(p,m,x,A),gn(d.join(`
`),g*.5+p+42,m-42-g*.5,g)}if(n.level,Bs){const h=Ko/4e3,m=h*6.8-3.4,g=(m+3)*(m+2)*(m+1)*m*(m-3)*(m-2)*(m-1),x=Math.trunc(255*Math.sin(Math.PI*h))/255,p=fc["pack"+(n.packIdx+1)]||"";Ke.globalAlpha=Math.max(0,x),gn(p.toUpperCase(),g,20,23,!0,Ld("font.tga",155,155,255)),gn(`${fc.level||"LEVEL"} ${n.lvlIdx} : ${Id}`.toUpperCase(),-g,-20,23,!0),Ke.globalAlpha=1,Ko+=e,Ko>4e3&&(Bs=!1)}else Ka&&!Fi&&gn(fc.pause||"PAUSE",0,0,2*Math.sin(Cf*.01)+30,!0);if(uc>0){const h=uc/5e3;Ke.globalAlpha=h*h*h,gn(Jm,-350,-200,18),Ke.globalAlpha=1,uc-=e}}const JM={main:["new game","options","info","exit"],"new game":["start","back"],options:["video","audio","keyboard","joystick","other","back"],info:["history","bonuses","monsters","credits","back"],history:["back"],monsters:["back"],bonuses:["back"],credits:["back"],audio:["apply","default"],other:["apply","default"],keyboard:["apply","default","cancel"],joystick:["apply","default","cancel"],video:["apply","default","cancel"],gameplay:["resume game","restart level","options","main"],defeat:["restart level","replay","main"],victory:["next level","replay","restart level","main"],replaywin:["resumereplay","next level","restart level","main"],replayloss:["resumereplay","restart level","main"],congratulations:["okay"],gamenag:["getfullversion","later"],startmenunag:["getfullversion","later"],levelpassnag:["getfullversion","later"],startgamenag:["getfullversion","later"],gameplaynag:["getfullversion","later"],endtrialnag:["getfullversion","later"],congratulationsnag:["getfullversion","later"],exitgamenag:["getdino","demoexit"]},QM={"new game":"main",options:"main",info:"main",history:"info",monsters:"info",bonuses:"info",credits:"info",audio:"options",other:"options",keyboard:"options",joystick:"options",video:"options"},ty=new Set(["audio","other","keyboard","joystick","video"]),Zn=[["pack1",[["tutorial01","BASIS"],["tutorial02","MORE EXPERIENCE"],["tutorial03","EXAMINATION"]]],["pack2",[["p01_l01","THE BEGINNING"],["p01_l02","SNIPER AND LASER"],["p01_l03","MIRRORS"],["p01_l04","SNIPERS ATTACK"],["p01_l05","LONGWISES ATTACK"]]],["pack3",[["p02_l01","SPIRAL"],["p02_l02","BOMBLESS"],["p02_l03","MEETING WITH BOUNCER"],["p02_l04","HAT AND CLOCK"],["p02_l05","ISLAND OF BOUNCERS"],["p02_l06","HARD CHOICE"],["p02_l07","BOXES AND LASERS"],["p02_l08","BIG HARDSHIP"],["p02_l09","BUT AND BEN"],["p02_l10","GREENFIELD"]]],["pack4",[["p03_l01","RUN, DINO, RUN"],["p03_l02","TROUBLES WITH BARRELS"],["p03_l03","SWAMP"],["p03_l04","CALCULATED RISK"],["p03_l05","HUNT"],["p03_l06","ROCKFIELD"],["p03_l07","DRY GARDEN"],["p03_l08","THE BARREL"],["p03_l09","ISLANDS"],["p03_l10","DIRECT HIT"],["p03_l11","LASER CORRIDOR"],["p03_l12","UNREAL PLACE"],["p03_l13","BIG MAZE"],["p03_l14","BRAIN POWER"],["p03_l15","LAKES"]]],["pack5",[["p04_l01","LOCKED TELEPORT"],["p04_l02","ARENA 1"],["p04_l03","FULL SPEED"],["p04_l04","HARDCORE"],["p04_l05","LAST TROUBLE"]]]],Oi=Zn.length,Qm=["setbomb","nextweapon","usething","left","right","up","down","fastbomb1","fastbomb2","fastbomb3","dance","zoomin","zoomout"],ah=[29,42,57,203,205,200,208,16,17,18,32,201,209],Jn={1:["Escape","ESCAPE"],12:["Minus","MINUS"],13:["Equal","EQUALS"],14:["Backspace","BACKSPACE"],15:["Tab","TAB"],26:["BracketLeft","["],27:["BracketRight","]"],28:["Enter","ENTER"],29:["ControlLeft","LEFT CONTROL"],39:["Semicolon",";"],40:["Quote","'"],41:["Backquote","`"],42:["ShiftLeft","LEFT SHIFT"],43:["Backslash","\\"],51:["Comma",","],52:["Period","."],53:["Slash","/"],54:["ShiftRight","RIGHT SHIFT"],56:["AltLeft","LEFT ALT"],57:["Space","SPACE"],58:["CapsLock","CAPS LOCK"],157:["ControlRight","RIGHT CONTROL"],184:["AltRight","RIGHT ALT"],199:["Home","HOME"],200:["ArrowUp","UP"],201:["PageUp","PAGE UP"],203:["ArrowLeft","LEFT"],205:["ArrowRight","RIGHT"],207:["End","END"],208:["ArrowDown","DOWN"],209:["PageDown","PAGE DOWN"],210:["Insert","INSERT"],211:["Delete","DELETE"]};"1234567890".split("").forEach((n,t)=>{Jn[2+t]=["Digit"+n,n]});"QWERTYUIOP".split("").forEach((n,t)=>{Jn[16+t]=["Key"+n,n]});"ASDFGHJKL".split("").forEach((n,t)=>{Jn[30+t]=["Key"+n,n]});"ZXCVBNM".split("").forEach((n,t)=>{Jn[44+t]=["Key"+n,n]});for(let n=0;n<10;n++)Jn[59+n]=["F"+(n+1),"F"+(n+1)];const t0={};for(const n in Jn)t0[Jn[n][0]]=+n;const lo=(n,t)=>{try{const e=JSON.parse(localStorage.getItem(n));return e??t}catch{return t}},Ri=(n,t)=>{try{localStorage.setItem(n,JSON.stringify(t))}catch{}};let $r=lo("dino_keys",ah).slice(0,13);$r.length!==13&&($r=ah.slice());let Za=lo("dino_other",{fps:0,time:0}),Ua=lo("dino_pass",{});const ey=(n,t)=>!!(Ua[n]&&Ua[n][t]),e0={};is("texts/menutext.txt").then(n=>{for(const t of n.split(/\r?\n/)){const e=t.match(/^([^=\[\]]+)=(.*)$/);e&&(e0[e[1].toLowerCase()]=e[2])}});const Ee=n=>(e0[n]??"").toUpperCase().replace(/^\s+|\s+$/g,t=>t),fu=new Set(["gameplay","defeat","victory","replaywin","replayloss"]);let uu=null,hu=null,te="main",oh=0,Ki=0,Kn=!1,gl=0,Un=!1,qe=0,ze=-1,Di=[],Ue=[],qs=[],Ja=[],Ye=0,Fn=0,Ys=$r.slice(),hr=-1,ki={...Za};const du=()=>({en:1,sens:.5,btn:[0,1,2]}),ny=()=>{const n=lo("dino_joy",null);return n&&Array.isArray(n.btn)&&n.btn.length===3?{en:n.en?1:0,sens:+n.sens,btn:n.btn.map(Number)}:du()};let zi=ny(),dr={...zi,btn:zi.btn.slice()},pr=-1,Gs={x:0,y:0};function _l(n,t){te=n,qe=0,ze=-1,oh=performance.now(),hr=-1,n==="keyboard"&&(Ys=$r.slice()),n==="joystick"&&(dr={...zi,btn:zi.btn.slice()},pr=-1),n==="other"&&(ki={...Za}),n==="main"&&qa(3),AM(n),n==="credits"&&qa(1)}function iy(n){if(Ki){const e=Math.min(1,(n-Ki)/300);return e*e*600}const t=1-Math.min(1,(n-oh)/900);return Math.abs(Math.cos((1-t)*(1-t)*2*Math.PI)*t*t*600)}const Qa=(n,t,e,i)=>qs.push([n,t,e,i]);function Fd(n,t){const i=n.length;let r=0;for(let h=0;h<i;h++)r=Math.max(r,Rn(Ee(n[h]),22));const s=r+60,a=230-Math.trunc(s/2),o=Math.trunc(t)+180;Mn({x:a,top:o,w:Math.trunc(s),h:Math.trunc(2*22*.75*(i-2)+22+60)},0);let c=o-30-.7*22;for(let h=0;h<i-1;h++){const m=Rn(Ee(n[h]),22),g=.8*22+230-m*.5;qe===h?_i(Ee(n[h]),g,c,22,Kr()):ce(Ee(n[h]),g,c,22),Qa(g-22,.75*22*1.2+c,g+r,c-.75*22*.8),c-=2*22*.75}const l=i-1,f=Rn(Ee(n[l]),22)+60;c-=54,co({x:a,top:Math.trunc(c),w:Math.trunc(f),h:60}),c-=34.5;const u=.8*22+a+30;qe===l?_i(Ee(n[l]),u,c,22,Kr()):ce(Ee(n[l]),u,c,22),Qa(u-22,.75*22*1.2+c,u+f-60,c-.75*22*.8)}function Od(n,t,e,i,r=220,s=180){const a=22*t,o=30*t,c=n.length;let l=0;for(const x of n)l=Math.max(l,Rn(Ee(x),a));const f=2*o+l,u=r-Math.trunc(f/2),h=Math.trunc(i)+s;Mn({x:u,top:h,w:Math.trunc(f),h:Math.trunc(2*a*.75*(c-1)+a+2*o)},e);const m=a*.8+u+o;let g=h-o-a*.7;n.forEach((x,p)=>{qe===p?_i(Ee(x),m,g,a,Kr()):ce(Ee(x),m,g,a),Qa(m-a,a*.75*1.2+g,m+f-2*o,g-a*.75*.8),g-=2*a*.75})}const Kr=()=>.6+.4*(Math.sin(performance.now()*.008)*.5+.5);function pu(n,t,e,i,r,s){const a=(t-n)/(r-1);be(4,(n+t)/2,e,.5),be(11,n-21,e),be(12,t+21,e),be(16,n+a*i,e),Ue.push({id:s,type:0,x0:n,x1:t,y:e,max:r,val:i,rect:[n-42,e+15,t+42,e-15],step:a})}function mu(n,t,e,i){be(18-(i?1:0),n,t),Ue.push({id:e,type:1,rect:[n-21,t+21,n+21,t-21],x:n,y:t})}function ry(n){const t=Math.trunc(n)+180;Mn({x:-275,top:t,w:350,h:200},0),ce(Ee("sfxvolume"),-100,t-50,15,!0),pu(-180,-20,t-75,Math.trunc(Im()/10),10,"sfx"),ce(Ee("musicvolume"),-100,t-125,15,!0),pu(-180,-20,t-150,Math.trunc(_M()/10),10,"mus")}function sy(n){const t=Math.trunc(n)+180;Mn({x:-320,top:t,w:380,h:180},0),mu(-130,t-60,"time",!!ki.time),ce(Ee("showleveltime"),-90,t-60,16),mu(-130,t-120,"fps",!!ki.fps),ce(Ee("showfps"),-90,t-120,16)}function ay(n){const t=Math.trunc(n)+180;Mn({x:-285,top:t,w:370,h:320},0),Qm.forEach((e,i)=>{const r=t-40-20*i,s=Ee(e);ce(s,-100-Rn(s,14),r,14);const a=hr===i?"_":Jn[Ys[i]]?Jn[Ys[i]][1]:"?";hr===i||ze===i?_i(a,-72,r,14,Kr()):ce(a,-72,r,14),Ue.push({id:"k"+i,type:2,idx:i,rect:[-285,r+10,85,r-10]})})}function oy(n){const t=Math.trunc(n)+180,e=22,i=Zn[Ye],r=i?i[1].length:0,s=t-270-53;if([["start",-305,0],["back",90,1]].forEach(([o,c,l])=>{const f=Rn(Ee(o),e)+60;co({x:c,top:Math.trunc(s),w:Math.trunc(f),h:60});const u=e*.8+c+30,h=s-34.5;qe===l?_i(Ee(o),u,h,e,Kr()):ce(Ee(o),u,h,e),Qa(u-e,e*.75*1.2+h,u+f-60,h-e*.75*.8)}),Mn({x:-305,top:t,w:320,h:270},2),Mn({x:90,top:t,w:230,h:270},0),Ye<Oi){be(11,-245,t-40,1.2),Ue.push({id:"lprev",type:4,rect:[-266,t-40+21,-224,t-40-21]}),be(12,-45,t-40,1.2),Ue.push({id:"lnext",type:5,rect:[-66,t-40+21,-24,t-40-21]}),ce(`${Ee("level")} ${Fn+1} / ${r}`,-145,t-40-3,16,!0);const o=t-135,c=`./assets/preview/${i[1][Fn][0]}.jpg`;js($a(c),-145,o,100,75);const l=ey(Ye,Fn)?Ee("completed"):Ee("notpassedyet");ce(l,-145,o-65,9,!0),ce(i[1][Fn][1],-145,o-100,16,!0)}else ce(e.block("startdownload")||Ee("download"),-145,t-40+3,16,!0),js($a("./assets/preview/download.jpg"),-145,t-135,100,75);let a=t-(270-Oi*28)/2;Ja=[];for(let o=0;o<=Oi;o++){const c=Ee(o===Oi?"download":Zn[o][0]),l=1;215-Rn(c,19)/2+19*.2,o===Ye?_i(c,215-Rn(c,19)/2+9.5,a,19,Kr()):ce(c,215,a,19,!0,l),Ja.push([o,155,a+19,275,a-19]),a-=28}}function n0(n){if(!Kn)return;if(gl=requestAnimationFrame(n0),vl){su(),qs=[],Ue=[],zM(n)&&(vl=!1,oh=n,qa(3));return}if(Ki&&n-Ki>=300){fy();return}if(pr>=0&&navigator.getGamepads)for(const i of navigator.getGamepads()){if(!i)continue;const r=i.buttons.findIndex(s=>s.pressed);if(r>=0){ne.joyAssign(r);break}}su(),qs=[],Ue=[],Ja=[];const t=iy(n);(!Un||!fu.has(te))&&js(Hm(),-300,-220,100,100);const e=te;if(e==="main"?Fd(Di,t):fu.has(e)?Od(Di,1,0,t):e==="new game"?oy(t):e==="audio"?ry(t):e==="other"?sy(t):e==="keyboard"?ay(t):e==="video"?NM(Ur,t):e==="joystick"?UM(Ur,t):GM(e)?HM(Ur,e,Di,t):TM(e)?IM(Ur,e,t):e==="credits"?DM(Ur,n):Fd(Di,t),ty.has(e)&&Od(Di,.85,1,t),ze>=0&&Ue[ze]){const i=Ue[ze].rect;Vm(i[0],i[1],i[2],i[3],.25+.25*Math.sin(n*.008))}be(cy()?20:19,Gs.x+9,Gs.y-12,.6)}let vl=!1,kd=!1;const Ur={joy:{get ed(){return dr},get wait(){return pr},set wait(n){pr=n}},packName:()=>Zn[Ye]?Ee(Zn[Ye][0]):"",G:EM,L:Ee,slider:pu,checkbox:mu,regItem:Qa,get widgets(){return Ue},sel:()=>qe,pulse:Kr,scr:()=>te},cy=()=>qs.some(n=>mr(n,Gs))||Ue.some(n=>mr(n.rect,Gs))||Ja.some(n=>mr(n.slice(1),Gs)),mr=(n,t)=>t.x>=n[0]&&t.x<=n[2]&&t.y<=n[1]&&t.y>=n[3];function xl(){Di=JM[te]}function hc(){if(te==="main"||fu.has(te))return;te==="credits"&&qa(3);let n=QM[te]||"main";n==="main"&&Un&&(n="gameplay"),_l(n),xl()}function i0(n){switch(jt("menu"),n){case"new game":_l("new game"),xl();break;case"options":case"info":case"video":case"audio":case"keyboard":case"joystick":case"other":case"history":case"bonuses":case"monsters":case"credits":_l(n),xl();break;case"back":case"cancel":hc();break;case"apply":te==="joystick"&&(zi={...dr,btn:dr.btn.slice()},Ri("dino_joy",zi)),te==="keyboard"&&($r=Ys.slice(),Ri("dino_keys",$r)),te==="other"&&(Za={...ki},Ri("dino_other",Za)),hc();break;case"default":te==="joystick"?(zi=du(),dr=du(),pr=-1,Ri("dino_joy",zi)):te==="keyboard"?Ys=ah.slice():te==="audio"?(Um(50),Dm(50)):te==="other"?ki={fps:0,time:0}:te==="video"&&(Ri("dino_gamma",25),Ri("dino_vsync",0));break;case"start":ly();break;case"resume game":ne.hide();break;case"restart level":try{sessionStorage.removeItem("dino_rec")}catch{}location.reload();break;case"next level":try{sessionStorage.removeItem("dino_rec")}catch{}ne.nextLevel?location.search="?level="+ne.nextLevel:location.reload();break;case"resumereplay":ne.hide();break;case"replay":try{sessionStorage.setItem("dino_replay","1")}catch{}location.reload();break;case"main":try{te==="victory"&&ne.nextLevel&&sessionStorage.setItem("dino_next",ne.nextLevel)}catch{}location.search="";break;case"exit":try{window.close()}catch{}break;case"okay":case"later":hc();break;case"buynow":break;case"demo":location.search=Wm(Math.floor(Math.random()*Da.length));break}}function ly(){Ye>=Oi||(Kn=!1,r0(),uu&&uu(Zn[Ye][1][Fn][0]))}const r0=()=>{cancelAnimationFrame(gl),Oe.style.display="none"};function fy(){Kn=!1,Ki=0,r0(),hu&&hu()}function dc(n,t){OM(n,Math.max(0,Math.min(n.max-1,t)),Ur)||(t=Math.max(0,Math.min(n.max-1,t)),n.id==="sfx"?t*10!==Im()&&(Um(t*10),jt("chpok1")):n.id==="mus"?Dm(t*10):n.id==="gamma"&&Ri("dino_gamma",t))}function s0(n,t){FM(Ur,n)||(n.type===0?(t.x<n.x0?dc(n,n.val-1):t.x>n.x1?dc(n,n.val+1):dc(n,Math.round((t.x-n.x0)/n.step)),jt("menu")):n.type===1?(n.id==="fps"?ki.fps=ki.fps?0:1:n.id==="time"?ki.time=ki.time?0:1:Ri("dino_vsync",lo("dino_vsync",0)?0:1),jt("menu")):n.type===2?(hr=hr===n.idx?-1:n.idx,jt("menu")):n.type===4?gu(-1):n.type===5&&gu(1))}function gu(n){const t=Zn[Ye][1].length;Fn=(Fn+n+t)%t,jt("menu")}function zd(n){Ye=(n+Oi+1)%(Oi+1),Fn=Math.min(Fn,Ye<Oi?Zn[Ye][1].length-1:0),jt("menu2")}function a0(n){const t=zm(n.clientX,n.clientY);return Gs=t,t}Oe.addEventListener("pointermove",n=>{const t=a0(n),e=qs.findIndex(r=>mr(r,t));e>=0&&e!==qe&&(qe=e,ze=-1,jt("menu2"));const i=Ue.findIndex(r=>mr(r.rect,t));i>=0&&(ze=i)});Oe.addEventListener("pointerdown",n=>{const t=a0(n);if(Ki)return;const e=qs.findIndex(r=>mr(r,t));if(e>=0){qe=e,i0(Di[e]);return}const i=Ue.find(r=>mr(r.rect,t));if(i){s0(i,t);return}if(te==="new game"){const r=Ja.find(s=>mr(s.slice(1),t));r&&(Ye=r[0],Fn=Math.min(Fn,Ye<Oi?Zn[Ye][1].length-1:0),jt("menu2"))}});addEventListener("keydown",n=>{if(!Kn||Ki||vl)return;if(hr>=0){n.preventDefault(),n.stopImmediatePropagation();const r=t0[n.code];r&&n.code!=="Escape"&&(Ys[hr]=r),hr=-1;return}const t=Di.length,e=n.code;let i=!0;if(e==="ArrowDown")te==="new game"?zd(Ye+1):(qe=(qe+1)%t,ze=-1,jt("menu2"));else if(e==="ArrowUp")te==="new game"?zd(Ye-1):(qe=(qe+t-1)%t,ze=-1,jt("menu2"));else if(e==="Tab")te==="new game"?qe=(qe+1)%t:Ue.length?ze=(ze+1)%Ue.length:qe=(qe+1)%t;else if(e==="Enter"||e==="Space")ze>=0&&Ue[ze]?s0(Ue[ze],{x:Ue[ze].x0??0}):i0(Di[qe]);else if(e==="Escape")te==="main"?i=!1:te==="gameplay"?ne.hide():te==="defeat"||te==="victory"||ne.replayEnd&&(te==="replaywin"||te==="replayloss")?i=!0:te==="replaywin"||te==="replayloss"?ne.hide():hc();else if(e==="ArrowLeft"||e==="ArrowRight"){const r=e==="ArrowLeft"?-1:1;te==="new game"?gu(r):ou(te,r)||(ze>=0&&Ue[ze]&&Ue[ze].type===0?dc(Ue[ze],Ue[ze].val+r):i=!1)}else i=!1;i&&(n.preventDefault(),n.stopImmediatePropagation())},!0);addEventListener("contextmenu",n=>{Kn&&n.preventDefault()});function If(n){Kn=!0,Ki=0,Oe.style.display="block",_l(n),xl(),km.then(()=>{Kn&&(cancelAnimationFrame(gl),gl=requestAnimationFrame(n0))})}const Bd=()=>{let n=new URLSearchParams(location.search).get("level");if(!n)try{n=sessionStorage.getItem("dino_next"),sessionStorage.removeItem("dino_next")}catch{}n&&Zn.forEach((t,e)=>t[1].forEach((i,r)=>{i[0]===n&&(Ye=e,Fn=r)}))},ne={nextLevel:null,get open(){return Kn},get scr(){return te},get pausing(){return Kn&&(te==="gameplay"||te==="replaywin"||te==="replayloss")},get joy(){return zi},joyAssign(n){if(!(pr<0)){for(let t=0;t<3;t++)dr.btn[t]===n&&(dr.btn[t]=-1);dr.btn[pr]=n,pr=-1,jt("menu")}},get ending(){return Kn&&(te==="defeat"||te==="victory"||this.replayEnd&&(te==="replaywin"||te==="replayloss"))},replayEnd:!1,get inGame(){return Un},set inGame(n){Un=!!n},init(n,t){uu=n,hu=t,Bd()},show(n){Un=n!==void 0?!!n:Un,Bd(),!Un&&!kd?(kd=vl=!0,kM()):Un||qa(3),If(Un?"gameplay":"main")},end(n){Un=!0,If(n)},screen(n){Un=!0,If(n)},hide(){!Kn||!Un||(Ki=performance.now())},keys:()=>$r.map(n=>Jn[n]?Jn[n][0]:null),KEYORDER:Qm,options:()=>Za,markPassed(n){Zn.forEach((t,e)=>t[1].forEach((i,r)=>{i[0]===n&&((Ua[e]=Ua[e]||[])[r]=!0,Ri("dino_pass",Ua))}))}};function uy({RT:n,spriteQ:t,txt:e,camera:i,OBJ:r,hero:s,fl:a,F:o,enemies:c,heatAt:l}){let f=0,u=0,h=0;const m=B=>{f=B>>8&255,u=B&255},g=()=>(f=f+1&255,u=u+3&255,n[f]<<8|n[u]),x=B=>g()%B,p=B=>g()/32768*B-B,d=new Map,b=B=>{d.has(B)||(d.set(B,[]),e("geomobjs/"+B).then(j=>{var V;const R={};for(const U of j.split(/\r?\n/)){const rt=U.match(/^\s*(bound\d+)\.(\w+(?:\.\w+)?)\s*=\s*(.+?)\s*$/);rt&&((R[V=rt[1]]||(R[V]={}))[rt[2]]=rt[3])}d.set(B,Object.values(R).filter(U=>U.name==="leaves"&&+U.b_circle==1).map(U=>({c:[+U["center.x"],+U["center.y"],+U["center.z"]],r:+U.radius})))}))},A=new WeakMap,y=new O,I=new O,P=new Yt,C=new O,L=new O,v=()=>{const B=h;y.set(Math.sin(B/200)+3,Math.cos(B/270)*.18,Math.cos(B/170)*.13).normalize().multiplyScalar(Math.sin(B/400)+2.5+Math.cos(B/643))},_=(B,j,R,V,U,rt,q,J)=>{w.intersectsSphere(N.set(I.set(B,j,R),U))&&t(B,j,R,V,U,rt,q,J,1)},w=new ao,k=new Ht,N=new Qs;return function(j){h+=j,v(),i.updateMatrixWorld(),k.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),w.setFromProjectionMatrix(k),i.getWorldDirection(C),m(1234);const R=s.obj?s.obj.position:null;for(const V of r){if(!V||!V.mesh)continue;const U=V.mesh,rt=U.userData.name||"";if(V.ch==="T"&&/^tree[12]\.cgo$/.test(rt)){b(rt);const q=d.get(rt);if(!q.length)continue;U.updateMatrixWorld(),m(1234);for(const J of q){L.set(J.c[0],J.c[2],J.c[1]).applyMatrix4(U.matrixWorld),P.setRGB(0,0,0);const lt=x(155)+100,ht=x(70)+185,G=x(155)+100;P.setRGB(G/255,ht/255,lt/255);const Y=p(90),$=p(.1),F=J.r*3.5+y.y*.015,tt=Y+y.x*.7;I.copy(L),I.z+=1,I.addScaledVector(C,-($+.6)),I.x+=y.x*.015*J.r,I.y+=y.z*.015*J.r,I.z+=y.y*.015*J.r;const at=I.x,st=I.y,Ot=I.z;_(at,st,Ot,tt,F,P,2,56)}}else if(V.ch==="G"){const q=U.position.x,J=U.position.z;for(const Rt of U.children)Rt.visible=!1;let lt=A.get(U);lt||(lt={B:0,seed:V.rnd|0},A.set(U,lt)),lt.B>0&&(lt.B-=j/80,lt.B<0&&(lt.B=0));const ht=V.x,G=V.y,Y=a(ht,G),$=G*o.N+ht;let F=1e6,tt=0;if(Y&32)R&&(F=R.x,tt=R.z);else if(Y&16){const Rt=c.find(D=>D.id===o.ie[$]);Rt&&(F=Rt.o.position.x,tt=Rt.o.position.z)}else if(Y&128){const Rt=r[o.i1[$]];Rt&&Rt.mesh&&(F=Rt.mesh.position.x,tt=Rt.mesh.position.z)}const at=l(ht,G)*10;lt.B<at&&(lt.B=at);let st=0;{const Rt=q-F,D=J-tt,Tt=Math.hypot(Rt,D);Tt<8&&(st=(8-Tt)*3),Rt<0&&(st=-st)}m(lt.seed);const Ot=Math.round(Math.min(lt.B/2,65)),kt=[[0,1,1],[0,-3,.7],[-2,-1,.5],[2,-1,.4]];for(let Rt=0;Rt<4;Rt++){const D=x(55)+200,Tt=x(75)+180-Ot,pt=x(55)+200;P.setRGB(pt/255,Tt/255,D/255);const yt=p(2)+6,ct=p(20),Pt=ct-90+st*kt[Rt][2];_(q+kt[Rt][0],0,J+kt[Rt][1],Pt,yt,P,2,50)}}}}}function hy(n,t,e,i,r={}){const o=r.groundY??0,c=new n.WebGLRenderTarget(512,512,{minFilter:n.LinearFilter,magFilter:n.LinearFilter,generateMipmaps:!1,depthBuffer:!0}),l=new n.OrthographicCamera(-145/2,145/2,145/2,-145/2,1,5e3),f=new n.MeshBasicMaterial({color:16777215,side:n.DoubleSide}),u=new n.ShaderMaterial({uniforms:{map:{value:c.texture},k:{value:.5}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D map; uniform float k; varying vec2 vUv; void main(){ float s = texture2D(map, vUv).r * k; gl_FragColor = vec4(vec3(1.0 - s), 1.0); }",transparent:!0,depthWrite:!1,depthTest:!0,side:n.DoubleSide,blending:n.CustomBlending,blendEquation:n.AddEquation,blendSrc:n.ZeroFactor,blendDst:n.SrcColorFactor,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),h=new n.BufferGeometry,m=new Float32Array(12);h.setAttribute("position",new n.BufferAttribute(m,3)),h.setAttribute("uv",new n.BufferAttribute(new Float32Array([0,1,1,1,0,0,1,0]),2)),h.setIndex([0,1,2,2,1,3]);const g=new n.Mesh(h,u);g.frustumCulled=!1,g.renderOrder=3,g.visible=!1,e.add(g);const x={x:0,y:0,z:-1},p={x:0,y:0,z:0},d=F=>({x:F.x,y:F.z,z:F.y}),b=[],A=(F,tt)=>{F&&F.traverse(at=>{tt?at.layers.enable(1):at.layers.disable(1)})};l.layers.set(1);const y=new n.OrthographicCamera(-1,1,1,-1,1,3e3);y.layers.set(2);const I={uDir:{value:new n.Vector2},uGY:{value:o}},P=new WeakMap,C=new WeakMap,L=F=>{let tt=P.get(F);if(tt)return tt;const at=(F.alphaTest||0)>0;return tt=new n.MeshBasicMaterial({map:at&&F.map||null,color:0,alphaTest:at?1/255:0,transparent:at,side:at?n.DoubleSide:F.side??n.FrontSide,toneMapped:!1,fog:!1}),tt.onBeforeCompile=st=>{Object.assign(st.uniforms,I),st.vertexShader=`uniform vec2 uDir; uniform float uGY;
`+st.vertexShader.replace("#include <project_vertex>","vec4 wpS = modelMatrix * vec4(transformed,1.0); wpS.xz += uDir * max(wpS.y - uGY, 0.0); vec4 mvPosition = viewMatrix * wpS; gl_Position = projectionMatrix * mvPosition;")},tt.customProgramCacheKey=()=>"shadowShear",P.set(F,tt),tt},v=F=>{let tt=C.get(F);return tt||(tt=new n.MeshBasicMaterial({map:F.map||null,color:F.color?F.color.clone():16777215,alphaTest:F.alphaTest||0,transparent:!0,opacity:F.opacity??1,side:n.DoubleSide,depthTest:!1,depthWrite:!1,toneMapped:!1,fog:!1,blending:n.CustomBlending,blendEquation:n.AddEquation,blendSrc:n.OneFactor,blendDst:n.OneFactor}),C.set(F,tt),tt)},_=(F,tt,at)=>F.traverse(st=>{st.isMesh&&(at&&at.push([st,st.material]),st.material=Array.isArray(st.material)?st.material.map(tt):tt(st.material))}),w=F=>{for(const[tt,at]of F)tt.material=at;F.length=0},k=new Map,N=new Map,B=new Map,j=F=>{let tt=4;for(let at=4;at<=512;at*=2)Math.abs(at-F)<Math.abs(tt-F)&&(tt=at);return tt},R=()=>{const F=x.z||-1e-6,tt=x.x/F,at=x.y/F,st=Math.hypot(tt,at);return{dx:tt,dy:at,tn:st,nx:st>1e-6?tt/st:1,ny:st>1e-6?at/st:0}};function V(F){const tt=F.ch+"_"+(F.rot||0);let at=k.get(tt);if(at)return at;const st=F.mesh,Ot=R(),kt=st.position;st.updateMatrixWorld(!0);let Rt=.5;const D=new n.Vector3,Tt=new n.Vector3;st.traverse(_t=>{if(!_t.isMesh||!_t.geometry)return;_t.geometry.boundingSphere||_t.geometry.computeBoundingSphere();const Wt=_t.geometry.boundingSphere;D.copy(Wt.center).applyMatrix4(_t.matrixWorld).sub(kt),_t.matrixWorld.decompose(new n.Vector3,new n.Quaternion,Tt);const gt=Wt.radius*Math.max(Tt.x,Tt.y,Tt.z);Rt=Math.max(Rt,Math.abs(D.x)+gt,Math.abs(D.z)+gt,Math.abs(D.y)+gt)});const pt=(1+Ot.tn)*Rt,yt=(Ot.tn-1)*Rt/2,ct=j(2*pt),Pt=new n.WebGLRenderTarget(ct,ct,{minFilter:n.LinearFilter,magFilter:n.LinearFilter,generateMipmaps:!1,depthBuffer:!0}),Mt=kt.x+yt*Ot.nx,E=kt.z+yt*Ot.ny;y.left=-pt/2,y.right=pt/2,y.top=pt/2,y.bottom=-pt/2,y.updateProjectionMatrix(),y.up.set(Ot.nx,0,Ot.ny),y.position.set(Mt,o+1e3,E),y.lookAt(Mt,o,E),y.updateMatrixWorld(!0),I.uDir.value.set(Ot.dx,Ot.dy);const M=[],H=[];_(st,L,M),st.traverse(_t=>{H.push([_t,_t.layers.mask]),_t.layers.enable(2)});const nt=t.getRenderTarget(),ot=e.background,K=t.autoClear,At=t.getClearColor(new n.Color),dt=t.getClearAlpha();e.background=null,t.autoClear=!0,t.setClearColor(16777215,1),t.setRenderTarget(Pt),t.clear(),t.render(e,y),t.setRenderTarget(nt),t.setClearColor(At,dt),e.background=ot,t.autoClear=K,w(M);for(const[_t,Wt]of H)_t.layers.mask=Wt;return at={rt:Pt,W:pt,off:yt,px:ct,nx:Ot.nx,ny:Ot.ny},k.set(tt,at),at}function U(F){let tt=N.get(F);if(tt)return tt;const at=V(F),st=.47*at.W,Ot=at.off*at.nx,kt=at.off*at.ny,Rt=-at.ny,D=at.nx,Tt=[],pt=[];for(const[Pt,Mt]of[[-1,1],[-1,-1],[1,1],[1,-1]])Tt.push(Ot+Pt*st*Rt+Mt*st*at.nx,0,kt+Pt*st*D+Mt*st*at.ny),pt.push(Pt<0?.03:.97,Mt<0?.03:.97);const yt=new n.BufferGeometry;yt.setAttribute("position",new n.BufferAttribute(new Float32Array(Tt),3)),yt.setAttribute("uv",new n.BufferAttribute(new Float32Array(pt),2)),yt.setIndex([0,1,2,2,1,3]);let ct=B.get(at);return ct||(ct=new n.ShaderMaterial({uniforms:{map:{value:at.rt.texture}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ float b = clamp(texture2D(map, vUv).b, 0.0, 1.0); gl_FragColor = vec4(vec3(1.0 - b), 1.0); }",side:n.DoubleSide,depthTest:!1,depthWrite:!1,transparent:!0,blending:n.CustomBlending,blendEquation:n.AddEquation,blendSrc:n.OneFactor,blendDst:n.OneFactor}),B.set(at,ct)),tt=new n.Mesh(yt,ct),tt.frustumCulled=!1,tt.layers.set(3),e.add(tt),N.set(F,tt),tt}const rt=F=>F.mesh&&F.ch!=="k"&&F.ch!=="z"&&(F.rec||0)&512,q=F=>F.mesh&&!"kzw".includes(F.ch)&&!((F.rec||0)&512),J=[],lt=[],ht=[],G=[],Y=new n.MeshBasicMaterial({color:16777215,side:n.DoubleSide,depthTest:!1,depthWrite:!1,toneMapped:!1,fog:!1,transparent:!0,blending:n.CustomBlending,blendEquation:n.AddEquation,blendSrc:n.OneFactor,blendDst:n.OneFactor}),$={quad:g,rt:c,angleDeg:0,setSun(F,tt,at){const st=Math.hypot(F,tt,at)||1;x.x=F/st,x.y=tt/st,x.z=at/st},update(F){let tt=x.x*1e3,at=x.y*1e3;const st=-x.z*1e3;tt===0&&(tt=1e-6);let Ot=Math.atan(at/tt);tt<0&&(Ot+=Math.PI),$.angleDeg=Ot*(180/Math.PI);const kt=Ot+Math.PI/2,Rt=Math.cos(kt),D=Math.sin(kt);let Tt=at*0-st*D,pt=st*Rt-tt*0,yt=tt*D-at*Rt;const ct=Math.hypot(Tt,pt,yt)||1;Tt/=ct,pt/=ct,yt/=ct;const Pt=d(i.position),Mt=new n.Vector3;i.getWorldDirection(Mt);const E=d(Mt),M={x:Pt.x,y:Pt.y-25,z:Pt.z},H=E.z===0?-1:-M.z/E.z,nt={x:M.x+E.x*H,y:M.y+E.y*H,z:M.z+E.z*H};Math.hypot(nt.x-p.x,nt.y-p.y,nt.z-p.z)>10&&(p.x=nt.x,p.y=nt.y,p.z=nt.z);const ot=Math.hypot(tt,at,st),K=145*st/ot;l.top=K/2,l.bottom=-K/2,l.updateProjectionMatrix(),l.up.set(Tt,yt,pt),l.position.set(p.x+tt,p.z+st,p.y+at),l.lookAt(p.x,p.z,p.y),l.updateMatrixWorld(!0);const At=d(F.hero?F.hero.position:i.position),dt=F.cell||5,_t=Math.floor(At.x/dt),Wt=Math.floor(At.y/dt),gt=Z=>{const vt=d(Z.position),bt=Math.floor(vt.x/dt)-_t,Xt=Math.floor(vt.y/dt)-Wt;return bt>=-15&&bt<15&&Xt>=-14&&Xt<11};for(const Z of b)A(Z,!1);b.length=0,F.hero&&b.push(F.hero);for(const Z of F.enemies||[])Z&&b.push(Z);for(const Z of J)Z.visible=!1;J.length=0,lt.length=0,ht.length=0;for(const Z of F.objs||[])if(Z&&Z.mesh&&Z.ch!=="w"&&gt(Z.mesh))if(q(Z)){const vt=U(Z);vt.position.set(Z.mesh.position.x,o,Z.mesh.position.z),vt.visible=!0,J.push(vt)}else rt(Z)?lt.push(Z.mesh):b.push(Z.mesh);for(const Z of F.extra||[])Z&&ht.push(Z);for(const Z of b)A(Z,!0);const Lt=t.getRenderTarget(),Bt=e.overrideMaterial,Gt=e.background,It=t.autoClear;e.overrideMaterial=f,e.background=null,t.autoClear=!0;const re=t.getClearColor(new n.Color),$t=t.getClearAlpha();if(t.setClearColor(0,1),t.setRenderTarget(c),t.clear(),t.render(e,l),J.length||lt.length||ht.length){const Z=[];for(const vt of lt)_(vt,v,G),vt.traverse(bt=>{Z.push([bt,bt.layers.mask]),bt.layers.enable(3)});for(const vt of ht)_(vt,()=>Y,G),Z.push([vt,vt.layers.mask]),vt.layers.enable(3);l.layers.set(3),e.overrideMaterial=null,t.autoClear=!1,t.render(e,l),l.layers.set(1),w(G);for(const[vt,bt]of Z)vt.layers.mask=bt}t.setRenderTarget(Lt),t.setClearColor(re,$t),e.overrideMaterial=Bt,e.background=Gt,t.autoClear=It;const me=Math.cos(Ot),z=Math.sin(Ot),Et=145/2,it=[[-Et,Et],[-Et,-Et],[Et,Et],[Et,-Et]];for(let Z=0;Z<4;Z++){const[vt,bt]=it[Z],Xt=p.x+vt*me-bt*z,Re=p.y+vt*z+bt*me;m[Z*3]=Xt,m[Z*3+1]=o,m[Z*3+2]=Re}h.attributes.position.needsUpdate=!0,g.visible=!0}};return $}const Df=Math.PI/180,Gd=new Ht().set(1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1),Vd=new Ht,Uf=new Ht,Hd=new Ht;async function dy(){const n=Zu(await oo("geomobjs/nevidimka.msh")),t=new Ge,e=new Float32Array(n.T*9),i=new Float32Array(n.T*6);for(let a=0;a<n.T;a++)for(let o=0;o<3;o++){const c=n.idx[a*3+o],l=(a*3+o)*3,f=c*3;e[l]=n.pos[f]+n.offset[0],e[l+1]=n.pos[f+2]+n.offset[2],e[l+2]=n.pos[f+1]+n.offset[1],i[(a*3+o)*2]=n.uv[(a*3+o)*2],i[(a*3+o)*2+1]=1-n.uv[(a*3+o)*2+1]}if(t.setAttribute("position",new ye(e,3)),t.setAttribute("uv",new ye(i,2)),t.computeVertexNormals(),n.smooth){const a=new Float32Array(n.V*3),o=new O,c=new O,l=new O;for(let u=0;u<n.T;u++){o.fromArray(e,u*9),c.fromArray(e,u*9+3),l.fromArray(e,u*9+6),c.sub(o),l.sub(o),c.cross(l);for(let h=0;h<3;h++){const m=n.idx[u*3+h]*3;a[m]+=c.x,a[m+1]+=c.y,a[m+2]+=c.z}}const f=t.attributes.normal.array;for(let u=0;u<n.T*3;u++){const h=n.idx[u]*3,m=Math.hypot(a[h],a[h+1],a[h+2])||1;f[u*3]=a[h]/m,f[u*3+1]=a[h+1]/m,f[u*3+2]=a[h+2]/m}}const r=new Fl().load("./assets/textures/hat.jpg");r.colorSpace=on;const s=new pe(t,new Nl({map:r,transparent:!0}));return s.matrixAutoUpdate=!1,s.frustumCulled=!1,s.visible=!1,s}async function py(n){const t=n.ch,e=t.skl.names,i=e.indexOf("glavnyi HeadNub"),r=e.indexOf("glavnyi Ponytail1"),s=await dy();n.obj.add(s);const a={on:!1,fadeIn:0,corpse:0,deathMs:0,prev:0},o=new Ht().identity();t.ovr=r>=0?{[r]:o}:null;const c=t.mesh.material;return{S:a,update(l,f){f.invisMs>0&&!a.on&&(a.on=!0,a.fadeIn=0),a.on&&(a.fadeIn<500&&(a.fadeIn+=l),a.fadeIn>500&&(a.fadeIn=500));const u=a.on?Math.min(a.fadeIn,f.invisMs)/500:0;o.copy(a.on?Uf.makeRotationZ(-40*Df):Uf.identity());let h=a.on?1-.7*u:1;if(f.hp<=0&&n.state==="death"){a.deathMs+=l;const g=n.ch.blend?n.ch.blend.to:n.ch.clip,x=g?g.F*g.ms:0;a.deathMs>x&&a.corpse<2e4&&(a.corpse+=l),a.deathMs>x&&(h=Math.max(0,1-a.corpse/2e4))}else if(f.finished&&n.wave){const g=n.wave.F*n.wave.ms,x=g-f.finishMs;x<2e3&&(h=Math.max(0,x/2e3))}c.transparent=h<1,c.opacity=h,a.on&&u>0&&i>=0?(s.visible=!0,s.material.opacity=u,Hd.copy(t.world[i]).multiply(Vd.makeTranslation(0,-.6,0)).multiply(Uf.makeRotationY(90*Df)).multiply(Vd.makeRotationX(12*Df)),s.matrix.copy(Gd).multiply(Hd).multiply(Gd),s.matrixWorldNeedsUpdate=!0):s.visible=!1}}}let _u=null;const ut=5,ia=new URLSearchParams(location.search),gr=ia.get("level")||"menulevel",On=new cm({antialias:!0});On.setSize(innerWidth,innerHeight);document.body.appendChild(On.domElement);const ae=new Yu;ae.background=new Yt(0);const De=new _n(45,innerWidth/innerHeight,1,1500);addEventListener("resize",()=>{On.setSize(innerWidth,innerHeight),De.aspect=innerWidth/innerHeight,De.updateProjectionMatrix()});const o0=hy(aM,On,ae,De),Nf=new Map,my=new Map([["403094.jpg","403094.jpg"],["bark02.jpg","BARK02.JPG"],["barkbw.jpg","BARKBW.JPG"],["barkdrk.jpg","Barkdrk.jpg"],["barkdrk2.jpg","Barkdrk2.jpg"],["rings.jpg","RINGS.JPG"],["bochka_screen.jpg","bochka_screen.jpg"],["bomb_sphere.jpg","bomb_sphere.jpg"],["bomb_sphere0.jpg","bomb_sphere0.jpg"],["bomb_sphere1.jpg","bomb_sphere1.jpg"],["bomb_sphere2.jpg","bomb_sphere2.jpg"],["bonus_screen.jpg","bonus_screen.jpg"],["bottom.jpg","bottom.jpg"],["box1.jpg","box1.jpg"],["budilnik_screen.jpg","budilnik_screen.jpg"],["budilnik_zvonok.jpg","budilnik_zvonok.jpg"],["bugai_screen.jpg","bugai_screen.jpg"],["chastokol.jpg","chastokol.jpg"],["dirt01.jpg","dirt01.jpg"],["dirt02.jpg","dirt02.jpg"],["dirt03.jpg","dirt03.jpg"],["dlinnyi_screen.jpg","dlinnyi_screen.jpg"],["exploanim.tga","exploanim.tga"],["exploflare.jpg","exploflare.jpg"],["flare.jpg","flare.jpg"],["flower.tga","flower.tga"],["font.tga","font.tga"],["glavnyi_screen.jpg","glavnyi_screen.jpg"],["green1.jpg","green1.jpg"],["hat.jpg","hat.jpg"],["iconbatareyka.tga","iconbatareyka.tga"],["iconbomb1.tga","iconbomb1.tga"],["iconbugay.tga","iconbugay.tga"],["icondlinny.tga","icondlinny.tga"],["iconhero.tga","iconhero.tga"],["iconkey.tga","iconkey.tga"],["iconshorty.tga","iconshorty.tga"],["iconsniper.tga","iconsniper.tga"],["icontablo.tga","icontablo.tga"],["kust1.tga","kust1.tga"],["kuvshinka.tga","kuvshinka.tga"],["lazer_screen.jpg","lazer_screen.jpg"],["lazer_zerkalo_screen.jpg","lazer_zerkalo_screen.jpg"],["list_palma_screen.tga","list_palma_screen.tga"],["list_papor_screen.tga","list_papor_screen.tga"],["menulogo.tga","menulogo.tga"],["menutex.tga","menutex.tga"],["metal_box.jpg","metal_box.jpg"],["nevologo.jpg","nevologo.jpg"],["nevosoft.jpg","nevosoft.jpg"],["ograda_screen.jpg","ograda_screen.jpg"],["ograda_vorota1_screen.jpg","ograda_vorota1_screen.jpg"],["ograda_vorota2_screen.jpg","ograda_vorota2_screen.jpg"],["palma_01_stvol.jpg","palma_01_stvol.jpg"],["podsvet.jpg","podsvet.jpg"],["redblue.jpg","redblue.jpg"],["reshetka.jpg","reshetka.jpg"],["sintezator_screen.jpg","sintezator_screen.jpg"],["smoke.tga","smoke.tga"],["snayper_screen.jpg","snayper_screen.jpg"],["stone01.jpg","stone01.jpg"],["stone02.jpg","stone02.JPG"],["stone03.jpg","stone03.jpg"],["strelka_screen.jpg","strelka_screen.jpg"],["tablo_screen.jpg","tablo_screen.jpg"],["teleport_kamni.jpg","teleport_kamni.jpg"],["teleport_screen.jpg","teleport_screen.jpg"],["trava1.tga","trava1.tga"],["vetki1.tga","vetki1.tga"],["vilka_screen.jpg","vilka_screen.jpg"],["water.jpg","water.jpg"],["water01.jpg","water01.jpg"],["water02.jpg","water02.jpg"],["water03.jpg","water03.jpg"],["water04.jpg","water04.jpg"],["water05.jpg","water05.jpg"],["water06.jpg","water06.jpg"],["water07.jpg","water07.jpg"],["water08.jpg","water08.jpg"],["water09.jpg","water09.jpg"],["water10.jpg","water10.jpg"],["water11.jpg","water11.jpg"],["water12.jpg","water12.jpg"],["water13.jpg","water13.jpg"],["water14.jpg","water14.jpg"],["water15.jpg","water15.jpg"],["water16.jpg","water16.jpg"],["water17.jpg","water17.jpg"],["water18.jpg","water18.jpg"],["water19.jpg","water19.jpg"],["water20.jpg","water20.jpg"],["water21.jpg","water21.jpg"],["water22.jpg","water22.jpg"],["white.jpg","white.jpg"],["yellow.jpg","yellow.jpg"],["zabor_screen.jpg","zabor_screen.jpg"]]);function Tn(n){if(n=my.get(n.toLowerCase())||n,!Nf.has(n)){const e=(n.split(".").pop().toLowerCase()==="tga"?new wm:new Fl).load("./assets/textures/"+n);e.colorSpace=on,e.wrapS=e.wrapT=ka,Nf.set(n,e)}return Nf.get(n)}let vu=null;const Ff=new Map;async function ra(n){if(Ff.has(n))return Ff.get(n);const t=(async()=>{const e=Am(await is("geomobjs/"+n)),i=+e.nummeshes||0,r=[];for(let s=0;s<i;s++){const a=Zu(await oo("geomobjs/"+e["mesh"+s])),o=new Ge,c=new Float32Array(a.T*9),l=new Float32Array(a.T*6);for(let u=0;u<a.T;u++)for(let h=0;h<3;h++){const m=a.idx[u*3+h];{const g=(u*3+h)*3,x=m*3;c[g]=a.pos[x]+a.offset[0],c[g+1]=a.pos[x+2]+a.offset[2],c[g+2]=a.pos[x+1]+a.offset[1]}l[(u*3+h)*2]=a.uv[(u*3+h)*2],l[(u*3+h)*2+1]=a.uv[(u*3+h)*2+1]}if(o.setAttribute("position",new ye(c,3)),o.setAttribute("uv",new ye(l,2)),o.computeVertexNormals(),a.smooth){const u=new Float32Array(a.V*3),h=new O,m=new O,g=new O;for(let p=0;p<a.T;p++){h.fromArray(c,p*9),m.fromArray(c,p*9+3),g.fromArray(c,p*9+6),m.sub(h),g.sub(h),m.cross(g);for(let d=0;d<3;d++){const b=a.idx[p*3+d]*3;u[b]+=m.x,u[b+1]+=m.y,u[b+2]+=m.z}}const x=o.attributes.normal.array;for(let p=0;p<a.T*3;p++){const d=a.idx[p]*3,b=Math.hypot(u[d],u[d+1],u[d+2])||1;x[p*3]=u[d]/b,x[p*3+1]=u[d+1]/b,x[p*3+2]=u[d+2]/b}}for(const[u,h]of[["position",3],["normal",3],["uv",2]]){const m=o.attributes[u].array;for(let g=0;g<a.T;g++)for(let x=0;x<h;x++){const p=(g*3+1)*h+x,d=(g*3+2)*h+x,b=m[p];m[p]=m[d],m[d]=b}}const f=new Nl({map:e["texture"+s]?Tn(e["texture"+s]):null,.../\.tga$/i.test(e["texture"+s]||"")?{side:Fe,alphaTest:128/255,transparent:!0}:{side:pi}});f.side===Fe&&(f.onBeforeCompile=u=>{u.fragmentShader=u.fragmentShader.replace("#include <normal_fragment_begin>",Kt.normal_fragment_begin.replace("gl_FrontFacing ? 1.0 : - 1.0","1.0"))}),o.userData.pv=[a.offset[0],a.offset[2],a.offset[1]],r.push(new pe(o,f))}return r})();return Ff.set(n,t),t}async function gy(n,t,e,i,r,s,a){let o;try{o=await ra(n)}catch{return null}const c=new cn;c.userData.w=i,c.userData.h=r,c.userData.name=n,c.userData.box=n==="box.cgo",c.userData.c=n.startsWith("vorota")?"g":n.startsWith("zamok")?"z":"";for(const l of o)c.add(new pe(l.geometry,l.material));return c.position.set((t+i/2)*ut-a*ut/2,0,(e+r/2)*ut-a*ut/2),c.rotation.y=-Li.degToRad(s),ae.add(c),c}const ft={N:0,f:null,i0:null,i1:null,ie:null},He=[null],Ae=(n,t)=>n<0||t<0||n>=ft.N||t>=ft.N?3:ft.f[t*ft.N+n],c0=(n,t,e)=>{n>=0&&t>=0&&n<ft.N&&t<ft.N&&(ft.f[t*ft.N+n]=e)},rs=(n,t)=>Ae(n,t)|Ae(n-1,t)|Ae(n,t-1)|Ae(n-1,t-1),l0=(n,t)=>Ae(n,t)&Ae(n-1,t)&Ae(n,t-1)&Ae(n-1,t-1),sa=(n,t,e,i)=>{for(const[r,s]of[[n,t],[n-1,t],[n,t-1],[n-1,t-1]])r>=0&&s>=0&&r<ft.N&&s<ft.N&&(ft.f[s*ft.N+r]|=e,i!==void 0&&(ft.ie[s*ft.N+r]=i))},fo=(n,t,e)=>{for(const[i,r]of[[n,t],[n-1,t],[n,t-1],[n-1,t-1]])i>=0&&r>=0&&i<ft.N&&r<ft.N&&(ft.f[r*ft.N+i]&=~e)},_y=n=>"%@Pp<>^vgIÁÇ#".includes(n)?6147:"$Tt".includes(n)?3:"0Oo".includes(n)?4099:n>="1"&&n<="9"?22531:n==="L"?20483:"Qqwr|".includes(n)?2:n==="W"?38915:n==="z"?22531:"kàáí÷ýþÿïðñ".includes(n)?512:0,vy=n=>"g|Á#ïðñ".includes(n)?10:255,yr=Uint8Array.from("101cac1f34bc5ae91b13e859389daa9b82d02d3de48473f9d733667b981a968f94b304df45e05d05023f8ea958550dbef418e67ede422f9025d54993f1f056b70a9fef5211cbfa37d34a974d63ecb6e78c7092e174d4122bfb7a3264ca3c6b89ddc0ab9c2ceeaecda8eb7cc217462a5fb09954bdf5c81e14fe88f7db0e1daf2920ffe24187164348f3fc5000a6b5a021b9a1cc2e4c51f8d180b8e55bed4b5395ba8dc7fd094475406a032706c686f2d6dae3153124d95c61b48aa4309a77266d787f6fa50757015e0bc491723ac360796e760c6971a765add235bbc122a308f6399edc83bf3eea8b36a26cb262c54e8581b17dc9ce2823680f473b4fcf6719d8".match(/../g),n=>parseInt(n,16));let pc=0,mc=0;const f0=()=>(pc=pc+1&255,mc=mc+3&255,yr[pc]<<8|yr[mc]),Is=n=>f0()%n,Na=n=>f0()/32768*n-n,xa=n=>1+Is(n),xy={$:["kust01.cgo",1,1,0],"%":["metalbox.cgo",2,2,0],0:["stone02.cgo",1,1,0],B:["buket.cgo",1,1,0],E:["exit.cgo",4,4,0],F:["flower.cgo",1,1,0],G:["grass1.cgo",1,1,0],O:["stone01.cgo",1,1,0],P:["palm1.cgo",1,1,0],o:["stone03.cgo",1,1,0],p:["palm2.cgo",1,1,0],k:["key.cgo",1,1,0],g:["vorota.cgo",1,1,0],"#":["box.cgo",2,2,0],Á:["bochka.cgo",2,2,0],Ç:["mirror.cgo",2,2,0],à:["bonus_ananas.cgo",1,1,0],á:["batareyka.cgo",1,1,0],í:["bonus_nevidimka.cgo",1,1,0],"÷":["bonus_clock.cgo",1,1,0],ý:["bonus_life025.cgo",1,1,0],þ:["bonus_life05.cgo",1,1,0],ÿ:["bonus_life.cgo",1,1,0],ï:["bomb2.cgo",1,1,0],ð:["bomb2.cgo",1,1,0],ñ:["bomb2.cgo",1,1,0]};async function My(n){var L;const t=oM(await is(n==="menulevel"?"texts/menulevel.txt":"levels/"+n+".lev")),{N:e,grid:i}=t;pc=mc=0,Vt.music=+t.head.music||0,Vt.music===0&&(Vt.music=2+Math.floor(Math.random()*8)),ja(Vt.music),Vt.title=t.head.name,xt.ananasTotal=i.join("").split("à").length-1;const r=(v,_)=>{var w,k;return"wqQ".includes(((w=i[_])==null?void 0:w[v])||".")&&((k=i[_])==null?void 0:k[v])!==void 0};{let v=13,_=128;const w=R=>(v=v+1&255,_=_+3&255,(yr[v]<<8|yr[_])%R),k=Math.trunc(e*ut/50),N=e*ut/2,B=[[],[],[]],j=[[],[],[]];for(let R=0;R<k;R++)for(let V=0;V<k;V++){const U=w(3),rt=R*50-N,q=V*50-N,J=rt+50.01,lt=q+50.01,ht=[rt,q,0,1],G=[J,q,0,2],Y=[J,lt,-1,2],$=[rt,lt,-1,1];for(const F of[ht,G,Y,ht,Y,$])B[U].push(F[0],-.2,F[1]),j[U].push(F[2],F[3])}for(let R=0;R<3;R++){if(!B[R].length)continue;const V=new Ge;V.setAttribute("position",new Je(B[R],3)),V.setAttribute("uv",new Je(j[R],2));const U=new pe(V,new An({map:Tn("dirt0"+(R+1)+".jpg"),side:Fe,depthTest:!1,depthWrite:!1}));U.renderOrder=-10,U.frustumCulled=!1,ae.add(U)}}const s=()=>{const v=He.filter(Tt=>Tt&&"wqQ".includes(Tt.ch)&&Tt.wty!==void 0);if(!v.length)return;const _=e*ut/2,w=(Tt,pt)=>{if(Tt<0||pt<0||Tt>=e||pt>=e||!(ft.f[pt*e+Tt]&4))return 0;const yt=He[ft.i0[pt*e+Tt]];return yt&&yt.wty!==void 0?yt.wty:0},k=Tt=>{const pt=Tt.wty,yt=Tt.wri,ct=[pt===0?120:65,0,0,0];if(ct[1]=ct[2]=ct[3]=ct[0],pt===1?ct[(yt+1)%4]=ct[(yt+2)%4]=ct[(yt+3)%4]=0:pt===2?ct[(yt+2)%4]=ct[(yt+3)%4]=0:pt===3&&(ct[(yt+2)%4]=0),pt===0){const Pt=(Mt,E)=>w(Tt.x+Mt,Tt.y+E)!==0;Pt(1,1)&&(ct[2]=65),Pt(1,-1)&&(ct[1]=65),Pt(-1,-1)&&(ct[0]=65),Pt(-1,1)&&(ct[3]=65),Pt(1,0)&&(ct[1]=ct[2]=65),Pt(-1,0)&&(ct[0]=ct[3]=65),Pt(0,1)&&(ct[2]=ct[3]=65),Pt(0,-1)&&(ct[0]=ct[1]=65)}return ct},N=[];for(let Tt=1;Tt<=22;Tt++)N.push(Tn(Tt<10?"water0"+Tt+".jpg":"water"+Tt+".jpg"));const B=new An({map:N[0],vertexColors:!0,transparent:!0,depthWrite:!1,side:Fe}),j=[],R=[],V=[];for(const Tt of v){const pt=Tt.x*ut-_,yt=Tt.y*ut-_,ct=(Tt.x&1)*.5,Pt=(Tt.y&1)*.5,Mt=k(Tt),E=[[0,0],[1,0],[1,1],[0,1]];for(const M of[0,1,2,0,2,3]){const[H,nt]=E[M];j.push(pt+5*H,-2.3,yt+5*nt),R.push(ct+.5*H,1-(Pt+.5*nt)),V.push(1,1,1,Mt[M]/255)}}const U=new Ge;U.setAttribute("position",new Je(j,3)),U.setAttribute("uv",new Je(R,2)),U.setAttribute("color",new Je(V,4));const rt=new An({map:Tn("water.jpg"),transparent:!0,opacity:90/255,depthWrite:!1,side:Fe}),q=new Float32Array(v.length*48),J=new Float32Array(v.length*32),lt=[];v.forEach((Tt,pt)=>{for(let yt=0;yt<3;yt++)for(let ct=0;ct<3;ct++){const Pt=pt*16+ct+yt*4;lt.push(Pt,Pt+1,Pt+4,Pt+1,Pt+5,Pt+4)}});const ht=new Ge;ht.setAttribute("position",new ye(q,3)),ht.setAttribute("uv",new ye(J,2)),ht.setIndex(lt);const G=new pe(U,B),Y=new pe(ht,rt);G.renderOrder=1,Y.renderOrder=2,G.frustumCulled=Y.frustumCulled=!1,ae.add(G,Y);const $=v.filter(Tt=>Tt.ch!=="w"),F={1:[-2.9,-2.9,-2.5],2:[0,-2.8,-2.5],3:[-2.6,-2.6,-2.5],0:[0,0,-2.5]},tt=new Ht().set(1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1),at=new Ht,st=[],Ot=async Tt=>{const pt=Zu(await oo("geomobjs/"+Tt)),yt=new Float32Array(pt.T*9),ct=new Float32Array(pt.T*6);for(let Mt=0;Mt<pt.T;Mt++)for(let E=0;E<3;E++){const M=pt.idx[Mt*3+E],H=(Mt*3+E)*3,nt=M*3;yt[H]=pt.pos[nt]+pt.offset[0],yt[H+1]=pt.pos[nt+2]+pt.offset[2],yt[H+2]=pt.pos[nt+1]+pt.offset[1],ct[(Mt*3+E)*2]=pt.uv[(Mt*3+E)*2],ct[(Mt*3+E)*2+1]=pt.uv[(Mt*3+E)*2+1]}const Pt=new Ge;return Pt.setAttribute("position",new ye(yt,3)),Pt.setAttribute("uv",new ye(ct,2)),Pt};$.length&&l.push((async()=>{const Tt=new An({map:Tn("kuvshinka.tga"),side:Fe,alphaTest:.5019607843137255,transparent:!0,depthWrite:!0}),pt={1:await Ot("kuvshinka_cvetok.msh"),2:await Ot("kuvshinka_list.msh")};for(const yt of $){const ct=new pe(pt[yt.ch==="Q"?1:2],Tt);ct.matrixAutoUpdate=!1,ct.frustumCulled=!1,ct.renderOrder=3,ae.add(ct),st.push([ct,yt])}})());const kt=(Tt,pt)=>{const yt=Math.PI/180,ct=Math.cos(Tt.rot*yt),Pt=Math.sin(Tt.rot*yt),Mt=(Tt.x+.5)*ut-_,E=(Tt.y+.5)*ut-_,M=[ct,Pt,0,0,-Pt,ct,0,0,0,0,1,0,Mt,E,0,1],H=F[Tt.wty],nt=Tt.rnd;for(let ot=0;ot<4;ot++)M[12+ot]+=H[2]*M[8+ot]+H[1]*M[4+ot]+H[0]*M[ot];{const ot=Math.sin(pt*.005+nt)*5*yt,K=Math.cos(ot),At=Math.sin(ot);for(let dt=0;dt<4;dt++){const _t=M[dt],Wt=M[8+dt];M[8+dt]=K*Wt+At*_t,M[dt]=K*_t-At*Wt}}{const ot=nt*yt,K=Math.cos(ot),At=Math.sin(ot);for(let dt=0;dt<4;dt++){const _t=M[dt],Wt=M[4+dt];M[4+dt]=K*Wt-At*_t,M[dt]=At*Wt+K*_t}}return at.fromArray(M),at.premultiply(tt).multiply(tt)};let Rt=0,D=null;vu={update(Tt){Rt+=D===null?0:Tt-D,D=Tt,B.map=N[Math.floor(Rt/65)%22],v.forEach((pt,yt)=>{const ct=(pt.x&1)+2*(pt.y&1),Pt=pt.x*ut-_,Mt=pt.y*ut-_;for(let E=0;E<4;E++)for(let M=0;M<4;M++){const H=.4*Math.sin(Rt*.005+M*6.2831855/3)*Math.cos(Rt*.005+E*6.2831855/3),nt=yt*16+M+E*4;q[nt*3]=Pt+M*5/3,q[nt*3+1]=-2.3+H,q[nt*3+2]=Mt+E*5/3,J[nt*2]=Rt*2e-4+(M/3+(ct&1))*.5,J[nt*2+1]=1-(Rt*1e-4+(E/3+(ct>>1))*.5)}}),ht.attributes.position.needsUpdate=!0,ht.attributes.uv.needsUpdate=!0;for(const[pt,yt]of st)pt.matrix.copy(kt(yt,Rt)),pt.matrixWorldNeedsUpdate=!0}}},a=(t.head.sun||"(0.4,0.3,-1)").match(/-?[\d.]+/g).map(Number),o=Math.hypot(...a)||1,c=new Sm(16777215,Math.PI);c.position.set(-a[0]/o,a[2]/o,-a[1]/o).multiplyScalar(100),ae.add(c),ae.add(new bm(16777215,Math.PI*.2)),o0.setSun(a[0],a[1],a[2]);const l=[],f=new Set,u=[];for(let v=0;v<e;v++)for(let _=0;_<e;_++)if(i[v][_]==="M"){f.add(_+","+(v+1));const w=+((L=i[v+1])==null?void 0:L[_]);u.push({x:_,y:v,type:w>=1&&w<=4?w:1,face:{v:2,"<":4,"^":6}[i[v][_+1]]||0})}ft.N=e,ft.f=new Uint16Array(e*e),ft.i0=new Uint16Array(e*e),ft.i1=new Uint16Array(e*e),ft.ie=new Uint8Array(e*e),He.length=1;const h={has:v=>{const[_,w]=v.split(",").map(Number);return(Ae(_,w)&180)!==0}},m=(v,_,w,k)=>{for(let N=0;N<k;N++)for(let B=0;B<w;B++)ft.f[(_+N)*e+v+B]|=16},g=(v,_,w,k,N,B,j)=>{if(_<0||w<0||_>=e||w>=e||Ae(_,w)&180)return null;j=j===void 0?g.c:j,g.last=null;const R={ch:j,x:_,y:w,w:k,h:N,cnt:0,thr:vy(j),touched:0,active:0,moving:0,links:[0,0,0],mesh:null,rot:B};He.push(R);const V=He.length-1;g.last=R,R.id=V;const U="#%ÁÇ".includes(j);let rt=_y(j)&-9;rt|=U?128:4,R.rec=rt,R.off={x:0,z:0};for(let J=0;J<N;J++)for(let lt=0;lt<k;lt++){const ht=(w+J)*e+_+lt;_+lt>=e||w+J>=e||(ft.f[ht]=rt,U?ft.i1[ht]=V:ft.i0[ht]=V)}if(j==="E"){R.thr=255;for(const[J,lt]of[[0,0],[3,0],[0,3],[3,3]])ft.f[(w+lt)*e+_+J]|=3}const q=gy(v,_,w,k,N,B,e);return l.push(q),q.then(J=>{R.mesh=J,J&&(J.userData.ob=R)}),q},x=(v,_,w)=>[[1,0],[-1,0],[0,1],[0,-1]].map(([k,N])=>{var B;return((B=i[_+N])==null?void 0:B[v+k])===w});for(let v=0;v<e;v++)for(let _=0;_<e;_++){const w=i[v][_];if(w==="I"){const[k,N,B,j]=x(_,v,"I");((k||N)&&(B||j)||["g","z"].some(R=>x(_,v,R).some(Boolean)))&&g("paling_stolb.cgo",_,v,1,1,180,"I")}else if(w==="W"){const[k,N,B,j]=x(_,v,"W"),R=+N-+!k+(2-+!B)+ +j;((k||N)&&(B||j)||R===1||!(k||N||B||j))&&g("kirpich_bashnya.cgo",_,v,1,1,180,"W")}}const p=(v,_)=>{var w;return(w=i[_])==null?void 0:w[v]},d={$:["kust01.cgo",1,1,0],"%":["metalbox.cgo",2,2,0],G:["grass1.cgo",1,1,0],E:["exit.cgo",4,4,0],"<":["strelka.cgo",1,1,180],">":["strelka.cgo",1,1,0],"^":["strelka.cgo",1,1,-90],v:["strelka.cgo",1,1,90]},b={B:"buket.cgo",F:"flower.cgo",P:"palm1.cgo",p:"palm2.cgo"},A={"&":["oduvan",2,3,""],"*":["paporotnik",2,3,""],"@":["penek",3,4,""],T:["tree",2,4,""],t:["tree",2,4,"dry"]},y={0:"stone02",O:"stone01",o:"stone03"},I=(v,_,w,k,N,B)=>{const j=I.x,R=I.y;if(p(j+1,R)===v)for(let V=0;p(j+V,R)===v;V++)g(_(),j+V,R,1,1,w);for(let V=0;p(j,R+V)===v;V++)g(k(),j,R+V,1,1,N)};for(let v=0;v<e;v++)for(let _=0;_<e;_++){const w=i[v][_];if(!(!w||w==="."||h.has(_+","+v))){if(g.c=w,I.x=_,I.y=v,w==="M"){m(_,v,2,2);continue}if(Wd[w]){const k=g(xy[w][0],_,v,1,1,0),N=g.last;k&&l.push(k.then(B=>{if(B){const j={ï:2,ð:1,ñ:0}[w];j!==void 0&&B.traverse(R=>{R.isMesh&&(R.material=R.material.clone(),R.material.map=Tn(po[j].tex))}),uo.push({o:B,c:w,taken:!1,ob:N})}}));continue}if(d[w]){const[k,N,B,j]=d[w];g(k,_,v,N,B,j)}else if(b[w])g(b[w],_,v,1,1,Na(180));else if(A[w]){const[k,N,B,j]=A[w],R=k+xa(N)+j+".cgo";g(R,_,v,1,1,Is(B)*90)}else if(y[w]){const k=p(_,v+1)===w&&p(_+1,v)===w,B=y[w]+(k?"":"a")+".cgo";g(B,_,v,k?2:1,k?2:1,Is(4)*90)}else if(w==="I")I(w,()=>"paling0"+xa(2)+".cgo",180,()=>"paling0"+xa(2)+"_bok.cgo",-90);else if(w==="|")I(w,()=>"zabor0"+xa(4)+".cgo",180,()=>"zabor0"+xa(4)+"_bok.cgo",-90);else if(w==="W")I(w,()=>"kirpich_base_opt.cgo",180,()=>"kirpich_base.cgo",90);else if(w==="r")I(w,()=>"reshetka.cgo",180,()=>"reshetka_bok.cgo",270);else if(w==="g")p(_+1,v)==="g"?g("vorota.cgo",_,v,2,1,180):p(_,v+1)==="g"&&g("vorota.cgo",_,v,1,2,270);else if(w==="z")p(_+1,v)==="z"?g("zamok.cgo",_,v,4,1,p(_+3,v)==="^"?0:180):p(_,v+1)==="z"&&g("zamok.cgo",_,v,1,4,p(_,v+3)===">"?90:270);else if(w==="L")g("lazer.cgo",_,v,2,2,{">":1,"^":0,"<":3,v:2}[p(_+1,v)]*90||0);else if(w>="1"&&w<="9")g("tablo.cgo",_,v,1,1,180);else if(w==="Á")g("bochka.cgo",_,v,2,2,Na(10));else if(w==="Ç")g("mirror.cgo",_,v,2,2,p(_+1,v)==="/"?90:0);else if("wqQ".includes(w)){const k=(q,J)=>r(_+q,v+J),N=k(1,0),B=k(-1,0),j=k(0,1),R=k(0,-1);let V=0,U=0;N||R||!B||!j?B||R||!N||!j?B||j||!N||!R?N||j||!B||!R?N&&B&&!j?(V=0,U=2):N&&B&&!R?(V=180,U=2):R&&j&&!B?(V=90,U=2):R&&j&&!N?(V=270,U=2):N&&j&&!k(1,1)?(V=0,U=3):N&&R&&!k(1,-1)?(V=270,U=3):B&&R&&!k(-1,-1)?(V=180,U=3):B&&j&&!k(-1,1)&&(V=90,U=3):(V=0,U=1):(V=90,U=1):(V=180,U=1):(V=270,U=1);const rt=g(U===0?"bottom0.cgo":"bottom"+U+(Is(2)===1?"":"a")+".cgo",_,v,1,1,V);rt&&(g.last.wty=U,g.last.wri=V/90,rt.then(q=>{q&&(q.visible=!1)}))}}}for(let v=0;v<e;v++)for(let _=0;_<e;_++)if(i[v][_]==="#"&&Ae(_,v)===0){const w=[[1,0],[1,1],[0,1]].map(([k,N])=>Ae(_+k,v+N)&512?ft.i0[(v+N)*e+_+k]:0);g.c="#",g("box.cgo",_,v,2,2,0,"#"),g.last&&(g.last.links=w)}for(let v=0;v<e;v++)for(const[_,w]of[[v,0],[v,e-1],[0,v],[e-1,v]])ft.f[w*e+_]|=3;for(const v of He)v&&(Wd[v.ch]&&(v.pt=Na(1e3),v.pa=Is(360)),v.rnd=Is(1e4));s(),await Promise.all(l),Vt.N=e,Vt.grid=i.map(v=>v.split("")),Vt.tips=await tS(n),gS(),xt.ammo=[+t.head.numbombs||0,+t.head.numradiobombs||0,+t.head.numgrenades||0];for(const v of u)await gc(v,e);let P=12,C=41;for(let v=0;v<e;v++){const _=i[v].indexOf("Ã");_>=0&&(P=_,C=v)}T.start={x:(P+1)*ut-e*ut/2,z:(C+1)*ut-e*ut/2},await Hy(T.start.x,T.start.z),_u=await py(T).catch(()=>null)}const Vt={N:0,grid:[]},uo=[],tn=[],Wd={k:1,à:1,á:1,í:1,"÷":1,ý:1,þ:1,ÿ:1,ï:1,ð:1,ñ:1},zr=300,xt={keys:0,hp:1,ananas:0,ananasTotal:0,energy:0,bombs:0,time:0,invis:0,msg:""},yy={1:["vilka","vilka_screen.jpg",{idle:"vilka_pause",run:"vilka_run",atk:"vilka_ataka",fid:"vilka_perekrest",shock:"vilka_shock"},.8],2:["sniper","snayper_screen.jpg",{idle:"sniper_pause",run:"sniper_beg",atk:"sniper_ataka",fid:"sniper_perekrest",shock:"sniper_shock"},.45],3:["dlinnyi","dlinnyi_screen.jpg",{idle:"dlinnyi_pause",run:"dlinnyi_beg",atk:"dlinnyi_ataka",fid:"dlinnyi_perekrest",shock:"dlinnyi_shock"},.5],4:["bugai","bugai_screen.jpg",{idle:"bugai_pause",run:"bugai_run",atk:"bugai_attack",fid:"bugai_perekrest",shock:"bugai_shock"},.7]};async function gc(n,t){const[e,i,r,s]=yy[n.type],a=new th(await Ju("characters/"+e+".skl"),i),o={};for(const u in r)o[u]=await Qu("animations/"+r[u]+".anm");a.play(o.idle),a.update(0);const c=new cn;c.add(a.mesh),c.scale.setScalar(T.SCALE),c.position.set((n.x+1)*ut-t*ut/2,0,(n.y+1)*ut-t*ut/2);const l=-(Math.PI/4)*(n.face||0);c.rotation.y=l,ae.add(c);const f=n.face||0;tn.push({o:c,ch:a,anims:o,state:0,active:!0,speed:s,type:n.type,home:c.position.clone(),hp:[25,50,50,50][n.type-1],sight:[35,85,75,60][n.type-1],dmg:[30,50,1,30][n.type-1],h:f,yaw:l,yawT:l,turnT:0,turnW:0,t:0,sx:0,sz:0,alert:!1,hit:!1,acnt:0,dcnt:0,shots:0,shotT:0,sflag:!1,sidleN:3,sidle:6,cx:n.x+1,cy:n.y+1,fx:n.x+1,fy:n.y+1,id:gc.n=(gc.n||0)+1}),sa(n.x+1,n.y+1,16,gc.n)}const Pe=33,Me={VILKA:1,SNIPER:2,DLINNYI:3,BUGAI:4},se=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],Cn=se.map(([n,t])=>{const e=Math.hypot(n,t);return[n/e,t/e]});let Of=0,kf=0,zf=0;const ch=()=>(Of=Of+1&255,kf=kf+3&255,yr[Of]<<8|yr[kf]),Zr=n=>ch()%n,ln=n=>(zf=zf+23&255,n>0?yr[zf]%n:0),an=(n,t)=>t<0?Math.ceil(n):Math.floor(n),li=n=>(n%8+8)%8,ss=()=>Vt.N*ut/2,zl=()=>{const n=ss(),t=T.obj.position,e=se[T.dirI??0];return[an((t.x+n)/ut,-e[0]),an((t.z+n)/ut,-e[1])]},Ui=(n,t,e)=>(rs(t,e)&(n.type===Me.DLINNYI?9842:1618))===0;function Xd(n){const t=n.o.position,e=T.obj.position,i=e.x-t.x,r=e.z-t.z,s=Math.hypot(i,r);n.dist=s,n.dir=s>1e-6?[i/s,r/s]:[0,0]}function to(n){let t=0,e=1e9;for(let i=0;i<8;i++){const r=Math.hypot(Cn[i][0]-n[0],Cn[i][1]-n[1]);r<e-1e-9&&(e=r,t=i)}return t}function Ze(n,t){t=li(t),n.h=t;let i=-(Math.PI/4)*t-n.yaw;for(;i>Math.PI;)i-=2*Math.PI;for(;i<-Math.PI;)i+=2*Math.PI;n.yawT=n.yaw+i,n.turnW=i/.2,n.turnT=.2}function ee(n,t){const e=n.anims,i=r=>r.F*r.ms;switch(t){case 0:n.t=i(e.idle),n.ch.play(e.idle,!0);break;case 1:n.ch.play(e.run,!0);break;case 2:n.ch.play(e.atk,!1),n.t=i(e.atk),n.type===Me.SNIPER&&(n.alert=!1);break;case 3:n.ch.play(e.fid,!1),n.t=i(e.fid);break;case 4:n.ch.play(e.idle,!0),n.t=1e3;break;case 6:n.ch.play(e.shock,!1,100),n.t=i(e.shock);break}n.state=t}const u0=(n,t)=>n.dist<=n.sight&&Math.hypot(Cn[t][0]+n.dir[0],Cn[t][1]+n.dir[1])>=1.5;function Ml(n){const t=ss(),e=n.o.position,i=Math.trunc(n.dist/2.5);for(let r=0;r<i;r++){const s=Math.trunc((e.x+n.dir[0]*r*2.5+t)/ut),a=Math.trunc((e.z+n.dir[1]*r*2.5+t)/ut);if(Ae(s,a)&4112)return!1}return!0}function Sy(n){const t=ss(),e=n.o.position,i=Math.trunc(n.dist/2.5);for(let r=0;r<i;r++){const s=Math.trunc((e.x+n.dir[0]*r*2.5+t)/ut),a=Math.trunc((e.z+n.dir[1]*r*2.5+t)/ut);if(Ae(s,a)&18)return!1}return!0}function by(n){const[t,e]=zl(),i=n.cx,r=n.cy;if(Math.abs(t-i)>30||Math.abs(e-r)>30)return!1;const s=new Map,a=(u,h)=>u*4096+h;s.set(a(t,e),0);const o=[[t,e]];for(let u=0;u<o.length;u++){const[h,m]=o[u],g=s.get(a(h,m));if(h===i&&m===r)break;for(const[x,p]of se){const d=h+x,b=m+p;Math.abs(d-t)>30||Math.abs(b-e)>30||s.has(a(d,b))||!(d===i&&b===r)&&!Ui(n,d,b)||(s.set(a(d,b),g+1),o.push([d,b]))}}const c=s.get(a(i,r));if(c===void 0)return!1;let l=-1,f=1e9;for(let u=0;u<8;u++){const h=s.get(a(i+se[u][0],r+se[u][1]));if(h===void 0||h>=c)continue;const m=Math.hypot(Cn[u][0]-n.dir[0],Cn[u][1]-n.dir[1]);m<f&&(f=m,l=u)}return l>=0&&Ze(n,l),!0}function eo(n){const t=xt.hp<=0,e=xt.invis>0;if(t||n.type===Me.BUGAI&&e)return n.alert=!1,0;n.type===Me.DLINNYI&&e&&(n.alert=!1);const i=u0(n,n.h)&&!e,r=Ml(n);return i&&(n.type===Me.DLINNYI||r)&&(n.alert=!0),n.alert&&(n.alert=by(n)),!i||!r||n.dist>(n.type===Me.BUGAI?14.5:25)?n.alert?1:0:(ee(n,2),2)}function lh(n){if(xt.invis>0||xt.hp<=0||!u0(n,n.h)||!Sy(n))return 0;Ze(n,to(n.dir));const t=ss(),e=T.obj.position,i=an((e.x+t)/ut,-n.dir[0]),r=an((e.z+t)/ut,-n.dir[1]);return Math.abs(n.cx-i)<3&&Math.abs(n.cy-r)<3?(ee(n,2),2):1}function lr(n){const t=n.type===Me.VILKA?[0,2,4,6]:[0,1,2,3,4,5,6,7],e=t.filter(s=>Ui(n,n.cx+se[s][0],n.cy+se[s][1]));if(!e.length)return n.type===Me.VILKA?ee(n,0):ee(n,ln(2)?0:3),!1;let i,r=0;for(;i=e[ln(e.length)],r++,!(r>(n.type===Me.VILKA,2)||[1,2,7,6].some(s=>i===li(n.h+s))););return Ze(n,i),!0}function Nr(n){ln(4)===0&&ee(n,n.type===Me.VILKA||ln(2)?0:3)}function h0(n){const t=ss(),e=n.o.position,i=Cn[n.h],r=[0,.8,.45,.5,.7][n.type],s=n.h&1?1.43:1.01;n.sx=i[0]*r,n.sz=i[1]*r;const a=an((e.x+i[0]*s*ut+t)/ut,i[0]),o=an((e.z+i[1]*s*ut+t)/ut,i[1]);if(!Ui(n,a,o)){const x=an((e.x+i[0]*s*ut/2+t)/ut,i[0])*ut-t,p=an((e.z+i[1]*s*ut/2+t)/ut,i[1])*ut-t;if(n.sx=x-e.x,n.sz=p-e.z,n.type===Me.VILKA){Nr(n),lr(n);return}if((n.type===Me.BUGAI||n.type===Me.DLINNYI)&&n.hit){ee(n,6);return}if(n.type===Me.SNIPER){Fa(n)!==2&&(m0(n),g0(n));return}n.alert?eo(n):(lr(n),Nr(n));return}const c=an((e.x+n.sx+t)/ut,i[0]),l=an((e.z+n.sz+t)/ut,i[1]),f=an((e.x+t)/ut,i[0]),u=an((e.z+t)/ut,i[1]);if(c===f&&l===u)return;if(n.cx=c,n.cy=l,n.type===Me.SNIPER){if(Fa(n)!==0)return;const p=Ui(n,c+se[li(n.h+2)][0],l+se[li(n.h+2)][1]),d=Ui(n,c+se[li(n.h+6)][0],l+se[li(n.h+6)][1]);n.alert||(!(p&&d)||ln(n.sidleN)!==0||n.h&1?(d||p)&&ln(12)===0&&(p&&!d?Ze(n,n.h+2):!p&&d&&Ze(n,n.h+6)):ee(n,3));return}if((n.type===Me.BUGAI||n.type===Me.DLINNYI)&&n.hit){ee(n,6);return}const h=n.h,m=n.type===Me.VILKA?lh(n):eo(n);if(m===2||n.h!==h||m!==0&&n.type===Me.VILKA)return;const g=x=>{const p=se[li(n.h+x)];return Ui(n,c+p[0],l+p[1])&&!Ui(n,f+p[0],u+p[1])};g(2)&&g(6)&&ee(n,3)}function d0(n){return n.type===Me.VILKA?lh(n):eo(n)}function jd(n,t){n.sx=n.sz=0,n.type===Me.BUGAI&&!t&&n.t>=500&&n.t<500+Pe&&ln(3)===0&&jt("bugaystand",n.o.position),d0(n)===0?(n.hit&&(ee(n,6),n.type===Me.VILKA&&(n.hit=!1)),n.t<1?(ee(n,1),t&&lr(n)):n.t-=Pe):n.state!==2&&ee(n,1)}function Ey(n){n.sx=n.sz=0,n.t<1?(n.hit=!1,n.dist<n.sight&&Ze(n,to(n.dir)),d0(n)!==2&&ee(n,1)):n.t-=Pe}function wy(n){n.sx=n.sz=0;const t=n.anims.atk,e=t.F*t.ms,i=xt.hp<=0,r=xt.invis>0,s=o=>{xt.hp<=0||(Bl(o),xt.hp=Math.max(0,xt.hp-o/zr),kl(()=>Zr(3)))},a=()=>n.dist<14.15&&Math.hypot(Cn[n.h][0]-n.dir[0],Cn[n.h][1]-n.dir[1])<.5;if(n.type===Me.BUGAI){for(const o of[.3,.7])n.t>=e*o&&n.t<e*o+Pe&&a()&&(jt("bugaykick",n.o.position),s(n.dmg));for(const o of[.4,.8])n.t>=e*o&&n.t<e*o+Pe&&jt("bugaymah",n.o.position);if(Ze(n,to(n.dir)),i){Ze(n,ln(8)),ee(n,ln(2)?0:3);return}if(r){ee(n,3);return}if(!Ml(n)||n.dist>14.5){ee(n,1);return}if(n.t<1){const o=eo(n);o===1?(n.acnt=0,ee(n,1)):o===0?(n.acnt=0,ee(n,1),lr(n),Nr(n)):(n.acnt++,n.acnt>3&&(n.acnt=0,ee(n,1),Ze(n,n.h+4),n.alert=!1,lr(n),Nr(n)))}else n.t-=Pe}else if(n.type===Me.VILKA)if(n.t>=e*.2&&n.t<e*.2+Pe&&a()&&s(n.dmg),n.t>299&&n.t<300+Pe&&jt("vilkaataka",n.o.position),n.t<1){const o=lh(n);o===1?(n.acnt=0,ee(n,1)):o===0?(n.acnt=0,ee(n,1),lr(n),Nr(n)):(n.acnt++,n.acnt>2&&(n.acnt=0,ee(n,1),Ze(n,n.h+4),lr(n),Nr(n)))}else n.t-=Pe;else if(n.type===Me.DLINNYI){if(n.t<e-200&&s(1),n.dcnt===0&&jt("dlinnyataka",n.o.position),n.dcnt+=Pe,n.dcnt>175&&(n.dcnt=0),Ze(n,to(n.dir)),i){Ze(n,ln(8)),ee(n,ln(2)?0:3);return}if(r){ee(n,3);return}if(n.dist>25*1.2||!Ml(n)){ee(n,1);return}if(n.t<1){const o=eo(n);o!==2&&(ee(n,1),o===0&&(lr(n),Nr(n)))}else n.t-=Pe}}function xu(n,t){for(let e=0;e<=24;e++){const i=n.cx+se[t][0]*e,r=n.cy+se[t][1]*e,[s,a]=zl();if(s===i&&a===r&&xt.invis<=0&&xt.hp>0)return 0;const o=rs(i,r);if(o&1)return(e<5)+3;if(o&16)return 1}return 2}function p0(n,t){if(n.dist>n.sight)return 0;if(!n.alert){if(Math.hypot(Cn[t][0]+n.dir[0],Cn[t][1]+n.dir[1])>=1.5&&Ml(n)){const[e,i]=zl(),r=Math.abs(e-n.cx),s=Math.abs(i-n.cy),a=o=>Ui(n,n.cx+se[o][0],n.cy+se[o][1])?(Ze(n,o),!0):!1;if(r<s){if(!a(n.cx<e?0:4))return 0}else if(!a(n.cy<i?2:6))return 0;return n.alert=!0,1}return 0}return n.dist<1.4&&(n.alert=!1),0}function Fa(n){let t=xu(n,n.h);if(n.h&1&&(t=4),t===0)return n.shots===3?(n.shots=0,0):(ee(n,2),n.shots++,2);if(!(n.shotT<=6e3||n.alert||t===4||t===1))return ee(n,2),n.shotT=0,2;if(n.alert)for(const e of[2,6]){const i=li(n.h+e);if(xu(n,i)===0)return Ze(n,i),ee(n,2),2}return n.sflag?(Ze(n,to(n.dir)),n.sflag=!1,1):p0(n,n.h)?1:0}function m0(n){n.alert=!1;const t=[0,1,2,3,4,5,6,7].filter(r=>Ui(n,n.cx+se[r][0],n.cy+se[r][1]));if(!t.length){ee(n,0);return}let e,i=0;for(;e=t[ln(t.length)],i++,!(i>5||[1,2,7,6].some(r=>e===li(n.h+r))););Ze(n,e)}function g0(n){n.alert=!1,ln(n.sidle)===0&&ee(n,0)}const Oa=[];function Ty(n){const t=n.o.position,e=Cn[n.h],i=new Ve;i.position.set(t.x+e[0]*3,8*T.SCALE,t.z+e[1]*3),Oa.push({m:i,dx:e[0],dz:e[1],dmg:n.dmg,ph:0});const r=new O(i.position.x+e[0]*2,i.position.y,i.position.z+e[1]*2);dn(4,r.x,r.y,r.z),jt("snipershot",r)}const _0=new Array(2048).fill(null);let Bf=0;const sr=new Yt,mt=n=>ch()/32768*n-n,Dt=n=>ch()*n/65536;function dn(n,t,e,i){const r={life:2e3,x:t,y:e,z:i,vx:0,vy:0,vz:0,ang:0,av:0,size:0,sv:0,c:[1,1,1,1],cv:[0,0,0,0],g:0,frame:0,blend:0,type:n};switch(n){case 3:r.vx=mt(.007),r.vz=mt(.007),r.vy=.01,r.ang=mt(20)-90,r.av=mt(.1),r.size=Dt(.6)+3,r.sv=-.0035,r.c=[1,Dt(.5)+.2,Dt(.5)+.2,1],r.g=mt(5e-4)-.001,r.frame=61,r.blend=2;break;case 0:r.vx=mt(.003),r.vz=mt(.003),r.vy=-.003,r.size=Dt(1)+5,r.sv=-.0055,r.c=[Dt(1),Dt(1),Dt(1),1],r.g=mt(2e-4)+7e-4,r.frame=62,r.life=2e3;break;case 1:r.vx=mt(.002),r.vz=mt(.002),r.vy=-.006,r.size=Dt(2)+4,r.sv=-.0084,r.c=[Dt(1),Dt(1),Dt(1),1],r.g=mt(1e-4)+.0015,r.frame=62,r.life=2e3;break;case 4:r.life=2e4,r.av=40,r.size=14,r.sv=-.015,r.cv=[-4e-4,-4e-4,-4e-4,0],r.frame=54,r.blend=0;break;case 5:case 6:case 7:r.life=1500,r.vx=mt(.009),r.vz=mt(.009),r.vy=mt(.005)+.035,r.ang=-90,r.av=mt(.01),r.size=n===5?Dt(.5)+2.5:Dt(.7)+2.8,r.sv=n===5?-.002:-.0022,r.c=n===6?[1,.8,.8,1]:[.8,.8,1,1],r.g=mt(.001)-.002,r.frame=53,r.blend=0;break;case 10:r.vx=mt(.007),r.vz=mt(.007),r.vy=.01,r.ang=mt(20)-90,r.av=mt(.1),r.size=Dt(.8)+4,r.sv=-.004,r.c=[Dt(.3)+.5,Dt(.3)+.5,1,1],r.g=mt(5e-4)-.001,r.frame=63,r.blend=0;break;case 2:r.vx=mt(.002),r.vz=mt(.002),r.vy=-.004,r.size=Dt(.6)+3,r.sv=-.003,r.c=[Dt(1),Dt(1),Dt(1),1],r.g=mt(1e-4)+4e-4,r.frame=62,r.blend=0;break;case 8:r.vx=mt(.004),r.vz=mt(.004),r.vy=-.001,r.av=mt(.1),r.size=Dt(.5)+4,r.sv=Dt(.009)+.01,r.c=[.85,.85,.85,.85];{const s=mt(7e-4)-.002;r.cv=[s,s,s,s]}r.g=mt(1e-4)+5e-4,r.frame=55,r.blend=3;break;case 9:r.vx=mt(.01),r.vz=mt(.01),r.vy=.01,r.ang=mt(20)-90,r.av=mt(.1),r.size=Dt(1)+3,r.sv=-.006,r.c=[Dt(.3)+.5,Dt(.3)+.5,1,1],r.g=mt(5e-4)-.001,r.frame=63,r.blend=0;break;case 11:r.vy=Dt(.02),r.vx=mt(.004),r.vz=mt(.004),r.ang=mt(100),r.av=mt(.01),r.size=mt(1)+3,r.sv=mt(.001)-.002,r.cv=[0,0,0,mt(3e-4)-.001],r.life=1e3,r.ph=Dt(100),r.frame=52,r.blend=2;break;case 15:r.vx=mt(.009),r.vz=mt(.009),r.vy=.003,r.size=Dt(1)+5,r.sv=-.0055,r.c=[Dt(1),Dt(1),Dt(1),1],r.g=mt(2e-4)-4e-4,r.frame=62,r.blend=0;break;case 16:r.vx=mt(.007),r.vz=mt(.007),r.vy=.01,r.ang=mt(20)-90,r.av=mt(.1),r.size=Dt(2)+6,r.sv=-.02,r.c=[Dt(.2)+.8,Dt(.3)+.5,Dt(.3)+.5,1],r.g=mt(5e-4)-.001,r.frame=62,r.blend=0;break;case 17:r.vx=mt(.01),r.vz=mt(.01),r.vy=.003,r.size=Dt(1)+4,r.sv=-.0015,r.c=[Dt(1),Dt(1),Dt(1),1],r.life=5e3,r.g=mt(2e-4)-2e-4,r.frame=62,r.blend=0;break;case 12:r.vx=mt(.004),r.vz=mt(.004),r.vy=.004,r.av=mt(100),r.size=Dt(.5)+2.7,r.sv=-.0045,r.c=[Dt(.1)+.9,Dt(.1)+.9,1,1],r.life=2e3,r.g=mt(5e-4)-.001,r.frame=60,r.blend=0;break;case 13:r.vx=mt(.012),r.vz=mt(.012),r.vy=mt(.01)+.006,r.av=mt(100),r.size=Dt(1.9)+2.4,r.sv=-.006-Dt(.003),r.c=[Dt(.1)+.9,Dt(.1)+.9,1,1],r.life=2e3,r.g=mt(6e-4)-.0015,r.frame=60,r.blend=0;break;case 14:r.vx=mt(.02),r.vz=mt(.02),r.vy=mt(.005)+.033,r.ang=-90,r.av=mt(2),r.size=Dt(.5)+1.5,r.sv=-.0023,r.c=[1,.8,.8,1],r.life=1500,r.g=mt(.001)-.003,r.frame=52,r.blend=2;break}_0[Bf]=r,Bf=Bf+1&2047}function Bl(n){if(xt.hp<=0)return;const t=T.obj.position;T.ch&&(T.ch.eyeHit=!0);for(let e=0;e<n/4;e++)dn(3,t.x,t.y+mt(2)+4,t.z)}function Ay(n,t){const e=n.o.position,i=[5,6,7,7][n.type-1];for(let r=0;r<t/3+8;r++)dn(i,e.x,e.y+mt(4)+5,e.z)}function v0(n){const t=n*1e3;for(let e=0;e<2048;e++){const i=_0[e];if(!i||!(i.life>0))continue;const r=s=>(Math.round(255*s)&255)/255;if(i.type===11){const s=i.ph/100*((1e3-i.life)/70),a=i.life/200+i.ph,o=i.x+Math.sin(a)*s,c=i.z+Math.cos(a)*s,l=r(i.c[3]);sr.setRGB(1,1,1),di(o,i.y,c,i.ang,i.size,sr,i.blend,i.frame,l),sr.setRGB(l,l,l),di(o,i.y,c,0,i.size*3,sr,0,54),i.ang+=t*i.av,i.size+=t*i.sv,i.size<0&&(i.life=0),i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<0&&(i.y=0,i.vy=-i.vy*.8),i.life-=t;for(let f=0;f<4;f++)i.c[f]+=t*i.cv[f];i.c[3]<0&&(i.life=0);continue}sr.setRGB(r(i.c[0]),r(i.c[1]),r(i.c[2])),di(i.x,i.y,i.z,i.ang,i.size,sr,i.blend,i.frame,r(i.c[3])),i.type===14&&(sr.setRGB(r(i.c[3]),r(i.c[3]),r(i.c[3])),di(i.x,i.y,i.z,0,i.size*3,sr,0,54)),i.ang+=t*i.av,i.size+=t*i.sv,i.size<0&&(i.life=0),i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<0&&(i.y=0,i.vy=-i.vy*.8),i.vy+=t*i.g*.05,i.life-=t;for(let s=0;s<4;s++)i.c[s]+=t*i.cv[s];i.frame===55&&i.c[3]<0&&i.blend===3&&(i.life=0)}}function Ry(n){const t=Ds/Pe,e=new Yt(200/255,0,0),i=new Yt(1,1,1);for(const r of Oa){const s=r.m.position.x+r.dx*2*t,a=r.m.position.y,o=r.m.position.z+r.dz*2*t;di(s,a,o,0,4,i,0,54),di(s,a,o,mt(100),Math.sin(r.ph*.02)+3,e,0,53),r.ph+=n}}function Cy(){const n=ss();for(const t of Oa.slice()){const e=t.m;e.position.x+=t.dx*2,e.position.z+=t.dz*2;const i=an((e.position.x+n)/ut,t.dx),r=an((e.position.z+n)/ut,t.dz),s=()=>{ae.remove(e),Oa.splice(Oa.indexOf(t),1)};if(i<0||r<0||i>Vt.N||r>Vt.N){s();continue}const a=rs(i,r);if(a&1){jt("bulletend",e.position),dn(4,e.position.x,e.position.y,e.position.z);for(let f=0;f<t.dmg/2;f++)dn(10,e.position.x,e.position.y,e.position.z);s();continue}const o=T.obj.position;if(a&32&&xt.hp>0&&Math.hypot(o.x-e.position.x,o.z-e.position.z)<2.5){jt("bulletend",e.position),Bl(t.dmg),xt.hp=Math.max(0,xt.hp-t.dmg/zr),kl(()=>Zr(3)),dn(4,e.position.x,e.position.y,e.position.z);for(let f=0;f<t.dmg/2;f++)dn(10,e.position.x,e.position.y,e.position.z);s();continue}const c=[[i,r],[i-1,r],[i,r-1],[i-1,r-1]].map(([f,u])=>Ae(f,u)&16?ft.ie[u*ft.N+f]:-1).find(f=>f>=0),l=a&16&&tn.find(f=>f.id===c&&f.hp>0&&Math.hypot(f.o.position.x-e.position.x,f.o.position.z-e.position.z)<2.5);l&&(jt("bulletend",e.position),fh(l,t.dmg),s())}}function fh(n,t){n.hit=!0,n.hp=Math.max(0,n.hp-t),Ay(n,t),performance.now()<(n.painUntil||0)||(jt(["vilkapunish","sniperpunish","dlinnypunish","bugaypunish"][n.type-1],n.o.position),n.painUntil=performance.now()+500)}function Py(n){n.shotT+=Pe,n.hit&&(ee(n,6),n.hit=!1);const t=n.anims;switch(n.state){case 0:n.sx=n.sz=0,Fa(n)===0?n.t<1?ee(n,1):n.t-=Pe:n.state!==2&&ee(n,1);break;case 1:h0(n);break;case 2:{n.sx=n.sz=0;const e=t.atk.F*t.atk.ms;n.t>=e*.8&&n.t<e*.8+Pe&&Ty(n),n.t<1?Fa(n)===0&&(ee(n,1),m0(n),g0(n)):n.t-=Pe}break;case 3:{n.sx=n.sz=0;const e=t.fid.F*t.fid.ms,i=e*.33,r=e*.67,s=a=>{const o=li(n.h+a);return xu(n,o)===0?(Ze(n,o),ee(n,2),!0):p0(n,o)?(ee(n,1),!0):!1};if(n.t>=i&&n.t<i+Pe){if(s(2))return}else if(n.t>=r&&n.t<r+Pe&&s(6))return;n.t<1?ee(n,1):n.t-=Pe}break;case 6:n.sx=n.sz=0,n.t<1?(n.sflag=!0,Fa(n)!==2&&ee(n,1)):n.t-=Pe;break}}function Ly(n){if(!n.active||(Xd(n),n.dist>(n.type===Me.VILKA||n.type===Me.SNIPER?150:210)))return;const t=n.o.position,e=ss();if(n.fx!==void 0&&fo(n.fx,n.fy,16),n.fx=void 0,t.x+=n.sx,t.z+=n.sz,n.cx=Math.trunc((t.x+e)/ut),n.cy=Math.trunc((t.z+e)/ut),Xd(n),n.hp>0)if(n.type===Me.SNIPER)Py(n);else switch(n.state){case 0:jd(n,!1);break;case 1:h0(n);break;case 2:wy(n);break;case 3:jd(n,!0);break;case 6:Ey(n);break}else if(n.state===4){if(n.t===1e3&&jt("chpok1",n.o.position),n.t-=Pe,n.sx=n.sz=0,n.t<1){n.active=!1,ae.remove(n.o);const i=tn.indexOf(n);i>=0&&tn.splice(i,1)}return}else ee(n,4);if(n.hp>0){const i=Cn[n.h];n.fx=an((t.x+e)/ut,-i[0]),n.fy=an((t.z+e)/ut,-i[1]),sa(n.fx,n.fy,16,n.id)}}let Ds=0;function qd(n){if(T.obj){Ds+=n*1e3;for(let t=0;Ds>=Pe&&t<8;t++){Ds-=Pe;for(const e of tn.slice())Ly(e);Cy()}Ds>4*Pe&&(Ds=0);for(const t of tn){if(t.turnT>0){const e=Math.min(n,t.turnT);t.yaw+=t.turnW*e,t.turnT-=e,t.turnT<=1e-9&&(t.yaw=t.yawT)}t.o.rotation.y=t.yaw,t.ch.update(n)}}}const Ie={pool:[],used:0,mpool:[],mused:0,tc:new Map};function yl(n){if(!Ie.tc.has(n)){const t=Tn("exploanim.tga").clone();t.needsUpdate=!0,t.wrapS=t.wrapT=$n;const e=n===56?48:n,i=n===56||n===50,r=i?.249:.124,s=e%8,a=Math.floor(e/8);t.repeat.set(r,r),t.offset.set(s*.125+.001,1-(a*.125+.001)-r),Ie.tc.set(n,t)}return Ie.tc.get(n)}const Gf=new O,Yd=new O,Zo=new O,Jo=new O,Qo=new O;function Iy(n,t,e,i,r,s,a,o){let c=Ie.mpool[Ie.mused++];if(!c){const b=new Ge;b.setAttribute("position",new ye(new Float32Array(12),3)),b.setAttribute("uv",new ye(new Float32Array([0,0,1,0,1,1,0,1]),2)),b.setIndex([0,1,2,0,2,3]),c=new pe(b,new An({transparent:!0,depthWrite:!1,side:Fe,blending:Xi})),c.frustumCulled=!1,ae.add(c),Ie.mpool.push(c)}const l=c.material,f=yl(50);l.map!==f&&(l.map=f,l.needsUpdate=!0),l.blendSrc=a===1?wl:a===2?_r:ts,l.blendDst=a===0||a===3?ji:Vs,l.blendEquation=ai,l.opacity=o,l.color.set(s);const u=De.matrixWorld.elements,h=r*.5,m=-i*Math.PI/180,g=Math.cos(m),x=Math.sin(m);Gf.set(u[0],u[1],u[2]),Yd.set(u[4],u[5],u[6]),Zo.copy(Yd).multiplyScalar(.2),Zo.y+=.8,Jo.copy(Gf).multiplyScalar(g*h).addScaledVector(Zo,x*h),Qo.copy(Zo).multiplyScalar(g*h).addScaledVector(Gf,-x*h);const p=c.geometry.attributes.position,d=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let b=0;b<4;b++)p.setXYZ(b,n+d[b][0]*Jo.x+d[b][1]*Qo.x,t+d[b][0]*Jo.y+d[b][1]*Qo.y,e+d[b][0]*Jo.z+d[b][1]*Qo.z);p.needsUpdate=!0,c.userData.want=!0}function di(n,t,e,i,r,s,a,o,c=1){if(o===50)return Iy(n,t,e,i,r,s,a,c);let l=Ie.pool[Ie.used++];l||(l=new um(new $u({transparent:!0,depthWrite:!1,blending:Xi})),l.frustumCulled=!1,ae.add(l),Ie.pool.push(l));const f=l.material;f.map!==yl(o)&&(f.map=yl(o),f.needsUpdate=!0),f.blendSrc=a===1?wl:a===2?_r:ts,f.blendDst=a===0||a===3?ji:Vs,f.blendEquation=ai,f.opacity=c,f.color.set(s),f.rotation=-i*Math.PI/180,l.position.set(n,t,e),l.scale.set(r,r,1),l.userData.want=!0}function Dy(){for(const n of Ie.pool)n.userData.keep=n.userData.want,n.userData.want=!1,n.visible=!1;for(const n of Ie.mpool)n.userData.want=!1,n.visible=!1;Ie.mused=0,Ie.used=0,Ie.final=!1}ae.onBeforeRender=()=>{for(const n of Ie.pool)n.visible=!!(Ie.final&&n.userData.want);for(const n of Ie.mpool)n.visible=!!(Ie.final&&n.userData.want)};const x0={ï:{tex:"bomb_sphere1.jpg",rgb:15138790},ð:{tex:"bomb_sphere2.jpg",rgb:16770790},ñ:{tex:"bomb_sphere0.jpg",rgb:15132415}},Uy=[[-2.2,-2,0],[2.2,-2,0],[0,2,0],[0,0,2.5]];function Ny(n,t){const e=n.o,i=x0[n.c];if(!n.g){n.g=new cn,n.g.matrixAutoUpdate=!1,n.base=e.position.clone(),n.t=n.ob&&n.ob.pt!==void 0?n.ob.pt:mt(1e3),n.sph=[];const a=[];e.traverse(c=>{c.isMesh&&a.push(c)});const o=new An({map:Tn(i.tex),color:i.rgb,side:$e,transparent:!0,blending:Xi,blendSrc:ts,blendDst:ji});for(let c=0;c<4;c++){const l=new pe(a[0].geometry,o);l.matrixAutoUpdate=!1,n.g.add(l),n.sph.push(l)}e.visible=!1,ae.add(n.g)}const r=n.t,s=Math.PI/180;for(let a=0;a<4;a++){const o=Uy[a],c=n.base.x+o[0],l=n.base.z+o[1],f=n.base.y+2+o[2];si.makeTranslation(c,l,f),si.multiply(Os.makeRotationX(Math.sin(r/300)*70*s)),si.multiply(Os.makeRotationY(Math.sin(r/220)*50*s)),n.sph[a].matrix.copy(Sl).multiply(si).multiply(Sl),n.sph[a].matrixWorldNeedsUpdate=!0,di(c,f,l,Math.sin(r/190+r/270)*90,Math.sin(r/260+r/250)*.55+5.5,i.rgb,0,63)}n.t+=t*1e3}const Sl=new Ht().set(1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1),si=new Ht,Os=new Ht;function M0(n,t){if(x0[n.c])return Ny(n,t);const e=n.o;n.base||(n.base=e.position.clone(),n.t=0,n.a=n.ob&&n.ob.pa!==void 0?n.ob.pa:Zr(360),e.matrixAutoUpdate=!1);const i=n.t,r=n.a,s=Math.PI/180,a=n.c,o=u=>si.multiply(Os.makeRotationX(u*s)),c=u=>si.multiply(Os.makeRotationY(u*s)),l=u=>si.multiply(Os.makeRotationZ(u*s)),f=u=>si.multiply(Os.makeTranslation(0,0,u));if(si.makeTranslation(n.base.x,n.base.z,n.base.y),a==="k")f(5),o(90),c(i*.11+r),l(20),c(i*.16);else if(a==="á")f(5),l(i*.09+r),c(20),l(i*.12);else if(a==="í")f(Math.sin(i*.005+r)+4),l(i*.09+r),c(15),l(i*.1);else if(a==="ÿ"||a==="þ"||a==="ý"||a==="à")f(3),l(r),l(i*.09),c(20),l(i*.13);else if(a==="÷")f(5),l(i*.13+r),o(-15);else{n.t+=t*1e3;return}e.matrix.copy(Sl).multiply(si).multiply(Sl),e.matrixWorldNeedsUpdate=!0,e.updateMatrixWorld(!0),n.t+=t*1e3}function $d(n){if(T.obj){for(const t of uo)t.taken||M0(t,n);xt.invis=Math.max(0,xt.invis-n)}}function Fy(n,t){if(!(Ae(n,t)&512))return;const e=He[ft.i0[t*ft.N+n]];c0(n,t,0);const i=uo.find(s=>s.ob===e&&!s.taken);if(!i)return;i.taken=!0,ae.remove(i.o),i.g&&ae.remove(i.g);const r={k:"key1",à:"ananas",á:"batareyka",í:"invisible","÷":"clock",ý:"apple1",þ:"apple1",ÿ:"apple1",ï:"bomb",ð:"bomb",ñ:"bomb"}[i.c]||null;switch(r&&jt(r),i.c){case"k":xt.keys++;break;case"à":xt.ananas++,xt.hp=1;break;case"á":xt.energy++;break;case"í":xt.invis+=10;break;case"÷":T.clockT=(T.clockT||0)+1e4,T.speed=1.5;break;case"ý":xt.hp=Math.min(1,xt.hp+20/zr);break;case"þ":xt.hp=Math.min(1,xt.hp+40/zr);break;case"ÿ":xt.hp=Math.min(1,xt.hp+80/zr);break;case"ð":xt.ammo[1]+=4;break;case"ï":xt.ammo[2]+=4;break;default:xt.ammo[0]+=4}}let ho=0,y0=0,tc=0,Vf=0;function Oy(){const n={tablet:!1,lock:!1,laser:!1};if(T.obj&&xt.hp>0)for(const[s,a]of hh()){const o=io(s,a),c=o==null?void 0:o.ch;c>="1"&&c<="9"&&c.length===1&&(n.tablet=!0),c==="z"&&!o.dead&&o.open===void 0&&xt.keys>0&&(n.lock=!0),xt.energy>0&&Ks.some(l=>!l.active&&s>=l.x&&s<=l.x+1&&a>=l.y&&a<=l.y+1)&&(n.laser=!0)}const t=[0,0,0,0];for(const s of tn)s.state!==4&&s.type>=1&&s.type<=4&&t[s.type-1]++;const e=gr.match(/^p0(\d)_l(\d+)$/),i=gr.match(/^tutorial(\d+)$/),r=ne.options();Wi.showClock=!!r.time,ZM({replaying:vi,levelMs:ho,showFps:!!r.fps,fps:y0,tri:On.info.render.triangles,hp:xt.hp,ammo:xt.ammo,sel:xt.sel,keys:xt.keys,bat:xt.energy,enemies:t,facing:n,title:Vt.title,level:gr,packIdx:e?+e[1]:0,lvlIdx:e?+e[2]:i?+i[1]:1})}addEventListener("keydown",n=>{n.code==="KeyR"&&n.shiftKey&&location.reload()});ne.init(n=>{location.search="?level="+n},()=>{xc=performance.now()});ne.inGame=ia.has("level");addEventListener("keydown",n=>{if(n.code==="Escape"){if(ne.ending)return;ne.open?ne.hide():pn||Ni>=0?ph():vi?(ne.replayEnd=!1,ne.end(b0?"replaywin":"replayloss")):ne.show(!0)}});let sn={c:[],m:[]},Kd=0,vi=!1,no=0,Ma=0;const Gl=ia.has("demo");let _c=null,S0=0,Zd=0,Jd=0;Gl&&(vi=!0,fetch("./assets/demos/"+gr+".rec").then(n=>n.arrayBuffer()).then(n=>{_c=new Uint16Array(n.slice(0,n.byteLength&-2)),S0=ho,no=0}).catch(()=>{}));const ky=()=>{const n=Da.indexOf(gr);location.search=Wm((n+1+(Da.length<2?0:Math.floor(Math.random()*2)))%Da.length)};Gl&&addEventListener("keydown",n=>{n.isTrusted&&(n.code==="Escape"||n.code==="Enter"||n.code==="Space")&&(n.stopImmediatePropagation(),location.search="")},!0);function zy(){if(!_c)return;const n=ne.keys(),t=[[2,3],[4,4],[8,5],[16,6],[2048,2]],e=[[32,0],[64,1],[128,10],[256,7],[512,8],[1024,9]];for(;no*33<=ho-S0;){const i=Zd<_c.length?_c[Zd++]:0;no++;for(const[r,s]of t){const a=(i&r)!==0,o=(Jd&r)!==0;a!==o&&dispatchEvent(new KeyboardEvent(a?"keydown":"keyup",{code:n[s],cancelable:!0}))}for(const[r,s]of e)i&r&&(dispatchEvent(new KeyboardEvent("keydown",{code:n[s],cancelable:!0})),dispatchEvent(new KeyboardEvent("keyup",{code:n[s],cancelable:!0})));Jd=i}}const Mu=new Set;try{sessionStorage.getItem("dino_replay")&&ia.has("level")&&(sn=JSON.parse(sessionStorage.getItem("dino_rec")||'{"c":[],"m":[]}'),vi=sn.m.length>0),sessionStorage.removeItem("dino_replay")}catch{sn={c:[],m:[]}}ne.replayEnd=!1;let b0=!1;try{b0=sessionStorage.getItem("dino_win")==="1"}catch{}addEventListener("keydown",n=>{vi&&n.isTrusted&&n.code!=="Escape"&&n.stopImmediatePropagation()},!0);addEventListener("keyup",n=>{vi&&n.isTrusted&&n.stopImmediatePropagation()},!0);const vc=new Set;function Ts(n,t){if(!n||vc.has(n)===t)return;t?vc.add(n):vc.delete(n);const e=new KeyboardEvent(t?"keydown":"keyup",{code:n,cancelable:!0});e.fromJoy=!0,dispatchEvent(e)}function By(){const n=ne.joy,t=ne.keys();let e=null;if(!vi&&!ne.open&&n.en&&navigator.getGamepads){for(const a of navigator.getGamepads())if(a&&a.connected){e=a;break}}if(!e){for(const a of[...vc])Ts(a,!1);return}const i=Math.trunc(((2*n.sens-1)*.7+1)*300),r=(e.axes[0]||0)*1e3,s=(e.axes[1]||0)*1e3;Ts(t[4],r>i),Ts(t[3],r<-i),Ts(t[6],s>i),Ts(t[5],s<-i);for(let a=0;a<3;a++){const o=e.buttons[n.btn[a]];Ts(t[a],!!(o&&o.pressed))}}const E0=n=>t=>{vi||!t.isTrusted&&!t.fromJoy||t.code==="Escape"||t.code==="KeyR"||(n?Mu.add(t.code):Mu.delete(t.code))};addEventListener("keydown",E0(!0));addEventListener("keyup",E0(!1));function Gy(){if(!(ne.open||pn||Ni>=0)){if(Gl){zy();return}for(;no*33<=ho;)if(no++,vi){if(Kd<sn.m.length){const n=sn.m[Kd++];for(let t=0;t<sn.c.length;t++){const e=n>>t&1,i=Ma>>t&1;e!==i&&dispatchEvent(new KeyboardEvent(e?"keydown":"keyup",{code:sn.c[t],cancelable:!0}))}Ma=n}else if(Ma){for(let n=0;n<sn.c.length;n++)Ma>>n&1&&dispatchEvent(new KeyboardEvent("keyup",{code:sn.c[n]}));Ma=0}}else{let n=0;for(const t of Mu){let e=sn.c.indexOf(t);e<0&&sn.c.length<16&&(sn.c.push(t),e=sn.c.length-1),e>=0&&(n|=1<<e)}sn.m.length<109089&&sn.m.push(n)}}}let As="",ar=null;const Zt={on:!1,M:null,v:[0,0,0],a7c8:0,a7cc:0,mx:0,my:0,btn:0,alt:!1,shakeFlag:!1,shakeT:0};addEventListener("mousemove",n=>{Zt.mx+=n.movementX,Zt.my+=n.movementY,Zt.btn=n.buttons});addEventListener("mousedown",n=>{Zt.btn=n.buttons});addEventListener("mouseup",n=>{Zt.btn=n.buttons});addEventListener("keydown",n=>{n.code==="AltLeft"&&(Zt.alt=!0)});addEventListener("keyup",n=>{n.code==="AltLeft"&&(Zt.alt=!1)});addEventListener("keydown",n=>{ne.open||!/^Key[A-Z]$/.test(n.code)||(As=(As+n.code[3]).slice(-14),As.includes("FREECAM")&&(As="",Zt.on=!Zt.on,Wi.message(Zt.on?"FREECAM IS ON.":"FREECAM IS OFF.")),As.includes("GRID")&&(As="",ar||(ar=new Em(Vt.N*ut,Vt.N,16777215,16777215),ar.position.y=.05,ar.visible=!1,ae.add(ar)),ar.visible=!ar.visible,Wi.message(ar.visible?"GRID IS ON.":"GRID IS OFF.")))});ia.has("level")||ne.show(!1);function Vy(n,t){const e=Vt.N*ut/2;return!!(Ae(Math.floor((n+e)/ut),Math.floor((t+e)/ut))&2)}const T={obj:null,ch:null,walk:null,stand:null,moving:!1,face:0,SCALE:1,FACE_OFFSET:-Math.PI/2};async function Hy(n,t){const e=new th(await Ju("characters/pups.skl"),"glavnyi_screen.jpg"),i=s=>Qu("animations/"+s+".anm");T.walk=await i("beg"),T.stand=await i("stand"),T.kick=await i("pinok"),T.idles=[T.stand,await i("zaryadka"),await i("zaryadka2"),await i("chihanie"),await i("zevota"),await i("glavnyi_pause_time")],T.dances=[await i("dance1"),await i("dance2")],T.wave=await i("mahanie"),T.push=await i("tolkanie"),T.shock=await i("shock"),T.deaths=[await i("death"),await i("death2")],e.play(T.stand),e.update(0);const r=new cn;r.add(e.mesh),r.scale.setScalar(T.SCALE),r.position.set(n,0,t),r.rotation.y=T.face=-Math.PI/2,ae.add(r),T.obj=r,T.ch=e}const ur={};addEventListener("wheel",n=>{T.cam&&(T.cam.wheel=(T.cam.wheel||0)-n.deltaY)});addEventListener("keydown",n=>{ur[n.code]=!0});addEventListener("keyup",n=>{ur[n.code]=!1});function uh(){const n=T.obj.position,t=T.face;return Vy(n.x+Math.sin(t)*4,n.z+Math.cos(t)*4)}function w0(n,t){T.act=n,T.actAnm=t,T.actT=t.F*t.ms,T.state=""}function Wy(){pn||T.act==="kick"||xt.hp<=0||uh()||(w0("kick",T.kick),T.kickDone=!1,T.kickAt=T.actT*.4)}function Xy(){pn||xt.hp<=0||T.act==="dance"||(ja(10),w0("dance",T.dances[ln(3)!==0&&!uh()?1:0]),T.actT-=300)}function jy(){const n=T.obj.position,t=T.face,e=Math.sin(t),i=Math.cos(t);for(const r of tn.slice()){const s=r.o.position.x-n.x,a=r.o.position.z-n.z,o=Math.hypot(s,a);r.hp<=0||o>14.15||(s*e+a*i)/(o||1)<.3||fh(r,10)}}const cr=se.map(([n,t])=>{const e=Math.hypot(n,t);return{x:n/e,z:t/e}}),Qd=Ae,io=(n,t)=>n<0||t<0||n>=ft.N||t>=ft.N?null:He[ft.i0[t*ft.N+n]]||null,qy=(n,t)=>{const e=io(n,t);return!!e&&e.ch>="1"&&e.ch<="9"};function Rs(n,t){return!(rs(n,t)&18)}function Br(n,t,e){const i=Vt.N*ut/2,r=(i+n)/ut,s=(i+t)/ut;return[e.x<0?Math.ceil(r):Math.floor(r),e.z<0?Math.ceil(s):Math.floor(s)]}function Ci(n){T.dir=n;const[t,e]=se[n],i=Math.atan2(t,e)+T.FACE_OFFSET;if(T.tgt!==i){T.tgt=i;let r=i-T.face;for(;r>Math.PI;)r-=2*Math.PI;for(;r<-Math.PI;)r+=2*Math.PI;T.turnW=r/.2,T.turnT=.2}}function T0(){const n=ne.keys(),t=(ur[n[4]]?1:0)-(ur[n[3]]?1:0),e=(ur[n[6]]?1:0)-(ur[n[5]]?1:0);return t||e?se.findIndex(([i,r])=>i===t&&r===e):-1}function Yy(){const n=cr[T.dir??0],t=T.obj.position;return[Br(t.x,t.z,{x:-n.x,z:-n.z}),Br(t.x,t.z,n)]}function $y(n){if(T.fp)for(const[t,e]of T.fp)fo(t,e,32);if(T.fp=null,Ky(),xt.hp>0){T.fp=Yy();for(const[t,e]of T.fp)sa(t,e,32,0)}pn&&(T.menuT=(T.menuT||0)+33)>7e3&&!T.menuShown&&(T.menuShown=!0,ph())}function Ky(n){T.clockT>0&&(T.clockT-=33)<=0&&(T.clockT=0,T.speed=1);const t=T.obj.position,e=Vt.N*ut/2;T.vel||(T.vel={x:0,z:0}),T.dir===void 0&&(T.dir=0,T.gst=0,T.ft=0,T.fi=0),t.x+=T.vel.x,t.z+=T.vel.z;{const v=cr[T.dir],[_,w]=Br(t.x,t.z,v);xt.hp>0&&!pn&&l0(_,w)&1024&&(Bl(50),xt.hp=Math.max(0,xt.hp-50/zr),kl(()=>Zr(3)))}if(T.gst===7){Zy();return}if(T.gst===8){T.vel={x:0,z:0};return}const i=T0(),r=i>=0,s=T.speed||1;if(xt.hp<=0||pn){T.vel={x:0,z:0};return}if(T.gst===0){T.vel={x:0,z:0},T.pushing=!1,r&&(Ci(i),T.gst=1,T.ft=0);return}T.ft===0&&(jt("stephero"+(T.fi+1)),T.fi=(T.fi+1+Zr(2))%3),T.ft+=33,380/s<T.ft&&(T.ft=0),r&&i===(T.dir+4&7)&&Ci(i);let a=T.dir;const o=cr[a],[c,l]=se[a];let f={x:o.x*s,z:o.z*s};const[u,h]=Br(t.x+f.x,t.z+f.z,o),[m,g]=Br(t.x,t.z,o),x=u!==m||h!==g;for(const[v,_]of[[u,h],[u-1,h],[u,h-1],[u-1,h-1]])Fy(v,_);let p=!1;if(!x&&(!Rs(u+c,h+l)||T.slide)){for(const[v,_]of[[u+c,h+l],[u+c-1,h+l],[u+c,h+l-1],[u+c-1,h+l-1]]){if(v<0||_<0||v>=ft.N||_>=ft.N)continue;const w=_*ft.N+v;if(ft.f[w]&4){const k=He[ft.i0[w]];k&&(k.touched=1)}}if(a&1){const v=se[a+1&7],_=se[a+7&7],w=Rs(m+v[0],g+v[1]),k=Rs(m+_[0],g+_[1]);T.slide=w||k,w?f={x:cr[a+1&7].x*.9*s,z:cr[a+1&7].z*.9*s}:k?f={x:cr[a+7&7].x*.9*s,z:cr[a+7&7].z*.9*s}:p=!0}else p=!0}const d=!(a&1),b=o.x>0||o.z<0,A=b?a+6&7:a+2&7,y=u+(o.x<0?2:1)*c,I=h+(o.z<0?2:1)*l,P=y+se[A][0],C=I+se[A][1],L=qy;if(p){f={x:0,z:0},T.slide=!1,T.pushing=!1;const v=Qd(y,I),_=Qd(P,C);if(d&&v&_&2){if((v|_)&2048){T.gst=7,T.ft=0,T.vel={x:0,z:0},T.pushA=T.pushB=!1,T.pushing=!0,T.stopSetDir=!1;return}}else if(d&&!L(y,I)&&!L(P,C)){const w=b?a+1&7:a+7&7,k=b?a+7&7:a+1&7,N=!(v&2)&&Rs(m+se[w][0],g+se[w][1]),B=!(_&2)&&Rs(m+se[k][0],g+se[k][1]);N?(a=w,T.slide=!0,Ci(a)):B?(a=k,T.slide=!0,Ci(a)):T.slide=!1}!T.slide&&r&&i!==T.dir&&Ci(i),r||(T.gst=0)}else T.pushing=!1;if(x){const v={x:u*ut-e-t.x,z:h*ut-e-t.z};{const _=ft.i0[(h-2)*ft.N+u-2],w=ft.i0[(h+1)*ft.N+u+1],k=He[_];if(dS()&&Ae(u-2,h-2)&Ae(u+1,h+1)&4&&_===w&&k&&k.ch==="E"){k.active=1,T.vel={x:0,z:0},mS();return}}T.slide&&(f=v,T.slide=!1),Rs(u+c,h+l)||(f=v),r?i!==T.dir&&(Ci(i),f=v):(T.gst=0,f=v)}T.vel=f}const Hf=n=>{if(!n.mesh)return;const t=ft.N*ut/2;n.mesh.position.set((n.x+n.w/2)*ut-t+n.off.x,0,(n.y+n.h/2)*ut-t+n.off.z)};function Zy(){const n=T.obj.position,t=ft.N*ut/2,e=T.speed||1,i=T.dir,r=cr[i],[s,a]=se[i],o=T0();T.ft===0&&(jt("stephero"+(T.fi+1)),T.fi=(T.fi+1+Zr(2))%3),T.ft+=33,380/e<T.ft&&(T.ft=0);const c={x:r.x*e*.5,z:r.z*e*.5};T.vel=c;const[l,f]=Br(n.x+c.x,n.z+c.z,r),[u,h]=Br(n.x,n.z,r),m=l!==u||f!==h,g=r.x>0||r.z<0?i+6&7:i+2&7,x=[u+(r.x<0?2:1)*s,h+(r.z<0?2:1)*a],p=[x[0]+se[g][0],x[1]+se[g][1]],d=[x[0]+s,x[1]+a],b=[p[0]+s,p[1]+a],A=[d[0]+s,d[1]+a],y=[b[0]+s,b[1]+a],I=_=>Ae(_[0],_[1]),P=_=>_[0]<0||_[1]<0||_[0]>=ft.N||_[1]>=ft.N?0:ft.i1[_[1]*ft.N+_[0]],C=(_,w)=>{_[0]>=0&&_[1]>=0&&_[0]<ft.N&&_[1]<ft.N&&(ft.f[_[1]*ft.N+_[0]]|=w)};(!(I(x)&18)||!(I(p)&18))&&(T.gst=1,T.ft=0,T.pushing=!1);const L=P(x),v=He[L];if(v&&L===P(p)&&L===P(d)&&L===P(b)&&I(x)&128?T.pushB?(v.off.x=0,v.off.z=0,Hf(v),v.moving=0,T.pushB=!1,T.pushA=!1):T.pushA?(v.off.x+=c.x,v.off.z+=c.z,Hf(v)):!(I(A)&530)&&!(I(y)&530)&&(jt("push"),v.moving=1,C(A,2),C(y,2),T.pushA=!0,T.pushOb=v):T.pushA=!1,T.pushA||(T.vel={x:0,z:0}),m&&T.pushA){const _={x:l*ut-t-n.x,z:f*ut-t-n.z},w=v.rec,k=~w&65535;for(const N of[x,p])N[0]>=0&&N[1]>=0&&N[0]<ft.N&&N[1]<ft.N&&(ft.f[N[1]*ft.N+N[0]]&=k);for(const N of[A,y])N[0]>=0&&N[1]>=0&&N[0]<ft.N&&N[1]<ft.N&&(ft.f[N[1]*ft.N+N[0]]|=w,ft.i1[N[1]*ft.N+N[0]]=L);v.x+=s,v.y+=a,v.off.x-=s*ut,v.off.z-=a*ut,Hf(v),T.pushB=(I([A[0]+s,A[1]+a])&530)!==0||(I([y[0]+s,y[1]+a])&530)!==0||o<0||o!==i||xt.hp<=0,T.pushB?T.vel=_:jt("push")}T.pushA||(T.pushing=!1,o<0&&(T.gst=0,T.vel={x:0,z:0}),o>=0&&o!==i&&(T.gst=1,T.ft=0,Ci(o)),xt.hp<=0&&(T.gst=0))}function Jy(n){if(!T.obj)return;for(T.acc=(T.acc||0)+n*1e3;T.acc>=33;)T.acc-=33,$y();const t=T.gst===1;if(T.gst===7&&(T.pushing=!0),T.turnT>0){const h=Math.min(n,T.turnT);T.face+=T.turnW*h,T.turnT-=h,T.turnT<=0&&(T.face=T.tgt)}T.turnT!==void 0&&(T.obj.rotation.y=T.face),!t&&T.gst!==7&&(T.pushing=!1),xt.hp<(T.lastHp??1)-.001&&(T.shockT=T.shock&&T.shock.F?T.shock.F*T.shock.ms/1e3:.35),T.lastHp=xt.hp,T.shockT=Math.max(0,(T.shockT||0)-n),T.actT=Math.max(0,(T.actT||0)-n*1e3),(t||T.shockT>0)&&(T.act==="dance"&&ja(Vt.music),T.act=null,T.idleN=0);const e=(h,m,g)=>{T.act=h,T.actAnm=m,T.actT=m.F*m.ms,T.state=""};if(!pn&&!t&&T.shockT<=0&&xt.hp>0&&(T.act&&T.actT<=0&&(T.act==="dance"&&ja(Vt.music),T.act=null,T.idleN=(T.idleN||0)+1),!T.act))if((T.idleN||0)<2)e("wait",T.stand);else{let h=ln(6);h===2&&uh()&&(h=1),h===0?e("wait",T.stand):e("idle",T.idles[h])}if(T.act==="idle"&&T.actAnm===T.idles[3]){const h=T.actAnm.F*T.actAnm.ms*.68;!T.chihK&&T.actT<=h+33&&(T.chihK=!0,jt("chihanie"))}else T.chihK=!1;T.act==="kick"&&!T.kickDone&&T.actT<=T.kickAt&&(T.kickDone=!0,jy());let i=T.shockT>0?"shock":T.pushing?"push":t?"walk":T.act||"stand";pn&&(i="wave"),i!==T.state&&(T.state=i,i==="wave"?T.ch.play(T.wave,!1):i==="wait"?T.ch.play(T.stand,!0):i==="idle"||i==="kick"||i==="dance"?T.ch.play(T.actAnm,!1):T.ch.play(T[i],i==="walk"||i==="stand"||i==="push",i==="shock"?100:200)),Qy(T.ch,n*1e3),T.ch.update(n);const r=T.obj.position,s=T.cam||(T.cam={c:null,zoom:0,vel:0}),a=Math.min(1,.01*n*1e3),o=Vt.N*ut/2;s.vel+=(s.wheel||0)*.002+(ur.PageUp?.2:0)-(ur.PageDown?.2:0),s.wheel=0,s.zoom=Math.min(1,Math.max(0,s.zoom+s.vel*a)),s.vel*=1-a,s.c||(s.c=new O(r.x,r.y,r.z));const c=pn||Ni>=0;let l=0,f=77.5,u=!1;if(c){s.endT=(s.endT||0)+n*1e3;const h=Math.min(s.endT,7e3);l=(Math.sin(Math.PI*h/7e3-Math.PI/2)+1)/2,s.fly?u=!0:(s.endT>=14e3?(s.fly=!0,s.flyInit=!0):s.D=s.endT<7e3?60*l+(1-l)*77.5:(s.D??60)+.002*n*1e3,f=s.D)}if(u){const h=s.fl||(s.fl={T:[0,0,0],D:[0,0,0],ang:0,t:0}),m=()=>[s.c.x,s.c.z,s.c.y],g=(x,p)=>Math.hypot(x[0]-p[0],x[1]-p[1],x[2]-p[2]);if(g(m(),h.T)<5){for(let A=0;A<1e3;A++){const y=mt(o-70),I=mt(o-75),P=mt(o-70),C=mt(o-75);if(s.c.set(I,0,y),h.T=[C,P,0],!(g(m(),h.T)<(Vt.N-35)*5))break}const x=h.T[0]-s.c.x,p=h.T[1]-s.c.z,d=h.T[2]-s.c.y,b=Math.hypot(x,p,d)||1;h.D=[x/b,p/b,d/b],h.ang=Dt(4.7)}h.t+=n*1e3,f=((Math.sin(h.ang*h.t*1e-4)+1)*.3*.5+.7)*77.5,s.c.x+=h.D[0]*.015*n*1e3,s.c.z+=h.D[1]*.015*n*1e3,s.c.y+=h.D[2]*.015*n*1e3}else l>0?s.c.lerp(r,l):(s.c.lerp(r,a),s.c.x=Math.min(o-80,Math.max(-(o-80),s.c.x)),s.c.z=Math.min(o-40,Math.max(-(o-75),s.c.z)));{const h=u?0:-15*l,m=(u?-138:-138+6*s.zoom)*Math.PI/180,g=m+h,x=u?f:f-15*s.zoom,p=Math.sin(m),d=Math.cos(m),b=-p*x-d*4.46,A=-d*x+p*4.46,y=s.c.z,I=s.c.y,P=y+b-r.z,C=I+A-r.y,L=-h,v=Math.cos(L),_=Math.sin(L),w=r.z+P*v-C*_,k=r.y+P*_+C*v,N=Math.sin(g),B=Math.cos(g),j=new O(0,B,N),R=new O(0,-N,B);De.up.copy(R),De.position.set(s.c.x,k,w).addScaledVector(R,5*l),De.lookAt(De.position.clone().add(j));const V=q=>[q[0],q[2],q[1]],U=q=>[0,1,2].map(J=>-(q[12]*q[4*J]+q[13]*q[4*J+1]+q[14]*q[4*J+2])),rt=(q,J)=>[q[1]*J[2]-q[2]*J[1],q[2]*J[0]-q[0]*J[2],q[0]*J[1]-q[1]*J[0]];if(!Zt.on){const q=V([De.position.x,De.position.y,De.position.z]),J=V([j.x,j.y,j.z]),lt=V([R.x,R.y,R.z]),ht=rt(lt,J),G=[ht,lt,J],Y=new Array(16).fill(0);for(let $=0;$<3;$++){for(let F=0;F<3;F++)Y[4*F+$]=G[$][F];Y[12+$]=-(q[0]*G[$][0]+q[1]*G[$][1]+q[2]*G[$][2])}Y[15]=1,Zt.M=Y}{const q=Zt.M,J=Zt.v,lt=st=>[q[st],q[4+st],q[8+st]],ht=lt(0),G=lt(1),Y=lt(2),$=Zt.btn&1,F=Zt.btn&2;if(Zt.alt&&F)Zt.a7cc+=Zt.my*-2.3,Zt.a7c8+=Zt.mx*-2.3;else if(F)for(let st=0;st<3;st++)J[st]+=Y[st]*.3*Zt.my;else if($)for(let st=0;st<3;st++)J[st]+=ht[st]*.2*Zt.mx,J[st]+=-G[st]*.2*Zt.my;Zt.mx=Zt.my=0;const tt=Math.min(1,.01*n*1e3);if(Zt.on){for(let D=0;D<3;D++)q[12+D]+=tt*(J[0]*q[D]+J[1]*q[4+D]+J[2]*q[8+D]);for(let D=0;D<3;D++)J[D]*=1-tt;const st=U(q),Ot=[q[2],q[6],q[10]],kt=[st[0]+Ot[0]*20,st[1]+Ot[1]*20,st[2]+Ot[2]*20],Rt=(D,Tt)=>{const pt=Tt*.5*.017453292,yt=Math.sin(pt);let ct=[yt*D[0],yt*D[1],yt*D[2],Math.cos(pt)];const Pt=Math.hypot(...ct);Pt>0&&(ct=ct.map(K=>K/Pt));const[Mt,E,M,H]=ct,nt=[1-2*(E*E+M*M),2*(Mt*E+M*H),2*(Mt*M-E*H),0,2*(Mt*E-M*H),1-2*(Mt*Mt+M*M),2*(E*M+Mt*H),0,2*(Mt*M+E*H),2*(E*M-Mt*H),1-2*(Mt*Mt+E*E),0,0,0,0,1];for(let K=0;K<3;K++)nt[12+K]=kt[K]-(kt[0]*nt[K]+kt[1]*nt[4+K]+kt[2]*nt[8+K]);const ot=new Array(16).fill(0);for(let K=0;K<4;K++)for(let At=0;At<4;At++){let dt=0;for(let _t=0;_t<4;_t++)dt+=nt[4*K+_t]*q[4*_t+At];ot[4*K+At]=dt}for(let K=0;K<16;K++)q[K]=ot[K]};Rt([q[0],q[4],q[8]],Zt.a7cc*tt),Rt([0,0,1],Zt.a7c8*tt)}Zt.a7c8*=1-tt,Zt.a7cc*=1-tt;let at=[0,0,0];if(Zt.shakeFlag&&(Zt.shakeT=1,Zt.shakeFlag=!1),Zt.shakeT>0){const st=(1.1-Zt.shakeT/600)*.7,Ot=mt(st),kt=mt(st);at=[mt(st),kt,Ot],Zt.shakeT+=n*1e3,Zt.shakeT>600&&(Zt.shakeT=0)}if(Zt.on)for(let st=0;st<3;st++)q[12+st]+=at[0]*q[st]+at[1]*q[4+st]+at[2]*q[8+st];else De.position.x-=at[0],De.position.y-=at[2],De.position.z-=at[1];if(Zt.on){const st=U(q),Ot=[q[1],q[5],q[9]],kt=[q[2],q[6],q[10]],Rt=V(st);De.up.set(...V(Ot)),De.position.set(Rt[0],Rt[1],Rt[2]);const D=V(kt);De.lookAt(Rt[0]+D[0],Rt[1]+D[1],Rt[2]+D[2])}}}}My(gr).then(()=>{if(window.__ready=!0,gr==="menulevel")return pM({scene:ae,hero:T,loadCgo:ra,spawnPart:dn,stepParticles:v0,prand:mt,prand0:Dt,pickupAnim:M0})}).catch(n=>{console.error(n),window.__err=String(n.stack)});let xc=performance.now(),tp=!1;function Qy(n,t){const e=n.eye||(n.eye={t:0,a:0,b:0,ta:0,tb:0,da:1,db:1,i:n.skl.names.indexOf("L Eye"),ri:n.skl.names.indexOf("R Eye"),m:new Ht,mr:new Ht,hit:0}),i=Math.PI/180;if(n.eyeHit||e.hit>0){const l=Math.sin(e.hit/300*Math.PI),f=e.m.elements,u=e.mr.elements;f.fill(0),f[0]=f[5]=f[10]=f[15]=1,f[12]+=.5*l,f[0]=f[5]=f[10]=.3*l+1;for(let g=0;g<16;g++)u[g]=f[g];const h=(g,x)=>{const p=Math.cos(x*i),d=Math.sin(x*i);for(let b=0;b<4;b++){const A=g[b],y=g[8+b];g[8+b]=p*y+d*A,g[b]=p*A-d*y}};h(f,-l*30),h(u,l*30),e.hit+=t,e.hit>300&&(e.hit=0,n.eyeHit=!1);const m=n.ovr||(n.ovr={});e.i>=0&&(m[e.i]=e.m),e.ri>=0&&(m[e.ri]=e.mr);return}if(e.i<0)return;e.t-=t,e.t<0&&(e.t=Dt(1700),e.ta=mt(25),e.tb=mt(17)+5,e.da=Dt(80)+80,e.db=Dt(80)+80),e.a+=(e.ta-e.a)/e.da*t,e.b+=(e.tb-e.b)/e.db*t;const r=Math.cos(e.a*i),s=Math.sin(e.a*i),a=Math.cos(e.b*i),o=Math.sin(e.b*i),c=e.m.elements;c.fill(0),c[0]=r,c[2]=-s,c[5]=1,c[8]=s,c[10]=r,c[15]=1;for(let l=0;l<4;l++){const f=c[l],u=c[4+l];c[4+l]=a*u-f*o,c[l]=o*u+a*f}(n.ovr||(n.ovr={}))[e.i]=e.m}function A0(n){requestAnimationFrame(A0),xM(Math.min(50,n-xc),T.obj&&T.obj.position),vu&&vu.update(n);const t=Math.min(.05,(n-xc)/1e3);if(xc=n,ne.pausing){for(const e of Ie.pool)e.userData.want=!!e.userData.keep;Ie.final=!0,On.render(ae,De);for(const e of Ie.pool)e.userData.want=!1,e.visible=!1;Ie.final=!1;return}if(tc+=t*1e3,Vf++,tc>=300&&(y0=Vf*1e3/tc,tc=Vf=0),!pn&&Ni<0&&(ho+=t*1e3),Gy(),By(),Ni>=0&&Ni<7e3&&(Ni+=t*1e3,Ni>=7e3&&!ne.open&&ph()),ne.open&&!ne.ending){ne.inGame||gM.frame(De,t*1e3,ne.scr,wM()),On.render(ae,De);return}xt.hp<=0&&!tp&&(tp=!0,SS()),xt.hp<=0&&T.ch&&T.ch.update(t),xt.hp>0&&!Wi.paused()?(Jy(t),qd(t),$d(t),np(t),pS(),sp(t)):xt.hp<=0&&!Wi.paused()&&(qd(t),$d(t),np(t),sp(t)),v0(t),(window.__env||(window.__env=uy({RT:yr,spriteQ:di,txt:is,camera:De,OBJ:He,hero:T,fl:Ae,F:ft,enemies:tn,heatAt:(e,i)=>{const r=Ne.b[Ne.c];return r?Math.max(0,r[e*Vt.N+i]|0):0}})))(t*1e3),_u&&!Wi.paused()&&_u.update(t*1e3,{invisMs:xt.invis*1e3,hp:xt.hp,finished:pn,finishMs:(T.menuT||0)+(T.acc||0)}),Ry(t*1e3),Oy(),o0.update({hero:T.obj,enemies:tn.map(e=>e.o).concat(Jr.map(e=>e.o)),objs:He,extra:uo.filter(e=>e.sph&&!e.taken).flatMap(e=>e.sph),cell:ut}),Ie.final=!0,On.render(ae,De),Dy(),fS()}async function tS(n){const t=await is("texts/tips.txt");let e=null,i=null;const r=n.match(/^tutorial(\d+)/),s=n.match(/^p(\d+)_l(\d+)/);if(r)e=0,i=+r[1];else if(s)e=+s[1],i=+s[2];else return{};const a={};let o=-1,c=-1,l=null;for(const f of t.split(/\r?\n/)){let u;if(u=f.match(/^\[pack(\d+)\]/)){o=+u[1],l=null;continue}if(u=f.match(/^\[level(\d+)\]/)){c=+u[1],l=null;continue}if((u=f.match(/^tip(\d+)=(.*)/))&&o===e&&c===i){l=u[1],a[l]=u[2].trim();continue}l&&f.trim()&&o===e&&c===i&&!/^\[/.test(f)?a[l]+=" "+f.trim():f.trim()||(l=null)}return a}const R0=document.createElement("div");R0.style.cssText="position:fixed;left:50%;bottom:30px;transform:translateX(-50%);max-width:70%;background:#000c;color:#fff;font:16px sans-serif;padding:14px 18px;border-radius:8px;display:none";document.body.appendChild(R0);function hh(){const n=T.obj.position,t=Vt.N*ut/2,e=T.face,i=Math.sin(e),r=Math.cos(e),s=Math.abs(i)>=Math.abs(r)?Math.sign(i):0,a=s?0:Math.sign(r),o=Math.floor((n.x+t)/ut),c=Math.floor((n.z+t)/ut),l=[];for(let f=1;f<=2;f++)for(let u=-1;u<=1;u++)l.push([o+s*f+a*u,c+a*f+s*u]);return l}let ep=!1;(function n(){var e;requestAnimationFrame(n);let t=!1;if(T.obj&&xt.hp>0)for(const[i,r]of hh()){const s=(e=io(i,r))==null?void 0:e.ch;s>="1"&&s<="9"&&s.length===1&&(t=!0)}t&&!ep&&jt("podskazka"),ep=t})();function eS(){var t;if(!T.obj||xt.hp<=0)return!0;const n=hh();for(const[e,i]of n){const r=(t=io(e,i))==null?void 0:t.ch;if(r>="1"&&r<="9"&&r.length===1)return Wi.openTablet(Vt.tips[r]||""),!0}for(const[e,i]of n){const r=Ks.find(s=>e>=s.x&&e<=s.x+1&&i>=s.y&&i<=s.y+1);if(r&&!r.active)return xt.energy>0?(xt.energy--,r.active=!0,r.warm=0,!0):!1}for(const[e,i]of n){const r=io(e,i);if(!r||r.ch!=="z"||r.dead)continue;if(r.open!==void 0)return!0;const s=Vt.N*ut/2,a=(r.x+r.w/2)*ut-s,o=(r.y+r.h/2)*ut-s,c=T.obj.position.x,l=T.obj.position.z,f=(Math.round(r.rot)%360+360)%360,u=f===180&&o<l||f===0&&l<o||f===90&&a<c||f===270&&c<a;return xt.keys>0&&u&&(xt.keys--,r.open=0),!0}return!1}const Jr=[],po=[{name:"BOMB",tint:15138790,tex:"bomb_sphere0.jpg",tick:"tickyellow",color:16760864,fuseMs:2800,radius:6},{name:"RADIO",tint:15132415,tex:"bomb_sphere2.jpg",tick:"tickblue",color:4235519,fuseMs:28e4,radius:5,tickCd:2500},{name:"GRENADE",tint:16770790,tex:"bomb_sphere1.jpg",tick:"tickred",color:16728096,fuseMs:1400,radius:3,tickCd:725,tickCd0:220}],Mc=33;let ec=0;xt.ammo=[0,0,0];xt.sel=0;Object.defineProperty(xt,"bombs",{get(){return xt.ammo[0]},set(n){xt.ammo[0]=n}});function nS(n,t,e=1,i=1,r=8){const s=new Yi(1,1),a=s.attributes.uv,o=n/r,c=(n+e)/r,l=1-(t+i)/r,f=1-t/r;return a.setXY(0,o,f),a.setXY(1,c,f),a.setXY(2,o,l),a.setXY(3,c,l),s}Array.from({length:16},(n,t)=>nS(t%8,Math.floor(t/8)));const Ne={g:null,b:[null,null],c:0,N:0};function dh(){const n=Vt.N;Ne.g=ft.f,Ne.N=n,Ne.b=[new Int16Array(n*n),new Int16Array(n*n)],Ne.c=0}const C0=(n,t)=>n<1||t<1||n>=Vt.N-1||t>=Vt.N-1||(Ae(n,t)&1)!==0,$s=n=>(n+.5)*ut-Vt.N*ut/2,P0=new Array(1024).fill(null),L0=new Array(256).fill(null);let Wf=0,Xf=0,jf=null;function I0(n,t){dn(0,$s(n),6,$s(t))}function Xn(n,t){L0[Xf]={life:1e3+mt(500),x:$s(n),y:6,z:$s(t),vx:mt(.025),vz:mt(.02),vy:mt(.01)+7e-4,ang:mt(180),av:mt(1),size:Dt(.5)+2,sv:-3e-4,br:1,bv:-8e-4,g:mt(.001)-.004,tm:30,tp:30},Xf=Xf+1&255}function yu(n,t,e){const i=Vt.N,r=(u,h)=>e[u*i+h],s=u=>Math.sqrt(Math.max(0,u))*Dt(1e-4),a=r(n,t),o=s(r(n,t+1)),c=s(r(n,t-1)),l=s(r(n-1,t)),f=s(r(n+1,t));P0[Wf]={life:800,ang:mt(100),av:mt(.03),size:Math.sqrt(.15*a)+2.2,heat:a&255,x:$s(n)+mt(1),z:$s(t)+mt(1),y:3,vx:l-f,vz:c-o,vy:Dt(.002)-.004},Wf=Wf+1&1023}function iS(n){const t=n*1e3;sS(t),jf=jf||new Yt(1,1,1);for(const i of P0){if(!i||!(i.life>0))continue;const r=Math.round((1-i.life/800)*64);r<48&&di(i.x,i.y,i.z,i.ang,i.size*2,jf,0,r),i.ang+=t*i.av,i.x+=i.vx*t,i.z+=i.vz*t,i.y+=i.vy*t,i.life-=t/Math.sqrt(Math.sqrt(i.heat)),i.life<0&&(i.life=0)}const e=t/(1e3/60);for(const i of L0)!i||!(i.life>0)||(i.tm-=t,i.life-=t,i.ang+=t*i.av,i.size+=t*i.sv,i.size<0&&(i.life=0),i.br+=t*i.bv,i.br<0&&(i.life=0),i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<0&&(i.y=0,i.vy=-i.vy*.8,i.av=mt(1)),i.vy+=i.g*e,i.tm<0&&(i.tm+=i.tp,dn(1,i.x,i.y,i.z)))}const fr=[];function rS(n,t){const e=Vt.N*ut/2,i=new pe(new Yi(80,80),new An({map:Tn("exploflare.jpg"),transparent:!0,depthWrite:!1,depthTest:!1,blending:Xi,blendSrc:_r,blendDst:ji,side:Fe}));if(i.renderOrder=5,i.rotation.x=-Math.PI/2,i.position.set(n*ut-e,.3,t*ut-e),bl.position.set(i.position.x,0,i.position.z),ae.add(i),fr.push({m:i,t:0}),fr.length>8){const r=fr.shift();ae.remove(r.m)}}const bl=new ym(16744448,0,70,1);ae.add(bl);function sS(n){const t=fr[fr.length-1];if(t){const e=Math.min(1,(t.t+n)/700),i=Math.max(.003,Math.sin(e*Math.PI/2)*.03);bl.intensity=Math.PI/i}else bl.intensity=0;for(let e=fr.length-1;e>=0;e--){const i=fr[e];i.t+=n;const r=Math.min(1,i.t/700);i.m.material.opacity=1-r,i.m.material.color.setScalar(1),i.t>=3200&&(ae.remove(i.m),fr.splice(e,1))}}function D0(n,t,e){rS(n,t),Ne.g!==ft.f&&dh();const i=Vt.N,r=Ne.b[Ne.c],s=(o,c,l)=>{o>=0&&c>=0&&o<i&&c<i&&(r[o*i+c]+=l)},a=(o,c)=>o<0||c<0||o>=i||c>=i?!0:C0(o,c);for(let o=n-1;o>n-e&&!a(o,t);o--)s(o,t,e+6+o-n);for(let o=n-1;o>n-e&&!a(o,t-1);o--)s(o,t-1,e+6+o-n);for(let o=n;o<n-1+e&&!a(o,t);o++)s(o,t,e+6+n-o);for(let o=n;o<n-1+e&&!a(o,t-1);o++)s(o,t-1,e+6+n-o);for(let o=t-1;o>t-e&&!a(n,o);o--)s(n,o,e+6+o-t);for(let o=t-1;o>t-e&&!a(n-1,o);o--)s(n-1,o,e+6+o-t);for(let o=t;o<t-1+e&&!a(n,o);o++)s(n,o,e+6+t-o);for(let o=t;o<t-1+e&&!a(n-1,o);o++)s(n-1,o,e+6+t-o);a(n-2,t-2)||s(n-2,t-2,6+e),a(n-2,t+1)||s(n-2,t+1,6+e),a(n+1,t-2)||s(n+1,t-2,6+e),a(n+1,t+1)||s(n+1,t+1,6+e),Xn(n,t),Xn(n-1,t),Xn(n,t-1),Xn(n-1,t-1),e>3&&Xn(n-1,t-1),e>4&&Xn(n,t),e>6&&Xn(n-1,t),e>8&&Xn(n,t-1),e>10&&Xn(n-1,t-1)}const aS=n=>[Math.round((n.x+Vt.N*ut/2)/ut),Math.round((n.z+Vt.N*ut/2)/ut)];function U0(n){var e;if(!n||n.dead)return;n.dead=!0;for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++)c0(n.x+r,n.y+i,0);n.mesh&&ae.remove(n.mesh);const t=uo.find(i=>i.ob===n);t&&!t.taken&&(t.taken=!0,ae.remove(t.o),t.g&&ae.remove(t.g)),n.ch==="#"?(Ne.g!==ft.f&&dh(),I0(n.x,n.y),Xn(n.x,n.y),Xn(n.x,n.y),yu(n.x,n.y,Ne.b[Ne.c]),[[1,0],[1,1],[0,1]].forEach(([i,r],s)=>{const a=n.links[s];if(a>0){const o=n.x+i,c=n.y+r;ft.f[c*ft.N+o]|=516,ft.i0[c*ft.N+o]=a}})):"Áïðñ".includes(n.ch)&&(jt("explode2",(e=n.mesh)==null?void 0:e.position),D0(n.x+1,n.y+1,8))}function oS(){Ne.g!==ft.f&&dh();const n=Vt.N,t=Ne.b[Ne.c],e=Ne.b[1-Ne.c],i=new Map,r=(s,a)=>t[(s-1)*n+a]+t[s*n+a-1]+t[s*n+a+1]+t[(s+1)*n+a];for(let s=1;s<n-1;s++)for(let a=1;a<n-1;a++){const o=r(s,a);let c=Math.sqrt(Math.max(0,o));if(c<4&&(c=0),c>0&&i.set(s*n+a,c),!C0(s,a)){const l=o<5?0:Math.trunc((o-1)*10/43);e[s*n+a]<l&&l!==0&&(yu(s,a,t),l>2&&l<20&&yu(s,a,t)),l===1&&I0(s,a),e[s*n+a]=l}}for(const[s,a]of i){const o=s/n|0,c=s%n,l=Ae(o,c);if(l&16){const f=tn.find(u=>u.id===ft.ie[c*ft.N+o]&&u.hp>0);f&&fh(f,a)}l&32&&T.obj&&xt.hp>0&&(Bl(a),xt.hp=Math.max(0,xt.hp-a/zr),kl(()=>Zr(3)))}{const s=[];for(let a=1;a<n-1;a++)for(let o=1;o<n-1;o++){const c=r(a,o);if(c<=8)continue;const l=Ae(a,o),f=l&4?He[ft.i0[o*n+a]]:l&128?He[ft.i1[o*n+a]]:null;f&&(f.cnt=f.cnt+(c&255)&255,s.includes(f)||s.push(f))}for(const a of s)a.touched=1,a.thr<=a.cnt&&U0(a),a.cnt=0}Ne.c=1-Ne.c}const cS=n=>[[n.cx,n.cy],[n.cx-1,n.cy],[n.cx,n.cy-1],[n.cx-1,n.cy-1]];async function nc(n=xt.sel){if(!T.obj||xt.ammo[n]<=0||xt.hp<=0)return;if(n===1){const l=Jr.find(f=>f.type===1);if(l){l.fuseMs=0;return}}const[t,e]=aS(T.obj.position);if(rs(t,e)&64)return;const i=po[n];n!==1&&xt.ammo[n]--;const r=await ra("bomb.cgo"),s=new cn;for(const l of r){const f=new pe(l.geometry,l.material.clone());f.material.map=Tn(i.tex),Object.assign(f.material,{color:new Yt(i.tint),side:$e,transparent:!0,depthWrite:!1,blending:Xi,blendSrc:ts,blendDst:ji}),s.add(f)}s.scale.setScalar(.5);const a=Vt.N*ut/2,o=T.face,c={o:s,type:n,cx:t,cy:e,px:t*ut-a,pz:e*ut-a,dx:Math.sin(o),dz:Math.cos(o),age:0,fuseMs:i.fuseMs,heat:0,tc:i.tickCd0||0,el2:0};s.position.set(c.px,2,c.pz),ae.add(s),Jr.push(c),sa(t,e,64)}const Be={scene:new Yu,cam:new Dl(-400,400,300,-300,-1e3,1e3),meshes:null,flares:[]};async function lS(){const n=await ra("bomb.cgo");Be.meshes=[];for(let t=0;t<3;t++){const e=po[t],i=new cn;i.scale.setScalar(8);const r=n[0],s=new pe(r.geometry,r.material.clone());s.material.map=Tn(e.tex),Object.assign(s.material,{color:new Yt(e.tint),side:$e,transparent:!0,depthWrite:!1,depthTest:!1,blending:Xi,blendSrc:ts,blendDst:ji}),s.material.needsUpdate=!0,i.add(s),i.visible=!1,s.renderOrder=1,Be.scene.add(i);const a=new pe(new Yi(50,50),new An({map:Tn("iconbomb1.tga"),transparent:!0,depthWrite:!1,depthTest:!1,side:Fe}));a.visible=!1,a.renderOrder=0,Be.scene.add(a),(Be.icons||(Be.icons=[])).push(a);const o=new pe(new Yi(60,60),new An({map:yl(63),transparent:!0,depthWrite:!1,depthTest:!1,blending:Xi,blendSrc:_r,blendDst:ji,side:Fe}));o.visible=!1,o.renderOrder=2,Be.scene.add(o),Be.meshes.push(i),Be.flares.push(o)}}function fS(){if(!Be.meshes){Be.loading||(Be.loading=!0,lS());return}const n=performance.now();let t=-360;for(let e=0;e<3;e++)Be.meshes[e].visible=Be.flares[e].visible=Be.icons[e].visible=!1;for(let e=0;e<3;e++){if(!xt.ammo[e])continue;t+=65;const i=Be.meshes[e],r=Be.flares[e],s=e===xt.sel;i.position.set(t,-260,0),i.rotation.set(s?Math.sin(n/200)*70*Math.PI/180:0,s?Math.sin(n/130)*50*Math.PI/180:0,0,"YXZ"),i.visible=!0,Be.icons[e].position.set(t,-260,-1),Be.icons[e].visible=!0,r.position.set(t,-260,1),r.rotation.z=s?Math.sin(n*.01)*90*Math.PI/180:0,r.visible=!0}On.autoClear=!1,On.clearDepth(),On.render(Be.scene,Be.cam),On.autoClear=!0}function uS(n){Zt.shakeFlag=!0;const t=po[n.type];ae.remove(n.o),Jr.splice(Jr.indexOf(n),1),fo(n.cx,n.cy,64),D0(n.cx,n.cy,t.radius),n.type===1&&(xt.ammo[1]=Math.max(0,xt.ammo[1]-1)),jt("explode1",new O(n.px,2,n.pz))}function hS(){const n=Vt.N*ut/2;for(const t of Jr.slice()){let e=!1;if(t.type===2){const i=t.px+t.dx*1.5,r=t.pz+t.dz*1.5,s=Math.round((i+n)/ut),a=Math.round((r+n)/ut);t.px=i,t.pz=r,(s!==t.cx||a!==t.cy)&&(fo(t.cx,t.cy,64),t.cx=s,t.cy=a,sa(s,a,64)),e=(rs(s,a)&658)!==0||(l0(s,a)&1024)!==0}if(t.age+=Mc,Ne.g===ft.f){const i=Vt.N,r=Ne.b[Ne.c];for(const[s,a]of cS(t))t.heat+=r[s*i+a]}(t.fuseMs<=t.age||t.heat>100||e)&&uS(t)}oS()}function np(n){ec+=n*1e3;let t=0;for(;ec>=Mc&&t++<10;)ec-=Mc,hS();for(const e of Jr){const i=po[e.type],r=n*1e3;if(e.age/2800,e.o.position.set(e.px,2,e.pz),e.o.scale.setScalar(.9),e.type===2&&(e.dx||e.dz)){const s=ec/Mc,a=(e.w1||0)+2*r;e.o.position.x+=e.dx*1.5*s,e.o.position.z+=e.dz*1.5*s;let o=Math.cos(a/2500);(o<0||a/2500>Math.PI/2)&&(o=0);const c=Math.abs(Math.cos(a/220))*(6*o);c<4.5&&a/1500<Math.PI/2&&(e.o.scale.y=.9*Math.pow(c/4.5,3))}e.el2+=2*r,e.tc-=2*r,e.w2===void 0&&(e.w2=Na(100),e.w3=Na(100)),e.w1=(e.w1||0)+2*r,e.w2+=2*r,e.w3+=2*r;{const s=T.obj.position,a=e.px-s.x,o=2,c=e.pz-s.z,l=a*a+o*o+c*c<24.75;let f=0;!e.cc&&l&&(e.cc=!0,e.rp=0),e.cc&&!e.cd&&(f=e.rp/200,e.rp<200&&(e.rp+=r)),e.cd&&(f=e.rp/200,e.rp-=r,e.rp<0&&(e.cd=!1)),e.cc&&!l&&(e.cd=!0,e.cc=!1),e.o.position.y=2-2*f}e.o.rotation.set(Math.sin(e.w2/400)*70*Math.PI/180,Math.sin(e.w3/330)*50*Math.PI/180,0,"YXZ");{const s=e.w1,a=Math.sin(s/190+s/270)*90,o=Math.sin(s/260+s/250)*.7+7;if(di(e.o.position.x,e.o.position.y,e.o.position.z,a,o,i.tint,0,63),e.pc=(e.pc||0)-r,e.pc<0){e.pc+=e.type===1?40:e.type===2?30:75-s/70;const c=Math.sin(s/2200)*200+100,l=s/c;dn(2,e.o.position.x+Math.sin(l)*3.5,e.o.position.y,e.o.position.z+Math.cos(l)*3.5)}}e.tc<0&&(jt(i.tick,e.o.position),e.tc=e.type===0?730-e.el2/10:i.tickCd)}iS(n)}addEventListener("keydown",n=>{if(n.repeat)return;const t=ne.keys();if(n.code===t[2]&&(n.preventDefault(),eS()||Wy()),n.code===t[0]&&nc(),n.code===t[1]){n.preventDefault();const e=[0,1,2].filter(r=>xt.ammo[r]>0),i=e.length?e:[0,1,2];xt.sel=i[(i.indexOf(xt.sel)+1)%i.length]}(n.code==="Digit1"||n.code==="Digit2"||n.code==="Digit3")&&(xt.sel=+n.code.slice(5)-1),n.code===t[7]&&nc(0),n.code===t[8]&&nc(1),n.code===t[9]&&nc(2),n.code===t[10]&&Xy()});requestAnimationFrame(A0);const Cs=["tutorial01","tutorial02","tutorial03",...[5,10,15,5].flatMap((n,t)=>Array.from({length:n},(e,i)=>`p0${t+1}_l${String(i+1).padStart(2,"0")}`))],N0=document.createElement("div");N0.style.cssText="position:fixed;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;background:#000a;color:#fff;font:32px sans-serif;text-align:center";document.body.appendChild(N0);let pn=!1;const dS=()=>tn.length===0;function pS(){T.obj&&(!Vt.allDead&&tn.length===0&&Vt.hadEnemies&&(Vt.allDead=!0,jt("herohaha")),tn.length&&(Vt.hadEnemies=!0))}function mS(){ne.markPassed(ia.get("level")),T.gst=8,T.speed=1,T.clockT=0,xt.invis=Math.min(xt.invis,.5),pn=!0,jt("teleport"),Ci(2),T.menuT=0}let Ni=-1;function ph(){if(ne.open)return;if(Gl){ky();return}const n=Cs.indexOf(gr);if(ne.nextLevel=n+1<Cs.length?Cs[n+1]:Cs.find(t=>t.startsWith(Cs[Cs.length-1].slice(0,4))),!vi)try{sessionStorage.setItem("dino_rec",JSON.stringify(sn)),sessionStorage.setItem("dino_win",pn?"1":"0")}catch{}ne.replayEnd=!1,ne.end(pn?"victory":"defeat")}const Ks=[],ip=[],rp={">":[1,0],"<":[-1,0],"^":[0,-1],v:[0,1]};function gS(){var e,i,r;const n=Vt.grid,t=Vt.N;for(let s=0;s<t;s++)for(let a=0;a<t;a++){const o=n[s][a];if(!((o==="L"||o==="Ç")&&(n[s][a-1]===o||((e=n[s-1])==null?void 0:e[a])===o)))if(n[s][a]==="L"){const c=(i=n[s+1])==null?void 0:i[a+1],l=((r=n[s+1])==null?void 0:r[a])==="+";Ks.push({x:a,y:s,dir:rp[n[s][a+1]]||rp["^"],active:l,warm:l?1e3:0,id:c>="1"&&c<="9"?+c:0,t:0,acc:0,hits:new Map,segs:[]})}else n[s][a]==="Ç"&&ip.push({x:a,y:s,slash:n[s][a+1]==="/"})}for(const s of Ks)for(const[a,o]of[[0,0],[1,0],[0,1],[1,1]])n[s.y+o][s.x+a]="L";for(const s of ip)for(const[a,o]of[[0,0],[1,0],[0,1],[1,1]])n[s.y+o][s.x+a]="Ç"}function F0(n){if(n.cells)for(const t of n.cells)ft.f[t]&=-1025;n.cells=[]}function _S(n,t){const e=Vt.N,i=e*ut/2,r=(x,p)=>[(x+.5)*ut-i,(p+.5)*ut-i];F0(n);let s=n.x,a=n.y,[o,c]=n.dir,l=o<1&&c<1?0:1,f=0,u=0,h=0;const m=[r(s+.5,a+.5)],g=(x,p)=>r(x+Math.abs(c)/2,p+Math.abs(o)/2);for(let x=0;x<400;x++){l++;const p=s+l*o,d=a+l*c,b=p+Math.abs(c),A=d+Math.abs(o);if(p<0||d<0||b<0||A<0||p>=e||d>=e||b>=e||A>=e){m.push(g(p-o,d-c));break}const y=d*e+p,I=A*e+b,P=ft.f[y],C=ft.f[I],L=P&C&128&&ft.i1[y]===ft.i1[I]?He[ft.i1[y]]:null;if(L&&L.ch==="Ç"&&!L.moving&&f<16){f++,m.push(r(L.x+.5,L.y+.5)),[o,c]=L.rot===90?[-c,-o]:[c,o],s=L.x,a=L.y,l=o<1&&c<1?0:1,u=h=0;continue}if(ft.f[y]|=1024,ft.f[I]|=1024,n.cells.push(y,I),P&C&16&&u&h&16&&ft.ie[y]===ft.ie[I]){const _=tn.find(w=>w.id===ft.ie[y]);return _&&t&&(_.hp-=3*t,_.hp<=0&&(fo(_.fx,_.fy,16),ae.remove(_.o),tn.splice(tn.indexOf(_),1))),m.push(g(p,d)),m}L&&!L.moving&&(L.ch==="Á"||L.ch==="#")&&t&&(L.cnt+=t,L.thr<L.cnt&&U0(L));const v=_=>(_&128)!==0;if((P|C)&2048&&v(P)===v(C)||P&C&2048||P&C&1&&ft.i0[y]===ft.i0[I]||P&C&32&&u&h&32)return m.push(g(p,d)),m;u=P,h=C}return m}function vS(n){for(const t of He){if(!t||t.ch!=="z"||t.dead||!t.mesh)continue;const e=t.sh||0;let i=t.open===void 0?0:t.open;if(t.touched&&e===0?(t.sh=1,t.touched=0):t.touched&&e>0&&(t.sh2=(t.sh2||0)+e,t.sh=1,t.touched=0),t.sh>0&&i<400){let r=(1-t.sh/3e3)*Math.sin(((t.sh2||0)+t.sh)*.01);t.open!==void 0&&(r*=1-i/400);const s=t.mesh.children,a=(o,c)=>{if(!o)return;const l=o.geometry.userData.pv,f=new O(l[0],l[1],l[2]);o.rotation.y=c,o.position.copy(f).sub(f.clone().applyAxisAngle(new O(0,1,0),c))};if(s[4]){const o=s[4].geometry.userData.pv,c=-Li.degToRad(30*r),l=new O(o[0],o[1],o[2]);s[4].rotation.z=c,s[4].position.copy(l).sub(l.clone().applyAxisAngle(new O(0,0,1),c))}a(s[1],Li.degToRad(3*r)),a(s[2],Li.degToRad(-3*r)),s[3]&&s[3].position.set(0,0,.3*r),t.sh+=n,t.sh>3e3&&(t.sh=0,t.sh2=0)}}for(const t of He){if(!t||t.ch!=="z"||t.open===void 0||t.dead)continue;const e=t.open,i=t.mesh&&t.mesh.position;if(i&&(e>=2e3&&e<n+2e3&&jt("vorota1",i),e>=400&&e<n+400&&jt("vorota2",i),e>=0&&e<n&&jt("vorota3",i)),t.mesh&&e>=2e3&&(t.mesh.children[3]&&(t.mesh.children[3].visible=!1),t.mesh.children[4]&&(t.mesh.children[4].visible=!1)),t.mesh){const r=Math.min(e,3200);if(r>2e3){const s=(Math.sin((r-2e3)/1200*Math.PI-Math.PI/2)+1)*.5;[[1,90],[2,-90]].forEach(([a,o])=>{const c=t.mesh.children[a];if(!c)return;const l=c.geometry.userData.pv,f=Li.degToRad(o*s),u=new O(l[0],l[1],l[2]);c.rotation.y=f,c.position.copy(u).sub(u.clone().applyAxisAngle(new O(0,1,0),f))})}if(!t.keyG&&!t.keyLoading&&(t.keyLoading=!0,ra("key.cgo").then(s=>{const a=new cn;for(const o of s)a.add(new pe(o.geometry,o.material));a.visible=!1,t.mesh.add(a),t.keyG=a}).catch(()=>{})),t.keyG)if(e>0&&e<400){const s=(Math.sin(e/400*Math.PI-Math.PI/2)+1)*.5;t.keyG.visible=!0,t.keyG.rotation.set(0,0,0),t.keyG.position.set(-1.823,3.93,-5.353-(1-s)*4)}else if(e>400&&e<2e3){const s=(Math.sin((e-400)/1600*Math.PI-Math.PI/2)+1)*.5;t.keyG.visible=!0,t.keyG.position.set(-1.823,3.93,-5.353),t.keyG.rotation.set(0,0,Li.degToRad(360*s))}else t.keyG.visible=!1;if(e>2e3&&e<=n+2e3){const s=t.mesh.localToWorld(new O(-1.823,3.93,-5.353));dn(4,s.x,s.y,s.z);for(let a=0;a<20;a++)dn(14,s.x,s.y,s.z)}}if(e>2400){const r=ft.N,s=(Math.round(t.rot)%360+360)%360/90,a=ft.f,o=t.x,c=t.y,l=(u,h)=>{u>=0&&h>=0&&u<r&&h<r&&(a[h*r+u]&=59388)},f=(u,h)=>{u>=0&&h>=0&&u<r&&h<r&&(a[h*r+u]|=6147)};if(s&1){l(o,c+1),l(o,c+2);const u=s===3?1:-1;f(o+u,c),f(o+u,c+3)}else{l(o+1,c),l(o+2,c);const u=s===2?-1:1;f(o,c+u),f(o+3,c+u)}}t.open=e+n}}function xS(n){for(const t of Ks){const e=He[ft.i0[t.y*ft.N+t.x]];if(!e||e.ch!=="L"||!e.mesh||(!t.bat&&!t.batLoading&&(t.batLoading=!0,ra("batareyka.cgo").then(I=>{I[0]&&(t.bat=new pe(I[0].geometry,I[0].material),t.bat.matrixAutoUpdate=!1,t.bat.frustumCulled=!1,ae.add(t.bat))}).catch(()=>{})),!t.bat)||(t.bat.visible=!!t.active,!t.active))continue;const i=Math.min(1,t.warm/1e3),r=i>.3?1:i/.3,s=i<=.3?0:(i-.3)/(1-.3);t.spin=(t.spin||0)+n*1e3;const a=Li.degToRad(e.rot),o=Math.cos(a),c=Math.sin(a),l=e.mesh.position;let f=[o,c,0],u=[-c,o,0];const h=[l.x,l.z,0],m=(1-s)*3;h[0]+=m*u[0],h[1]+=m*u[1],h[2]+=m*u[2]+4,f=[r,f[1],f[2]],u=[u[0],r,u[2]];const g=[0,0,.8*r],x=Li.degToRad(t.spin*.2),p=Math.cos(x),d=Math.sin(x),b=u.map((I,P)=>p*I-d*f[P]),A=f.map((I,P)=>d*u[P]+p*I),y=new Ht().makeBasis(new O(A[0],A[2],A[1]),new O(g[0],g[2],g[1]),new O(b[0],b[2],b[1]));y.setPosition(h[0],h[2],h[1]),t.bat.matrix.copy(y),t.bat.matrixWorldNeedsUpdate=!0}}function sp(n){var e;vS(n*1e3),xS(n);let t=0;(e=T.obj)==null||e.position;for(const i of Ks){if(!i.active){F0(i);continue}if(i.warm<1e3){const o=i.warm;if(i.warm+=n*1e3,o<=500&&i.warm>500&&jt("laservkl",new O(i.x*ut-Vt.N*ut/2,0,i.y*ut-Vt.N*ut/2)),i.warm<1e3)continue}if(i.t+=n*1e3,i.id>=1&&Math.floor(i.t/(i.id*300))&1)continue;i.acc+=n;const r=Math.floor(i.acc/.033);i.acc-=r*.033;const s=_S(i,r),a=(o,c,l)=>{(i[o]||0)>0?i[o]-=33:(jt("objectspark",new O(c[0],8.5,c[1])),i[o]=Dt(50)+l)};for(let o=0;o<r&&s.length;o++){a("spk1",s[0],150),a("spk2",s[s.length-1],150);for(let c=1;c+1<s.length;c++)a("spk3",s[c],130)}for(let o=0;o+1<s.length;o++){const[c,l]=s[o],[f,u]=s[o+1],h=Math.hypot(f-c,u-l);h<.01||(t=MS(t,c,l,f,u,h,i.id))}if(s.length>1){const o=s[s.length-1];dn(13,o[0],8.5,o[1]);for(let c=1;c+1<s.length;c++)dn(12,s[c][0],8.5,s[c][1])}}yS(t)}const mo=1600,Qr=new Ge,yc=new Float32Array(mo*12),wa=new Float32Array(mo*16),Su=new Float32Array(mo*8);Qr.setAttribute("position",new ye(yc,3));Qr.setAttribute("color",new ye(wa,4));Qr.setAttribute("uv",new ye(Su,2));{const n=[];for(let t=0;t<mo;t++)n.push(t*4,t*4+1,t*4+2,t*4+1,t*4+3,t*4+2);Qr.setIndex(n)}const Vl=new pe(Qr,new An({map:Tn("flare.jpg"),vertexColors:!0,transparent:!0,blending:Sc,depthWrite:!1,side:Fe}));Vl.frustumCulled=!1;Vl.renderOrder=5;ae.add(Vl);let Fr=0;function MS(n,t,e,i,r,s,a){n===0&&(Fr=0);const o=Math.max(1,Math.round(s/5)),c=(i-t)/s,l=(r-e)/s,f=-l,u=c,h=1.9/2,m=[];for(let g=0;g<=o;g++){const x=g/o,p=g>0&&g<o?mt(.2)*5:0;m.push([t+(i-t)*x+f*p,e+(r-e)*x+u*p])}for(let g=0;g<o&&Fr<mo;g++,Fr++)for(let x=0;x<4;x++){const p=Fr*4+x,d=m[g+(x>>1)],b=x&1?1:-1;yc[p*3]=d[0]+f*h*b,yc[p*3+1]=8.5,yc[p*3+2]=d[1]+u*h*b,wa[p*4]=a===0?Dt(30)/255:1,wa[p*4+1]=Dt(80)/255,wa[p*4+2]=a===0?1:Dt(255)/255,wa[p*4+3]=150/255,Su[p*2]=x>>1,Su[p*2+1]=x&1}return n+1}function yS(n){n===0&&(Fr=0),Qr.setDrawRange(0,Fr*6);for(const t of["position","color","uv"])Qr.attributes[t].needsUpdate=!0;Vl.visible=Fr>0}let qf=!1;function SS(){const n=ln(2);if(T.state="death",T.ch.play(T.deaths[n],!1),!qf){const[t,e]=zl(),i=[];for(let r=0;r<8;r++)rs(t+se[r][0],e+se[r][1])&2||i.push(r);if(i.length){const r=n===1?T.dir+6&7:T.dir;let s=i[0];t:for(let a=0;a<5;a++)for(const o of[r+a&7,r+8-a&7])if(i.includes(o)){s=o;break t}Ci(n===1?s+6&7:s)}sa(t,e,2)}qf||(ja(0),qf=!0,Ni=0,T.speed=1,T.clockT=0,xt.invis=Math.min(xt.invis,.5))}
