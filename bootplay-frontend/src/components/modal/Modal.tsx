import React from "react";

interface Props {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function Modal({isOpen, children} : Props){

    if (isOpen){
        return (
            <>
                <div className="flex fixed inset-x-0 inset-y-0 bg-zinc-900/[.006] z-[5]">
                    <div className="flex fixed top-[150px] left-[300px] px-[400px] py-[200px] bg-white rounded-3xl">
                        {children}
                    </div>
                </div>
            </>
        )
    }
}