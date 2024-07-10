<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
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
      </v-col>
      <v-col>
        <test>
        </test>
      </v-col>
      <v-col>
        <test>
        </test>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { makeShowFlag } from '../../../dist/enhanced-router';
import DlgTest from '@/components/DlgTest.vue';
import Test from '@/components/Test';
// import { makeShowFlag2 } from '../../../src/mixin_dialog_support';

export default {
  name: 'Home',
  components: {
    Test,
    DlgTest,
  },
  data: () => ({
  }),
  computed: {
    showDialog: makeShowFlag('a'),
    showDialog2: makeShowFlag('b'),
  },
}
</script>
