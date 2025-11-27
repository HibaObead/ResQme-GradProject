import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
    LogOut,
    MapPin,
    Phone,
    Clock,
    AlertTriangle,
    CheckCircle,
    Circle,
    Navigation,
    User,
    CheckCheck,
    Moon,
    Sun
} from "lucide-react";
import { useTheme } from "@/components/mode-toggle";
import { useToast } from "../app/hooks/use-toast";
import { MapModal } from "./mapmodle";

interface Driver {
    id: string;
    name: string;
    email: string;
}

interface AmbulanceRequest {
    id: string;
    patientName: string;
    location: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
    timestamp: string;
    phoneNumber: string;
    status: "pending" | "accepted" | "completed";
}

interface DriverDashboardProps {
    driver: Driver;
    onLogout: () => void;
}

export const DriverDashboard = ({ driver, onLogout }: DriverDashboardProps) => {
    const { theme, setTheme } = useTheme();
    const [driverStatus, setDriverStatus] = useState<"available" | "on-duty">("available");
    const [requests, setRequests] = useState<AmbulanceRequest[]>([
        {
            id: "req-001",
            patientName: "فاطمة أبو خضر",
            location: "شارع ابو بكر",
            description: "حالة طوارئ - صعوبة في التنفس",
            priority: "critical",
            timestamp: "منذ 3 دقائق",
            phoneNumber: "+970591234567",
            status: "pending"
        },
        {
            id: "req-002",
            patientName: "أحمد صالح",
            location: "حي الشيخ جراح، ",
            description: "كسر في الذراع",
            priority: "medium",
            timestamp: "منذ 8 دقائق",
            phoneNumber: "+970591234568",
            status: "pending"
        },
        {
            id: "req-003",
            patientName: "مريم عبد الله ",
            location: "شارع الانتفاضة، رام الله",
            description: "آلام في الصدر",
            priority: "high",
            timestamp: "منذ 12 دقيقة",
            phoneNumber: "+970592345678",
            status: "pending"
        }
    ]);

    const { toast } = useToast();
    const [selectedLocation, setSelectedLocation] = useState<{
        location: string;
        patientName: string;
    } | null>(null);

    const hasAcceptedRequest = requests.some(req => req.status === "accepted");

    const handleStatusChange = () => {
        const newStatus = driverStatus === "available" ? "on-duty" : "available";
        setDriverStatus(newStatus);

        toast({
            title: "تم تحديث الحالة",
            description: newStatus === "on-duty" ? "أنت الآن في الخدمة" : "أنت الآن متاح",
        });
    };

    const handleAcceptRequest = (requestId: string) => {
        if (hasAcceptedRequest) {
            toast({
                title: "تنبيه",
                description: "لديك طلب قيد التنفيذ بالفعل",
                variant: "destructive"
            });
            return;
        }

        setRequests(prev =>
            prev.map(req =>
                req.id === requestId
                    ? { ...req, status: "accepted" }
                    : req
            )
        );

        toast({
            title: "تم قبول الطلب",
            description: "سيتم توجيهك إلى موقع المريض",
        });
    };

    const handleCompleteRequest = (requestId: string) => {
        setRequests(prev => prev.filter(req => req.id !== requestId));

        toast({
            title: "تم إنهاء الطلب",
            description: "تم إنهاء الطلب بنجاح",
        });
    };

    const handleNavigate = (location: string, patientName: string) => {
        setSelectedLocation({ location, patientName });
    };
    const getPriorityText = (priority: string) => {
        switch (priority) {
            case "critical": return "حرجة";
            case "high": return "عالية";
            case "medium": return "متوسطة";
            case "low": return "منخفضة";
            default: return "غير محدد";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <MapModal
                isOpen={selectedLocation !== null}
                onClose={() => setSelectedLocation(null)}
                location={selectedLocation?.location || ""}
                patientName={selectedLocation?.patientName || ""}
            />

            <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10  flex items-center justify-center">
                                <Image src="/ambulance.svg" alt="Logo" width={40} height={40} />
                            </div>
                            <div >
                                <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold text-[#00D492] dark:text-[#00D492]">
                                    ResQ Me
                                </h1>
                                <p className="text-xs sm:text-sm text-muted-foreground">لوحة تحكم السائق</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="font-medium flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4" />
                                    {driver.name}
                                </p>
                                <p className="text-xs text-muted-foreground">{driver.email}</p>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="h-8 w-8 sm:h-9 sm:w-9"
                            >
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>

                            <Button variant="outline" onClick={onLogout} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4">
                                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">تسجيل الخروج</span>
                                <span className="sm:hidden">خروج</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
                <Card className="shadow-lg border-0 bg-gradient-to-r from-card to-accent/5">
                    <CardHeader className="pb-3 sm:pb-6">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex-1 min-w-0">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Circle
                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${driverStatus === "on-duty"
                                            ? "text-red-500 fill-red-500"
                                            : "text-green-500 fill-green-500"
                                            }`}
                                    />
                                    حالة السائق
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    {driverStatus === "on-duty"
                                        ? "أنت في الخدمة حالياً"
                                        : "أنت متاح للاستدعاء"}
                                </CardDescription>
                            </div>

                            <Badge
                                variant={driverStatus === "on-duty" ? "default" : "secondary"}
                                className={`text-xs ${driverStatus === "on-duty"
                                    ? "bg-red-500 text-white"
                                    : "bg-green-500 text-white"
                                    }`}
                            >
                                {driverStatus === "on-duty" ? "في الخدمة" : "متاح"}
                            </Badge>
                        </div>
                    </CardHeader>


                    <CardContent className="pt-0">
                        <Button
                            onClick={handleStatusChange}
                            className={`w-full text-sm sm:text-base font-medium transition-all duration-300 rounded-lg shadow-md ${driverStatus === "available"
                                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                }`}
                        >
                            {driverStatus === "available" ? "بدء الخدمة" : "إنهاء الخدمة"}
                        </Button>
                    </CardContent>

                </Card>

                < div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            طلبات الإسعاف
                        </h2>

                        <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-600 border border-red-200 text-xs px-3 py-1 rounded-full"
                        >
                            {requests.filter(r => r.status === "pending").length} طلب جديد
                        </Badge>
                    </div>


                    <div className="grid gap-3 sm:gap-4">
                        {requests.map((request) => (
                            <Card
                                key={request.id}
                                className="shadow-md border-l-4 border-l-red-500 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900"
                            >
                                <CardHeader className="pb-2 sm:pb-3">
                                    <div className="flex items-start justify-between flex-wrap gap-2">
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                                <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                                <span className="truncate">{request.patientName}</span>
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                                {request.timestamp}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                                            <Badge
                                                className={`text-xs ${request.priority === "high"
                                                    ? "bg-red-100 text-red-700"
                                                    : request.priority === "medium"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {getPriorityText(request.priority)}
                                            </Badge>

                                            {request.status === "accepted" && (
                                                <Badge className="bg-green-100 text-green-700 text-xs border border-green-300">
                                                    <CheckCircle className="w-3 h-3 ml-1" />
                                                    مقبول
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-1 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm break-words">{request.location}</span>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 mt-1 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm">{request.description}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm font-mono">{request.phoneNumber}</span>
                                        </div>
                                    </div>

                                    {request.status === "pending" && driverStatus === "on-duty" && (
                                        <>
                                            <Separator />
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                <Button
                                                    onClick={() => handleAcceptRequest(request.id)}
                                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs sm:text-sm shadow-md"
                                                    disabled={hasAcceptedRequest}
                                                >
                                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                                    قبول الطلب
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="flex items-center gap-1 sm:gap-2 sm:min-w-[100px] text-xs sm:text-sm border-blue-500 text-blue-600 hover:bg-blue-50"
                                                    onClick={() => handleNavigate(request.location, request.patientName)}
                                                >
                                                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    التنقل
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    {request.status === "accepted" && (
                                        <>
                                            <Separator />
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                <Button
                                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs sm:text-sm"
                                                    onClick={() => handleNavigate(request.location, request.patientName)}
                                                >
                                                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                                    الانتقال إلى الموقع
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="sm:min-w-[100px] text-xs sm:text-sm border-green-500 text-green-600 hover:bg-green-50"
                                                    onClick={() => window.open(`tel:${request.phoneNumber}`)}
                                                >
                                                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                                    اتصال
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="sm:min-w-[100px] text-xs sm:text-sm bg-green-100 hover:bg-green-200 border-green-500 text-green-700"
                                                    onClick={() => handleCompleteRequest(request.id)}
                                                >
                                                    <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                                    إنهاء
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    {driverStatus === "available" && (
                                        <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-2 sm:p-3">
                                            <p className="text-xs sm:text-sm text-muted-foreground text-center">
                                                يجب أن تكون في الخدمة لقبول الطلبات
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};