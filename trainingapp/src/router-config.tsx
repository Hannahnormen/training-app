
import {Link} from "react-router";
import {Button} from "@/components/ui/button"
import { createBrowserRouter, type RouteObject } from "react-router";
import ComposeWorkout from "./compose-workout"
import ViewWorkouts from "./view-workouts"
import DoWorkout from "./DoWorkout"
import App from "./App";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function Home() {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <Card className="w-full" >
      <CardHeader>
        <CardTitle >Welcome to our trainingapp</CardTitle>
        <CardDescription>
          Here you can create your own workouts
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-3">
        <Button size="lg">
          <Link to="/compose-workout">
            Create Workouts
          </Link>
        </Button>

        <Button variant="outline">
          <Link to="/view-workouts">
            My Workouts
          </Link>
        </Button>
      </CardContent>
    </Card>
    </div>
    
  );
}
const routerConfig: RouteObject[] = [
  {
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "compose-workout",
        Component: ComposeWorkout,
      },
      {
        path: "view-workouts",
        Component: ViewWorkouts,
      },
      {
        path: "view-workouts/new/:uuid",
        Component: ViewWorkouts,

      },
      {
        path: "*",
        Component: PageNotFound,
      },
      {
        path: "do-workout/:uuid",
        Component: DoWorkout,
      },
    ],
  },
];



function PageNotFound() {
  return <h2>Page not found</h2>;
}

const router = createBrowserRouter(routerConfig);
export default router;