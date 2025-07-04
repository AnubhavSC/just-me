
import StreakCard from "./ui/StreakCard"
import { GraduationCap } from 'lucide-react';
import { Pomodoro } from "./Pomodoro";
import DailyQuote from "./ui/DailyQuote";

export default function Dashboard() {


    return (
        <div className=" flex justify-center h-screen">
            <div className="w-[86%]">
                <div className="mt-5 ">
                    <GraduationCap className="text-amber-400" size={28} />
                    <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
                </div>
                <div className="flex">
                    <div className="p-4">
                        <StreakCard />
                        <div className=" h-20">
                            <DailyQuote/>
                        </div>
                    </div>
                    <div className="">
                        <Pomodoro />
                    </div>
                </div>
            </div>

        </div>
    )
}