import React, { Component } from 'react';
import { Button, TextInput, ActivityIndicator, AsyncStorage } from 'react-native'

class EditInfoScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <Button
                title="Save"
                onPress={params.handleSave ? params.handleSave : () => null}
            />
        );
        if (params.isSaving) {
            headerRight = <ActivityIndicator />;
        }
        return { headerRight };
    };

    state = {
        nickname: ''
    }

    _handleSave = () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isSaving: true });
    }

    componentDidMount() {
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleSave: this._handleSave });
    }

    render() {
        return (
            <TextInput
                onChangeText={(nickname) => this.setState({ nickname })}
                placeholder={'Nickname'}
                value={this.state.nickname}
            />
        );
    }
}

export default EditInfoScreen; 