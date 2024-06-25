import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Modal, Dimensions } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getSignedUrl } from '@/s3-utils';

const width = Dimensions.get('window').width;

interface UserProfileProps {
    header: string;
    author: string;
    contentImage: string;
    followIcon: string;
    patronIcon: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ header, author, contentImage, followIcon, patronIcon }) => {
    const navigation = useNavigation<NavigationProp<{ "index": undefined, "HomeScreen": undefined, "CreatorScreen": undefined, "EditorialScreen": undefined }>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImageUrls = async () => {
            const contentImageUrl = await getSignedUrl('heliosassets', contentImage);
            const followIconUrl = await getSignedUrl('heliosassets', followIcon);
            const patronIconUrl = await getSignedUrl('heliosassets', patronIcon);
            setImages([contentImageUrl, followIconUrl, patronIconUrl]);
        };
        fetchImageUrls();
    }, [contentImage, followIcon, patronIcon]);
    return (
        <ImageBackground
            source={{ uri: images[0] || undefined }}
            style={styles.backgroundImage}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Feather name="info" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', bottom: 25 }}>
                <Text style={styles.title}>{header}</Text>
                <Text style={styles.name}>{author}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonFollow}>
                        <Image source={{ uri: images[1] || undefined }} style={styles.buttonImage} />
                        <Text style={styles.buttonFollowText}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPatron}>
                        <Image source={{ uri: images[2] || undefined }} style={styles.buttonImage} />
                        <Text style={styles.buttonPatronText}>Become a Patron</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <View style={{ width: 45, height: 1.5, backgroundColor: "#000000", alignSelf: 'center', marginTop: 8, marginBottom: 25 }}></View>
                        <Text style={styles.joinUsText}>JOIN US</Text>
                        <Text style={styles.modalText}>
                            Helios is made by creatives, for creatives. We believe it’s our responsibility to honor and support our phenomenal artists and contributors.
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: images[1] || undefined }} style={[styles.buttonImage, { marginTop: -12 }]} />
                            <Text style={styles.joinUsText}>Follow Aryan’s Journey</Text>
                        </View>
                        <Text style={styles.modalText}>
                            Follow to keep up with more from Aryan. Get exclusive access to pre-releases and more!
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: images[2] || undefined }} style={[styles.buttonImage, { marginTop: -12 }]} />
                            <Text style={styles.joinUsText}>Support Aryan’s Work</Text>
                        </View>
                        <Text style={[styles.modalText, { marginBottom: 0 }]}>
                            Become a Patron of the Arts. 100% of your contribution directly supports Aryan’s upcoming work.
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: 790,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingRight: 17,
        paddingBottom: 49,
        paddingLeft: 29
    },
    logo: {
        width: 49,
        height: 49
    },
    title: {
        fontFamily: 'IMFell',
        fontWeight: '400',
        fontSize: 24,
        letterSpacing: -0.24,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10
    },
    name: {
        fontFamily: 'Caslon',
        fontSize: 40,
        fontWeight: '400',
        letterSpacing: -0.24,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 48
    },
    buttonFollow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 21,
        borderRadius: 9,
    },
    buttonFollowText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        marginTop: 8,
        color: '#FFFFFF',
    },
    buttonPatron: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 21,
        borderRadius: 9,
    },
    buttonPatronText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        marginTop: 8,
        color: '#000000',
    },
    buttonImage: {
        width: 14,
        height: 14,
        marginRight: 10
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: width
    },
    modalView: {
        width: width,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingBottom: 30
    },
    modalText: {
        fontFamily: 'Caslon',
        fontSize: 18,
        letterSpacing: -0.24,
        marginBottom: 10,
        color: '#000000'
    },
    joinUsText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 25,
        letterSpacing: -0.24,
        textAlign: 'center',
        color: '#046307'
    }
});

export default UserProfile;