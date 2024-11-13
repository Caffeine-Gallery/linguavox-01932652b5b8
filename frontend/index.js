document.addEventListener('DOMContentLoaded', () => {
    const sourceText = document.getElementById('sourceText');
    const languageSelect = document.getElementById('languageSelect');
    const translateBtn = document.getElementById('translateBtn');
    const translatedText = document.getElementById('translatedText');
    const speakBtn = document.getElementById('speakBtn');
    const translateSpinner = document.getElementById('translateSpinner');

    translateBtn.addEventListener('click', async () => {
        const text = sourceText.value.trim();
        const targetLang = languageSelect.value;

        if (!text) {
            alert('Please enter text to translate');
            return;
        }

        translateBtn.disabled = true;
        translateSpinner.classList.remove('d-none');
        speakBtn.classList.add('d-none');

        try {
            const response = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: text,
                    source: 'en',
                    target: targetLang
                })
            });

            const data = await response.json();
            translatedText.value = data.translatedText;
            speakBtn.classList.remove('d-none');
        } catch (error) {
            console.error('Translation error:', error);
            alert('Translation failed. Please try again.');
        } finally {
            translateBtn.disabled = false;
            translateSpinner.classList.add('d-none');
        }
    });

    speakBtn.addEventListener('click', () => {
        const text = translatedText.value;
        const language = languageSelect.value;

        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        
        switch(language) {
            case 'de':
                utterance.lang = 'de-DE';
                break;
            case 'fr':
                utterance.lang = 'fr-FR';
                break;
            case 'es':
                utterance.lang = 'es-ES';
                break;
        }

        window.speechSynthesis.speak(utterance);
    });
});
