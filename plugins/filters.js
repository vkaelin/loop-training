import Vue from 'vue'

Vue.filter('secToTime', (sec) => {
  let min = Math.floor(sec / 60)
  let newSec = Math.floor(sec - min * 60)
  newSec = newSec < 10 ? '0' + newSec : newSec
  min = min < 10 ? '0' + min : min

  return `${min}:${newSec}`
})
