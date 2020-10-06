/*
* ******************************************************************************
! API
* ******************************************************************************
*/

let currency = 'USD';
let apiTargetSymbols = '&symbols=BTC,ETH';

// let monthNow = 10;
// let yearNow = 2020;

const baseURL = 'https://api.coinlayer.com/api/';
let access_key = '?access_key=5a2fc43817e753f3a0c608b7298f32d1'
let apiEndPointList = 'list';
let apiEndPointLive = 'live';
// let apiEndPointHist = yearNow + '-' + monthNow + '-01';
let apiTargetCurrency = '&target=' + currency;

function fetchLive() {
    url = baseURL + apiEndPointLive + access_key + apiTargetCurrency;
    
    fetch(url)
    .then(data => {
        // console.log(data);
        return data.json()
    })
    .then(json => {
        // console.log(json);
        // console.log('Live:');
        // console.log(json.rates);
        displayCharts(json);
    })
    
}

function fetchList() {
    url = baseURL + apiEndPointList + access_key + apiTargetCurrency;
    
    fetch(url)
    .then(data => {
        // console.log(data);
        return data.json()
    })
    .then(json => {
        // console.log(json);
        // console.log('List:');
        // console.log(json.crypto.BTC);
        // console.log(json.crypto.ETH);
        // console.log(json.crypto.MKR);
        // console.log(json.crypto.BCH);
        displayCryptoInfo(json);
    })
    
}

// function fetchHist() {
//     url = baseURL + apiEndPointHist + access_key + apiTargetCurrency;
    
//     fetch(url)
//     .then(data => {
//         // console.log(data);
//         return data.json()
//     })
//     .then(json => {
//         // console.log(json);
//         console.log('Hist:');
//         console.log(json.rates);
//     })
    
// }

fetchLive();
fetchList();
// fetchHist();

/*
* ******************************************************************************
! /API
* ******************************************************************************
*/

/*
* ******************************************************************************
! SCRIPT
* ******************************************************************************
*/

let btcInfo = document.querySelector('.r2c1');
let btcIco = document.createElement('img');
let ethInfo = document.querySelector('.r2c2');
let ethIco = document.createElement('img');
let mkrInfo = document.querySelector('.r2c3');
let mkrIco = document.createElement('img');
let bchInfo = document.querySelector('.r2c4');
let bchIco = document.createElement('img');

function displayCryptoInfo(json){
    btcInfo.innerHTML += json.crypto.BTC.name_full;
    btcInfo.innerHTML += '<br>' + json.crypto.BTC.symbol + '<br><br>';
    btcIco.className = 'btcIco';
    btcIco.style = 'width: 30%';
    btcIco.src = json.crypto.BTC.icon_url;
    btcInfo.appendChild(btcIco);

    ethInfo.innerHTML += json.crypto.ETH.name_full;
    ethInfo.innerHTML += '<br>' + json.crypto.ETH.symbol + '<br><br>';
    ethIco.className = 'ethIco';
    ethIco.style = 'width: 30%';
    ethIco.src = json.crypto.ETH.icon_url;
    ethInfo.appendChild(ethIco);

    mkrInfo.innerHTML += json.crypto.MKR.name_full;
    mkrInfo.innerHTML += '<br>' + json.crypto.MKR.symbol + '<br><br>';
    mkrIco.className = 'mkrIco';
    mkrIco.style = 'width: 30%';
    mkrIco.src = json.crypto.MKR.icon_url;
    mkrInfo.appendChild(mkrIco);

    bchInfo.innerHTML += 'Bitcoin Cash (BCH)';
    bchInfo.innerHTML += '<br>' + json.crypto.BCH.symbol + '<br><br>';
    bchIco.className = 'bchIco';
    bchIco.style = 'width: 30%';
    bchIco.src = json.crypto.BCH.icon_url;
    bchInfo.appendChild(bchIco);
}

/*
* ******************************************************************************
! /SCRIPT
* ******************************************************************************
*/

/*
* ******************************************************************************
! CHARTS SCRIPT
* ******************************************************************************
*/

function displayCharts(json){

    btcInfo.innerHTML= 'Current Value: $' + json.rates.BTC + '<br><br>';
    ethInfo.innerHTML= 'Current Value: $' + json.rates.ETH + '<br><br>';
    mkrInfo.innerHTML= 'Current Value: $' + json.rates.MKR + '<br><br>';
    bchInfo.innerHTML= 'Current Value: $' + json.rates.BCH + '<br><br>';

    let btcValue = json.rates.BTC;
    let bchValue = json.rates.BCH;
    let ethValue = json.rates.ETH;
    let mkrValue = json.rates.MKR;

    var ctx = document.getElementById('rateHist').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020'],
            datasets: [{
                label: 'BTC value',
                borderColor: 'rgb(255, 99, 132)',
                data: [7174.74, 9363.19, 8548.95, 6537.34, 8853.77, 10268.58, 9236.32, 11766.75, 11964.21, 10626.60]
            }]
        },

        // Configuration options go here
        options: {
            lineTension: 0
        }
    });

    var ctx = document.getElementById('rateCurrent');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['BTC', 'ETH', 'MKR', 'BCH'],
            datasets: [{
                label: 'Rates',
                data: [btcValue, ethValue, mkrValue, bchValue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

/*
* ******************************************************************************
! /CHARTS SCRIPT
* ******************************************************************************
*/