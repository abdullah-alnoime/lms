import { TestCaseOutput } from "../test-case-output";

export const TestCases = ({ testCases, results, isRunning }) => {
    if (!testCases || testCases.length === 0) {
        return null;
    }
    return (
        <div className="rounded-md p-4 dark:bg-neutral-700 shadow">
            <h3 className="text-lg font-bold mb-4 dark:text-neutral-100">
                حالات الاختبار
            </h3>
            {testCases.map((testCase, index) => {
                const testResult = results && results[index];
                const isTestRunning = isRunning && !testResult;
                return (
                    <div
                        key={`test-case-${index}`}
                        className="mb-6 border-b pb-6 last:border-b-0 last:pb-0"
                    >
                        <h4 className="font-bold text-md mb-2 dark:text-neutral-100">
                            الاختبار {testCases.length > 1 && index + 1}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <h3 className="font-semibold mb-2 dark:text-neutral-100">
                                    المدخلات:
                                </h3>
                                <pre
                                    className="bg-neutral-900 text-sm text-white p-3 rounded shadow-md overflow-x-auto whitespace-pre-wrap"
                                    dir="ltr"
                                >
                                    {testCase.input || "(no inputs)"}
                                </pre>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 dark:text-neutral-100">
                                    الخرج المتوقع:
                                </h3>
                                <pre
                                    className="bg-neutral-900 text-sm text-white p-3 rounded shadow-md overflow-x-auto whitespace-pre-wrap"
                                    dir="ltr"
                                >
                                    {testCase.expectedOutput ||
                                        "(no expected outputs)"}
                                </pre>
                            </div>
                        </div>
                        {isTestRunning ? (
                            <TestCaseOutput status="running" />
                        ) : testResult ? (
                            <TestCaseOutput
                                status={testResult.status}
                                output={testResult.output}
                                error={testResult.error}
                            />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default TestCases;