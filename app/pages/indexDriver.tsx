import { DriverDashboard } from "@/components/driverdashboard";

const Index = () => {
    const driver = {
        id: "driver-001",
        name: "اسلام مسمار",
        email: "driver@palestine.ps"
    };

    const handleLogout = () => {
        console.log("تسجيل الخروج");
    };

    return <DriverDashboard driver={driver} onLogout={handleLogout} />;
};

export default Index;
