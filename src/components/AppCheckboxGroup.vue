<script setup lang="ts">
import { useState } from "#app";

type AppCheckboxGroupProps = {
  options: { label: string; value: string }[];
};

type AppCheckboxGroupEmits = {
  (e: "change", value: string[]): void;
};

const { options } = defineProps<AppCheckboxGroupProps>();
const emit = defineEmits<AppCheckboxGroupEmits>();

const checkedOptions = useState("checkedOptions", () => []);
</script>

<template>
  <label
    v-for="option in options"
    :key="option.value"
    :for="option.value"
    class="Checkbox flex text-sm items-center mb-4"
  >
    <span class="cursor-pointer grow">{{ option.label }}</span>

    <input
      :id="option.value"
      v-model="checkedOptions"
      :value="option.value"
      type="checkbox"
      @change="emit('change', checkedOptions)"
    >

    <span class="Checkbox-mark" />
  </label>
</template>

<style scoped>
.Checkbox {
  position: relative;
}

.Checkbox input {
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.Checkbox-mark {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  height: 15px;
  position: relative;
  right: 0;
  top: 0;
  width: 15px;
}

.Checkbox-mark:after {
  content: "✓";
  display: none;
  height: 16px;
  position: absolute;
  right: -4px;
  top: -4px;
  width: 16px;
}

.Checkbox input:checked ~ .Checkbox-mark {
  background-color: #e74c3c;
  border-color: rgba(255, 255, 255, 0.5);
}

.Checkbox input:checked ~ .Checkbox-mark:after {
  display: block;
}
</style>
