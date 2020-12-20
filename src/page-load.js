const pageLoad = () => ({
    divContent : document.getElementById("content"),
    hTitle : document.createElement("h2"),
    pExplain : document.createElement("p"),
    divList : document.createElement("div"),
    divSearch : document.createElement("div"),
    paragraph : document.createElement("p"),
    headAdd : document.createElement("h3"),
    labelCity: document.createElement("label"),
    nameCity : document.createElement("input"),
    labelUnits: document.createElement("label"),
    selectUnit : document.createElement("select"),
    tempUnits: {'metric': '°C', 'imperial': '°F', 'standard': '°K'},
    buttonSearch : document.createElement("button"),
  loadPageContent() {
    const that = this;
    this.divContent.classList.add("col-12");
    this.divContent.classList.add("row");
    this.hTitle.classList.add("col-12");
    this.hTitle.classList.add("text-center");
    this.hTitle.innerText="WEATHER CONDITION";
    this.pExplain.classList.add("col-12");
    this.pExplain.classList.add("text-center");
    this.pExplain.innerText="Complete the form, search a city by name and choose a temperature unit to get updated information.";
    this.divContent.appendChild(this.hTitle);
    this.divContent.appendChild(this.pExplain);
    this.divContent.appendChild(this.divSearch);
    this.divContent.appendChild(this.divList);
    this.loadDivShowResult();
    this.loadDivSearchCity();
    this.buttonSearch.onclick=function(){that.getWeather()};
    this.nameCity.value="Miami";
    this.selectUnit.value="metric";
    this.getWeather();
  },
  loadDivSearchCity() {
    this.divSearch.classList.add("child-width");
    this.divSearch.classList.add("col-4");
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
  getWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameCity.value}&units=${this.selectUnit.value}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`, {
        method: 'get',
        mode: 'cors'
      })
            .then(response => response.text())
      .then(json => {   
        let jsonChars = json.split("");
        jsonChars = jsonChars.slice(5, jsonChars.length-1).join("");
        let data = JSON.parse(jsonChars);
        console.log(data);
        this.paragraph.innerHTML=`<h3>${this.nameCity.value} weather condition</h3>
        <p>country code: ${data.sys.country}</p>
        <p>longitude: ${data.coord.lon} °</p>
        <p>latitude: ${data.coord.lat} °</p>
        <p>temperature: ${data.main.temp}${this.tempUnits[this.selectUnit.value]}</p>
        <p>pressure: ${data.main.pressure} hPa</p>
        <p>humidity: ${data.main.humidity} %</p>
        <p>wind speed: ${data.wind.speed} km/h</p>`;
        this.nameCity.value="";
        this.selectUnit.value="metric";
        })
    .catch(function(err) {
      console.log(err);
    });
  },
  loadDivShowResult() {
    this.divList.classList.add("col-8");
    this.paragraph.classList.add("child-width");
    this.divList.appendChild(this.paragraph);
  }
});
export default pageLoad;