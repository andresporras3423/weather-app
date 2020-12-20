(()=>{"use strict";({divContent:document.getElementById("content"),hTitle:document.createElement("h2"),pExplain:document.createElement("p"),divLeft:document.createElement("div"),divCenter:document.createElement("div"),divRight:document.createElement("div"),divList:document.createElement("div"),divSearch:document.createElement("div"),paragraph:document.createElement("p"),headAdd:document.createElement("h3"),labelCity:document.createElement("label"),nameCity:document.createElement("input"),labelUnits:document.createElement("label"),selectUnit:document.createElement("select"),labelError:document.createElement("label"),tempUnits:{metric:"°C",imperial:"°F",standard:"°K"},colorParams:["text-success","text-warning","text-danger"],buttonSearch:document.createElement("button"),async loadPageContent(){const t=this;this.divContent.classList.add("col-12"),this.divContent.classList.add("row"),this.hTitle.classList.add("col-12"),this.hTitle.classList.add("text-center"),this.hTitle.innerText="WEATHER CONDITION",this.pExplain.classList.add("col-12"),this.pExplain.classList.add("text-center"),this.pExplain.innerText="Complete the form, search a city by name and choose a temperature unit to get updated information.",this.divLeft.classList.add("col-2"),this.divCenter.classList.add("col-8"),this.divCenter.classList.add("row"),this.divCenter.classList.add("black-background"),this.divRight.classList.add("col-2"),this.divCenter.appendChild(this.hTitle),this.divCenter.appendChild(this.pExplain),this.divCenter.appendChild(this.divSearch),this.divCenter.appendChild(this.divList),this.divContent.appendChild(this.divLeft),this.divContent.appendChild(this.divCenter),this.divContent.appendChild(this.divRight),this.loadDivShowResult(),this.loadDivSearchCity(),this.buttonSearch.onclick=function(){t.getWeather()},this.nameCity.value="Miami",this.selectUnit.value="metric",await this.getWeather(),this.labelError.innerText=""},loadDivSearchCity(){this.divSearch.classList.add("child-width"),this.divSearch.classList.add("col-6"),this.nameCity.type="text",this.headAdd.innerText="Search city",this.nameCity.placeholder="City name",this.buttonSearch.innerText="Search",this.labelCity.innerText="City name:",this.labelUnits.innerText="Temperature units:",this.divSearch.appendChild(this.headAdd),this.divSearch.appendChild(this.labelCity),this.divSearch.appendChild(this.nameCity),this.divSearch.appendChild(this.labelUnits),this.loadSelectUnit(),this.divSearch.appendChild(this.buttonSearch),this.divSearch.appendChild(this.labelError)},loadSelectUnit(){const t=this,e=["metric","imperial","standard"];["Celsius","Fahrenheit","Kelvin"].forEach(((i,a)=>{const n=document.createElement("option");n.value=e[a],n.innerHTML=i,t.selectUnit.appendChild(n)})),this.divSearch.appendChild(this.selectUnit)},async getWeather(){if(""===this.nameCity.value)return this.addLabelErrorColor(1),void(this.labelError.innerText="City name field cannot be blank");this.labelError.innerText="",await this.getWeatherData(),console.log("hello world")},getWeatherData(){return new Promise((t=>{const e=this;fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameCity.value}&units=${this.selectUnit.value}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`,{method:"get",mode:"cors"}).then((t=>{if(!t.ok)throw Error(t.statusText);return t.text()})).then((e=>{let i=e.split("");i=i.slice(5,i.length-1).join("");let a=JSON.parse(i);console.log(a),this.paragraph.innerHTML=`<h3>${this.nameCity.value} weather condition</h3>\n            <p><img src="http://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png" width="100" height="100" />\n            <label>${a.weather[0].description}</label>\n            </p>\n            <p><strong>country code:</strong> ${a.sys.country}</p>\n            <p><strong>longitude:</strong> ${a.coord.lon} °</p>\n            <p><strong>latitude:</strong> ${a.coord.lat} °</p>\n            <p><strong>temperature:</strong> ${a.main.temp}${this.tempUnits[this.selectUnit.value]}</p>\n            <p><strong>pressure:</strong> ${a.main.pressure} hPa</p>\n            <p><strong>humidity:</strong> ${a.main.humidity} %</p>\n            <p><strong>wind speed:</strong> ${a.wind.speed} km/h</p>`,this.divContent.style=`background-image: url("../images/${a.weather[0].icon}.jpg");`,this.nameCity.value="",this.selectUnit.value="metric",this.addLabelErrorColor(0),this.labelError.innerText="search successfully completed",t("result")})).catch((function(i){e.addLabelErrorColor(2),e.labelError.innerText=i,t("result")}))}))},addLabelErrorColor(t){for(let e=0;e<this.colorParams.length;e++)e===t?this.labelError.classList.add(this.colorParams[e]):this.labelError.classList.remove(this.colorParams[e])},loadDivShowResult(){this.divList.classList.add("col-6"),this.paragraph.classList.add("child-width"),this.divList.appendChild(this.paragraph)}}).loadPageContent()})();