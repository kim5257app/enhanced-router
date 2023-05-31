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

<script>
import { makeShowFlag } from '../../../dist/enhanced-router';

export default {
  name: 'Home',
  computed: {
    showDialog: makeShowFlag('dialog'),
  },
  watch: {
    showDialog() {
      console.log('showDialog');
    },
  },
}
</script>
