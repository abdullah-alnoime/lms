import { BarChart3 } from "lucide-react";

const LessonProgress = ({ progress, hasExercises }) => {
    const {
        quizProgress = 0,
        exercisesProgress = 0,
        overallProgress = 0
    } = progress || {};

    return (
        <div
            className="bg-slate-50 dark:bg-neutral-700 rounded-lg shadow-sm p-4 mb-4"
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-600 dark:text-neutral-100 flex items-center gap-2">
                    <BarChart3
                        size={18}
                        className="text-blue-600 dark:text-blue-200"
                    />
                    تقدمك في هذا الدرس
                </h3>
                <span className="text-sm font-medium text-gray-500 dark:text-neutral-100">
                    {overallProgress}%
                </span>
            </div>

            <div className="space-y-3">
                <ProgressBar
                    label="الاختبار"
                    value={quizProgress}
                    color="bg-blue-600 dark:bg-blue-200"
                />
                {hasExercises && (
                    <ProgressBar
                        label="التمارين"
                        value={exercisesProgress}
                        color="bg-green-500 dark:bg-green-200"
                    />
                )}
                <ProgressBar
                    label="التقدم الكلي"
                    value={overallProgress}
                    color="bg-purple-500 dark:bg-purple-200"
                />
            </div>
        </div>
    );
};

const ProgressBar = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-neutral-100">{label}</span>
            <span className="font-medium dark:text-neutral-100">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div
                style={{ width: `${value}%` }}
                className={`h-2 rounded-full transition-colors duration-300 ${color}`}
            />
        </div>
    </div>
);

export default LessonProgress;