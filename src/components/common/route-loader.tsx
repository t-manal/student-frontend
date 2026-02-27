'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function RouteLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const prevPath = useRef(pathname);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startLoading = useCallback(() => {
        setLoading(true);
        setProgress(0);

        let p = 0;
        const step = () => {
            p += Math.random() * 15 + 5;
            if (p > 85) p = 85;
            setProgress(p);
            if (p < 85) {
                timerRef.current = setTimeout(step, 200 + Math.random() * 200);
            }
        };
        timerRef.current = setTimeout(step, 50);
    }, []);

    const finishLoading = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setProgress(100);
        setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 400);
    }, []);

    useEffect(() => {
        if (pathname !== prevPath.current) {
            // Defer to avoid synchronous setState in effect body
            const kickoff = setTimeout(() => startLoading(), 0);

            const done = setTimeout(finishLoading, 500);
            prevPath.current = pathname;
            return () => {
                clearTimeout(kickoff);
                clearTimeout(done);
            };
        }
    }, [pathname, startLoading, finishLoading]);

    if (!loading && progress === 0) return null;

    return (
        <div className="route-loader" aria-hidden="true">
            <div
                className="route-loader__bar"
                style={{
                    width: `${progress}%`,
                    opacity: progress >= 100 ? 0 : 1,
                }}
            />
        </div>
    );
}
