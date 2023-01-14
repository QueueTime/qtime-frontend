import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

/**
 * Firestore constants
 */

const USER_COLLECTION = "users";
const DEFAULT_USER = {
  hasCompletedOnboarding: false,
};

/**
 * Create a new user document with their email as their id and default values
 * @param userEmail Email for the new user
 */
export const createUser = async (userEmail: string) =>
  firestore().collection(USER_COLLECTION).doc(userEmail).set(DEFAULT_USER);

/**
 * Update a user document to indicate they have completed onboarding
 * @param userEmail User email of user to update
 */
export const completeUserOnboarding = async (userEmail: string) =>
  firestore().collection(USER_COLLECTION).doc(userEmail).update({
    hasCompletedOnboarding: true,
  });

/**
 * Subscribe to updates about a document in the user collection
 * @param userEmail User email of user to subscribe to updates for
 * @param onSnapshot Function to run on update
 * @returns Firebase subscriber
 */
export const subscribeToUserUpdates = (
  userEmail: string,
  onSnapshot: (doc: FirebaseFirestoreTypes.DocumentSnapshot) => void
) =>
  firestore()
    .collection(USER_COLLECTION)
    .doc(userEmail)
    .onSnapshot((doc) => onSnapshot(doc));

/**
 * Delete a user document from the user collection
 * @param userEmail User email of user to delete
 */
export const deleteUser = (userEmail: string) =>
  firestore().collection(USER_COLLECTION).doc(userEmail).delete();
