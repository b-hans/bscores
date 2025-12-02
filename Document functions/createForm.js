function createForm () {

    let mainSheet;
    let formSheet;

    let errorCell;

    try {
        mainSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main");
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form");

        errorCell = mainSheet.getRange(ERROR_RANGE);

    } catch (error) {
        console.log ("Couldn't get sheet values");
        return false;
    }

    formSheet.activate();


}