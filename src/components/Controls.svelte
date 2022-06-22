<script>
    import UserStatus from "./UserStatus.svelte";
    import {currentPlayerName, currentPlayerSound, currentPlayerWriteStatus} from "../data/chatStore.js";
    import {mtaEventTrigger} from "../../util.js";

    $: onChangeWriteMe = () => {
        mtaEventTrigger("onWriteStatusChange", $currentPlayerWriteStatus + "")
    }

    $: onChangeSound = () => {
        mtaEventTrigger("onSoundChange", $currentPlayerSound + "")
    }
</script>

<div class="current-user">
  <span class="user-name">
    {$currentPlayerName}
  </span>
  <UserStatus isOnline={true}/>
</div>

<div class="no-write">
  <input type="checkbox" name="no_write" bind:checked={$currentPlayerWriteStatus} on:change={onChangeWriteMe}
         id="no_write">
  <label for="no_write">
    <div class="checkbox">
      <div class="mark">
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4L4.04348 8L11 1" stroke="#2f99d5" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <span>disallow write</span>
  </label>

  <div class="no-write-help">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="white"/>
        <path d="M8.288 9.144V9.696H7.448V8.976C7.448 8.568 7.528 8.232 7.688 7.968C7.856 7.696 8.096 7.424 8.408 7.152L8.744 6.852C9.208 6.476 9.44 6.032 9.44 5.52C9.44 5.08 9.296 4.736 9.008 4.488C8.728 4.232 8.372 4.104 7.94 4.104C7.524 4.104 7.176 4.236 6.896 4.5C6.624 4.756 6.456 5.092 6.392 5.508L5.576 5.364C5.696 4.748 5.972 4.26 6.404 3.9C6.836 3.54 7.36 3.36 7.976 3.36C8.64 3.36 9.192 3.548 9.632 3.924C10.08 4.3 10.304 4.816 10.304 5.472C10.304 5.8 10.248 6.092 10.136 6.348C10.024 6.604 9.904 6.8 9.776 6.936C9.648 7.072 9.456 7.244 9.2 7.452C8.84 7.748 8.596 8 8.468 8.208C8.348 8.416 8.288 8.728 8.288 9.144ZM8.408 10.968C8.536 11.096 8.6 11.248 8.6 11.424C8.6 11.6 8.536 11.752 8.408 11.88C8.288 12.008 8.136 12.072 7.952 12.072C7.768 12.072 7.612 12.008 7.484 11.88C7.364 11.752 7.304 11.6 7.304 11.424C7.304 11.248 7.364 11.096 7.484 10.968C7.612 10.84 7.768 10.776 7.952 10.776C8.136 10.776 8.288 10.84 8.408 10.968Z"
              fill="white"/>
      </g>
    </svg>

    <div class="help-bubble">
      <svg width="161" height="63" viewBox="0 0 161 63" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M161 8C161 3.58172 157.418 0 153 0H11C6.58172 0 3 3.58173 3 8.00001V43.8867C3 44.3468 2.9603 44.8061 2.88136 45.2594L0.0154095 61.7145C-0.114697 62.4615 0.601454 63.0759 1.32 62.8337L17.3834 57.4191C18.2068 57.1416 19.0699 57 19.9388 57H153C157.418 57 161 53.4183 161 49V8Z"
              fill="black" fill-opacity="0.7"/>

        <text color="white" fill="white" y="25" x="12" style="font-size: 12px">
          When checked - you will
        </text>
        <text color="white" fill="white" y="40" x="12" style="font-size: 12px">
          not receive any message
        </text>
      </svg>
    </div>
  </div>
</div>

<div class="no-write">
  <input type="checkbox" name="no_sound" bind:checked={$currentPlayerSound} on:change={onChangeSound}
         id="no_sound">
  <label for="no_sound">
    <div class="checkbox">
      <div class="mark">
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4L4.04348 8L11 1" stroke="#2f99d5" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <span>turn on sounds</span>
  </label>
</div>


<style>
    .current-user {
        margin-top: auto;
    }

    .user-name {
        font-size: 18px;
        font-weight: 600;
    }

    .no-write {
        margin-top: 12px;
        display: flex;
    }

    .no-write * {
        margin-top: auto;
        margin-bottom: auto;
    }

    .no-write input {
        margin-left: 0;
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    .no-write .checkbox {
        border-radius: 4px;
        background: #DDDDDD;
        height: 16px;
        margin-right: 8px;
        width: 16px;
    }

    .no-write .checkbox .mark {
        opacity: 0;
        margin-left: 2px;
        margin-top: -1px;
        transition: opacity .2s ease;
    }

    .no-write input:checked + label .checkbox .mark {
        opacity: 1;
    }

    .no-write label {
        font-size: 14px;
        user-select: none;
        display: flex;
    }

    .no-write-help {
        display: flex;
        cursor: pointer;
        margin-left: 8px;
        align-items: center;
        position: relative;
    }

    .help-bubble {
        position: absolute;
        top: -70px;
        opacity: 0;
        right: -155px;
        pointer-events: none;
        transition: opacity .3s ease;
    }

    .no-write-help:hover .help-bubble {
        opacity: 1;
        z-index: 3;
    }
</style>
