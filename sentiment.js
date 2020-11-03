var unirest = require("unirest");

var req = unirest("POST", "https://rapidapi.p.rapidapi.com/sentiment");

req.headers({
	"content-type": "application/json",
	"x-rapidapi-host": "microsoft-text-analytics1.p.rapidapi.com",
	"x-rapidapi-key": "191ead3c15msh823099d2d53b980p1910cejsnbfe892a19103",
	"useQueryString": true
});

req.type("json");
// req.send({
// 	"documents": [
// 		{
// 			"id": "1",
// 			"language": "en",
// 			"text": "Hello world. This is some input text that I don't really like."
// 		},
// 		{
// 			"id": "2",
// 			"language": "en",
// 			"text": "It's incredibly sunny outside! I'm ok."
// 		},
// 		{
// 			"id": "3",
// 			"language": "en",
// 			"text": "Pike place market is my all-time favorite Seattle attraction."
// 		}
// 	]
// });
var testarr = ['Hello world. This is some input text that I don\'t really like.', 'It\'s incredibly sunny outside! I\'m ok.', 'Pike place market is my all-time favorite Seattle attraction.'];
for (var i =0; i < testarr.length; i++) {
	req.send({
			"documents": [
				{
					"id": i + 1,
					"language": "en",
		     		"text": testarr[i]
				}
			]
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);
	
		console.log(res.body.documents);
	});
}
	

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });