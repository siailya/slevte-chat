<script>
    import UserStatus from "./UserStatus.svelte";
    import MilButton from "./MilButton.svelte";
    import Message from "./Message.svelte";
    import {
        currentPlayerName,
        messageInput,
        selectedChat,
        selectedChatMessages,
        selectedChatWriteStatus,
        unreadPlayers
    } from "../data/chatStore.js"
    import {fade, fly, slide} from "svelte/transition"
    import {adsWords, badWords, dispatchMonth, mtaEventTrigger} from "../../util.js";

    let messagesElement;
    let messagesLoading = false;

    const scrollChatDown = (delay = 45, smooth = false) => {
        setTimeout(() => {
            if (!messagesLoading && messagesElement) {
                messagesElement.scrollTo({
                    top: messagesElement.scrollHeight,
                    behavior: smooth ? "smooth" : "auto"
                })
            }
        }, delay)
    }

    const onSelectedChatChange = (newChat) => {
        console.warn("Choose chat: " + newChat + "\nUnreaded chats: ", $unreadPlayers)
        loadMessages()

        if ($unreadPlayers.includes($selectedChat)) {
            console.warn("Remove " + $selectedChat + " from unread list")
            unreadPlayers.update(prev => prev.filter(p => p !== $selectedChat))
        }
    }
    $: onSelectedChatChange($selectedChat)

    let prevMessages = []
    let prevChat = $selectedChat
    selectedChatMessages.subscribe((newMessages) => {
        if ((newMessages.length - prevMessages.length) === 1 && prevChat === $selectedChat) {
            scrollChatDown(0, true)
        } else {
            scrollChatDown(0)
        }

        messagesLoading = false
        prevChat = $selectedChat

        prevMessages = newMessages
    })

    const loadMessages = (silent = false) => {
    // Implementation of loadMessages
    // Removed for confidential

    // if (!silent) {
    //     messagesLoading = true
    // }
    }

    const onMessageSubmit = () => {
        adsWords.forEach(s => {
            let regEx = new RegExp(s, "ig");
            let replace = " [ads] ";

            messageInput.update(prev => prev.replaceAll(regEx, replace))
        })

        badWords.forEach(s => {
            let regEx = new RegExp(s, "ig");
            let replace = " *** ";

            messageInput.update(prev => prev.replaceAll(regEx, replace))
        })

        selectedChatMessages.update(prevMessages => [...prevMessages, {
            datetime: new Date().getTime(),
            from: $currentPlayerName,
            to: $selectedChat,
            text: $messageInput,
            read: false
        }])

        $messageInput = ""
    }

    const onInputKeyDown = (e) => {
        if (e.key === "Enter" && $messageInput) {
            onMessageSubmit()
        }
    }

    const getDateTime = (timestamp) => {
        function paddy(num, padlen, padchar) {
            var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
            var pad = new Array(1 + padlen).join(pad_char);
            return (pad + num).slice(-pad.length);
        }

        const dateObject = new Date(timestamp)

        if (new Date().toLocaleDateString() === dateObject.toLocaleDateString()) {
            return paddy(dateObject.getHours(), 2) + ":" + paddy(dateObject.getMinutes(), 2)
        }
        return dateObject.getDate() + " " + dispatchMonth(dateObject.getMonth()) + ", " + dateObject.getHours() + ":" + dateObject.getMinutes()
    }

    $: canWrite = $selectedChat !== "public_channel" && !$selectedChatWriteStatus
</script>

<div class="chat-header__wrapper">
  <div class="chat-header">
    <div class="interlocutor">
      <div class="name">{$selectedChat}</div>
      <UserStatus isOnline="true"/>
    </div>
  </div>
</div>


{#if (!messagesLoading && ($selectedChatMessages.length > 0))}
  <div class="messages-area" id="messages" bind:this={messagesElement} transition:fade>
    {#each $selectedChatMessages as message, i (message.datetime + i)}
      <Message
              name={message.from}
              text={message.text}
              isIncoming={message.from === $currentPlayerName}
              isRead={message.read}
              datetime={getDateTime(message.datetime)}
      />
    {/each}
  </div>
{:else if ($selectedChatMessages.length === 0 && !messagesLoading)}
  <div class="no-messages" in:fade={{delay: 250}} out:slide>
    У тебя нет переписки с {$selectedChat}. Начнём?
  </div>
{/if}

{#if $selectedChat !== "public_channel"}
  <div class="message-controls" transition:fly={{y: 100}}>
    <input type="text"
           disabled={!canWrite}
           bind:value={$messageInput}
           class="input message-input"
           placeholder="{canWrite ? 'Напиши что-нибудь...' : ($selectedChat + ' запретил сообщения')}"
           on:keydown={onInputKeyDown}
    >
    <MilButton disabled={$messageInput.length === 0} on:click={onMessageSubmit}>
      <div class="d-flex">
    <span class="my-auto">
      Отправить
    </span>
        <svg class="my-auto" style="margin-left: 8px;" width="14" height="13" viewBox="0 0 14 13" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M0.259766 12.125V7.75977L9.63477 6.5L0.259766 5.24023V0.875L13.3848 6.5L0.259766 12.125Z"
                fill="white"/>
        </svg>
      </div>
    </MilButton>
  </div>
{/if}

<style>
    .chat-header__wrapper {
        padding-right: 36px;
        margin-bottom: 16px;
    }

    .chat-header {
        /*background: #1A0D1E;*/
        width: 100%;
        padding-left: 32px;
        padding-top: 16px;
        padding-bottom: 16px;
        display: flex;
        border-radius: 0 15px 15px 0;
    }

    .interlocutor .name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .message-controls {
        padding-top: 16px;
        padding-left: 32px;
        margin-top: auto;
        display: flex;
    }

    .message-input {
        margin-right: 12px;
        width: 100%;
    }

    .message-input:disabled {
        opacity: .8;
    }

    :global(.my-auto) {
        margin-top: auto;
        margin-bottom: auto;
    }

    :global(.d-flex) {
        display: flex;
    }

    .messages-area {
        padding-left: 36px;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .no-messages {
        margin: auto;
    }

    .messages-area::-webkit-scrollbar {
        width: 6px;
        padding-bottom: 6px;
        margin-bottom: 6px;
    }

    .messages-area::-webkit-scrollbar-track {
        background-color: rgba(137, 137, 137, 0.25);;
        border-radius: 100px;
    }

    .messages-area::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100px;
    }
</style>
