export default function CardContainer({children}){
    return (
        <><div className=" mt-10 px-4 pt-4 grid grid-cols-2 md:grid-cols-3 gap-12 border rounded-2xl h-auto bg-blue-950 pb-7">
     {children}
        </div>
        
        </>
    )
}