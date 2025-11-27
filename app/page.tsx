"use client";
import { Shield, Phone, Heart, Clock, Users, Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Index = () => {
  // const router = useRouter();

  const stats = [
    {
      icon: Shield,
      value: "98.5%",
      label: "نسبة النجاح",
      color: "text-emerald-500",
    },
    {
      icon: Activity,
      value: "127",
      label: "طلبات اليوم",
      color: "text-amber-500",
    },
    {
      icon: Clock,
      value: "4.2 دقيقة",
      label: "متوسط وقت الاستجابة",
      color: "text-emerald-500",
    },
    {
      icon: Users,
      value: "15,847",
      label: "مرضى تم إنقاذهم",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Settings className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground">لوحة الإدارة</span> */}
            <div className="flex items-center gap-2">
              <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
              <h1 className="hidden sm:block text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#00D492] dark:text-[#00D492]">
                ResQ Me
              </h1>

            </div>
          </div>

          <div className="flex items-center gap-3 scale-150">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 m-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full  ">
              </div>
              24/7
            </Badge>
          </div>

          <div className="flex items-center gap-2 scale-140">
            <ModeToggle />

          </div>
        </div>
      </header>

      {/* Status Badge */}
      <div className="flex justify-center mt-16 mb-8">
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 text-sm font-medium m-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full  "></div>
          خدمة متوفرة 24/7
        </Badge>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex mx-auto gap-0 max-w-4xl justify-center mb-6">
            <Heart className="h-8 w-8 mr-0 text-red-700 animate-pulse" />

            <h1 className="text-6xl font-black mb-6 font-serif">ResQ me</h1>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-muted-foreground">
            نظام الإسعاف الذكي المدعوم بالذكاء الاصطناعي
          </h2>

          <p className="text-lg text-muted-foreground mb-16 leading-relaxed max-w-3xl mx-auto">
            الحصول على المساعدة الطبية الفورية مع تحديد الموقع الدقيق والتشخيص الأولي المدعوم بالذكاء الاصطناعي
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              size="lg"

              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="h-6 w-6 mr-3" />
              مكالمة طوارئ
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group bg-red-600 text-white border-2 border-border  
             px-8 py-6 text-lg font-semibold rounded-xl shadow-lg 
             hover:bg-muted transition-all duration-300"
            >
              <LogOut className="h-6 w-6 mr-3 text-white font-bold group-hover:text-amber-500 transition-colors duration-300" />
              <  Link href="../registration/login"
                className="group-hover:text-amber-500 transition-colors duration-300">
                تسجيل الدخول
              </Link>
            </Button >
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-card border border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-2xl bg-muted/50">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>

                  <div className="text-3xl font-black mb-2 text-foreground">
                    {stat.value}
                  </div>

                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <div className="h-5"></div>
    </div>
  );
};

export default Index;
