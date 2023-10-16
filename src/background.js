chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? '' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    // Toggle editing when the user clicks the extension icon
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });

    // Set the icon to the corsponding state
    if (nextState === "ON") {
        // Set the icon to the filled version when the user turns the extension on
        await chrome.action.setIcon({
            tabId: tab.id,
            path: {
                "16": "icons/LightEditFilled16.png",
                "32": "icons/LightEditFilled32.png",
                "48": "icons/LightEditFilled48.png",
                "128": "icons/LightEditFilled128.png"
            }
        });
    } else if (nextState === "") {
        // Set the icon to the regular version when the user turns the extension off
        await chrome.action.setIcon({
            tabId: tab.id,
            path: {
                "16": "icons/LightEditRegular16.png",
                "32": "icons/LightEditRegular32.png",
                "48": "icons/LightEditRegular48.png",
                "128": "icons/LightEditRegular128.png"
            }
        });
    }
});