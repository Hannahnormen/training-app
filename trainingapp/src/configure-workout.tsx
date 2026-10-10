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

    console.log(exerciseSettings);

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

                            <div>
                                <label>Sets</label>
                                <Input
                                type="number"
                                min="1"
                                placeholder="Sets"
                                value={exerciseSettings[exercise.value]?.sets ?? ""}
                                onChange={(event) =>
                                    updateExercise(exercise.value, "sets", event.target.value)
                                }
                                />
                            </div>

                            <div>
                                <label>Reps</label>
                                <Input
                                type="number"
                                min="1"
                                placeholder="Reps"
                                value={exerciseSettings[exercise.value]?.reps ?? ""}
                                onChange={(event) =>
                                    updateExercise(exercise.value, "reps", event.target.value)
                                }
                                />
                            </div>

                            <div>
                                <label>Rest (seconds)</label>
                                <Input
                                type="number"
                                min="0"
                                placeholder="Rest"
                                value={exerciseSettings[exercise.value]?.rest ?? ""}
                                onChange={(event) =>
                                    updateExercise(exercise.value, "rest", event.target.value)
                                }
                                onWheel={(event) => event.currentTarget.blur()}
                                />
                            </div>

                            </div>
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

export default ConfigureWorkout;