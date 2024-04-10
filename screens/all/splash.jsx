import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigation.replace("Index");
            } else {
                navigation.replace('Login');
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                style={{ width: 200, height: 200 }}
                source={require('../../assets/animations/Animation - 1709653976457.json')}
                autoPlay
                loop
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Splash;
