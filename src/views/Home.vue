<template>
  <div>
    <p>여기는 메인 페이지</p>
    {{ JSON.stringify($store.state.claims, null, 2) }}
  </div>
</template>

<script>
export default {
  components: {}
};
</script>
