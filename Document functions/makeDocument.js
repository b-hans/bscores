function makeDocument (title) {

    let folder;
    let folderName;
    let parentFolder;
    let formSheet;
    let formErrorCell;
    let score;
    let scoreUrl;
    let jpgFiles;

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
        jpgFiles = [];

        while (images.hasNext()) {
            var file = images.next();
            jpgFiles.push({
                title: file.getName(),
                fileId: file.getId(),
                blob: file.getBlob(),
                file: file
            });
        }

        jpgFiles.sort ((a, b) => {
            const numA = parseInt(a.title.match(/\d+/)[0]); // Extract number from string a
            const numB = parseInt(b.title.match(/\d+/)[0]); // Extract number from string b

            // Compare the numerical parts
            if (numA !== numB) {
                return numA - numB;
            }

            // If numbers are equal, compare the full strings lexicographically
            return a.title.localeCompare(b.title);
        });

    }
    catch (error) {
        return {
            error: true,
            message: "Error getting images: " + error
        }
    }

    try {
        let body = score.getBody();
        body.clear();
        body.setAttributes(DOCUMENT_STYLE);

        let curParagraph = null;

        for (let i=0; i<jpgFiles.length; i++) {

            if (!curParagraph) {
                curParagraph = body.getParagraphs()[0];
            }
            else {
                curParagraph = body.appendParagraph('');
            }

            let myImage = jpgFiles[i];

            let inlineImage = curParagraph.appendInlineImage (myImage.blob);

            let blobWidth = inlineImage.getWidth() / 670;
            let blobHeight = inlineImage.getHeight() / 894;

            let newDiv;

            if (blobWidth > blobHeight) {
                newDiv = blobWidth;
            }
            else {
                newDiv = blobHeight;
            }

            let newWidth = inlineImage.getWidth() / newDiv;
            let newHeight = inlineImage.getHeight() / newDiv;

            inlineImage.setWidth(newWidth);
            inlineImage.setHeight(newHeight);

        }

        score.saveAndClose();
        folder.setTrashed(true);

    }
    catch (error) {
        return {
            error: true,
            message: "Error inserting images into doc: " + error
        }
    }

    return {
        error: false,
        message: "Num images: " + jpgFiles.length,
        scoreUrl: scoreUrl,
    };
    
    
}