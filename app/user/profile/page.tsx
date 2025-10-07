"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const [profile, setProfile] = useState({
        fullName: "",
        age: "",
        phone: "",
        altPhone: "",
        email: "",
        city: "",
        village: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        bloodType: "",
        chronicDiseases: "",
        allergies: "",
    });

    const [photo, setPhoto] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileURL = URL.createObjectURL(e.target.files[0]);
            setPhoto(fileURL);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        if (!profile.fullName || !profile.age || !profile.phone || !profile.city) {
            alert("⚠️ الرجاء تعبئة الحقول الأساسية (الاسم، العمر، الهاتف، المدينة)");
            return;
        }
        console.log("تم الحفظ:", profile);
        alert("✅ تم تحديث الملف الشخصي بنجاح!");
    };

    const router = useRouter();

    return (
        <div className=" bg-gray-100 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
            {/* NavBar */}
            <div className="sticky top-0 z-50 bg-white dark:bg-black shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-20 py-4">
                    {/* Left side: Logo + App Name */}
                    <div className="flex items-center gap-2">
                        <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
                        <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#00D492] dark:text-[#00D492]">
                            ResQ Me
                        </h1>
                    </div>

                    {/* Right side: User Menu + Mode toggle */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                                    المريض <User className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => router.push("/user/profile")}>
                                    الملف الشخصي
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/settings")}>
                                    الإعدادات
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/help")}>
                                    المساعدة
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    تسجيل الخروج
                                    <LogOut className="h-4 w-4 mr-2" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ModeToggle />
                    </div>
                </div>
            </div>

            <div dir="rtl" className="max-w-5xl mx-auto p-6 space-y-6 ">
                {/* Profile Header */}
                <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-6">
                        <CardTitle className="text-2xl"> الملف الشخصي للمريض</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00D492] shadow-md">
                                {photo ? (
                                    <Image src={photo} alt="Profile" width={128} height={128} className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700 text-gray-500">
                                        <User size={50} />
                                    </div>
                                )}
                            </div>
                            <label className="mt-3 cursor-pointer text-sm text-[#00D492] hover:underline">
                                اختر صورة
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="personal" className="w-full">
                    <div className="flex justify-end">
                        <TabsList className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg ">
                            <TabsTrigger value="medical" className="px-6 py-2">
                                المعلومات الطبية
                            </TabsTrigger>
                            <TabsTrigger value="personal" className="px-6 py-2">
                                المعلومات الشخصية
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Personal Info */}
                    <TabsContent value="personal">
                        <Card className="shadow-md">
                            <CardHeader className="bg-gradient-to-r from-blue-200 to-blue-400 text-white p-6">
                                <CardTitle className="text-xl flex items-center justify-end">
                                    البيانات الشخصية
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right" dir="rtl">
                                <div>
                                    <Label className="mb-2 px-2 ">الاسم الكامل</Label>
                                    <Input
                                        name="fullName"
                                        placeholder="أدخل اسمك الكامل"
                                        value={profile.fullName}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-2 px-2">العمر</Label>
                                    <Input
                                        name="age"
                                        placeholder="أدخل عمرك"
                                        value={profile.age}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-2 px-2">الهاتف</Label>
                                    <Input
                                        name="phone"
                                        placeholder="970-5xx-xxx-xxx+"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-2 px-2">رقم هاتف آخر</Label>
                                    <Input
                                        name="altPhone"
                                        placeholder="970-5xx-xxx-xxx+"
                                        value={profile.altPhone}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                {/* اسم المدينة (إجباري) */}
                                <div>
                                    <Label className="mb-2 px-2">
                                        اسم المدينة
                                        {/* <span className="text-red-500">*</span> */}
                                    </Label>
                                    <Input
                                        name="city"
                                        placeholder="أدخل اسم المدينة"
                                        value={profile.city}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                        required
                                    />
                                </div>

                                {/* اسم القرية (اختياري) */}
                                <div>
                                    <Label className="mb-2 px-2">
                                        اسم القرية
                                        {/* <span className="text-gray-400">(اختياري)</span> */}
                                    </Label>
                                    <Input
                                        name="village"
                                        placeholder="أدخل اسم القرية (إن وجد)"
                                        value={profile.village}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Medical Info */}
                    <TabsContent value="medical">
                        <Card className="shadow-md">
                            <CardHeader className="bg-gradient-to-r from-red-300 to-red-400 text-white p-6">
                                <CardTitle className="text-xl flex items-center justify-end">
                                    البيانات الطبية
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right" dir="rtl">
                                <div>
                                    <Label className="mb-2 px-2"> فصيلة الدم</Label>
                                    <Input
                                        name="bloodType"
                                        placeholder="مثال: O+"
                                        value={profile.bloodType}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-2 px-2"> الأمراض المزمنة</Label>
                                    <Input
                                        name="chronicDiseases"
                                        placeholder="مثال: السكري، الضغط"
                                        value={profile.chronicDiseases}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-2 px-2"> الحساسية</Label>
                                    <Input
                                        name="allergies"
                                        placeholder="مثال: البنسلين"
                                        value={profile.allergies}
                                        onChange={handleChange}
                                        className="text-right placeholder:text-right"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Save Button */}
                <div className="text-center">
                    <Button
                        className="bg-[#00D492] hover:bg-[#009f75] text-lg px-10 py-3 rounded-full shadow-md"
                        onClick={handleSave}
                    >
                        حفظ التغييرات
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
