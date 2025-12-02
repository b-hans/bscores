function getStatus () {

    const scriptProperties = PropertiesService.getScriptProperties();

    return scriptProperties.getProperty('SCRIPT_STATUS');

}