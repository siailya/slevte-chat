<script>
    import {createEventDispatcher} from 'svelte';
    import {fade} from 'svelte/transition';

    export let name
    export let isActive = false
    export let isUnread = false
    export let isLastUser = false
    export let isChannel = false

    export let isOnline = false

    const dispatch = createEventDispatcher();

    const onUserClick = () => {
        dispatch("click", name)
    }
</script>

<div class="user-item" transition:fade|local class:last-user={isLastUser} on:click={onUserClick}>
  <div class="status" class:show-status={isActive || isUnread} class:channel={isChannel} class:unread={isUnread}
       class:active={isActive}>
  </div>

  <div class="player">
    <slot></slot>
  </div>
</div>

<style>
    .user-item {
        cursor: pointer;
        display: flex;
        padding-right: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, .4);
        transition: all .3s ease;
    }

    .user-item:hover {
        color: #b9b9b9
    }

    .last-user {
        margin-bottom: 42px;
    }

    .player {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    .status {
        width: 0;
        overflow: hidden;
        transition: all .3s ease;
        margin-right: 0;
    }

    .status.show-status {
        width: 8px;
        margin-right: 8px;
        background: #2f99d5;
    }

    .status.show-status.unread {
        margin-top: auto;
        margin-bottom: auto;
        border-radius: 100px;
    }

    .status.show-status.unread:not(.active) {
        height: 8px;
    }

    .status.show-status.active {
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .status.show-status.active:not(.channel) {
        height: 44px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .status.show-status.active.channel {
        margin-bottom: 0;
        margin-top: 0;
    }
</style>
