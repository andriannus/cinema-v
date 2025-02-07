<template>
  <nav class="Navbar">
    <div class="Navbar-layout">
      <NuxtLink
        class="Navbar-brand"
        to="/"
      >
        <picture>
          <source
            srcset="~/assets/images/logo.png"
            type="image/png"
          >

          <source
            srcset="~/assets/images/logo.webp"
            type="image/webp"
          >

          <img
            src="~/assets/images/logo.png"
            alt="Logo"
          >
        </picture>
      </NuxtLink>

      <AppSearch />

      <ul class="Navbar-nav">
        <li class="Nav-link">
          <nuxt-icon
            name="grid"
            class="Nav-icon"
          />

          <span>Categories</span>
        </li>

        <li class="Nav-link">
          Movies
        </li>

        <li class="Nav-link">
          TV Shows
        </li>

        <li class="Nav-link">
          Login
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.Navbar {
  @apply flex h-full items-center justify-center;

  background-color: rgba(255, 255, 255, 0.05);
  height: 66px;
}

.Navbar-layout {
  @apply flex;

  max-width: 1280px;
}

.Navbar-nav {
  @apply flex;
}

.Navbar-brand {
  @apply cursor-pointer inline-flex;

  max-width: calc(112px + 32px);
  padding: 8px 16px;
}

.Nav-link {
  @apply flex cursor-pointer items-center uppercase;

  color: #e5e5e5;
  font-weight: 500;
  padding: 8px 16px;
}

.Nav-icon {
  @apply flex h-full w-full;

  height: 20px;
  margin-right: 10px;
  width: 20px;
}

.Nav-icon :deep(svg) {
  @apply h-full w-full;
}
</style>
