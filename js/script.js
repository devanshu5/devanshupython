// Typing Test Logic
function checkTyping() {
  const sentence = document.getElementById("sentence").innerText;
  const input = document.getElementById("input").value.trim();
  const result = document.getElementById("result");

  const startTime = window.startTime || new Date().getTime();
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000; // seconds

  const wordCount = input.split(" ").filter(Boolean).length;
  const speed = Math.round((wordCount / timeTaken) * 60); // WPM

  let correctWords = 0;
  const inputWords = input.split(" ");
  const sentenceWords = sentence.split(" ");

  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] === sentenceWords[i]) correctWords++;
  }

  const accuracy = Math.round((correctWords / sentenceWords.length) * 100);

  result.innerHTML = `⏱️ <strong>${speed} WPM</strong><br>✅ <strong>${accuracy}% Accuracy</strong>`;
}

// Track typing start time
document.getElementById("input")?.addEventListener("focus", () => {
  window.startTime = new Date().getTime();
});
