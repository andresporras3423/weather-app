const weatherApi = () => ({
  callWeatherApi(nameCity, selectUnit) {
    return new Promise(resolve => {
      fetch(`${window.location.protocol === 'http:' ? 'http' : 'https'}://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=${selectUnit}&callback=test&appid=a71219e79a6b01978ac3a9f3ffccca37`, {
        method: 'get',
        mode: 'cors',
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(json => {
          let jsonChars = json.split('');
          jsonChars = jsonChars.slice(5, jsonChars.length - 1).join('');
          const data = JSON.parse(jsonChars);
          resolve({ status: true, response: data });
        })
        .catch((err) => {
          resolve({ status: false, response: err });
        });
    });
  },
});
export default weatherApi;
