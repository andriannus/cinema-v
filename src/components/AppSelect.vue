<script setup lang="ts">
import { useState } from "#app";

type AppSelectProps = {
  options: { label: string; value: string }[];
};

type AppSelectEmits = {
  (e: "change", value: string): void;
};

const { options } = defineProps<AppSelectProps>();
const emit = defineEmits<AppSelectEmits>();

const value = useState("value", () => "");
</script>

<template>
  <select
    v-model="value"
    class="Select"
    @change="emit('change', value)"
  >
    <option value="">
      Select here...
    </option>

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.Select {
  appearance: none;
  background-color: rgba(224, 224, 224, 0.13);
  border-radius: 4px;
  display: block;
  font-size: 14px;
  padding: 8px 16px;
  width: 100%;
}
</style>
