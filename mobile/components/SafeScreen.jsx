import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {COLORS} from '@/constants/colors'

const SafeScreen = ({children}) => {
const insets = useSafeAreaInsets();
return (
    <View style={{paddingTop:insets.top,paddingLeft:7,flex:1,backgroundColor:COLORS.background}}>
      {children}
    </View>
  )
}

export default SafeScreen