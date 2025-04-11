import { Menu, User } from "lucide-react";

export default function AppNavbar() {
    return (
        <>
            <div className="py-2 px-3 flex justify-between bg-white border-l-2 sticky top-0 left-0">
                <div className="p-3 hover:bg-gray-200 rounded-lg">
                    <Menu className="cursor-pointer w-5 h-5" />
                </div>
                <div className="flex-auto flex justify-between px-1">
                    <div></div>
                    <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </>
    )
}