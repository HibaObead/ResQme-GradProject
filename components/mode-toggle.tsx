// "use client";

// import * as React from "react";
// import { Sun, Moon } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";

// export function ModeToggle() {
//     const { theme, setTheme } = useTheme();

//     return (
//         <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="ml-4 cursor-pointer"
//         >
//             {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             <span className="sr-only">تبديل الوضع</span>
//         </Button>
//     );
// }
"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true); // نحدد أن المكون تم تحميله على العميل
    }, []);

    if (!mounted) return null; // لا نعرض شيء حتى يتم mount

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="ml-4 cursor-pointer"
        >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">تبديل الوضع</span>
        </Button>
    );
}

export {
    //         >
    //             {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    //             <span className="sr-only">تبديل الوضع</span>
    //         </Button>
    //     );
    // }
    useTheme
};
