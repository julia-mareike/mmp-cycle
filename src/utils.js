import {div, input, h2, ul, li} from '@cycle/dom'

function renderPartySlider (party, votes) {
  return div([
    input(`.${party}E`, {attrs: {type: 'checkbox', checked: votes[1]}}),
    `${party} ` + votes[0],
    input(`.${party}`, {attrs: {type: 'range', min: 0, max: 50, step: 0.1, value: votes[0]}})
  ])
}

// refactor to map
function renderSeats (calculate) {
  return div([
    li(calculate[0].party + calculate[0].allocated),
    li(calculate[1].party + calculate[1].allocated),
    li(calculate[2].party + calculate[2].allocated),
    li(calculate[3].party + calculate[3].allocated),
    li(calculate[4].party + calculate[4].allocated)
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
      h2(total + '% of votes counted'),
      h2('seats'),
      ul([
        renderSeats(calculate)
      ])
    ])
  )
}

export function total (national, labour, greens, nzf, act, top, māori, other) {
  return (+national[0] + +labour[0] + +greens[0] + +nzf[0] + +act[0] + +top[0] + +māori[0] + +other[0]).toFixed(1)
}
