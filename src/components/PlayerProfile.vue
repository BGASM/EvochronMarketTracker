<template>
  <div class="card card-profile mb-4">
    <div class="card-header x4-backgound"></div>
    <div class="card-body text-center">
      <img class="card-profile-img" src="../assets/evo-logo.png" title="..."/>
      <div class="mb-2">
        <h3 class="mb-0 text-gray-400">
          <span>{{ player.name }}</span>
        </h3>
        <h5 class="mb-0 text-gray-400">
          <span>{{ player.system }} System</span>
        </h5>
        <small>
            {{ player.sx }} / {{ player.sy }} / {{ player.sz }}<br>
            {{ player.x }} / {{ player.y }} / {{ player.z }}
        </small>
      </div>
      <div class="mb-4">
        <div v-if="player.planet">Closest Planet: {{ player.planet }}</div>
        <div class="row">
          <div class="column">
            Civ: {{ player.civ_rank }}
            Mil: {{ player.mil_rank }}            
          </div>
          <div class="column">
            Contracts: {{ player.contracts }}
            Kills: {{ player.kills }}
          </div>
        </div>        
      </div>
      <div class="mb-4">
        <div>Fuel: {{ player.fuel }}</div>
        <div>{{ player.credits }}</div>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'gameData',
  ],
  data() {
    return {
      player: {
        name: null,
        system: null,
        fuel: null,
        planet: null,
        credit: null,
        x: null,
        y: null,
        z: null,
        sx: null,
        sy: null,
        sz: null,
        civ_rank: null,
        mil_rank: null,
        contracts: null,
        kills: null,
      },
    }
  },
  /**
   */
  watch: {
    'gameData': {
      handler(newData, oldData) {
        this.parsePlayerProfileData(newData)
      },
    },
  },
  methods: {
    /**
     */
    parsePlayerProfileData(gameData) {
      this.player = {
        name: gameData.pilot_name,
        system: gameData.closest_gate,
        fuel: gameData.fuel,
        planet: gameData.local_planet_name.split("/")[0],
        credits: '$ ' + gameData.cash.toLocaleString(),
        x: gameData.player_position_X,
        y: gameData.player_position_Y,
        z: gameData.player_position_Z,
        sx: gameData.player_position_SX,
        sy: gameData.player_position_SY,
        sz: gameData.player_position_SZ,
        civ_rank: gameData.skill_and_proficiency_rating,
        mil_rank: gameData.military_rank,
        contracts: gameData.total_contracts,
        kills: gameData.total_kills,
      }
    },
  },
}
</script>

<style>
</style>