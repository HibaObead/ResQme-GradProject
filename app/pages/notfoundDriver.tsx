import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Home } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-2 sm:p-4">
            <div className="w-full max-w-md space-y-4 sm:space-y-6">
                <div className="text-center space-y-3 sm:space-y-4">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center shadow-lg">
                            <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">ResQme</h1>
                        <p className="text-sm sm:text-base text-muted-foreground">الصفحة غير موجودة</p>
                    </div>
                </div>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
                    <CardHeader className="text-center px-4 sm:px-6">
                        <CardTitle className="text-4xl sm:text-6xl font-bold text-primary">404</CardTitle>
                        <CardDescription className="text-base sm:text-lg">
                            عذراً، لم نتمكن من العثور على الصفحة المطلوبة
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-6">
                        <Button
                            onClick={() => window.location.href = "/"}
                            className="w-full bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                        >
                            <Home className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                            العودة للصفحة الرئيسية
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NotFound;
