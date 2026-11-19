import { useState } from "react";
import type { Pokemon } from "./types/pokemon";
import { buscarPokemon } from "./services/pokeApi";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";

export default function App(){
   const [pokemon, setPokemon] = useState<Pokemon | null > (null);
   const [carregando, setCarregando] = useState<boolean> (false);
   const [erro, setErro] = useState<string | null>(null);

    const buscar = async (nome: string) =>{
        const limpo = nome.trim();

        if (!limpo){
            setPokemon(null);
            setErro("");
            return;
        }

        setCarregando(true);
        setErro("");

        try{    
            setPokemon(await buscarPokemon(limpo));
        }catch(e) {
            setPokemon(null);
            setErro(e instanceof Error ? e.message : "Erro ao buscar");
        }finally{
            setCarregando(false);
        }

    };

    return (
    <main>
        <div className="app-container">
            <h1 className="pokedex-title">Pokédex</h1>
            <SearchBar onBuscar = {buscar} />
            {carregando && <p className="loading-msg">Buscando...</p>}
            {erro && <p className="erro-msg">{erro}</p>}
            {pokemon && !carregando &&(
                <PokemonCard pokemon={pokemon}/>
            )}
        </div>
    </main>
    );
}