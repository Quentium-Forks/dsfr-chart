<template>
  <div
    id="databox"
    class="part_container fr-mb-6w"
  >
    <h2 id="colors">
      IX. Databox
    </h2>
    <DataBox :id="id" />
    <PieChart
      v-bind="chartData.pieChart.doughnut"
      :databox-id="id"
      databox-type="chart"
    />
  </div>
</template>

<script setup>
import DataBox from '../DataBox.vue';
import PieChart from '../PieChart.vue';
import { chartData } from '@/assets/data';

const id = 'databox-1';
</script>
