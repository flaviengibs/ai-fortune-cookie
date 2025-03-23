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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: (isDark) => {
                document.documentElement.style.backgroundColor = isDark ? '#121212' : '';
                document.documentElement.style.color = isDark ? '#ffffff' : '';
            },
            args: [enabled]
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
