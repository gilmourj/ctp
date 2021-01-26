function initials() {
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var initials = s.getSheetByName("Initials");
  var schedule = s.getSheetByName("Schedule ");
  //var scheduleRange = schedule.getDataRange();
  var dates = schedule.getRange("1:1").getValues();
  //Logger.log(dates);
  var today = Utilities.formatDate(new Date(), "GMT-5", "M/d/yyyy")
  var t = new Date(today);
  var col;
  for (var i = 0; i < dates[0].length; i++) {  
    var d = new Date(dates[0][i].toString())
    if (d.toDateString() === t.toDateString()) {
      col = i+1; //as for loop is 0 indexed but columns start at 1
    }
  }
  checkers = schedule.getRange(20,col,16).getValues();
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var dcs, checks;
  Logger.log(checkers[0].length);
  var shift = "";
  for (var i = 0; i < checkers.length; i++){
    if(!checkers[i][0]){
      continue;
    }
    if(i == 0){
      shift = shift.concat("DCs:\n", checkers[i][0], " SL1");
    }
    else if(i == 1){
      shift = shift.concat("\n", checkers[i][0], " SL2");
    }
    else if(i == 2){
      shift = shift.concat("\n", checkers[i][0], " :m:");
    }
    else {
      shift = shift.concat("\n", checkers[i][0]);
    }
  }
  var result = ui.alert(
      shift);
  } 
