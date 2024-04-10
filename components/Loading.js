import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Loading = () => {
    return ( 
        <>
            <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
                <AiOutlineLoading3Quarters />
            </div>
        </>
     );
}
 
export default Loading;