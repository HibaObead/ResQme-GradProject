"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, Phone, Zap, MapPin, CreditCard, HeartPulse } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// InputField Component
interface InputFieldProps {
    id: string;
    label: string;
    icon: React.ElementType;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, icon: Icon, placeholder, type = "text", value, onChange }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-semibold text-gray-700 block text-right">{label}</Label>
        <div className="relative group">
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-3 h-11 text-sm border-gray-300 focus:!border-[hsl(355,67%,58%)] focus:!ring-[hsl(355_67%_58%)] focus:!ring-1 focus:!shadow-[0_0_8px_hsl(355_75%_55%_/_0.4)] text-gray-700 placeholder:text-gray-400 rounded-xl bg-white/70 transition-all text-right"
                required
            />
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
        </div>
    </div>
);

// Types for API body
interface UserBody {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    city: string;
    region: null;
}

interface DriverBody extends UserBody {
    licenseNumber: string;
}

const Register: React.FC = () => {
    const [userType, setUserType] = useState<"user" | "driver">("user");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        address: "",
        licenseNumber: "",
    });

    const { toast } = useToast();
    const router = useRouter();

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({ title: "خطأ في كلمة المرور", description: "كلمتا المرور غير متطابقتين.", variant: "destructive" });
            return;
        }

        try {
            toast({ title: "جارٍ إنشاء الحساب...", description: "يرجى الانتظار." });

            const apiUrl =
                userType === "user"
                    ? "https://resqme.runasp.net/api/identity/Accounts/register/user"
                    : "https://resqme.runasp.net/api/identity/Accounts/register/driver";

            const body: UserBody | DriverBody =
                userType === "user"
                    ? { name: formData.name, email: formData.email, phoneNumber: formData.phoneNumber, password: formData.password, city: formData.address, region: null }
                    : { name: formData.name, email: formData.email, phoneNumber: formData.phoneNumber, password: formData.password, city: formData.address, licenseNumber: formData.licenseNumber, region: null };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.success) {
                const token = data.token;
                if (token) localStorage.setItem("authToken", token);

                toast({ title: "تم إنشاء الحساب بنجاح ✅", description: "تم حفظ رمز الدخول." });

                if (userType === "user") router.push("/user/ambulance");
                if (userType === "driver") router.push("/driver");
            } else {
                const errors = data.errors ? data.errors.join(" | ") : data.message;
                toast({ title: "فشل التسجيل ❌", description: errors, variant: "destructive" });
            }
        } catch (error) {
            const err = error as Error;
            toast({ title: "فشل التسجيل ❌", description: err.message || "تحقق من البيانات أو الاتصال بالإنترنت.", variant: "destructive" });
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f9fbff] to-[#fef6f6] p-4" dir="rtl">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] bg-blue-300/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-red-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-3xl transform">
                <Card className="border border-red-200/30 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_-10px_rgba(255,0,0,0.15)] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-red-500 via-blue-400 to-red-500 animate-pulse" />
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-extrabold text-red-600 flex items-center justify-center gap-2">
                            <HeartPulse className="w-7 h-7 text-red-500 animate-pulse" /> ResQme
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-sm">إنشاء حساب جديد للوصول إلى خدمات الإسعاف والطوارئ</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Tabs value={userType} onValueChange={(v) => setUserType(v as "user" | "driver")} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-11 bg-gradient-to-r from-red-50 to-blue-50 border border-red-100 rounded-xl">
                                <TabsTrigger value="user" className="text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all">مستخدم</TabsTrigger>
                                <TabsTrigger value="driver" className="text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all">سائق</TabsTrigger>
                            </TabsList>

                            <TabsContent value="user" className="mt-4">
                                <form onSubmit={handleRegister} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField id="phoneNumber" label="رقم الهاتف" icon={Phone} placeholder="+970 5X XXX XXXX" value={formData.phoneNumber} onChange={(v) => updateField("phoneNumber", v)} />
                                        <InputField id="name" label="الاسم الكامل" icon={User} placeholder="اسلام مسمار" value={formData.name} onChange={(v) => updateField("name", v)} />
                                    </div>
                                    <InputField id="address" label="العنوان" icon={MapPin} placeholder="جنين" value={formData.address} onChange={(v) => updateField("address", v)} />
                                    <InputField id="email" label="البريد الإلكتروني" icon={Mail} placeholder="example@resqme.com" value={formData.email} onChange={(v) => updateField("email", v)} />
                                    <InputField id="password" label="كلمة المرور" icon={Lock} placeholder="••••••••" type="password" value={formData.password} onChange={(v) => updateField("password", v)} />
                                    <InputField id="confirmPassword" label="تأكيد كلمة المرور" icon={Lock} placeholder="••••••••" type="password" value={formData.confirmPassword} onChange={(v) => updateField("confirmPassword", v)} />
                                    <Button type="submit" className="w-full h-11 text-sm font-bold rounded-xl bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] text-white shadow-[0_0_40px_hsl(355_75%_55%/0.25)] hover:opacity-90 transition-all relative group overflow-hidden">
                                        <Zap className="w-4 h-4 ml-2" /> إنشاء حساب مستخدم
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="driver" className="mt-4">
                                <form onSubmit={handleRegister} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField id="licenseNumber" label="رقم الرخصة" icon={CreditCard} placeholder="6564" value={formData.licenseNumber} onChange={(v) => updateField("licenseNumber", v)} />
                                        <InputField id="driver-name" label="الاسم الكامل" icon={User} placeholder="اسلام مسمار" value={formData.name} onChange={(v) => updateField("name", v)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField id="driver-email" label="البريد الإلكتروني" icon={Mail} placeholder="example@resqme.com" value={formData.email} onChange={(v) => updateField("email", v)} />
                                        <InputField id="driver-phoneNumber" label="رقم الهاتف" icon={Phone} placeholder="+970 5X XXX XXXX" value={formData.phoneNumber} onChange={(v) => updateField("phoneNumber", v)} />
                                    </div>
                                    <InputField id="driver-password" label="كلمة المرور" icon={Lock} placeholder="••••••••" type="password" value={formData.password} onChange={(v) => updateField("password", v)} />
                                    <InputField id="driver-confirmPassword" label="تأكيد كلمة المرور" icon={Lock} placeholder="••••••••" type="password" value={formData.confirmPassword} onChange={(v) => updateField("confirmPassword", v)} />
                                    <Button type="submit" className="w-full h-11 text-sm font-bold rounded-xl bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] text-white shadow-[0_0_40px_hsl(355_75%_55%/0.25)] hover:opacity-90 transition-all relative group overflow-hidden">
                                        <Zap className="w-4 h-4 ml-2" /> إنشاء حساب سائق
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="text-center text-sm text-gray-600">
                            لديك حساب بالفعل؟{" "}
                            <Link href="/registration/login" className="text-red-500 hover:underline font-bold">تسجيل الدخول</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
