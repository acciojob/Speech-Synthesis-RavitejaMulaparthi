// Your script here.
const textInput = document.getElementById('text-input');
        const startButton = document.getElementById('start-button');
        const stopButton = document.getElementById('stop-button');
        const voiceSelect = document.getElementById('voice-select');
        const rateButton = document.getElementById('rate-button');
        const pitchButton = document.getElementById('pitch-button');
        const speechOutput = document.getElementById('speech-output');

        let speechSynth = window.speechSynthesis;
        let voices = [];

        // Fetch available voices and populate the dropdown
        function populateVoiceList() {
            voices = speechSynth.getVoices();
            voiceSelect.innerHTML = '';

            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }

        populateVoiceList();

        // Event listeners
        startButton.addEventListener('click', () => {
            if (speechSynth.speaking) {
                speechSynth.cancel();
            }

            const selectedVoiceIndex = voiceSelect.value;
            const selectedVoice = voices[selectedVoiceIndex];
            const textToSpeak = textInput.value;

            if (textToSpeak && selectedVoice) {
                const speech = new SpeechSynthesisUtterance(textToSpeak);
                speech.voice = selectedVoice;
                speech.rate = 1.0; // Initial rate
                speech.pitch = 1.0; // Initial pitch

                speechSynth.speak(speech);
            }
        });

        stopButton.addEventListener('click', () => {
            speechSynth.cancel();
        });

        rateButton.addEventListener('click', () => {
            const selectedVoiceIndex = voiceSelect.value;
            const selectedVoice = voices[selectedVoiceIndex];
            const rate = parseFloat(prompt('Enter the rate (e.g., 0.5, 1.0, 2.0):'));

            if (!isNaN(rate) && rate >= 0.1 && rate <= 10 && selectedVoice) {
                selectedVoice.rate = rate;
            } else {
                alert('Invalid rate. Please enter a number between 0.1 and 10.');
            }
        });

        pitchButton.addEventListener('click', () => {
            const selectedVoiceIndex = voiceSelect.value;
            const selectedVoice = voices[selectedVoiceIndex];
            const pitch = parseFloat(prompt('Enter the pitch (e.g., 0.5, 1.0, 2.0):'));

            if (!isNaN(pitch) && pitch >= 0.1 && pitch <= 2.0 && selectedVoice) {
                selectedVoice.pitch = pitch;
            } else {
                alert('Invalid pitch. Please enter a number between 0.1 and 2.0.');
            }
        });

        // Listen for voiceschanged event and update the voice list
        speechSynthesis.onvoiceschanged = () => {
            populateVoiceList();
        };