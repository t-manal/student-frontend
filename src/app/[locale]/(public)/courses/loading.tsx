import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { CourseCardSkeleton } from '@/components/courses/course-card-skeleton';
import { Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Loading() {
    const t = await getTranslations('courses');

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 animate-fade-in">
            <Navbar />

            <main className="flex-1 py-12 pb-24 md:pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 animate-pulse">
                        <div className="h-10 w-64 rounded-xl bg-slate-200"></div>
                        <div className="mt-4 h-6 w-96 rounded-lg bg-slate-200"></div>
                    </div>

                    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 h-6 w-32 rounded-lg bg-slate-200 animate-pulse"></div>
                        <div className="flex flex-wrap gap-2 animate-pulse">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-10 w-24 rounded-full bg-slate-200"></div>
                            ))}
                        </div>
                    </section>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <CourseCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
