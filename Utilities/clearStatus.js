function clearStatus () {
    setStatus("free");
    setStatus('empty', 'FOLDER_NAME');

    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MAIN_SHEET);

    form = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
    errorCell = sheet.getRange(ERROR_RANGE);

    sheet.getRange('A1').setValue("New folders");
    sheet.getRange('B1').setValue("Functions");

    form.getRange(TITLE_RANGE).setValue('');
    form.getRange(COMPOSER_RANGE).setValue('');
    form.getRange(LYRICS_RANGE).setValue('');
    form.getRange(ARRANGER_RANGE).setValue('');
    form.getRange(ID_RANGE).setValue('');
    form.getRange(FORM_ERROR_RANGE).setValue('');
    form.getRange(FORM_ACTIONS_RANGE).setValue('Actions');
    form.getRange(RESPONSE_RANGE).setValue('Select an option');

    form.hideColumns(RESPONSE_COL);

    errorCell.setValue("Clear complete");
}