<template>
  <div>
    <AppHeader />

    <h1>Отделы</h1>

    <form @submit.prevent="createDepartmentHandler" class="form-container">
      <q-input
        v-model="newDepartment.name"
        label="Название отдела"
        filled
        required
      />
      <q-input v-model="newDepartment.comment" label="Комментарий" filled />
      <q-btn type="submit" label="Добавить" color="primary" />
    </form>

    <q-table
      :rows="departments"
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
          @click="startEditingDepartment(props.row)"
          flat
          size="sm"
        />
        <q-btn
          color="negative"
          label="Удалить"
          @click="deleteDepartmentHandler(props.row.id)"
          flat
          size="sm"
        />
      </template>
    </q-table>

    <div v-if="editMode && editedDepartment" class="edit-form">
      <h3>Изменить отдел</h3>
      <form @submit.prevent="updateDepartmentHandler">
        <q-input
          v-model="editedDepartment.name"
          label="Название отдела"
          filled
          required
        />
        <q-input
          v-model="editedDepartment.comment"
          label="Комментарий отдела"
          filled
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
import { getDepartments, createDepartment, updateDepartment } from 'src/api';
import { QTableColumn, useQuasar } from 'quasar';
import Joi from 'joi';
import axios from 'axios';
const $q = useQuasar();

interface Department {
  id: string;
  name: string;
  comment: string;
  parent_id: null;
  organisation_id: null;
}

const departments = ref<Department[]>([]);
const newDepartment = ref<Department>({
  id: '',
  name: '',
  comment: '',
  parent_id: null,
  organisation_id: null,
});
const editMode = ref(false);
const editedDepartment = ref<Department | null>(null);

// Todo Лучше вынести описание столбцов в отдельный файл и его импортировать. поправить везде


const columns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Название',
    align: 'left',
    field: 'name',
    required: true,
  },
  { name: 'comment', label: 'Комментарий', align: 'left', field: 'comment' },
  {
    name: 'actions',
    label: 'Действия',
    align: 'center',
    field: (row) => row.id,
  },
];

const departmentSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    'string.empty': 'Название отдела обязательно для заполнения',
    'string.max': 'Название отдела не может превышать 255 символов',
  }),
  comment: Joi.string().max(500).allow('').messages({
    'string.max': 'Комментарий не может превышать 500 символов',
  }),
  parent_id: Joi.number().optional().allow(null).messages({
    'number.base': 'parent_id должно быть числом',
  }),
  organisation_id: Joi.number().optional().allow(null).messages({
    'number.base': 'organisation_id должно быть числом',
  }),
});

const loadDepartments = async () => {
  try {
    departments.value = await getDepartments();
  } catch (error) {
    console.error('Ошибка загрузки отделов:', error);
  }
};

onMounted(() => {
  loadDepartments();
});

const createDepartmentHandler = async () => {
  const departmentData = {
    name: newDepartment.value.name,
    comment: newDepartment.value.comment,
    parent_id: null,
    organisation_id: null,
  };

  const { error } = departmentSchema.validate(departmentData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await createDepartment(departmentData);
    newDepartment.value = {
      id: '',
      name: '',
      comment: '',
      parent_id: null,
      organisation_id: null,
    };
    await loadDepartments();
    $q.notify({ type: 'positive', message: 'Отдел успешно добавлен' });
  } catch (error) {
    console.error('Ошибка добавления отдела:', error);
    $q.notify({ type: 'negative', message: 'Ошибка при добавлении отдела' });
  }
};

const updateDepartmentHandler = async () => {
  if (!editedDepartment.value) return;

  const departmentData = {
    name: editedDepartment.value.name,
    comment: editedDepartment.value.comment,
    parent_id: editedDepartment.value.parent_id || null,
    organisation_id: editedDepartment.value.organisation_id || null,
  };

  const { error } = departmentSchema.validate(departmentData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await updateDepartment(editedDepartment.value.id, departmentData);
    await loadDepartments();
    cancelEdit();
    $q.notify({ type: 'positive', message: 'Отдел успешно обновлен' });
  } catch (error) {
    console.error('Ошибка обновления отдела:', error);
    $q.notify({ type: 'negative', message: 'Ошибка при обновлении отдела' });
  }
};

const startEditingDepartment = (department: Department) => {
  editedDepartment.value = { ...department };
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedDepartment.value = null;
};

const deleteDepartmentHandler = async (departmentId: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/departments/${departmentId}/soft-delete`
    );
    console.log('Response:', response.data);
    await loadDepartments();
    $q.notify({ type: 'positive', message: 'Отдел удален' }); // Успешное уведомление
  } catch (error) {
    console.error('Error:', error);
    $q.notify({ type: 'negative', message: 'Ошибка при удалении отдела' }); // Ошибка
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
