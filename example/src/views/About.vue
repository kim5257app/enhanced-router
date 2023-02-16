<template>
  <v-container class="fill-height">
    <v-btn
      @click="showDialog=true">
      대화상자 열기
    </v-btn>
    <v-btn
      to="/">
      Home
    </v-btn>
    <dlg-test v-model:show="showDialog">
    </dlg-test>
  </v-container>
</template>

<script>
import { makeShowFlag } from '../../../dist/enhanced-router';
import DlgTest from '@/components/DlgTest.vue';

export default {
  name: 'Home',
  components: {DlgTest},
  computed: {
    showDialog: makeShowFlag('dialog'),
  },
}
</script>
