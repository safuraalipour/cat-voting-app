import { Tabs } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, UploadCloud } from 'lucide-react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs 
        screenOptions={{ 
          tabBarActiveTintColor: '#E91E63',
          headerTitleAlign: 'center',
        }}
      >
            <Tabs.Screen 
                name="index" 
                options={{ 
                title: 'My Uploaded Cats',
                tabBarLabel: 'My Cats',
                tabBarIcon: ({ color }) => <Home color={color} size={24} />
                }} 
            />
            <Tabs.Screen 
                name="upload" 
                options={{ 
                title: 'Upload New Cat',
                tabBarLabel: 'Upload',
                tabBarIcon: ({ color }) => <UploadCloud color={color} size={24} />
                }} 
            />
        </Tabs>
    </QueryClientProvider>
  );
}