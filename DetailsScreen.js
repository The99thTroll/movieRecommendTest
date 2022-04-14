import {React} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-font-size';
import exios from 'exios';

export default class PopularScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    timeConvert(num){
        var hours = Math.floor(num/60);
        var minutes = num % 60;

        return `${hours} hours, ${minutes} mins`;
    }

    getData = () => {
        const url = "http://localhost:5000/popular-movies";
        exios
        .get(url)
        .then(async response => {
            this.setState({
                data: response.data.data
            });
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItems = ({item, index}) => {
        return (
            <Card
            key={`card-${index}`}
            image={{uri: item.poster_link}}
            imageProps={{resizeMode: "cover"}}
            featuredTitle={item.title}
            containerStyle={styles.cardContainer}
            featuredTitleStyle={styles.title}
            featuredSubtitle={`${
                item.release_date.split("-")[0]
            } | ${this.timeConvert(item.duration)}`}
            featuredSubtitleStyle={styles.subtitle}
            />
        )
    }

    render(){
        const {data} = this.state;

        return(
            <View
            style={styles.container}>
                <FlatList 
                data={data}
                keyExtractor={this.keyExtractor}
                renderItems={this.renderItems}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    title: {
      color: "#fff",
      fontSize: RFValue(25),
      paddingLeft: RFValue(15),
      marginTop: RFValue(65),
      alignSelf: "flex-start"
    },
    subtitle: {
      fontSize: RFValue(15),
      fontWeight: "bold",
      paddingLeft: RFValue(15),
      alignSelf: "flex-start"
    },
    cardContainer: {
        flex: 1,
        borderRadius: RFValue(10),
        justifyContent: "center",
        height: RFValue(110),
        marginBottom: RFValue(20)
    }
  });