"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, Send } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("https://resqme.runasp.net/api/identity/Accounts/forgot-password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("حدث خطأ أثناء إرسال البريد الإلكتروني");
            }

            toast({
                title: "تم إرسال رمز التحقق",
                description: "تحقق من بريدك الإلكتروني",
            });

            router.push("/registration/verifycode");
        } catch (error) {
            toast({
                title: "فشل الإرسال",
                description: (error as Error).message || "حاول مرة أخرى لاحقاً",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_0%_100%)] via-[hsla(355,75%,55%,0)] to-[hsl(200_85%_50%/0.03)]"></div>
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[hsl(355_75%_55%/0.05)] rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[hsl(200_85%_50%/0.05)] rounded-full blur-3xl"></div>

            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative z-10">
                <Card className="!border-[hsl(355,81%,67%)] border-1 backdrop-blur-sm bg-card/95 shadow-card transition-all">
                    <CardHeader className="space-y-1 pb-1">
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
                            نسيت كلمة المرور؟
                        </CardTitle>
                        <CardDescription className="text-center text-sm sm:text-base">
                            أدخل بريدك الإلكتروني وسنرسل لك رمز تحقق
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm sm:text-base font-medium mr-2">البريد الإلكتروني</Label>
                                <div className="relative group">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-[hsl(355_75%_55%)] transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@resqme.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="rounded-xl pr-10 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg bg-background/50 border border-primary/20 focus:border-[hsl(355_75%_55%)] focus:!ring-[hsl(355_75%_55%)] focus:!ring-2 outline-none transition-all w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-bold relative group overflow-hidden bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] shadow-[0_0_40px_hsl(355_75%_55%_/_0.25)] rounded-xl"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                    إرسال رمز التحقق
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-primary/20"></div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link
                                    href="/registration/login"
                                    className="mt-5 inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground font-medium transition-colors group"
                                >
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform " />
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

export default ForgotPassword;
