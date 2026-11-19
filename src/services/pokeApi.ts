    import type { Pokemon, Evolucao } from "../types/pokemon";

    interface PokemonApiResponse{
        id: number,
        name: string,
        height: number,
        weight: number,
        sprites: { front_default: string | null };
        species: { url: string };

    }

    interface SpeciesApiResponse {
        evolution_chain: { 
            url: string 
        }
    }

    interface ChainLink {
      species: { name: string };  
      evolves_to: ChainLink[];
    }

    interface EvolutionChainApiResponse {
      chain: ChainLink;
    }


    export const buscarPokemon = async (nome: string | number): Promise<Pokemon > => {

        const termoBusca = typeof nome === 'string' ? nome.toLowerCase() : nome;  
        const resposta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${termoBusca}`
        );

        if (!resposta.ok) {
            throw new Error(`Pokémon não Encontrado`);    
        }


        const dados: PokemonApiResponse = await resposta.json();

        const speciesResponse = await fetch(dados.species.url);

        if(!speciesResponse.ok){

          throw new Error("Não foi possível buscar a espécie");

        }

        const speciesData = (await speciesResponse.json()) as SpeciesApiResponse;

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);

        if (!evolutionResponse.ok) {

          throw new Error("Não foi possível buscar as evoluções");
          
        }

        const evolutionData = (await evolutionResponse.json()) as EvolutionChainApiResponse;

        const nomesEvolucoes: string[] = [];
        let eloAtual: ChainLink | undefined = evolutionData.chain;

        while (eloAtual) {
        nomesEvolucoes.push(eloAtual.species.name);
        eloAtual = eloAtual.evolves_to[0]; 
      }


        const evolucoesPromises = nomesEvolucoes.map(async (nomeEvolucao) => {
        const evResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nomeEvolucao}`
        );            
        
        
        if (!evResponse.ok) {

          throw new Error(`Evolução não Encontrado`);
          
        }

        const evData = (await evResponse.json()) as PokemonApiResponse;

        return {
          id: evData.id,
          nome: evData.name,
          imagem: evData.sprites.front_default
        } as Evolucao;
      });

      const evolucoes = await Promise.all(evolucoesPromises);

      return {
        id: dados.id,
        nome: dados.name,
        imagem: dados.sprites.front_default,
        altura: dados.height,
        peso: dados.weight,
        evolucoes
      };
        
    }