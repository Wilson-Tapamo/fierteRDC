import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { messages } from '@/data/messages';
import { ChevronRight } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
    x.value = 0;
    y.value = 0;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx: any) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        x.value = withSpring(Math.sign(event.translationX) * SCREEN_WIDTH * 1.5);
        y.value = withSpring(0);
        runOnJS(nextCard)();
      } else {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ],
    };
  });

  const currentMessage = messages[currentIndex];

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.cardContainer, cardStyle]}>
          <Image source={{ uri: currentMessage.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{currentMessage.title}</Text>
              <Text style={styles.description}>{currentMessage.description}</Text>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  x.value = withSpring(SCREEN_WIDTH * 1.5);
                  runOnJS(nextCard)();
                }}
              >
                <ChevronRight color="white" size={30} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </PanGestureHandler>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.supportButtonText}>Soutenir la RDC</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={20} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Merci ! Vous soutenez la RDC avec ce geste 🙌
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 25,
  },
  contentContainer: {
    gap: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  nextButton: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.5)',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportButton: {
    backgroundColor: '#002060',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  supportButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    gap: 20,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#002060',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  modalButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
  },
});