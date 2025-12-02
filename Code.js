function myFunction() {
  // get folders
  let bscoresFodler = DriveApp.getFolderById('19FwqKmM-UzkHipGOetA6VP0Fujt9iajt');

  console.log ("Scores folder name: " + bscoresFodler.getName());
}
