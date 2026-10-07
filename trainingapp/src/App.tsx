
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
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  
  function addWorkout(workout: Workout) {
    /** när vi får en ny Workout, skapa en array som innehåller alla gamla workouts + den nya */
    setWorkouts([...workouts, workout]);
  }

  return (
    <>

    <div className="grid grid-rows-1 gap-4 w-full max-w-5xl">
      <h1 className="text-2xl font-extrabold text-center py-8">Our workout app</h1>
      <NavigationMenu className="w-full justify-center">
        <NavigationMenuList>
          <NavigationMenuItem>
             <NavigationMenuLink render={<Link to="/" />}>
                <span className="cursor-pointer"></span>
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

      <div className="W-full">
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
