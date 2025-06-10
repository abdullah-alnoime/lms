import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Markdown } from "../../markdown";
import { Option } from "../option";
import { FeedbackMsg } from "../feedback-msg";

const Question = ({
    currentQuestion,
    totalQuestions,
    timeRemaining,
    question,
    options,
    selectedAnswer,
    showFeedback,
    isCorrect,
    correctAnswer,
    handleAnswer,
    lessonId
}) => {
    return (
        <div
            className="w-full max-w-4xl mx-auto"
        >
            <div className="flex justify-between items-center mb-4">
                <Link
                    to={`/lessons/${lessonId}`}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                    <ArrowRight className="h-5 w-5" />
                    <span>الرجوع للدرس</span>
                </Link>
                <div className="text-sm bg-gray-100 dark:bg-neutral-700 dark:text-neutral-100 px-3 py-1 rounded-full">
                    تمرين {currentQuestion + 1} من {totalQuestions}
                </div>
            </div>

            <div className="flex justify-between text-sm mb-4 dark:text-neutral-100">
                <span>الوقت المتبقي</span>
                <span className={`text ${timeRemaining < 10 ? "text-red-600 font-bold" : ""}`}>
                    {timeRemaining} ثانية
                </span>
            </div>

            <div>
                <Markdown content={question.text} />
            </div>

            <div className="mb-2">
                {options.map((option, index) => (
                    <Option
                        key={index}
                        option={option}
                        index={index}
                        selectedAnswer={selectedAnswer}
                        showFeedback={showFeedback}
                        isCorrect={index === correctAnswer}
                        handleAnswer={handleAnswer}
                    />
                ))}
            </div>
                {showFeedback && (
                    <div>
                        <FeedbackMsg isCorrect={isCorrect} />
                    </div>
                )}
        </div>
    );
};

export default Question;