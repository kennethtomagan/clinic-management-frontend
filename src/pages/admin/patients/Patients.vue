<template>
  <div>
    <PageHeader
      title="Patients List"
      :breadcrumbs="[
        { label: 'Patient List', icon: 'people' }
      ]"
    />
    
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <q-input
          v-model="searchQuery"
          filled
          class="col-12 col-md-6"
          label="Search Patients"
          dense
          @update:model-value="debouncedFetchPatients"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="col-12 col-md-6 text-right q-mt-sm q-mt-md-none">
          <q-btn color="primary" icon="add" label="Add Patient" :to="{ name: 'admin.patients.add'}" />
        </div>
      </div>

      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        bordered
        v-model:pagination="pagination"
        :rows-per-page-options="[10, 20, 50]"
        @request="onRequest"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="avatar" :props="props">
              <q-avatar size="32px">
                <img :src="props.row.profile_image" v-if="props.row.profile_image">
                <q-icon name="person" v-else />
              </q-avatar>
            </q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="email" :props="props">{{ props.row.email }}</q-td>
            <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
            <q-td key="type" :props="props">{{ props.row.type }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn-group flat>
                <q-btn 
                  flat 
                  round 
                  color="primary" 
                  icon="visibility" 
                  @click="openupdatePatientModal(props.row)"
                />
                <q-btn flat round color="primary" icon="edit" :to="{ name: 'admin.patients.edit', params: { id: props.row.id }}" />
                <q-btn flat round color="primary" icon="lock"  @click="openUpdatePasswordModal(props.row)" />
                <q-btn flat round color="negative" icon="delete" @click="confirmDelete(props.row)" />
              </q-btn-group>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center q-pa-md text-grey-8">
            No users found
          </div>
        </template>
      </q-table>
    </div>

    <!-- User Dialog -->
    <q-dialog v-model="updatePatientModal" >
      <q-card style="min-width: 350px">
        <q-card-section class="profile-image-container">
          <div class="text-h6 ">View Profile</div>
        </q-card-section>
        <q-separator />

        <q-card-section  style="max-height: 70vh" class="scroll">

        <div class="profile-image-container">

            <q-avatar size="100px" class="shadow-3">
                <img :src="editedUser.profile_image" v-if="editedUser.profile_image">
                <q-icon name="person" size="180px" v-else />
            </q-avatar>
        </div>
          <q-input v-model="editedUser.first_name"  label="First Name" />
          <q-input v-model="editedUser.last_name"  label="Last Name" class="q-mt-sm" />
          <q-input v-model="editedUser.gender"  label="Gender" class="q-mt-sm" />
          <q-input v-model="editedUser.email"  label="Email" type="email" class="q-mt-sm" />
          <q-input v-model="editedUser.phone"  label="Phone" class="q-mt-sm" />
          <q-input v-model="editedUser.address"  label="Address" class="q-mt-sm" />
          <q-input v-model="editedUser.date_of_birth"  label="Date of Birth" class="q-mt-sm" />
          <q-input v-model="editedUser.rfid_number"  label="RFID #" class="q-mt-sm" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <!-- <q-btn flat label="Save" color="primary" @click="saveUser" /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Update Password  Dialog -->
    <q-dialog v-model="updatePasswordModal" >
      <q-card style="min-width: 400px">
        <q-card-section class="profile-image-container">
          <div class="text-h6 ">Update Password</div>
        </q-card-section>
        <q-separator />

        <q-card-section  style="max-height: 70vh" class="scroll">

          <q-input 
            v-model="password.new_password" 
            type="password" 
            label="New Password" 
            :error="!!errors.new_password"
            :error-message="errors.new_password?.[0]"  
            @change="errors.new_password = null"
        />
          <q-input 
            v-model="password.new_password_confirmation" 
            type="password" 
            label="Confirm New Password" 
            class="q-mt-sm" 
            :error="!!errors.new_password_confirmation"
            :error-message="errors.new_password_confirmation?.[0]"  
            @change="errors.new_password_confirmation = null"
        />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn  label="Update Password" color="primary" @click="updatePatientPassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import PageHeader from '../components/PageHeader.vue'
import { debounce } from 'quasar'
import { usePatient } from 'stores/patient'
import { Dialog } from 'quasar'

const $q = useQuasar()
const storePatient = usePatient();

const errors = reactive({
    new_password: null,
    new_password_confirmation: null,
})

const password = reactive({
    new_password: null,
    new_password_confirmation: null,

});

// Table configuration
const columns = [
  { name: 'avatar', label: '', field: 'avatar_url', align: 'left', style: 'width: 50px' },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'email', label: 'Email', field: 'email', sortable: true },
  { name: 'phone', label: 'Phone', field: 'phone', sortable: true },
  { name: 'type', label: 'Type', field: 'type', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

// Data
const loading = ref(false)
const users = ref([])
const patients = ref([])
const searchQuery = ref('')
const updatePatientModal = ref(false)
const updatePasswordModal = ref(false)
const editedUser = ref({})

// Pagination
const pagination = ref({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

// Methods
const fetchUsers = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: pagination.value.page,
      per_page: pagination.value.rowsPerPage,
      search: searchQuery.value
    })

    patients.value = [];
    storePatient.getPatientLists(params).then((response) => {
        const data = response.data
        console.log( response.data);
        patients.value = data.data
        users.value = data.data
        pagination.value.rowsNumber = data.meta.total
        pagination.value.page = data.meta.current_page
        pagination.value.rowsPerPage = data.meta.per_page
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to fetch users'
    })
  } finally {
    loading.value = false
  }
}

