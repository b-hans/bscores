function createForm () {

    let mainSheet;
    let formSheet;

    let errorCell;

    let title;
    let id;
    let composer;
    let lyricist;
    let arranger;

    try {
        mainSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main");
        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form");

        errorCell = mainSheet.getRange(ERROR_RANGE);

    } catch (error) {
        console.log ("Couldn't get sheet values");
        return false;
    }

    // get title here
    try {
        let folder = mainSheet.getRange(FOLDER_RANGE);

        title = folder.getValue();
        id = getNextId();

        formSheet.getRange(TITLE_RANGE).setValue(title);
        formSheet.getRange(ID_RANGE).setValue(id);

        folder.setValue('New folders');
        formSheet.activate();

    } catch (error) {
        console.log (error);
    }


}