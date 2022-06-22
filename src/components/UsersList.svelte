<script>
    import {slide} from 'svelte/transition';
    import UserItem from "./UserItem.svelte";
    import {players, selectedChat, unreadPlayers} from "../data/chatStore.js";

    let filterValue = ""
    const onFilterInput = (e) => {
        filterValue = e.currentTarget.value
    }

    $: filteredPLayers = $players
        .map(player => ({...player, fname: player.name.toLowerCase()}))
        .filter(player => player?.fname?.includes(filterValue.toLowerCase()))

    const onPlayerClick = ({detail: chatName}) => {
        selectedChat.set(chatName)
    }
</script>

<input type="text" bind:value={filterValue} placeholder="Find player" class="input filter-input"
       on:input={onFilterInput}>

<UserItem
        isChannel={true}
        on:click={() => onPlayerClick({detail: "public_channel"})}
        isActive="{'public_channel' === $selectedChat}"
>
  <div class="channel">
    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.75 7.47461V9.52539H20.9004V7.47461H16.75ZM14.6504 14.3594C15.1712 14.7174 15.7246 15.1243 16.3105 15.5801C16.929 16.0358 17.4987 16.459 18.0195 16.8496C18.2148 16.5566 18.4102 16.2799 18.6055 16.0195C18.8333 15.7266 19.0449 15.4499 19.2402 15.1895C18.7194 14.7988 18.1497 14.3757 17.5312 13.9199C16.9453 13.4642 16.4082 13.041 15.9199 12.6504C15.7246 12.9434 15.513 13.2363 15.2852 13.5293C15.0898 13.7897 14.8783 14.0664 14.6504 14.3594ZM19.2402 1.81055C19.0449 1.55013 18.8333 1.28971 18.6055 1.0293C18.4102 0.736328 18.2148 0.443359 18.0195 0.150391C17.4987 0.541016 16.929 0.964193 16.3105 1.41992C15.7246 1.87565 15.1712 2.29883 14.6504 2.68945C14.8783 2.94987 15.0898 3.22656 15.2852 3.51953C15.513 3.77995 15.7246 4.05664 15.9199 4.34961C16.4082 3.95898 16.9453 3.53581 17.5312 3.08008C18.1497 2.62435 18.7194 2.20117 19.2402 1.81055ZM2.15039 5.375C1.59701 5.375 1.10872 5.58659 0.685547 6.00977C0.294922 6.40039 0.0996094 6.88867 0.0996094 7.47461V9.52539C0.0996094 10.1113 0.294922 10.6159 0.685547 11.0391C1.10872 11.4297 1.59701 11.625 2.15039 11.625H3.22461V15.7754H5.27539V11.625H6.34961L11.5254 14.75V2.25L6.34961 5.375H2.15039ZM14.1621 8.5C14.1621 7.81641 14.0156 7.18164 13.7227 6.5957C13.4297 5.97721 13.0553 5.45638 12.5996 5.0332V11.9668C13.0553 11.5436 13.4297 11.0391 13.7227 10.4531C14.0156 9.83464 14.1621 9.18359 14.1621 8.5Z"
            fill="white"/>
    </svg>
    <div class="content">
      <p class="header">Public channel</p>
      <p class="caption">News and important info</p>
    </div>
  </div>
</UserItem>

{#if (filteredPLayers.length)}
  <div class="users__wrapper" transition:slide>
    <div class="users">
      {#each filteredPLayers as {name}, index (index)}
        <UserItem
                on:click={onPlayerClick}
                name="{name}"
                isActive="{name === $selectedChat}"
                isUnread={$unreadPlayers.includes(name.trim())}
                isLastUser={index === (filteredPLayers.length - 1)}
        >
          {name}
        </UserItem>
      {/each}
    </div>

    <div class="users-tint">
    </div>
  </div>
{:else }
  <div class="not-players-found" transition:slide>
    Not found
    <p>
      We can't find any player with specified filter
    </p>
  </div>
{/if}

<style>
    .bottom-tint {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: linear-gradient(0deg, #1A0D1E 11.7%, rgba(26, 13, 30, 0) 100%);
    }

    :global(.input) {
        display: inline-block;
        padding: 12px 16px;
        font-size: 16px;
        border: none;
        outline: none;
        border-radius: 8px;
        transition: all .3s ease;
        background: #DDDDDD;
    }

    :global(.input:focus) {
        box-shadow: 0 0 0 3px #559dd1;
    }

    .filter-input {
        margin-bottom: 24px;
    }

    .channel {
        display: flex;
        cursor: pointer;
        transition: all .3s ease;
    }

    .channel:hover {
        color: #b9b9b9
    }

    .channel svg {
        margin-right: 8px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .channel .header {
        font-style: normal;
        font-weight: 450;
        font-size: 15px;
        margin: 0;
    }

    .channel .caption {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
    }

    .not-players-found {
        margin-top: 20px;
    }

    .not-players-found {
        text-align: center;
        font-size: 20px;
    }

    .not-players-found p {
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 0;
    }

    .users__wrapper {
        height: 55%;
        position: relative;
        overflow: hidden;
    }

    .users {
        overflow: auto;
        height: 100%;
    }

    .users::-webkit-scrollbar {
        width: 6px;
    }

    .users::-webkit-scrollbar-track {
        background-color: rgba(137, 137, 137, 0.25);;
        border-radius: 100px;
    }

    .users::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100px;
    }

    .users-tint {
        position: absolute;
        height: 40px;
        background: linear-gradient(transparent, rgb(28, 58, 101));
        width: 100%;
        bottom: 0;
    }
</style>
