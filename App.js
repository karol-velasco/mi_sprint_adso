
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList
} from 'react-native';

export default function App() {
  const [tituloTarea, setTituloTarea] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Análisis');
  const [tareas, setTareas] = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  const categorias = ['Análisis', 'Diseño', 'Código'];

  const totalTareas = tareas.length;

  const tareasPendientes = tareas.filter(
    (tarea) => tarea.estado === 'Pendiente'
  ).length;

  const tareasCompletadas = tareas.filter(
    (tarea) => tarea.estado === 'Completada'
  ).length;

  function agregarTarea() {
    if (tituloTarea.trim() === '') {
      setMensajeError('Por favor, escribe el nombre de la tarea.');
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      titulo: tituloTarea.trim(),
      categoria: categoriaSeleccionada,
      estado: 'Pendiente'
    };

    setTareas([...tareas, nuevaTarea]);
    setTituloTarea('');
    setMensajeError('');
  }

  function cambiarEstado(id) {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          estado:
            tarea.estado === 'Pendiente'
              ? 'Completada'
              : 'Pendiente'
        };
      }

      return tarea;
    });

    setTareas(tareasActualizadas);
  }

  function eliminarTarea(id) {
    const tareasActualizadas = tareas.filter(
      (tarea) => tarea.id !== id
    );

    setTareas(tareasActualizadas);
  }

  function mostrarEncabezado() {
    return (
      <View>
        <View style={estilos.encabezado}>
          <Text style={estilos.titulo}>Mi Sprint ADSO</Text>
          <Text style={estilos.datosAprendiz}>
            Karol Juliana Velasco Rincon
          </Text>
          <Text style={estilos.datosAprendiz}>
            Ficha: 3409609
          </Text>
        </View>

        <View style={estilos.contenedorFormulario}>
          <Text style={estilos.tituloSeccion}>Nueva tarea</Text>

          <Text style={estilos.etiqueta}>Nombre de la tarea</Text>

          <TextInput
            style={estilos.campoTexto}
            placeholder="Escribe el nombre de la tarea"
            value={tituloTarea}
            onChangeText={(texto) => {
              setTituloTarea(texto);
              setMensajeError('');
            }}
          />

          {mensajeError !== '' && (
            <Text style={estilos.mensajeError}>
              {mensajeError}
            </Text>
          )}

          <Text style={estilos.etiqueta}>Selecciona una categoría</Text>

          <View style={estilos.contenedorCategorias}>
            {categorias.map((categoria) => (
              <Pressable
                key={categoria}
                style={[
                  estilos.botonCategoria,
                  categoriaSeleccionada === categoria &&
                    estilos.categoriaSeleccionada
                ]}
                onPress={() => setCategoriaSeleccionada(categoria)}
              >
                <Text
                  style={[
                    estilos.textoCategoria,
                    categoriaSeleccionada === categoria &&
                      estilos.textoCategoriaSeleccionada
                  ]}
                >
                  {categoria}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={estilos.botonAgregar}
            onPress={agregarTarea}
          >
            <Text style={estilos.textoBotonAgregar}>
              Agregar tarea
            </Text>
          </Pressable>
        </View>

        <View style={estilos.contenedorResumen}>
          <Text style={estilos.tituloSeccion}>Resumen de avance</Text>

          <View style={estilos.contenedorIndicadores}>
            <View style={estilos.indicador}>
              <Text style={estilos.numeroIndicador}>
                {totalTareas}
              </Text>
              <Text style={estilos.textoIndicador}>Total</Text>
            </View>

            <View style={estilos.indicador}>
              <Text style={estilos.numeroIndicador}>
                {tareasPendientes}
              </Text>
              <Text style={estilos.textoIndicador}>Pendientes</Text>
            </View>

            <View style={estilos.indicador}>
              <Text style={estilos.numeroIndicador}>
                {tareasCompletadas}
              </Text>
              <Text style={estilos.textoIndicador}>Completadas</Text>
            </View>
          </View>
        </View>

        <Text style={estilos.tituloLista}>Mis tareas</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={mostrarEncabezado()}
        ListEmptyComponent={
          <Text style={estilos.mensajeListaVacia}>
            Todavía no tienes tareas registradas.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={estilos.tarjetaTarea}>
            <View style={estilos.informacionTarea}>
              <Text
                style={[
                  estilos.nombreTarea,
                  item.estado === 'Completada' &&
                    estilos.tareaCompletada
                ]}
              >
                {item.titulo}
              </Text>

              <Text style={estilos.categoriaTarea}>
                Categoría: {item.categoria}
              </Text>

              <Text
                style={[
                  estilos.estadoTarea,
                  item.estado === 'Completada'
                    ? estilos.estadoCompletado
                    : estilos.estadoPendiente
                ]}
              >
                {item.estado}
              </Text>
            </View>

            <View style={estilos.botonesTarea}>
              <Pressable
                style={estilos.botonEstado}
                onPress={() => cambiarEstado(item.id)}
              >
                <Text style={estilos.textoBotonTarea}>
                  {item.estado === 'Pendiente'
                    ? 'Completar'
                    : 'Pendiente'}
                </Text>
              </Pressable>

              <Pressable
                style={estilos.botonEliminar}
                onPress={() => eliminarTarea(item.id)}
              >
                <Text style={estilos.textoBotonTarea}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        contentContainerStyle={estilos.contenidoLista}
      />
    </View>
  );
}


const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#F3F4F4'
  },

  contenidoLista: {
    padding: 20,
    paddingBottom: 40
  },

  encabezado: {
    backgroundColor: '#612D53',
    padding: 22,
    borderRadius: 14,
    marginBottom: 18
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#F3F4F4',
    marginBottom: 8
  },

  subtitulo: {
    fontSize: 15,
    color: '#F3F4F4',
    marginBottom: 14
  },

  datosAprendiz: {
    fontSize: 14,
    color: '#F3F4F4',
    marginTop: 4
  },

  contenedorFormulario: {
    backgroundColor: '#F3F4F4',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#612D53'
  },

  tituloSeccion: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#612D53',
    marginBottom: 14
  },

  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 8
  },

  campoTexto: {
    borderWidth: 1,
    borderColor: '#853953',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 14,
    backgroundColor: '#F3F4F4',
    color: '#2C2C2C'
  },

  mensajeError: {
    color: '#853953',
    fontSize: 13,
    marginTop: -8,
    marginBottom: 12
  },

  contenedorCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18
  },

  botonCategoria: {
    borderWidth: 1,
    borderColor: '#853953',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 15
  },

  categoriaSeleccionada: {
    backgroundColor: '#853953',
    borderColor: '#853953'
  },

  textoCategoria: {
    color: '#853953',
    fontSize: 14
  },

  textoCategoriaSeleccionada: {
    color: '#F3F4F4',
    fontWeight: 'bold'
  },

  botonAgregar: {
    backgroundColor: '#612D53',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center'
  },

  textoBotonAgregar: {
    color: '#F3F4F4',
    fontSize: 15,
    fontWeight: 'bold'
  },

  contenedorResumen: {
    backgroundColor: '#F3F4F4',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#612D53'
  },

  contenedorIndicadores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },

  indicador: {
    flex: 1,
    backgroundColor: '#612D53',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

  numeroIndicador: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#F3F4F4'
  },

  textoIndicador: {
    fontSize: 12,
    color: '#F3F4F4',
    textAlign: 'center',
    marginTop: 5
  },

  tituloLista: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#612D53',
    marginBottom: 12
  },

  mensajeListaVacia: {
    backgroundColor: '#F3F4F4',
    padding: 18,
    borderRadius: 10,
    color: '#2C2C2C',
    textAlign: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#853953'
  },

  tarjetaTarea: {
    backgroundColor: '#F3F4F4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#853953',
    borderWidth: 1,
    borderColor: '#612D53'
  },

  informacionTarea: {
    marginBottom: 12
  },

  nombreTarea: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 6
  },

  tareaCompletada: {
    textDecorationLine: 'line-through',
    color: '#612D53'
  },

  categoriaTarea: {
    fontSize: 14,
    color: '#2C2C2C',
    marginBottom: 6
  },

  estadoTarea: {
    fontSize: 13,
    fontWeight: 'bold'
  },

  estadoPendiente: {
    color: '#853953'
  },

  estadoCompletado: {
    color: '#612D53'
  },

  botonesTarea: {
    flexDirection: 'row',
    gap: 10
  },

  botonEstado: {
    flex: 1,
    backgroundColor: '#612D53',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center'
  },

  botonEliminar: {
    flex: 1,
    backgroundColor: '#853953',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center'
  },

  textoBotonTarea: {
    color: '#F3F4F4',
    fontSize: 13,
    fontWeight: 'bold'
  }
});
