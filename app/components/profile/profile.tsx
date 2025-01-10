import React, { useState } from 'react';
import Modal from '../Modal';
import { StyleSheet } from 'react-native';

function profile() {
        const [modalVisible , setModalVisible] =useState(false)
        return (
                <Modal style={styles.modal} visible={modalVisible} onClose={()=>setModalVisible(false)}>

                    

                </Modal>
               
        );
}

const styles = StyleSheet.create({
        modal:{
                flexDirection:'column'
        }
});

export default profile;