<template>
  <header class="w-full">
    <nav class="flex w-full justify-around">
      <div>Vue</div>
      <ul class="flex justify-around gap-4">
        <NuxtLink to="/">
          <li>Employee</li>
        </NuxtLink>
        <NuxtLink to="/contact">
          <li>Contact</li>
        </NuxtLink>
      </ul>
    </nav>
  </header>

  <slot />
</template>

<script setup></script>
