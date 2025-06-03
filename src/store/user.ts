// src/stores/user.ts

import { defineStore } from "pinia"
import type { User } from "firebase/auth"
import {
    createUserProfile,
    getUserProfile,
    updateUserProfile,
} from "../firebase/firebase"
import type {
    CardType,
    UserType,
    CompanyType,
    SocialMediaObjectType,
} from "../Types"

/**
 * Domyślna (pusta) struktura CardType.
 * company_info i social_media są puste – uzupełnisz je później w aplikacji.
 */
export const DEF_USER_DATA: CardType = {
    user_data: {
        name: "",
        surname: "",
        phone: "",
        email: "",
        website: "",
        city: "",
    },
    company_info: {
        name: "",
        street: "",
        city: "",
        companyWebsite: "",
    },
    social_media: {
        linkedin: "",
        facebook: "",
        instagram: "",
        twitter: "",
        other: [],
    },
}

export const useUserStore = defineStore("user", {
    state: (): { card: CardType; user: User | null } => ({
        card: { ...DEF_USER_DATA },
        user: null,
    }),

    actions: {
        /**
         * Ustawia bieżącego użytkownika (z Firebase Auth).
         * Jeśli user !== null:
         *  - próbuje pobrać cały CardType z Firestore;
         *  - jeśli istnieje → tę strukturę przypisuje do this.card;
         *  - jeśli nie → przypisuje DEF_USER_DATA (bez wypełnionego user_data, bo dopiero będzie rejestracja).
         * Jeśli user == null (wylogowanie) → this.card = DEF_USER_DATA.
         */
        async setUser(user: User | null) {
            this.user = user

            if (user) {
                const profileData = await getUserProfile(user.uid)
                if (profileData) {
                    // Jeżeli użytkownik już miał dokument → nadpisujemy stan
                    this.card = profileData
                } else {
                    // Nowy użytkownik: jeszcze nie przesłał user_data
                    this.card = { ...DEF_USER_DATA }
                }
            } else {
                // Wylogowanie
                this.card = { ...DEF_USER_DATA }
            }
        },

        /**
         * Inicjalizacja profilu przy rejestracji – tworzy w Firestore (users/<uid>)
         * tylko sekcję user_data, cały CardType = { user_data, company_info: pusty, social_media: pusty }.
         *
         * @param data – obiekt UserType (dane z formularza rejestracji)
         */
        async initProfile(data: UserType) {
            if (!this.user) {
                // Brak zalogowanego użytkownika → zostawiamy puste
                this.card = { ...DEF_USER_DATA }
                return
            }
            // Tworzymy dokument w Firestore – z user_data = data, a reszta z DEF_USER_DATA
            await createUserProfile(this.user.uid, data)
            // Aktualizujemy tylko user_data w stanie, reszta – puste (DEF_USER_DATA)
            this.card.user_data = { ...data }
            this.card.company_info = { ...DEF_USER_DATA.company_info }
            this.card.social_media = { ...DEF_USER_DATA.social_media }
        },

        /**
         * Aktualizacja sekcji user_data (gdy np. użytkownik edytuje dane personalne później).
         */
        async updateUserData(updates: Partial<UserType>) {
            if (!this.user) {
                throw new Error("Brak zalogowanego użytkownika")
            }
            const payload: Record<string, any> = {}
            Object.entries(updates).forEach(([key, value]) => {
                payload[`user_data.${key}`] = value
            })
            await updateUserProfile(this.user.uid, payload)
            this.card.user_data = {
                ...this.card.user_data,
                ...updates,
            }
        },

        /**
         * Aktualizacja sekcji company_info (gdy użytkownik później podaje dane firmy).
         */
        async updateCompanyInfo(updates: Partial<CompanyType>) {
            if (!this.user) {
                throw new Error("Brak zalogowanego użytkownika")
            }
            const payload: Record<string, any> = {}
            Object.entries(updates).forEach(([key, value]) => {
                payload[`company_info.${key}`] = value
            })
            await updateUserProfile(this.user.uid, payload)
            this.card.company_info = {
                ...this.card.company_info,
                ...updates,
            }
        },

        /**
         * Aktualizacja sekcji social_media (gdy użytkownik później podaje linki do social).
         */
        async updateSocialMedia(updates: Partial<SocialMediaObjectType>) {
            if (!this.user) {
                throw new Error("Brak zalogowanego użytkownika")
            }
            const payload: Record<string, any> = {}
            Object.entries(updates).forEach(([key, value]) => {
                payload[`social_media.${key}`] = value
            })
            await updateUserProfile(this.user.uid, payload)
            this.card.social_media = {
                ...this.card.social_media,
                ...updates,
            }
        },
    },
})
