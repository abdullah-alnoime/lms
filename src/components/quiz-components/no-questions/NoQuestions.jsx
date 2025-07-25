import { Link } from "react-router-dom";
import { Info } from "lucide-react";

const NoQuestions = ({ lessonId }) => {
    return (
        <div
            className="w-full max-w-4xl mx-auto bg-red-50 dark:bg-neutral-700 border border-red-200 dark:border-none p-5 rounded-md text-center"
        >
            <Info className="h-12 w-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
            <h2 className="text-3xl text-red-600 font-bold mb-3 dark:text-red-400">
                لا يوجد أسئلة
            </h2>
            <p className="text-neutral-500 dark:text-neutral-200">
                لم يتم إضافة أسئلة لهذا الدرس.
            </p>
            <div>
                <Link
                    to={`/lessons/${lessonId}`}
                    className="mt-6 bg-white dark:bg-neutral-700 dark:text-black inline-block px-4 py-2 border border-blue-600 dark:border-blue-200 text-blue-600 dark:text-blue-200 font-medium rounded-md w-full max-w-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-black transition duration-200"
                >
                    الرجوع للدرس
                </Link>
            </div>
        </div>
    );
};

export default NoQuestions;