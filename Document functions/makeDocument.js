function makeDocument (title) {

    let folder;
    let folderName;
    let parentFolder;
    let formSheet;
    let formErrorCell;
    let score;
    let scoreUrl;

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
        
        scoreUrl = score.getUrl();
        
    }
    catch (error) {
        return {
            error: true,
            message: "Error creating doc: " + error
        }
    }

    // get the images
    try {

        let images = folder.searchFiles('mimeType = "' + MimeType.JPEG + '"');
        let jpgFiles = [];

        while (images.hasNext()) {
            var file = images.next();
            jpgFiles.push({
                name: file.getName(),
                id: file.getId(),
                url: file.getUrl()
            });
        }

        return {
            error: true,
            message: "number of images: " + jpgFiles.length
        }

    }
    catch (error) {
        return {
            error: true,
            message: "Error getting images: " + error
        }
    }

    return {
        error: false,
        message: "Good folder: " + folder.getName(),
        scoreUrl: scoreUrl
    };
    
    
}