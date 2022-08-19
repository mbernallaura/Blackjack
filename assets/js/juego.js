/*
    * C = TREBOLES
    * D = DIAMANTES
    * H = CORAZONES
    * S = PICAS
*/


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

//Crea una nueva baraja 
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

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Me permite pedir una carta

const pedirCarta = () =>{ 

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    let cartaSelec = deck.pop();
    console.log({cartaSelec});
    return cartaSelec;
}

pedirCarta();
