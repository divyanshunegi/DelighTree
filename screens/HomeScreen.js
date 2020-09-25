/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
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
const Wrapper = styled.View`
  width: 90%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const InputField = styled.TextInput`
  width: ${width * 0.9}px;
  font-size: 12px;
  padding: 5px 10px;
  border-width: 1px;
  border-color: #dadee8;
  border-radius: 5px;
  margin: 10px;
  color: black;
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
const AsisigneeImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: gray;
  border-color: white;
  border-width: 1px;
`;
const HomeScreen = (props) => {
  const [documentFileName, setDocumentFileName] = React.useState(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [descriptionText, setDescriptionText] = React.useState('');
  const [taskTitle, setTaskTitle] = React.useState('');
  const [markedDates, setMarkedDates] = React.useState({});
  const [assignee, setAssignee] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [showCalendarView, setShowCalendarView] = React.useState(false);
  const CalendarRef = React.useRef(null);
  const DescRef = React.useRef(null);
  React.useEffect(() => {
    if (
      descriptionText === '' ||
      taskTitle === '' ||
      assignee.length < 1 ||
      selectedDate === ''
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [descriptionText, taskTitle, assignee, selectedDate]);
  const calendarDateView = (date) => {
    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = date.getFullYear();
    return `${months[date.getMonth()] + ' ' + year}`;
  };
  const assigneeHandler = (info) => {
    const data = [...assignee, ...info];
    setAssignee(data);
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setDocumentFileName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <SectionTitle>Summary</SectionTitle>
      <InputField placeholder="Title" onChangeText={(e) => setTaskTitle(e)} />
      <TouchableOpacity
        onPress={() => setShowCalendarView(true)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <>
          <InputField
            value={selectedDate.split('-').reverse().join('.')}
            placeholder="Due Date"
            editable={false}
          />
          <Icon
            name="calendar-outline"
            size={20}
            color="gray"
            style={{position: 'absolute', alignSelf: 'center', right: 20}}
          />
        </>
      </TouchableOpacity>
      <Wrapper>
        <SectionTitle style={{width: 'auto'}}>Employee</SectionTitle>
        {assignee.length < 1 && (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Assign Employee', {
                handleAssignee: assigneeHandler,
              })
            }
            style={{width: '20%'}}>
            <Wrapper>
              <Icon name="add-outline" size={20} color="#854dff" />
              <Text style={{color: '#854dff'}}>Assign</Text>
            </Wrapper>
          </TouchableOpacity>
        )}
      </Wrapper>
      <Wrapper style={{justifyContent: 'flex-start'}}>
        {assignee.map((user, i) => {
          return (
            <AsisigneeImage
              key={user.login.uuid}
              source={{uri: `${user.picture.thumbnail}`}}
              style={{marginLeft: i !== 0 ? -10 : 0}}
            />
          );
        })}
        {assignee.length > 0 && (
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('Assign Employee', {
                handleAssignee: assigneeHandler,
              })
            }>
            <View style={styles.assigneCount}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 0,
                }}>
                +
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </Wrapper>
      <SectionTitle>Description</SectionTitle>
      <View>
        <InputField
          placeholder="Text"
          style={{
            textAlign: 'left',
            padding: 0,
            margin: 0,
            maxHeight: 120,
          }}
          value={descriptionText}
          ref={DescRef}
          maxLength={500}
          multiline
          numberOfLines={7}
          onChangeText={(e) => {
            setDescriptionText(e);
          }}
        />
        <Text style={styles.inputLimit}>{descriptionText.length}/500</Text>
      </View>
      <Wrapper>
        <SectionTitle style={{width: 'auto'}}>Attachment</SectionTitle>
        <TouchableOpacity
          onPress={() => {
            pickDocument();
          }}
          style={{width: '20%'}}>
          <Wrapper style={{width: '100%'}}>
            <Icon name="attach-outline" size={20} color="#854dff" />
            <Text style={{color: '#854dff'}}>Add</Text>
          </Wrapper>
        </TouchableOpacity>
      </Wrapper>
      <AttachmentView
        documentFileName={documentFileName}
        removeDoc={() => {
          setDocumentFileName(null);
        }}
      />
      <TouchableNativeFeedback
        disabled={buttonDisabled}
        onPress={() =>
          props.navigation.navigate('Task View Screen', {
            taskTitle: taskTitle,
            assignee: assignee,
            description: descriptionText,
            docName: documentFileName,
            date: selectedDate,
          })
        }>
        <CreateTaskButton style={{opacity: buttonDisabled ? 0.5 : 1}}>
          <Text style={{color: 'white'}}>Create Task</Text>
        </CreateTaskButton>
      </TouchableNativeFeedback>
      {showCalendarView && (
        <CalendarContainer>
          <TouchableWithoutFeedback
            onPress={() => setShowCalendarView(false)}
            style={{width, height: height * 0.2}}
          />
          <View style={{height: height * 0.7, backgroundColor: 'white'}}>
            <Calendar
              style={{
                height: 350,
                width,
                padding: 0,
              }}
              onDayPress={(day) => {
                console.log('selected day', day);
                const obj = {};
                obj[`${day.dateString}`] = {
                  customStyles: {
                    container: {
                      backgroundColor: '#854dff',
                      borderRadius: 5,
                    },
                    text: {
                      color: 'white',
                    },
                  },
                };
                setMarkedDates(obj);
              }}
              onDayLongPress={(day) => {
                console.log('selected day', day);
              }}
              markingType={'custom'}
              markedDates={markedDates}
              ref={CalendarRef}
              hideArrows={true}
              enableSwipeMonths={true}
              renderHeader={(date) => (
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingVertical: 20,
                    }}>
                    Time from
                  </Text>
                  <View style={styles.calendarHeader}>
                    <Text
                      style={{
                        margin: 0,
                        alignSelf: 'center',
                      }}>
                      {calendarDateView(date)}
                    </Text>
                    <View style={styles.calendarArrowContainer}>
                      <TouchableOpacity
                        onPress={() => CalendarRef.current.onSwipeRight()}>
                        <Icon
                          name="chevron-back-outline"
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => CalendarRef.current.onSwipeLeft()}>
                        <Icon
                          name="chevron-forward-outline"
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
            {console.log(markedDates)}
            <TouchableNativeFeedback
              onPress={() => {
                var keys = Object.keys(markedDates);
                setSelectedDate(keys[0]);
                setShowCalendarView(false);
              }}>
              <CreateTaskButton>
                <Text style={{color: 'white'}}>Apply</Text>
              </CreateTaskButton>
            </TouchableNativeFeedback>
          </View>
        </CalendarContainer>
      )}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  calendarArrowContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
  inputLimit: {
    position: 'absolute',
    color: 'gray',
    right: 20,
    bottom: 20,
    fontSize: 10,
  },
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
});
export default HomeScreen;