const debouncedFetchPatients = debounce(fetchUsers, 300)

const onRequest = async (props) => {
  pagination.value = props.pagination
  await fetchUsers()
}

const openupdatePatientModal = (user = null) => {
  if (user) {
    editedUser.value = user
  }
  updatePatientModal.value = true
}

const openUpdatePasswordModal = (user = null) => {
  if (user) {
    editedUser.value = user
  }
  updatePasswordModal.value = true
}

const updatePatientPassword = async () => {
    loading.value = true
    const formData = new FormData();
    formData.append('new_password', password.new_password);
    formData.append('new_password_confirmation', password.new_password_confirmation);
    formData.append('_method', 'PUT');

    storePatient.updatePatientPassword(editedUser.value.id , formData).then((response) => {
        loading.value = false
        errors.password =  null
        errors.confirm_password = null
        updatePasswordModal.value = false
        $q.notify({
            type: 'positive',
            message: 'Profile updated successfuly!',
            timeout: 3000,
            position: 'top-right'
        });
    }).catch(error => {
        loading.value = false
        if (error.errors) {
            errors.new_password = error.errors.new_password || null
            errors.new_password_confirmation = error.errors.new_password_confirmation || null
        } else {
        // If the error is a general error (e.g., authentication error)
            $q.notify({
                type: 'negative',
                message: error.message || 'Update failed. Please try again.',
                timeout: 3000,
                position: 'top-right'
            });
        }
    })
}

const confirmDelete = (user) => {
  $q.dialog({
    title: 'Confirm Delete',
    message: `Are you sure you want to delete ${user.name}?`,color: 'negative', // Sets the title color to a "danger" theme
    icon: 'warning',
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative', 
    },
    cancel: {
      label: 'Cancel',
      color: 'grey',
    },
    persistent: true
  }).onOk(async () => {
    loading.value = true

    storePatient.deletePatient(user.id).then((response) => {
        fetchUsers()
        $q.notify({
            color: 'positive',
            message: 'User deleted successfully'
        })
        loading.value = false
    }).catch(error => {
        console.error('Error deleting user:', error)
        $q.notify({
            color: 'negative',
            message: 'Failed to delete user'
        })
    })
  })
}

// Initial fetch
onMounted(fetchUsers)
</script>

<style scoped>
.q-table__bottom {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}

.profile-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>