function functionTrigger (e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
    const errorCell = sheet.getRange("C1");

    let folder;
    let action;

    try {

        action = sheet.getRange("B1");

        let folderValue = sheet.getRange("A1").getValue();
        let actionValue = action.getValue();

        if (actionValue == "Functions") {
            errorCell.setValue('');
            return;
        }

        if (actionValue == "Refresh") {
            errorCell.setValue("Refreshing folders");
            openTrigger (e);

            action.setValue("Functions");
            return;
        }

        if (actionValue == "Create document") {
            if (folderValue == "New folders") {
                errorCell.setValue("You haven't selected a document folder");
                action.setValue("Functions");
                return;
            }
            
            errorCell.setValue("Create document: " + folderValue);
        }

    } catch (error) {
        errorCell.setValue(error);
    }

}