import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBE6fAhJo-lQvWmY_dQRveoN1mULHhHO-Y",
  authDomain: "aczurex-d4b61.firebaseapp.com",
  databaseURL: "https://aczurex-d4b61-default-rtdb.firebaseio.com",
  projectId: "aczurex-d4b61",
  storageBucket: "aczurex-d4b61.appspot.com",
  messagingSenderId: "31992218561",
  appId: "1:31992218561:web:4a78b4751dfe5cf1562540",
  measurementId: "G-99S7QS47T7",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
const nonAuth = firebase.auth;

const postDataWithRef = (collection, docRef, data) => {
  const value = database.ref(`/${collection}/${docRef}`).set({
    ...data,
  });
  return value;
};
const checkIsUserExist = async (phone) => {
  let result = await database
    .ref("/user/")
    .orderByChild("phoneNumber")
    .equalTo(`${phone}`)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return { userId, ...data };
      } else {
        return null;
      }
    });
  return result;
};
const postData = (collection, data) => {
  const newReference = database.ref(`${collection}`).push();
  const value = newReference.set({
    ...data,
  });
  return value;
};
const getDataWithRef = async (collection, docRef) => {
  const value = await database
    .ref(`/${collection}/${docRef}`)
    .once("value", (snapshot) => {
      return { ...snapshot.val(), userId: docRef };
    });
  return value;
};
const postUserDataWithId = async (id, data) => {
  const value = database.ref(`/user/${id}`).update({ ...data });
  return value;
};
const UpdateOrderWithId = async (id, data) => {
  return await database.ref(`/orders/${id}`).update({ ...data });
};
const getDataWholeCollection = async (collection) => {
  const value = await database
    .ref(`/${collection}`)
    .once("value", (onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];

  value.forEach((childSnapshot) => {
    let item = childSnapshot.val();
    item.id = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
const removeData = async (collection, docRef) => {
  return await database.ref(`/${collection}/${docRef}`).remove();
};
const getMYOrders = async (userid) => {
  let result = await database
    .ref("orders")
    .orderByChild("OrderedByUserId")
    .equalTo(`${userid}`)
    .once("value")
    .then((onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach((dat) => {
    returnArr.push({ id: dat[0], ...dat[1] });
  });
  return returnArr;
};
const getMYServicesReq = async (userid) => {
  let result = await database
    .ref("supportOrders")
    .orderByChild("OrderedByUserId")
    .equalTo(`${userid}`)
    .once("value")
    .then((onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach((dat) => {
    returnArr.push({ id: dat[0], ...dat[1] });
  });
  return returnArr;
};
export {
  nonAuth,
  auth,
  postDataWithRef,
  getDataWithRef,
  getDataWholeCollection,
  postData,
  removeData,
  checkIsUserExist,
  postUserDataWithId,
  getMYOrders,
  UpdateOrderWithId,
  getMYServicesReq,
};
