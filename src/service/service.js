import * as firebase from "firebase";

function getConservation() {
    return firebase.firestore().collection('messages')
        .where("page_id", "==", 11)
        .orderBy('createdAt', "asc");
}