function attachEvents() {
    document.getElementById('submit').addEventListener('click', loadWeather);
}

attachEvents();

const symbols = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂',
    'Degrees': '°'
};

async function loadWeather() {
    const locationInput = document.getElementById('location');
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    currentDiv.innerHTML = '<div class="label">Current conditions</div>';
    upcomingDiv.innerHTML = '<div class="label">Three-day forecast</div>';
    forecastDiv.style.display = 'none';

    try {
        const locationName = locationInput.value;
        const code = await getCodeByLocation(locationName);

        const [today, upcoming] = await Promise.all([
            getWeatherToday(code),
            getWeatherUpcoming(code)
        ]);

        displayToday(today);
        displayUpcoming(upcoming);

        forecastDiv.style.display = 'block';
    } catch (error) {
        forecastDiv.style.display = 'block';
        forecastDiv.innerHTML = '<div class="label">Error</div>';
        console.error(error);
    }
}

async function getCodeByLocation(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch locations');
    const locations = await res.json();

    const location = locations.find(loc => loc.name.toLowerCase() === name.toLowerCase());
    if (!location) throw new Error('Location not found');
    return location.code;
}

async function getWeatherToday(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch today’s weather');
    return await res.json();
}

async function getWeatherUpcoming(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch upcoming weather');
    return await res.json();
}

function displayToday(data) {
    const currentDiv = document.getElementById('current');

    const forecast = data.forecast;
    const condition = forecast.condition;

    const container = document.createElement('div');
    container.className = 'forecasts';

    const symbolSpan = document.createElement('span');
    symbolSpan.className = 'condition symbol';
    symbolSpan.textContent = symbols[condition];

    const infoSpan = document.createElement('span');
    infoSpan.className = 'condition';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'forecast-data';
    nameSpan.textContent = data.name;

    const tempSpan = document.createElement('span');
    tempSpan.className = 'forecast-data';
    tempSpan.textContent = `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`;

    const conditionSpan = document.createElement('span');
    conditionSpan.className = 'forecast-data';
    conditionSpan.textContent = condition;

    infoSpan.append(nameSpan, tempSpan, conditionSpan);
    container.append(symbolSpan, infoSpan);
    currentDiv.appendChild(container);
}

function displayUpcoming(data) {
    const upcomingDiv = document.getElementById('upcoming');

    const container = document.createElement('div');
    container.className = 'forecast-info';

    data.forecast.forEach(day => {
        const daySpan = document.createElement('span');
        daySpan.className = 'upcoming';

        const symbol = document.createElement('span');
        symbol.className = 'symbol';
        symbol.textContent = symbols[day.condition];

        const temp = document.createElement('span');
        temp.className = 'forecast-data';
        temp.textContent = `${day.low}${symbols.Degrees}/${day.high}${symbols.Degrees}`;

        const cond = document.createElement('span');
        cond.className = 'forecast-data';
        cond.textContent = day.condition;

        daySpan.append(symbol, temp, cond);
        container.appendChild(daySpan);
    });

    upcomingDiv.appendChild(container);
}