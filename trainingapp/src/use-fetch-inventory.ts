import { useEffect, useState } from 'react';
import type { ExerciseInfo, PartialExerciseInventory } from './exerciseInventory';

async function safeFetchJson<T>(url: string | URL, init?: RequestInit) {
  return fetch(url, init).then((response) => {
    if (!response.ok) {
      throw new Error(
        `${url} returned status ${response.status} - (${response.statusText})}`,
      );
    }
    return response.json() as Promise<T>;
  });
}

/** PartialInventory is read only, remove the write protection from the type */
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

async function fetchInventory(baseURL: string): Promise<PartialExerciseInventory> {
  const inventory: Writeable<PartialExerciseInventory> = {};
  const kinds = ['foundation', 'protein', 'extra', 'dressing'];

  const kindPromises = kinds.map(async (kind) => {
    const nameList = await safeFetchJson<string[]>(
      new URL(`${kind}s`, baseURL),
    );

    const ingredientPromises = nameList.map(async (name) => {
      const info = await safeFetchJson<ExerciseInfo>(
        new URL(`${kind}s/${name}`, baseURL),
      ); 
    
      inventory[name] = info;
    });

    await Promise.all(ingredientPromises);
  });

  await Promise.all(kindPromises);

  return inventory;
}

function useFetchInventory(baseURL: string) {
  const [data, setData] = useState<PartialExerciseInventory>({});
  useEffect(() => {
    let ignore = false;
    fetchInventory(baseURL).then((inventory) => {
      if (!ignore) {
        setData(inventory);
      }
    });
    return () => {
      ignore = true;
    };
  }, [baseURL]);
  return data;
}

export { useFetchInventory, safeFetchJson, fetchInventory };