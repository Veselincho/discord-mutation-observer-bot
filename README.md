Discord MutationObserver Bot

## Overview
This project is a bot that uses Playwright and MutationObserver to monitor a specific Discord channel for new posts. When a post meets a predefined condition, the bot extracts the relevant link and executes a batch script to open it in a local Chrome instance.



## Features
- Monitors Discord channel UI for new posts.
- Uses MutationObserver to detect real-time changes.
- Extracts links from posts that meet certain conditions.
- Modifies the link into a batch script immediately.
- Executes the batch script to open the link in Chrome.



## Installation

1. Clone the repository:
   git clone https://github.com/Veselincho/discord-mutation-observer-bot.git
   
    Navigate into the project directory:
    cd discord-mutation-observer-bot


2. Install dependencies:
    npx playwright install && npm install


3. Execute the bot:
    node index.js


 


## Requirements

    Node.js (latest stable version recommended)

    Playwright (must run npx playwright install to install dependencies)

    A Discord account with access to the target channel





## Notes

    Ensure you have Playwright set up properly to interact with the UI.

    The bot must run in an environment where it can visually interact with Discord.

    You might want to run Playwright in headful mode if you encounter issues with finding XPath selectors.

    Make sure to replace your selectors in the code as needed.