<template>
  <div>
    <AppHeader />

    <h1>Должности</h1>

    <!-- Форма для добавления новой должности -->
    <form @submit.prevent="createPositionHandler" class="form-container">
      <q-input
        v-model="newPosition.name"
        label="Название должности"
        filled
        required
      />
      <q-btn type="submit" label="Добавить" color="primary" />
    </form>

    <!-- Таблица должностей -->
    <q-table
      :rows="positions"
      :columns="columns"
      row-key="id"
      flat
      bordered
      class="table-container"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          color="primary"
          label="Изменить"
          @click="startEditingPosition(props.row)"
          flat
          size="sm"
        />
        <q-btn
          color="negative"
          label="Удалить"
          @click="deletePositionHandler(props.row.id)"
          flat
          size="sm"
        />
      </template>
    </q-table>

    <!-- Форма редактирования должности -->
    <div v-if="editMode && editedPosition" class="edit-form">
      <h3>Изменить должность</h3>
      <form @submit.prevent="updatePositionHandler">
        <q-input
          v-model="editedPosition.name"
          label="Название должности"
          filled
          required
        />
        <q-btn type="submit" label="Изменить" color="primary" />
        <q-btn label="Отмена" color="secondary" flat @click="cancelEdit" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from 'src/components/AppHeader.vue';
import { ref, onMounted } from 'vue';
import { getPositions, createPosition, updatePosition } from 'src/api';
import { QTableColumn } from 'quasar';
import { useQuasar } from 'quasar';
import axios from 'axios';
//Todo нет установки пакета в package.json
import Joi from 'joi';

const $q = useQuasar();

interface Position {
  id: string;
  name: string;
}

const positions = ref<Position[]>([]);
const newPosition = ref<Position>({ id: '', name: '' });
const editMode = ref(false);
const editedPosition = ref<Position | null>(null);

const columns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Название',
    align: 'left',
    field: 'name',
    required: true,
  },
  {
    name: 'actions',
    label: 'Действия',
    align: 'center',
    field: (row) => row.id,
  },
];

const positionSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Название должности должно содержать хотя бы 2 символа',
    'string.max': 'Название должности не должно превышать 255 символов',
    'string.empty': 'Название должности обязательно',
  }),
  id: Joi.forbidden(),
  deleted_at: Joi.forbidden(),
});

const loadPositions = async () => {
  try {
    positions.value = await getPositions();
  } catch (error) {
    console.error('Ошибка загрузки должностей:', error);
  }
};

onMounted(() => {
  loadPositions();
});

const createPositionHandler = async () => {
  const positionData = {
    name: newPosition.value.name.slice(0, 255),
  };

  const { error } = positionSchema.validate(positionData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await createPosition(positionData);
    newPosition.value = { id: '', name: '' };
    await loadPositions();
    $q.notify({ type: 'positive', message: 'Должность успешно добавлена' });
  } catch (error) {
    console.error('Ошибка добавления должности:', error);
    $q.notify({
      type: 'negative',
      message: 'Ошибка при добавлении должности',
    });
  }
};

const updatePositionHandler = async () => {
  if (!editedPosition.value) return;

  const positionData = {
    name: editedPosition.value.name,
  };

  const { error } = positionSchema.validate(positionData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await updatePosition(editedPosition.value.id, positionData);
    await loadPositions();
    cancelEdit();
    $q.notify({ type: 'positive', message: 'Должность успешно обновлена' });
  } catch (error) {
    console.error('Ошибка обновления должности:', error);
    $q.notify({
      type: 'negative',
      message: 'Ошибка при обновлении должности',
    });
  }
};

const startEditingPosition = (position: Position) => {
  editedPosition.value = { ...position };
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedPosition.value = null;
};

const deletePositionHandler = async (posId: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/positions/${posId}/soft-delete`
    );
    console.log('Response:', response.data);
    await loadPositions();
    $q.notify({ type: 'positive', message: 'Должность успешно удалена' });
  } catch (error) {
    console.error('Ошибка удаления должности:', error);
    $q.notify({ type: 'negative', message: 'Ошибка при удалении должности' });
  }
};
</script>

<style scoped>
.form-container,
.edit-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.table-container {
  margin-top: 1rem;
}
</style>
