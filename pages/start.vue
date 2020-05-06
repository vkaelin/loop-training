<template>
  <div class="px-2">
    <div
      class="text-center text-7xl"
    >{{ currentInterval.time - (elapsedIntervalTime/1000)|secToTime }}</div>
    <div class="flex items-center justify-between">
      <div class="w-1/3 text-left">
        <div class="text-sm">Ecoulé</div>
        <div class="font-semibold text-indigo-400">{{ elapsedTotalTime/1000|secToTime }}</div>
      </div>
      <div class="w-1/3 text-center">
        <div class="text-sm">Intervalle</div>
        <div class="font-semibold text-indigo-400">{{ interval }}/{{ totalIntervals }}</div>
      </div>
      <div class="w-1/3 text-right">
        <div class="text-sm">Restant</div>
        <div class="font-semibold text-indigo-400">{{ remainingTotalTime|secToTime }}</div>
      </div>
    </div>
    <div class="mt-16 text-center">
      <div>Intervalle actuel</div>
      <div
        class="text-lg font-semibold"
      >{{ currentInterval.type }} {{ currentInterval.time|secToTime }}</div>
    </div>
    <div class="text-indigo-400">
      <button
        @click="btnClick"
        class="flex items-center justify-center w-full py-16 mt-16 bg-gray-700 border border-indigo-400 rounded-md"
      >
        <template v-if="startTime">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <span class="ml-2 text-xl font-semibold">Recommencer le training</span>
        </template>
        <template v-else>
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <span class="ml-2 text-xl font-semibold">Démarrer</span>
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      audioStart: null,
      audioStop: null,
      elapsedIntervalTime: 0,
      elapsedTotalTime: 0,
      interval: 1,
      startTime: null,
      startTimeInterval: null,
      ticker: null
    }
  },

  computed: {
    currentInterval () {
      const interval = {
        type: '',
        time: 0
      }
      if (this.interval % 2 === 0) {
        // Loop break
        if (this.interval % (this.number.exercices * 2) === 0) {
          interval.type = 'Pause (Loop)'
          interval.time = this.time.loopsBreaks
        } else { // Exercice break
          interval.type = 'Pause'
          interval.time = this.time.exercicesBreaks
        }
      } else { // Exercice
        interval.type = 'Exercice'
        interval.time = this.time.exercices
      }
      return interval
    },
    remainingTotalTime () {
      return this.totalTime - (this.elapsedTotalTime / 1000)
    },
    totalIntervals () {
      return this.number.exercices * this.number.loops * this.number.repetitions * 2 - 1
    },
    totalTime () {
      return ((this.number.exercices * this.time.exercices +
        (this.number.exercices - 1) * this.time.exercicesBreaks +
        this.time.loopsBreaks) * this.number.loops) *
        this.number.repetitions - this.time.loopsBreaks
    },
    ...mapState(['number', 'time'])
  },

  beforeMount () {
    this.audioStart = new Audio('audio/start.mp3')
    this.audioStop = new Audio('audio/stop.mp3')
  },

  beforeDestroy () {
    this.ticker = null
  },

  methods: {
    AdjustingInterval (workFunc, interval, resetFunc, granularity) {
      let expected, timeout, resetStep
      this.start = () => {
        expected = Date.now() + interval
        timeout = setTimeout(step, interval)
        resetStep = 0
      }
      this.stop = () => {
        clearTimeout(timeout)
      }
      const step = () => {
        const drift = Date.now() - expected
        workFunc()
        expected += interval
        resetStep++
        if (resetStep >= granularity) {
          resetFunc()
          resetStep = 0
          expected = Date.now()
        }
        timeout = setTimeout(step, Math.max(0, interval - drift))
      }
    },
    btnClick () {
      if (this.startTime) {
        this.stopTimer()
      } else {
        this.startTimer()
      }
    },
    startTimer () {
      this.startTime = Date.now()
      this.startTimeInterval = Date.now()
      const doWork = () => {
        if (!this.startTime) { return }

        this.elapsedTotalTime += 25
        this.elapsedIntervalTime += 25

        if (this.elapsedIntervalTime / 1000 > this.currentInterval.time) {
          this.nextInterval()
        }
      }
      const fixTimerDrift = () => {
        this.elapsedTotalTime = Date.now() - this.startTime
        this.elapsedIntervalTime = Date.now() - this.startTimeInterval
      }
      this.ticker = new this.AdjustingInterval(doWork, 25, fixTimerDrift, 10)
      this.ticker.start()
      this.audioStart.play()
    },
    stopTimer () {
      this.ticker.stop()
      this.startTime = null
      this.startTimeInterval = null
      this.elapsedIntervalTime = 0
      this.elapsedTotalTime = 0
      this.interval = 1
    },
    nextInterval () {
      if (this.interval % 2 === 0) {
        this.audioStop.play()
      } else {
        this.audioStart.play()
      }

      this.elapsedIntervalTime = 0
      this.interval++
      this.startTimeInterval = Date.now()

      if (this.interval > this.totalIntervals) {
        this.stopTimer()
        this.$router.push('/finish')
      }
    }
  }
}
</script>
