<template>
  <div>
    <PageHeader
      title="Products List"
      :breadcrumbs="[
        { label: 'Product List', icon: 'people' }
      ]"
    />
    
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <q-input
          v-model="searchQuery"
          filled
          class="col-12 col-md-6"
          label="Search Products"
          dense
          @update:model-value="debouncedFetchProducts"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="col-12 col-md-6 text-right q-mt-sm q-mt-md-none">
          <q-btn color="primary" icon="add" label="Add Product" :to="{ name: 'admin.products.add'}" />
        </div>
      </div>

      <q-table
        :rows="products"
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
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="avatar" :props="props">
              <q-avatar size="32px">
                <img :src="props.row.image" v-if="props.row.image">
                <q-icon name="person" v-else />
              </q-avatar>
            </q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="qty" :props="props">{{ props.row.qty }}</q-td>
            <q-td key="price" :props="props">{{ props.row.price }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn-group flat>
                <q-btn 
                  flat 
                  round 
                  color="primary" 
                  icon="visibility" 
                  @click="openshowProductModal(props.row)"
                />
                <q-btn flat round color="primary" icon="edit" :to="{ name: 'admin.products.edit', params: { id: props.row.id }}" />
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


    <!-- Product Details Modal -->
    <q-dialog v-model="showProductModal" >
      <q-card style="min-width: 500px; max-width: 600px; border-radius: 12px; overflow: hidden;">
        <q-card-section class="bg-grey-2 text-center q-pa-none">
          <!-- Centered Image with Border -->
          <q-avatar size="150px" class="q-mt-md q-mb-sm" style="border: 4px solid #ffffff; border-radius: 50%;">
            <img :src="editedProduct.image" alt="Product Image" />
          </q-avatar>
          <div class="text-h5 text-bold text-primary">{{ editedProduct.name }}</div>
          <div class="text-subtitle2 text-grey-7 q-mb-md">SKU: {{ editedProduct.sku }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- Product Details List with Borders and Padding -->
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label caption>Quantity</q-item-label>
                <q-item-label class="text-bold">{{ editedProduct.qty }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Price</q-item-label>
                <q-item-label class="text-bold">${{ editedProduct.price }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Barcode</q-item-label>
                <q-item-label class="text-bold">
                    <img :src="editedProduct.barcode_image" alt="Product Image" />
                    <br/>
                    {{ editedProduct.barcode }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Description</q-item-label>
                <q-item-label class="text-bold">{{ editedProduct.description }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Slug</q-item-label>
                <q-item-label class="text-bold">{{ editedProduct.slug }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Close" color="primary" @click="showProductModal = false" />
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
import { useProduct } from 'stores/product'
import { Dialog } from 'quasar'

const $q = useQuasar()
// const storeProduct = usePatient();
const storeProduct = useProduct();

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
  { name: 'id', label: 'ID', field: 'id', align: 'left'},
  { name: 'avatar', label: 'image', field: 'image', align: 'left', style: 'width: 50px' },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'qty', label: 'Qty', field: 'qty', sortable: true },
  { name: 'price', label: 'Price', field: 'price', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

// Data
const loading = ref(false)
const users = ref([])
const products = ref([])
const searchQuery = ref('')
const showProductModal = ref(false)
const updatePasswordModal = ref(false)
const editedProduct = ref({})

// Pagination
const pagination = ref({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

// Methods
const fetchProducts = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: pagination.value.page,
      per_page: pagination.value.rowsPerPage,
      search: searchQuery.value
    })

    products.value = [];
    storeProduct.getProductList(params).then((response) => {
        const data = response.data
        console.log( response.data);
        products.value = data.data
        users.value = data.data
        pagination.value.rowsNumber = data.meta.total
        pagination.value.page = data.meta.current_page
        pagination.value.rowsPerPage = data.meta.per_page
    })

  } catch (error) {
    console.error('Error fetching product:', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to fetch users'
    })
  } finally {
    loading.value = false
  }
}

const debouncedFetchProducts = debounce(fetchProducts, 300)

const onRequest = async (props) => {
  pagination.value = props.pagination
  await fetchProducts()
}

const openshowProductModal = (user = null) => {
  if (user) {
    editedProduct.value = user
  }
  showProductModal.value = true
}

const openUpdatePasswordModal = (user = null) => {
  if (user) {
    editedProduct.value = user
  }
  updatePasswordModal.value = true
}

const confirmDelete = (product) => {
  $q.dialog({
    title: 'Confirm Delete',
    message: `Are you sure you want to delete ${product.name}?`,color: 'negative', // Sets the title color to a "danger" theme
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

    storeProduct.deleteProduct(product.id).then((response) => {
        fetchProducts()
        $q.notify({
            color: 'positive',
            message: 'Product deleted successfully'
        })
        loading.value = false
    }).catch(error => {
        console.error('Error deleting Product:', error)
        $q.notify({
            color: 'negative',
            message: 'Failed to delete Product'
        })
    })
  })
}

// Initial fetch
onMounted(fetchProducts)
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