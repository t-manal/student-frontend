import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
    const t = useTranslations('footer');
    const tc = useTranslations('common');
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-slate-950 py-12 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/manal-logo.png"
                                width={140}
                                height={32}
                                alt="Manal Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p className="mt-4 max-w-xs text-slate-300">
                            {t('tagline')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{t('links_title')}</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/courses" className="text-slate-300 hover:text-indigo-400 transition-colors">
                                    {tc('courses')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-300 hover:text-indigo-400 transition-colors">
                                    {tc('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-400">
                    <p className="inline-flex flex-wrap items-center justify-center gap-2">
                        <span>(c) {year}</span>
                        <span className="font-semibold tracking-wide text-slate-300">T.MANAL LMS</span>
                        <span>{t('rights')}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
