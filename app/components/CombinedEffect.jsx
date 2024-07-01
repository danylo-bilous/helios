import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CombinedEffect = ({ children }) => {
    const animationProgress = useSharedValue(0);

    const [ripples, setRipples] = useState([]);

    const handleGestureEvent = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            const { x, y } = event.nativeEvent;
            const newRipple = { id: Date.now(), x, y };
            setRipples((prevRipples) => [...prevRipples, newRipple]);
            animationProgress.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }, () => {
                animationProgress.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });
            });
        }
    };

    const circleStyle1 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: animationProgress.value * 110 },
                { translateY: animationProgress.value * -40 },
            ],
        };
    });

    const circleStyle2 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: animationProgress.value * 50 },
                { translateY: animationProgress.value * -40 },
            ],
        };
    });

    const circleStyle3 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: animationProgress.value * -130 },
                { translateY: animationProgress.value * 10 },
            ],
        };
    });

    return (
        <LongPressGestureHandler onHandlerStateChange={handleGestureEvent} minDurationMs={500}>
            <Animated.View style={styles.container}>
                {children}
                {ripples.map((ripple) => (
                    <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
                ))}
                <Animated.View style={styles.touchableArea} pointerEvents="box-none">
                    <Animated.View style={[styles.circle, styles.circle1, circleStyle1]} />
                    <Animated.View style={[styles.circle, styles.circle2, circleStyle2]} />
                    <Animated.View style={[styles.circle, styles.circle3, circleStyle3]} />
                </Animated.View>
            </Animated.View>
        </LongPressGestureHandler>
    );
};

const Ripple = ({ x, y }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    scale.value = withTiming(2, { duration: 1000, easing: Easing.out(Easing.ease) }, () => {
        opacity.value = withTiming(0, { duration: 500 });
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x - 50 }, { translateY: y - 50 }, { scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return <Animated.View style={[styles.ripple, animatedStyle]} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    touchableArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.1,
    },
    circle1: {
        backgroundColor: 'orange',
        bottom: 50,
        left: width / 2 - 190,
    },
    circle2: {
        backgroundColor: 'lightblue',
        bottom: 50,
        left: width / 2 - 40,
    },
    circle3: {
        backgroundColor: 'orange',
        bottom: 50,
        left: width / 2 + 100,
    },
    ripple: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
});

export default CombinedEffect;
