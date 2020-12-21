import weatherApi from './weather-api';

const pageLoad = () => ({
  weatherApi,
  divContent: document.getElementById('content'),
  hTitle: document.createElement('h2'),
  pExplain: document.createElement('p'),
  divLeft: document.createElement('div'),
  divCenter: document.createElement('div'),
  divRight: document.createElement('div'),
  divList: document.createElement('div'),
  divSearch: document.createElement('div'),
  paragraph: document.createElement('p'),
  headAdd: document.createElement('h3'),
  labelCity: document.createElement('label'),
  nameCity: document.createElement('input'),
  labelError: document.createElement('label'),
  colorParams: ['text-success', 'text-warning', 'text-danger'],
  buttonSearch: document.createElement('button'),
  async loadPageContent() {
    const that = this;
    this.divContent.classList.add('col-12');
    this.divContent.classList.add('row');
    this.divContent.classList.add('content');
    this.hTitle.classList.add('col-12');
    this.hTitle.classList.add('text-center');
    this.hTitle.innerText = 'WEATHER CONDITION';
    this.pExplain.classList.add('col-12');
    this.pExplain.classList.add('text-center');
    this.pExplain.innerText = 'Complete the form, search a city by name and choose a temperature unit to get updated information.';
    this.divLeft.classList.add('col-2');
    this.divCenter.classList.add('col-8');
    this.divCenter.classList.add('row');
    this.divCenter.classList.add('black-background');
    this.divRight.classList.add('col-2');
    this.divCenter.appendChild(this.hTitle);
    this.divCenter.appendChild(this.pExplain);
    this.divCenter.appendChild(this.divSearch);
    this.divCenter.appendChild(this.divList);
    this.divContent.appendChild(this.divLeft);
    this.divContent.appendChild(this.divCenter);
    this.divContent.appendChild(this.divRight);
    this.loadDivShowResult();
    this.loadDivSearchCity();
    this.buttonSearch.onclick = () => { that.getWeather(); };
    this.nameCity.value = 'Miami';
    await this.getWeather();
    this.labelError.innerText = '';
  },
  loadDivSearchCity() {
    this.divSearch.classList.add('child-width');
    this.divSearch.classList.add('col-6');
    this.nameCity.type = 'text';
    this.headAdd.innerText = 'Search city';
    this.nameCity.placeholder = 'City name';
    this.buttonSearch.innerText = 'Search';
    this.labelCity.innerText = 'City name:';
    this.divSearch.appendChild(this.headAdd);
    this.divSearch.appendChild(this.labelCity);
    this.divSearch.appendChild(this.nameCity);
    this.divSearch.appendChild(this.buttonSearch);
    this.divSearch.appendChild(this.labelError);
  },
  async getWeather() {
    if (this.nameCity.value === '') {
      this.addLabelErrorColor(1);
      this.labelError.innerText = 'City name field cannot be blank';
      return;
    }
    this.labelError.innerText = '';
    await this.getWeatherData();
  },
  async getWeatherData() {
    const that = this;
    const result = await this.weatherApi().callWeatherApi(this.nameCity.value);
    if (result.status) {
      const data = result.response;
      this.paragraph.innerHTML = `<h3>${this.nameCity.value} weather condition</h3>
            <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="100" height="100" />
            <label>${data.weather[0].description}</label>
            </p>
            <p><strong>country code:</strong> ${data.sys.country}</p>
            <p><strong>longitude:</strong> ${data.coord.lon} °</p>
            <p><strong>latitude:</strong> ${data.coord.lat} °</p>
            <p><strong>temperature:</strong> <span id="spanTemp">${(Number(data.main.temp) - 273.15).toFixed(2)}</span>
            <label class="switch">
  <input type="checkbox" id="toggleTemp" checked>
  <span class="slider round">
  <span>C°</span>
  <span>F°</span>
  </span>
  </label></p>
            <p><strong>pressure:</strong> ${data.main.pressure} hPa</p>
            <p><strong>humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>wind speed:</strong> ${data.wind.speed} km/h</p>`;
      document.getElementsByTagName('body')[0].style = `background-image: url("../images/${data.weather[0].icon}.jpg");`;
      document.getElementById('toggleTemp').onclick = (event) => { that.switchTempUnits(event); };
      this.nameCity.value = '';
      this.addLabelErrorColor(0);
      this.labelError.innerText = 'search successfully completed';
    } else {
      this.addLabelErrorColor(2);
      this.labelError.innerText = result.response;
    }
  },
  switchTempUnits(event) {
    const { checked } = document.getElementById(event.target.id);
    if (checked) {
      document.getElementById('spanTemp').innerText = ((Number(document.getElementById('spanTemp').innerText) - 32) * (5 / 9)).toFixed(2);
    } else {
      document.getElementById('spanTemp').innerText = ((Number(document.getElementById('spanTemp').innerText) * 1.8) + 32).toFixed(2);
    }
  },
  addLabelErrorColor(index) {
    for (let i = 0; i < this.colorParams.length; i += 1) {
      if (i === index) this.labelError.classList.add(this.colorParams[i]);
      else this.labelError.classList.remove(this.colorParams[i]);
    }
  },
  loadDivShowResult() {
    this.divList.classList.add('col-6');
    this.paragraph.classList.add('child-width');
    this.divList.appendChild(this.paragraph);
  },
});
export default pageLoad;
