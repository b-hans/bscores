function openTrigger(e = null) {

    let sheet;
    let folder;
    let folderSheet;
    let errorCell;
    let formErrorCell;
    let subFolders;
    let scriptStatus;

    try {
        sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
        folderSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form');
        errorCell = sheet.getRange(ERROR_RANGE);
        formErrorCell = folderSheet.getRange(FORM_ERROR_RANGE);
    } catch (error) {
        console.log ("Error getting sheet: " + error);
        return;
    }

    try {
        scriptStatus = getStatus();
        if (!scriptStatus) {
            setStatus("free");
        }
    } catch (error) {
        errorCell.setValue(error);
        return false;
    }

    try {

        let params = {
            cell: errorCell,
            type: "error"
        }

        formatCell(params);
        params.cell = formErrorCell;
        formatCell(params);
        
        errorCell.setValue("Getting folder information");

    } catch (e) {
        errorCell.setValue( "Couldn't get folder information: " + e );
        return false;
    }

    
    try {

        folder = DriveApp.getFolderById(SCORES_FOLDER);
        subFolders = folder.getFolders();

        errorCell.setValue("Getting subfolders");

    } catch (e) {
        errorCell.setValue("Error: " + e);
    }


    try {
        let menuOptions = ['New folders'];

        while (subFolders.hasNext()) {
            let f = subFolders.next();
            menuOptions.push(f.getName());
        }

        const rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(menuOptions)
            .setAllowInvalid(true)
            .build();

        let menuRange = sheet.getRange("A1");
        menuRange.clearDataValidations();
        
        menuRange.setDataValidation(rule);

        menuRange.setValue('New folders');

        errorCell.setValue('');

    } catch (error) {
        errorCell.setValue(error);
    }

}