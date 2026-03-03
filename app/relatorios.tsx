import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Relatorios() {
  return (
    <LinearGradient
      colors={["#420c45", "#7B2FF7", "#4d085e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER */}
        <Text style={styles.title}>Painel Financeiro</Text>
        <Text style={styles.subtitle}>
          Visão estratégica do desempenho do negócio
        </Text>

        {/* KPIs */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Faturamento Mensal
            </Text>
            <Text style={styles.kpiValue}>
              R$ 8.450
            </Text>
            <Text style={styles.kpiGrowth}>
              +12% vs mês anterior
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Total Anual
            </Text>
            <Text style={styles.kpiValue}>
              R$ 52.300
            </Text>
            <Text style={styles.kpiGrowth}>
              +18% crescimento
            </Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Horas Trabalhadas
            </Text>
            <Text style={styles.kpiValue}>
              62h
            </Text>
            <Text style={styles.kpiGrowth}>
              Produtividade alta
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Clientes Ativos
            </Text>
            <Text style={styles.kpiValue}>
              2
            </Text>
            <Text style={styles.kpiGrowth}>
              Base estável
            </Text>
          </View>
        </View>

        
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    color: "#E2E8F0",
    marginTop: 6,
    marginBottom: 25,
  },

  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  kpiCard: {
    backgroundColor: "#0E1628",
    width: "48%",
    padding: 18,
    borderRadius: 16,
  },

  kpiLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },

  kpiValue: {
    color: "#00FF9D",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  kpiGrowth: {
    color: "#CBD5E1",
    fontSize: 11,
    marginTop: 6,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#0E1628",
    padding: 18,
    borderRadius: 16,
  },

  cardText: {
    color: "#CBD5E1",
    marginBottom: 8,
  },
});