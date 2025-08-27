# Credit Cards Application

A React TypeScript application that helps users find the perfect credit card for their financial needs. Users can input their financial details and get personalized credit card recommendations based on eligibility criteria.

## Features

- **User-friendly interface**: Simple form to input financial details
- **Smart matching**: Algorithm to match users with eligible credit cards
- **Test data included**: Pre-loaded test customers for demonstration
- **Responsive design**: Works on desktop and mobile devices
- **Real-time results**: Instant credit card recommendations

## GitHub Pages Deployment

This application is configured to automatically deploy to GitHub Pages. The website will be available at: https://frubesss.github.io/craig-test

### Setup Instructions

1. **Enable GitHub Pages**: In the repository settings, go to "Pages" and set the source to "GitHub Actions"
2. **Automatic Deployment**: The app will automatically deploy when code is pushed to the `main` branch
3. **Manual Deployment**: You can also trigger deployment from the Actions tab

The deployment workflow builds the React app and publishes it to GitHub Pages using the latest GitHub Actions.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/frubesss/craig-test.git
cd craig-test
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Usage

1. **Enter your details**: Fill out the form with your financial information including:
   - Annual income
   - Credit score
   - Employment status
   - Other relevant financial details

2. **Get recommendations**: The application will analyze your information and show eligible credit cards

3. **Review options**: Browse through the recommended credit cards with their features and benefits

4. **Start over**: Use the "Start Over" button to check eligibility for different scenarios

### Test Data
The application includes pre-loaded test customer data for demonstration purposes. You can select from these test profiles to quickly see how the application works.

## Technical Details

This application is built with:
- **React 19** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Create React App** - Build toolchain and development server
- **GitHub Actions** - Automated deployment to GitHub Pages

## Learn More

- [React Documentation](https://reactjs.org/) - Learn about React
- [TypeScript Documentation](https://www.typescriptlang.org/) - Learn about TypeScript
- [GitHub Pages](https://pages.github.com/) - Learn about GitHub Pages deployment
