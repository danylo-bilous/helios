import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Text, Modal, View, Dimensions } from 'react-native';
import EditorialHeader from "./components/EditorialHeader"

const width = Dimensions.get('window').width;

const EditorialScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView style={styles.container}>
            <EditorialHeader
                header={'EDITORIAL'}
                title={'The Essential Manifesto'}
                subtitle={'Why do we watch movies?'}
                contentImage={'demoImage.png'}
            />
            {!modalVisible && <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Image source={require('../assets/images2/music_icon.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Listen to this Editorial</Text>
            </TouchableOpacity>}
            {modalVisible && <View style={{ marginTop: 25 }}>
            </View>}
            <Text style={styles.editorialText}>
                I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.
            </Text>
            <Text style={styles.editorialText}>
                I remember as a seven year old, lying down on my bed, on the ground floor of our house, staring out at bright peepal leaves glazed by the tropical sunrise of my childhood, wondering what it might be like to hold a conversation with Chandragupta or Napoleon or Lakshmibai; wondering about what that wild and unshackled glint in their eyes might reveal. Most of my time was spent in the company of books that told the great stories of their legendary exploits. Reading Will Durant’s “The Greatest Minds and Ideas of All Time” in high school, I could not help but be so thoroughly convinced by the idea that the impetus, for all our marches through the muck and on towards a shimmering hope that lingers draped upon the horizon, has always been an enlightened general or prophet, or king or queen. And yet, no matter how wise my seventeen year old self believed himself to be, he could not be much further from the truth.
            </Text>
            <Text style={styles.editorialText}>
                We are not, you see, subscribed blindly to the altar of great men and women – no matter how much that appears to be the case. I refuse that our predicament be either one of spineless apathy or greasy sycophancy. That cannot be why we flock to strong leaders. Within the soul of each human being, I am certain, is a whispering voice that speaks the truth – whether that voice is drowned by the tempests of wanton thought, or amplified into action, is another matter altogether. The very presence of that voice indicates, to me at any rate, that beneath the furious sloshing of our imperfections, we are, in our own uniqueness, perfect beings shackled by our own ignorance. To calm the waters, still the great seas within ourselves until they are purged of all false movement, that is the great problem of our existence. And one, we shall, no doubt, surmount. Either way, a life spent pursuing a solution to that most grand and existential game is no doubt a noble one – and high nobility founded in truth, and nothing else, is the objective of human existence.
            </Text>
            <Text style={styles.editorialText}>
                Our impetus for action, then, cannot be so disparate from our raison d'etre to be either the egotistical act of becoming a ‘great man’ or the cowardly act of becoming a ‘yes man’. It can, most certainly, as we understand it now, be some distortion of our raison d’etre, some perversion of it, but not so utterly divorced from it. What do I mean by this?  Human history, viewed from an evolutionary lens, presents a litany of disasters caused by the misunderstanding or intentional distortion of essential truths. In examining each abhorrent dogma, one finds, if sufficiently humble and open, the presence of some mangled and misshapen truth. The growth of our species into strength and abundance, an ideal few would discount as trivial or misguided, can be distorted into the assumption of a teutonic master race that must enslave and exterminate all others to enable the next great evolutionary leap. The ideal of the mother as the divine creator and nurturer of life can be distorted to constrain a woman’s activity to the domestic.  Beneath the distortions that are the ‘great man theory’, or the shameless worship of heroes, or any other gross simplification of our existence, then, we find an almost anxious search for cosmos (order) amidst the chaos, for certainty amidst ignorance.
            </Text>
            <Text style={[styles.editorialText, { marginBottom: 0 }]}>
                Returning now to the question of this article, the goal is singular: to present you, my dear reader, with that fundamental question and anxiety of our existence, so you may wrestle with it by the horns and form some conclusions of your own. So you may roll about the mud under the weight of our shared endeavor, and stop, and stand tall in unperturbed self-assurance with the world on your shoulders. For while for so many, our life is a grave and pensive matter to be taken on with decided self-importance, to us, it’s just a game – one we play only because it’s too much fun. At those who would say, as they do no doubt, that you are too distracted by TikToks and Kardashians and cricket to care, we can scoff together. Because I am yet to meet someone who does not, at least, in the silence between two thoughts, hear the voice of the universe calling their name and beckoning them to the greatest game of all. I know you care because at every point from the cave paintings by a lone flame in the Ajanta caves, to hobbling on the surface of the moon, we have contemplated our place amongst the stars. It’s how we’re wired.
            </Text>
            <Text style={styles.editorialText}>
                So, what can this publication be? A reminder.
            </Text>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image source={require('../assets/images2/cancel_icon.png')} style={styles.cancelImage} />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>The Essential Manifesto</Text>
                        <TouchableOpacity >
                            <Image source={require('../assets/images2/play_white.png')} style={styles.playImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D9D9D9',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#046307',
        padding: 15,
        width: 252,
        alignSelf: 'center',
        borderRadius: 9,
        marginTop: 25,
        marginBottom: 25,
    },
    buttonText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 20,
        letterSpacing: -0.24,
        marginTop: 7,
        color: '#FFFFFF',
    },
    buttonImage: {
        width: 30.83,
        height: 28.5,
        marginRight: 15
    },
    editorialText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 35,
        color: '#000000',
        marginBottom: 35,
        paddingHorizontal: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    modalView: {
        width: width,
        backgroundColor: 'rgba(31, 35, 39, 0.5)',
        paddingHorizontal: 25,
        paddingTop: 22,
        paddingBottom: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cancelImage: {
        width: 22.75,
        height: 22.75,
        marginTop: -10
    },
    playImage: {
        width: 19.25,
        height: 22.75,
        marginTop: -2
    },
    modalText: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 35,
        color: '#FFFFFF',
    }
});

export default EditorialScreen;
