"use strict";(self.webpackChunkchat_on_angular=self.webpackChunkchat_on_angular||[]).push([[464],{3464:(A,g,o)=>{o.r(g),o.d(g,{CustomerModule:()=>Z});var m=o(8583),w=o(5209),l=o(665),u=o(9765),d=o(8049),p=o(6782),C=o(2340),s=o(7716),b=o(629),x=o(1317),y=o(1562),P=o(7318);let f=(()=>{class n{constructor(t,e,a){this.afs=t,this.afAuth=e,this.db=a,this.customerStatus=new u.xQ,this.newMessage=new u.xQ,this.messages=[],this.clientId="",this.chatRoomId=""}initCustomer(){this.clientId=localStorage.getItem("clientId"),this.clientId||(this.clientId=Math.random().toString(36).slice(-8),localStorage.setItem("clientId",this.clientId)),this.checkForChatRoom()}checkForChatRoom(){this.db.list("chatRooms",e=>e.orderByChild("clientId").equalTo(this.clientId)).snapshotChanges().pipe((0,d.P)()).subscribe(e=>{(e=e.filter(a=>{var i;return"open"===(null===(i=a.payload.val())||void 0===i?void 0:i.status)})).length?(this.chatRoomId=e[0].key,this.initChatRoom()):console.log("no open chat room")})}createChatRoom(){this.db.list("chatRooms").push({isAgent:!1,clientId:this.clientId,date:(new Date).toString(),status:"open"}).then(t=>{this.chatRoomId=t.key,this.initChatRoom()})}initChatRoom(){this.customerStatus.next("chat-started"),this.db.list("chatRooms/"+this.chatRoomId).snapshotChanges().subscribe(e=>{const a=e.find(h=>"status"===h.key),i=e.find(h=>"messages"===h.key);"open"===(null==a?void 0:a.payload.val())&&i&&Object.values(i.payload.val()).sort((h,r)=>h.time-r.time).map(h=>{const r=h;if(!this.messages.find(v=>v.time===r.time)){const k=new Date(r.time).toTimeString().substr(0,5),S={time:r.time,dateText:k,sender:r.sender,message:r.message};this.messages.push(S),this.newMessage.next(S)}return r})})}sendMessage(t){const e={time:(new Date).getTime(),sender:"client",message:t};this.db.list("chatRooms/"+this.chatRoomId+"/messages").push(e)}endChat(){this.db.list("chatRooms").update(this.chatRoomId,{status:"closed"}),this.customerStatus.next("waiting"),this.chatRoomId="",this.messages=[]}}return n.\u0275fac=function(t){return new(t||n)(s.LFG(x.ST),s.LFG(y.zQ),s.LFG(P.KQ))},n.\u0275prov=s.Yz7({token:n,factory:n.\u0275fac}),n})();var I=o(5298);function O(n,c){if(1&n){const t=s.EpF();s.ynx(0),s.TgZ(1,"app-messages",4),s.NdJ("messageSent",function(a){return s.CHM(t),s.oxw().insertMessage(a)}),s.qZA(),s.BQk()}if(2&n){const t=s.oxw();s.xp6(1),s.Q6J("messages",t.messages)("newMessages",t.newMessages)}}const R=function(n){return{"close-on":n}};let T=(()=>{class n{constructor(t,e){this.authService=t,this.customerService=e,this.destroy$=new u.xQ,this.customerStatus="waiting",this.messages=[],this.newMessages=0,this.inputForm=new l.cw({message:new l.NI})}ngOnInit(){this.authService.signInCheckRemote({email:C.N.customer.email,password:C.N.customer.password}),this.authService.isFbUserSingedIn.pipe((0,d.P)()).subscribe(t=>{t&&this.continueToInit()})}onMessage(t){t.data.innerWidth&&(this.isParentMobile=t.data.innerWidth<992),this.setCustomerStatus(this.customerStatus)}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.unsubscribe()}setCustomerStatus(t){"chat-started"===t?this.isParentMobile?parent.postMessage([{prop:"width",value:"100%"},{prop:"height",value:"100%"}],"*"):parent.postMessage([{prop:"width",value:"304px"},{prop:"height",value:"565px"}],"*"):parent.postMessage([{prop:"width",value:"100px"},{prop:"height",value:"90px"}],"*"),this.customerStatus=t}continueToInit(){this.customerService.customerStatus.pipe((0,p.R)(this.destroy$)).subscribe(t=>{this.setCustomerStatus(t)}),this.customerService.newMessage.pipe((0,p.R)(this.destroy$)).subscribe(t=>{this.messages.push(t),this.newMessages++}),this.customerService.initCustomer()}createChatRoom(){this.customerService.createChatRoom()}insertMessage(t){this.customerService.sendMessage(t),this.inputForm.reset()}}return n.\u0275fac=function(t){return new(t||n)(s.Y36(b.e),s.Y36(f))},n.\u0275cmp=s.Xpm({type:n,selectors:[["app-customer"]],hostBindings:function(t,e){1&t&&s.NdJ("message",function(i){return e.onMessage(i)},!1,s.Jf7)},decls:6,vars:4,consts:[[4,"ngIf"],[1,"switch-btn",3,"ngClass","click"],["src","assets/images/mail.svg","alt","mail"],[1,"close-icon"],[3,"messages","newMessages","messageSent"]],template:function(t,e){1&t&&(s.YNc(0,O,2,2,"ng-container",0),s.TgZ(1,"button",1),s.NdJ("click",function(){return"chat-started"===e.customerStatus?e.setCustomerStatus("minimized"):"waiting"===e.customerStatus?e.createChatRoom():e.setCustomerStatus("chat-started")}),s._UZ(2,"img",2),s.TgZ(3,"span",3),s._UZ(4,"span"),s._UZ(5,"span"),s.qZA(),s.qZA()),2&t&&(s.Q6J("ngIf","chat-started"===e.customerStatus),s.xp6(1),s.Q6J("ngClass",s.VKq(2,R,"chat-started"===e.customerStatus)))},directives:[m.O5,m.mk,I.d],styles:[".switch-btn[_ngcontent-%COMP%]{background-color:#4f4fb9;width:75px;height:75px;border-radius:1000px;border:0;cursor:pointer;float:right;margin:10px 10px 10px 0}.switch-btn[_ngcontent-%COMP%]:hover{border:0}.switch-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:56px;transition:opacity .3s .3s}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{width:50px;display:inline-block;margin-top:-34px;vertical-align:top;float:left;margin-left:6px}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{opacity:0;transition:all .3s 0s}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){display:block;height:3px;background-color:#000;transform:translate(-10px,-7px) rotate(45deg)}.switch-btn[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){display:block;height:3px;background-color:#000;transform:translate(10px,-10px) rotate(-45deg)}.switch-btn.close-on[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{opacity:0;transition-delay:0s}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{opacity:1;transition-delay:.3s}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){transform:translateY(3px) rotate(45deg)}.switch-btn.close-on[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){transform:translate(0) rotate(-45deg)}"]}),n})();var M=o(9932),F=o(4466);const Q={suppressScrollX:!0,wheelSpeed:1,swipeEasing:!1};let Z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({providers:[f,{provide:M.op,useValue:Q}],imports:[[m.ez,w.Bz.forChild([{path:"",component:T}]),l.UX,M.Xd,F.m]]}),n})()}}]);