/* eslint-env browser */
/* global moment */
const baseUrl = 'https://safr.kingfeatures.com/idn/ck3/content.php?file='
const template = 'http://safr.kingfeatures.com/ThePhantom/YYYY/MM/Phantom.YYYYMMDD_1440.gif'
const sunday = 'http://safr.kingfeatures.com/ThePhantom/YYYY/MM/Phantom_hs.YYYYMMDD_1440.gif'

const inputY = document.getElementById('year')
const inputM = document.getElementById('month')
const inputD = document.getElementById('date')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const prevWeek = document.getElementById('prevWeek')
const nextWeek = document.getElementById('nextWeek')
const comic = document.getElementById('comic')

const maxDate = moment().startOf('day')
const minDate = maxDate.clone().subtract(1, 'year')
let date = maxDate.clone()

loadComic()

inputY.max = maxDate.year()
inputY.value = date.year()
inputM.value = date.month() + 1
inputD.value = date.date()

inputY.addEventListener('change', onchange)
inputM.addEventListener('change', onchange)
inputD.addEventListener('change', onchange)
prev.addEventListener('click', onprev)
next.addEventListener('click', onnext)
document.addEventListener('keyup', onkeyup)
prevWeek.addEventListener('click', onPrevWeek)
nextWeek.addEventListener('click', onNextWeek)

function pad (n) {
  return n < 10 ? '0' + n : n
}

function shift (n) {
  const shifted = date.clone().add(n, 'day')
  inputY.value = shifted.year()
  inputM.value = shifted.month() + 1
  inputD.value = shifted.date()
  if (validate()) return loadComic()
}

function onchange (e) {
  // Only run if event is triggered by human
  if (e.isTrusted && validate()) return loadComic()
}

function onprev (e) {
  return shift(-1)
}

function onnext (e) {
  return shift(1)
}

function onkeyup (e) {
  if (e.key === 'ArrowLeft' || e.keyCode === 37) return onprev(e)
  if (e.key === 'ArrowRight' || e.keyCode === 39) return onnext(e)
}

function onPrevWeek (e) {
  return shift(-7)
}

function onNextWeek (e) {
  return shift(7)
}

function loadComic () {
  const YYYY = date.year()
  const MM = pad(date.month() + 1)
  const DD = pad(date.date())
  let frag
  if (date.day()) {
    // Daily comic
    frag = template
    prevWeek.classList.add('hidden')
    nextWeek.classList.add('hidden')
  } else {
    // Sunday comic
    frag = sunday
    prevWeek.classList.remove('hidden')
    nextWeek.classList.remove('hidden')
  }
  frag = frag.replace(/YYYY/g, YYYY).replace(/MM/g, MM).replace(/DD/g, DD)
  const src = baseUrl + btoa(frag)
  if (src !== comic.src) {
    comic.src = ''
    comic.src = src
  }
}

function validate (e) {
  let newYear = inputY.value
  let newMonth = inputM.value
  let newDate = inputD.value
  let check = moment([newYear, newMonth - 1, newDate])
  if (+check === +date) {
    return false // Nothing changed, don't need to trigger reload
  }
  if (check.isValid()) {
    if (check < minDate) check = minDate.clone()
    if (check > maxDate) check = maxDate.clone()
    const checkYear = check.year()
    const checkMonth = check.month() + 1
    const checkDate = check.date()
    if (checkYear !== newYear) inputY.value = checkYear
    if (checkMonth !== newMonth) inputM.value = checkMonth
    if (checkDate !== newDate) inputD.value = checkDate
    date = check
    return true
  } else {
    inputY.value = date.year()
    inputM.value = date.month() + 1
    inputD.value = date.date()
    return false
  }
}
