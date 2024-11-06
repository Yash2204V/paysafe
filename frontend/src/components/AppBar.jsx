// eslint-disable-next-line react/prop-types
export const Appbar = ({label}) => {
    return <div className="shadow-lg h-16 rounded-full flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex flex-col justify-center h-full ml-4 text-xl font-semibold">
            PayTM App
        </div>
        <div className="flex items-center">
            <div className="flex flex-col justify-center h-full mr-4 text-lg">
                Hello, {label}
            </div>
            <div className="rounded-full h-12 w-12 bg-black text-white flex justify-center items-center mt-1 mr-2 shadow-md">
                <div className="text-xl">
                    {label[0]}
                </div>
            </div>
        </div>
    </div>
}