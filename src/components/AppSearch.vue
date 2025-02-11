<template>
  <div class="Search hidden lg:flex items-center rounded-sm">
    <nuxt-icon
      name="movie"
      class="flex h-5 text-white w-5"
    />

    <input
      class="Search-input w-full"
      placeholder="Find movie"
      type="text"
    >

    <nuxt-icon
      name="search"
      class="flex h-5 text-white w-5"
    />
  </div>

  <button class="p-1 mr-3 lg:hidden">
    <nuxt-icon
      name="search"
      class="flex h-5 text-white w-5"
    />
  </button>
</template>

<style scoped>
.Search {
  background-color: rgba(0, 0, 0, 0.13);
  margin: 0 42px;
  padding: 8px 12px;
  width: 571px;
}

.Search-input {
  padding: 0 12px;
}

.Search-input::placeholder {
  color: rgba(229, 229, 229, 1);
}

.nuxt-icon :deep(svg) {
  height: 100%;
  width: 100%;
}
</style>
