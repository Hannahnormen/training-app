
import { Link, Outlet} from "react-router"
import { useState } from 'react';
import { Workout } from './workout';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuLink,
  NavigationMenuItem 
} from "@/components/ui/navigation-menu"



function App() {
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

      <div className="W-full overflow-hidden shadow-lg">
      <img
        src="https://t3.ftcdn.net/jpg/04/29/35/62/360_F_429356296_CVQ5LkC6Pl55kUNLqLisVKgTw9vjyif1.jpg"
        className="w-full"
      />
    </div>
      <main>
        <Outlet context={{ workouts, addWorkout }} />
      </main>
    </div>
    </>
  );
}

export default App;
