let box1 = document.querySelector("#box1")
let player = document.querySelector('#player')
let box2 = document.querySelector('#box2')
let box3 = document.querySelector('#box3')

box1.addEventListener("click", e => {
  console.log("lvl1 beat")
  document.getElementById('player').setAttribute('position', '33.5 503 -33.5')
  document.getElementByClass('animation').setAttribute('delay', 0)
})

box2.addEventListener("click", e => {
  console.log("lvl2 beat")
  document.getElementById('player').setAttribute('position', '33.5 1003 -33.5')
})

box3.addEventListener('click', e => {
  console.log('lvl3 beat')
  document.getElementById('player').setAttribute('position', '25.5 1205 -30')
  document.getElementById('player').setAttribute('rotation', '0 180 0')
})