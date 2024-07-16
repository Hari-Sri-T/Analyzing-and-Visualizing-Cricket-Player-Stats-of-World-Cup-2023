/* -------------- STAGE 1 ------------ */

//------- 1.a Interaction Code ------ //
navigate('https://www.espncricinfo.com/records/tournament/team-match-results/icc-cricket-world-cup-2023-24-15338');


let links = parse().matchSummaryLinks;
for(let i of links) { 
  next_stage({url: i}) 
}

//------- 1.b Parser Code ------------//
let links = [];
const allRows = $('table.ds-table > tbody > tr');
allRows.each((index, element) => {
  const tds = $(element).find('td');
  const rowURL = $(tds[6]).find('a').attr('href');
  if (rowURL) {
    links.push("https://www.espncricinfo.com" + rowURL);
  }
});
return {
  'matchSummaryLinks': links
};

/* -------------- STAGE 2 ------------ */

//------- 2.a Interaction Code ------ //
navigate(input.url);
collect(parse());

//---------- 2.b Parser Code ---------//


var match = $('div').filter(function(){
	return $(this)
      .find('span > span > span').text() === String("Match Details") 
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text().replace(" Innings", "")
team2 = $(match.eq(1)).find('span > span > span').text().replace(" Innings", "")
matchInfo = team1 + ' Vs ' + team2

var tables = $('div > table.ds-table');
var firstInningRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
})

var secondInningsRows = $(tables.eq(3)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
});


var bowlingSummary = []
firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team2,
   		"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"overs": $(tds.eq(1)).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team1,
   		"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"overs": $(tds.eq(1)).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

return {"bowlingSummary": bowlingSummary}

