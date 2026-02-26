'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@/lib/contexts/auth-context';
import { useTranslations, useLocale } from 'next-intl';
import {
    Languages,
    User,
    LogOut,
    LayoutDashboard,
    BookOpen,
    LogIn,
    MessageCircle,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Navbar() {
    const t = useTranslations('common');
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();
    const router = useRouter();

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        router.replace(pathname, { locale: nextLocale });
        setIsMobileMoreOpen(false);
    };

    const desktopNavLinks = [
        { href: '/', label: t('home') },
        { href: '/courses', label: t('courses') },
        { href: '/contact', label: t('contact') },
    ];

    const mobilePrimaryLinks = user
        ? [
            { href: '/courses', label: t('courses'), icon: BookOpen },
            { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
            { href: '/profile', label: t('profile'), icon: User },
        ]
        : [
            { href: '/courses', label: t('courses'), icon: BookOpen },
            { href: '/login', label: t('login'), icon: LogIn },
            { href: '/register', label: t('register'), icon: User },
        ];

    return (
        <>
            {/* Desktop Navbar Only */}
            <nav className="sticky top-0 z-50 hidden w-full border-b border-white/5 bg-slate-900/80 backdrop-blur-md md:block">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/manal-logo.png"
                                    width={110}
                                    height={25}
                                    alt="Manal LMS Logo"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center gap-8">
                            {desktopNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-sm font-medium transition-all duration-200 hover:text-indigo-400 hover:scale-105',
                                        pathname === link.href ? 'text-indigo-400 font-bold' : 'text-slate-300'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="rounded-xl px-3 py-2 text-slate-300 transition-all hover:bg-white/10 hover:text-indigo-400"
                            >
                                <Languages className="h-5 w-5" />
                            </button>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-indigo-400"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>{t('dashboard')}</span>
                                    </Link>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 rounded-full border border-white/10 p-1 pr-3 hover:bg-white/5 rtl:pl-3 rtl:pr-1 transition-colors"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-200 hidden sm:inline-block">
                                                {user.fullName?.split(' ')[0] || ''}
                                            </span>
                                        </button>
                                        {isUserMenuOpen && (
                                            <div className="absolute left-0 mt-2 w-48 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl rtl:left-auto rtl:right-0">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-indigo-400"
                                                >
                                                    <User className="h-4 w-4" />
                                                    <span>{t('profile')}</span>
                                                </Link>
                                                <button
                                                    onClick={() => logout()}
                                                    className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    <span>{t('logout')}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-indigo-400">
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30"
                                    >
                                        {t('register')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile More Sheet */}
            {isMobileMoreOpen && (
                <div className="fixed inset-x-3 bottom-[5.7rem] z-50 rounded-[1.6rem] border border-white/10 bg-slate-900/98 p-3 shadow-2xl shadow-black/40 md:hidden">
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMoreOpen(false)}
                            className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm font-medium text-slate-200"
                        >
                            <MessageCircle className="h-4 w-4" />
                            {t('contact')}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm font-medium text-slate-200"
                        >
                            <Languages className="h-4 w-4" />
                            {locale === 'ar' ? 'English' : 'Arabic'}
                        </button>
                        {user ? (
                            <button
                                onClick={() => {
                                    setIsMobileMoreOpen(false);
                                    logout();
                                }}
                                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-3 text-sm font-medium text-red-300"
                            >
                                <LogOut className="h-4 w-4" />
                                {t('logout')}
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMoreOpen(false)}
                                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3 text-sm font-medium text-slate-200"
                            >
                                <LogIn className="h-4 w-4" />
                                {t('login')}
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation Only */}
            <nav className="fixed inset-x-3 bottom-3 z-50 isolate rounded-[2rem] border border-white/10 bg-slate-900/98 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-2xl shadow-black/40 md:hidden">
                <div className="grid grid-cols-5 gap-1">
                    {[mobilePrimaryLinks[0], mobilePrimaryLinks[1]].map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors',
                                    isActive ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-white/5'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="line-clamp-1">{item.label}</span>
                            </Link>
                        );
                    })}

                    <Link
                        href="/"
                        aria-label={t('home')}
                        className={cn(
                            'group relative -mt-9 flex h-16 w-16 items-center justify-center self-start justify-self-center rounded-full border border-white/25 bg-linear-to-b from-indigo-500 to-indigo-700 shadow-xl shadow-indigo-900/70 transition-all active:scale-90',
                            pathname === '/' && 'ring-2 ring-indigo-300/40 ring-offset-2 ring-offset-slate-900'
                        )}
                    >
                        <Image
                            src="/favicon.webp"
                            alt="Manal"
                            width={30}
                            height={30}
                            className="rounded-full object-cover"
                        />
                        <span className="pointer-events-none absolute inset-0 rounded-full border border-indigo-200/40 transition-all duration-150 group-active:scale-110 group-active:opacity-0" />
                    </Link>

                    {(() => {
                        const item = mobilePrimaryLinks[2];
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors',
                                    isActive ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-white/5'
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="line-clamp-1">{item.label}</span>
                            </Link>
                        );
                    })()}

                    <button
                        onClick={() => setIsMobileMoreOpen((prev) => !prev)}
                        className={cn(
                            'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors',
                            isMobileMoreOpen ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-white/5'
                        )}
                    >
                        {isMobileMoreOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        <span>More</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
