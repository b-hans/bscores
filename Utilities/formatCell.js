function formatCell (params) {

    let cell = params.cell;
    let type = params.type;

    if (type == "error") {
        cell.setFontColor('#9C2007');
        cell.setFontFamily('Comic Sans MS');
        cell.setFontSize(12);
        cell.setFontWeight('bold');
        cell.setValue('');
    }

}