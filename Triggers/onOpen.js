function openTrigger(e) {

    let sheet;
    let folder;
    let errorCell;

    try {

        sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');

        errorCell = sheet.getRange('B1');

        let params = {
            cell: errorCell,
            type: "error"
        }

        formatCell(params);


    } catch (e) {
        console.log ("Couldn't get the sheet: " + e);
        return false;
    }

    

}