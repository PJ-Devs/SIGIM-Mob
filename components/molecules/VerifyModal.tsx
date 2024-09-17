import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export default function VerifyModal () {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View className="flex flex-1 justify-center items-center mt">
          <View className="m-5 bg-white rounded-2xl p-9 items-center shadow-lg">
            <Text style={styles.modalText}>Estás seguro de que deseas eliminar este item?</Text>
            <View className='flex-row gap-5'>
            <Pressable
            className="rounded-2xl p-2 bg-primary"
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Aceptar</Text>
            </Pressable>
            <Pressable
            className="rounded-2xl p-2 bg-primary"
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
         className="rounded-2xl p-2 bg-primary"
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

