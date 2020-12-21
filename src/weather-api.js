const weatherApi = () => ({
    divContent : document.getElementById("content"),
    getErrorMessage(response){
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.text();
    },
    getWeatherData(json){
        let jsonChars = json.split("");
                jsonChars = jsonChars.slice(5, jsonChars.length-1).join("");
                let data = JSON.parse(jsonChars);
                return data;
    },
    callWeatherApi(nameCity, selectUnit){
        return new Promise(resolve => {
            const that = this;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=${selectUnit}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`, {
            method: 'get',
            mode: 'cors'
          })
                .then(response => {
                    this.getErrorMessage(response);
                }
                    )
          .then(json => {  
                const data = getWeatherData(json)
                resolve({status: true, response: data});
            })
        .catch(function(err) {
            resolve({status: false, response: err});
          });
        });
      }
});
export default weatherApi;
