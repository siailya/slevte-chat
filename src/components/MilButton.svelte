<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    export let disabled = false;
</script>

<button on:click={() => dispatch("click")} class="mil-btn" disabled={disabled}>
  <svg width="100%" height="100%" fill="none" style="overflow: visible" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" rx="10" stroke="url(#paint0_linear_5_54)" stroke-width="3"/>
    <defs>
      <linearGradient id="paint0_linear_5_54" x1="5.47956e-08" y1="18.7403" x2="171" y2="18.7403" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2f99d5"/>
        <stop offset="1" stop-color="#0b429e"/>
      </linearGradient>
    </defs>
  </svg>
  <div class="background"></div>
  <div class="content">
    <slot/>
  </div>
</button>

<style>
  .mil-btn {
      cursor: pointer;
      position: relative;
      background: none;
      border: none;
      padding: 10px 24px;
      outline: none;
      font-size: 16px;
      color: white;
      border-radius: 10px;
  }

  .mil-btn:disabled {
      opacity: 0.8;
      filter: grayscale(1);
      cursor: default;
  }

  .mil-btn svg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
  }

  .mil-btn .background {
      position: absolute;
      left: 0;
      opacity: 0;
      top: 0;
      transition: opacity .3s ease;
      right: 0;
      bottom: 0;
      background: linear-gradient(270deg, rgba(24, 74, 114, 0.3) 0%, rgba(36, 159, 187, 0.3) 100%);
      border-radius: 10px;
  }

  .mil-btn:not(:disabled):hover .background {
      opacity: 1;
  }

  .content {
      position: relative;
      z-index: 2;
  }
</style>
