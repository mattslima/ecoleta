function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }
    })
}
    
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione sua cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]" )
    .addEventListener("change", getCities)
   
    // itens de coleta

const itensToCollect = document.querySelectorAll(".itens-grid li")    
for (const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []
function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript 
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id
    //verificar  se existem itens selecionados, 
    //se sim pegar os itens selecionados

    console.log('ITEMID:', itemId)
    const alreadySelected = selectedItens.findIndex(function(item){
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })
    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >=0 ){
        //tirar da seleção
        const filteredItens = selectedItens.filter(item =>{
            const ItemIsDifferent = item != itemId
            return ItemIsDifferent
        })
        selectedItens = filteredItens
    } else {
         // se não estiver selecionado, adicionar a seleção
         selectedItens.push(itemId)
         console.log('selectedItens', selectedItens)
    }
   

    //atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens
}