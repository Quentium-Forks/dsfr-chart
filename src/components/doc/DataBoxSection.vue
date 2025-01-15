<template>
  <div class="part_container fr-mb-6w">
    <h2 id="IX.-Databox">
      IX. Databox
    </h2>
    <DataBox :id="id" />
  </div>
</template>

<script setup>
import DataBox from '../DataBox.vue';
import PieChart from '../PieChart.vue';
import { chartData } from '@/assets/data';

const id = 'databox-1';
</script>
