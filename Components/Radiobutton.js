import {useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView, Pressable} from 'react-native';

/**
 * Radiobutton component
 * options - Array containing dispayed texts and values for radiobutton options
 * onPress - Used to forward selected value to the component using ths radiobutton component
 * defaultValue - Default value
*/
export default function Radiobutton({options, onPress, defaultValue = 1}) {
    const [value, setValue] = useState(null);

    /** Relay function for handling radiobutton selection */
    function handlePress(selected) {
        setValue(selected);
        onPress(selected);
    }

    /** Set default value when refreshed */
    useEffect(() => {
        setValue(defaultValue);
    }, [])

    /** Return radiobuttons view */
    return (
        <>
        {
            options.map((item) => (
                <SafeAreaView key={item.value} style={styles.buttonContainer}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Pressable style={styles.circle} onPress={() => handlePress(item.value)}>
                        {value === item.value && <SafeAreaView style={styles.checkedCircle}/>}
                    </Pressable>
                </SafeAreaView>
            ))
        }
        </>
    )    
}

/** Stylesheet */
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
    },
    label: {
        marginRight: 10,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 1,
        boarderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 7,
        backgroundColor: '#000'
    }
})