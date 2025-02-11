<template>
  <footer class="Footer flex justify-center">
    <div class="Footer-layout items-center flex flex-row justify-center">
      <span>&copy; MoovieTime. All rights reserved</span>

      <div class="flex justify-center">
        <picture class="Footer-logo block">
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
  background-color: rgba(0, 0, 0, 0.29);
  color: #929292;
  padding: 64px 0;
}

.Footer-layout {
  height: 32px;
  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}

.Footer-layout * {
  width: 100%;
}

.Footer-layout :last-child {
  text-align: right;
}

.Footer-logo {
  width: 88px;
}
</style>
