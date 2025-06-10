import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Code, ExternalLink, ChevronLeft } from "lucide-react";

const icons = [
                    {
                        icon: <Code size={24} className="text-blue-600 dark:text-blue-500" />,
                        title: "لغات برمجة متنوعة",
                        text: "تعلم العديد من لغات البرمجة المطلوبة في سوق العمل.",
                        bg: "bg-blue-50 dark:bg-neutral-700",
                        iconBg: "bg-blue-100"
                    },
                    {
                        icon: <BookOpen size={24} className="text-indigo-600 dark:text-indigo-500" />,
                        title: "محاضرات مكثفة",
                        text: "دروس مركزة تغطي المفاهيم الأساسية بطريقة عمليّة.",
                        bg: "bg-indigo-50 dark:bg-neutral-700",
                        iconBg: "bg-indigo-100"
                    },
                    {
                        icon: <ExternalLink size={24} className="text-purple-600 dark:text-purple-500" />,
                        title: "تدريب عملي",
                        text: "تمارين تطبيقية لترسيخ المفاهيم وبناء مشاريع حقيقية.",
                        bg: "bg-purple-50 dark:bg-neutral-700",
                        iconBg: "bg-purple-100"
                    }
                ];
const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden py-8">
            <div>
                <h1 className="text-4xl md:text-5xl text-blue-700 dark:text-blue-200 font-bold mb-4 leading-tight">
                    محاضرات مكثفة وتمارين عمليّة في لغات برمجية متعددة
                </h1>
            </div>
            <p
                className="text-md md:text-xl leading-relaxed text-gray-600 dark:text-neutral-100 mb-5 text-right"
            >
                مزيجٌ من المحاضرات المُحكمة والمنظمة والتدريبات العملية لتعزيز خبرة
                المتعلمين، مع تركيز مكثف على التطبيق العملي لضمان اكتساب مهارات قابلة للتنفيذ.
            </p>
            <div>
                <Link
                    to="/lessons"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 dark:hover:bg-blue-300 text-white dark:text-black font-medium rounded-md transition-colors duration-200"
                >
                    تصفح الدروس
                </Link>
            </div>
            <div
                className="grid md:grid-cols-3 gap-4 my-6"
            >
                {icons.map((item, i) => (
                    <div
                        key={i}
                        className={`${item.bg} rounded-xl p-6`}
                    >
                        <div className="flex gap-4 items-center mb-4">
                            <div className={`${item.iconBg} p-2 rounded-lg`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
                                {item.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-100">{item.text}</p>
                    </div>
                ))}
            </div>
            <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:to-indigo-500 p-8 text-white rounded-md"
            >
                <h2 className="text-2xl font-bold mb-4">ابدأ رحلة التعلم اليوم</h2>
                <p className="mb-6 opacity-90">
                    انضم الآن وانقل مهاراتك البرمجية إلى مستوى آخر حيث التميز والكفاءة.
                </p>
                <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 bg-white text-blue-700 font-medium rounded-md transition-colors duration-200 hover:bg-blue-50"
                >
                    <span>سجل الآن</span>
                    <ChevronLeft size={20} className="mr-2" />
                </Link>
            </div>
        </div>
    );
};

export default Home;