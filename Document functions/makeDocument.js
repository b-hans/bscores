function makeDocument (title) {

    let folder;
    let folderName;
    let parentFolder;
    let formSheet;
    let formErrorCell;
    let score;

    try {
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
        formErrorCell = formSheet.getRange(FORM_ERROR_RANGE);
        parentFolder = DriveApp.getFolderById(SCORES_FOLDER);
        folderName = getStatus('FOLDER_NAME');

        let fs = parentFolder.getFoldersByName(folderName);

        if (fs.hasNext()) {
            folder = fs.next();
        }
        else {
            return {
                error: true,
                message: "Problem with the folder named: " + folderName
            }
        }
    }
    catch (error) {
        console.log (error);
        return {
            error: true,
            message: "Check error logs"
        }
    }

    try {

        // check parent folder first
        let testFiles = parentFolder.getFilesByName(title);
        if (testFiles.hasNext()) {
            return {
                error: true,
                message: title + ": exists, choose a different name"
            }
        }
        score = DocumentApp.create(title);
        let scoreId = score.getId();
        let scoreFile = DriveApp.getFileById(scoreId);
        scoreFile.moveTo(parentFolder);
    }
    catch (error) {
        return {
            error: true,
            message: "Error creating doc: " + error
        }
    }

    return {
        error: false,
        message: "Good folder: " + folder.getName()
    };
    
    
}