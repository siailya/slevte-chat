<script>
    import ChatArea from "./components/ChatArea.svelte";
    import ControlArea from "./components/ControlArea.svelte";
    import EventListeners from "./data/EventListeners.svelte";
    import {mtaEventTrigger} from "../util.js";
    import {selectedChat, unreadPlayers} from "./data/chatStore.js"
    import {fade, fly} from "svelte/transition";
    import {onMount} from "svelte";

    let isChatVisible = false

    const onCLoseBtnClick = () => {
        mtaEventTrigger("onCloseChat")
    }

    onMount(() => {
        // Mockup open chat
        // In real application uses "showChat" event
        setTimeout(() => {
            isChatVisible = true
        }, 200)
    })

    window.addEventListener("showChat", () => {
        isChatVisible = true

        if ($unreadPlayers.length) {
            selectedChat.set($unreadPlayers[0])
        }
    })

    window.addEventListener("hideChat", () => {
        onCLoseBtnClick()
        isChatVisible = false
    })
</script>

<EventListeners/>

{#if (isChatVisible)}
  <main transition:fade>
    <div class="chat-window" transition:fly={{y: 150}}>
      <button class="close-btn" on:click={onCLoseBtnClick}>
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.707107" y1="1" x2="7.33914" y2="7.63204" stroke="white" stroke-linecap="round"/>
          <line x1="7.33484" y1="0.940505" x2="0.707105" y2="7.56824" stroke="white" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="container">
        <div class="chat-header__wrapper">
          <span class="created-caption">Designed and created by siailya & AlexMaronov</span>
          <h2 class="chat-header">Svelte`s messenger</h2>
        </div>

        <div class="main-layout">
          <section class="control-area">
            <ControlArea/>
          </section>
          <section class="chat-area">
            <ChatArea/>
          </section>
        </div>

      </div>

      <div class="background">
        <div class="background-cover"></div>
      </div>
    </div>
  </main>
{/if}

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    transition: all 1s ease;
    background: rgba(0, 0, 0, .4);
    z-index: -3;
  }

  .chat-window {
    z-index: 2;
    position: relative;
    width: 1020px;
    height: 600px;
    transition: all 1s ease;
    left: calc((100% - 1020px) / 2);
    top: calc((100% - 600px) / 2);
  }

  .close-btn {
    position: absolute;
    right: -30px;
    top: 0;
    border: 0;
    outline: 0;
    padding: 0;
    background: rgba(0, 0, 0, .5);
    border-radius: 100px;
    width: 18px;
    height: 18px;
    display: flex;
    z-index: 4;
    cursor: pointer;
    transition: all .3s ease;
  }

  .close-btn svg {
    margin: auto;
  }

  .close-btn:hover {
    background: rgba(0, 0, 0, 1);
  }

  .background-cover, .background-img {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .background {
    background: white;
  }

  .background, .container, .background-cover, .background-img {
    border-radius: 10px;
    overflow: hidden;
  }

  .background-cover {
    z-index: -1;
    background: linear-gradient(0deg, rgba(35, 84, 111, 0.6), rgba(29, 58, 113, 0.6)), linear-gradient(270deg, rgba(24, 50, 97, 0.8) 6.13%, #152058 71.03%);
  }

  .background-img {
    z-index: -2;
    object-fit: cover;
  }

  .container {
    padding: 0 36px 36px 36px;
    height: calc(100% - 36px);
    position: relative;;
  }

  .chat-header__wrapper {
    position: relative;
  }

  .chat-header {
    font-weight: 450;
    text-align: center;
    margin: 0;
    border-bottom: solid 1px rgba(255, 255, 255, .4);
    padding: 18px 0;
    font-size: 20px;
  }

  .created-caption {
    font-size: 11px;
    position: absolute;
    top: 12px;
    opacity: .7;
  }

  .main-layout {
    display: flex;
    flex: 1 1 auto;
    padding-top: 12px;
    height: 87%;
  }

  .control-area, .chat-area {
    flex: 1 1 auto;
    height: 100%;
  }

  .control-area {
    width: 30%;
    display: flex;
    flex-direction: column;
    padding-right: 16px;
    border-right: solid 1px rgba(255, 255, 255, .4);
  }

  .chat-area {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
