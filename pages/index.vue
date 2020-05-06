<template>
  <div class="container pt-10 mx-auto text-base">
    <div class="relative text-center">
      <span class="relative z-10 px-3 text-lg font-semibold uppercase bg-gray-900">Nombres</span>
      <div class="absolute w-5/6 bg-indigo-500 bg-opacity-25 divider-line" />
    </div>
    <div class="mt-5 space-y-6">
      <ConfigLine v-model="number.loops" :index="1">
        Boucles d'exercices
      </ConfigLine>
      <ConfigLine v-model="number.exercices" :index="2">
        Exercices par boucle
      </ConfigLine>
      <ConfigLine v-model="number.repetitions" :index="3">
        Répétitions des boucles
      </ConfigLine>
    </div>
    <div class="relative mt-10 text-center">
      <span class="relative z-10 px-3 text-lg font-semibold uppercase bg-gray-900">Durées (sec.)</span>
      <div class="absolute w-5/6 bg-indigo-500 bg-opacity-25 divider-line" />
    </div>
    <div class="mt-5 space-y-6">
      <ConfigLine v-model="time.exercices" :index="4">
        Exercices
      </ConfigLine>
      <ConfigLine v-model="time.exercicesBreaks" :index="5">
        Pauses
      </ConfigLine>
      <ConfigLine v-model="time.loopsBreaks" :index="6">
        Pauses entre boucles
      </ConfigLine>
    </div>
    <button
      @click="startTraining"
      class="block px-4 py-2 mx-auto mt-12 text-lg bg-indigo-500 rounded-md focus:shadow-md focus:outline-none focus:bg-indigo-400"
      type="button"
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
