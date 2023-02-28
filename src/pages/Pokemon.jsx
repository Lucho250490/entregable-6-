import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  const skills = () => {
    const maxPower = 150;
    
    const fracConst = (100/150)
    
    return fracConst
  }
  
  const {fracConst} = skills()
  
  console.log(fracConst)
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="pokemon">
      {/* parte superior  */}
      <section className="pokemon__avobe">
        <div className={`bg-${pokemon?.types[0].type.name}`}>Font</div>
        <div className="pokemon__img">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>

      {/* body */}

      <section className="pokemon__dates">
        <div className="pokemon__ref">
          <h2 className="pokemon__id"># {pokemon?.id}</h2>
          <h2 className="pokemon__name">{pokemon?.name}</h2>
        </div>

        <hr className="pokemon__line"></hr>

        <div className="pokemon__character">
          <div>
            <h5 className="pokemon__weight-title">Weight</h5>
            <h4 className="pokemon__character-pro">{pokemon?.weight}</h4>
          </div>

          <div>
            <h5 className="pokemon__height-title">Height</h5>
            <h4 className="pokemon__height-pro">{pokemon?.height}</h4>
          </div>
        </div>

        <div className="pokemons__types">
          <div className="pokemon__type">
            <h3 className="pokemon__title">Type</h3>
            <div className="pokemon__type-pro">
              {pokemon?.types.map((type) => (
                <div
                  className={`pokemon__names borde-${type.type.name}`}
                  key={type.type.map}
                  style={{ padding: "3px" }}
                >
                  <span className="pokemon__span">{type.type.name}</span>{" "}
                </div>
              ))}
            </div>
          </div>

          <div className="pokemon__ability">
            <h3 className="pokemon__ability-title">Skills</h3>
            <div className="pokemon__ability-name">
              {pokemon?.abilities.map((ability) => (
                <div
                  style={{
                    border: "1px solid gray",
                    padding: "3px",
                    borderRadius: "3px",
                  }}
                  key={ability.ability.url}
                >
                  <span>{ability.ability.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stacts */}

        <section className="pokemon__ability-stats">
          <h2 className="pokemon__ability-title">Stats</h2>

          <section className="pokemon__ability-stats">
            {pokemon?.stats.map((stat) => (
              <article className="pokemon__stat-prop">
                <div className="pokemon__stat-prop-name" key={stat.stat.name}>
                  <h4 className="pokemon__stat-prop-name-title">
                    {stat.stat.name}
                  </h4>
                  <h5 className="pokemon__stat-prop-name-subtitle">
                    {stat.base_stat}/150
                  </h5>
                </div>
                <div className="pokemon__stat-bar">
                  <div className="pokemon__stat-bar-ex">
                    <div
                      className="pokemon__stat-prop-name-in"
                      style={{
                        background: "linear-gradient(260deg, green, #fff)",
                        heidth: "20px",
                        width: `${stat.base_stat * (100 / 150)}%`,
                        padding: "0 5px ",
                      }}
                    >
                      Alcance en %
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Pokemon;
