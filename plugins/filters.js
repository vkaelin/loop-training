import Vue from 'vue'

Vue.filter('secToTime', (sec, ceil = false) => {
  let min = Math.floor(sec / 60)
  let newSec = ceil ? Math.ceil(sec - min * 60) : Math.floor(sec - min * 60)
  if (newSec === 60) {
    newSec = 0
    min++
  }
  newSec = newSec < 10 ? '0' + newSec : newSec
  min = min < 10 ? '0' + min : min

  return `${min}:${newSec}`
})
