import {
  Button,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonDiamond from "../components/button_diamond";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import Shop from "../components/shop";
import Topup from "../components/topup";
import MyButton from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import socket from "../libs/socket";
// AuthSession.AuthSessionManager.setOptions({
//   authenticationCallback: {
//     url: AuthSession.makeRedirectUri({ useProxy: true }),
//     loadAsync: async (req) => {
//       return { status: 200, headers: {}, body: 'OK' };
//     },
//   },
// });

const Home = () => {
  const navigate = useNavigation();
  const player = useSelector((state: RootState) => state.player);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDiamond, setModalDiamond] = useState(false);

  const imgSplash = [
    require("../image/splash.jpg"),
    require("../image/bgImage.jpg"),
    require("../image/diamond.png"),
  ];

  async function handleStart() {
    await socket.emit("room", {
      id: player.id,
      name: player.name,
      avatar: player.active_avatar,
    });
    navigate.navigate("Match" as never);
  }
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={imgSplash[1]}
      >
        {/* modal avatar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalAvatarView}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textModal}>Close</Text>
              </Pressable>
              <ScrollView>
                <Shop />
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* modal diamond */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDiamond}
          onRequestClose={() => {
            setModalDiamond(!modalDiamond);
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 50 }}> modal diamod</Text>
            <Pressable onPress={() => setModalDiamond(!modalDiamond)}>
              <Text>Hide Modal</Text>
              <Topup />
            </Pressable>
          </View>
        </Modal>
        {/* top bar */}
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ padding: 20 }}>
            <Image source={imgSplash[0]} style={[styles.Image]} />
          </View>

          <View style={{ marginTop: 15 }}>
            <ButtonDiamond
              diamond={player.diamond}
              onPress={() => setModalDiamond(true)}
            />
          </View>
        </View>
        {/* top end */}
        <View
          style={{
            backgroundColor: "rgba(25, 22, 22, 0.39)",
            // width: 250,
            minWidth: 150,
            maxWidth: 250,
            // height: 80,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: "auto",
          }}
        >
          <Text
            style={{
              color: "white",
              textShadowColor: "black",
              textShadowRadius: 10,
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Hi,{player.name}
          </Text>
        </View>

        <View style={styles.avatar}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.avatarHome}
              source={{
                uri: player.active_avatar,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exchange}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../image/exchange.jpg")}
            />
          </TouchableOpacity>
        </View>
        {/* start page */}
        <View
          style={{
            alignItems: "center",

            margin: "auto",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.startImage}
            source={require("../image/home-page.jpg")}
          />
          <View style={styles.buttonStart}>
            <Button onPress={handleStart} color={"green"} title="START GAME" />
          </View>

          {/* button logout */}
          <View
            style={{
              width: 50,
              height: 60,
              alignItems: "center",

              position: "relative",
              // right: -100,
              left: 130,
              // top: 20,
            }}
          >
            <MyButton
              text={"Logout"}
              textColor="red"
              onPress={() => {
                AsyncStorage.clear(), navigate.navigate("Splash" as never);
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  exchange: {
    width: 35,
    height: 35,
    position: "absolute",
    top: 193,
    right: 135,
    backgroundColor: "#94969c",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  Image: {
    height: 60,
    width: 60,
    // margin: "auto",
    // marginTop: -10,
    borderRadius: 100,
    // marginBottom: 80,
  },
  diamond: {
    height: 60,
    width: 60,
    marginTop: -7,
    // backgroundColor: "white",
    // borderRadius: 100,
  },
  avatarHome: {
    height: 80,
    width: 80,
    // backgroundColor: "black",
    objectFit: "cover",
    borderRadius: 100,
  },
  avatar: {
    backgroundColor: "white",
    position: "absolute",
    right: 140,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    top: 135,
    borderWidth: 2,
    borderColor: "black",
    objectFit: "cover",
  },
  startImage: {
    width: 300,
    height: 200,
    position: "relative",
    top: 25,
    margin: "auto",
  },
  buttonStart: {
    width: 200,
    height: 100,
    position: "relative",
    top: 25,
  },
  modalAvatarView: {
    width: "85%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

{
  /* <TouchableOpacity
            style={{
              width: 50,
              height: 40,
              display: "flex",
              flexDirection: "row",
              marginRight: 100,
              marginTop: 35,
              // backgroundColor: "white",
            }}
          >
            <Image source={imgSplash[2]} style={styles.diamond} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 30,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: -14,
                  width: 50,
                  textAlign: "center",
                  borderRadius: 2,
                }}
              >
                200
              </Text>
              <View
                style={{
                  backgroundColor: "green",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  ➕
                </Text>
              </View>
            </View>
          </TouchableOpacity> */
}

{
  /* <View
style={{
  // marginLeft: 100,
  // backgroundColor: "black",
  width: 50,
  height: 60,
  alignItems: "center",
  // justifyContent: "center",
  // position: "relative",
  // right: -100,
  // left: 300,
  // top: 20,
}}
>
<MyButton
  text={"Logout"}
  textColor="red"
  onPress={() => {
    AsyncStorage.clear(), navigate.navigate("Splash" as never);
  }}
/>
</View> */
}
