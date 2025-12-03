function setStatus (status, type = null) {

    const scriptProperties = PropertiesService.getScriptProperties();

    if (!type) {
        scriptProperties.setProperty('SCRIPT_STATUS', status);
    }
    else {
        scriptProperties.setProperty(type, status);
    }

    return true;
}