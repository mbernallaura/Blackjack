/*
    * C = TREBOLES
    * D = DIAMANTES
    * H = CORAZONES
    * S = PICAS
*/
//Funcion anonima y para autoinvocarse se coloca paraenteis en el inicio y final
//agregando dos mas en el final
//Esto sirve para que no se pueda llamar el objeto directamente
//A todo esto se le llama patron modulo
const miModulo = (() =>{
    //Este 'use strict' sirve para que el codigo sea mas limpio 
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);  
        }
        
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        //Hacer lo anterior de forma optima
        puntosHTML.forEach(elem => elem.innerText = 0)
        divCartasJugadores.forEach(elem => elem.innerHTML = '')
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Crea una nueva baraja 
    const crearDeck = () =>{
        deck = [];
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

        return _.shuffle(deck);
    }

    //Me permite pedir una carta
    const pedirCarta = () =>{ 
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
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

    //turno: 0= primer jugador y el ultimo es el turno de la maquina
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta (carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosMaquina] = puntosJugadores;

        setTimeout(() => {
            if(puntosMinimos === puntosMaquina){
                alert('Empatados')
            }else if(puntosMinimos > 21){
                alert('Perdiste, Gana la Computadora');
            }else if(puntosMaquina > 21){
                alert('Ganaste!');
            }else if(puntosMaquina > puntosMinimos){
                alert('Perdiste, Gana la Computadora');
            }
        }, 100);
    }

    //Turno de la Maquina
    const turnoMaquina = (puntosMinimos) =>{
        let puntosMaquina = 0;
        do {
            const carta = pedirCarta();
            puntosMaquina = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1)

        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
        
    }

    //Nota: Callback: Es una funcion que se esta mandando como argumento
    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta,0);

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
        turnoMaquina(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () =>{
        inicializarJuego();
    });

    //Si se retorna algo en una funcion eso es lo unico que sera publico
    //Para visualiar con otro nombre externo a este script se coloca como a continuacion
    return {nuevoJuego: inicializarJuego};
})();



