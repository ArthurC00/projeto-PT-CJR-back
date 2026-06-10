import { useState, useEffect } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
}


export function useProductSearch(query: string) {
  const [results, setResults] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:3001/produtos?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}