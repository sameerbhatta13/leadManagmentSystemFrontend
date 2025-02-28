import React, { useEffect, useRef } from 'react'

const AddService = ({ setAddService }) => {

    const popupRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target))
                setAddService('')
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    return (
        <>
            <div className="fixed top-0 left-0  w-full h-full  bg-black/50 ">
                <div ref={popupRef} className="bg-white p-6 flex rounded-lg shadow-lg">
                    <h1>Add More Service</h1>
                </div>
            </div>

        </>
    )
}

export default AddService