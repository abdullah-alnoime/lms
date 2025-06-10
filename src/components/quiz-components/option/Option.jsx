import { Markdown } from "../../markdown";

const Option = ({
    option,
    index,
    selectedAnswer,
    showFeedback,
    isCorrect,
    handleAnswer
}) => {
    let baseClasses =
        "block w-full rounded border transition-all duration-150 my-2 px-4 text-center";
    let feedbackClass = "";
    if (showFeedback) {
        if (isCorrect) {
            feedbackClass =
                "bg-green-100 border-green-600 text-green-800 dark:text-neutral-500";
        } else if (index === selectedAnswer) {
            feedbackClass =
                "bg-red-100 border-red-500 text-red-800 dark:text-neutral-500";
        } else {
            feedbackClass =
                "bg-gray-100 dark:bg-neutral-500 border-gray-300 text-gray-500 dark:text-neutral-100";
        }
    } else if (selectedAnswer === index) {
        feedbackClass = "bg-blue-100 border-blue-500 text-blue-800";
    } else {
        feedbackClass =
            "bg-white border-gray-300 dark:bg-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-600 hover:border-blue-300";
    }

    const handleClick = () => {
        if (!showFeedback && selectedAnswer === null) {
            handleAnswer(index);
        }
    };

    return (
        <button
            className={`${baseClasses} ${feedbackClass}`}
            onClick={handleClick}
            disabled={showFeedback || selectedAnswer !== null}
        >
            <Markdown content={option} />
        </button>
    );
};

export default Option;