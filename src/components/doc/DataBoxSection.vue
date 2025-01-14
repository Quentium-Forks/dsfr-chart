<template>
  <div 
    id="databox"
    class="part_container"
  >
    <DataBox :id="id" />
    <PieChart
      v-bind="FAKE_DATA.pieChart.doughnut"
      :databox-id="id"
      databox-type="chart"
    />
  </div>
</template>

<script setup>
import DataBox from '../DataBox.vue';
import PieChart from '../PieChart.vue';
import { FAKE_DATA } from './fakeData';

const id ="databox-1"
</script>