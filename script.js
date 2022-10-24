let pantalla = document.querySelector('#horca');
let pincel = pantalla.getContext('2d');
const soloLetras = new RegExp(/^[a-zA-Z]+$/);
let listaPalabras = ['BIBLIOTECA', 'DOCUMENTO', 'HTML', 'CSS', 'JAVASCRIPT', 'ETIQUETA', 'FUNCION',
 'VARIABLE', 'CONSTANTE', 'ATRIBUTO', 'INDICE','WEB','PROGRAMACION','PROYECTO','TRABAJO','REPOSITORIO'];

let ganador = document.querySelector('#finGanador');
let perdedor = document.querySelector('#finPerdedor');

let btnIniciarPartida = document.querySelector('#iniciar');
btnIniciarPartida.addEventListener('click', iniciar);

let btnAgregarPalabra = document.querySelector('#agregarPalabra');
btnAgregarPalabra.addEventListener('click',botonAgregarPalabra);

let btnAgregarALista = document.querySelector('#agregarALista');
btnAgregarALista.addEventListener('click',agregarPalabra);

let btnNuevoJuego = document.querySelector('#nuevoJuego');
btnNuevoJuego.addEventListener('click',nuevoJuego);

let btnDesistir = document.querySelector('#desistir');
btnDesistir.addEventListener('click',reset);

let btnCancelar = document.querySelector('#cancelar');
btnCancelar.addEventListener('click', reset);







function dibujarBase() {
    document.querySelector('#containerInicio').style.display = 'none';
    document.querySelector('#containerJuego').style.display = 'block';
    document.querySelector('#botonesJuego').style.display = 'block';
    pincel.fillStyle = 'azure';
    pincel.fillRect(0,0,200,200);
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(0,197);
    pincel.lineTo(100,197);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 1*/
function dibujarBase1(){
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(50,197);
    pincel.lineTo(50,3);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 2 */

function dibujarBase2(){
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(50,3);
    pincel.lineTo(150,3);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 3 */

function dibujarBase3(){
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,3);
    pincel.lineTo(150,25);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 4 (cabeza) */

function dibujarBase4() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(150, 45, 20, 0, 2*3.14);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 5 (cuerpo) */

function dibujarBase5() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,65);
    pincel.lineTo(150,125);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 6 (brazo derecho) */

function dibujarBase6() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,75);
    pincel.lineTo(180,95);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 7 (brazo izquierdo) */

function dibujarBase7() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,75);
    pincel.lineTo(120,95);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 8 (pierna derecha) */

function dibujarBase8() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,125);
    pincel.lineTo(175,165);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

/* HORCA 9 (pierna izquierda) */

function dibujarBase9() {
    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.moveTo(150,125);
    pincel.lineTo(125,165);
    pincel.lineWidth = 2.5;
    pincel.stroke();
}

function iniciar() {
    fallos = 0;
    dibujarBase();
    palabraActual = dividirPalabra();
    document.onkeydown = validar;
    crearTeclado();
    inputVirtual();
}

function botonAgregarPalabra(){
    document.querySelector('#nuevaPalabra').value = '';
    document.querySelector('#containerInicio').style.display = 'none';
    document.querySelector('#containerPalabra').style.display = 'block';
}

function agregarPalabra(){
    let palabra = document.querySelector('#nuevaPalabra').value;
    let isValid = soloLetras.test(palabra);

    if (isValid) {
        let palabraFinal = palabra.toUpperCase();
        listaPalabras.push(palabraFinal);    
    }else {
        alert('ingresar palabra')
        return;
    }
    document.querySelector('#containerInicio').style.display = 'block';
    document.querySelector('#containerPalabra').style.display = 'none';
    console.log(listaPalabras);
    
}

function dividirPalabra() {
    let palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)];

    for (let i = 0; i < palabra.length; i++){
        let agregarClass = agregarDiv(palabra[i]);
        agregarClass.classList=`caja`;
    }
    return palabra;
}

