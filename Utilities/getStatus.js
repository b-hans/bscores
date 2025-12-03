function getStatus (type = null) {

    const scriptProperties = PropertiesService.getScriptProperties();

    if (!type) {
        return scriptProperties.getProperty('SCRIPT_STATUS');
    }
    else {
        return scriptProperties.getProperty(type);
    } 
        

}