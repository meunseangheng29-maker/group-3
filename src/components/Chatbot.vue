<template>
  <div class="chatbot-container">
    <!-- Chat Icon Button -->
    <button @click="toggleChat" class="chat-toggle-btn">
      💬
    </button>

    <!-- Chat Box Window -->
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <h3>Team<3 Coffee Support</h3>
        <button @click="toggleChat" class="close-btn">&times;</button>
      </div>
      
      <div class="chat-messages">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input-area">
        <input 
          type="text" 
          v-model="userInput" 
          @keyup.enter="sendMessage" 
          placeholder="Type a message..." 
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([
  { text: 'Hello! How can Team<3 Coffee help you today?', sender: 'bot' }
])

function toggleChat() {
  isOpen.value = !isOpen.value
}

function sendMessage() {
  if (!userInput.value.trim()) return

  // យកអត្ថបទដែល User វាយមកបម្លែងជា lowercase ដើម្បីងាយស្រួលឆែក keyword
  const text = userInput.value.trim().toLowerCase()

  // Push user message
  messages.value.push({ text: userInput.value, sender: 'user' })
  userInput.value = ''

  // ឆ្លើយតបតាមសំណួរច្រើនប្រភេទ (Expanded bot responses)
  setTimeout(() => {
    let reply = "I'm not sure about that. You can check our Menu, Offers, or contact us directly at +855 12 345 678!"

    if (text.includes('hello') || text.includes('hi') || text.includes('sok saby')) {
      reply = 'Hello! Welcome to Team<3 Coffee. How can we serve you today?'
    } 
    else if (text.includes('location') || text.includes('where') || text.includes('place') || text.includes('address')) {
      reply = 'Our shop is located in Phnom Penh, Cambodia.'
    } 
    else if (text.includes('time') || text.includes('open') || text.includes('hour') || text.includes('close')) {
      reply = 'We are open daily from 8:00 AM to 9:00 PM.'
    } 
    else if (text.includes('price') || text.includes('cost') || text.includes('menu') || text.includes('drink')) {
      reply = 'Our drinks start from $2.00. You can explore our full menu on the "Drinks" page!'
    } 
    else if (text.includes('delivery') || text.includes('deliver') || text.includes('ship')) {
      reply = 'Yes, we provide fast delivery around Phnom Penh!'
    }
    else if (text.includes('haha') || text.includes('lol') || text.includes('ute')) {
      reply = 'Haha! Glad you like our app. Have a wonderful day! 😄'
    }

    messages.value.push({ text: reply, sender: 'bot' })
  }, 500)
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: inherit;
}

.chat-toggle-btn {
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  height: 400px;
  background: white;
  border: 1px solid #f8bbd0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  overflow: hidden;
}

.chat-header {
  background: #e91e63;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 15px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fdf2f8;
}

.message {
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 80%;
  font-size: 13px;
}

.message.bot {
  background: white;
  color: #333;
  align-self: flex-start;
  border: 1px solid #f8bbd0;
}

.message.user {
  background: #e91e63;
  color: white;
  align-self: flex-end;
}

.chat-input-area {
  display: flex;
  padding: 8px;
  border-top: 1px solid #eee;
  background: white;
}

.chat-input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 13px;
}

.chat-input-area button {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0 12px;
  margin-left: 6px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
</style>