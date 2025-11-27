"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSave = async () => {
        setMessage("");
        if (!settings.currentPassword || !settings.newPassword || !settings.confirmPassword) {
            setMessage("⚠️ الرجاء تعبئة جميع الحقول");
            return;
        }
        if (settings.newPassword !== settings.confirmPassword) {
            setMessage("❌ كلمة المرور الجديدة غير مطابقة للتأكيد");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            setMessage("❌ يجب تسجيل الدخول أولاً");
            return;
        }

        try {
            const response = await fetch("https://resqme.runasp.net/api/Identity/Accounts/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: settings.currentPassword,
                    newPassword: settings.newPassword
                })
            });

            if (response.ok) {
                setMessage("✅ تم تحديث كلمة المرور بنجاح");
                setSettings({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                const errorData = await response.json();
                setMessage(errorData?.message || "❌ حدث خطأ أثناء تحديث كلمة المرور");
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ تعذر الاتصال بالخادم");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/login");
    };

    return (
        <div className=" bg-gray-100 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
            {/* NavBar */}
            <div className="sticky top-0 z-50 bg-white dark:bg-black shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-20 py-4">
                    <div className="flex items-center gap-2">
                        <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
                        <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#00D492]">
                            ResQ Me
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
                                <DropdownMenuItem onClick={() => router.push("/user/profile")}>
                                    الملف الشخصي
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/settings")}>الإعدادات</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/user/help")}>المساعدة</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                    تسجيل الخروج
                                    <LogOut className="h-4 w-4 mr-2" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ModeToggle />
                    </div>
                </div>
            </div>

            <div dir="rtl" className="max-w-4xl mx-auto p-6 space-y-6">
                <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-6">
                        <CardTitle className="text-xl">إعدادات الحساب</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                        <div className="md:col-span-2">
                            <Label className="mb-2 px-2">كلمة المرور الحالية</Label>
                            <Input
                                type="password"
                                name="currentPassword"
                                placeholder="أدخل كلمة المرور الحالية"
                                value={settings.currentPassword}
                                onChange={handleChange}
                                className="text-right placeholder:text-right"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label className="mb-2 px-2">كلمة المرور الجديدة</Label>
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="أدخل كلمة المرور الجديدة"
                                value={settings.newPassword}
                                onChange={handleChange}
                                className="text-right placeholder:text-right"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label className="mb-2 px-2">تأكيد كلمة المرور الجديدة</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="أعد إدخال كلمة المرور الجديدة"
                                value={settings.confirmPassword}
                                onChange={handleChange}
                                className="text-right placeholder:text-right"
                            />
                        </div>
                    </CardContent>
                </Card>

                {message && <p className="text-center text-red-500">{message}</p>}

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
