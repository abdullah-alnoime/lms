import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeBtn = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="w-fit mx-auto">
            <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-10 w-20 rounded-full p-1 transition-colors duration-300 ease-in-out
                    ${isDark ? "bg-gray-800 shadow-md shadow-gray-900/25" : "bg-white shadow-md shadow-gray-300/25"}
                    border-2 ${isDark ? "border-gray-700" : "border-gray-200"}
                `}
            >
                <div
                    className={`absolute inset-1 rounded-full transition-colors duration-300
                        ${isDark ? "bg-gray-700" : "bg-gray-100"}
                    `}
                />
                <div
                    className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full shadow-md
                        ${isDark ? "bg-gray-900 translate-x-0" : "bg-white -translate-x-10"}
                    `}
                >
                    <div>
                        {isDark ? (
                            <Moon className="w-4 h-4 text-blue-400" />
                        ) : (
                            <Sun className="w-4 h-4 text-yellow-500" />
                        )}
                    </div>
                </div>

                <Sun
                    className={`absolute left-2 w-3 h-3 transition-opacity duration-300 ${
                        isDark ? "text-gray-300 opacity-40" : "text-yellow-400 opacity-60"
                    }`}
                />
                <Moon
                    className={`absolute right-2 w-3 h-3 transition-opacity duration-300 ${
                        isDark ? "text-blue-400 opacity-60" : "text-gray-400 opacity-40"
                    }`}
                />
            </button>
        </div>
    );
};

export default ThemeBtn;