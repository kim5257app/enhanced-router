<template>
  <v-container class="fill-height">
    <v-btn
      @click="showDialog=true">
      대화상자 열기
    </v-btn>
    <v-btn
      to="/about">
      About
    </v-btn>
    <v-dialog
      v-model="showDialog">
      <v-card>
        <v-card-title>
          제목
        </v-card-title>
        <v-card-text>
          내용
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { makeShowFlag } from 'enhanced-router';
import { watch } from 'vue';

const showDialog = makeShowFlag('show_dialog');

watch(showDialog, (value) => {
  console.log('value:', value);
});
</script>
