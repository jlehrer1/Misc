try {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var stimuliSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}
catch(err) {
  Logger.log('Error reading in spreadsheet. Error message is: ' + err.message)
}

try {
  imgsFolder = DriveApp.getFolderById('1JnjAuPrx8DyjGMGg2bKup3J5tNYaJVhc');
  vidFolder = DriveApp.getFolderById('1hM68Fq6dcnP3J9FqNrJ9kd40wXzSIYPl');
  audFolder = DriveApp.getFolderById('1hjZWpA-uuvLzUww832jxhxvzLCLFCAM9');
}
catch(err) {
  Logger.log('Error reading in folders by ID. Check that your URL is correct. Error message is: ' + err.message);
}

function Group(name, stimuliType, question1, question2, stimuli) {
  this.name = name;
  this.stimuliType = stimuliType;
  this.question1 = question1;
  this.question2 = question2;
  this.stimuli = stimuli;
}

function Stimuli(name, stimuli) {
  this.name = name;
  this.stimuli = stimuli;
}

function get(col, row) {
  return stimuliSheet.getRange(col + String(row)).getValue();
}

function getFolderName(group) {
  name = group.stimuliType;
  if (name == 'Fine Art' || name == 'Photo') {
    return 'Image';
  }
  if (name == 'EphFilm' || name == 'Cartoon') {
    return 'Video';
  }
  if (name == 'Poetry' || name == 'Music') {
    return 'Audio';
  }
  return 'error in getFolderName(group)';
}

function generateGroups() {
  //list of columns we are using
  var cols = ['C', 'D', 'E', 'F', 'H', 'I'];
  
  //list of objs to return
  var returnObjs = [];
  
  //generate list of objs
  for (let i = 0; i < 5; i++) {
    var col = cols[i];
    var currGroup = new Group(
        name = get(col, 1),
        stimuliType = get(col, 2),
        question1 = get(col, 6),
        question2 = get(col, 7),
        stimuli = [
          new Stimuli(name = get(col, 3)),
          new Stimuli(name = get(col, 4)),
          new Stimuli(name = get(col, 5)),
        ],
     )
    returnObjs.push(currGroup)
  }
  
  Logger.log(returnObjs)
  return (returnObjs)
}
