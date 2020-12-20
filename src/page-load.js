const pageLoad = () => ({
    divContent : document.getElementById("content"),
    hTitle : document.createElement("h2"),
    pExplain : document.createElement("p"),
    divLeft : document.createElement("div"),
    divCenter : document.createElement("div"),
    divRight : document.createElement("div"),
    divList : document.createElement("div"),
    divSearch : document.createElement("div"),
    paragraph : document.createElement("p"),
    headAdd : document.createElement("h3"),
    labelCity: document.createElement("label"),
    nameCity : document.createElement("input"),
    labelUnits: document.createElement("label"),
    selectUnit : document.createElement("select"),
    labelError : document.createElement("label"),
    tempUnits: {'metric': '°C', 'imperial': '°F', 'standard': '°K'},
    colorParams: ['text-success', 'text-warning', 'text-danger'],
    buttonSearch : document.createElement("button"),
  async loadPageContent() {
    const that = this;
    this.divContent.classList.add("col-12");
    this.divContent.classList.add("row");
    this.hTitle.classList.add("col-12");
    this.hTitle.classList.add("text-center");
    this.hTitle.innerText="WEATHER CONDITION";
    this.pExplain.classList.add("col-12");
    this.pExplain.classList.add("text-center");
    this.pExplain.innerText="Complete the form, search a city by name and choose a temperature unit to get updated information.";
    this.divLeft.classList.add("col-2");
    this.divCenter.classList.add("col-8");
    this.divCenter.classList.add("row");
    this.divCenter.classList.add("black-background");
    this.divRight.classList.add("col-2");
    this.divCenter.appendChild(this.hTitle);
    this.divCenter.appendChild(this.pExplain);
    this.divCenter.appendChild(this.divSearch);
    this.divCenter.appendChild(this.divList);
    this.divContent.appendChild(this.divLeft);
    this.divContent.appendChild(this.divCenter);
    this.divContent.appendChild(this.divRight);
    this.loadDivShowResult();
    this.loadDivSearchCity();
    this.buttonSearch.onclick=function(){that.getWeather()};
    this.nameCity.value="Miami";
    this.selectUnit.value="metric";
    await this.getWeather();
    this.labelError.innerText="";
  },
  loadDivSearchCity() {
    this.divSearch.classList.add("child-width");
    this.divSearch.classList.add("col-6");
    this.nameCity.type="text";
    this.headAdd.innerText="Search city";
    this.nameCity.placeholder="City name";
    this.buttonSearch.innerText="Search";
    this.labelCity.innerText="City name:"; 
    this.labelUnits.innerText="Temperature units:"; 
    this.divSearch.appendChild(this.headAdd);
    this.divSearch.appendChild(this.labelCity);
    this.divSearch.appendChild(this.nameCity);
    this.divSearch.appendChild(this.labelUnits);
    this.loadSelectUnit();
    this.divSearch.appendChild(this.buttonSearch);
    this.divSearch.appendChild(this.labelError);
  },
  loadSelectUnit() {
    const that = this;
    const vals=['metric','imperial','standard'];
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach((prior, index) => {
      const opt = document.createElement('option');
      opt.value = vals[index];
      opt.innerHTML = prior;
      that.selectUnit.appendChild(opt);
    });
    this.divSearch.appendChild(this.selectUnit);
  },
  async getWeather() {
      if(this.nameCity.value===""){
          this.addLabelErrorColor(1);
          this.labelError.innerText="City name field cannot be blank";
          return;
      }
      this.labelError.innerText="";
      await this.getWeatherData();
      console.log("hello world");
  },
  getWeatherData(){
    return new Promise(resolve => {
        const that = this;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameCity.value}&units=${this.selectUnit.value}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`, {
        method: 'get',
        mode: 'cors'
      })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.text();
            }
                )
      .then(json => {  
            let jsonChars = json.split("");
            jsonChars = jsonChars.slice(5, jsonChars.length-1).join("");
            let data = JSON.parse(jsonChars);
            console.log(data);
            this.paragraph.innerHTML=`<h3>${this.nameCity.value} weather condition</h3>
            <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="100" height="100" />
            <label>${data.weather[0].description}</label>
            </p>
            <p><strong>country code:</strong> ${data.sys.country}</p>
            <p><strong>longitude:</strong> ${data.coord.lon} °</p>
            <p><strong>latitude:</strong> ${data.coord.lat} °</p>
            <p><strong>temperature:</strong> ${data.main.temp}${this.tempUnits[this.selectUnit.value]}</p>
            <p><strong>pressure:</strong> ${data.main.pressure} hPa</p>
            <p><strong>humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>wind speed:</strong> ${data.wind.speed} km/h</p>`;
            this.divContent.style=`background-image: url("../images/${data.weather[0].icon}.jpg");`;
            this.nameCity.value="";
            this.selectUnit.value="metric";
            this.addLabelErrorColor(0);
            this.labelError.innerText="search successfully completed";
            resolve("result");
        })
    .catch(function(err) {
        that.addLabelErrorColor(2);
        that.labelError.innerText=err;
        resolve("result");
      });
    });
  }
  ,
  addLabelErrorColor(index){
      for(let i=0; i<this.colorParams.length; i++){
          if(i===index) this.labelError.classList.add(this.colorParams[i]);
          else this.labelError.classList.remove(this.colorParams[i]);
      }
  },
  loadDivShowResult() {
    this.divList.classList.add("col-6");
    this.paragraph.classList.add("child-width");
    this.divList.appendChild(this.paragraph);
  }
});
export default pageLoad;
