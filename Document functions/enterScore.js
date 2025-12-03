function enterScore () {

    let mainSheet;
    let formSheet;
    let formErrorCell;
    let documentUrl;

    try {
        mainSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
        formErrorCell = formSheet.getRange(FORM_ERROR_RANGE);
    }
    catch (error) {
        console.log (error);
    }

    // make the document
    try {
        let returnParams = makeDocument(formSheet.getRange(TITLE_RANGE).getValue());
        if (returnParams.error) {
            formErrorCell.setValue("error: " + returnParams.message);
        }
        else {
            formErrorCell.setValue(returnParams.message);
        }
    }
    catch (error) {
        formErrorCell.setValue("Problem getting folder: " + error);
        return false;
    }

//    try {    
//         // get the params
//         const params = [
//             formSheet.getRange(TITLE_RANGE).getValue(),
//             formSheet.getRange(COMPOSER_RANGE).getValue(),
//             formSheet.getRange(LYRICS_RANGE).getValue(),
//             formSheet.getRange(ARRANGER_RANGE).getValue(),
//             formSheet.getRange(ID_RANGE).getValue()
//         ];

//         // add to the main sheet
//         let lastRow = mainSheet.getLastRow()+1;

//         let newRange = mainSheet.getRange(lastRow, 1, 1, params.length);
//         newRange.setValues([params]);
//     }
//     catch (error) {
//         formErrorCell.setValue(error);
//     }

    //temp
    formSheet.getRange(RESPONSE_RANGE).setValue("Select an option");
    formSheet.hideColumns(RESPONSE_COL);

    setStatus('create');

    return true;
}