<template>
  <div class="Search">
    <nuxt-icon
      name="movie"
      class="Search-icon"
    />

    <input
      class="Search-input"
      placeholder="Find movie"
      type="text"
    >

    <nuxt-icon
      name="search"
      class="Search-icon"
    />
  </div>
</template>

<style scoped>
.Search {
  @apply flex items-center;

  background-color: rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  margin: 0 42px;
  padding: 8px 12px;
  width: 571px;
}

.Search-input {
  @apply w-full;

  padding: 0 12px;
}

.Search-input::placeholder {
  color: rgba(229, 229, 229, 1);
}

.Search-icon {
  @apply flex h-full w-full;

  color: #ffffff;
  width: 20px;
  height: 20px;
}

.Search-icon :deep(svg) {
  @apply h-full w-full;
}
</style>
