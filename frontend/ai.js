const responseBox = document.getElementById("ai-response");
const chatBox = document.getElementById("chatBox");
const askForm = document.getElementById("askForm");
const questionInput = document.getElementById("question");

// ✅ Load initial AI tip based on alert type
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type") || "emergency";
  const question = `What should I do during a ${type} emergency?`;

  fetchAI(question, (text) => {
    responseBox.textContent = text;
    appendToChat("AI", text);
  });
});

// ✅ Text-to-speech
document.getElementById("speakBtn").addEventListener("click", () => {
  const text = responseBox.textContent;
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  } else {
    alert("🛑 Your browser does not support speech synthesis.");
  }
});

// ✅ Ask follow-up questions
askForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userQuestion = questionInput.value.trim();
  if (!userQuestion) return;

  appendToChat("You", userQuestion);
  questionInput.value = "";

  fetchAI(userQuestion, (response) => {
    appendToChat("AI", response);
  });
});

// ✅ Fetch AI response from backend
function fetchAI(question, callback) {
  fetch(
    `http://localhost:8080/api/ai/ask?question=${encodeURIComponent(question)}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch AI response");
      return res.text();
    })
    .then((text) => callback(text))
    .catch((err) => {
      callback("⚠️ Failed to get response from AI.");
      console.error(err);
    });
}

// ✅ Append messages to chat box
function appendToChat(sender, message) {
  const msg = document.createElement("div");
  msg.className = sender === "You" ? "user-msg" : "ai-msg";
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type") || "emergency";

  fetch(
    `http://localhost:8080/api/ai/ask?question=What should I do during a ${type} emergency?`
  )
    .then((res) => res.text())
    .then((text) => {
      // Format the text with line breaks
      const formatted = text.replace(/\n/g, "<br>");
      document.getElementById("ai-response").innerHTML = formatted;
    })
    .catch((err) => {
      document.getElementById("ai-response").textContent =
        "⚠️ Failed to fetch AI tips.";
      console.error(err);
    });
});
