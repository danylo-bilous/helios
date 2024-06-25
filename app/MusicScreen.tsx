import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { getSignedUrl } from '@/s3-utils';

const MusicScreen = () => {
    const [background, setBackground] = useState<string>('');
    useEffect(() => {
        const fetchVideoUrls = async () => {
            const result = await getSignedUrl('heliosassets', 'honk.mp4');
            setBackground(result);
        };

        fetchVideoUrls();
    }, []);
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState(0);

    const onProgress = (data: any) => {
        setCurrentTime(data.currentTime);
    };

    const onLoad = (data: any) => {
        setDuration(data.duration);
    };

    const handlePlayPause = () => {
        setPaused(!paused);
    };
    const handlePrev = () => {
        let prevTime = currentTime - 10;
        if (prevTime < 0) {
            prevTime = 0;
        }
        videoRef.current.seek(prevTime);
        setCurrentTime(prevTime);
    };
    const handleNext = () => {
        let nextTime = currentTime + 10;
        if (nextTime > duration) {
            nextTime = duration;
            setPaused(true);
        }
        videoRef.current.seek(nextTime);
        setCurrentTime(nextTime);
    };
    const onSeek = (value: number) => {
        videoRef.current.seek(value);
        setCurrentTime(value);
    };

    const formatTime = (seconds: number): string => {
        const pad = (num: number, size: number): string => num.toString().padStart(size, '0');
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${pad(minutes, 2)}:${pad(remainingSeconds, 2)}`;
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri: background }}
                paused={paused}
                style={styles.backgroundImage}
                onLoad={onLoad}
                onProgress={onProgress}
                onEnd={() => setPaused(true)}
            />
            {/* <ImageBackground source={require('../assets/images2/demoImage1.png')} style={styles.backgroundImage}>
            </ImageBackground> */}
            <Text style={styles.title}>EDITORIAL</Text>
            <Text style={styles.subTitle}>The Essential Manifesto</Text>
            <View style={{ width: '100%', paddingHorizontal: 25 }}>
                <Slider
                    value={currentTime}
                    onValueChange={onSeek}
                    maximumValue={duration}
                    minimumValue={0}
                    thumbTintColor="#000000"
                    style={{ width: '100%', marginTop: 15 }}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                <Text>{formatTime(currentTime)}</Text>
                <Text>{formatTime(duration)}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={handlePrev}>
                    <ImageBackground
                        source={require('../assets/images2/back_audio.png')}
                        style={styles.backButton}
                    >
                        <Text style={styles.number}>10</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePlayPause}>
                    {paused ? (
                        <Image
                            source={require('../assets/images2/play.png')}
                            style={styles.playButton}
                        />
                    ) : (
                        <Image
                            source={require('../assets/images2/pause.png')}
                            style={styles.playButton}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <ImageBackground
                        source={require('../assets/images2/next_audio.png')}
                        style={styles.backButton}
                    >
                        <Text style={styles.number}>10</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        // height: 587,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'IMFell',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 30,
        color: '#E37B00',
        textAlign: 'center',
        marginTop: 10,
    },
    subTitle: {
        fontFamily: 'KaiseiRegular',
        fontWeight: '400',
        fontSize: 26,
        lineHeight: 30,
        color: '#000000',
        textAlign: 'center',
        marginTop: 5,
    },
    slider: {
        width: '80%',
        height: 40,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 50,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    controlText: {
        color: 'white',
        fontSize: 18,
        margin: 10,
    },
    playButton: {
        width: 27,
        height: 31.57
    },
    backButton: {
        width: 39.75,
        height: 46.38
    },
    number: {
        fontFamily: 'Caslon',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 60,
        color: '#000000',
        textAlign: 'center',
    }
});

export default MusicScreen;