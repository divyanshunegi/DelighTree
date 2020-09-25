import * as React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');
const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  height: ${height}px;
`;
const Header = styled.View`
  width: ${width}px;
  height: 70px;
  background-color: #854dff;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
`;
const Wrapper = styled.View`
  width: 90%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  align-self: center;
`;
const InputField = styled.TextInput`
  width: ${width * 0.9}px;
  font-size: 12px;
  padding: 5px 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 10px 0px;
`;
const UserInfoContainer = styled.View`
  width: 90%;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
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
const AssignEmployee = (props) => {
  const [dummyUsers, setDummyUsers] = React.useState([]);
  const [selectedAssignees, setSelectedAssignees] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const randomUsers = await fetch('https://randomuser.me/api/?results=15');
    const res = await randomUsers.json();
    console.info(res.results);
    setDummyUsers(res.results);
  };
  const assigneeSelectHandler = (item) => {
    if (selectedAssignees.includes(item)) {
      const updatedData = selectedAssignees.filter(
        (e) => e.login.uuid !== item.login.uuid,
      );
      setSelectedAssignees(updatedData);
      return;
    }
    const data = [...selectedAssignees, item];
    setSelectedAssignees(data);
  };
  return (
    <Container>
      <Header>
        <HeaderTitle>Assign employee</HeaderTitle>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: 10}}>
          <Icon name="chevron-back-outline" size={20} color="white" />
        </TouchableOpacity>
      </Header>
      <Wrapper>
        <InputField placeholder="Search members" />
        <Icon
          name="search-outline"
          size={20}
          color="gray"
          style={{position: 'absolute', alignSelf: 'center', right: 10}}
        />
      </Wrapper>
      <View style={{height: height * 0.65}}>
        <ScrollView
          scrollEnabled
          contentContainerStyle={{
            width: width * 0.9,
            flexGrow: 1,
          }}>
          {dummyUsers.map((user) => {
            return (
              <TouchableOpacity
                onPress={() => assigneeSelectHandler(user)}
                key={user.login.uuid}>
                <UserInfoContainer>
                  <Image
                    source={{uri: `${user.picture.thumbnail}`}}
                    resizeMode="cover"
                    style={{height: 40, width: 40, borderRadius: 20}}
                  />
                  <Text style={{marginLeft: 10}}>
                    {user.name.first} {user.name.last}
                  </Text>
                  {selectedAssignees.includes(user) && (
                    <View style={styles.checkmarkContainer}>
                      <Icon name="checkmark" size={15} color="white" />
                    </View>
                  )}
                </UserInfoContainer>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          props.route.params.handleAssignee(selectedAssignees);
          props.navigation.goBack();
        }}>
        <CreateTaskButton>
          <Text style={{color: 'white'}}>Assign</Text>
        </CreateTaskButton>
      </TouchableNativeFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  checkmarkContainer: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#854dff',
  },
});

export default AssignEmployee;
