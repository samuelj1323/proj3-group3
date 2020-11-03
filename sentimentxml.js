/*var test = ["This stock ruined my life! Don\'t buy!!!!!", 
"Best Stock ever!", "Anyone know if this stock is good???", 
"it\'s climbing slowly", "I just made a million bucks by shorting this stock", 
"Good company, I like their ____", 
"covfefe"]; */ //for testing purposes, change later
var sentimentCounter = 0;
var aboveTen = false;
var sentimentTest = [];
var displayTweet = [];
var sentValues = [];
var confidenceScoreAvg = []; // [0] = positive, [1] = neutral, [2] = negative
var negAvg = 0;
var posAvg = 0;
var neuAvg = 0;
var isRunning = true;

const xhr2 = new XMLHttpRequest();
xhr2.withCredentials = true;

xhr2.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var res = JSON.parse(this.responseText);
		isRunning = true;
		if (aboveTen == false) {
			for (var i = 0; i < sentimentCounter; ++i) {			//push all sentiment values recieved
				sentValues.push(res.documents[i].sentiment);
				negAvg += res.documents[i].confidenceScores.negative;
				neuAvg += res.documents[i].confidenceScores.neutral;
				posAvg += res.documents[i].confidenceScores.positive;
			}
			isRunning = false;
			
		}
		if (aboveTen == true) {
			for (var i = 0; i < sentimentCounter; ++i) {			//push all sentiment values recieved
				sentValues.push(res.documents[i].sentiment);
				negAvg += res.documents[i].confidenceScores.negative;
				neuAvg += res.documents[i].confidenceScores.neutral;
				posAvg += res.documents[i].confidenceScores.positive;
			}
			
			updateSentiment(sentimentTest);
			
		}
		if (isRunning == false) {
			negAvg /= sentValues.length;
			posAvg /= sentValues.length;
			neuAvg /= sentValues.length;
			
			confidenceScoreAvg[0] = posAvg * 100; //convert to percentage
			confidenceScoreAvg[1] = neuAvg * 100;
			confidenceScoreAvg[2] = negAvg * 100;
			
			addSentiment(sentValues, displayTweet, confidenceScoreAvg);
			
			sentimentTest = [];
			sentimentCounter = 0;
			aboveTen = false;
			displayTweet = [];
			sentValues = [];
			confidenceScoreAvg = []; // [0] = positive, [1] = neutral, [2] = negative
			negAvg = 0;
			posAvg = 0;
			neuAvg = 0;
		}
	}
});

function updateSentiment(tweets) {
	sentimentCounter = 0;
	if (aboveTen == false) {
		for (var i = 0; i < tweets.length; ++i) {
			sentimentTest[i] = tweets[i];
			displayTweet[i] = tweets[i];
		}
	}
	
	var data = '{"documents": []}';   //create json array

	var obj = JSON.parse(data);   //parse into json obj
	
	var count = 0;
	for (var i = 0; i < sentimentTest.length; ++i) {     //add tweets into json obj
		if (i > 9) {
			aboveTen = true;
			sentimentTest.splice(0,10);
			break;     //limit max tweet to 10
		}
		obj['documents'].push({
			"id": i+1,
			"language": "en",
			"text": sentimentTest[i]
		});
		count++;
		sentimentCounter++;
		delete sentimentTest[i];
	}
	
	if (count < 10) {
		aboveTen = false;
	}
	
	
	
	data = JSON.stringify(obj);   //turn json obj into string so it can be sent
	
	xhr2.open("POST", "https://rapidapi.p.rapidapi.com/sentiment");
	xhr2.setRequestHeader("content-type", "application/json");
	xhr2.setRequestHeader("x-rapidapi-host", "microsoft-text-analytics1.p.rapidapi.com");
	xhr2.setRequestHeader("x-rapidapi-key", "191ead3c15msh823099d2d53b980p1910cejsnbfe892a19103");

	xhr2.send(data);
}

updateSentiment(ar); 