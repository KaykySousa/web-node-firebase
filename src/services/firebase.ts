import { cert, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

initializeApp({
	credential: cert(__dirname + "/projetowebii-49904-firebase-adminsdk-6peef-b08defe2d5.json"),
})

export const db = getFirestore()
