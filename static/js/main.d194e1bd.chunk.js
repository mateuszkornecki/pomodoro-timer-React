(window.webpackJsonptimeboxing=window.webpackJsonptimeboxing||[]).push([[0],{15:function(e,t,n){e.exports=n(23)},20:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(10),o=n.n(r),s=(n(20),n(1)),c=n(2),l=n(4),u=n(3),m=n(5),d=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleConfirmation=function(e){console.log(typeof n.taskTimeInput.current.value);var t=n.props,a=t.onConfirmation,i=t.elapsedTime,r=t.taskTimeInSeconds;60*n.taskTimeInput.current.value>i&&60*n.taskTimeInput.current.value!==r?(e.preventDefault(),a(n.titleInput.current.value,n.taskTimeInput.current.value)):alert("wprowadzony czas nie mo\u017ce byc mniejszy od ".concat((i/60).toFixed(2)," min. oraz musi by\u0107 inny ni\u017c wprowadzony czas pocz\u0105tkowy"))},n.titleInput=i.a.createRef(),n.taskTimeInput=i.a.createRef(),console.count("constructor"),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.count("mounted component")}},{key:"componentDidUpdate",value:function(){console.count("updated component")}},{key:"componentWillUnmount",value:function(){console.count("unmounted component")}},{key:"render",value:function(){console.count("render");var e=this.props,t=e.title,n=e.taskTimeInSeconds,a=e.isEditable;return i.a.createElement("div",{className:a?"TimeboxEditor":"TimeboxEditor inactive"},i.a.createElement("label",{htmlFor:"taskInput"},"Co robisz?"),i.a.createElement("input",{id:"taskInput",type:"text",defaultValue:t,ref:this.titleInput}),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"timeInput"},"Ile minut?"),i.a.createElement("input",{id:"timeInput",type:"number",defaultValue:n/60,ref:this.taskTimeInput}),i.a.createElement("br",null),i.a.createElement("button",{disabled:!a,onClick:this.handleConfirmation},"Zatwierd\u017a zmiany"))}}]),t}(i.a.Component),p=n(14),h=n(6),f=n.n(h);function b(e){var t=e.className,n=e.hours,a=e.minutes,r=e.seconds,o=e.miliseconds,s=e.coloredNumbers,c=f()("clock__numbers",{"clock__numbers--colored":s});function l(e,t,n,a){return function(e,t){for(t=t.toString();t.length<e;)t="0".concat(t);return t}(n,function(e,t,n){return n=Math.max(e,Math.min(n,t))}(e,t,a))}return n=l(0,24,2,n),a=l(0,59,2,a>=60?a%60:a),r=l(0,59,2,r),o=l(0,999,3,o),i.a.createElement("h2",{className:"clock "+t}," ","Pozosta\u0142o ",i.a.createElement("mark",{className:c},n),":",i.a.createElement("mark",{className:c},a),":",i.a.createElement("mark",{className:c},r),":",i.a.createElement("mark",{className:c},o))}b.defaultProps={className:"Clock",hours:0,minutes:0,seconds:0,miliseconds:0};var T=b;var E=function(e){var t=e.className,n=void 0===t?"":t,a=e.percent,r=e.trackRemaining,o=e.barColor,s=f()("progress",n,{"progress--reverse":r});function c(e){if(o===e)return!0}var l=f()("progress__bar",{"progress__bar--red":c("red"),"progress__bar--blue":c("blue"),"progress__bar--green":c("green")}),u=!0===r?"calc(100 % - ".concat(a," %)"):"".concat(a,"% ");return i.a.createElement("div",{className:s},i.a.createElement("div",{className:l,style:{width:"".concat(u," ")}}))},g=function(e){var t=Math.floor(e);return[Math.floor(e/3600),60===Math.floor(e/60)?0:Math.floor(e/60),Math.floor(e%60),t>=0?Math.floor(1e3*(e-t)):0]};var k=function(e){var t=e.title,n=e.isRunning,a=e.isPaused,r=e.isEditable,o=e.pausesCount,s=e.remainingTime,c=e.actualPercent,l=e.taskTimeInSeconds,u=e.handleStart,m=e.handleStop,d=e.togglePause,h=e.onConfirm,f=g(n?s:l),b=Object(p.a)(f,4),k=b[0],v=b[1],C=b[2],y=b[3];return i.a.createElement("div",{className:r?"CurrentTimebox inactive":"CurrentTimebox"},i.a.createElement("h1",null,t),i.a.createElement(T,{className:a?"inactive":"",hours:k,minutes:v,seconds:C,miliseconds:y,coloredNumbers:!0}),i.a.createElement(E,{className:a?"inactive":"",percent:c,trackRemaining:!1,barColor:"red"}),i.a.createElement("button",{onClick:h,disabled:r},"Edytuj"),i.a.createElement("button",{onClick:u,disabled:n},"Start"),i.a.createElement("button",{onClick:m,disabled:!n},"Stop"),i.a.createElement("button",{onClick:d,disabled:!n},a?"Wzn\xf3w":"Pauzuj"),"Liczba przerw: ",o)},v=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={title:"To pole powinno dzia\u0142a\u0107",taskTimeInSeconds:0,isRunning:!1,isPaused:!1,isEditable:!0,pausesCount:0,initialTime:0,actualTime:0,taskTimeInMs:0,endTime:0,remainingTime:0,elapsedTime:0,actualPercent:0},n.handleChangeTitle=function(e){n.setState({title:e})},n.handleChangeTaskTime=function(e){var t=n.state.elapsedTime;n.setState({taskTimeInSeconds:60*e,taskTimeInMs:60*e*1e3}),t>0&&n.handleChangeTaskTimeWhileRunning()},n.handleChangeTaskTimeWhileRunning=function(){n.setState((function(e){return{taskTimeInMs:e.taskTimeInMs-1e3*e.elapsedTime}})),n.setEndTime(),n.setRemainingTime()},n.handleStart=function(){var e=Date.now();n.setState({isRunning:!0,initialTime:e}),n.start(),n.setEndTime()},n.handleStop=function(){n.stop();var e=n.state.taskTimeInSeconds;n.setState({isRunning:!1,isPaused:!1,pausesCount:0,initialTime:0,actualTime:0,taskTimeInMs:1e3*e,endTime:0,remainingTime:0,actualPercent:0,elapsedTime:0})},n.handleEdit=function(){n.setState((function(e){return{isEditable:!e.isEditable}}))},n.handleEditConfirmation=function(e,t){n.handleEdit(),n.handleChangeTitle(e),n.handleChangeTaskTime(t)},n.start=function(){n.countDown=setInterval((function(){var e=Date.now();console.log("timer is working"),n.setState({actualTime:e}),n.setRemainingTime(),n.setElapsedTime(),n.setActualPercent(),n.forceStop()}),10)},n.stop=function(){clearInterval(n.countDown)},n.forceStop=function(){n.state.remainingTime<=0&&n.stop()},n.togglePause=function(){n.setState((function(e){return{isPaused:!e.isPaused,pausesCount:e.isPaused?e.pausesCount+1:e.pausesCount}})),n.state.isPaused?n.repause():n.stop()},n.repause=function(){var e=n.state.remainingTime,t=Date.now(),a=1e3*e;n.setState({isRunning:!0,initialTime:t,taskTimeInMs:a}),n.start(),n.setEndTime()},n.setEndTime=function(){n.setState((function(e){return{endTime:e.initialTime+e.taskTimeInMs}}))},n.setRemainingTime=function(){n.setState((function(e){return{remainingTime:(e.endTime-e.actualTime)/1e3}}))},n.setElapsedTime=function(){n.setState((function(e){return{elapsedTime:e.taskTimeInSeconds-e.remainingTime}}))},n.setActualPercent=function(){n.setState((function(e){return{actualPercent:e.elapsedTime/e.taskTimeInSeconds*100}}))},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state,t=e.title,n=e.taskTimeInSeconds,a=e.isRunning,r=e.isPaused,o=e.isEditable,s=e.pausesCount,c=e.initialTime,l=e.actualTime,u=e.taskTimeInMs,m=e.endTime,p=e.remainingTime,h=e.actualPercent,f=e.elapsedTime;return i.a.createElement(i.a.Fragment,null,i.a.createElement(i.a.StrictMode,null,o?i.a.createElement(d,{title:t,taskTimeInSeconds:n,isRunning:a,isEditable:o,elapsedTime:f,onChangeTitle:this.handleChangeTitle,onChangeTaskTime:this.handleChangeTaskTime,onConfirmation:this.handleEditConfirmation}):i.a.createElement(k,{title:t,isRunning:a,isPaused:r,isEditable:o,pausesCount:s,initialTime:c,actualTime:l,taskTimeInMs:u,endTime:m,remainingTime:p,actualPercent:h,elapsedTime:f,taskTimeInSeconds:n,handleStart:this.handleStart,handleStop:this.handleStop,start:this.start,stop:this.stop,forceStop:this.forceStop,togglePause:this.togglePause,repause:this.repause,setEndTime:this.setEndTime,setRemainingTime:this.setRemainingTime,setElapsedTime:this.setElapsedTime,setActualPercent:this.setActualPercent,onConfirm:this.handleEdit})))}}]),t}(i.a.Component),C=n(11),y=n(13);var S=function(e){var t=e.title,n=e.taskTime,a=e.onDelete,r=e.onEdit,o=e.onChange;if(n<=0)throw new Error("Czas zadania musi by\u0107 wi\u0119kszy ni\u017c\xa0zero");return i.a.createElement("div",{className:"Timebox"},i.a.createElement("h3",null,t," - ",n," min."),i.a.createElement("button",{onClick:a},"Usu\u0144"),i.a.createElement("button",{onClick:r},"Zmie\u0144"),i.a.createElement("input",{onChange:o}))},I=n(12),j=n.n(I),O=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=function(e){var t=n.props.onCreate;e.preventDefault(),t({id:j.a.v4(),title:n.form.current.children.taskInput.value,taskTime:n.form.current.children.timeInput.value}),n.form.current.children.taskInput.value="",n.form.current.children.timeInput.value=""},n.form=i.a.createRef(),n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("form",{ref:this.form,onSubmit:this.handleSubmit,className:"TimeboxCreator"},i.a.createElement("label",{htmlFor:"taskInput"},"Co robisz?"),i.a.createElement("input",{id:"taskInput",type:"text"}),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"timeInput"},"Ile minut?"),i.a.createElement("input",{id:"timeInput",type:"number"}),i.a.createElement("br",null),i.a.createElement("button",null," Dodaj Timebox'a"))}}]),t}(i.a.Component);var w=function(e){var t=e.message,n=e.children;return e.hasError?t:n},P=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={hasError:!1},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidCatch",value:function(e,t){console.log("%c wyst\u0105pi\u0142 nast\u0119puj\u0105cy b\u0142\u0105d","color: red",e,t)}},{key:"render",value:function(){var e=this.props,t=e.message,n=e.children;return i.a.createElement(w,{hasError:this.state.hasError,message:t},n)}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(i.a.Component);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var z=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={timeboxes:[],editInput:"",hasError:!1},n.handleCreate=function(e){try{n.addTimebox(e)}catch(t){console.log("metoda addTimebox wyrzuci\u0142a b\u0142\u0105d"),n.setState({hasError:!0})}},n.addTimebox=function(e){n.setState((function(t){return{timeboxes:[e].concat(Object(y.a)(t.timeboxes))}}))},n.removeTimebox=function(e){n.setState((function(t){return{timeboxes:t.timeboxes.filter((function(t,n){return n!==e}))}}))},n.updateArray=function(e,t,n){return e.splice(t,1),e.splice(t,0,n),e},n.editTimebox=function(e,t){n.setState((function(a){var i=a.timeboxes;return n.updateArray(i,e,t),{timeboxes:i,editInput:""}}))},n.changeTitle=function(e){n.setState({editInput:e.target.value})},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.timeboxes,a=t.editInput,r=t.hasError;return i.a.createElement(i.a.Fragment,null,i.a.createElement(w,{hasError:r,message:"metoda addTimebox() rzuci\u0142a wyj\u0105tek"},i.a.createElement(O,{onCreate:this.handleCreate})),n.map((function(t,n){return i.a.createElement(P,{key:t.id,message:"Co\u015b si\u0119 wywali\u0142o w Timeboxie"},i.a.createElement(S,{title:t.title,taskTime:t.taskTime,onDelete:function(){return e.removeTimebox(n)},onEdit:function(){return e.editTimebox(n,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(n,!0).forEach((function(t){Object(C.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{title:a}))},onChange:e.changeTitle}))})))}}]),t}(i.a.Component);var R=function(){return i.a.createElement(P,{message:"wyst\u0105pi\u0142 b\u0142\u0105d ca\u0142ej aplikacji"},i.a.createElement("div",{className:"App"},i.a.createElement(z,null),i.a.createElement(P,{message:"wyst\u0105pi\u0142 b\u0142\u0105d komponentu EditableTimebox"},i.a.createElement(v,null))))};o.a.render(i.a.createElement(R,null),document.querySelector(".root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d194e1bd.chunk.js.map