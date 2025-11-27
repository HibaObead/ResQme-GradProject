"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";

const ChangePasswordDemo = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (newPassword !== confirmPassword) {
            setErrorMessage("كلمات المرور الجديدة غير متطابقة");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            setErrorMessage("غير مصرح. يرجى تسجيل الدخول.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://resqme.runasp.net/api/identity/Accounts/change-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                    }),
                }
            );

            // لأن الـ API لا يعيد JSON أحياناً
            if (response.ok) {
                setSuccessMessage("تم تغيير كلمة المرور بنجاح ✅");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                let errorText = "حدث خطأ أثناء تغيير كلمة المرور";

                try {
                    const data = await response.json();
                    if (data?.message) errorText = data.message;
                } catch {
                    // تجاهل لأن الباك قد يعيد empty body
                }

                setErrorMessage(errorText);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("تعذر الاتصال بالخادم");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            dir="rtl"
        >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Card className="border !border-[hsl(355_75%_55%/0.2)] backdrop-blur-sm bg-[hsl(0_0%_100%/0.95)] shadow-[0_20px_60px_-15px_hsl(220_15%_15%/0.15)]">
                    <CardHeader className="space-y-1 pb-3">
                        <CardTitle className="text-lg sm:text-xl font-bold text-center text-[hsl(220_15%_15%)]">
                            تغيير كلمة المرور
                        </CardTitle>
                        <CardDescription className="text-center text-xs sm:text-sm text-[hsl(220_15%_15%/0.7)]">
                            أدخل كلمة المرور الحالية والجديدة
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="currentPassword" className="text-xs sm:text-sm font-medium text-[hsl(220_15%_15%)] mr-2">
                                    كلمة المرور الحالية
                                </Label>
                                <div className="relative group">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[hsl(220_10%_45%)] group-focus-within:!text-[hsl(355_75%_55%)] transition-colors" />
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="rounded-xl pr-9 h-9 text-xs sm:text-sm bg-[hsl(0_0%_100%/0.5)] border border-[hsl(355_75%_55%/0.2)] focus:!border-[hsl(355,69%,61%)] focus:!ring-[hsl(355,69%,61%)] focus:!ring-2 focus:!shadow-[0_0_6px_hsl(355_75%_55%/0.4)] transition-all text-[hsl(220_15%_15%)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="newPassword" className="text-xs sm:text-sm font-medium text-[hsl(220_15%_15%)] mr-2">
                                    كلمة المرور الجديدة
                                </Label>
                                <div className="relative group">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[hsl(220_10%_45%)] group-focus-within:!text-[hsl(355_75%_55%)] transition-colors" />
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="rounded-xl pr-9 h-9 text-xs sm:text-sm bg-[hsl(0_0%_100%/0.5)] border border-[hsl(355_75%_55%/0.2)] focus:!border-[hsl(355,69%,61%)] focus:!ring-[hsl(355,69%,61%)] focus:!ring-2 focus:!shadow-[0_0_6px_hsl(355_75%_55%/0.4)] transition-all text-[hsl(220_15%_15%)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-[hsl(220_15%_15%)] mr-2">
                                    تأكيد كلمة المرور الجديدة
                                </Label>
                                <div className="relative group">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[hsl(220_10%_45%)] group-focus-within:!text-[hsl(355_75%_55%)] transition-colors" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="rounded-xl pr-9 h-9 text-xs sm:text-sm bg-[hsl(0_0%_100%/0.5)] border border-[hsl(355_75%_55%/0.2)] focus:!border-[hsl(355,69%,61%)] focus:!ring-[hsl(355,69%,61%)] focus:!ring-2 focus:!shadow-[0_0_6px_hsl(355_75%_55%/0.4)] transition-all text-[hsl(220_15%_15%)]"
                                    />
                                </div>
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                            )}
                            {successMessage && (
                                <p className="text-green-500 text-sm text-center">{successMessage}</p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-8 sm:h-9 text-xs sm:text-sm font-bold bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] hover:opacity-90 transition-all shadow-[0_0_40px_hsl(355_75%_55%/0.25)] relative group overflow-hidden text-white"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                            </Button>

                            <div className="text-center">
                                <Link
                                    href="/registration/login"
                                    className="mt-5 inline-flex items-center text-xs sm:text-sm text-[hsl(220_10%_45%)] hover:text-[hsl(220_15%_15%)] font-medium transition-colors group"
                                >
                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                                    العودة إلى تسجيل الدخول
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChangePasswordDemo;
