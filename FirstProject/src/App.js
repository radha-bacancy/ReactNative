import { StackNavigator } from "react-navigation";
import ChatConnect from './Container/ChatConnect';
import Chat from './Container/Chat';

const App = StackNavigator({
  Home: {
    screen: ChatConnect,
    navigationOptions: {
      title: 'My Chats',
    }
  },
  Chat: {
  	screen: Chat
  }
});

export default App;