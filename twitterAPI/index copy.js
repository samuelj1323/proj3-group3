var Twit = require('twit');
//const fs = require('fs');
//const { parse } = require('path');
import addTweets from '../ui-controls.js';
var T = new Twit({
    consumer_key: '5NeqaXTy24VYJ3ycE3oysxpKb',
    consumer_secret:'ENrtGzKKduGw44qeLmQB74dPBGA6GKcHBKRguAxjqfbP57QwlM',
    access_token:'1316458029378871297-2ucvnUCNBKIkof40KjOyaDndj1XO2u',
    access_token_secret:'D8kT9aNvIIFSyZ5weZ8WMkSznAC02OizIAd0ObxBJ2qBT',
});
function display(array1){
    console.log("here");
    console.log(array[0]);
    
}
var query = "game of thrones since:2020-01-01";
T.get('search/tweets', {q: query, count: 50,lang:'en'},function(err, data, response){
    //creates array
    var jsonArray = [];
    //iterates through and adds the values we want from the twitter data.
    for(var i =0; i < data.statuses.length; i++){
        jsonArray.push(data.statuses[i].text+"\n");
    }
    addTweets(jsonArray);
    //makes a string of the array
    
    //writes the string to the text file
    
    //const jsonString = JSON.stringify(jsonArray);
    
    //console.log(jsonArray.length);
  
  //  fs.writeFile('Output.json', jsonString, err=>{
   //     if(err){
    //        console.log('error writing file: ', err)
     //   }else{
      //      console.log('success wrote')
        }
    })
})
