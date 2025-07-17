import { ReactNode } from "react";

export function MainContent({children}:{children : ReactNode}){
    return (
        <div className="w-full mt-10 px-5 ">
            <div className="w-max-[80%]">
                    {children}
            </div>
           
        </div>
    )
}