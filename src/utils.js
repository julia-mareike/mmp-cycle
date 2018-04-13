import {div, input, h2, button, ul, li, p} from '@cycle/dom'

function renderPartySlider (party, votes) {
  return div([
    input(`.${party}E`, {attrs: {type: 'checkbox', checked: votes[1]}}),
    `${party} ` + votes[0],
    input(`.${party}`, {attrs: {type: 'range', min: 0, max: 50, step: 0.1, value: votes[0]}})
  ])
}

// preliminary threshold calculation (temporary)
function renderPartySeats (party, votes) {
  let seats = null
  const threshold = votes[0] < 5 ? (!votes[1] ? 0 : 1) : votes[0]   
  return li(`${party}: ${threshold}, ${votes[1]}`)
}

function renderSeats (calculate) {
  console.log(calculate)
  return div([
    p('calculate', calculate)
  ])
}

export function renderSliders (state$) {
  return state$.map(({national, labour, greens, nzf, act, top, māori, other, total, calculate}) =>
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
        // renderPartySeats('National', national),
        // renderPartySeats('Labour', labour),
        // renderPartySeats('Greens', greens),
        // renderPartySeats('NZF', nzf),
        // renderPartySeats('Act', act),
        // renderPartySeats('TOP', top),
        // renderPartySeats('Māori', māori),
        // renderPartySeats('Other', other)
        renderSeats(calculate)
      ])
    ])
  )
}

export function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national[0] + +labour[0] + +greens[0] + +nzf[0] + +act[0] + +top[0] + +māori[0] + +other[0]).toFixed(1)  
}