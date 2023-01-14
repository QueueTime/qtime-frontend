import { jest } from "@jest/globals";

// Avoid `Invariant Violation: `new NativeEventEmitter()` requires a non-null argument`
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
