<template>
  <Modal v-if="modals.fabled && fabled.length" @close="toggleModal('fabled')">
    <h3>{{ locale.modal.fabled.title }}</h3>
    <ul class="tokens">
      <li v-for="role in fabled" :key="role.id" @click="setFabled(role)">
        <Token :role="role" />
      </li>
    </ul>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';
import Token from '../Token.vue';

const store = useStore();

const modals = computed(() => store.state.modals);
const locale = computed(() => store.state.locale);


const fabled = computed(() => {
  return Array.from(store.state.fabled.values()).filter(role =>
    !store.state.players.fabled.some(fable => fable.id === role.id)
  );
});

function setFabled(role) {
  store.commit('players/setFabled', { fabled: role });
  store.commit('toggleModal', 'fabled');
}

function toggleModal(modal) {
  store.commit('toggleModal', modal);
}
</script>

<style scoped lang="scss">
@use "../../vars.scss" as *;

ul.tokens li {
  border-radius: 50%;
  width: 8vmax;
  margin: 0.5%;
  transition: transform 500ms ease;

  &:hover {
    transform: scale(1.2);
    z-index: 10;
  }
}
</style>
