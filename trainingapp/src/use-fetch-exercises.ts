import { useEffect, useState } from 'react';
import type { Exercise } from './exercise';

async function safeFetchJson<T>(url: string | URL, init?: RequestInit) {
  return fetch(url, init).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status} (${response.statusText})}`);
    }
    return response.json() as Promise<T>;
  });
}

// API:t skickar tillbaka en array av Exercise-objekt.
async function fetchExercises(): Promise<Exercise[]> {
  const url = 'https://api.api-ninjas.com/v1/exercises';
  const apiKey = import.meta.env.VITE_API_KEY;
  
  return safeFetchJson<Exercise[]>(url, {
    headers: {
      'X-API-Key': apiKey
    }
  });
}

// Funktionen använder andra hooks, som useState och useEffect
function useFetchExercises() {
  const [data, setData] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchExercises().then((exercises) => {
      setData(exercises);
    });
  }, []);

  return data;
}

export { useFetchExercises, safeFetchJson, fetchExercises };