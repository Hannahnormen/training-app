import { useState, useEffect} from 'react';
import { useParams, useOutletContext, useNavigate} from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import {Button} from './components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import type { Workout } from './workout';

type PropsType = { workouts: Workout[]};

function DoWorkout() {
    const {workouts} = useOutletContext<PropsType>();
    const {uuid} = useParams();
    const navigate = useNavigate();

    const workout = workouts.find((w) => w.uuid === uuid);
    const exercises = workout ? Object.values(workout.getExercises()): [];

    const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

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
                                <div >
                                    <Checkbox id={`ex-${index}`} checked={!!checkedExercises[exercise.name]}
                                    onCheckedChange={(checked) =>{
                                        setCheckedExercises({
                                            ...checkedExercises,
                                            [exercise.name]: !!checked,
                                        })
                                    }}
                                    />
                                        <label htmlFor={`ex-${index}`}>
                                            {exercise.name}<span>({exercise.category || "exercise"})</span>
                                        </label>
                                    </div>
                                    <Badge>{exercise.duration ?? 0} min </Badge>
                                </div>
                        ))}
                    </div>
                    <div>
                        <Button 
                            disabled={!allChecked}
                            onClick={() => {
                                alert("Workout finished!")
                                navigate('/view-workouts')
                            }}
                        >Workout Finished</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

}
    export default DoWorkout;
