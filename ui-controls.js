data_g = {
    labels: ['8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.'],
    datasets: [{
        label: 'Price ($)',
        data: [12, 19, 3, 5, 2, 15]
    }]
}

options_g = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
}

twts = [""];//['This stock ruined my life! Don\'t buy!!!!!', 'Best Stock ever!', 'Anyone know if this stock is good???', 'it\'s climbing slowly', 'I just made a million bucks by shorting this stock', 'Good company, I like their ____', 'covfefe']

var myLineChart = null

function addTweets(arr){
    arr.forEach(function(e){
        var qt = document.createElement("blockquote"); 
        qt.innerHTML = e;
        document.getElementById("tweets").appendChild(qt);
    });
}

function addData(label, data, name) {
    	if(myLineChart !== null){
		myLineChart.destroy();
	}
	data_g.datasets[0].label = 'Price($) '+name;
	data_g.datasets[0].data = data;
    data_g.labels = label;
    myLineChart = new Chart($('#stockChart'), {
        type: 'line',
        data: data_g,
        options: options_g
    });
//     chart = myLineChart;
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
}

function addSentiment(arr, twtarr, avgarr) {
	
	
	
	var i = 0;
	var positive = 0;
	var negative = 0;
	var neutral = 0;
	var arrlengthstring = arr.length.toString();
	var cntnt = document.getElementById("sentiments");
	
	while (cntnt.childNodes.length > 2) {
		cntnt.removeChild(cntnt.lastChild);
	}
  
	arr.forEach(function(e){
		if (i == 0 && arr.length > 10) {
			var qt2 = document.createElement("blockquote"); 
			qt2.innerHTML = "Showing analysis of 10 tweets out of ".bold() + arrlengthstring.bold() + " total tweets".bold();
			document.getElementById("sentiments").appendChild(qt2);
		} else if (i == 0) {
			var qt2 = document.createElement("blockquote"); 
			qt2.innerHTML = "Showing analysis of all ".bold() + arrlengthstring.bold() + " tweets".bold();
			document.getElementById("sentiments").appendChild(qt2);
		}
		if (i < 10) {
			var qt = document.createElement("blockquote"); 
			qt.innerHTML = twtarr[i].italics() + ": " + e.bold();
			document.getElementById("sentiments").appendChild(qt);
		}
		if (e == "positive") {
			positive += 1;
		} else if (e == "negative") {
			negative += 1;
		} else {
			neutral += 1;
		}
		i++;
    });
	var prevalent;
	if (positive > negative && positive > neutral) {
		prevalent = "Positive";
	} else if (negative > positive && negative > neutral) {
		prevalent = "Negative";
	} else if (neutral > positive && neutral > negative) {
		prevalent = "Neutral";
	} else if (neutral == positive && neutral > negative) {
		prevalent = "Positive and Neutral";
	} else if (neutral > positive && neutral == negative) {
		prevalent = "Negative and Neutral";
	} else if (negative == positive && neutral < negative) {
		prevalent = "Divided (Positive and Negative)";
	} else {
		prevalent = "No prevalent sentiment";
	}
	
	var qt = document.createElement("blockquote");
	qt.innerHTML = "Prevalent Sentiment: ".bold() + prevalent.bold() + " (Based on amount of sentiment)".bold();
    document.getElementById("sentiments").appendChild(qt);
	
	var qt2 = document.createElement("blockquote");
	qt2.innerHTML = "Confidence Score Percentage (Average of confidence scores across all tweets): ".bold() + "Positive: ".bold() + avgarr[0].toFixed(2) + "% " + 
	"Neutral: ".bold() + avgarr[1].toFixed(2) + "% " + "Negative: ".bold() + avgarr[2].toFixed(2) + "%";
    document.getElementById("sentiments").appendChild(qt2);
	
	anychart.onDocumentReady(function() {

  
		//delete previous chart
		document.getElementById("sentimentPie").innerHTML = "";
		
		// set the data
		var data = [
		  {x: "Positive", value: positive, normal:  {
				fill: "#009933",       
			}
		  },
		  {x: "Negative", value: negative, normal:  {
				fill: "#990000",       
			}
		  },
		  {x: "Neutral", value: neutral, normal:  {
				fill: "#ffcc00",       
			}
		  },
		];

		// create the chart
		var sentimentChart = anychart.pie();
	 
		//chart.radius("100%");
		// set the chart title
		 sentimentChart.title("Sentiment Analysis (Amount of each sentiment)");

		 // add the data
		 sentimentChart.data(data);

		 // display the chart in the container
		 sentimentChart.container('sentimentPie');
		 
		 sentimentChart.draw();
			
		 

	});
    
}

$("#search").click(function(){

});

document.getElementById("search-btn").onclick = function(){
  mystr = document.getElementById("search").value; updateStock(mystr, "day"); /*twitter update goes here*/ updateSentiment(ar);

}


//init
$(document).ready(function(){
    $('.sidenav').sidenav();
//     myLineChart = new Chart($('#stockChart'), {
//         type: 'line',
//         data: data_g,
//         options: options_g
//     });
    addTweets(twts);

});

//loop

//end





