<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { type ChatRequestData } from 'shared/interface/chat'
import { useAppBarStore } from '@/stores/appBar'

const { setRightBarToggle, setNavBarToggle } = useAppBarStore()

// Manual screen width tracking
const screenWidth = ref(window.innerWidth)
const isMobile = computed(() => screenWidth.value < 600) // Define mobile breakpoint

// Removed useI18n instance
// const { t } = useI18n();

// sport items - Hardcoded strings instead of using t()
const sportItems = ref<Array<string>>([
  'Sport', // Replaced t("rightBar.dropdownItem.sport")
  'Casino', // Replaced t("rightBar.dropdownItem.casino")
])
// selected sport item
const selectedItem = ref<string>('Sport')
const drawer = ref<boolean>(false) // Controls the visibility of the sidebar

// State for the custom dropdown menu
const isDropdownOpen = ref(false)

const rightBarToggle = computed(() => {
  // const { getRightBarToggle } = storeToRefs(appBarStore)
  const getRightBarToggle = useAppBarStore()
  return getRightBarToggle.rightBarToggle
})

// Watch for changes in the global rightBarToggle state
watch(rightBarToggle, (newValue) => {
  console.log(newValue)
  drawer.value = newValue
  // Hide navbar on mobile when right bar opens
  if (isMobile.value && newValue) {
    setNavBarToggle(false)
  }
})

// Watch for changes in the local drawer state
watch(drawer, (newValue: boolean) => {
  setRightBarToggle(newValue)
  // Show navbar again on mobile when right bar closes
  if (isMobile.value && !newValue) {
    setNavBarToggle(true)
  }
})

const handleDropdown = (item: string): void => {
  selectedItem.value = item
  isDropdownOpen.value = false // Close dropdown after selection
}

// chat message array (kept as is)
const messages = ref<Array<ChatRequestData>>([
  {
    type: 'receiver',
    avatar: new URL('@/assets/chat/image/user_3.png', import.meta.url).href,
    grade: 'V18',
    gradeColor: 'grade-color-white',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v18.svg', import.meta.url).href,
    sender: 'Game',
    receiver: 'Jimmy',
    message: 'Provider',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v18_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v18_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v18_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v18_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v18_down.svg', import.meta.url).href,
    ],
  },
  {
    type: 'receiver',
    avatar: new URL('@/assets/chat/image/user_1.png', import.meta.url).href,
    grade: 'V28',
    gradeColor: 'grade-color-black',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v28.svg', import.meta.url).href,
    sender: 'Jimmy',
    receiver: 'Game',
    message: 'Suibian dajige ziz ajapospoaap',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
    ],
  },
  {
    type: 'sender',
    avatar: new URL('@/assets/chat/image/user_2.png', import.meta.url).href,
    grade: 'V1',
    gradeColor: 'grade-color-black',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v1.svg', import.meta.url).href,
    sender: 'Leo',
    receiver: 'Game',
    message: 'Suibian dajige ziz ajapospoaap',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_down.svg', import.meta.url).href,
    ],
  },
  {
    type: 'receiver',
    avatar: new URL('@/assets/chat/image/user_1.png', import.meta.url).href,
    grade: 'V28',
    gradeColor: 'grade-color-black',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v28.svg', import.meta.url).href,
    sender: 'Jimmy',
    receiver: 'Game',
    message: 'Suibian dajige ziz ajapospoaap',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
    ],
  },
  {
    type: 'sender',
    avatar: new URL('@/assets/chat/image/user_2.png', import.meta.url).href,
    grade: 'V1',
    gradeColor: 'grade-color-black',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v1.svg', import.meta.url).href,
    sender: 'Leo',
    receiver: 'Game',
    message: 'Suibian dajige ziz ajapospoaap',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v1_down.svg', import.meta.url).href,
    ],
  },
  {
    type: 'receiver',
    avatar: new URL('@/assets/chat/image/user_1.png', import.meta.url).href,
    grade: 'V28',
    gradeColor: 'grade-color-black',
    gradeBackground: new URL('@/assets/chat/svg/ellipse_v28.svg', import.meta.url).href,
    sender: 'Jimmy',
    receiver: 'Game',
    message: 'Suibian dajige ziz ajapospoaap',
    starLevel: [
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_up.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
      new URL('@/assets/chat/svg/heart_v28_down.svg', import.meta.url).href,
    ],
  },
])

// Update screenWidth on window resize
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

// Add and remove resize listener
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  // Set initial drawer state based on screen width on mount
  // drawer.value = screenWidth.value >= 1280; // Assuming 1280 is the desktop breakpoint
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})
</script>

