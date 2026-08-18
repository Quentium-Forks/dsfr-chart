<template>
  <dialog
    :id="'modal-' + modalId"
    :aria-labelledby="'fr-modal-title-modal-' + modalId"
    role="dialog"
    class="fr-modal"
  >
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
          <div class="fr-modal__body">
            <div class="fr-modal__header">
              <button
                class="fr-btn--close fr-btn"
                title="Fermer la fenêtre modale"
                :aria-controls="'modal-' + modalId"
              >
                Fermer
              </button>
            </div>
            <div class="fr-modal__content">
              <h1
                :id="'fr-modal-title-modal-' + modalId"
                class="fr-modal__title"
              >
                <span class="fr-icon-arrow-right-line fr-icon--lg" />
                {{ modalTitle }}
              </h1>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="modalContent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
defineProps({
  modalId: {
    type: String,
    required: true,
  },
  modalTitle: {
    type: String,
    default: '',
  },
  modalContent: {
    type: String,
    default: '',
  },
});
</script>
