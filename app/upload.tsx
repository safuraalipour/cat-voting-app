import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { UploadCloud, ImagePlus, X } from 'lucide-react-native';

export default function UploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'You need to grant gallery access to upload a cat photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [4, 4], 
      quality: 0.8, 
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!imageUri) return;

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      Alert.alert('Success!', 'Your cat photo was uploaded successfully!');
      setImageUri(null); 
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Show your cat to the world!</Text>

      {imageUri ? (
        <View style={styles.previewContainer}>
          <Image source={imageUri} style={styles.previewImage} transition={200} />
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => setImageUri(null)}
          >
            <X color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.pickerButton} onPress={pickImage}>
          <ImagePlus color="#E91E63" size={48} />
          <Text style={styles.pickerText}>Choose from Gallery</Text>
        </TouchableOpacity>
      )}

      {imageUri && (
        <TouchableOpacity 
          style={[styles.uploadButton, isUploading && styles.uploadingState]} 
          onPress={handleUpload}
          disabled={isUploading}
        >
          <UploadCloud color="#fff" size={24} />
          <Text style={styles.uploadButtonText}>
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
    marginTop: 20,
  },
  pickerButton: {
    width: '100%',
    height: 250,
    borderWidth: 2,
    borderColor: '#E91E63',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
  },
  pickerText: {
    marginTop: 12,
    fontSize: 16,
    color: '#E91E63',
    fontWeight: '600',
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#F44336',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 32,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  uploadingState: {
    backgroundColor: '#9E9E9E',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});