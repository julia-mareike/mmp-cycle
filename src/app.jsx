/* assumptions: no party will get over 50% of votes
                no non-5% party will get more than 1 electorate
   to do:       refactor!
*/                

import xs from 'xstream'
import {calculateVotes, saintLague} from './functions.js'
import {renderSliders, total} from './utils.js'

function view(state$) {
      return renderSliders(state$) 
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
    return {national: [national, nationalE],
            labour: [labour, labourE],
            greens: [greens, greensE],
            nzf: [nzf, nzfE],
            act: [act, actE], 
            top: [top, topE], 
            māori: [māori, māoriE], 
            other: [other, otherE], 
            total: total(national, labour, greens, nzf, act, top, māori, other)}
  })
}

export function App (sources) {
  return {DOM: view(model(intent(sources.DOM)))}
}
