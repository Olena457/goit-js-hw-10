import"./assets/styles-bf913a02.js";import{i as s}from"./assets/vendor-77e16229.js";const m=document.getElementById("createForm"),r=document.querySelectorAll('input[name="state"]'),a=document.getElementById("delay");m.addEventListener("submit",c);function c(i){i.preventDefault();const o=Array.from(r).find(e=>e.checked),n=o?o.value:"rejected",t=parseInt(a.value);new Promise((e,l)=>{setTimeout(()=>{n==="fulfilled"?e(t):l(t)},t)}).then(e=>{s.show({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`,color:"#16971b",position:"topRight",timeout:2e3})}).catch(e=>{s.show({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`,position:"topRight",color:"#da1418",timeout:2e3})})}console.log("2-snackbar.js - loaded");
//# sourceMappingURL=commonHelpers2.js.map
