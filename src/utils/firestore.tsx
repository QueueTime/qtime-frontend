import { USER_COLLECTION } from "@constants/firestore";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

/**
 * Update a user document to indicate they have completed onboarding
 * @param userEmail User email of user to update
 */
export const completeUserOnboarding = async (userEmail: string) => {
  await firestore().collection(USER_COLLECTION).doc(userEmail).update({
    hasCompletedOnboarding: true,
  });
};

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

export const deleteUser = (userEmail: string) =>
  firestore().collection(USER_COLLECTION).doc(userEmail).delete();
