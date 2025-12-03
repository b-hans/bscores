function functionTrigger (e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
    const form = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
    const formAction = form.getRange(FORM_ACTIONS_RANGE);
    const formActionValue = formAction.getValue();
    const formErrorCell = form.getRange(FORM_ERROR_RANGE);

    const errorCell = sheet.getRange("C1");
    errorCell.setValue('');

    let folder;
    let action;


    let cancelMessage = (
        "You are about to cancel create this document\n\n" +
        "Are you sure you want to do this?"
    );

    try {

        action = sheet.getRange("B1");
        folder = sheet.getRange("A1");

        let folderValue = sheet.getRange("A1").getValue();
        let actionValue = action.getValue();
        let response = form.getRange(RESPONSE_RANGE);
        let responseValue = response.getValue();

        if (actionValue == "Functions" && 
            formActionValue == "Actions" &&
            responseValue == "Select an option") {
            errorCell.setValue('');
            return;
        }
        else if (formActionValue == "Cancel" && responseValue == "Select an option") {
            formErrorCell.setValue(cancelMessage);
            formAction.setValue("Actions");
            form.showColumns(RESPONSE_COL);
            // clearStatus();
            return;
        }
        else if (responseValue == "No, return") {
            response.setValue ("Select an option");
            formErrorCell.setValue('');
            formAction.setValue("Actions");
            form.hideColumns(RESPONSE_COL);
        }
        else if (responseValue == "Yes, Do it!") {

            if (getStatus() == "create_enter") {
                return enterScore();
            }
            else {
                form.hideColumns(RESPONSE_COL);
                clearStatus();
                sheet.activate();
            }
        }

        if (actionValue == "Refresh") {

            if (getStatus() != "free") {
                errorCell.setValue ("Check status: " + getStatus());
                action.setValue("Functions");
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
                action.setValue("Functions");             
                return false;
            }
            else if (folderValue == "New folders") {
                errorCell.setValue("You haven't selected a document folder");
                action.setValue("Functions");
                return;
            }

            action.setValue("Functions");

            setStatus("create");

            return createForm();
            
        }

        if (formActionValue == "Enter") {
            formAction.setValue("Actions");
            return formEnterConfirm();
        }

    } catch (error) {
        errorCell.setValue(error);
    }

}