import{_ as S}from"./Heading.7B_opbbV.js";import{M as w,_ as k}from"./Modal.m-X2E35f.js";import{r as p,n as C,q as M,c as r,b as u,w as h,a as e,s as B,v as A,x as d,y as F,F as O,u as V,z as J,o as c,d as I,t as l}from"./entry.9BiDok8q.js";const L={class:"flex justify-around items-center m-auto mt-8 mb-8"},T={class:"p-4"},j={key:0},G={class:"w-full text-center border-collapse"},$=e("thead",null,[e("tr",null,[e("th",{class:"border p-2"},"Name"),e("th",{class:"border p-2"},"Age"),e("th",{class:"border p-2"},"Gender"),e("th",{class:"border p-2"},"Date of Joining"),e("th",{class:"border p-2"},"Designation"),e("th",{class:"border p-2"},"Action")])],-1),q={class:"border p-2"},z={class:"border p-2"},H={class:"border p-2"},Q={class:"border p-2"},R={class:"border p-2"},U={class:"border p-2"},K=["onClick"],P=["onClick"],ee={__name:"employees",setup(W){const _={formType:"employee",formName:"Add Employee",inputFields:[{name:"name",type:"text",labelName:"Name"},{name:"age",type:"number",labelName:"Age"},{name:"gender",type:"select",items:["male","female"],labelName:"Gender"},{name:"date",type:"date",labelName:"Date of joining"},{name:"designation",type:"select",items:["developer","designer","manager","team lead"],labelName:"Select Designation"}]},s=p([]),n=p("");C(()=>{const t=localStorage.getItem("employeesDB");s.value=t?JSON.parse(t):[]});const y=t=>{const a=s.value,m={...t,id:a.length+1};a.push(m),localStorage.setItem("employeesDB",JSON.stringify(a)),s.value=a},g=t=>{_.formName="Edit Employee"},f=t=>{s.value.splice(t,1),localStorage.setItem("employeesDB",JSON.stringify(s.value))},i=p(!1),b=()=>{i.value=!0},v=()=>{i.value=!1},x=M(()=>s.value.filter(t=>t.name.toLowerCase().includes(n.value.toLowerCase())));return(t,a)=>{const m=S,N=k;return c(),r("div",null,[u(m,null,{default:h(()=>[I("Employees Database")]),_:1}),e("div",L,[B(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=o=>F(n)?n.value=o:null),placeholder:"Search Employee",class:"border-2 px-2 rounded border-blue-300"},null,512),[[A,d(n),void 0,{trim:!0}]]),e("button",{class:"bg-blue-500 text-white px-2 py-1 rounded mr-2",onClick:b}," Add Employee ")]),u(w,{isOpen:d(i),openModal:b,closeModal:v},{default:h(()=>[u(N,{formData:_,onFormSubmitted:y})]),_:1},8,["isOpen"]),e("div",T,[d(s).length>0?(c(),r("div",j,[e("table",G,[$,e("tbody",null,[(c(!0),r(O,null,V(d(x),(o,D)=>(c(),r("tr",{key:o.id},[e("td",q,l(o.name),1),e("td",z,l(o.age),1),e("td",H,l(o.gender),1),e("td",Q,l(o.date),1),e("td",R,l(o.designation),1),e("td",U,[e("button",{class:"bg-blue-500 text-white px-2 py-1 rounded mr-2",onClick:E=>g()}," Edit ",8,K),e("button",{class:"bg-red-500 text-white px-2 py-1 rounded",onClick:E=>f(D)}," Delete ",8,P)])]))),128))])])])):J("",!0)])])}}};export{ee as default};
