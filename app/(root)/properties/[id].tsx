import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Property () {
    const { id } = useLocalSearchParams();
    
    return (
        <View>
            <Text>Propert {id}</Text>
        </View>
    )
}
