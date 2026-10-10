import { useState, useEffect} from 'react';
import { useParams, useOutletContext, useNavigate} from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import {Button} from './components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { Workout } from './workout';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type PropsType = { workouts: Workout[]};

function DoWorkout() {
    const {workouts} = useOutletContext<PropsType>();
    const {uuid} = useParams();
    const navigate = useNavigate();

    const workout = workouts.find((w) => w.uuid === uuid);
    const exercises = workout ? Object.values(workout.getExercises()): [];

    const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
    const [showFinishDialog, setShowFinishDialog] = useState(false);

    const allChecked = exercises.length > 0 && exercises.every((ex) => checkedExercises[ex.name])

    if (!workout) {
        return <div>Workout not found</div>
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Active Workout</CardTitle>
                    <CardDescription>Check off exercises as you complete them.</CardDescription>
                </CardHeader>
               

            <CardContent>
                <h4>Exercises to complete</h4>

                <div>
                    {exercises.map((exercise, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id={`ex-${index}`}
                                    checked={!!checkedExercises[exercise.name]}
                                    onCheckedChange={(checked) => {
                                        setCheckedExercises({
                                            ...checkedExercises,
                                            [exercise.name]: !!checked,
                                        });
                                    }}
                                />

                                <label htmlFor={`ex-${index}`}>
                                    {exercise.name}
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({exercise.category || "exercise"})
                                    </span>
                                </label>

                                <Badge>{exercise.duration ?? 0} min</Badge>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <Button
                        disabled={!allChecked}
                        onClick={() => setShowFinishDialog(true)}
                    >
                        Finish Workout
                    </Button>
                </div>
            </CardContent>

            <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Workout completed! </AlertDialogTitle>
                        <AlertDialogDescription>
                            Great job! Would you like to save this workout for future use?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => navigate('/view-workouts')}
                        >
                            Keep Workout
                        </AlertDialogCancel>

                        <AlertDialogAction>
                            Delete Workout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            </Card>
        </div>
    );

}
    export default DoWorkout;
