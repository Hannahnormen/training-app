import { Card, CardContent, CardHeader } from '@/components/ui/card';

function ConfigureWorkout() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Configure Workout</h2>
        <p>Choose sets, reps and rest for your exercises.</p>
      </CardHeader>

      <CardContent>
        <p>Your selected exercises will appear here.</p>
      </CardContent>
    </Card>
  );
}

export default ConfigureWorkout;