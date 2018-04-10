/* assumptions: no party will get over 50% of votes
                no non-5% party will get more than 1 electorate
   to do:       refactor!
*/                

import xs from 'xstream'
import {div, input, h2, button, ul, li} from '@cycle/dom'
import {calculateVotes, saintLague} from './functions.js'

function renderPartySlider (party, vote, electorate) {
return div([
  input(`.${party}E`, {attrs: {type: 'checkbox', checked: electorate}}),
  `${party} ` + vote,
  input(`.${party}`, {attrs: {type: 'range', min: 0, max: 50, step: 0.1, value: vote}})
])
}

function renderPartySeats (party, seats = 2, electorates) {
  const threshold = seats < 5 ? (!electorates ? seats = 0 : seats) : seats   
  return li(`${party}: ${threshold}, ${electorates}`)
}
  
function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national + +labour + +greens + +nzf + +act + +top + +māori + +other).toFixed(1)  
}

function view(state$) {
  return state$.map(({national, labour, greens, nzf, act, top, māori, other, nationalE, labourE, greensE, nzfE, actE, topE, māoriE, otherE, total}) =>
    div('.sliders', [
      renderPartySlider('National', national, nationalE),
      renderPartySlider('Labour', labour, labourE),
      renderPartySlider('Greens', greens, greensE),
      renderPartySlider('NZF', nzf, nzfE),
      renderPartySlider('Act', act, actE),
      renderPartySlider('TOP', top, topE),
      renderPartySlider('Māori', māori, māoriE),
      renderPartySlider('Other', other, otherE),
      h2(total +'% of votes counted'),
      h2('seats'),
      ul([
        renderPartySeats('National', national, nationalE),
        renderPartySeats('Labour', labour, labourE),
        renderPartySeats('Greens', greens, greensE),
        renderPartySeats('NZF', nzf, nzfE),
        renderPartySeats('Act', act, actE),
        renderPartySeats('TOP', top, topE),
        renderPartySeats('Māori', māori, māoriE),
        renderPartySeats('Other', other, otherE)
      ])
    ])
  )
}

function intent(domSource) {
  return {
    changeNational$: domSource.select('.National').events('input')
    .map(ev => ev.target.value),  
    changeNationalE$: domSource.select('.NationalE').events('change')
    .map(ev => ev.target.checked),
    changeLabour$: domSource.select('.Labour').events('input')
    .map(ev => ev.target.value),  
    changeLabourE$: domSource.select('.LabourE').events('change')
    .map(ev => ev.target.checked),
    changeGreens$: domSource.select('.Greens').events('input')
    .map(ev => ev.target.value),  
    changeGreensE$: domSource.select('.GreensE').events('change')
    .map(ev => ev.target.checked), 
    changeNZF$: domSource.select('.NZF').events('input')
    .map(ev => ev.target.value), 
    changeNZFE$: domSource.select('.NZFE').events('change')
    .map(ev => ev.target.checked),  
    changeAct$: domSource.select('.Act').events('input')
    .map(ev => ev.target.value),  
    changeActE$: domSource.select('.ActE').events('change')
    .map(ev => ev.target.checked), 
    changeTOP$: domSource.select('.TOP').events('input')
    .map(ev => ev.target.value),  
    changeTOPE$: domSource.select('.TOPE').events('change')
    .map(ev => ev.target.checked), 
    changeMāori$: domSource.select('.Māori').events('input')
    .map(ev => ev.target.value), 
    changeMāoriE$: domSource.select('.MāoriE').events('change')
    .map(ev => ev.target.checked),  
    changeOther$: domSource.select('.Other').events('input')
    .map(ev => ev.target.value),
    changeOtherE$: domSource.select('.OtherE').events('change')
    .map(ev => ev.target.checked) 
  }
}

function model(actions) {
  const national$ = actions.changeNational$.startWith(44.5)
  const nationalE$ = actions.changeNationalE$.startWith(true)
  const labour$ = actions.changeLabour$.startWith(36.9)
  const labourE$ = actions.changeLabourE$.startWith(true)  
  const greens$ = actions.changeGreens$.startWith(6.3)
  const greensE$ = actions.changeGreensE$.startWith(false) 
  const nzf$ = actions.changeNZF$.startWith(7.2)
  const nzfE$ = actions.changeNZFE$.startWith(false)  
  const act$ = actions.changeAct$.startWith(0.5)
  const actE$ = actions.changeActE$.startWith(true)  
  const top$ = actions.changeTOP$.startWith(2.4)
  const topE$ = actions.changeTOPE$.startWith(false)  
  const māori$ = actions.changeMāori$.startWith(1.2)
  const māoriE$ = actions.changeMāoriE$.startWith(false)  
  const other$ = actions.changeOther$.startWith(1.0)
  const otherE$ = actions.changeOtherE$.startWith(false)

  return xs.combine(national$, labour$, greens$, nzf$, act$, top$, māori$, other$, nationalE$, labourE$, greensE$, nzfE$, actE$, topE$, māoriE$, otherE$)
  .map(([national, labour, greens, nzf, act, top, māori, other, nationalE, labourE, greensE, nzfE, actE, topE, māoriE, otherE]) => {
    return {national, labour, greens, nzf, act, top, māori, other, nationalE, labourE, greensE, nzfE, actE, topE, māoriE, otherE, total: total(national, labour, greens, nzf, act, top, māori, other)}
  })
}

export function App (sources) {
  return {DOM: view(model(intent(sources.DOM)))}
}
