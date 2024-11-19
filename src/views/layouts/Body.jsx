import Navbar from "./Navbar";

export default function Body({children}){
    return (
        <>
            <Navbar />
            <div className=" bg-base-200 min-h-screen bg-cover w-full  xl:px-60 py-6 lg:px-40 md:px-32 sm:px-24">
                {children}
            </div>
        </>
    )
}