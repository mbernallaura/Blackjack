/*
    * C = TREBOLES
    * D = DIAMANTES
    * H = CORAZONES
    * S = PICAS
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosMaquina = 0;
    
//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

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

    const cartaSelec = deck.pop();
    return cartaSelec;
}

//Nota: Todos los strings en JS, pueden ser trabajados como si fueran un arreglo
//Nota2: isNaN = Evalua la condicion para saber si no es un numero, y regresa un booleano

const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1);
    /*let puntos = 0;
    if(isNaN(valor)){
        puntos = (valor === 'A') ? 11 : 10;
    }else{
        console.log('Es un numero');
        //Se multiplica por 1 para convertir el string numerico en un numero real, para luego poderlo sumar
        puntos = valor * 1;
    }*/
    //Manera Optima de hacer lo anterior
    return (isNaN(valor)) ?
           (valor === 'A') ? 11 : 10
           : valor * 1;
}

//Nota: Callback: Es una funcion que se esta mandando como argumento
//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta (carta);
    puntosHTML[0].innerText = puntosJugador;

    console.log({puntosJugador});
});