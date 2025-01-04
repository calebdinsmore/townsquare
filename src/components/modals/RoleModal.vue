<template>
  <Modal v-if="modals.role && availableRoles.length" @close="close">
    <h3>
      {{ locale.modal.role.title }}
      {{
        playerIndex >= 0 && players.length
          ? players[playerIndex].name
          : locale.modal.role.bluff
      }}
    </h3>
    <ul class="tokens" v-if="tab === 'editionRoles' || !otherTravelers.size">
      <li v-for="role in availableRoles" :class="[role.team]" :key="role.id" @click="setRole(role)">
        <Token :role="role" />
      </li>
    </ul>
    <ul class="tokens" v-if="tab === 'otherTravelers' && otherTravelers.size">
      <li v-for="role in otherTravelers.values()" :class="[role.team]" :key="role.id" @click="setRole(role)">
        <Token :role="role" />
      </li>
    </ul>
    <div class="button-group" v-if="playerIndex >= 0 && otherTravelers.size && !session.isSpectator">
      <span class="button" :class="{ townsfolk: tab === 'editionRoles' }" @click="tab = 'editionRoles'">{{
        locale.modal.role.editionRoles }}</span>
      <span class="button" :class="{ townsfolk: tab === 'otherTravelers' }" @click="tab = 'otherTravelers'">{{
        locale.modal.role.otherTravelers }}</span>
    </div>
  </Modal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';
import Token from '../Token.vue';

const props = defineProps(['playerIndex']);
const store = useStore();

const tab = ref('editionRoles');

const availableRoles = computed(() => {
  const availableRoles = [];
  const players = store.state.players.players;
  store.state.roles.forEach((role) => {
    // don't show bluff roles that are already assigned to players
    if (
      props.playerIndex >= 0 ||
      (props.playerIndex < 0 &&
        !players.some((player) => player.role.id === role.id))
    ) {
      availableRoles.push(role);
    }
  });
  availableRoles.push({});
  return availableRoles;
});

const modals = computed(() => store.state.modals);
const session = computed(() => store.state.session);
const locale = computed(() => store.state.locale);
const players = computed(() => store.state.players.players);
const otherTravelers = computed(() => store.state.otherTravelers);

const setRole = (role) => {
  if (props.playerIndex < 0) {
    // assign to bluff slot (index < 0)
    store.commit('players/setBluff', {
      index: props.playerIndex * -1 - 1,
      role,
    });
  } else {
    if (session.value.isSpectator && role.team === 'traveler') return;
    // assign to player
    const player = store.state.players.players[props.playerIndex];
    store.commit('players/update', {
      player,
      property: 'role',
      value: role,
    });
  }
  tab.value = 'editionRoles';
  store.commit('toggleModal', 'role');
};

const close = () => {
  tab.value = 'editionRoles';
  store.commit('toggleModal', 'role');
};
</script>

<style scoped lang="scss">
@use "../../vars.scss" as *;

ul.tokens li {
  border-radius: 50%;
  width: 6vmax;
  margin: 1%;
  transition: transform 500ms ease;

  &.townsfolk {
    box-shadow:
      0 0 10px $townsfolk,
      0 0 10px #004cff;
  }

  &.outsider {
    box-shadow:
      0 0 10px $outsider,
      0 0 10px $outsider;
  }

  &.minion {
    box-shadow:
      0 0 10px $minion,
      0 0 10px $minion;
  }

  &.demon {
    box-shadow:
      0 0 10px $demon,
      0 0 10px $demon;
  }

  &.traveler {
    box-shadow:
      0 0 10px $traveler,
      0 0 10px $traveler;
  }

  &:hover {
    transform: scale(1.2);
    z-index: 10;
  }
}

#townsquare.spectator ul.tokens li.traveler {
  display: none;
}
</style>
