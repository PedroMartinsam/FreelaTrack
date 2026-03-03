import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

const PRIMARY_BLUE = "#0D1B2A";
const SECONDARY_BLUE = "#1B263B";
const ACCENT_GREEN = "#1ABC9C";
const INPUT_BG = "#FFFFFF";
const PLACEHOLDER = "#94A3B8";
const TEXT_DARK = "#0F172A";
const TEXT_LIGHT = "#FFFFFF";

export default function AuthScreen() {
  const router = useRouter();

  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.min(screenWidth * 0.9, 400);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleScreen = () => {
    Animated.timing(slideAnim, {
      toValue: isLogin ? -cardWidth : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    // Aqui depois você coloca autenticação real
    router.replace("/dashboard");
  };

  const handleSignup = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Aqui depois você coloca cadastro real
    router.replace("/dashboard");
  };

  return (
    <LinearGradient
      colors={[PRIMARY_BLUE, SECONDARY_BLUE]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ width: "100%", alignItems: "center" }}
        >
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logoFreelaTrack.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appName}>FreelaTrack</Text>
          </View>

          {/* CARD */}
          <View style={[styles.card, { width: cardWidth }]}>
            <Animated.View
              style={{
                flexDirection: "row",
                width: cardWidth * 2,
                transform: [{ translateX: slideAnim }],
              }}
            >
              {/* LOGIN */}
              <View style={[styles.form, { width: cardWidth }]}>
                <Text style={styles.title}>Entrar</Text>

                <TextInput
                  placeholder="Email"
                  placeholderTextColor={PLACEHOLDER}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Senha"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleLogin}
                >
                  <Text style={styles.primaryButtonText}>Entrar</Text>
                </Pressable>

                <Text style={styles.linkSmall}>Esqueci minha senha</Text>

                <Pressable onPress={toggleScreen}>
                  <Text style={styles.link}>
                    Não tem conta? Criar conta
                  </Text>
                </Pressable>
              </View>

              {/* CADASTRO */}
              <View style={[styles.form, { width: cardWidth }]}>
                <Text style={styles.title}>Criar Conta</Text>

                <TextInput
                  placeholder="Nome Completo"
                  placeholderTextColor={PLACEHOLDER}
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor={PLACEHOLDER}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Senha"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                />

                <TextInput
                  placeholder="Confirmar Senha"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry
                  style={styles.input}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleSignup}
                >
                  <Text style={styles.primaryButtonText}>
                    Criar Conta
                  </Text>
                </Pressable>

                <Pressable onPress={toggleScreen}>
                  <Text style={styles.link}>
                    Já tem conta? Entrar
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  card: {
    backgroundColor: INPUT_BG,
    borderRadius: 24,
    overflow: "hidden",
    paddingVertical: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  form: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: TEXT_DARK,
  },
  input: {
    width: "100%",
    backgroundColor: INPUT_BG,
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: ACCENT_GREEN,
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },
  buttonPressed: { opacity: 0.7 },
  primaryButtonText: {
    color: TEXT_LIGHT,
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: ACCENT_GREEN,
    fontWeight: "600",
  },
  linkSmall: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 13,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: TEXT_LIGHT,
  },
  logoImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
});