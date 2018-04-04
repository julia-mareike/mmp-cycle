/* assumptions: no party will get over 50% of votes
                no non-5% party will get more than 1 electorate
*/                

import xs from 'xstream'
import {div, input, h2} from '@cycle/dom'

function renderPartySlider (party, vote, electorate) {
return div([
  input(`.${party}E`, {attrs: {type: 'checkbox', checked: electorate}}),
  `${party} ` + vote,
  input(`.${party}`, {attrs: {type: 'range', min: 0, max: 50, step: 0.1, value: vote}})
])
}

function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national + +labour + +greens + +nzf + +act + +top + +māori + +other).toFixed(1)  
}

function view(state$) {
  return state$.map(({national, labour, greens, nzf, act, top, māori, other, total}) =>
  div([
  renderPartySlider('National', national, true),
  renderPartySlider('Labour', labour, true),
  renderPartySlider('Greens', greens, false),
  renderPartySlider('NZF', nzf, false),
  renderPartySlider('Act', act, true),
  renderPartySlider('TOP', top, false),
  renderPartySlider('Māori', māori, false),
  renderPartySlider('Other', other, false),
    h2(total +'% of votes counted')
  ])
  )
}

function intent(domSource) {
  return {
    changeNational$: domSource.select('.National').events('input')
    .map(ev => ev.target.value),  
    changeLabour$: domSource.select('.Labour').events('input')
    .map(ev => ev.target.value),  
    changeGreens$: domSource.select('.Greens').events('input')
    .map(ev => ev.target.value),  
    changeNZF$: domSource.select('.NZF').events('input')
    .map(ev => ev.target.value),  
    changeAct$: domSource.select('.Act').events('input')
    .map(ev => ev.target.value),  
    changeTOP$: domSource.select('.TOP').events('input')
    .map(ev => ev.target.value),  
    changeMāori$: domSource.select('.Māori').events('input')
    .map(ev => ev.target.value),  
    changeOther$: domSource.select('.Other').events('input')
    .map(ev => ev.target.value)
  }
}

function model(actions) {
  const national$ = actions.changeNational$.startWith(44.4)
  const labour$ = actions.changeLabour$.startWith(36.9)
  const greens$ = actions.changeGreens$.startWith(6.3)
  const nzf$ = actions.changeNZF$.startWith(7.2)
  const act$ = actions.changeAct$.startWith(0.5)
  const top$ = actions.changeTOP$.startWith(2.4)
  const māori$ = actions.changeMāori$.startWith(1.2)
  const other$ = actions.changeOther$.startWith(1.1)

  return xs.combine(national$, labour$, greens$, nzf$, act$, top$, māori$, other$)
  .map(([national, labour, greens, nzf, act, top, māori, other]) => {
    return {national, labour, greens, nzf, act, top, māori, other, total: total(national, labour, greens, nzf, act, top, māori, other)}
  })
}

export function App (sources) {
  return {DOM: view(model(intent(sources.DOM)))}
}
