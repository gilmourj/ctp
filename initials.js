function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('COVID Tracking')
        .addItem('DE Shift Attendance', 'initials')
        .addToUi();
}

function searchString(name){
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var initials = s.getSheetByName("Initials");
  var textFinder = initials.createTextFinder(name);
  try {
    var search_row = textFinder.findNext().getRow();
    var init = initials.getRange(search_row,2,1,1).getValue();
    return init;
  } catch (error) {
    return "";
  }
}

function initials() {
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var initials = s.getSheetByName("Initials");
  var schedule = s.getSheetByName("Schedule ");
  var dates = schedule.getRange("1:1").getValues();
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
  var shift = "";
  if(Array.isArray(checkers[0]) && checkers[0].length && checkers[0][0]){
    shift = shift.concat("DCs:\n", searchString(checkers[0][0]), " - ", checkers[0][0], " SL1");
  }
  if(Array.isArray(checkers[1]) && checkers[1].length && checkers[1][0]){
    shift = shift.concat("\n", searchString(checkers[1][0]), " - ", checkers[1][0], " SL2");
  }
  if(Array.isArray(checkers[2]) && checkers[2].length && checkers[2][0]){
    shift = shift.concat("\n", searchString(checkers[2][0]), " - ", checkers[2][0], " :m:");
  }
  for (var i = 3; i < 6; i++){
    if(!(Array.isArray(checkers[i]) && checkers[i].length && checkers[i][0])){
      continue;
    }
    shift = shift.concat("\n", searchString(checkers[i][0]), " - ", checkers[i][0]);
  }
  for (var i = 14; i < 16; i++){
    if(!(Array.isArray(checkers[i]) && checkers[i].length && checkers[i][0])){
      continue;
    }
    shift = shift.concat("\n", searchString(checkers[i][0]), " - ", checkers[i][0], " :ctp-ghost:");
  }
  shift = shift.concat("\n\nCheckers:");
  for (var i = 6; i < 14; i++){
    if(!(Array.isArray(checkers[i]) && checkers[i].length && checkers[i][0])){
      continue;
    }
    shift = shift.concat("\n", searchString(checkers[i][0]), " - ", checkers[i][0]);
  }
  var ui = SpreadsheetApp.getUi();
  ui.alert("Shift Attendance", shift, ui.ButtonSet.OK);
  }
