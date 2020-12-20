(()=>{"use strict";({divContent:document.getElementById("content"),hTitle:document.createElement("h2"),pExplain:document.createElement("p"),divList:document.createElement("div"),divSearch:document.createElement("div"),paragraph:document.createElement("p"),headAdd:document.createElement("h3"),labelCity:document.createElement("label"),nameCity:document.createElement("input"),labelUnits:document.createElement("label"),selectUnit:document.createElement("select"),labelError:document.createElement("label"),tempUnits:{metric:"°C",imperial:"°F",standard:"°K"},colorParams:["text-success","text-warning","text-danger"],buttonSearch:document.createElement("button"),loadPageContent(){const t=this;this.divContent.classList.add("col-12"),this.divContent.classList.add("row"),this.hTitle.classList.add("col-12"),this.hTitle.classList.add("text-center"),this.hTitle.innerText="WEATHER CONDITION",this.pExplain.classList.add("col-12"),this.pExplain.classList.add("text-center"),this.pExplain.innerText="Complete the form, search a city by name and choose a temperature unit to get updated information.",this.divContent.appendChild(this.hTitle),this.divContent.appendChild(this.pExplain),this.divContent.appendChild(this.divSearch),this.divContent.appendChild(this.divList),this.loadDivShowResult(),this.loadDivSearchCity(),this.buttonSearch.onclick=function(){t.getWeather()},this.nameCity.value="Miami",this.selectUnit.value="metric",this.getWeather()},loadDivSearchCity(){this.divSearch.classList.add("child-width"),this.divSearch.classList.add("col-4"),this.nameCity.type="text",this.headAdd.innerText="Search city",this.nameCity.placeholder="City name",this.buttonSearch.innerText="Search",this.labelCity.innerText="City name:",this.labelUnits.innerText="Temperature units:",this.divSearch.appendChild(this.headAdd),this.divSearch.appendChild(this.labelCity),this.divSearch.appendChild(this.nameCity),this.divSearch.appendChild(this.labelUnits),this.loadSelectUnit(),this.divSearch.appendChild(this.buttonSearch),this.divSearch.appendChild(this.labelError)},loadSelectUnit(){const t=this,e=["metric","imperial","standard"];["Celsius","Fahrenheit","Kelvin"].forEach(((i,a)=>{const n=document.createElement("option");n.value=e[a],n.innerHTML=i,t.selectUnit.appendChild(n)})),this.divSearch.appendChild(this.selectUnit)},getWeather(){let t=this;if(""===this.nameCity.value)return this.addLabelErrorColor(1),void(this.labelError.innerText="City name field cannot be blank");this.labelError.innerText="",fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameCity.value}&units=${this.selectUnit.value}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`,{method:"get",mode:"cors"}).then((t=>{if(!t.ok)throw Error(t.statusText);return t.text()})).then((t=>{let e=t.split("");e=e.slice(5,e.length-1).join("");let i=JSON.parse(e);console.log(i),this.paragraph.innerHTML=`<h3>${this.nameCity.value} weather condition</h3>\n            <p><strong>country code:</strong> ${i.sys.country}</p>\n            <p><strong>longitude:</strong> ${i.coord.lon} °</p>\n            <p><strong>latitude:</strong> ${i.coord.lat} °</p>\n            <p><strong>temperature:</strong> ${i.main.temp}${this.tempUnits[this.selectUnit.value]}</p>\n            <p><strong>pressure:</strong> ${i.main.pressure} hPa</p>\n            <p><strong>humidity:</strong> ${i.main.humidity} %</p>\n            <p><strong>wind speed:</strong> ${i.wind.speed} km/h</p>`,this.nameCity.value="",this.selectUnit.value="metric",this.addLabelErrorColor(0),this.labelError.innerText="search successfully completed"})).catch((function(e){t.addLabelErrorColor(2),t.labelError.innerText=e}))},addLabelErrorColor(t){for(let e=0;e<this.colorParams.length;e++)e===t?this.labelError.classList.add(this.colorParams[e]):this.labelError.classList.remove(this.colorParams[e])},loadDivShowResult(){this.divList.classList.add("col-8"),this.paragraph.classList.add("child-width"),this.divList.appendChild(this.paragraph)}}).loadPageContent()})();