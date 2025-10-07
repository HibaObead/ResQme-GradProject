"use client";
import React, { useState } from "react";
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
import { User, LogOut, Phone, MessageCircle, AlertTriangle, Navigation, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils"
import Link from "next/link";
import { useRouter } from "next/navigation";

// Emergency types should be defined here, outside of getCurrentLocation
const emergencyTypes = [
    { id: "car-accident", label: "حادث سيارة", category: "main" },
    { id: "heart-attack", label: "نوبة قلبية", category: "main" },
    { id: "fractures", label: "كسور", category: "main" },
    { id: "burns", label: "حروق", category: "main" },
    { id: "suffocation", label: "اختناق", category: "secondary" },
    { id: "bleeding", label: "نزيف", category: "secondary" },
    { id: "unconsciousness", label: "فقدان الوعي", category: "secondary" },
    { id: "other", label: "أخرى", category: "secondary" },
];

// Function to get current location
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert("المتصفح الخاص بك لا يدعم تحديد الموقع.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Latitude:", latitude, "Longitude:", longitude);
            alert(`موقعك الحالي:\nخط العرض: ${latitude}\nخط الطول: ${longitude}`);
            // هنا يمكنك إرسال الموقع إلى الخادم أو استخدامه على الخريطة
        },
        (error) => {
            console.error(error);
            alert("حدث خطأ أثناء الحصول على الموقع.");
        }
    );
}

