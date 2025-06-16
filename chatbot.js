let awaitingConfirmation = false;
let pendingRequest = "";
let currentSession = "";

window.onload = () => {
  appendBotMessage('Say "hello" to start interacting!', 1000);
};

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = document.getElementById('userMessage').value.trim();
  if (userMessage === "") return;

  appendMessage('user', userMessage);
  saveToHistory('user', userMessage);

  if (awaitingConfirmation) {
    handleConfirmation(userMessage);
  } else {
    processMessage(userMessage);
  }

  document.getElementById('userMessage').value = "";
}

function appendMessage(sender, message) {
  const chatWindow = document.getElementById('chatWindow');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);

  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('chat-bubble', sender);
  bubbleDiv.textContent = message;

  messageDiv.appendChild(bubbleDiv);
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendBotMessage(message, delay = 0) {
  const chatWindow = document.getElementById('chatWindow');
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('chat-message', 'bot');

  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('chat-bubble', 'bot', 'typing-indicator');
  typingIndicator.textContent = 'Typing...';

  typingDiv.appendChild(typingIndicator);
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    chatWindow.removeChild(typingDiv);
    appendMessage('bot', message);
    saveToHistory('bot', message);
  }, delay);
}

function processMessage(userMessage) {
  const lower = userMessage.toLowerCase();
  if (lower === "hello") {
    appendBotMessage("Hi! This is OddJobsGaurav.", 1000);
    appendBotMessage("Use this format for all your requests: 'I need (your request)' or 'I want (your demand)'. How can I assist you today?", 2000);
  } else {
    const match = userMessage.match(/I (need|want) (.+)/i);
    if (match) {
      pendingRequest = match[2];
      currentSession = pendingRequest;
      awaitingConfirmation = true;
      appendBotMessage(`Your request is "${pendingRequest}". Am I correct?`, 1000);
    } else {
      appendBotMessage(getBotResponse(userMessage), 1000);
    }
  }
}

function handleConfirmation(userMessage) {
  if (userMessage.toLowerCase() === "yes") {
    appendBotMessage("Forwarding your request...", 1000);
    saveSessionToStorage(); // Save the full session
    setTimeout(() => {
      window.location.href = "form.html";
    }, 1500);
  } else if (userMessage.toLowerCase() === "no") {
    awaitingConfirmation = false;
    appendBotMessage("What can I help you with?", 1000);
  } else {
    appendBotMessage("Please respond with 'yes' or 'no'.", 1000);
  }
}

function getBotResponse(msg) {
  if (msg.toLowerCase().includes("help")) {
    return "Sure, what do you need help with?";
  }
  return "Sorry, I don't understand that. Can you rephrase?";
}

let tempSessionMessages = [];

function saveToHistory(sender, message) {
  const timestamp = new Date().toLocaleString();
  tempSessionMessages.push({ sender, message, timestamp });
}

function saveSessionToStorage() {
  if (!currentSession || tempSessionMessages.length === 0) return;

  let allChats = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  allChats.push({
    title: currentSession,
    timestamp: new Date().toLocaleString(),
    messages: tempSessionMessages
  });

  localStorage.setItem("chatHistory", JSON.stringify(allChats));
  tempSessionMessages = [];
}