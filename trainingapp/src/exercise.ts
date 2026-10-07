interface Exercise {
  readonly name: string;
  readonly type: string;
  readonly muscle: string;
  readonly equipment: string;
  readonly difficulty: string;
  readonly instructions: string;
}

const baseExerciseInventory = {

};
type ExerciseName = keyof typeof baseExerciseInventory;
type ExerciseInventory = Readonly<
  Record<ExerciseName, Exercise> & {
    [otherName: string]: Exercise;
  }
>;
const exerciseInventory: ExerciseInventory = baseExerciseInventory as ExerciseInventory;
type PartialExerciseInventory = Readonly<Record<keyof ExerciseInventory, ExerciseInfo>>;

// recursively freeze the data structure.
function deepFreeze(obj: object) {
  Object.values(obj).forEach(
    (prop) => prop && typeof prop === 'object' && deepFreeze(prop)
  );
  Object.freeze(obj);
}
deepFreeze(baseExerciseInventory);

export {
  exerciseInventory,
  type ExerciseInventory,
  type Exercise,
  type PartialExerciseInventory,
};
