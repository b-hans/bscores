function functionTrigger (e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
    const errorCell = sheet.getRange("C1");
    errorCell.setValue('');

    let folder;
    let action;

    try {

        action = sheet.getRange("B1");
        folder = sheet.getRange("A1");

        let folderValue = sheet.getRange("A1").getValue();
        let actionValue = action.getValue();

        if (actionValue == "Functions") {
            errorCell.setValue('');
            return;
        }

        if (actionValue == "Refresh") {

            if (getStatus() != "free") {
                errorCell.setValue ("Check status: " + getStatus());
                return false;
            }
            else {
                setStatus("refresh");
            } 


            try {
                errorCell.setValue("Refreshing folders");
                openTrigger (e);

                action.setValue("Functions");
                errorCell.setValue("Refresh complete");

                setStatus("free");
                return;
            } catch (error) {
                errorCell.setValue("Error refreshing: " + error);
                setStatus("free");
                return;
            }
        }

        if (actionValue == "Create document") {
            if (getStatus() != "free") {
                errorCell.setValue("Check current status: " + getStatus());               
                return false;
            }
            else if (folderValue == "New folders") {
                errorCell.setValue("You haven't selected a document folder");
                action.setValue("Functions");
                return;
            }

            action.setValue("Functions");
            // folder.setValue("New folders");

            setStatus("create");

            return createForm();
            
        }

    } catch (error) {
        errorCell.setValue(error);
    }

}