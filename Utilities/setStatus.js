function setStatus (status) {

    const scriptProperties = PropertiesService.getScriptProperties();

    scriptProperties.setProperty('SCRIPT_STATUS', status);

    return true;
}