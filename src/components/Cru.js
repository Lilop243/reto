import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm i axios
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';


const Cru = () => {
  const URL = ('https://pruebatecn.herokuapp.com/datos')

  const [listaMento, setListaMento] = useState([])
  const [id, setId] = useState('')
  const [materia, setMateria] = useState('')
  const [monitor, setMonitor] = useState('')
  const [fecha, setFecha] = useState('')
  const [salon, setSalon] = useState('')
  const [buscar, setBuscar] = useState('')
  const [texto, setTexto] = useState('')
  const [bandera, setBandera] = useState(true)

  useEffect(() => {
    getMentos()
  }, [])

  function filtro() {

     return listaMento.filter(nombre => nombre.nombre.toLocaleLowerCase().includes(buscar) ) 
  }

  const [show, setShow] = useState(false);

  const getfiltro = async () => {
    const res = await axios.get(URL + '/' + texto)
    setListaMento(res.data)
  }

  const refresh = () => {
    getMentos()
    setBuscar('')
  }

  const buscando = () => {
    setListaMento(filtro())
  }

  const getMentos = async () => {
    const res = await axios.get(URL)
    setListaMento(res.data)
  }

  const addMento = async () => {
    let obj = { materia, monitor,fecha, salon }
    const res = await axios.post(URL, obj)
    console.log(res.data)
    setMateria('')
    setMonitor('')
    setFecha('')
    setSalon('')
  
  }

  const deleteMento = async (id) => {
    const res = await axios.delete(URL + '/' + id)
    console.log(res.data)
    getMentos()
  }

  // const getMento = async (id) => {
  //   const res = await axios.get(URL + '/obtener/' + id)
  //   setId(res.data.id)
  //   setMateria(res.data.materia)
  //   setMonitor(res.data.monitor)
  //   setFecha(res.data.fecha)
  //   setSalon(res.data.salon)
  //   setBandera(false)
  // }

  const addOrUpdateMento = () => {
    bandera ? addMento() : update()
  }

  const update = async () => {
    const obj = { id, materia, fecha, salon,  monitor }
    const res = await axios.put(URL + "/" + id, obj)
    console.log(res.data)
    setBandera(true)
    setMateria('')
    setMonitor('')
    setFecha('')
    setSalon('')
    getMentos()
  }


  return (
    <div className="container">

<button><Link to='/dashboard'>Regresar a Inicio</Link></button>


      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/"> REGISTRO DE MENTORIAS
        </a>
      </nav>

      <div className="row">

        <div className="col-md-4">
          <h1 className="text-primary">Universidad GeeK</h1>

          <input
            className="form-control mb-2" placeholder="filtro array" value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            onKeyUp={buscando}
          />
          <button
            className="btn btn-primary"
            onClick={refresh}>CONSULTAR</button>
        </div>

        <div className="col-md-4">

          <div className="card p-2 mt-3">

            <input
              className="form-control mb-2" placeholder="Materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
            />
            <input
              className="form-control mb-2" placeholder="Monitor"
              value={monitor}
              onChange={(e) => setMonitor(e.target.value)}
            />

            <input
              className="form-control mb-2" placeholder="Fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
             <input
              className="form-control mb-2" placeholder="Salon"
              value={salon}
              onChange={(e) => setSalon(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={addOrUpdateMento}>{bandera ? 'add' : 'update'}</button>
          </div>
        </div>

        <div className="col-md-4">
          <h3 > Mentorias Agregadas: {listaMento.length} </h3>

          <input
            className="form-control mb-2" placeholder="filtro db" value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyUp={getfiltro}
          />
        </div>
      </div>

      <div className="row mt-4 ">
        {listaMento.map(item => (
          <div key={item.id} className="col-md-4">
            <div className="card p-3 m-2 border-primary">
              <p>Materia: {item.materia}</p>
              <p>Monitor: {item.monitor}</p>
              <p>Fecha: {item.fecha}</p>
              <p>Salon: {item.salon}</p>
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMento(item.id)}>DELETE</button>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => {
                    setShow(true)
                    setMateria(item.materia)
                    setMonitor(item.monitor)
                    setFecha(item.fecha)
                    setSalon(item.salon)
                    setId(item.id)
                  }}>Editar</button>
              </div>
            </div>



          </div>

        ))}
      </div>
      {/* <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button> */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="col-md-4">

              <div className="card p-2 mt-3">

                <input
                  className="form-control mb-2" placeholder="Materia"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                />
                <input
                  className="form-control mb-2" placeholder="Monitor"
                  value={monitor}
                  onChange={(e) => setMonitor(e.target.value)}
                />
                 <input
              className="form-control mb-2" placeholder="Fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
             <input
              className="form-control mb-2" placeholder="Salon"
              value={salon}
              onChange={(e) => setSalon(e.target.value)}
            />
                <button onClick={() => update()}> Add</button>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Cru;