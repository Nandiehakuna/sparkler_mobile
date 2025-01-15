import { 
 View,
TouchableOpacity, 
Linking,
StyleSheet,
 
} 
from 'react-native';

import InstagramIcon from './InstagramIcon';
import ProjectIcon from './ProjectIcon';
import YoutubeIcon from './YoutubeIcon';
import Twitter from './Twitter';





const SocialLinks=[
        {name:'Youtube', icon:<YoutubeIcon/>, url:'https://www.youtube.com/'},
        {name:'Instagram', icon:<InstagramIcon/>, url:'https://www.youtube.com/'},
        {name:'Twitter', icon:<Twitter/>, url:'https://www.youtube.com/'},
        {name:'Website', icon:<ProjectIcon/>, url:'https://www.youtube.com/'},
]


export default()=>(
        <View style={styles.container}>
                {SocialLinks.map((link, index)=>
                link.url&&(
                        <TouchableOpacity key={index} onPress={()=>Linking.openURL(link.url)} >9
                                {link.icon}

                        </TouchableOpacity>
                )
                
        )

                }
        </View>
       
)
const styles = StyleSheet.create({
        container:{
                flexDirection:'row',
                
        }

        
});
