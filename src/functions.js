const _ = require('lodash')

function adjustVotes (list) {
  const subtotal = _.sum(_.values(list))
  const adjustedVotes = {}
  for (let party in list) {
    const newVote = (100 / subtotal) * list[party]
    adjustedVotes[party] = Number(newVote)
  }
  return adjustedVotes
}

export function calculate([national, labour, greens, nzf, act, top, māori, other]) {
  const electorates = {national: national[1], labour: labour[1], greens: greens[1], nzf: nzf[1], act: act[1], top: top[1], māori: māori[1], other: other[1]}
  const rawVotes = {national: national[0], labour: labour[0], greens: greens[0], nzf: nzf[0], act: act[0], top: top[0], māori: māori[0], other: other[0]}
  console.log(calculateVotes(electorates, rawVotes))
}


function calculateVotes (electorates, rawVotes) {

  const overhang = []

  for (let party in rawVotes) {
    // if votes < 5% and no electorate, votes = 0, else add to overhang array
    rawVotes[party] < 5 ? (!electorates[party] ? rawVotes[party] = 0 : overhang.push([party, electorates[party]])) && console.log('overhang', party): console.log('ok', party)
  }
  // get proportional share of votes with small parties removed
  const proportional = adjustVotes(rawVotes)
  // format object for saintLague function
  let allVotes = createVoteObject(proportional)
  // include overhang seats
  for (let party of overhang) {
    const target = _.findIndex(allVotes, ['party', party[0]])
    allVotes[target].allocated = party[1]
  }
  return saintLague(allVotes)
}

function formula (votes, idx) {
  const result = votes / (idx * 2 + 1)
  return result
}

function createVoteObject (obj) {
  const array = []
  _.forEach(obj, (votes, party) => {
    if (votes > 0) {
      const newObject = {}
      newObject.party = party
      newObject.votes = votes
      newObject.adjusted = votes
      newObject.allocated = 0
      array.push(newObject)
    }
  })
  return array
}

function saintLague (totals, idx = 0, seats = 120) {
  if (seats > 0) {
    let array = []
    for (let party of totals) {
      const quotient = formula(party.adjusted, idx)
      array.push(quotient)
    }
    const max = _.max(array) // find the current highest value
    const current = _.indexOf(array, max)
    totals[current].allocated++ // increase seat allocation
    totals[current].adjusted = formula(totals[current].votes, totals[current].allocated) // remove & replace highest value
    saintLague(totals, idx++, --seats) // continue!
  }
  if (seats === 0) {
  return totals
  }
}
