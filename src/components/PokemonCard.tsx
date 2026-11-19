import type { Pokemon } from '../types/pokemon';
import EvolutionChain  from './EvolutionChain';

interface PokemonCardProps{
    pokemon: Pokemon
}

export default function PokemonCard({pokemon}: PokemonCardProps){
    return(
        <div className="pokemon-card">

            <div className="pokemon-header">
                <h2 className="pokemon-nome">{pokemon.nome}</h2>
                <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
            </div>

            {pokemon.imagem && (
                <img
                  src={pokemon.imagem} 
                  alt={pokemon.nome} 
                  className="pokemon-img"
                />
            )}
            
            <div className="pokemon-stats">
                <div className="stat-box">
                    <span>Altura</span>
                    <strong>{pokemon.altura / 10} m</strong>
                </div>
                <div className="stat-box">
                    <span>Peso</span>
                    <strong>{pokemon.peso / 10} kg</strong>
                </div>
            </div>
            
            <div className="evolucoes-secao">
                 <EvolutionChain evolucoes = {pokemon.evolucoes} />
            </div>


        </div>
    );
}