function agregarDiv (letra) {

    /* CREA UN SPAN, ASIGNA LA LETRA, Y UNA CLASS*/
    let nuevoSpan = document.createElement('span');
    let contenidoSpan = document.createTextNode(letra);
    nuevoSpan.appendChild(contenidoSpan);

    let agregarClass = nuevoSpan;
    agregarClass.classList =`letra-escondida`;

    /* CREA UN DIV, INSERTA EL SPAN ANTERIOR Y LO INJECTA EN EL HTML*/

    let nuevoDiv = document.createElement('div');
    nuevoDiv.appendChild(nuevoSpan);
    let canva = document.querySelector('#guiones');
    let padre = document.querySelector('#letras');
    let insertarDiv = padre.insertBefore(nuevoDiv,canva);
    return insertarDiv;
    
}

function agregarDivLetrasErradas(letra){
    let nuevoSpan = document.createElement('span');
    let nuevoContenido = document.createTextNode(letra);
    nuevoSpan.appendChild(nuevoContenido);
    nuevoSpan.classList = 'letras-erradas'
    let divErrores = document.querySelector('#errores');
    divErrores.appendChild(nuevoSpan);
}

function validar(tecla) {
    let teclaPulsada = tecla.key;
    let codigoLetra = tecla.keyCode;
    let isValid = soloLetras.test(teclaPulsada);

    if (codigoLetra > 64 && codigoLetra < 91){
        if (isValid){
            teclaFiltrada = teclaPulsada.toUpperCase();
            juego(teclaFiltrada);
        }else return;
    }else return;
}

function juego(letra){
    let conjuntoLetras = document.querySelectorAll('.letras-erradas');
    let letrasEscondida = document.querySelectorAll('.letra-escondida');
    numeroDeLetras = palabraActual.length;
    if (letra.length === 1){
        if (palabraActual.includes(letra)){
            for (let i = 0; i < palabraActual.length; i++){
                if (letra === palabraActual[i]){
                    letrasEscondida[i].classList.add('mostrar');
                }
            }
        }else {
            for (let i = 0; i < conjuntoLetras.length; i++){
                if (letra === conjuntoLetras[i].innerText) return;
            }
            agregarDivLetrasErradas(letra);
            fallos++;
            dibujarTodo(fallos);
        }
    }else return;

    let letrasAdivinadas = document.querySelectorAll('.mostrar').length;
    if (letrasAdivinadas === numeroDeLetras){
        finDeJuego('ganador');
    }else if (fallos === 9){
        finDeJuego('perdedor')
    }
}

function dibujarTodo(numFallos){
    switch (numFallos) {
        case 1:
            dibujarBase1();
            break;
        case 2:
            dibujarBase2();
            break;
        case 3:
            dibujarBase3();
            break;
        case 4:
            dibujarBase4();
            break;
        case 5:
            dibujarBase5();
            break;
        case 6:
            dibujarBase6();
            break;
        case 7:
            dibujarBase7();
            break;
        case 8:
            dibujarBase8();
            break;
        case 9:
            dibujarBase9();
    }
}

function finDeJuego(frase){
    if (frase == 'ganador'){
        ganador.style.display = 'block';
    }else {
        perdedor.style.display = 'block';
    }
    document.querySelector('#letras1').style.display = 'none'
    document.onkeydown = false;
}

function reset(){
    document.querySelector('#letras').innerHTML = '';
    document.querySelector('#errores').innerHTML = '';
    document.querySelector('#letras1').innerHTML = '';
    document.querySelector('#containerJuego').style.display = 'none';
    document.querySelector('#botonesJuego').style.display = 'none';
    document.querySelector('#containerPalabra').style.display = 'none';
    document.querySelector('#containerInicio').style.display = 'block';
    ganador.style.display = 'none';
    perdedor.style.display = 'none';
    document.onkeydown = false;
}

function nuevoJuego(){
    reset();
    iniciar();
}

function crearTeclado(){
    let querty = 'QWERTYUIOPASDFGHJKLÑZXCVBNM';
    let letras1 = document.querySelector('#letras1');
    letras1.style.display = 'flex'

    for (let letra of querty){
        let newSpan = document.createElement('span');
        let newCont = document.createTextNode(letra);
        newSpan.appendChild(newCont);
        newSpan.classList.add('letra-teclado');
        letras1.appendChild(newSpan);
    }
}

function inputVirtual(){
    let divLetras = document.querySelector('#letras1');
    divLetras.onclick = (e) => {
        inputV = e.target.innerText;
        juego(inputV);
    }
}