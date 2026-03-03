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

type Projeto = {
  id: string;
  nome: string;
  cliente: string;
  status: "ativo" | "finalizado";
  tipo: "hora" | "fechado";
  valor: number;
  horas: number;
};

const projetosMock: Projeto[] = [
  {
    id: "1",
    nome: "App Delivery",
    cliente: "João Silva",
    status: "ativo",
    tipo: "fechado",
    valor: 3500,
    horas: 72,
  },
  {
    id: "2",
    nome: "Site Barbearia",
    cliente: "Maria Souza",
    status: "ativo",
    tipo: "fechado",
    valor: 2500,
    horas: 45,
  },
];

export default function Projetos() {
  const [projetos] = useState(projetosMock);
  const [selecionado, setSelecionado] =
    useState<Projeto | null>(null);

  return (
    <LinearGradient
      colors={["#420c45", "#7B2FF7", "#4d085e"]}
      style={styles.container}
    >
      <Text style={styles.title}>Projetos</Text>

      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => setSelecionado(item)}
          >
            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.cliente}>
              Cliente: {item.cliente}
            </Text>

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
              {item.tipo === "hora"
                ? `R$ ${item.valor}/hora`
                : `Valor Fechado: R$ ${item.valor}`}
            </Text>

            <Text style={styles.horas}>
               {item.horas}h registradas
            </Text>
          </Pressable>
        )}
      />

      {/* DETALHES */}
      <Modal visible={!!selecionado} animationType="slide">
        <View style={styles.modal}>
          {selecionado && (
            <>
              <Text style={styles.modalTitle}>
                {selecionado.nome}
              </Text>

              <Text style={styles.text}>
                Cliente: {selecionado.cliente}
              </Text>

              <Text style={styles.text}>
                Tipo: {selecionado.tipo}
              </Text>

              <Text style={styles.text}>
                Valor: R$ {selecionado.valor}
              </Text>

              <Text style={styles.text}>
                Horas: {selecionado.horas}h
              </Text>

              {/* BOTÕES */}
              <Pressable style={styles.timerButton}>
                <Text style={styles.buttonText}>
                   Iniciar Timer
                </Text>
              </Pressable>

              <Pressable style={styles.editButton}>
                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </Pressable>

              <Pressable style={styles.finishButton}>
                <Text style={styles.buttonText}>
                   Finalizar
                </Text>
              </Pressable>

              <Pressable
                style={styles.closeButton}
                onPress={() => setSelecionado(null)}
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

  cliente: {
    color: "#CBD5E1",
    marginTop: 5,
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },

  valor: {
    color: "#00F5FF",
    marginTop: 5,
  },

  horas: {
    color: "#FFF",
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

  text: {
    color: "#FFF",
    marginTop: 8,
  },

  timerButton: {
    marginTop: 20,
    backgroundColor: "#00F5FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  editButton: {
    marginTop: 10,
    backgroundColor: "#7B2FF7",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  finishButton: {
    marginTop: 10,
    backgroundColor: "#FF3D71",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#1ABC9C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});