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

// APIt skickar tillbaka en array av Exercise-objekt.
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchExercises()
      .then((exercises) => {
        if (!ignore) {
          setData(exercises);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError("Could not load exercises. Please try again later.");
          console.error("Failed to fetch exercises:", err);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { data, error };
}

export { useFetchExercises, safeFetchJson, fetchExercises };