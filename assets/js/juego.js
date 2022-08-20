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
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasMaquina = document.querySelector('#computadora-cartas')

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

//Turno de la Maquina
const turnoMaquina = (puntosMinimos) =>{
    do {
        const carta = pedirCarta();
        puntosMaquina = puntosMaquina + valorCarta (carta);
        puntosHTML[1].innerText = puntosMaquina;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasMaquina.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));
}

//Nota: Callback: Es una funcion que se esta mandando como argumento
//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta (carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoMaquina(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoMaquina(puntosJugador);
    }
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoMaquina(puntosJugador);
});