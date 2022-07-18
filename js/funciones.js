let id = 1;
cargarLocalStorage();

/**Mediante la función guardarDatos(), añadimos elementos a listaTareas = new array().*/
function guardarDatos(listaTareas, pTitulo, pPrioridad) {
    const newListaTareas = {
        idTarea: id,
        titulo: pTitulo,
        prioridad: pPrioridad
    }

    listaTareas.push(newListaTareas);
    id++;

    guardarLocalStorage();
    pintarUnaTarea(newListaTareas, sectionTareas);
}

/**La función borrarDatos(), elimina los elementos de listaTareas = new array().*/
function borrarDatos(pListaTareas, pId) {
    listaTareas = pListaTareas.filter(tarea => tarea.idTarea !== pId);

    guardarLocalStorage();
    return 'eliminar';
}

/**LOCALSTORAGE */
function guardarLocalStorage() {
    localStorage.setItem('key-Tareas', JSON.stringify(listaTareas));
}

function cargarLocalStorage() {
    if (localStorage.getItem('key-Tareas')) {
        listaTareas = JSON.parse(localStorage.getItem('key-Tareas'));
    } else {
        listaTareas = [];
    }

    pintarLocalStorage(sectionTareas);
}

function pintarLocalStorage(pSectionTareas) {
    listaTareas.forEach(keyTareas => pintarUnaTarea(keyTareas, pSectionTareas));
}