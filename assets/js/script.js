document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The quick brown fox jumps over the lazy dog while the cat watches."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const userInput = document.getElementById('user-input');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    let startTime, endTime;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        let selectedText = '';

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
    }

    function calculateWPM(sample, input, start, end) {
        const sampleWords = sample.split(' ');
        const inputWords = input.split(' ');
        let correctWords = 0;

        for (let i = 0; i < inputWords.length; i++) {
            if (inputWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const timeTaken = (end - start) / 1000; // Time taken in seconds
        const timeTakenMinutes = timeTaken / 60; // Time taken in minutes
        const wpm = Math.round(correctWords / timeTakenMinutes);
        return { wpm, timeTaken };
    }

    function displayResults(wpm, timeTaken, level) {
        document.getElementById('wpm').textContent = wpm;
        document.getElementById('time').textContent = timeTaken.toFixed(2);
        document.getElementById('level').textContent = level;
    }

    function updateTypingFeedback() {
        const sampleWords = sampleTextDiv.textContent.split(' ');
        const inputWords = userInput.value.split(' ');
        let feedbackHTML = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (inputWords[i] === sampleWords[i]) {
                feedbackHTML += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else if (inputWords[i] !== undefined) {
                feedbackHTML += `<span style="color: red;">${sampleWords[i]}</span> `;
            } else {
                feedbackHTML += `<span>${sampleWords[i]}</span> `;
            }
        }

        sampleTextDiv.innerHTML = feedbackHTML;
    }

    startButton.addEventListener('click', function() {
        startTime = new Date();
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
        sampleTextDiv.innerHTML = sampleTextDiv.textContent; // Reset feedback
    });

    stopButton.addEventListener('click', function() {
        endTime = new Date();
        userInput.disabled = true;
        const sampleText = sampleTextDiv.textContent;
        const inputText = userInput.value;
        const { wpm, timeTaken } = calculateWPM(sampleText, inputText, startTime, endTime);
        const level = difficultySelect.options[difficultySelect.selectedIndex].text;
        displayResults(wpm, timeTaken, level);
    });

    userInput.addEventListener('input', updateTypingFeedback);

    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});