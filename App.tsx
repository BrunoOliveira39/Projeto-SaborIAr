// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import ChatNavigator from './src/navigation/ChatNavigator'; // Vamos criar este arquivo na próxima etapa

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <ChatNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

