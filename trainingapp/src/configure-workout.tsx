import { Workout } from '@/workout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useOutletContext, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ExerciseOption = {
  label: string;
  value: string;
};

type WorkoutDraft = {
  warmup: ExerciseOption;
  exercises: Record<string, ExerciseOption>;
  cooldown: ExerciseOption;
};

type ContextType = {
  workoutDraft: WorkoutDraft | null;
  addWorkout: (workout: Workout) => void;
  setWorkoutDraft: (draft: WorkoutDraft | null) => void;
};

type ExerciseSettings = {
  sets?: number;
  reps?: number;
  rest?: number;
};

function ConfigureWorkout() {
    const { workoutDraft, addWorkout, setWorkoutDraft } =
        useOutletContext<ContextType>();
    const navigate = useNavigate();

    const [exerciseSettings, setExerciseSettings] = useState<
         Record<string, ExerciseSettings>
    >({});

    const [showError, setShowError] = useState(false);

    function updateExercise(
        name: string,
        field: keyof ExerciseSettings,
        value: string
        ) {
        setExerciseSettings((previous) => ({
            ...previous,
            [name]: {
            ...previous[name],
            [field]: value === "" ? undefined : Number(value),
            },
        }));
    }

    function isValidExercise(name: string): boolean {
        return (
            !isInvalidField(name, "sets") &&
            !isInvalidField(name, "reps") &&
            !isInvalidField(name, "rest")
        );
    }

    function isInvalidField(
        name: string,
        field: keyof ExerciseSettings
    ): boolean {
        const value = exerciseSettings[name]?.[field];

        if (value === undefined || !Number.isInteger(value)) {
            return true;
        }

        if (field === "rest") {
            return value < 0;
        }

        return value < 1;
    }

    if (!workoutDraft) {
        return <p>No workout selected.</p>;
    }

    return (
        <Card>
        <CardHeader>
            <h2 className="text-xl font-bold">Configure Workout</h2>
            <p>Choose sets, reps and rest for your exercises.</p>
        </CardHeader>

        <CardContent>
            <h3 className="font-semibold mb-4">Selected Exercises</h3>

                {Object.values(workoutDraft.exercises).map((exercise) => (
                    <div key={exercise.value} className="mb-6">
                        <p className="font-semibold mb-2">{exercise.label}</p>
                        <div className="flex gap-4">
                            <ExerciseInput
                                label="Sets"
                                min={1}
                                value={exerciseSettings[exercise.value]?.sets}
                                invalid={showError && isInvalidField(exercise.value, "sets")}
                                onChange={(value) => updateExercise(exercise.value, "sets", value)}
                            />

                            <ExerciseInput
                                label="Reps"
                                min={1}
                                value={exerciseSettings[exercise.value]?.reps}
                                invalid={showError && isInvalidField(exercise.value, "reps")}
                                onChange={(value) => updateExercise(exercise.value, "reps", value)}
                            />

                            <ExerciseInput
                                label="Rest (seconds)"
                                min={0}
                                value={exerciseSettings[exercise.value]?.rest}
                                invalid={showError && isInvalidField(exercise.value, "rest")}
                                onChange={(value) => updateExercise(exercise.value, "rest", value)}
                            />
                        </div>

                            {showError && !isValidExercise(exercise.value) && (
                                <p className="text-red-500 text-sm mt-2">
                                    Please enter valid sets, reps and rest values.
                                </p>
                            )}

                    </div>
                ))}

                <div className="mt-6 flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/compose-workout')}
                    >
                        Back
                    </Button>

                    <Button onClick={handleSave}>
                        Save Workout
                    </Button>
                </div>
        </CardContent>
        </Card>
    );

    function handleSave() {
        if (!workoutDraft) return;

        setShowError(true);

        const allValid = Object.keys(workoutDraft.exercises).every(isValidExercise);

        if (!allValid) {
            return;
        }

        let workout = new Workout();

        // Lägg till uppvärmning
        workout = workout.add(workoutDraft.warmup.value, {
            name: workoutDraft.warmup.label,
            category: 'warmup',
            duration: 10,
        });

        // Lägg till alla valda övningar
        Object.values(workoutDraft.exercises).forEach((exercise) => {
            const settings = exerciseSettings[exercise.value];

            workout = workout.add(exercise.value, {
            name: exercise.label,
            category: 'exercise',
            duration: 15,
            sets: settings?.sets,
            reps: settings?.reps,
            rest: settings?.rest,
            });
        });

        // Lägg till nedvarvning
        workout = workout.add(workoutDraft.cooldown.value, {
            name: workoutDraft.cooldown.label,
            category: 'cooldown',
            duration: 10,
        });

        // Spara träningspasset
        addWorkout(workout);

        // Töm det påbörjade träningspasset
        setWorkoutDraft(null);

        // Gå till det sparade träningspasset
        navigate(`/view-workouts/new/${workout.uuid}`);
    }
}

type ExerciseInputProps = {
    label: string;
    value: number | undefined;
    min: number;
    invalid: boolean;
    onChange: (value: string) => void;
};

function ExerciseInput({
    label,
    value,
    min,
    invalid,
    onChange,
}: ExerciseInputProps) {
    return (
        <div>
            <label>{label}</label>
            <Input
                type="number"
                min={min}
                placeholder={label}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
                aria-invalid={invalid}
                className={invalid ? "border-red-500" : ""}
            />
        </div>
    );
}

export default ConfigureWorkout;