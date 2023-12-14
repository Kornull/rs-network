import{$ as Qt,$a as Ie,A as ut,B as V,D as Ht,Db as Re,Ea as se,Eb as De,Fb as ke,G as C,Ga as ae,Gb as je,H as Gt,Hb as Ne,I as U,Ib as Q,J as I,Ja as ce,Jb as _e,K,L as Z,La as pe,Lb as Le,M as Vt,Ma as le,Mb as Pe,Na as ue,Nb as tt,Oa as me,Ob as N,P as Kt,Pa as he,Pb as Ue,Q as Zt,Qa as de,Qb as Fe,R as Xt,Ra as Y,Rb as $e,Sa as fe,Sb as ze,T as Jt,Ta as ge,Tb as Be,W as Wt,X as Yt,Y as qt,Z as w,_a as Se,a as L,aa as te,ab as mt,b as P,bb as q,cb as xe,d as ct,db as Te,eb as ye,f as Dt,fa as ee,fb as ht,g as kt,ga as ie,gb as ve,h as H,ha as A,hb as Ee,i as jt,ia as R,ib as j,ja as X,jb as Ae,k as pt,ka as ne,kb as Oe,l as Nt,lb as be,m as O,mb as Ce,na as F,nb as we,o as lt,oa as oe,ob as $,p as k,q as G,qb as Me,r as _t,rb as M,s as Lt,sa as J,t as Pt,u as Ut,v as Ft,va as re,w as $t,wa as W,x as zt,z as Bt}from"./chunk-P3MNZRFH.js";var B="PERFORM_ACTION",yi="REFRESH",We="RESET",Ye="ROLLBACK",qe="COMMIT",Qe="SWEEP",ti="TOGGLE_ACTION",ei="SET_ACTIONS_ACTIVE",ii="JUMP_TO_STATE",ni="JUMP_TO_ACTION",Ct="IMPORT_STATE",oi="LOCK_CHANGES",ri="PAUSE_RECORDING",_=class{constructor(t,o){if(this.action=t,this.timestamp=o,this.type=B,typeof t.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},dt=class{constructor(){this.type=yi}},ft=class{constructor(t){this.timestamp=t,this.type=We}},gt=class{constructor(t){this.timestamp=t,this.type=Ye}},St=class{constructor(t){this.timestamp=t,this.type=qe}},It=class{constructor(){this.type=Qe}},xt=class{constructor(t){this.id=t,this.type=ti}},He=class{constructor(t,o,i=!0){this.start=t,this.end=o,this.active=i,this.type=ei}},Tt=class{constructor(t){this.index=t,this.type=ii}},yt=class{constructor(t){this.actionId=t,this.type=ni}},vt=class{constructor(t){this.nextLiftedState=t,this.type=Ct}},Et=class{constructor(t){this.status=t,this.type=oi}},At=class{constructor(t){this.status=t,this.type=ri}},Ge=class{constructor(){this.maxAge=!1}},ot=new U("@ngrx/store-devtools Options"),Ve=new U("@ngrx/store-devtools Initial Config");function si(){return null}var vi="NgRx Store DevTools";function Ei(e){let t={maxAge:!1,monitor:si,actionSanitizer:void 0,stateSanitizer:void 0,name:vi,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},o=typeof e=="function"?e():e,i=o.logOnly?{pause:!0,export:!0,test:!0}:!1,n=o.features||i||t.features;n.import===!0&&(n.import="custom");let a=Object.assign({},t,{features:n},o);if(a.maxAge&&a.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${a.maxAge}`);return a}function Ke(e,t){return e.filter(o=>t.indexOf(o)<0)}function ai(e){let{computedStates:t,currentStateIndex:o}=e;if(o>=t.length){let{state:n}=t[t.length-1];return n}let{state:i}=t[o];return i}function Gi(e){return e.actionsById[e.nextActionId-1]}function z(e){return new _(e,+Date.now())}function Ai(e,t){return Object.keys(t).reduce((o,i)=>{let n=Number(i);return o[n]=ci(e,t[n],n),o},{})}function ci(e,t,o){return P(L({},t),{action:e(t.action,o)})}function Oi(e,t){return t.map((o,i)=>({state:pi(e,o.state,i),error:o.error}))}function pi(e,t,o){return e(t,o)}function li(e){return e.predicate||e.actionsSafelist||e.actionsBlocklist}function bi(e,t,o,i){let n=[],a={},d=[];return e.stagedActionIds.forEach((r,f)=>{let u=e.actionsById[r];u&&(f&&wt(e.computedStates[f],u,t,o,i)||(a[r]=u,n.push(r),d.push(e.computedStates[f])))}),P(L({},e),{stagedActionIds:n,actionsById:a,computedStates:d})}function wt(e,t,o,i,n){let a=o&&!o(e,t.action),d=i&&!t.action.type.match(i.map(f=>Ze(f)).join("|")),r=n&&t.action.type.match(n.map(f=>Ze(f)).join("|"));return a||d||r}function Ze(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ui(e){return{ngZone:e?K(te):null,connectInZone:e}}var rt=(()=>{let t=class t extends q{};t.\u0275fac=(()=>{let i;return function(a){return(i||(i=Xt(t)))(a||t)}})(),t.\u0275prov=C({token:t,factory:t.\u0275fac});let e=t;return e})(),et={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},Ot=new U("@ngrx/store-devtools Redux Devtools Extension"),mi=(()=>{let _DevtoolsExtension=class _DevtoolsExtension{constructor(e,t,o){this.config=t,this.dispatcher=o,this.zoneConfig=ui(this.config.connectInZone),this.devtoolsExtension=e,this.createActionStreams()}notify(e,t){if(this.devtoolsExtension)if(e.type===B){if(t.isLocked||t.isPaused)return;let o=ai(t);if(li(this.config)&&wt(o,e,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let i=this.config.stateSanitizer?pi(this.config.stateSanitizer,o,t.currentStateIndex):o,n=this.config.actionSanitizer?ci(this.config.actionSanitizer,e,t.nextActionId):e;this.sendToReduxDevtools(()=>this.extensionConnection.send(n,i))}else{let o=P(L({},t),{stagedActionIds:t.stagedActionIds,actionsById:this.config.actionSanitizer?Ai(this.config.actionSanitizer,t.actionsById):t.actionsById,computedStates:this.config.stateSanitizer?Oi(this.config.stateSanitizer,t.computedStates):t.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,o,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new ct(e=>{let t=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=t,t.init(),t.subscribe(o=>e.next(o)),t.unsubscribe}):H}createActionStreams(){let e=this.createChangesObservable().pipe(zt()),t=e.pipe(k(r=>r.type===et.START)),o=e.pipe(k(r=>r.type===et.STOP)),i=e.pipe(k(r=>r.type===et.DISPATCH),O(r=>this.unwrapAction(r.payload)),_t(r=>r.type===Ct?this.dispatcher.pipe(k(f=>f.type===ht),Nt(1e3),Lt(1e3),O(()=>r),G(()=>pt(r)),Pt(1)):pt(r))),a=e.pipe(k(r=>r.type===et.ACTION),O(r=>this.unwrapAction(r.payload))).pipe(V(o)),d=i.pipe(V(o));this.start$=t.pipe(V(o)),this.actions$=this.start$.pipe(ut(()=>a)),this.liftedActions$=this.start$.pipe(ut(()=>d))}unwrapAction(action){return typeof action=="string"?eval(`(${action})`):action}getExtensionConfig(e){let t={name:e.name,features:e.features,serialize:e.serialize,autoPause:e.autoPause??!1,trace:e.trace??!1,traceLimit:e.traceLimit??75};return e.maxAge!==!1&&(t.maxAge=e.maxAge),t}sendToReduxDevtools(e){try{e()}catch(t){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",t)}}};_DevtoolsExtension.\u0275fac=function(t){return new(t||_DevtoolsExtension)(I(Ot),I(ot),I(rt))},_DevtoolsExtension.\u0275prov=C({token:_DevtoolsExtension,factory:_DevtoolsExtension.\u0275fac});let DevtoolsExtension=_DevtoolsExtension;return DevtoolsExtension})(),nt={type:mt},Ci="@ngrx/store-devtools/recompute",wi={type:Ci};function hi(e,t,o,i,n){if(i)return{state:o,error:"Interrupted by an error up the chain"};let a=o,d;try{a=e(o,t)}catch(r){d=r.toString(),n.handleError(r)}return{state:a,error:d}}function it(e,t,o,i,n,a,d,r,f){if(t>=e.length&&e.length===a.length)return e;let u=e.slice(0,t),g=a.length-(f?1:0);for(let s=t;s<g;s++){let m=a[s],T=n[m].action,p=u[s-1],c=p?p.state:i,v=p?p.error:void 0,E=d.indexOf(m)>-1?p:hi(o,T,c,v,r);u.push(E)}return f&&u.push(e[e.length-1]),u}function Mi(e,t){return{monitorState:t(void 0,{}),nextActionId:1,actionsById:{0:z(nt)},stagedActionIds:[0],skippedActionIds:[],committedState:e,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function Ri(e,t,o,i,n={}){return a=>(d,r)=>{let{monitorState:f,actionsById:u,nextActionId:g,stagedActionIds:s,skippedActionIds:m,committedState:T,currentStateIndex:p,computedStates:c,isLocked:v,isPaused:x}=d||t;d||(u=Object.create(u));function E(S){let h=S,b=s.slice(1,h+1);for(let y=0;y<b.length;y++)if(c[y+1].error){h=y,b=s.slice(1,h+1);break}else delete u[b[y]];m=m.filter(y=>b.indexOf(y)===-1),s=[0,...s.slice(h+1)],T=c[h].state,c=c.slice(h),p=p>h?p-h:0}function D(){u={0:z(nt)},g=1,s=[0],m=[],T=c[p].state,p=0,c=[]}let l=0;switch(r.type){case oi:{v=r.status,l=1/0;break}case ri:{x=r.status,x?(s=[...s,g],u[g]=new _({type:"@ngrx/devtools/pause"},+Date.now()),g++,l=s.length-1,c=c.concat(c[c.length-1]),p===s.length-2&&p++,l=1/0):D();break}case We:{u={0:z(nt)},g=1,s=[0],m=[],T=e,p=0,c=[];break}case qe:{D();break}case Ye:{u={0:z(nt)},g=1,s=[0],m=[],p=0,c=[];break}case ti:{let{id:S}=r;m.indexOf(S)===-1?m=[S,...m]:m=m.filter(b=>b!==S),l=s.indexOf(S);break}case ei:{let{start:S,end:h,active:b}=r,y=[];for(let at=S;at<h;at++)y.push(at);b?m=Ke(m,y):m=[...m,...y],l=s.indexOf(S);break}case ii:{p=r.index,l=1/0;break}case ni:{let S=s.indexOf(r.actionId);S!==-1&&(p=S),l=1/0;break}case Qe:{s=Ke(s,m),m=[],p=Math.min(p,s.length-1);break}case B:{if(v)return d||t;if(x||d&&wt(d.computedStates[p],r,n.predicate,n.actionsSafelist,n.actionsBlocklist)){let h=c[c.length-1];c=[...c.slice(0,-1),hi(a,r.action,h.state,h.error,o)],l=1/0;break}n.maxAge&&s.length===n.maxAge&&E(1),p===s.length-1&&p++;let S=g++;u[S]=r,s=[...s,S],l=s.length-1;break}case Ct:{({monitorState:f,actionsById:u,nextActionId:g,stagedActionIds:s,skippedActionIds:m,committedState:T,currentStateIndex:p,computedStates:c,isLocked:v,isPaused:x}=r.nextLiftedState);break}case mt:{l=0,n.maxAge&&s.length>n.maxAge&&(c=it(c,l,a,T,u,s,m,o,x),E(s.length-n.maxAge),l=1/0);break}case ht:{if(c.filter(h=>h.error).length>0)l=0,n.maxAge&&s.length>n.maxAge&&(c=it(c,l,a,T,u,s,m,o,x),E(s.length-n.maxAge),l=1/0);else{if(!x&&!v){p===s.length-1&&p++;let h=g++;u[h]=new _(r,+Date.now()),s=[...s,h],l=s.length-1,c=it(c,l,a,T,u,s,m,o,x)}c=c.map(h=>P(L({},h),{state:a(h.state,wi)})),p=s.length-1,n.maxAge&&s.length>n.maxAge&&E(s.length-n.maxAge),l=1/0}break}default:{l=1/0;break}}return c=it(c,l,a,T,u,s,m,o,x),f=i(f,r),{monitorState:f,actionsById:u,nextActionId:g,stagedActionIds:s,skippedActionIds:m,committedState:T,currentStateIndex:p,computedStates:c,isLocked:v,isPaused:x}}}var Xe=(()=>{let t=class t{constructor(i,n,a,d,r,f,u,g){let s=Mi(u,g.monitor),m=Ri(u,s,f,g.monitor,g),T=lt(lt(n.asObservable().pipe(Bt(1)),d.actions$).pipe(O(z)),i,d.liftedActions$).pipe(jt(kt)),p=a.pipe(O(m)),c=ui(g.connectInZone),v=new Dt(1);this.liftedStateSubscription=T.pipe(Ht(p),Je(c),$t(({state:D},[l,S])=>{let h=S(D,l);return l.type!==B&&li(g)&&(h=bi(h,g.predicate,g.actionsSafelist,g.actionsBlocklist)),d.notify(l,h),{state:h,action:l}},{state:s,action:null})).subscribe(({state:D,action:l})=>{if(v.next(D),l.type===B){let S=l.action;r.next(S)}}),this.extensionStartSubscription=d.start$.pipe(Je(c)).subscribe(()=>{this.refresh()});let x=v.asObservable(),E=x.pipe(O(ai));Object.defineProperty(E,"state",{value:Ie(E,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=i,this.liftedState=x,this.state=E}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(i){this.dispatcher.next(i)}next(i){this.dispatcher.next(i)}error(i){}complete(){}performAction(i){this.dispatch(new _(i,+Date.now()))}refresh(){this.dispatch(new dt)}reset(){this.dispatch(new ft(+Date.now()))}rollback(){this.dispatch(new gt(+Date.now()))}commit(){this.dispatch(new St(+Date.now()))}sweep(){this.dispatch(new It)}toggleAction(i){this.dispatch(new xt(i))}jumpToAction(i){this.dispatch(new yt(i))}jumpToState(i){this.dispatch(new Tt(i))}importState(i){this.dispatch(new vt(i))}lockChanges(i){this.dispatch(new Et(i))}pauseRecording(i){this.dispatch(new At(i))}};t.\u0275fac=function(n){return new(n||t)(I(rt),I(q),I(Te),I(mi),I(ve),I(Yt),I(xe),I(ot))},t.\u0275prov=C({token:t,factory:t.\u0275fac});let e=t;return e})();function Je({ngZone:e,connectInZone:t}){return o=>t?new ct(i=>o.subscribe({next:n=>e.run(()=>i.next(n)),error:n=>e.run(()=>i.error(n)),complete:()=>e.run(()=>i.complete())})):o}var Di=new U("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function ki(e,t){return!!e||t.monitor!==si}function ji(){let e="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[e]<"u"?window[e]:null}function Mt(e={}){return Jt([mi,rt,Xe,{provide:Ve,useValue:e},{provide:Di,deps:[Ot,ot],useFactory:ki},{provide:Ot,useFactory:ji},{provide:ot,deps:[Ve],useFactory:Ei},{provide:Ee,deps:[Xe],useFactory:Ni},{provide:ye,useExisting:rt}])}function Ni(e){return e.state}var Vi=(()=>{let t=class t{static instrument(i={}){return{ngModule:t,providers:[Mt(i)]}}};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=Vt({type:t}),t.\u0275inj=Gt({});let e=t;return e})();var Rt=()=>{let e=K(Y),t=localStorage.getItem(Me.AUTH_USER);return(t!==null?JSON.parse(t):null)!==null?!0:(e.navigate(["/signin"]),!1)};var di=[{path:"",redirectTo:"/main",pathMatch:"full"},{path:"main",canActivate:[Rt],loadChildren:()=>import("./chunk-ZKSU47CR.js").then(e=>e.MainModule)},{path:"signin",loadChildren:()=>import("./chunk-YWL6HDK4.js").then(e=>e.AuthModule)},{path:"signup",loadChildren:()=>import("./chunk-OX3EYXFH.js").then(e=>e.RegistrationModule)},{path:"profile",canActivate:[Rt],loadChildren:()=>import("./chunk-ZF557HOC.js").then(e=>e.RegistrationModule)}];var gi=(()=>{let t=class t{constructor(i,n,a,d){this.actions$=i,this.toast=n,this.store=a,this.getProfileData=d,this.checkProfileInfo=Oe(()=>this.actions$.pipe(Ce(Q.getUserInfo,Q.setUserInfo),Ut(()=>this.getProfileData.getUserInfo().pipe(O(r=>Q.setUserInfo({data:{email:r.email.S,name:r.name.S,uid:r.uid.S,createdAt:r.createdAt.S}})),G(r=>{let{error:f}=r;return f===null?this.toast.openSnack(r.statusText,!0):this.toast.openSnack(f.message,!0),H})))))}};t.\u0275fac=function(n){return new(n||t)(I(be),I(tt),I(j),I(Ue))},t.\u0275prov=C({token:t,factory:t.\u0275fac});let e=t;return e})();var Si=(()=>{let t=class t{constructor(i){this.localStore=i,this.token="",this.id="",this.mail=""}intercept(i,n){if(this.userDataLogged=this.localStore.getLoginInfo(),i.url.includes($.REGISTER)||i.url.includes($.LOGIN))return n.handle(i);this.token=this.userDataLogged?.token||"",this.id=this.userDataLogged?.uid||"",this.mail=this.userDataLogged?.email||"";let a=i.clone({url:`${$.URL}${$.PROFILE}`,setHeaders:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json","rs-uid":this.id,"rs-email":this.mail}});return n.handle(a).pipe(Ft(1))}};t.\u0275fac=function(n){return new(n||t)(I(N))},t.\u0275prov=C({token:t,factory:t.\u0275fac});let e=t;return e})();var Ii={providers:[ge(di),Se(),Ae({user:$e}),we(Fe,gi),Mt({maxAge:25,logOnly:!se()}),le(ue()),{provide:pe,useClass:Si,multi:!0}]};function _i(e,t){if(e&1){let o=ne();A(0,"button",5),F("click",function(){Kt(o);let n=oe();return Zt(n.onRunToProfile())}),A(1,"mat-icon"),J(2," person"),R()()}}var xi=(()=>{let t=class t{constructor(i,n,a){this.theme=i,this.store=n,this.router=a,this.isUserLogged=!1,this.themeNow=new Qt,this.appTheme=this.theme.getThemeApp()||"lightThem"}ngOnInit(){this.store.select(_e).pipe(i=>i).subscribe(i=>this.isUserLogged=i),this.installTheme()}onSwitchTheme(){this.appTheme=this.appTheme===M.LIGHT?M.DARK:M.LIGHT,this.themeNow.emit(this.appTheme),this.theme.setThemeApp(this.appTheme)}onRunToProfile(){this.router.navigate(["/profile"])}installTheme(){this.themeNow.emit(this.appTheme)}};t.\u0275fac=function(n){return new(n||t)(w(N),w(j),w(Y))},t.\u0275cmp=Z({type:t,selectors:[["app-header"]],outputs:{themeNow:"themeNow"},standalone:!0,features:[W],decls:9,vars:1,consts:[["color","primary",1,"header"],["routerLink","/main",1,"header-logo"],[1,"example-spacer"],[1,""],["mat-icon-button",""],["mat-icon-button","",3,"click"]],template:function(n,a){n&1&&(A(0,"mat-toolbar",0)(1,"a",1),J(2,"Rs-network"),R(),X(3,"span",2),A(4,"div",3),ee(5,_i,3,0,"button",4),A(6,"button",5),F("click",function(){return a.onSwitchTheme()}),A(7,"mat-icon"),J(8,"brightness_medium"),R()()()()),n&2&&(qt(5),ie(5,a.isUserLogged?5:-1))},dependencies:[Be,ze,je,ke,De,Re,fe],styles:[".header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-around}.header-logo[_ngcontent-%COMP%]{color:#fff;font-size:22px;text-decoration:none}.header-logo[_ngcontent-%COMP%]:hover{color:var(--hover-logo)}.example-button-row[_ngcontent-%COMP%]{display:table-cell;max-width:600px}"]});let e=t;return e})();var Ti=(()=>{let t=class t{constructor(i,n,a){this.document=i,this.store=n,this.render=a,this.title="final"}ngOnInit(){this.store.dispatch(Ne.init())}onChangeTheme(i){i===M.LIGHT?this.render.removeClass(this.document.body,M.DARK):this.render.removeClass(this.document.body,M.LIGHT),this.render.addClass(this.document.body,i)}};t.\u0275fac=function(n){return new(n||t)(w(ae),w(j),w(Wt))},t.\u0275cmp=Z({type:t,selectors:[["app-root"]],standalone:!0,features:[re([Le,Pe,tt,N]),W],decls:3,vars:0,consts:[[3,"themeNow"],[1,"main"]],template:function(n,a){n&1&&(A(0,"app-header",0),F("themeNow",function(r){return a.onChangeTheme(r)}),R(),A(1,"main",1),X(2,"router-outlet"),R())},dependencies:[ce,de,xi,me],styles:[".main[_ngcontent-%COMP%]{width:100%;max-width:1420px;height:calc(100vh - 64px);margin:0 auto;padding:20px}"]});let e=t;return e})();he(Ti,Ii).catch(e=>console.error(e));