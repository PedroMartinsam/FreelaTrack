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

type Fatura = {
  id: string;
  cliente: string;
  projeto: string;
  horas: number;
  valorFinal: number;
  status: "pago" | "aguardando";
};

const faturasMock: Fatura[] = [
  {
    id: "1",
    cliente: "João Silva",
    projeto: "App Delivery",
    horas: 20,
    valorFinal: 3500,
    status: "aguardando",
  },
  {
    id: "2",
    cliente: "Maria Souza",
    projeto: "Site Barbearia",
    horas: 0,
    valorFinal: 2500,
    status: "pago",
  },
];

export default function Faturas() {
  const [faturas] = useState(faturasMock);
  const [selecionada, setSelecionada] =
    useState<Fatura | null>(null);

  const valorTotal = faturas.reduce(
    (total, f) => total + f.valorFinal,
    0
  );

  return (
    <LinearGradient
     colors={["#420c45", "#7B2FF7", "#4d085e"]}
      style={styles.container}
    >
      <Text style={styles.title}>Faturas</Text>

      <Text style={styles.total}>
        Valor Total: R$ {valorTotal}
      </Text>

      <FlatList
        data={faturas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => setSelecionada(item)}
          >
            <Text style={styles.text}>
              Cliente: {item.cliente}
            </Text>

            <Text style={styles.text}>
              Projeto: {item.projeto}
            </Text>

            <Text style={styles.text}>
              💰 R$ {item.valorFinal}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "pago"
                      ? "#00FF9D"
                      : "#FF3D71",
                },
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </Pressable>
        )}
      />

      <Modal visible={!!selecionada} animationType="slide">
        <View style={styles.modal}>
          {selecionada && (
            <>
              <Text style={styles.modalTitle}>
                Detalhes da Fatura
              </Text>

              <Text style={styles.text}>
                Cliente: {selecionada.cliente}
              </Text>
              <Text style={styles.text}>
                Projeto: {selecionada.projeto}
              </Text>
              <Text style={styles.text}>
                Horas: {selecionada.horas}h
              </Text>
              <Text style={styles.text}>
                Valor Final: R$ {selecionada.valorFinal}
              </Text>

              <Text style={styles.text}>
                Status: {selecionada.status}
              </Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setSelecionada(null)}
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
  },
  total: {
    color: "#00FF9D",
    marginVertical: 15,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#0E1628",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  text: {
    color: "#FFF",
    marginTop: 5,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    backgroundColor: "#0E1628",
    padding: 20,
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#1ABC9C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});