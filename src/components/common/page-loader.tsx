import { Loader2 } from 'lucide-react';

/**
 * Full-page loading state with T.MANAL branding.
 * Used by Next.js loading.tsx files across all route groups.
 */
export function PageLoader() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 animate-fade-in">
            <div className="relative flex items-center justify-center">
                <div className="page-loader__ring" />
                <div className="absolute flex h-full items-center justify-center pt-1" dir="ltr">
                    <span className="text-xl font-black text-indigo-400">T.</span>
                    <span className="text-xl font-black text-slate-300 dark:text-slate-500">MANAL</span>
                </div>
            </div>

            {/* Cascading Dots */}
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-300 shadow-sm shadow-indigo-300/50"></div>
            </div>
        </div>
    );
}
