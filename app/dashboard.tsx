import React, { useEffect, useRef } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

/* ================= PALETA HACKER ================= */

const COLORS = {
  background: "#050A18",
  card: "#0E1628",
  neon: "#00F5FF",
  purple: "#8B5CF6",
  success: "#00FF9D",
  danger: "#FF3D71",
  text: "#E6F1FF",
  muted: "#5F7C99",
};

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

  if (hour >= 6 && hour < 12) {
    return "Bom dia";
  }

  if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  }

  if (hour >= 19 && hour < 24) {
    return "Boa noite";
  }

  // De 00:00 até 05:59
  return "Tá animado";
}
/* ================= CARD ================= */

function Card({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
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
      style={[
        styles.card,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, Programador
            </Text>
            <Text style={styles.subtitle}>
              Sistema Freelancer Ativo
            </Text>
          </View>

          <View style={styles.headerRight}>
           
             
                
              

            
          </View>
        </View>

        {/* RECEITA */}
        <Card delay={100}>
          <Text style={styles.bigLabel}>
            Receita do mês
          </Text>
          <Text style={styles.bigValue}>
            R$ {data.revenueMonth}
          </Text>
        </Card>

        {/* PROJETOS + HORAS */}
        <View style={styles.row}>
          <Card delay={200}>
            <Text style={styles.cardTitle}>
              Projetos Ativos
            </Text>
            <Text style={styles.cardHighlight}>
              {data.projects}
            </Text>
            <Text style={styles.cardSub}>
              Em andamento
            </Text>
          </Card>

          <Card delay={300}>
            <Text style={styles.cardTitle}>
              Horas Trabalhadas
            </Text>
            <Text
              style={[
                styles.cardHighlight,
                { color: COLORS.neon },
              ]}
            >
              {data.hours}h
            </Text>
            <Text style={styles.cardSub}>
              Este mês
            </Text>
          </Card>
        </View>

        {/* INDICADOR DE PERFORMANCE */}
        <Card delay={350}>
          <Text style={styles.sectionTitle}>
            Indicador de Performance
          </Text>

          <View style={styles.performanceRow}>
            <Text style={styles.performanceLabel}>
              Status do Sistema:
            </Text>
            <Text style={styles.performanceOnline}>
              ONLINE
            </Text>
          </View>

          <View style={styles.performanceRow}>
            <Text style={styles.performanceLabel}>
              Produtividade:
            </Text>
            <Text style={styles.performanceHigh}>
              ALTA
            </Text>
          </View>
        </Card>

        {/* PROJETOS ATIVOS */}
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

        {/* ALERTA INTELIGENTE */}
        <Card delay={500}>
          <Text style={styles.alertTitle}>
             Alerta Inteligente
          </Text>
          <Text style={styles.alertText}>
            1 projeto vence em 3 dias.
          </Text>
        </Card>
      </ScrollView>

      {/* FLOATING BUTTON */}
      <Pressable style={styles.fab}>
        <Text style={{ color: "#000", fontSize: 24 }}>
          +
        </Text>
      </Pressable>
    </View>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerRight: {
    flexDirection: "row",
    gap: 10,
  },

  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#12203A",
  },

  headerButtonText: {
    color: COLORS.neon,
    fontSize: 12,
  },

  greeting: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.muted,
    marginTop: 4,
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
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  cardTitle: {
    color: COLORS.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cardHighlight: {
    color: COLORS.success,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
  },

  cardSub: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },

  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  performanceLabel: {
    color: COLORS.muted,
  },

  performanceOnline: {
    color: COLORS.success,
    fontWeight: "bold",
  },

  performanceHigh: {
    color: COLORS.neon,
    fontWeight: "bold",
  },

  projectCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#12203A",
  },

  projectName: {
    color: COLORS.text,
    fontWeight: "600",
  },

  deadline: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  projectValue: {
    color: COLORS.neon,
    fontWeight: "bold",
  },

  alertTitle: {
    color: COLORS.danger,
    fontWeight: "bold",
    marginBottom: 6,
  },

  alertText: {
    color: COLORS.text,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.neon,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});