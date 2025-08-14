import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Sidebar: React.FC<DrawerContentComponentProps> = (props) => {
    const { theme, toggleTheme, colors } = useTheme();
    const insets = useSafeAreaInsets();

    const iconName = theme === 'dark' ? 'white-balance-sunny' : 'weather-night';

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingBottom: insets.bottom }]}>
            
            {/* Nova View para o cabeçalho */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Chats Anteriores</Text>
                
                <TouchableOpacity onPress={toggleTheme}>
                    <MaterialCommunityIcons name={iconName} size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            {/* A lista de chats viria aqui */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    themeButton: {
        // Este estilo não é mais usado, pois o botão está no header
        // e é alinhado com flexbox.
    },
});

export default Sidebar;