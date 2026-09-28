"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[8710],{65956:(function(D,n,e){e.r(n);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),t=e(86070);n.default=(function(){var m=(0,s.useState)(""),o=_()(m,2),a=o[0],l=o[1];return(0,s.useEffect)(function(){fetch("https://cdn.jsdelivr.net/npm/dt-react-component@3.0.8/CHANGELOG.md",{method:"get"}).then(function(u){return u.text()}).then(l).catch(function(u){l(u.message)})},[]),(0,t.jsx)("div",{style:{maxHeight:200,overflow:"auto",marginBottom:16},children:(0,t.jsx)(d.A,{value:a})})}),e.dn(n.default)}),23002:(function(D,n,e){e.r(n);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),t=e(86070),m=`
\u4EE5\u4E0B\u662F\u4E00\u6BB5 sql \u8BED\u6CD5

\`\`\`sql
 select count(*) from a;
-- name sqltest 
-- type sql 
-- create time 2022-11-09 16:13:45 
-- desc


-- create table employees(name string);
insert into employees values('1111');


select * from employees
\`\`\`
`;n.default=(function(){var o=(0,s.useState)(""),a=_()(o,2),l=a[0],u=a[1];return(0,s.useEffect)(function(){u(m)},[]),(0,t.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,t.jsx)(d.A,{dark:!0,value:l})})}),e.dn(n.default)}),32194:(function(D,n,e){e.r(n);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),t=e(86070),m=`
\u4EE5\u4E0B\u662F\u4E00\u6BB5 sql \u8BED\u6CD5

\`\`\`sql
 select count(*) from a;
-- name sqltest 
-- type sql 
-- create time 2022-11-09 16:13:45 
-- desc


-- create table employees(name string);
insert into employees values('1111');


select * from employees
\`\`\`
`;n.default=(function(){var o=(0,s.useState)(""),a=_()(o,2),l=a[0],u=a[1];return(0,s.useEffect)(function(){u(m)},[]),(0,t.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,t.jsx)(d.A,{value:l})})}),e.dn(n.default)}),72051:(function(D,n,e){e.d(n,{A:function(){return A}});var r=e(30758),_=e(97500),s=e.n(_),d=e(90614),t=e.n(d),m=e(78993),o=e.n(m),a=e(15340),l=e.n(a),u=e(9039),i=o();i.registerLanguage("sql",l());function O(){return{type:"output",filter:function(f){return t().helper.replaceRecursiveRegExp(f.replace(/&gt;/g,">").replace(/&lt;/g,"<"),function(M,h,v,g){var E=(v.match(/class=\"([^ \"]+)/)||[])[1],P=v.slice(0,18)+"hljs "+v.slice(18);return E&&i.getLanguage(E)?P+i.highlight(h,{language:E}).value+g:P+i.highlightAuto(h).value+g},"<pre><code\\b[^>]*>","</code></pre>","g")}}}var j=e(86070);function A(c){var f=c.value,M=f===void 0?"":f,h=c.className,v=c.style,g=c.dark,E=(0,r.useMemo)(function(){var P=new(t()).Converter({extensions:[O],emoji:!0});return P.makeHtml(M)},[M]);return(0,j.jsx)("div",{className:s()("dtc-markdown-render-body",g?"dtc-vs-dark":"dtc-vs",h),style:v,dangerouslySetInnerHTML:{__html:E}})}})}]);
