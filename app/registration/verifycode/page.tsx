"use client";
import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation"; // ✅ بدلاً من useNavigate
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, RotateCcw } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import Link from "next/link"; // ✅ بدلاً من react-router-dom

const VerifyCode = () => {
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const { toast } = useToast();
    const router = useRouter(); // ✅ بدلاً من useNavigate()

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length && i < 4; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        const nextEmptyIndex = newCode.findIndex((val) => !val);
        if (nextEmptyIndex !== -1) {
            inputRefs[nextEmptyIndex].current?.focus();
        } else {
            inputRefs[3].current?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (verificationCode.length === 4) {
            toast({
                title: "تم التحقق بنجاح",
                description: "يمكنك الآن إدخال كلمة المرور الجديدة",
            });
            router.push("/registration/resetpassword");
        }
    };

    const handleResend = () => {
        toast({
            title: "تم إعادة الإرسال",
            description: "تحقق من بريدك الإلكتروني",
        });
        setCode(["", "", "", ""]);
        inputRefs[0].current?.focus();
    };

    return (
        <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_0%_100%)] via-[hsl(355_75%_55%/0.02)] to-[hsl(200_85%_50%/0.03)]"></div>

            {/* Circles */}
            <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-[hsl(355_75%_55%/0.05)] rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-[hsl(200_85%_50%/0.05)] rounded-full blur-3xl"></div>

            {/* Card */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10">
                <Card className="border border-red-300/20 backdrop-blur-sm bg-card/95 shadow-[0_0_40px_-10px_rgba(255,0,0,0.15)]">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-center">رمز التحقق</CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-center">
                            أدخل الرمز المكون من 4 أرقام المرسل إلى بريدك
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Code Inputs */}
                            <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 sm:w-14 h-12 sm:h-14 text-xl sm:text-2xl text-center font-bold border-2 border-red-300 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all bg-background/50"
                                    />
                                ))}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={code.join("").length !== 4}
                                className="rouned-xl w-full h-8 sm:h-9 text-xs sm:text-sm font-bold 
                  bg-[linear-gradient(135deg,hsl(355_75%_55%)_0%,hsl(355_85%_65%)_100%)] 
                  hover:opacity-90 transition-all 
                  shadow-[0_0_40px_hsl(355_75%_55%/0.25)] 
                  relative group overflow-hidden text-white disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    تحقق من الرمز
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                            </Button>

                            {/* Divider & Resend */}
                            <div className="space-y-3">
                                <div className="relative mb-5">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-red-300/20"></div>
                                    </div>
                                </div>

                                {/* Resend Section */}
                                <div className="flex flex-col items-center mt-5 space-y-3">
                                    <p className="text-xs text-muted-foreground">لم تستلم الرمز؟</p>
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className=" inline-flex items-center gap-2 text-sm text-red-500 hover:underline font-bold transition-colors"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        إعادة الإرسال
                                    </button>
                                </div>

                                <div className="text-center pt-1">
                                    <Link
                                        href="/registration/login"
                                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-medium transition-colors group"
                                    >
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        العودة إلى تسجيل الدخول
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerifyCode;
