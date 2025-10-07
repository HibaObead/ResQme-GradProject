"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Phone, MessageCircle, Stethoscope, Heart, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

function ChatBot() {
    const [time, setTime] = useState("");

    useEffect(() => {
        // عند تحميل الصفحة (أول مرة أو ريفرش) يجيب الوقت الحالي
        const now = new Date();
        const formattedTime = now.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        setTime(formattedTime);
    }, []);
    const router = useRouter();
    return (
        <div dir="rtl" className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
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
                    <div className="flex items-center gap-2 sm:gap-4 ">
                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                                    <h1 className="hidden sm:block"> المريض </h1>
                                    <User className="h-4 w-4" />
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
            {/* Main Content */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-3 p-3 md:px-6 md:py-3 rounded-lg  ">
                {/* طلب إسعاف */}
                <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 
      text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 
      cursor-pointer"
                >
                    <Phone className="h-4 w-4" />
                    <Link href="/user/ambulance">طلب إسعاف</Link>
                </button>

                {/* المساعد الذكي */}
                <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 
      text-slate-800 dark:text-slate-200 shadow 
      hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                    <MessageCircle className="h-4 w-4" />
                    <Link href="/user/chatbot">المساعد الذكي</Link>
                </button>
            </div>


            {/* Info Banner */}
            <div className="max-w-7xl mx-auto mt-5 ">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-blue-500 dark:border-blue-700 shadow-sm p-6 transition-colors duration-500">
                    <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:justify-between md:text-right md:gap-0">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
                            <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-1">
                                    المساعد الطبي المتقدم
                                </h1>
                                <p className="text-xl text-blue-600 dark:text-blue-400">
                                    ذكاء اصطناعي للطوارئ الطبية
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex justify-center md:justify-end">
                            <Badge
                                variant="secondary"
                                className="bg-green-200 text-green-700 border-green-200 rounded-3xl dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                            >
                                نشط 24/7
                                <Heart className="ml-1 h-3 w-3" />
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>


            {/* ChatBot Section */}
            {/* < div className="max-w-7xl mx-auto mt-5">
                <div className="bg-orange-50 border border-orange-400 shadow-sm p-6 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <AlertTriangle className="h-6 w-6 font-bold text-orange-500" />
                        <h1 className="text-lg font-semibold text-orange-900">أسئلة الطوارئ السريعة</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">💖</span>
                                <span className="text-gray-800">ألم في الصدر أو ضيق</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">🩸</span>
                                <span className="text-gray-800">نزيف شديد أو جرح عميق</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">🦴</span>
                                <span className="text-gray-800">كسر أو التواء</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">🫁</span>
                                <span className="text-gray-800">احتقان أو انسداد مجرى التنفس</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">⚠️</span>
                                <span className="text-gray-800">تحذير: في حالات الطوارئ الحادة اتصل بالإسعاف فوراً</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">🧠</span>
                                <span className="text-gray-800">فقدان الوعي أو إغماء</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">🔥</span>
                                <span className="text-gray-800">حروق أو إصابة حرارية</span>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-orange-200 hover:border-orange-400">
                                <span className="text-lg">☢️</span>
                                <span className="text-gray-800">تسمم أو تناول مواد ضارة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/*AI Chat Section */}
            <div className="max-w-7xl mx-auto mt-5  bg-blue-50 
             dark:bg-blue-900 border border-blue-400 dark:border-blue-700  rounded-lg">
                <div className="flex items-center justify-between p-4 w-full px-4">
                    {/* Left side: icon + title */}
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        <h1 className="text-gray-800 font-bold  dark:text-gray-300">محادثة طبية</h1>
                    </div>

                    {/* Right side: Time */}
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4 text-gray-600  dark:text-gray-300" />
                        {time}
                    </span>
                </div>
                <div className="w-full h-[688px] rounded-b-lg overflow-hidden">
                    <div>
                        <iframe
                            id="JotFormIFrame-01992a19eb62787ab0ace9de4ae8cf7bc425"
                            title="Clara: مقيم حالة طبية"
                            onLoad={() => window.scrollTo(0, 0)}
                            allow="geolocation; microphone; camera; fullscreen"
                            src="https://agent.jotform.com/01992a19eb62787ab0ace9de4ae8cf7bc425?embedMode=iframe&background=1&shadow=1"
                            frameBorder="0"
                            style={{
                                maxWidth: "100%",
                                height: "688px",
                                border: "none",
                                width: "100%",
                                backgroundColor: "transparent",
                            }}
                            scrolling="no"
                        ></iframe>

                        <script
                            type="text/javascript"
                            dangerouslySetInnerHTML={{
                                __html: `
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-01992a19eb62787ab0ace9de4ae8cf7bc425']",
          "https://www.jotform.com"
        );
      `,
                            }}
                        />
                    </div>



                </div>

            </div>
            <div className="h-20"></div>
        </div>

    )
}

export default ChatBot