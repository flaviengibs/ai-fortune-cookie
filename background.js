chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ darkMode: false, autoActivated: false, autoMode: true });
});

function checkDarkModeActivation() {
    const now = new Date();
    const hour = now.getHours();
    
    chrome.storage.local.get("autoMode", (data) => {
        if (data.autoMode && hour >= 19) {
            chrome.storage.local.set({ darkMode: true, autoActivated: true });
            applyDarkMode(true);
        } else {
            chrome.storage.local.set({ autoActivated: false });
        }
    });
}

function applyDarkMode(enabled) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.url.startsWith('http')) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: (enabled) => {
                        document.documentElement.style.backgroundColor = enabled ? '#121212' : '';
                        document.documentElement.style.color = enabled ? '#ffffff' : '';
                    },
                    args: [enabled]
                });
            }
        });
    });
}

chrome.alarms.create('checkTime', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkTime') {
        checkDarkModeActivation();
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if ('darkMode' in changes) {
        applyDarkMode(changes.darkMode.newValue);
    }
});
