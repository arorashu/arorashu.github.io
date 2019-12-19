(this["webpackJsonpspark-digital-equity"]=this["webpackJsonpspark-digital-equity"]||[]).push([[0],{136:function(e,E,t){e.exports=t(271)},141:function(e,E,t){},142:function(e,E,t){},271:function(e,E,t){"use strict";t.r(E);var S=t(1),a=t.n(S),i=t(26),n=t.n(i),l=(t(141),t(5)),A=t(6),r=t(7),o=t(8),L=t(2),D=t(9),c=(t(142),t(134)),O={SCHOOL:0,DISTRICT:1},T=[{id:"AA",desc:"African American",chartColor:"#f6d18a"},{id:"AS",desc:"Asian",chartColor:"blue"},{id:"HI",desc:"Hispanic",chartColor:"green"},{id:"MR",desc:"Multiracial",chartColor:"yellow"},{id:"NA",desc:"NA",chartColor:"pink"},{id:"NH_PI",desc:"Native Hawaiian and Pacific Islander",chartColor:"red"},{id:"WH",desc:"White",chartColor:"brown"}],N={AA:{id:"AA",desc:"African American",chartColor:"#f6d18a",value:0},AS:{id:"AS",desc:"Asian",chartColor:"blue",value:0},HI:{id:"HI",desc:"Hispanic",chartColor:"green",value:0},MR:{id:"MR",desc:"Multiracial",chartColor:"yellow",value:0},NA:{id:"NA",desc:"NA",chartColor:"pink",value:0},NH_PI:{id:"NH_PI",desc:"Native Hawaiian and Pacific Islander",chartColor:"red",value:0},WH:{id:"WH",desc:"White",chartColor:"brown",value:0}};var _=function(e){var E=e.data,t=function(e){var E=new Set;for(var t in e){var S=e[t];S._type===O.SCHOOL&&E.add(S._name)}return E}(E),S=function(e){var E=new Set;for(var t in e){var S=e[t];S._type===O.DISTRICT&&E.add(S._name)}return E}(E),i=function(e){var E=[],t=!0,S=!1,a=void 0;try{for(var i,n=e[Symbol.iterator]();!(t=(i=n.next()).done);t=!0){var l=i.value;E=E.concat({value:l,label:l})}}catch(A){S=!0,a=A}finally{try{t||null==n.return||n.return()}finally{if(S)throw a}}return E}(t),n=function(e){var E=[],t=!0,S=!1,a=void 0;try{for(var i,n=e[Symbol.iterator]();!(t=(i=n.next()).done);t=!0){var l=i.value;E=E.concat({value:l,label:l})}}catch(A){S=!0,a=A}finally{try{t||null==n.return||n.return()}finally{if(S)throw a}}return E}(S),l=i.concat(n);return a.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",{style:{padding:"10px"}},"Select School / District to compare"),a.a.createElement("div",{style:{color:"black"}},a.a.createElement(c.a,{options:l,isMulti:!0,onChange:function(E){return e.onOptionsChange(E)}})))};var H=function(e){return a.a.createElement("div",{style:{display:"flex",flexDirection:"column",textAlign:"left"}},a.a.createElement("div",{style:{padding:"10px"}},"Select To View:"),a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("input",{type:"checkbox",id:"gender",onChange:function(E){return h(e,E)},checked:e.selectedFilters.gender}),a.a.createElement("label",null,"Gender")),a.a.createElement("div",null,a.a.createElement("input",{type:"checkbox",id:"ethnicity",onChange:function(E){return h(e,E)},checked:e.selectedFilters.ethnicity}),a.a.createElement("label",null,"Ethnicity")),a.a.createElement("div",null,a.a.createElement("input",{type:"checkbox",id:"economicallyDisadvantaged",onChange:function(E){return h(e,E)},checked:e.selectedFilters.economicallyDisadvantaged}),a.a.createElement("label",null,"Economically Disadvantaged")),a.a.createElement("div",null,a.a.createElement("input",{type:"checkbox",id:"disability",onChange:function(E){return h(e,E)},checked:e.selectedFilters.disability}),a.a.createElement("label",null,"Students With Disability"))))};function h(e,E){var t=E.target.id,S=E.target.checked,a=e.selectedFilters;a[t]=S,e.onSelectionChange(a)}var s=function(e){return a.a.createElement("div",null,a.a.createElement("h3",{style:{margin:"10px 0 10px 0"}},"Select filters below to view a graph"),a.a.createElement("div",{className:"filter-container",style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",null,a.a.createElement(_,{data:e.data,onOptionsChange:function(E){return e.onSchoolFilterChange(E)}})),a.a.createElement("div",null,a.a.createElement(H,{selectedFilters:e.selectedFilters,onSelectionChange:function(E){return e.onGraphSelectionChange(E)}})),a.a.createElement("div",null)))},C=t(23);var M={height:"300px",width:"25%",minWidth:"250px",flexGrow:"1",display:"flex",flexDirection:"column"};var I=function(e){var E=function(e){var E=e.length,t=[];if(e.forEach((function(e,S){var i=e.schoolName,n=e.dataArray;t.push(a.a.createElement("div",{key:i,style:M},a.a.createElement("div",{style:{height:"90%",flexGrow:"1"}},a.a.createElement(C.a,{key:i,colors:function(e){return e.color},isInteractive:!0,data:n,sortByValue:!0,enableSlicesLabels:!1,enableRadialLabels:!1,margin:{top:40,right:40,bottom:40,left:40},tooltip:function(e){return function(e){return a.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",null,e.label,": ",e.value),a.a.createElement("div",null,"Percentage: ",e.percentage,"%"))}(e)},legends:S+1===E?[{anchor:"top-right",direction:"column",itemWidth:20,itemHeight:20,translateY:20}]:void 0})),a.a.createElement("div",{style:{flexGrow:"1"}},i)))})),t&&t.length>0){var S=[];S.push(a.a.createElement("h3",{key:"gender-heading"},"Gender")),t=S.concat(t)}return t}(function(e,E){var t=[];return E.forEach((function(E){var S=e[E],a=S._male,i=S._female,n={},l=[{id:"male",value:a,percentage:(a/(a+i)*100).toFixed(2),color:"orange",label:"Male"},{id:"female",value:i,percentage:(i/(a+i)*100).toFixed(2),color:"blue",label:"Female"}];n.schoolName=E,n.dataArray=l,t.push(n)})),t}(e.schoolData,e.options));return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",height:"50%",width:"100%"}},E)};var d={height:"300px",width:"25%",minWidth:"250px",flexGrow:"1",display:"flex",flexDirection:"column"};var R=function(e){var E=function(e){var E=[],t=e.length;if(e.forEach((function(e,S){E.push(a.a.createElement("div",{key:e.schoolName,style:d},a.a.createElement("div",{style:{height:"90%",flexGrow:"1"}},a.a.createElement(C.a,{key:e.schoolName,data:e.dataArray,margin:{top:40,right:40,bottom:40,left:40},colors:function(e){return e.chartColor},sortByValue:!0,enableRadialLabels:!1,enableSlicesLabels:!1,tooltip:function(e){return function(e){return a.a.createElement("div",{id:e.id,style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",null,e.desc,": ",e.value),a.a.createElement("div",null,"Percentage: ",e.percentage,"%"))}(e)},legends:S+1===t?[{anchor:"top-right",direction:"column",itemWidth:20,itemHeight:20,translateY:20}]:void 0})),a.a.createElement("div",{style:{flexGrow:"1"}},e.schoolName)))})),E&&E.length>0){var S=[];S.push(a.a.createElement("h3",{key:"ethnicityHeading"},"Ethnicity")),E=S.concat(E)}return E}(function(e,E,t){var S=[];return E.forEach((function(E){var t={},a=[];a=e[E]._ethnicity;var i=0;a.forEach((function(e){return i+=e.value})),a.forEach((function(e){return e.percentage=(e.value/i*100).toFixed(2)})),t.schoolName=E,t.dataArray=a,S.push(t)})),S}(e.schoolData,e.options));return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",height:"50%",width:"100%"}},E)};var u={height:"300px",width:"25%",minWidth:"250px",flexGrow:"1",display:"flex",flexDirection:"column"};var F=function(e){var E=function(e){var E=e.length,t=[];if(e.forEach((function(e,S){var i=e.schoolName,n=e.dataArray;t.push(a.a.createElement("div",{key:i,style:u},a.a.createElement("div",{style:{height:"90%",flexGrow:"1"}},a.a.createElement(C.a,{key:i,colors:function(e){return e.color},isInteractive:!0,data:n,sortByValue:!0,enableSlicesLabels:!1,enableRadialLabels:!1,margin:{top:40,right:40,bottom:40,left:40},tooltip:function(e){return function(e){return a.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",null,e.label,": ",e.value),a.a.createElement("div",null,"Percentage: ",e.percentage,"%"))}(e)},legends:S+1===E?[{anchor:"top-right",direction:"column",itemWidth:20,itemHeight:20,translateY:20}]:void 0})),a.a.createElement("div",{style:{flexGrow:"1"}},i)))})),t&&t.length>0){var S=[];S.push(a.a.createElement("h3",{key:"econdis-heading"},"Economically Disadvantaged")),t=S.concat(t)}return t}(function(e,E){var t=[];return E.forEach((function(E){var S=e[E],a=S._economicallyDisadvantaged,i=S._enrolled,n=i-a,l={},A=[{id:"economicallyDisadvantaged",value:a,percentage:(a/i*100).toFixed(2),color:"orange",label:"Economically Disadvantaged"},{id:"Others",value:n,percentage:(n/i*100).toFixed(2),color:"blue",label:"Others"}];l.schoolName=E,l.dataArray=A,t.push(l)})),t}(e.schoolData,e.options));return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",height:"50%",width:"100%"}},E)};var g={height:"300px",width:"25%",minWidth:"250px",flexGrow:"1",display:"flex",flexDirection:"column"};var m=function(e){var E=function(e){var E=e.length,t=[];if(e.forEach((function(e,S){var i=e.schoolName,n=e.dataArray;t.push(a.a.createElement("div",{key:i,style:g},a.a.createElement("div",{style:{height:"90%",flexGrow:"1"}},a.a.createElement(C.a,{key:i,colors:function(e){return e.color},isInteractive:!0,data:n,sortByValue:!0,enableSlicesLabels:!1,enableRadialLabels:!1,margin:{top:40,right:40,bottom:40,left:40},tooltip:function(e){return function(e){return a.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",null,e.label,": ",e.value),a.a.createElement("div",null,"Percentage: ",e.percentage,"%"))}(e)},legends:S+1===E?[{anchor:"top-right",direction:"column",itemWidth:20,itemHeight:20,translateY:20}]:void 0})),a.a.createElement("div",{style:{flexGrow:"1"}},i)))})),t&&t.length>0){var S=[];S.push(a.a.createElement("div",{key:"disability-heading"},a.a.createElement("h3",null,"Students With Disability"))),t=S.concat(t)}return t}(function(e,E){var t=[];return E.forEach((function(E){var S=e[E],a=S._studentsWithDisability,i=S._enrolled,n=i-a,l={},A=[{id:"studentsWithDisability",value:a,percentage:(a/i*100).toFixed(2),color:"orange",label:"SWD"},{id:"Others",value:n,percentage:(n/i*100).toFixed(2),color:"blue",label:"Others"}];l.schoolName=E,l.dataArray=A,t.push(l)})),t}(e.schoolData,e.options));return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",height:"50%",width:"100%"}},E)},y=t(84),f=function(){function e(){Object(l.a)(this,e),this._male=0,this._female=0,this._ethnicity=[],this._ethnicityMap={},this._districtName="",this._type=0,this._name="",this._economicallyDisadvantaged=0,this._enrolled=0,this._testTakers=0,this._studentsWithDisability=0}return Object(A.a)(e,[{key:"setType",value:function(e){e===O.SCHOOL||O.DISTRICT?this._type=e:(this._type=O.SCHOOL,console.log("error setting entity"))}},{key:"setMale",value:function(e){this._male=e}},{key:"setFemale",value:function(e){this._female=e}},{key:"setEthnicity",value:function(e){this._ethnicity=e}},{key:"setEthnicityMap",value:function(e){this._ethnicityMap=e}},{key:"setDistrictName",value:function(e){this._districtName=e}},{key:"setName",value:function(e){this._name=e}},{key:"setEconomicallyDisadvantaged",value:function(e){this._economicallyDisadvantaged=e}},{key:"setEnrolled",value:function(e){this._enrolled=e}},{key:"setTestTakers",value:function(e){this._testTakers=e}},{key:"setStudentsWithDisability",value:function(e){this._studentsWithDisability=e}}]),e}(),v=function(e){function E(e){var t;return Object(l.a)(this,E),(t=Object(r.a)(this,Object(o.a)(E).call(this,e))).graphSelectionChangeHandler=t.graphSelectionChangeHandler.bind(Object(L.a)(t)),t.state={schoolData:t.transformSchoolData(y),newSchoolData:t.extractSchoolData(y),schoolOptions:[],selectedFilters:{gender:!0,ethnicity:!0,economicallyDisadvantaged:!1,disability:!1}},t}return Object(D.a)(E,e),Object(A.a)(E,[{key:"render",value:function(){var e=this,E=this.createChartsFromFilterState();return a.a.createElement("div",{className:"App",style:{display:"flex",flexDirection:"column"}},a.a.createElement("div",{style:{height:"10%"}}," ",a.a.createElement("h3",null," Digital Equity ")),a.a.createElement("div",{className:"App",style:{display:"flex"}},a.a.createElement("div",{className:"filter-panel"},a.a.createElement(s,{data:this.state.newSchoolData,selectedFilters:this.state.selectedFilters,onSchoolFilterChange:function(E){return e.schoolFilterChangeHandler(E)},onGraphSelectionChange:this.graphSelectionChangeHandler})),a.a.createElement("div",{className:"chart-panel"},E)))}},{key:"createChartsFromFilterState",value:function(){var e=this.state.selectedFilters,E=[];return!0===e.gender&&E.push(a.a.createElement(I,{options:this.state.schoolOptions,schoolData:this.state.newSchoolData,key:"genderChart"})),!0===e.ethnicity&&E.push(a.a.createElement(R,{options:this.state.schoolOptions,schoolData:this.state.newSchoolData,key:"ethnicityChart"})),!0===e.economicallyDisadvantaged&&E.push(a.a.createElement(F,{options:this.state.schoolOptions,schoolData:this.state.newSchoolData,key:"economicallyDisadvantagedChart"})),!0===e.disability&&E.push(a.a.createElement(m,{options:this.state.schoolOptions,schoolData:this.state.newSchoolData,key:"disabilityChart"})),E}},{key:"graphSelectionChangeHandler",value:function(e){this.setState({selectedFilters:e})}},{key:"schoolFilterChangeHandler",value:function(e){e||(e=[]),this.setState({schoolOptions:this.transformSelectedOptions(e)})}},{key:"transformSchoolData",value:function(e){var E={};return e.forEach((function(e){E[e.SCH_NAME]=e})),E}},{key:"transformSelectedOptions",value:function(e){var E=[];return e.forEach((function(e){E.push(e.label)})),E}},{key:"extractSchoolData",value:function(e){var E,t={};E=this.filterSchoolDataWithFields(e),t=this.getSchoolObjectMap(E);for(var S=0,a=Object.keys(t);S<a.length;S++){var i=t[a[S]],n=i._districtName,l=t[n];l||((l=new f).setName(n),l.setType(O.DISTRICT),l.setEthnicityMap(N)),l.setMale(l._male+i._male),l.setFemale(l._female+i._female),l.setEconomicallyDisadvantaged(l._economicallyDisadvantaged+i._economicallyDisadvantaged),l.setEnrolled(l._enrolled+i._enrolled),l.setStudentsWithDisability(l._studentsWithDisability+i._studentsWithDisability);var A=[],r=l._ethnicityMap;for(var o in i._ethnicityMap){var L=i._ethnicityMap[o];r[o].value+=L.value,A.push(r[o])}l.setEthnicityMap(r),l.setEthnicity(A),t[n]=l}return t}},{key:"filterSchoolDataWithFields",value:function(e){var E=[],t=[];return e.forEach((function(e){Number.isInteger(parseInt(e.FEMALE))&&Number.isInteger(parseInt(e.MALE))&&e.DIST_NAME&&Number.isInteger(parseInt(e.ECODIS))&&Number.isInteger(parseInt(e.SWD))?E.push(e):t.push(e)})),t.length>0&&(console.log("missing entry for schools: "),console.log(t)),E}},{key:"getSchoolObjectMap",value:function(e){var E={};return e.forEach((function(e){var t=e.SCH_NAME,S=e.DIST_NAME,a=new f;a.setName(t),a.setType(O.SCHOOL),a.setMale(parseInt(e.MALE)),a.setFemale(parseInt(e.FEMALE)),a.setDistrictName(S),a.setEthnicity([]),a.setEconomicallyDisadvantaged(parseInt(e.ECODIS)),a.setEnrolled(parseInt(e.STUDENTS_ENROLLED)),a.setStudentsWithDisability(parseInt(e.SWD));var i=[],n={};T.forEach((function(E){var t={id:E.id,value:parseInt(e[E.id]),label:E.desc,desc:E.desc,chartColor:E.chartColor};i.push(t),n[t.id]=t})),a.setEthnicity(i),a.setEthnicityMap(n),E[t]=a})),E}}]),E}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(a.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},84:function(e){e.exports=JSON.parse('[{"SY":2016,"ORG_CODE":9,"SCHOOL":90505,"DIST_NAME":"Andover","SCH_NAME":"Andover High","STUDENTS_ENROLLED":"39","# OF TEST_TAKERS":"38","PCT":"97.4","AA":"1","AS":"11","HI":"1","MR":"2","NA":"0","NH_PI":"0","WH":"24","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"9","MALE":"30","FIELD21":""},{"SY":2016,"ORG_CODE":10,"SCHOOL":100505,"DIST_NAME":"Arlington","SCH_NAME":"Arlington High","STUDENTS_ENROLLED":"14","# OF TEST_TAKERS":"13","PCT":"92.9","AA":"0","AS":"2","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"11","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":16,"SCHOOL":160505,"DIST_NAME":"Attleboro","SCH_NAME":"Attleboro High","STUDENTS_ENROLLED":"13","# OF TEST_TAKERS":"13","PCT":"100.0","AA":"1","AS":"1","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"10","ECODIS":"2","SWD":"1","ELL":"0","FEMALE":"0","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":17,"SCHOOL":170505,"DIST_NAME":"Auburn","SCH_NAME":"Auburn Senior High","STUDENTS_ENROLLED":"17","# OF TEST_TAKERS":"16","PCT":"94.1","AA":"0","AS":"1","HI":"2","MR":"0","NA":"0","NH_PI":"0","WH":"14","ECODIS":"2","SWD":"0","ELL":"0","FEMALE":"1","MALE":"16","FIELD21":""},{"SY":2016,"ORG_CODE":20,"SCHOOL":200505,"DIST_NAME":"Barnstable","SCH_NAME":"Barnstable High","STUDENTS_ENROLLED":"23","# OF TEST_TAKERS":"23","PCT":"100.0","AA":"0","AS":"7","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"16","ECODIS":"2","SWD":"0","ELL":"0","FEMALE":"2","MALE":"21","FIELD21":""},{"SY":2016,"ORG_CODE":23,"SCHOOL":230505,"DIST_NAME":"Bedford","SCH_NAME":"Bedford High","STUDENTS_ENROLLED":"5","# OF TEST_TAKERS":"4","PCT":"***","AA":"***","AS":"***","HI":"***","MR":"***","NA":"***","NH_PI":"***","WH":"***","ECODIS":"***","SWD":"***","ELL":"***","FEMALE":"***","MALE":"***","FIELD21":""},{"SY":2016,"ORG_CODE":31,"SCHOOL":310505,"DIST_NAME":"Billerica","SCH_NAME":"Billerica Memorial High School","STUDENTS_ENROLLED":"12","# OF TEST_TAKERS":"12","PCT":"100.0","AA":"0","AS":"3","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"0","MALE":"12","FIELD21":""},{"SY":2016,"ORG_CODE":40,"SCHOOL":400505,"DIST_NAME":"Braintree","SCH_NAME":"Braintree High","STUDENTS_ENROLLED":"11","# OF TEST_TAKERS":"9","PCT":"81.8","AA":"0","AS":"8","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"3","ECODIS":"3","SWD":"0","ELL":"1","FEMALE":"5","MALE":"6","FIELD21":""},{"SY":2016,"ORG_CODE":48,"SCHOOL":480505,"DIST_NAME":"Burlington","SCH_NAME":"Burlington High","STUDENTS_ENROLLED":"11","# OF TEST_TAKERS":"10","PCT":"90.9","AA":"0","AS":"3","HI":"3","MR":"0","NA":"0","NH_PI":"0","WH":"5","ECODIS":"2","SWD":"0","ELL":"1","FEMALE":"0","MALE":"11","FIELD21":""},{"SY":2016,"ORG_CODE":49,"SCHOOL":490506,"DIST_NAME":"Cambridge","SCH_NAME":"Cambridge Rindge and Latin","STUDENTS_ENROLLED":"103","# OF TEST_TAKERS":"37","PCT":"35.9","AA":"15","AS":"19","HI":"6","MR":"4","NA":"0","NH_PI":"0","WH":"59","ECODIS":"15","SWD":"1","ELL":"1","FEMALE":"37","MALE":"66","FIELD21":""},{"SY":2016,"ORG_CODE":56,"SCHOOL":560505,"DIST_NAME":"Chelmsford","SCH_NAME":"Chelmsford High","STUDENTS_ENROLLED":"43","# OF TEST_TAKERS":"12","PCT":"27.9","AA":"0","AS":"9","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"32","ECODIS":"0","SWD":"1","ELL":"0","FEMALE":"10","MALE":"33","FIELD21":""},{"SY":2016,"ORG_CODE":61,"SCHOOL":610510,"DIST_NAME":"Chicopee","SCH_NAME":"Chicopee Comprehensive High School","STUDENTS_ENROLLED":"5","# OF TEST_TAKERS":"5","PCT":"***","AA":"***","AS":"***","HI":"***","MR":"***","NA":"***","NH_PI":"***","WH":"***","ECODIS":"***","SWD":"***","ELL":"***","FEMALE":"***","MALE":"***","FIELD21":""},{"SY":2016,"ORG_CODE":72,"SCHOOL":720505,"DIST_NAME":"Dartmouth","SCH_NAME":"Dartmouth High","STUDENTS_ENROLLED":"12","# OF TEST_TAKERS":"12","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"2","NA":"0","NH_PI":"0","WH":"10","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"11","FIELD21":""},{"SY":2016,"ORG_CODE":73,"SCHOOL":730505,"DIST_NAME":"Dedham","SCH_NAME":"Dedham High","STUDENTS_ENROLLED":"10","# OF TEST_TAKERS":"9","PCT":"90.0","AA":"1","AS":"1","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"8","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"1","MALE":"9","FIELD21":""},{"SY":2016,"ORG_CODE":82,"SCHOOL":820505,"DIST_NAME":"Duxbury","SCH_NAME":"Duxbury High","STUDENTS_ENROLLED":"13","# OF TEST_TAKERS":"12","PCT":"92.3","AA":"0","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"12","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"0","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":87,"SCHOOL":870505,"DIST_NAME":"East Longmeadow","SCH_NAME":"East Longmeadow High","STUDENTS_ENROLLED":"21","# OF TEST_TAKERS":"12","PCT":"57.1","AA":"0","AS":"2","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"18","ECODIS":"2","SWD":"0","ELL":"0","FEMALE":"2","MALE":"19","FIELD21":""},{"SY":2016,"ORG_CODE":95,"SCHOOL":950505,"DIST_NAME":"Fall River","SCH_NAME":"B M C Durfee High","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"14","PCT":"58.3","AA":"3","AS":"2","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"17","ECODIS":"10","SWD":"0","ELL":"2","FEMALE":"8","MALE":"16","FIELD21":""},{"SY":2016,"ORG_CODE":100,"SCHOOL":1000515,"DIST_NAME":"Framingham","SCH_NAME":"Framingham High School","STUDENTS_ENROLLED":"19","# OF TEST_TAKERS":"13","PCT":"68.4","AA":"0","AS":"4","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"1","MALE":"18","FIELD21":""},{"SY":2016,"ORG_CODE":101,"SCHOOL":1010505,"DIST_NAME":"Franklin","SCH_NAME":"Franklin High","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"22","PCT":"91.7","AA":"0","AS":"8","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"14","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"10","MALE":"14","FIELD21":""},{"SY":2016,"ORG_CODE":107,"SCHOOL":1070505,"DIST_NAME":"Gloucester","SCH_NAME":"Gloucester High","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"16","PCT":"66.7","AA":"1","AS":"1","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"21","ECODIS":"4","SWD":"0","ELL":"0","FEMALE":"2","MALE":"22","FIELD21":""},{"SY":2016,"ORG_CODE":110,"SCHOOL":1100505,"DIST_NAME":"Grafton","SCH_NAME":"Grafton High School","STUDENTS_ENROLLED":"21","# OF TEST_TAKERS":"17","PCT":"81.0","AA":"0","AS":"2","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"17","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"2","MALE":"19","FIELD21":""},{"SY":2016,"ORG_CODE":128,"SCHOOL":1280505,"DIST_NAME":"Haverhill","SCH_NAME":"Haverhill High","STUDENTS_ENROLLED":"16","# OF TEST_TAKERS":"11","PCT":"68.8","AA":"0","AS":"0","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"3","SWD":"1","ELL":"0","FEMALE":"2","MALE":"14","FIELD21":""},{"SY":2016,"ORG_CODE":139,"SCHOOL":1390505,"DIST_NAME":"Hopkinton","SCH_NAME":"Hopkinton High","STUDENTS_ENROLLED":"17","# OF TEST_TAKERS":"11","PCT":"64.7","AA":"0","AS":"7","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"10","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"4","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":144,"SCHOOL":1440505,"DIST_NAME":"Ipswich","SCH_NAME":"Ipswich High","STUDENTS_ENROLLED":"5","# OF TEST_TAKERS":"5","PCT":"***","AA":"***","AS":"***","HI":"***","MR":"***","NA":"***","NH_PI":"***","WH":"***","ECODIS":"***","SWD":"***","ELL":"***","FEMALE":"***","MALE":"***","FIELD21":""},{"SY":2016,"ORG_CODE":150,"SCHOOL":1500505,"DIST_NAME":"Lee","SCH_NAME":"Lee Middle/High School","STUDENTS_ENROLLED":"4","# OF TEST_TAKERS":"4","PCT":"***","AA":"***","AS":"***","HI":"***","MR":"***","NA":"***","NH_PI":"***","WH":"***","ECODIS":"***","SWD":"***","ELL":"***","FEMALE":"***","MALE":"***","FIELD21":""},{"SY":2016,"ORG_CODE":155,"SCHOOL":1550505,"DIST_NAME":"Lexington","SCH_NAME":"Lexington High","STUDENTS_ENROLLED":"71","# OF TEST_TAKERS":"59","PCT":"83.1","AA":"0","AS":"37","HI":"2","MR":"2","NA":"0","NH_PI":"0","WH":"30","ECODIS":"2","SWD":"1","ELL":"1","FEMALE":"10","MALE":"61","FIELD21":""},{"SY":2016,"ORG_CODE":159,"SCHOOL":1590505,"DIST_NAME":"Longmeadow","SCH_NAME":"Longmeadow High","STUDENTS_ENROLLED":"23","# OF TEST_TAKERS":"15","PCT":"65.2","AA":"0","AS":"4","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"17","ECODIS":"2","SWD":"2","ELL":"0","FEMALE":"5","MALE":"18","FIELD21":""},{"SY":2016,"ORG_CODE":171,"SCHOOL":1710505,"DIST_NAME":"Marshfield","SCH_NAME":"Marshfield High","STUDENTS_ENROLLED":"17","# OF TEST_TAKERS":"16","PCT":"94.1","AA":"0","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"16","ECODIS":"0","SWD":"1","ELL":"0","FEMALE":"1","MALE":"16","FIELD21":""},{"SY":2016,"ORG_CODE":189,"SCHOOL":1890505,"DIST_NAME":"Milton","SCH_NAME":"Milton High","STUDENTS_ENROLLED":"31","# OF TEST_TAKERS":"14","PCT":"45.2","AA":"9","AS":"3","HI":"1","MR":"0","NA":"0","NH_PI":"1","WH":"17","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"6","MALE":"25","FIELD21":""},{"SY":2016,"ORG_CODE":198,"SCHOOL":1980505,"DIST_NAME":"Natick","SCH_NAME":"Natick High","STUDENTS_ENROLLED":"26","# OF TEST_TAKERS":"25","PCT":"96.2","AA":"1","AS":"9","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"9","MALE":"17","FIELD21":""},{"SY":2016,"ORG_CODE":199,"SCHOOL":1990505,"DIST_NAME":"Needham","SCH_NAME":"Needham High","STUDENTS_ENROLLED":"47","# OF TEST_TAKERS":"33","PCT":"70.2","AA":"0","AS":"4","HI":"2","MR":"1","NA":"0","NH_PI":"0","WH":"40","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"10","MALE":"37","FIELD21":""},{"SY":2016,"ORG_CODE":201,"SCHOOL":2010505,"DIST_NAME":"New Bedford","SCH_NAME":"New Bedford High","STUDENTS_ENROLLED":"14","# OF TEST_TAKERS":"13","PCT":"92.9","AA":"1","AS":"2","HI":"2","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"5","SWD":"0","ELL":"0","FEMALE":"7","MALE":"7","FIELD21":""},{"SY":2016,"ORG_CODE":214,"SCHOOL":2140505,"DIST_NAME":"Northbridge","SCH_NAME":"Northbridge High","STUDENTS_ENROLLED":"4","# OF TEST_TAKERS":"4","PCT":"***","AA":"***","AS":"***","HI":"***","MR":"***","NA":"***","NH_PI":"***","WH":"***","ECODIS":"***","SWD":"***","ELL":"***","FEMALE":"***","MALE":"***","FIELD21":""},{"SY":2016,"ORG_CODE":217,"SCHOOL":2170505,"DIST_NAME":"North Reading","SCH_NAME":"North Reading High","STUDENTS_ENROLLED":"6","# OF TEST_TAKERS":"6","PCT":"100.0","AA":"0","AS":"1","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"5","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"0","MALE":"6","FIELD21":""},{"SY":2016,"ORG_CODE":229,"SCHOOL":2290510,"DIST_NAME":"Peabody","SCH_NAME":"Peabody Veterans Memorial High","STUDENTS_ENROLLED":"9","# OF TEST_TAKERS":"9","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"0","SWD":"1","ELL":"0","FEMALE":"0","MALE":"9","FIELD21":""},{"SY":2016,"ORG_CODE":236,"SCHOOL":2360505,"DIST_NAME":"Pittsfield","SCH_NAME":"Pittsfield High","STUDENTS_ENROLLED":"10","# OF TEST_TAKERS":"4","PCT":"40.0","AA":"1","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"8","ECODIS":"4","SWD":"1","ELL":"0","FEMALE":"2","MALE":"8","FIELD21":""},{"SY":2016,"ORG_CODE":236,"SCHOOL":2360510,"DIST_NAME":"Pittsfield","SCH_NAME":"Taconic High","STUDENTS_ENROLLED":"10","# OF TEST_TAKERS":"10","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"9","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"2","MALE":"8","FIELD21":""},{"SY":2016,"ORG_CODE":243,"SCHOOL":2430505,"DIST_NAME":"Quincy","SCH_NAME":"Quincy High","STUDENTS_ENROLLED":"21","# OF TEST_TAKERS":"21","PCT":"100.0","AA":"0","AS":"12","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"11","MALE":"10","FIELD21":""},{"SY":2016,"ORG_CODE":243,"SCHOOL":2430510,"DIST_NAME":"Quincy","SCH_NAME":"North Quincy High","STUDENTS_ENROLLED":"18","# OF TEST_TAKERS":"16","PCT":"88.9","AA":"0","AS":"16","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"2","ECODIS":"5","SWD":"0","ELL":"0","FEMALE":"5","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":246,"SCHOOL":2460505,"DIST_NAME":"Reading","SCH_NAME":"Reading Memorial High","STUDENTS_ENROLLED":"25","# OF TEST_TAKERS":"22","PCT":"88.0","AA":"0","AS":"2","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"23","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"5","MALE":"20","FIELD21":""},{"SY":2016,"ORG_CODE":248,"SCHOOL":2480505,"DIST_NAME":"Revere","SCH_NAME":"Revere High","STUDENTS_ENROLLED":"15","# OF TEST_TAKERS":"15","PCT":"100.0","AA":"0","AS":"1","HI":"8","MR":"1","NA":"0","NH_PI":"0","WH":"5","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"3","MALE":"12","FIELD21":""},{"SY":2016,"ORG_CODE":262,"SCHOOL":2620505,"DIST_NAME":"Saugus","SCH_NAME":"Saugus High","STUDENTS_ENROLLED":"19","# OF TEST_TAKERS":"18","PCT":"94.7","AA":"0","AS":"1","HI":"3","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"7","MALE":"12","FIELD21":""},{"SY":2016,"ORG_CODE":264,"SCHOOL":2640505,"DIST_NAME":"Scituate","SCH_NAME":"Scituate High School","STUDENTS_ENROLLED":"27","# OF TEST_TAKERS":"0","PCT":"0.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"27","ECODIS":"0","SWD":"1","ELL":"0","FEMALE":"6","MALE":"21","FIELD21":""},{"SY":2016,"ORG_CODE":266,"SCHOOL":2660505,"DIST_NAME":"Sharon","SCH_NAME":"Sharon High","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"15","PCT":"62.5","AA":"0","AS":"12","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"12","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"3","MALE":"21","FIELD21":""},{"SY":2016,"ORG_CODE":274,"SCHOOL":2740505,"DIST_NAME":"Somerville","SCH_NAME":"Somerville High","STUDENTS_ENROLLED":"38","# OF TEST_TAKERS":"35","PCT":"92.1","AA":"1","AS":"13","HI":"5","MR":"1","NA":"0","NH_PI":"0","WH":"18","ECODIS":"10","SWD":"0","ELL":"0","FEMALE":"8","MALE":"30","FIELD21":""},{"SY":2016,"ORG_CODE":278,"SCHOOL":2780505,"DIST_NAME":"South Hadley","SCH_NAME":"South Hadley High","STUDENTS_ENROLLED":"7","# OF TEST_TAKERS":"5","PCT":"71.4","AA":"0","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"6","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"2","MALE":"5","FIELD21":""},{"SY":2016,"ORG_CODE":281,"SCHOOL":2810500,"DIST_NAME":"Springfield","SCH_NAME":"Springfield Central High","STUDENTS_ENROLLED":"30","# OF TEST_TAKERS":"28","PCT":"93.3","AA":"7","AS":"7","HI":"8","MR":"0","NA":"0","NH_PI":"0","WH":"8","ECODIS":"11","SWD":"0","ELL":"1","FEMALE":"11","MALE":"19","FIELD21":""},{"SY":2016,"ORG_CODE":281,"SCHOOL":2810620,"DIST_NAME":"Springfield","SCH_NAME":"Roger L. Putnam Vocational Technical Academy","STUDENTS_ENROLLED":"7","# OF TEST_TAKERS":"5","PCT":"71.4","AA":"1","AS":"0","HI":"3","MR":"0","NA":"0","NH_PI":"0","WH":"3","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"1","MALE":"6","FIELD21":""},{"SY":2016,"ORG_CODE":285,"SCHOOL":2850505,"DIST_NAME":"Stoughton","SCH_NAME":"Stoughton High","STUDENTS_ENROLLED":"17","# OF TEST_TAKERS":"15","PCT":"88.2","AA":"3","AS":"4","HI":"1","MR":"0","NA":"0","NH_PI":"1","WH":"8","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"2","MALE":"15","FIELD21":""},{"SY":2016,"ORG_CODE":292,"SCHOOL":2920505,"DIST_NAME":"Swansea","SCH_NAME":"Joseph Case High","STUDENTS_ENROLLED":"9","# OF TEST_TAKERS":"9","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"8","FIELD21":""},{"SY":2016,"ORG_CODE":305,"SCHOOL":3050505,"DIST_NAME":"Wakefield","SCH_NAME":"Wakefield Memorial High","STUDENTS_ENROLLED":"16","# OF TEST_TAKERS":"4","PCT":"25.0","AA":"0","AS":"1","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"7","MALE":"9","FIELD21":""},{"SY":2016,"ORG_CODE":314,"SCHOOL":3140505,"DIST_NAME":"Watertown","SCH_NAME":"Watertown High","STUDENTS_ENROLLED":"10","# OF TEST_TAKERS":"7","PCT":"70.0","AA":"0","AS":"0","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"9","ECODIS":"2","SWD":"1","ELL":"0","FEMALE":"0","MALE":"10","FIELD21":""},{"SY":2016,"ORG_CODE":317,"SCHOOL":3170505,"DIST_NAME":"Wellesley","SCH_NAME":"Wellesley Sr High","STUDENTS_ENROLLED":"50","# OF TEST_TAKERS":"41","PCT":"82.0","AA":"0","AS":"10","HI":"5","MR":"4","NA":"0","NH_PI":"0","WH":"31","ECODIS":"1","SWD":"1","ELL":"0","FEMALE":"12","MALE":"38","FIELD21":""},{"SY":2016,"ORG_CODE":325,"SCHOOL":3250505,"DIST_NAME":"Westfield","SCH_NAME":"Westfield High","STUDENTS_ENROLLED":"6","# OF TEST_TAKERS":"3","PCT":"50.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"6","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"0","MALE":"6","FIELD21":""},{"SY":2016,"ORG_CODE":326,"SCHOOL":3260505,"DIST_NAME":"Westford","SCH_NAME":"Westford Academy","STUDENTS_ENROLLED":"15","# OF TEST_TAKERS":"15","PCT":"100.0","AA":"0","AS":"7","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"8","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"2","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":330,"SCHOOL":3300505,"DIST_NAME":"Weston","SCH_NAME":"Weston High","STUDENTS_ENROLLED":"25","# OF TEST_TAKERS":"23","PCT":"92.0","AA":"1","AS":"7","HI":"0","MR":"1","NA":"0","NH_PI":"0","WH":"16","ECODIS":"2","SWD":"0","ELL":"1","FEMALE":"10","MALE":"15","FIELD21":""},{"SY":2016,"ORG_CODE":335,"SCHOOL":3350505,"DIST_NAME":"Westwood","SCH_NAME":"Westwood High","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"20","PCT":"83.3","AA":"0","AS":"1","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"22","ECODIS":"2","SWD":"1","ELL":"0","FEMALE":"4","MALE":"20","FIELD21":""},{"SY":2016,"ORG_CODE":336,"SCHOOL":3360505,"DIST_NAME":"Weymouth","SCH_NAME":"Weymouth High School","STUDENTS_ENROLLED":"19","# OF TEST_TAKERS":"13","PCT":"68.4","AA":"1","AS":"3","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"13","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"2","MALE":"17","FIELD21":""},{"SY":2016,"ORG_CODE":344,"SCHOOL":3440505,"DIST_NAME":"Winchester","SCH_NAME":"Winchester High School","STUDENTS_ENROLLED":"52","# OF TEST_TAKERS":"27","PCT":"51.9","AA":"2","AS":"21","HI":"1","MR":"1","NA":"0","NH_PI":"0","WH":"27","ECODIS":"1","SWD":"1","ELL":"0","FEMALE":"15","MALE":"37","FIELD21":""},{"SY":2016,"ORG_CODE":430,"SCHOOL":4300305,"DIST_NAME":"Advanced Math and Science Academy Charter (District)","SCH_NAME":"Advanced Math and Science Academy Charter School","STUDENTS_ENROLLED":"55","# OF TEST_TAKERS":"54","PCT":"98.2","AA":"0","AS":"24","HI":"2","MR":"2","NA":"0","NH_PI":"0","WH":"27","ECODIS":"2","SWD":"1","ELL":"0","FEMALE":"27","MALE":"28","FIELD21":""},{"SY":2016,"ORG_CODE":487,"SCHOOL":4870550,"DIST_NAME":"Prospect Hill Academy Charter (District)","SCH_NAME":"Prospect Hill Academy Charter School","STUDENTS_ENROLLED":"24","# OF TEST_TAKERS":"18","PCT":"75.0","AA":"8","AS":"5","HI":"6","MR":"1","NA":"0","NH_PI":"0","WH":"4","ECODIS":"7","SWD":"2","ELL":"0","FEMALE":"6","MALE":"18","FIELD21":""},{"SY":2016,"ORG_CODE":494,"SCHOOL":4940205,"DIST_NAME":"Pioneer Charter School of Science (District)","SCH_NAME":"Pioneer Charter School of Science","STUDENTS_ENROLLED":"12","# OF TEST_TAKERS":"12","PCT":"100.0","AA":"5","AS":"0","HI":"2","MR":"0","NA":"0","NH_PI":"0","WH":"5","ECODIS":"5","SWD":"0","ELL":"0","FEMALE":"5","MALE":"7","FIELD21":""},{"SY":2016,"ORG_CODE":625,"SCHOOL":6250505,"DIST_NAME":"Bridgewater-Raynham","SCH_NAME":"Bridgewater-Raynham Regional","STUDENTS_ENROLLED":"12","# OF TEST_TAKERS":"12","PCT":"100.0","AA":"1","AS":"0","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"10","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"0","MALE":"12","FIELD21":""},{"SY":2016,"ORG_CODE":645,"SCHOOL":6450505,"DIST_NAME":"Dennis-Yarmouth","SCH_NAME":"Dennis-Yarmouth Regional High","STUDENTS_ENROLLED":"20","# OF TEST_TAKERS":"13","PCT":"65.0","AA":"0","AS":"2","HI":"1","MR":"0","NA":"0","NH_PI":"0","WH":"17","ECODIS":"5","SWD":"0","ELL":"0","FEMALE":"1","MALE":"19","FIELD21":""},{"SY":2016,"ORG_CODE":658,"SCHOOL":6580505,"DIST_NAME":"Dudley-Charlton Reg","SCH_NAME":"Shepherd Hill Regional High","STUDENTS_ENROLLED":"13","# OF TEST_TAKERS":"12","PCT":"92.3","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"13","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"2","MALE":"11","FIELD21":""},{"SY":2016,"ORG_CODE":675,"SCHOOL":6750505,"DIST_NAME":"Hamilton-Wenham","SCH_NAME":"Hamilton-Wenham Regional High","STUDENTS_ENROLLED":"16","# OF TEST_TAKERS":"11","PCT":"68.8","AA":"1","AS":"2","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"13","ECODIS":"0","SWD":"1","ELL":"0","FEMALE":"4","MALE":"12","FIELD21":""},{"SY":2016,"ORG_CODE":680,"SCHOOL":6800505,"DIST_NAME":"Hampden-Wilbraham","SCH_NAME":"Minnechaug Regional High","STUDENTS_ENROLLED":"9","# OF TEST_TAKERS":"4","PCT":"44.4","AA":"0","AS":"1","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"8","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"8","FIELD21":""},{"SY":2016,"ORG_CODE":705,"SCHOOL":7050505,"DIST_NAME":"Masconomet","SCH_NAME":"Masconomet Regional High School","STUDENTS_ENROLLED":"33","# OF TEST_TAKERS":"25","PCT":"75.8","AA":"0","AS":"1","HI":"2","MR":"0","NA":"0","NH_PI":"0","WH":"30","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"1","MALE":"32","FIELD21":""},{"SY":2016,"ORG_CODE":710,"SCHOOL":7100510,"DIST_NAME":"Mendon-Upton","SCH_NAME":"Nipmuc Regional High","STUDENTS_ENROLLED":"16","# OF TEST_TAKERS":"16","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"16","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"2","MALE":"14","FIELD21":""},{"SY":2016,"ORG_CODE":730,"SCHOOL":7300505,"DIST_NAME":"Northboro-Southboro","SCH_NAME":"Algonquin Regional High","STUDENTS_ENROLLED":"15","# OF TEST_TAKERS":"14","PCT":"93.3","AA":"0","AS":"5","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"10","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"2","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":760,"SCHOOL":7600505,"DIST_NAME":"Silver Lake","SCH_NAME":"Silver Lake Regional High","STUDENTS_ENROLLED":"15","# OF TEST_TAKERS":"11","PCT":"73.3","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"15","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"14","FIELD21":""},{"SY":2016,"ORG_CODE":773,"SCHOOL":7730505,"DIST_NAME":"Triton","SCH_NAME":"Triton Regional High School","STUDENTS_ENROLLED":"13","# OF TEST_TAKERS":"11","PCT":"84.6","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"13","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"0","MALE":"13","FIELD21":""},{"SY":2016,"ORG_CODE":805,"SCHOOL":8050605,"DIST_NAME":"Blackstone Valley Regional Vocational Technical","SCH_NAME":"Blackstone Valley","STUDENTS_ENROLLED":"6","# OF TEST_TAKERS":"5","PCT":"83.3","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"6","ECODIS":"1","SWD":"0","ELL":"0","FEMALE":"1","MALE":"5","FIELD21":""},{"SY":2016,"ORG_CODE":818,"SCHOOL":8180605,"DIST_NAME":"Franklin County Regional Vocational Technical","SCH_NAME":"Franklin County Technical","STUDENTS_ENROLLED":"11","# OF TEST_TAKERS":"11","PCT":"100.0","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"11","ECODIS":"0","SWD":"0","ELL":"0","FEMALE":"1","MALE":"10","FIELD21":""},{"SY":2016,"ORG_CODE":852,"SCHOOL":8520605,"DIST_NAME":"Nashoba Valley Regional Vocational Technical","SCH_NAME":"Nashoba Valley Technical High School","STUDENTS_ENROLLED":"9","# OF TEST_TAKERS":"7","PCT":"77.8","AA":"0","AS":"0","HI":"0","MR":"0","NA":"0","NH_PI":"0","WH":"9","ECODIS":"3","SWD":"0","ELL":"0","FEMALE":"0","MALE":"9","FIELD21":""},{"SY":null,"ORG_CODE":null,"SCHOOL":null,"DIST_NAME":"TOTAL","SCH_NAME":"TOTAL","STUDENTS_ENROLLED":"1527","# OF TEST_TAKERS":"1151","PCT":"75.4","AA":"65","AS":"309","HI":"80","MR":"34","NA":"0","NH_PI":"2","WH":"1014","ECODIS":"150","SWD":"19","ELL":"8","FEMALE":"321","MALE":"1183","FIELD21":""}]')}},[[136,1,2]]]);
//# sourceMappingURL=main.3a81a54f.chunk.js.map