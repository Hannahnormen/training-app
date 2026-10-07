import { useFetchExercises } from './use-fetch-exercises';
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
import { Workout } from '@/workout';
import { useNavigate, useOutletContext } from "react-router";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

/**
 * @returns an array with all names of ingridients with the given @type
 */


type ExerciseOption = {
  label: string;
  value: string;
}

type PropType = {
  addWorkout: (workout: Workout) => void;
};

function ComposeWorkout( ) {
  const { addWorkout } = useOutletContext<PropType>();
  const exercises = useFetchExercises();

  const [warmup, setWarmup] = useState<ExerciseOption|null>(null);
  const [selectedExercise, setExercises] = useState<Record<string, ExerciseOption>>({});
  const [cooldown, setCooldown] = useState<ExerciseOption|null>(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  
  //Gör API-övningar till select alternativ
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
      let workout = new Workout();

      workout= workout.add(warmup.value, {
        name: warmup.label,
        category: 'warmup',
        duration: 10,
      });

      workout= workout.add(cooldown.value, {
        name: cooldown.label,
        category: 'cooldown',
        duration: 10,
      });

      Object.keys(selectedExercise).forEach((name) => {
        workout = workout.add(name, {
          name: selectedExercise[name].label,
          category: 'exercise',
          duration: 15,
        });
       })

      addWorkout(workout);

      setWarmup(null);
      setExercises({});
      setCooldown(null);
    

      setShowError(false);
      navigate(`/view-workout/new/${workout.uuid}`);
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

      
       
          <SelectExercise
            label="Choose cooldown"
            value={cooldown}
            options={exerciseOptions}
            onValueChange={setCooldown}
            showError={showError}
          />
          <div>
           
          </div>
         
          <div className="mt-4 flex justify-end">
            <Button type="submit">
              Save workout
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

type SelectExerciseType = {
  label: string;
  value: ExerciseOption|null;
  onValueChange: (value: ExerciseOption|null) => void;
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
        id={label}
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
