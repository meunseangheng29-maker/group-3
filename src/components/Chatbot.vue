```vue
<template>
  <div class="chatbot-container">

    <!-- Chat Icon -->
    <button
      @click="toggleChat"
      class="chat-toggle-btn"
    >
      💬
    </button>


    <!-- Chat Window -->
    <div v-if="isOpen" class="chat-window">

      <!-- Header -->
      <div class="chat-header">

        <div>
          <h3>Team&lt;3 Coffee Support</h3>
          <span>● Online • Ready to help</span>
        </div>

        <button
          @click="toggleChat"
          class="close-btn"
        >
          &times;
        </button>

      </div>


      <!-- Messages -->
      <div class="chat-messages">

        <!-- Messages -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.sender]"
        >
          {{ msg.text }}
        </div>


        <!-- OPTIONS -->
        <div
          v-if="showOptions"
          class="options"
        >

          <p>Choose an option:</p>

          <button @click="chooseOption('drinks')">
            🥤 Drinks & Menu
          </button>

          <button @click="chooseOption('price')">
            💰 Prices
          </button>

          <button @click="chooseOption('offers')">
            🏷️ Offers
          </button>

          <button @click="chooseOption('location')">
            📍 Location
          </button>

          <button @click="chooseOption('hours')">
            🕐 Opening Hours
          </button>

          <button @click="chooseOption('delivery')">
            🚚 Delivery
          </button>

          <button @click="chooseOption('order')">
            📦 How to Order
          </button>

          <button @click="chooseOption('contact')">
            📞 Contact Us
          </button>

        </div>


        <!-- DRINK OPTIONS -->
        <div
          v-if="showDrinkOptions"
          class="options"
        >

          <p>What would you like? 🥤</p>

          <button @click="chooseDrink('coffee')">
            ☕ Coffee
          </button>

          <button @click="chooseDrink('tea')">
            🍵 Tea
          </button>

          <button @click="chooseDrink('smoothie')">
            🥤 Smoothies
          </button>

          <button @click="chooseDrink('other')">
            🧋 Other Drinks
          </button>

          <button
            class="back-button"
            @click="backToOptions"
          >
            ← Back
          </button>

        </div>

      </div>


      <!-- Input -->
      <div class="chat-input-area">

        <input
          type="text"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
        />

        <button
          @click="sendMessage"
          :disabled="!userInput.trim()"
        >
          Send
        </button>

      </div>

    </div>

  </div>
</template>


<script setup lang="ts">

import { ref } from 'vue'


/* =========================
   CHAT STATE
========================= */

const isOpen = ref(false)

const userInput = ref('')

const showOptions = ref(true)

const showDrinkOptions = ref(false)


/* =========================
   MESSAGE TYPE
========================= */

interface Message {
  text: string
  sender: 'bot' | 'user'
}


/* =========================
   MESSAGES
========================= */

const messages = ref<Message[]>([
  {
    text: 'Hello! 👋 How can Team<3 Coffee help you today?',
    sender: 'bot'
  }
])


/* =========================
   OPEN / CLOSE
========================= */

function toggleChat() {
  isOpen.value = !isOpen.value
}


/* =========================
   MAIN OPTIONS
========================= */

function chooseOption(option: string) {

  showOptions.value = false
  showDrinkOptions.value = false


  if (option === 'drinks') {

    messages.value.push({
      text: '🥤 I want to see the drinks.',
      sender: 'user'
    })

    setTimeout(() => {

      messages.value.push({
        text: 'Sure! 🥤 What type of drink are you interested in?',
        sender: 'bot'
      })

      showDrinkOptions.value = true

    }, 500)

  }


  else if (option === 'price') {

    sendBotAnswer(
      '💰 Our drinks start from $2.00. You can check the exact price of each drink on our Drinks page.'
    )

  }


  else if (option === 'offers') {

    sendBotAnswer(
      '🏷️ We have special offers and promotions! Check our Offers page to see the latest deals.'
    )

  }


  else if (option === 'location') {

    sendBotAnswer(
      '📍 Our shop is located in Phnom Penh, Cambodia.'
    )

  }


  else if (option === 'hours') {

    sendBotAnswer(
      '🕐 We are open daily from 8:00 AM to 9:00 PM.'
    )

  }


  else if (option === 'delivery') {

    sendBotAnswer(
      '🚚 Yes! We provide delivery around Phnom Penh.'
    )

  }


  else if (option === 'order') {

    sendBotAnswer(
      '📦 To order, choose a drink, add it to your Cart, then continue to Checkout.'
    )

  }


  else if (option === 'contact') {

    sendBotAnswer(
      '📞 You can contact Team<3 Coffee through our Contact page.'
    )

  }

}


/* =========================
   DRINK OPTIONS
========================= */

function chooseDrink(drink: string) {

  showDrinkOptions.value = false


  if (drink === 'coffee') {

    sendBotAnswer(
      '☕ Great choice! We have different coffee drinks available. You can see them on our Drinks page.'
    )

  }


  else if (drink === 'tea') {

    sendBotAnswer(
      '🍵 Nice choice! You can explore our available tea drinks on the Drinks page.'
    )

  }


  else if (drink === 'smoothie') {

    sendBotAnswer(
      '🥤 Smoothies are a refreshing choice! Check our Drinks page to see the available smoothies.'
    )

  }


  else if (drink === 'other') {

    sendBotAnswer(
      '🧋 We have other refreshing drinks too! Visit our Drinks page to explore the full menu.'
    )

  }

}


/* =========================
   BOT ANSWER
========================= */

function sendBotAnswer(answer: string) {

  setTimeout(() => {

    messages.value.push({
      text: answer,
      sender: 'bot'
    })

    showOptions.value = true

  }, 500)

}


/* =========================
   BACK BUTTON
========================= */

function backToOptions() {

  showDrinkOptions.value = false

  showOptions.value = true

}


/* =========================
   TYPED MESSAGE
========================= */

function sendMessage() {

  if (!userInput.value.trim()) return


  const originalText = userInput.value.trim()

  const text = originalText.toLowerCase()


  /* Add user message */

  messages.value.push({
    text: originalText,
    sender: 'user'
  })


  userInput.value = ''

  showOptions.value = false
  showDrinkOptions.value = false


  setTimeout(() => {

    let reply =
      "I'm not sure about that. Try asking about drinks, prices, offers, location, hours, delivery, orders, or contact."


    /* Greeting */

    if (
      text.includes('hello') ||
      text.includes('hi') ||
      text.includes('hey')
    ) {

      reply =
        'Hello! 👋 Welcome to Team<3 Coffee. How can I help you today?'

    }


    /* Drinks */

    else if (
      text.includes('drink') ||
      text.includes('menu') ||
      text.includes('coffee') ||
      text.includes('tea') ||
      text.includes('smoothie')
    ) {

      reply =
        '🥤 We have a variety of delicious drinks! You can explore our full menu on the Drinks page.'

    }


    /* Price */

    else if (
      text.includes('price') ||
      text.includes('cost') ||
      text.includes('how much')
    ) {

      reply =
        '💰 Our drinks start from $2.00. Check the Drinks page for exact prices.'

    }


    /* Offers */

    else if (
      text.includes('offer') ||
      text.includes('discount') ||
      text.includes('promotion') ||
      text.includes('promo')
    ) {

      reply =
        '🏷️ We have special offers and promotions! Check our Offers page.'

    }


    /* Location */

    else if (
      text.includes('location') ||
      text.includes('where') ||
      text.includes('address')
    ) {

      reply =
        '📍 Our shop is located in Phnom Penh, Cambodia.'

    }


    /* Hours */

    else if (
      text.includes('open') ||
      text.includes('hour') ||
      text.includes('time') ||
      text.includes('close')
    ) {

      reply =
        '🕐 We are open daily from 8:00 AM to 9:00 PM.'

    }


    /* Delivery */

    else if (
      text.includes('delivery') ||
      text.includes('deliver')
    ) {

      reply =
        '🚚 Yes! We provide delivery around Phnom Penh.'

    }


    /* Order */

    else if (
      text.includes('order') ||
      text.includes('buy')
    ) {

      reply =
        '📦 Choose your favorite drink, add it to your Cart, and continue to Checkout.'

    }


    /* Cart */

    else if (
      text.includes('cart') ||
      text.includes('shopping')
    ) {

      reply =
        '🛒 You can view your selected drinks in the Shopping Cart.'

    }


    /* Contact */

    else if (
      text.includes('contact') ||
      text.includes('phone') ||
      text.includes('email')
    ) {

      reply =
        '📞 You can contact Team<3 Coffee through our Contact page.'

    }


    /* Thanks */

    else if (
      text.includes('thank') ||
      text.includes('thanks')
    ) {

      reply =
        "You're welcome! 😊 Enjoy your coffee!"

    }


    /* Add response */

    messages.value.push({
      text: reply,
      sender: 'bot'
    })


    /* Show options again */

    showOptions.value = true

  }, 700)

}

</script>


<style scoped>

/* =========================
   CONTAINER
========================= */

.chatbot-container {

  position: fixed;

  bottom: 20px;

  right: 20px;

  z-index: 1000;

  font-family: inherit;
}


/* =========================
   CHAT BUTTON
========================= */

.chat-toggle-btn {

  background: #e91e63;

  color: white;

  border: none;

  border-radius: 50%;

  width: 55px;

  height: 55px;

  font-size: 24px;

  cursor: pointer;

  box-shadow:
    0 4px 12px rgba(233, 30, 99, 0.4);

  transition: 0.2s;
}


.chat-toggle-btn:hover {

  transform: scale(1.08);

}


/* =========================
   CHAT WINDOW
========================= */

.chat-window {

  position: absolute;

  bottom: 70px;

  right: 0;

  width: 320px;

  height: 470px;

  background: white;

  border: 1px solid #f8bbd0;

  border-radius: 16px;

  display: flex;

  flex-direction: column;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15);

  overflow: hidden;
}


/* =========================
   HEADER
========================= */

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


.chat-header span {

  font-size: 11px;

  opacity: 0.9;
}


.close-btn {

  background: none;

  border: none;

  color: white;

  font-size: 22px;

  cursor: pointer;
}


/* =========================
   MESSAGES
========================= */

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

  line-height: 1.5;

  white-space: pre-line;
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


/* =========================
   OPTIONS
========================= */

.options {

  display: flex;

  flex-direction: column;

  gap: 6px;

  margin-top: 4px;
}


.options p {

  margin: 0 0 3px;

  font-size: 12px;

  color: #777;
}


.options button {

  width: 100%;

  padding: 8px 10px;

  background: white;

  color: #e91e63;

  border: 1px solid #f8bbd0;

  border-radius: 8px;

  text-align: left;

  font-size: 12px;

  cursor: pointer;

  transition: 0.2s;
}


.options button:hover {

  background: #fce4ec;

  border-color: #e91e63;
}


/* Back button */

.options .back-button {

  color: #777;

  text-align: center;

  background: #fafafa;
}


/* =========================
   INPUT
========================= */

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


.chat-input-area input:focus {

  border-color: #e91e63;
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


.chat-input-area button:hover {

  background: #d81b60;
}


.chat-input-area button:disabled {

  background: #f3a7c0;

  cursor: not-allowed;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 500px) {

  .chatbot-container {

    right: 15px;

    bottom: 15px;
  }


  .chat-window {

    width: calc(100vw - 30px);

    height: 450px;
  }

}

</style>
