import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function setProfile(uid, data) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true })
}

export async function getData() {
    const data = await firestore
        .collection('lists')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.data())
            })
        })
    return 0
}
