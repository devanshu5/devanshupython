/* =========================================
   Typing Test Logic
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Content Data
    const content = {
        easy: [
            "Python is a popular programming language",
            "It was created by Guido van Rossum",
            "Python has simple easy to use syntax",
            "Python works on different platforms",
            "Python can be used for web development",
            "It can also be used for data analysis",
            "Python has many useful libraries",
            "The print function displays output",
            "Variables store data values",
            "Lists store multiple items in one variable"
        ],
        medium: [
            "Python supports multiple programming paradigms",
            "List comprehensions provide concise syntax",
            "Dictionaries store data as key-value pairs",
            "Functions help organize and reuse code",
            "Modules are files containing Python code",
            "Exception handling prevents program crashes",
            "Object-oriented programming uses classes",
            "The Zen of Python outlines Python principles",
            "Virtual environments isolate project dependencies",
            "PIP is Python's package installer"
        ],
        hard: [
            "Decorators modify function behavior without changing code",
            "Generators create iterators with yield statements",
            "Context managers handle resource allocation",
            "Metaclasses customize class creation behavior",
            "Descriptors manage attribute access in classes",
            "Asyncio enables asynchronous programming",
            "Type hints improve code documentation",
            "Dunder methods enable operator overloading",
            "Python's GIL affects multi-threading performance",
            "Abstract base classes define interfaces"
        ],
        python: [
            "def calculate_average(numbers): return sum(numbers)/len(numbers)",
            "for i in range(10): print(i**2) if i%2==0 else print(i)",
            "[x for x in range(100) if x%3==0 and x%5==0]",
            "with open('data.txt') as f: contents = f.read()",
            "import math; hypotenuse = math.sqrt(a**2 + b**2)",
            "class Rectangle: def __init__(self,w,h): self.width=w; self.height=h",
            "try: result = x/y except ZeroDivisionError: print('Cannot divide by zero')",
            "@app.route('/') def home(): return render_template('index.html')",
            "df = pd.DataFrame(data={'col1': [1,2], 'col2': [3,4]})",
            "async def fetch_data(): async with aiohttp.ClientSession() as session: pass"
        ]
    };

    // DOM Elements
    const wordsDisplay = document.getElementById('wordsDisplay');
    const typingInput = document.getElementById('typingInput');
    const timerElement = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const newTestBtn = document.getElementById('newTestBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const resultsDiv = document.getElementById('results');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    
    // Stats Elements
    const wpmElement = document.getElementById('wpm');
    const accuracyElement = document.getElementById('accuracy');
    const cpmElement = document.getElementById('cpm');
    const errorsElement = document.getElementById('errors');
    
    // State Variables
    let timeLeft = 60;
    let timer;
    let isTestRunning = false;
    let currentDifficulty = 'easy';
    let words = [];
    let currentWordIndex = 0;
    let correctChars = 0;
    let totalChars = 0;
    let errors = 0;
    let startTime, endTime;

    // Initialize Difficulty Buttons
    difficultyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDifficulty = btn.dataset.difficulty;
            
            // If test not running, reset view
            if (!isTestRunning) {
                initTestView();
            }
        });
    });

    // Initialize View
    function initTestView() {
        wordsDisplay.innerHTML = '<span style="opacity:0.6">Click "Start Test" to begin...</span>';
        typingInput.value = '';
        typingInput.disabled = true;
        timerElement.textContent = '1:00';
    }

    // Start Test
    function startTest() {
        // Reset Logic
        timeLeft = 60;
        timerElement.textContent = '1:00';
        typingInput.value = '';
        typingInput.disabled = false;
        typingInput.focus();
        isTestRunning = true;
        
        // UI Updates
        startBtn.disabled = true;
        newTestBtn.disabled = true;
        resultsDiv.classList.remove('active');
        difficultyButtons.forEach(b => b.disabled = true); // Lock difficulty

        // Load Content
        words = getRandomWords(currentDifficulty);
        currentWordIndex = 0;
        correctChars = 0;
        totalChars = 0;
        errors = 0;

        renderWords();
        
        // Start Timer
        startTime = new Date();
        clearInterval(timer); // Safety clear
        timer = setInterval(updateTimer, 1000);
    }

    function getRandomWords(difficulty) {
        const allWords = content[difficulty];
        // Simple shuffle
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        // Return 15 phrases to ensure enough text
        return shuffled.slice(0, 15); 
    }

    function renderWords() {
        wordsDisplay.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + ' '; // Add space visually
            span.id = `word-${index}`;
            wordsDisplay.appendChild(span);
        });
        highlightCurrentWord();
    }

    function highlightCurrentWord() {
        const currentEl = document.getElementById(`word-${currentWordIndex}`);
        if (currentEl) {
            currentEl.classList.add('current');
            // Auto-scroll logic if needed
            if (currentEl.offsetTop > wordsDisplay.scrollTop + wordsDisplay.offsetHeight - 50) {
                wordsDisplay.scrollTop = currentEl.offsetTop - 20;
            }
        }
    }

    function updateTimer() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            endTest();
        }
    }

    function endTest() {
        clearInterval(timer);
        isTestRunning = false;
        endTime = new Date();
        
        typingInput.disabled = true;
        startBtn.disabled = false;
        newTestBtn.disabled = false;
        difficultyButtons.forEach(b => b.disabled = false);

        calculateAndShowResults();
    }

    function calculateAndShowResults() {
        // Time in minutes
        let timeInMinutes = (60 - timeLeft) / 60;
        if (timeInMinutes === 0) timeInMinutes = 0.01; // Avoid divide by zero

        // WPM: (All typed chars / 5) / time
        // Note: Standard formula usually counts all entries, keeping it simple here
        const grossWPM = (totalChars / 5) / timeInMinutes;
        const netWPM = ((totalChars - errors) / 5) / timeInMinutes;
        const wpm = Math.max(0, Math.round(netWPM)); // No negative WPM

        const accuracy = totalChars > 0 ? Math.round(((totalChars - errors) / totalChars) * 100) : 0;
        const cpm = Math.round(totalChars / timeInMinutes);

        // Update DOM
        wpmElement.textContent = wpm;
        accuracyElement.textContent = `${accuracy}%`;
        cpmElement.textContent = cpm;
        errorsElement.textContent = errors;

        // Show Results
        resultsDiv.classList.add('active');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Input Handling
    typingInput.addEventListener('input', (e) => {
        if (!isTestRunning) return;

        const currentWordText = words[currentWordIndex];
        const val = typingInput.value; // Don't trim immediately, need to detect Space
        const data = val.trim();

        // 1. Check if Space provided (Word Complete Submit)
        if (val.endsWith(' ') && data.length > 0) {
             // Word submitted
             checkWord(data, currentWordText);
        } else {
             // Real-time Visual Feedback (Optional - leaving simple for now)
             // Could mark red if typo detected early
             const currentEl = document.getElementById(`word-${currentWordIndex}`);
             if (!currentWordText.startsWith(val)) {
                 currentEl.classList.add('error-highlight');
             } else {
                 currentEl.classList.remove('error-highlight');
             }
        }
    });

    function checkWord(typed, target) {
        const currentEl = document.getElementById(`word-${currentWordIndex}`);
        currentEl.classList.remove('current', 'error-highlight');

        // Logic: Did they type the word correctly?
        // Note: The prompt text might differ slightly if we account for logic in original code
        // Original code required exact match. 
        
        if (typed === target) {
            currentEl.classList.add('correct');
            correctChars += target.length + 1; // +1 for space
        } else {
            currentEl.classList.add('incorrect');
            errors++; 
        }
        
        totalChars += target.length + 1; // Count attempted chars
        
        currentWordIndex++;
        typingInput.value = '';

        if (currentWordIndex >= words.length) {
            endTest();
        } else {
            highlightCurrentWord();
        }
    }

    // Event Bindings
    startBtn.addEventListener('click', startTest);
    
    newTestBtn.addEventListener('click', () => {
        // Just restart
        startTest(); 
    });

    tryAgainBtn.addEventListener('click', startTest);

    // Initial Setup
    initTestView();
});
