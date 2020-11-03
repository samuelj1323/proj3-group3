const apiFunction = "SMA";																			//API header definitions
var apiSymbol = "IBM";																				//stock to be searched (Search Endpoint API for auto filling search bar)
var apiInterval = "1min";																			//can output moving average stock prices over 1min, 5min, 15min, 30min, 60min, daily, weekly, or monthly
var apiPeriod = "2";																				//determines smoothness of averaged data points (10 seems best for maintaining data)
const apiSeries = "close";
const apiKey = "552GD1P4O4KX3SNJ";
var timeScale = "day";																				//shows data points for one day only, sets apiPeriod to 2 due to small dataset

const stk = new XMLHttpRequest();
const spt = new XMLHttpRequest();

stk.addEventListener("readystatechange", function () 												
{
	if (this.readyState == 4 && this.status == 200) 
	{
		var data = JSON.stringify(this.responseText);												//turn data into a string to parse
		var index = data.indexOf("SMA");
		index = data.indexOf("SMA", index + 3);														//burn first two apperances of SMA
		index = data.indexOf("SMA", index + 3);
		var times = [];																				//array storing date/time data 
		var SMAs = [];																				//array storing simple moving average
		var buf = true;
		while (index != -1)																			//read each instance of SMA for date and stock price
		{
			if (apiInterval != "daily" && apiInterval != "weekly" && apiInterval != "monthly")		//seperate date/time format from date
			{
				if (timeScale != "day" || times.length == 0)										//seperate single day
				{
					SMAs.push(data.substring(index + 9, index + 15));
					times.push(data.substring(index - 37, index - 21));
				}
				else if (parseInt(data.substring(index - 26, index - 24)) <= parseInt(times[times.length - 1].substring(11, 13)))
				{
					SMAs.push(data.substring(index + 9, index + 15));
					times.push(data.substring(index - 37, index - 21));
				}
				else
				{
					break;
				}
			}
			else
			{
				if (timeScale != "year" || times.length == 0)										//seperate single year
				{
					SMAs.push(data.substring(index + 9, index + 15));
					times.push(data.substring(index - 31, index - 21));
				}
				else if (buf || parseInt(data.substring(index - 26, index - 24)) != parseInt(times[0].substring(5, 7)))
				{
					if (parseInt(data.substring(index - 26, index - 24)) != parseInt(times[0].substring(5, 7)))
						buf = false;
					SMAs.push(data.substring(index + 9, index + 15));
					times.push(data.substring(index - 31, index - 21));
				}
				else
				{
					break;
				}
			}
			
			index = data.indexOf("SMA", index + 3);
		}
		if (times.length != SMAs.length)															//check data sizes align	
		{
			//error mismatch stock data length
		}
		else																						
		{
			times.reverse();																		//invert order of data
			SMAs.reverse();
			addData(times, SMAs, apiSymbol);														//update stock graph
		}
	}
});

spt.addEventListener("readystatechange", function () 
{
	if (this.readyState == 4 && this.status == 200) 
	{
		var data = JSON.parse(this.responseText);													//grab search endpoint data
		var symbols = [];																			//array of stock symbols
		var names = [];																				//array of stock names
		for (var i = 0; i < 5; i++)																	//grab first five results
		{
			symbols.push(data.bestMatches[i]["1. symbol"]);
			names.push(data.bestMatches[i]["2. name"]);
		}
		if (times.length != SMAs.length)															//check data sizes align	
		{
			//error mismatch symbol data length
		}
		else
		{
			//document.getElementById("Symbols").innerHTML = symbols.join(", ");					//return results to HTML
			//document.getElementById("Names").innerHTML = names.join(", ");	
		}
	}
});

function updateStock(apiSymbol_, timeScale_)														//update stock arrays on new searchbar input
{
	apiSymbol = apiSymbol_;
	timeScale = timeScale_;
	if (timeScale == "day")																			//set parameters for timescales
	{
		apiInterval = "1min";
		apiPeriod = "2";
	}
	else if (timeScale == "week")
	{
		apiInterval = "1min";
		apiPeriod = "15";
	}
	else if (timeScale == "month")
	{
		apiInterval = "5min";
		apiPeriod = "10";
	}
	else if (timeScale == "year")
	{
		apiInterval = "daily";
		apiPeriod = "2";
	}
	else if (timeScale == "decade")
	{
		apiInterval = "daily";
		apiPeriod = "15";
	}
	else
	{
		//error unrecognized updateStock input
	}	
	var apiURL = "https://www.alphavantage.co/query?function=" + apiFunction + "&symbol=" + apiSymbol + "&interval=" + apiInterval + "&time_period=" + apiPeriod + "&series_type=" + apiSeries + "&apikey=" + apiKey;
	stk.open("GET", apiURL, true);
	stk.send();
}

function searchFill(searchstr)																		//update search suggestion on searchbar input
{
	var apiURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchstr + "&apikey=" + apiKey;
	spt.open("GET", apiURL, true);
	spt.send();
}

updateStock("IBM", "day");																			//initialize demo single day IBM stock graph	

