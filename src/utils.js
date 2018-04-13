// import xs from 'xstream'
import {div, input, h2, button, ul, li} from '@cycle/dom'

function renderPartySlider (party, vote) {
  return div([
    input(`.${party}E`, {attrs: {type: 'checkbox', checked: vote[1]}}),
    `${party} ` + vote[0],
    input(`.${party}`, {attrs: {type: 'range', min: 0, max: 50, step: 0.1, value: vote[0]}})
  ])
}

// preliminary threshold calculation (temporary)
function renderPartySeats (party, votes) {
  let seats = null
  const threshold = votes[0] < 5 ? (!votes[1] ? 0 : 1) : votes[0]   
  return li(`${party}: ${threshold}, ${votes[1]}`)
}

export function renderSliders (state$) {
  return state$.map(({national, labour, greens, nzf, act, top, māori, other, total}) =>
    div('.sliders', [
      renderPartySlider('National', national),
      renderPartySlider('Labour', labour),
      renderPartySlider('Greens', greens),
      renderPartySlider('NZF', nzf),
      renderPartySlider('Act', act),
      renderPartySlider('TOP', top),
      renderPartySlider('Māori', māori),
      renderPartySlider('Other', other),
      h2(total +'% of votes counted'),
      h2('seats'),
      ul([
        renderPartySeats('National', national),
        renderPartySeats('Labour', labour),
        renderPartySeats('Greens', greens),
        renderPartySeats('NZF', nzf),
        renderPartySeats('Act', act),
        renderPartySeats('TOP', top),
        renderPartySeats('Māori', māori),
        renderPartySeats('Other', other)
      ])
    ])
  )
}

export function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national[0] + +labour[0] + +greens[0] + +nzf[0] + +act[0] + +top[0] + +māori[0] + +other[0]).toFixed(1)  
}