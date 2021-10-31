import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario =({crearCita}) => {
    
    const [cita,actualizarCita]= useState({ 
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //State error de cita
    const [error, actualizarError]= useState(false);

    const actualizarState = e => { 
        actualizarCita({ 
            ...cita,
            [e.target.name]: e.target.value
        })
    }
    const{ mascota, propietario, fecha, hora, sintomas }=cita;

    const submitCita = e => { 
        e.preventDefault();

        //Validar formulario
        if(mascota.trim() === ''|| propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
        actualizarError(true)
        return;
        }
        //Luego de validado, actualizar el state
        actualizarError(false)

        //Asignar ID al elemento
        cita.id = uuid();

        //Crear una cita
        crearCita(cita)

        //Reiniciar el formulario
        actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'' 
        })
    
        };

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}

            <form
            onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
                />
            <label>Nombre Dueño</label>
                <input
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño"
                onChange={actualizarState}
                value={propietario}
                />
             <label>Fecha</label>
                <input
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                /> 
             <label>Hora</label>
                <input
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
                />
            <label>Sintomas</label>
                <textarea
                name="sintomas"
                className="u-full-width"
                onChange={actualizarState}
                value={sintomas}
                />
            <button
            type="submit"
            className="u-full-width button-primary"
            >
                Agregar cita
            </button>
            </form>   
        </Fragment>
        
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;