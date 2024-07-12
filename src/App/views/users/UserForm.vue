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
  userName: null,
  password: null,
  firstName: null,
  middleName: null,
  lastName: null,
  suffixName: null,
});

async function setForm () {
  form.id = null;
  form.userName = null;
  form.password = null;
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

async function handlesSave() {
  if(props.item && props.item.id !== null){
    await handlesPut();
  }else{
    await handlesPost();
  }
}

async function closeDialog(action) {
  if (action =='save') {
    await handlesSave();
  } else {
    UserStore.resetError();
  }

  if(this.errors){
      if(Object.entries(this.errors).length === 0){
        await setForm();
        dialog.value = false;
      }
    }
}

async function handlesPost() {
  await UserStore.post(form);
}

async function handlesPut() {
  await UserStore.put(form);
}

</script>
<template>
  <v-btn @click="OpenDialog()" v-if="props.item == null">Create</v-btn>
  <v-btn size="small" prepend-icon="mdi-pencil" variant="plain" color="green-darken-3" @click="OpenDialog()" v-else>Edit</v-btn>
  
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1200">

      <v-card prepend-icon="mdi-account" title="Create User">
        <v-card-text>
          <p class="text-red mb-4" v-if="errors && errors.message">{{ errors.message }}</p>
          <v-row dense>
            <v-col cols="12" md="3">
              <v-text-field v-model="form.firstName" label="First name*" :error-messages="errors.FirstName" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.middleName" label="Middle name" :error-messages="errors.MiddleName"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.lastName" label="Last name*" :error-messages="errors.LastName" required></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="form.suffixName" label="Suffix Name" :error-messages="errors.SuffixName"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.userName" label="User Name*" :error-messages="errors.UserName" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6" v-if="props.item == null">
              <v-text-field v-model="form.password" label="Password*" type="password" :error-messages="errors.Password" required></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog('close')"></v-btn>

          <v-btn color="primary" text="Save" variant="tonal" @click="closeDialog('save')"></v-btn>
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