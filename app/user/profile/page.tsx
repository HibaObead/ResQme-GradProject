"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PersonalProfile {
    fullName: string;
    age: string;
    phone: string;
    altPhone: string;
    email: string;
    city: string;
    village: string;
}

interface MedicalProfile {
    bloodType: string | null;
    chronicDiseases: string;
    allergies: string;
}

const ProfilePage = () => {
    const router = useRouter();

    const [personal, setPersonal] = useState<PersonalProfile>({
        fullName: "",
        age: "",
        phone: "",
        altPhone: "",
        email: "",
        city: "",
        village: "",
    });

    const [medical, setMedical] = useState<MedicalProfile>({
        bloodType: "",
        chronicDiseases: "",
        allergies: "",
    });

    const [photo, setPhoto] = useState<string | null>(null);

    //    === GET PERSONAL INFO ===
    useEffect(() => {
        const fetchPersonal = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) return;

                const res = await fetch("https://resqme.runasp.net/api/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) return;

                const data = await res.json();

                setPersonal({
                    fullName: data.name || "",
                    age: data.age ? data.age.toString() : "",
                    phone: data.phoneNumber || "",
                    altPhone: data.extraPhoneNumber || "",
                    email: data.email || "",
                    city: data.city || "",
                    village: data.region || "",
                });
            } catch (error) {
                console.error("GET PERSONAL ERROR:", error);
            }
        };

        fetchPersonal();
    }, []);

    //    === PATCH PERSONAL INFO ===
    const handleSavePersonalInfo = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) return alert("يجب تسجيل الدخول");

            const res = await fetch("https://resqme.runasp.net/api/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: personal.email,
                    name: personal.fullName,
                    phoneNumber: personal.phone,
                    extraPhoneNumber: personal.altPhone || null,
                    age: personal.age ? Number(personal.age) : null,
                    city: personal.city,
                    region: personal.village || null,
                }),
            });

            if (!res.ok) throw new Error();

            alert("تم تحديث البيانات الشخصية ✔");
        } catch (err) {
            console.error("PATCH PERSONAL ERROR:", err);
            alert("فشل تحديث البيانات الشخصية");
        }
    };

    //    === GET MEDICAL INFO ===
    useEffect(() => {
        const fetchMedical = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) return;

                const res = await fetch("https://resqme.runasp.net/api/user/MedicalInfos", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.log("لا يوجد بيانات طبية محفوظة.");
                    return;
                }

                const data = await res.json();

                setMedical({
                    bloodType: data.bloodType || "",
                    chronicDiseases: data.chronicDiseases || "",
                    allergies: data.allergies || "",
                });
            } catch (error) {
                console.error("GET MEDICAL ERROR:", error);
            }
        };

        fetchMedical();
    }, []);

    //    === PUT MEDICAL INFO ===
    const handleSaveMedicalInfo = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) return alert("يجب تسجيل الدخول");

            const res = await fetch("https://resqme.runasp.net/api/user/MedicalInfos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bloodType: medical.bloodType || null,
                    chronicDiseases: medical.chronicDiseases,
                    allergies: medical.allergies,
                }),
            });

            if (!res.ok) throw new Error();

            alert("تم حفظ المعلومات الطبية ✔");
        } catch (error) {
            console.error("PUT MEDICAL ERROR:", error);
            alert("خطأ أثناء حفظ المعلومات الطبية");
        }
    };

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonal({ ...personal, [e.target.name]: e.target.value });
    };

    const handleMedicalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMedical({ ...medical, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors duration-300" >

            {/* NAV */}
            <div className="sticky top-0 z-50 bg-white dark:bg-black shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-20 py-4">
                    <div className="flex items-center gap-2">
                        <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
                        <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#00D492]">
                            <Link href="/user/ambulance">ResQ Me</Link>
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                                    المريض <User className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => router.push("/user/profile")}>الملف الشخصي</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/settings")}>الإعدادات</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/help")}>المساعدة</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                    تسجيل الخروج <LogOut className="h-4 w-4 mr-2" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ModeToggle />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-5xl mx-auto p-6 space-y-6">

                {/* IMAGE */}
                <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-6">
                        <CardTitle className="text-2xl">الملف الشخصي للمريض</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col items-center">
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
                    </CardContent>
                </Card>

                {/* TABS */}
                <Tabs defaultValue="personal" className="w-full">
                    <div className="flex justify-end">
                        <TabsList className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <TabsTrigger value="medical" className="px-6 py-2">المعلومات الطبية</TabsTrigger>
                            <TabsTrigger value="personal" className="px-6 py-2">المعلومات الشخصية</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* PERSONAL FORM */}
                    <TabsContent value="personal">
                        <Card className="shadow-md">
                            <CardHeader className="bg-gradient-to-r from-blue-200 to-blue-400 text-white p-6">
                                <CardTitle className="text-xl flex items-center justify-end">
                                    البيانات الشخصية
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right" dir="rtl">
                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">الاسم الكامل</Label>
                                    <Input name="fullName" value={personal.fullName} disabled />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right ">العمر</Label>
                                    <Input name="age" value={personal.age} onChange={handlePersonalChange} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">الهاتف</Label>
                                    <Input name="phone" value={personal.phone} onChange={handlePersonalChange} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">رقم هاتف آخر</Label>
                                    <Input name="altPhone" value={personal.altPhone} onChange={handlePersonalChange} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">اسم المدينة</Label>
                                    <Input name="city" value={personal.city} onChange={handlePersonalChange} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">البريد الإلكتروني</Label>
                                    <Input name="email" value={personal.email} disabled />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="mb-2 px-2 text-right">اسم القرية</Label>
                                    <Input name="village" value={personal.village} onChange={handlePersonalChange} />
                                </div>

                                <div className="col-span-full text-center mt-4">
                                    <Button className="bg-[#00D492]" onClick={handleSavePersonalInfo}>
                                        حفظ البيانات الشخصية
                                    </Button>
                                </div>

                            </CardContent>

                        </Card>
                    </TabsContent>

                    {/* MEDICAL FORM */}
                    <TabsContent value="medical">
                        <Card className="shadow-md">
                            <CardHeader className="bg-gradient-to-r from-red-300 to-red-400 text-white p-6" >
                                <CardTitle className="text-xl flex items-center justify-end">
                                    المعلومات الطبية </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 " dir="rtl">
                                <div className="flex flex-col gap-2">
                                    <Label>الأمراض المزمنة</Label>
                                    <Input name="chronicDiseases" value={medical.chronicDiseases} onChange={handleMedicalChange} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>فصيلة الدم</Label>
                                    <Input name="bloodType" value={medical.bloodType ?? ""} onChange={handleMedicalChange} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>الحساسية</Label>
                                    <Input name="allergies" value={medical.allergies} onChange={handleMedicalChange} />
                                </div>
                                <div className="col-span-full text-center mt-4">
                                    <Button className="bg-[#00D492]" onClick={handleSaveMedicalInfo}> حفظ المعلومات الطبية </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfilePage;
