type ExerciseType = 'warmup' | 'exercise' | 'cooldown';

interface ExerciseInfo {
  readonly type: ExerciseType;
  readonly duration: number;
  readonly beginnerFriendly?: boolean;
  readonly highIntensity?: boolean;
}

const baseExerciseInventory = {

};
type ExerciseName = keyof typeof baseExerciseInventory;
type ExerciseInventory = Readonly<
  Record<ExerciseName, ExerciseInfo> & {
    [otherName: string]: ExerciseInfo;
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
  type ExerciseType,
  type ExerciseInfo,
  type PartialExerciseInventory,
};
