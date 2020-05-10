//read in spreadsheet
var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

//read in current sheet
var stimuliSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  

function Group(name, stimuliType, question1, question2, stimuli) {
  this.name = name;
  this.stimuliType = stimuliType;
  this.question1 = question1;
  this.question2 = question2;
  this.stimuli = stimuli;
}

function Stimuli(name) {
  this.name = name;
}

function get(col, row) {
  return stimuliSheet.getRange(col + String(row)).getValue();
}

function generateGroups() {
  //list of columns we are using
  var cols = ['C', 'D', 'E', 'F', 'H', 'I'];
  
  //list of objs to return
  var returnObjs = [];
  
  //generate list of objs
  for (let i = 0; i < 5; i++) {
    col = cols[i];
    for (let j = 1; j <= 7; j++) {
      currGroup = Group(
        name = get(col, 1),
        stimuliType = get(col, 2),
        question1 = get(col, 6),
        question2 = get(col, 7),
        stimuli = [
          Stimuli(name = get(col, 3)),
          Stimuli(name = get(col, 4)),
          Stimuli(name = get(col, 5)),
        ],
      )
    }
  }

  return (returnObjs)
}
