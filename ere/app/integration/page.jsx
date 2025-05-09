"use client";

import AppNavbar from "@/layout/app-navbar";
import { UserProfile, SettingsTab } from "@/components/app/settings-integration";

import { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext({});

export default function IntegrationPage() {
    const [profile, setProfile] = useState({});
    const [update, updateProfile] = useState(false);

    // Fetch user profile when the page loads
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch("/api/user/profile");
                const data = await response.json();

                if (data.success) {
                    setProfile(data.userDetails);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }

        fetchProfile();
    }, [update]); // Re-fetch profile when `update` changes

    return (
        <ProfileContext.Provider value={{ profile, setProfile, update, updateProfile }}>
            <div className="w-full mx-auto overflow-x-hidden">
                <AppNavbar />
                <div className="container mx-auto py-2 max-w-[1200px] flex justify-between gap-6">
                    <div className="w-full max-w-96">
                        <UserProfile />
                    </div>
                    <div className="flex-auto">
                        <SettingsTab />
                    </div>
                </div>
            </div>
        </ProfileContext.Provider>
    );
}