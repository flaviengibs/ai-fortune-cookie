const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

async function getFortune() {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: 'Generate a random fortune cookie.',
      max_tokens: 60, 
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Fonction pour afficher le fortune cookie dans le popup
async function displayFortune() {
  const fortune = await getFortune();
  document.getElementById('fortune').textContent = fortune;
}

// Appeler la fonction displayFortune au chargement du popup
displayFortune();

