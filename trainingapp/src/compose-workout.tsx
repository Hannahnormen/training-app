import { useFetchExercises } from './use-fetch-exercises';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Card,
  CardContent,
  CardHeader,
} from './components/ui/card';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { useNavigate, useOutletContext } from "react-router";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

type ExerciseOption = {
  label: string;
  value: string;
};

type WorkoutDraft = {
  warmup: ExerciseOption;
  exercises: Record<string, ExerciseOption>;
  cooldown: ExerciseOption;
}

type PropType = {
  setWorkoutDraft: (draft: WorkoutDraft) => void;
};

function ComposeWorkout() {
  const { setWorkoutDraft } = useOutletContext<PropType>();
  const exercises = useFetchExercises();

  const [warmup, setWarmup] = useState<ExerciseOption | null>(null);
  const [selectedExercise, setExercises] = useState<Record<string, ExerciseOption>>({});
  const [cooldown, setCooldown] = useState<ExerciseOption | null>(null);
  const [showError, setShowError] = useState(false);

  console.log(selectedExercise);

  const navigate = useNavigate();

  // Gör API-övningar till select-alternativ
  const exerciseOptions: ExerciseOption[] = exercises.map((ex) => ({
    value: ex.name,
    label: ex.name,
  }));

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setShowError(true);

    if (
      warmup &&
      Object.keys(selectedExercise).length >= 2 &&
      cooldown
    ) {
      setWorkoutDraft({
        warmup: warmup,
        exercises: selectedExercise,
        cooldown: cooldown,
      })
      
      navigate('/configure-workout');
    }
  }

  return (
    <Card>
      <CardHeader>
        Create Workout
        Choose the exercises you want in your workout
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <SelectExercise
            label="Choose warmup"
            value={warmup}
            options={exerciseOptions}
            onValueChange={setWarmup}
            showError={showError}
          />

          <div className="my-4">
            <FieldLabel className="text-base font-semibold">
              Choose at least two exercises
            </FieldLabel>

            {showError && Object.keys(selectedExercise).length < 2 && (
              <FieldError>Choose at least two exercises.</FieldError>
            )}

            <div className="mt-2 grid grid-cols-2 gap-2">
              {exerciseOptions.map((exercise) => (
                <div key={exercise.value}>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={exercise.value}
                      checked={!!selectedExercise[exercise.value]}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setExercises({
                            ...selectedExercise,
                            [exercise.value]: exercise,
                          });
                        } else {
                          const remainingExercises = Object.fromEntries(
                            Object.entries(selectedExercise)
                              .filter(([key]) => key !== exercise.value)
                          );

                          setExercises(remainingExercises);
                        }
                      }}
                    />

                    <label htmlFor={exercise.value}>
                      {exercise.label}
                    </label>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <SelectExercise
            label="Choose cooldown"
            value={cooldown}
            options={exerciseOptions}
            onValueChange={setCooldown}
            showError={showError}
          />

          <div className="mt-4 flex justify-end">
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

type SelectExerciseType = {
  label: string;
  value: ExerciseOption | null;
  onValueChange: (value: ExerciseOption | null) => void;
  options: ExerciseOption[];
  showError: boolean;
};

function SelectExercise({
  label,
  value,
  onValueChange,
  options,
  showError,
}: SelectExerciseType) {
  const invalid = !value && showError;

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={label} className="text-base font-semibold">
        {label}
        <span aria-hidden="true" className="-ml-1.5">
          *
        </span>
      </FieldLabel>

      <Select
        name={label}
        value={value?.value || ""}
        required
        onValueChange={(val) => {
          const found = options.find((opt) => opt.value === val);
          onValueChange(found || null);
        }}
      >
        <SelectTrigger aria-invalid={invalid} className="w-sm">
          <SelectValue placeholder="Make a choice" />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {invalid && <FieldError>Gör ett val.</FieldError>}
    </Field>
  );
}

export default ComposeWorkout;