let API_KEY = "VFWA8MULXMHCQ9XB";
let display = document.querySelector("#display");
let jsondata = "";
let keyword = "";
let dataval = "";
let value = "";
var i = 0;
function onChangeHandler(event) {
  let search = event.target.value;
  if (search == "") {
    alert("enter value");
  }
  else {

    let apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${API_KEY}`;

    async function getJson(url) {
      let response = await fetch(url);
      let data = await response.json()
      return data;
    }

    async function main() {
      getJson(apiUrl)
        .then(data => {
        });
      jsondata = await getJson(apiUrl)
      keyword = jsondata['bestMatches'][0]['1. symbol'];
    }
    main();
  }
}


// function submit1() {
//   var intvalue = document.getElementById('intra').value;
//   fetch(
//     `https://www.alphavantage.co/query?function=${intvalue}&symbol=${keyword}&interval=5min&apikey=${API_KEY}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       result = data;
//       console.log(result['Meta Data']);
//       let html = "";

//       html += `
//             <h5>${keyword}</h5>
//             <h4>123.04</h4>
//             <button id="btn" onclick="get_data()">Intraday</button>    
//             <i class="fa fa-close" style="font-size:40px"></i>
//   `;
//       display.innerHTML = html;
//     }
//     )
// };


var intervalType, key;
var i = 0;

function intraday() {
  //console.log(document.getElementById("interdayId").value);
  intervalType = document.getElementById("intra").value;
}

function weekly() {
  //console.log(document.getElementById("weeklyId").value);
  intervalType = document.getElementById("weekly").value;
}

function monthly() {
  //console.log(document.getElementById("monthlyId").value);
  intervalType = document.getElementById("monthly").value;
}

function daily() {
  //console.log(document.getElementById("dailyId").value);
  intervalType = document.getElementById("daily").value;
}


function getKey() {
  key = document.getElementById("search").value;
  if (keyword == "") {
    alert("KEY cannot be empty. Try searching 'IBM' or 'AMZN'!");
    return;
  }
  //console.log(key);
  setWatchist(keyword, intervalType);
}


function setWatchist(keyword, intervalType) {
  if (intervalType === undefined) {
    alert("Please select time interval [Intraday or Monthly...] ");
    return;
  }

  // Create and add a watchlist item of user choice
  
  const newDiv = document.createElement("div");
  const newelement = document.createElement("h2");
  newDiv.appendChild(newelement);
  const textnode = document.createTextNode(keyword + "<>");
  const textnode2 = document.createTextNode(intervalType + "<>");

  const textnode3 = document.createElement("button");
  textnode3.innerHTML = "REMOVE";
  newelement.appendChild(textnode);
  newDiv.setAttribute("id", i);
  textnode3.setAttribute("id", i++);
  newDiv.appendChild(textnode2);
  newDiv.appendChild(textnode3).classList.add("buttn");
    document.getElementById("DivLists").appendChild(newDiv).classList.add("items");



  //Remove watchlist items individually
  textnode3.addEventListener('click', function deleteDiv(e) {
    document.getElementById(e.target.id).style.display = "none";

  });
  newDiv.addEventListener("dblclick", function addModal(e) {
    
    var urlModifireStr = document.getElementById(e.target.id).textContent;
    var urlModifireArr = urlModifireStr.split("<>");
    var api_url = `https://www.alphavantage.co/query?function=TIME_SERIES_${intervalType}&symbol=${keyword}&interval=60min&outputsize=full&apikey=${API_KEY}`;

    console.log(api_url);
    getapi(api_url, urlModifireArr);

  })

}

// fetch Statistical values of each Company

// Defining async function
async function getapi(url, urlModifireArr) {
  var timeSeries;

  if (urlModifireArr[1] === "MONTHLY") {
    timeSeries = "Monthly Time Series";
  } else if (urlModifireArr[1] === "WEEKLY") {
    timeSeries = "Weekly Time Series";
  } else if (urlModifireArr[1] === "INTRADAY") {
    timeSeries = "Time Series (60min)";
  } else if (urlModifireArr[1] === "DAILY") {
    timeSeries = "";
  }


  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();

  var arrStats = [];
  var arrKeys = [];


  Object.values(data[timeSeries]).forEach(val => arrStats.push(val));
  //console.log(a);

  Object.entries(data[timeSeries]).forEach(([key, value]) => {
    arrKeys.push((`${key}`))
  });


  //Appending values to the table
  let tab =
    `<tr>
  <th scope="col">TIME FRAME</th>
    <th>OPEN</th>
    <th>HIGH</th>
    <th>LOW</th>
    <th>CLOSE</th>
    <th>VOLUME</th>
  </tr>`;


  for (var i = 0; i < arrStats.length; i++) {
    tab += `<tr>

  <td style="font-weight:bold;">${arrKeys[i]}</td>	    
  <td style="font-weight:bold;">${arrStats[i]["1. open"]} </td>
  <td style="font-weight:bold;">${arrStats[i]["2. high"]}</td>
  <td style="font-weight:bold;">${arrStats[i]["3. low"]}</td>
  <td style="font-weight:bold;">${arrStats[i]["4. close"]}</td>
  <td style="font-weight:bold;">${arrStats[i]["5. volume"]}</td>	
  </tr>`;
  }

  document.getElementById("modalValues").innerHTML = tab;

}
