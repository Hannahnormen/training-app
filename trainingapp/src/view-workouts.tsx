import { Button } from './components/ui/button';
import { Outlet, useOutletContext, useParams, useNavigate } from "react-router";
import {useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';

import type { Workout } from './workout';
import { Badge } from "@/components/ui/badge";
import { safeFetchJson } from './use-fetch-exercises';

type PropsType = { 
  workouts: Workout[] 
  clearWorkouts?: () => void;
};

type WorkoutResponseType = {
  status: 'confirmed' | 'canceled';
  timestamp: string;
  uuid: string;
  totalDuration: number;
  workouts: string[][];
};

type ContextType = { workouts: Workout[]; clearWorkouts(): void };

function ViewWorkouts() {
  const { workouts } = useOutletContext<PropsType>();
  const { uuid } = useParams();
  const navigate = useNavigate();
  return (
   
    <div className='w-full'>
      <div className='text-center'>
        <h2 className='text-3xl font-extrabold'>My Workouts</h2>
        <p>Here you can see the workouts you have created</p>
      </div>
      {workouts.length === 0 && (
        <Card className='text-center'>
          You have no saved workouts yet. Go to "Create Workout" to create one!
        </Card>
      )}
      <div className='grid grid-cols-1'>
        {workouts.map((workout, index) => {
          const exercises = Object.values(workout.getExercises());
          const totalDuration = workout.totalDuration();
          const isNew = workout.uuid === uuid;

          return (
            <Card key={workout.uuid || index}>
              <CardHeader>
                <div> 
                  <CardTitle className='text-xl items-center'>
                    Workout #{index + 1}
                    {isNew && <Badge>New</Badge>}
                  </CardTitle>
                  <CardDescription>
                    Total {exercises.length} exercises
                  </CardDescription>
                </div>

                <div className='text-right'>
                  <span>
                    {totalDuration} min
                  </span>
                  <p>Total time for workout</p>
                </div>
            </CardHeader>

            <CardContent>
              <h4>
                Exercices:
              </h4>
              <div className="flex flex-col gap-2">
                {exercises.map((exercise, index) =>(
                  <div key={index} className='flex items-center gap-3'>
                      <span>{exercise.name}</span>
                      <Badge variant="outline">
                        {exercise.category || "Exercise"}
                      </Badge>

                    <Badge>
                      {exercise.duration ?? 0} min
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <Button onClick={() => navigate(`/do-workout/${workout.uuid}`)}>Do workout</Button>
          </Card>
          );
        })}
      </div>
    </div>
  );
}




/*
 * static content, rendered when the file is loaded.
 */
function SaveWorkotButton({workouts, clearWorkouts}: { workouts: Workout[]; clearWorkouts?: () => void}) {
  const [confirmation, setConfirmation] = useState<WorkoutResponseType | undefined>(undefined);
  const navigate = useNavigate();

  async function saveToServer() {
    const workoutData = workouts.map((workout) =>
      Object.keys(workout.getExercises())
    );
    const conf = await safeFetchJson<WorkoutResponseType>(
      'http://localhost:8080/view-workouts', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(workoutData)
      }
      
    );
    setConfirmation(conf);

  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button onClick={saveToServer}>Save Workout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Workout has been saved</AlertDialogTitle>
          <AlertDialogDescription>
            <div>Total time: {confirmation?.totalDuration} min</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (clearWorkouts) {
                clearWorkouts();
                navigate('/view-workout');
              }
              
            }}
          >
            Continue
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  

}
  

export default ViewWorkouts;
