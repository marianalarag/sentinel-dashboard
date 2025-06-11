import { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, useTheme, } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

const AddUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", numeroEmpleado: "",
    departamento: "", rol: "", email: "", password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, formData.email, formData.password
      );
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        ...formData,
        activo: true,
        createdAt: serverTimestamp()
      });
      alert("Usuario creado exitosamente");
      setFormData({
        nombre: "", apellido: "", numeroEmpleado: "",
        departamento: "", rol: "", email: "", password: ""
      });
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
      alert("Error: " + error.message);
    }
  };

  const userRole = "manager"; // Simulación, reemplaza por auth real

  if (userRole !== "manager") {
    return <Typography variant="h4">Acceso denegado</Typography>;
  }

  return (
    <Box m="20px">
      <Header title="Agregar Miembro" subtitle="Formulario restringido para Gerentes" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid", gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          backgroundColor: colors.primary[400],
          padding: 3, borderRadius: 2,
        }}
      >
        <TextField name="nombre" label="Nombre" variant="filled" value={formData.nombre} onChange={handleChange} required />
        <TextField name="apellido" label="Apellido" variant="filled" value={formData.apellido} onChange={handleChange} required />
        <TextField name="numeroEmpleado" label="No. de empleado" variant="filled" value={formData.numeroEmpleado} onChange={handleChange} required />
        <TextField select name="departamento" label="Departamento" variant="filled" value={formData.departamento} onChange={handleChange} required>
          <MenuItem value="TI">TI</MenuItem>
          <MenuItem value="Ventas">Ventas</MenuItem>
          <MenuItem value="Soporte">Soporte</MenuItem>
        </TextField>
        <TextField select name="rol" label="Rol" variant="filled" value={formData.rol} onChange={handleChange} required>
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="manager">Gerente</MenuItem>
          <MenuItem value="user">Usuario</MenuItem>
        </TextField>
        <TextField name="email" label="Correo electrónico" variant="filled" value={formData.email} onChange={handleChange} required />
        <TextField name="password" label="Contraseña" variant="filled" type="password" value={formData.password} onChange={handleChange} required />
        <Box gridColumn="span 2">
          <Button type="submit" variant="contained" color="secondary">
            Agregar Miembro
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUsers;