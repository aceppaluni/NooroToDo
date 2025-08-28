export default function Header() {
    return (
        <div className="bg-black w-full p-5">
            <header className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-extrabold flex flex-wrap gap-1 justify-center">
                    <span className="text-sky-500 mt-2"> Todo</span>
                    <span className="text-indigo-400 mt-2">App</span>
                </h1>
            </header>
        </div>
    )
}