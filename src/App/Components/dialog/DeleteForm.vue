<script setup>
import { useUserStore } from '../../../store/UserStore';
import { storeToRefs } from 'pinia';
import { ref, reactive, defineProps } from 'vue'

const dialog = ref(false);

const UserStore = useUserStore();
const { user, errors } = storeToRefs(UserStore);

const props = defineProps({
    item: {
        type: Object,
    },

    active: {
        type: Boolean,
    }

});

const form = reactive({
    id: null,
    userName: null,
    password: null,
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
});

async function setForm() {
    form.id = null;
    form.userName = null;
    form.password = null;
    form.firstName = null;
    form.middleName = null;
    form.lastName = null;
    form.suffixName = null;
}

const isActive = ref(props.active);

async function OpenDialog() {
    dialog.value = true;
    if (props.item != null) {
        Object.keys(form).forEach((key) => (form[key] = props.item[key]));
    }
}

async function handlesSave() {
    await handleDelete();
    closeDialog();
}

async function closeDialog(action) {
    dialog.value = false;
}

async function handleDelete() {
    UserStore.delete(form);
}


</script>

<template>
    <v-btn size="small" prepend-icon="mdi-delete" variant="plain" color="red-darken-3" @click="OpenDialog"
        v-if="isActive">Delete</v-btn>
    <v-btn size="small" prepend-icon="mdi-restore" variant="plain" color="green-darken-3" @click="OpenDialog"
        v-else>Restore</v-btn>

    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card :prepend-icon="isActive ? 'mdi-delete-empty' : 'mdi-restore'"
                :title="isActive ? 'Delete Form' : 'Restore Form'">
                <v-card-text>
                    {{ isActive ? `Sure ka user: ${item.firstName}?`
                        : `Restore mo user: ${item.firstName}` }}
                </v-card-text>

                <divider></divider>
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="handlesSave">
                        YES
                    </v-btn>

                    <v-btn @click="dialog = false">
                        NO
                    </v-btn>
                </template>
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