// src/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Defina o tipo de navegação esperado pelo Drawer
type DrawerNavProps = DrawerNavigationProp<any>;

const Header = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<DrawerNavProps>();
    const route = useRoute();
    const routeName = route.name;

    const isMainScreen = routeName === 'Chat';

    const handleLeftButtonPress = () => {
        if (isMainScreen) {
            navigation.openDrawer();
        } else {
            navigation.goBack();
        }
    };

    const iconName = isMainScreen ? "menu" : "arrow-left";

    // Corrigindo: use ?? 0 para garantir que o valor seja um número
    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: statusBarHeight + 15 }]}>
            <TouchableOpacity onPress={handleLeftButtonPress}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={colors.text}
                    style={{ marginLeft: 15 }}
                />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>{routeName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});

export default Header;