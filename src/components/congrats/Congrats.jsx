
const Congrats = () => {
  return (
    <div className="bg-green-100 dark:bg-neutral-700 text-center p-4 shadow-md rounded-lg grid gap-4">
      <h3 className="text-xl text-green-800 dark:text-green-300 font-bold">أحسنت، لقد اتممت جميع الدروس بما تحتويه من اختبارات وتمارين..</h3>
      <p className="text-gray-600 dark:text-neutral-200 px-2">انضم الآن إلى مجموعة الواتساب الخاصة بالطلاب المتميزين والمجتهدين أمثالك</p>
      <a className="w-full max-w-md bg-green-700 dark:bg-green-300 hover:bg-green-800 dark:hover:bg-green-400 transition-colors duration-200 text-white dark:text-black px-4 py-2 rounded-md shadow" href="https://chat.whatsapp.com/EYndwGUW5UM0LyM4zd1bpW">انضم من هنا</a>
    </div>
  );
};
export default Congrats;