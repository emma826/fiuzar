"use client"

import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "@/app/app/integration/page"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import IntegrationContent from "./integration-content"

export function UserProfile() {
    const { profile, setProfile, update, updateProfile } = useContext(ProfileContext);

    useEffect(() => {
        async function profileUpdate() {
            if (!update) {
                return
            }

            try {
                const response = await fetch('/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();

                if (data.success) {
                    setProfile(data.userDetails);
                    updateProfile(false)
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }

        profileUpdate();
    }, [update]);

    return (
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                    className="object-cover object-top w-full"
                    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="Mountain"
                />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 bg-black border-white rounded-full overflow-hidden">
                {profile.profile_image ? (
                    <img
                        className="object-cover object-center h-32 w-32"
                        src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/user_profile/${profile.profile_image}`} // Prepend base URL
                        alt="User Profile"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-700">
                        No Image
                    </div>
                )}
            </div>
            <div className="text-center mt-2">
                <h2 className="font-semibold">{profile.name}</h2>
                <p className="text-gray-500">{profile.email}</p>
            </div>
            <div className="p-4 border-t mx-8 mt-2">
                <button
                    disabled
                    // onClick={() => {
                    //     updateProfile(!profile);
                    // }}
                    className="w-1/2 block mx-auto rounded-full bg-green-800 hover:bg-green-700 cursor-pointer font-semibold text-white px-6 py-2"
                >
                    Upgrade
                </button>
            </div>
        </div>
    );
}

export function SettingsTab() {
    const { profile, setProfile, updateProfile } = useContext(ProfileContext);
    const [formData, setFormData] = useState({});
    const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

    useEffect(() => {
        setFormData({ ...profile });
    }, [profile]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData({ ...passwordData, [id]: value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadFormData = new FormData(); // Renamed to avoid conflict with state
            uploadFormData.append("category", "user_profile");
            uploadFormData.append("file", file);

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_STORAGE_SERVER, {
                    method: "POST",
                    body: uploadFormData,
                });

                const data = await response.json();

                if (data.success) {
                    setFormData((prev) => ({ ...prev, profileImage: data.fileName })); // Correctly update state
                } else {
                    console.error("Failed to upload image:", data.message);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/user/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setProfile(formData);
                updateProfile((prev) => !prev);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handlePasswordSave = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/user/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordData),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Password updated successfully");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Failed to update password:", error);
        }
    };

    return (
        <Tabs defaultValue="integration" className="w-full">
            <TabsList className={`flex w-full mx-4 rounded shadow`}>
                <TabsTrigger value="integration" className={`w-full flex justify-center font-medium rounded-l px-5 py-2 border`}>Integration</TabsTrigger>
                <TabsTrigger value="profile" className={`w-full flex justify-center font-medium rounded-l px-5 py-2 border`}>Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="integration" className={`py-2 pl-8 mx-auto w-full`}>
                
            <IntegrationContent />

            </TabsContent>
            <TabsContent value="profile" className={`py-2 pl-8 mx-auto w-full`}>
                <div className="mb-4 rounded-2xl border border-gray-200 bg-white py-2 px-5 dark:border-gray-800 dark:bg-white/[0.03] md:px-6">
                    <h2 className="font-bold py-2 mb-2 text-2xl">User Details</h2>
                    <div className="py-1 mb-3">
                        <div className="h-40 w-40 rounded-full bg-black mx-auto overflow-hidden">
                            {formData.profileImage ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/user_profile/${formData.profileImage}`} // Prepend the base URL and folder
                                    alt="Profile"
                                    className="h-full w-full object-cover object-center"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-700">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="mt-3 text-center">
                            <Label htmlFor="profileImage" className="block mb-2">Update Profile Image</Label>
                            <Input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border px-2 py-1"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="block mb-2">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="block mb-2">Email</Label>
                            <Input
                            disabled={true}
                                id="email"
                                type="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end py-3">
                        <Button
                            onClick={handleSave}
                            className="mt-4 px-4 py-6 hover:bg-green-700 cursor-pointer bg-green-800 text-white rounded-md"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
                {/* <div className="mb-4 rounded-2xl border border-gray-200 bg-white py-2 px-5 dark:border-gray-800 dark:bg-white/[0.03] md:px-6">
                    <h2 className="font-bold py-2 mb-3 text-2xl">Edit Password</h2>
                    <div className="mb-4">
                        <Label htmlFor="oldPassword" className="block mb-2">Old Password</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            className="w-full border px-2 py-1"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="newPassword" className="block mb-2">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full border px-2 py-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword" className="block mb-2">Retype Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full border px-2 py-1"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end py-3">
                        <Button
                            onClick={handlePasswordSave}
                            className="mt-4 px-4 py-6 hover:bg-green-700 cursor-pointer bg-green-800 text-white rounded-md"
                        >
                            Save Password
                        </Button>
                    </div>
                </div> */}
            </TabsContent>
        </Tabs>
    );
}