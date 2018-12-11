<template>
    <div>
        <mt-header class="go-back-header">
            <mt-button icon="back"  slot="left" @click.native="()=>{$router.go(-1)}">返回</mt-button>
        </mt-header>
    </div>
</template>
<style scoped>
#app .go-back-header {
  background: #fff;
  box-shadow: 0 0.0785rem 0.0785rem 0 #f4f4f4;
  color: #333;
  z-index: 999;
  height: 1rem;
}
</style>
