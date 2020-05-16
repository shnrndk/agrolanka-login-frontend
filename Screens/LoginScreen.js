import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import { Formik } from 'formik';

export default function LoginScreen({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Formik
                initialValues={{ mobile_no: '' ,password:''}}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('mobile_no')}
                            onBlur={handleBlur('mobile_no')}
                            value={values.mobile_no}
                            placeholder="Mobile No"
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
            <Button
                title="Register User"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );

   
}

const styles = StyleSheet.create({
    textInput: {
     marginBottom:10,
     paddingHorizontal:8,
     paddingVertical:6,
     borderBottomWidth:1,
     borderBottomColor:'#ddd'
    },
    
  });

