import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
function Navbar() {
    return (
        <  div className="bg-white dark:bg-black min-h-screen">
            <div className="sticky top-0 z-50 bg-white dark:bg-black shadow flex justify-between items-center px-20 py-5">
                {/* Left side: Logo + App Name */}
                <div className="flex items-center gap-2">
                    <Image src="/ambulance.svg" alt="Logo" width={50} height={50} />
                    <h1 className="text-[30px] leading-[24.5px] font-semibold align-middle text-[#00D492] dark:text-[#00D492]">
                        ResQ Me
                    </h1>
                </div>

                {/* Right side: Login button + Mode toggle */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="text-xl w-30 text-slate-700 hover:border-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-gray-800"
                    >
                        <Link href="/#">Log In</Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Navbar