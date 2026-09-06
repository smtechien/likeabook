<script lang="ts">
  // your script goes here
  let { children, disabled = false, full = false, ...restProps } = $props();
</script>

<button
  type="button"
  class:w-full={full}
  class="btn-interactive block cursor-pointer border px-4 py-2 text-sm"
  {disabled}
  {...restProps}>{@render children?.()}</button
>

<style lang="postcss">
  @reference 'tailwindcss';

  .btn-interactive {
    @apply transition ease-in-out;

    &:hover:not(:disabled) {
      @apply -translate-y-1;
      @apply bg-gray-100;
    }

    &:active:not(:disabled) {
      @apply translate-y-0;
      @apply scale-95;
      @apply border-blue-500;
      @apply text-blue-500;
    }

    &:disabled {
      @apply cursor-not-allowed bg-gray-200;
      @apply border-gray-600;
      @apply text-gray-600;
    }
  }
</style>
