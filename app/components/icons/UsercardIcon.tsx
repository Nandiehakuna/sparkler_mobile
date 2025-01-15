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
]


export default()=>(
        <View style={styles.container}>
                {SocialLinks.map((link, index)=>
                (
                        <TouchableOpacity key={index} onPress={()=>Linking.openURL(link.url)} >9
                                <View style={styles.icon}>{link.icon}</View>

                        </TouchableOpacity>
                )
                
        )

                }
        </View>
       
)
const styles = StyleSheet.create({
        container:{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:10,
                backgroundColor:'red/'
                
        },
        icon:{
                width:20,
                height:20,
        }


        
});
