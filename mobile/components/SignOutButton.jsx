import { useClerk } from '@clerk/clerk-expo';
import { Alert, TouchableOpacity, Text } from 'react-native'; // 
import { styles } from '../styles/home.styles';
import { COLORS } from '../constants/colors';
import { useRouter } from "expo-router"; 
import { Ionicons } from '@expo/vector-icons';


export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    Alert.alert("Logout","Are you sure you want to logout?",[
      {text:"Cancel",style:"cancel"},
      {text:"Logout",style:"destructive",onPress:signOut},

    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name= "log-out-outline" size={22} color={COLORS.text} />
    </TouchableOpacity>
  )
}