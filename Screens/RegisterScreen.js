import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,ScrollView } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'

export default function RegisterScreen({ navigation }) {

  const {signUp} = React.useContext(AuthContext)
       
  const handleSubmit = (values)=>{
      //console.log(values.mobile_no)
      signUp(values)
  }
  return (
    <ScrollView style={styles.scrollView}>
    <View style={{ /* flex: 1, alignItems: 'center', justifyContent: 'center'  */}}>
      
      <Formik
        initialValues={{ password: '', first_name: '',last_name:'',mobile_no: '', nic_no: '',nearest_eco_center:'',vehicle_color: '', vehicle_type: '',maximam_weight_can_carry:'',vehicle_plate_no:''}}
        onSubmit={values =>handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('first_name')}
              onBlur={handleBlur('first_name')}
              value={values.first_name}
              placeholder="First Name"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
              value={values.last_name}
              placeholder="Last Name"
            />
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
            {/* <TextInput
              style={styles.textInput}
              onChangeText={handleChange('password2')}
              onBlur={handleBlur('password2')}
              value={values.password2}
              placeholder="ReEnter Password"
              secureTextEntry={true} 
            /> */}
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('nic_no')}
              onBlur={handleBlur('nic_no')}
              value={values.nic_no}
              placeholder="NIC NO"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('nearest_eco_center')}
              onBlur={handleBlur('nearest_eco_center')}
              value={values.nearest_eco_center}
              placeholder="Nearest Eco Center"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('vehicle_color')}
              onBlur={handleBlur('vehicle_color')}
              value={values.vehicle_color}
              placeholder="Vehicle Color"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('vehicle_type')}
              onBlur={handleBlur('vehicle_type')}
              value={values.vehicle_type}
              placeholder="Vehicle Type"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('maximam_weight_can_carry')}
              onBlur={handleBlur('maximam_weight_can_carry')}
              value={values.maximam_weight_can_carry}
              placeholder="Maximum Weight Can Carry"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('vehicle_plate_no')}
              onBlur={handleBlur('vehicle_plate_no')}
              value={values.vehicle_plate_no}
              placeholder="Vehicle Plate No"
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
     
    </View>
    </ScrollView>
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
  scrollView: {
    
    //marginHorizontal: 20,
  },
  
});
