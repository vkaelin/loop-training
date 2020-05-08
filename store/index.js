export const state = () => ({
  number: {
    loops: 2,
    repetitions: 2,
    exercices: 6
  },

  settings: {
    sound: true
  },

  time: {
    exercices: 30,
    exercicesBreaks: 30,
    loopsBreaks: 120
  }
})

export const mutations = {
  UPDATE_NUMBER (state, number) {
    state.number.loops = number.loops
    state.number.repetitions = number.repetitions
    state.number.exercices = number.exercices
  },
  UPDATE_SETTINGS (state, { key, value }) {
    state.settings[key] = value
  },
  UPDATE_TIME (state, time) {
    state.time.exercices = time.exercices
    state.time.exercicesBreaks = time.exercicesBreaks
    state.time.loopsBreaks = time.loopsBreaks
  }
}
