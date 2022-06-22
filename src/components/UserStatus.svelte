<script>
  export let isOnline
</script>


<div class="user-status">
  <div class="indicator" class:online={isOnline}>
  </div>
  <div class="word">
    {#if isOnline}
      online
    {:else}
      offline
    {/if}
  </div>
</div>

<style>
  .user-status {
      display: flex;
  }

  .word, .indicator {
      margin-top: auto;
      margin-bottom: auto;
  }

  .indicator {
      width: 8px;
      height: 8px;
      border-radius: 100px;
      margin-right: 6px;
      background: #ff5b58;
  }

  .indicator.online {
      background: #4DDC40;
  }

  .word {
      line-height: 1;
      font-size: 12px;
  }
</style>
