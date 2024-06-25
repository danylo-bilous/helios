import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getSignedUrl } from '@/s3-utils';

interface EditorialHeaderProps {
    header: string;
    title: string;
    subtitle: string;
    contentImage: string;
}

const EditorialHeader: React.FC<EditorialHeaderProps> = ({ header, title, subtitle, contentImage }) => {
    const navigation = useNavigation<NavigationProp<{ "HomeScreen": undefined }>>();

    const [image, setImage] = useState<string>('');
    useEffect(() => {
        const fetchImageUrls = async () => {
            const contentImageUrl = await getSignedUrl('heliosassets', contentImage);
            setImage(contentImageUrl);
        };
        fetchImageUrls();
    }, [contentImage]);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 999 }} onPress={() => navigation.navigate("HomeScreen")}>
                        <MaterialIcons name="arrow-back" size={24} color="#000000" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{header}</Text>
                </View>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
            <ImageBackground
                source={{ uri: image || undefined }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    headerContainer: {
        position: 'relative'
    },
    backgroundImage: {
        width: '100%',
        height: 453
    },
    textContainer: {
        paddingHorizontal: 17,
        paddingTop: 90,
        paddingBottom: 30,
    },
    headerText: {
        fontFamily: 'IMFell',
        fontSize: 24,
        fontWeight: '400',
        letterSpacing: -0.24,
        color: '#E37B00',
        width: '100%',
        textAlign: 'center'
    },
    titleText: {
        fontFamily: 'KaiseiRegular',
        fontSize: 31,
        lineHeight: 35,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
        marginTop: 15,
    },
    subtitleText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 20,
        letterSpacing: -0.24,
        textAlign: 'center',
        color: '#000000',
        marginTop: 10,
    }
});

export default EditorialHeader;
