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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import type { Workout } from './workout';
import { Badge } from "@/components/ui/badge";
import { safeFetchJson } from './use-fetch-inventory';

type PropsType = { workouts: Workout[] };

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
  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          <Outlet context={{ workouts }} />
          <Table>
            {tableHead}
            <TableBody>
              {workouts.map( (workout) => (
              <TableRow key={workout.uuid}>
                <TableCell className="font-normal">
                    {Object.keys(workout.getExercises()).join(', ')}
                    {workout.uuid === uuid && (
                      <Badge>New</Badge>
                    )}
                </TableCell>

                <TableCell>
                  <div>
                    {workout.totalDuration()} min
                  </div>
                </TableCell>
              </TableRow> 
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={1}>Total time</TableCell>
                <TableCell className="text-right tabular-nums">
                  {workouts.reduce((total, workout) =>
                    total + workout.totalDuration()
                  , 0) 
                  } min
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}



/*
 * static content, rendered when the file is loaded.
 */
function SaveWorkotButton() {
  const {workouts, clearWorkouts } = useOutletContext<ContextType>();
  const [confirmation, setConfirmation] = useState<WorkoutResponseType | undefined>(undefined);
  const navigate = useNavigate();

  async function saveToServer() {
    const workoutData = workouts.map((workout) =>
      Object.keys(workout.getExercises())
    );
    const conf = await safeFetchJson<WorkoutResponseType>(
      'http://localhost:8080/workouts', 
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
              clearWorkouts();
              navigate('/view-workout');
            }}
          >
            Continue
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  

}
  
const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Exercises</TableHead>
      <TableHead className="font-semibold text-center">Time</TableHead>
    </TableRow>
  </TableHeader>
);
const cardHead = (
  <CardHeader>
    <CardTitle>My Workouts</CardTitle>
    <CardDescription>Here are all the exercises you have created</CardDescription>
    <CardAction><SaveWorkotButton /></CardAction>
  </CardHeader>
);
export default ViewWorkouts;
