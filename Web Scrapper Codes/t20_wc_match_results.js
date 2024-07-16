/* -------------- STAGE 1 ------------ */

//------- 1.a Interaction Code ------ //

navigate('https://www.espncricinfo.com/records/tournament/team-match-results/icc-cricket-world-cup-2023-24-15338');

collect(parse());




//------- 1.b Parser Code ------------//
//Step1: create an array to store all the records
let matchSummary = []

//Step2: Selecting all rows we need from target table
const allRows = $('table.ds-table > tbody > tr');

//Step3: Looping through each rows and get the data from the cells(td)
 allRows.each((index, element) => {
 		const tds = $(element).find('td');   //find the td
		matchSummary.push({
              'team1':  $(tds[0]).text(),
              'team2':  $(tds[1]).text(),
              'winner':  $(tds[2]).text(),
              'margin':  $(tds[3]).text(),
              'ground': $(tds[4]).text(),
              'matchDate': $(tds[5]).text(),
              'scorecard':   $(tds[6]).text() 
		})   
 })


// step4: Finally returning the data
return {
  "matchSummary": matchSummary
};