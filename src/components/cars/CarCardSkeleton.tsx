"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
    return (
        <Card className="overflow-hidden border border-gray-200 bg-white">
            {/* Image Skeleton */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Skeleton className="absolute inset-0" />
            </div>

            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 space-y-2">
                        {/* Brand Badge Skeleton */}
                        <Skeleton className="h-5 w-16 rounded-full" />
                        {/* Model Name Skeleton */}
                        <Skeleton className="h-6 w-3/4" />
                        {/* Location & Year Skeleton */}
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>

                {/* Price Skeleton */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <Skeleton className="h-8 w-2/3 mb-1" />
                    <Skeleton className="h-3 w-1/3" />
                </div>

                {/* Specs Grid Skeleton */}
                <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}
