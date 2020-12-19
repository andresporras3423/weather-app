const pageLoad = () => ({
    divContent : document.getElementById("content"),
    divList : document.createElement("div"),
    divSearch : document.createElement("div"),
    paragraph : document.createElement("p"),
    buttonUpdate : document.createElement("button"),
    headAdd : document.createElement("h3"),
    nameCity : document.createElement("input"),
    selectUnit : document.createElement("select"),
    //unitTemp : document.createElement("input"),
    buttonSearch : document.createElement("button"),
  loadPageContent() {
    const that = this;
    this.divContent.classList.add("col-12");
    this.divContent.classList.add("row");
    this.divContent.appendChild(this.divList);
    this.divContent.appendChild(this.divSearch);
    this.loadDivShowResult();
    this.loadDivSearchCity();
    this.buttonUpdate.onclick= function() {};
    this.buttonSearch.onclick=function(){that.getWeather()};
  },
  loadDivShowResult() {
    this.divList.classList.add("col-8");
    this.paragraph.classList.add("child-width");
    this.buttonUpdate.innerText="Update list";
    this.divList.appendChild(this.paragraph);
    this.divList.appendChild(this.buttonUpdate);
  },
  loadDivSearchCity() {
    this.divSearch.classList.add("child-width");
    this.divSearch.classList.add("col-4");
    this.nameCity.type="text";
    //this.unitTemp.type="text";
    this.headAdd.innerText="Search city";
    this.nameCity.placeholder="City name";
    //this.unitTemp.placeholder="unit temperature";
    this.buttonSearch.innerText="Search";
    this.divSearch.appendChild(this.headAdd);
    this.divSearch.appendChild(this.nameCity);
    //this.divSearch.appendChild(this.unitTemp);
    this.loadSelectUnit();
    this.divSearch.appendChild(this.buttonSearch);
  },
  loadSelectUnit() {
    const that = this;
    //this.labelPriority.innerText = 'Priority: ';
    let vals=['metric','imperial','standard'];
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach((prior, index) => {
      const opt = document.createElement('option');
      opt.value = vals[index];
      opt.innerHTML = prior;
      that.selectUnit.appendChild(opt);
    });
    //this.formTodo.appendChild(this.labelPriority);
    this.divSearch.appendChild(this.selectUnit);
  },
//   updateList() {
//     this.paragraph.innerHTML="";
//     fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/satVX3CEJZpfG8bj7ytu/scores/', {
//         method: 'get'
//       })
//       .then(response => response.text())
//       .then(json => {   
//         let scores = JSON.parse(json).result;
//         Object.values(scores).forEach((score, index)=>{
//           const label = document.createElement("label");
//           label.innerText=`${index+1}) user: ${score.user}, score: ${score.score}`;
//           this.paragraph.appendChild(label);
//         });
//       })
//     .catch(function(err) {
//       console.log(err);
//     });
//   },
  getWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.nameCity.value}&units=${this.selectUnit.value}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`, {
        method: 'get',
        mode: 'cors'
      })
            .then(response => response.text())
      .then(json => {   
        //let scores = JSON.parse(json).result;
        let jsonChars = json.split("");
        jsonChars = jsonChars.slice(5, jsonChars.length-1).join("");
        let data = JSON.parse(jsonChars);
        console.log(data);
        this.paragraph.innerText=`city: ${this.nameCity.value}
        longitude: ${data.coord.lon}
        latitude: ${data.coord.lat}
        temperature: ${data.main.temp}
        pressure: ${data.main.pressure}
        humidity: ${data.main.humidity}`;
        this.nameCity.value="";
        this.selectUnit.value="metric";
        // Object.values(scores).forEach((score, index)=>{
        //   const label = document.createElement("label");
        //   label.innerText=`${index+1}) user: ${score.user}, score: ${score.score}`;
        //   this.paragraph.appendChild(label);
        })
    //   .then(response => {                    
    //     console.log(response);
    //   })
    .catch(function(err) {
      console.log(err);
    });
  }
});
export default pageLoad;