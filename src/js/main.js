var HomeRouteComponent = require('./route-components/home')
var AtmRouteComponent = require('./route-components/atm')
var atms = require('./route-components/home').atms
var atm, atmRouteComponent

var leftContainer = document.querySelector('.container__left')
var rightContainer = document.querySelector('.container__right')

var homeRouteComponent = new HomeRouteComponent({ left: leftContainer, right: rightContainer })

leftContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('atm')) {
    window.location.hash = `#${event.target.id}`
  }
})

rightContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('container')) {
    window.location.hash = window.location.hash.split('#')[0]
  }
})

window.addEventListener('hashchange', function () {
  if (window.location.hash.match(/#/)) {
    homeRouteComponent.removeComponents()
    var id = window.location.hash.slice(1)
    atm = atms.find(el => el.id === id)
    // а если атм не найден?
    atmRouteComponent = new AtmRouteComponent(atm)
    leftContainer.appendChild(atmRouteComponent.element)
  } else if (!window.location.hash) {
    atmRouteComponent.element.remove()
    atmRouteComponent = null
    rightContainer.innerHTML = ''
    homeRouteComponent.renderComponents()
  }
})
