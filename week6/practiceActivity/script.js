var apiKey = "fa7d80c48643dfadde2cced1b1be6ca1";

// document.addEventListener('DOMContentLoaded', bindButtons);

// function bindButtons(){
    document.getElementById("zipCodeSubmitId").addEventListener('click', function(event){
        // var req = new XMLHttpRequest();
        // var payload = {longUrl:null};
        // payload.longUrl = document.getElementById('longUrl').value;
        // req.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey, false);
        // req.setRequestHeader('Content-Type', 'application/json');
        // req.send(JSON.stringify(payload));
        // req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=32514&appid=" + apiKey, false);
        // var response = JSON.parse(req.responseText);
        // document.getElementById('cityId').textContent = response.name;
        // document.getElementById('tempuratureId').textContent = response.id;
        // document.getElementById('humidityId').textContent = response.id;
        // console.log(response.name);

        var req = new XMLHttpRequest();
        var locationZip = document.getElementById("zipCodeId").value;
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + locationZip + "&units=imperial&appid=" + apiKey, false);
        req.send(null);
        var response = JSON.parse(req.responseText);
        document.getElementById("cityId").textContent = response.name;
        document.getElementById("temperatureId").textContent = response.main.temp + " F";
        document.getElementById("humidityId").textContent = response.main.humidity + "%";
        event.preventDefault();
    })
// }