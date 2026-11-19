import type { Evolucao } from "../types/pokemon";

interface EvolutionChainProps {
  evolucoes: Evolucao[];
  

}

export default function EvolutionChain({evolucoes}: EvolutionChainProps) {
  if (!evolucoes || evolucoes.length <= 1){
    return <p className="sem-evolucao">Este Pokémon não possui evolucao.</p>;
  }
 
  return (
    <div>
      <h3>Evoluções</h3>
      <div className="evolucoes-grid">
        {evolucoes.map((ev) => (
          <div key={ev.id} className="evolucao-item">
            {ev.imagem && <img src={ev.imagem} alt={ev.nome} />}
            <span>{ev.nome}</span>
        </div>
      ))}
      </div>  
    </div>
  );
}