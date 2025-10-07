// import Link from 'next/link';
// import Image from 'next/image';
import React from 'react';

function Footer() {
    return (
        <footer>
            {/* Bottom Bar */}
            <div className="border-t border-gray-300 dark:border-gray-700 py-2 text-center text-xs ">
                © {new Date().getFullYear()} ResQ Me - جميع الحقوق محفوظة
            </div>
        </footer>
    );
}

export default Footer;
