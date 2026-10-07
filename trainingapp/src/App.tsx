
import { Link, Outlet} from "react-router"
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuLink,
  NavigationMenuItem 
} from "@/components/ui/navigation-menu"


function App() {
  
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
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App;
