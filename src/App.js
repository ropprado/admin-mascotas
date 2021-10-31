import { Fragment, useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Obtenciòn de citas si existenLocal Storage
  let citasInicialesState = JSON.parse (localStorage.getItem('citas'))
  if (!citasInicialesState) {
    citasInicialesState = []
  }
  
  // State para el listado de citas creadas
  const [citas, guardarCitas] = useState (citasInicialesState)

  //Hook que permite ejecutar funcionalidades cuando un state cambia
  useEffect(() => {
    //citas iniciales que se transforman de cadena a objeto
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

  }, [citas] )

  const crearCita = cita => {
    guardarCitas([...citas, cita])
  }

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional para citas
  const titulo =citas.length ===0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
     <h1>Administrador de Pacientes</h1>
     <div className="container">
       <div className="row">
         <div className="one-half column">
           <Formulario
             crearCita= {crearCita}
           />
         </div>
         <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
           ))}

         </div>
       </div>
     </div> 
     </Fragment> 
  );
}

export default App;
