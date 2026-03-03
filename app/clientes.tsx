import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Cliente = {
  id: string;
  nome: string;
  status: "ativo" | "inativo";
  valorHora: number;
  projetos: string[];
  pagamentos: number[];
};

const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    status: "ativo",
    valorHora: 80,
    projetos: ["App Delivery", "Sistema Interno"],
    pagamentos: [1200, 800,800,700],
  },
  {
    id: "2",
    nome: "Maria Souza",
    status: "inativo",
    valorHora: 60,
    projetos: ["Site Barbearia"],
    pagamentos: [2500],
  },
];

export default function Clientes() {
  const [clientes] = useState(clientesMock);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<Cliente | null>(null);

  const calcularTotal = (pagamentos: number[]) =>
    pagamentos.reduce((total, p) => total + p, 0);

  return (
    <LinearGradient
      colors={["#420c45", "#7B2FF7", "#4d085e"]}
      style={styles.container}
    >
      <Text style={styles.title}>Clientes</Text>

      {/* BOTÃO ADICIONAR */}
      <Pressable style={styles.addButton}>
        <Text style={styles.addText}>+ Adicionar Cliente</Text>
      </Pressable>

      {/* LISTA */}
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => setClienteSelecionado(item)}
          >
            <Text style={styles.nome}>{item.nome}</Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "ativo"
                      ? "#00FF9D"
                      : "#FF3D71",
                },
              ]}
            >
              {item.status.toUpperCase()}
            </Text>

            <Text style={styles.valor}>
              R$ {item.valorHora}/hora
            </Text>
          </Pressable>
        )}
      />

      {/* MODAL DETALHES */}
      <Modal visible={!!clienteSelecionado} animationType="slide">
        <View style={styles.modal}>
          {clienteSelecionado && (
            <>
              <Text style={styles.modalTitle}>
                {clienteSelecionado.nome}
              </Text>

              <Text style={styles.section}>
                📁 Projetos:
              </Text>
              {clienteSelecionado.projetos.map((p, i) => (
                <Text key={i} style={styles.text}>
                  • {p}
                </Text>
              ))}

              <Text style={styles.section}>
                💰 Pagamentos:
              </Text>
              {clienteSelecionado.pagamentos.map((p, i) => (
                <Text key={i} style={styles.text}>
                  R$ {p}
                </Text>
              ))}

              <Text style={styles.total}>
                Total Faturado:
                {" "}
                R${" "}
                {calcularTotal(
                  clienteSelecionado.pagamentos
                )}
              </Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setClienteSelecionado(null)}
              >
                <Text style={{ color: "#FFF" }}>
                  Fechar
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },

  addText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#0E1628",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  nome: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },

  valor: {
    color: "#00F5FF",
    marginTop: 5,
  },

  modal: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#0E1628",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },

  section: {
    color: "#1ABC9C",
    marginTop: 15,
    fontWeight: "bold",
  },

  text: {
    color: "#FFF",
    marginTop: 5,
  },

  total: {
    marginTop: 20,
    fontSize: 18,
    color: "#00FF9D",
    fontWeight: "bold",
  },

  closeButton: {
    marginTop: 30,
    backgroundColor: "#7B2FF7",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});