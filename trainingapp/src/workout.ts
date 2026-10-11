
import { v4 as uuidv4 } from "uuid";

type ExerciseInfo = {
  name: string;
  category: string;
  duration?: number;
  sets?: number;
  reps?: number;
  rest?: number;
};
type WorkoutInfo = {
  totalDuration: number;

}
class Workout {
    readonly exercises: Record<string, ExerciseInfo>;
    readonly uuid: string;
    
  constructor(init?: Record<string, ExerciseInfo>, uuid?: string) {
    this.exercises = init ?? {}; // använd init om den finns, annars ett tomt objekt
    this.uuid = uuid ?? uuidv4();
  }

  getExercises(): Record<string, ExerciseInfo> {
    return this.exercises;
  }

  add(name: string, info: ExerciseInfo): Workout {
    const newExercises = {
      ...this.exercises,
      [name]: info,
    }
    return new Workout(newExercises, this.uuid);
  }

  remove(name: string): Workout {
  const remainingExercises = Object.fromEntries(
    Object.entries(this.exercises).filter(([key]) => key !== name)
  );

  return new Workout(remainingExercises, this.uuid);
}

  totalDuration(): number {
    return Object.values(this.exercises).reduce(
      (total, exercise) => total + (exercise.duration ?? 0),
      0
    );
  }

  info(): WorkoutInfo {
    return {
      totalDuration: this.totalDuration(),
    }
  }

  static parse(json: string): Workout[] {
    const list = JSON.parse(json);

    if (!Array.isArray(list)) {
      throw new Error('Expected an Array');
    }

    return list.map((item) => {
      if (!item.exercises) {
        throw new Error('Missing exercises');
      }

      return new Workout(item.exercises, item.uuid);
    });
  }
}

export { Workout };