<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items" :headers="headers">

      <!-- DATA TABLE ACTIONS -->
      <template v-slot:item.action="{ item }">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical" density="compact" class="ms-1" variant="plain"
              color="blue-darken-2" />
          </template>
          <v-list>
            <v-list-item>
              <v-btn size="small" prepend-icon="mdi-pencil" variant="plain" color="green-darken-3">Edit</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn size="small" prepend-icon="mdi-eye-settings-outline" variant="plain"
                color="blue-darken-2">View</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn size="small" prepend-icon="mdi-delete-outline" variant="plain" color="red-darken-4">Delete</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>


      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>

      <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`" height="64" cover></v-img>
        </v-card>
      </template>

      <template v-slot:item.rating="{ item }">
        <v-rating :model-value="item.rating" color="orange-darken-2" density="compact" size="small" readonly></v-rating>
      </template>

      <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-chip :color="item.stock ? 'green' : 'red'" :text="item.stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase" size="small" label></v-chip>
        </div>
      </template>

      <template v-slot:tfoot>
        <tr>
          <td colspan="5">
            <v-switch v-model="isActive" :label="isActive ? 'showing active recorrds' : 'showing inactive records'"
              color="red">
            </v-switch>
          </td>
        </tr>
      </template>

    </v-data-table>
  </v-card>
</template>


<!-- DATA SCRIPT START HERE -->

<script>
export default {
  data() {
    return {
      isActive: true,
      search: '',
    }
  },
  props: {
    items: Object,
    headers: Object

  }
}
</script>