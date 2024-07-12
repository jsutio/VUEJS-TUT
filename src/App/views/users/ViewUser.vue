<script setup>
import { useUserStore } from '../../../store/UserStore';
import { storeToRefs } from 'pinia';
import { ref, reactive, defineProps } from 'vue'

const dialog = ref(false);

const UserStore = useUserStore();
const { user, errors } = storeToRefs(UserStore);

const props = defineProps ({
  item: {
    type: Object,
  }
});

const form = reactive ({
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  suffixName: null,
});

async function setForm () {
  form.id = null;
  form.firstName = null;
  form.middleName = null;
  form.lastName = null;
  form.suffixName = null;
}

async function OpenDialog() {
  dialog.value = true;
  if(props.item != null) {
      Object.keys(form).forEach((key) => (form[key] = props.item[key]));
  }
}

async function closeDialog(action) {
 dialog.value = false;
}

</script>
<template>
  
  <v-btn size="small" prepend-icon="mdi-eye" variant="plain" color="blue-darken-3" @click="OpenDialog()">View</v-btn>
  
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1200">

      <v-card prepend-icon="mdi-account" title="View User">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="3">
              <v-text-field v-model="form.firstName" label="First name" readonly></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.middleName" label="Middle name" readonly></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.lastName" label="Last name" readonly></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.suffixName" label="Suffix Name" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog('close')"></v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>