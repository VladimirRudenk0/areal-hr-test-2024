<template>
  <div>
    <AppHeader />

    <h1>Организации</h1>

    <form @submit.prevent="createOrganizationHandler" class="form-container">
      <q-input
        v-model="newOrganization.name"
        label="Название организации"
        filled
        required
      />
      <q-input v-model="newOrganization.comment" label="Комментарий" filled />
      <q-btn type="submit" label="Добавить" color="primary" />
    </form>

    <!-- Таблица организаций -->
    <q-table
      :rows="organizations"
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
          @click="startEditingOrganization(props.row)"
          flat
          size="sm"
        />
        <q-btn
          color="negative"
          label="Удалить"
          @click="deleteOrganizationHandler(props.row.id)"
          flat
          size="sm"
        />
      </template>
    </q-table>

    <!-- Форма редактирования организации -->
    <div v-if="editMode && editedOrganization" class="edit-form">
      <h3>Изменить организацию</h3>
      <form @submit.prevent="updateOrganizationHandler">
        <q-input
          v-model="editedOrganization.name"
          label="Название организации"
          filled
          required
        />
        <q-input
          v-model="editedOrganization.comment"
          label="Комментарий организации"
          filled
        />
        <q-btn type="submit" label="Изменить" color="primary" />
        <q-btn label="Отмена" color="secondary" flat @click="cancelEdit" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
} from 'src/api/organizations';
import AppHeader from 'components/AppHeader.vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { organizationSchema } from 'src/pages/shemas/Organization.shemas';
import { organizationsColumns } from 'src/pages/columns/organizationsColumns'; // Подключаем Joi для валидации

const $q = useQuasar();

const columns = ref(organizationsColumns);

interface Organization {
  id: string;
  name: string;
  comment: string;
}

const organizations = ref<Organization[]>([]);
const newOrganization = ref<Organization>({ id: '', name: '', comment: '' });
const editMode = ref(false);
const editedOrganization = ref<Organization | null>(null);

const loadOrganizations = async () => {
  try {
    organizations.value = await getOrganizations();
  } catch (error) {
    console.error('Ошибка загрузки организаций:', error);
  }
};

onMounted(() => {
  loadOrganizations();
});

const createOrganizationHandler = async () => {
  const organizationData = {
    name: newOrganization.value.name,
    comment: newOrganization.value.comment,
  };

  const { error } = organizationSchema.validate(organizationData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await createOrganization(organizationData);
    newOrganization.value = {
      id: '',
      name: '',
      comment: '',
    };
    await loadOrganizations();
    $q.notify({ type: 'positive', message: 'Организация успешно добавлена' });
  } catch (error) {
    console.error('Ошибка добавления организации:', error);
    $q.notify({
      type: 'negative',
      message: 'Ошибка при добавлении организации',
    });
  }
};

const updateOrganizationHandler = async () => {
  if (!editedOrganization.value) return;

  const organizationData = {
    name: editedOrganization.value.name,
    comment: editedOrganization.value.comment,
  };

  const { error } = organizationSchema.validate(organizationData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) =>
      $q.notify({ type: 'negative', message: err.message })
    );
    return;
  }

  try {
    await updateOrganization(editedOrganization.value.id, organizationData);
    await loadOrganizations();
    cancelEdit();
    $q.notify({ type: 'positive', message: 'Организация успешно обновлена' });
  } catch (error) {
    console.error('Ошибка обновления организации:', error);
    $q.notify({
      type: 'negative',
      message: 'Ошибка при обновлении организации',
    });
  }
};

const startEditingOrganization = (organization: Organization) => {
  editedOrganization.value = { ...organization };
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedOrganization.value = null;
};

const deleteOrganizationHandler = async (orgId: number) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/organizations/${orgId}/soft-delete`,
      {},
      { withCredentials: true }
    );
    console.log('Response:', response.data);
    await loadOrganizations();
    $q.notify({ type: 'positive', message: 'Организация успешно удалена' });
  } catch (error) {
    console.error('Ошибка удаления организации:', error);
    $q.notify({ type: 'negative', message: 'Ошибка при удалении организации' });
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
