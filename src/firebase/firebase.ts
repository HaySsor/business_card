// src/firebase/firebase.ts

/* eslint-disable */
import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth"
import type { User } from "firebase/auth"
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore"
import type { CardType, UserType } from "../Types"
import { DEF_USER_DATA } from '../store/user.ts'

// 1. Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBGw9rsv_g2tAZ85rp48OsQ38hBmvzqJi0",
    authDomain: "bussinescard-303bc.firebaseapp.com",
    projectId: "bussinescard-303bc",
    storageBucket: "bussinescard-303bc.firebasestorage.app",
    messagingSenderId: "114518072062",
    appId: "1:114518072062:web:24eb41529eabf1b0dee3af",
    measurementId: "G-RQVPFKD93X",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
const auth = getAuth()

// —————————————————————————————————————————
// 2. Rejestracja w Firebase Auth
export function registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

// —————————————————————————————————————————
// 3. Logowanie w Firebase Auth
export function loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

// —————————————————————————————————————————
// 4. Listener stanu zalogowania
export function onAuthStateChangedListener(
    callback: (user: User | null) => void
): () => void {
    return onAuthStateChanged(auth, callback)
}

// —————— Profile API ——————

/**
 * Tworzy dokument użytkownika w kolekcji "users".
 * Ustawia wyłącznie sekcję user_data na podstawie przekazanego `data`.
 * Sekcje company_info i social_media zostają pobrane z DEF_USER_DATA.
 *
 * @param uid – identyfikator użytkownika
 * @param data – fragment typu UserType (tylko user_data)
 */
export function createUserProfile(uid: string, data: UserType) {
    // Budujemy pełen obiekt CardType:
    //  - user_data z podanymi wartościami
    //  - company_info i social_media z domyślnymi pustymi polami
    const sendData: CardType = {
        user_data: { ...data },
        company_info: { ...DEF_USER_DATA.company_info },
        social_media: { ...DEF_USER_DATA.social_media },
    }

    // Zapisujemy cały dokument (jeśli nie istnieje, Firestore go utworzy)
    return setDoc(doc(db, "users", uid), sendData)
}

/**
 * Aktualizuje tylko zagnieżdżone pola w istniejącym dokumencie “users/<uid>”.
 * Klucze w `data` mogą być w notacji dot (np. "company_info.name").
 *
 * @param uid – identyfikator użytkownika
 * @param data – obiekt, w którym klucze to “ścieżki” do pól w dokumencie
 */
export function updateUserProfile(uid: string, data: Record<string, any>) {
    return updateDoc(doc(db, "users", uid), data)
}

/**
 * Pobiera cały dokument CardType z kolekcji “users/<uid>”.
 * Zwraca obiekt CardType albo null, jeśli dokument nie istnieje.
 */
export async function getUserProfile(uid: string): Promise<CardType | null> {
    const docSnap = await getDoc(doc(db, "users", uid))
    if (!docSnap.exists()) return null
    return docSnap.data() as CardType
}
