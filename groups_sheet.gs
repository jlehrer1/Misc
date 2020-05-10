// ID in a given Google link, like [https://drive.google.com/drive/u/0/folders/1eIF0kB5hj-wt79KQ4aQQ8jDOAXza5nXi] is given by the string after the last /. i.e. 
// '1eIF0kB5hj-wt79KQ4aQQ8jDOAXza5nXi'
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

function generateGroups() {
  //list of columns we are using
  var cols = ['C', 'D', 'E', 'F', 'H', 'I'];
  
  //list of objs to return
  var returnObjs = [];
  
  //generate list of objs
  for (let i = 0; i < cols.length; i++) {
    var col = cols[i];
    //generate group based on col[i] 
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
    
    // read in folder with stimuli files
    folderType = getFolderType(currGroup);
    folder = DriveApp.getFolderById(folderType[0]);
    
    //generate Object.Stimuli.stimuli with the files from the Drive folders. Returns as a FileIterator object.
    for (let j = 0; j < currGroup.stimuli.length; j++) {
      currGroup.stimuli[j].stimuli = folder.getFilesByName(currGroup.stimuli[j].name + folderType[1]);
    }
    
    returnObjs.push(currGroup)
  }
  
  return (returnObjs)
}
