(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{67:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c=n(81),r=n(0),a=n.n(r),o=n(33),s=n.n(o),u=n(49),l=n(27),i=n(7),j=n(44),b=n(5),x=n(8),d=n.n(x),h=n(9),O=n(4),f=n(11),p=n(1),m=function(){var e=Object(r.useState)(null),t=Object(O.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){(function(){var e=Object(h.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/testConnection");case 2:return t=e.sent,e.next=5,t.text();case 5:if(e.t0=e.sent,"true"!==e.t0){e.next=10;break}e.t1=!0,e.next=11;break;case 10:e.t1=!1;case 11:return n=e.t1,e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()().then((function(e){c(e)}))}),[]),Object(p.jsxs)(p.Fragment,{children:[null===n&&Object(p.jsx)(f.d,{color:"yellow",children:"CONNECTING..."}),!0===n&&Object(p.jsx)(f.d,{color:"green",children:"CONNECTED"}),!1===n&&Object(p.jsx)(f.d,{color:"red",children:"WARNING: DATABASE CONNECTION FAILED"})]})},v=Object(r.createContext)({customerId:null}),C=function(e){var t=e.children,n=Object(r.useState)(null),c=Object(O.a)(n,2),a=c[0],o=c[1];return Object(p.jsx)(v.Provider,{value:{customerId:a,setCustomerId:o},children:t})},g=n(70),w=n(85),k=n(80),y=n(6),A=n(82),T=n(19),S=n(29),I=n(76),M=function(e){var t=e.isOpen,n=e.handleConfirm,c=e.handleClose,r=e.modalContent,a=e.text;return Object(p.jsxs)(A.a,{onClose:c,closeable:!1,isOpen:t,animate:!0,autoFocus:!0,size:T.c.auto,role:T.b.dialog,children:[(null===a||void 0===a?void 0:a.headerText)&&Object(p.jsx)(S.g,{children:a.headerText}),Object(p.jsx)(S.e,{children:r}),Object(p.jsxs)(S.f,{children:[Object(p.jsx)(I.a,{kind:y.a.tertiary,onClick:c,children:(null===a||void 0===a?void 0:a.cancelText)||"Cancel"}),Object(p.jsx)(I.a,{onClick:n,children:(null===a||void 0===a?void 0:a.confirmText)||"Confirm"})]})]})},N=function(){var e=Object(r.useState)(!1),t=Object(O.a)(e,2),n=t[0],c=t[1];return{isOpen:n,open:function(){return c(!0)},close:function(){return c(!1)}}},W=n(45),D=function(e){var t=Object(b.f)(),n=Object(r.useContext)(v).setCustomerId;return Object(p.jsx)(g.a,Object(W.a)(Object(W.a)({onClick:function(){n&&n(null),t(ce.title)}},e),{},{children:"Exit"}))},$=n(86),E=n(83),B=function(e){var t=e.accountSummaryModal,n=Object(r.useContext)(v).customerId,c=Object(r.useState)(n||""),a=Object(O.a)(c,2),o=a[0],s=a[1],u=function(){s(n||"")},l=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/accountSummary","?cusID=").concat(o),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.next=7,c.text();case 7:r=e.sent,alert(r),t.close(),u(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),u()},handleConfirm:l,text:{headerText:"Account Summary",confirmText:"View"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsx)("form",{children:Object(p.jsx)($.a,{label:function(){return"Customer ID"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return s(e.currentTarget.value)},value:o})})})})})},F=function(e){var t=e.addInterestModal,n=Object(r.useState)(""),c=Object(O.a)(n,2),a=c[0],o=c[1],s=Object(r.useState)(""),u=Object(O.a)(s,2),l=u[0],j=u[1],b=function(){o(""),j("")},x=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/addInterest","?savingsRate=").concat(a,"&checkingRate=").concat(l),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.next=7,c.text();case 7:r=e.sent,alert(r),t.close(),b(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),b()},handleConfirm:x,text:{headerText:"Add Interest",confirmText:"Confirm"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)(f.b,{children:"Add interest to all active accounts"}),Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Savings Rate"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return o(e.currentTarget.value)},value:a})}),Object(p.jsx)($.a,{label:function(){return"Checking Rate"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return j(e.currentTarget.value)},value:l})})]})]})})})},G=function(e){var t=e.reportBModal,n=Object(r.useState)(""),c=Object(O.a)(n,2),a=c[0],o=c[1],s=Object(r.useState)(""),u=Object(O.a)(s,2),l=u[0],j=u[1],b=function(){o(""),j("")},x=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/reportB","?minAge=").concat(a,"&maxAge=").concat(l),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.next=7,c.text();case 7:r=e.sent,alert(r),t.close(),b(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),b()},handleConfirm:x,text:{headerText:"Report B",confirmText:"View"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)(f.b,{children:"Find the Average Balance Between Age Groups"}),Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Min Age"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return o(e.currentTarget.value)},value:a})}),Object(p.jsx)($.a,{label:function(){return"Max Age"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return j(e.currentTarget.value)},value:l})})]})]})})})},R=function(e){var t=Object(r.useContext)(v).customerId,n=Object(b.f)(),c=function(){return n(ce.title)};Object(r.useEffect)((function(){(null===e||void 0===e?void 0:e.requireAdmin)&&"0"!==t?c():null===t&&c()}),[t])},L=function(e){var t=e.closeAccountModal,n=Object(r.useContext)(v).customerId,c=Object(r.useState)(""),a=Object(O.a)(c,2),o=a[0],s=a[1],u=function(){s("")},l=function(){var e=Object(h.a)(d.a.mark((function e(){var c,r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}throw new Error("Invalid customer ID");case 2:return c="".concat("/api/closeAccount","?cusID=").concat(n,"&accNum=").concat(o),e.prev=3,e.next=6,fetch(c);case 6:return r=e.sent,e.next=9,r.text();case 9:a=e.sent,window.alert(a),t.close(),u(),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),u()},handleConfirm:l,text:{headerText:"Close Account"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsx)("form",{children:Object(p.jsx)($.a,{label:function(){return"Account Number"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return s(e.currentTarget.value)},value:o})})})})})},P=function(e){var t=e.depositModal,n=Object(r.useState)(""),c=Object(O.a)(n,2),a=c[0],o=c[1],s=Object(r.useState)(""),u=Object(O.a)(s,2),l=u[0],j=u[1],b=function(){o(""),j("")},x=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/deposit","?accNum=").concat(a,"&amount=").concat(l),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.next=7,c.text();case 7:r=e.sent,alert(r),t.close(),b(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),b()},handleConfirm:x,text:{headerText:"Deposit"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Account Number"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return o(e.currentTarget.value)},value:a})}),Object(p.jsx)($.a,{label:function(){return"Amount"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return j(e.currentTarget.value)},value:l})})]})})})},z=n(77),q=n(78),J=n(79),V=function(e){var t=Object(r.useContext)(v).customerId,n=e.openAccountModal,c=Object(r.useState)(t||""),a=Object(O.a)(c,2),o=a[0],s=a[1],u=Object(r.useState)(null),l=Object(O.a)(u,2),j=l[0],b=l[1],x=Object(r.useState)(""),f=Object(O.a)(x,2),m=f[0],C=f[1],g=function(){s(t||""),b(null),C("")},w=function(){var e=Object(h.a)(d.a.mark((function e(){var t,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat("/api/openAccount","?cusID=").concat(o,"&type=").concat(j,"&amount=").concat(m),e.prev=1,e.next=4,fetch(t);case 4:return c=e.sent,e.t0=Number,e.next=8,c.text();case 8:if(e.t1=e.sent,-1!==(r=(0,e.t0)(e.t1))){e.next=12;break}throw new Error("Failed to open new account");case 12:alert("Customer ".concat(o,"'s new Account Number is: ").concat(r)),n.close(),g(),e.next=20;break;case 17:e.prev=17,e.t2=e.catch(1),console.error(e.t2);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:n.isOpen,handleClose:function(){n.close(),g()},handleConfirm:w,text:{headerText:"Open Account",confirmText:"Confirm"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Customer ID"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return s(e.currentTarget.value)},value:o})}),Object(p.jsx)($.a,{label:function(){return"Account Type"},children:Object(p.jsxs)(z.a,{value:j||void 0,onChange:function(e){var t=e.currentTarget.value;"C"!==t&&"S"!==t&&(t=null),b(t)},align:q.a.horizontal,children:[Object(p.jsx)(J.a,{value:"C",children:"Checking"}),Object(p.jsx)(J.a,{value:"S",children:"Savings"})]})}),Object(p.jsx)($.a,{label:function(){return"Initial Deposit"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return C(e.currentTarget.value)},value:m})})]})})})},Y=function(e){var t=e.transferModal,n=Object(r.useContext)(v).customerId,c=Object(r.useState)(""),a=Object(O.a)(c,2),o=a[0],s=a[1],u=Object(r.useState)(""),l=Object(O.a)(u,2),j=l[0],b=l[1],x=Object(r.useState)(""),f=Object(O.a)(x,2),m=f[0],C=f[1],g=function(){s(""),b(""),C("")},w=function(){var e=Object(h.a)(d.a.mark((function e(){var c,r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}throw new Error("Invalid customer ID");case 2:return c="".concat("/api/transfer","?srcAccNum=").concat(o,"&destAccNum=").concat(j,"&amount=").concat(m,"&cusID=").concat(n),e.prev=3,e.next=6,fetch(c);case 6:return r=e.sent,e.next=9,r.text();case 9:a=e.sent,alert(a),t.close(),g(),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),g()},handleConfirm:w,text:{headerText:"Transfer"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Source Account Number"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return s(e.currentTarget.value)},value:o})}),Object(p.jsx)($.a,{label:function(){return"Destination Account Number"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return b(e.currentTarget.value)},value:j})}),Object(p.jsx)($.a,{label:function(){return"Amount"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return C(e.currentTarget.value)},value:m})})]})})})},H=function(e){var t=e.withdrawModal,n=Object(r.useState)(""),c=Object(O.a)(n,2),a=c[0],o=c[1],s=Object(r.useState)(""),u=Object(O.a)(s,2),l=u[0],j=u[1],b=function(){o(""),j("")},x=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/withdraw","?accNum=").concat(a,"&amount=").concat(l),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.next=7,c.text();case 7:r=e.sent,alert(r),t.close(),b(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),b()},handleConfirm:x,text:{headerText:"Withdraw"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Account Number"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return o(e.currentTarget.value)},value:a})}),Object(p.jsx)($.a,{label:function(){return"Amount"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return j(e.currentTarget.value)},value:l})})]})})})},K=function(){R();var e=Object(r.useContext)(v).customerId;return null===e?null:Object(p.jsxs)(i.a,{margin:"2rem auto",display:"flex",flexDirection:"column",alignItems:"center",$style:{textAlign:"center"},children:[Object(p.jsx)(f.a,{children:"Customer"}),Object(p.jsxs)(f.b,{children:["Main Menu | ID: ",e]}),Object(p.jsx)(U,{})]})},Q={width:"100%",height:"100%"},U=function(){var e=N(),t=N(),n=N(),c=N(),r=N(),a=N();return Object(p.jsxs)(w.a,{flexGridColumnCount:3,gridGap:"1rem",gridColumnGap:"1rem",width:"50%",maxWidth:"300px",children:[Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:e.open,$style:Q,children:"Open Account"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:t.open,$style:Q,children:"Close Account"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:n.open,$style:Q,children:"Deposit"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:c.open,$style:Q,children:"Withdraw"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:r.open,$style:Q,children:"Transfer"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:a.open,$style:Q,children:"Account Summary"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(D,{$style:Q})}),Object(p.jsx)(V,{openAccountModal:e}),Object(p.jsx)(L,{closeAccountModal:t}),Object(p.jsx)(P,{depositModal:n}),Object(p.jsx)(H,{withdrawModal:c}),Object(p.jsx)(Y,{transferModal:r}),Object(p.jsx)(B,{accountSummaryModal:a})]})},X=function(){return R({requireAdmin:!0}),Object(p.jsxs)(i.a,{margin:"2rem auto",display:"flex",flexDirection:"column",alignItems:"center",$style:{textAlign:"center"},children:[Object(p.jsx)(f.a,{children:"Admin"}),Object(p.jsx)(f.b,{children:"Main Menu"}),Object(p.jsx)(Z,{})]})},Z=function(){var e=N(),t=function(){var e=Object(h.a)(d.a.mark((function e(){var t,n,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat("/api/reportA"),e.prev=1,e.next=4,fetch(t);case 4:return n=e.sent,e.next=7,n.text();case 7:c=e.sent,alert(c),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}(),n=N(),c=N();return Object(p.jsxs)(w.a,{flexGridColumnCount:3,gridGap:"1rem",gridColumnGap:"1rem",width:"50%",maxWidth:"300px",children:[Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:e.open,$style:Q,children:"Account Summary"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:c.open,$style:Q,children:"Add Interest"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:t,$style:Q,children:"Report A"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(g.a,{onClick:n.open,$style:Q,children:"Report B"})}),Object(p.jsx)(k.a,{children:Object(p.jsx)(D,{$style:Q})}),Object(p.jsx)(B,{accountSummaryModal:e}),Object(p.jsx)(F,{addInterestModal:c}),Object(p.jsx)(G,{reportBModal:n})]})},_=function(e){var t=Object(b.f)(),n=Object(r.useContext)(v).setCustomerId,c=e.loginModal,a=Object(r.useState)(""),o=Object(O.a)(a,2),s=o[0],u=o[1],l=Object(r.useState)(""),j=Object(O.a)(l,2),x=j[0],f=j[1],m=function(){u(""),f("")},C=function(){var e=Object(h.a)(d.a.mark((function e(){var r,a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("0"===s&&"0"===x)){e.next=7;break}return c.close(),m(),n&&n("0"),t(ce.admin),e.abrupt("return");case 7:return r="".concat("/api/canLogin","?cusID=").concat(s,"&pin=").concat(x),a=!1,e.prev=9,e.next=12,fetch(r);case 12:return o=e.sent,e.next=15,o.text();case 15:if(e.t0=e.sent,"true"!==e.t0){e.next=20;break}e.t1=!0,e.next=21;break;case 20:e.t1=!1;case 21:a=e.t1,e.next=27;break;case 24:e.prev=24,e.t2=e.catch(9),console.error(e.t2);case 27:if(a){e.next=30;break}return window.alert("Login failed"),e.abrupt("return");case 30:n&&n(s),t(ce.customer),c.close(),m();case 34:case"end":return e.stop()}}),e,null,[[9,24]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:c.isOpen,handleClose:function(){c.close(),m()},handleConfirm:C,text:{headerText:"Customer Login",confirmText:"Login"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Customer ID"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return u(e.currentTarget.value)},value:s})}),Object(p.jsx)($.a,{label:function(){return"Customer PIN"},children:Object(p.jsx)(E.a,{type:"password",clearable:!0,onChange:function(e){return f(e.currentTarget.value)},value:x})})]})})})},ee=function(e){var t=e.newCustomerModal,n=Object(r.useState)(""),c=Object(O.a)(n,2),a=c[0],o=c[1],s=Object(r.useState)(null),u=Object(O.a)(s,2),l=u[0],j=u[1],b=Object(r.useState)(""),x=Object(O.a)(b,2),f=x[0],m=x[1],v=Object(r.useState)(""),C=Object(O.a)(v,2),g=C[0],w=C[1],k=function(){o(""),j(null),m(""),w("")},y=function(){var e=Object(h.a)(d.a.mark((function e(){var n,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat("/api/newCustomer","?name=").concat(a,"&gender=").concat(l,"&age=").concat(f,"&pin=").concat(g),e.prev=1,e.next=4,fetch(n);case 4:return c=e.sent,e.t0=Number,e.next=8,c.text();case 8:if(e.t1=e.sent,-1!==(r=(0,e.t0)(e.t1))){e.next=12;break}throw new Error("Failed to create new customer");case 12:alert("Your customer ID is: ".concat(r)),t.close(),k(),e.next=20;break;case 17:e.prev=17,e.t2=e.catch(1),console.error(e.t2);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)(M,{isOpen:t.isOpen,handleClose:function(){t.close(),k()},handleConfirm:y,text:{headerText:"New Customer"},modalContent:Object(p.jsx)(i.a,{minWidth:"128px",maxWidth:"750px",children:Object(p.jsxs)("form",{children:[Object(p.jsx)($.a,{label:function(){return"Name"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return o(e.currentTarget.value)},value:a})}),Object(p.jsx)($.a,{label:function(){return"Gender"},children:Object(p.jsxs)(z.a,{value:l||void 0,onChange:function(e){var t=e.currentTarget.value;"M"!==t&&"F"!==t&&(t=null),j(t)},align:q.a.horizontal,children:[Object(p.jsx)(J.a,{value:"M",children:"Male"}),Object(p.jsx)(J.a,{value:"F",children:"Female"})]})}),Object(p.jsx)($.a,{label:function(){return"Age"},children:Object(p.jsx)(E.a,{clearable:!0,onChange:function(e){return m(e.currentTarget.value)},value:f})}),Object(p.jsx)($.a,{label:function(){return"PIN"},children:Object(p.jsx)(E.a,{type:"password",clearable:!0,onChange:function(e){return w(e.currentTarget.value)},value:g})})]})})})},te=function(){return Object(p.jsxs)(i.a,{margin:"2rem auto",display:"flex",flexDirection:"column",alignItems:"center",$style:{textAlign:"center"},children:[Object(p.jsx)(f.a,{children:"Banking System"}),Object(p.jsx)(f.c,{children:"By Matthew Seto | CS 157A Project 1"}),Object(p.jsx)(ne,{})]})},ne=function(){var e=N(),t=N();return Object(p.jsxs)(i.a,{display:"flex",flexDirection:["column","column","row"],width:"50%",maxWidth:"750px",children:[Object(p.jsx)(i.a,{width:"100%",marginRight:[0,0,"1rem"],marginBottom:["1rem","1rem",0],children:Object(p.jsx)(g.a,{onClick:e.open,$style:{width:"100%"},children:"New Customer"})}),Object(p.jsx)(i.a,{width:"100%",children:Object(p.jsx)(g.a,{onClick:t.open,$style:{width:"100%"},children:"Login"})}),Object(p.jsx)(ee,{newCustomerModal:e}),Object(p.jsx)(_,{loginModal:t})]})},ce={title:"/",customer:"/customer",admin:"/admin"},re=function(){return Object(p.jsx)(C,{children:Object(p.jsxs)(i.a,{maxWidth:"100vw",height:"100vh",overflow:"hidden",backgroundColor:"#141414",children:[Object(p.jsx)("div",{style:{position:"absolute",left:0,top:"-1rem"},children:Object(p.jsx)(m,{})}),Object(p.jsx)(j.a,{children:Object(p.jsxs)(b.c,{children:[Object(p.jsx)(b.a,{path:ce.title,element:Object(p.jsx)(te,{}),caseSensitive:!0}),Object(p.jsx)(b.a,{path:ce.customer,element:Object(p.jsx)(K,{})}),Object(p.jsx)(b.a,{path:ce.admin,element:Object(p.jsx)(X,{})})]})})]})})},ae=(n(67),n(84)),oe=Object(ae.a)({primaryFontFamily:"monospace"}),se=new u.a;s.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(c.a,{theme:oe,children:Object(p.jsx)(l.a,{value:se,children:Object(p.jsx)(re,{})})})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.4837ba67.chunk.js.map