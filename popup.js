const OPENAI_API_KEY = "your_openai_api_key";  // Replace with your actual API key
const fortuneText = document.getElementById("fortune");
const button = document.getElementById("getFortune");

button.addEventListener("click", async () => {
    fortuneText.textContent = "🔮 Asking the AI...";
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a wise fortune teller. Generate a fun, creative fortune." }]
        })
    });

    const data = await response.json();
    const fortune = data.choices[0].message.content;
    
    fortuneText.textContent = fortune;
});

