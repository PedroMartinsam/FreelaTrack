import { ACCENT_GREEN, INPUT_BG, TEXT_DARK, TEXT_LIGHT } from "../constants/colors";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    width: 150,
    height: 120,
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

export { useColorScheme } from 'react-native';

