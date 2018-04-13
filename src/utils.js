// import xs from 'xstream'
import {div, input, h2, button, ul, li} from '@cycle/dom'

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

export function renderSliders (state$) {
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

export function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national + +labour + +greens + +nzf + +act + +top + +māori + +other).toFixed(1)  
}