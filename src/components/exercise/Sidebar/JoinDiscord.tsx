import Link from "next/link";
const JoinDiscord = () => (
  <div className="text-center">
    <h3 className="text-xl leading-loose mt-10 font-bold">Great Job!</h3>
    <p>Head back to the dashboard to start your next lesson.</p>
    <Link
      href="/dashboard"
      className="bg-indigo-600 py-2 px-4 mt-6 block w-fit mx-auto rounded-lg"
    >
      Back to Dashboard
    </Link>
  </div>
);

export default JoinDiscord;
