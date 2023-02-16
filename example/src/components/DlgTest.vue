<template>
  <v-dialog
    v-model="showFlag">
    <v-card>
      <v-card-title>
        제목A
      </v-card-title>
      <v-card-text>
        내용A
        <v-btn
          @click="showDialog=true">
          대화상자 B 열기
        </v-btn>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="showDialog">
      <v-card>
        <v-card-title>
          제목B
        </v-card-title>
        <v-card-text>
          내용B
          <v-btn
            to="/">
            /로 이동
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { makeShowFlag } from '@/../../dist/enhanced-router';

export default {
  name: 'DlgTest',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showDialog: makeShowFlag('dialogB'),
    showFlag: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update:show', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
