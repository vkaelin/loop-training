<template>
  <div class="container relative px-2 mx-auto" style="height: calc(100vh - 55px);">
    <div class="flex items-center justify-center text-7xl">
      <div
        v-for="(number, index) in remainingIntervalTime"
        :key="index"
        :style="{'width': number === ':' ? '30px' : '50px'}"
        :class="{'-mt-3': number === ':'}"
        class="text-center"
      >{{ number }}</div>
    </div>
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
        type="button"
        class="flex items-center justify-center w-full py-16 mt-16 bg-gray-700 border border-indigo-400 rounded-md"
      >
        <template v-if="status === 'started'">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <span class="ml-2 text-xl font-semibold">Mettre en pause</span>
        </template>
        <template v-else-if="status === 'paused'">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <span class="ml-2 text-xl font-semibold">Reprendre</span>
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
    <div class="absolute bottom-0 left-0 right-0 flex justify-between mx-2 mb-2">
      <button @click="stopTimer" class="focus:outline-none focus:text-indigo-400" type="button">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
      <button @click="switchSound" class="focus:outline-none focus:text-indigo-400" type="button">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            v-if="settings.sound"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
          <path
            v-else
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <nuxt-link to="/" class="focus:outline-none focus:text-indigo-400">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </nuxt-link>
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
      status: 'waiting',
      startPause: null,
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
    remainingIntervalTime () {
      return this.$options.filters.secToTime(this.currentInterval.time - (this.elapsedIntervalTime / 1000), true)
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
    ...mapState(['number', 'settings', 'time'])
  },

  beforeMount () {
    this.audioStart = new Audio(require('@/assets/audio/start.mp3'))
    this.audioStop = new Audio(require('@/assets/audio/stop.mp3'))
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
      switch (this.status) {
        case 'waiting':
          this.audioStart.volume = 0
          this.audioStop.volume = 0

          this.audioStart.play()
          this.audioStart.pause()
          this.audioStop.play()
          this.audioStop.pause()

          this.audioStart.volume = 1
          this.audioStop.volume = 1

          this.status = 'started'
          this.startTimer()
          break
        case 'started':
          this.status = 'paused'
          this.startPause = Date.now()
          break
        case 'paused':
          this.status = 'started'
          this.startTime += (Date.now() - this.startPause)
          this.startTimeInterval += (Date.now() - this.startPause)
          this.startPause = null
          break
      }
    },
    nextInterval () {
      this.elapsedIntervalTime = 0
      this.interval++
      this.startTimeInterval = Date.now()

      if (this.settings.sound) {
        if (this.interval % 2 === 0) {
          this.audioStop.play()
        } else {
          this.audioStart.play()
        }
      }

      if (this.interval > this.totalIntervals) {
        this.stopTimer()
        this.$router.push('/finish')
      }
    },
    startTimer () {
      this.startTime = Date.now()
      this.startTimeInterval = Date.now()
      const doWork = () => {
        if (!this.startTime) { return }
        if (this.status === 'paused') { return }

        this.elapsedTotalTime += 25
        this.elapsedIntervalTime += 25

        if (this.elapsedIntervalTime / 1000 > this.currentInterval.time) {
          this.nextInterval()
        }
      }
      const fixTimerDrift = () => {
        if (this.status === 'paused') { return }

        this.elapsedTotalTime = Date.now() - this.startTime
        this.elapsedIntervalTime = Date.now() - this.startTimeInterval
      }
      this.ticker = new this.AdjustingInterval(doWork, 25, fixTimerDrift, 10)
      this.ticker.start()
      if (this.settings.sound) {
        this.audioStart.play()
      }
    },
    stopTimer () {
      this.status = 'waiting'
      this.ticker && this.ticker.stop()
      this.startTime = null
      this.startTimeInterval = null
      this.elapsedIntervalTime = 0
      this.elapsedTotalTime = 0
      this.interval = 1
    },
    switchSound () {
      this.$store.commit('UPDATE_SETTINGS', { key: 'sound', value: !this.settings.sound })
    }
  }
}
</script>
