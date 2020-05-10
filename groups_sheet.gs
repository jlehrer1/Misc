let VID_FOLD_ID = '1hM68Fq6dcnP3J9FqNrJ9kd40wXzSIYPl';
let IMG_FOLD_ID = '1JnjAuPrx8DyjGMGg2bKup3J5tNYaJVhc';
let AUD_FOLD_ID = '1hjZWpA-uuvLzUww832jxhxvzLCLFCAM9';

try {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var stimuliSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}
catch(err) {
  Logger.log('Error reading in spreadsheet. Error message is: ' + err.message)
}

//try {
//  imgsFolder = DriveApp.getFolderById('1JnjAuPrx8DyjGMGg2bKup3J5tNYaJVhc');
//  vidFolder = DriveApp.getFolderById('1hM68Fq6dcnP3J9FqNrJ9kd40wXzSIYPl');
//  audFolder = DriveApp.getFolderById('1hjZWpA-uuvLzUww832jxhxvzLCLFCAM9');
//}
//catch(err) {
//  Logger.log('Error reading in folders by ID. Check that your URL is correct. Error message is: ' + err.message);
//}

//define Group object
function Group(name, stimuliType, question1, question2, stimuli) {
  this.name = name;
  this.stimuliType = stimuliType;
  this.question1 = question1;
  this.question2 = question2;
  this.stimuli = stimuli;
}

//define Stimuli object
function Stimuli(name, stimuli) {
  this.name = name;
  this.stimuli = stimuli;
}

// helper to get value at col, row from A1 notation, i.e. ('E4') --> value at column E, row 4
function get(col, row) {
  return stimuliSheet.getRange(col + String(row)).getValue();
}

// helper to return correct folder based on Object.Group.stimuliType
function getFolderType(group) {
  name = group.stimuliType;
  if (name == 'Fine Art' || name == 'Photo') {
    return [IMG_FOLD_ID, '.jpg'];
  }
  if (name == 'EphFilm' || name == 'Cartoon') {
    return [VID_FOLD_ID, '.mp4'];
  }
  if (name == 'Poetry' || name == 'Music') {
    return [AUD_FOLD_ID, '.mp3'];
  }
  return 'Name matching error in function getFolderName(group)';
}

function generateStimuli(currGroup) {
  
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
    folderType = getFolderType(currGroup);
    folder = DriveApp.getFolderById(folderType[0]);
    currGroup.stimuli[0].stimuli = folder.getFilesByName(currGroup.stimuli[0].name + folderType[1]);
    
    
    
    returnObjs.push(currGroup)
  }
  Logger.log(returnObjs)
  return (returnObjs)
}
