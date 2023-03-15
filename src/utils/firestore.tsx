import { userApi } from "@api/client/apis";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

/**
 * Firestore constants
 */
const USER_COLLECTION = "users";

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
 * Find a user document in firestore
 * @param userEmail User email of user to find
 * @returns Firestore document snapshot
 */
const findUser = async (userEmail: string) =>
  firestore().collection(USER_COLLECTION).doc(userEmail).get();

/**
 * Verify if a user exists in firestore. If not create a new user document with their information
 * @param user Firebase auth user object
 * @param userEmail User email
 * @param onComplete Callback to run on complete. Takes as param the user document from firebase, either newly created or existing
 * @param onError Callback to run on error
 */
export const createUserIfNotExists = async (
  user: FirebaseAuthTypes.User,
  userEmail: string,
  onComplete?: (
    userDoc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) => void,
  onError?: (error: any) => void
) => {
  try {
    let userDoc = await findUser(userEmail);
    if (!userDoc.exists || typeof userDoc.data() === undefined) {
      await userApi.newUserSignup({
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });
      userDoc = await findUser(userEmail);
    }
    onComplete?.(userDoc);
  } catch (error: any) {
    onError?.(error);
  }
};

export const firestoreDocToUserProfile = (
  email: string,
  data: FirebaseFirestoreTypes.DocumentData
) => ({
  email: email,
  hasCompletedOnboarding: data.hasCompletedOnboarding,
  hasUsedReferralCode: data.hasUsedReferralCode,
  notificationSetting: data.notification_setting,
  numLinesParticipated: data.num_lines_participated,
  poiFrequency: data.poi_frequency,
  referralCode: data.referral_code,
  rewardPointBalance: data.reward_point_balance,
  timeInLine: data.time_in_line,
});
