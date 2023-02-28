import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slices/nameTrainer.slice'

import "./styles/Navbar.css"

const Navbar = () => {

  const dispacth = useDispatch()

  const handleOnClickLogOut = () => {
    dispacth(logOut())
  }

  return (
    <header className="header">
      <div className="header__red">
        <div className="header__img">
          <img src="/pokedex.svg" alt="" />
        </div>
      </div>
      <div className="header__black">
        <div className="header__pokeball">
          <button className="header__btn" onClick={handleOnClickLogOut}>
            <i class="bx bx-right-arrow-circle"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar