<script lang="ts">
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css";

  import { onMount } from "svelte";
  import { originalImage, imageStatus, modifiedImage } from "./store";
  import { ImageStatus } from "../types.d";
  import { Cloudinary } from "@cloudinary/url-gen/index";
  import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";

  const cld = new Cloudinary({
    cloud: {
      cloudName: "tathata",
    },
    url: {
      secure: true,
    },
  });

  onMount(() => {
    const dropzone = new Dropzone("#dropzone", {
      maxFiles: 1,
      uploadMultiple: false,
      acceptedFiles: ".jpg, .jpeg, .png, .webp",
    });

    dropzone.on(
      "sending",
      function (
        file: any,
        xhr: any,
        data: { append: (arg0: string, arg1: string | number) => void }
      ) {
        imageStatus.update(() => ImageStatus.UPLOADING);

        data.append("upload_preset", "byxvhwn4");
        data.append("timestamp", Date.now() / 1000);
        data.append("api_key", "");
      }
    );

    dropzone.on("success", function (file: any, response: any) {
      const imageWithBackground = cld
        .image(response.public_id)
        .effect(backgroundRemoval());

      imageStatus.update(() => ImageStatus.DONE);
      originalImage.update(() => response.secure_url);
      modifiedImage.update(() => imageWithBackground.toURL());
    });

    dropzone.on("error", function (file: any, response: any) {
      console.log("error", file);
    });
  });
</script>

<form
  id="dropzone"
  class="relative shadow-2xl border-dashed border-2 border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col"
  action="https://api.cloudinary.com/v1_1/tathata/image/upload"
>
  {#if $imageStatus === ImageStatus.READY}
    <button
      class="pointer-events-none bg-blue-600 rounded-full font-bold text-white text-xl px-6 py-4"
    >
      Upload image
    </button>
    <p class="text-gray-500 mt-4">Drop image here or click to upload.</p>
  {/if}
  {#if $imageStatus === ImageStatus.UPLOADING}
    <div
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-50"
    >
      <div
        class="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
      />
    </div>
  {/if}
</form>
