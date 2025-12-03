function getNextId () {

    let mainSheet;
    let formSheet;

    let formErrorCell;

    try {

        mainSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);

        formErrorCell = formSheet.getRange(FORM_ERROR_RANGE);

        let lastRow = mainSheet.getLastRow();

        if (lastRow == 2) {
            return 1;
        }
        else {
            let idRange = mainSheet.getRange(3,5, lastRow -1, 1);
            let idArray2d = idRange.getValues();
            let idArray1d = idArray2d.flat().filter(String);

            let largestId = Math.max(...idArray1d);

            let nextId = largestId + 1;

            return nextId;
            
        }

    } catch (error) {
        formErrorCell.setValue("Error: " + error);
        return null;
    }

}