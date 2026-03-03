import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ================= MOCK DATA ================= */

const data = {
  revenueMonth: 8450,
  projects: 2,
  hours: 62,
};

const projectsData = [
  {
    name: "App Delivery",
    value: 3200,
    deadline: "20 Mar 2026",
  },
  {
    name: "Site Barbearia",
    value: 2100,
    deadline: "28 Mar 2026",
  },
];

/* ================= GREETING ================= */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  if (hour >= 19 && hour < 24) return "Boa noite";
  return "Tá animado";
}

/* ================= CARD ANIMADO ================= */

function Card({ children, delay = 0 }) {
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

export default function Dashboard() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#312f2f", "#22094b", "#a41010"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* NAVBAR */}
        <View style={styles.topNav}>
          <Pressable
            style={styles.navButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.navText}>Login</Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => router.push("/projetos")}
          >
            <Text style={styles.navText}>Projetos</Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => router.push("/clientes")}
          >
            <Text style={styles.navText}>Clientes</Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => router.push("/faturas")}
          >
            <Text style={styles.navText}>Faturas</Text>
          </Pressable>


          <Pressable
            style={styles.navButton}
            onPress={() => router.push("/relatorios")}
          >
            <Text style={styles.navText}>Relatórios</Text>
          </Pressable>

        </View>

        

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {getGreeting()}, Programador
          </Text>
          <Text style={styles.subtitle}>
            Sistema Freelancer Ativo
          </Text>
        </View>

        {/* RECEITA */}
        <Card delay={100}>
          <Text style={styles.bigLabel}>Receita do mês</Text>
          <Text style={styles.bigValue}>
            R$ {data.revenueMonth}
          </Text>
        </Card>

        {/* PROJETOS + HORAS (ESTILIZADOS) */}
        <View style={styles.statsRow}>
          <Card delay={200}>
            <Text style={[styles.cardTitle, { color: "#a59291" }]}>
 Projetos Ativos
</Text>

            <View style={styles.statValueBox}>
              <Text style={styles.statValue}>
                {data.projects}
              </Text>
            </View>

            <Text style={styles.cardSub}>
              Em andamento
            </Text>
          </Card>

          <Card delay={300}>
            <Text style={[styles.cardTitle, { color: "#a59291" }]}>
  Horas Trabalhadas
</Text>

            <View style={styles.statValueBox}>
              <Text style={[styles.statValue, { color: "#00F5FF" }]}>
                {data.hours}h
              </Text>
            </View>

            <Text style={styles.cardSub}>
              Este mês
            </Text>
          </Card>
        </View>

        {/* PROJETOS LISTA */}
        <Card delay={400}>
          <Text style={styles.sectionTitle}>
            Projetos Ativos
          </Text>

          {projectsData.map((project, index) => (
            <View key={index} style={styles.projectCard}>
              <View>
                <Text style={styles.projectName}>
                  {project.name}
                </Text>
                <Text style={styles.deadline}>
                  Entrega: {project.deadline}
                </Text>
              </View>

              <Text style={styles.projectValue}>
                R$ {project.value}
              </Text>
            </View>
          ))}
        </Card>

        {/* ALERTA */}
        <Card delay={500}>
          <Text style={styles.alertTitle}>
           Alerta Inteligente
          </Text>
          <Text style={styles.alertText}>
            1 projeto vence em 3 dias.
          </Text>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  navButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  navText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },

  header: {
    marginBottom: 20,
  },

  greeting: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#F1F5F9",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#0E1628",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  bigLabel: {
    color: "#CBD5E1",
  },

  bigValue: {
    color: "#00FF9D",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  statValueBox: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    color: "#00FF9D",
    fontSize: 28,
    fontWeight: "bold",
  },

  cardSub: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 6,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },

  projectCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2A44",
  },

  projectName: {
    color: "#FFF",
    fontWeight: "600",
  },

  deadline: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 4,
  },

  projectValue: {
    color: "#00F5FF",
    fontWeight: "bold",
  },

  alertTitle: {
    color: "#FF3D71",
    fontWeight: "bold",
    marginBottom: 6,
  },

  alertText: {
    color: "#FFF",
  },
});