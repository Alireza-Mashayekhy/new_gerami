import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { useColorScheme } from '@/hooks/useColorScheme';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const customTheme = extendTheme({
        fonts: {
            heading: 'IRANSans',
            body: 'IRANSans',
            mono: 'IRANSans',
        },
        fontConfig: {
            IRANSans: {
                100: {
                    normal: 'IRANSans-Light',
                },
                400: {
                    normal: 'IRANSans',
                },
                500: {
                    normal: 'IRANSans',
                },
                700: {
                    normal: 'IRANSans-Bold',
                },
            },
        },
        colors: Colors,
    });

    const colorScheme = useColorScheme();

    const [fontsLoaded] = Font.useFonts({
        IRANSans: require('../assets/fonts/IRANSansXFaNum-Regular.ttf'),
        'IRANSans-Bold': require('../assets/fonts/IRANSansXFaNum-Bold.ttf'),
        'IRANSans-Light': require('../assets/fonts/IRANSansXFaNum-Light.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NativeBaseProvider theme={customTheme}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="index"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </NativeBaseProvider>
    );
}
