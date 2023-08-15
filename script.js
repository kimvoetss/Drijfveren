const element = document.querySelector('.compoment-search'),
button = element.querySelector('.result-button'),
input = element.querySelector('.result-input'),
template = element.querySelector('.result-template').innerHTML,
resultcontainer = element.querySelector('.result-container');

button.addEventListener('click', () => {
    let location = input.value;
    fetchPosts(location).then( (json) => {
        console.log(json);
        renderResults(json);
    });
})


/*
http://api.weatherapi.com/v1/forecast.json?key=ba4a5bc4ca5141619a6130151231408&q='+ wewqe +'&days=3&aqi=no&alerts=no'*/

/* Fetch data from API */
async function fetchPosts(location) {
    try{
    const url = `http://api.weatherapi.com/v1/forecast.json?key=ba4a5bc4ca5141619a6130151231408&q=${location}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Failed to fetch: ${response.status}')
    }

    return await response.json();
} catch(e) {
console.log(e);
}
}

function renderResults(data){
    let html = template
        .replace('{{country}}',data.location.country)
        .replace('{{lat}}',data.location.lat)
        .replace('{{localtime}}',data.location.localtime)
        .replace('{{lon}}',data.location.lon)
        .replace('{{name}}',data.location.name)
        .replace('{{region}}',data.location.region)
        .replace('{{tz_id}}',data.location.tz_id);
    resultcontainer.innerHTML = html;
}
