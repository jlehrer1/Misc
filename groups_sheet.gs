var stimuli = {
  "name" : "",
};

var group = {
  "name" : "",
  "stimuli_type" : "",
  "question_1" : "",
  "question_2" : "",
  "stimuli" : [],
};

function generateGroups() {
  //read in spreadsheet
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  //read in current sheet
  var stimuliSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  //list of columns we are using
  var cols = ['C', 'D', 'E', 'F', 'H', 'I'];
  
  //list of objs to return
  var returnObjs = [];

  for (let i = 0; i < 5; i++) {
    col = cols[i];
    for (let j = 1; j <= 7; i++) {
      Logger.log(stimuliSheet.getRange(col + String(j)))
    }
  }
  
  return (returnObjs)
}

