
import StreakCard from "./ui/StreakCard"
import { GraduationCap } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="flex justify-center h-screen">

            <div className="grid grid-cols-2">
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="text-amber-400" size={28} />
                        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
                    </div>
                    <StreakCard />
                </div>
                <div>
                    
                </div>
            </div>

        </div>
    )
}