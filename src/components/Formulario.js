import React, { useState } from 'react'
import Error from './Error';

const Formulario = ({ setBusqueda }) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = e=> {
        e.preventDefault();
        // validar
        if( termino.trim()=== '') {
            setError( true );
            return
        }
        setError( false );
        // enviar termino de busqueda hacía el app
        setBusqueda( termino );
    }
    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                        type='text'
                        className='form-control form-contro-lg'
                        placeholder='Busca una imagen, ejemplo: futbol o café'
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input 
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {
                error &&
                    <Error 
                        mensaje='Agrega un término de busqueda'
                    />
            }
        </form>
    )
}

export default Formulario