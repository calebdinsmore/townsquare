<template>
  <Modal v-if="modals.specialVote" @close="toggleModal('specialVote')">
    <h3>{{ locale.modal.specialvote.title }}</h3>
    <div class="allTheButtons">
      <button @click="bishopVote()">
        <img src="../../assets/icons/bishop.png" :alt="locale.modal.specialvote.bishop" />
        <span>{{ locale.modal.specialvote.bishop }}</span>
      </button>
      <button @click="atheistVote()">
        <img src="../../assets/icons/atheist.png" :alt="locale.modal.specialvote.atheist" />
        <span>{{ locale.modal.specialvote.atheist }}</span>
      </button>
      <button @click="cultleaderVote()">
        <img src="../../assets/icons/cultleader.png" :alt="locale.modal.specialvote.cultleader" />
        <span>{{ locale.modal.specialvote.cultleader }}</span>
      </button>
      <button @click="customVote()">
        <img src="../../assets/icons/custom.png" :alt="locale.modal.specialvote.custom" />
        <span>{{ locale.modal.specialvote.custom }}</span>
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';

const store = useStore();

const modals = computed(() => store.state.modals);
const locale = computed(() => store.state.locale);
const session = computed(() => store.state.session);
const players = computed(() => store.state.players.players);

function launchVote(nomination) {
  store.commit('session/nomination', { nomination });
  store.commit('toggleModal', 'specialVote');
}

function bishopVote() {
  launchVote([
    locale.value.modal.specialvote.st,
    session.value.playerForSpecialVote,
  ]);
}

function atheistVote() {
  launchVote([
    session.value.playerForSpecialVote,
    locale.value.modal.specialvote.st,
  ]);
}

function cultleaderVote() {
  launchVote([
    session.value.playerForSpecialVote,
    locale.value.modal.specialvote.cultleaderMessages,
  ]);
}

function customVote() {
  const playerName = players.value[session.value.playerForSpecialVote].name;
  const input = prompt(
    locale.value.modal.specialvote.complete +
    playerName +
    " ____________________" +
    locale.value.vote.exclam,
  );
  if (!input) return;
  const messages = locale.value.modal.specialvote.customMessages;
  messages[0] = input;
  launchVote([session.value.playerForSpecialVote, messages]);
}

function toggleModal(modalName) {
  store.commit('toggleModal', modalName);
}
</script>

<style scoped lang="scss">
ul {
  width: 100%;
}

div.allTheButtons {
  margin-top: 30px;
}

button {
  background-color: #66027f;
  border: none;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  margin-top: 15px;
  display: flex;
  align-items: center;
}

button:hover {
  background-color: #9903bf;
}

button:focus {
  background-color: #cc04ff;
}

span {
  font-family: PiratesBay, sans-serif;
  font-size: 22px;
  color: white;
  flex: 1;
  text-align: center;
}

img {
  width: 80px;
  display: block;
  margin-left: auto;
}

template {
  margin-top: 30px;
}
</style>
