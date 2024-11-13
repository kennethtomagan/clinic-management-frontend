`<template>
  <q-page class="q-pa-md">

    <PageHeader
      title="Product Details"
      :breadcrumbs="[
        { label: 'Products', icon: 'people', to: '/admin/products' },
        { label: 'Product Details', icon: 'inventory' }
      ]"
    />
    <div class="row q-col-gutter-md justify-center q-mt-sm">
      <div class="col-12 col-md-8" v-if="product?.id">
        <q-card class="product-edit-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h5">Edit Product</div>
            <div class="text-subtitle2">Update product information</div>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- Image Upload Section -->
              <div class="col-12 col-md-4">
                <div class="image-upload-container">
                  <q-img
                    :src="product.image || 'https://via.placeholder.com/300?text=Product+Image'"
                    class="rounded-borders"
                  />
                  <!-- <q-btn
                    color="primary"
                    icon="upload"
                    label="Upload Image"
                    class="q-mt-sm full-width"
                    @click="onImageUpload"
                  /> -->

                    <q-file
                        v-model="imageFile"
                        filled
                        accept="image/*"
                        class="q-mt-sm"
                        color="primary"
                        @update:model-value="handleUpload"
                    >
                        <template v-slot:prepend>
                        <q-icon name="add_photo_alternate" />
                        </template>
                        <template v-slot:append v-if="imageFile">
                        <q-icon name="close" @click.stop="clearImage" class="cursor-pointer" />
                        </template>
                        <template v-slot:default>
                            {{ imageFile ? imageFile.name : 'Upload Image' }}
                        </template>
                    </q-file>
                </div>

                <!-- Visibility Toggle -->
                <q-card class="q-mt-md visibility-card">
                  <q-card-section>
                    <div class="row items-center justify-between">
                      <div>
                        <div class="text-subtitle1 q-mb-xs">Product Status</div>
                        <div class="text-caption text-grey-7">
                          {{ product.is_visible ? 'Product is visible to customers' : 'Product is hidden from customers' }}
                        </div>
                      </div>
                      <q-toggle
                        v-model="product.is_visible"
                        color="green"
                        :icon="product.is_visible ? 'visibility' : 'visibility_off'"
                      />
                    </div>
                  </q-card-section>
                </q-card>

              </div>

              <!-- Form Fields -->
              <div class="col-12 col-md-8">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <q-input
                      v-model="product.name"
                      label="Product Name"
                      filled
                      :rules="[val => !!val || 'Name is required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="inventory_2" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input
                      v-model.number="product.price"
                      label="Price"
                      filled
                      type="number"
                      prefix="$"
                      :rules="[val => val > 0 || 'Price must be greater than 0']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_money" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input
                      v-model.number="product.qty"
                      label="Quantity"
                      filled
                      type="number"
                      :rules="[val => val >= 0 || 'Quantity cannot be negative']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="inventory" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="product.sku"
                      label="SKU"
                      filled
                    >
                      <template v-slot:prepend>
                        <q-icon name="qr_code" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input
                      v-model="product.barcode"
                      label="Barcode"
                      filled
                    >
                      <template v-slot:prepend>
                        <q-icon name="dashboard" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12">
                    <q-input
                      v-model="product.slug"
                      label="Slug"
                      filled
                      hint="URL-friendly version of the product name"
                    >
                      <template v-slot:prepend>
                        <q-icon name="link" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12">
                    <q-input
                      v-model="product.description"
                      label="Description"
                      type="textarea"
                      filled
                      rows="4"
                    >
                      <template v-slot:prepend>
                        <q-icon name="description" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-1">
            <q-btn flat label="Cancel" color="grey" />
            <q-btn 
              label="Save Changes" 
              color="primary"
              @click="saveProduct"
            />
          </q-card-actions>
        </q-card>
      </div>

    <div class="q-pa-md col-md-12"  v-else>
        <q-card class="q-mt-xl">
        <q-item-label header class="text-center">
            Product not found
        </q-item-label>
        </q-card>
        </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { useProduct } from 'stores/product'
import PageHeader from '../components/PageHeader.vue'

const $q = useQuasar()
const storeProduct = useProduct();
const loading = ref(false)
const route = useRoute();

const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

const product = reactive({})

const errors = reactive({
        name: null,
        slug: null,
        sku: null,
        qty: null,
        price: null,
        barcode: null,
        description: null, 
        is_visible:null,
        image: null
})


const clearImage = () => {
  imageFile.value = null
  imagePreview.value = null
}

const handleUpload = (file) => {
    if (file) {

      // Clear any previous object URL to avoid memory leaks
      if (product.image) {
        URL.revokeObjectURL(product.image)
      }

      product.image = URL.createObjectURL(file);
      console.log(product.profile_image)
    }
}


const onImageUpload = () => {
  $q.notify({
    message: 'Image upload functionality would be implemented here',
    color: 'info'
  })
}

const saveProduct = () => {
    
  loading.value = true

    const formData = new FormData();
    if (imageFile.value) {
        formData.append('image', imageFile.value);
    }

    formData.append('name', product.name);
    formData.append('slug', product.slug);
    formData.append('sku', product.sku);
    formData.append('qty', product.qty);
    formData.append('price', product.price);
    formData.append('barcode', product.barcode);
    formData.append('description', product.description);
    formData.append('is_visible', product.is_visible ?? '');
    formData.append('_method', 'PUT');
    storeProduct.updateProduct(route.params.id, formData).then((response) => {
        loading.value = false
        $q.notify({
            message: 'Product updated successfully!',
            color: 'positive',
            icon: 'check'
        })
        
    }).catch(error => {
        // PROCESSING
        loading.value = false
        // If error.response.data contains validation errors
        if (error.errors) {
            // Assign specific field errors
            errors.name = error.errors.name || null
            errors.slug = error.errors.slug || null
            errors.sku = error.errors.sku || null
            errors.qty = error.errors.qty || null
            errors.price = error.errors.price || null
            errors.barcode = error.errors.barcode || null
            errors.description = error.errors.description || null
            errors.image = error.errors.image || null
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


const fetchProduct = async () => {
  loading.value = true
  try {

    storeProduct.getProduct(route.params.id).then((response) => {
        Object.assign(product, response.data.data); 
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
// Initial fetch
onMounted(fetchProduct)

</script>

<style scoped>
.product-edit-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.image-upload-container {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.q-field--filled .q-field__control) {
  border-radius: 8px;
}

:deep(.q-img) {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>`