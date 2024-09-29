import React from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";
const ModalDelete = ({ isModalOpen, onModalOpenChange, deleteEventHandler, title, text, idDelete  , showId=true}) => {
    return (
        <>

            <Modal
                isOpen={isModalOpen}
                onOpenChange={onModalOpenChange}
                className="vazirMedium exitPlaceIcon"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className="mt-1 vazirMedium font-normal">حذف {title}</div>
                            </ModalHeader>
                            <ModalBody>
                                <p className='!-mt-2'>آیا از حذف {text} {showId && idDelete} مطمئن هستید؟</p>
                            </ModalBody>
                            <ModalFooter className='!pt-4'>
                                <Button
                                    color="primary"
                                    variant="light"
                                    onClick={onClose}
                                >
                                    انصراف
                                </Button>
                                <Button
                                    className='bg-red-500 text-white'
                                    onClick={() => {
                                        deleteEventHandler();
                                        onClose();
                                    }}
                                >
                                    حذف
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal></>
    )
}

export default ModalDelete
