<h1 align="center">
  <img src="https://avatars.githubusercontent.com/u/116905733?s=200&v=4" height="200"/><br>
  QTime Mobile Application
</h1>

<h4 align="center">Cross-platform wait time tracking mobile application</h4>

<blockquote align="center">
  <em>QTime (QueueTime)</em> is a mobile application designed to track wait times and occupancy levels for services across McMaster's campus to help students plan their day.
</blockquote>

# qtime-frontend

React Native frontend of the QTime mobile application.

## Getting Started

- Clone the project: `git clone https://github.com/QueueTime/qtime-frontend.git`

### Install Dependencies

- Install [Node.js](https://nodejs.org/en/). Run `node -v` to verify installation. Requires `node >= 12.x`.
- Install [expo-cli](https://docs.expo.dev/get-started/installation/). Run `npm i -g expo-cli`.
- Install [eas-cli](https://docs.expo.dev/development/create-development-builds/). Run `npm install -g eas-cli`. This is required to build native code with expo.
- Download packges with `npm i`.
- Once packages downloaded, open the `.env` file and fill in all environment values.
  - `BASE_URL` is the backend API base url.

### Generate a Development Build

In order to use native packages and code with the expo framework we leverage [development builds](https://docs.expo.dev/development/create-development-builds/). For native packages (e.g. Google sign-in) to work you need to generate a build whenever the underlying native code changes.

**Generate a build file using eas**:

- Create an expo account at https://expo.dev/signup. This is where your builds will show up.
- Sign in to eas using your expo account. Run `eas login`.
- Start a build of the project
  - For android simulator or physical device: `npm run build:android`
  - For ios simulator: `npm run build:ios`
  - For ios physical devices: First run `eas device:create` to register the device. **Note: You must have an Apple developer membership.** Then run `eas build --profile development --platform ios`.
- The above command will kick off a development build of the app. Go to https://expo.dev/ to watch your build. Should take between 5-15 minutes.

**Apply the build file (`.apk` for Android or `.app` for iOS)**:

- Once the build is complete download and apply the build file to your device or emulator/simulator.
  - For emulators/simulators follow the [eas development simulator steps](https://docs.expo.dev/development/create-development-builds/#on-emulatorsimulator).
  - For physical devices follow the [eas development device steps](https://docs.expo.dev/development/create-development-builds/#on-a-device).

### Start the Development Server

We use expo's `expo-dev-client` to run development builds to iterate quickly for non-native code changes. This allows hot-reload of changes.

- Start the development server for the QTime app locally `npm start`. Expo should generate a QR code and provide a list of options.
- If you have restrictive network settings (e.g. WSL) you can use tunneling to host the development server. Install `npm i -g @expo/ngrok` then run `npm run tunnel` to start the dev server.

**Run on your phone**

- Download the Expo app [on Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US) or [on iOS](https://apps.apple.com/ca/app/expo-go/id982107779).
- With the app running scan the QR code
  - Android - Using the scanner option in the app
  - iOS - Using the built-in QR scanner in the camera app

**Run on android emulator**

- Follow the [Expo Android guide steps](https://docs.expo.dev/workflow/android-studio-emulator/) to setup your Android virtual device.
- Open Android Studio's Virtual Device Manager. Launch your preferred emulated device.
- With your app running locally use the `a` command to connect to the emulated device. Reload the app with the `r` command.

**Run on iOS emulator**

- Follow the [Expo iOS guide steps](https://docs.expo.dev/workflow/ios-simulator/) to setup your iOS virtual device.
- In the simulartor launch your device under File > Open Device > iOS version > Device Name.
- With the app running locally use the `i` command to connect to the emulated device. Reload the app with the `r` command.

## Development

### Component Library

QTime leverages the [Ant Design Mobile React Native Component Library](https://rn.mobile.ant.design/docs/react/introduce).

### Regenerate OpenAPI client code

QTime leverages an API interface designed with [OpenAPI 3.0](https://swagger.io/specification/) exposed by its backend. Regenerate the api client code with [@openapitools/openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) using the following command:

```sh
npm run generate:api "<PATH TO spec.json>"
```

Replacing the path/url to the openapi 3.0 json spec to use when generating the client code. Generated code is found in [src/api/generated](src/api/generated).

## Testing

This project leverages [jest](https://jestjs.io/) to run unit and snapshot tests of components. You can run all tests in this repo with `npm run tests`. The following libraries are installed to use when writing tests:

- [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html): React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
- [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro/): testing library for React Native inspired by `React Testing Library`.

> Tip: Install the jest vscode extension to simplify running single tests directly from the editor.
