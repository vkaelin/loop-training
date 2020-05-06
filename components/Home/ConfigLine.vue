<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <div
        class="flex items-center justify-center w-6 h-6 bg-gray-800 border border-indigo-500 rounded-full"
      >
        {{ index }}
      </div>
      <div class="ml-2">
        <slot />
      </div>
    </div>
    <input
      @input="$emit('input', Number($event.target.value))"
      :value="value"
      class="w-16 py-1 ml-6 leading-3 text-center bg-gray-700 border border-indigo-500 rounded-md focus:outline-none focus:bg-gray-800"
      type="number"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
