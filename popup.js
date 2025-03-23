document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");
    const toggleAutoModeButton = document.getElementById("toggleAutoMode");
    const darkModeStatus = document.getElementById("darkModeStatus");
    const autoModeStatus = document.getElementById("autoModeStatus");
    
    chrome.storage.local.get(["darkMode", "autoActivated", "autoMode"], (data) => {
        updateUI(data.darkMode, data.autoActivated, data.autoMode);
    });
    
    toggleDarkModeButton.addEventListener("click", () => {
        chrome.storage.local.get("darkMode", (data) => {
            const newMode = !data.darkMode;
            chrome.storage.local.set({ darkMode: newMode }, () => {
                applyDarkMode(newMode);
                updateUI(newMode, false, true);
            });
        });
    });
    
    toggleAutoModeButton.addEventListener("click", () => {
        chrome.storage.local.get("autoMode", (data) => {
            const newAutoMode = !data.autoMode;
            chrome.storage.local.set({ autoMode: newAutoMode });
            updateUI(false, false, newAutoMode);
        });
    });
    
    function updateUI(darkMode, autoActivated, autoMode) {
        darkModeStatus.textContent = `Dark Mode: ${darkMode ? "Enabled" : "Disabled"}`;
        autoModeStatus.textContent = `Auto Mode: ${autoMode ? "Enabled" : "Disabled"}`;
        toggleDarkModeButton.textContent = darkMode ? "Disable Dark Mode" : "Enable Dark Mode";
        toggleAutoModeButton.textContent = autoMode ? "Disable Auto Mode" : "Enable Auto Mode";
    }
});
