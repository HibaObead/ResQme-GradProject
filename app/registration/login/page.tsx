"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, HeartPulse } from "lucide-react";

interface LoginResponse {
    token?: string;
    message?: string;
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("authToken");
    }, []);

    // دالة صغيرة لفك التوكن من غير مكتبات
    const decodeJWT = (token: string) => {
        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(atob(payload));
            return decoded;
        } catch {
            return null;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch(
                "https://resqme.runasp.net/api/Identity/Accounts/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );

            let data: LoginResponse;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = { message: text };
            }

            console.log("Login response:", data);

            if (response.ok && data.token) {
                localStorage.setItem("authToken", data.token);
                setSuccessMessage("تم تسجيل الدخول بنجاح ✅");
                setPassword("");

                // هنا فك التوكن واستخراج الدور الحقيقي
                const decoded = decodeJWT(data.token);

                console.log("decoded token:", decoded);

                // claim الخاص بالدور
                const roleClaim =
                    decoded?.[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ];

                const normalizedRole = String(roleClaim || "User").toLowerCase();

                if (normalizedRole === "driver") {
                    router.push("/driver");
                } else {
                    router.push("/user/ambulance");
                }
            } else {
                setErrorMessage(data.message || "فشل تسجيل الدخول");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("تعذر الاتصال بالخادم");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f9fafa] to-[#f3f8ff] p-4" dir="rtl">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-150px] right-[-100px] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-red-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-blue-300/15 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4">
                <Card className="border border-red-300/20 bg-white/80 backdrop-blur-lg shadow-[0_0_40px_-10px_rgba(255,0,0,0.15)] rounded-3xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-red-500 via-blue-400 to-red-500" />
                    <CardHeader className="pb-4 space-y-1">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-100 to-blue-100 border border-red-200 shadow-inner">
                                <HeartPulse className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-red-600">
                            تسجيل الدخول إلى نظام ResQme
                        </CardTitle>
                        <CardDescription className="text-center text-sm sm:text-base md:text-lg text-gray-500">
                            نظام الاستجابة السريعة للطوارئ الطبية
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-700">البريد الإلكتروني</Label>
                                <div className="relative group">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@resqme.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pr-10 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg bg-white/80 border border-[hsl(355_75%_55%/0.2)] focus:!border-[hsl(355,69%,61%)] focus:!ring-[hsl(355,69%,61%)] focus:!ring-2 focus:!shadow-[0_0_6px_hsl(355_75%_55%/0.4)] transition-all rounded-xl placeholder:text-gray-400 w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm sm:text-base font-semibold text-gray-700">كلمة المرور</Label>
                                <div className="relative group">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pr-10 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg bg-white/80 border border-[hsl(355_75%_55%/0.2)] focus:!border-[hsl(355,69%,61%)] focus:!ring-[hsl(355,69%,61%)] focus:!ring-2 focus:!shadow-[0_0_6px_hsl(355_75%_55%/0.4)] transition-all rounded-xl placeholder:text-gray-400 w-full"
                                    />
                                </div>
                            </div>

                            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
                            <p className="text-center text-sm sm:text-base text-gray-600">
                                <span
                                    onClick={() => router.push("/registration/forgotpassword")}
                                    className="text-red-600 font-semibold cursor-pointer hover:underline"
                                >
                                    هل نسيت كلمة المرور؟
                                </span>
                            </p>
                            <Button type="submit" className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-bold bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] hover:opacity-90 transition-all shadow-[0_0_40px_hsl(355_75%_55%/0.25)] relative group overflow-hidden text-white rounded-xl">
                                تسجيل الدخول
                            </Button>
                        </form>
                        <p className="text-center text-sm sm:text-base text-gray-600">
                            ليس لديك حساب؟{" "}
                            <span
                                onClick={() => router.push("/registration/register")}
                                className="text-red-600 font-semibold cursor-pointer hover:underline"
                            >
                                إنشاء حساب جديد
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
