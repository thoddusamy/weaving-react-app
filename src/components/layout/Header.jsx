export default function Header() {

    return (

        <header className="h-20 bg-white border-b px-8 flex items-center justify-between">

            <h2 className="text-xl font-bold">
                Weaving Department
            </h2>

            <div className="flex items-center gap-2">

                <div className="w-2 h-2 rounded-full bg-red-500"></div>

                <span className="text-xs">
                    Offline
                </span>

            </div>

        </header>

    )

}