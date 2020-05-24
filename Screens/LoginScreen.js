import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'
import { Button,TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {

    const {signIn} = React.useContext(AuthContext)
    
    const handleSubmit = (values)=>{
        //console.log(values.mobile_no)
        signIn(values.mobile_no,values.password)
    }

    return (
        <View>
        <View style={styles.container}>
            <Formik
                initialValues={{ mobile_no: '' ,password:''}}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('mobile_no')}
                            onBlur={handleBlur('mobile_no')}
                            value={values.mobile_no}
                            label="Mobile No"
                            keyboardType="phone-pad"
                            mode="outlined"
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            label="Password"
                            secureTextEntry={true}
                            mode="outlined"
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                        <Button style={styles.btnSignIn} icon="login" mode="contained" onPress={handleSubmit}>
                            Sign In
                        </Button>
                    </View>
                )}
            </Formik>
            {/* <Button
                title="Register User"
                onPress={() => navigation.navigate('Register')}
            /> */}
            <Button style={styles.btnRegister} icon="account-plus-outline" mode="contained" onPress={() => navigation.navigate('Register')}>
                Sign Up
            </Button>
        </View>
        </View>
    );

   
}

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal:15,
        marginTop:6,
       },
       scrollView: {
       
       },
       textInputTop:{
        marginHorizontal:15,
        marginTop:15,
       },
       btnSignIn:{
         marginHorizontal:80,
         paddingVertical:6,
         marginTop:20,
         marginVertical:5
       },
       btnRegister:{
        marginHorizontal:80,
         paddingVertical:6,
         marginVertical:10
       },
       container:{
            marginVertical:70
       }
  });

