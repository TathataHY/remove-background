<script lang="ts">
  import { ImageStatus } from "../types.d";
  import DropEdit from "./DropEdit.svelte";
  import DropUpload from "./DropUpload.svelte";
  import cloudinary from "./assets/cloudinary.svg";
  import { imageStatus } from "./store";
</script>

<body
  class="max-w-xl m-auto grid grid-cols-1 place-content-center w-full h-screen p-4"
>
  <header class="flex justify-center py-10">
    <!-- Contenido del encabezado -->
    <h1 class="text-3xl font-bold text-blue-900 tracking-tighter">
      remove<span class="text-blue-600">background</span>
    </h1>
  </header>

  <nav>
    <!-- Contenido de la barra de navegación -->
  </nav>

  <main>
    <!-- Contenido principal de la página -->
    {#if $imageStatus === ImageStatus.READY || $imageStatus === ImageStatus.UPLOADING}
      <DropUpload />
    {:else if $imageStatus === ImageStatus.DONE}
      <DropEdit />
    {/if}
  </main>

  <footer class="flex justify-center items-center gap-x-2 font-semibold pt-10">
    <!-- Contenido del pie de página -->
    <p>Hecho con</p>
    <a href="https://cloudinary.com" target="_blank" rel="noreferrer">
      <img src={cloudinary} class="w-36" alt="Cloudinary logo" />
    </a>
  </footer>
</body>

<style>
</style>
