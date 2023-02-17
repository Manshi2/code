import React, { useState } from 'react'
import Modal from './modal'

const UserImages = ({images}) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)

    return (
    <>
        <p className="text-blue-500 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>View</p>
        <Modal
            modalOpen={showModal}
            setOpenModal={setShowModal}
        >
            <div className="min-w-[90vw] min-h-[90vh] bg-white relative">
                <span className="absolute right-4 top-4 text-xl font-bold cursor-pointer hover:text-red-500" onClick={() => setShowModal(() => false)} > X </span>
                <div className="h-[10%] flex space-x-3 px-2 lg:px-6 lg:pt-5 max-w-full overflow-auto">
                    {
                        images?.map((image, i) => <>
                            <img 
                                key={'Image ' + i}
                                src={image?.fileUrl} 
                                alt="User image" 
                                className={"w-28 object-contain cursor-pointer " + (selectedImage === i ? "border-2 border-red-500 p-2" : "")} 
                                onClick={() => setSelectedImage(() => i)} 
                            />
                        </>)
                    }
                </div>
                <div className="h-[90%] pt-5 flex justify-center items-center">
                    {images?.length > 0 ? 
                        <img src={images[selectedImage]?.fileUrl} alt="User Image" className="max-w-[80%]" />
                        : <h3 className="text-2xl">No Images Found</h3>
                    }
                </div>
            </div>
        </Modal>
    </>  
    )
}

export default UserImages