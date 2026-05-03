import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { UploadCloud, ImagePlus, XCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { apiClient } from '../src/api/client';
import { useQueryClient } from '@tanstack/react-query';

export default function UploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Gallery access is needed to upload photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) return;
    setIsUploading(true);

    const formData = new FormData();
    const filename = imageUri.split('/').pop() || 'upload.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: type,
    });

    try {
      const response = await apiClient.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Cat uploaded successfully!');
        queryClient.invalidateQueries({ queryKey: ['my-uploads'] });
        router.replace('/'); 
      }
    } catch (error: any) {
      console.error('Upload Error Details:', error.response?.data || error.message);
      const apiMessage = error.response?.data?.message || 'Check your API Key or Network.';
      Alert.alert('Upload Failed', apiMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Cat</Text>
      
      {!imageUri ? (
        <TouchableOpacity style={styles.picker} onPress={pickImage}>
          <ImagePlus size={50} color="#E91E63" strokeWidth={1.5} />
          <Text style={styles.pickerText}>Tap to select a photo</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={imageUri} style={styles.previewImage} />
          <TouchableOpacity 
            style={styles.removeBtn} 
            onPress={() => setImageUri(null)}
            disabled={isUploading}
          >
            <XCircle size={32} color="#F44336" fill="white" />
          </TouchableOpacity>
        </View>
      )}

      {imageUri && (
        <TouchableOpacity 
          style={[styles.button, isUploading && styles.disabled]} 
          onPress={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <UploadCloud size={20} color="white" style={{marginRight: 8}} />
              <Text style={styles.buttonText}>Confirm Upload</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 20, color: '#333' },
  picker: { 
    width: '100%', height: 300, borderStyle: 'dashed', borderWidth: 2, 
    borderColor: '#E91E63', borderRadius: 20, justifyContent: 'center', 
    alignItems: 'center', backgroundColor: '#FFF5F7' 
  },
  pickerText: { marginTop: 12, color: '#E91E63', fontWeight: '600', fontSize: 16 },
  previewContainer: { width: '100%', height: 300, position: 'relative' },
  previewImage: { width: '100%', height: '100%', borderRadius: 20 },
  removeBtn: { position: 'absolute', top: -10, right: -10, elevation: 5 },
  button: { 
    flexDirection: 'row', backgroundColor: '#E91E63', width: '100%', 
    padding: 18, borderRadius: 15, marginTop: 40, 
    justifyContent: 'center', alignItems: 'center' 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  disabled: { backgroundColor: '#F48FB1' }
});