<template>
  <div :class="['right-sidebar', { open: drawer, 'mobile-padding-bottom': isMobile }]">
    <div class="sidebar-header">
      <div class="header-top-row">
        <button class="right-btn close-button" @click.stop="setRightBarToggle(false)">
          &times;
        </button>
        <img src="@/assets/chat/svg/info.svg" class="header-icon" width="20" />
        <img src="@/assets/chat/svg/img_nav_87.svg" class="header-icon ml-2" width="20" />

        <div class="custom-dropdown ml-auto">
          <div class="selected-item" @click="isDropdownOpen = !isDropdownOpen">
            <span>{{ selectedItem }}</span>
            <span class="dropdown-arrow">▼</span>
          </div>
          <ul v-if="isDropdownOpen" class="dropdown-list">
            <li v-for="(item, i) in sportItems" :key="i" @click="handleDropdown(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="chat-messages-list">
      <ul>
        <li v-for="(messageItem, j) in messages" :key="j">
          <div :class="['chat-item', messageItem.type]">
            <div class="chat-avatar">
              <img
                src="@/assets/chat/image/ellipse.png"
                :class="messageItem.type === 'sender' ? 'sender-ellipse' : ''"
              />
              <img
                :src="messageItem.avatar"
                :class="messageItem.type === 'sender' ? 'sender-avatar' : 'user-avatar'"
              />
              <p
                :class="[
                  messageItem.type === 'sender' ? 'sender-grade-position' : 'grade-position',
                  messageItem.gradeColor,
                ]"
              >
                {{ messageItem.grade }}
              </p>
              <img
                :src="messageItem.gradeBackground"
                :class="
                  messageItem.type === 'sender' ? 'sender-grade-background' : 'grade-background'
                "
              />
              <img
                v-for="(star, k) in messageItem.starLevel"
                :key="k"
                :src="star"
                :class="[
                  messageItem.type === 'sender'
                    ? `sender-star-level-${k + 1}`
                    : `star-level-${k + 1}`,
                ]"
              />
            </div>
            <div :class="messageItem.type === 'sender' ? 'sender-content' : 'chat-content'">
              <div :class="messageItem.type === 'sender' ? 'sender-name' : 'chat-name'">
                {{ messageItem.sender }}
              </div>
              <div :class="['chat-message-bubble', messageItem.type]">
                <span class="receiver-color" v-if="messageItem.type === 'receiver'"
                  >@{{ messageItem.receiver }}</span
                >
                <span>{{ messageItem.message }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer">
      <input type="text" placeholder="Your message" class="chat-input" />
      <img src="@/assets/public/svg/icon_public_51.svg" class="emoticon-icon" />
      <button class="send-button">&#8593;</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Base styles for the sidebar */
.right-sidebar {
  position: fixed;
  top: 0;
  right: -340px; /* Start off-screen */
  width: 340px;
  height: 80%;
  background-color: #080b2a;
  color: #fff;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.25);
  transition: right 0.3s ease; /* Animation for sliding in/out */
  z-index: 1000; /* Ensure it's above other content */
  display: flex;
  flex-direction: column;
}

/* Class to open the sidebar */
.right-sidebar.open {
  right: 0;
}

/* Adjust padding for mobile when open */
.right-sidebar.open.mobile-padding-bottom {
  padding-bottom: 6px; /* Adjust based on your mobile navbar height */
}

/* Header styles */
.sidebar-header {
  background-color: #5634ae;
  border-radius: 0 0 32px 32px;
  padding: 12px;
  flex-shrink: 0; /* Prevent header from shrinking */
}

.header-top-row {
  display: flex;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  padding: 0;
  width: 24px; /* Make button clickable area reasonable */
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-icon {
  margin-left: 8px; /* Space between icons */
}

/* Custom Dropdown Styles */
.custom-dropdown {
  position: relative;
  margin-left: auto;
  background-color: #29263c;
  border-radius: 4px;
  cursor: pointer;
}

.selected-item {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
}

.dropdown-arrow {
  margin-left: 4px;
  font-size: 0.8em;
}

.dropdown-list {
  position: absolute;
  top: 100%; /* Position below the selected item */
  left: 0;
  right: 0;
  background-color: #151740;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Ensure dropdown is above other content */
}

.dropdown-list li {
  padding: 8px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-list li:hover {
  background-color: #151740;
}

/* Chat Messages Area */
.chat-messages-list {
  flex-grow: 1; /* Allow message list to take up available space */
  overflow-y: auto; /* Enable scrolling for messages */
  padding: 10px;
}

.chat-messages-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-messages-list li {
  margin-bottom: 10px; /* Space between messages */
}

/* Chat Item Layout (Receiver and Sender) */
.chat-item {
  display: flex;
  position: relative;
  min-height: 86px; /* Ensure space for avatar and stars */
}

.chat-item.receiver {
  justify-content: flex-start; /* Align receiver messages to the left */
}

.chat-item.sender {
  justify-content: flex-end; /* Align sender messages to the right */
  flex-direction: row-reverse; /* Reverse order for sender layout */
}

/* Avatar and Grade Positioning */
.chat-avatar {
  position: relative;
  width: 60px; /* Adjust width to contain avatar, grade, and stars */
  flex-shrink: 0; /* Prevent avatar area from shrinking */
}

.chat-item.receiver .chat-avatar {
  margin-right: 10px; /* Space between avatar and message bubble */
}

.chat-item.sender .chat-avatar {
  margin-left: 10px; /* Space between avatar and message bubble */
}

.user-avatar,
.sender-avatar {
  position: absolute;
  width: 44px;
  border-radius: 50%; /* Make avatars round if they are not already */
}

.chat-item.receiver .user-avatar {
  top: 9px;
  left: 9px;
}

.chat-item.sender .sender-avatar {
  top: 9px;
  right: 9px;
}

.grade-background,
.sender-grade-background {
  position: absolute;
  width: 44px; /* Adjust size if needed */
}

.chat-item.receiver .grade-background {
  top: 39px;
  left: 8px;
}

.chat-item.sender .sender-grade-background {
  top: 39px;
  right: 2px;
}

.grade-position,
.sender-grade-position {
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 12px;
}

.chat-item.receiver .grade-position {
  top: 43px;
  left: 21px;
}

.chat-item.sender .sender-grade-position {
  top: 43px;
  right: 21px;
}

.grade-color-white {
  color: #ffffff;
}

.grade-color-black {
  color: #000000;
}

/* Star Level Positioning */
.star-level-1,
.star-level-2,
.star-level-3,
.star-level-4,
.star-level-5,
.sender-star-level-1,
.sender-star-level-2,
.sender-star-level-3,
.sender-star-level-4,
.sender-star-level-5 {
  position: absolute;
  top: 63px;
  width: 12px; /* Adjust star size if needed */
  height: 12px;
}

.chat-item.receiver .star-level-1 {
  left: 0px;
}
.chat-item.receiver .star-level-2 {
  left: 12px;
}
.chat-item.receiver .star-level-3 {
  left: 24px;
}
.chat-item.receiver .star-level-4 {
  left: 36px;
}
.chat-item.receiver .star-level-5 {
  left: 48px;
}

.chat-item.sender .sender-star-level-1 {
  right: 48px;
}
.chat-item.sender .sender-star-level-2 {
  right: 36px;
}
.chat-item.sender .sender-star-level-3 {
  right: 24px;
}
.chat-item.sender .sender-star-level-4 {
  right: 12px;
}
.chat-item.sender .sender-star-level-5 {
  right: 0px;
}

/* Chat Content (Message Bubble and Name) */
.chat-content,
.sender-content {
  flex-grow: 1; /* Allow content to take available space */
  min-width: 166px; /* Minimum width for the message bubble area */
  display: flex;
  flex-direction: column;
}

.chat-item.sender .sender-content {
  align-items: flex-end; /* Align sender content to the right */
}

.chat-name,
.sender-name {
  font-weight: 600;
  font-size: 14px;
  margin-top: 12px; /* Space above name */
  margin-bottom: 4px; /* Space below name */
}

.sender-name {
  text-align: right;
}

/* Message Bubble Styling */
.chat-message-bubble {
  padding: 8px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  word-break: break-word; /* Break long words */
  max-width: 100%; /* Prevent bubble from exceeding container width */
}

.chat-message-bubble.receiver {
  background-color: #151740;
  color: #fff;
  border-bottom-left-radius: 0; /* Adjust corner for bubble shape */
  box-shadow: 0px 3px 2px 1px rgba(0, 0, 0, 0.11);
}

.chat-message-bubble.sender {
  background-color: #12ff76;
  color: #151740;
  border-bottom-right-radius: 0; /* Adjust corner for bubble shape */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.receiver-color {
  color: #01983a;
  margin-right: 4px;
}

/* Footer (Input Area) */
.sidebar-footer {
  padding: 5px;
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Prevent footer from shrinking */
  background-color: #5634ae; /* Match sidebar background */
}

.chat-input {
  flex-grow: 1; /* Allow input to take available space */
  padding: 8px 12px;
  border: none;
  border-radius: 20px; /* Rounded input field */
  background-color: #151740; /* Darker background for input */
  color: #ffffff; /* White text color */
  font-size: 14px;
  margin-right: 8px; /* Space between input and emoticon */
  outline: none; /* Remove default outline */
}

.chat-input::placeholder {
  color: #fff; /* Placeholder color */
}

.emoticon-icon {
  width: 20px; /* Adjust size if needed */
  height: 20px;
  cursor: pointer;
  margin-right: 8px; /* Space between emoticon and send button */
}

.send-button {
  background-color: #32cfec; /* Blue background */
  color: #000000; /* Black arrow color */
  border: none;
  border-radius: 50%; /* Circular button */
  width: 32px; /* Button size */
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px; /* Arrow size */
  cursor: pointer;
  flex-shrink: 0; /* Prevent button from shrinking */
}
</style>
