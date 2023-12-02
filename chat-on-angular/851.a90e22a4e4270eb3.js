"use strict";(self.webpackChunkchat_on_angular=self.webpackChunkchat_on_angular||[]).push([[851],{5851:(lt,V,l)=>{l.r(V),l.d(V,{CustomerModule:()=>it});var T=l(4755),L=l(8395),X=l(1199),ye=l(8929),$=l(7224),Y=l(7625),N=l(2340),P=l(9826),b=l(9448),a=l(2223),Ce=l(629),ve=l(2788),W=l(1086),be=l(5254),we=l(6498),Ee=l(1406),Te=l(2198),k=l(4850),Pe=l(7545);class A{}class j{}class w{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?this.lazyInit="string"==typeof e?()=>{this.headers=new Map,e.split("\n").forEach(t=>{const n=t.indexOf(":");if(n>0){const r=t.slice(0,n),i=r.toLowerCase(),o=t.slice(n+1).trim();this.maybeSetNormalizedName(r,i),this.headers.has(i)?this.headers.get(i).push(o):this.headers.set(i,[o])}})}:()=>{this.headers=new Map,Object.entries(e).forEach(([t,n])=>{let r;if(r="string"==typeof n?[n]:"number"==typeof n?[n.toString()]:n.map(i=>i.toString()),r.length>0){const i=t.toLowerCase();this.headers.set(i,r),this.maybeSetNormalizedName(t,i)}})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();const t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof w?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){const t=new w;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof w?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){const t=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if("string"==typeof n&&(n=[n]),0===n.length)return;this.maybeSetNormalizedName(e.name,t);const r=("a"===e.op?this.headers.get(t):void 0)||[];r.push(...n),this.headers.set(t,r);break;case"d":const i=e.value;if(i){let o=this.headers.get(t);if(!o)return;o=o.filter(d=>-1===i.indexOf(d)),0===o.length?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,o)}else this.headers.delete(t),this.normalizedNames.delete(t)}}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}}class Me{encodeKey(e){return Z(e)}encodeValue(e){return Z(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}}const Se=/%(\d[a-f0-9])/gi,Oe={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Z(s){return encodeURIComponent(s).replace(Se,(e,t)=>Oe[t]??e)}function F(s){return`${s}`}class E{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new Me,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=function Re(s,e){const t=new Map;return s.length>0&&s.replace(/^\?/,"").split("&").forEach(r=>{const i=r.indexOf("="),[o,d]=-1==i?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,i)),e.decodeValue(r.slice(i+1))],c=t.get(o)||[];c.push(d),t.set(o,c)}),t}(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{const n=e.fromObject[t],r=Array.isArray(n)?n.map(F):[F(n)];this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();const t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){const t=[];return Object.keys(e).forEach(n=>{const r=e[n];Array.isArray(r)?r.forEach(i=>{t.push({param:n,value:i,op:"a"})}):t.push({param:n,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{const t=this.encoder.encodeKey(e);return this.map.get(e).map(n=>t+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>""!==e).join("&")}clone(e){const t=new E({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){null===this.map&&(this.map=new Map),null!==this.cloneFrom&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":const t=("a"===e.op?this.map.get(e.param):void 0)||[];t.push(F(e.value)),this.map.set(e.param,t);break;case"d":if(void 0===e.value){this.map.delete(e.param);break}{let n=this.map.get(e.param)||[];const r=n.indexOf(F(e.value));-1!==r&&n.splice(r,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}}}),this.cloneFrom=this.updates=null)}}class Ie{constructor(){this.map=new Map}set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}}function Q(s){return typeof ArrayBuffer<"u"&&s instanceof ArrayBuffer}function q(s){return typeof Blob<"u"&&s instanceof Blob}function ee(s){return typeof FormData<"u"&&s instanceof FormData}class O{constructor(e,t,n,r){let i;if(this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase(),function xe(s){switch(s){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}(this.method)||r?(this.body=void 0!==n?n:null,i=r):i=n,i&&(this.reportProgress=!!i.reportProgress,this.withCredentials=!!i.withCredentials,i.responseType&&(this.responseType=i.responseType),i.headers&&(this.headers=i.headers),i.context&&(this.context=i.context),i.params&&(this.params=i.params)),this.headers||(this.headers=new w),this.context||(this.context=new Ie),this.params){const o=this.params.toString();if(0===o.length)this.urlWithParams=t;else{const d=t.indexOf("?");this.urlWithParams=t+(-1===d?"?":d<t.length-1?"&":"")+o}}else this.params=new E,this.urlWithParams=t}serializeBody(){return null===this.body?null:Q(this.body)||q(this.body)||ee(this.body)||function He(s){return typeof URLSearchParams<"u"&&s instanceof URLSearchParams}(this.body)||"string"==typeof this.body?this.body:this.body instanceof E?this.body.toString():"object"==typeof this.body||"boolean"==typeof this.body||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return null===this.body||ee(this.body)?null:q(this.body)?this.body.type||null:Q(this.body)?null:"string"==typeof this.body?"text/plain":this.body instanceof E?"application/x-www-form-urlencoded;charset=UTF-8":"object"==typeof this.body||"number"==typeof this.body||"boolean"==typeof this.body?"application/json":null}clone(e={}){const t=e.method||this.method,n=e.url||this.url,r=e.responseType||this.responseType,i=void 0!==e.body?e.body:this.body,o=void 0!==e.withCredentials?e.withCredentials:this.withCredentials,d=void 0!==e.reportProgress?e.reportProgress:this.reportProgress;let c=e.headers||this.headers,f=e.params||this.params;const g=e.context??this.context;return void 0!==e.setHeaders&&(c=Object.keys(e.setHeaders).reduce((v,y)=>v.set(y,e.setHeaders[y]),c)),e.setParams&&(f=Object.keys(e.setParams).reduce((v,y)=>v.set(y,e.setParams[y]),f)),new O(t,n,i,{params:f,headers:c,context:g,reportProgress:d,responseType:r,withCredentials:o})}}var p=(()=>((p=p||{})[p.Sent=0]="Sent",p[p.UploadProgress=1]="UploadProgress",p[p.ResponseHeader=2]="ResponseHeader",p[p.DownloadProgress=3]="DownloadProgress",p[p.Response=4]="Response",p[p.User=5]="User",p))();class J{constructor(e,t=200,n="OK"){this.headers=e.headers||new w,this.status=void 0!==e.status?e.status:t,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}}class _ extends J{constructor(e={}){super(e),this.type=p.ResponseHeader}clone(e={}){return new _({headers:e.headers||this.headers,status:void 0!==e.status?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}}class M extends J{constructor(e={}){super(e),this.type=p.Response,this.body=void 0!==e.body?e.body:null}clone(e={}){return new M({body:void 0!==e.body?e.body:this.body,headers:e.headers||this.headers,status:void 0!==e.status?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}}class te extends J{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.message=this.status>=200&&this.status<300?`Http failure during parsing for ${e.url||"(unknown url)"}`:`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}}function U(s,e){return{body:e,headers:s.headers,context:s.context,observe:s.observe,params:s.params,reportProgress:s.reportProgress,responseType:s.responseType,withCredentials:s.withCredentials}}let se=(()=>{class s{constructor(t){this.handler=t}request(t,n,r={}){let i;if(t instanceof O)i=t;else{let c,f;c=r.headers instanceof w?r.headers:new w(r.headers),r.params&&(f=r.params instanceof E?r.params:new E({fromObject:r.params})),i=new O(t,n,void 0!==r.body?r.body:null,{headers:c,context:r.context,params:f,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials})}const o=(0,W.of)(i).pipe((0,Ee.b)(c=>this.handler.handle(c)));if(t instanceof O||"events"===r.observe)return o;const d=o.pipe((0,Te.h)(c=>c instanceof M));switch(r.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return d.pipe((0,k.U)(c=>{if(null!==c.body&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return d.pipe((0,k.U)(c=>{if(null!==c.body&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return d.pipe((0,k.U)(c=>{if(null!==c.body&&"string"!=typeof c.body)throw new Error("Response is not a string.");return c.body}));default:return d.pipe((0,k.U)(c=>c.body))}case"response":return d;default:throw new Error(`Unreachable: unhandled observe type ${r.observe}}`)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:(new E).append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,r={}){return this.request("PATCH",t,U(r,n))}post(t,n,r={}){return this.request("POST",t,U(r,n))}put(t,n,r={}){return this.request("PUT",t,U(r,n))}}return s.\u0275fac=function(t){return new(t||s)(a.LFG(A))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac}),s})();function ne(s,e){return e(s)}function Ne(s,e){return(t,n)=>e.intercept(t,{handle:r=>s(r,n)})}const Ae=new a.OlP(""),I=new a.OlP(""),re=new a.OlP("");function Fe(){let s=null;return(e,t)=>(null===s&&(s=((0,a.f3M)(Ae,{optional:!0})??[]).reduceRight(Ne,ne)),s(e,t))}let oe=(()=>{class s extends A{constructor(t,n){super(),this.backend=t,this.injector=n,this.chain=null}handle(t){if(null===this.chain){const n=Array.from(new Set([...this.injector.get(I),...this.injector.get(re,[])]));this.chain=n.reduceRight((r,i)=>function ke(s,e,t){return(n,r)=>t.runInContext(()=>e(n,i=>s(i,r)))}(r,i,this.injector),ne)}return this.chain(t,n=>this.backend.handle(n))}}return s.\u0275fac=function(t){return new(t||s)(a.LFG(j),a.LFG(a.lqb))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac}),s})();const je=/^\)\]\}',?\n/;let ae=(()=>{class s{constructor(t){this.xhrFactory=t}handle(t){if("JSONP"===t.method)throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");const n=this.xhrFactory;return(n.\u0275loadImpl?(0,be.D)(n.\u0275loadImpl()):(0,W.of)(null)).pipe((0,Pe.w)(()=>new we.y(i=>{const o=n.build();if(o.open(t.method,t.urlWithParams),t.withCredentials&&(o.withCredentials=!0),t.headers.forEach((u,m)=>o.setRequestHeader(u,m.join(","))),t.headers.has("Accept")||o.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){const u=t.detectContentTypeHeader();null!==u&&o.setRequestHeader("Content-Type",u)}if(t.responseType){const u=t.responseType.toLowerCase();o.responseType="json"!==u?u:"text"}const d=t.serializeBody();let c=null;const f=()=>{if(null!==c)return c;const u=o.statusText||"OK",m=new w(o.getAllResponseHeaders()),S=function Je(s){return"responseURL"in s&&s.responseURL?s.responseURL:/^X-Request-URL:/m.test(s.getAllResponseHeaders())?s.getResponseHeader("X-Request-URL"):null}(o)||t.url;return c=new _({headers:m,status:o.status,statusText:u,url:S}),c},g=()=>{let{headers:u,status:m,statusText:S,url:ge}=f(),C=null;204!==m&&(C=typeof o.response>"u"?o.responseText:o.response),0===m&&(m=C?200:0);let G=m>=200&&m<300;if("json"===t.responseType&&"string"==typeof C){const at=C;C=C.replace(je,"");try{C=""!==C?JSON.parse(C):null}catch(ct){C=at,G&&(G=!1,C={error:ct,text:C})}}G?(i.next(new M({body:C,headers:u,status:m,statusText:S,url:ge||void 0})),i.complete()):i.error(new te({error:C,headers:u,status:m,statusText:S,url:ge||void 0}))},v=u=>{const{url:m}=f(),S=new te({error:u,status:o.status||0,statusText:o.statusText||"Unknown Error",url:m||void 0});i.error(S)};let y=!1;const D=u=>{y||(i.next(f()),y=!0);let m={type:p.DownloadProgress,loaded:u.loaded};u.lengthComputable&&(m.total=u.total),"text"===t.responseType&&o.responseText&&(m.partialText=o.responseText),i.next(m)},H=u=>{let m={type:p.UploadProgress,loaded:u.loaded};u.lengthComputable&&(m.total=u.total),i.next(m)};let K;o.addEventListener("load",g),o.addEventListener("error",v),o.addEventListener("timeout",v),o.addEventListener("abort",v),t.reportProgress&&(o.addEventListener("progress",D),null!==d&&o.upload&&o.upload.addEventListener("progress",H));const fe=()=>{K??=function Ue(){const s=setTimeout(()=>{},_e);return()=>clearTimeout(s)}()},me=()=>{K?.()};return o.addEventListener("loadstart",fe),o.addEventListener("loadend",me),o.send(d),i.next({type:p.Sent}),()=>{o.removeEventListener("loadstart",fe),o.removeEventListener("loadend",me),o.removeEventListener("error",v),o.removeEventListener("abort",v),o.removeEventListener("load",g),o.removeEventListener("timeout",v),K?.(),t.reportProgress&&(o.removeEventListener("progress",D),null!==d&&o.upload&&o.upload.removeEventListener("progress",H)),o.readyState!==o.DONE&&o.abort()}})))}}return s.\u0275fac=function(t){return new(t||s)(a.LFG(T.JF))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac}),s})();const _e=2147483647,B=new a.OlP("XSRF_ENABLED"),ce=new a.OlP("XSRF_COOKIE_NAME",{providedIn:"root",factory:()=>"XSRF-TOKEN"}),le=new a.OlP("XSRF_HEADER_NAME",{providedIn:"root",factory:()=>"X-XSRF-TOKEN"});class de{}let Ke=(()=>{class s{constructor(t,n,r){this.doc=t,this.platform=n,this.cookieName=r,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if("server"===this.platform)return null;const t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=(0,T.Mx)(t,this.cookieName),this.lastCookieString=t),this.lastToken}}return s.\u0275fac=function(t){return new(t||s)(a.LFG(T.K0),a.LFG(a.Lbi),a.LFG(ce))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac}),s})();function Ge(s,e){const t=s.url.toLowerCase();if(!(0,a.f3M)(B)||"GET"===s.method||"HEAD"===s.method||t.startsWith("http://")||t.startsWith("https://"))return e(s);const n=(0,a.f3M)(de).getToken(),r=(0,a.f3M)(le);return null!=n&&!s.headers.has(r)&&(s=s.clone({headers:s.headers.set(r,n)})),e(s)}var h=(()=>((h=h||{})[h.Interceptors=0]="Interceptors",h[h.LegacyInterceptors=1]="LegacyInterceptors",h[h.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",h[h.NoXsrfProtection=3]="NoXsrfProtection",h[h.JsonpSupport=4]="JsonpSupport",h[h.RequestsMadeViaParent=5]="RequestsMadeViaParent",h))();function R(s,e){return{\u0275kind:s,\u0275providers:e}}function Ve(...s){const e=[se,ae,oe,{provide:A,useExisting:oe},{provide:j,useExisting:ae},{provide:I,useValue:Ge,multi:!0},{provide:B,useValue:!0},{provide:de,useClass:Ke}];for(const t of s)e.push(...t.\u0275providers);return(0,a.MR2)(e)}const ue=new a.OlP("LEGACY_INTERCEPTOR_FN");let Ye=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=a.oAB({type:s}),s.\u0275inj=a.cJS({providers:[Ve(R(h.LegacyInterceptors,[{provide:ue,useFactory:Fe},{provide:I,useExisting:ue,multi:!0}]))]}),s})();var z=l(1806);let he=(()=>{class s{constructor(t,n,r){this.db=t,this.httpClient=n,this.store=r,this.messages=[],this.clientId="",this.chatRoomId=""}initCustomer(){this.clientId=localStorage.getItem("clientId"),this.clientId||(this.clientId=Math.random().toString(36).slice(-8),localStorage.setItem("clientId",this.clientId)),this.checkForChatRoom()}checkForChatRoom(){this.db.list("chatRooms",n=>n.orderByChild("clientId").equalTo(this.clientId)).snapshotChanges().pipe((0,$.P)()).subscribe(n=>{(n=n.filter(r=>"open"===r.payload.val()?.status)).length?(this.chatRoomId=n[0].key,this.initChatRoom()):(console.log("no open chat room"),this.store.dispatch((0,P.wX)(b._.waiting)))})}createChatRoom(){this.db.list("chatRooms").push({isAgent:!1,clientId:this.clientId,date:(new Date).toString(),status:"open"}).then(t=>{this.chatRoomId=t.key,this.initChatRoom(!0)})}initChatRoom(t){t&&this.sendNotificationEmail(),this.store.dispatch((0,P.wX)(b._.chatStarted)),this.db.list("chatRooms/"+this.chatRoomId).snapshotChanges().subscribe(i=>{const o=i.find(f=>"status"===f.key),d=i.find(f=>"messages"===f.key);"open"===o?.payload.val()&&d?Object.values(d.payload.val()).sort((f,g)=>f.time-g.time).map(f=>{const g=f;if(!this.messages.find(y=>y.time===g.time)){const D=new Date(g.time).toTimeString().substr(0,5),H={time:g.time,dateText:D,sender:g.sender,isInfo:g.isInfo,message:g.message};this.messages.push(H),this.store.dispatch((0,P.rW)(H))}return g}):this.sendMessage("Welcome, you are now chatting with an agent of ours",!0)})}sendNotificationEmail(){N.N.formspreeApiUrl&&this.httpClient.post(N.N.formspreeApiUrl,{email:"a@a.com",message:"new coa customer has started chating"}).subscribe()}sendMessage(t,n){const r={time:(new Date).getTime(),sender:"client",message:t};n&&(r.isInfo=!0),this.db.list("chatRooms/"+this.chatRoomId+"/messages").push(r)}endChat(){this.db.list("chatRooms").update(this.chatRoomId,{status:"closed"}),this.store.dispatch((0,P.wX)(b._.waiting)),this.chatRoomId="",this.messages=[]}}return s.\u0275fac=function(t){return new(t||s)(a.LFG(ve.KQ),a.LFG(se),a.LFG(z.yh))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac}),s})();var tt=l(4115);function st(s,e){if(1&s){const t=a.EpF();a.ynx(0),a.TgZ(1,"app-messages",6),a.NdJ("messageSent",function(r){a.CHM(t);const i=a.oxw();return a.KtG(i.insertMessage(r))}),a.qZA(),a.BQk()}if(2&s){const t=a.oxw();a.xp6(1),a.Q6J("messages",t.messages)("newMessages",t.newMessages)}}const nt=function(s,e){return{"close-on":s,loading:e}};let rt=(()=>{class s{constructor(t,n,r,i,o){this.authService=t,this.customerService=n,this.store=r,this.router=i,this.activatedRoute=o,this.destroy$=new ye.xQ,this.messages=[],this.newMessages=0,this.inputForm=new X.nJ({message:new X.p4}),this.customerStates=b._}ngOnInit(){this.activatedRoute.snapshot.queryParams["go-to-agent-panel"]&&this.router.navigate(["agent"]),this.authService.signInCheckRemote({email:N.N.customer.email,password:N.N.customer.password}),this.authService.isFbUserSingedIn.pipe((0,$.P)()).subscribe(n=>{n&&this.continueToInit()})}onMessage(t){t.data.innerWidth&&(this.isParentMobile=t.data.innerWidth<992)}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.unsubscribe()}onClickSwitchButton(){switch(this.customerStatus){case b._.chatStarted:this.store.dispatch((0,P.wX)(b._.minimized));break;case b._.waiting:this.createChatRoom();break;case b._.minimized:this.store.dispatch((0,P.wX)(b._.chatStarted))}}handleCustomerStatus(t){t===b._.chatStarted?this.isParentMobile?parent.postMessage([{prop:"width",value:"100%"},{prop:"height",value:"100%"}],"*"):parent.postMessage([{prop:"width",value:"324px"},{prop:"height",value:"575px"}],"*"):parent.postMessage([{prop:"width",value:"100px"},{prop:"height",value:"100px"}],"*"),this.customerStatus=t}continueToInit(){this.store.select("customerState").pipe((0,Y.R)(this.destroy$)).subscribe(t=>{this.handleCustomerStatus(t)}),this.store.select("messages").pipe((0,Y.R)(this.destroy$)).subscribe(t=>{this.messages=t,this.newMessages++}),this.customerService.initCustomer()}createChatRoom(){this.customerService.createChatRoom()}insertMessage(t){this.customerService.sendMessage(t),this.inputForm.reset()}}return s.\u0275fac=function(t){return new(t||s)(a.Y36(Ce.e),a.Y36(he),a.Y36(z.yh),a.Y36(L.F0),a.Y36(L.gz))},s.\u0275cmp=a.Xpm({type:s,selectors:[["app-customer"]],hostBindings:function(t,n){1&t&&a.NdJ("message",function(i){return n.onMessage(i)},!1,a.Jf7)},decls:8,vars:5,consts:[[4,"ngIf"],[1,"switch-btn",3,"ngClass","click"],["src","assets/images/mail3.svg","alt","mail"],[1,"close-icon"],[1,"down-arrow"],[1,"box"],[3,"messages","newMessages","messageSent"]],template:function(t,n){1&t&&(a.YNc(0,st,2,2,"ng-container",0),a.TgZ(1,"button",1),a.NdJ("click",function(){return n.onClickSwitchButton()}),a._UZ(2,"img",2),a.TgZ(3,"span",3),a._UZ(4,"span")(5,"span"),a.qZA(),a.TgZ(6,"div",4),a._UZ(7,"div",5),a.qZA()()),2&t&&(a.Q6J("ngIf",n.customerStatus===n.customerStates.chatStarted),a.xp6(1),a.Q6J("ngClass",a.WLB(2,nt,n.customerStatus===n.customerStates.chatStarted,n.customerStatus===n.customerStates.willInit)))},dependencies:[T.mk,T.O5,tt.d],styles:[".switch-btn[_ngcontent-%COMP%]{width:75px;height:75px;border:0;border-radius:1000px;cursor:pointer;float:right;margin:10px 16px 16px 0;transition:all .6s;background:#1174c4;position:relative}.switch-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:46px;transition:opacity .3s .3s;margin-top:8px}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{width:50px;display:inline-block;margin-top:-34px;vertical-align:top;float:left;margin-left:6px}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{opacity:0;transition:all .1s 0s}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){display:block;height:3px;background-color:#eee;transform:translate(-40px,-1px) rotate(0)}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){display:block;height:3px;background-color:#eee;transform:translateY(-42px) rotate(-90deg)}.switch-btn[_ngcontent-%COMP%]   .down-arrow[_ngcontent-%COMP%]{display:inline-block;overflow:hidden;position:absolute;top:73px;left:26px}.switch-btn[_ngcontent-%COMP%]   .down-arrow[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{width:25px;height:25px;background:#1174c4;transform:translateY(-18px) rotate(45deg) skew(10deg,10deg)}.switch-btn.close-on[_ngcontent-%COMP%]{transform:rotate(135deg)}.switch-btn.close-on[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{opacity:0;transition-delay:0s}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{opacity:1;transition-delay:.3s}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){transform:translateY(3px) rotate(0)}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){transform:translate(0) rotate(-90deg)}.switch-btn.loading[_ngcontent-%COMP%]{opacity:.6}"]}),s})();var ot=l(4466),pe=l(5546);let it=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=a.oAB({type:s}),s.\u0275inj=a.cJS({providers:[he],imports:[T.ez,L.Bz.forChild([{path:"",component:rt}]),X.UX,Ye,ot.m,z.Aw.forRoot({messages:pe.XN,customerState:pe.dI})]}),s})()}}]);