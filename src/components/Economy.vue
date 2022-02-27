<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div><h4 class="card-title pb-3">Economy</h4></div>        
      </div>
      
    </div>
     <div class="container-fluid d-flex justify-content-between align-items-center">                    
          <econ-table :econData="economies.data"/>              
    </div>
  </div>
</template>

<script>

import {reactive} from "vue";

import EconTable from './EconTable.vue';
export default {
  components: { EconTable },
  props: [
      'econData'
  ],   
  data() {
    return {
      economies: {
        data: [],
      },
    }
  },
  watch: {
    'econData': {
      handler(newData, oldData) {
        this.parseEconData(newData)        
      },
    },
  },
  methods: {
    parseEconData(econData) {      
      this.economies.data = econData;
    }
  },
}
</script>

<style>
</style>