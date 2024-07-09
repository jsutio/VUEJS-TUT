<script setup>
import MaintenanceTable from '../../Components/datatables/MaintenanceTable.vue';
import UserForm from '../../views/users/UserForm.vue'; 
import { useUserStore } from '../../../store/UserStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue'
const active = reactive(true);
const search = reactive("");

const UserStore = useUserStore();
const { userlist } = storeToRefs(UserStore);

async function getRecords(isActive, srch) {
    await UserStore.getList(isActive, srch);
}

onMounted(async () => {
    await getRecords(active, search);
})

</script>

<template>
    <UserForm />
    <MaintenanceTable :items="userlist" :headers="headers" />
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { key: 'ID', value: 'id' },
                { key: 'userName', title: 'User Name' },
                { key: 'firstName', title: 'First Name' },
                { key: 'middleName', title: 'Middle Name' },
                { key: 'lastName', title: 'Last Name' },
                { key: 'suffixName', title: 'Suffix Name' },
                { key: 'createdBy', title: 'Created By' },
                { key: 'creationDate', title: 'Creation Date' },
                { key: 'modifiedBy', title: 'Modified By' },
                { key: 'modificationDate', title: 'Modification Date' },

            ]  
        }
    }
}
</script>

