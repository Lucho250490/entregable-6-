import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'

import "./styles/Home.css"


const Home = () =>
{
  const dispatch = useDispatch()
  
  const handleSubmit = (e) =>  {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainerGlobal(nameTrainer))

  }


  return (
    <main className="home">
      <section className="home__coach">
        <div className="home__img">
          <img src="/pokedex.svg" alt="" />
        </div>

        <div className="home__welcome">
          <h2 className="home__greeting">!Hello Coatch!</h2>

          <p className="home__info">You can begin when you be loged</p>
        </div>

        <form className="home__form" onSubmit={handleSubmit} action="">
          <input
            className="home__input"
            required
            type="text"
            placeholder="Here writte your name "
            id="nameTrainer"
          ></input>
          <button className="home__btn">Log in</button>
        </form>
      </section>

      <section className="home__footer">
        <div className="home__footer-red">
          <div className="home__footer-ball-ex">
            <h5 className="home__text-red">R</h5>
          </div>
        </div>

        <div className="home__black">
          <div className="home__footer-ball-in">
            <h5 className="home__text-black">B</h5>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home