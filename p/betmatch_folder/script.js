function getResults() {
  //read the form
  let team_a_odds = parseFloat(document.getElementById('team_a_odds').value);
  let team_b_odds = parseFloat(document.getElementById('team_b_odds').value);
  let team_a_bookmaker = document.getElementById('team_a_bookmaker').value;
  let team_b_bookmaker = document.getElementById('team_b_bookmaker').value;

  let min_betting_a = document.getElementById('team_a_min_betting').value
  let min_betting_b = document.getElementById('team_b_min_betting').value

  if(min_betting_a !== ''){min_betting_a = parseInt(min_betting_a);} else {min_betting_a = 1}
  if(min_betting_b !== ''){min_betting_b = parseInt(min_betting_b);} else {min_betting_b = 1}

  let max_betting = document.getElementById('max_betting').value;
  if (max_betting !== '') {
    max_betting = parseInt(max_betting)
  } else {
    max_betting = 100
  } //max betting defaults to 100

  let betting_type_options = document.getElementById('betting_type').getElementsByTagName('input');

  let betting_type = '';
  for (let i = 0; i < betting_type_options.length; i++) {
    if (betting_type_options[i].checked === true) {
      betting_type = betting_type_options[i].value
    }
  }

  // calculate bets

  if (betting_type === 'zero') {
    let bets = {"a": 0,"b": 0};

    // Search integer solutions starting via A
    if(bets.a == 0 || bets.b == 0){
      let s  = getSolutions(team_a_odds, team_b_odds, min_betting_a, min_betting_b, max_betting, true)
      bets.a = round2d(s[0]);
      bets.b = round2d(s[1]);
    }
    // Search integer solutions starting via B
    if(bets.a == 0 || bets.b == 0){
      let s = getSolutions(team_b_odds, team_a_odds, min_betting_b, min_betting_a, max_betting, true)
      bets.a = round2d(s[1]);
      bets.b = round2d(s[0]);
    }

    // If still no solutions, just use the first result via A
    if(bets.a == 0 || bets.b == 0){
      let s = getSolutions(team_a_odds, team_b_odds, min_betting_a, min_betting_b, max_betting, false)
      bets.a = round2d(s[0]);
      bets.b = round2d(s[1]);
    }

    // If still no solutions, just use the first result via B
    if(bets.a == 0 || bets.b == 0){
      let s = getSolutions(team_b_odds, team_a_odds, min_betting_b, min_betting_a, max_betting, false)
      bets.a = round2d(s[1]);
      bets.b = round2d(s[0]);
    }


    // Give the payout as info to the user
    let payout = {
      "a": round2d((team_a_odds) * bets.a),
      "b": round2d((team_b_odds) * bets.b)
    }

    // Your possible loss/gain is determined by the difference in payouts
    let loss_or_gain = round2d(Math.abs(payout.a - payout.b))

    // Get the DOM
    let result_div = document.getElementById('result_div');
    result_div.innerHTML = `<h2>Results</h2>
                          <br><p>Place a &euro; ${bets.a} bet on Team A winning  ${team_a_bookmaker ? ('with ' + team_a_bookmaker) : ''}
                          <br><span style="font-size:12px">Possible payout for A would be &euro; ${payout.a}</span>
                          <br><br>Place a &euro; ${bets.b} bet on Team B winning / Draw ${team_b_bookmaker ? ('with ' + team_b_bookmaker) : ''}
                          <br><span style="font-size:12px"> Possible payout for B would be &euro; ${payout.b}</span>
                          <br><br> In total, your possible loss/gain will be &euro; ${loss_or_gain}</p>`
  }
}




//Functions -------------------------------------------------------------------------

//Get solutions for our betting equation
function getSolutions(theseodds, otherodds, thisminbet, otherminbet, maxbet, int_pls){
  for (let thisbet = thisminbet; thisbet <= maxbet; thisbet++) {
    let otherbet = (theseodds / otherodds) * thisbet;
    if (otherbet >= otherminbet && otherbet <= maxbet ) {
      if(int_pls && !(Number.isInteger(otherbet))){
        continue;
      }else{
        return [thisbet, otherbet];
      }
    }
  }
  return [0,0];
}


//Simple round function
function round2d(x){
   return Math.round(x* 100) / 100
}
