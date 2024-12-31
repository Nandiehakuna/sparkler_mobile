import React, { useState } from 'react';
import Modal from '../Modal';

function profile() {
        const [modalVisible , setModalVisible] =useState(false)
        return (
                <Modal visible={modalVisible} onClose={()=>setModalVisible(false)}>



                </Modal>
               
        );
}

export default profile;