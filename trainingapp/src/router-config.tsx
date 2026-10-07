import { createBrowserRouter, type RouteObject } from "react-router";
import ComposeWorkout from "./compose-workout"
import ViewWorkouts from "./view-workouts"
import App from "./App";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import NewWorkoutInfobox from "./new-workout-infobox";

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
        path: "view-workout",
        Component: ViewWorkouts,
        children: [
            {
                path: "new/:uuid",
                Component: NewSaladInfobox,
            },
        ],
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
];

function Home() {
  return (
    <Card className="md:w-3xl">
      <CardHeader>
        <CardTitle>Welcome to our trainingapp</CardTitle>
        <CardDescription>
          Here you can create your own workouts
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function PageNotFound() {
  return <h2>Page not found</h2>;
}

const router = createBrowserRouter(routerConfig);
export default router;