function AmbulaanceService() {

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const mainTypes = emergencyTypes.filter((type) => type.category === "main");
    const secondaryTypes = emergencyTypes.filter((type) => type.category === "secondary");
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
                    <div className="flex items-center gap-2 sm:gap-4">
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
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 
      text-slate-800 dark:text-slate-200 shadow 
      hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                    <Phone className="h-4 w-4" />
                    <Link href="/user/ambulance">طلب إسعاف</Link>
                </button>

                {/* المساعد الذكي */}
                <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 
      text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 
      cursor-pointer"
                >
                    <MessageCircle className="h-4 w-4" />
                    <Link href="/user/chatbot">المساعد الذكي</Link>
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-red-50 dark:bg-gray-900 border border-red-400 dark:border-gray-500 ml-10 mr-10 mt-5 p-4 rounded-lg">
                {/* Emergency Ambulance Request Section */}
                <div className="flex items-center justify-center gap-4 text-3xl font-bold text-red-700 dark:text-red-400">
                    <AlertTriangle className="hidden md:block text-3xl font-bold h-10 w-10 text-red-700 dark:text-red-400" />
                    <p>طلب إسعاف طارئ</p>
                </div>

                {/* Button centered */}
                <div className="flex justify-center mt-8">
                    <Button
                        className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white flex items-center justify-center gap-2 
         transform transition-transform duration-300 hover:scale-105 z-10 cursor-pointer"
                        onClick={getCurrentLocation}
                    >
                        تحديد موقعي الحالي
                        <Navigation className="font-bold" />
                    </Button>
                </div>

                {/* Emergency Type Selection */}
                <div className="mb-10 mt-5">
                    <div className="mx-auto">
                        <p className="px-3 block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">نوع الطوارئ</p>

                        {/* Main emergency types */}
                        <div className="grid grid-cols-1 md:grid-cols-4 mb-6 gap-4">
                            {mainTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={cn(
                                        "w-full min-h-[50px] rounded-lg font-medium transition-all duration-200 text-lg cursor-pointer",
                                        selectedType === type.id
                                            ? "bg-red-500 text-white shadow-lg"
                                            : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-blue-400 hover:text-white hover:shadow-md"
                                    )}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>

                        {/* Secondary emergency types */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {secondaryTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={cn(
                                        "w-full min-h-[50px] rounded-lg font-medium transition-all duration-200 text-lg cursor-pointer",
                                        selectedType === type.id
                                            ? "bg-red-500 text-white shadow-lg"
                                            : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-blue-400 hover:text-white hover:shadow-md"
                                    )}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-10">
                    <label className="px-3 block text-sm font-medium text-gray-700 dark:text-gray-300">ملاحظات إضافية</label>
                    <textarea
                        placeholder="أدخل أي ملاحظات إضافية هنا..."
                        className="bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 mt-2 mb-4 w-full h-24 px-3 py-2 border border-gray-500 dark:border-gray-600 rounded-md
        focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col md:flex-row justify-center mb-5 gap-4 px-4 max-w-full">
                    <Button
                        className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white flex items-center justify-center gap-2 
         transform transition-transform duration-300 cursor-pointer"
                        onClick={() => router.push("/user/chatbot")}
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span>المساعد الذكي</span>
                    </Button>

                    <Button
                        className="flex-1 min-w-0 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white flex items-center justify-center gap-2 
         transform transition-transform duration-300 cursor-pointer"
                    >
                        <Phone className="h-4 w-4" />
                        <span>طلب إسعاف فوري</span>
                    </Button>
                </div>
            </div>


            {/* Important Information Section */}
            <div className="mb-4 bg-blue-50 dark:bg-gray-900 border border-blue-400 dark:border-gray-500 ml-10 mr-10 mt-5 p-5 rounded-lg">
                <div className="flex gap-4 text-3xl font-bold text-blue-700 dark:text-blue-400">
                    <Clock className="h-8 w-8" />
                    <h1>معلومات مهمة</h1>
                </div>

                {/* Emergency Information */}
                <div className="flex items-start gap-4 text-right mt-5">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-orange-500 dark:text-orange-400 font-bold" />
                        </div>
                    </div>
                    <div className="flex-1 mb-2">
                        <h3 className="font-semibold text-base mb-1 text-orange-900 dark:text-orange-300">
                            في حالات الطوارئ القصوى
                        </h3>
                        <p className="text-sm leading-relaxed text-orange-800 dark:text-orange-200">
                            اتصل مباشرة على رقم الطوارئ 102
                        </p>
                    </div>
                </div>

                {/* Smart Assistance */}
                <div className="flex items-start gap-4 text-right">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400 font-bold" />
                        </div>
                    </div>
                    <div className="flex-1 mb-2">
                        <h3 className="font-semibold text-base mb-1 text-blue-900 dark:text-blue-300">
                            المساعدة الذكية
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
                            احصل على إرشادات الإسعافات الأولية من خلال المحادثة الذكية
                        </p>
                    </div>
                </div>

                {/* Location Services */}
                <div className="flex items-start gap-4 text-right">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 font-bold" />
                        </div>
                    </div>
                    <div className="flex-1 mb-2">
                        <h3 className="font-semibold text-base mb-1 text-green-900 dark:text-green-300">
                            تحديد الموقع
                        </h3>
                        <p className="text-sm leading-relaxed text-green-800 dark:text-green-200">
                            تأكد من تفعيل خدمة تحديد الموقع للحصول على مساعدة أسرع
                        </p>
                    </div>
                </div>
            </div>


            <div className="h-3"></div>
        </div>
    );
}
export default AmbulaanceService;




{/* Instructional Text */ }
{/* <div className="flex gap-4 mt-5">
                    <div className="flex-1">
                        <label className="px-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            اسم المريض
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل اسم المريض"
                            className="bg-white dark:bg-gray-400 text-gray-900 dark:text-gray-100 mt-2 mb-4 w-full px-3 py-2 border border-gray-500 rounded-md
                 focus:outline-none 
             focus:border-red-600 dark:focus:border-red-200
             focus:ring-1 focus:ring-red-600 dark:focus:ring-red-200"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="px-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            رقم الهاتف
                        </label>
                        <input
                            type="text"
                            placeholder="أدخل رقم الهاتف"
                            className="bg-white dark:bg-gray-400 text-gray-900 dark:text-gray-100 mt-2 mb-4 w-full px-3 py-2 border border-gray-500 rounded-md
                 focus:outline-none 
             focus:border-red-600 dark:focus:border-red-200
             focus:ring-1 focus:ring-red-600 dark:focus:ring-red-200"
                        />
                    </div>
                </div> */}
