import React,  { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import useResults from '../hooks/useResults';
import { Linking } from 'react-native';

const ResultsShowScreen = ({ navigation }) => {
	const [result, setResult] = useState(null);
	const [errorMessage] = useResults();
	const id = navigation.getParam('id');

	const getResult = async id => {
		const response = await yelp.get(`/${id}`);
		setResult(response.data);
	};

	useEffect(() => {
		getResult(id);
	}, []);

	if (!result) { 
		return errorMessage;
	}

	const address = result.location.display_address;

	const displayAddress = (item) => { 
		return address.map(item => {
			return item + ' ' ;
		});
	};

	const openPhoneCall = () => {
		Linking.openURL(`tel:${result.display_phone}`);
	}


	return (
		<View style={styles.container}>
			{errorMessage ? <Text>{errorMessage}</Text> : null }
			<Text style={styles.title}>{result.name}</Text>
			
			<View style={styles.slider}>
				<Text style={styles.text}>
					{result.rating} <Entypo name="star" size={20} color="black" />  
				</Text>
				<Text style={styles.text}>
					<MaterialIcons name="rate-review" size={16} color="black" /> {result.review_count} Reviews 
				</Text>
				<Text style={styles.text}>
					<Ionicons name="md-time" size={20} color="black" />
					{result.isClosed ? ' closed now.' : ' open'}	
				</Text>
			</View>

			<View style={styles.container}>
				<Text style={styles.subtitle}>Location and Contact</Text>
				<Text style={styles.text}> 
					<Entypo name="location-pin" size={24} color="black" />{displayAddress()}
				</Text>
				<Text style={styles.phone} onPress={openPhoneCall} >
					<Entypo name="phone" size={24} color="black" /> {result.display_phone}
				</Text>
			</View>

			<View style={styles.slider}>
				<FlatList  
					data={result.photos}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={ photo => photo }
					renderItem={ ({ item }) => { 
						return <Image style={styles.image} source={{ uri: item }} />
					}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 150,
		width: 200,
		marginBottom: 10,
		marginLeft: 15
	},
	title: {
		fontSize:20,
		fontWeight: 'bold',
		marginLeft: 15,
		marginBottom: 10
	},
	subtitle: {
		fontSize:16,
		fontWeight: 'bold',
		marginBottom: 10
	},
	container: {
		marginBottom: 10,
		marginTop: 10,
		padding: 15
	},
	text: {
		fontSize:14,
		marginLeft: 15,
		marginBottom: 5,
		marginTop: 5
	},
	slider: {
		backgroundColor: '#e3e5e5',
		paddingBottom: 10,
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	phone: {
		fontSize:14,
		marginLeft: 15,
		marginBottom: 5,
		color: '#0FBCFF',
		marginTop: 5
	},
});

export default ResultsShowScreen;