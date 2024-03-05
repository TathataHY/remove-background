<script lang="ts">
  import "two-up-element";
  import { modifiedImage, originalImage } from "./store";

  let processingImage = true;
  let tries = 0;
  let interval: any;

  $: {
    if (processingImage) {
      clearInterval(interval);
      interval = setInterval(() => {
        tries++;

        const img = new Image();
        img.src = $modifiedImage;
        img.onload = () => {
          processingImage = false;
          clearInterval(interval);
        };
      }, 500);
    }
  }
</script>

<two-up>
  <img src={$originalImage} alt="To remove background" />
  {#if processingImage}
    <div class="flex flex-col justify-center items-center">
      <p class="text-center">Removing background...</p>
    </div>
  {:else}
    <img src={$modifiedImage} alt="Modified" />
  {/if}
</two-up>

<a
  download
  href={$modifiedImage}
  target="_blank"
  class="block bg-blue-500 hover:bg-blue-700 text-xl text-center w-full font-bold text-white rounded-full px-4 py-2 mt-10"
  >Download image without background</a
>
