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

### Setup project dependencies

- Install [Node.js](https://nodejs.org/en/). Run `node -v` to verify installation. Requires `node >= 12.x`.
- Install [expo-cli](https://docs.expo.dev/get-started/installation/). Run `npm i -g expo-cli`.
- Download packges with `npm i`.
- Run the QTime app locally with `npm start`. Expo should generate a QR code and provide a list of options.

### Run on your phone

- Download the Expo app [on Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US) or [on iOS](https://apps.apple.com/ca/app/expo-go/id982107779).
- With the app running scan the QR code
  - Android - Using the scanner option in the app
  - iOS - Using the built-in QR scanner in the camera app

### Run on android emulator

- Follow the [Expo Android guide steps](https://docs.expo.dev/workflow/android-studio-emulator/) to setup your Android virtual device.
- Open Android Studio's Virtual Device Manager. Launch your preferred emulated device.
- With your app running locally use the `a` command to connect to the emulated device. Reload the app with the `r` command.

### Run on iOS emulator

- Follow the [Expo iOS guide steps](https://docs.expo.dev/workflow/ios-simulator/) to setup your iOS virtual device.
- In the simulartor launch your device under File > Oepn Device > iOS version > Device Name.
- With the app running locally use the `i` command to connect to the emulated device. Reload the app with the `r` command.

## Development

- QTime leverages the [Ant Design Mobile React Native Component Library](https://rn.mobile.ant.design/docs/react/introduce).

## Testing

This project leverages [jest](https://jestjs.io/) to run unit and snapshot tests of components. You can run all tests in this repo with `npm run tests`. The following libraries are installed to use when writing tests:

- [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html): React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
- [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro/): testing library for React Native inspired by `React Testing Library`.

> Tip: Install the jest vscode extension to simplify running single tests directly from the editor.
