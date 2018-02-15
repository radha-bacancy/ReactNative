import { TabNavigator } from "react-navigation";
import Recent from './Recent';
import All from './All';
import EditInfoScreen from './EditInfoScreen'

const ChatConnect = TabNavigator({
  Recent: { screen: Recent },
  All: { screen: All },
  EditInfo: { screen: EditInfoScreen },
});

export default ChatConnect;