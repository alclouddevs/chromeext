"use strict";
chrome.action.onClicked.addListener((tab) => {
    console.log(tab.id, "tab id");
    const tabURL = tab.url;
    const startingString = "https://www.linkedin.com/in";
    if (!tabURL) {
        return;
    }
    else if (tabURL.startsWith(startingString)) {
        chrome.tabs.sendMessage(tab.id || 0, "open-dialog");
    }
    else {
        chrome.tabs.sendMessage(tab.id || 0, "show-alert");
    }
});
