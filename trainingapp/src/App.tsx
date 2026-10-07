
import { Link} from "react-router"
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuLink,
  NavigationMenuItem 
} from "@/components/ui/navigation-menu"


function App() {
  
  return (
    <div className="grid grid-rows-1 gap-4 w-full max-w-5xl">
      <h1 className="text-3xl font-bold text-center ">Our workout app</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
             <NavigationMenuLink render={<Link to="/" />}>
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
    </div>
  );
}

export default App;
