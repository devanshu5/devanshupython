let startTime, endTime;

function checkTyping() {
  const sentence = document.getElementById("sentence").innerText.trim();
  const input = document.getElementById("input").value.trim();
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.innerHTML = `<p style="color:red;">Please type something to check speed!</p>`;
    return;
  }

  // Timing calculation
  endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000; // in seconds
  const wordCount = input.split(/\s+/).length;
  const wpm = Math.round((wordCount / timeTaken) * 60);

  // Accuracy calculation
  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === sentence[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / sentence.length) * 100);

  resultDiv.innerHTML = `
    <div style="background:#fff3cd; padding:15px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
      <h3>📊 Your Typing Result</h3>
      <p><strong>Time Taken:</strong> ${timeTaken.toFixed(2)} seconds</p>
      <p><strong>Words Per Minute (WPM):</strong> ${wpm} WPM</p>
      <p><strong>Accuracy:</strong> ${accuracy}%</p>
    </div>
  `;
}

// Start the timer as soon as user starts typing
document.getElementById("input").addEventListener("focus", function () {
  if (!startTime) startTime = new Date();
});
