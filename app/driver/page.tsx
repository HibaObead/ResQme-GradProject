"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexDriver from "../pages/indexDriver";

const queryClient = new QueryClient();

const DriverPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                {/* Toasters */}
                <Toaster />
                <Sonner />

                {/* Driver Dashboard */}
                <IndexDriver />
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default DriverPage;
