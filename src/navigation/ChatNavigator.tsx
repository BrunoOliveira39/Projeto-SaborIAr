import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Platform, StatusBar } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

const ChatNavigator: React.FC = () => {
    const { theme } = useTheme();

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <Drawer.Navigator
            initialRouteName="Chat"
            drawerContent={(props: DrawerContentComponentProps) => <Sidebar {...props} />}
            screenOptions={{
                header: () => <Header key={theme} />,
                headerStyle: {
                    marginTop: statusBarHeight, // Adiciona o espaço da barra de status
                },
            }}
        >
            <Drawer.Screen
                name="Chat"
                component={ChatScreen}
            />
        </Drawer.Navigator>
    );
};

export default ChatNavigator;