let btnGuardar = document.querySelector('#guardar');
let sectionTareas = document.querySelector('#tareas');
let introTarea = document.querySelector('#tituloTarea');
let introPrioridad = document.querySelector('#prioridad');
let mostrarMensaje = document.querySelector('#mensaje');
let selectSearch = document.querySelector('#prioridadSelect');
let inputSearch = document.querySelector('#search');
let noTareas = document.querySelector('#notareas');

pintarControlListaTareas(listaTareas.length);

btnGuardar.addEventListener('click', recogerForm);

/**Función que captura los datos introducidos por el usuario.*/
function recogerForm(event) {
    event.preventDefault();

    let titulo = introTarea.value;
    let prioridad = introPrioridad.value;
    mostrarMensaje.innerText = "";

    //Antes de guardar los datos, se comprueba que los campos titulo y prioridad esten cumplimentados, en caso contrario, se muestra un mensaje indicando que los campos deben de estar cumplimentados, y no se guardan los datos.
    if (titulo !== "" && prioridad !== "") {
        guardarDatos(listaTareas, titulo, prioridad);
    } else {
        mostrarMensaje.innerText = '¡OJO! No dejes campos sin rellenar';
    }

    introTarea.value = "";
    introPrioridad.value = "";
}

/**Función común para pintar una tarea.*/
function pintarUnaTarea(pNewListaTareas, pSectionTareas) {

    pintarControlListaTareas(listaTareas.length);

    let article = document.createElement('article');
    article.id = pNewListaTareas.idTarea;
    article.classList.add(pNewListaTareas.prioridad);

    let h2 = document.createElement('h2');
    h2.innerText = pNewListaTareas.titulo;

    let a = document.createElement('a');
    a.innerText = 'Eliminar';
    a.title = 'eliminar';
    a.dataset.id = pNewListaTareas.idTarea;
    a.addEventListener('click', eliminarTarea);

    article.appendChild(h2);
    article.appendChild(a);

    pSectionTareas.appendChild(article);
}

/**La función eliminarTarea(), se eliminan los elementos del DOM, pero no del Array().*/
function eliminarTarea(event) {
    let id = parseInt(event.target.dataset.id);
    let mensaje = borrarDatos(listaTareas, id);

    if (mensaje === 'eliminar') {
        let article = event.target.parentNode;
        let tarea = article.parentNode
        tarea.removeChild(article);
        location.reload();
    }
}

/**FILTRAR POR PRIORIDAD*/
selectSearch.addEventListener('change', recogerDatosSelect);

function recogerDatosSelect(event) {
    let prioridad = event.target.value;
    let listaPrioridades = filterByPrioridad(listaTareas, prioridad);

    if (prioridad === "") { location.reload(); }

    pintarListaTareas(listaPrioridades, sectionTareas);
}

function filterByPrioridad(pListaTareas, pPrioridad) {
    let resultado = pListaTareas.filter(prioridadTarea => prioridadTarea.prioridad === pPrioridad);

    pintarControlListaTareas(resultado.length);
    return resultado;
}

/**FILTRAR POR TAREA */
inputSearch.addEventListener('input', recogerDatosInput);

function recogerDatosInput(event) {
    let tarea = event.target.value;
    let listaTituloTareas = filterByTitulo(listaTareas, tarea);

    pintarListaTareas(listaTituloTareas, sectionTareas);
}

function filterByTitulo(pListaTareas, ptareas) {
    let resultado = pListaTareas.filter(tituloTarea => tituloTarea.titulo.toLowerCase().includes(ptareas.toLowerCase()));

    pintarControlListaTareas(resultado.length);
    return resultado;
}

/**Función común para pintar lista de tareas*/
function pintarListaTareas(pListaTareas, pSectionTareas) {
    sectionTareas.innerHTML = "";
    pListaTareas.forEach(tarea => pintarUnaTarea(tarea, pSectionTareas));
}

pintarListaTareas(listaTareas, sectionTareas);

/**Función común para pintar el mensaje "No existen tareas" */
function pintarControlListaTareas(pResultado) {
    if (pResultado !== 0) {
        noTareas.style.display = 'none'
    } else {
        noTareas.style.display = 'block'
        noTareas.innerText = 'No existen tareas';
    }
}    