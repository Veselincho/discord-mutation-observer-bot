const wait = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const execute = require('./exec.js');  // Import execute function
const { chromium } = require("playwright");
require("dotenv").config();

const dEmail = process.env.DISCORD_EMAIL;
const dPass = process.env.DISCORD_PASSWORD;

(async () => {
  try {
    const browser = await chromium.launch({
      headless: false,
      args: ["--start-maximized"],
    });
    const context = await browser.newContext({
      viewport: null,
    });
    const page = await context.newPage();

    // Expose execute to the browser environment
    await page.exposeFunction("triggerExecute", execute);

    console.log("🔵 Navigating to Discord...");
    
    await page.goto("https://discord.com/login", {
      timeout: 120000  //  timeout 
    });
    

    console.log("🔵 Logging in...");
    await page
      .locator("xpath=/html/body/div[2]/div[2]/div[1]/div[1]/div/div/div/div/form/div[2]/div/div[1]/div[2]/div[1]/div/div/div[2]/input", {timeout: 120000})
      .fill(dEmail);
    await page
      .locator("xpath=/html/body/div[2]/div[2]/div[1]/div[1]/div/div/div/div/form/div[2]/div/div[1]/div[2]/div[2]/div/div/input", {timeout: 120000})
      .fill(dPass);
    await page.locator("//button//div[text()='Log In']", {timeout: 120000}).click();


    await wait(10000)
    await page.locator("//div[contains(@aria-label, 'Jellycubes')]").scrollIntoViewIfNeeded();
    await page.locator("//div[contains(@aria-label, 'Jellycubes')]").click()

    await page.locator("//li[@data-dnd-name='🐍︱snekfun-notis']").scrollIntoViewIfNeeded();
    await page.locator("//li[@data-dnd-name='🐍︱snekfun-notis']").click();





    console.log("⏳ Ensuring page is fully loaded... 10 secs");

    await wait(10000); // Assuming wait is a function that returns a Promise
    
    let secondsRemaining = 9;
    
    const countdown = setInterval(() => {
        console.log(`${secondsRemaining} seconds remaining`);
        secondsRemaining--;
    
        if (secondsRemaining === 0) {
            clearInterval(countdown);
            console.log("Page loaded.");
            console.log("MutationObserver is now monitoring.");
        }
    }, 1000);
    

 

    await page.evaluate(() => {
      const messageContainerXPath = "//div//ol[@aria-label='Съобщения в 🐍︱snekfun-notis']";
    
      const targetNode = document.evaluate(
        messageContainerXPath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    
      if (!targetNode) {
        console.log("❌ Message container not found.");
        return;
      }
    
      const config = { childList: true, subtree: true };
    
      const observer = new MutationObserver(async function (mutationsList, obs) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            console.log("🔔 DOM change detected!");
    
            let msgElement = document.evaluate(
              "(//div//a[contains(@href, 'https://app.dexhunter.io/swap')])[last()]",
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
    
            if (msgElement) {
              let link = msgElement.href;
              console.log("🔗 Link found: " + link);
            
              // Call the exposed Node.js function
              window.triggerExecute(link);
            
              // Wait for 30 seconds before continuing
              await new Promise(resolve => setTimeout(resolve, 30000));
            
              // Reconnect observer after delay (after 30 seconds)
              obs.observe(targetNode, config);
            
              console.log("Observer reconnected after 30 seconds delay.");
            }
            
          }
        }
      });
    
      observer.observe(targetNode, config);
      console.log("🔍 MutationObserver is now monitoring...");
    });
    

  } catch (error) {
    console.error("❌ Error:", error);
  }
})();