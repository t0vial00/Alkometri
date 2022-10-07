import { TouchableOpacity, StyleSheet, Text, SafeAreaView, Pressable} from 'react-native';


export default function CalculateButton({textStyle, text, onPress}) {


    /** Relay function for handling Button press */
    function handlePress() {
        onPress();
    }


        /** Return Button view */
        return (
            <>
            {
                <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                <Text style={textStyle}>{text}</Text>
                </TouchableOpacity>
            }
            </>
        )    
    }

            /** Stylesheet */
            const styles = StyleSheet.create({
                buttonContainer: {
                    elevation: 8,
                    alignSelf: 'center',
                    width: "90%",

                    backgroundColor: "#6060EF",
                    borderRadius: 10,
                    marginTop: 20,
                    marginBottom: 50,
                    paddingVertical: 10,
                  },    
            })