import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

const Wrapper = styled.View`
  width: 90%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const AttachmentView = (props) => {
  if (props.documentFileName == null) {
    return null;
  }
  return (
    <View style={styles.attachmentContainer}>
      <Wrapper style={{width: '80%', justifyContent: 'flex-start'}}>
        <Icon name="attach-outline" size={20} color="#000000" />
        <Text style={{color: '#000000', marginStart: 20}}>
          {props.documentFileName}
        </Text>
      </Wrapper>
      {props.removeDoc && (
        <TouchableOpacity
          onPress={() => {
            props.removeDoc();
          }}>
          <Icon name="trash" size={20} color="#E44836" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  attachmentContainer: {
    width: '90%',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#DADEE8',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default AttachmentView;
