
import { Link, Outlet} from "react-router"
import { useState } from 'react';
import { Workout } from './workout';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuLink,
  NavigationMenuItem 
} from "@/components/ui/navigation-menu"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

type ExerciseOption = {
  label: string;
  value: string;
};

type WorkoutDraft = {
  warmup: ExerciseOption;
  exercises: Record<string, ExerciseOption>;
  cooldown: ExerciseOption;
};

function App() {
  const [workoutDraft, setWorkoutDraft] = useState<WorkoutDraft | null >(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<number>(() => {
    const saved = localStorage.getItem('completedWorkouts');
    return saved ? JSON.parse(saved) : 0;
  })

  const [totalMinutes, setTotalMinutes] = useState<number>( () => {
    const saved = localStorage.getItem('totalMinutes');
    return saved ? JSON.parse(saved) : 0;
  });

  function incrementCompleted(minutes: number) {
    setCompletedWorkouts((prev) => prev + 1);
    setTotalMinutes((prev) => prev + minutes);
  }

  const maxMinutes = 700;
  const percent = Math.min(Math.round((totalMinutes / maxMinutes) * 100), 100);

  // React ska komma ihåg alla skapade workouts
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    let existingWorkout = new Workout();

    existingWorkout = existingWorkout.add("Power walk", {
      name: "Power walk",
      category: "warmup",
      duration: 15,
    })
    existingWorkout = existingWorkout.add("Pushups", {
      name: "Pushups",
      category: "exercise",
      duration: 15,
    })

    existingWorkout = existingWorkout.add("Pullups", {
      name: "Pullups",
      category: "exercise",
      duration: 15,
    })

    existingWorkout = existingWorkout.add("Jumping Jacks", {
      name: "Jumping Jacks",
      category: "exercise",
      duration: 15,
    })

    existingWorkout = existingWorkout.add("Stretching", {
      name: "Stretching",
      category: "cooldown",
      duration: 15,
    })

    return [existingWorkout]

});
  
  function addWorkout(workout: Workout) {
    /** när vi får en ny Workout, skapa en array som innehåller alla gamla workouts + den nya */
    setWorkouts([...workouts, workout]);
  }

  function removeWorkout(uuid: string) {
    setWorkouts((currentWorkouts) => 
      currentWorkouts.filter((workout) => workout.uuid !== uuid)
    );
  }

  return (
    <>

    <div className="grid grid-rows-1 gap-4 w-full max-w-5xl">
      <h1 className="text-2xl font-extrabold text-center py-8">Our workout app</h1>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-1">
          <NavigationMenuItem>
             <NavigationMenuLink render={<Link to="/" />}>
                <span className="cursor-pointer text-sm font-medium"></span>
                Home
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink render={<Link to="/compose-workout" />}>
               Create Workout
            </NavigationMenuLink>
          </NavigationMenuItem>
           <NavigationMenuItem>
              <NavigationMenuLink render={<Link to="/view-workouts" />}>
                My Workout
              </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="relative w-full h-[350px] overflow-hidden shadow-lg items-center">
      <img
        src="https://t3.ftcdn.net/jpg/04/29/35/62/360_F_429356296_CVQ5LkC6Pl55kUNLqLisVKgTw9vjyif1.jpg"
        className="absolute inset-0 w-full object-cover"
      />

      <div className="relative z-10 w-72 ml-6 mt-12">
        <Card className="bg-slate-900/75 backdrop-blur-sm border-slate-700/50 text-white shadow-xl overflow-hidden">
          <CardHeader className="pb-2 pt-2">
            <CardTitle className="text-xl">MyProfile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs pb-2">
            <p><strong>Name: </strong>Hannah</p>
            <p><strong>Age: </strong>23</p>
            <p><strong>Completed workouts: </strong>{completedWorkouts}</p>
            <div>
              <span>Progress: </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${percent}%` }}
              />

            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
      <main>
        <Outlet 
          context={{ 
            workouts, 
            addWorkout, 
            removeWorkout,
            workoutDraft,
            setWorkoutDraft,
            incrementCompleted
          }} 
        />
      </main>
    </div>
    </>
  );
}

export default App;
