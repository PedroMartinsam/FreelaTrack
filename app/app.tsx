import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const Stack = createNativeStackNavigator();

/* ================= PALETA HACKER ================= */

const COLORS = {
  background: "#050A18",
  card: "#0E1628",
  neon: "#00F5FF",
  success: "#00FF9D",
  danger: "#FF3D71",
  text: "#E6F1FF",
  muted: "#5F7C99",
};

/* ================= MOCK DATA ================= */

const data = {
  revenueMonth: 8450,
  projects: 4,
  hours: 62,
};

const projectsData = [
  { name: "App Delivery", value: 3200, deadline: "20 Mar 2026" },
  { name: "Site Barbearia", value: 2100, deadline: "28 Mar 2026" },
];

/* ================= COMPONENTE CARD ================= */

function Card({ children, delay = 0 }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }] }]}
    >
      {children}
    </Animated.View>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Sistema Ativo, Pedro 👋</Text>
          <Text style={styles.subtitle}>FreelaTrack v1.0</Text>
        </View>

        {/* NAVEGAÇÃO FUNCIONAL */}
        <View style={styles.topNav}>
        
            <Pressable
            style={styles.topNavItem}
            onPress={() => navigation.navigate("Config")}
          >
            <Text style={styles.topNavText}>CONFIG</Text>
          </Pressable>
        </View>

        {/* RECEITA */}
        <Card delay={100}>
          <Text style={styles.bigLabel}>Receita do mês</Text>
          <Text style={styles.bigValue}>R$ {data.revenueMonth}</Text>
        </Card>

        {/* PROJETOS + HORAS */}
        <View style={styles.row}>
          <Card delay={200}>
            <Text style={styles.cardTitle}>Projetos</Text>
            <Text style={styles.cardHighlight}>{data.projects}</Text>
          </Card>

          <Card delay={300}>
            <Text style={styles.cardTitle}>Horas</Text>
            <Text style={[styles.cardHighlight, { color: COLORS.neon }]}>
              {data.hours}h
            </Text>
          </Card>
        </View>

        {/* PERFORMANCE */}
        <Card delay={350}>
          <Text style={styles.sectionTitle}>🖥 Performance</Text>
          <Text style={{ color: COLORS.success }}>STATUS: ONLINE</Text>
          <Text style={{ color: COLORS.neon }}>PRODUTIVIDADE: ALTA</Text>
        </Card>

        {/* PROJETOS */}
        <Card delay={400}>
          <Text style={styles.sectionTitle}>⚡ Projetos Ativos</Text>
          {projectsData.map((p, i) => (
            <View key={i} style={styles.projectRow}>
              <View>
                <Text style={styles.projectName}>{p.name}</Text>
                <Text style={styles.deadline}>
                  Entrega: {p.deadline}
                </Text>
              </View>
              <Text style={styles.projectValue}>R$ {p.value}</Text>
            </View>
          ))}
        </Card>

        {/* ALERTA */}
        <Card delay={500}>
          <Text style={{ color: COLORS.danger, fontWeight: "bold" }}>
            ⚠ Alerta
          </Text>
          <Text style={{ color: COLORS.text }}>
            1 projeto vence em 3 dias.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

/* ================= OUTRAS TELAS ================= */

function Relatorios() {
  return screenTemplate("RELATÓRIOS");
}

function Clientes() {
  return screenTemplate("CLIENTES");
}

function Config() {
  return screenTemplate("CONFIGURAÇÕES");
}

function screenTemplate(title: string) {
  return (
    <View style={styles.screenCenter}>
      <Text style={{ color: COLORS.neon, fontSize: 22 }}>
        {title}
      </Text>
    </View>
  );
}

/* ================= APP ================= */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Relatorios" component={Relatorios} />
        <Stack.Screen name="Clientes" component={Clientes} />
        <Stack.Screen name="Config" component={Config} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 50,
  },

  header: {
    marginBottom: 20,
  },

  greeting: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.muted,
  },

  topNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#12203A",
    paddingBottom: 10,
  },

  topNavItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  topNavText: {
    color: COLORS.neon,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#12203A",
  },

  bigLabel: {
    color: COLORS.muted,
  },

  bigValue: {
    color: COLORS.success,
    fontSize: 36,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  cardTitle: {
    color: COLORS.muted,
  },

  cardHighlight: {
    color: COLORS.success,
    fontSize: 28,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: COLORS.text,
    fontWeight: "bold",
    marginBottom: 10,
  },

  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#12203A",
  },

  projectName: {
    color: COLORS.text,
  },

  deadline: {
    color: COLORS.muted,
    fontSize: 12,
  },

  projectValue: {
    color: COLORS.neon,
    fontWeight: "bold",
  },

  screenCenter: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});