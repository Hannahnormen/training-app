# Training App
This is a web application to create and perform workouts. It is built with React, Typescript, Vite and Tailwind/shadcn/ui

# Before running the project
You need to have the following installed to your computer
* Node.js
* npm

# Follow these steps to run the project

### 1. Clone the project
You have received the project as a .zip file, extract it into a folder on your computer

### 2. Install dependencies
Open your terminal in the project and run:

npm install

### 3. Configure environmental variables

Create a file named .env in the root directory of the project, and add the required API key like this:

VITE_API_KEY="your api key here"

To obtain your API key:
1. Go to https://api-ninjas.com
2. Click on "Get a Free API Key" in the top right corner and create an account.
3. Once you are logged in, go to "My Account". Copy the API key and paste it into your .env file.


### 4. Start the application
Launch the local server by running:

npm run dev

---

# How to use the training app

 * **Create workout:** To create a new workout click on "Create Workout" on the navigation bar. In the form choose one warmup and one cooldown and at least two exercises. Then click on next. Choose the amount of sets, reps and rest time for each exercise. Then click on save workout.

 * **Do a workout:** Click on "My Workout" in the navigation bar. Choose a workout and click on "Do workout". Check the box for each exercise you finish. When you have finished all exercises you can either choose to keep or remove the active workout.

 * **The profile**: When you finish a workout you can see your improvements in the profile bar.