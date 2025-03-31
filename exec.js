const fs = require("fs");
const { exec } = require("child_process");

let isExecuting = false; // Flag to check if execution is in progress

function execute(url) {
  if (isExecuting) {
    console.log("Execution already in progress. Please wait...");
    return; // Prevent double execution
  }

  const batchFilePath = "C:\\Users\\HP\\Desktop\\OTHeR\\BOTS\\DX.bat";

  // Edit your chrome path here
  const batchContent = `@echo off
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --start-maximized --user-data-dir="C:\\Users\\HP\\AppData\\Local\\Google\\Chrome\\User Data" "${url}"`;

  fs.writeFile(batchFilePath, batchContent, "utf8", (err) => {
    if (err) {
      console.error("Failed to write batch file:", err);
      return;
    }

    // Set flag to indicate that execution is in progress
    isExecuting = true;

    exec(`start /b "" "${batchFilePath}"`, (error) => {
      if (error) {
        console.error("Failed to execute batch file:", error);
      } else {
        console.log("Batch file executed successfully.");
      }

      // After execution, pause for 5 seconds before allowing another execution
      setTimeout(() => {
        console.log("Execution finished. It will run again on any new change...");
        isExecuting = false; // Reset the flag after the delay
      }, 30000); // 30 seconds delay after execution
    });
  });
}

// Export the function
module.exports = execute;