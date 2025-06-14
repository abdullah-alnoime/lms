import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Markdown } from "../markdown";
import { Info, ArrowUp, ArrowRight, ChevronLeft } from "lucide-react";
import { lessons } from "../../data/lessons";
import { useProgress } from "../../hooks/useProgress";
import { LessonProgress } from "../lesson-progress";
import { NoLessons } from "../no-lessons";

const Lesson = () => {
    const { lessonId } = useParams();
    const parsedLessonId = parseInt(lessonId);
    const lesson = lessons.find(lesson => lesson.id === parsedLessonId);
    const [show, setShow] = useState(false);
    const {
        isLessonUnlocked,
        getLessonStatus,
        getLessonProgressStats,
        QUIZ_PASS_THRESHOLD,
        loading
    } = useProgress();

    const isUnlocked = isLessonUnlocked(parsedLessonId);
    const lessonStatus = getLessonStatus(parsedLessonId);
    const progressStats = getLessonProgressStats(parsedLessonId);

    useEffect(() => {
        handleScroll();
        const visibility = () => {
            if (window.scrollY > 400) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        visibility();
        window.addEventListener("scroll", visibility);
        return () => {
            window.removeEventListener("scroll", visibility);
        };
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        handleScroll();
    }, [lessonId]);

    if (!lesson) {
        return <NoLessons />;
    }

    if (!isUnlocked && !loading && parsedLessonId !== 1) {
        return <Navigate to="/lessons" replace />;
    }
    return (
        <div className="w-full max-w-4xl mx-auto self-start lesson">
            <div className="mb-4">
                <Link
                    to="/lessons"
                    className="w-fit flex items-center gap-2 text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                    <ArrowRight className="h-5 w-5" />
                    <span>الرجوع للدروس</span>
                </Link>
            </div>
            <LessonProgress
                progress={progressStats}
                hasExercises={lesson.hasExercises}
            />
            <h1
                className="text-3xl text-blue-600 font-bold my-4"
            >
                {lesson.title}
            </h1>

            <div>
                <Markdown content={lesson.content} />
            </div>

            <div
                className="flex gap-2 items-center"
            >
                <Link
                    to="quiz"
                    className="px-2 py-2 my-4 border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-black dark:hover:bg-blue-300 hover:text-white dark:hover:text-black dark:border-blue-200 dark:hover:border-blue-300 font-medium rounded-md transition-colors"
                >
                    اختبر نفسك
                    {lessonStatus.quizCompleted && (
                        <span className="mr-2 text-sm bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-200 px-2 py-0.5 rounded-full">
                            {lessonStatus.quizScore}%
                        </span>
                    )}
                </Link>
                {lesson.hasExercises && lessonStatus.quizScore > QUIZ_PASS_THRESHOLD && lessonStatus.quizCompleted && (
                    <Link
                        to="exercises"
                        className="p-2 border border-blue-200 bg-white text-blue-600 dark:text-neutral-100 dark:bg-neutral-800 hover:text-white dark:hover:text-black dark:hover:border-blue-300 hover:bg-blue-700 dark:hover:bg-blue-300 font-medium rounded-md transition-colors"
                    >
                        التمارين
                    </Link>
                )}
            </div>

            {lessonStatus.completed && parsedLessonId < lessons.length && (
                <div
                    className="mt-4 p-3 bg-green-50 dark:bg-neutral-700 rounded-md"
                >
                    <p className="text-green-700 dark:text-green-200 font-medium">
                        لقد أكملت هذا الدرس بنجاح! يمكنك الانتقال إلى الدرس التالي.
                    </p>
                    <Link
                        to={`/lessons/${parsedLessonId + 1}`}
                        className="w-fit mt-3 p-2 font-bold rounded-md flex gap-2 items-center ms-auto text-white bg-green-700 dark:text-neutral-950 dark:bg-green-300 hover:bg-green-800 dark:hover:bg-green-200"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                </div>
            )}

            {show && (
                <button
                    type="button"
                    onClick={handleScroll}
                    className="fixed bottom-6 left-6 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 p-3 rounded-full shadow-lg transition-all duration-300"
                >
                    <ArrowUp size={24} className="dark:text-white" />
                </button>
            )}
        </div>
    );
};

export default Lesson;