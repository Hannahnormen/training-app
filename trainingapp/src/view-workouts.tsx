import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { useOutletContext, useParams, useNavigate } from 'react-router';
import type { Workout } from './workout';
import { Badge } from "@/components/ui/badge";

type PropsType = {
  workouts: Workout[];
};

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
                Exercises:
              </h4>
              <div className="flex flex-col gap-2">
                {exercises.map((exercise, index) => (
                  <div key={index} className="flex flex-col gap-1">

                    <div className="flex items-center gap-3">
                      <span>{exercise.name}</span>

                      <Badge variant="outline">
                        {exercise.category || "Exercise"}
                      </Badge>

                      <Badge>
                        {exercise.duration ?? 0} min
                      </Badge>
                    </div>

                    {exercise.category === "exercise" && (
                      <p className="text-sm text-gray-500">
                        {exercise.sets} sets · {exercise.reps} reps · {exercise.rest} sec rest
                      </p>
                    )}

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
  
export default ViewWorkouts;
