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
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSave = () => {
        if (!settings.phone || !settings.currentPassword || !settings.newPassword || !settings.confirmPassword) {
            alert("⚠️ الرجاء تعبئة جميع الحقول");
            return;
        }
        if (settings.newPassword !== settings.confirmPassword) {
            alert("❌ كلمة المرور الجديدة غير مطابقة للتأكيد");
            return;
        }
        // هنا تحط API call للحفظ
        alert("✅ تم تحديث رقم الهاتف وكلمة المرور بنجاح!");
        console.log("Saved settings:", settings);
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
                        {/* User Menu */}
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
                                <DropdownMenuItem className="text-destructive">
                                    تسجيل الخروج
                                    <LogOut className="h-4 w-4 mr-2" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Dark/Light Mode Toggle */}
                        <ModeToggle />
                    </div>
                </div>
            </div>
            <div dir="rtl" className="max-w-4xl mx-auto p-6 space-y-6">

                <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-6">
                        <CardTitle className="text-xl">
                            إعدادات الحساب
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                        {/* رقم الموبايل */}
                        <div className="md:col-span-2">
                            <Label className="mb-2 px-2"> البريد الإلكتروني</Label>
                            <Input
                                name="phone"
                                placeholder="xxx@gmail.com"
                                value={settings.phone}
                                onChange={handleChange}
                                className="text-right placeholder:text-right"
                            />
                        </div>

                        {/* كلمة المرور الحالية */}
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

                        {/* كلمة المرور الجديدة */}
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

                        {/* تأكيد كلمة المرور الجديدة */}
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

                {/* زر الحفظ */}
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
