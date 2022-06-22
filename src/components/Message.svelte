<script>
    import {fade} from "svelte/transition"

    export let isIncoming
    export let name
    export let datetime
    export let isRead = false;
    export let text
</script>

<div class="message" in:fade class:incoming={isIncoming}>
  <svg class="tail" width="23" height="25.5" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24.5C0 24.5 13 16.5 13 0L22.9999 24.5H0Z" fill="{isIncoming ? '#2f98d3' : '#196499'}"/>
  </svg>

  <div class="content">
    <div class="name">
      {name}
    </div>

    <div class="info">
      <div class="datetime">{datetime}</div>
      <div class="divider">·</div>
      <div class="read-status">{isRead ? '' : 'not '}read</div>
    </div>
  </div>

  <div class="text">
    {@html text}
  </div>
</div>


<style>
    .message {
        padding: 8px;
        max-width: 380px;
        position: relative;
        border-radius: 8px;
        margin-right: auto;
        background: linear-gradient(93.75deg, #196499 19.24%, #102178 85.66%);
        margin-bottom: 16px;
    }

    .message.incoming {
        background: linear-gradient(45.72deg, #2f98d3 17.43%, #14569e 66.78%);;
    }

    .message .tail {
        position: absolute;
        left: -12px;
        bottom: -1px;
    }

    .content {
        display: flex;
    }

    .content .name {
        font-size: 14px;
        font-weight: 500;
        margin-right: auto;
    }

    .content .info {
        display: flex;
        font-size: 12px;
        margin-top: auto;
        margin-left: 24px;
        opacity: .7;
    }

    .content .read-views {
        display: flex;
    }

    .content .read-views span, .content .read-views svg {
        margin-top: auto;
        margin-bottom: auto;
    }


    .content .info .divider {
        margin-left: 4px;
        margin-right: 4px;
        font-weight: 800;
    }

    .message .text {
        margin-top: 6px;
        word-break: break-word;
    }
</style>
