import {React} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, AirbnbRating, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-font-size';
import {styleProps} from 'react-native-web/dist/cjs/modules/forwardedProps';
import exios from 'exios';

export default class HomeScreen extends Component{
    constructor(){
        super();

        this.state = {
            movieDetails: {}
        }
    }

    componentDidMount(){
        this.getMovies();
    }

    timeConvert(num){
        var hours = Math.floor(num/60);
        var minutes = num % 60;

        return `${hours} hours, ${minutes} mins`;
    }

    getMovies = () => {
        const url = "http://localhost:5000/get-movie";
        exios
        .get(url)
        .then(response => {
            let details = response.data.data;
            details["duration"] = this.timeConvert(details.duration);
            this.setState({
                movieDetails: details
            });
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    likedMovie = () => {
        const url = "http://localhost:5000/liked-movie";
        exios
        .post(url)
        .then(response => {
            this.getMovies();
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    dislikedMovie = () => {
        const url = "http://localhost:5000/disliked-movie";
        exios
        .post(url)
        .then(response => {
            this.getMovies();
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    unwatchedMovie = () => {
        const url = "http://localhost:5000/unwatched-movie";
        exios
        .post(url)
        .then(response => {
            this.getMovies();
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    render(){
        const {movieDetails} = this.state;
        if(movieDetails.poster_link){
            const {
                poster_link,
                title,
                release_date,
                duration,
                overview,
                rating
            } = movieDetails;
        }

        return(
            <View title = {styles.container}>
                <View title = {styles.headerContainer}>
                    <Header
                    centerComponent={{
                        text: "Movie Recommended",
                        style: styles.headerTitle
                    }}
                    rightComponent={{
                        icon: "search",
                        color: "#fff"
                    }} 
                    backgroundColor={"#d500f9"}
                    containerStyle={{flex: 1}}>
                        
                    </Header>
                </View>
                <View title = {styles.subcontainer}>
                    <View title = {styles.subtopcontainer}>
                        <Image style={styles.posterImage} source={{uri: poster_link}}/>
                    </View>
                    <View title = {styles.subbottomcontainer}>
                        <View title = {styles.upperbottomcontainer}>
                            <Text style = {styles.title}>{title}</Text>

                            <Text style = {styles.subtitle}>{`${release_date.split("-")[0]} | ${duration}`}</Text>

                            <View title = {styles.middlebottomcontainer}>
                                <View title = {{flex:0.3}}>
                                    <AirbnbRating
                                        count={10}
                                        reviews={["","","","",""]}
                                        defaultRating={rating}
                                        isDisabled={true}
                                        size={RFValue(25)}
                                        starContainerStyle={{
                                            marginTop: -30
                                        }}
                                    ></AirbnbRating>
                                </View>

                                <View style={{
                                    flex: 0.7,
                                    padding: 15
                                }}>
                                    <Text style={styles.overview}></Text>
                                </View>
                            </View>

                            <View style={styles.lowerbottomcontainer}>
                                <View style={styles.iconbuttoncontainer}>
                                    <TouchableOpacity onPress={this.likedMovie}>
                                        <Icon reverse
                                        name={"check"}
                                        type={"entypo"}
                                        size={RFValue(30)}
                                        color={"#76ff03"}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.dislikedMovie}>
                                        <Icon reverse
                                        name={"cross"}
                                        type={"entypo"}
                                        size={RFValue(30)}
                                        color={"#ff1744"}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.unwatchedMovie}>
                                        <Icon reverse
                                        name={"cross"}
                                        type={"entypo"}
                                        size={RFValue(30)}
                                        color={"#ff1733"}/>
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.notWatched}>
                                        <Text style={styles.buttonText}>Did Not Watch</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
  });