<script setup lang="ts">
import { Card } from '~/components'
import { useApi } from "~/plugins/api";
import type { Deck } from "~/plugins/client/client";
import {computed, ref} from "vue";

const { apiClient } = useApi()

const deck = ref<Deck>();

(async () => {
  try {
    deck.value = await apiClient.card.index();
    console.log(deck)
  }
  catch (error) {
    console.error(error);
  }
})();
const red = (suit: string) => suit === "hearts" || suit === "diamonds";
const suitHTMLCharacter = (suit: string) => {
  if( suit === "diamonds" ) {
    return "&diams\;";
  }
  return `&${suit.toLowerCase()}\;`;
};
</script>

<template>
  <v-container>
    <v-row v-if="deck">
      <v-col cols="12">
        <h3>Color order</h3>
      </v-col>
      <v-col v-for="suit in deck.orderColors">
        <div :style="red(suit.toLowerCase()) ? 'color:red;' : ''" class="m-suit" v-html="suitHTMLCharacter(suit.toLowerCase())"></div>
      </v-col>

      <v-col cols="12">
        <h3>Rank order</h3>
      </v-col>
      <v-col v-for="rank in deck.orderRanks">
        {{ rank }}
      </v-col>

      <v-col cols="12">
        <h3>Shuffled cards</h3>
      </v-col>
      <v-col v-for="{ color, rank } in deck.shuffledCards">
        <Card :suit="color.toLowerCase()" :rank="rank"/>
      </v-col>

      <v-col cols="12">
        <h3>Sorted cards</h3>
      </v-col>
      <v-col v-for="{ color, rank } in deck.sortedCards">
        <Card :suit="color.toLowerCase()" :rank="rank"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.m-suit {
  position:relative;
  top:-32px;
  left:38px;
  font-size:60px;
}</style>