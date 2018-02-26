import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const simpleForm = (props) => {
    const { handleSubmit, reset } = props;
    return(
        <View>

            <View style={{flexDirection: 'row'}}>

                <View>
                    <Text>First Name</Text>
                    <Field name='firstName' component='input' type='text' placeholder='First Name'/>
                </View>

                <View>
                    <Text>Last Name</Text>
                    <Field name='lastName' component='input' type='text' placeholder='Last Name'/>
                </View>

            </View>

            <View>
                <Text>Email</Text>
                <Field name='email' component='input' type='email' placeholder='email'/>
            </View>

            <View>
                <Text>Gender:</Text>
                <Field name='sex' component='input' type='radio' value='male'/>{' Male'}
                <Field name='sex' component='input' type='radio' value='female'/>{' Female'}
            </View>

            <View>
                <Field name='favColor' component='select'>
                    <option/>
                    <option value="ff0000">Red</option>
                    <option value="00ff00">Green</option>
                    <option value="0000ff">Blue</option>
                </Field>
            </View>

            <View>
                <Text>Employed</Text>
                <Field name="employed" id="employed" component="input" type="checkbox"/>
            </View>

            <View>
                <Text>Notes</Text>
                <Field name="notes" component="textarea" />
            </View>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
                <TouchableOpacity onPress={reset}><Text>Reset</Text></TouchableOpacity>
            </View>

        </View>
    );
};

export default reduxForm({form: 'simpleForm'})(simpleForm)