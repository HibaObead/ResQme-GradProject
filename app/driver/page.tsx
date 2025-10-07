"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import IndexDriver from "../pages/indexDriver";
import NotFound from "../pages/notfoundDriver";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                {/* Toasters */}
                <Toaster />
                <Sonner />

                {/* زر تبديل الوضع */}
                <ModeToggle />

                {/* Routing */}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IndexDriver />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
