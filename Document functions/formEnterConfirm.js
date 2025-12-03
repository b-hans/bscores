function formEnterConfirm() {

    let mainSheet;
    let formSheet;
    let formErrorCell;
    let title;
    let composer;
    let lyricist;
    let arranger;
    let id;

    try {

        formSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORM_SHEET);
        formErrorCell = formSheet.getRange(FORM_ERROR_RANGE);

    }
    catch (error) {
        formErrorCell.setValue("error: " + error);
        return false;
    }


    try {
        title = formSheet.getRange(TITLE_RANGE).getValue();
        composer = formSheet.getRange(COMPOSER_RANGE).getValue();
        lyricist = formSheet.getRange(LYRICS_RANGE).getValue();
        arranger = formSheet.getRange(ARRANGER_RANGE).getValue();
        id = formSheet.getRange(ID_RANGE).getValue();

        let text = "You are about to enter, check values:" +
            "title: " + title + "\n" +
            "composer: " + composer + "\n" +
            "lyricist: " + lyricist + "\n" +
            "arranger: " + arranger + "\n" +
            "id: " + id;

        formErrorCell.setValue(text);

        formSheet.showColumns(RESPONSE_COL);

        return true;

    }
    catch (error) {
        formErrorCell.setValue("Error getting values: " + error);
        return false;
    }


}