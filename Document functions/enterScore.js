function enterScore () {

    let mainSheet;
    let formSheet;
    let formErrorCell;

    try {
        mainSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
        formErrorCell = formSheet.getRange(FORM_ERROR_RANGE);
    }
    catch (error) {
        console.log (error);
    }

   try {    
        // get the params
        const params = [
            formSheet.getRange(TITLE_RANGE).getValue(),
            formSheet.getRange(COMPOSER_RANGE).getValue(),
            formSheet.getRange(LYRICS_RANGE).getValue(),
            formSheet.getRange(ARRANGER_RANGE).getValue(),
            formSheet.getRange(ID_RANGE).getValue()
        ];

        // add to the main sheet
        let lastRow = mainSheet.getLastRow()+1;

        let newRange = mainSheet.getRange(lastRow, 1, 1, params.length);
        newRange.setValues([params]);
    }
    catch (error) {
        formErrorCell.setValue(error);
    }

    //temp
    formSheet.getRange(RESPONSE_RANGE).setValue("Select an option");
    formSheet.hideColumns(RESPONSE_COL);

    setStatus('create');

    return true;
}