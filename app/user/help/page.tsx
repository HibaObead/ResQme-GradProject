"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
    const faqs = [
        {
            question: "كيف يمكنني تحديث بياناتي الشخصية؟",
            answer: "اذهب إلى صفحة الملف الشخصي واضغط على 'تعديل' لتحديث بياناتك مثل الاسم، الهاتف والعنوان.",
        },
        {
            question: "كيف أغير كلمة المرور؟",
            answer: "انتقل إلى صفحة الإعدادات واختر تبويب تغيير كلمة المرور وأدخل البيانات المطلوبة.",
        },
        {
            question: "ماذا أفعل في حالة الطوارئ؟",
            answer: "يمكنك استخدام قسم 'الطوارئ السريعة' في التطبيق لطلب الإسعاف أو الاتصال بأقرب مستشفى.",
        },
        {
            question: "كيف أتحقق من بياناتي الطبية؟",
            answer: "اذهب إلى تبويب المعلومات الطبية في صفحة الملف الشخصي لتحديث أو مراجعة فصيلة الدم والأمراض المزمنة والحساسية.",
        },
        {
            question: "هل يمكنني تفعيل وضع الظلام؟",
            answer: "نعم، استخدم أيقونة تبديل الوضع (Dark/Light) الموجودة في شريط التنقل.",
        },
    ];
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
            <div dir="rtl" className="max-w-4xl mx-auto p-6 space-y-6 ">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">المساعدة والدعم</h1>

                {faqs.map((faq, index) => (
                    <Card key={index} className="shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-4 ">
                            <CardTitle className="text-lg">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 text-right text-gray-700 dark:text-gray-200">
                            {faq.answer}
                        </CardContent>
                    </Card>
                ))}

                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <CardHeader className="bg-gradient-to-r from-[#74d5b6] to-[#34e8b8] text-white p-4">
                        <CardTitle className="text-lg"> التواصل معنا</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-right text-gray-700 dark:text-gray-200">
                        إذا كان لديك أي استفسار إضافي، يمكنك مراسلتنا عبر البريد الإلكتروني:{" "}
                        <a href="mailto:support@resqme.com" className="text-[#00D492] hover:underline">
                            support@resqme.com
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>


    );
}
