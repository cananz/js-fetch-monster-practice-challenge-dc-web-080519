// URL
const monstersURL = "http://localhost:3000/monsters"

//constants
const monsterForm = document.getElementById('create-monster-form')

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", function(){
  monsterForm.addEventListener('submit', createMonsterFormHandler)

  console.log("RAWWWR")
  fetchMonsters(monstersURL)

})



//GET all monsters -- but only send 50 to be rendered
function fetchMonsters(url){
  fetch(url)
  .then(r => r.json())
  .then(monsterData => {
    console.log(`Selecting 50 out of ${monsterData.length} monsters!`)
    // only send first 50 monsters to be displayed
    seperateData(monsterData.slice(0, 50))
  })
}

//iterate through first 50 monsters
function seperateData(data){
  data.forEach(monsterObj => displayMonster(monsterObj))
}

//render each monster
function displayMonster(obj){
  let monsterContainer = document.getElementById('monster-container')
  //create elements for each monster
  let monster = document.createElement('div')
  let name = document.createElement('h2')
  let age = document.createElement('h4')
  let desc = document.createElement('p')

  //add monster's info to elements
  monster.setAttribute('monster-id', obj.id)
  name.innerText = obj.name
  age.innerText = `Age: ${obj.age}`
  desc.innerText = obj.description

  //add monster to DOM
  monster.appendChild(name)
  monster.appendChild(age)
  monster.appendChild(desc)
  monsterContainer.prepend(monster)
}

//form handler
function createMonsterFormHandler(e){
  e.preventDefault()
  let newMonster = {
    name: e.currentTarget.name.value,
    age: e.currentTarget.age.value,
    description: e.currentTarget.description.value
  }
  createMonster(newMonster)
}

function createMonster(monsterObj){
  console.log(monsterObj)
  fetch(monstersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monsterObj)
  })
  .then(r => r.json())
  .then(newMonster => displayMonster(newMonster))
  // debugger
}
