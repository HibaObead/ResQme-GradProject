"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { User, LogOut, Phone, MessageCircle, Map } from "lucide-react";
import Link from "next/link";

export default function MapBar() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            version: "weekly",
        });

        loader.load().then(() => {
            if (!mapRef.current) return;

            // 🟢 موقع جنين الأساسي
            const jeninCenter = { lat: 32.463, lng: 35.301 };

            // إنشاء الخريطة
            mapInstance.current = new google.maps.Map(mapRef.current, {
                center: jeninCenter,
                zoom: 13,
                mapId: "JENIN_MAP_ID",
            });

            // إضافة Marker على جنين
            new google.maps.Marker({
                position: jeninCenter,
                map: mapInstance.current,
                title: "مدينة جنين - فلسطين",
            });
        });
    }, []);

    return (
        <div dir="rtl" className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
            {/* 🔹 شريط التنقل */}
            <div className="sticky top-0 z-50 bg-white dark:bg-black shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-20 py-4">
                    {/* الشعار */}
                    <div className="flex items-center gap-2">
                        <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
                        <h1 className="text-2xl font-semibold text-[#00D492] dark:text-[#00D492]">
                            ResQ Me
                        </h1>
                    </div>

                    {/* القائمة اليمنى */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                            المريض <User className="h-4 w-4" />
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </div>

            {/* 🔹 الأزرار */}
            <div className="flex flex-col gap-4 rounded-lg p-4 md:flex-row md:items-center md:justify-between md:px-10 md:py-4 mt-5">
                {/* طلب إسعاف */}
                <button className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-800
                  dark:hover:text-slate-100 md:w-auto md:bg-transparent md:px-6 md:py-2 md:rounded-none md:shadow-none 
                  lg:px-30 cursor-pointer" > <Phone className="h-4 w-4" />
                    <Link href="/user/ambulance">طلب إسعاف</Link>
                </button>
                {/* المساعد الذكي */}
                <button className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-slate-600
                   dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 md:w-auto md:bg-transparent 
                   md:px-6 md:py-2 md:rounded-none md:shadow-none lg:px-30 cursor-pointer" >
                    <MessageCircle className="h-4 w-4" />
                    <Link href="/user/chatbot">المساعد الذكي</Link>
                </button>
                {/* الخريطة */}
                <button className="flex items-center justify-center gap-2 rounded-lg bg-white
                      dark:bg-gray-800 px-4 py-3 text-slate-800 dark:text-slate-200 shadow lg:w-[400px]
                       hover:bg-slate-100 dark:hover:bg-gray-700 md:w-auto md:px-6 cursor-pointer" >
                    <Map className="h-4 w-4" />
                    <Link href="/user/map">الخريطة</Link>
                </button>
            </div>
            {/* 🔹 قسم الخريطة */}
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div
                    ref={mapRef}
                    className="w-full h-[600px] rounded-xl shadow-lg border border-gray-300 dark:border-gray-700"
                ></div>
            </div>
        </div>
    );
}
