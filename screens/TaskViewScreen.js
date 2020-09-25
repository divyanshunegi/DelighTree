import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import AttachmentView from './component/AttachmentView';
const {width, height} = Dimensions.get('window');
const SectionTitle = styled.Text`
  font-weight: bold;
  color: black;
  text-align: left;
  width: 90%;
  margin: 10px 0px;
`;
const Description = styled.Text`
  text-align: left;
  width: 90%;
  margin: 10px 0px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 0.5px;
  line-height: 20px;
`;
const Wrapper = styled.View`
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const InputField = styled.TextInput`
  width: ${width * 0.9}px;
  font-size: 12px;
  padding: 5px 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 10px;
`;
const CreateTaskButton = styled.View`
  width: 80%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: #854dff;
  height: 40px;
  position: absolute;
  align-self: center;
  bottom: 20px;
`;
const CalendarContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0px;
  height: ${height}px;
  width: ${width}px;
  background-color: rgba(0, 0, 0, 0.3);
`;
const DateView = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0px;
`;
const AssigneeImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: gray;
  border-color: white;
  border-width: 1px;
`;
const TaskViewScreen = (props) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [showCalendarView, setShowCalendarView] = React.useState(false);
  const CalendarRef = React.useRef(null);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <SectionTitle>{props.route.params.taskTitle}</SectionTitle>
      <SectionTitle>Assignees</SectionTitle>
      <Wrapper>
        {props.route.params.assignee.map((user, i) => {
          if (i <= 2) {
            return (
              <AssigneeImage
                key={user.login.uuid}
                source={{uri: `${user.picture.thumbnail}`}}
                style={{marginLeft: i !== 0 ? -10 : 0}}
              />
            );
          }
        })}
        {props.route.params.assignee.length > 3 && (
          <View style={styles.assigneCount}>
            <Text style={{color: 'white'}}>
              +{props.route.params.assignee.length - 3}
            </Text>
          </View>
        )}
      </Wrapper>
      <DateView>
        <Icon
          name="calendar-outline"
          size={20}
          color="gray"
          // style={{ position: 'absolute', alignSelf: 'center', right: 20 }}
        />
        <Text style={styles.dateText}>
          {props.route.params.date.split('-').reverse().join('.')}
        </Text>
      </DateView>
      <SectionTitle>Description</SectionTitle>
      <Description>{props.route.params.description}</Description>
      <SectionTitle>Attachment</SectionTitle>
      <AttachmentView documentFileName={props.route.params.docName} />
      <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
        <CreateTaskButton style={{opacity: buttonDisabled ? 0.5 : 1}}>
          <Text style={{color: 'white'}}>Close Task</Text>
        </CreateTaskButton>
      </TouchableNativeFeedback>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  assigneCount: {
    marginLeft: -10,
    backgroundColor: '#854dff',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 10,
    color: 'gray',
  },
});
export default TaskViewScreen;
