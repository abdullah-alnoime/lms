import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Code, ExternalLink, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl text-blue-700 dark:text-blue-200 font-bold mb-4 leading-tight">
                    محاضرات مكثفة وتمارين عمليّة في لغات برمجية متعددة
                </h1>
            </motion.div>

            <motion.p
                className="text-md md:text-xl leading-relaxed text-gray-600 dark:text-neutral-100 mb-5 text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                مزيجٌ من المحاضرات المُحكمة والمنظمة والتدريبات العملية لتعزيز خبرة
                المتعلمين، مع تركيز مكثف على التطبيق العملي لضمان اكتساب مهارات قابلة للتنفيذ.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    to="/lessons"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-200 text-white dark:text-black font-medium rounded-md transition-colors duration-200"
                >
                    تصفح الدروس
                </Link>
            </motion.div>

            <motion.div
                className="grid md:grid-cols-3 gap-4 my-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {[
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
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className={`${item.bg} rounded-xl p-6`}
                        variants={cardVariants}
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
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:to-indigo-500 p-8 text-white rounded-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
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
            </motion.div>
        </div>
    );
};

export default Home;