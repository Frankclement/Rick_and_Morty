
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hook/useFetch.js'
import UserCard from './components/CardResident.jsx'
import InfoLocation from './components/InfoLocation.jsx'
import CardResident from './components/CardResident.jsx'

function App() {
  const [locationId, setLocationId] = useState(Math.floor(Math.random() * 126) + 1)

  const url = `https://rickandmortyapi.com/api/location/${locationId}`


  const [location, getLocation, isLoading, hasError] = useFetch(url)

  useEffect(() => {
    getLocation()

  }, [locationId])

  const inputLocation = useRef()

  const handleLocation = e => {
    e.preventDefault()
    setLocationId(inputLocation.current.value.trim())

  }

  return (
    <div className='app'>
      <h1 className='app__title'>
      </h1>
      <div className='app__img-container'>
        <img className='app__img-letra' src="../public/img/letra.png" alt="" />
        <img className='app__img' src="../public/img/1.png" alt="" />
      </div>
       <h1 className='app__text'>Escribe un numero entre el rango de   1 al 126</h1>

      <form className='app__form' action="" onSubmit={handleLocation}>
        <input className='app__input' ref={inputLocation} type="text" />
        <button className='app__btn'>Buscar</button>
      </form>

      {isLoading
        ? <h2>loading...</h2>
        : hasError || locationId === '0'

          ? <h2 className='app__error'> ❌¡Ey! debes proporcionar una identificación del 1 al 126 </h2>
          : (
            <>
              <InfoLocation
                location={location}

              />

              <div className='app__card-container'>{
                location?.residents.map(url => (
                  <CardResident
                    key={url}
                    url={url}

                  />

                ))
              }</div>
            </>

          )
          


      }




    </div>




  )
}

export default App
