<script setup lang="ts">
import {compile, computed} from "vue";

const props = defineProps<{
  rank: string;
  suit: string;
}>();

const red = computed(() => props.suit === "hearts" || props.suit === "diamonds");
const suitHTMLCharacter = computed(() => {
  if( props.suit === "diamonds" ) {
    return "&diams\;";
  }
  return `&${props.suit.toLowerCase()}\;`;
});
</script>

<template>
  <div class="card" :class="{red}">
    <div class="tl-rank">{{rank}}</div>
    <div class="tl-suit" v-html="suitHTMLCharacter"></div>
    <div class="br-rank">{{rank}}</div>
    <div class="br-suit" v-html="suitHTMLCharacter"></div>
    <div class="m-suit" v-html="suitHTMLCharacter"></div>
  </div>
</template>

<style scoped>
.card {
  display:inline-block;
  margin:10px;
  padding:5px;
  box-shadow:0px 2px 3px 1px #bbb;
  border-radius:5px;

  width:120px;
  height:175px;

}

.tl-rank {
  position:relative;
  top:0px;
  left:0px;
}
.tl-suit {
  position:relative;
  top:-5px;
  left:0px;
}

.m-suit {
  position:relative;
  top:-62px;
  left:38px;
  font-size:60px;
}

.br-rank {
  position:relative;
  top:95px;
  left:0px;
  transform: rotate(180deg);
}
.br-suit {
  position:relative;
  top:55px;
  left:0px;
  transform: rotate(180deg);
}

.red {
  color:red;
}
</style>
