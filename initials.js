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
  for (var i = 0; i < checkers.length; i++){
    if(!checkers[i][0]){
      continue;
    }
    if(i == 0){
      Logger.log("SL1");
    }
    else if(i == 1){
      Logger.log("SL2");
    }
    else if(i == 2){
      Logger.log("Mentor");
    }
    else {
      Logger.log("Checker");
    }
  }
  //var list = "DCs: \n" + checkers[0][0];
  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);
  }
