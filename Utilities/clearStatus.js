function clearStatus () {
    setStatus("free");

    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);
    errorCell = sheet.getRange(ERROR_RANGE);

    sheet.getRange('A1').setValue("New folders");
    sheet.getRange('B1').setValue("Functions");

    errorCell.setValue("Clear complete");
}