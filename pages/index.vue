<template>
  <div class="container pt-8 mx-auto text-sm">
    <div class="relative text-center">
      <span class="relative z-10 px-3 text-base font-semibold uppercase bg-gray-900">Nombres</span>
      <div class="absolute w-5/6 bg-indigo-500 bg-opacity-25 divider-line" />
    </div>
    <div class="mt-4 space-y-6">
      <ConfigLine v-model="number.loops" :index="1">
        Nombre de boucles d'exercices
      </ConfigLine>
      <ConfigLine v-model="number.exercices" :index="2">
        Nombre d'exercices par boucle
      </ConfigLine>
      <ConfigLine v-model="number.repetitions" :index="3">
        Nombre de répétitions des boucles
      </ConfigLine>
    </div>
    <div class="relative mt-8 text-center">
      <span class="relative z-10 px-3 text-base font-semibold uppercase bg-gray-900">Durées (sec.)</span>
      <div class="absolute w-5/6 bg-indigo-500 bg-opacity-25 divider-line" />
    </div>
    <div class="mt-4 space-y-6">
      <ConfigLine v-model="time.exercices" :index="4">
        Durée des exercices
      </ConfigLine>
      <ConfigLine v-model="time.exercicesBreaks" :index="5">
        Durée des pauses
      </ConfigLine>
      <ConfigLine v-model="time.loopsBreaks" :index="6">
        Durée des pauses entre boucles
      </ConfigLine>
    </div>
    <button
      class="block px-4 py-2 mx-auto mt-12 text-base bg-indigo-500 rounded-md focus:shadow-md focus:outline-none focus:bg-indigo-400"
      type="button"
      @click="startTraining"
    >
      Commencer
    </button>
  </div>
</template>

<script>
import ConfigLine from '@/components/Home/ConfigLine.vue'

export default {
  components: {
    ConfigLine
  },

  data () {
    return {
      number: {},
      time: {}
    }
  },

  created () {
    this.number = { ...this.$store.state.number }
    this.time = { ...this.$store.state.time }
  },

  methods: {
    startTraining () {
      this.$store.commit('UPDATE_NUMBER', this.number)
      this.$store.commit('UPDATE_TIME', this.time)

      this.$router.push('/start')
    }
  }
}
</script>

<style scoped>
.divider-line {
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
