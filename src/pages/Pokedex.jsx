import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/pokedex/PokemonCard";
import "./styles/Pokedex.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setselectType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleOnChangeSelect = (e) => {
    setselectType(e.target.value);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const paginationLogic = () => {
    const pokemonsPerPage = 12;

    const sliceStart = (currentPage - 1) * pokemonsPerPage;
    const sliceEnd = sliceStart + pokemonsPerPage;
    const pokemonsInPage = pokemonFilter.slice(sliceStart, sliceEnd);

    const lastPage = Math.ceil(pokemonFilter.length / pokemonsPerPage);

    const pagesPerBlock = 5;
    const actualBlock = Math.ceil(currentPage / pagesPerBlock);

    const pagesInBlock = [];

    const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
    const maxPage = actualBlock * pagesPerBlock;

    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pagesInBlock, lastPage, pokemonsInPage };
  };

  const { pagesInBlock, lastPage, pokemonsInPage } = paginationLogic();

  const handleCickNextPage = () => {
    const newPage = currentPage + 1;

    if (newPage > lastPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
  };

  const handleCickPreviusPage = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      selectType ? `type/${selectType}/` : "pokemon/?limit=1000"
    }`;
    axios
      .get(URL)
      .then((res) => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map((pokemon) => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            };
          });

          setPokemons(pokemonByType);
        } else {
          setPokemons(res.data.results);
        }
      })
      .catch((err) => console.log(err));
  }, [selectType]);

  useEffect(() => {
    const pokemonByName = pokemons.filter((pokemon) =>
      pokemon.name.includes(pokemonName.toLowerCase())
    );
    setPokemonFilter(pokemonByName);
  }, [pokemonName, pokemons]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  return (
    <main
      className="pokedex"
      style={{ maxWidth: "1400px", margin: "20px auto" }}
    >
      <p className="pokedex__gratefull">
        <span className="pokedex__welcome">Welcome {nameTrainer} </span>
        here yuo can find your favorite pokemon{" "}
      </p>

      <form className="pokedex__form" onSubmit={handleSubmitName} action="">
        <div className="pokedex__btns">
          <input
            className="pokedex__input"
            required
            placeholder="Pokemon's name"
            type="text"
            id="pokemonName"
          />
          <button className="pokedex__btn"> sheach</button>
        </div>

        <select
          className="pokedex__select"
          onChange={handleOnChangeSelect}
          name=""
          id=""
        >
          <option className="pokedex__option-all" value="">
            All the pokemons
          </option>
          {types.map((type) => (
            <option className="pokedex__option" key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </form>

      <section
        className="PokedexCard-init"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {pokemonsInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      <section className="pokedex__pagination">
        <ul className="pokedex__pagination-ul">
          <li
            className="pokedex__pagination-previus"
            onClick={handleCickPreviusPage}
          >
            {<i className="bx bx-chevrons-left"></i>}
          </li>

          <li
            className="pokedex__pagination-current"
            onClick={() => setCurrentPage(1)}
          >
            {<i class="bx bx-dots-horizontal-rounded"></i>}
          </li>
          {pagesInBlock.map((page) => (
            <li className="paginationNumber" onClick={() => setCurrentPage(page)} key={page}>
              {page}
            </li>
          ))}
          <li
            className="pokedex__pagination-last"
            onClick={() => setCurrentPage(lastPage)}
          >
            {<i class="bx bx-dots-horizontal-rounded"></i>}
          </li>

          <li className="pokedex__pagination-next" onClick={handleCickNextPage}>
            {<i className="bx bx-chevrons-right"></i>}
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Pokedex;
