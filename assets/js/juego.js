/*
    * C = TREBOLES
    * D = DIAMANTES
    * H = CORAZONES
    * S = PICAS
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

const crearDeck = () =>{
    for(let i = 2; i<= 10; i++){
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for(let esp of especiales){
        for(let tipo of tipos){
            deck.push(esp + tipo);
        }
    }

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();
