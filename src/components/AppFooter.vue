<template>
  <footer class="Footer">
    <div class="Footer-layout">
      <span>&copy; MoovieTime. All rights reserved</span>

      <div class="Footer-logo">
        <picture class="Footer-logoImg">
          <source
            srcset="~/assets/images/logo-gray.png"
            type="image/png"
          >

          <source
            srcset="~/assets/images/logo-gray.webp"
            type="image/webp"
          >

          <img
            src="~/assets/images/logo-gray.png"
            alt="Logo"
          >
        </picture>
      </div>

      <span>Made with Nuxt 3</span>
    </div>
  </footer>
</template>

<style scoped>
.Footer {
  @apply flex justify-center;

  background-color: rgba(0, 0, 0, 0.29);
  color: #929292;
  padding: 64px 0;
}

.Footer-layout {
  @apply items-center flex flex-row justify-center;

  height: 32px;
  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}

.Footer-layout * {
  @apply w-full;
}

.Footer-layout :last-child {
  @apply text-right;
}

.Footer-logo {
  @apply flex justify-center;
}

.Footer-logoImg {
  @apply block;

  width: 88px;
}
</style>
