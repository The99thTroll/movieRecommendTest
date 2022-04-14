import {React} from "react";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createMaterialsTopTabNavigator} from "react-navigation-tabs";

import HomeScreen from "./HomeScreen";
import PopularScreen from "./DetailsScreen";
import RecommendationScreen from "./Recommendation";

export default function App() {
  return (
    <AppContainer/>
  );
}

const AppTopNavigator = createMaterialsTopTabNavigator({
  RecommendedMovies: {
    screen: RecommendationScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#fff"
        },
        labelStyle: {
          color: "#000"
        },
        indicatorStyle: {
          backgroundColor: "#000"
        }
      }
    }
  },

  PopularMovies: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#fff"
        },
        labelStyle: {
          color: "#000"
        },
        indicatorStyle: {
          backgroundColor: "#000"
        }
      }
    }
  }
})

const AppStackNavigator =  createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },

    AppTopNav: {
      screen: AppTopNavigator,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "#fff",
        headerTitle: "Recommended Movies",
        headerStyle: {
          backgroundColor: "#d500f9"
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: RFValue(18)
        }
      }
    }
  },

  {
    initialRouteName: "Home"
  }
)

const AppContainer = createAppContainer(AppStackNavigator);