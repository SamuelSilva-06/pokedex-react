import { useState} from "react";


interface SearchBarProps {
  onBuscar: (nome: string) => void;
}

export default function SearchBar({ onBuscar }: SearchBarProps) {
    const [termo, setTermo] = useState("");
    return(
        <form
            className="search-bar"
            onSubmit={(e) => {
            e.preventDefault();
            onBuscar(termo);
            
      }}

    >
        <input
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Digite o Nome ou Numero do Pokémon"
        />

        <button type="submit">Buscar</button>
    </form>
    )
}
