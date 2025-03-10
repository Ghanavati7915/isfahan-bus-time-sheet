<template>
  <Html dir="rtl" lang="fa" class="Estedad_FD w-screen select-none">

  <UApp>
    <div class="bg-(--ui-bg)" vaul-drawer-wrapper>
      <NuxtPage />
    </div>
  </UApp>

  </Html>
</template>

<style>
html {
  overflow-x: hidden !important;
  overscroll-behavior: none;
}


.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>