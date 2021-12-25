import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
import Colors from '../constants/colors';
export default function About() {
	return (
		<Layout name="About">
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text bold>This is About tab</Text>
			</View>
		</Layout>
	);
}
