<template>
  <section class="fr-accordion fr-mt-4w fr-mb-6w">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn"
        aria-expanded="false"
        :aria-controls="'accordion-' + tag"
      >
        Extrait de code
      </button>
    </h3>
    <div
      :id="'accordion-' + tag"
      class="fr-collapse"
    >
      <!-- No indentation because it will be reflected in code pre -->
      <div class="code-toolbar">
        <pre><code>
    <!-- Tag open --><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{{ tag }}</span></span>
        <template
              v-for="(prop, i) in Object.keys(graphProps)"
              :key="i"
            ><span class="token attr-name">{{ prop }}</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="titre_class">{{ graphProps[prop] }}</span><span class="token punctuation">"</span></span>
        </template><span class="token punctuation">&gt;</span>
    <!-- Tag close --><span class="token tag"><span class="token punctuation">&lt;/</span>{{ tag }}</span><span class="token punctuation">&gt;</span></code></pre>
      </div>
    </div>
  </section>
</template>

<script setup>
const { graphProps, component } = defineProps(['graphProps', 'component'])

const componentToTag = str => str?.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)?.replace('-', '');

const tag = componentToTag(component?.name)
</script>