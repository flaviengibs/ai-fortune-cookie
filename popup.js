document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleDarkMode");
    const statusText = document.getElementById("statusText");
    
    chrome.storage.local.get(["darkMode", "autoActivated"], (data) => {
        updateUI(data.darkMode, data.autoActivated);
    });
    
    toggleButton.addEventListener("click", () => {
        chrome.storage.local.get("darkMode", (data) => {
            const newMode = !data.darkMode;
            chrome.storage.local.set({ darkMode: newMode });
            updateUI(newMode, data.autoActivated);
        });
    });
    
    function updateUI(darkMode, autoActivated) {
        statusText.textContent = `Mode sombre: ${darkMode ? "Activé" : "Désactivé"} | Auto: ${autoActivated ? "Oui" : "Non"}`;
        toggleButton.textContent = darkMode ? "Désactiver" : "Activer";
    }
});
