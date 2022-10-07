import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import styles from './Styles';
import { Picker } from '@react-native-picker/picker';
import Radiobutton from './Components/Radiobutton';
import CalculateButton from './Components/CalculateButton';


export default function App() {
    const [fontsLoaded] = useFonts({
        Rubik: require('./assets/fonts/Rubik-Regular.ttf'),
        RubikBold: require('./assets/fonts/Rubik-Bold.ttf'),
    });


    const [gender, setGender] = useState(1);
    const [weight, setWeight] = useState(0);
    const [bottles, setBottles] = useState(1);
    const [hours, setHours] = useState(1);
    const [bloodAlcLevel, setBAL] = useState(0);
    const [invalidWeight, setInvalidWeight] = useState(false);

    const genderOptions = [
        {
            label: 'Male',
            value: 1
        },
        {
            label: 'Female',
            value: 2
        }
    ];
    const bottlesArray = [];
    const hoursArray = [];
    for (var i = 1; i <= 24; i++) {
        var p1, p2;
        bottlesArray.push({
            label: i.toString() + " Bottles" ,
            value: i
        })
        hoursArray.push({
            label: i.toString() + " Hours" ,
            value: i
        })
    }



    const checkWeight = (weight) => {
        var error = isNaN(+weight);
        error = !error && (weight < 1);
        setInvalidWeight(error);
        if (!error) setWeight(weight);
    }


    const calculateBAL = () => {
        if (weight == 0 || invalidWeight) {
            setBAL(0);
            return;
        }

        var grams = bottles * 0.33 * 8 * 4.5;
        var gramsLeft = grams - (hours * (weight / 10));

        var factor = gender == 1 ? 0.7 : 0.6;
        var bloodAlcLevel = gramsLeft / (weight * factor);
        if (bloodAlcLevel < 0) bloodAlcLevel = 0;
        setBAL(bloodAlcLevel);
    };


    if (!fontsLoaded) { return null; }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.heading}>Alcometer</Text>
                <Text style={styles.label}># of bottles drunk</Text>
                <Picker style={styles.input} mode="dropdown" selectedValue={bottles} onValueChange={(itemValue, itemIndex) => setBottles(itemValue)}>
                    {bottlesArray.map((t) => {
                        return (<Picker.Item label={t.label} value={t.value} key={t.value} />)
                    })}
                </Picker>
                <Text style={styles.label}>Gender</Text>
                <Radiobutton options={genderOptions} defaultValue={gender} onPress={(value) => { setGender(value) }} />
                <Text style={styles.label}>Weight (KG)</Text>
                <TextInput style={styles.input} onChangeText={text => checkWeight(text)} placeholder='Weight (KG)' keyboardType='numeric' error={invalidWeight}></TextInput>
                {invalidWeight && <Text style={styles.errorText}>Invalid weight value!</Text>}
               
                
                <Text style={styles.label}>Time passed since last drink</Text>
                <Picker style={styles.input} mode="dropdown" selectedValue={hours} onValueChange={(itemValue, itemIndex) => setHours(itemValue)}>
                    {hoursArray.map((t) => {
                        return (<Picker.Item label={t.label} value={t.value} key={t.value} />)
                    })}
                </Picker>
               
                <Text style={[bloodAlcLevel >= 1.20 ? styles.bac_danger : bloodAlcLevel >= 0.5 ? styles.bac_warning : styles.bac_ok]}>{bloodAlcLevel.toFixed(2)}</Text>
                <CalculateButton textStyle={styles.buttonText} text={'Calculate driving condition'} onPress={calculateBAL}></CalculateButton>
            </ScrollView>
            <Text style={styles.label}> {[bloodAlcLevel >= 1.20 ? 'Aggravated drunken driving' : bloodAlcLevel >= 0.5 ? 'Drunk driving' : 'Good to go!']} </Text>
        </SafeAreaView>
    );
}
